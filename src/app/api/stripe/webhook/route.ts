import { eq } from "drizzle-orm";
import Stripe from "stripe";
import { db } from "@/lib/db/client";
import { orderStatusEvents, quoteRequests } from "@/lib/db/schema";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return Response.json({ ok: false, error: "Webhook not configured." }, { status: 500 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid signature.";
    return Response.json({ ok: false, error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const quoteRequestId = session.metadata?.quoteRequestId;

    if (quoteRequestId) {
      await db.transaction(async (tx) => {
        await tx
          .update(quoteRequests)
          .set({
            paymentStatus: "paid",
            stripePaymentIntentId:
              typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
            paidAt: new Date(),
            fulfillmentStatus: "confirmed",
          })
          .where(eq(quoteRequests.id, quoteRequestId));

        await tx.insert(orderStatusEvents).values({ quoteRequestId, status: "confirmed" });
      });
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    const quoteRequestId = session.metadata?.quoteRequestId;

    if (quoteRequestId) {
      await db
        .update(quoteRequests)
        .set({ paymentStatus: "unpaid" })
        .where(eq(quoteRequests.id, quoteRequestId));
    }
  }

  return Response.json({ received: true });
}
