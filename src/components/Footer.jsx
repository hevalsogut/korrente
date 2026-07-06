import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { company, footerNav, socials, legalLinks } from '../data/site.js'
import { useI18n } from '../i18n/index.jsx'
import './Footer.css'

export default function Footer() {
  const { t, pick } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer surface-darker">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Logo tone="light" />
            <p className="site-footer__pitch">{t('footer.pitch')}</p>
            <a className="site-footer__mail" href={`mailto:${company.email}`}>
              <Icon name="mail" size={18} />
              {company.email}
            </a>
            <ul className="site-footer__socials" role="list" aria-label={t('footer.socials')}>
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="social-chip"
                  >
                    <span aria-hidden="true">{s.short}</span>
                  </a>
                </li>
              ))}
            </ul>
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
            {t('footer.rights').replace('{year}', year)}
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
