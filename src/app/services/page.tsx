import type { Metadata } from "next"
import Card from "@/components/card"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import ServicesHero from "@/sections/services-hero"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import TimelineSteps from "@/components/timeline-steps"
import { CardBody, CardTitle } from "@/components/ui/card-text"
import IconBadge from "@/components/ui/icon-badge"
import { ArrowRight, Repeat, Stethoscope, Truck } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Services | Iron Bridge Mobility Solutions",
  description: "Medical courier and commercial logistics services throughout Maryland, Washington DC, and Northern Virginia — specimen transport, same-day delivery, and dedicated routes.",
}

const howWeWork = [
  { title: '1. Tell us what you need', content: 'Submit a quote request with pickup/delivery details, timing, and any special handling requirements.' },
  { title: '2. We confirm the plan', content: 'Our team follows up to confirm scope, timing, and any client-specific requirements before dispatch.' },
  { title: '3. Delivered, documented', content: 'Your shipment is delivered following chain-of-custody procedures with proof-of-delivery documentation.' },
]

const services = [
  {
    icon: Stethoscope,
    title: 'Medical Courier',
    content: 'Blood and lab specimen transportation, cold-packed and temperature-sensitive shipments, healthcare supply delivery, and time-sensitive STAT courier support — handled with chain-of-custody and proof-of-delivery procedures.',
    href: '/medical-courier',
  },
  {
    icon: Truck,
    title: 'Commercial Logistics',
    content: 'Cargo van transportation, same-day and expedited delivery, B2B and last-mile delivery, multi-stop routes, and overflow/backup route coverage for businesses across the region.',
    href: '/commercial-logistics',
  },
  {
    icon: Repeat,
    title: 'Dedicated Routes',
    content: 'Consistent daily, weekly, or recurring transportation for businesses, laboratories, and healthcare organizations that need reliable coverage without maintaining their own fleet.',
    href: '/dedicated-routes',
  },
]

export default function ServicesPage() {
  return (
    <div className="px-4 xl:px-0 max-w-7xl mx-auto space-y-14 sm:space-y-16 md:space-y-20 scroll-smooth">
      <ServicesHero />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
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

      <div className="space-y-8 md:space-y-10">
        <SectionHeader
          eyebrow="How We Work"
          title="Every Route Runs on the Same Standards"
          description="Whether it's a single lab specimen or a recurring commercial route, deliveries are handled with the same documented procedures."
        />
        <TimelineSteps steps={howWeWork} />
      </div>

      <CTA />
      <Footer />
    </div>
  )
}
