import { useId } from "react"

export default function BrentAvatar({ size = 40, className }: { size?: number, className?: string }) {
  const clipId = useId()
  return (
    <svg width={size} height={size} viewBox="7 8 50 50" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clipId}>
          <circle cx="32" cy="32" r="32" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="64" height="64" fill="#E3F2ED" />
        <path d="M8 64 C8 50 19 44 32 44 C45 44 56 50 56 64 Z" fill="#1B2A4A" />
        <rect x="28" y="37" width="8" height="9" rx="2" fill="#7A4A2F" />
        <path d="M26 45 L32 51.5 L38 45" fill="none" stroke="#3DA684" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="21.2" cy="30.5" r="2.6" fill="#8D5A3B" />
        <circle cx="42.8" cy="30.5" r="2.6" fill="#8D5A3B" />
        <ellipse cx="32" cy="29.5" rx="11" ry="12" fill="#8D5A3B" />
        <path d="M20.5 25.5 C20.5 16 26 11.5 32 11.5 C38 11.5 43.5 16 43.5 25.5 Z" fill="#1B2A4A" />
        <ellipse cx="32" cy="25.6" rx="13.2" ry="2.6" fill="#128262" />
        <circle cx="32" cy="17.6" r="2.2" fill="#3DA684" />
        <circle cx="28" cy="31" r="1.5" fill="#1F1A17" />
        <circle cx="36" cy="31" r="1.5" fill="#1F1A17" />
        <path d="M27.6 36 Q32 39.6 36.4 36" fill="none" stroke="#1F1A17" strokeWidth="1.7" strokeLinecap="round" />
      </g>
    </svg>
  )
}
