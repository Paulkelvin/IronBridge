import type { NextRequest } from "next/server"

const MIN_FILL_MS = 3000
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX_PER_WINDOW = 5

// Per-instance only (serverless instances don't share memory), so this slows
// bursts from one address rather than enforcing a strict global limit.
const recentSubmissions = new Map<string, number[]>()

export function isLikelyBot(body: unknown): boolean {
  if (!body || typeof body !== "object") return false
  const { website, formElapsedMs } = body as { website?: unknown, formElapsedMs?: unknown }
  if (typeof website === "string" && website.trim() !== "") return true
  if (typeof formElapsedMs === "number" && formElapsedMs < MIN_FILL_MS) return true
  return false
}

export function isRateLimited(req: NextRequest): boolean {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const now = Date.now()
  const recent = (recentSubmissions.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  recentSubmissions.set(ip, recent)
  return recent.length > RATE_MAX_PER_WINDOW
}
