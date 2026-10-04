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
        <path d="M9 64 C9 51 19.5 45.5 32 45.5 C44.5 45.5 55 51 55 64 Z" fill="#128262" />
        <rect x="28" y="38" width="8" height="9" rx="2" fill="#7E4E31" />
        <path d="M26.5 45.6 L32 50.5 L37.5 45.6" fill="#FFFFFF" />
        <circle cx="21" cy="31" r="2.5" fill="#8D5A3B" />
        <circle cx="43" cy="31" r="2.5" fill="#8D5A3B" />
        <ellipse cx="32" cy="30.5" rx="11.2" ry="12.4" fill="#8D5A3B" />
        <path d="M21.2 26.5 C20.6 17.8 25.4 13.4 32 13.4 C38.6 13.4 43.4 17.8 42.8 26.5 C42 23.4 40.2 21.2 37 20.6 C34 21.6 29.4 20.2 26.6 21.2 C23.9 22.1 22 24 21.2 26.5 Z" fill="#1F1A17" />
        <path d="M25.6 26.3 Q28 24.9 30.3 25.9" fill="none" stroke="#1F1A17" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M33.7 25.9 Q36 24.9 38.4 26.3" fill="none" stroke="#1F1A17" strokeWidth="1.3" strokeLinecap="round" />
        <ellipse cx="28" cy="30.2" rx="1.6" ry="1.9" fill="#1F1A17" />
        <ellipse cx="36" cy="30.2" rx="1.6" ry="1.9" fill="#1F1A17" />
        <circle cx="28.6" cy="29.5" r="0.55" fill="#FFFFFF" />
        <circle cx="36.6" cy="29.5" r="0.55" fill="#FFFFFF" />
        <path d="M31 32.9 Q32 33.6 33 32.9" fill="none" stroke="#6E4229" strokeWidth="1" strokeLinecap="round" />
        <circle cx="24.8" cy="34.6" r="2" fill="#E0796A" opacity="0.22" />
        <circle cx="39.2" cy="34.6" r="2" fill="#E0796A" opacity="0.22" />
        <path d="M27.4 35.4 Q32 41.6 36.6 35.4 Z" fill="#5C2218" />
        <path d="M27.9 35.5 Q32 37.1 36.1 35.5 Q35.7 36.9 32 37.3 Q28.3 36.9 27.9 35.5 Z" fill="#FFFFFF" />
        <path d="M19.6 30 C19.2 18.6 25 12.2 32 12.2 C39 12.2 44.8 18.6 44.4 30" fill="none" stroke="#1B2A4A" strokeWidth="1.8" />
        <rect x="17.6" y="27.4" width="4.6" height="7.4" rx="2.2" fill="#1B2A4A" />
        <rect x="41.8" y="27.4" width="4.6" height="7.4" rx="2.2" fill="#1B2A4A" />
        <path d="M19.8 34.4 Q20.4 40 26 40" fill="none" stroke="#1B2A4A" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="26.4" cy="40" r="1.3" fill="#3DA684" />
      </g>
    </svg>
  )
}
