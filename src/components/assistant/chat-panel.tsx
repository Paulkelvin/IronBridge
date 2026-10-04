'use client'

import { contact } from "@/content/site-facts"
import { RotateCcw, Send, X } from "lucide-react"
import Link from "next/link"
import { Fragment, useEffect, useRef, useState } from "react"
import BrentAvatar from "./brent-avatar"

type ChatMessage =
  | { role: "user" | "assistant", content: string }
  | { role: "note", content: string }

const STORAGE_KEY = "ib-assistant-v1"
const MAX_MESSAGES = 24
const FALLBACK = "Sorry, the assistant isn't available right now. Please use the quote form at /request-a-quote and our team will follow up."
const STARTERS = [
  "Get a delivery quote",
  "Do you serve my area?",
  "Set up a regular route",
  "Furniture or junk pickup",
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
      aria-labelledby="ib-assistant-title ib-assistant-subtitle"
      className="fixed z-50 inset-x-0 bottom-0 h-[calc(100dvh-4.5rem)] rounded-t-2xl md:inset-x-auto md:right-6 md:bottom-6 md:w-[380px] md:h-[min(600px,calc(100dvh-3rem))] md:rounded-2xl flex flex-col border border-border bg-white shadow-[0_16px_48px_rgba(27,42,74,0.22)] overflow-hidden"
    >
      <div className="flex items-center justify-between gap-3 bg-navy px-4 py-3 text-white">
        <div className="flex items-center gap-3 min-w-0">
          <span className="relative shrink-0">
            <BrentAvatar size={42} className="rounded-full ring-2 ring-white/20" />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#22c55e] ring-2 ring-navy" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 id="ib-assistant-title" className="text-[15px] font-semibold leading-tight">Brent</h2>
            <p id="ib-assistant-subtitle" className="text-xs text-white/80">AI assistant · Online</p>
          </div>
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

      <div ref={logRef} role="log" aria-live="polite" aria-label="Conversation with Brent" tabIndex={0} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 text-sm leading-relaxed focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-teal">
        <div className="flex items-end gap-2 self-start max-w-[92%]">
          <BrentAvatar size={28} className="shrink-0 rounded-full" />
          <p className="rounded-2xl rounded-bl-sm bg-secondary px-3.5 py-2.5 text-foreground">
            Hi, I&apos;m Brent, Iron Bridge&apos;s virtual assistant. What can I help you with today?
          </p>
        </div>
        {messages.map((m, i) => {
          if (m.role === "note") {
            return <p key={i} className="self-center rounded-full bg-teal-tint px-3 py-1 text-xs font-medium text-teal-dark">{m.content}</p>
          }
          if (m.role === "user") {
            return (
              <p key={i} className="self-end max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-navy px-3.5 py-2.5 text-white">
                <span className="sr-only">You: </span>
                {m.content}
              </p>
            )
          }
          return (
            <div key={i} className="flex items-end gap-2 self-start max-w-[92%]">
              <BrentAvatar size={28} className="shrink-0 rounded-full" />
              <p className="whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-secondary px-3.5 py-2.5 text-foreground">
                <span className="sr-only">Brent: </span>
                <MessageText text={m.content} />
              </p>
            </div>
          )
        })}
        {busy && messages[messages.length - 1]?.role === "user" && (
          <div className="flex items-end gap-2 self-start">
            <BrentAvatar size={28} className="shrink-0 rounded-full" />
            <p className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-secondary px-4 py-3.5" aria-label="Brent is typing">
              {[0, 150, 300].map((delay) => (
                <span key={delay} className="h-1.5 w-1.5 rounded-full bg-navy/60 motion-safe:animate-bounce" style={{ animationDelay: `${delay}ms` }} />
              ))}
            </p>
          </div>
        )}
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 pl-9">
            {STARTERS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="rounded-full border border-teal/40 bg-white px-3 py-1.5 text-xs font-medium text-teal-dark hover:bg-teal-tint cursor-pointer focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-teal"
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
        className="border-t border-border px-3 pt-3 flex items-end gap-2"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
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
          placeholder="Message Brent…"
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
    </div>
  )
}
