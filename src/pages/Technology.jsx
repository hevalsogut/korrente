import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import Icon from '../components/Icon.jsx'
import { useI18n } from '../i18n/index.jsx'
import './Technology.css'

const capIcons = ['spark', 'grid', 'shield', 'molecule']

export default function Technology() {
  const { t, lang } = useI18n()

  const seo = {
    title: 'Technology',
    description: 'Korrente Grid — the real-time platform that forecasts, dispatches, and optimises our clean-energy fleet.'
  }

  const capabilities = t('technology.capabilities')

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/technology" />
      <PageHero eyebrow={t('technology.eyebrow')} title={t('technology.title')} lead={t('technology.lead')} />

      <section className="surface-dark section">
        <div className="container">
          <SectionHeading
            eyebrow={t('technology.platformEyebrow')}
            title={t('technology.platformTitle')}
            lead={t('technology.platformLead')}
          />
          <div className="tech-grid">
            {capabilities.map((c, i) => (
              <Reveal className="tech-card" key={i} delay={i * 80}>
                <span className="tech-card__icon">
                  <Icon name={capIcons[i]} size={24} />
                </span>
                <h3 className="h4">{c.title}</h3>
                <p className="text-muted">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
