import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { CustomerNav } from "@/components/CustomerNav";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (!session?.user || role !== "customer") {
    redirect("/login");
  }

  return (
    <>
      <SiteHeader />
      <main
        style={{
          minHeight: "100vh",
          paddingTop: "6rem",
          background: "#f4f7f6",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "2rem 1.5rem 5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <CustomerNav />
            <div style={{ flex: 1 }}>{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}
