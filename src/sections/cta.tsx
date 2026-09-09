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
    <SlideEffect isSpring={false} className="space-y-6 sm:space-y-7 md:space-y-8 mx-auto text-center p-8 md:p-16 flex flex-col items-center justify-center rounded-2xl bg-navy">
      {/* Title */}
      <h2 className="font-serif text-2xl md:text-4xl lg:text-header font-semibold leading-tight text-white">{settings.title}</h2>

      {/* Description */}
      <p className="px-0 sm:px-10 md:px-0 w-full max-w-full md:max-w-2xl mx-auto text-sm lg:text-base text-white/75">{settings.description}</p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-fit">
        <Link href={settings.primaryCTA.href} className="w-full sm:w-fit">
          <Button className="w-full bg-white text-navy hover:opacity-90" size='lg'>
            {settings.primaryCTA.content}
            <ArrowRight />
          </Button>
        </Link>
        <Link href={settings.secondaryCTA.href} className="w-full sm:w-fit">
          <Button className="w-full bg-transparent border-white/30 text-white hover:bg-white/10" variant='outline' size='lg'>
            {settings.secondaryCTA.content}
          </Button>
        </Link>
      </div>
    </SlideEffect>
  )
}
