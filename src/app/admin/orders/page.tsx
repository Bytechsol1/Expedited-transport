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
      truckTypeName: truckTypes.name,
      customerEmail: customers.email,
    })
    .from(quoteRequests)
    .leftJoin(truckTypes, eq(quoteRequests.assignedTruckTypeId, truckTypes.id))
    .leftJoin(customers, eq(quoteRequests.customerId, customers.id))
    .where(eq(quoteRequests.paymentStatus, "paid"))
    .orderBy(desc(quoteRequests.createdAt));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <OrdersManager initialOrders={orders} />
      </div>
    </main>
  );
}
