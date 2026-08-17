import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { quoteRequests, customers, orderStatusEvents } from "@/lib/db/schema";
import { TrackingManager } from "@/components/admin/TrackingManager";

export const dynamic = "force-dynamic";

export default async function AdminTrackingPage() {
  const allOrders = await db
    .select({
      id: quoteRequests.id,
      pickupAddress: quoteRequests.pickupAddress,
      deliveryAddress: quoteRequests.deliveryAddress,
      fulfillmentStatus: quoteRequests.fulfillmentStatus,
      paymentStatus: quoteRequests.paymentStatus,
      customerEmail: customers.email,
    })
    .from(quoteRequests)
    .leftJoin(customers, eq(quoteRequests.customerId, customers.id))
    .orderBy(desc(quoteRequests.createdAt));

  const allEvents = await db
    .select()
    .from(orderStatusEvents)
    .orderBy(desc(orderStatusEvents.createdAt));

  const shipments = allOrders.map(order => {
    const orderEvents = allEvents.filter(e => e.quoteRequestId === order.id).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    
    // Map db status to UI status
    let uiStatus = "Pending";
    if (order.fulfillmentStatus === "confirmed") uiStatus = "Pending";
    else if (order.fulfillmentStatus === "dispatched") uiStatus = "Picked Up";
    else if (order.fulfillmentStatus === "in_transit") uiStatus = "In Transit";
    else if (order.fulfillmentStatus === "delivered") uiStatus = "Delivered";

    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "numeric" }).format(date);
    };

    const activity = ["confirmed", "dispatched", "in_transit", "delivered"].map(step => {
      const event = orderEvents.find(e => e.status === step);
      let label = step.replace("_", " ").toUpperCase();
      
      return {
        label,
        date: event ? formatDate(event.createdAt) : "-",
        location: event ? (step === "confirmed" ? "System" : step === "delivered" ? order.deliveryAddress : order.pickupAddress) : "-",
        completed: !!event
      };
    });

    return {
      id: `EXP-${order.id.split("-")[0].toUpperCase()}`,
      rawId: order.id,
      customer: order.customerEmail || "Unknown",
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
