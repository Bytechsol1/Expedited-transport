import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export type HereVehicleProfile = {
  heightCm: number;
  widthCm: number;
  lengthCm: number;
  grossWeightKg: number;
  axleCount: number;
  hazmatClass?: string;
  shippedHazardousGoods?: boolean;
};

export const truckTypes = pgTable("truck_types", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  active: boolean("active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  maxWeightLbs: integer("max_weight_lbs").notNull(),
  maxPallets: integer("max_pallets").notNull(),
  maxLengthIn: integer("max_length_in").notNull(),
  maxWidthIn: integer("max_width_in").notNull(),
  maxHeightIn: integer("max_height_in").notNull(),
  hereVehicleProfile: jsonb("here_vehicle_profile").$type<HereVehicleProfile>().notNull(),
  costPerMile: numeric("cost_per_mile", { precision: 10, scale: 4 }).notNull(),
  costPerHour: numeric("cost_per_hour", { precision: 10, scale: 4 }).notNull(),
  avgMpg: numeric("avg_mpg", { precision: 6, scale: 2 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const pricingSettings = pgTable("pricing_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  fuelPricePerGallon: numeric("fuel_price_per_gallon", { precision: 10, scale: 4 }).notNull(),
  markupPercent: numeric("markup_percent", { precision: 6, scale: 3 }).notNull(),
  minimumCharge: numeric("minimum_charge", { precision: 10, scale: 2 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  updatedBy: text("updated_by"),
});

export const customers = pgTable("customers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const quoteRequests = pgTable("quote_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  pickupAddress: text("pickup_address").notNull(),
  deliveryAddress: text("delivery_address").notNull(),
  pickupLat: numeric("pickup_lat", { precision: 9, scale: 6 }),
  pickupLng: numeric("pickup_lng", { precision: 9, scale: 6 }),
  deliveryLat: numeric("delivery_lat", { precision: 9, scale: 6 }),
  deliveryLng: numeric("delivery_lng", { precision: 9, scale: 6 }),
  pieces: integer("pieces").notNull(),
  pallets: integer("pallets").notNull(),
  weightLbs: integer("weight_lbs").notNull(),
  lengthIn: integer("length_in").notNull(),
  widthIn: integer("width_in").notNull(),
  heightIn: integer("height_in").notNull(),
  hazmat: boolean("hazmat").notNull().default(false),
  assignedTruckTypeId: uuid("assigned_truck_type_id").references(() => truckTypes.id),
  distanceMiles: numeric("distance_miles", { precision: 10, scale: 2 }),
  durationMinutes: numeric("duration_minutes", { precision: 10, scale: 2 }),
  price: numeric("price", { precision: 10, scale: 2 }),
  status: text("status").notNull(), // "quoted" | "oversized" | "error"
  paymentStatus: text("payment_status").notNull().default("unpaid"), // "unpaid" | "pending" | "paid" | "failed"
  stripeSessionId: text("stripe_session_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  paidAt: timestamp("paid_at", { withTimezone: true }),
  customerId: uuid("customer_id").references(() => customers.id),
  fulfillmentStatus: text("fulfillment_status").notNull().default("confirmed"), // "confirmed" | "dispatched" | "in_transit" | "delivered"
});

export const orderStatusEvents = pgTable("order_status_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  quoteRequestId: uuid("quote_request_id").notNull().references(() => quoteRequests.id),
  status: text("status").notNull(), // "confirmed" | "dispatched" | "in_transit" | "delivered"
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
