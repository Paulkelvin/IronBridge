'use client'

import Card from "@/components/card"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import IconBadge from "@/components/ui/icon-badge"
import { CardBody, CardTitle } from "@/components/ui/card-text"
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
    <div id='services' className="space-y-8 md:space-y-10 lg:space-y-12 mx-auto text-center">
      <SectionHeader eyebrow={settings.eyebrow} title={settings.title} description={settings.description} />

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {settings.services.map((service, i) => (
          <SlideEffect key={service.title} direction="top" delay={0.1 * i} className="col-span-1 h-full" isSpring={false}>
            <Card>
              <IconBadge icon={service.icon} size={26} />
              <CardTitle className="text-xl md:text-title">{service.title}</CardTitle>
              <CardBody>{service.content}</CardBody>
              <Link href={service.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-teal transition-colors mt-auto">
                Learn more <ArrowRight size={15} strokeWidth={1.5} />
              </Link>
            </Card>
          </SlideEffect>
        ))}
      </div>
    </div>
  )
}
