'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowDown, ArrowRight, Check } from 'lucide-react'

type State = 'idle' | 'downloading' | 'done'

export default function DownloadButton({ href, filename, label }: { href: string; filename?: string; label: string }) {
  const [state, setState] = useState<State>('idle')
  const [progress, setProgress] = useState(0)

  const handleClick = useCallback(() => {
    if (state !== 'idle') return

    setState('downloading')
    setProgress(0)

    const duration = 1800
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))

      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
        setState('done')
        const a = document.createElement('a')
        a.href = href
        if (filename) a.download = filename
        else a.download = ''
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        setTimeout(() => {
          setState('idle')
          setProgress(0)
        }, 2500)
      }
    }

    requestAnimationFrame(tick)
  }, [state, href, filename])

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative h-11 sm:h-12 min-w-44 px-1.5 rounded-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-teal/50 focus-visible:ring-offset-2"
      aria-label={state === 'done' ? 'Download complete' : state === 'downloading' ? `Downloading ${progress}%` : label}
    >
      {/* Outer shell */}
      <div className="absolute inset-0 rounded-full bg-white shadow-[0_2px_16px_rgba(0,0,0,0.10)] border border-border" />

      {/* Progress fill */}
      <AnimatePresence>
        {state === 'downloading' && (
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0 round 9999px)' }}
            animate={{ clipPath: `inset(0 ${100 - progress}% 0 0 round 9999px)` }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: 'linear' }}
            className="absolute inset-[3px] rounded-full bg-teal"
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {state === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal shrink-0">
                <ArrowDown size={14} strokeWidth={2.5} className="text-white sm:hidden" />
                <ArrowDown size={16} strokeWidth={2.5} className="text-white hidden sm:block" />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-navy pr-2.5 whitespace-nowrap">{label}</span>
            </motion.div>
          )}

          {state === 'downloading' && (
            <motion.div
              key="downloading"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="text-lg font-bold text-white tabular-nums">{progress}%</span>
              <ArrowRight size={18} strokeWidth={2.5} className="text-white/80" />
            </motion.div>
          )}

          {state === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2"
            >
              <span className="text-sm font-semibold text-navy pl-2">Done</span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 15 }}
                className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-light"
              >
                <Check size={16} strokeWidth={3} className="text-white" />
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  )
}
