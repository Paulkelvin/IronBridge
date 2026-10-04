'use client'

import { MessageCircle } from "lucide-react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { useRef, useState } from "react"

const ChatPanel = dynamic(() => import("./chat-panel"), { ssr: false })

const HIDDEN_ON = ['/request-a-quote', '/become-a-driver']

export default function AssistantLauncher() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const launcherRef = useRef<HTMLButtonElement>(null)

  if (HIDDEN_ON.includes(pathname)) return null

  const close = () => {
    setOpen(false)
    requestAnimationFrame(() => launcherRef.current?.focus())
  }

  return (
    <>
      {open && <ChatPanel onClose={close} />}
      <button
        ref={launcherRef}
        type="button"
        hidden={open}
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="ib-assistant"
        className="fixed right-4 md:right-6 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:bottom-6 z-40 inline-flex items-center gap-2 rounded-full bg-navy text-white pl-4 pr-5 py-3 text-sm font-semibold shadow-[0_8px_24px_rgba(27,42,74,0.28)] hover:bg-navy/90 transition-colors cursor-pointer focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
      >
        <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
        Questions?
      </button>
    </>
  )
}
