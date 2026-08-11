import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { orderStatusEvents, quoteRequests, truckTypes } from "@/lib/db/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { FooterSection } from "@/components/FooterSection";
import { AccountSignOutButton } from "@/components/AccountSignOutButton";
import { OrderCard, type OrderCardData } from "@/components/OrderCard";

export const dynamic = "force-dynamic";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const session = await auth();
  const customerId = session?.user?.id as string | undefined;
  const { payment } = await searchParams;

  const orders = customerId
    ? await db
        .select({
          id: quoteRequests.id,
          pickupAddress: quoteRequests.pickupAddress,
          deliveryAddress: quoteRequests.deliveryAddress,
          price: quoteRequests.price,
          paidAt: quoteRequests.paidAt,
          fulfillmentStatus: quoteRequests.fulfillmentStatus,
          truckTypeName: truckTypes.name,
        })
        .from(quoteRequests)
        .leftJoin(truckTypes, eq(quoteRequests.assignedTruckTypeId, truckTypes.id))
        .where(and(eq(quoteRequests.customerId, customerId), eq(quoteRequests.paymentStatus, "paid")))
        .orderBy(desc(quoteRequests.createdAt))
    : [];

  const orderIds = orders.map((o) => o.id);
  const events = orderIds.length
    ? await db
        .select()
        .from(orderStatusEvents)
        .where(inArray(orderStatusEvents.quoteRequestId, orderIds))
        .orderBy(asc(orderStatusEvents.createdAt))
    : [];

  const orderCards: OrderCardData[] = orders.map((order) => {
    const stageDates: OrderCardData["stageDates"] = {};
    for (const event of events) {
      if (event.quoteRequestId !== order.id) continue;
      const key = event.status as keyof OrderCardData["stageDates"];
      if (!stageDates[key]) stageDates[key] = event.createdAt;
    }
    return { ...order, stageDates };
  });

  return (
    <>
      <SiteHeader />
      <main
        style={{
          minHeight: "70vh",
          padding: "8rem 1.5rem 5rem",
          background: "#f7f9f7",
        }}
      >
        <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
          {payment === "success" ? (
            <div
              style={{
                background: "rgba(171,255,2,0.14)",
                border: "1px solid rgba(171,255,2,0.4)",
                color: "var(--c-dark-green)",
                borderRadius: "0.75rem",
                padding: "0.9rem 1.1rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                marginBottom: "1.5rem",
              }}
            >
              Payment received — thank you! We&apos;ll be in touch to schedule your pickup.
            </div>
          ) : null}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <div>
              <h1 style={{ fontSize: "1.9rem", fontWeight: 800, color: "var(--c-dark-green)", margin: 0 }}>
                My Orders
              </h1>
              <p style={{ fontSize: "0.9rem", color: "rgba(5, 36, 36, 0.6)", margin: "0.25rem 0 0" }}>
                {session?.user?.email}
              </p>
            </div>
            <AccountSignOutButton />
          </div>

          {orderCards.length === 0 ? (
            <p style={{ color: "rgba(5, 36, 36, 0.6)" }}>
              You don&apos;t have any paid orders yet. Once you complete a shipment payment, it will show up here.
            </p>
          ) : (
            orderCards.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </div>
      </main>
      <FooterSection />
    </>
  );
}
