import { NextRequest } from "next/server"
import { afterEach, describe, expect, it, vi } from "vitest"

const create = vi.fn()
const sendAssistantLeadEmail = vi.fn()
vi.mock("@/lib/email", () => ({ sendAssistantLeadEmail }))
vi.mock("openai", () => ({
  default: vi.fn(function OpenAI() {
    return { responses: { create } }
  }),
}))

function post(body: unknown, ip = "198.51.100.1") {
  return new NextRequest("http://localhost/api/assistant", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  })
}

async function loadRoute() {
  vi.resetModules()
  return import("./route")
}

afterEach(() => {
  vi.unstubAllEnvs()
  create.mockReset()
  sendAssistantLeadEmail.mockReset()
})

describe("POST /api/assistant", () => {
  it("points to the quote form when the OpenAI key isn't configured", async () => {
    vi.stubEnv("OPENAI_API_KEY", "")
    vi.spyOn(console, "error").mockImplementation(() => {})
    const { POST } = await loadRoute()
    const res = await POST(post({ messages: [{ role: "user", content: "Hi" }] }))
    expect(res.status).toBe(503)
    const { error } = await res.json()
    expect(error).toContain("/request-a-quote")
    expect(error).not.toMatch(/\d{3}-\d{4}/)
  })

  it("rejects conversations that are too long or don't end with the visitor", async () => {
    vi.stubEnv("OPENAI_API_KEY", "sk-test")
    const { POST } = await loadRoute()
    const tooLong = Array.from({ length: 25 }, (_, i) => ({ role: i % 2 ? "assistant" : "user", content: "hello" }))
    expect((await POST(post({ messages: tooLong }, "198.51.100.2"))).status).toBe(422)
    expect((await POST(post({ messages: [{ role: "assistant", content: "hi" }] }, "198.51.100.2"))).status).toBe(422)
  })

  it("streams reply text as newline-delimited JSON", async () => {
    vi.stubEnv("OPENAI_API_KEY", "sk-test")
    create.mockResolvedValue((async function* () {
      yield { type: "response.output_text.delta", delta: "Yes, we cover Bowie." }
      yield { type: "response.completed", response: { output: [] } }
    })())
    const { POST } = await loadRoute()
    const res = await POST(post({ messages: [{ role: "user", content: "Do you cover Bowie?" }] }, "198.51.100.3"))
    expect(res.headers.get("content-type")).toContain("application/x-ndjson")
    const lines = (await res.text()).trim().split("\n").map((l) => JSON.parse(l))
    expect(lines).toEqual([{ type: "text", delta: "Yes, we cover Bowie." }])
  })

  it("turns an OpenAI failure into the friendly fallback message", async () => {
    vi.stubEnv("OPENAI_API_KEY", "sk-test")
    vi.spyOn(console, "error").mockImplementation(() => {})
    create.mockRejectedValue(new Error("401 invalid key"))
    const { POST } = await loadRoute()
    const res = await POST(post({ messages: [{ role: "user", content: "Hi" }] }, "198.51.100.4"))
    const lines = (await res.text()).trim().split("\n").map((l) => JSON.parse(l))
    expect(lines).toEqual([{ type: "error", message: expect.stringContaining("/request-a-quote") }])
  })

  it("limits each visitor to 30 messages per 10 minutes", async () => {
    vi.stubEnv("OPENAI_API_KEY", "")
    vi.spyOn(console, "error").mockImplementation(() => {})
    const { POST } = await loadRoute()
    const statuses: number[] = []
    for (let i = 0; i < 31; i++) statuses.push((await POST(post({ messages: [{ role: "user", content: "Hi" }] }, "198.51.100.9"))).status)
    expect(statuses.slice(0, 30).every((s) => s === 503)).toBe(true)
    expect(statuses[30]).toBe(429)
  })

  it("sends at most 3 lead emails per visitor per hour", async () => {
    vi.stubEnv("OPENAI_API_KEY", "sk-test")
    vi.spyOn(console, "error").mockImplementation(() => {})
    const lead = {
      inquiry_type: "service_request", name: "Dana", organization: "", email: "dana@example.com", phone: "",
      preferred_contact: "email", service_type: "business_delivery", customer_type: "business", item_description: "Boxes",
      pickup_location: "20715", delivery_location: "21201", requested_timing: "", frequency: "one_time", recurring_details: "",
      size_quantity: "", access_details: "", special_handling: "", message: "", urgent: false, patient_info_shared: false,
      priority: "standard", priority_reason: "",
    }
    create.mockImplementation(async ({ input }: { input: { type?: string }[] }) => {
      const answered = input.some((item) => item.type === "function_call_output")
      return (async function* () {
        yield answered
          ? { type: "response.completed", response: { output: [] } }
          : { type: "response.completed", response: { output: [{ type: "function_call", call_id: "c1", name: "save_lead", arguments: JSON.stringify(lead) }] } }
      })()
    })
    const { POST } = await loadRoute()
    const saved: boolean[] = []
    for (let i = 0; i < 4; i++) {
      const res = await POST(post({ messages: [{ role: "user", content: "Send my request" }] }, "198.51.100.20"))
      saved.push((await res.text()).includes("lead_saved"))
    }
    expect(sendAssistantLeadEmail).toHaveBeenCalledTimes(3)
    expect(saved).toEqual([true, true, true, false])
  })
})
