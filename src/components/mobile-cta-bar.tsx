'use client'

import { ArrowRight, Phone } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const HIDDEN_ON = ['/request-a-quote', '/become-a-driver', '/viewport-test']

export default function MobileCtaBar() {
  const pathname = usePathname()
  if (HIDDEN_ON.includes(pathname)) return null

  const cell = "flex h-[calc(var(--mobile-bar-h)-1px)] items-center justify-center gap-2 pb-[var(--mobile-bar-pad)] text-[15px] font-semibold transition-colors"

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 bg-white border-t border-navy/10 shadow-[0_-2px_8px_rgba(27,42,74,0.08)]">
      <a href="tel:+13018181929" className={`${cell} text-navy active:bg-secondary`}>
        <Phone size={17} strokeWidth={2} aria-hidden="true" />
        Call Now
      </a>
      <Link href="/request-a-quote" className={`${cell} text-white bg-teal active:bg-teal-dark`}>
        Request Quote
        <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
      </Link>
    </div>
  )
}
