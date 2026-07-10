/* ------------------------------------------------------------------
   Strapi CMS client — Articles, Projects, Roles, Solutions.
   Strapi 5 returns a flattened response: json.data is an array with
   fields directly on each item (no `.attributes`) plus `documentId`.
   We map each entry back into the exact shape src/data/content.js /
   src/data/services.js uses, so pages can consume CMS data or the
   static fallback interchangeably.
   ------------------------------------------------------------------ */

import { services } from '../data/services.js'

const BASE = import.meta.env.VITE_STRAPI_URL
// Strapi's own origin, for resolving media URLs — Strapi returns relative
// paths like "/uploads/xyz.png" for local-provider uploads, but an already-
// absolute URL (e.g. a cloud storage provider) if one is configured.
const ORIGIN = BASE?.replace(/\/api\/?$/, '')

async function fetchJson(path) {
  const res = await fetch(`${BASE}/api/${path}`)
  if (!res.ok) throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`)
  return res.json()
}

function toAbsoluteMediaUrl(url) {
  if (!url) return null
  return /^https?:\/\//.test(url) ? url : `${ORIGIN}${url}`
}

function mapArticle(item) {
  return {
    id: item.documentId,
    slug: item.slug,
    title: { en: item.titleEn, tr: item.titleTr },
    excerpt: { en: item.excerptEn, tr: item.excerptTr },
    category: { en: item.categoryEn, tr: item.categoryTr },
    readingTime: { en: item.readingTimeEn, tr: item.readingTimeTr },
    body: { en: item.bodyEn, tr: item.bodyTr },
    date: item.date,
    featured: item.featured,
    coverUrl: item.image?.url ? `${BASE}${item.image.url}` : null
  }
}

export async function fetchArticles() {
  const json = await fetchJson('articles?sort=date:desc&populate=image')
  return json.data.map(mapArticle)
}

export async function fetchArticleBySlug(slug) {
  const json = await fetchJson(`articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=image`)
  const item = json.data[0]
  return item ? mapArticle(item) : null
}

function mapProject(item) {
  return {
    id: item.documentId,
    slug: item.slug,
    name: item.name,
    location: item.location,
    capacity: item.capacity,
    status: item.projectStatus,
    type: { en: item.typeEn, tr: item.typeTr },
    description: { en: item.descriptionEn, tr: item.descriptionTr }
  }
}

export async function fetchProjects() {
  const json = await fetchJson('projects')
  return json.data.map(mapProject)
}

export async function fetchProjectBySlug(slug) {
  const json = await fetchJson(`projects?filters[slug][$eq]=${encodeURIComponent(slug)}`)
  const item = json.data[0]
  return item ? mapProject(item) : null
}

function mapRole(item) {
  return {
    id: item.documentId,
    slug: item.slug,
    title: { en: item.titleEn, tr: item.titleTr },
    team: { en: item.teamEn, tr: item.teamTr },
    location: item.location,
    type: { en: item.typeEn, tr: item.typeTr },
    description: { en: item.descriptionEn, tr: item.descriptionTr }
  }
}

export async function fetchRoles() {
  const json = await fetchJson('positions')
  return json.data.map(mapRole)
}

export async function fetchRoleBySlug(slug) {
  const json = await fetchJson(`positions?filters[slug][$eq]=${encodeURIComponent(slug)}`)
  const item = json.data[0]
  return item ? mapRole(item) : null
}

/* Solutions map to the exact shape src/data/services.js uses (name,
   summary, description, features as { en:[...], tr:[...] }, metric,
   icon), so Solutions.jsx / Home.jsx / ServiceCard.jsx need no changes
   beyond swapping their data source. */
function mapSolution(item) {
  const features = item.feature || []
  return {
    id: item.documentId,
    icon: item.iconKey,
    name: { en: item.titleEn, tr: item.titleTr },
    summary: { en: item.taglineEn, tr: item.taglineTr },
    description: { en: item.descriptionEn, tr: item.descriptionTr },
    features: {
      en: features.map((f) => f.en),
      tr: features.map((f) => f.tr)
    },
    metric: item.statValue
      ? { value: item.statValue, unit: item.statUnit, label: { en: item.statLabelEn, tr: item.statLabelTr } }
      : null,
    image: toAbsoluteMediaUrl(item.image?.url)
  }
}

export async function fetchSolutions() {
  try {
    const json = await fetchJson('solutions?sort=order:asc&populate=*')
    const mapped = json.data?.map(mapSolution) ?? []
    return mapped.length > 0 ? mapped : services
  } catch (err) {
    console.warn('Falling back to static solutions:', err)
    return services
  }
}

/* Solutions page hero — a Strapi single type, so `data` is one object,
   not an array. Fallback matches the copy previously hardcoded in
   src/i18n/ui.js under `solutions.eyebrow` / `.title` / `.lead`. */
export const SOLUTIONS_PAGE_FALLBACK = {
  eyebrow: { en: 'Solutions', tr: 'Çözümler' },
  heading: { en: 'Every layer of dependable clean energy.', tr: 'Güvenilir temiz enerjinin her katmanı.' },
  subhead: {
    en: 'We develop, build, and operate across the full clean energy stack — and tie it together with software that makes renewables behave like firm, plannable power.',
    tr: 'Temiz enerji yığınının tamamında geliştirir, kurar ve işletiriz — ve hepsini, yenilenebilir enerjiyi kesintisiz ve planlanabilir bir güç gibi davranmaya iten yazılımla birbirine bağlarız.'
  }
}

function mapSolutionsPage(item) {
  return {
    eyebrow: { en: item.eyebrowEn, tr: item.eyebrowTr },
    heading: { en: item.headingEn, tr: item.headingTr },
    subhead: { en: item.subheadEn, tr: item.subheadTr }
  }
}

export async function fetchSolutionsPage() {
  try {
    const json = await fetchJson('solutions-page?populate=*')
    return json.data ? mapSolutionsPage(json.data) : SOLUTIONS_PAGE_FALLBACK
  } catch (err) {
    console.warn('Falling back to static solutions page hero:', err)
    return SOLUTIONS_PAGE_FALLBACK
  }
}
