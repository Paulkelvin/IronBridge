import { z } from "zod"

export const quoteRequestSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.email("Enter a valid email address"),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Enter a valid US phone number"),
  pickupStreet: z.string().trim().min(3, "Enter a street address").max(200),
  pickupUnit: z.string().trim().max(50).optional().or(z.literal("")),
  pickupCity: z.string().trim().min(1, "Enter a city").max(100),
  pickupState: z.string().trim().length(2, "Use a 2-letter state code"),
  pickupZip: z.string().trim().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code"),
  deliveryStreet: z.string().trim().min(3, "Enter a street address").max(200),
  deliveryUnit: z.string().trim().max(50).optional().or(z.literal("")),
  deliveryCity: z.string().trim().min(1, "Enter a city").max(100),
  deliveryState: z.string().trim().length(2, "Use a 2-letter state code"),
  deliveryZip: z.string().trim().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code"),
  serviceDate: z.string().trim().min(1, "Select a requested service date"),
  timeRequirements: z.string().trim().max(200).optional().or(z.literal("")),
  shipmentType: z.enum(["medical", "commercial", "other"], {
    error: "Select a shipment type",
  }),
  serviceFrequency: z.enum(["one-time", "recurring"], {
    error: "Select one-time or recurring",
  }),
  shipmentSize: z.string().trim().max(200).optional().or(z.literal("")),
  temperatureSensitive: z.enum(["yes", "no"], { error: "Select yes or no" }),
  specialHandling: z.enum(["yes", "no"], { error: "Select yes or no" }),
  stat: z.enum(["yes", "no"], { error: "Select yes or no" }),
  additionalInstructions: z.string().trim().max(2000).optional().or(z.literal("")),
})

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>

export const driverApplicationSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.email("Enter a valid email address"),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Enter a valid US phone number"),
  location: z.string().trim().min(2, "Enter your city and state").max(200),
  vehicleType: z.string().trim().min(2, "Enter your vehicle type").max(120),
  vehicleYearMakeModel: z.string().trim().min(2, "Enter year, make, and model").max(160),
  availability: z
    .array(z.enum(["weekdays", "evenings", "weekends", "on-call"]))
    .min(1, "Select at least one availability option"),
  serviceAreas: z.array(z.string()).min(1, "Select at least one area you can cover"),
  medicalCourierExperience: z.enum(["yes", "no"], { error: "Select yes or no" }),
  hipaaBbpStatus: z.enum(["completed", "in-progress", "none"], {
    error: "Select your training status",
  }),
  otherCertifications: z.string().trim().max(500).optional().or(z.literal("")),
  additionalInfo: z.string().trim().max(2000).optional().or(z.literal("")),
})

export type DriverApplicationInput = z.infer<typeof driverApplicationSchema>
