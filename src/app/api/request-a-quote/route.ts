import { NextRequest, NextResponse } from "next/server"
import { quoteRequestSchema } from "@/lib/validations"
import { sendQuoteRequestEmails } from "@/lib/email"

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const parsed = quoteRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form for errors.", issues: parsed.error.flatten() },
      { status: 422 }
    )
  }

  try {
    await sendQuoteRequestEmails(parsed.data)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("request-a-quote submission failed:", err)
    const isConfigError = err instanceof Error && err.message.startsWith("Email service is not configured")
    const message = isConfigError ? err.message : "Something went wrong sending your request. Please try again or call us directly."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
