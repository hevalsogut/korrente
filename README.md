# Korrente — Marketing Website

A production-ready marketing site for **Korrente**, a European clean-energy
company focused on grid-scale **energy storage** (plus renewables, system
integration, and green hydrogen).

The site is fast, fully responsive (360 px → large desktop), accessible
(WCAG AA, keyboard-navigable, semantic HTML), **bilingual (EN / TR)**, and built
around a hand-crafted design system — no UI template or component library.

**Visual identity:** a **dark, near-black forest theme** with a vivid green
accent, refined Manrope/Inter typography, a dark header (green logo, outlined
Contact button, "EN ⌄" language dropdown), light sections for rhythm, and flat
SVG energy illustrations (the hero shows a neon-bolt storage container).

---

## Quick start

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
```

Then open <http://localhost:5173> (it opens automatically).

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
| **React Router** | Clean multi-page routing (Home, Solutions, Technology, Projects, Company/About, News, Careers, Sustainability, Contact, 404) with a shared layout. |
| **Plain CSS + custom properties** | A real, transparent design system in `src/index.css` — colour/spacing/type/radii/shadow/motion **tokens** any developer can read and extend. No build-time CSS-in-JS, no Tailwind class soup, no runtime cost. Each component ships its own small `.css` file next to it. |
| **Custom lightweight i18n** | A ~40-line context (`src/i18n/`) drives the EN/TR switch — no i18n library. UI strings live in `src/i18n/ui.js`; content is bilingual in `src/data/*`. Language is remembered in `localStorage` and detected from the browser on first visit. |
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
│   ├── i18n/                 # ⭐ LANGUAGES (EN / TR)
│   │   ├── index.jsx         #   provider + useI18n() hook (t, pick, setLang)
│   │   └── ui.js             #   all interface microcopy, per language
│   ├── data/                 # ⭐ EDITABLE CONTENT (bilingual: { en, tr })
│   │   ├── site.js           #   company details, nav, socials, footer, legal
│   │   ├── services.js       #   the six solutions/services
│   │   └── content.js        #   values, stats, testimonials, timeline, team,
│   │                         #   commitments, articles, projects, roles
│   ├── components/           # reusable UI (Header, Footer, Button, Reveal,
│   │                         #   Counter, Icon, HeroScene, LanguageSwitcher…)
│   └── pages/                # one folder-mate .jsx + .css per page
│       ├── Home.jsx / .css
│       ├── Solutions.jsx / .css
│       ├── Technology.jsx / .css
│       ├── Projects.jsx / .css
│       ├── About.jsx / .css       (nav label: “Company”)
│       ├── News.jsx / .css
│       ├── Careers.jsx / .css
│       ├── Sustainability.jsx / .css
│       ├── Contact.jsx / .css
│       └── NotFound.jsx / .css
└── README.md
```

---

## Editing content (for non-developers)

Copy lives in two places: **`src/data/`** (page content) and **`src/i18n/ui.js`**
(interface labels). Save the file and the dev server refreshes instantly.

**Everything is bilingual.** Content fields are objects like
`{ en: 'Hello', tr: 'Merhaba' }` — just edit the language you need (keep both
keys). Interface strings in `ui.js` are grouped as `en: { … }` and `tr: { … }`.

| To change… | Edit this file |
| --- | --- |
| Company name, email, phone, address | `src/data/site.js` → `company` |
| Header / footer navigation links (labels are `{ en, tr }`) | `src/data/site.js` → `navLinks`, `footerNav` |
| Social media links | `src/data/site.js` → `socials` |
| The six solutions (titles, descriptions, bullets, metrics) | `src/data/services.js` |
| "Why Korrente" value props | `src/data/content.js` → `values` |
| Impact stat counters (numbers + labels) | `src/data/content.js` → `stats` |
| Testimonials | `src/data/content.js` → `testimonials` |
| About-page timeline & leadership team | `src/data/content.js` → `timeline`, `team` |
| Sustainability commitments | `src/data/content.js` → `commitments` |
| Insights / news articles | `src/data/content.js` → `articles` |
| Hero headline, buttons, nav, all UI labels, form errors | `src/i18n/ui.js` |

### Languages (EN / TR)

The header (and mobile menu) has a live **EN / TR** switch. To add a third
language, add its code to `LANGUAGES` in `src/i18n/index.jsx`, add a matching
block to `src/i18n/ui.js`, and add the key to each `{ en, tr }` field in
`src/data/*`.

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
