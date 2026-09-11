export default function PageThreadLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 2000"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M40 0 C 160 150, 20 320, 140 480 S 20 760, 150 920 S 30 1180, 140 1340 S 20 1620, 130 1780 S 40 1960, 100 2000"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="2 16"
        strokeLinecap="round"
      />
      <circle cx="40" cy="0" r="5" fill="currentColor" />
      <circle cx="140" cy="480" r="5" fill="currentColor" />
      <circle cx="150" cy="920" r="5" fill="currentColor" />
      <circle cx="140" cy="1340" r="5" fill="currentColor" />
      <circle cx="130" cy="1780" r="5" fill="currentColor" />
    </svg>
  )
}
