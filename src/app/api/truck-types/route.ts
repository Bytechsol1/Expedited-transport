import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { truckTypes } from "@/lib/db/schema";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { allowed, retryAfterMs } = rateLimit(`truck-types:${getClientIp(request)}`, 100, 60_000);
  if (!allowed) {
    return Response.json(
      { ok: false, error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
    );
  }

  try {
    const activeTruckTypes = await db
      .select({
        id: truckTypes.id,
        name: truckTypes.name,
      })
      .from(truckTypes)
      .where(eq(truckTypes.active, true))
      .orderBy(asc(truckTypes.sortOrder));

    return Response.json({ ok: true, truckTypes: activeTruckTypes });
  } catch (error) {
    return Response.json({ ok: false, error: "Unable to fetch truck types." }, { status: 500 });
  }
}
