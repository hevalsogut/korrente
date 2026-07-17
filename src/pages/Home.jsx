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
import { services } from '../data/services.js'
import { values } from '../data/content.js'
import { useI18n } from '../i18n/index.jsx'
import { fetchHomePage, HOME_PAGE_FALLBACK } from '../lib/strapi.js'
import './Home.css'

const partners = ['Cascade Power', 'Meridian Utilities', 'Northwind', 'Solano Grid', 'Vanta Energy', 'Helios Co-op']
const featureIcons = ['battery', 'grid', 'compass', 'leaf']

export default function Home() {
  const { t, pick, lang } = useI18n()
  const [home, setHome] = useState(HOME_PAGE_FALLBACK)

  useEffect(() => {
    fetchHomePage()
      .then(setHome)
      .catch((err) => console.warn('Falling back to static home page copy:', err))
  }, [])

  const seo = {
    title: 'We Manage Energy Flow',
    description:
      'Korrente delivers advanced energy storage and system integration solutions for a resilient and flexible energy infrastructure across Europe.'
  }

  const features = t('home.features')

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
            {features.map((f, i) => (
              <Reveal className="feature" key={i} delay={i * 80}>
                <span className="feature__icon">
                  <Icon name={featureIcons[i]} size={22} />
                </span>
                <div>
                  <h2 className="feature__title">{f.title}</h2>
                  <p className="feature__body">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PARTNERS ---------- */}
      <section className="partners surface-dark section--tight">
        <div className="container partners__inner">
          <span className="partners__label">{t('home.partnersLabel')}</span>
          <ul className="partners__list" role="list">
            {partners.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- WHO WE ARE ---------- */}
      <section className="intro surface-light section" id="who-we-are">
        <div className="container intro__grid">
          <Reveal className="intro__left">
            <span className="eyebrow">{t('home.introEyebrow')}</span>
            <p className="intro__statement h3">
              {t('home.introPre')}
              <span className="accent-word">{t('home.introAccent')}</span>
              {t('home.introPost')}
            </p>
          </Reveal>
          <Reveal className="intro__right" delay={120}>
            <p>{t('home.introBody1')}</p>
            <p>{t('home.introBody2')}</p>
            <Link to="/contact" className="intro__link">
              {t('home.introLink')}
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
              eyebrow={t('home.solutionsEyebrow')}
              title={t('home.solutionsTitle')}
              lead={t('home.solutionsLead')}
            />
            <Reveal delay={120} className="solutions-overview__cta">
              <Button to="/solutions" variant="outline" icon="arrow">
                {t('common.allSolutions')}
              </Button>
            </Reveal>
          </div>

          <div className="solutions-overview__grid">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={(i % 3) * 90}>
                <ServiceCard service={service} />
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
              eyebrow={t('home.whyEyebrow')}
              title={t('home.whyTitle')}
              lead={t('home.whyLead')}
            />
          </div>
          <ol className="why__list" role="list">
            {values.map((value, i) => (
              <Reveal as="li" className="why__item" key={value.id} delay={i * 80}>
                <span className="why__number">{value.number}</span>
                <div className="why__body">
                  <h3 className="why__title h4">{pick(value.title)}</h3>
                  <p>{pick(value.body)}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <StatsBand />

      {/* ---------- TESTIMONIALS ---------- */}
      <Testimonials />

      {/* ---------- CONTACT CTA ---------- */}
      <ContactCTA
        eyebrow={home.ctaEyebrow}
        title={home.ctaHeading}
        body={home.ctaSubhead}
        buttonLabel={home.ctaButtonLabel}
        buttonTo={home.ctaButtonLink}
        email={home.ctaEmail}
      />
    </>
  )
}
