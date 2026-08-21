import { asc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { pricingSettings, quoteRequests, truckTypes } from "@/lib/db/schema";
import { geocodeAddress, GeocodeError } from "@/lib/here/geocode";
import { getTruckRoute, TruckRouteError } from "@/lib/here/truckRoute";
import { assignTruckType } from "@/lib/pricing/assignTruckType";
import { calculateQuote } from "@/lib/pricing/calculateQuote";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

const coordsSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  label: z.string(),
});

const requestSchema = z.object({
  pickupAddress: z.string().min(3),
  deliveryAddress: z.string().min(3),
  // When the client already resolved these addresses in a previous request
  // (i.e. only a quantity/dimension field changed, not the addresses), it
  // passes the cached coordinates back so we can skip re-geocoding — that's
  // the slowest part of each round trip.
  pickupCoords: coordsSchema.optional(),
  deliveryCoords: coordsSchema.optional(),
  pieces: z.number().int().positive(),
  pallets: z.number().int().min(0),
  weightLbs: z.number().positive(),
  lengthIn: z.number().positive(),
  widthIn: z.number().positive(),
  heightIn: z.number().positive(),
  hazmat: z.boolean().optional().default(false),
  truckTypeId: z.string().optional(),
});

export async function POST(request: Request) {
  const { allowed, retryAfterMs } = rateLimit(`quote:${getClientIp(request)}`, 20, 60_000);
  if (!allowed) {
    return Response.json(
      { ok: false, error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
    );
  }

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

    let truckType;
    if (body.truckTypeId) {
      truckType = activeTruckTypes.find((t) => t.id === body.truckTypeId);
      if (!truckType) {
        return Response.json({ ok: false, error: "Selected truck type is invalid or inactive." }, { status: 400 });
      }
    } else {
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

      truckType = activeTruckTypes.find((truck) => truck.id === assigned.id);
      if (!truckType) {
        throw new Error("Assigned truck type disappeared mid-request.");
      }
    }

    const [pickup, delivery] = await Promise.all([
      body.pickupCoords ?? geocodeAddress(body.pickupAddress),
      body.deliveryCoords ?? geocodeAddress(body.deliveryAddress),
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
      avgMpg: Number(truckType.avgMpg),
      fuelPricePerGallon: Number(settings.fuelPricePerGallon),
      markupPercent: Number(settings.markupPercent),
      minimumCharge: Number(settings.minimumCharge),
    });

    const [savedQuote] = await db
      .insert(quoteRequests)
      .values({
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
      })
      .returning({ id: quoteRequests.id });

    return Response.json({
      ok: true,
      oversized: false,
      quoteRequestId: savedQuote.id,
      truckType: { id: truckType.id, name: truckType.name },
      distanceMiles: Math.round(route.distanceMiles * 10) / 10,
      durationMinutes: Math.round(route.durationMinutes),
      pickupLabel: pickup.label,
      deliveryLabel: delivery.label,
      pickupCoords: { lat: pickup.lat, lng: pickup.lng, label: pickup.label },
      deliveryCoords: { lat: delivery.lat, lng: delivery.lng, label: delivery.label },
      price: breakdown.total,
    });
  } catch (error) {
    if (error instanceof GeocodeError || error instanceof TruckRouteError) {
      return Response.json({ ok: false, error: error.message }, { status: 422 });
    }

    const message = error instanceof Error ? error.message : "Unable to calculate a quote.";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
