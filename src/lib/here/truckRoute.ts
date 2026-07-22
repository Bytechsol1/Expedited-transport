import type { HereVehicleProfile } from "@/lib/db/schema";
import { getHereApiKey } from "./client";

export type TruckRouteResult = {
  distanceMiles: number;
  durationMinutes: number;
};

export class TruckRouteError extends Error {}

const METERS_PER_MILE = 1609.344;

export async function getTruckRoute(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  profile: HereVehicleProfile
): Promise<TruckRouteResult> {
  const apiKey = getHereApiKey();
  const url = new URL("https://router.hereapi.com/v8/routes");
  url.searchParams.set("transportMode", "truck");
  url.searchParams.set("origin", `${origin.lat},${origin.lng}`);
  url.searchParams.set("destination", `${destination.lat},${destination.lng}`);
  url.searchParams.set("return", "summary");
  url.searchParams.set("truck[grossWeight]", String(Math.round(profile.grossWeightKg)));
  url.searchParams.set("truck[height]", String(Math.round(profile.heightCm)));
  url.searchParams.set("truck[width]", String(Math.round(profile.widthCm)));
  url.searchParams.set("truck[length]", String(Math.round(profile.lengthCm)));
  url.searchParams.set("truck[axleCount]", String(profile.axleCount));
  if (profile.shippedHazardousGoods && profile.hazmatClass) {
    url.searchParams.set("truck[shippedHazardousGoods]", profile.hazmatClass);
  }
  url.searchParams.set("apiKey", apiKey);

  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    throw new TruckRouteError(`HERE truck routing request failed (${response.status}).`);
  }

  const data = (await response.json()) as {
    routes?: Array<{
      sections?: Array<{ summary?: { length: number; duration: number } }>;
    }>;
  };

  const sections = data.routes?.[0]?.sections;
  if (!sections || sections.length === 0) {
    throw new TruckRouteError("No truck-legal route found between these addresses.");
  }

  const totalMeters = sections.reduce((sum, section) => sum + (section.summary?.length ?? 0), 0);
  const totalSeconds = sections.reduce((sum, section) => sum + (section.summary?.duration ?? 0), 0);

  return {
    distanceMiles: totalMeters / METERS_PER_MILE,
    durationMinutes: totalSeconds / 60,
  };
}
