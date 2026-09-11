'use client'

import { cn } from "@/lib/utils"
import { GoogleMapsOverlay } from "@deck.gl/google-maps"
import { ArcLayer, ScatterplotLayer, TextLayer } from "@deck.gl/layers"
import type { PickingInfo } from "@deck.gl/core"
import { importLibrary, setOptions } from "@googlemaps/js-api-loader"
import { useEffect, useRef, useState } from "react"

export type RegionId = 'maryland' | 'dc' | 'virginia'

type City = {
  name: string
  region: RegionId
  lng: number
  lat: number
  labelOffset: [number, number]
  labelAnchor: 'start' | 'end'
}

const CITIES: City[] = [
  { name: 'Baltimore', region: 'maryland', lng: -76.6122, lat: 39.2904, labelOffset: [8, -8], labelAnchor: 'start' },
  { name: 'Bowie', region: 'maryland', lng: -76.7302, lat: 38.9426, labelOffset: [8, -8], labelAnchor: 'start' },
  { name: 'Annapolis', region: 'maryland', lng: -76.4922, lat: 38.9784, labelOffset: [8, -8], labelAnchor: 'start' },
  { name: 'Columbia', region: 'maryland', lng: -76.8610, lat: 39.2037, labelOffset: [8, -8], labelAnchor: 'start' },
  { name: 'Silver Spring', region: 'maryland', lng: -77.0261, lat: 38.9907, labelOffset: [0, -14], labelAnchor: 'start' },
  { name: 'Rockville', region: 'maryland', lng: -77.1528, lat: 39.0840, labelOffset: [8, -8], labelAnchor: 'start' },
  { name: 'Bethesda', region: 'maryland', lng: -77.1003, lat: 38.9807, labelOffset: [-10, -10], labelAnchor: 'end' },
  { name: 'Hyattsville', region: 'maryland', lng: -76.9455, lat: 38.9559, labelOffset: [10, -4], labelAnchor: 'start' },
  { name: 'Washington, DC', region: 'dc', lng: -77.0369, lat: 38.9072, labelOffset: [0, 0], labelAnchor: 'start' },
  { name: 'Arlington', region: 'virginia', lng: -77.0910, lat: 38.8816, labelOffset: [-12, 8], labelAnchor: 'end' },
  { name: 'Alexandria', region: 'virginia', lng: -77.0469, lat: 38.8048, labelOffset: [8, 10], labelAnchor: 'start' },
  { name: 'Fairfax', region: 'virginia', lng: -77.3064, lat: 38.8462, labelOffset: [8, 10], labelAnchor: 'start' },
  { name: 'Reston', region: 'virginia', lng: -77.3570, lat: 38.9586, labelOffset: [8, -8], labelAnchor: 'start' },
  { name: 'Sterling', region: 'virginia', lng: -77.4286, lat: 39.0062, labelOffset: [8, -8], labelAnchor: 'start' },
  { name: 'Ashburn', region: 'virginia', lng: -77.4874, lat: 39.0438, labelOffset: [8, -8], labelAnchor: 'start' },
]

const HUB = CITIES.find((c) => c.region === 'dc')!

const REGION_COLOR: Record<RegionId, [number, number, number]> = {
  maryland: [27, 42, 74], // navy
  dc: [27, 74, 61], // teal-dark
  virginia: [18, 130, 98], // teal
}

// A simplified regional backdrop, not a turn-by-turn street atlas: major
// roads for geographic context only, no highway shields, no street names,
// no unrelated town labels — our own region labels (below) replace those.
const MAP_STYLE: google.maps.MapTypeStyle[] = [
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'road.local', elementType: 'geometry', stylers: [{ visibility: 'off' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ visibility: 'simplified' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ visibility: 'simplified' }] },
  { featureType: 'administrative.locality', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.neighborhood', stylers: [{ visibility: 'off' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f4f6f5' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#dce8e3' }] },
]

