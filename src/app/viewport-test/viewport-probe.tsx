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
  const [topC, setTopC] = useState<number | null>(null)
  const [topD, setTopD] = useState<number | null>(null)
  const [reading, setReading] = useState<Reading>({})
  const [states, setStates] = useState<string[]>([])
  const barA = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const viewport = window.visualViewport
    const isChromeIos = /CriOS/.test(navigator.userAgent)
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const vvHeight = Math.round(viewport?.height ?? window.innerHeight)
        const vvOffsetTop = Math.round(viewport?.offsetTop ?? 0)
        const pageTop = viewport?.pageTop ?? window.scrollY
        const lvh = measureUnit("100lvh")
        const svh = measureUnit("100svh")
        const dvh = measureUnit("100dvh")
        const safeBottom = measureUnit("env(safe-area-inset-bottom)")
        const visibleBottom = vvOffsetTop + vvHeight
        const toolbarHidden = isChromeIos && safeBottom > 0 && lvh - visibleBottom > 20
        setTopC(pageTop + vvHeight - BAR_HEIGHT)
        setTopD(window.scrollY + (toolbarHidden ? lvh : visibleBottom) - BAR_HEIGHT)
        setReading({
          innerH: window.innerHeight,
          clientH: document.documentElement.clientHeight,
          vvH: vvHeight,
          vvTop: vvOffsetTop,
          svh, dvh, lvh, safeBottom,
          A_bottom: Math.round(barA.current?.getBoundingClientRect().bottom ?? 0),
          chromeIos: isChromeIos ? "yes" : "no",
          D_mode: toolbarHidden ? "lvh" : "visible",
        })
        const state = `vv${vvHeight} in${window.innerHeight} d${dvh} s${safeBottom}`
        setStates((prev) => prev.includes(state) ? prev : [...prev.slice(-4), state])
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
    <div className="px-4 pt-40">
      <div className="fixed top-0 inset-x-0 z-[70] bg-white/95 border-b border-navy/20 px-3 py-2 font-mono text-[11px] leading-snug text-navy">
        <div className="grid grid-cols-3 gap-x-3">
          {Object.entries(reading).map(([key, value]) => (
            <span key={key}>{key} <b>{value}</b></span>
          ))}
        </div>
        <div className="mt-1 text-[10px] text-foreground/70">{states.join(" | ")}</div>
      </div>
      <h1 className="text-2xl font-semibold text-navy">Bottom bar test</h1>
      <p className="mt-2 text-foreground/80">
        1) Screenshot with the browser toolbar showing. 2) Scroll down until it hides, stop, screenshot. 3) Scroll up and down a few times and watch whether bar D stays steady.
      </p>
      {Array.from({ length: 60 }, (_, i) => (
        <p key={i} className={`py-6 text-center text-foreground/60 ${i % 2 ? "bg-white" : "bg-secondary/60"}`}>Row {i + 1}</p>
      ))}

      <div ref={barA} className={`fixed bottom-0 left-0 w-1/3 bg-[#d9480f] ${barClass}`} style={{ height: BAR_HEIGHT, zIndex: 60 }}>A</div>
      {topC !== null && topD !== null && createPortal(
        <>
          <div className={`absolute left-1/3 w-1/3 bg-[#2f9e44] ${barClass}`} style={{ top: topC, height: BAR_HEIGHT, zIndex: 60 }}>C</div>
          <div className={`absolute left-2/3 w-1/3 bg-[#7048e8] ${barClass}`} style={{ top: topD, height: BAR_HEIGHT, zIndex: 60 }}>D</div>
        </>,
        document.body
      )}
    </div>
  )
}
