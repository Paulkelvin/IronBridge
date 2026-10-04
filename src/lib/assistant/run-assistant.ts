import type OpenAI from "openai"
import type { ReasoningEffort } from "openai/resources/shared"
import type { ResponseFunctionToolCall, ResponseInputItem, ResponseOutputItem } from "openai/resources/responses/responses"
import type { TranscriptMessage } from "@/lib/email"
import { buildInstructions } from "./knowledge"
import { leadSchema, saveLeadTool, type Lead } from "./lead"

export type AssistantEvent =
  | { type: "text", delta: string }
  | { type: "lead_saved" }
  | { type: "error", message: string }

type RunOptions = {
  client: Pick<OpenAI, "responses">
  model: string
  reasoningEffort: ReasoningEffort
  leadAlreadySaved: boolean
  saveLead: (lead: Lead, transcript: TranscriptMessage[]) => Promise<void>
  emit: (event: AssistantEvent) => void
  signal?: AbortSignal
}

const MAX_ROUNDS = 3

type ToolResult = { ok: true } | { ok: false, error: string }

// With store: false, reasoning items must carry their encrypted content to be replayed after a tool call.
function reasoningParams(effort: ReasoningEffort) {
  if (!effort) return {}
  if (effort === "none") return { reasoning: { effort } }
  return { reasoning: { effort }, include: ["reasoning.encrypted_content" as const] }
}

function replayableItems(output: ResponseOutputItem[]): ResponseInputItem[] {
  return output.filter((item): item is Extract<ResponseOutputItem, ResponseInputItem> =>
    item.type === "message" || item.type === "function_call" || item.type === "reasoning"
  )
}

export async function runAssistant(messages: TranscriptMessage[], options: RunOptions) {
  const { client, model, reasoningEffort, emit, signal } = options
  const input: ResponseInputItem[] = messages.map((m) => ({ role: m.role, content: m.content }))
  const transcript = [...messages]
  let textEmitted = false
  let instructions = buildInstructions()
  if (options.leadAlreadySaved) {
    instructions += "\n\nA lead has already been saved in this conversation. Don't call save_lead again unless the visitor gives important new contact details or a different need."
  }

  for (let round = 0; round < MAX_ROUNDS; round++) {
    const stream = await client.responses.create({
      model,
      instructions,
      input,
      tools: [saveLeadTool],
      stream: true,
      store: false,
      max_output_tokens: 1200,
      ...reasoningParams(reasoningEffort),
    }, { signal })

    let output: ResponseOutputItem[] = []
    let replyText = ""
    for await (const event of stream) {
      if (event.type === "response.output_text.delta") {
        if (!replyText && textEmitted) emit({ type: "text", delta: "\n\n" })
        replyText += event.delta
        textEmitted = true
        emit({ type: "text", delta: event.delta })
      } else if (event.type === "response.completed" || event.type === "response.incomplete") {
        output = event.response.output
      } else if (event.type === "response.failed") {
        throw new Error(`OpenAI response failed: ${event.response.error?.message ?? "unknown error"}`)
      } else if (event.type === "error") {
        throw new Error(`OpenAI stream error: ${event.message}`)
      }
    }
    if (replyText) transcript.push({ role: "assistant", content: replyText })

    const calls = output.filter((item): item is ResponseFunctionToolCall => item.type === "function_call")
    if (calls.length === 0) return

    input.push(...replayableItems(output))
    for (const call of calls) {
      const result = await handleToolCall(call)
      input.push({ type: "function_call_output", call_id: call.call_id, output: JSON.stringify(result) })
    }
  }

  async function handleToolCall(call: ResponseFunctionToolCall): Promise<ToolResult> {
    if (call.name !== saveLeadTool.name) return { ok: false, error: `Unknown tool ${call.name}.` }

    let args: unknown
    try {
      args = JSON.parse(call.arguments)
    } catch {
      return { ok: false, error: "Arguments were not valid JSON." }
    }
    const parsed = leadSchema.safeParse(args)
    if (!parsed.success) {
      return { ok: false, error: parsed.error.issues.map((i) => i.message).join(" ") }
    }

    try {
      await options.saveLead(parsed.data, transcript)
      emit({ type: "lead_saved" })
      return { ok: true }
    } catch (err) {
      console.error("Assistant lead could not be sent:", err)
      return { ok: false, error: "The lead could not be delivered to the team." }
    }
  }
}
