import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { customers } from "@/lib/db/schema";
import { ProfileForm } from "./ProfileForm";
import { AccountSignOutButton } from "@/components/AccountSignOutButton";
import { LogOut } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AccountProfilePage() {
  const session = await auth();
  const customerId = session?.user?.id as string | undefined;

  if (!customerId) return null;

  const [customer] = await db
    .select({
      email: customers.email,
      fullName: customers.fullName,
      phone: customers.phone,
      company: customers.company,
      createdAt: customers.createdAt,
    })
    .from(customers)
    .where(eq(customers.id, customerId))
    .limit(1);

  if (!customer) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.25rem" }}>
            My Profile
          </h1>
          <p style={{ color: "rgba(15,23,42,0.6)", margin: 0, fontSize: "1rem" }}>
            Manage your personal and company information.
          </p>
        </div>
        <AccountSignOutButton />
      </div>

      <ProfileForm initialData={customer} />
    </div>
  );
}
