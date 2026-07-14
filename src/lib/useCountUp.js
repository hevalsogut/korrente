import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Animates a number from its last displayed value to `value` — on mount
 * that's 0 -> value, on every later change it's the previous displayed
 * value -> the new one. Debounced so rapid recomputation (typing,
 * dragging) doesn't restart the roll on every keystroke; only the value
 * that "settles" for `debounceMs` actually animates. Returns the current
 * animated number — callers format it themselves, every frame, so the
 * displayed string is never raw/unformatted mid-roll.
 *
 * Always lands exactly on `value` (the last frame sets it directly,
 * sidestepping any float drift from the easing curve).
 *
 * `enabled` (default true) gates the whole effect — while false, the
 * hook does nothing and holds at its last displayed value (0 before
 * the first run). Pairs with a scroll-reveal: pass the reveal's
 * "has this become visible yet" flag so the count starts in sync with
 * the reveal instead of on mount, which can happen while still
 * off-screen and finish silently before the user ever sees it roll.
 */
export function useCountUp(value, { duration = 700, debounceMs = 180, enabled = true } = {}) {
  const [display, setDisplay] = useState(0)
  const displayRef = useRef(0)
  const frameRef = useRef(null)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (!enabled) return

    const target = Number.isFinite(value) ? value : 0

    if (prefersReducedMotion()) {
      clearTimeout(debounceRef.current)
      cancelAnimationFrame(frameRef.current)
      displayRef.current = target
      setDisplay(target)
      return
    }

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const from = displayRef.current
      if (from === target) return

      cancelAnimationFrame(frameRef.current)
      const start = performance.now()

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        if (progress >= 1) {
          displayRef.current = target
          setDisplay(target)
          return
        }
        // easeOutExpo — fast start, gentle stop.
        const eased = 1 - Math.pow(2, -10 * progress)
        const current = from + (target - from) * eased
        displayRef.current = current
        setDisplay(current)
        frameRef.current = requestAnimationFrame(tick)
      }
      frameRef.current = requestAnimationFrame(tick)
    }, debounceMs)

    return () => clearTimeout(debounceRef.current)
  }, [value, duration, debounceMs, enabled])

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  return display
}
