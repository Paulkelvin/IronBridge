import { afterEach, describe, expect, it, vi } from "vitest"
import { runAssistant, type AssistantEvent } from "./run-assistant"
import { buildInstructions } from "./knowledge"
import type { Lead } from "./lead"

type FakeEvent = Record<string, unknown>

function fakeClient(rounds: FakeEvent[][]) {
  const create = vi.fn<(params: Record<string, unknown>) => Promise<AsyncGenerator<FakeEvent>>>(async () => {
    const events = rounds.shift() ?? []
    return (async function* () { yield* events })()
  })
  return { client: { responses: { create } } as never, create }
}

const textRound = (text: string, output: unknown[] = []) => [
  ...text.split(" ").map((word, i) => ({ type: "response.output_text.delta", delta: i === 0 ? word : ` ${word}` })),
  { type: "response.completed", response: { output } },
]

const leadArgs: Lead = {
  inquiry_type: "service_request",
  name: "Dana",
  organization: "Ridge Clinic",
  email: "dana@ridgeclinic.example",
  phone: "",
  preferred_contact: "email",
  service_type: "medical_courier",
  customer_type: "medical_facility",
  item_description: "Lab specimen boxes",
  pickup_location: "20910",
  delivery_location: "21201",
  requested_timing: "Starting next Monday, mornings",
  frequency: "recurring",
  recurring_details: "3 times a week",
  size_quantity: "2 small coolers",
  access_details: "",
  special_handling: "Cold packs",
  message: "",
  urgent: false,
  patient_info_shared: false,
  priority: "high",
  priority_reason: "Recurring medical facility route with ZIP codes and email",
}

const toolCallRound = (args: unknown) => [
  { type: "response.completed", response: { output: [
    { type: "reasoning", id: "rs_1", summary: [], encrypted_content: "abc" },
    { type: "function_call", call_id: "call_1", name: "save_lead", arguments: JSON.stringify(args) },
  ] } },
]

async function run(rounds: FakeEvent[][], overrides: Partial<Parameters<typeof runAssistant>[1]> = {}) {
  const { client, create } = fakeClient(rounds)
  const events: AssistantEvent[] = []
  const saveLead = vi.fn<(lead: Lead, transcript: unknown[]) => Promise<void>>(async () => {})
  await runAssistant([{ role: "user", content: "Do you serve Silver Spring?" }], {
    client,
    model: "gpt-6-luna",
    reasoningEffort: "low",
    leadAlreadySaved: false,
    saveLead,
    emit: (e) => events.push(e),
    ...overrides,
  })
  const text = events.filter((e) => e.type === "text").map((e) => (e as { delta: string }).delta).join("")
  return { create, events, saveLead, text }
}

