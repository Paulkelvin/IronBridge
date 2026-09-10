export default function BridgeIllustration({ className }: { className?: string }) {
  const spanStart = 40
  const spanEnd = 560
  const topY = 70
  const bottomY = 230
  const segments = 14
  const segmentWidth = (spanEnd - spanStart) / segments

  const zigzagPoints = Array.from({ length: segments + 1 }, (_, i) => {
    const x = spanStart + i * segmentWidth
    const y = i % 2 === 0 ? bottomY : topY
    return `${x},${y}`
  }).join(' ')

  return (
    <svg
      viewBox="0 0 600 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Top chord */}
      <line x1={spanStart} y1={topY} x2={spanEnd} y2={topY} stroke="currentColor" strokeWidth="2" />
      {/* Bottom chord / deck */}
      <line x1={spanStart} y1={bottomY} x2={spanEnd} y2={bottomY} stroke="currentColor" strokeWidth="2" />
      {/* End posts */}
      <line x1={spanStart} y1={topY} x2={spanStart} y2={bottomY} stroke="currentColor" strokeWidth="2" />
      <line x1={spanEnd} y1={topY} x2={spanEnd} y2={bottomY} stroke="currentColor" strokeWidth="2" />
      {/* Truss lattice */}
      <polyline points={zigzagPoints} stroke="currentColor" strokeWidth="1.5" />
      {/* Piers */}
      <line x1="160" y1={bottomY} x2="130" y2="280" stroke="currentColor" strokeWidth="2" />
      <line x1="160" y1={bottomY} x2="190" y2="280" stroke="currentColor" strokeWidth="2" />
      <line x1="440" y1={bottomY} x2="410" y2="280" stroke="currentColor" strokeWidth="2" />
      <line x1="440" y1={bottomY} x2="470" y2="280" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
