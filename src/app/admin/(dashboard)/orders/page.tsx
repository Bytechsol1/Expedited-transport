import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { customers, quoteRequests, truckTypes } from "@/lib/db/schema";
import { OrdersManager } from "@/components/admin/OrdersManager";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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
    .orderBy(desc(quoteRequests.createdAt));

  return (
    <div className="mx-auto max-w-6xl">
      <OrdersManager initialOrders={orders} />
    </div>
  );
}
