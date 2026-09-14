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
      align: 'mr-auto md:mx-0',
      rotate: 'rotate-[-1deg] md:rotate-[-1.2deg]',
      kicker: 'Medical Courier',
      caption: 'Every handoff, documented',
    },
    {
      src: '/brand/gallery-bulk-item-removal.jpg',
      alt: 'Two Iron Bridge movers carrying an armchair into a van',
      position: 'md:[grid-column:8/13] md:[grid-row:3/13]',
      align: 'ml-auto md:mx-0',
      rotate: 'rotate-[1.2deg] md:rotate-[1.5deg]',
      kicker: 'Bulk-Item Removal',
      caption: 'Careful handling, every load',
    },
    {
      src: '/brand/gallery-commercial-handoff.jpg',
      alt: 'Iron Bridge driver handing a box to a shop owner on a commercial street',
      position: 'md:[grid-column:1/6] md:[grid-row:17/27]',
      align: 'mr-auto md:mx-0',
      rotate: 'rotate-[0.8deg] md:rotate-[1deg]',
      kicker: 'Commercial Logistics',
      caption: 'Reliable, every route',
    },
    {
      src: '/brand/gallery-residential-delivery.jpg',
      alt: 'Iron Bridge driver handing a package to a family at their front door',
      position: 'md:[grid-column:6/13] md:[grid-row:14/27]',
      align: 'ml-auto md:mx-0',
      rotate: 'rotate-[-0.6deg] md:rotate-[-0.8deg]',
      kicker: 'Last-Mile Delivery',
      caption: "Delivered like it's for our own family",
    },
  ],
}

export default function Gallery() {
  return (
    <div className="space-y-8 md:space-y-10 mx-auto text-center">
      <SectionHeader eyebrow={settings.eyebrow} title={settings.title} description={settings.description} />

      <div className="flex flex-col gap-10 md:grid md:grid-cols-12 md:gap-5 md:[grid-auto-rows:14px]">
        {settings.photos.map((photo, i) => (
          <SlideEffect
            key={photo.src}
            direction="top"
            delay={0.08 * i}
            isSpring={false}
            className={`relative w-[87%] aspect-[4/3] md:w-full md:aspect-auto ${photo.align} ${photo.position}`}
          >
            {/* Rotation lives on this inner div, not the motion wrapper, so it
                doesn't fight framer-motion's own inline transform. */}
            <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-lg ${photo.rotate}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 45vw, 88vw"
              />
              {/* Bottom scrim: only the caption area darkens, the photo stays bright */}
              <div
                className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(16,26,48,0.92) 0%, rgba(16,26,48,0.78) 45%, rgba(16,26,48,0.35) 72%, transparent 100%)' }}
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-left">
                <span className="block text-[10px] md:text-[11px] font-semibold tracking-[0.08em] md:tracking-[0.1em] uppercase text-teal-light">{photo.kicker}</span>
                <span className="block text-white text-sm md:text-lg font-semibold leading-snug mt-1 md:mt-0.5">{photo.caption}</span>
              </div>
            </div>
          </SlideEffect>
        ))}
      </div>
    </div>
  )
}
