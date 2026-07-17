import { useEffect, useState } from 'react'
import Button from './Button.jsx'
import Reveal from './Reveal.jsx'
import { fetchGlobal, GLOBAL_FALLBACK } from '../lib/strapi.js'
import './ContactCTA.css'

/**
 * Final call-to-action band. Reused at the foot of most pages.
 * Sources its copy from the shared Global single type, so one CMS edit
 * updates every page — pass eyebrow/title/body/buttonLabel/buttonTo/email
 * to override on a per-page basis.
 */
export default function ContactCTA({ eyebrow, title, body, buttonLabel, buttonTo, email }) {
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
            <span className="eyebrow">{eyebrow || global.ctaEyebrow}</span>
            <h2 className="contact-cta__title display-2">{title || global.ctaHeading}</h2>
            <p className="contact-cta__body lead">{body || global.ctaSubhead}</p>
            <div className="contact-cta__actions">
              <Button to={buttonTo || global.ctaButtonLink} size="lg" icon="arrowUpRight">
                {buttonLabel || global.ctaButtonLabel}
              </Button>
              <Button href={`mailto:${email || global.ctaEmail}`} variant="outline" size="lg" icon="mail">
                {email || global.ctaEmail}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
