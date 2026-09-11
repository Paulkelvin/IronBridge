export default function DiagonalRoute({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 260"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* road edges, tapering from a wide mouth at the corner to a vanishing point */}
      <path d="M0 24 Q 150 70, 258 146" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M64 0 Q 180 55, 266 150" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* center lane marking, continuing on as a route line past the road */}
      <path
        d="M32 10 Q 165 62, 262 148 S 360 210, 400 260"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="3 11"
        strokeLinecap="round"
      />

      <circle cx="400" cy="260" r="6" fill="currentColor" />
    </svg>
  )
}
