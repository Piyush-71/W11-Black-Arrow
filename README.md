# W11 — The Black Arrow

A cinematic, independent fan/portfolio experience about the 2020 Mercedes-AMG F1 W11 EQ Performance. All seven build phases and nine chapters are implemented. No paid APIs or credentials are needed to run the finished site.

## Run locally

Requires Node.js 20.9+ (developed with Node 24) and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. For an optimized production run:

```bash
npm run build
npm run start
```

Set `NEXT_PUBLIC_SITE_URL` to the eventual public origin before the production build so social image metadata uses that origin. The default is localhost. No deployment has been created.

## Architecture

Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 4, GSAP/ScrollTrigger and Lenis. `src/app/page.tsx` composes independent chapter components; it does not contain the full site. `layout.tsx` owns metadata, local font CSS and global styles. `globals.css` contains the shared design tokens and section-specific responsive composition.

Server-rendered editorial sections keep the full story in HTML. Client components own only their interactive state. Later chapters use Next dynamic imports with SSR enabled for code splitting. The site is statically prerendered at build time. No database, API routes, cookies, analytics, authentication or runtime generation service.

`src/data/` contains the chapter index, seven engineering points and all 17 race records. `Experience` manages shared motion and navigation progress; `Season` owns its horizontal scroll choreography independently.

## Main components

- `Navigation`: native fullscreen dialog, explicit focus wrap, Escape dismissal, focus restoration, skip link and opt-in synthesized ambient sound.
- `Hero`: critical full-screen car image, editorial W11 lockup, metadata and entry/scroll reveal.
- `Origin`: 2020 context, 13 wins / 15 poles / seventh consecutive title and the meaning behind the black livery.
- `Machine`: seven selectable car points, spatial dimming, animated connector and matching touch/keyboard selectors.
- `DAS`: SVG steering mechanism driven by a range input or push/pull buttons; toe change is deliberately exaggerated and explained.
- `Aerodynamics`: three selectable flow regions, pausable animated SVG streamlines and conceptual airflow copy.
- `Power`: harvest/deploy modes and five selectable hybrid-system components with moving energy pathways.
- `Cockpit`: photographic instrument environment, six control explainers and a working 1–8 gear-display demo.
- `Drivers`: selectable Hamilton/Bottas split composition, real 2020 points/wins/podiums; Russell’s Sakhir appearance acknowledged.
- `Season`: all 17 rounds, winners, narrative moments, a race picker, previous/next buttons and scroll-driven desktop timeline.
- `Championship`: spacious Imola and Istanbul scenes with slower editorial pacing.
- `Legacy`: studio return, closing record, car fade, replay link and source/attribution footer.

## Motion timelines

1. **Entry**: 1.8-second car fade and subtle scale, followed by staggered title and metadata arrival. Content is never gated behind a loader.
2. **Hero scroll**: gently enlarges and shifts the car; the title moves upward at a different rate while metadata fades. The next chapter enters through normal document flow.
3. **Editorial reveal**: section text rises 32px and fades in once near the viewport. All text exists and is visible without JavaScript.
4. **Cockpit approach**: the entire image/instrument assembly scales together so hotspots and HTML instruments stay aligned.
5. **Season**: at widths >=900px and heights >=700px, a viewport-sized scene is pinned for 3,000px of vertical travel. The race track translates horizontally. React state changes only when the active round changes, never on every animation frame. Keyboard/race-picker navigation maps the selected round back to scroll position.
6. **Legacy**: the side-profile car fades into black as the closing section is traversed; the record and final statement remain readable.

GSAP contexts and matchMedia scopes are reverted on cleanup. The GSAP ticker callback, Lenis instance, mutation/intersection observers and audio context are removed or closed on unmount. A live reduced-motion switch removes the season pin and restores the untransformed track. SVG motion is CSS-driven, suspended offscreen, and disabled for reduced motion.

## Generated media and provenance

**Higgsfield assets generated: 0.** The connected model catalog was inspected and GPT Image 2 (16:9, 2K, high quality) was selected. The hero request was rejected with `Requires basic plan or higher.` No successful Higgsfield job or charge was returned.

Four custom stills were generated with the built-in OpenAI image generator as the explicitly disclosed fallback:

