'use client'

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
    <SlideEffect isSpring={false} className="space-y-4 sm:space-y-5 md:space-y-6 mx-auto text-center p-8 md:p-16 flex flex-col items-center justify-center rounded-2xl bg-navy">
      {/* Title */}
      <h2 className="font-serif text-2xl md:text-4xl lg:text-header font-semibold leading-tight text-white">{settings.title}</h2>

      {/* Description */}
      <p className="px-0 sm:px-10 md:px-0 w-full max-w-full md:max-w-2xl mx-auto text-sm lg:text-base text-white/75">{settings.description}</p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-fit">
        <Link href={settings.primaryCTA.href} className="w-full sm:w-fit">
          <Button
            size='lg'
            className="w-full rounded-none bg-white text-navy border border-white uppercase tracking-[0.14em] text-xs sm:text-sm font-semibold hover:bg-transparent hover:text-white transition-colors"
          >
            {settings.primaryCTA.content}
            <ArrowRight />
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
    </SlideEffect>
  )
}
