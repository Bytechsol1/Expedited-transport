type Bucket = { count: number; resetAt: number };

// In-memory sliding-window limiter. Good enough for a single long-running
// process (e.g. the Docker deployment this repo also supports); on
// serverless (Vercel) it's per-instance rather than global, so it blunts
// bursts from one client but isn't a hard global cap — pair with a proper
// shared store (Redis, Upstash) if stricter enforcement is ever needed.
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();

  // Opportunistic cleanup so this map doesn't grow unbounded over a long
  // process lifetime.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (now > v.resetAt) buckets.delete(k);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (bucket.count >= limit) {
    return { allowed: false, retryAfterMs: bucket.resetAt - now };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") || "unknown";
}