const REGION_LABELS: { region: RegionId; text: string; lat: number; lng: number; pixelOffset: [number, number] }[] = [
  { region: 'maryland', text: 'MARYLAND', lat: 39.32, lng: -76.85, pixelOffset: [0, 0] },
  { region: 'dc', text: 'DC', lat: 38.9072, lng: -77.0369, pixelOffset: [34, -4] },
  { region: 'virginia', text: 'NORTHERN VIRGINIA', lat: 38.72, lng: -77.32, pixelOffset: [0, 0] },
]

const EARTH_RADIUS_MILES = 3958.8

function milesBetween(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const dLat = (b.lat - a.lat) * Math.PI / 180
  const dLng = (b.lng - a.lng) * Math.PI / 180
  const lat1 = a.lat * Math.PI / 180
  const lat2 = b.lat * Math.PI / 180
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(h))
}

// Google's fitBounds zooms all the way in on a single point (e.g. the DC
// region, whose only city is the hub itself), which then makes the meter-
// sized dots cover the entire viewport. Pad degenerate bounds to a sane
// minimum span instead.
function safeBounds(points: { lat: number; lng: number }[]) {
  const bounds = new google.maps.LatLngBounds()
  points.forEach((p) => bounds.extend(p))
  const ne = bounds.getNorthEast()
  const sw = bounds.getSouthWest()
  if (Math.abs(ne.lat() - sw.lat()) < 0.02 && Math.abs(ne.lng() - sw.lng()) < 0.02) {
    const center = bounds.getCenter()
    const delta = 0.06
    bounds.extend({ lat: center.lat() - delta, lng: center.lng() - delta })
    bounds.extend({ lat: center.lat() + delta, lng: center.lng() + delta })
  }
  return bounds
}

function regionBounds(region: RegionId) {
  const points = CITIES.filter((c) => c.region === region).map((c) => ({ lat: c.lat, lng: c.lng }))
  points.push({ lat: HUB.lat, lng: HUB.lng })
  return safeBounds(points)
}

function allCityBounds() {
  return safeBounds(CITIES.map((c) => ({ lat: c.lat, lng: c.lng })))
}

function cityBounds(city: City) {
  return safeBounds([{ lat: HUB.lat, lng: HUB.lng }, { lat: city.lat, lng: city.lng }])
}

