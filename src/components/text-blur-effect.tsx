/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { HTMLMotionProps } from "motion/react"
import * as motion from "motion/react-m"
import { Fragment } from "react"

export default function TextBlurEffect({ children, ...props }: { children: string } & HTMLMotionProps<'span'>) {
  const words = children.split(' ')
  let i = 0

  return (
    <>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {word.split('').map((char) => {
              const idx = i++
              return (
                // @ts-ignore
                <motion.span
                  style={{ display: 'inline-block', whiteSpace: 'pre' }}
                  key={idx}
                  initial={{ opacity: 0, filter: 'Blur(32px)', scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, filter: 'Blur(0)', scale: 1, y: 0 }}
                  transition={{ delay: idx * 0.035, ease: [1, 0, 0, 1], duration: 0.7 }}
                  {...props}
                >
                  {char}
                </motion.span>
              )
            })}
          </span>
          {wi < words.length - 1 && ' '}
        </Fragment>
      ))}
    </>
  )
}
