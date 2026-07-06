import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import StatsBand from '../components/StatsBand.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import { projects } from '../data/content.js'
import { useI18n } from '../i18n/index.jsx'
import './Projects.css'

const statusKey = {
  operational: 'projects.statusOperational',
  construction: 'projects.statusConstruction',
  development: 'projects.statusDevelopment'
}

export default function Projects() {
  const { t, pick, lang } = useI18n()

  const seo = {
    en: { title: 'Projects', description: 'Storage and generation projects Korrente has developed, built, and operates across Europe.' },
    tr: { title: 'Projeler', description: 'Korrente’nin Avrupa genelinde geliştirdiği, kurduğu ve işlettiği depolama ve üretim projeleri.' }
  }[lang]

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/projects" />
      <PageHero eyebrow={t('projects.eyebrow')} title={t('projects.title')} lead={t('projects.lead')} />

      <section className="surface-dark section">
        <div className="container">
          <div className="proj-grid">
            {projects.map((p, i) => (
              <Reveal as="article" className="proj-card" key={p.id} delay={(i % 3) * 80}>
                <div className="proj-card__top">
                  <span className={`proj-status proj-status--${p.status}`}>
                    <span className="proj-status__dot" aria-hidden="true" />
                    {t(statusKey[p.status])}
                  </span>
                  <span className="proj-card__cap">{p.capacity}</span>
                </div>
                <h2 className="proj-card__name h4">{p.name}</h2>
                <p className="proj-card__type text-muted">{pick(p.type)}</p>
                <p className="proj-card__loc">
                  <Icon name="pin" size={16} />
                  {p.location}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />

      <ContactCTA title={t('projects.ctaTitle')} body={t('projects.ctaBody')} />
    </>
  )
}
