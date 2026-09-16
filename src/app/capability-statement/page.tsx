import type { Metadata } from "next"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import DownloadButton from "@/components/download-button"
import { Button } from "@/components/ui/button"
import IconBadge from "@/components/ui/icon-badge"
import { CardBody, CardTitle } from "@/components/ui/card-text"
import Card from "@/components/card"
import {
  ArrowRight, Building2, ClipboardCheck, Factory,
  FileText, Hammer, MapPin, Package, ShieldCheck, Stethoscope,
  Store, Truck, UserCheck, Briefcase, Globe
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import DotGrid from "@/components/graphics/dot-grid"

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
  { label: 'Vehicle', value: 'Full-size commercial cargo van' },
]

export default function CapabilityStatementPage() {
  return (
    <div className="px-4 xl:px-6 max-w-7xl mx-auto space-y-24 sm:space-y-32 md:space-y-40 scroll-smooth">
      {/* Hero */}
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 -z-20">
            <Image
              src="/brand/capability-statement-hero.jpg"
              alt="A courier and client completing a signed proof-of-delivery handoff"
              fill
              className="object-cover object-center"
              priority
              quality={85}
            />
          </div>
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: 'linear-gradient(180deg, rgba(16,26,48,0.88) 0%, rgba(16,26,48,0.72) 45%, rgba(16,26,48,0.88) 100%)',
            }}
          />
          <section className="relative px-4 xl:px-6 max-w-7xl mx-auto py-20 md:py-28 lg:py-32 flex flex-col items-center text-center gap-6 md:gap-8">
            <SlideEffect>
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-[11px] md:text-xs font-medium tracking-[0.14em] text-white/90 uppercase">
                Capability Statement
              </span>
            </SlideEffect>
            <SlideEffect delay={0.05}>
              <h1 className="font-serif text-white text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] max-w-3xl whitespace-nowrap">
                What We Bring to the Table
              </h1>
            </SlideEffect>
            <SlideEffect delay={0.1} className="flex justify-center">
              <DownloadButton href="/Iron-Bridge-Capability-Statement.pdf" filename="Iron-Bridge-Capability-Statement.pdf" label="Download Our Capability Statements" />
            </SlideEffect>
          </section>
        </div>
      </div>

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
      <div className="relative left-1/2 w-screen -translate-x-1/2 bg-teal-tint/50">
        <div className="px-4 xl:px-6 max-w-7xl mx-auto py-16 md:py-20 space-y-8 md:space-y-10">
          <SectionHeader eyebrow="Industries Served" title="Who We Work With" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((ind, i) => (
              <SlideEffect key={ind.name} delay={0.05 * i}>
                <div className="flex items-center gap-3 rounded-xl bg-white shadow-[0_1px_8px_rgba(27,42,74,0.06)] p-4">
                  <ind.icon size={18} strokeWidth={1.5} className="text-teal shrink-0" aria-hidden="true" />
                  <span className="text-sm font-medium text-navy">{ind.name}</span>
                </div>
              </SlideEffect>
            ))}
          </div>
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
                  <ShieldCheck size={16} strokeWidth={1.5} className="text-gold-dark shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </SlideEffect>
      </div>

      {/* Company Snapshot */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-navy">
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
          <DotGrid id="capability-snapshot-dot-grid" className="absolute inset-0 h-full w-full text-white/[0.06]" />
        </div>
        <div className="relative px-4 xl:px-6 max-w-7xl mx-auto py-16 md:py-20 space-y-8 md:space-y-10">
          <div className="text-center space-y-1.5 md:space-y-2">
            <SlideEffect>
              <span className="text-xs md:text-sm font-medium tracking-[0.14em] uppercase text-teal-light">Company Snapshot</span>
            </SlideEffect>
            <SlideEffect>
              <h2 className="font-serif text-2xl md:text-4xl lg:text-header font-semibold leading-tight text-white">At a Glance</h2>
            </SlideEffect>
          </div>
          <SlideEffect>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 max-w-4xl mx-auto">
              {snapshot.map((item) => (
                <div key={item.label} className="text-center sm:text-left">
                  <dt className="text-xs font-medium tracking-[0.1em] uppercase text-white/50">{item.label}</dt>
                  <dd className="text-sm font-semibold text-white mt-0.5">{item.value}</dd>
                </div>
              ))}
            </dl>
          </SlideEffect>
        </div>
      </div>

      {/* Service Approach + CTA */}
      <div className="space-y-10">
        <SlideEffect>
          <div className="rounded-2xl bg-teal-tint p-6 md:p-8 space-y-3 text-center">
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
        <SlideEffect className="flex justify-center">
          <Link href="/request-a-quote">
            <Button size="lg" className="bg-navy hover:bg-navy/90 text-white">
              Let&apos;s Discuss Your Route
              <ArrowRight size={16} strokeWidth={1.5} />
            </Button>
          </Link>
        </SlideEffect>
      </div>

      <SlideEffect className="flex justify-center">
        <DownloadButton href="/Iron-Bridge-Capability-Statement.pdf" filename="Iron-Bridge-Capability-Statement.pdf" label="Download Our Capability Statements" />
      </SlideEffect>

      <CTA />
      <Footer />
    </div>
  )
}
