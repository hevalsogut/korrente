import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { footerNav, legalLinks } from '../data/site.js'
import { fetchGlobal, GLOBAL_FALLBACK } from '../lib/strapi.js'
import { useI18n } from '../i18n/index.jsx'
import './Footer.css'

export default function Footer() {
  const { pick } = useI18n()
  const [global, setGlobal] = useState(GLOBAL_FALLBACK)
  const year = new Date().getFullYear()

  useEffect(() => {
    fetchGlobal()
      .then(setGlobal)
      .catch((err) => console.warn('Falling back to static global CTA copy:', err))
  }, [])

  return (
    <footer className="site-footer surface-darker">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Logo tone="light" />
            <p className="site-footer__pitch">{global.footerTagline}</p>
            <a className="site-footer__mail" href={`mailto:${global.ctaEmail}`}>
              <Icon name="mail" size={18} />
              {global.ctaEmail}
            </a>

          </div>

          <nav className="site-footer__nav" aria-label="Footer">
            {footerNav.map((col) => (
              <div key={pick(col.title)} className="site-footer__col">
                <h2 className="site-footer__col-title">{pick(col.title)}</h2>
                <ul role="list">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <Link to={link.to}>{pick(link.label)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copy">
            © {year} {global.copyrightText}
          </p>
          <ul className="site-footer__legal" role="list">
            {legalLinks.map((link, i) => (
              <li key={i}>
                <Link to={link.to}>{pick(link.label)}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
