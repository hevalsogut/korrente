# Korrente — Marketing Website

A production-ready marketing site for **Korrente**, a European clean-energy
company focused on grid-scale **energy storage** (plus renewables, system
integration, and green hydrogen).

The site is fast, fully responsive (360 px → large desktop), accessible
(WCAG AA, keyboard-navigable, semantic HTML), and built
around a hand-crafted design system — no UI template or component library.

**Visual identity:** a **dark, near-black forest theme** with a vivid green
accent, refined Manrope/Inter typography, a dark header (green logo, outlined
Contact button), light sections for rhythm, and flat
SVG energy illustrations (the hero shows a neon-bolt storage container).

---

## Quick start

```bash
npm install           # install dependencies
cp .env.example .env  # set up environment variables for CMS
npm run dev           # start the dev server at http://localhost:5173
```


### Build & preview a production bundle

```bash
npm run build    # outputs an optimized static site to /dist
npm run preview  # serves the built /dist locally at http://localhost:4173
```

The contents of `/dist` are plain static files — deploy them to any static
host (Netlify, Vercel, Cloudflare Pages, S3, GitHub Pages, nginx…).

> **SPA routing note:** this is a single-page app using client-side routing.
> When deploying, configure your host to **rewrite all unknown paths to
> `index.html`** so deep links like `/solutions` resolve. (Netlify: add a
> `/* /index.html 200` rule; Vercel: a catch-all rewrite; nginx:
> `try_files $uri /index.html;`.)

---

## Stack & why

| Choice | Why |
| --- | --- |
| **Vite + React 18** | Instant dev server, tiny fast production build, and a component model that keeps the many sections/pages organized and reusable. No framework overhead beyond what a marketing site needs. |
| **React Router** | Clean multi-page routing (Home, Solutions, Technology, Projects, News, Sustainability, Contact, 404) plus dynamic detail pages (`/:slug`) with a shared layout. |
| **Plain CSS + custom properties** | A real, transparent design system in `src/index.css` — colour/spacing/type/radii/shadow/motion **tokens** any developer can read and extend. No build-time CSS-in-JS, no Tailwind class soup, no runtime cost. Each component ships its own small `.css` file next to it. |
| **Custom lightweight UI strings** | A ~40-line context (`src/i18n/`) drives interface string management. UI strings live in `src/i18n/ui.js`; content is static in `src/data/*`. |
| **No UI kit / icon package** | The look is original. Icons are a small inline SVG set (`src/components/Icon.jsx`); all imagery is CSS/SVG-based (see `HeroScene.jsx`), so there are **no copyrighted or external assets** and nothing to lazy-load incorrectly. |

Fonts (Manrope + Inter) load from Google Fonts. Motion (reveal-on-scroll,
animated stat counters, hover states, the hero illustration) is driven by
lightweight `IntersectionObserver` + CSS transitions and **fully respects
`prefers-reduced-motion`**.

---

## Project structure

```
korrente/
├── index.html                # <head>: meta, Open Graph, fonts, favicon
├── public/
│   ├── favicon.svg           # brand mark
│   └── og-image.svg          # social share image
├── src/
│   ├── main.jsx              # app entry + router provider
│   ├── App.jsx               # route table
│   ├── index.css             # ⭐ DESIGN TOKENS + base styles + utilities
│   ├── i18n/                 # ⭐ INTERFACE STRINGS
│   │   ├── index.jsx         #   provider + useI18n() hook (t, pick)
│   │   └── ui.js             #   all interface microcopy
│   ├── data/                 # ⭐ EDITABLE CONTENT
│   │   ├── site.js           #   company details, nav, footer, legal
│   │   ├── services.js       #   the six solutions/services
│   │   ├── calculatorConfig.js # Revenue calculator defaults
│   │   └── content.js        #   values, stats, testimonials,
│   │                         #   commitments, articles, projects (fallback data)
│   ├── lib/
│   │   ├── calculator.js     #   Revenue calculator pure math functions
│   │   └── strapi.js         #   Strapi fetch helpers (articles, projects)
│   ├── components/           # reusable UI (Header, Footer, Button, Reveal,
│   │                         #   Counter, Icon, HeroScene…)
│   └── pages/                # one folder-mate .jsx + .css per page
│       ├── Home.jsx / .css
│       ├── Solutions.jsx / .css
│       ├── Technology.jsx / .css
│       ├── Projects.jsx / .css
│       ├── ProjectDetail.jsx / .css
│       ├── News.jsx / .css
│       ├── ArticleDetail.jsx / .css
│       ├── Sustainability.jsx / .css
│       ├── Contact.jsx / .css
│       ├── Calculator.jsx / .css
│       └── NotFound.jsx / .css
└── README.md
```

