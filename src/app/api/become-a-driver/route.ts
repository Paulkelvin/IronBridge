import { NextRequest, NextResponse } from "next/server"
import { driverApplicationSchema } from "@/lib/validations"
import { sendDriverApplicationEmails } from "@/lib/email"
import { isLikelyBot, isRateLimited } from "@/lib/spam-guard"

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  if (isLikelyBot(body)) return NextResponse.json({ ok: true })

  if (isRateLimited(req)) {
    return NextResponse.json(
      { error: "Too many applications from this connection. Please call us at (301) 818-1929." },
      { status: 429 }
    )
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
    return NextResponse.json(
      { error: "We couldn't send your application. Please call us at (301) 818-1929 or email lbrent@ironbridgems.com." },
      { status: 500 }
    )
  }
}
