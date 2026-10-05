import { useEffect, useState } from "react"

const IOS_THIRD_PARTY_BROWSER = /CriOS|FxiOS|EdgiOS/
const MIN_GAP = 24
const MAX_GAP = 150

/**
 * Chrome on iPhone sometimes hides its bottom toolbar without telling the
 * page, so the visual viewport stays at a mid-animation height while the
 * screen is actually taller. Fixed elements are clipped to that stale
 * height, leaving a strip of page showing below a bottom bar. The tell is a
 * full bottom safe-area inset (only reported once the toolbar is gone) while
 * the viewport still ends well short of 100lvh. Returns that missing height,
 * and mirrors it into the --viewport-gap CSS variable for other fixed UI.
 */
export default function useMissedToolbarGap() {
  const [gap, setGap] = useState(0)

  useEffect(() => {
    const viewport = window.visualViewport
    if (!viewport || !IOS_THIRD_PARTY_BROWSER.test(navigator.userAgent)) return

    const probe = document.createElement("div")
    probe.setAttribute("aria-hidden", "true")
    probe.style.cssText = "position:absolute;top:0;left:0;width:0;visibility:hidden;pointer-events:none;height:100lvh;padding-bottom:env(safe-area-inset-bottom)"
    document.body.appendChild(probe)

    let frame = 0
    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const probeStyle = getComputedStyle(probe)
        const largeViewport = parseFloat(probeStyle.height)
        const safeBottom = parseFloat(probeStyle.paddingBottom)
        const missing = largeViewport - (viewport.offsetTop + viewport.height)
        const typing = document.activeElement?.matches("input, textarea, select, [contenteditable]") ?? false
        const next = !typing && safeBottom >= 20 && missing > MIN_GAP && missing < MAX_GAP ? Math.round(missing) : 0
        setGap(next)
        document.documentElement.style.setProperty("--viewport-gap", `${next}px`)
      })
    }

    measure()
    viewport.addEventListener("resize", measure)
    viewport.addEventListener("scroll", measure)
    window.addEventListener("scroll", measure, { passive: true })
    window.addEventListener("resize", measure)
    document.addEventListener("focusin", measure)
    document.addEventListener("focusout", measure)
    return () => {
      cancelAnimationFrame(frame)
      viewport.removeEventListener("resize", measure)
      viewport.removeEventListener("scroll", measure)
      window.removeEventListener("scroll", measure)
      window.removeEventListener("resize", measure)
      document.removeEventListener("focusin", measure)
      document.removeEventListener("focusout", measure)
      probe.remove()
      document.documentElement.style.removeProperty("--viewport-gap")
    }
  }, [])

  return gap
}