---

## CMS integration (Strapi)

Two content types are CMS-driven: **Articles** (News) and **Projects**
(Projects). Set `VITE_STRAPI_URL` in `.env` to your
Strapi instance's base URL (see `.env.example`):

```bash
VITE_STRAPI_URL=https://YOUR-PROJECT.strapiapp.com
```

`src/lib/strapi.js` fetches from `${VITE_STRAPI_URL}/api/...` and maps Strapi
5's flattened response (`documentId` + fields like `titleEn`) back into the shapes the pages already
expect from `src/data/content.js`.

Each of `News.jsx` and `Projects.jsx` initializes its state
from the static array in `src/data/content.js`, then fetches from Strapi in a
`useEffect`. If the request fails (unset `VITE_STRAPI_URL`, network error, CMS
down), it logs a `console.warn` and keeps rendering the static fallback — the
page never shows an error state, and `npm run build` still produces a fully
working static site offline.

---

## Revenue Calculator

At `/calculator`, a battery-storage revenue and lifetime-economics model that
recalculates instantly as you type — entirely client-side, no backend or API
calls.

**Two modes** (`CALCULATOR_MODES` in `calculatorConfig.js`):

- **Grid arbitrage** — the battery buys low / sells high on the price spread,
  optionally stacking FCR and/or balancing-market revenue on top.
- **Solar + storage** — adds a co-located PV array, splitting its generation
  between self-consumption (avoided retail import) and export (feed-in
  tariff, or retail-parity pricing if net metering applies).

**Inputs are tiered.** Power, duration (1/2/4 h — each maps to a fixed
round-trip efficiency), and, in solar mode, PV size and annual consumption are
front and centre. An "Advanced parameters" panel exposes everything else:
CAPEX (split power-based €/kW + energy-based €/kWh), OPEX % of CAPEX, depth of
discharge, cycles/year, project life, degradation (per-cycle + calendar),
FCR/balancing prices and allocation %, solar specifics (yield, seasonal split,
self-consumption rate, tariffs), discount rate, and charging price.

**FCR/balancing stacking is zero-sum** — allocating capacity % to an ancillary
service takes it from arbitrage — and each service only becomes available
once the selected duration clears its own minimum-duration threshold; the
toggle is disabled with an explanation when a duration doesn't qualify.

**Results** cover nameplate/usable energy, CAPEX and €/kWh, gross/net annual
revenue, payback period, and ROI%, plus a capacity-allocation breakdown
(arbitrage vs. FCR vs. balancing) and a full lifetime table — year-by-year
state-of-health, discharged energy, and discounted net cash flow feeding into
LCOS and NPV. Solar mode adds a self-consumed-vs-exported value split and a
summer/winter generation bar.

| File | Role |
| --- | --- |
| `src/pages/Calculator.jsx` | Form state, layout, and result formatting (bilingual, `Intl.NumberFormat` currency/number output) |
| `src/lib/calculator.js` | `calculateRevenue(inputs)` — the whole model as one pure, dependency-free function; every field is coerced and clamped, so it's safe to call directly with raw form-state strings |
| `src/data/calculatorConfig.js` | Defaults, input min/max limits, and the RTE-by-duration table — tune assumptions here without touching the math |

