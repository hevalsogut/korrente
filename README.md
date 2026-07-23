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
│   │   ├── calculatorConfig.js # Revenue calculator assumptions/defaults
│   │   ├── pageVisibility.js #   which pages are on/off (fallback defaults)
│   │   └── content.js        #   values, stats, testimonials,
│   │                         #   commitments, articles, projects (fallback data)
│   ├── lib/
│   │   ├── calculator.js     #   Revenue calculator pure math (calculateRevenue)
│   │   ├── pageVisibility.jsx #  page-visibility context + hook
│   │   └── strapi.js         #   Strapi fetch helpers (articles, projects, singles)
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

This same fetch-with-fallback pattern also backs a few CMS-editable single
types (hero copy, footer prose, SEO defaults) — the client can edit them in
Strapi, and the site falls back to the values in `src/data/` if the CMS is
unreachable.

### Toggling pages on/off

Which pages appear in the nav (and resolve as routes) is driven by a
`page-visibility` Strapi single type, with a static fallback in
`src/data/pageVisibility.js`. `src/lib/pageVisibility.jsx` starts from those
defaults synchronously (so the first render already links correctly), then
reconciles once Strapi responds — or keeps the defaults on any fetch failure.
Home is never gated. To hide a page (e.g. temporarily pull the Calculator),
flip its boolean in Strapi; to change the *default*, edit
`pageVisibilityDefaults` in `src/data/pageVisibility.js`.

---

## Revenue Calculator

> **This is the one non-trivial subsystem in the site — read this whole section
> before touching it.** If you only change *numbers* (prices, CAPEX, defaults),
> you almost never need to open the math file: edit `calculatorConfig.js` and
> run `node test.js`. If you change *how a number is computed*, read
> "The scope rules" below first — they encode accounting rules that are easy to
> break silently (the tests will not always catch a scope leak).

At `/calculator` lives a battery-storage revenue and lifetime-economics model
that recalculates instantly as you type — entirely client-side, no backend, no
API calls, no database. It is an **illustrative model, not investment advice**
(the on-page disclaimer says so), built on sourced but placeholder Netherlands
market assumptions.

### The three files (and the one you'll usually edit)

| File | What it is | You edit it when… |
| --- | --- | --- |
| **`src/data/calculatorConfig.js`** | All the *assumptions*: defaults, input min/max limits, the RTE-by-duration table, chemistry presets. Every market value carries an inline comment with its **source, URL, and set-date**. | You want to change a price, a cost, a default, or a limit. **90% of edits happen here.** |
| **`src/lib/calculator.js`** | The *math*: `calculateRevenue(inputs)` — the entire model as one pure, dependency-free function. No React, no i18n, no side effects. | You want to change *how* a figure is computed, or add a new output. |
| **`src/pages/Calculator.jsx`** | The *UI*: form state, the tiered layout, and result formatting (`Intl.NumberFormat` for currency/number output). | You want to change the form, add/remove a field, or change how a result is displayed. |

The separation is deliberate: **assumptions ≠ math ≠ presentation.** Keep it
that way. Don't hardcode a market number into the math file; don't put math into
the UI.

### How a calculation flows

`calculateRevenue(inputs)` runs top to bottom in `calculator.js`. Every input is
coerced from string → number and clamped to the limits in `INPUT_LIMITS`
*first*, so it is always safe to call directly with raw form-state (the form
never has to validate types before calling). The pipeline:

1. **Pick mode & sizing.** `grid` or `solar`; power (MW) × duration (h) →
   nominal energy `E_nom`; usable energy `E_use = E_nom × depth-of-discharge`.
   Duration is restricted to 1/2/4 h, each mapping to a fixed round-trip
   efficiency (RTE) from `RTE_BY_DURATION` (or a chemistry preset's override).
2. **Battery CAPEX.** power-based (€/kW) + energy-based (€/kWh). Kept
   **separate** from solar CAPEX on purpose (see scope rules).
3. **Degradation → state-of-health (SoH) curve.** Annual loss =
   `cycles/yr × per-cycle% + calendar%/yr`. Year 1 runs at 100% SoH; each later
   year compounds the loss into a per-year SoH series (`buildSoHSeries`).
4. **Year-1 revenue stacking.** Arbitrage (buy-low/sell-high on the spread) plus
   optional FCR and balancing (aFRR) capacity revenue. Allocation is **zero-sum**
   (see scope rules).
5. **Solar (solar mode only).** PV generation split into self-consumed (avoids
   retail import) and exported (feed-in tariff, or retail-parity price if net
   metering applies). Adds solar CAPEX to *total* project CAPEX only.
6. **Lifetime loop (LCOS & NPV).** Walks each project year, applying that year's
   SoH to arbitrage throughput, discounting cash flows at the WACC, and
   accumulating discounted energy and OPEX for LCOS. FCR/balancing/solar are
   held flat across life in this MVP (no ancillary-price escalation or PV
   degradation modelled yet).
7. **Return a nested result object** (`{ E_nom_mwh, capex_eur, annual_net_eur,
   payback_years, roi_pct, allocation, revenueSplit, solar, lifecycle: { years,
   npv_eur, lcos_eur_per_mwh, … } }`) that the page renders directly.

### The scope rules (read before changing the math)

These are the traps. The inline comments in `calculator.js` state them at each
site; here they are in one place:

- **Battery-only vs. total-project CAPEX.** `battery_capex_eur` is power + energy
  CAPEX *only*. Solar CAPEX is added afterward into `capex_eur` (the total).
  Metrics denominated in the battery asset — **CAPEX/kWh and LCOS** — must use
  `battery_capex_eur`; whole-project metrics — **NPV, payback, ROI** — use the
  total `capex_eur`. Mixing a blended cost into a battery-only denominator is
  exactly the bug that once inflated NPV to several times CAPEX.
- **LCOS is CAPEX + discounted OPEX only — no charging cost in the numerator.**
  `price_spread_eur_mwh` is already a *net* margin (the cost of charging is
  baked into "spread"). Subtracting a separate charging-cost term would
  double-count it and could flag a genuinely profitable project as "not viable."
  Charging cost *is* computed per year (`charging_cost_eur`) but only for
  display/transparency — never folded into LCOS.
- **Zero-sum ancillary allocation.** Capacity given to FCR or balancing is
  capacity taken from arbitrage; the three shares always sum to 100%. If FCR% +
  balancing% exceed 100 they're scaled down proportionally (`allocClamped`
  flags this to the UI).
