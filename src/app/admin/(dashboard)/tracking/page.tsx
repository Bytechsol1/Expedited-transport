import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { quoteRequests, customers, orderStatusEvents } from "@/lib/db/schema";
import { TrackingManager } from "@/components/admin/TrackingManager";
import {
  FULFILLMENT_STAGES,
  getFulfillmentStatusLabel,
  normalizeFulfillmentStatus,
} from "@/lib/orders/status";

export const dynamic = "force-dynamic";

export default async function AdminTrackingPage() {
  const allOrders = await db
    .select({
      id: quoteRequests.id,
      pickupAddress: quoteRequests.pickupAddress,
      deliveryAddress: quoteRequests.deliveryAddress,
      fulfillmentStatus: quoteRequests.fulfillmentStatus,
      paymentStatus: quoteRequests.paymentStatus,
      customerName: quoteRequests.customerName,
      customerEmail: quoteRequests.customerEmail,
      accountEmail: customers.email,
    })
    .from(quoteRequests)
    .leftJoin(customers, eq(quoteRequests.customerId, customers.id))
    .where(eq(quoteRequests.paymentStatus, "paid"))
    .orderBy(desc(quoteRequests.createdAt));

  const allEvents = await db
    .select()
    .from(orderStatusEvents)
    .orderBy(desc(orderStatusEvents.createdAt));

  const shipments = allOrders.map(order => {
    const orderEvents = allEvents.filter(e => e.quoteRequestId === order.id).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    
    const uiStatus = getFulfillmentStatusLabel(order.fulfillmentStatus);

    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "numeric" }).format(date);
    };

    const activity = FULFILLMENT_STAGES.map((step) => {
      const event = orderEvents.find((item) => normalizeFulfillmentStatus(item.status) === step.value);

      return {
        label: step.label,
        date: event ? formatDate(event.createdAt) : "-",
        location: event ? (step.value.startsWith("booking_") ? "System" : step.value === "delivered" ? order.deliveryAddress : order.pickupAddress) : "-",
        completed: !!event
      };
    });

    return {
      id: `EXP-${order.id.split("-")[0].toUpperCase()}`,
      rawId: order.id,
      customer: order.customerName || order.customerEmail || order.accountEmail || "Unknown",
      origin: order.pickupAddress,
      destination: order.deliveryAddress,
      status: uiStatus,
      currentLocation: orderEvents.length > 0 ? (order.fulfillmentStatus === "delivered" ? order.deliveryAddress : order.pickupAddress) : "System",
      eta: order.fulfillmentStatus === "delivered" ? "Delivered" : "Pending",
      activity
    };
  });

  return <TrackingManager initialShipments={shipments} />;
}
