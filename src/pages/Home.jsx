import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import HeroScene from '../components/HeroScene.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import StatsBand from '../components/StatsBand.jsx'
import Testimonials from '../components/Testimonials.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import { services as staticServices } from '../data/services.js'
import { fetchHomePage, fetchSolutions, fetchGlobal, HOME_PAGE_FALLBACK, GLOBAL_FALLBACK } from '../lib/strapi.js'
import './Home.css'

// Maps a CMS-supplied iconKey to the Icon name it already renders.
const FEATURE_ICONS = { storage: 'battery', integration: 'grid', europe: 'compass', sustainable: 'leaf' }

// Maps a CMS-supplied solution iconKey to the Icon name it should render.
const SOLUTION_ICONS = { solar: 'sun', wind: 'wind', storage: 'battery', grid: 'grid', hydrogen: 'molecule', advisory: 'compass' }

export default function Home() {
  const [home, setHome] = useState(HOME_PAGE_FALLBACK)
  const [services, setServices] = useState(staticServices)
  const [global, setGlobal] = useState(GLOBAL_FALLBACK)

  useEffect(() => {
    fetchHomePage()
      .then(setHome)
      .catch((err) => console.warn('Falling back to static home page copy:', err))
  }, [])

  useEffect(() => {
    fetchSolutions()
      .then(setServices)
      .catch((err) => console.warn('Falling back to static solutions:', err))
  }, [])

  useEffect(() => {
    fetchGlobal()
      .then(setGlobal)
      .catch((err) => console.warn('Falling back to static global CTA copy:', err))
  }, [])

  const seo = {
    title: 'We Manage Energy Flow',
    description:
      'Korrente delivers advanced energy storage and system integration solutions for a resilient and flexible energy infrastructure across Europe.'
  }

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/" />

      {/* ---------- HERO ---------- */}
      <section className="hero surface-darker">
        <div className="hero__backdrop" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__content">
            <Reveal as="h1" className="hero__title" delay={40}>
              {home.heroHeadingLine1}
              <span className="accent-word">{home.heroHeadingHighlight}</span>{' '}
              {home.heroHeadingLine2}
            </Reveal>
            <Reveal as="p" className="hero__lead lead" delay={150}>
              {home.heroSubhead}
            </Reveal>
            <Reveal className="hero__actions" delay={220}>
              <Button to={home.heroCtaLink} size="lg" icon="arrow">
                {home.heroCtaLabel}
              </Button>
            </Reveal>
          </div>

          <Reveal className="hero__visual" delay={120}>
            <HeroScene />
          </Reveal>
        </div>

        {/* Feature row */}
        <div className="hero__features">
          <div className="container hero__features-grid">
            {home.featureCards.map((f, i) => (
              <Reveal className="feature" key={i} delay={i * 80}>
                <span className="feature__icon">
                  <Icon name={FEATURE_ICONS[f.iconKey] || f.iconKey} size={22} />
                </span>
                <div>
                  <h2 className="feature__title">{f.title}</h2>
                  <p className="feature__body">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PARTNERS ---------- */}
      <section className="partners surface-dark section--tight">
        <div className="container partners__inner">
          <span className="partners__label">{home.trustedLabel}</span>
          <ul className="partners__list" role="list">
            {home.logos.map((logo, i) => (
              <li key={i}>{logo.name}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- WHO WE ARE ---------- */}
      <section className="intro surface-light section" id="who-we-are">
        <div className="container intro__grid">
          <Reveal className="intro__left">
            <span className="eyebrow">{home.whoEyebrow}</span>
            <p className="intro__statement h3">
              {home.whoHeadingStart}{' '}
              <span className="accent-word">{home.whoHeadingHighlight}</span>
              {home.whoHeadingEnd}
            </p>
          </Reveal>
          <Reveal className="intro__right" delay={120}>
            <p>{home.whoBody1}</p>
            <p>{home.whoBody2}</p>
            <Link to={home.whoLinkUrl} className="intro__link">
              {home.whoLinkLabel}
              <Icon name="arrowUpRight" size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- SOLUTIONS ---------- */}
      <section className="solutions-overview surface-dark section" id="solutions">
        <div className="container">
          <div className="solutions-overview__head">
            <SectionHeading
              eyebrow={home.doEyebrow}
              title={home.doHeading}
              lead={home.doSubhead}
            />
            <Reveal delay={120} className="solutions-overview__cta">
              <Button to={home.doCtaLink} variant="outline" icon="arrow">
                {home.doCtaLabel}
              </Button>
            </Reveal>
          </div>

          <div className="solutions-overview__grid">
            {services.slice(0, 6).map((service, i) => (
              <Reveal key={service.id} delay={(i % 3) * 90}>
                <ServiceCard service={{ ...service, icon: SOLUTION_ICONS[service.icon?.trim()] || service.icon }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY KORRENTE ---------- */}
      <section className="why surface-light--plain section">
        <div className="container why__grid">
          <div className="why__intro">
            <SectionHeading
              eyebrow={home.whyEyebrow}
              title={home.whyHeading}
              lead={home.whySubhead}
            />
          </div>
          <ol className="why__list" role="list">
            {home.reasons.map((reason, i) => (
              <Reveal as="li" className="why__item" key={i} delay={i * 80}>
                <span className="why__number">{String(i + 1).padStart(2, '0')}</span>
                <div className="why__body">
                  <h3 className="why__title h4">{reason.title}</h3>
                  <p>{reason.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- IMPACT ---------- */}
      <StatsBand eyebrow={global.impactEyebrow} heading={global.impactHeading} stats={global.impactStats} />

      {/* ---------- TESTIMONIALS ---------- */}
      {home.partnersEnabled && (
        <Testimonials eyebrow={home.partnersEyebrow} heading={home.partnersHeading} items={home.testimonials} />
      )}

      {/* ---------- CONTACT CTA ---------- */}
      <ContactCTA />
    </>
  )
}
