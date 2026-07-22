import { asc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { pricingSettings, quoteRequests, truckTypes } from "@/lib/db/schema";
import { geocodeAddress, GeocodeError } from "@/lib/here/geocode";
import { getTruckRoute, TruckRouteError } from "@/lib/here/truckRoute";
import { assignTruckType } from "@/lib/pricing/assignTruckType";
import { calculateQuote } from "@/lib/pricing/calculateQuote";

export const runtime = "nodejs";

const requestSchema = z.object({
  pickupAddress: z.string().min(3),
  deliveryAddress: z.string().min(3),
  pieces: z.number().int().positive(),
  pallets: z.number().int().min(0),
  weightLbs: z.number().positive(),
  lengthIn: z.number().positive(),
  widthIn: z.number().positive(),
  heightIn: z.number().positive(),
  hazmat: z.boolean().optional().default(false),
});

export async function POST(request: Request) {
  let body: z.infer<typeof requestSchema>;
  try {
    body = requestSchema.parse(await request.json());
  } catch {
    return Response.json({ ok: false, error: "Invalid quote request." }, { status: 400 });
  }

  try {
    const activeTruckTypes = await db
      .select()
      .from(truckTypes)
      .where(eq(truckTypes.active, true))
      .orderBy(asc(truckTypes.sortOrder));

    const assigned = assignTruckType(
      {
        weightLbs: body.weightLbs,
        pallets: body.pallets,
        lengthIn: body.lengthIn,
        widthIn: body.widthIn,
        heightIn: body.heightIn,
      },
      activeTruckTypes.map((truck) => ({
        id: truck.id,
        maxWeightLbs: truck.maxWeightLbs,
        maxPallets: truck.maxPallets,
        maxLengthIn: truck.maxLengthIn,
        maxWidthIn: truck.maxWidthIn,
        maxHeightIn: truck.maxHeightIn,
      }))
    );

    if (!assigned) {
      await db.insert(quoteRequests).values({
        pickupAddress: body.pickupAddress,
        deliveryAddress: body.deliveryAddress,
        pieces: body.pieces,
        pallets: body.pallets,
        weightLbs: Math.round(body.weightLbs),
        lengthIn: Math.round(body.lengthIn),
        widthIn: Math.round(body.widthIn),
        heightIn: Math.round(body.heightIn),
        hazmat: body.hazmat,
        status: "oversized",
      });

      return Response.json({ ok: true, oversized: true });
    }

    const truckType = activeTruckTypes.find((truck) => truck.id === assigned.id);
    if (!truckType) {
      throw new Error("Assigned truck type disappeared mid-request.");
    }

    const [pickup, delivery] = await Promise.all([
      geocodeAddress(body.pickupAddress),
      geocodeAddress(body.deliveryAddress),
    ]);

    const route = await getTruckRoute(
      { lat: pickup.lat, lng: pickup.lng },
      { lat: delivery.lat, lng: delivery.lng },
      truckType.hereVehicleProfile
    );

    const [settings] = await db.select().from(pricingSettings).limit(1);
    if (!settings) {
      throw new Error("Pricing settings are not configured.");
    }

    const breakdown = calculateQuote({
      distanceMiles: route.distanceMiles,
      durationMinutes: route.durationMinutes,
      costPerMile: Number(truckType.costPerMile),
      costPerHour: Number(truckType.costPerHour),
      minimumCharge: Number(settings.minimumCharge),
      fuelSurchargePercent: Number(settings.fuelSurchargePercent),
    });

    await db.insert(quoteRequests).values({
      pickupAddress: pickup.label,
      deliveryAddress: delivery.label,
      pickupLat: String(pickup.lat),
      pickupLng: String(pickup.lng),
      deliveryLat: String(delivery.lat),
      deliveryLng: String(delivery.lng),
      pieces: body.pieces,
      pallets: body.pallets,
      weightLbs: Math.round(body.weightLbs),
      lengthIn: Math.round(body.lengthIn),
      widthIn: Math.round(body.widthIn),
      heightIn: Math.round(body.heightIn),
      hazmat: body.hazmat,
      assignedTruckTypeId: truckType.id,
      distanceMiles: String(route.distanceMiles.toFixed(2)),
      durationMinutes: String(route.durationMinutes.toFixed(2)),
      price: String(breakdown.total.toFixed(2)),
      status: "quoted",
    });

    return Response.json({
      ok: true,
      oversized: false,
      truckType: { id: truckType.id, name: truckType.name },
      distanceMiles: Math.round(route.distanceMiles * 10) / 10,
      durationMinutes: Math.round(route.durationMinutes),
      pickupLabel: pickup.label,
      deliveryLabel: delivery.label,
      breakdown,
    });
  } catch (error) {
    if (error instanceof GeocodeError || error instanceof TruckRouteError) {
      return Response.json({ ok: false, error: error.message }, { status: 422 });
    }

    const message = error instanceof Error ? error.message : "Unable to calculate a quote.";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
