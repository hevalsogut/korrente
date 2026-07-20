import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import StatsBand from '../components/StatsBand.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import { projects as staticProjects } from '../data/content.js'
import { fetchProjects, fetchProjectsPage, fetchGlobal, PROJECTS_PAGE_FALLBACK, GLOBAL_FALLBACK } from '../lib/strapi.js'
import { useI18n } from '../i18n/index.jsx'
import './Projects.css'

export const statusKey = {
  operational: 'projects.statusOperational',
  construction: 'projects.statusConstruction',
  development: 'projects.statusDevelopment'
}

export default function Projects() {
  const { t, pick, lang } = useI18n()
  const [projects, setProjects] = useState(staticProjects)
  const [page, setPage] = useState(PROJECTS_PAGE_FALLBACK)
  const [global, setGlobal] = useState(GLOBAL_FALLBACK)

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch((err) => console.warn('Falling back to static projects:', err))
  }, [])

  useEffect(() => {
    fetchProjectsPage()
      .then(setPage)
      .catch((err) => console.warn('Falling back to static projects page copy:', err))
  }, [])

  useEffect(() => {
    fetchGlobal()
      .then(setGlobal)
      .catch((err) => console.warn('Falling back to static global CTA copy:', err))
  }, [])

  const seo = {
    title: 'Projects',
    description: 'Storage and generation projects Korrente has developed, built, and operates across Europe.'
  }

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/projects" />
      <PageHero eyebrow={page.heroEyebrow} title={page.heroHeading} lead={page.heroSubhead} />

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
                <h2 className="proj-card__name h4">
                  <Link to={`/projects/${p.slug}`}>
                    <span className="proj-card__stretch" />
                    {p.name}
                  </Link>
                </h2>
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

      <StatsBand eyebrow={global.impactEyebrow} heading={global.impactHeading} stats={global.impactStats} />

      <ContactCTA />
    </>
  )
}
