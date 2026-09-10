'use client'

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
    <div id='industries' className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 mx-auto text-center">
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

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {settings.industries.map((industry, i) => (
          <SlideEffect key={industry.title} direction="top" delay={0.05 * i} isSpring={false}>
            <div className="rounded-2xl border border-border bg-secondary p-6 flex flex-col items-center justify-center gap-3 h-full text-center">
              <industry.icon size={24} className="text-teal" />
              <span className="text-sm font-medium text-navy leading-snug">{industry.title}</span>
            </div>
          </SlideEffect>
        ))}
      </div>
    </div>
  )
}
