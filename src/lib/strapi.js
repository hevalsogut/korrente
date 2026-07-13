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
    title: item.titleEn,
    excerpt: item.excerptEn,
    category: item.categoryEn,
    readingTime: item.readingTimeEn,
    body: item.bodyEn,
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
    type: item.typeEn,
    description: item.descriptionEn
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



/* Solutions map to the exact shape src/data/services.js uses (name,
   summary, description, features as { en:[...], tr:[...] }, metric,
   icon), so Solutions.jsx / Home.jsx / ServiceCard.jsx need no changes
   beyond swapping their data source. */
function mapSolution(item) {
  const features = item.feature || []
  return {
    id: item.documentId,
    icon: item.iconKey,
    name: item.titleEn,
    summary: item.taglineEn,
    description: item.descriptionEn,
    features: features.map((f) => f.en),
    metric: item.statValue
      ? { value: item.statValue, unit: item.statUnit, label: item.statLabelEn }
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

/* Solutions page hero + "how we deliver" section — a Strapi single
   type, so `data` is one object, not an array. Fallback matches the
   copy previously hardcoded in src/i18n/ui.js under `solutions.eyebrow`
   / `.title` / `.lead` / `.processEyebrow` / `.processTitle` / `.process`. */
export const SOLUTIONS_PAGE_FALLBACK = {
  eyebrow: 'Solutions',
  heading: 'Every layer of dependable clean energy.',
  subhead: 'We develop, build, and operate across the full clean energy stack — and tie it together with software that makes renewables behave like firm, plannable power.',
  deliveryEyebrow: 'How we deliver',
  deliveryHeading: 'From origination to decades of operation.',
  steps: [
    {
      title: 'Originate',
      description: 'Site, resource, and interconnection analysis to find projects that genuinely pencil out.'
    },
    {
      title: 'Develop',
      description: 'Permitting, community engagement, and engineering to make a project buildable and bankable.'
    },
    {
      title: 'Build',
      description: 'Disciplined EPC oversight that delivers on schedule, on budget, and to spec.'
    },
    {
      title: 'Operate',
      description: 'Decades of asset management and optimisation through our grid-intelligence platform.'
    }
  ]
}

function mapSolutionsPage(item) {
  const steps = item.steps || []
  return {
    eyebrow: item.eyebrowEn,
    heading: item.headingEn,
    subhead: item.subheadEn,
    deliveryEyebrow: item.deliveryEyebrowEn,
    deliveryHeading: item.deliveryHeadingEn,
    steps: steps.map((s) => ({
      title: s.titleEn,
      description: s.descriptionEn
    }))
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
