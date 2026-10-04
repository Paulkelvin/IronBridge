'use client'

import { contact } from "@/content/site-facts"
import { RotateCcw, Send, X } from "lucide-react"
import Link from "next/link"
import { Fragment, useEffect, useRef, useState } from "react"

type ChatMessage =
  | { role: "user" | "assistant", content: string }
  | { role: "note", content: string }

const STORAGE_KEY = "ib-assistant-v1"
const MAX_MESSAGES = 24
const FALLBACK = "Sorry, the assistant isn't available right now. Please use the quote form at /request-a-quote and our team will follow up."
const STARTERS = [
  "Do you serve my area?",
  "How do medical pickups work?",
  "Can you set up a recurring route?",
  "How do I get a quote?",
]
const LINKABLE_PATHS = [
  "request-a-quote", "become-a-driver", "services", "medical-courier", "commercial-logistics", "dedicated-routes",
  "bulk-item-removal", "capability-statement", "about", "service-area", "compliance-safety", "privacy-policy", "accessibility",
]
const LINK_PATTERN = new RegExp(
  `(${contact.phoneDisplay.replace(/[()]/g, "\\$&")}|${contact.email.replace(/\./g, "\\.")}|/(?:${LINKABLE_PATHS.join("|")})\\b)`,
  "g"
)

function loadSaved(): { messages: ChatMessage[], leadSaved: boolean } {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { messages: [], leadSaved: false }
}

