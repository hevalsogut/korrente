import { createContext, useCallback, useContext, useEffect } from 'react'
import { ui } from './ui.js'

/**
 * Lightweight i18n. No dependencies.
 *  - `lang`     current language (hardcoded to 'en')
 *  - `t(path)`  look up a dotted key in the UI dictionary, e.g. t('nav.about')
 *  - `pick(a)`  select a language variant from a bilingual data object, or return string
 */

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const lang = 'en'

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

  const pick = useCallback((val) => {
    if (val && typeof val === 'object' && !Array.isArray(val) && 'en' in val) {
      return val.en
    }
    return val
  }, [])

  return (
    <I18nContext.Provider value={{ lang, t, pick }}>{children}</I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
