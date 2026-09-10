import type { Metadata } from "next"
import DotGrid from "@/components/graphics/dot-grid"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import PageHeader from "@/components/page-header"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import { CardBody, CardTitle } from "@/components/ui/card-text"
import IconBadge from "@/components/ui/icon-badge"
import { Handshake, MessageCircle, PackageCheck, ShieldCheck, Sparkles, UserCheck } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us | Iron Bridge Mobility Solutions",
  description: "Iron Bridge Mobility Solutions is built on reliability, accountability, and professional handling — medical courier and commercial logistics across Maryland, Washington DC, and Northern Virginia.",
}

const values = [
  { icon: ShieldCheck, title: 'Reliability', content: 'Showing up when we say we will, and following through on every route.' },
  { icon: UserCheck, title: 'Accountability', content: 'Standing behind our work and taking responsibility for every shipment in our care.' },
  { icon: Sparkles, title: 'Professionalism', content: 'Representing our clients and their customers with a consistent, professional standard.' },
  { icon: MessageCircle, title: 'Communication', content: 'Keeping clients informed, especially when a route or timeline needs attention.' },
  { icon: PackageCheck, title: 'Responsible Handling', content: 'Treating every shipment — medical or commercial — with the care its contents require.' },
  { icon: Handshake, title: 'Long-Term Partnerships', content: 'Building relationships meant to last, not one-off deliveries.' },
]

export default function AboutPage() {
  return (
    <div className="px-4 xl:px-0 max-w-7xl mx-auto space-y-14 sm:space-y-16 md:space-y-20 scroll-smooth">
      <PageHeader
        eyebrow="About Us"
        title="Dependability Is the Foundation"
        description="Iron Bridge Mobility Solutions was built around a simple idea: dependability isn't simply part of our service. It's the foundation of our company."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <SlideEffect direction="right" isSpring={false} className="space-y-5 text-left">
          <p className="text-sm md:text-lg leading-relaxed">
            Iron Bridge Mobility Solutions is a medical courier and commercial logistics company
            serving Maryland, Washington DC, and Northern Virginia. We work with healthcare
            organizations, laboratories, and commercial businesses that need transportation they
            can build their own operations around — not a one-off delivery gig, but a partner they
            can count on daily.
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

      <CTA />
      <Footer />
    </div>
  )
}
