import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import Icon from '../components/Icon.jsx'
import { roles } from '../data/content.js'
import { useI18n } from '../i18n/index.jsx'
import './Careers.css'

const cultureIcons = ['spark', 'leaf', 'compass']

export default function Careers() {
  const { t, pick, lang } = useI18n()

  const seo = {
    en: { title: 'Careers', description: 'Join Korrente — engineers, developers, and operators building clean, dependable energy across Europe.' },
    tr: { title: 'Kariyer', description: 'Korrente’ye katılın — Avrupa genelinde temiz, güvenilir enerji inşa eden mühendisler, geliştiriciler ve operatörler.' }
  }[lang]

  const culture = t('careers.culture')

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/careers" />
      <PageHero eyebrow={t('careers.eyebrow')} title={t('careers.title')} lead={t('careers.lead')} />

      {/* Culture */}
      <section className="surface-dark section">
        <div className="container">
          <SectionHeading eyebrow={t('careers.cultureEyebrow')} title={t('careers.cultureTitle')} />
          <div className="culture-grid">
            {culture.map((c, i) => (
              <Reveal className="culture-card" key={i} delay={i * 90}>
                <span className="culture-card__icon">
                  <Icon name={cultureIcons[i]} size={24} />
                </span>
                <h3 className="h4">{c.title}</h3>
                <p className="text-muted">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="surface-light section">
        <div className="container">
          <SectionHeading eyebrow={t('careers.rolesEyebrow')} title={t('careers.rolesTitle')} />
          <ul className="roles" role="list">
            {roles.map((r, i) => (
              <Reveal as="li" className="role" key={r.id} delay={i * 60}>
                <a href="#" className="role__link" onClick={(e) => e.preventDefault()}>
                  <span className="role__main">
                    <span className="role__title">{pick(r.title)}</span>
                    <span className="role__meta">
                      {pick(r.team)} · {r.location} · {pick(r.type)}
                    </span>
                  </span>
                  <span className="role__apply">
                    {t('careers.apply')}
                    <Icon name="arrowUpRight" size={18} />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ContactCTA eyebrow={t('careers.eyebrow')} title={t('careers.ctaTitle')} body={t('careers.ctaBody')} />
    </>
  )
}
