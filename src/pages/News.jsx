import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import { articles as staticArticles } from '../data/content.js'
import { fetchArticles, fetchNewsPage, NEWS_PAGE_FALLBACK } from '../lib/strapi.js'
import { useI18n } from '../i18n/index.jsx'
import './News.css'

const ALL = '__all__'

export default function News() {
  const { t, pick, lang } = useI18n()
  const [filter, setFilter] = useState(ALL)
  const [articles, setArticles] = useState(staticArticles)
  const [page, setPage] = useState(NEWS_PAGE_FALLBACK)

  useEffect(() => {
    fetchArticles()
      .then(setArticles)
      .catch((err) => console.warn('Falling back to static articles:', err))
  }, [])

  useEffect(() => {
    fetchNewsPage()
      .then(setPage)
      .catch((err) => console.warn('Falling back to static news page copy:', err))
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

  const categories = [
    { key: ALL, label: t('news.all') },
    ...articles.reduce((acc, a) => {
      if (!acc.some((c) => c.key === a.category)) acc.push({ key: a.category, label: a.category })
      return acc
    }, [])
  ]

  const featured = articles.find((a) => a.featured) || articles[0]
  const rest = articles.filter((a) => a.id !== featured.id)
  const visible = filter === ALL ? rest : rest.filter((a) => a.category === filter)

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/news" />

      <PageHero eyebrow={page.heroEyebrow} title={page.heroHeading} lead={page.heroSubhead} />

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
          <div className="news-filters" role="tablist" aria-label={page.heroEyebrow}>
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

      <ContactCTA />
    </>
  )
}
