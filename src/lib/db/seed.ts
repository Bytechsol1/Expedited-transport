import { config } from "dotenv";
import bcrypt from "bcryptjs";
import { db } from "./client";
import { adminUsers, pricingSettings, truckTypes } from "./schema";

config({ path: ".env.local", quiet: true });

async function main() {
  console.log("Seeding placeholder data. Update real rates/thresholds from /admin/rates after launch.");

  await db
    .insert(truckTypes)
    .values([
      {
        name: "Sprinter Van",
        sortOrder: 1,
        maxWeightLbs: 3000,
        maxPallets: 2,
        maxLengthIn: 140,
        maxWidthIn: 70,
        maxHeightIn: 70,
        hereVehicleProfile: {
          heightCm: 259,
          widthCm: 213,
          lengthCm: 700,
          grossWeightKg: 3500,
          axleCount: 2,
        },
        costPerMile: "1.75",
        costPerHour: "45",
        avgMpg: "18",
      },
      {
        name: "Box Truck 16ft",
        sortOrder: 2,
        maxWeightLbs: 7000,
        maxPallets: 8,
        maxLengthIn: 192,
        maxWidthIn: 96,
        maxHeightIn: 96,
        hereVehicleProfile: {
          heightCm: 320,
          widthCm: 244,
          lengthCm: 780,
          grossWeightKg: 6350,
          axleCount: 2,
        },
        costPerMile: "2.25",
        costPerHour: "55",
        avgMpg: "12",
      },
      {
        name: "Straight Truck 24ft",
        sortOrder: 3,
        maxWeightLbs: 13000,
        maxPallets: 14,
        maxLengthIn: 288,
        maxWidthIn: 96,
        maxHeightIn: 108,
        hereVehicleProfile: {
          heightCm: 366,
          widthCm: 244,
          lengthCm: 950,
          grossWeightKg: 11793,
          axleCount: 2,
        },
        costPerMile: "2.75",
        costPerHour: "65",
        avgMpg: "9",
      },
      {
        name: "Flatbed / Dry Van 53ft",
        sortOrder: 4,
        maxWeightLbs: 45000,
        maxPallets: 26,
        maxLengthIn: 636,
        maxWidthIn: 102,
        maxHeightIn: 110,
        hereVehicleProfile: {
          heightCm: 411,
          widthCm: 259,
          lengthCm: 1650,
          grossWeightKg: 36287,
          axleCount: 5,
        },
        costPerMile: "3.5",
        costPerHour: "85",
        avgMpg: "6.5",
      },
    ])
    .onConflictDoNothing();

  await db.insert(pricingSettings).values({
    fuelPricePerGallon: "3.75",
    markupPercent: "85",
    minimumCharge: "150",
    updatedBy: "seed",
  });

  const seedEmail = process.env.SEED_ADMIN_EMAIL;
  const seedPassword = process.env.SEED_ADMIN_PASSWORD;

  if (seedEmail && seedPassword) {
    const passwordHash = await bcrypt.hash(seedPassword, 12);
    await db
      .insert(adminUsers)
      .values({ email: seedEmail, passwordHash, role: "admin" })
      .onConflictDoNothing();
    console.log(`Seeded admin user: ${seedEmail}`);
  } else {
    console.warn(
      "SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set — skipping admin user seed. Set them in .env.local and re-run `npm run db:seed` to create your first admin login."
    );
  }

  console.log("Seed complete.");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
