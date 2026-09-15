'use client'

import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react"
import { useLenis } from "lenis/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const settings = {
  eyebrow: 'On The Road',
  title: 'Dependability in Action',
  description: 'Professional service at every stage, from healthcare handoffs to commercial and residential deliveries.',
  photos: [
    {
      src: '/brand/gallery-commercial-unload.jpg',
      alt: 'Iron Bridge driver unloading boxes from a branded cargo van onto a hand truck',
      position: 'md:[grid-column:1/8] md:[grid-row:1/16]',
      align: 'mr-auto md:mx-0',
      rotate: 'rotate-[-1deg] md:rotate-[-1.2deg]',
      kicker: 'Commercial Logistics',
      caption: 'Unloaded with care, every stop',
    },
    {
      src: '/brand/gallery-medical-courier.jpg',
      alt: 'Iron Bridge staff handing a specimen cooler to a doctor outside a hospital',
      position: 'md:[grid-column:8/13] md:[grid-row:3/13]',
      align: 'ml-auto md:mx-0',
      rotate: 'rotate-[1.2deg] md:rotate-[1.5deg]',
      kicker: 'Medical Courier',
      caption: 'Every handoff, documented',
    },
    {
      src: '/brand/gallery-bulk-item-removal.jpg',
      alt: 'Two Iron Bridge movers carrying an armchair into a van',
      position: 'md:[grid-column:1/6] md:[grid-row:17/27]',
      align: 'mr-auto md:mx-0',
      rotate: 'rotate-[0.8deg] md:rotate-[1deg]',
      kicker: 'Bulk-Item Removal',
      caption: 'Careful handling, every load',
    },
    {
      src: '/brand/gallery-commercial-handoff.jpg',
      alt: 'Iron Bridge driver handing a box to a shop owner on a commercial street',
      position: 'md:[grid-column:6/13] md:[grid-row:14/27]',
      align: 'ml-auto md:mx-0',
      rotate: 'rotate-[-0.6deg] md:rotate-[-0.8deg]',
      kicker: 'Commercial Logistics',
      caption: 'Reliable, every route',
    },
  ],
  // Reachable via the "See More" badge and by sliding past the last
  // featured photo; not shown in the staggered teaser itself.
  morePhotos: [
    {
      src: '/brand/gallery-residential-delivery.jpg',
      alt: 'Iron Bridge driver handing a package to a family at their front door',
      kicker: 'Last-Mile Delivery',
      caption: "Delivered like it's for our own family",
    },
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  const showPrev = () => setActiveIndex((i) => (i === null ? null : (i - 1 + allPhotos.length) % allPhotos.length))
  const showNext = () => setActiveIndex((i) => (i === null ? null : (i + 1) % allPhotos.length))

  const isLightboxOpen = activeIndex !== null
  const lenis = useLenis()

  // Keyed on open/closed only (not on activeIndex itself), so the lock
  // doesn't briefly release and reapply on every Next/Prev.
  useEffect(() => {
    if (!isLightboxOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null)
      else if (e.key === 'ArrowRight') showNext()
      else if (e.key === 'ArrowLeft') showPrev()
    }
    window.addEventListener('keydown', onKeyDown)

    // The site's smooth-scroll (Lenis) drives native window scroll itself,
    // so pause it through its own API rather than fighting it with body
    // CSS. Locking documentElement's overflow (not body's, and without a
    // position:fixed/top-offset trick) blocks any remaining native scroll
    // path (wheel, keyboard, scrollbar) without collapsing the page's
    // scrollable height, so there's nothing to restore on close.
    lenis?.stop()
    const { documentElement } = document
    const prevOverflow = documentElement.style.overflow
    documentElement.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      documentElement.style.overflow = prevOverflow
      lenis?.start()
    }
  }, [isLightboxOpen, lenis])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0]?.clientX
    if (touchStartX.current === null || endX === undefined) return
    const delta = endX - touchStartX.current
    if (Math.abs(delta) > 40) {
      if (delta > 0) showPrev()
      else showNext()
    }
    touchStartX.current = null
  }

  return (
    <div className="space-y-8 md:space-y-10 mx-auto text-center">
      <SectionHeader eyebrow={settings.eyebrow} title={settings.title} description={settings.description} />

      <div className="flex flex-col gap-10 md:grid md:grid-cols-12 md:gap-5 md:[grid-auto-rows:14px]">
        {settings.photos.map((photo, i) => {
          const isLast = i === settings.photos.length - 1
          const hasMore = isLast && settings.morePhotos.length > 0

          return (
            <SlideEffect
              key={photo.src}
              direction="top"
              delay={0.08 * i}
              isSpring={false}
              className={`relative w-[96%] aspect-[4/3] md:w-full md:aspect-auto ${photo.align} ${photo.position}`}
            >
              {/* Rotation lives on this inner div, not the motion wrapper, so it
                  doesn't fight framer-motion's own inline transform. */}
              <div className={`group relative w-full h-full rounded-2xl overflow-hidden shadow-lg ${photo.rotate}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 768px) 45vw, 88vw"
                />
                {/* Bottom scrim: only the caption area darkens, the photo stays bright */}
                <div
                  className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(16,26,48,0.92) 0%, rgba(16,26,48,0.78) 45%, rgba(16,26,48,0.35) 72%, transparent 100%)' }}
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 pointer-events-none">
                  <span className="block text-[10px] md:text-[11px] font-semibold tracking-[0.08em] md:tracking-[0.1em] uppercase text-teal-light">{photo.kicker}</span>
                  <span className="block text-white text-sm md:text-lg font-semibold leading-snug mt-1 md:mt-0.5">{photo.caption}</span>
                </div>

                {/* Covers the whole card; the "more" badge below sits on top of it
                    and, being later in DOM order, wins clicks in its own corner. */}
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`View larger: ${photo.caption}`}
                  className="absolute inset-0 cursor-pointer"
                />

                {hasMore && (
                  <button
                    type="button"
                    onClick={() => setActiveIndex(settings.photos.length)}
                    aria-label={`See ${settings.morePhotos.length} more photos`}
                    className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-1.5 rounded-full bg-navy-dark/60 hover:bg-navy-dark/80 backdrop-blur-sm px-3 py-1.5 text-white text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Images size={13} strokeWidth={1.5} aria-hidden="true" />
                    See {settings.morePhotos.length} More Photos
                  </button>
                )}
              </div>
            </SlideEffect>
          )
        })}
      </div>

      {activeIndex !== null && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-dark/95 p-4 touch-none overscroll-none"
          onClick={() => setActiveIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={`${allPhotos[activeIndex].caption}, photo ${activeIndex + 1} of ${allPhotos.length}`}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center justify-center size-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showPrev() }}
            aria-label="Previous photo"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 flex items-center justify-center size-10 md:size-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showNext() }}
            aria-label="Next photo"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center size-10 md:size-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>

          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-xl overflow-hidden">
              <div
                className="flex h-full transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {allPhotos.map((photo, idx) => (
                  <div key={photo.src} className="relative h-full w-full shrink-0">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-contain bg-navy-dark"
                      sizes="90vw"
                      priority={Math.abs(idx - activeIndex) <= 1}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-teal-light">{allPhotos[activeIndex].kicker}</p>
              <p className="text-white text-base md:text-lg font-medium mt-1">{allPhotos[activeIndex].caption}</p>
              <p className="text-white/50 text-xs mt-2">{activeIndex + 1} / {allPhotos.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
