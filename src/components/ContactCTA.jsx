import Button from './Button.jsx'
import Reveal from './Reveal.jsx'
import { company } from '../data/site.js'
import { useI18n } from '../i18n/index.jsx'
import './ContactCTA.css'

/**
 * Final call-to-action band. Reused at the foot of most pages.
 * Pass already-translated eyebrow/title/body to override the defaults.
 */
export default function ContactCTA({ eyebrow, title, body, buttonLabel, buttonTo, email }) {
  const { t } = useI18n()

  return (
    <section className="contact-cta section">
      <div className="container">
        <Reveal className="contact-cta__panel">
          <div className="contact-cta__glow" aria-hidden="true" />
          <div className="contact-cta__content">
            <span className="eyebrow">{eyebrow || t('cta.eyebrow')}</span>
            <h2 className="contact-cta__title display-2">{title || t('cta.title')}</h2>
            <p className="contact-cta__body lead">{body || t('cta.body')}</p>
            <div className="contact-cta__actions">
              <Button to={buttonTo || '/contact'} size="lg" icon="arrowUpRight">
                {buttonLabel || t('common.startProject')}
              </Button>
              <Button href={`mailto:${email || company.email}`} variant="outline" size="lg" icon="mail">
                {email || company.email}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
