import { z } from "zod";
import { db } from "@/lib/db/client";
import { pricingSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const settingsSchema = z.object({
  fuelPricePerGallon: z.number().positive(),
  markupPercent: z.number().min(0),
  minimumCharge: z.number().min(0),
});

export async function GET() {
  const [settings] = await db.select().from(pricingSettings).limit(1);
  return Response.json({ ok: true, settings: settings ?? null });
}

export async function PUT(request: Request) {
  try {
    const body = settingsSchema.parse(await request.json());
    const session = await auth();
    const [existing] = await db.select().from(pricingSettings).limit(1);

    if (!existing) {
      const [created] = await db
        .insert(pricingSettings)
        .values({
          fuelPricePerGallon: String(body.fuelPricePerGallon),
          markupPercent: String(body.markupPercent),
          minimumCharge: String(body.minimumCharge),
          updatedBy: session?.user?.email ?? "admin",
        })
        .returning();

      return Response.json({ ok: true, settings: created }, { status: 201 });
    }

    const [updated] = await db
      .update(pricingSettings)
      .set({
        fuelPricePerGallon: String(body.fuelPricePerGallon),
        markupPercent: String(body.markupPercent),
        minimumCharge: String(body.minimumCharge),
        updatedAt: new Date(),
        updatedBy: session?.user?.email ?? "admin",
      })
      .where(eq(pricingSettings.id, existing.id))
      .returning();

    return Response.json({ ok: true, settings: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ ok: false, error: error.issues }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "Unable to update pricing settings.";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
