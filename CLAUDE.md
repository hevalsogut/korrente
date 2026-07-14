# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Korrente marketing site: Vite + React 18 + React Router, single-page app, English-only. No UI kit — hand-rolled design system in `src/index.css` (CSS custom properties) and inline SVG icons (`src/components/Icon.jsx`). No test framework/runner — a single hand-written script (`test.js`) covers the calculator math.

## Commands

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # production build to /dist
npm run preview  # serve /dist at http://localhost:4173
node test.js     # run the calculator math assertions (no test runner/framework)
```

There is no lint script configured. `test.js` is a standalone Node script (not wired into `package.json`); it imports `calculateRevenue` and `calculatorConfig` directly and exits non-zero on any failed assertion. To check one behavior, add/run assertions inline in `test.js` — there's no test-name filtering mechanism.

## Architecture

- **Routing**: `src/main.jsx` mounts the router; `src/App.jsx` is the full route table (`Layout` wraps every page via a shared `<Route element={<Layout />}>`). Adding a page means adding both the route in `App.jsx` and a folder-mate `.jsx`/`.css` pair in `src/pages/`.
- **Content vs. UI strings split**: `src/data/*.js` holds editable page content (company info, services, calculator defaults, values/stats/testimonials/articles/projects fallback data); `src/i18n/ui.js` holds interface microcopy, read through `useI18n().t('dotted.path')` (`src/i18n/index.jsx`). The i18n layer is now single-language (`lang` hardcoded to `'en'`) — it's a leftover abstraction from a removed bilingual (EN/TR) setup, kept as the string-lookup mechanism rather than for language switching.
- **CMS fallback pattern**: `News.jsx` and `Projects.jsx` initialize state from the static arrays in `src/data/content.js`, then fetch from Strapi (`src/lib/strapi.js`) in a `useEffect`, driven by `VITE_STRAPI_URL` (`.env`). On any fetch failure (unset URL, network error, CMS down) it `console.warn`s and keeps the static fallback — pages never show an error state, and `npm run build` produces a fully working static site offline. `strapi.js` maps Strapi 5's flattened response (`documentId` + `*En` fields) back into the exact shapes `src/data/content.js`/`services.js` already use, so a page consumes either source interchangeably.
- **Revenue Calculator** (`/calculator`) is the one non-trivial subsystem:
  - `src/lib/calculator.js` — `calculateRevenue(inputs)`, the entire model as one pure, dependency-free function. All fields are coerced/clamped internally, so it's safe to call with raw form-state strings. Read its inline scope-rule comments (e.g. battery-only vs. total-project CAPEX, what LCOS is/isn't allowed to include) before changing the math — they encode rules that are easy to violate silently.
  - `src/data/calculatorConfig.js` — defaults, input min/max limits, and the RTE-by-duration table; tune assumptions here, not in the math file.
  - `src/pages/Calculator.jsx` — form state, layout, bilingual-ready number/currency formatting via `Intl.NumberFormat`.
  - Two modes (grid arbitrage vs. solar+storage); FCR/balancing capacity allocation is zero-sum against arbitrage and gated per-mode by a minimum-duration threshold per service.
- **SEO**: each page sets metadata via the `<Seo>` component (`src/components/Seo.jsx`), a dependency-free manager that patches `document.title`/meta tags/canonical/OG/Twitter tags in a `useEffect`. Site-wide defaults (fonts, base meta) live in `index.html`.
- **Design tokens**: all color/spacing/type/radii/shadow/motion values are CSS custom properties in `src/index.css` under `:root`. Change a token there rather than hardcoding values in component CSS. The green scale has legacy `--lime-*`/`--mint-*` aliases pointing at the same values — don't remove them, older class names still depend on them.
- **No bitmap imagery for illustrations**: hero/section visuals are SVG+CSS (`src/components/HeroScene.jsx`), not images — this is deliberate (no external/copyrighted assets, no lazy-load concerns for illustrations). `public/*.svg` holds the logo and OG image; `hero-container.png` is the one bitmap exception.
- **Forms are front-end only**: Contact (`src/pages/Contact.jsx`, `handleSubmit`) and the News newsletter form do inline validation and a success state but don't POST anywhere — wiring a backend/form service is a deliberate future step, not an oversight.
- SPA routing note: when deploying `/dist`, the host must rewrite unknown paths to `index.html` (deep links like `/solutions` otherwise 404 on a static host).
