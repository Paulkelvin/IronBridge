import DiagonalRoute from "@/components/graphics/diagonal-route"
import SectionHeader from "@/components/section-header"
import ServiceAreaExplorer from "@/components/service-area-explorer"
import SlideEffect from "@/components/slide-effect"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const settings = {
  eyebrow: 'Service Area',
  title: 'Do We Deliver to You?',
  description: 'Find your city below. We run daily throughout Maryland, Washington DC, and Northern Virginia.',
  regions: [
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
  ],
  note: 'Regional and Mid-Atlantic transportation may also be available depending on the assignment.',
  CTA: {
    content: 'Discuss Your Service Area',
    href: '/request-a-quote'
  }
}

export default function Features4() {
  return (
    <div id='service-area' className="relative space-y-10 md:space-y-12 lg:space-y-14 mx-auto text-center">
      <div className="absolute top-0 left-1/2 w-screen -translate-x-1/2 h-[70px] md:h-[320px] -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        <DiagonalRoute className="absolute top-0 right-0 w-[90px] md:w-[420px] h-full text-gold-dark/80 scale-x-[-1]" />
      </div>

      <SectionHeader eyebrow={settings.eyebrow} title={settings.title} description={settings.description} />

      <ServiceAreaExplorer regions={settings.regions} />

      <SlideEffect className="text-xs md:text-sm text-foreground/80 italic">{settings.note}</SlideEffect>

      <SlideEffect>
        <Link href={settings.CTA.href}>
          <Button variant='outline' size='lg'>{settings.CTA.content}</Button>
        </Link>
      </SlideEffect>
    </div>
  )
}
