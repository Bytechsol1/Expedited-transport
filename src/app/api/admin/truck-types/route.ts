import { asc } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { truckTypes } from "@/lib/db/schema";

export const runtime = "nodejs";

const hereVehicleProfileSchema = z.object({
  heightCm: z.number().positive(),
  widthCm: z.number().positive(),
  lengthCm: z.number().positive(),
  grossWeightKg: z.number().positive(),
  axleCount: z.number().int().positive(),
  hazmatClass: z.string().optional(),
  shippedHazardousGoods: z.boolean().optional(),
});

const truckTypeSchema = z.object({
  name: z.string().min(1),
  active: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
  maxWeightLbs: z.number().int().positive(),
  maxPallets: z.number().int().min(0),
  maxLengthIn: z.number().int().positive(),
  maxWidthIn: z.number().int().positive(),
  maxHeightIn: z.number().int().positive(),
  hereVehicleProfile: hereVehicleProfileSchema,
  costPerMile: z.number().nonnegative(),
  costPerHour: z.number().nonnegative(),
  avgMpg: z.number().positive(),
});

export async function GET() {
  const all = await db.select().from(truckTypes).orderBy(asc(truckTypes.sortOrder));
  return Response.json({ ok: true, truckTypes: all });
}

export async function POST(request: Request) {
  try {
    const body = truckTypeSchema.parse(await request.json());
    const [created] = await db
      .insert(truckTypes)
      .values({
        ...body,
        costPerMile: String(body.costPerMile),
        costPerHour: String(body.costPerHour),
        avgMpg: String(body.avgMpg),
      })
      .returning();

    return Response.json({ ok: true, truckType: created }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ ok: false, error: error.issues }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "Unable to create truck type.";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