function MessageText({ text }: { text: string }) {
  const linkClass = "underline underline-offset-2 font-medium"
  return (
    <>
      {text.split(LINK_PATTERN).map((part, i) => {
        if (part === contact.phoneDisplay) return <a key={i} href={contact.phoneHref} className={`${linkClass} whitespace-nowrap`}>{part}</a>
        if (part === contact.email) return <a key={i} href={`mailto:${contact.email}`} className={linkClass}>{part}</a>
        if (i % 2 === 1 && part.startsWith("/")) return <Link key={i} href={part} className={linkClass}>{part}</Link>
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [leadSaved, setLeadSaved] = useState(false)
  const [draft, setDraft] = useState("")
  const [busy, setBusy] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = loadSaved()
    setMessages(saved.messages)
    setLeadSaved(saved.leadSaved)
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, leadSaved }))
    } catch {}
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [messages, leadSaved])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const conversation = messages.filter((m): m is Extract<ChatMessage, { role: "user" | "assistant" }> => m.role !== "note")
  const atLimit = conversation.length >= MAX_MESSAGES - 1

  const appendToReply = (delta: string) => {
    setMessages((prev) => {
      const last = prev[prev.length - 1]
      if (last?.role === "assistant") return [...prev.slice(0, -1), { ...last, content: last.content + delta }]
      return [...prev, { role: "assistant", content: delta }]
    })
  }

  const send = async (text: string) => {
    const content = text.trim()
    if (!content || busy || atLimit) return
    const history = [...conversation, { role: "user" as const, content }]
    setMessages((prev) => [...prev, { role: "user", content }])
    setDraft("")
    setBusy(true)

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, leadSaved }),
      })
      if (!res.ok || !res.body) {
        const json = await res.json().catch(() => null)
        appendToReply(json?.error ?? FALLBACK)
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ""
      let gotText = false
      let gotError = false
      for (;;) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() ?? ""
        for (const line of lines) {
          if (!line.trim()) continue
          const event = JSON.parse(line)
          if (event.type === "text") {
            gotText = true
            appendToReply(event.delta)
          } else if (event.type === "lead_saved") {
            setLeadSaved(true)
            setMessages((prev) => [...prev, { role: "note", content: "Details sent to the Iron Bridge team" }])
          } else if (event.type === "error") {
            gotError = true
            appendToReply(gotText ? `\n\n${event.message}` : event.message)
          }
        }
      }
      if (!gotText && !gotError) appendToReply(FALLBACK)
    } catch {
      appendToReply(FALLBACK)
    } finally {
      setBusy(false)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }

  const startOver = () => {
    setMessages([])
    setLeadSaved(false)
    inputRef.current?.focus()
  }

  return (
    <div
      id="ib-assistant"
      role="dialog"
      aria-labelledby="ib-assistant-title"
      className="fixed z-50 inset-x-2 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:inset-x-auto md:right-6 md:bottom-6 md:w-[380px] h-[min(560px,calc(100dvh-8rem))] flex flex-col rounded-2xl border border-border bg-white shadow-[0_16px_48px_rgba(27,42,74,0.22)] overflow-hidden"
    >
      <div className="flex items-center justify-between gap-3 bg-navy px-4 py-3 text-white">
        <div>
          <h2 id="ib-assistant-title" className="text-sm font-semibold">Iron Bridge Assistant</h2>
          <p className="text-[11px] text-white/75">Automated assistant</p>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button type="button" onClick={startOver} aria-label="Start a new chat" className="rounded-md p-2 hover:bg-white/10 cursor-pointer focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-white">
              <RotateCcw size={16} aria-hidden="true" />
            </button>
          )}
          <button type="button" onClick={onClose} aria-label="Close chat" className="rounded-md p-2 hover:bg-white/10 cursor-pointer focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-white">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div ref={logRef} role="log" aria-live="polite" className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 text-sm leading-relaxed">
        <p className="self-start max-w-[88%] rounded-2xl rounded-bl-sm bg-secondary px-3.5 py-2.5 text-foreground">
          Hi! I can answer questions about Iron Bridge&apos;s courier and delivery services. Please don&apos;t share patient names or health details here.
        </p>
        {messages.map((m, i) => {
          if (m.role === "note") {
            return <p key={i} className="self-center rounded-full bg-teal-tint px-3 py-1 text-xs font-medium text-teal-dark">{m.content}</p>
          }
          const isUser = m.role === "user"
          return (
            <p
              key={i}
              className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 ${isUser ? "self-end rounded-br-sm bg-navy text-white" : "self-start rounded-bl-sm bg-secondary text-foreground"}`}
            >
              <span className="sr-only">{isUser ? "You: " : "Assistant: "}</span>
              {isUser ? m.content : <MessageText text={m.content} />}
            </p>
          )
        })}
        {busy && messages[messages.length - 1]?.role === "user" && (
          <p className="self-start rounded-2xl rounded-bl-sm bg-secondary px-3.5 py-2.5 text-foreground/80" aria-label="Assistant is typing">…</p>
        )}
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {STARTERS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-navy hover:border-teal cursor-pointer focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-teal"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        {atLimit && (
          <p className="self-center text-center text-xs text-foreground/80">
            This chat is getting long. Start a new chat, or use the <Link href="/request-a-quote" className="underline">quote form</Link>.
          </p>
        )}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(draft) }}
        className="border-t border-border p-3 flex items-end gap-2"
      >
        <label htmlFor="ib-assistant-input" className="sr-only">Your message</label>
        <textarea
          id="ib-assistant-input"
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              send(draft)
            }
          }}
          rows={1}
          maxLength={2000}
          disabled={atLimit}
          placeholder="Type your question…"
          className="flex-1 resize-none rounded-xl border border-navy/20 bg-white px-3 py-2 text-[16px] md:text-sm text-foreground placeholder:text-foreground/50 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 max-h-28"
        />
        <button
          type="submit"
          disabled={busy || !draft.trim() || atLimit}
          aria-label="Send message"
          className="rounded-xl bg-teal p-2.5 text-white disabled:opacity-40 cursor-pointer focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        >
          <Send size={18} aria-hidden="true" />
        </button>
      </form>
      <p className="px-4 pb-3 text-[11px] leading-snug text-foreground/80">
        Automated assistant. Answers may be wrong, and the team confirms every booking. Don&apos;t share patient information.
      </p>
    </div>
  )
}
