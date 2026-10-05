'use client'

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

const BAR_HEIGHT = 48

type Reading = Record<string, string | number>

function measureUnit(unit: string) {
  const probe = document.createElement("div")
  probe.style.cssText = `position:absolute;visibility:hidden;height:${unit}`
  document.body.appendChild(probe)
  const height = probe.getBoundingClientRect().height
  probe.remove()
  return Math.round(height)
}

export default function ViewportProbe() {
  const [topD, setTopD] = useState<number | null>(null)
  const [stuckGap, setStuckGap] = useState(0)
  const [stuckCount, setStuckCount] = useState(0)
  const [reading, setReading] = useState<Reading>({})
  const [states, setStates] = useState<string[]>([])
  const barA = useRef<HTMLDivElement>(null)
  const barE = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const viewport = window.visualViewport
    let frame = 0
    let wasStuck = false
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const vvHeight = Math.round(viewport?.height ?? window.innerHeight)
        const visibleBottom = Math.round(viewport?.offsetTop ?? 0) + vvHeight
        const lvh = measureUnit("100lvh")
        const safeBottom = measureUnit("env(safe-area-inset-bottom)")
        const gap = safeBottom >= 20 && lvh - visibleBottom > 24 ? lvh - visibleBottom : 0
        if (gap && !wasStuck) setStuckCount((n) => n + 1)
        wasStuck = gap > 0
        setStuckGap(gap)
        setTopD(window.scrollY + visibleBottom + gap - BAR_HEIGHT)
        setReading({
          innerH: window.innerHeight,
          vvH: vvHeight,
          lvh,
          svh: measureUnit("100svh"),
          safeBottom,
          gap,
          A_bottom: Math.round(barA.current?.getBoundingClientRect().bottom ?? 0),
          E_bottom: Math.round(barE.current?.getBoundingClientRect().bottom ?? 0),
        })
        const state = `vv${vvHeight} s${safeBottom}`
        setStates((prev) => prev.includes(state) ? prev : [...prev.slice(-5), state])
      })
    }
    update()
    viewport?.addEventListener("resize", update)
    viewport?.addEventListener("scroll", update)
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      cancelAnimationFrame(frame)
      viewport?.removeEventListener("resize", update)
      viewport?.removeEventListener("scroll", update)
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const barClass = "flex items-center justify-center text-white text-lg font-bold"

  return (
    <div className="px-4 pt-36">
      <div className="fixed top-0 inset-x-0 z-[70] bg-white/95 border-b border-navy/20 px-3 py-2 font-mono text-[11px] leading-snug text-navy">
        <div className="grid grid-cols-3 gap-x-3">
          {Object.entries(reading).map(([key, value]) => (
            <span key={key}>{key} <b>{value}</b></span>
          ))}
          <span>stuck seen <b>{stuckCount}</b></span>
        </div>
        <div className="mt-1 text-[10px] text-foreground/70">{states.join(" | ")}</div>
      </div>
      <h1 className="text-2xl font-semibold text-navy">Bottom bar test</h1>
      <p className="mt-2 text-foreground/80">
        Scroll in different ways (short flicks, long swipes, lifting your finger mid-swipe) until a gap appears under bar A, or &ldquo;stuck seen&rdquo; goes above 0. Then stop and screenshot. Also watch whether bar E stays steady while you scroll.
      </p>
      {Array.from({ length: 60 }, (_, i) => (
        <p key={i} className={`py-6 text-center text-foreground/60 ${i % 2 ? "bg-white" : "bg-secondary/60"}`}>Row {i + 1}</p>
      ))}

      <div
        ref={barE}
        className={`sticky ml-auto -mr-4 w-1/3 bg-[#1971c2] ${barClass}`}
        style={{ bottom: -stuckGap, height: BAR_HEIGHT, zIndex: 60 }}
      >
        E
      </div>
      <div ref={barA} className={`fixed bottom-0 left-0 w-1/3 bg-[#d9480f] ${barClass}`} style={{ height: BAR_HEIGHT, zIndex: 60 }}>A</div>
      {topD !== null && createPortal(
        <div className={`absolute left-1/3 w-1/3 bg-[#7048e8] ${barClass}`} style={{ top: topD, height: BAR_HEIGHT, zIndex: 60 }}>D</div>,
        document.body
      )}
    </div>
  )
}
