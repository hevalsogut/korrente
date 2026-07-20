import { useEffect, useState } from 'react'
import { fetchGlobal, GLOBAL_FALLBACK } from '../lib/strapi.js'

const SITE_NAME = 'Korrente'
const BASE_URL = 'https://www.korrente.com'

/** Set or create a <meta> tag by name or property. */
function setMeta(attr, key, value) {
  if (!value) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/**
 * Lightweight, dependency-free SEO manager.
 * Updates document title, description, canonical, and social tags per page.
 * `title`/`description`/`image` are per-page overrides; when a page omits
 * one, it falls back to the site-wide default from the Global single type
 * (see GLOBAL_FALLBACK/fetchGlobal in src/lib/strapi.js) rather than a
 * hardcoded constant.
 */
export default function Seo({ title, description, path = '/', image }) {
  const [global, setGlobal] = useState(GLOBAL_FALLBACK)

  useEffect(() => {
    fetchGlobal()
      .then(setGlobal)
      .catch((err) => console.warn('Falling back to static global CTA copy:', err))
  }, [])

  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE_NAME}` : global.seoTitle
    const resolvedDescription = description || global.seoDescription
    const resolvedImage = image || global.seoOgImage
    const url = `${BASE_URL}${path}`

    document.title = fullTitle
    setMeta('name', 'description', resolvedDescription)

    // Canonical
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    // Open Graph
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', resolvedDescription)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', resolvedImage)

    // Twitter
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', resolvedDescription)
    setMeta('name', 'twitter:image', resolvedImage)
  }, [title, description, path, image, global])

  return null
}
