import type { Metadata } from "next"
import Card from "@/components/card"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import PageHeader from "@/components/page-header"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import IconBadge from "@/components/ui/icon-badge"
import {
  FileCheck, IdCard, PackageCheck, ShieldAlert, ShieldCheck, Thermometer
} from "lucide-react"

export const metadata: Metadata = {
  title: "Compliance & Safety | Iron Bridge Mobility Solutions",
  description: "How Iron Bridge trains, qualifies, and documents medical courier and logistics operations — HIPAA and Bloodborne Pathogens training, chain-of-custody, and driver qualification standards.",
}

const pillars = [
  {
    icon: ShieldCheck,
    title: 'HIPAA & Privacy Awareness',
    content: 'Personnel involved in medical courier work complete HIPAA privacy awareness training. We do not describe this as "HIPAA certification" — training is documented and retained, and handling follows a minimum-necessary, need-to-know approach to any protected health information encountered.',
  },
  {
    icon: ShieldAlert,
    title: 'Bloodborne Pathogens Training',
    content: 'Personnel handling specimen shipments complete Bloodborne Pathogens training covering exposure risk, PPE, and reporting procedures for a suspected exposure or damaged package.',
  },
  {
    icon: PackageCheck,
    title: 'Chain-of-Custody Procedures',
    content: 'Custody is accepted only from an authorized releasing person or location, verified against shipment ID, package count, and seal status, and released only to the designated receiver or an approved secure procedure at delivery.',
  },
  {
    icon: FileCheck,
    title: 'Proof-of-Delivery Documentation',
    content: 'Deliveries are confirmed with receiver information, date/time, and shipment condition, with delays, damage, or discrepancies reported immediately.',
  },
  {
    icon: Thermometer,
    title: 'Temperature-Sensitive Handling',
    content: 'Cold-packed and temperature-controlled shipments are transported following the client’s stated range and monitoring instructions. Cold packs, dry ice, or packaging are never altered except by personnel specifically trained and authorized to do so.',
  },
  {
    icon: IdCard,
    title: 'Driver Qualification Standards',
    content: 'Before a driver is assigned a medical route, we verify a valid license, motor vehicle record, background screening, vehicle registration and condition, and commercial-use insurance coverage, in addition to required training.',
  },
]

export default function ComplianceSafetyPage() {
  return (
    <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-14 sm:space-y-16 md:space-y-20 scroll-smooth">
      <PageHeader
        eyebrow="Compliance & Safety"
        title="Trained. Documented. Accountable."
        description="How we train personnel, qualify drivers, and document handling for medical courier and commercial logistics work."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pillars.map((p, i) => (
          <SlideEffect key={p.title} direction="top" delay={0.06 * i} isSpring={false}>
            <Card>
              <IconBadge icon={p.icon} size={22} />
              <h3 className="text-base text-navy font-medium">{p.title}</h3>
              <p className="text-sm">{p.content}</p>
            </Card>
          </SlideEffect>
        ))}
      </div>

      <div className="space-y-8 md:space-y-10">
        <SectionHeader
          eyebrow="Every Assignment"
          title="Client-Specific Requirements"
          description="Some clients — particularly healthcare organizations and laboratories — have transportation requirements beyond our baseline standards."
          align="left"
        />
        <SlideEffect isSpring={false}>
          <p className="text-sm md:text-base max-w-3xl">
            Where a client has additional requirements — specific packaging, badging, site access
            procedures, or training — those are completed before a route is assigned. Route-specific
            instructions may be more restrictive than our baseline standards, and drivers are directed
            to stop and confirm with Iron Bridge before taking any action that could compromise safety,
            custody, privacy, or specimen integrity.
          </p>
        </SlideEffect>
      </div>

      <CTA />
      <Footer />
    </div>
  )
}
