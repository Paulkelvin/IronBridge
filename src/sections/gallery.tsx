'use client'

import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import Image from "next/image"

const settings = {
  eyebrow: 'On The Road',
  title: 'Dependability in Action',
  description: 'Real routes, real handoffs, real care, from hospital docks to front doors.',
  photos: [
    {
      src: '/brand/gallery-medical-courier.jpg',
      alt: 'Iron Bridge staff handing a specimen cooler to a doctor outside a hospital',
      position: 'md:[grid-column:1/8] md:[grid-row:1/16]',
      rotate: 'md:rotate-[-1.2deg]',
    },
    {
      src: '/brand/gallery-bulk-item-removal.jpg',
      alt: 'Two Iron Bridge movers carrying an armchair into a van',
      position: 'md:[grid-column:8/13] md:[grid-row:3/13]',
      rotate: 'md:rotate-[1.5deg]',
    },
    {
      src: '/brand/gallery-commercial-handoff.jpg',
      alt: 'Iron Bridge driver handing a box to a shop owner on a commercial street',
      position: 'md:[grid-column:1/6] md:[grid-row:17/27]',
      rotate: 'md:rotate-[1deg]',
    },
    {
      src: '/brand/gallery-residential-delivery.jpg',
      alt: 'Iron Bridge driver handing a package to a family at their front door',
      position: 'md:[grid-column:6/13] md:[grid-row:14/27]',
      rotate: 'md:rotate-[-0.8deg]',
    },
  ],
}

export default function Gallery() {
  return (
    <div className="space-y-8 md:space-y-10 mx-auto text-center">
      <SectionHeader eyebrow={settings.eyebrow} title={settings.title} description={settings.description} />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-5 md:[grid-auto-rows:14px]">
        {settings.photos.map((photo, i) => (
          <SlideEffect
            key={photo.src}
            direction="top"
            delay={0.08 * i}
            isSpring={false}
            className={`relative aspect-[4/3] md:aspect-auto ${photo.position}`}
          >
            {/* Rotation lives on this inner div, not the motion wrapper, so it
                doesn't fight framer-motion's own inline transform. */}
            <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-lg ${photo.rotate}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 45vw, 50vw"
              />
            </div>
          </SlideEffect>
        ))}
      </div>
    </div>
  )
}
