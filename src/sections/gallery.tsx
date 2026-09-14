'use client'

import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import { Images, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

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
  // Shown only inside the full gallery, not in the staggered teaser.
  morePhotos: [
    {
      src: '/brand/gallery-bulk-dresser.jpg',
      alt: 'Iron Bridge mover wheeling a dresser out of a garage on a hand truck',
      kicker: 'Bulk-Item Removal',
      caption: 'Even the big pieces, handled with care',
    },
    {
      src: '/brand/gallery-cargo-secured.jpg',
      alt: 'Iron Bridge driver checking a delivery on his phone next to a secured, organized cargo van',
      kicker: 'Commercial Logistics',
      caption: 'Every load checked and secured',
    },
    {
      src: '/brand/gallery-team-sunrise.jpg',
      alt: 'Iron Bridge driver standing beside his van at sunrise with the Washington, DC skyline behind him',
      kicker: 'Serving the DMV',
      caption: 'Out early, every day',
    },
    {
      src: '/brand/gallery-clinic-handoff.jpg',
      alt: 'Iron Bridge courier handing a specimen cooler to a doctor at a clinic entrance',
      kicker: 'Medical Courier',
      caption: 'Specimen delivered, custody confirmed',
    },
  ],
}

const allPhotos = [...settings.photos, ...settings.morePhotos]

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div className="space-y-8 md:space-y-10 mx-auto text-center">
      <SectionHeader eyebrow={settings.eyebrow} title={settings.title} description={settings.description} />

      <div className="flex flex-col gap-10 md:grid md:grid-cols-12 md:gap-5 md:[grid-auto-rows:14px]">
        {settings.photos.map((photo, i) => {
          const isLast = i === settings.photos.length - 1
          const hasMore = isLast && settings.morePhotos.length > 0
          const Wrapper = hasMore ? 'button' : 'div'

          return (
            <SlideEffect
              key={photo.src}
              direction="top"
              delay={0.08 * i}
              isSpring={false}
              className={`relative w-[87%] aspect-[4/3] md:w-full md:aspect-auto ${photo.align} ${photo.position}`}
            >
              {/* Rotation lives on this inner div, not the motion wrapper, so it
                  doesn't fight framer-motion's own inline transform. */}
              <Wrapper
                type={hasMore ? 'button' : undefined}
                onClick={hasMore ? () => setIsOpen(true) : undefined}
                aria-label={hasMore ? `See ${settings.morePhotos.length} more photos` : undefined}
                className={`group relative block w-full h-full rounded-2xl overflow-hidden shadow-lg text-left ${photo.rotate} ${hasMore ? 'cursor-pointer' : ''}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className={`object-cover ${hasMore ? 'transition-transform duration-300 group-hover:scale-105' : ''}`}
                  sizes="(min-width: 768px) 45vw, 88vw"
                />
                {/* Bottom scrim: only the caption area darkens, the photo stays bright */}
                <div
                  className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(16,26,48,0.92) 0%, rgba(16,26,48,0.78) 45%, rgba(16,26,48,0.35) 72%, transparent 100%)' }}
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <span className="block text-[10px] md:text-[11px] font-semibold tracking-[0.08em] md:tracking-[0.1em] uppercase text-teal-light">{photo.kicker}</span>
                  <span className="block text-white text-sm md:text-lg font-semibold leading-snug mt-1 md:mt-0.5">{photo.caption}</span>
                </div>

                {hasMore && (
                  <span className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-1.5 rounded-full bg-navy-dark/60 group-hover:bg-navy-dark/80 backdrop-blur-sm px-3 py-1.5 text-white text-xs font-medium transition-colors">
                    <Images size={13} strokeWidth={1.5} aria-hidden="true" />
                    See {settings.morePhotos.length} More Photos
                  </span>
                )}
              </Wrapper>
            </SlideEffect>
          )
        })}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/90 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Iron Bridge photo gallery"
        >
          <div
            className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-5 md:p-8 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl md:text-2xl text-navy font-semibold">Dependability in Action</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close gallery"
                className="flex items-center justify-center size-9 rounded-full border border-border text-navy/70 hover:text-navy hover:border-navy/40 transition-colors cursor-pointer"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allPhotos.map((photo) => (
                <div key={photo.src} className="space-y-2">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-teal">{photo.kicker}</p>
                    <p className="text-sm text-foreground/80">{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
