import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { ui } from './ui.js'

/**
 * Lightweight i18n. No dependencies.
 *  - `lang`     current language ('en' | 'tr')
 *  - `setLang`  switch language (persisted to localStorage)
 *  - `t(path)`  look up a dotted key in the UI dictionary, e.g. t('nav.about')
 *  - `pick(a)`  select a language variant from a bilingual data object
 *
 * Big content lives in src/data/* as `{ en: [...], tr: [...] }`; UI microcopy
 * lives in src/i18n/ui.js. To add a language, extend both.
 */

export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'tr', label: 'TR', name: 'Türkçe' }
]

const STORAGE_KEY = 'korrente-lang'
const I18nContext = createContext(null)

function detectInitialLang() {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = window.localStorage?.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'tr') return saved
  } catch {
    /* localStorage may be unavailable */
  }
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase()
  return nav === 'tr' ? 'tr' : 'en'
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang)

  const setLang = useCallback((next) => {
    setLangState(next)
    try {
      window.localStorage?.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = useCallback(
    (path) => {
      const value = path
        .split('.')
        .reduce((obj, key) => (obj == null ? undefined : obj[key]), ui[lang])
      return value == null ? path : value
    },
    [lang]
  )

  const pick = useCallback((bilingual) => bilingual?.[lang] ?? bilingual?.en, [lang])

  return (
    <I18nContext.Provider value={{ lang, setLang, t, pick }}>{children}</I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
