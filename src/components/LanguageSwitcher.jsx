import { useEffect, useRef, useState } from 'react'
import { useI18n, LANGUAGES } from '../i18n/index.jsx'
import Icon from './Icon.jsx'
import './LanguageSwitcher.css'

/**
 * "EN ⌄" language dropdown. Keyboard-accessible: Escape closes, click
 * outside closes, and choosing a language updates the whole site.
 */
export default function LanguageSwitcher({ variant = 'header' }) {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={`lang-switch lang-switch--${variant}`} ref={ref}>
      <button
        type="button"
        className="lang-switch__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('common.changeLanguage')}
        onClick={() => setOpen((v) => !v)}
      >
        {current.label}
        <Icon name="chevron" size={16} className={`lang-switch__chev ${open ? 'is-open' : ''}`} />
      </button>

      {open && (
        <ul className="lang-switch__menu" role="listbox" aria-label={t('common.changeLanguage')}>
          {LANGUAGES.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button
                type="button"
                lang={l.code}
                className={`lang-switch__item ${l.code === lang ? 'is-active' : ''}`}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
              >
                <span className="lang-switch__code">{l.label}</span>
                <span className="lang-switch__name">{l.name}</span>
                {l.code === lang && <Icon name="check" size={16} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
