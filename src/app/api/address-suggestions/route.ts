import { suggestAddresses } from "@/lib/here/autosuggest";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { allowed, retryAfterMs } = rateLimit(`suggest:${getClientIp(request)}`, 30, 60_000);
  if (!allowed) {
    return Response.json(
      { ok: false, error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
    );
  }

  const query = new URL(request.url).searchParams.get("q") ?? "";
  const suggestions = await suggestAddresses(query);
  return Response.json({ ok: true, suggestions });
}
