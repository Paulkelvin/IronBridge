'use client'

import Card from "@/components/card"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import { Quote, Star } from "lucide-react"

// Placeholder testimonials — replace with real client quotes.
const settings = {
  eyebrow: 'What Clients Say',
  title: 'Trusted by Healthcare & Commercial Partners',
  description: 'A few words from the organizations we deliver for, day in and day out.',
  testimonials: [
    {
      quote: 'Iron Bridge has been rock-solid for our specimen transport. Pickups are on time, chain-of-custody is documented every time, and their team communicates proactively if anything changes.',
      name: 'Sarah M.',
      role: 'Lab Operations Manager',
    },
    {
      quote: 'We switched our commercial routes to Iron Bridge and haven’t looked back. Reliable drivers, clear communication, and they treat our deliveries like their own business depends on it.',
      name: 'David R.',
      role: 'Operations Director',
    },
    {
      quote: 'Same-day requests are handled without hassle, even on short notice. It’s the kind of dependability that makes them an easy partner to work with.',
      name: 'Angela T.',
      role: 'Practice Manager',
    },
  ],
}

export default function Testimonials() {
  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12 mx-auto text-center">
      <SectionHeader eyebrow={settings.eyebrow} title={settings.title} description={settings.description} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {settings.testimonials.map((t, i) => (
          <SlideEffect key={t.name} direction="top" delay={0.1 * i} className="col-span-1 h-full" isSpring={false}>
            <Card>
              <div className="flex items-center justify-between w-full">
                <Quote size={28} strokeWidth={1.5} className="text-teal/50" aria-hidden="true" />
                <div className="flex items-center gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <CardBody quote={t.quote} />
              <div>
                <p className="font-semibold text-navy">{t.name}</p>
                <p className="text-xs md:text-sm text-foreground/60">{t.role}</p>
              </div>
            </Card>
          </SlideEffect>
        ))}
      </div>

      <p className="text-xs text-foreground/50 italic">Representative testimonials shown while we collect client reviews.</p>
    </div>
  )
}

function CardBody({ quote }: { quote: string }) {
  return <p className="text-sm md:text-base text-foreground/80 leading-relaxed">&ldquo;{quote}&rdquo;</p>
}
