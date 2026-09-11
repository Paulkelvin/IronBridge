import type { Metadata } from "next"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import PageHeader from "@/components/page-header"
import ServiceAreaExplorer from "@/components/service-area-explorer"
import SlideEffect from "@/components/slide-effect"

export const metadata: Metadata = {
  title: "Service Area | Maryland, Washington DC, Northern Virginia",
  description: "Iron Bridge Mobility Solutions operates throughout Maryland, Washington DC, and Northern Virginia, including Baltimore, Annapolis, Silver Spring, Arlington, Alexandria, and Fairfax.",
}

const regions = [
  {
    id: 'maryland' as const,
    title: 'Maryland',
    cities: ['Baltimore', 'Bowie', 'Annapolis', 'Columbia', 'Silver Spring', 'Rockville', 'Bethesda', 'Hyattsville'],
  },
  {
    id: 'dc' as const,
    title: 'Washington, DC',
    cities: ['Washington, DC'],
  },
  {
    id: 'virginia' as const,
    title: 'Northern Virginia',
    cities: ['Arlington', 'Alexandria', 'Fairfax', 'Reston', 'Sterling', 'Ashburn'],
  },
]

export default function ServiceAreaPage() {
  return (
    <div className="px-4 xl:px-0 max-w-7xl mx-auto space-y-14 sm:space-y-16 md:space-y-20 scroll-smooth">
      <PageHeader
        eyebrow="Where We Operate"
        title="Service Area"
        description="Iron Bridge is based in the DMV and built to run daily throughout Maryland, Washington DC, and Northern Virginia."
      />

      <ServiceAreaExplorer regions={regions} />

      <SlideEffect isSpring={false} className="text-center text-sm md:text-base text-foreground/80 italic max-w-2xl mx-auto">
        Regional and Mid-Atlantic transportation may also be available depending on the assignment.
        Ask us when you request a quote.
      </SlideEffect>

      <CTA />
      <Footer />
    </div>
  )
}
