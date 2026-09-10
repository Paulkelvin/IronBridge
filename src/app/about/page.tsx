import type { Metadata } from "next"
import Card from "@/components/card"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import PageHeader from "@/components/page-header"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import { Handshake, MessageCircle, PackageCheck, ShieldCheck, Sparkles, UserCheck } from "lucide-react"

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
    <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-14 sm:space-y-16 md:space-y-20 scroll-smooth">
      <PageHeader
        eyebrow="About Us"
        title="Dependability Is the Foundation"
        description="Iron Bridge Mobility Solutions was built around a simple idea: dependability isn't simply part of our service. It's the foundation of our company."
      />

      <SlideEffect isSpring={false} className="max-w-3xl mx-auto text-center space-y-5">
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

      <div className="space-y-8 md:space-y-10">
        <SectionHeader eyebrow="What We Stand On" title="Our Values" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <SlideEffect key={v.title} direction="top" delay={0.06 * i} isSpring={false}>
              <Card>
                <v.icon size={24} strokeWidth={1.5} className="text-teal" />
                <h3 className="text-base text-navy font-medium">{v.title}</h3>
                <p className="text-sm">{v.content}</p>
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
