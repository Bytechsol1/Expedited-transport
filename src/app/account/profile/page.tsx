import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { customers } from "@/lib/db/schema";
import { User, Lock, Building, Phone, Mail } from "lucide-react";
import { AccountSignOutButton } from "@/components/AccountSignOutButton";

export const dynamic = "force-dynamic";

export default async function AccountProfilePage() {
  const session = await auth();
  const customerId = session?.user?.id as string | undefined;

  if (!customerId) return null;

  const [customer] = await db
    .select({
      email: customers.email,
      createdAt: customers.createdAt,
    })
    .from(customers)
    .where(eq(customers.id, customerId))
    .limit(1);

  if (!customer) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px" }}>
      <div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.25rem" }}>
          My Profile
        </h1>
        <p style={{ color: "rgba(15,23,42,0.6)", margin: 0, fontSize: "1rem" }}>
          Manage your personal and company information.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        {/* Profile Card */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: "0 0 1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <User size={20} color="#0ea5e9" /> Personal Information
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <User size={14} /> FULL NAME
              </label>
              <input 
                type="text" 
                defaultValue="Customer" 
                disabled
                style={{ padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.05)", color: "#0f172a", fontWeight: 500, fontSize: "1rem", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Mail size={14} /> EMAIL ADDRESS
              </label>
              <input 
                type="email" 
                defaultValue={customer.email} 
                disabled
                style={{ padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.05)", color: "#0f172a", fontWeight: 500, fontSize: "1rem", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Phone size={14} /> PHONE NUMBER
              </label>
              <input 
                type="tel" 
                placeholder="Not provided" 
                disabled
                style={{ padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.05)", color: "#0f172a", fontWeight: 500, fontSize: "1rem", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Building size={14} /> COMPANY NAME
              </label>
              <input 
                type="text" 
                placeholder="Not provided" 
                disabled
                style={{ padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.05)", color: "#0f172a", fontWeight: 500, fontSize: "1rem", outline: "none" }}
              />
            </div>

          </div>
          
          <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
            <button style={{ padding: "0.75rem 1.5rem", background: "#b6f000", color: "#0a0f00", borderRadius: "8px", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.95rem" }}>
              Save Changes
            </button>
          </div>
        </div>

        {/* Security / Account */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: "0 0 1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Lock size={20} color="#8b5cf6" /> Account
          </h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button style={{ padding: "0.75rem 1.5rem", background: "#f8fafc", color: "#0f172a", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem" }}>
              Change Password
            </button>
            <AccountSignOutButton />
          </div>
        </div>

      </div>
    </div>
  );
}