Because `calculateRevenue` has no React/i18n/side effects, it's straightforward
to unit-test with plain input/output objects. Read the inline comments in
`calculator.js` before changing the math — they document scope rules (e.g.
battery-only vs. total-project CAPEX, what LCOS is and isn't allowed to
include) that are easy to accidentally break.

The pre-filled defaults are sourced, placeholder Netherlands market/engineering
assumptions (see the sourcing comments in `calculatorConfig.js`) — the on-page
disclaimer notes this is an illustrative model, not investment advice.

---

## Editing content (for non-developers)

Copy lives in two places: **`src/data/`** (page content) and **`src/i18n/ui.js`**
(interface labels). Save the file and the dev server refreshes instantly.

Interface strings in `ui.js` are grouped in `ui.en`.

| To change… | Edit this file |
| --- | --- |
| Company name, email, phone, address | `src/data/site.js` → `company` |
| Header / footer navigation links | `src/data/site.js` → `navLinks`, `footerNav` |
| The six solutions (titles, descriptions, bullets, metrics) | `src/data/services.js` |
| "Why Korrente" value props | `src/data/content.js` → `values` |
| Impact stat counters (numbers + labels) | `src/data/content.js` → `stats` |
| Testimonials | `src/data/content.js` → `testimonials` |
| Revenue Calculator defaults (prices, CAPEX, limits) | `src/data/calculatorConfig.js` |
| Sustainability commitments | `src/data/content.js` → `commitments` |
| Insights / news articles | `src/data/content.js` → `articles` |
| Hero headline, buttons, nav, all UI labels, form errors | `src/i18n/ui.js` |

### Changing brand colours, fonts, and spacing

Open **`src/index.css`**. Everything visual is controlled by tokens at the top
under `:root` — change a value once and it updates site-wide. For example:

```css
--green-600: #2C8339;  /* primary green — buttons, links, accents */
--green-500: #47A257;  /* brand green — logo, icon fills, highlights */
--ink-800:   #0D2015;  /* dark forest background for stat / accent bands */
--paper-50:  #F3F6F3;  /* light section background */
--font-display: 'Manrope', …;  /* headline font */
--font-body:    'Inter', …;    /* body font */
```

The green scale also has legacy `--lime-*` / `--mint-*` aliases that point at the
same values, so older class names keep working. Fonts load from Google Fonts in
`index.html`; to change them, update the `<link>` there and the two `--font-*`
tokens.

### Changing images / graphics

There are no bitmap photos to manage — the hero, section visuals, and cards are
generated with SVG and CSS (see `src/components/HeroScene.jsx` and the per-page
CSS). The logo and social-share image are editable SVGs in `public/`. To use
real photography instead, drop images into `public/` and swap the relevant
visual (e.g. replace `<HeroScene />` in `src/pages/Home.jsx` with an `<img>`);
keep an explicit `width`/`height` or `aspect-ratio` to avoid layout shift.

### SEO / metadata

Site-wide defaults live in `index.html`. Each page sets its own title,
description, and Open Graph tags via the `<Seo>` component (see the top of any
file in `src/pages/`).

---

## Accessibility & performance notes

- Semantic landmarks (`header`, `nav`, `main`, `footer`), correct heading order,
  a skip-to-content link, and visible focus rings throughout.
- The mobile menu is keyboard-operable (Escape to close) and locks body scroll.
- The contact form has inline validation, `aria-invalid`/`aria-describedby`
  wiring, and moves focus to the first invalid field on submit.
- Colour choices meet WCAG AA contrast on both dark and light sections.
- All motion is CSS-transform/opacity based and disabled under
  `prefers-reduced-motion`. No layout shift; no render-blocking assets beyond a
  single font stylesheet.

> The contact and newsletter forms are front-end only (validation + success
> state). To make them live, POST the collected values to your backend or a
> form service in `src/pages/Contact.jsx` (`handleSubmit`) and
> `src/pages/News.jsx`.
