'use client'

import Card from "@/components/card"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import { Quote, Star } from "lucide-react"

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

export default function Testimonials() {
  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12 mx-auto text-center">
      <SectionHeader eyebrow={settings.eyebrow} title={settings.title} description={settings.description} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {settings.testimonials.map((t, i) => (
          <SlideEffect key={t.role + t.location} direction="top" delay={0.06 * i} className="col-span-1 h-full" isSpring={false}>
            <Card>
              <div className="flex items-center justify-between w-full">
                <Quote size={28} strokeWidth={1.5} className="text-teal/50" aria-hidden="true" />
                <div className="flex items-center gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <CardBody quote={t.quote} />
              <div>
                <p className="font-semibold text-navy">{t.role}</p>
                <p className="text-xs md:text-sm text-foreground/60">{t.location}</p>
              </div>
            </Card>
          </SlideEffect>
        ))}
      </div>
    </div>
  )
}

function CardBody({ quote }: { quote: string }) {
  return <p className="text-sm md:text-base text-foreground/80 leading-relaxed">&ldquo;{quote}&rdquo;</p>
}
