ALTER TABLE "quote_requests" ADD COLUMN "payment_status" text DEFAULT 'unpaid' NOT NULL;--> statement-breakpoint
ALTER TABLE "quote_requests" ADD COLUMN "stripe_session_id" text;--> statement-breakpoint
ALTER TABLE "quote_requests" ADD COLUMN "stripe_payment_intent_id" text;--> statement-breakpoint
ALTER TABLE "quote_requests" ADD COLUMN "paid_at" timestamp with time zone;