| File under `public/media/w11/` | Reuse |
| --- | --- |
| `hero/black-arrow.webp` | Hero and Istanbul championship atmosphere |
| `machine/side-profile.webp` | Origin, airflow and legacy |
| `machine/engineering.webp` | Seven-point engineering explorer |
| `cockpit/driver-view.webp` | Cockpit and real HTML instrument overlay |

The four WebP files total approximately 420 KiB. Full generation prompts, original generated filenames and fallback provenance are in `docs/assets.json`. The planned roles are in `docs/MEDIA-PLAN.md`. Images contain no generated sponsor typography; all site labels are real HTML/SVG.

## Performance decisions

- Four reusable WebP masters; Next Image serves responsive variants and negotiates AVIF/WebP.
- Only the hero uses `preload`; later imagery is lazy loaded with explicit dimensions/aspect ratios to reserve space.
- Responsive `sizes` accounts for the larger mobile hero crop.
- Self-hosted Latin subsets of Barlow, Barlow Condensed and IBM Plex Mono. No Google Fonts network dependency.
- Later chapters have independent dynamic chunks while retaining server rendering.
- No video download, real-time 3D scene, continuous React scroll updates or fullscreen particle engine.
- Flow animation pauses when out of view, and audio starts only after an explicit click at quiet volume; it suspends when the tab is hidden.

## Mobile and accessibility

Mobile uses a dedicated hero crop/fade, smaller motion distances, stacked editorial compositions, touch controls, a scrollable race strip and race picker instead of pinning. Landscape/short desktop viewports also avoid pinning below 700px height. Interactive diagram targets are at least 44px; compact chapter-rail links are desktop-only. The touch selectors offer the same content as image hotspots.

Reduced motion preserves the entire story and controls, disables parallax/pinning, and stops decorative animation. Menu focus is trapped and restored; Escape closes the overlay. Focus rings are visible, diagrams are labelled, controls expose their state, images have alt text, and decorative imagery is hidden from assistive technology.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Start the app before E2E tests. Tests use a locally installed Google Chrome through Playwright. Set `TEST_BASE_URL` for a different server/port. If Chrome is unavailable, install Playwright Chromium and change `channel` in `playwright.config.ts`.

The browser suite covers the six requested viewports (1440×900, 1920×1080, 1024×768, 768×1024, 430×932, 390×844), all chapter images, horizontal overflow, browser errors, controls, menu keyboard behavior, live reduced-motion cleanup, animated navigation, short-viewport pinning, and content without JavaScript. Axe checks WCAG A/AA rules. Screenshots and the HTML report are written into ignored `artifacts/` and `playwright-report/` folders.

Final measured results are in `docs/VALIDATION.md`.

## Research

Editorial statistics and race order were checked against [Formula 1’s 2020 race results](https://www.formula1.com/en/results/2020/races), [driver standings](https://www.formula1.com/en/results/2020/drivers), and [Mercedes’ season review](https://www.mercedesamgf1.com/news/petronas-reflects-on-2020-season-and-historic-seventh-title-double).

Engineering context draws on [Formula 1’s DAS explainer](https://www.formula1.com/en/latest/article/das-explained-what-we-know-so-far-about-mercedes-trick-new-steering-system.4vgDQ6cc20xUfhdZGT0ejB), [rear suspension analysis](https://www.formula1.com/en/latest/article/tech-tuesday-why-das-is-only-the-second-most-impressive-innovation-on-the.2EfeudguxvleJcSV7GJ2TZ) and [Mercedes’ 2020 technical specification](https://media.mercedesamgf1.com/marsF1/en/instance/print/Tech-Specs-2020.xhtml?oid=180297613). The livery story is sourced to [Mercedes’ own explanation](https://www.mercedesamgf1.com/news/5-questions-about-our-new-2020-f1-livery-answered).

## Limitations

- Higgsfield generation remains unavailable until the connected account has an eligible plan. The replacement prompts and file paths make later substitution straightforward.
- The car and cockpit are artistic reconstructions, not archival photography or a dimensionally exact W11 model. Diagram geometry, aerodynamic paths and control positions are illustrative, not CFD, CAD or live telemetry.
- Optional hero video and genuine interactive 3D are deliberately omitted. No fabricated driver portraits or historical race footage are presented.
- Browser automation runs in desktop Chrome, including emulated viewport sizes. Physical-device and Safari/Firefox testing remains outside the performed verification.
- This is an unofficial fan/portfolio project. No official endorsement or asset licensing is implied. Fonts are distributed under the SIL Open Font License.
