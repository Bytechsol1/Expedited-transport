import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { customers, quoteRequests, truckTypes } from "@/lib/db/schema";
import { OrdersManager } from "@/components/admin/OrdersManager";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await db
    .select({
      id: quoteRequests.id,
      createdAt: quoteRequests.createdAt,
      pickupAddress: quoteRequests.pickupAddress,
      deliveryAddress: quoteRequests.deliveryAddress,
      price: quoteRequests.price,
      fulfillmentStatus: quoteRequests.fulfillmentStatus,
      customerName: quoteRequests.customerName,
      customerEmail: quoteRequests.customerEmail,
      customerPhone: quoteRequests.customerPhone,
      customerCompany: quoteRequests.customerCompany,
      pickupAt: quoteRequests.pickupAt,
      pickupTimeZone: quoteRequests.pickupTimeZone,
      shipmentDetails: quoteRequests.shipmentDetails,
      pieces: quoteRequests.pieces,
      pallets: quoteRequests.pallets,
      weightLbs: quoteRequests.weightLbs,
      lengthIn: quoteRequests.lengthIn,
      widthIn: quoteRequests.widthIn,
      heightIn: quoteRequests.heightIn,
      hazmat: quoteRequests.hazmat,
      termsAcceptedAt: quoteRequests.termsAcceptedAt,
      truckTypeName: truckTypes.name,
      accountEmail: customers.email,
    })
    .from(quoteRequests)
    .leftJoin(truckTypes, eq(quoteRequests.assignedTruckTypeId, truckTypes.id))
    .leftJoin(customers, eq(quoteRequests.customerId, customers.id))
    .where(eq(quoteRequests.paymentStatus, "paid"))
    .orderBy(desc(quoteRequests.createdAt));

  return (
    <div className="mx-auto max-w-6xl">
      <OrdersManager initialOrders={orders} />
    </div>
  );
}
