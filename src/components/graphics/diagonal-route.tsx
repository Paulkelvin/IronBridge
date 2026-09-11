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
      <path
        d="M0 0 C 110 30, 190 90, 260 130 S 360 210, 400 260"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="2 13"
        strokeLinecap="round"
      />
      <circle cx="260" cy="130" r="5" fill="currentColor" />
      <circle cx="400" cy="260" r="6" fill="currentColor" />
    </svg>
  )
}
