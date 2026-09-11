import type { Metadata } from "next"
import CapabilityList from "@/components/capability-list"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import PageHeader from "@/components/page-header"
import SectionHeader from "@/components/section-header"
import {
  Boxes, Building2, Clock, MapPinned, Repeat, RotateCcw, Truck, Zap
} from "lucide-react"

export const metadata: Metadata = {
  title: "Commercial Logistics | Cargo Van & Same-Day Delivery",
  description: "Cargo van transportation, same-day and expedited delivery, and scheduled commercial routes throughout Maryland, Washington DC, and Northern Virginia.",
}

const capabilities = [
  { icon: Truck, title: 'Cargo Van Transportation', content: 'Point-to-point and multi-stop cargo van delivery sized for business freight and packages.' },
  { icon: Clock, title: 'Same-Day & Expedited Delivery', content: 'Fast turnaround for time-sensitive commercial shipments.' },
  { icon: Building2, title: 'B2B & Last-Mile Delivery', content: 'Business-to-business delivery and last-mile transportation support.' },
  { icon: Zap, title: 'Scheduled Commercial Deliveries', content: 'Planned delivery windows built around your operating schedule.' },
  { icon: MapPinned, title: 'Multi-Stop Routes', content: 'Efficient routing across multiple pickup and delivery points in a single run.' },
  { icon: RotateCcw, title: 'Overflow & Backup Route Coverage', content: 'Additional capacity when your own fleet is stretched or unavailable.' },
  { icon: Boxes, title: 'Contract Logistics Support', content: 'Ongoing logistics support structured around your business requirements.' },
  { icon: Repeat, title: 'Regional Transportation', content: 'Coverage across Maryland, Washington DC, Northern Virginia, and the wider region as needed.' },
]

export default function CommercialLogisticsPage() {
  return (
    <div className="px-4 xl:px-0 max-w-7xl mx-auto space-y-24 sm:space-y-32 md:space-y-40 lg:space-y-56 scroll-smooth">
      <PageHeader
        eyebrow="Commercial Logistics"
        title="Commercial Logistics"
        description="Reliable transportation for businesses across Maryland, Washington DC, and Northern Virginia, built for everyday commercial delivery beyond healthcare."
      />

      <div className="space-y-8 md:space-y-10">
        <SectionHeader title="What We Handle" align="left" />
        <CapabilityList items={capabilities} />
      </div>

      <CTA />
      <Footer />
    </div>
  )
}
