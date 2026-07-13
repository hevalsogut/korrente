import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import { articles as staticArticles } from '../data/content.js'
import { fetchArticleBySlug } from '../lib/strapi.js'
import { useI18n } from '../i18n/index.jsx'
import './ArticleDetail.css'

function findStatic(slug) {
  return staticArticles.find((a) => a.slug === slug) ?? null
}

export default function ArticleDetail() {
  const { slug } = useParams()
  const { t, pick, lang } = useI18n()
  const [article, setArticle] = useState(() => findStatic(slug))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchArticleBySlug(slug)
      .then((result) => {
        if (!cancelled) setArticle(result ?? findStatic(slug))
      })
      .catch((err) => {
        console.warn('Falling back to static article:', err)
        if (!cancelled) setArticle(findStatic(slug))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

  if (loading) {
    return (
      <section className="surface-light section article-detail-status">
        <div className="container">
          <p className="text-muted">{t('news.loading')}</p>
        </div>
      </section>
    )
  }

  if (!article) {
    return (
      <>
        <Seo title={t('news.notFoundTitle')} description={t('news.notFoundBody')} path="/news" />
        <section className="surface-dark section article-detail-status">
          <div className="container article-detail-status__inner">
            <h1 className="h3">{t('news.notFoundTitle')}</h1>
            <p className="text-muted">{t('news.notFoundBody')}</p>
            <Button to="/news" size="lg" icon="arrow">{t('news.backToNews')}</Button>
          </div>
        </section>
      </>
    )
  }

  const paragraphs = pick(article.body)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <>
      <Seo title={pick(article.title)} description={pick(article.excerpt)} path={`/news/${article.slug}`} />

      <PageHero eyebrow={pick(article.category)} title={pick(article.title)}>
        <p className="article-detail__byline">
          {formatDate(article.date)}
          <span className="article-meta__dot" aria-hidden="true">·</span>
          {pick(article.readingTime)} {t('common.readSuffix')}
        </p>
      </PageHero>

      <section className="surface-light section">
        <div className="container container--narrow">
          <Reveal>
            <Link to="/news" className="article-link article-detail__back">
              <Icon name="arrow" size={18} className="article-detail__back-icon" />
              {t('news.backToNews')}
            </Link>
          </Reveal>
          {article.coverUrl && (
            <Reveal delay={40} className="article-detail__media">
              <img
                src={article.coverUrl}
                alt={pick(article.title)}
                width={960}
                height={540}
                className="article-detail__image"
              />
            </Reveal>
          )}
          <Reveal delay={80} className="article-detail__body">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
