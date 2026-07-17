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
  // No CMS configured (VITE_STRAPI_URL unset) — skip the network call
  // entirely rather than firing a doomed fetch that just logs a console
  // error before falling back; callers already fall back on any thrown
  // error the same way.
  if (!BASE) throw new Error('VITE_STRAPI_URL is not configured')
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

/* Home page — a Strapi single type, so `data` is one object, not an array.
   Site is English-only, so fields are plain strings (no {en,tr} wrapping).
   Fallback matches the copy previously hardcoded in src/i18n/ui.js under
   `home.*` (heroTitleStart/Accent/End, features, partnersLabel, intro*,
   solutions*, why*), `common.discoverMore`/`.allSolutions`, `cta.*`,
   `stats.*`, plus src/data/content.js `values`/`stats` and the partner
   name list and email that used to live directly in Home.jsx/site.js. */
export const HOME_PAGE_FALLBACK = {
  heroHeadingLine1: 'We manage ',
  heroHeadingHighlight: 'energy flow.',
  heroHeadingLine2: 'You shape the future.',
  heroSubhead:
    'Advanced energy storage and system integration solutions for a resilient and flexible energy infrastructure.',
  heroCtaLabel: 'Discover more',
  heroCtaLink: '/solutions',

  featureCards: [
    { iconKey: 'battery', title: 'Grid-scale storage', description: 'High-performance battery systems for utility and industry.' },
    { iconKey: 'grid', title: 'System integration', description: 'Seamless integration for complex energy systems.' },
    { iconKey: 'compass', title: 'European expertise', description: 'Engineered and operated across Europe.' },
    { iconKey: 'leaf', title: 'Sustainable impact', description: 'Driving the transition to a clean energy future.' }
  ],

  trustedLabel: 'Trusted by utilities & industry leaders',
  logos: [
    { name: 'Cascade Power' },
    { name: 'Meridian Utilities' },
    { name: 'Northwind' },
    { name: 'Solano Grid' },
    { name: 'Vanta Energy' },
    { name: 'Helios Co-op' }
  ],

  whoEyebrow: 'Who we are',
  whoHeadingStart: 'We are an energy company built on a simple conviction: clean power only changes the world if it’s',
  whoHeadingHighlight: 'reliable',
  whoHeadingEnd: ', affordable, and built to last.',
  whoBody1:
    'For over a decade, Korrente has developed and operated renewable generation across solar, wind, and storage — not as isolated projects, but as a coordinated fleet managed by our own grid intelligence platform.',
  whoBody2:
    'That means we deliver firm, dispatchable clean energy: power that shows up when the grid needs it, backed by engineering rigour and a genuine commitment to the communities we operate in.',
  whoLinkLabel: 'Get in touch',
  whoLinkUrl: '/contact',

  doEyebrow: 'What we do',
  doHeading: 'A full-stack clean energy company.',
  doSubhead:
    'From the first megawatt of a project to real-time dispatch on the grid, we own every layer that makes renewable power dependable.',
  doCtaLabel: 'All solutions',
  doCtaLink: '/solutions',

  whyEyebrow: 'Why Korrente',
  whyHeading: 'The advantages of an owner-operator.',
  whySubhead:
    'We don’t hand projects off. We build them to run for decades — and we’re still there on year twenty.',
  reasons: [
    {
      title: 'Owner-operators, end to end',
      description:
        'We develop, build, and run our assets for decades. Owning the whole lifecycle means the decisions we make on day one are the ones we live with on year twenty.'
    },
    {
      title: 'Engineering-led, not hype-led',
      description:
        'Every project is underwritten by measured data, conservative modelling, and independent review. We build infrastructure that has to work — so we prove it will.'
    },
    {
      title: 'Built for a flexible grid',
      description:
        'Renewables plus storage plus intelligent dispatch. We deliver firm, dispatchable clean power, not just nameplate capacity that disappears when the weather turns.'
    },
    {
      title: 'Rooted in community',
      description:
        'Projects succeed when the people around them benefit. We share ownership, invest locally, and stay long after commissioning day.'
    }
  ],

  impactEyebrow: 'Impact',
  impactHeading: 'Measured in gigawatts and greenhouse gas that never happened.',
  stats: [
    { value: '2.5 GWh+', label: 'Projects in operation and under construction' },
    { value: '10+', label: 'Countries across Europe' },
    { value: '1.2 GW+', label: 'Pipeline capacity' },
    { value: '100%', label: 'Focused on energy storage' }
  ],

  ctaEyebrow: 'Let’s build',
  ctaHeading: 'Ready to power what comes next?',
  ctaSubhead:
    'Tell us about your site, your load, or your decarbonisation target. Our development team will come back within two business days.',
  ctaButtonLabel: 'Start a project',
  ctaButtonLink: '/contact',
  ctaEmail: 'info@korrente.com'
}

