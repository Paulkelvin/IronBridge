type RegionId = 'maryland' | 'dc' | 'virginia'

const REGION_ZONES: Record<Exclude<RegionId, 'dc'>, { cx: number; cy: number; rx: number; ry: number; rotate: number }> = {
  maryland: { cx: 300, cy: 135, rx: 135, ry: 100, rotate: -8 },
  virginia: { cx: 195, cy: 345, rx: 145, ry: 72, rotate: -12 },
}

const REGION_CITIES: Record<RegionId, { x: number; y: number }[]> = {
  maryland: [
    { x: 340, y: 55 }, // Baltimore
    { x: 280, y: 118 }, // Columbia
    { x: 420, y: 175 }, // Annapolis
    { x: 305, y: 190 }, // Silver Spring
    { x: 245, y: 172 }, // Rockville
    { x: 258, y: 208 }, // Bethesda
    { x: 330, y: 202 }, // Hyattsville
    { x: 390, y: 222 }, // Bowie
  ],
  dc: [{ x: 300, y: 258 }],
  virginia: [
    { x: 270, y: 288 }, // Arlington
    { x: 295, y: 318 }, // Alexandria
    { x: 205, y: 328 }, // Fairfax
    { x: 155, y: 298 }, // Reston
    { x: 120, y: 268 }, // Sterling
    { x: 85, y: 243 }, // Ashburn
  ],
}

const REGION_COLOR: Record<RegionId, string> = {
  maryland: 'text-navy',
  dc: 'text-teal-dark',
  virginia: 'text-teal',
}

const REGION_LABEL: Record<RegionId, { text: string; x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  maryland: { text: 'MARYLAND', x: 300, y: 30, anchor: 'middle' },
  dc: { text: 'DC', x: 300, y: 240, anchor: 'middle' },
  virginia: { text: 'NORTHERN VIRGINIA', x: 195, y: 405, anchor: 'middle' },
}

const hub = REGION_CITIES.dc[0]

export default function ServiceAreaMap({
  activeRegion,
  className,
}: {
  activeRegion: RegionId | null
  className?: string
}) {
  const isDimmed = (region: RegionId) => activeRegion !== null && activeRegion !== region

  return (
    <svg
      viewBox="0 0 520 440"
      className={className}
      aria-hidden="true"
    >
      {/* Zone backdrops */}
      {(['maryland', 'virginia'] as const).map((region) => {
        const zone = REGION_ZONES[region]
        return (
          <ellipse
            key={region}
            cx={zone.cx}
            cy={zone.cy}
            rx={zone.rx}
            ry={zone.ry}
            transform={`rotate(${zone.rotate} ${zone.cx} ${zone.cy})`}
            className={`${REGION_COLOR[region]} transition-opacity duration-300`}
            fill="currentColor"
            opacity={isDimmed(region) ? 0.04 : activeRegion === region ? 0.14 : 0.07}
          />
        )
      })}

      {/* Route lines from the DC hub to each region */}
      {(['maryland', 'virginia'] as const).map((region) =>
        REGION_CITIES[region].map((city, i) => (
          <line
            key={`${region}-line-${i}`}
            x1={hub.x}
            y1={hub.y}
            x2={city.x}
            y2={city.y}
            className={`${REGION_COLOR[region]} transition-opacity duration-300`}
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="1 7"
            strokeLinecap="round"
            opacity={isDimmed(region) ? 0.06 : activeRegion === region ? 0.5 : 0.18}
          />
        ))
      )}

      {/* City dots */}
      {(['maryland', 'virginia'] as const).map((region) =>
        REGION_CITIES[region].map((city, i) => (
          <circle
            key={`${region}-dot-${i}`}
            cx={city.x}
            cy={city.y}
            r={activeRegion === region ? 5 : 3.5}
            className={`${REGION_COLOR[region]} transition-all duration-300`}
            fill="currentColor"
            opacity={isDimmed(region) ? 0.25 : 1}
          />
        ))
      )}

      {/* DC hub marker */}
      <circle
        cx={hub.x}
        cy={hub.y}
        r={activeRegion === 'dc' ? 12 : 9}
        className={`${REGION_COLOR.dc} transition-all duration-300`}
        fill="currentColor"
        opacity={isDimmed('dc') ? 0.15 : 0.15}
      />
      <circle
        cx={hub.x}
        cy={hub.y}
        r={activeRegion === 'dc' ? 6 : 4.5}
        className={`${REGION_COLOR.dc} transition-all duration-300`}
        fill="currentColor"
        opacity={isDimmed('dc') ? 0.3 : 1}
      />

      {/* Region labels */}
      {(['maryland', 'dc', 'virginia'] as const).map((region) => {
        const label = REGION_LABEL[region]
        return (
          <text
            key={`${region}-label`}
            x={label.x}
            y={label.y}
            textAnchor={label.anchor}
            className={`${REGION_COLOR[region]} transition-opacity duration-300`}
            fill="currentColor"
            fontSize={13}
            fontWeight={600}
            letterSpacing="0.08em"
            opacity={isDimmed(region) ? 0.35 : activeRegion === region ? 1 : 0.65}
          >
            {label.text}
          </text>
        )
      })}
    </svg>
  )
}
