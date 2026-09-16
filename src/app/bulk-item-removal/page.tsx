import type { Metadata } from "next"
import Card from "@/components/card"
import CapabilityList from "@/components/capability-list"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import PageHeader from "@/components/page-header"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import { CardBody, CardTitle } from "@/components/ui/card-text"
import IconBadge from "@/components/ui/icon-badge"
import {
  ArrowRight, Building2, CalendarClock, ClipboardCheck, DoorOpen,
  Home, MapPinned, Refrigerator, Sofa
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Bulk-Item Removal | Furniture & Appliance Removal",
  description: "Furniture, appliance, and large-item removal for property managers, businesses, and residential customers across Maryland, Washington DC, and Northern Virginia.",
}

const capabilities = [
  { icon: Sofa, title: 'Furniture Removal', content: 'Couches, mattresses, dressers, office furniture, and other large furniture items.' },
  { icon: Refrigerator, title: 'Appliance Removal', content: 'Refrigerators, washers, dryers, and other bulky appliances.' },
  { icon: DoorOpen, title: 'Unit Turnover & Move-Out Cleanouts', content: 'Leftover furniture and belongings cleared from vacated units between tenants.' },
  { icon: ClipboardCheck, title: 'Eviction Cleanouts', content: 'Prompt, documented removal for eviction and abandonment situations.' },
  { icon: Building2, title: 'Office & Commercial Cleanouts', content: 'Desks, cubicles, filing cabinets, and surplus equipment removed from commercial spaces.' },
  { icon: MapPinned, title: 'Multi-Unit & Portfolio Coverage', content: 'Consistent service across multiple properties for property management companies and HOAs.' },
]

const audiences = [
  { icon: Building2, title: 'Property Managers & HOAs', content: 'Unit turnovers, tenant move-outs, and community cleanouts handled quickly and reliably.' },
  { icon: MapPinned, title: 'Businesses & Offices', content: 'Surplus furniture, equipment, and office cleanouts removed without disrupting operations.' },
  { icon: Home, title: 'Residential Customers', content: 'One-time or occasional large-item pickup for homeowners.' },
]

const howItWorks = [
  'Tell us what needs to be removed and where',
  'We confirm scope, timing, and any access requirements',
  'Items are picked up and removed, with confirmation when complete',
]

export default function BulkItemRemovalPage() {
  return (
    <div className="px-4 xl:px-6 max-w-7xl mx-auto space-y-24 sm:space-y-32 md:space-y-40 scroll-smooth">
      <PageHeader
        eyebrow="Bulk-Item Removal"
        title="Bulk-Item Removal"
        description="Furniture, appliance, and large-item removal for property managers, businesses, and residential customers across Maryland, Washington DC, and Northern Virginia."
      />

      <div className="space-y-8 md:space-y-10">
        <SectionHeader title="What We Handle" align="left" />
        <CapabilityList items={capabilities} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <SlideEffect direction="right" isSpring={false} className="space-y-5">
          <div className="flex items-center gap-3">
            <IconBadge icon={CalendarClock} size={24} />
            <CardTitle className="text-lg">How It Works</CardTitle>
          </div>
          <ol className="relative space-y-5">
            <div className="absolute left-[15px] top-2 bottom-2 border-l-2 border-dashed border-teal/30 -z-10" aria-hidden="true" />
            {howItWorks.map((step, i) => (
              <li key={step} className="flex items-start gap-4">
                <span className="shrink-0 flex items-center justify-center h-8 w-8 rounded-full border-2 border-teal bg-background text-teal text-sm font-semibold">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-500 pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </SlideEffect>
        <SlideEffect direction="left" isSpring={false} className="space-y-5">
          <IconBadge icon={ClipboardCheck} size={26} className="p-3" />
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-navy leading-tight">
            Scheduled or On-Demand Pickup
          </h2>
          <p className="text-sm md:text-base">
            Whether it&apos;s a one-time haul or recurring pickup across multiple properties,
            bulk-item removal runs on the same documented, proof-of-service standards used
            across every Iron Bridge route.
          </p>
        </SlideEffect>
      </div>

      <div className="space-y-8 md:space-y-10">
        <SectionHeader eyebrow="Who This Is For" title="Built for Property Managers and Businesses" align="left" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {audiences.map((a, i) => (
            <SlideEffect key={a.title} direction="top" delay={0.1 * i} isSpring={false}>
              <Card>
                <IconBadge icon={a.icon} size={22} />
                <CardTitle className="text-base">{a.title}</CardTitle>
                <CardBody className="text-sm">{a.content}</CardBody>
              </Card>
            </SlideEffect>
          ))}
        </div>
      </div>

      <SlideEffect isSpring={false} className="text-center">
        <Link href="/request-a-quote">
          <Button size="lg">
            Request a Bulk-Item Pickup
            <ArrowRight strokeWidth={1.5} />
          </Button>
        </Link>
      </SlideEffect>

      <CTA />
      <Footer />
    </div>
  )
}
