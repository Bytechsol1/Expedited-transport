CREATE TABLE "admin_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" text DEFAULT 'admin' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "pricing_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fuel_price_per_gallon" numeric(10, 4) NOT NULL,
	"fuel_surcharge_percent" numeric(6, 3) NOT NULL,
	"minimum_charge" numeric(10, 2) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text
);
--> statement-breakpoint
CREATE TABLE "quote_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"pickup_address" text NOT NULL,
	"delivery_address" text NOT NULL,
	"pickup_lat" numeric(9, 6),
	"pickup_lng" numeric(9, 6),
	"delivery_lat" numeric(9, 6),
	"delivery_lng" numeric(9, 6),
	"pieces" integer NOT NULL,
	"pallets" integer NOT NULL,
	"weight_lbs" integer NOT NULL,
	"length_in" integer NOT NULL,
	"width_in" integer NOT NULL,
	"height_in" integer NOT NULL,
	"hazmat" boolean DEFAULT false NOT NULL,
	"assigned_truck_type_id" uuid,
	"distance_miles" numeric(10, 2),
	"duration_minutes" numeric(10, 2),
	"price" numeric(10, 2),
	"status" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "truck_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"max_weight_lbs" integer NOT NULL,
	"max_pallets" integer NOT NULL,
	"max_length_in" integer NOT NULL,
	"max_width_in" integer NOT NULL,
	"max_height_in" integer NOT NULL,
	"here_vehicle_profile" jsonb NOT NULL,
	"cost_per_mile" numeric(10, 4) NOT NULL,
	"cost_per_hour" numeric(10, 4) NOT NULL,
	"avg_mpg" numeric(6, 2) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_assigned_truck_type_id_truck_types_id_fk" FOREIGN KEY ("assigned_truck_type_id") REFERENCES "public"."truck_types"("id") ON DELETE no action ON UPDATE no action;