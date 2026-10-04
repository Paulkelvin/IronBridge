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

export function isRateLimited(
  req: NextRequest,
  { bucket = "forms", max = RATE_MAX_PER_WINDOW, windowMs = RATE_WINDOW_MS }: { bucket?: string, max?: number, windowMs?: number } = {}
): boolean {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const key = `${bucket}:${ip}`
  const now = Date.now()
  const recent = (recentSubmissions.get(key) ?? []).filter((t) => now - t < windowMs)
  recent.push(now)
  recentSubmissions.set(key, recent)
  return recent.length > max
}
