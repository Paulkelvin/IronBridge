import type { Metadata } from "next"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import PageHeader from "@/components/page-header"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import IconBadge from "@/components/ui/icon-badge"
import { CardBody, CardTitle } from "@/components/ui/card-text"
import Card from "@/components/card"
import {
  ArrowRight, Building2, ClipboardCheck, Download, Factory,
  FileText, Hammer, MapPin, Package, ShieldCheck, Stethoscope,
  Store, Truck, UserCheck, Briefcase, Globe
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Capability Statement | Iron Bridge Mobility Solutions",
  description: "Core capabilities, qualifications, and company snapshot for Iron Bridge Mobility Solutions — medical courier, commercial logistics, and bulk-item removal across Maryland, DC, and Northern Virginia.",
}

const capabilities = [
  {
    icon: Stethoscope,
    title: 'Medical Courier and Specimen Transport',
    content: 'Sealed specimen and laboratory shipments, cold-packed and temperature-sensitive transport, STAT support, documented chain of custody, and time-stamped proof of delivery.',
  },
  {
    icon: Truck,
    title: 'Commercial Logistics and Dedicated Routes',
    content: 'Same-day and expedited cargo-van delivery, scheduled multi-stop routes, last-mile fulfillment, recurring route coverage, and overflow or backup transportation support.',
  },
  {
    icon: Package,
    title: 'Bulk-Item Removal',
    content: 'Furniture, appliance, office-equipment, unit-turnover, move-out, and eviction cleanout support for property managers, HOAs, businesses, and residential clients.',
  },
]

const industries = [
  { icon: Stethoscope, name: 'Healthcare and laboratories' },
  { icon: Building2, name: 'Medical practices' },
  { icon: Factory, name: 'Logistics and distribution' },
  { icon: Building2, name: 'Property managers' },
  { icon: Store, name: 'Retail and commercial businesses' },
  { icon: Hammer, name: 'Contractors and trades' },
  { icon: Briefcase, name: 'Professional services' },
  { icon: Globe, name: 'Public sector' },
]

const qualifications = [
  'Insured transportation provider',
  'HIPAA and Bloodborne Pathogens trained',
  'DOT Category B trained owner-operator',
  'Documented chain-of-custody procedures',
  'Driver qualification and assignment standards',
  'Maryland-based business',
]

const whyIronBridge = [
  'Owner-operator oversight and direct accountability',
  'Clear client communication from pickup through completion',
  'Flexible one-time, recurring, and overflow support',
  'Documented custody and proof-of-delivery procedures',
  'Professional commercial cargo-van service',
  'Regional coverage with Mid-Atlantic assignments considered',
]

const snapshot = [
  { label: 'Legal Name', value: 'Iron Bridge Mobility Solutions LLC' },
  { label: 'Location', value: 'Bowie, Maryland' },
  { label: 'Coverage', value: 'MD | DC | Northern VA' },
  { label: 'Primary NAICS', value: '492110' },
  { label: 'Additional NAICS', value: '492210 | 484110' },
  { label: 'Vehicle', value: 'Full-size commercial cargo van' },
]

export default function CapabilityStatementPage() {
  return (
    <div className="px-4 xl:px-6 max-w-7xl mx-auto space-y-24 sm:space-y-32 md:space-y-40 scroll-smooth">
      <PageHeader
        eyebrow="Capability Statement"
        title="What We Bring to the Table"
        description="Dependable transportation. Documented handoffs. Responsive regional coverage across Maryland, Washington DC, and Northern Virginia."
      />

      {/* Download PDF */}
      <SlideEffect className="flex justify-center">
        <a href="/Iron-Bridge-Capability-Statement.pdf" download>
          <Button size="lg" className="bg-teal hover:bg-teal-light text-white">
            <Download size={16} strokeWidth={1.5} />
            Download PDF
          </Button>
        </a>
      </SlideEffect>

      {/* Core Capabilities */}
      <div className="space-y-8 md:space-y-10">
        <SectionHeader eyebrow="Core Capabilities" title="What We Do" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <SlideEffect key={cap.title} delay={0.1 * i}>
              <Card className="h-full">
                <IconBadge icon={cap.icon} />
                <CardTitle>{cap.title}</CardTitle>
                <CardBody>{cap.content}</CardBody>
              </Card>
            </SlideEffect>
          ))}
        </div>
      </div>

      {/* Industries Served */}
      <div className="space-y-8 md:space-y-10">
        <SectionHeader eyebrow="Industries Served" title="Who We Work With" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.map((ind, i) => (
            <SlideEffect key={ind.name} delay={0.05 * i}>
              <div className="flex items-center gap-3 rounded-xl border border-border p-4">
                <ind.icon size={18} strokeWidth={1.5} className="text-teal shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium text-navy">{ind.name}</span>
              </div>
            </SlideEffect>
          ))}
        </div>
      </div>

      {/* Why Iron Bridge + Qualifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
        <SlideEffect>
          <div className="space-y-5">
            <SectionHeader eyebrow="Differentiators" title="Why Iron Bridge" />
            <ul className="space-y-3">
              {whyIronBridge.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <UserCheck size={16} strokeWidth={1.5} className="text-teal shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </SlideEffect>

        <SlideEffect delay={0.1}>
          <div className="space-y-5">
            <SectionHeader eyebrow="Qualifications" title="Our Standards" />
            <ul className="space-y-3">
              {qualifications.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <ShieldCheck size={16} strokeWidth={1.5} className="text-teal shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </SlideEffect>
      </div>

      {/* Company Snapshot */}
      <div className="space-y-8 md:space-y-10">
        <SectionHeader eyebrow="Company Snapshot" title="At a Glance" />
        <SlideEffect>
          <div className="rounded-2xl border border-border bg-secondary p-6 md:p-8">
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              {snapshot.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-medium tracking-[0.1em] uppercase text-foreground/60">{item.label}</dt>
                  <dd className="text-sm font-semibold text-navy mt-0.5">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </SlideEffect>
      </div>

      {/* Service Approach */}
      <SlideEffect>
        <div className="rounded-2xl border border-teal/20 bg-teal-tint/30 p-6 md:p-8 space-y-3 text-center">
          <div className="flex justify-center">
            <IconBadge icon={FileText} />
          </div>
          <h3 className="font-serif text-xl md:text-2xl font-semibold text-navy">Service Approach</h3>
          <p className="text-sm md:text-base text-foreground max-w-2xl mx-auto">
            Each assignment is confirmed around the client&apos;s pickup window, delivery requirements, authorized recipient,
            handling instructions, and documentation needs. Completed service is supported by proof of delivery appropriate to the account.
          </p>
        </div>
      </SlideEffect>

      {/* CTA */}
      <SlideEffect className="flex justify-center">
        <Link href="/request-a-quote">
          <Button size="lg" className="bg-navy hover:bg-navy/90 text-white">
            Let&apos;s Discuss Your Route
            <ArrowRight size={16} strokeWidth={1.5} />
          </Button>
        </Link>
      </SlideEffect>

      <CTA />
      <Footer />
    </div>
  )
}
