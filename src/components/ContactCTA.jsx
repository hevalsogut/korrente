import { useEffect, useState } from 'react'
import Button from './Button.jsx'
import Reveal from './Reveal.jsx'
import { fetchGlobal, GLOBAL_FALLBACK } from '../lib/strapi.js'
import './ContactCTA.css'

/**
 * Final call-to-action band. Reused at the foot of every page, sourcing
 * its copy from the shared Global single type so one CMS edit updates
 * every page at once.
 */
export default function ContactCTA() {
  const [global, setGlobal] = useState(GLOBAL_FALLBACK)

  useEffect(() => {
    fetchGlobal()
      .then(setGlobal)
      .catch((err) => console.warn('Falling back to static global CTA copy:', err))
  }, [])

  return (
    <section className="contact-cta section">
      <div className="container">
        <Reveal className="contact-cta__panel">
          <div className="contact-cta__glow" aria-hidden="true" />
          <div className="contact-cta__content">
            <span className="eyebrow">{global.ctaEyebrow}</span>
            <h2 className="contact-cta__title display-2">{global.ctaHeading}</h2>
            <p className="contact-cta__body lead">{global.ctaSubhead}</p>
            <div className="contact-cta__actions">
              <Button to={global.ctaButtonLink} size="lg" icon="arrowUpRight">
                {global.ctaButtonLabel}
              </Button>
              <Button href={`mailto:${global.ctaEmail}`} variant="outline" size="lg" icon="mail">
                {global.ctaEmail}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
