import { NextRequest, NextResponse } from "next/server"
import { driverApplicationSchema } from "@/lib/validations"
import { sendDriverApplicationEmails } from "@/lib/email"

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const parsed = driverApplicationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form for errors.", issues: parsed.error.flatten() },
      { status: 422 }
    )
  }

  try {
    await sendDriverApplicationEmails(parsed.data)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("become-a-driver submission failed:", err)
    const isConfigError = err instanceof Error && err.message.startsWith("Email service is not configured")
    const message = isConfigError ? err.message : "Something went wrong sending your application. Please try again or call us directly."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
