import type { Metadata } from "next"
import Card from "@/components/card"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import PageHeader from "@/components/page-header"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import IconBadge from "@/components/ui/icon-badge"
import {
  Clock, FileCheck, PackageCheck, Snowflake, Stethoscope,
  ShieldCheck, Syringe, Truck as TruckIcon
} from "lucide-react"

export const metadata: Metadata = {
  title: "Medical Courier Services | Maryland, Washington DC, Northern Virginia",
  description: "Blood and lab specimen transport, cold-packed and temperature-sensitive shipments, and STAT courier support for healthcare organizations across Maryland, Washington DC, and Northern Virginia.",
}

const capabilities = [
  { icon: Syringe, title: 'Blood & Lab Specimen Transportation', content: 'Pickup and delivery of blood and laboratory specimens between healthcare facilities, labs, and testing sites.' },
  { icon: Snowflake, title: 'Cold-Packed & Temperature-Sensitive Shipments', content: 'Transport of shipments requiring cold packs or temperature-controlled handling, following the client’s stated range and monitoring instructions.' },
  { icon: Stethoscope, title: 'Laboratory Pickup & Delivery', content: 'Scheduled and on-demand pickup and delivery between laboratories and healthcare sites.' },
  { icon: TruckIcon, title: 'Healthcare Supply Transportation', content: 'Delivery of healthcare supplies and medical equipment between facilities.' },
  { icon: Clock, title: 'Scheduled Medical Courier Routes', content: 'Recurring pickup and delivery windows built around a facility’s operating schedule.' },
  { icon: Clock, title: 'Time-Sensitive / STAT Support', content: 'Expedited courier support for time-critical medical shipments.' },
  { icon: PackageCheck, title: 'Chain-of-Custody Transportation', content: 'Shipments are accepted, tracked, and released to authorized recipients following documented custody procedures.' },
  { icon: FileCheck, title: 'Proof-of-Delivery Documentation', content: 'Delivery confirmation with receiver information, timestamp, and shipment condition as required.' },
]

export default function MedicalCourierPage() {
  return (
    <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-14 sm:space-y-16 md:space-y-20 scroll-smooth">
      <PageHeader
        eyebrow="Medical Courier"
        title="Medical Courier Services"
        description="Reliable, professionally handled specimen and healthcare logistics support throughout Maryland, Washington DC, and Northern Virginia."
      />

      <div className="space-y-8 md:space-y-10">
        <SectionHeader title="What We Handle" align="left" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {capabilities.map((cap, i) => (
            <SlideEffect key={cap.title} direction="top" delay={0.05 * i} isSpring={false}>
              <Card>
                <div className="flex flex-row items-start gap-4">
                  <IconBadge icon={cap.icon} size={20} />
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

      {/* Compliance callout */}
      <SlideEffect isSpring={false}>
        <Card>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <IconBadge icon={ShieldCheck} size={28} className="p-3" />
            <div className="space-y-1.5">
              <h3 className="text-lg text-navy font-medium">HIPAA & Bloodborne Pathogens Trained Personnel</h3>
              <p className="text-sm">Iron Bridge personnel involved in medical courier work have completed HIPAA privacy awareness and Bloodborne Pathogens training as part of our medical courier standards, alongside documented chain-of-custody and proof-of-delivery procedures.</p>
            </div>
          </div>
        </Card>
      </SlideEffect>

      {/* Organ/tissue - emerging capability */}
      <div className="space-y-6">
        <SectionHeader eyebrow="Looking Ahead" title="Organ & Tissue Logistics" align="left" />
        <p className="text-sm md:text-base max-w-3xl">
          Specialized medical transportation, including organ and tissue logistics, is an emerging capability
          we are developing — not a service we currently offer. It will be provided once the appropriate
          client requirements, training, packaging, temperature-control, chain-of-custody, insurance, and
          regulatory requirements have been satisfied for a given engagement.
        </p>
      </div>

      <CTA />
      <Footer />
    </div>
  )
}
