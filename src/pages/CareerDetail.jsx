import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import { roles as staticRoles } from '../data/content.js'
import { company } from '../data/site.js'
import { fetchRoleBySlug } from '../lib/strapi.js'
import { useI18n } from '../i18n/index.jsx'
import './CareerDetail.css'

function findStatic(slug) {
  return staticRoles.find((r) => r.slug === slug) ?? null
}

export default function CareerDetail() {
  const { slug } = useParams()
  const { t, pick } = useI18n()
  const [role, setRole] = useState(() => findStatic(slug))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchRoleBySlug(slug)
      .then((result) => {
        if (!cancelled) setRole(result ?? findStatic(slug))
      })
      .catch((err) => {
        console.warn('Falling back to static role:', err)
        if (!cancelled) setRole(findStatic(slug))
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
      <section className="surface-light section career-detail-status">
        <div className="container">
          <p className="text-muted">{t('careers.loading')}</p>
        </div>
      </section>
    )
  }

  if (!role) {
    return (
      <>
        <Seo title={t('careers.notFoundTitle')} description={t('careers.notFoundBody')} path="/careers" />
        <section className="surface-dark section career-detail-status">
          <div className="container career-detail-status__inner">
            <h1 className="h3">{t('careers.notFoundTitle')}</h1>
            <p className="text-muted">{t('careers.notFoundBody')}</p>
            <Button to="/careers" size="lg" icon="arrow">{t('careers.backToCareers')}</Button>
          </div>
        </section>
      </>
    )
  }

  const paragraphs = pick(role.description)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  const mailSubject = t('careers.applySubject').replace('{title}', pick(role.title))
  const mailtoHref = `mailto:${company.email}?subject=${encodeURIComponent(mailSubject)}`

  return (
    <>
      <Seo title={pick(role.title)} description={pick(role.description)} path={`/careers/${role.slug}`} />

      <PageHero eyebrow={pick(role.team)} title={pick(role.title)}>
        <p className="career-detail__byline">
          {role.location}
          <span className="article-meta__dot" aria-hidden="true">·</span>
          {pick(role.type)}
        </p>
      </PageHero>

      <section className="surface-light section">
        <div className="container container--narrow">
          <Reveal>
            <Link to="/careers" className="article-link career-detail__back">
              <Icon name="arrow" size={18} className="career-detail__back-icon" />
              {t('careers.backToCareers')}
            </Link>
          </Reveal>
          <Reveal delay={80} className="career-detail__body">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={120} className="career-detail__apply">
            <a href={mailtoHref} className="btn btn--primary btn--lg">
              <span className="btn__label">{t('careers.applyNow')}</span>
              <Icon name="arrowUpRight" size={18} className="btn__icon" />
            </a>
          </Reveal>
        </div>
      </section>

      <ContactCTA eyebrow={t('careers.eyebrow')} title={t('careers.ctaTitle')} body={t('careers.ctaBody')} />
    </>
  )
}
