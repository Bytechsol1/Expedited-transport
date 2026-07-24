import { eq } from "drizzle-orm";
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

const truckTypeUpdateSchema = z.object({
  name: z.string().min(1),
  active: z.boolean(),
  sortOrder: z.number().int(),
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

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const body = truckTypeUpdateSchema.parse(await request.json());
    const [updated] = await db
      .update(truckTypes)
      .set({
        ...body,
        costPerMile: String(body.costPerMile),
        costPerHour: String(body.costPerHour),
        avgMpg: String(body.avgMpg),
        updatedAt: new Date(),
      })
      .where(eq(truckTypes.id, id))
      .returning();

    if (!updated) {
      return Response.json({ ok: false, error: "Truck type not found." }, { status: 404 });
    }

    return Response.json({ ok: true, truckType: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ ok: false, error: error.issues }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "Unable to update truck type.";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await db.delete(truckTypes).where(eq(truckTypes.id, id));
  return Response.json({ ok: true });
}
