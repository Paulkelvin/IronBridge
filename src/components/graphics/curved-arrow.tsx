export default function CurvedArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M10 5 C 10 45, 40 55, 65 60"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="1 8"
        strokeLinecap="round"
      />
      <path
        d="M52 55 L66 62 L60 76"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
