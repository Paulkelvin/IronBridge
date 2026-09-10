'use client'

import DotGrid from "@/components/graphics/dot-grid"
import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const settings = {
  title: 'Ready to Move Something That Matters?',
  description: 'Whether it’s a single time-sensitive delivery or a recurring route, tell us what you need and we’ll follow up with a plan.',
  primaryCTA: {
    content: 'Request a Quote',
    href: '/request-a-quote'
  },
  secondaryCTA: {
    content: 'Become a Driver',
    href: '/become-a-driver'
  }
}

export default function CTA() {
  return (
    <SlideEffect isSpring={false} className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-navy">
      {/* Decorative background */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(45% 100% at 10% 0%, rgba(61,166,132,0.18) 0%, transparent 65%), radial-gradient(45% 100% at 90% 100%, rgba(61,166,132,0.12) 0%, transparent 65%)',
        }}
      >
        <DotGrid id="cta-dot-grid" className="absolute inset-0 h-full w-full text-white/[0.06]" />
      </div>

      {/* Content column */}
      <div className="relative mx-auto max-w-7xl px-4 xl:px-0 py-16 md:py-24 flex flex-col items-center justify-center text-center space-y-6 md:space-y-8">
        {/* Title + description (tight to each other) */}
        <div className="space-y-2 md:space-y-3">
          <h2 className="font-serif text-2xl md:text-4xl lg:text-header font-semibold leading-tight text-white">{settings.title}</h2>
          <p className="px-0 sm:px-10 md:px-0 w-full max-w-full md:max-w-2xl mx-auto text-sm lg:text-base text-white/75">{settings.description}</p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-fit">
          <Link href={settings.primaryCTA.href} className="w-full sm:w-fit">
            <Button
              size='lg'
              className="w-full rounded-none bg-white text-navy border border-white uppercase tracking-[0.14em] text-xs sm:text-sm font-semibold hover:bg-transparent hover:text-white transition-colors"
            >
              {settings.primaryCTA.content}
              <ArrowRight strokeWidth={1.5} />
            </Button>
          </Link>
          <Link href={settings.secondaryCTA.href} className="w-full sm:w-fit">
            <Button
              variant='outline'
              size='lg'
              className="w-full rounded-none bg-transparent border border-white/60 text-white uppercase tracking-[0.14em] text-xs sm:text-sm font-semibold hover:bg-white hover:text-navy hover:border-white transition-colors"
            >
              {settings.secondaryCTA.content}
            </Button>
          </Link>
        </div>
      </div>
    </SlideEffect>
  )
}
