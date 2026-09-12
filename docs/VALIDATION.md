# Production validation — 12 September 2026

Validated the optimized Next.js production build served at http://localhost:3000.

## Results

| Check | Result |
| --- | --- |
| ESLint | Passed, no warnings |
| TypeScript strict check | Passed |
| Production build | Passed; home page statically prerendered |
| Playwright | 13 / 13 passed in 26.5 seconds |
| Axe WCAG A/AA scan | No detected violations |
| Browser console / page errors | None during the full viewport suite |
| Horizontal overflow | None at all six requested viewports |
| Image loading | All chapter images loaded successfully |
| Dependency audit | Zero known vulnerabilities, including development dependencies |

## Viewports

1440×900, 1920×1080, 1024×768, 768×1024, 430×932 and 390×844.

All nine chapters were checked at every viewport with reduced motion. Additional animated runs covered 1440×900, 1024×768 and 430×932. Inspected desktop/mobile captures of the hero, engineering explorer, DAS, power diagram, cockpit, drivers and season. Short desktop screens retain access to the entire pinned scene; mobile uses native horizontal scrolling and direct race controls.

## Interactions verified

- All engineering sections render and their images load without error.
- Machine selection changes the highlighted part and explanation.
- DAS push/pull and keyboard slider input change the front-wheel alignment.
- Airflow pause and region selection work.
- Hybrid harvest/deploy and component selection update their explanations.
- Cockpit upshift changes the visible and accessible gear readout.
- Driver selection changes championship statistics.
- All 17 races are present. Race picker and next/previous controls work.
- Race jumps remain stable after an ongoing Lenis anchor scroll.
- Desktop season pins and translates; live reduced-motion changes remove its pin and restore an identity transform. Re-enabling motion creates exactly one pin.
- Fullscreen menu wraps keyboard focus, Escape restores focus, chapter links navigate correctly.
- Audio is opt-in and can be muted.
- Core story and all race entries remain readable with JavaScript disabled.

## Payload observation

A fresh desktop Chrome context at 1440×900 transferred **382,063 bytes (about 373 KiB)** by network idle on the local production server. There were 18 subresource entries, seven script requests, and two loaded image elements (the hero and nearby origin image). The four source WebP assets together are about 420 KiB; Next Image serves appropriately sized variants.

This is a local, unthrottled observation, not a Lighthouse score or a field Core Web Vitals claim. Mobile carrier networks, low-end devices and cold remote image transforms were not benchmarked. Later media stays lazy; later interactive chapters use dynamic client imports with server rendering retained.

## Evidence

- `tests/experience.spec.ts` — reproducible browser suite.
- `artifacts/final-desktop.png` — final hero capture.
- `artifacts/hero-{width}.png` — six viewport captures.
- `artifacts/{chapter}-1440.png` and `artifacts/{chapter}-390.png` — section captures.
- `artifacts/season-pinned-desktop.png` — pinned Imola round.
- `artifacts/animated-season-1024.png` and `artifacts/animated-season-430.png`.
- `artifacts/performance.json` — initial resource observation.
- `playwright-report/index.html` — generated test report.

Artifacts and browser reports are local ignored outputs. Physical devices, Safari and Firefox have not been tested. AI artwork and engineering diagrams remain illustrative; see README.md and docs/assets.json for provenance and limits.
