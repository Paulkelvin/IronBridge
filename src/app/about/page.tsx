import type { Metadata } from "next"
import DotGrid from "@/components/graphics/dot-grid"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import PageHeader from "@/components/page-header"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import TimelineSteps from "@/components/timeline-steps"
import { CardBody, CardTitle } from "@/components/ui/card-text"
import IconBadge from "@/components/ui/icon-badge"
import { Handshake, Link2, MessageCircle, PackageCheck, Quote, ShieldCheck, Sparkles, UserCheck } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us | Iron Bridge Mobility Solutions",
  description: "Iron Bridge Mobility Solutions is built on reliability, accountability, and professional handling for medical courier and commercial logistics across Maryland, Washington DC, and Northern Virginia.",
}

const values = [
  { icon: ShieldCheck, title: 'Reliability', content: 'Showing up when we say we will, and following through on every route.' },
  { icon: UserCheck, title: 'Accountability', content: 'Standing behind our work and taking responsibility for every shipment in our care.' },
  { icon: Sparkles, title: 'Professionalism', content: 'Representing our clients and their customers with a consistent, professional standard.' },
  { icon: MessageCircle, title: 'Communication', content: 'Keeping clients informed, especially when a route or timeline needs attention.' },
  { icon: PackageCheck, title: 'Responsible Handling', content: 'Treating every shipment, medical or commercial, with the care its contents require.' },
  { icon: Handshake, title: 'Long-Term Partnerships', content: 'Building relationships meant to last, not one-off deliveries.' },
]

const milestones = [
  { title: 'Logistics Roots', content: 'Founder Lareon Brent began building a logistics and transportation business in 2018, with experience in transportation, public service, logistics, and operations.' },
  { title: 'Renamed Iron Bridge', content: 'In 2026, the company was renamed Iron Bridge Mobility Solutions — a name chosen to reflect the strength and connection at the center of the business.' },
  { title: 'Serving the Region Today', content: 'Now operating throughout Maryland, Washington DC, and Northern Virginia, with a commitment to serving clients throughout the region and beyond.' },
]

export default function AboutPage() {
  return (
    <div className="px-4 xl:px-0 max-w-7xl mx-auto space-y-24 sm:space-y-32 md:space-y-40 lg:space-y-56 scroll-smooth">
      <PageHeader
        eyebrow="About Us"
        title="Reliability Is the Foundation"
        description="Iron Bridge Mobility Solutions was built around a simple idea: reliability isn't simply part of our service. It's the foundation of our company."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <SlideEffect direction="right" isSpring={false} className="space-y-5 text-left">
          <p className="text-sm md:text-lg leading-relaxed">
            Iron Bridge Mobility Solutions was founded on a simple but powerful belief: when people
            and businesses depend on something important arriving safely and on time, they deserve
            a transportation partner they can trust. We work with healthcare organizations,
            laboratories, and commercial businesses throughout Maryland, Washington DC, and Northern
            Virginia that need transportation they can build their own operations around, not a
            one-off delivery gig, but a partner they can count on daily.
          </p>
          <p className="text-sm md:text-lg leading-relaxed">
            Every route, medical or commercial, runs on the same standards: trained personnel,
            documented handling procedures, and clear communication when something needs attention.
            That consistency is what we&rsquo;re building the company around.
          </p>
        </SlideEffect>
        <SlideEffect direction="left" isSpring={false} className="relative w-full h-[260px] md:h-[380px] rounded-2xl overflow-hidden">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <DotGrid id="about-bridge-dot-grid" className="absolute inset-0 h-full w-full text-teal/[0.08]" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(65% 75% at 50% 45%, rgba(18,130,98,0.08) 0%, transparent 70%)',
              }}
            />
          </div>
          <Image
            src="/brand/about-bridge.png"
            alt="Illustration of a bridge"
            fill
            className="object-contain"
          />
        </SlideEffect>
      </div>

      {/* Why "Iron Bridge" */}
      <div className="space-y-8 md:space-y-10">
        <SectionHeader eyebrow="The Name" title="Why 'Iron Bridge'" description="The name represents the character of the company." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <SlideEffect direction="right" isSpring={false} className="space-y-3 rounded-2xl border border-border bg-secondary/40 p-6 md:p-8">
            <IconBadge icon={ShieldCheck} size={24} />
            <CardTitle className="text-lg">Iron</CardTitle>
            <CardBody className="text-sm md:text-base">Symbolizes strength, resilience, and dependability — the standard every route is held to.</CardBody>
          </SlideEffect>
          <SlideEffect direction="left" isSpring={false} className="space-y-3 rounded-2xl border border-border bg-secondary/40 p-6 md:p-8">
            <IconBadge icon={Link2} size={24} />
            <CardTitle className="text-lg">Bridge</CardTitle>
            <CardBody className="text-sm md:text-base">Represents connection — bringing together businesses, healthcare providers, organizations, and the communities they serve.</CardBody>
          </SlideEffect>
        </div>
        <SlideEffect isSpring={false}>
          <p className="text-sm md:text-base text-foreground/70 max-w-3xl mx-auto text-center">
            Together, those ideas express our purpose: to provide a strong and dependable connection
            between every pickup and every destination.
          </p>
        </SlideEffect>
      </div>

      {/* Milestones */}
      <div className="space-y-8 md:space-y-10">
        <SectionHeader eyebrow="Our Journey" title="From Logistics Roots to Iron Bridge" align="left" />
        <TimelineSteps steps={milestones} />
      </div>

      {/* Founder quote */}
      <SlideEffect isSpring={false} className="max-w-3xl mx-auto text-center space-y-5">
        <Quote size={32} strokeWidth={1.5} className="text-teal/50 mx-auto" aria-hidden="true" />
        <p className="font-serif text-lg md:text-2xl text-navy leading-snug">
          &ldquo;We are not simply building a courier company. We are building a legacy —
          one founded on faith, strengthened by perseverance, and measured by the quality
          of service we provide.&rdquo;
        </p>
        <div>
          <p className="font-semibold text-navy">Lareon Brent</p>
          <p className="text-sm text-foreground/60">Founder, Iron Bridge Mobility Solutions</p>
        </div>
      </SlideEffect>

      <div className="space-y-8 md:space-y-10">
        <SectionHeader eyebrow="What We Stand On" title="Our Values" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <SlideEffect
              key={v.title}
              direction="top"
              delay={0.06 * i}
              isSpring={false}
              className="space-y-3 border-l-2 border-teal/30 pl-5"
            >
              <IconBadge icon={v.icon} size={22} />
              <CardTitle className="text-base">{v.title}</CardTitle>
              <CardBody className="text-sm">{v.content}</CardBody>
            </SlideEffect>
          ))}
        </div>
      </div>

      {/* Closing statement */}
      <SlideEffect isSpring={false} className="relative overflow-hidden bg-navy">
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(45% 100% at 10% 0%, rgba(61,166,132,0.18) 0%, transparent 65%), radial-gradient(45% 100% at 90% 100%, rgba(61,166,132,0.12) 0%, transparent 65%)',
          }}
        >
          <DotGrid id="about-closing-dot-grid" className="absolute inset-0 h-full w-full text-white/[0.06]" />
        </div>
        <div className="relative px-4 md:px-10 py-16 md:py-24 text-center">
          <p className="font-serif text-2xl md:text-4xl lg:text-header font-semibold leading-tight text-white max-w-3xl mx-auto">
            We carry responsibility. We connect communities.<br className="hidden md:block" /> We bridge the distance with strength.
          </p>
        </div>
      </SlideEffect>

      <CTA />
      <Footer />
    </div>
  )
}
