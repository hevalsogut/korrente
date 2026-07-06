import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { useI18n } from '../i18n/index.jsx'

export default function Layout() {
  const { t } = useI18n()
  return (
    <>
      <a className="skip-link" href="#main">
        {t('common.skip')}
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
