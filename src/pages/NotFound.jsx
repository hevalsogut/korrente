import Seo from '../components/Seo.jsx'
import Button from '../components/Button.jsx'
import { useI18n } from '../i18n/index.jsx'
import './NotFound.css'

export default function NotFound() {
  const { t, lang } = useI18n()
  const title = lang === 'tr' ? 'Sayfa bulunamadı' : 'Page not found'

  return (
    <>
      <Seo title={title} description={t('notFound.lead')} path="/404" />
      <section className="notfound surface-dark">
        <div className="notfound__grid" aria-hidden="true" />
        <div className="container notfound__inner">
          <span className="notfound__code">404</span>
          <h1 className="display-2">{t('notFound.title')}</h1>
          <p className="lead">{t('notFound.lead')}</p>
          <div className="notfound__actions">
            <Button to="/" size="lg" icon="arrow">{t('common.backHome')}</Button>
            <Button to="/solutions" variant="outline" size="lg" icon="arrowUpRight">
              {t('common.viewSolutions')}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
