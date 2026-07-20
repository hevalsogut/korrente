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
   solutions*, why*), `common.discoverMore`/`.allSolutions`,
   plus src/data/content.js `values` and the partner name list that used
   to live directly in Home.jsx. The closing CTA copy AND the Impact
   stats band live in the Global single type (see GLOBAL_FALLBACK/
   fetchGlobal below) — shared across every page, not Home-specific,
   since Projects also shows the same Impact band. */
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

  partnersEnabled: true,
  partnersEyebrow: 'Partners',
  partnersHeading: 'Trusted by the utilities and industries we power.',
  testimonials: [
    {
      quote:
        'Korrente delivered our storage project ahead of schedule and has run it flawlessly since. They behave like a long-term partner, because they are one.',
      name: 'Dana Whitfield',
      role: 'VP, Grid Services',
      company: 'Cascade Public Power'
    },
    {
      quote:
        'Their grid-intelligence platform gave us visibility we never had before. We can finally treat renewables as a firm, plannable resource.',
      name: 'Marco Reyes',
      role: 'Chief Operating Officer',
      company: 'Meridian Utilities'
    },
    {
      quote:
        'From land to interconnection, the Korrente team was rigorous and transparent. The community benefit agreement they structured set a new bar for us.',
      name: 'Priya Nair',
      role: 'Director of Sustainability',
      company: 'Northwind Manufacturing'
    }
  ]
}

