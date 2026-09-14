import { useEffect, useState } from "react"

/**
 * Unlike framer-motion's own `useReducedMotion`, this defers reading
 * `matchMedia` until after mount so the client's first render always
 * matches the server-rendered HTML (avoids a hydration mismatch), at
 * the cost of a one-tick delay before reduced-motion users see the
 * static (non-animated) content.
 */
export default function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(query.matches)

    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches)
    query.addEventListener("change", handleChange)
    return () => query.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}
