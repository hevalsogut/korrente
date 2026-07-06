import { useEffect } from 'react'

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
 */
export default function Seo({ title, description, path = '/', image = '/og-image.svg' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} — Clean, Reliable Energy`
    const url = `${BASE_URL}${path}`

    document.title = fullTitle
    setMeta('name', 'description', description)

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
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image)

    // Twitter
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)
  }, [title, description, path, image])

  return null
}
