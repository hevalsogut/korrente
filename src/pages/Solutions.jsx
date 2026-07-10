import { useEffect, useState } from 'react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import { services as staticServices } from '../data/services.js'
import { fetchSolutions, fetchSolutionsPage, SOLUTIONS_PAGE_FALLBACK } from '../lib/strapi.js'
import { useI18n } from '../i18n/index.jsx'
import './Solutions.css'

export default function Solutions() {
  const { t, pick, lang } = useI18n()
  const [services, setServices] = useState(staticServices)
  const [hero, setHero] = useState(SOLUTIONS_PAGE_FALLBACK)

  useEffect(() => {
    fetchSolutions()
      .then(setServices)
      .catch((err) => console.warn('Falling back to static solutions:', err))
  }, [])

  useEffect(() => {
    fetchSolutionsPage()
      .then(setHero)
      .catch((err) => console.warn('Falling back to static solutions page hero:', err))
  }, [])

  const seo = {
    en: {
      title: 'Solutions',
      description:
        'Utility-scale solar, wind, energy storage, grid intelligence, green hydrogen, and transition advisory — the full stack of clean energy infrastructure from Korrente.'
    },
    tr: {
      title: 'Çözümler',
      description:
        'Şebeke ölçekli güneş, rüzgâr, enerji depolama, şebeke zekâsı, yeşil hidrojen ve dönüşüm danışmanlığı — Korrente’dan uçtan uca temiz enerji altyapısı.'
    }
  }[lang]

  const process = t('solutions.process')

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/solutions" />

      <PageHero eyebrow={pick(hero.eyebrow)} title={pick(hero.heading)} lead={pick(hero.subhead)} />

      {/* Anchor nav */}
      <nav className="solutions-nav surface-dark" aria-label={pick(hero.eyebrow)}>
        <div className="container solutions-nav__inner">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="solutions-nav__link">
              <Icon name={s.icon} size={18} />
              {pick(s.name)}
            </a>
          ))}
        </div>
      </nav>

      {/* Detailed solutions */}
      <div className="surface-light">
        {services.map((service, i) => (
          <section
            key={service.id}
            id={service.id}
            className={`solution-detail ${i % 2 === 1 ? 'solution-detail--alt' : ''}`}
          >
            <div className="container solution-detail__grid">
              <Reveal className="solution-detail__media">
                <div className="solution-detail__visual">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={pick(service.name)}
                      className="solution-detail__image"
                    />
                  ) : (
                    <Icon name={service.icon} size={64} strokeWidth={1.2} />
                  )}
                  {service.metric && (
                    <div className="solution-detail__metric">
                      <span className="solution-detail__metric-value">
                        {service.metric.value}
                        <em>{service.metric.unit}</em>
                      </span>
                      <span className="solution-detail__metric-label">{pick(service.metric.label)}</span>
                    </div>
                  )}
                </div>
              </Reveal>

              <Reveal className="solution-detail__content" delay={100}>
                <span className="solution-detail__index">
                  {String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                </span>
                <h2 className="solution-detail__title h3">{pick(service.name)}</h2>
                <p className="solution-detail__summary lead">{pick(service.summary)}</p>
                <p className="solution-detail__desc">{pick(service.description)}</p>
                <ul className="solution-detail__features" role="list">
                  {pick(service.features).map((f) => (
                    <li key={f}>
                      <Icon name="check" size={18} />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      {/* Process */}
      <section className="surface-dark section">
        <div className="container">
          <div className="process">
            <div className="process__head">
              <span className="eyebrow">{t('solutions.processEyebrow')}</span>
              <h2 className="h3 process__title">{t('solutions.processTitle')}</h2>
            </div>
            <ol className="process__steps" role="list">
              {process.map((p, i) => (
                <Reveal as="li" className="process__step" key={i} delay={i * 80}>
                  <span className="process__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="h4">{p.title}</h3>
                  <p className="text-muted">{p.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <ContactCTA title={t('solutions.ctaTitle')} body={t('solutions.ctaBody')} />
    </>
  )
}