function mapHomePage(item) {
  const featureCards = item.featureCards || []
  const logos = item.logos || []
  const reasons = item.reasons || []
  const stats = item.stats || []

  return {
    heroHeadingLine1: item.heroHeadingLine1,
    heroHeadingHighlight: item.heroHeadingHighlight,
    heroHeadingLine2: item.heroHeadingLine2,
    heroSubhead: item.heroSubhead,
    heroCtaLabel: item.heroCtaLabel,
    heroCtaLink: item.heroCtaLink,

    featureCards: featureCards.length
      ? featureCards.map((f) => ({ iconKey: f.iconKey, title: f.title, description: f.description }))
      : HOME_PAGE_FALLBACK.featureCards,

    trustedLabel: item.trustedLabel || HOME_PAGE_FALLBACK.trustedLabel,
    logos: logos.length ? logos.map((l) => ({ name: l.name })) : HOME_PAGE_FALLBACK.logos,

    whoEyebrow: item.whoEyebrow || HOME_PAGE_FALLBACK.whoEyebrow,
    whoHeadingStart: item.whoHeadingStart || HOME_PAGE_FALLBACK.whoHeadingStart,
    whoHeadingHighlight: item.whoHeadingHighlight || HOME_PAGE_FALLBACK.whoHeadingHighlight,
    whoHeadingEnd: item.whoHeadingEnd || HOME_PAGE_FALLBACK.whoHeadingEnd,
    whoBody1: item.whoBody1 || HOME_PAGE_FALLBACK.whoBody1,
    whoBody2: item.whoBody2 || HOME_PAGE_FALLBACK.whoBody2,
    whoLinkLabel: item.whoLinkLabel || HOME_PAGE_FALLBACK.whoLinkLabel,
    whoLinkUrl: item.whoLinkUrl || HOME_PAGE_FALLBACK.whoLinkUrl,

    doEyebrow: item.doEyebrow || HOME_PAGE_FALLBACK.doEyebrow,
    doHeading: item.doHeading || HOME_PAGE_FALLBACK.doHeading,
    doSubhead: item.doSubhead || HOME_PAGE_FALLBACK.doSubhead,
    doCtaLabel: item.doCtaLabel || HOME_PAGE_FALLBACK.doCtaLabel,
    doCtaLink: item.doCtaLink || HOME_PAGE_FALLBACK.doCtaLink,

    whyEyebrow: item.whyEyebrow || HOME_PAGE_FALLBACK.whyEyebrow,
    whyHeading: item.whyHeading || HOME_PAGE_FALLBACK.whyHeading,
    whySubhead: item.whySubhead || HOME_PAGE_FALLBACK.whySubhead,
    reasons: reasons.length
      ? reasons.map((r) => ({ title: r.title, description: r.description }))
      : HOME_PAGE_FALLBACK.reasons,

    impactEyebrow: item.impactEyebrow || HOME_PAGE_FALLBACK.impactEyebrow,
    impactHeading: item.impactHeading || HOME_PAGE_FALLBACK.impactHeading,
    stats: stats.length ? stats.map((s) => ({ value: s.value, label: s.label })) : HOME_PAGE_FALLBACK.stats,

    ctaEyebrow: item.ctaEyebrow,
    ctaHeading: item.ctaHeading,
    ctaSubhead: item.ctaSubhead,
    ctaButtonLabel: item.ctaButtonLabel,
    ctaButtonLink: item.ctaButtonLink,
    ctaEmail: item.ctaEmail
  }
}

export async function fetchHomePage() {
  try {
    const json = await fetchJson('home-page?populate=*')
    return json.data ? mapHomePage(json.data) : HOME_PAGE_FALLBACK
  } catch (err) {
    console.warn('Falling back to static home page copy:', err)
    return HOME_PAGE_FALLBACK
  }
}
