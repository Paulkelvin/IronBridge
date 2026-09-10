import type { Metadata } from "next"
import Card from "@/components/card"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import PageHeader from "@/components/page-header"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
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
    <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-14 sm:space-y-16 md:space-y-20 scroll-smooth">
      <PageHeader
        eyebrow="Commercial Logistics"
        title="Commercial Logistics"
        description="Dependable transportation for businesses across Maryland, Washington DC, and Northern Virginia — beyond healthcare, built for everyday commercial delivery."
      />

      <div className="space-y-8 md:space-y-10">
        <SectionHeader title="What We Handle" align="left" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {capabilities.map((cap, i) => (
            <SlideEffect key={cap.title} direction="top" delay={0.05 * i} isSpring={false}>
              <Card>
                <div className="flex flex-row items-start gap-4">
                  <cap.icon size={22} strokeWidth={1.5} className="text-teal shrink-0 mt-0.5" />
                  <div className="space-y-1.5">
                    <h3 className="text-base text-navy font-medium">{cap.title}</h3>
                    <p className="text-sm">{cap.content}</p>
                  </div>
                </div>
              </Card>
            </SlideEffect>
          ))}
        </div>
      </div>

      <CTA />
      <Footer />
    </div>
  )
}
