import { config } from "dotenv";
import { db } from "./src/lib/db/client";
import { truckTypes } from "./src/lib/db/schema";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });

async function main() {
  const allTrucks = await db.select().from(truckTypes).orderBy(truckTypes.sortOrder);
  
  const newNames = [
    "Expedited Trucking",
    "Freight Shipping",
    "Dry Van Trucking",
    "Logistics Services",
    "LTL Trucking"
  ];

  for (let i = 0; i < allTrucks.length; i++) {
    if (i < newNames.length) {
      await db.update(truckTypes)
        .set({ name: newNames[i] })
        .where(eq(truckTypes.id, allTrucks[i].id));
      console.log(`Updated ${allTrucks[i].name} -> ${newNames[i]}`);
    }
  }

  // If there are more new names than existing trucks, insert the rest using the last truck's dimensions
  if (newNames.length > allTrucks.length) {
    const lastTruck = allTrucks[allTrucks.length - 1];
    for (let i = allTrucks.length; i < newNames.length; i++) {
      await db.insert(truckTypes).values({
        name: newNames[i],
        sortOrder: i + 1,
        maxWeightLbs: lastTruck.maxWeightLbs,
        maxPallets: lastTruck.maxPallets,
        maxLengthIn: lastTruck.maxLengthIn,
        maxWidthIn: lastTruck.maxWidthIn,
        maxHeightIn: lastTruck.maxHeightIn,
        hereVehicleProfile: lastTruck.hereVehicleProfile,
        costPerMile: lastTruck.costPerMile,
        costPerHour: lastTruck.costPerHour,
        avgMpg: lastTruck.avgMpg,
      });
      console.log(`Inserted ${newNames[i]}`);
    }
  }

  console.log("Done");
  process.exit(0);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
