import { useEffect, useState, useCallback } from 'react'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { testimonials } from '../data/content.js'
import { useI18n } from '../i18n/index.jsx'
import './Testimonials.css'

export default function Testimonials() {
  const { t, pick } = useI18n()
  const [active, setActive] = useState(0)
  const count = testimonials.length

  const go = useCallback((i) => setActive((i + count) % count), [count])

  // Gentle auto-advance; pauses is handled by resetting the timer on manual change.
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const timer = setInterval(() => setActive((a) => (a + 1) % count), 7000)
    return () => clearInterval(timer)
  }, [active, count])

  const current = testimonials[active]

  return (
    <section className="testimonials surface-light section" aria-label={t('testimonials.eyebrow')}>
      <div className="container">
        <SectionHeading
          eyebrow={t('testimonials.eyebrow')}
          title={t('testimonials.title')}
          align="center"
        />

        <Reveal className="testimonials__stage">
          <span className="testimonials__quote-mark" aria-hidden="true">
            &ldquo;
          </span>

          <blockquote key={current.id} className="testimonials__quote">
            <p>{pick(current.quote)}</p>
            <footer className="testimonials__author">
              <span className="testimonials__avatar" aria-hidden="true">
                {current.name.split(' ').map((n) => n[0]).join('')}
              </span>
              <span>
                <cite className="testimonials__name">{current.name}</cite>
                <span className="testimonials__role">{pick(current.role)}</span>
              </span>
            </footer>
          </blockquote>

          <div className="testimonials__controls">
            <button
              type="button"
              className="testimonials__arrow"
              onClick={() => go(active - 1)}
              aria-label={t('testimonials.prev')}
            >
              <Icon name="arrow" size={20} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <div className="testimonials__dots" role="tablist" aria-label={t('testimonials.choose')}>
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`${i + 1}`}
                  className={`testimonials__dot ${i === active ? 'is-active' : ''}`}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            <button
              type="button"
              className="testimonials__arrow"
              onClick={() => go(active + 1)}
              aria-label={t('testimonials.next')}
            >
              <Icon name="arrow" size={20} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
