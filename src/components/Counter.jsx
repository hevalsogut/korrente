import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Counts up to `value` when scrolled into view.
 * Props: value (number), decimals, prefix, suffix, duration (ms)
 */
export default function Counter({ value, decimals = 0, prefix = '', suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  const format = (n) =>
    n.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setDisplay(value)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()

            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1)
              // easeOutExpo for a confident, decelerating count
              const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
              setDisplay(value * eased)
              if (progress < 1) requestAnimationFrame(tick)
              else setDisplay(value)
            }
            requestAnimationFrame(tick)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <span ref={ref}>
      {prefix}
      {format(display)}
      {suffix}
    </span>
  )
}
