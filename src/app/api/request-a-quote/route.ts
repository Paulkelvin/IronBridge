import { NextRequest, NextResponse } from "next/server"
import { quoteRequestSchema } from "@/lib/validations"
import { sendQuoteRequestEmails } from "@/lib/email"
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
      { error: "Too many requests from this connection. Please call us at (301) 818-1929." },
      { status: 429 }
    )
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
    return NextResponse.json(
      { error: "We couldn't send your request. Please call us at (301) 818-1929 or email lbrent@ironbridgems.com." },
      { status: 500 }
    )
  }
}
