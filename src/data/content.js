/* ------------------------------------------------------------------
   ASSORTED CONTENT — bilingual
   Translatable fields are { en, tr }; select with pick() from useI18n().
   ------------------------------------------------------------------ */

/* Projects page — status is a key into ui.projects.status* */
export const projects = [
  { id: 'p1', slug: 'solano-hub', name: 'Solano Hub', location: 'Andalusia, Spain', capacity: '900 MWh', status: 'operational', type: 'Battery storage', description: 'Solano Hub is a 900 MWh battery storage facility in Andalusia, Spain, fully operational and dispatching flexible capacity to the regional grid.' },
  { id: 'p2', slug: 'nordwind-park', name: 'Nordwind Park', location: 'Schleswig-Holstein, Germany', capacity: '320 MW', status: 'operational', type: 'Onshore wind', description: 'Nordwind Park is a 320 MW onshore wind farm in Schleswig-Holstein, Germany, operating at full capacity since commissioning.' },
  { id: 'p3', slug: 'rhone-valley', name: 'Rhône Valley', location: 'Auvergne-Rhône-Alpes, France', capacity: '450 MWh', status: 'construction', type: 'Solar + storage', description: 'Rhône Valley pairs 450 MWh of co-located solar and storage in Auvergne-Rhône-Alpes, France, and is currently under construction.' },
  { id: 'p4', slug: 'maas-delta', name: 'Maas Delta', location: 'South Holland, Netherlands', capacity: '250 MW', status: 'construction', type: 'Grid-scale storage', description: 'Maas Delta is a 250 MW grid-scale storage project in South Holland, the Netherlands, currently under construction.' },
  { id: 'p5', slug: 'douro-flats', name: 'Douro Flats', location: 'Norte, Portugal', capacity: '600 MW', status: 'development', type: 'Utility-scale solar', description: 'Douro Flats is a 600 MW utility-scale solar project in the Norte region of Portugal, currently in development.' },
  { id: 'p6', slug: 'vistula-line', name: 'Vistula Line', location: 'Pomerania, Poland', capacity: '180 MW', status: 'development', type: 'Green hydrogen', description: 'Vistula Line is a 180 MW green hydrogen project in Pomerania, Poland, currently in development.' }
]

/* "Why Korrente" value propositions */
export const values = [
  {
    id: 'lifecycle',
    number: '01',
    title: 'Owner-operators, end to end',
    body: 'We develop, build, and run our assets for decades. Owning the whole lifecycle means the decisions we make on day one are the ones we live with on year twenty.'
  },
  {
    id: 'engineering',
    number: '02',
    title: 'Engineering-led, not hype-led',
    body: 'Every project is underwritten by measured data, conservative modelling, and independent review. We build infrastructure that has to work — so we prove it will.'
  },
  {
    id: 'grid',
    number: '03',
    title: 'Built for a flexible grid',
    body: 'Renewables plus storage plus intelligent dispatch. We deliver firm, dispatchable clean power, not just nameplate capacity that disappears when the weather turns.'
  },
  {
    id: 'community',
    number: '04',
    title: 'Rooted in community',
    body: 'Projects succeed when the people around them benefit. We share ownership, invest locally, and stay long after commissioning day.'
  }
]

/* Impact stats with animated counters. `value` is the numeric target. */
export const stats = [
  { id: 'operation', value: 2.5, decimals: 1, suffix: ' GWh+', label: 'Projects in operation and under construction' },
  { id: 'countries', value: 10, decimals: 0, suffix: '+', label: 'Countries across Europe' },
  { id: 'pipeline', value: 1.2, decimals: 1, suffix: ' GW+', label: 'Pipeline capacity' },
  { id: 'focus', value: 100, decimals: 0, suffix: '%', label: 'Focused on energy storage' }
]

export const testimonials = [
  {
    id: 't1',
    quote: 'Korrente delivered our storage project ahead of schedule and has run it flawlessly since. They behave like a long-term partner, because they are one.',
    name: 'Dana Whitfield',
    role: 'VP, Grid Services · Cascade Public Power'
  },
  {
    id: 't2',
    quote: 'Their grid-intelligence platform gave us visibility we never had before. We can finally treat renewables as a firm, plannable resource.',
    name: 'Marco Reyes',
    role: 'Chief Operating Officer · Meridian Utilities'
  },
  {
    id: 't3',
    quote: 'From land to interconnection, the Korrente team was rigorous and transparent. The community benefit agreement they structured set a new bar for us.',
    name: 'Priya Nair',
    role: 'Director of Sustainability · Northwind Manufacturing'
  }
]