function mapHomePage(item) {
  const featureCards = item.featureCards || []
  const logos = item.logos || []
  const reasons = item.reasons || []
  const testimonials = item.testimonials || []

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

    // `??`, not `||` — a CMS editor setting this to false must stay false,
    // not silently fall back to the static default of true.
    partnersEnabled: item.partnersEnabled ?? HOME_PAGE_FALLBACK.partnersEnabled,
    partnersEyebrow: item.partnersEyebrow || HOME_PAGE_FALLBACK.partnersEyebrow,
    partnersHeading: item.partnersHeading || HOME_PAGE_FALLBACK.partnersHeading,
    testimonials: testimonials.length
      ? testimonials.map((t) => ({ quote: t.quote, name: t.name, role: t.role, company: t.company }))
      : HOME_PAGE_FALLBACK.testimonials
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

/* Global — a Strapi single type holding content shared across pages: the
   "Let's build" closing CTA (reused at the foot of every page via
   ContactCTA) and the Impact stats band (reused by Home and Projects via
   StatsBand). One edit here updates every page at once. Fallback matches
   the copy previously hardcoded on the Home page (src/i18n/ui.js `cta.*`
   and `stats.*`, plus src/data/site.js `email` and src/data/content.js
   `stats`). Per-field fallback, same approach as mapHomePage. Has a
   component (impactStats), so the fetch needs `?populate=*`. */
export const GLOBAL_FALLBACK = {
  ctaEyebrow: 'Let’s build',
  ctaHeading: 'Ready to power what comes next?',
  ctaSubhead:
    'Tell us about your site, your load, or your decarbonisation target. Our development team will come back within two business days.',
  ctaButtonLabel: 'Start a project',
  ctaButtonLink: '/contact',
  ctaEmail: 'info@korrente.com',

  impactEyebrow: 'Impact',
  impactHeading: 'Measured in gigawatts and greenhouse gas that never happened.',
  impactStats: [
    { value: '2.5 GWh+', label: 'Projects in operation and under construction' },
    { value: '10+', label: 'Countries across Europe' },
    { value: '1.2 GW+', label: 'Pipeline capacity' },
    { value: '100%', label: 'Focused on energy storage' }
  ]
}

function mapGlobal(item) {
  const impactStats = item.impactStats || []

  return {
    ctaEyebrow: item.ctaEyebrow || GLOBAL_FALLBACK.ctaEyebrow,
    ctaHeading: item.ctaHeading || GLOBAL_FALLBACK.ctaHeading,
    ctaSubhead: item.ctaSubhead || GLOBAL_FALLBACK.ctaSubhead,
    ctaButtonLabel: item.ctaButtonLabel || GLOBAL_FALLBACK.ctaButtonLabel,
    ctaButtonLink: item.ctaButtonLink || GLOBAL_FALLBACK.ctaButtonLink,
    ctaEmail: item.ctaEmail || GLOBAL_FALLBACK.ctaEmail,

    impactEyebrow: item.impactEyebrow ?? GLOBAL_FALLBACK.impactEyebrow,
    impactHeading: item.impactHeading ?? GLOBAL_FALLBACK.impactHeading,
    impactStats: impactStats.length
      ? impactStats.map((s) => ({ value: s.value, label: s.label }))
      : GLOBAL_FALLBACK.impactStats
  }
}

export async function fetchGlobal() {
  try {
    const json = await fetchJson('global?populate=*')
    return json.data ? mapGlobal(json.data) : GLOBAL_FALLBACK
  } catch (err) {
    console.warn('Falling back to static global CTA copy:', err)
    return GLOBAL_FALLBACK
  }
}

/* Technology page — a Strapi single type, so `data` is one object, not an
   array. Fallback matches the copy previously hardcoded in src/i18n/ui.js
   under `technology.*`. Capability `iconKey` values are semantic
   (forecasting/dispatch/maintenance/integration), not Icon component names —
   Technology.jsx maps them to icons in code, same as HOME_PAGE_FALLBACK's
   featureCards. Per-field fallback, same approach as mapHomePage. */
export const TECHNOLOGY_PAGE_FALLBACK = {
  heroEyebrow: 'Technology',
  heroHeading: 'The intelligence behind every megawatt.',
  heroSubhead:
    'Korrente Grid is the software layer across our fleet — forecasting, dispatching, and optimising storage and generation in real time.',

  platformEyebrow: 'The platform',
  platformHeading: 'One control layer for a flexible grid.',
  platformSubhead:
    'Purpose-built to make renewables and storage behave like firm, plannable power.',

  capabilities: [
    { iconKey: 'forecasting', title: 'Sub-hourly forecasting', description: 'High-resolution generation and demand forecasts that turn variable renewables into a plannable resource.' },
    { iconKey: 'dispatch', title: 'Automated dispatch', description: 'Storage is co-optimised against live market prices and dispatched automatically, second by second.' },
    { iconKey: 'maintenance', title: 'Predictive maintenance', description: 'Sensor telemetry flags degradation early, so assets are serviced before they ever fault.' },
    { iconKey: 'integration', title: 'Open integration', description: 'Standards-based APIs connect to SCADA, market operators, and third-party assets with no lock-in.' }
  ]
}

function mapTechnologyPage(item) {
  const capabilities = item.capabilities || []

  return {
    heroEyebrow: item.heroEyebrow ?? TECHNOLOGY_PAGE_FALLBACK.heroEyebrow,
    heroHeading: item.heroHeading ?? TECHNOLOGY_PAGE_FALLBACK.heroHeading,
    heroSubhead: item.heroSubhead ?? TECHNOLOGY_PAGE_FALLBACK.heroSubhead,

    platformEyebrow: item.platformEyebrow ?? TECHNOLOGY_PAGE_FALLBACK.platformEyebrow,
    platformHeading: item.platformHeading ?? TECHNOLOGY_PAGE_FALLBACK.platformHeading,
    platformSubhead: item.platformSubhead ?? TECHNOLOGY_PAGE_FALLBACK.platformSubhead,

    capabilities: capabilities.length
      ? capabilities.map((c) => ({ iconKey: c.iconKey, title: c.title, description: c.description }))
      : TECHNOLOGY_PAGE_FALLBACK.capabilities
  }
}

export async function fetchTechnologyPage() {
  try {
    const json = await fetchJson('technology-page?populate=*')
    return json.data ? mapTechnologyPage(json.data) : TECHNOLOGY_PAGE_FALLBACK
  } catch (err) {
    console.warn('Falling back to static technology page copy:', err)
    return TECHNOLOGY_PAGE_FALLBACK
  }
}

/* Contact page — a Strapi single type, so `data` is one object, not an
   array. Fallback matches the copy previously hardcoded in src/i18n/ui.js
   under `contact.eyebrow`/`.title`/`.lead`/`.infoTitle`/`.note` plus the
   label/value pairs that used to come from src/i18n/ui.js `contact.label*`
   and src/data/site.js `company.email`/`.phone`/`.address`. Detail
   `iconKey` values are semantic (email/phone/location/hours), not Icon
   component names — Contact.jsx maps them to icons (and mailto:/tel: link
   behaviour) in code, same as TECHNOLOGY_PAGE_FALLBACK's capabilities. The
   HQ address value is multi-line — the `\n`s are preserved through the
   fallback and the CMS value alike, so the renderer only needs one
   newline-to-<br/> pass regardless of source. Per-field fallback, same
   approach as mapTechnologyPage. */
export const CONTACT_PAGE_FALLBACK = {
  heroEyebrow: 'Contact',
  heroHeading: 'Let’s talk about your energy.',
  heroSubhead:
    'Whether you’re bringing a site, a load, or a target, our development team will point you to the fastest credible path to clean power.',

  directHeading: 'Reach us directly',
  responseNote: 'Typical response time is under two business days.',

  details: [
    { iconKey: 'email', label: 'Email', value: 'info@korrente.com' },
    { iconKey: 'phone', label: 'Phone', value: '+1 (415) 555-0147' },
    { iconKey: 'location', label: 'Headquarters', value: '210 Foundry Street, Suite 400\nOakland, CA 94607\nUnited States' },
    { iconKey: 'hours', label: 'Office hours', value: 'Mon–Fri · 8:00–18:00 PT' }
  ]
}

function mapContactPage(item) {
  const details = item.details || []

  return {
    heroEyebrow: item.heroEyebrow ?? CONTACT_PAGE_FALLBACK.heroEyebrow,
    heroHeading: item.heroHeading ?? CONTACT_PAGE_FALLBACK.heroHeading,
    heroSubhead: item.heroSubhead ?? CONTACT_PAGE_FALLBACK.heroSubhead,

    directHeading: item.directHeading ?? CONTACT_PAGE_FALLBACK.directHeading,
    responseNote: item.responseNote ?? CONTACT_PAGE_FALLBACK.responseNote,

    details: details.length
      ? details.map((d) => ({ iconKey: d.iconKey, label: d.label, value: d.value }))
      : CONTACT_PAGE_FALLBACK.details
  }
}

export async function fetchContactPage() {
  try {
    const json = await fetchJson('contact-page?populate=*')
    return json.data ? mapContactPage(json.data) : CONTACT_PAGE_FALLBACK
  } catch (err) {
    console.warn('Falling back to static contact page copy:', err)
    return CONTACT_PAGE_FALLBACK
  }
}

/* Projects page — a Strapi single type, so `data` is one object, not an
   array. Only the hero intro lives here; the project cards themselves
   come from the Project collection (fetchProjects above) and are
   untouched. Fallback matches the copy previously hardcoded in
   src/i18n/ui.js under `projects.eyebrow`/`.title`/`.lead`. Scalars
   only — no component, so no `populate` needed. */
export const PROJECTS_PAGE_FALLBACK = {
  heroEyebrow: 'Projects',
  heroHeading: 'Infrastructure we’ve built and run.',
  heroSubhead:
    'A selection of storage and generation projects Korrente has developed, built, and operates across Europe.'
}

function mapProjectsPage(item) {
  return {
    heroEyebrow: item.heroEyebrow ?? PROJECTS_PAGE_FALLBACK.heroEyebrow,
    heroHeading: item.heroHeading ?? PROJECTS_PAGE_FALLBACK.heroHeading,
    heroSubhead: item.heroSubhead ?? PROJECTS_PAGE_FALLBACK.heroSubhead
  }
}

export async function fetchProjectsPage() {
  try {
    const json = await fetchJson('projects-page')
    return json.data ? mapProjectsPage(json.data) : PROJECTS_PAGE_FALLBACK
  } catch (err) {
    console.warn('Falling back to static projects page copy:', err)
    return PROJECTS_PAGE_FALLBACK
  }
}
