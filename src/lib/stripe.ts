import Stripe from "stripe";

let cached: Stripe | undefined;

export function getStripe(): Stripe {
  if (cached) return cached;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set.");
  }

  cached = new Stripe(secretKey);
  return cached;
}