describe("runAssistant", () => {
  it("streams the model's reply text", async () => {
    const { text, saveLead, create } = await run([textRound("Yes, Silver Spring is in our service area.")])
    expect(text).toBe("Yes, Silver Spring is in our service area.")
    expect(saveLead).not.toHaveBeenCalled()
    expect(create).toHaveBeenCalledTimes(1)
  })

  it("sends the site instructions, the lead tool, and never stores the conversation at OpenAI", async () => {
    const { create } = await run([textRound("Hello")])
    const params = create.mock.calls[0][0] as Record<string, unknown>
    expect(params.model).toBe("gpt-6-luna")
    expect(params.store).toBe(false)
    expect(params.stream).toBe(true)
    expect(params.instructions).toContain("Give a final price")
    expect(params.include).toEqual(["reasoning.encrypted_content"])
    expect((params.tools as { name: string }[])[0].name).toBe("save_lead")
  })

  it("saves a valid lead, tells the browser, and lets the model confirm", async () => {
    const { saveLead, events, text, create } = await run([toolCallRound(leadArgs), textRound("Thanks, Dana. The team will follow up.")])
    expect(saveLead).toHaveBeenCalledTimes(1)
    expect(saveLead.mock.calls[0][0]).toMatchObject({ name: "Dana", priority: "high", frequency: "recurring" })
    expect(events).toContainEqual({ type: "lead_saved" })
    expect(text).toBe("Thanks, Dana. The team will follow up.")

    const secondInput = (create.mock.calls[1][0] as { input: { type?: string, output?: string }[] }).input
    expect(secondInput.map((item) => item.type)).toContain("reasoning")
    const toolOutput = secondInput.find((item) => item.type === "function_call_output")
    expect(JSON.parse(toolOutput!.output!)).toEqual({ ok: true })
  })

  it("refuses a lead without an email or phone and reports why to the model", async () => {
    const { saveLead, create } = await run([toolCallRound({ ...leadArgs, email: "", phone: "" }), textRound("Could you share an email or phone number?")])
    expect(saveLead).not.toHaveBeenCalled()
    const toolOutput = (create.mock.calls[1][0] as { input: { type?: string, output?: string }[] }).input
      .find((item) => item.type === "function_call_output")
    expect(JSON.parse(toolOutput!.output!)).toMatchObject({ ok: false })
  })

  it("tells the model when the lead email can't be sent, without telling the browser it was saved", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    const saveLead = vi.fn<(lead: Lead, transcript: unknown[]) => Promise<void>>(async () => { throw new Error("Resend down") })
    const { events } = await run([toolCallRound(leadArgs), textRound("Sorry, please call us.")], { saveLead })
    expect(events).not.toContainEqual({ type: "lead_saved" })
  })

  it("separates text written before and after a lead is saved", async () => {
    const before = [
      { type: "response.output_text.delta", delta: "One moment." },
      ...toolCallRound(leadArgs),
    ]
    const { text } = await run([before, textRound("All set.")])
    expect(text).toBe("One moment.\n\nAll set.")
  })

  it("stops after three rounds even if the model keeps calling tools", async () => {
    const { create } = await run([toolCallRound(leadArgs), toolCallRound(leadArgs), toolCallRound(leadArgs), textRound("never reached")])
    expect(create).toHaveBeenCalledTimes(3)
  })

  it("throws when OpenAI reports a failure so the endpoint can show the fallback", async () => {
    await expect(run([[{ type: "response.failed", response: { error: { message: "model overloaded" }, output: [] } }]]))
      .rejects.toThrow("model overloaded")
  })

  it("omits reasoning settings when none are configured", async () => {
    const { create } = await run([textRound("Hi")], { reasoningEffort: null })
    const params = create.mock.calls[0][0] as Record<string, unknown>
    expect(params).not.toHaveProperty("reasoning")
    expect(params).not.toHaveProperty("include")
  })

  it("asks the model not to save a second lead when one was already sent", async () => {
    const { create } = await run([textRound("Hi")], { leadAlreadySaved: true })
    expect((create.mock.calls[0][0] as { instructions: string }).instructions).toContain("already been saved")
  })
})

describe("assistant instructions", () => {
  afterEach(() => vi.unstubAllEnvs())

  it("list every city on the website and the owner's prohibitions", () => {
    const instructions = buildInstructions()
    for (const city of ["Silver Spring", "Hyattsville", "Ashburn", "Sterling", "Washington, DC"]) {
      expect(instructions).toContain(city)
    }
    for (const rule of ["Give medical advice", "Give a final price", "confirm a booking", "hazardous", "Guess.", "payment information"]) {
      expect(instructions).toContain(rule)
    }
  })

  it("give out no phone number unless an approved one is configured", () => {
    vi.stubEnv("ASSISTANT_PHONE", "")
    expect(buildInstructions()).not.toMatch(/\(\d{3}\) \d{3}-\d{4}/)
    expect(buildInstructions()).toContain("Do not give out any phone number")
    vi.stubEnv("ASSISTANT_PHONE", "(301) 818-1929")
    expect(buildInstructions()).toContain("The approved business phone number is (301) 818-1929")
  })

  it("introduce the assistant as Brent, an AI rather than a person", () => {
    const instructions = buildInstructions()
    expect(instructions).toContain("You are Brent")
    expect(instructions).toContain("never claim to be human, the business owner")
  })

  it("treat one-time residential requests as valid but send driver applicants elsewhere", () => {
    const instructions = buildInstructions()
    expect(instructions).toContain("one-time residential request is still a valid request")
    expect(instructions).toContain("/become-a-driver")
  })
})
