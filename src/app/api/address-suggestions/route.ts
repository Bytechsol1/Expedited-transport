import { suggestAddresses } from "@/lib/here/autosuggest";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  const suggestions = await suggestAddresses(query);
  return Response.json({ ok: true, suggestions });
}
