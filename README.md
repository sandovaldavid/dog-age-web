# Dog Age in Human Years

[![CI Quality Gate](https://github.com/sandovaldavid/dog-age-web/actions/workflows/ci.yml/badge.svg)](https://github.com/sandovaldavid/dog-age-web/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/sandovaldavid/dog-age-web/actions/workflows/deploy.yml/badge.svg)](https://github.com/sandovaldavid/dog-age-web/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](LICENSE)

**Science-based dog-to-human age translation — forget the “×7” rule.**

Bilingual (English / Español) web calculator that applies the epigenetic translation function published by Wang et al. (2020) in *Cell Systems*:

```text
human_age = 16 · ln(dog_age) + 31
```

A 1-year-old dog is already about **31** in human years; a 12-year-old Labrador, about **71**. Aging is fast early and slows down later — a logarithmic progression, not a constant linear multiplier.

**Live site:** https://sandovaldavid.github.io/dog-age-web/

| Light | Dark |
| --- | --- |
| ![Light mode screenshot](docs/screenshot-light.png) | ![Dark mode screenshot](docs/screenshot-dark.png) |

## Features

- **Instant calculation:** Enter years and months for immediate dog-to-human translation with no layout shifts.
- **Interactive Aging Curve:** Real-time SVG chart contrasting the logarithmic epigenetic curve against the traditional linear “×7” multiplier, with a dynamic marker tracking your dog’s coordinates.
- **Milestones comparison table:** Build-time rendered comparison highlighting the difference between epigenetic aging and the 7× rule, dynamically focusing the milestone nearest to your dog.
- **URL bookmarking & sharing:** Shareable URL query parameters (`?y=...&m=...`) and native share/copy action.
- **Life-stage chips:** Illustrative brackets (puppy / young adult / mature adult / senior) mapped against human physiological equivalents.
- **Bilingual parity:** Complete English (`/`) and Spanish (`/es/`) routing with `hreflang` alternates, localized decimal separators, and compile-time dictionary parity checks.
- **Warm playful theme:** Automatic light/dark mode respecting OS preferences with WCAG AA compliance.
- **Zero runtime dependencies:** Built with Astro static output; no third-party analytics, tracking, or external scripts.
- **Accessibility first:** Fully labeled form controls, live polite result announcements, focus visibility, keyboard navigation, and zero axe-core accessibility violations.

> [!NOTE]
> This tool applies a published population-level function to the chronological age you type. It does **not** analyze DNA, it is **not** a measurement of any individual dog, and it is **not** veterinary advice. The model was fitted on Labrador retrievers aged 0.1–16 years; other breeds and health conditions can age differently.

## How it works & “×7” Comparison

The study compared blood DNA methylation of 95 Labrador retrievers (0.1–16 years) with 320 humans (1–103 years) across 54,469 shared CpG sites, matching each dog to the average age of its five methylation-closest humans.

| Dog age | Epigenetic formula | Traditional “×7” rule |
| --- | --- | --- |
| ~8 weeks (0.15 y) | ~0.6 | 1.1 |
| 1 year | ~31 | 7.0 |
| 2 years | ~42 | 14 |
| 4 years | ~53 | 28 |
| 7 years | ~62 | 49 |
| 12 years | ~71 | 84 |
| 16 years | ~75 | 112 |

## Architecture & Engineering Standards

- **Single source of truth:** The epigenetic formula and stages are defined once in [`src/lib/dogAge.ts`](src/lib/dogAge.ts) and shared between build-time tables, client scripts, and unit tests.
- **Separation of concerns:** State transition and view-model preparation are encapsulated in [`src/lib/calculatorController.ts`](src/lib/calculatorController.ts), isolating business logic from direct DOM operations.
- **Compile-time i18n parity:** Spanish translations in [`src/i18n/ui.ts`](src/i18n/ui.ts) are strictly typed against the English schema, verified by `astro check` and deep vitest assertions.
- **Automated quality gates:** Continuous verification covering unit tests, type diagnostics, static build, Playwright E2E browser tests, and `@axe-core/playwright` accessibility audits.

## Development

Requires Node.js ≥ 20.

```bash
npm install
npm run dev        # start Astro development server
npm run build      # static production build to dist/
npm run preview    # preview production build locally
npm run test       # run Vitest unit and i18n parity tests
npm run test:e2e   # run Playwright E2E and axe-core accessibility suite
npm run check      # run Astro type and template diagnostics
```

## Deployment & CI

- Every pull request and push runs the **CI Quality Gate** (`.github/workflows/ci.yml`), running checks, tests, builds, and automated E2E/a11y audits.
- Deploys to GitHub Pages automatically upon passing all quality checks (`.github/workflows/deploy.yml`).

## Citation

Wang T, Ma J, Hogan AN, Fong S, Licon K, Tsui B, Kreisberg JF, Adams PD, Carvunis A-R, Bannasch DL, Ostrander EA, Ideker T. *Quantitative Translation of Dog-to-Human Aging by Conserved Remodeling of the DNA Methylome.* Cell Systems. 2020;11(2):176–185.e6. [doi:10.1016/j.cels.2020.06.006](https://doi.org/10.1016/j.cels.2020.06.006)

Educational project created by [David Sandoval](https://hub.sandovaldavid.com) — not affiliated with the study authors or publishers.
