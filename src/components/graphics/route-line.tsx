export default function RouteLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 300"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 220 C 200 60, 400 260, 600 120 S 1000 40, 1200 160"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="2 14"
        strokeLinecap="round"
      />
      <circle cx="120" cy="188" r="5" fill="currentColor" />
      <circle cx="600" cy="120" r="5" fill="currentColor" />
      <circle cx="1080" cy="85" r="5" fill="currentColor" />
    </svg>
  )
}