/* Sustainability commitments */
export const commitments = [
  { id: 'net-zero', metric: '2035', title: 'Net-zero operations', body: 'Every part of our business — construction, logistics, offices — reaches net-zero emissions a full decade ahead of the wider sector.' },
  { id: 'circular', metric: '95%', title: 'Circular by design', body: 'Panels, turbine blades, and battery cells are designed for recovery. We target 95% material reuse across decommissioned assets.' },
  { id: 'nature', metric: '3×', title: 'Nature-positive land', body: 'On every site we manage, we commit to leaving biodiversity measurably richer — targeting three times the habitat value we started with.' },
  { id: 'community', metric: '$120M', title: 'Community reinvestment', body: 'Direct local investment through benefit funds, apprenticeships, and shared-ownership schemes over the next five years.' }
]

/* Insights / news articles */
export const articles = [
  {
    id: 'a1',
    slug: 'why-firm-renewables-not-just-more-renewables-will-decide-the-transition',
    category: 'Grid',
    date: '2026-06-18',
    readingTime: '6 min',
    featured: true,
    title: 'Why firm renewables — not just more renewables — will decide the transition',
    excerpt: 'Nameplate capacity is the easy part. The real work is making clean power dependable at 6 p.m. in January. Here is how storage and intelligent dispatch change the equation.',
    body: 'Nameplate capacity is the easy part. The real work is making clean power dependable at 6 p.m. in January. Here is how storage and intelligent dispatch change the equation.',
    coverUrl: null
  },
  {
    id: 'a2',
    slug: 'inside-our-largest-battery-900-mwh-and-what-it-took-to-build',
    category: 'Storage',
    date: '2026-05-29',
    readingTime: '4 min',
    title: 'Inside our largest battery: 900 MWh and what it took to build',
    excerpt: 'A field report from commissioning the Solano storage hub, from cell chemistry choices to the software that keeps it responsive to the grid.',
    body: 'A field report from commissioning the Solano storage hub, from cell chemistry choices to the software that keeps it responsive to the grid.',
    coverUrl: null
  },
  {
    id: 'a3',
    slug: 'interconnection-reform-is-the-unglamorous-fix-the-grid-needs-most',
    category: 'Policy',
    date: '2026-05-11',
    readingTime: '5 min',
    title: 'Interconnection reform is the unglamorous fix the grid needs most',
    excerpt: 'Thousands of clean projects are stuck in queues. We break down the process bottlenecks and the reforms that would actually move gigawatts.',
    body: 'Thousands of clean projects are stuck in queues. We break down the process bottlenecks and the reforms that would actually move gigawatts.',
    coverUrl: null
  },
  {
    id: 'a4',
    slug: 'what-a-good-community-benefit-agreement-actually-looks-like',
    category: 'Community',
    date: '2026-04-22',
    readingTime: '3 min',
    title: 'What a good community benefit agreement actually looks like',
    excerpt: 'Shared ownership, local hiring, and long-term funds — the ingredients that turn a project’s neighbours into its partners.',
    body: 'Shared ownership, local hiring, and long-term funds — the ingredients that turn a project’s neighbours into its partners.',
    coverUrl: null
  },
  {
    id: 'a5',
    slug: 'forecasting-the-sky-how-we-predict-generation-to-the-sub-hour',
    category: 'Technology',
    date: '2026-03-30',
    readingTime: '7 min',
    title: 'Forecasting the sky: how we predict generation to the sub-hour',
    excerpt: 'A look under the hood of Korrente Grid’s forecasting models and why small accuracy gains compound into large revenue and reliability wins.',
    body: 'A look under the hood of Korrente Grid’s forecasting models and why small accuracy gains compound into large revenue and reliability wins.',
    coverUrl: null
  },
  {
    id: 'a6',
    slug: 'green-hydrogens-honest-use-cases-and-the-hype-to-ignore',
    category: 'Hydrogen',
    date: '2026-03-04',
    readingTime: '5 min',
    title: 'Green hydrogen’s honest use cases — and the hype to ignore',
    excerpt: 'Hydrogen is not a silver bullet, but for a handful of hard-to-abate sectors it is essential. We map where the molecule genuinely wins.',
    body: 'Hydrogen is not a silver bullet, but for a handful of hard-to-abate sectors it is essential. We map where the molecule genuinely wins.',
    coverUrl: null
  }
]
