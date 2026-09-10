'use client'

import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import Link from "next/link"

const settings = {
  eyebrow: 'Where We Operate',
  title: 'Service Area',
  description: 'Iron Bridge is based in the DMV and built to run daily throughout Maryland, Washington DC, and Northern Virginia.',
  regions: [
    {
      title: 'Maryland',
      cities: ['Baltimore', 'Bowie', 'Annapolis', 'Columbia', 'Silver Spring', 'Rockville', 'Bethesda', 'Hyattsville'],
    },
    {
      title: 'Washington, DC',
      cities: ['Washington, DC'],
    },
    {
      title: 'Northern Virginia',
      cities: ['Arlington', 'Alexandria', 'Fairfax', 'Reston', 'Sterling', 'Ashburn'],
    },
  ],
  note: 'Regional and Mid-Atlantic transportation may also be available depending on the assignment.',
  CTA: {
    content: 'Discuss Your Service Area',
    href: '/request-a-quote'
  }
}

export default function Features4() {
  return (
    <div id='service-area' className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 mx-auto text-center">
      {/* Eyebrow */}
      <SlideEffect>
        <span className="text-xs md:text-sm font-medium tracking-[0.14em] uppercase text-teal">{settings.eyebrow}</span>
      </SlideEffect>

      {/* Title */}
      <SlideEffect>
        <h2 className="font-serif text-2xl md:text-4xl lg:text-header font-semibold leading-tight text-navy">{settings.title}</h2>
      </SlideEffect>

      {/* Description */}
      <SlideEffect className="px-2 sm:px-10 md:px-0 w-full md:max-w-2xl mx-auto text-sm lg:text-base">{settings.description}</SlideEffect>

      {/* Regions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {settings.regions.map((region, i) => (
          <SlideEffect key={region.title} direction="top" delay={0.1 * i} isSpring={false}>
            <div className="rounded-2xl bg-secondary p-8 h-full text-left space-y-4">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-teal shrink-0" />
                <h3 className="text-lg text-navy font-medium">{region.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {region.cities.map(city => (
                  <span key={city} className="text-xs rounded-full border border-border px-3 py-1 text-foreground">{city}</span>
                ))}
              </div>
            </div>
          </SlideEffect>
        ))}
      </div>

      <SlideEffect className="text-xs md:text-sm text-foreground/80 italic">{settings.note}</SlideEffect>

      <SlideEffect>
        <Link href={settings.CTA.href}>
          <Button variant='outline' size='lg'>{settings.CTA.content}</Button>
        </Link>
      </SlideEffect>
    </div>
  )
}
