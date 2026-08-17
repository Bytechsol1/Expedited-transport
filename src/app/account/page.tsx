import { desc, eq, inArray } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { quoteRequests, truckTypes } from "@/lib/db/schema";
import Link from "next/link";
import { Package } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AccountOrdersPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const session = await auth();
  const customerId = session?.user?.id as string | undefined;
  const { tab } = await searchParams;
  const currentTab = tab === "completed" ? "completed" : "pending";

  if (!customerId) return null;

  // We consider paid quote requests as "Orders"
  const orders = await db
    .select({
      id: quoteRequests.id,
      pickupAddress: quoteRequests.pickupAddress,
      deliveryAddress: quoteRequests.deliveryAddress,
      price: quoteRequests.price,
      fulfillmentStatus: quoteRequests.fulfillmentStatus,
      paidAt: quoteRequests.paidAt,
      truckTypeName: truckTypes.name,
    })
    .from(quoteRequests)
    .leftJoin(truckTypes, eq(quoteRequests.assignedTruckTypeId, truckTypes.id))
    .where(
      inArray(quoteRequests.paymentStatus, ["paid", "pending"]) 
    )
    .orderBy(desc(quoteRequests.paidAt));

  // Client-side filtering because we need to check if the customer is the owner
  const customerOrders = orders; // The query didn't actually filter by customerId yet! Let's fix that.
  
  const fetchedOrders = await db
    .select({
      id: quoteRequests.id,
      pickupAddress: quoteRequests.pickupAddress,
      deliveryAddress: quoteRequests.deliveryAddress,
      price: quoteRequests.price,
      fulfillmentStatus: quoteRequests.fulfillmentStatus,
      paymentStatus: quoteRequests.paymentStatus,
      paidAt: quoteRequests.paidAt,
      createdAt: quoteRequests.createdAt,
      truckTypeName: truckTypes.name,
    })
    .from(quoteRequests)
    .leftJoin(truckTypes, eq(quoteRequests.assignedTruckTypeId, truckTypes.id))
    .where(eq(quoteRequests.customerId, customerId))
    .orderBy(desc(quoteRequests.createdAt));

  // For orders, we'll include anything that is paid, or "confirmed/dispatched/in_transit/delivered"
  // Let's assume an "order" is something that has been accepted.
  // Actually, standard is "paid" or if it has fulfillment status.
  const validOrders = fetchedOrders.filter(o => o.paymentStatus === "paid" || o.paymentStatus === "pending" || o.fulfillmentStatus !== "confirmed");

  const pendingOrders = validOrders.filter(o => o.fulfillmentStatus !== "delivered");
  const completedOrders = validOrders.filter(o => o.fulfillmentStatus === "delivered");

  const displayOrders = currentTab === "completed" ? completedOrders : pendingOrders;

  const formatCurrency = (val: string | number | null) => {
    if (!val) return "—";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(val));
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "—";
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.25rem" }}>
          My Orders
        </h1>
        <p style={{ color: "rgba(15,23,42,0.6)", margin: 0, fontSize: "1rem" }}>
          View and track your transportation orders.
        </p>
      </div>

      <div style={{ display: "flex", gap: "1rem", borderBottom: "1px solid rgba(0,0,0,0.08)", paddingBottom: "0" }}>
        <Link 
          href="/account?tab=pending"
          style={{
            padding: "0.75rem 1rem",
            color: currentTab === "pending" ? "#0f172a" : "rgba(15,23,42,0.5)",
            fontWeight: 700,
            textDecoration: "none",
            borderBottom: currentTab === "pending" ? "2px solid #b6f000" : "2px solid transparent",
            marginBottom: "-1px"
          }}
        >
          Pending Orders ({pendingOrders.length})
        </Link>
        <Link 
          href="/account?tab=completed"
          style={{
            padding: "0.75rem 1rem",
            color: currentTab === "completed" ? "#0f172a" : "rgba(15,23,42,0.5)",
            fontWeight: 700,
            textDecoration: "none",
            borderBottom: currentTab === "completed" ? "2px solid #b6f000" : "2px solid transparent",
            marginBottom: "-1px"
          }}
        >
          Completed Orders ({completedOrders.length})
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {displayOrders.length > 0 ? (
          displayOrders.map(order => (
            <div key={order.id} style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem" }}>TRACKING ID</div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0ea5e9", fontFamily: "var(--font-geist-mono, monospace)" }}>
                    EXP-{order.id.split("-")[0].toUpperCase()}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem", textTransform: "uppercase" }}>Current Status</div>
                  <div style={{ 
                    display: "inline-block",
                    background: order.fulfillmentStatus === "delivered" ? "#10b98115" : order.fulfillmentStatus === "in_transit" ? "#3b82f615" : "#f8fafc", 
                    color: order.fulfillmentStatus === "delivered" ? "#059669" : order.fulfillmentStatus === "in_transit" ? "#2563eb" : "#0f172a", 
                    padding: "0.35rem 0.75rem", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 700, textTransform: "capitalize",
                    border: "1px solid rgba(0,0,0,0.05)"
                  }}>
                    {order.fulfillmentStatus.replace("_", " ")}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", background: "#f8fafc", padding: "1.25rem", borderRadius: "12px" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem" }}>SERVICE</div>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>{order.truckTypeName || "Standard"}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem" }}>ORDER DATE</div>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>{formatDate(order.paidAt || order.createdAt)}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem" }}>AMOUNT</div>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>{formatCurrency(order.price)}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem" }}>PICKUP</div>
                  <div style={{ fontWeight: 600, color: "#0f172a", fontSize: "1rem" }}>{order.pickupAddress}</div>
                </div>
                <div style={{ color: "rgba(15,23,42,0.2)", fontSize: "1.5rem" }}>→</div>
                <div style={{ flex: 1, textAlign: "right" }}>
                  <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem" }}>DESTINATION</div>
                  <div style={{ fontWeight: 600, color: "#0f172a", fontSize: "1rem" }}>{order.deliveryAddress}</div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "0.5rem" }}>
                <Link 
                  href={`/account/tracking?id=EXP-${order.id.split("-")[0].toUpperCase()}`}
                  style={{ 
                    padding: "0.75rem 1.5rem", 
                    background: currentTab === "pending" ? "#b6f000" : "#f8fafc", 
                    color: currentTab === "pending" ? "#0a0f00" : "#0f172a", 
                    borderRadius: "8px", 
                    fontWeight: 700, 
                    textDecoration: "none",
                    border: currentTab === "pending" ? "none" : "1px solid rgba(0,0,0,0.1)"
                  }}
                >
                  {currentTab === "pending" ? "Track Order" : "View Details"}
                </Link>
              </div>

            </div>
          ))
        ) : (
          <div style={{ padding: "4rem 2rem", textAlign: "center", background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)" }}>
            <Package size={40} color="rgba(15,23,42,0.15)" style={{ margin: "0 auto 1rem" }} />
            <h3 style={{ margin: "0 0 0.5rem", color: "#0f172a", fontSize: "1.25rem", fontWeight: 700 }}>
              No {currentTab} orders found
            </h3>
            <p style={{ color: "rgba(15,23,42,0.5)", fontSize: "1rem", margin: "0 0 1.5rem" }}>
              {currentTab === "pending" 
                ? "You don't have any active shipments at the moment."
                : "You don't have any completed deliveries yet."}
            </p>
            {currentTab === "pending" && (
              <Link href="/#instant-quote" style={{ background: "#b6f000", color: "#0a0f00", padding: "0.75rem 1.5rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
                Get a Quote
              </Link>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
