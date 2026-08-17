"use client";

import { useState, useEffect, use } from "react";
import { Search, Package } from "lucide-react";
import { fetchTrackingData } from "./actions";

export default function AccountTrackingPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const unwrappedParams = use(searchParams);
  const initialId = unwrappedParams?.id || "";

  const [trackingId, setTrackingId] = useState(initialId);
  const [shipment, setShipment] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!trackingId) return;

    setIsLoading(true);
    setError(null);
    setShipment(null);

    const result = await fetchTrackingData(trackingId);

    if (result.error) {
      setError(result.error);
    } else if (result.shipment) {
      setShipment(result.shipment);
      setEvents(result.events || []);
    }
    
    setIsLoading(false);
  };

  const formatDate = (date: Date | null | string) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric" }).format(new Date(date));
  };

  const formatCurrency = (val: string | number | null) => {
    if (!val) return "Pending";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(val));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.5rem" }}>
          Track Your Order
        </h1>
        <p style={{ color: "rgba(15,23,42,0.6)", margin: 0, fontSize: "1rem" }}>
          Enter your Tracking ID to check the latest shipment status.
        </p>
      </div>

      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", padding: "1.5rem" }}>
        <form onSubmit={handleTrack} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "250px", position: "relative" }}>
            <div style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(15,23,42,0.4)" }}>
              <Search size={20} />
            </div>
            <input 
              type="text" 
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Tracking ID" 
              required
              style={{
                width: "100%",
                padding: "1rem 1rem 1rem 3rem",
                borderRadius: "12px",
                border: "1px solid rgba(0,0,0,0.1)",
                fontSize: "1rem",
                outline: "none",
                fontFamily: "var(--font-geist-mono, monospace)"
              }}
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              padding: "0 2rem", 
              background: isLoading ? "#d4d4d8" : "#b6f000", 
              color: "#0a0f00", 
              borderRadius: "12px", 
              fontWeight: 700, 
              border: "none", 
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "1rem"
            }}
          >
            {isLoading ? "Searching..." : "Track Order"}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: "1rem", padding: "1rem", background: "#fef2f2", color: "#ef4444", borderRadius: "8px", fontSize: "0.9rem", fontWeight: 500 }}>
            {error}
          </div>
        )}
      </div>

      {shipment && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem", textTransform: "uppercase" }}>TRACKING ID</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0ea5e9", letterSpacing: "1px" }}>EXP-{shipment.id.split("-")[0].toUpperCase()}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem", textTransform: "uppercase" }}>CURRENT STATUS</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a" }}>
                  {shipment.fulfillmentStatus ? shipment.fulfillmentStatus.replace("_", " ").replace(/\b\w/g, (l: string) => l.toUpperCase()) : "Pending"}
                </div>
              </div>
            </div>

            <div style={{ margin: "2rem 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                <div style={{ position: "absolute", top: "12px", left: "10%", right: "10%", height: "2px", background: "rgba(0,0,0,0.05)", zIndex: 0 }} />
                
                {["confirmed", "dispatched", "in_transit", "delivered"].map((step, idx) => {
                  const event = events.find((e: any) => e.status === step);
                  const isCompleted = !!event;
                  const isCurrent = shipment?.fulfillmentStatus === step && shipment?.paymentStatus === "paid";
                  
                  return (
                    <div key={step} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", zIndex: 1, width: "25%" }}>
                      <div style={{ 
                        width: "24px", height: "24px", borderRadius: "50%", 
                        background: isCompleted ? "#b6f000" : "#fff",
                        border: `2px solid ${isCompleted ? "#b6f000" : "rgba(0,0,0,0.1)"}`,
                        boxShadow: isCurrent ? "0 0 0 4px rgba(182, 240, 0, 0.2)" : "none",
                      }} />
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: isCompleted ? "#0f172a" : "rgba(15,23,42,0.4)", textTransform: "uppercase" }}>
                          {step.replace("_", " ")}
                        </div>
                        {event && <div style={{ fontSize: "0.7rem", color: "rgba(15,23,42,0.5)" }}>{formatDate(event.createdAt)}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center", background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", marginBottom: "1rem" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem" }}>PICKUP</div>
                <div style={{ fontWeight: 600, color: "#0f172a" }}>{shipment.pickupAddress}</div>
              </div>
              <div style={{ color: "rgba(15,23,42,0.2)", fontSize: "1.5rem" }}>→</div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem" }}>DESTINATION</div>
                <div style={{ fontWeight: 600, color: "#0f172a" }}>{shipment.deliveryAddress}</div>
              </div>
            </div>
            
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: "2.5rem 0 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Package size={20} color="#0ea5e9" /> Order Information
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1.5rem", background: "#f8fafc", padding: "1.5rem", borderRadius: "12px", marginBottom: "0" }}>
              <div>
                <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem" }}>SERVICE TYPE</div>
                <div style={{ fontWeight: 600, color: "#0f172a" }}>{shipment.truckTypeName || "Standard"}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem" }}>PIECES</div>
                <div style={{ fontWeight: 600, color: "#0f172a" }}>{shipment.pieces || "—"}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem" }}>PALLETS</div>
                <div style={{ fontWeight: 600, color: "#0f172a" }}>{shipment.pallets || "—"}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem" }}>TOTAL WEIGHT</div>
                <div style={{ fontWeight: 600, color: "#0f172a" }}>{shipment.weightLbs ? `${shipment.weightLbs} lbs` : "—"}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem" }}>DISTANCE</div>
                <div style={{ fontWeight: 600, color: "#0f172a" }}>{shipment.distanceMiles ? `${shipment.distanceMiles} miles` : "—"}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "0.25rem" }}>PRICE</div>
                <div style={{ fontWeight: 600, color: "#0f172a" }}>{formatCurrency(shipment.price)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
