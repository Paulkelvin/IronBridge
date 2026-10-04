import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import PageHeader from "@/components/page-header"
import ServiceAreaExplorer from "@/components/service-area-explorer"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import { CardBody, CardTitle } from "@/components/ui/card-text"

export const metadata: Metadata = pageMetadata({
  title: "Service Area | Maryland, Washington DC, Northern Virginia",
  description: "Courier and delivery coverage across Maryland, Washington DC, and Northern Virginia, including Baltimore, Annapolis, Silver Spring, Arlington, and Fairfax.",
  path: "/service-area",
})

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

const regionCoverage = [
  {
    title: 'Maryland',
    content: "From our base in Bowie, we cover Prince George's, Montgomery, Anne Arundel, Howard, and Baltimore counties and Baltimore City, including Silver Spring, Rockville, Bethesda, Hyattsville, Annapolis, Columbia, and Baltimore.",
  },
  {
    title: 'Washington, DC',
    content: 'Pickups and deliveries anywhere in the District, including runs between DC and the Maryland and Northern Virginia suburbs.',
  },
  {
    title: 'Northern Virginia',
    content: 'Arlington, Fairfax, and Loudoun counties and the City of Alexandria, including Reston, Sterling, and Ashburn.',
  },
]

export default function ServiceAreaPage() {
  return (
    <div className="px-4 xl:px-6 max-w-7xl mx-auto space-y-24 sm:space-y-32 md:space-y-40 scroll-smooth">
      <PageHeader
        eyebrow="Service Area"
        title="Delivery Across Maryland, DC & Northern Virginia"
        description="Do we deliver to you? Find your city below. We run daily throughout the region."
        background="map"
      />

      <h2 className="sr-only">Cities We Serve</h2>
      <ServiceAreaExplorer regions={regions} />

      <div className="space-y-8 md:space-y-10">
        <SectionHeader
          eyebrow="Coverage"
          title="Counties We Cover"
          description="Medical courier, same-day delivery, dedicated routes, and bulk-item removal are available across all three areas."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regionCoverage.map((region) => (
            <div key={region.title} className="rounded-2xl border border-border p-6 md:p-7 space-y-2">
              <CardTitle className="text-lg">{region.title}</CardTitle>
              <CardBody className="text-sm md:text-base">{region.content}</CardBody>
            </div>
          ))}
        </div>
      </div>

      <SlideEffect isSpring={false} className="text-center text-sm md:text-base text-foreground/80 italic max-w-2xl mx-auto">
        Regional and Mid-Atlantic transportation may also be available depending on the assignment.
        Ask us when you request a quote.
      </SlideEffect>

      <CTA />
      <Footer />
    </div>
  )
}
