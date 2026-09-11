'use client'

import { cn } from "@/lib/utils"
import { GoogleMapsOverlay } from "@deck.gl/google-maps"
import { ArcLayer, ScatterplotLayer } from "@deck.gl/layers"
import type { PickingInfo } from "@deck.gl/core"
import { importLibrary, setOptions } from "@googlemaps/js-api-loader"
import { useEffect, useRef, useState } from "react"

export type RegionId = 'maryland' | 'dc' | 'virginia'

type City = { name: string; region: RegionId; lng: number; lat: number }

const CITIES: City[] = [
  { name: 'Baltimore', region: 'maryland', lng: -76.6122, lat: 39.2904 },
  { name: 'Bowie', region: 'maryland', lng: -76.7302, lat: 38.9426 },
  { name: 'Annapolis', region: 'maryland', lng: -76.4922, lat: 38.9784 },
  { name: 'Columbia', region: 'maryland', lng: -76.8610, lat: 39.2037 },
  { name: 'Silver Spring', region: 'maryland', lng: -77.0261, lat: 38.9907 },
  { name: 'Rockville', region: 'maryland', lng: -77.1528, lat: 39.0840 },
  { name: 'Bethesda', region: 'maryland', lng: -77.1003, lat: 38.9807 },
  { name: 'Hyattsville', region: 'maryland', lng: -76.9455, lat: 38.9559 },
  { name: 'Washington, DC', region: 'dc', lng: -77.0369, lat: 38.9072 },
  { name: 'Arlington', region: 'virginia', lng: -77.0910, lat: 38.8816 },
  { name: 'Alexandria', region: 'virginia', lng: -77.0469, lat: 38.8048 },
  { name: 'Fairfax', region: 'virginia', lng: -77.3064, lat: 38.8462 },
  { name: 'Reston', region: 'virginia', lng: -77.3570, lat: 38.9586 },
  { name: 'Sterling', region: 'virginia', lng: -77.4286, lat: 39.0062 },
  { name: 'Ashburn', region: 'virginia', lng: -77.4874, lat: 39.0438 },
]

const HUB = CITIES.find((c) => c.region === 'dc')!

const REGION_COLOR: Record<RegionId, [number, number, number]> = {
  maryland: [27, 42, 74], // navy
  dc: [27, 74, 61], // teal-dark
  virginia: [18, 130, 98], // teal
}

// Declutter business/transit icon noise while keeping roads and place labels
// (the "real map" look) — no Cloud-side Map ID/style config required.
const MAP_STYLE: google.maps.MapTypeStyle[] = [
  { featureType: 'poi.business', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f4f6f5' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#dce8e3' }] },
]

function regionBounds(region: RegionId) {
  const bounds = new google.maps.LatLngBounds()
  CITIES.filter((c) => c.region === region).forEach((c) => bounds.extend({ lat: c.lat, lng: c.lng }))
  bounds.extend({ lat: HUB.lat, lng: HUB.lng })
  return bounds
}

function allCityBounds() {
  const bounds = new google.maps.LatLngBounds()
  CITIES.forEach((c) => bounds.extend({ lat: c.lat, lng: c.lng }))
  return bounds
}

export default function ServiceAreaMapGoogle({
  activeRegion,
  onRegionHover,
  className,
}: {
  activeRegion: RegionId | null
  onRegionHover?: (region: RegionId | null) => void
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const overlayRef = useRef<GoogleMapsOverlay | null>(null)
  const activeRegionRef = useRef(activeRegion)
  const renderLayersRef = useRef<() => void>(() => {})
  const onRegionHoverRef = useRef(onRegionHover)
  onRegionHoverRef.current = onRegionHover
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      console.warn('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set — service area map disabled.')
      setLoadFailed(true)
      return
    }

    let cancelled = false
    setOptions({ key: apiKey, v: 'weekly' })

    importLibrary('maps')
      .then(({ Map }) => {
        if (cancelled || !containerRef.current) return

        const map = new Map(containerRef.current, {
          center: { lat: 38.98, lng: -77.05 },
          zoom: 8,
          styles: MAP_STYLE,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: 'cooperative',
          clickableIcons: false,
        })
        mapRef.current = map

        const overlay = new GoogleMapsOverlay({ layers: [] })
        overlayRef.current = overlay
        overlay.setMap(map)

        const renderLayers = () => {
          const active = activeRegionRef.current
          overlay.setProps({
            layers: [
              new ArcLayer<City>({
                id: 'routes',
                data: CITIES.filter((c) => c.region !== 'dc'),
                getSourcePosition: () => [HUB.lng, HUB.lat],
                getTargetPosition: (d) => [d.lng, d.lat],
                getSourceColor: (d) => [...REGION_COLOR[d.region], active === null ? 130 : active === d.region ? 220 : 35],
                getTargetColor: (d) => [...REGION_COLOR[d.region], active === null ? 130 : active === d.region ? 220 : 35],
                getWidth: (d) => (active === d.region ? 3 : 1.4),
                greatCircle: false,
              }),
              new ScatterplotLayer<City>({
                id: 'cities',
                data: CITIES,
                pickable: true,
                autoHighlight: false,
                getPosition: (d) => [d.lng, d.lat],
                getFillColor: (d) => [...REGION_COLOR[d.region], active === null ? 255 : active === d.region ? 255 : 90],
                getRadius: (d) => (d.region === 'dc' ? (active === 'dc' ? 950 : 720) : active === d.region ? 620 : 420),
                radiusUnits: 'meters',
                stroked: true,
                getLineColor: [255, 255, 255, 230],
                lineWidthMinPixels: 1.5,
                onHover: (info: PickingInfo<City>) => {
                  if (containerRef.current) {
                    containerRef.current.style.cursor = info.object ? 'pointer' : ''
                  }
                  onRegionHoverRef.current?.(info.object ? info.object.region : null)
                },
              }),
            ],
          })
        }
        renderLayersRef.current = renderLayers

        renderLayers()
        map.fitBounds(allCityBounds(), 56)
      })
      .catch((err) => {
        console.warn('Service area map failed to load:', err)
        if (!cancelled) setLoadFailed(true)
      })

    return () => {
      cancelled = true
      overlayRef.current?.finalize()
      mapRef.current = null
      overlayRef.current = null
    }
  }, [])

  useEffect(() => {
    activeRegionRef.current = activeRegion
    renderLayersRef.current()

    const map = mapRef.current
    if (!map) return

    if (activeRegion) {
      map.fitBounds(regionBounds(activeRegion), 70)
    } else {
      map.fitBounds(allCityBounds(), 56)
    }
  }, [activeRegion])

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-secondary", className)}>
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />
      {loadFailed && (
        <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-white/90 backdrop-blur-sm px-3 py-2 text-xs text-foreground/70 text-center shadow-sm">
          Map unavailable right now, service areas are listed on the right.
        </div>
      )}
    </div>
  )
}
