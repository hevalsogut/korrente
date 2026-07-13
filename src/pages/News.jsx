import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import { articles as staticArticles } from '../data/content.js'
import { fetchArticles } from '../lib/strapi.js'
import { useI18n } from '../i18n/index.jsx'
import './News.css'

const ALL = '__all__'

export default function News() {
  const { t, pick, lang } = useI18n()
  const [filter, setFilter] = useState(ALL)
  const [articles, setArticles] = useState(staticArticles)

  useEffect(() => {
    fetchArticles()
      .then(setArticles)
      .catch((err) => console.warn('Falling back to static articles:', err))
  }, [])

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

  const seo = {
    title: 'Insights',
    description:
      'Perspectives from Korrente on the energy transition — firm renewables, storage, grid reform, policy, and the technology that makes clean power dependable.'
  }

  // Categories keyed by the stable English value so filtering survives language switches.
  const categories = [
    { key: ALL, label: t('news.all') },
    ...articles.reduce((acc, a) => {
      if (!acc.some((c) => c.key === a.category.en)) acc.push({ key: a.category.en, label: pick(a.category) })
      return acc
    }, [])
  ]

  const featured = articles.find((a) => a.featured) || articles[0]
  const rest = articles.filter((a) => a.id !== featured.id)
  const visible = filter === ALL ? rest : rest.filter((a) => a.category.en === filter)

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/news" />

      <PageHero eyebrow={t('news.eyebrow')} title={t('news.title')} lead={t('news.lead')} />

      {/* Featured */}
      <section className="surface-light section--tight">
        <div className="container">
          <Reveal>
            <article className="feature-article">
              <div className="feature-article__media">
                <span className="feature-article__badge">{t('news.featured')}</span>
                {featured.coverUrl ? (
                  <img
                    src={featured.coverUrl}
                    alt={pick(featured.title)}
                    width={640}
                    height={440}
                    className="feature-article__image"
                  />
                ) : (
                  <Icon name="spark" size={72} strokeWidth={1} aria-hidden="true" />
                )}
              </div>
              <div className="feature-article__body">
                <div className="article-meta">
                  <span className="article-tag">{pick(featured.category)}</span>
                  <span>{formatDate(featured.date)}</span>
                  <span className="article-meta__dot" aria-hidden="true">·</span>
                  <span>{pick(featured.readingTime)} {t('common.readSuffix')}</span>
                </div>
                <h2 className="feature-article__title h3">
                  <Link to={`/news/${featured.slug}`}>{pick(featured.title)}</Link>
                </h2>
                <p className="feature-article__excerpt lead">{pick(featured.excerpt)}</p>
                <Link to={`/news/${featured.slug}`} className="article-link">
                  {t('common.readArticle')}
                  <Icon name="arrowUpRight" size={18} />
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="surface-light section--tight">
        <div className="container">
          <div className="news-filters" role="tablist" aria-label={t('news.eyebrow')}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={filter === cat.key}
                className={`news-filter ${filter === cat.key ? 'is-active' : ''}`}
                onClick={() => setFilter(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="news-grid">
            {visible.map((article, i) => (
              <Reveal as="article" className="news-card" key={article.id} delay={(i % 3) * 80}>
                {article.coverUrl && (
                  <div className="news-card__media">
                    <img
                      src={article.coverUrl}
                      alt={pick(article.title)}
                      width={400}
                      height={240}
                      className="news-card__image"
                    />
                  </div>
                )}
                <div className="news-card__top" aria-hidden="true">
                  <Icon name="arrowUpRight" size={20} />
                </div>
                <div className="article-meta">
                  <span className="article-tag">{pick(article.category)}</span>
                  <span>{formatDate(article.date)}</span>
                </div>
                <h3 className="news-card__title h4">
                  <Link to={`/news/${article.slug}`}>
                    <span className="news-card__stretch" />
                    {pick(article.title)}
                  </Link>
                </h3>
                <p className="news-card__excerpt text-muted">{pick(article.excerpt)}</p>
                <span className="news-card__foot">{pick(article.readingTime)} {t('common.readSuffix')}</span>
              </Reveal>
            ))}
          </div>

          {visible.length === 0 && <p className="news-empty text-muted">{t('news.empty')}</p>}
        </div>
      </section>

      {/* Newsletter */}
      <section className="surface-dark section">
        <div className="container">
          <Reveal className="newsletter">
            <div className="newsletter__text">
              <span className="eyebrow">{t('news.newsletterEyebrow')}</span>
              <h2 className="h3">{t('news.newsletterTitle')}</h2>
              <p className="text-muted">{t('news.newsletterBody')}</p>
            </div>
            <form
              className="newsletter__form"
              onSubmit={(e) => {
                e.preventDefault()
                e.currentTarget.reset()
              }}
            >
              <label className="sr-only" htmlFor="newsletter-email">
                {t('contact.labelEmail')}
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder={t('news.emailPlaceholder')}
                className="newsletter__input"
              />
              <button type="submit" className="btn btn--primary btn--md newsletter__submit">
                <span className="btn__label">{t('common.subscribe')}</span>
                <Icon name="arrow" size={18} className="btn__icon" />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
