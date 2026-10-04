'use client'

import { OPEN_ASSISTANT_EVENT } from "@/lib/assistant/open-assistant"
import { X } from "lucide-react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import BrentAvatar from "./brent-avatar"

const ChatPanel = dynamic(() => import("./chat-panel"), { ssr: false })

const HIDDEN_ON = ['/request-a-quote', '/become-a-driver']
const TEASER_SEEN_KEY = "ib-assistant-teaser-seen"
const TEASER_DELAY_MS = 4000
const TEASER_VISIBLE_MS = 9000

export default function AssistantLauncher() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [teaser, setTeaser] = useState(false)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const hidden = HIDDEN_ON.includes(pathname)

  const openChat = useCallback(() => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setTeaser(false)
    setOpen(true)
  }, [])

  useEffect(() => {
    window.addEventListener(OPEN_ASSISTANT_EVENT, openChat)
    return () => window.removeEventListener(OPEN_ASSISTANT_EVENT, openChat)
  }, [openChat])

  useEffect(() => {
    if (hidden) return
    try {
      if (sessionStorage.getItem(TEASER_SEEN_KEY)) return
    } catch {}
    const showTimer = setTimeout(() => {
      setTeaser(true)
      try { sessionStorage.setItem(TEASER_SEEN_KEY, "1") } catch {}
    }, TEASER_DELAY_MS)
    const hideTimer = setTimeout(() => setTeaser(false), TEASER_DELAY_MS + TEASER_VISIBLE_MS)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [hidden])

  if (hidden) return null

  const close = () => {
    setOpen(false)
    requestAnimationFrame(() => {
      const opener = openerRef.current
      if (opener?.isConnected && opener.offsetParent !== null) opener.focus()
      else launcherRef.current?.focus()
    })
  }

  return (
    <>
      {open && <ChatPanel onClose={close} />}

      {teaser && !open && (
        <div className="fixed z-40 w-[220px] bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-[max(12px,calc(37.5vw-110px))] md:left-auto md:right-[100px] md:bottom-8 rounded-2xl bg-white pl-4 pr-8 py-3 text-sm text-foreground shadow-[0_8px_28px_rgba(27,42,74,0.18)] border border-border motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2">
          <button type="button" onClick={openChat} className="text-left cursor-pointer focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-teal rounded">
            <span className="block font-semibold text-navy">Hi, I&apos;m Brent</span>
            <span className="block">Need something delivered? I can help.</span>
          </button>
          <button
            type="button"
            onClick={() => setTeaser(false)}
            aria-label="Dismiss message"
            className="absolute top-1.5 right-1.5 rounded p-1 text-foreground/70 hover:text-navy cursor-pointer focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-teal"
          >
            <X size={14} aria-hidden="true" />
          </button>
          <span className="md:hidden absolute -bottom-[7px] left-[min(104px,calc(37.5vw-18px))] h-3 w-3 rotate-45 bg-white border-r border-b border-border" aria-hidden="true" />
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        hidden={open}
        onClick={openChat}
        aria-expanded={open}
        aria-controls="ib-assistant"
        aria-label="Chat with Brent, Iron Bridge's AI assistant"
        className="hidden md:block fixed right-6 bottom-6 z-40 rounded-full shadow-[0_8px_24px_rgba(27,42,74,0.3)] ring-[3px] ring-white transition-transform motion-safe:hover:scale-105 cursor-pointer focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
      >
        <BrentAvatar size={60} className="rounded-full" />
        <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-[#22c55e] ring-2 ring-white" aria-hidden="true" />
      </button>
    </>
  )
}
