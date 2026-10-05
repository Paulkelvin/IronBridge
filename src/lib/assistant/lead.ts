import type { FunctionTool } from "openai/resources/responses/responses"
import { z } from "zod"

const SERVICE_TYPES = ["medical_courier", "business_delivery", "dedicated_route", "bulk_item_removal", "other", "not_stated"] as const
const CUSTOMER_TYPES = ["business", "medical_facility", "organization", "residential", "unknown"] as const

const optionalText = (description: string) => ({ type: "string", description: `${description} Empty string if not given.` })

export const saveLeadTool: FunctionTool = {
  type: "function",
  name: "save_lead",
  description: "Send a visitor's inquiry to the Iron Bridge team by email. Use for service requests and for questions or messages the team needs to answer. Only call once the visitor has given a name and an email or phone number. Never include patient names, diagnoses, medical records, or payment details.",
  strict: true,
  parameters: {
    type: "object",
    properties: {
      inquiry_type: { type: "string", enum: ["service_request", "message_for_team"] },
      name: { type: "string", description: "Visitor's name." },
      organization: optionalText("Business or organization."),
      email: optionalText("Email address."),
      phone: optionalText("Phone number."),
      preferred_contact: { type: "string", enum: ["email", "phone", "either", "not_stated"] },
      service_type: { type: "string", enum: [...SERVICE_TYPES] },
      customer_type: { type: "string", enum: [...CUSTOMER_TYPES] },
      item_description: optionalText("Brief description of the item or shipment, with no sensitive medical details."),
      pickup_location: optionalText("Pickup ZIP code or general location."),
      delivery_location: optionalText("Delivery ZIP code or general location."),
      requested_timing: optionalText("Requested pickup or delivery date and timeframe."),
      frequency: { type: "string", enum: ["one_time", "recurring", "unknown"] },
      recurring_details: optionalText("How often and for how long, for recurring requests."),
      size_quantity: optionalText("Size, weight, or quantity."),
      access_details: optionalText("Access details such as stairs, loading dock, or building access."),
      special_handling: optionalText("Special handling needs such as temperature control or fragile items."),
      message: optionalText("The visitor's question or message for the team, in their own words."),
      urgent: { type: "boolean", description: "True when the visitor needs it soon and gave a clear timeframe (for example today or tomorrow)." },
      patient_info_shared: { type: "boolean", description: "True if the visitor typed any patient names, dates of birth, diagnoses, or other health details anywhere in the conversation." },
      priority: { type: "string", enum: ["high", "standard"] },
      priority_reason: { type: "string", description: "Short reason for the priority." },
    },
    required: [
      "inquiry_type", "name", "organization", "email", "phone", "preferred_contact", "service_type", "customer_type",
      "item_description", "pickup_location", "delivery_location", "requested_timing", "frequency", "recurring_details",
      "size_quantity", "access_details", "special_handling", "message", "urgent", "patient_info_shared", "priority", "priority_reason",
    ],
    additionalProperties: false,
  },
}

const text = (max: number) => z.string().trim().max(max)

export const leadSchema = z.object({
  inquiry_type: z.enum(["service_request", "message_for_team"]),
  name: text(120).min(1),
  organization: text(160),
  email: z.union([z.literal(""), z.email()]),
  phone: text(40),
  preferred_contact: z.enum(["email", "phone", "either", "not_stated"]),
  service_type: z.enum(SERVICE_TYPES),
  customer_type: z.enum(CUSTOMER_TYPES),
  item_description: text(600),
  pickup_location: text(200),
  delivery_location: text(200),
  requested_timing: text(200),
  frequency: z.enum(["one_time", "recurring", "unknown"]),
  recurring_details: text(300),
  size_quantity: text(300),
  access_details: text(300),
  special_handling: text(300),
  message: text(1000),
  urgent: z.boolean(),
  patient_info_shared: z.boolean(),
  priority: z.enum(["high", "standard"]),
  priority_reason: text(300),
}).refine((lead) => lead.email !== "" || lead.phone.replace(/\D/g, "").length >= 10, {
  message: "A valid email address or a 10-digit phone number is required.",
})

export type Lead = z.infer<typeof leadSchema>

export function isRecurringBusiness(lead: Lead) {
  return lead.frequency === "recurring" && lead.customer_type !== "residential"
}
