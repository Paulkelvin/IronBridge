'use client'

import Card from "@/components/card"
import SlideEffect from "@/components/slide-effect"
import { ArrowRight, Repeat, Stethoscope, Truck } from "lucide-react"
import Link from "next/link"

const settings = {
  eyebrow: 'What We Do',
  title: 'Regional Logistics Built Around Reliability',
  description: 'Iron Bridge supports healthcare organizations and commercial businesses with dependable, professionally handled transportation across Maryland, Washington DC, and Northern Virginia.',
  services: [
    {
      icon: Stethoscope,
      title: 'Medical Courier',
      content: 'Specimen and lab transport, cold-packed and temperature-sensitive shipments, and time-sensitive STAT courier support handled with chain-of-custody and proof-of-delivery procedures.',
      href: '/medical-courier',
    },
    {
      icon: Truck,
      title: 'Commercial Logistics',
      content: 'Cargo van transportation, same-day and expedited delivery, and scheduled multi-stop routes for B2B and last-mile needs across the region.',
      href: '/commercial-logistics',
    },
    {
      icon: Repeat,
      title: 'Dedicated Routes',
      content: 'Consistent daily, weekly, or recurring transportation for businesses, labs, and organizations that need reliable coverage without the cost of maintaining their own fleet.',
      href: '/dedicated-routes',
    },
  ]
}

export default function Features1() {
  return (
    <div id='services' className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 mx-auto text-center">
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

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {settings.services.map((service, i) => (
          <SlideEffect key={service.title} direction="top" delay={0.1 * i} className="col-span-1 h-full" isSpring={false}>
            <Card>
              <service.icon size={28} className="text-teal" />
              <h3 className="text-xl md:text-title text-navy font-medium">{service.title}</h3>
              <p>{service.content}</p>
              <Link href={service.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-teal transition-colors mt-auto">
                Learn more <ArrowRight size={15} />
              </Link>
            </Card>
          </SlideEffect>
        ))}
      </div>
    </div>
  )
}
