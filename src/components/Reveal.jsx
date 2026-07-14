import { useEffect, useRef, useState } from 'react'

/**
 * Reveal-on-scroll wrapper.
 * Adds the `is-visible` class once the element enters the viewport.
 * Respects prefers-reduced-motion via the CSS in index.css.
 *
 * Props:
 *  - as: element/component to render (default 'div')
 *  - delay: stagger delay in ms
 *  - className: extra classes
 *  - onVisible: optional callback fired once, the same moment the
 *    element first becomes visible — lets content inside (e.g. a
 *    count-up number) start its own animation in sync with the reveal
 *    instead of on mount, which may happen while still off-screen.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', onVisible, children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  // Kept in a ref so the observer effect (deps: []) always calls the
  // latest callback without needing to re-subscribe on every render.
  const onVisibleRef = useRef(onVisible)
  onVisibleRef.current = onVisible

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reveal = () => {
      setVisible(true)
      onVisibleRef.current?.()
    }

    // If IntersectionObserver is unavailable, show immediately.
    if (typeof IntersectionObserver === 'undefined') {
      reveal()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
