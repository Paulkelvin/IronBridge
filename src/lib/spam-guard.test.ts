import type { NextRequest } from "next/server"
import { describe, expect, it } from "vitest"
import { isLikelyBot, isRateLimited } from "./spam-guard"

function requestFrom(ip: string) {
  return { headers: new Headers({ "x-forwarded-for": `${ip}, 10.0.0.1` }) } as unknown as NextRequest
}

describe("isLikelyBot", () => {
  it("flags a filled-in honeypot field", () => {
    expect(isLikelyBot({ website: "https://spam.example", formElapsedMs: 60000 })).toBe(true)
  })

  it("flags forms submitted faster than a person could fill them in", () => {
    expect(isLikelyBot({ website: "", formElapsedMs: 800 })).toBe(true)
  })

  it("lets a normal submission through", () => {
    expect(isLikelyBot({ website: "", formElapsedMs: 45000 })).toBe(false)
  })

  it("lets requests without guard fields through so validation can respond", () => {
    expect(isLikelyBot({ name: "Jane" })).toBe(false)
    expect(isLikelyBot(null)).toBe(false)
  })
})

describe("isRateLimited", () => {
  it("allows five submissions and blocks the sixth from the same address", () => {
    const results = Array.from({ length: 6 }, () => isRateLimited(requestFrom("203.0.113.7")))
    expect(results).toEqual([false, false, false, false, false, true])
  })

  it("counts each address separately", () => {
    for (let i = 0; i < 6; i++) isRateLimited(requestFrom("203.0.113.8"))
    expect(isRateLimited(requestFrom("198.51.100.20"))).toBe(false)
  })
})
