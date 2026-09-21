'use client'

import Card from "@/components/card"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import { Quote, Star } from "lucide-react"
import { useRef, useState } from "react"

const settings = {
  eyebrow: 'Testimonials',
  title: 'What Our Customers Say',
  description: 'A few words from the organizations and customers we deliver for, day in and day out.',
  testimonials: [
    {
      quote: 'From pickup through delivery, Iron Bridge kept our team informed and handled everything professionally. Their attention to detail gave us confidence that our time-sensitive materials were in dependable hands.',
      role: 'Medical Office Manager',
      location: 'Baltimore, MD',
    },
    {
      quote: 'Iron Bridge arrived when promised, treated our shipment carefully, and provided confirmation as soon as the delivery was completed. The entire process was smooth and professional.',
      role: 'Small-Business Owner',
      location: 'Ashburn, VA',
    },
    {
      quote: 'Our customer needed an important order delivered quickly, and Iron Bridge helped us keep our promise. Their communication and professionalism reflected positively on our business.',
      role: 'Retail Manager',
      location: 'Landover, MD',
    },
    {
      quote: 'The bulk-item removal crew was courteous, organized, and respectful of our property. They removed everything safely and left the area clean. The service made a difficult job much easier for our family.',
      role: 'Residential Customer',
      location: 'Rockville, MD',
    },
    {
      quote: 'What impressed me most was the communication. I always knew the status of my delivery and never had to wonder whether it had arrived. Iron Bridge provided the kind of dependable service every customer deserves.',
      role: 'Last-Mile Delivery Customer',
      location: 'Annapolis, MD',
    },
    {
      quote: 'Iron Bridge treated our request with urgency without sacrificing care or professionalism. They provided a reliable solution when we needed one and made us feel like our business truly mattered.',
      role: 'Commercial Client',
      location: 'Rockville, MD',
    },
  ],
}

function TestimonialCard({ t }: { t: (typeof settings.testimonials)[number] }) {
  return (
    <Card>
      <div className="flex items-center justify-between w-full">
        <Quote size={28} strokeWidth={1.5} className="text-teal/50" aria-hidden="true" />
        <div className="flex items-center gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, s) => (
            <Star key={s} size={14} className="fill-gold text-gold" />
          ))}
        </div>
      </div>
      <p className="text-sm md:text-base text-foreground/80 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
      <div>
        <p className="font-semibold text-navy">{t.role}</p>
        <p className="text-xs md:text-sm text-foreground/80">{t.location}</p>
      </div>
    </Card>
  )
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.scrollWidth / settings.testimonials.length
    setActiveIndex(Math.round(track.scrollLeft / cardWidth))
  }

  const scrollToIndex = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.scrollWidth / settings.testimonials.length
    track.scrollTo({ left: cardWidth * i, behavior: 'smooth' })
  }

  return (
    <div id="testimonials" className="space-y-8 md:space-y-10 lg:space-y-12 mx-auto text-center scroll-mt-24">
      <SectionHeader eyebrow={settings.eyebrow} title={settings.title} description={settings.description} />

      {/* Desktop / tablet: static grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {settings.testimonials.map((t, i) => (
          <SlideEffect key={t.role + t.location} direction="top" delay={0.06 * i} className="col-span-1 h-full" isSpring={false}>
            <TestimonialCard t={t} />
          </SlideEffect>
        ))}
      </div>

      {/* Mobile: swipeable one-at-a-time carousel */}
      <SlideEffect isSpring={false} className="sm:hidden">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {settings.testimonials.map((t) => (
            <div key={t.role + t.location} className="shrink-0 w-[88%] snap-center">
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-5">
          {settings.testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === activeIndex ? 'w-5 bg-teal' : 'w-1.5 bg-border'}`}
            />
          ))}
        </div>
      </SlideEffect>
    </div>
  )
}
