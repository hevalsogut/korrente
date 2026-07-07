import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import { projects as staticProjects } from '../data/content.js'
import { fetchProjectBySlug } from '../lib/strapi.js'
import { useI18n } from '../i18n/index.jsx'
import { statusKey } from './Projects.jsx'
import './ProjectDetail.css'

function findStatic(slug) {
  return staticProjects.find((p) => p.slug === slug) ?? null
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const { t, pick } = useI18n()
  const [project, setProject] = useState(() => findStatic(slug))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchProjectBySlug(slug)
      .then((result) => {
        if (!cancelled) setProject(result ?? findStatic(slug))
      })
      .catch((err) => {
        console.warn('Falling back to static project:', err)
        if (!cancelled) setProject(findStatic(slug))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  if (loading) {
    return (
      <section className="surface-light section proj-detail-status">
        <div className="container">
          <p className="text-muted">{t('projects.loading')}</p>
        </div>
      </section>
    )
  }

  if (!project) {
    return (
      <>
        <Seo title={t('projects.notFoundTitle')} description={t('projects.notFoundBody')} path="/projects" />
        <section className="surface-dark section proj-detail-status">
          <div className="container proj-detail-status__inner">
            <h1 className="h3">{t('projects.notFoundTitle')}</h1>
            <p className="text-muted">{t('projects.notFoundBody')}</p>
            <Button to="/projects" size="lg" icon="arrow">{t('projects.backToProjects')}</Button>
          </div>
        </section>
      </>
    )
  }

  const paragraphs = pick(project.description)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <>
      <Seo title={project.name} description={pick(project.description)} path={`/projects/${project.slug}`} />

      <PageHero eyebrow={pick(project.type)} title={project.name}>
        <div className="proj-detail__meta">
          <span className={`proj-status proj-status--${project.status}`}>
            <span className="proj-status__dot" aria-hidden="true" />
            {t(statusKey[project.status])}
          </span>
          <span className="proj-detail__cap">{project.capacity}</span>
          <span className="proj-detail__loc">
            <Icon name="pin" size={16} />
            {project.location}
          </span>
        </div>
      </PageHero>

      <section className="surface-light section">
        <div className="container container--narrow">
          <Reveal>
            <Link to="/projects" className="article-link proj-detail__back">
              <Icon name="arrow" size={18} className="proj-detail__back-icon" />
              {t('projects.backToProjects')}
            </Link>
          </Reveal>
          <Reveal delay={80} className="proj-detail__body">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <ContactCTA title={t('projects.ctaTitle')} body={t('projects.ctaBody')} />
    </>
  )
}
