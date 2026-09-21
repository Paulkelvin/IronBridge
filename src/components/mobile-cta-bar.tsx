'use client'

import { ArrowRight, Phone } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const HIDDEN_ON = ['/request-a-quote', '/become-a-driver']

export default function MobileCtaBar() {
  const pathname = usePathname()
  if (HIDDEN_ON.includes(pathname)) return null

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-navy/10 shadow-[0_-2px_8px_rgba(27,42,74,0.08)]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="grid grid-cols-2 h-14">
        <a
          href="tel:+13018181929"
          className="flex items-center justify-center gap-2 text-sm font-semibold text-navy border-r border-navy/10 active:bg-secondary transition-colors"
        >
          <Phone size={16} strokeWidth={2} aria-hidden="true" />
          Call Now
        </a>
        <Link
          href="/request-a-quote"
          className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-teal active:bg-teal-dark transition-colors"
        >
          Request Quote
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
