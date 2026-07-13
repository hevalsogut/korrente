import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import { navLinks } from '../data/site.js'
import { useI18n } from '../i18n/index.jsx'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { t, pick } = useI18n()

  // Add a background once the page is scrolled a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Lock body scroll + support Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-open' : ''}`}>
      <div className="container site-header__inner">
        <Logo tone="light" />

        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__list" role="list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `site-nav__link ${isActive ? 'is-active' : ''}`
                  }
                >
                  {pick(link.label)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__end">
          <Button to="/contact" size="md" variant="outline" icon={null} className="site-header__cta site-header__contact">
            {t('common.contact')}
          </Button>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={26} />
            <span className="sr-only">{menuOpen ? t('common.closeMenu') : t('common.openMenu')}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
        <nav className="mobile-menu__nav" aria-label="Mobile">
          <ul role="list">
            {navLinks.map((link, i) => (
              <li key={link.to} style={{ '--i': i }}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `mobile-menu__link ${isActive ? 'is-active' : ''}`
                  }
                >
                  {pick(link.label)}
                  <Icon name="arrowUpRight" size={22} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__foot">
          <Button to="/contact" size="lg" icon="arrowUpRight" className="mobile-menu__cta">
            {t('common.startProject')}
          </Button>
        </div>
      </div>
    </header>
  )
}
