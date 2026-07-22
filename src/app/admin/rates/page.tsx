import { asc } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { pricingSettings, truckTypes } from "@/lib/db/schema";
import { RatesManager } from "@/components/admin/RatesManager";

export const dynamic = "force-dynamic";

export default async function AdminRatesPage() {
  const [initialTruckTypes, settingsRows] = await Promise.all([
    db.select().from(truckTypes).orderBy(asc(truckTypes.sortOrder)),
    db.select().from(pricingSettings).limit(1),
  ]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <RatesManager initialTruckTypes={initialTruckTypes} initialSettings={settingsRows[0] ?? null} />
      </div>
    </main>
  );
}
