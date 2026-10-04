import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import type { QuoteRequestInput } from "./validations"

const send = vi.fn()

vi.mock("resend", () => ({
  Resend: vi.fn(function Resend() {
    return { emails: { send } }
  }),
}))

const quote: QuoteRequestInput = {
  name: "Jane Smith",
  company: "",
  email: "jane@example.com",
  phone: "(301) 555-0100",
  pickupStreet: "100 Main Street",
  pickupCity: "Bowie",
  pickupState: "MD",
  pickupZip: "20720",
  deliveryStreet: "200 Lab Road",
  deliveryCity: "Baltimore",
  deliveryState: "MD",
  deliveryZip: "21201",
  serviceDate: "2026-12-01",
  shipmentType: "medical",
  serviceFrequency: "one-time",
  temperatureSensitive: "no",
  specialHandling: "no",
  stat: "no",
}

async function loadEmailModule() {
  vi.resetModules()
  return import("./email")
}

beforeEach(() => {
  send.mockReset()
  vi.stubEnv("RESEND_API_KEY", "re_test")
  vi.stubEnv("QUOTE_NOTIFICATIONS_EMAIL", "dispatch@example.com")
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe("sendQuoteRequestEmails", () => {
  it("fails when the business notification is rejected, so the visitor isn't told it was received", async () => {
    send.mockResolvedValueOnce({ data: null, error: { message: "Domain not verified" } })
    const { sendQuoteRequestEmails } = await loadEmailModule()
    await expect(sendQuoteRequestEmails(quote)).rejects.toThrow("Email delivery failed: Domain not verified")
  })

  it("still succeeds when only the customer's confirmation email fails", async () => {
    send
      .mockResolvedValueOnce({ data: { id: "notification" }, error: null })
      .mockResolvedValueOnce({ data: null, error: { message: "Recipient rejected" } })
    vi.spyOn(console, "error").mockImplementation(() => {})
    const { sendQuoteRequestEmails } = await loadEmailModule()
    await expect(sendQuoteRequestEmails(quote)).resolves.toBeUndefined()
    expect(send).toHaveBeenCalledTimes(2)
  })

  it("sends the notification to the business inbox with the customer as reply-to", async () => {
    send.mockResolvedValue({ data: { id: "ok" }, error: null })
    const { sendQuoteRequestEmails } = await loadEmailModule()
    await sendQuoteRequestEmails(quote)
    expect(send.mock.calls[0][0]).toMatchObject({ to: "dispatch@example.com", replyTo: "jane@example.com" })
    expect(send.mock.calls[1][0]).toMatchObject({ to: "jane@example.com" })
  })

  it("escapes HTML typed into the form", async () => {
    send.mockResolvedValue({ data: { id: "ok" }, error: null })
    const { sendQuoteRequestEmails } = await loadEmailModule()
    await sendQuoteRequestEmails({ ...quote, additionalInstructions: '<script>alert("x")</script>' })
    expect(send.mock.calls[0][0].html).toContain("&lt;script&gt;")
    expect(send.mock.calls[0][0].html).not.toContain("<script>")
  })

  it("refuses to run when the business inbox isn't configured", async () => {
    vi.stubEnv("QUOTE_NOTIFICATIONS_EMAIL", "")
    const { sendQuoteRequestEmails } = await loadEmailModule()
    await expect(sendQuoteRequestEmails(quote)).rejects.toThrow("missing QUOTE_NOTIFICATIONS_EMAIL")
    expect(send).not.toHaveBeenCalled()
  })
})

describe("sendAssistantLeadEmail", () => {
  const lead = {
    name: "Dana",
    company: "Ridge Clinic",
    email: "dana@ridgeclinic.example",
    phone: "",
    service: "medical-courier" as const,
    need: "Lab specimen route",
    locations: "Silver Spring to Baltimore",
    timing: "Next week",
    frequency: "3 times a week",
    rating: "hot" as const,
    rating_reason: "Recurring healthcare route",
  }

  it("emails only the business inbox, marks the rating, and escapes the conversation", async () => {
    send.mockResolvedValue({ data: { id: "ok" }, error: null })
    const { sendAssistantLeadEmail } = await loadEmailModule()
    await sendAssistantLeadEmail(lead, [
      { role: "user", content: "<b>Hi</b> I need a route" },
      { role: "assistant", content: "Happy to help." },
    ])
    expect(send).toHaveBeenCalledTimes(1)
    const message = send.mock.calls[0][0]
    expect(message).toMatchObject({ to: "dispatch@example.com", replyTo: "dana@ridgeclinic.example" })
    expect(message.subject).toBe("Hot lead from website chat: Dana (Ridge Clinic)")
    expect(message.html).toContain("&lt;b&gt;Hi&lt;/b&gt;")
  })

  it("fails loudly when the email service rejects the lead", async () => {
    send.mockResolvedValueOnce({ data: null, error: { message: "Invalid API key" } })
    const { sendAssistantLeadEmail } = await loadEmailModule()
    await expect(sendAssistantLeadEmail(lead, [])).rejects.toThrow("Email delivery failed")
  })
})
