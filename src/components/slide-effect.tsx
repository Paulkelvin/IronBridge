'use client'

import { MotionProps, HTMLMotionProps } from "motion/react";
import * as motion from "motion/react-m"
import usePrefersReducedMotion from "@/hooks/use-prefers-reduced-motion"

interface SlideEffectProps {
  children: React.ReactNode;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  duration?: number;
  ease?: [number, number, number, number] | 'easeIn' | 'easeOut' | 'easeInOut' | 'linear';
  isSpring?: boolean
}

export default function SlideEffect(
  { children, direction = 'top', delay = 0.1, duration = 0.7, ease = [1, 0, 0, 1], isSpring = true, className }:
    HTMLMotionProps<'div'> & MotionProps & SlideEffectProps) {
  const shouldReduceMotion = usePrefersReducedMotion()

  // Users with reduced-motion enabled, or content that never scrolls into
  // view (e.g. very tall or short viewports), should still see the content.
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: direction === 'top' ? 70 : direction === 'bottom' ? -70 : 0, x: direction === 'left' ? 70 : direction === 'right' ? -70 : 0 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px 35% 0px' }}
      transition={{ duration, ease, delay, type: isSpring ? 'spring' : '' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
