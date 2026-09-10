import type { Metadata } from "next"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import PageHeader from "@/components/page-header"
import SlideEffect from "@/components/slide-effect"
import { MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Service Area | Maryland, Washington DC, Northern Virginia",
  description: "Iron Bridge Mobility Solutions operates throughout Maryland, Washington DC, and Northern Virginia, including Baltimore, Annapolis, Silver Spring, Arlington, Alexandria, and Fairfax.",
}

const regions = [
  {
    title: 'Maryland',
    cities: ['Baltimore', 'Bowie', 'Annapolis', 'Columbia', 'Silver Spring', 'Rockville', 'Bethesda', 'Hyattsville'],
  },
  {
    title: 'Washington, DC',
    cities: ['Washington, DC'],
  },
  {
    title: 'Northern Virginia',
    cities: ['Arlington', 'Alexandria', 'Fairfax', 'Reston', 'Sterling', 'Ashburn'],
  },
]

export default function ServiceAreaPage() {
  return (
    <div className="px-4 xl:px-0 max-w-5xl mx-auto space-y-14 sm:space-y-16 md:space-y-20 scroll-smooth">
      <PageHeader
        eyebrow="Where We Operate"
        title="Service Area"
        description="Iron Bridge is based in the DMV and built to run daily throughout Maryland, Washington DC, and Northern Virginia."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {regions.map((region, i) => (
          <SlideEffect key={region.title} direction="top" delay={0.1 * i} isSpring={false}>
            <div className="rounded-2xl bg-secondary p-8 h-full text-left space-y-4">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-teal shrink-0" />
                <h3 className="text-lg text-navy font-medium">{region.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {region.cities.map(city => (
                  <span key={city} className="text-xs rounded-full border border-border px-3 py-1 text-foreground">{city}</span>
                ))}
              </div>
            </div>
          </SlideEffect>
        ))}
      </div>

      <SlideEffect isSpring={false} className="text-center text-sm md:text-base text-foreground/80 italic max-w-2xl mx-auto">
        Regional and Mid-Atlantic transportation may also be available depending on the assignment —
        ask us when you request a quote.
      </SlideEffect>

      <CTA />
      <Footer />
    </div>
  )
}
