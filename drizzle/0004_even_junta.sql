ALTER TABLE "quote_requests" ALTER COLUMN "fulfillment_status" SET DEFAULT 'booking_received';--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN IF NOT EXISTS "full_name" text;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN IF NOT EXISTS "phone" text;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN IF NOT EXISTS "company" text;--> statement-breakpoint
ALTER TABLE "quote_requests" ADD COLUMN IF NOT EXISTS "customer_name" text;--> statement-breakpoint
ALTER TABLE "quote_requests" ADD COLUMN IF NOT EXISTS "customer_email" text;--> statement-breakpoint
ALTER TABLE "quote_requests" ADD COLUMN IF NOT EXISTS "customer_phone" text;--> statement-breakpoint
ALTER TABLE "quote_requests" ADD COLUMN IF NOT EXISTS "customer_company" text;--> statement-breakpoint
ALTER TABLE "quote_requests" ADD COLUMN IF NOT EXISTS "pickup_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "quote_requests" ADD COLUMN IF NOT EXISTS "pickup_time_zone" text;--> statement-breakpoint
ALTER TABLE "quote_requests" ADD COLUMN IF NOT EXISTS "shipment_details" text;--> statement-breakpoint
ALTER TABLE "quote_requests" ADD COLUMN IF NOT EXISTS "terms_accepted_at" timestamp with time zone;--> statement-breakpoint
UPDATE "quote_requests" SET "fulfillment_status" = 'booking_confirmed' WHERE "fulfillment_status" = 'confirmed';--> statement-breakpoint
UPDATE "order_status_events" SET "status" = 'booking_confirmed' WHERE "status" = 'confirmed';
