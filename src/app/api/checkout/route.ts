import { eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { quoteRequests, truckTypes } from "@/lib/db/schema";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

// Quotes are priced off rates that can change (admin edits a truck's
// $/mile, fuel price, markup, etc. at any time in /admin/rates) — without an
// expiry, an old quoteRequestId could be replayed to lock in a stale price
// from before a rate change. 30 minutes is generous for a customer to review
// and confirm, but short enough to bound that exposure.
const QUOTE_EXPIRY_MS = 30 * 60 * 1000;

const requestSchema = z.object({
  quoteRequestId: z.string().uuid(),
  termsAccepted: z.literal(true, { error: "You must accept the required policies before payment." }),
});

const payableQuoteSchema = z.object({
  customerName: z.string().trim().min(2),
  customerEmail: z.string().trim().email(),
  customerPhone: z.string().trim().refine((value) => value.replace(/\D/g, "").length >= 7),
  pickupAddress: z.string().trim().min(3),
  deliveryAddress: z.string().trim().min(3),
  pickupAt: z.date().refine((value) => value.getTime() > Date.now()),
  weightLbs: z.number().positive(),
  pieces: z.number().int().positive(),
  pallets: z.number().int().min(0),
  lengthIn: z.number().int().positive(),
  widthIn: z.number().int().positive(),
  heightIn: z.number().int().positive(),
});

export async function POST(request: Request) {
  const authSession = await auth();
  const role = (authSession?.user as { role?: string } | undefined)?.role;
  const customerId = authSession?.user?.id as string | undefined;
  if (role !== "customer" || !customerId) {
    return Response.json({ ok: false, error: "Please log in to continue to payment." }, { status: 401 });
  }

  const { allowed, retryAfterMs } = rateLimit(`checkout:${getClientIp(request)}`, 10, 60_000);
  if (!allowed) {
    return Response.json(
      { ok: false, error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
    );
  }

  let requestBody: unknown;
  try {
    requestBody = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Checkout request must be valid JSON." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(requestBody);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid checkout request." },
      { status: 400 }
    );
  }
  const body = parsed.data;

  try {
    const [quote] = await db
      .select({
        id: quoteRequests.id,
        createdAt: quoteRequests.createdAt,
        pickupAddress: quoteRequests.pickupAddress,
        deliveryAddress: quoteRequests.deliveryAddress,
        price: quoteRequests.price,
        status: quoteRequests.status,
        paymentStatus: quoteRequests.paymentStatus,
        customerName: quoteRequests.customerName,
        customerEmail: quoteRequests.customerEmail,
        customerPhone: quoteRequests.customerPhone,
        pickupAt: quoteRequests.pickupAt,
        weightLbs: quoteRequests.weightLbs,
        pieces: quoteRequests.pieces,
        pallets: quoteRequests.pallets,
        lengthIn: quoteRequests.lengthIn,
        widthIn: quoteRequests.widthIn,
        heightIn: quoteRequests.heightIn,
        truckTypeName: truckTypes.name,
      })
      .from(quoteRequests)
      .leftJoin(truckTypes, eq(quoteRequests.assignedTruckTypeId, truckTypes.id))
      .where(eq(quoteRequests.id, body.quoteRequestId))
      .limit(1);

    if (!quote || quote.status !== "quoted" || !quote.price) {
      return Response.json({ ok: false, error: "Quote not found or not payable." }, { status: 404 });
    }

    const quoteValidation = payableQuoteSchema.safeParse(quote);
    if (!quoteValidation.success) {
      const pickupIsInvalid = !quote.pickupAt || quote.pickupAt.getTime() <= Date.now();
      return Response.json(
        {
          ok: false,
          error: pickupIsInvalid
            ? "The pickup date and time has passed. Please recalculate your quote with a future pickup time."
            : "This quote is missing required customer or shipment information. Please recalculate it.",
          expired: pickupIsInvalid,
        },
        { status: 422 }
      );
    }

    if (quote.paymentStatus === "paid") {
      return Response.json({ ok: false, error: "This quote has already been paid." }, { status: 409 });
    }

    if (Date.now() - quote.createdAt.getTime() > QUOTE_EXPIRY_MS) {
      return Response.json(
        { ok: false, error: "This quote has expired. Please recalculate to get a current price.", expired: true },
        { status: 410 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Freight shipment${quote.truckTypeName ? ` — ${quote.truckTypeName}` : ""}`,
              description: `${quote.pickupAddress} → ${quote.deliveryAddress}`,
            },
            unit_amount: Math.round(Number(quote.price) * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/account?payment=success`,
      cancel_url: `${siteUrl}/?payment=cancelled#instant-quote`,
      metadata: { quoteRequestId: quote.id },
    });

    await db
      .update(quoteRequests)
      .set({
        paymentStatus: "pending",
        stripeSessionId: session.id,
        customerId,
        termsAcceptedAt: new Date(),
      })
      .where(eq(quoteRequests.id, quote.id));

    return Response.json({ ok: true, url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to start checkout.";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
