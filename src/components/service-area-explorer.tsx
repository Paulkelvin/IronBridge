'use client'

import type { RegionId } from "@/components/graphics/service-area-map-google"
import SlideEffect from "@/components/slide-effect"
import { CardTitle } from "@/components/ui/card-text"
import IconBadge from "@/components/ui/icon-badge"
import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"
import dynamic from "next/dynamic"
import { useState } from "react"

const ServiceAreaMapGoogle = dynamic(() => import("@/components/graphics/service-area-map-google"), {
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
  const [selectedRegion, setSelectedRegion] = useState<RegionId | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<RegionId | null>(null)

  const displayRegion = selectedRegion ?? hoveredRegion

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center text-left">
      <SlideEffect direction="right" isSpring={false}>
        <ServiceAreaMapGoogle
          activeRegion={displayRegion}
          mapRegion={selectedRegion}
          activeCityName={selectedCity}
          onRegionHover={setHoveredRegion}
          className="w-full h-[380px] md:h-[460px] lg:h-[560px]"
        />
      </SlideEffect>

      <div className="space-y-3">
        {regions.map((region, i) => (
          <SlideEffect key={region.id} direction="left" delay={0.1 * i} isSpring={false}>
            <div
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => {
                setSelectedCity(null)
                setSelectedRegion(region.id)
              }}
              className={cn(
                "rounded-2xl border p-6 md:p-7 space-y-3 transition-colors duration-300 cursor-pointer",
                displayRegion === region.id ? "border-teal bg-teal-tint/50" : "border-border bg-transparent"
              )}
            >
              <div className="flex items-center gap-2.5">
                <IconBadge icon={MapPin} size={16} className="p-2 rounded-lg" />
                <CardTitle className="text-lg">{region.title}</CardTitle>
              </div>
              <div className="flex flex-wrap gap-2">
                {region.cities.map(city => (
                  <button
                    key={city}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedRegion(region.id)
                      setSelectedCity(prev => prev === city ? null : city)
                    }}
                    className={cn(
                      "text-xs rounded-full border px-3 py-1 transition-colors",
                      selectedCity === city ? "border-teal bg-teal text-white" : "border-border text-foreground hover:border-teal/50"
                    )}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </SlideEffect>
        ))}
      </div>
    </div>
  )
}
