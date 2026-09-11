'use client'

import type { RegionId } from "@/components/graphics/service-area-map-gl"
import SlideEffect from "@/components/slide-effect"
import { CardTitle } from "@/components/ui/card-text"
import IconBadge from "@/components/ui/icon-badge"
import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"
import dynamic from "next/dynamic"
import { useState } from "react"

const ServiceAreaMapGL = dynamic(() => import("@/components/graphics/service-area-map-gl"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[380px] md:h-[460px] lg:h-[560px] rounded-2xl border border-border bg-secondary animate-pulse" />
  ),
})

export default function ServiceAreaExplorer({
  regions,
}: {
  regions: { id: RegionId; title: string; cities: string[] }[]
}) {
  const [activeRegion, setActiveRegion] = useState<RegionId | null>(null)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center text-left">
      {/* Map */}
      <SlideEffect direction="right" isSpring={false}>
        <ServiceAreaMapGL
          activeRegion={activeRegion}
          onRegionHover={setActiveRegion}
          className="w-full h-[380px] md:h-[460px] lg:h-[560px]"
        />
      </SlideEffect>

      {/* Region cards, stacked */}
      <div className="space-y-3">
        {regions.map((region, i) => (
          <SlideEffect key={region.id} direction="left" delay={0.1 * i} isSpring={false}>
            <div
              onMouseEnter={() => setActiveRegion(region.id)}
              onMouseLeave={() => setActiveRegion(null)}
              className={cn(
                "rounded-2xl border p-6 md:p-7 space-y-3 transition-colors duration-300",
                activeRegion === region.id ? "border-teal bg-teal-tint/50" : "border-border bg-transparent"
              )}
            >
              <div className="flex items-center gap-2.5">
                <IconBadge icon={MapPin} size={16} className="p-2 rounded-lg" />
                <CardTitle className="text-lg">{region.title}</CardTitle>
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
    </div>
  )
}
