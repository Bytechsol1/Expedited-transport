import { getHereApiKey } from "./client";

// Continental US center — used as a broad bias point when no user location is known.
const DEFAULT_BIAS = { lat: 39.8283, lng: -98.5795 };

export type AddressSuggestion = {
  id: string;
  label: string;
};

export async function suggestAddresses(query: string): Promise<AddressSuggestion[]> {
  if (query.trim().length < 3) return [];

  const apiKey = getHereApiKey();
  const url = new URL("https://autosuggest.search.hereapi.com/v1/autosuggest");
  url.searchParams.set("q", query);
  url.searchParams.set("at", `${DEFAULT_BIAS.lat},${DEFAULT_BIAS.lng}`);
  url.searchParams.set("in", "countryCode:USA");
  url.searchParams.set("limit", "5");
  url.searchParams.set("apiKey", apiKey);

  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as {
    items?: Array<{ id?: string; title: string; resultType: string }>;
  };

  return (data.items ?? [])
    .filter((item) => item.resultType !== "categoryQuery")
    .map((item, index) => ({ id: item.id ?? `${index}`, label: item.title }));
}
