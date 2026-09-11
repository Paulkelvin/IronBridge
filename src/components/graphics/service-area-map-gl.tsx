'use client'

import { cn } from "@/lib/utils"
import { MapboxOverlay } from "@deck.gl/mapbox"
import { ArcLayer, ScatterplotLayer } from "@deck.gl/layers"
import type { PickingInfo } from "@deck.gl/core"
import * as maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
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

function regionBounds(region: RegionId) {
  const bounds = new maplibregl.LngLatBounds()
  CITIES.filter((c) => c.region === region).forEach((c) => bounds.extend([c.lng, c.lat]))
  bounds.extend([HUB.lng, HUB.lat])
  return bounds
}

export default function ServiceAreaMapGL({
  activeRegion,
  onRegionHover,
  className,
}: {
  activeRegion: RegionId | null
  onRegionHover?: (region: RegionId | null) => void
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const overlayRef = useRef<MapboxOverlay | null>(null)
  const activeRegionRef = useRef(activeRegion)
  const renderLayersRef = useRef<() => void>(() => {})
  const onRegionHoverRef = useRef(onRegionHover)
  onRegionHoverRef.current = onRegionHover
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://tiles.openfreemap.org/styles/positron',
      center: [-77.05, 38.98],
      zoom: 8,
      attributionControl: false,
      cooperativeGestures: true,
      scrollZoom: false,
    })
    mapRef.current = map

    // Base tiles are cosmetic; never let a slow/unreachable tile host block
    // our own brand-colored markers (drawn independently by deck.gl below).
    map.on('error', (e) => {
      console.warn('Service area basemap error (markers still render):', e.error)
      setLoadFailed(true)
    })

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
    map.addControl(new maplibregl.AttributionControl({ compact: true }))

    const overlay = new MapboxOverlay({ interleaved: false, layers: [] })
    overlayRef.current = overlay
    map.addControl(overlay)

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
              containerRef.current?.style.setProperty('cursor', info.object ? 'pointer' : '')
              onRegionHoverRef.current?.(info.object ? info.object.region : null)
            },
          }),
        ],
      })
    }
    renderLayersRef.current = renderLayers

    // Draw our markers/arcs and frame the camera immediately — this needs
    // only the map's camera math, not the base tiles to have loaded.
    renderLayers()
    const bounds = new maplibregl.LngLatBounds()
    CITIES.forEach((c) => bounds.extend([c.lng, c.lat]))
    map.fitBounds(bounds, { padding: 56, duration: 0 })

    return () => {
      map.remove()
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
      map.fitBounds(regionBounds(activeRegion), { padding: 70, duration: 700, maxZoom: 11 })
    } else {
      const bounds = new maplibregl.LngLatBounds()
      CITIES.forEach((c) => bounds.extend([c.lng, c.lat]))
      map.fitBounds(bounds, { padding: 56, duration: 700 })
    }
  }, [activeRegion])

  return (
    <div className={cn("service-area-map-gl relative overflow-hidden rounded-2xl border border-border bg-secondary", className)}>
      {/*
        maplibre-gl's own stylesheet sets `.maplibregl-map { position: relative }`
        on this element once it initializes, which can win the cascade over the
        `absolute` utility class below (both single-class selectors, so it comes
        down to sheet order) and collapse this div to zero height. Inline style
        always wins regardless of cascade order, so position is set here rather
        than via a class.
      */}
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />
      {loadFailed && (
        <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-white/90 backdrop-blur-sm px-3 py-2 text-xs text-foreground/70 text-center shadow-sm">
          Map tiles unavailable right now, service areas are listed on the right.
        </div>
      )}
    </div>
  )
}
