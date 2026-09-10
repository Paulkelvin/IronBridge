export default function HexDot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M20 2 L35 11 V29 L20 38 L5 29 V11 Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
    </svg>
  )
}
