import type { FunctionTool } from "openai/resources/responses/responses"
import { z } from "zod"

export const saveLeadTool: FunctionTool = {
  type: "function",
  name: "save_lead",
  description: "Send a qualified potential customer's details to the Iron Bridge team. Use only once the visitor has given a name and an email or phone number.",
  strict: true,
  parameters: {
    type: "object",
    properties: {
      name: { type: "string", description: "Visitor's name." },
      company: { type: "string", description: "Company or organization, or empty string if not given." },
      email: { type: "string", description: "Email address, or empty string if not given." },
      phone: { type: "string", description: "Phone number, or empty string if not given." },
      service: {
        type: "string",
        enum: ["medical-courier", "commercial-logistics", "dedicated-route", "bulk-item-removal", "other"],
      },
      need: { type: "string", description: "One or two sentences on what they need moved or removed. No patient information." },
      locations: { type: "string", description: "Pickup and delivery areas, or empty string if unknown." },
      timing: { type: "string", description: "When they need it, or empty string if unknown." },
      frequency: { type: "string", description: "One-time, or how often for recurring work, or empty string if unknown." },
      rating: { type: "string", enum: ["hot", "warm"] },
      rating_reason: { type: "string", description: "Short reason for the rating." },
    },
    required: ["name", "company", "email", "phone", "service", "need", "locations", "timing", "frequency", "rating", "rating_reason"],
    additionalProperties: false,
  },
}

const text = (max: number) => z.string().trim().max(max)

export const leadSchema = z.object({
  name: text(120).min(1),
  company: text(160),
  email: z.union([z.literal(""), z.email()]),
  phone: text(40),
  service: z.enum(["medical-courier", "commercial-logistics", "dedicated-route", "bulk-item-removal", "other"]),
  need: text(600).min(1),
  locations: text(300),
  timing: text(200),
  frequency: text(200),
  rating: z.enum(["hot", "warm"]),
  rating_reason: text(300),
}).refine((lead) => lead.email !== "" || lead.phone.replace(/\D/g, "").length >= 10, {
  message: "A valid email address or a 10-digit phone number is required.",
})

export type Lead = z.infer<typeof leadSchema>