- **Duration-gated eligibility.** FCR and balancing each require the selected
  duration to clear a minimum (`fcr_min_duration_h`, `balancing_min_duration_h`).
  Below the threshold the allocation is forced to 0 and the UI disables the
  toggle with an explanation — a 1 h battery cannot sell FCR, for example.
- **Chemistry stays out of the math.** A chemistry preset (Lithium LFP / Vanadium
  Flow) is just a *bundle of numbers* loaded into the advanced fields **before**
  `calculateRevenue` runs. The engine only ever sees an optional
  `rte_by_duration` override table — never a "chemistry" concept. Flow is a
  deliberate approximation (it swaps five inputs, not independent power/energy
  sizing or electrolyte residual value) and is calendar-dominated in its
  degradation (it ages with time, not cycling — its core durability advantage).

### Changing the assumptions safely

`calculatorConfig.js` is organized into labelled buckets — edit the value, keep
the sourcing comment honest (update source/URL/set-date if you change where a
number came from):

| Bucket | Holds |
| --- | --- |
| `ADVANCED_DEFAULTS` | Spread, DoD, cycles/yr, project life, power/energy CAPEX, OPEX% |
| `RTE_BY_DURATION` | Round-trip efficiency per 1/2/4 h (read-only in the UI) |
| `DEGRADATION_DEFAULTS` | Per-cycle + calendar degradation |
| `CHEMISTRY_PRESETS` | The Lithium/Flow bundles loaded into advanced fields |
| `STACKING_DEFAULTS` | FCR/balancing prices + min-duration eligibility gates |
| `SOLAR_DEFAULTS` | PV size, yield, seasonal split, tariffs, solar CAPEX |
| `LIFETIME_DEFAULTS` | Discount rate (WACC), charging price |
| `INPUT_LIMITS` | Min/max clamps applied to every field before the math runs |

**These are manual constants, not live feeds.** The header comment in
`calculatorConfig.js` flags a **6–12 month refresh cadence** for market values
(spread, CAPEX, FCR/aFRR) — they drift. Several defaults carry a
"confirm before launch" note (e.g. which PV pairing ratio to default to,
utility-scale vs. rooftop solar CAPEX). **Sanity check:** a valid computed LCOS
should land in the NL utility-scale benchmark of **€120–180/MWh** — outside that
band usually means a bad input, not a broken model.

### Testing the math

Because `calculateRevenue` is pure, it's trivially unit-testable with plain
input/output objects. **`test.js`** (run `node test.js`) does exactly that —
including a dedicated group per chemistry preset and per mode. It is a
standalone Node script, *not* wired into `package.json` and *not* a real test
runner: it imports `calculateRevenue` and the config directly, asserts, and
exits non-zero on any failure. To check one new behaviour, add assertions
inline (there's no test-name filter).

> **Run `node test.js` after every change to `calculator.js` or
> `calculatorConfig.js`** — it's the only automated check the calculator has.

### Glossary (for whoever inherits this)

| Term | Meaning in this model |
| --- | --- |
| **Arbitrage** | Charging when power is cheap, discharging when it's expensive — revenue = the price *spread* captured, net of round-trip losses |
| **RTE** | Round-trip efficiency — fraction of stored energy you get back out (losses on the round trip) |
| **DoD** | Depth of discharge — how much of nameplate capacity is actually cycled |
| **SoH** | State of health — remaining capacity vs. new, degrading year over year |
| **LCOS** | Levelized cost of storage — €/MWh it costs to store+deliver energy over the asset's life (CAPEX + discounted OPEX ÷ discounted throughput). Compared to captured spread to judge arbitrage viability |
| **NPV** | Net present value — all project cash flows discounted to today at the WACC, minus CAPEX |
| **FCR** | Frequency Containment Reserve — a fast ancillary service; paid per MW of contracted capacity |
| **Balancing / aFRR** | automatic Frequency Restoration Reserve — a slower ancillary service; also paid per MW of capacity |
| **Net metering (`net_metering_2027`)** | ON = exported solar is valued at the retail import price (pre-2027 NL *salderingsregeling*); OFF = valued at the low feed-in tariff, so self-consumption becomes the driver |

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

> The contact form is front-end only (inline validation + a success state); it
> does **not** POST anywhere yet. To make it live, send the collected values to
> your backend or a form service from `src/pages/Contact.jsx` (`handleSubmit`).
> This is a deliberate future step, not an oversight.
