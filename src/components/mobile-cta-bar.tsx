'use client'

import BrentAvatar from "@/components/assistant/brent-avatar"
import { openAssistant } from "@/lib/assistant/open-assistant"
import { ArrowRight, Phone } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const HIDDEN_ON = ['/request-a-quote', '/become-a-driver']

export default function MobileCtaBar() {
  const pathname = usePathname()
  if (HIDDEN_ON.includes(pathname)) return null

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-navy/10 shadow-[0_-2px_8px_rgba(27,42,74,0.08)] will-change-transform"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)', transform: 'translateZ(0)' }}
    >
      <div className="grid grid-cols-4 h-14">
        <a
          href="tel:+13018181929"
          className="flex flex-col items-center justify-center gap-0.5 text-xs font-semibold text-navy active:bg-secondary transition-colors"
        >
          <span className="flex h-[26px] items-center"><Phone size={20} strokeWidth={2} aria-hidden="true" /></span>
          Call
        </a>
        <button
          type="button"
          onClick={openAssistant}
          aria-label="Chat with Brent, Iron Bridge's AI assistant"
          className="flex flex-col items-center justify-center gap-0.5 text-xs font-semibold text-navy border-l border-navy/10 active:bg-secondary transition-colors cursor-pointer"
        >
          <span className="relative h-[26px]">
            <BrentAvatar size={26} className="rounded-full" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#22c55e] ring-2 ring-white" aria-hidden="true" />
          </span>
          Ask Brent
        </button>
        <Link
          href="/request-a-quote"
          className="col-span-2 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-teal active:bg-teal-dark transition-colors"
        >
          Request Quote
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
