/* ------------------------------------------------------------------
   Strapi CMS client — Articles, Projects, Roles.
   Strapi 5 returns a flattened response: json.data is an array with
   fields directly on each item (no `.attributes`) plus `documentId`.
   We map each entry back into the exact shape src/data/content.js uses,
   so pages can consume CMS data or the static fallback interchangeably.
   ------------------------------------------------------------------ */

const BASE = import.meta.env.VITE_STRAPI_URL

async function fetchJson(path) {
  const res = await fetch(`${BASE}/api/${path}`)
  if (!res.ok) throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`)
  return res.json()
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
