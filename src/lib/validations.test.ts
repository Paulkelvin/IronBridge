import { describe, expect, it } from "vitest"
import { driverApplicationSchema, quoteRequestSchema } from "./validations"

const validQuote = {
  name: "Jane Smith",
  company: "Bowie Clinic",
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
  stat: "yes",
}

const validDriver = {
  name: "Sam Driver",
  email: "sam@example.com",
  phone: "(240) 555-0199",
  location: "Bowie, MD",
  vehicleType: "Cargo van",
  vehicleYearMakeModel: "2021 Ford Transit",
  availability: ["weekdays"],
  serviceAreas: ["Maryland"],
  medicalCourierExperience: "yes",
  hipaaBbpStatus: "completed",
}

function fieldErrors(result: { success: boolean, error?: { flatten: () => { fieldErrors: Record<string, string[] | undefined> } } }) {
  return result.success ? {} : result.error!.flatten().fieldErrors
}

describe("quote request validation", () => {
  it("accepts a complete request", () => {
    expect(quoteRequestSchema.safeParse(validQuote).success).toBe(true)
  })

  it("rejects a phone number that isn't in US format", () => {
    const result = quoteRequestSchema.safeParse({ ...validQuote, phone: "3015550100" })
    expect(fieldErrors(result).phone).toEqual(["Enter a valid US phone number"])
  })

  it("asks for a phone number in plain language when it's missing", () => {
    const result = quoteRequestSchema.safeParse({ ...validQuote, phone: undefined })
    expect(fieldErrors(result).phone).toEqual(["Enter a valid US phone number"])
  })

  it("rejects an invalid ZIP code and state", () => {
    const result = quoteRequestSchema.safeParse({ ...validQuote, pickupZip: "2072", pickupState: "Maryland" })
    expect(fieldErrors(result).pickupZip).toEqual(["Enter a valid ZIP code"])
    expect(fieldErrors(result).pickupState).toEqual(["Use a 2-letter state code"])
  })

  it("rejects instructions longer than 2,000 characters", () => {
    const result = quoteRequestSchema.safeParse({ ...validQuote, additionalInstructions: "x".repeat(2001) })
    expect(result.success).toBe(false)
  })

  it("drops unknown fields such as the spam-trap values", () => {
    const result = quoteRequestSchema.safeParse({ ...validQuote, website: "", formElapsedMs: 9000 })
    expect(result.success && "website" in result.data).toBe(false)
  })
})

describe("driver application validation", () => {
  it("accepts a complete application", () => {
    expect(driverApplicationSchema.safeParse(validDriver).success).toBe(true)
  })

  it("asks for a phone number in plain language when it's missing", () => {
    const result = driverApplicationSchema.safeParse({ ...validDriver, phone: undefined })
    expect(fieldErrors(result).phone).toEqual(["Enter a valid US phone number"])
  })

  it("requires at least one availability option and service area", () => {
    const result = driverApplicationSchema.safeParse({ ...validDriver, availability: [], serviceAreas: [] })
    expect(fieldErrors(result).availability).toEqual(["Select at least one availability option"])
    expect(fieldErrors(result).serviceAreas).toEqual(["Select at least one area you can cover"])
  })
})
