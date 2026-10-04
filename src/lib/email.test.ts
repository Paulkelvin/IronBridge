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
    inquiry_type: "service_request" as const,
    name: "Dana",
    organization: "Ridge Clinic",
    email: "dana@ridgeclinic.example",
    phone: "301-555-0142",
    preferred_contact: "phone" as const,
    service_type: "medical_courier" as const,
    customer_type: "medical_facility" as const,
    item_description: "Lab specimen boxes",
    pickup_location: "20910",
    delivery_location: "21201",
    requested_timing: "Tomorrow by 10am",
    frequency: "recurring" as const,
    recurring_details: "3 times a week",
    size_quantity: "2 coolers",
    access_details: "",
    special_handling: "Cold packs",
    message: "",
    urgent: true,
    priority: "high" as const,
    priority_reason: "Recurring medical route needed tomorrow",
  }

  it("emails lbrent@ironbridgems.com by default with urgent and recurring labels", async () => {
    send.mockResolvedValue({ data: { id: "ok" }, error: null })
    const { sendAssistantLeadEmail } = await loadEmailModule()
    await sendAssistantLeadEmail(lead, [
      { role: "user", content: "<b>Hi</b> I need a route" },
      { role: "assistant", content: "Happy to help." },
    ])
    expect(send).toHaveBeenCalledTimes(1)
    const message = send.mock.calls[0][0]
    expect(message).toMatchObject({ to: "lbrent@ironbridgems.com", replyTo: "dana@ridgeclinic.example" })
    expect(message.subject).toBe("[URGENT] [RECURRING BUSINESS] Website chat service request from Dana (Ridge Clinic)")
    for (const text of ["Contact", "Request", "Prefers", "Phone", "20910", "21201", "3 times a week", "Cold packs", "HIGH PRIORITY"]) {
      expect(message.html).toContain(text)
    }
    expect(message.html).toContain("&lt;b&gt;Hi&lt;/b&gt;")
  })

  it("labels a message for the team and leaves out labels that don't apply", async () => {
    send.mockResolvedValue({ data: { id: "ok" }, error: null })
    const { sendAssistantLeadEmail } = await loadEmailModule()
    await sendAssistantLeadEmail({
      ...lead,
      inquiry_type: "message_for_team",
      organization: "",
      customer_type: "residential",
      frequency: "one_time",
      urgent: false,
      priority: "standard",
      message: "Can you move a piano?",
    }, [])
    const message = send.mock.calls[0][0]
    expect(message.subject).toBe("Website chat message for the team from Dana")
    expect(message.html).toContain("Can you move a piano?")
    expect(message.html).toContain("STANDARD PRIORITY")
  })

  it("does not label recurring residential requests as business", async () => {
    send.mockResolvedValue({ data: { id: "ok" }, error: null })
    const { sendAssistantLeadEmail } = await loadEmailModule()
    await sendAssistantLeadEmail({ ...lead, customer_type: "residential", urgent: false }, [])
    expect(send.mock.calls[0][0].subject).not.toContain("RECURRING BUSINESS")
  })

  it("uses ASSISTANT_LEADS_EMAIL when it is set", async () => {
    vi.stubEnv("ASSISTANT_LEADS_EMAIL", "leads@example.com")
    send.mockResolvedValue({ data: { id: "ok" }, error: null })
    const { sendAssistantLeadEmail } = await loadEmailModule()
    await sendAssistantLeadEmail(lead, [])
    expect(send.mock.calls[0][0].to).toBe("leads@example.com")
  })

  it("fails loudly when the email service rejects the lead", async () => {
    send.mockResolvedValueOnce({ data: null, error: { message: "Invalid API key" } })
    const { sendAssistantLeadEmail } = await loadEmailModule()
    await expect(sendAssistantLeadEmail(lead, [])).rejects.toThrow("Email delivery failed")
  })
})