export default function ServiceAreaMapGoogle({
  activeRegion,
  activeCityName,
  onRegionHover,
  className,
}: {
  activeRegion: RegionId | null
  activeCityName?: string | null
  onRegionHover?: (region: RegionId | null) => void
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const overlayRef = useRef<GoogleMapsOverlay | null>(null)
  const activeRegionRef = useRef(activeRegion)
  const activeCityRef = useRef(activeCityName)
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
          const activeCity = CITIES.find((c) => c.name === activeCityRef.current) ?? null
          const distanceLabel = activeCity && activeCity.region !== 'dc'
            ? [{
              lat: (HUB.lat + activeCity.lat) / 2,
              lng: (HUB.lng + activeCity.lng) / 2,
              text: `~${Math.round(milesBetween(HUB, activeCity))} mi`,
            }]
            : []

          overlay.setProps({
            layers: [
              new ArcLayer<City>({
                id: 'routes',
                data: CITIES.filter((c) => c.region !== 'dc'),
                getSourcePosition: () => [HUB.lng, HUB.lat],
                getTargetPosition: (d) => [d.lng, d.lat],
                getSourceColor: (d) => [...REGION_COLOR[d.region], activeCity ? (d.name === activeCity.name ? 230 : 25) : active === null ? 130 : active === d.region ? 220 : 35],
                getTargetColor: (d) => [...REGION_COLOR[d.region], activeCity ? (d.name === activeCity.name ? 230 : 25) : active === null ? 130 : active === d.region ? 220 : 35],
                getWidth: (d) => (activeCity ? (d.name === activeCity.name ? 4 : 1) : active === d.region ? 3 : 1.4),
                greatCircle: false,
                updateTriggers: {
                  getSourceColor: [active, activeCity?.name],
                  getTargetColor: [active, activeCity?.name],
                  getWidth: [active, activeCity?.name],
                },
              }),
              new ScatterplotLayer<City>({
                id: 'cities',
                data: CITIES,
                pickable: true,
                autoHighlight: false,
                getPosition: (d) => [d.lng, d.lat],
                getFillColor: (d) => [...REGION_COLOR[d.region], activeCity ? (d.name === activeCity.name ? 255 : 70) : active === null ? 255 : active === d.region ? 255 : 90],
                getRadius: (d) => {
                  if (activeCity) return d.name === activeCity.name ? 950 : d.region === 'dc' ? 500 : 300
                  return d.region === 'dc' ? (active === 'dc' ? 950 : 720) : active === d.region ? 620 : 420
                },
                radiusUnits: 'meters',
                radiusMaxPixels: 20,
                stroked: true,
                getLineColor: [255, 255, 255, 230],
                lineWidthMinPixels: 1.5,
                onHover: (info: PickingInfo<City>) => {
                  if (containerRef.current) {
                    containerRef.current.style.cursor = info.object ? 'pointer' : ''
                  }
                  onRegionHoverRef.current?.(info.object ? info.object.region : null)
                },
                updateTriggers: {
                  getFillColor: [active, activeCity?.name],
                  getRadius: [active, activeCity?.name],
                },
              }),
              new TextLayer<City>({
                id: 'city-labels',
                data: CITIES.filter((c) => c.region !== 'dc'),
                getPosition: (d) => [d.lng, d.lat],
                getText: (d) => d.name,
                getColor: (d) => [58, 63, 75, activeCity ? (d.name === activeCity.name ? 255 : 30) : active === null ? 235 : active === d.region ? 255 : 60],
                getSize: (d) => (activeCity ? (d.name === activeCity.name ? 13 : 11) : active === d.region ? 12 : 11),
                getPixelOffset: (d) => d.labelOffset,
                getTextAnchor: (d) => d.labelAnchor,
                getAlignmentBaseline: 'center',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 500,
                fontSettings: { sdf: true },
                outlineWidth: 2,
                outlineColor: [255, 255, 255, 220],
                updateTriggers: {
                  getColor: [active, activeCity?.name],
                  getSize: [active, activeCity?.name],
                },
              }),
              new TextLayer<(typeof REGION_LABELS)[number]>({
                id: 'region-labels',
                data: REGION_LABELS,
                getPosition: (d) => [d.lng, d.lat],
                getText: (d) => d.text,
                getColor: (d) => [...REGION_COLOR[d.region], activeCity ? 90 : active === null ? 255 : active === d.region ? 255 : 110],
                getSize: (d) => (active === d.region && !activeCity ? 15 : 13),
                getPixelOffset: (d) => d.pixelOffset,
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 700,
                fontSettings: { sdf: true },
                outlineWidth: 3,
                outlineColor: [255, 255, 255, 220],
                getTextAnchor: 'middle',
                updateTriggers: {
                  getColor: [active, activeCity?.name],
                  getSize: [active, activeCity?.name],
                },
              }),
              new TextLayer<{ lat: number; lng: number; text: string }>({
                id: 'distance-label',
                data: distanceLabel,
                getPosition: (d) => [d.lng, d.lat],
                getText: (d) => d.text,
                getColor: [255, 255, 255, 255],
                getSize: 12,
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 700,
                fontSettings: { sdf: true },
                background: true,
                getBackgroundColor: [18, 130, 98, 230],
                backgroundPadding: [6, 3],
                backgroundBorderRadius: 4,
                getTextAnchor: 'middle',
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
    activeCityRef.current = activeCityName
    renderLayersRef.current()

    const map = mapRef.current
    if (!map) return

    const city = CITIES.find((c) => c.name === activeCityName)
    if (city) {
      map.fitBounds(cityBounds(city), 80)
    } else if (activeRegion) {
      map.fitBounds(regionBounds(activeRegion), 70)
    } else {
      map.fitBounds(allCityBounds(), 56)
    }
  }, [activeRegion, activeCityName])

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
