export const FULFILLMENT_STATUS_VALUES = [
  "booking_received",
  "booking_confirmed",
  "dispatched",
  "in_transit",
  "delivered",
] as const;

export type FulfillmentStatus = (typeof FULFILLMENT_STATUS_VALUES)[number];

export const FULFILLMENT_STATUS_LABELS = {
  booking_received: "Booking Received",
  booking_confirmed: "Booking Confirmed",
  dispatched: "Dispatched",
  in_transit: "In Transit",
  delivered: "Delivered",
} as const satisfies Record<FulfillmentStatus, string>;

export type FulfillmentStatusLabel = (typeof FULFILLMENT_STATUS_LABELS)[FulfillmentStatus];

export const FULFILLMENT_STAGES = FULFILLMENT_STATUS_VALUES.map((value) => ({
  value,
  label: FULFILLMENT_STATUS_LABELS[value],
}));

export function normalizeFulfillmentStatus(status: string | null | undefined): FulfillmentStatus {
  if (status === "confirmed") return "booking_confirmed";
  if (FULFILLMENT_STATUS_VALUES.includes(status as FulfillmentStatus)) {
    return status as FulfillmentStatus;
  }
  return "booking_received";
}

export function getFulfillmentStatusLabel(status: string | null | undefined): FulfillmentStatusLabel {
  return FULFILLMENT_STATUS_LABELS[normalizeFulfillmentStatus(status)];
}

export function getFulfillmentStatusIndex(status: string | null | undefined) {
  return FULFILLMENT_STATUS_VALUES.indexOf(normalizeFulfillmentStatus(status));
}
