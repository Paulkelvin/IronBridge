import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import type { ReasoningEffort } from "openai/resources/shared"
import { z } from "zod"
import { sendAssistantLeadEmail } from "@/lib/email"
import { runAssistant, type AssistantEvent } from "@/lib/assistant/run-assistant"
import { isRateLimited } from "@/lib/spam-guard"

export const maxDuration = 60

const MODEL = process.env.OPENAI_MODEL || "gpt-6-luna"
const REASONING_EFFORTS = ["none", "minimal", "low", "medium", "high"] as const
const configuredEffort = process.env.OPENAI_REASONING_EFFORT
const REASONING_EFFORT: ReasoningEffort =
  configuredEffort === "off" ? null
    : (REASONING_EFFORTS as readonly string[]).includes(configuredEffort ?? "") ? configuredEffort as ReasoningEffort
      : "low"

const FALLBACK_MESSAGE = "Sorry, the assistant isn't available right now. Please call us at (301) 818-1929 or use /request-a-quote."

const requestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().trim().min(1).max(2000),
  })).min(1).max(24),
  leadSaved: z.boolean().optional(),
}).refine((body) => body.messages[body.messages.length - 1].role === "user", {
  message: "The last message must come from the visitor.",
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  if (isRateLimited(req, { bucket: "assistant", max: 30 })) {
    return NextResponse.json(
      { error: "You've sent a lot of messages in a short time. Please call us at (301) 818-1929." },
      { status: 429 }
    )
  }

  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "This conversation is too long. Please start a new chat or call (301) 818-1929." }, { status: 422 })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.error("Assistant unavailable: OPENAI_API_KEY is not set.")
    return NextResponse.json({ error: FALLBACK_MESSAGE }, { status: 503 })
  }

  const client = new OpenAI({ apiKey })
  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: AssistantEvent) => controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`))
      try {
        await runAssistant(parsed.data.messages, {
          client,
          model: MODEL,
          reasoningEffort: REASONING_EFFORT,
          leadAlreadySaved: parsed.data.leadSaved ?? false,
          saveLead: sendAssistantLeadEmail,
          emit,
          signal: req.signal,
        })
      } catch (err) {
        if (!req.signal.aborted) {
          console.error("Assistant request failed:", err)
          emit({ type: "error", message: FALLBACK_MESSAGE })
        }
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  })
}
