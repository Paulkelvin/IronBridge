import { Resend } from "resend"
import type { DriverApplicationInput, QuoteRequestInput } from "@/lib/validations"

const FROM = process.env.EMAIL_FROM || "Iron Bridge Mobility Solutions <onboarding@resend.dev>"
const QUOTE_NOTIFICATIONS_TO = process.env.QUOTE_NOTIFICATIONS_EMAIL
const DRIVER_NOTIFICATIONS_TO = process.env.DRIVER_NOTIFICATIONS_EMAIL || process.env.QUOTE_NOTIFICATIONS_EMAIL

function getClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error(
      "Email service is not configured yet (missing RESEND_API_KEY). See .env.example."
    )
  }
  return new Resend(apiKey)
}

function formatAddress(street: string, unit: string | undefined, city: string, state: string, zip: string) {
  const line1 = unit ? `${street}, ${unit}` : street
  return `${line1}, ${city}, ${state} ${zip}`
}

function row(label: string, value?: string | null) {
  if (!value) return ""
  return `<tr><td style="padding:4px 12px 4px 0;color:#5b6472;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:4px 0;color:#1B2A4A;font-size:13px">${escapeHtml(value)}</td></tr>`
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function wrapper(title: string, bodyHtml: string) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto">
    <div style="background:#1B2A4A;padding:20px 24px;border-radius:10px 10px 0 0">
      <span style="color:#fff;font-size:16px;font-weight:bold;letter-spacing:0.02em">Iron Bridge Mobility Solutions</span>
    </div>
    <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 10px 10px;padding:24px">
      <h2 style="color:#1B2A4A;font-size:18px;margin:0 0 16px">${title}</h2>
      ${bodyHtml}
    </div>
    <p style="color:#9aa2ad;font-size:11px;text-align:center;margin-top:16px">Iron Bridge Mobility Solutions &middot; Maryland · Washington, DC · Northern Virginia</p>
  </div>`
}

export async function sendQuoteRequestEmails(data: QuoteRequestInput) {
  if (!QUOTE_NOTIFICATIONS_TO) {
    throw new Error(
      "Email service is not configured yet (missing QUOTE_NOTIFICATIONS_EMAIL). See .env.example."
    )
  }
  const resend = getClient()

  const detailRows = [
    row("Name", data.name),
    row("Company", data.company),
    row("Email", data.email),
    row("Phone", data.phone),
    row("Pickup location", formatAddress(data.pickupStreet, data.pickupUnit, data.pickupCity, data.pickupState, data.pickupZip)),
    row("Delivery location", formatAddress(data.deliveryStreet, data.deliveryUnit, data.deliveryCity, data.deliveryState, data.deliveryZip)),
    row("Requested date", data.serviceDate),
    row("Time requirements", data.timeRequirements),
    row("Shipment type", data.shipmentType),
    row("Frequency", data.serviceFrequency),
    row("Shipment size", data.shipmentSize),
    row("Temperature-sensitive", data.temperatureSensitive),
    row("Special handling", data.specialHandling),
    row("STAT / expedited", data.stat),
  ].join("")

  await resend.emails.send({
    from: FROM,
    to: QUOTE_NOTIFICATIONS_TO,
    replyTo: data.email,
    subject: `New quote request from ${data.name}${data.company ? ` (${data.company})` : ""}`,
    html: wrapper("New Quote Request", `
      <table style="border-collapse:collapse">${detailRows}</table>
      ${data.additionalInstructions ? `<p style="color:#5b6472;font-size:13px;margin-top:16px"><strong>Additional instructions:</strong><br/>${escapeHtml(data.additionalInstructions)}</p>` : ""}
    `),
  })

  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: "We received your request | Iron Bridge Mobility Solutions",
    html: wrapper("Thanks, we received your request", `
      <p style="color:#333;font-size:14px;line-height:1.6">
        Hi ${escapeHtml(data.name)}, thanks for reaching out to Iron Bridge Mobility Solutions.
        We've received your quote request and our team will follow up shortly to confirm the details.
      </p>
      <p style="color:#333;font-size:14px;line-height:1.6">
        If anything is time-sensitive, feel free to reply directly to this email.
      </p>
    `),
  })
}

export async function sendDriverApplicationEmails(data: DriverApplicationInput) {
  const to = DRIVER_NOTIFICATIONS_TO
  if (!to) {
    throw new Error(
      "Email service is not configured yet (missing DRIVER_NOTIFICATIONS_EMAIL or QUOTE_NOTIFICATIONS_EMAIL). See .env.example."
    )
  }
  const resend = getClient()

  const detailRows = [
    row("Name", data.name),
    row("Email", data.email),
    row("Phone", data.phone),
    row("Location", data.location),
    row("Vehicle type", data.vehicleType),
    row("Year / Make / Model", data.vehicleYearMakeModel),
    row("Availability", data.availability.join(", ")),
    row("Service areas", data.serviceAreas.join(", ")),
    row("Medical courier experience", data.medicalCourierExperience),
    row("HIPAA/BBP training status", data.hipaaBbpStatus),
    row("Other certifications", data.otherCertifications),
  ].join("")

  await resend.emails.send({
    from: FROM,
    to,
    replyTo: data.email,
    subject: `New driver application from ${data.name}`,
    html: wrapper("New Driver Application", `
      <table style="border-collapse:collapse">${detailRows}</table>
      ${data.additionalInfo ? `<p style="color:#5b6472;font-size:13px;margin-top:16px"><strong>Additional info:</strong><br/>${escapeHtml(data.additionalInfo)}</p>` : ""}
    `),
  })

  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: "We received your application | Iron Bridge Mobility Solutions",
    html: wrapper("Thanks for applying", `
      <p style="color:#333;font-size:14px;line-height:1.6">
        Hi ${escapeHtml(data.name)}, thanks for your interest in driving with Iron Bridge Mobility Solutions.
        We've received your application and will reach out if there's a fit for your vehicle, availability, and service area.
      </p>
      <p style="color:#333;font-size:14px;line-height:1.6">
        If it's a fit, we'll follow up with the next steps, including any license, insurance, and training
        documentation needed before you're assigned a route.
      </p>
    `),
  })
}
