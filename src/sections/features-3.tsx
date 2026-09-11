'use client'

import DiagonalRoute from "@/components/graphics/diagonal-route"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import { Briefcase, Building2, Car, HardHat, Landmark, Stethoscope, Store, Warehouse } from "lucide-react"

const settings = {
  eyebrow: 'Who We Serve',
  title: 'Industries Served',
  description: 'From laboratories to commercial businesses, Iron Bridge supports organizations that need transportation they can count on.',
  industries: [
    { icon: Stethoscope, title: 'Healthcare & Laboratories' },
    { icon: Building2, title: 'Medical Practices' },
    { icon: Warehouse, title: 'Logistics & Distribution' },
    { icon: Car, title: 'Automotive' },
    { icon: Briefcase, title: 'Professional Services' },
    { icon: HardHat, title: 'Contractors & Trades' },
    { icon: Store, title: 'Retail & Commercial Businesses' },
    { icon: Landmark, title: 'Government & Institutional Organizations' },
  ]
}

export default function Features3() {
  return (
    <div id='industries' className="relative space-y-8 md:space-y-10 lg:space-y-12 mx-auto text-center">
      <div className="absolute top-0 left-1/2 w-screen -translate-x-1/2 h-[120px] md:h-[180px] -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        <DiagonalRoute className="absolute top-0 right-0 w-[140px] md:w-[220px] h-full text-navy/[0.16] scale-x-[-1] scale-y-[-1]" />
      </div>

      <SectionHeader eyebrow={settings.eyebrow} title={settings.title} description={settings.description} />

      {/* Chips */}
      <SlideEffect isSpring={false} className="rounded-2xl bg-secondary p-6 md:p-8">
        <div className="flex flex-wrap justify-center gap-3">
          {settings.industries.map((industry) => (
            <span
              key={industry.title}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-navy"
            >
              <industry.icon size={16} strokeWidth={1.5} className="text-teal-dark shrink-0" />
              {industry.title}
            </span>
          ))}
        </div>
      </SlideEffect>
    </div>
  )
}
