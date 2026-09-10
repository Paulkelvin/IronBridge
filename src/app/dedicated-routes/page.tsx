import type { Metadata } from "next"
import Card from "@/components/card"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import PageHeader from "@/components/page-header"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import { Building2, CalendarClock, FlaskConical, Truck, Wallet } from "lucide-react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dedicated Delivery Routes | Iron Bridge Mobility Solutions",
  description: "Consistent daily, weekly, or recurring transportation for businesses, laboratories, and healthcare organizations across Maryland, Washington DC, and Northern Virginia.",
}

const audiences = [
  { icon: FlaskConical, title: 'Laboratories & Healthcare Organizations', content: 'Recurring specimen and supply routes built around your operating schedule.' },
  { icon: Building2, title: 'Businesses & Logistics Companies', content: 'Daily or weekly delivery routes that support your operations without added overhead.' },
  { icon: Truck, title: 'Organizations Needing Overflow Coverage', content: 'Backup or supplemental route coverage when your own fleet needs support.' },
]

export default function DedicatedRoutesPage() {
  return (
    <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-14 sm:space-y-16 md:space-y-20 scroll-smooth">
      <PageHeader
        eyebrow="Dedicated Routes"
        title="Dedicated & Recurring Routes"
        description="Consistent transportation without the expense and responsibility of maintaining your own delivery fleet."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <SlideEffect direction="right" isSpring={false} className="space-y-5">
          <Wallet size={30} className="text-teal" />
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-navy leading-tight">
            Built for Organizations That Need Transportation Every Day
          </h2>
          <p className="text-sm md:text-base">
            Running your own delivery fleet means vehicles, insurance, drivers, and management overhead.
            A dedicated route with Iron Bridge gives you the same reliability — daily, weekly, or on
            whatever schedule your operation runs on — without owning and managing that fleet yourself.
          </p>
        </SlideEffect>
        <SlideEffect direction="left" isSpring={false}>
          <Card>
            <CalendarClock size={26} className="text-teal" />
            <h3 className="text-lg text-navy font-medium">How It Works</h3>
            <ul className="text-sm space-y-2 list-disc pl-4">
              <li>Tell us your pickup/delivery points, stop count, and frequency</li>
              <li>We confirm a route plan and schedule</li>
              <li>Your route runs on the agreed cadence, with proof-of-delivery on every stop</li>
            </ul>
          </Card>
        </SlideEffect>
      </div>

      <div className="space-y-6 md:space-y-7">
        <SectionHeader eyebrow="Who This Is For" title="Built for Recurring Operations" align="left" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {audiences.map((a, i) => (
            <SlideEffect key={a.title} direction="top" delay={0.1 * i} isSpring={false}>
              <Card>
                <a.icon size={24} className="text-teal" />
                <h3 className="text-base text-navy font-medium">{a.title}</h3>
                <p className="text-sm">{a.content}</p>
              </Card>
            </SlideEffect>
          ))}
        </div>
      </div>

      <SlideEffect isSpring={false} className="text-center">
        <Link href="/request-a-quote">
          <Button size="lg">
            Discuss a Dedicated Route
            <ArrowRight />
          </Button>
        </Link>
      </SlideEffect>

      <CTA />
      <Footer />
    </div>
  )
}
