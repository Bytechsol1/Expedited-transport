import { getHereApiKey } from "./client";

export type GeocodeResult = {
  lat: number;
  lng: number;
  label: string;
};

export class GeocodeError extends Error {}

export async function geocodeAddress(address: string): Promise<GeocodeResult> {
  const apiKey = getHereApiKey();
  const url = new URL("https://geocode.search.hereapi.com/v1/geocode");
  url.searchParams.set("q", address);
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("limit", "1");

  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    throw new GeocodeError(`HERE geocoding request failed (${response.status}).`);
  }

  const data = (await response.json()) as {
    items?: Array<{ position: { lat: number; lng: number }; address: { label: string } }>;
  };

  const item = data.items?.[0];
  if (!item) {
    throw new GeocodeError(`Could not find a location for "${address}".`);
  }

  return {
    lat: item.position.lat,
    lng: item.position.lng,
    label: item.address.label,
  };
}
