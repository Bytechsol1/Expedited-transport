import { eq } from "drizzle-orm";
import { z } from "zod";
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
});

export async function POST(request: Request) {
  const { allowed, retryAfterMs } = rateLimit(`checkout:${getClientIp(request)}`, 10, 60_000);
  if (!allowed) {
    return Response.json(
      { ok: false, error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
    );
  }

  let body: z.infer<typeof requestSchema>;
  try {
    body = requestSchema.parse(await request.json());
  } catch {
    return Response.json({ ok: false, error: "Invalid checkout request." }, { status: 400 });
  }

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
        truckTypeName: truckTypes.name,
      })
      .from(quoteRequests)
      .leftJoin(truckTypes, eq(quoteRequests.assignedTruckTypeId, truckTypes.id))
      .where(eq(quoteRequests.id, body.quoteRequestId))
      .limit(1);

    if (!quote || quote.status !== "quoted" || !quote.price) {
      return Response.json({ ok: false, error: "Quote not found or not payable." }, { status: 404 });
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
      success_url: `${siteUrl}/#instant-quote?payment=success`,
      cancel_url: `${siteUrl}/#instant-quote?payment=cancelled`,
      metadata: { quoteRequestId: quote.id },
    });

    await db
      .update(quoteRequests)
      .set({ paymentStatus: "pending", stripeSessionId: session.id })
      .where(eq(quoteRequests.id, quote.id));

    return Response.json({ ok: true, url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to start checkout.";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
