## Standalone brand library — 2026-11-21

- `npm test`: 15/15 passed (12 existing, 3 new).
- Source comparison against previous ZIP: homepage HTML and existing application assets and code unchanged; only README, changelog, QA report modified among original files.
- Offline Chromium harness inlined actual branding page CSS, JS and images and used fallback fonts. Widths: 320, 375, 620, 768, 900, 1024 and 1440px. No horizontal document overflow, no broken images; four logo cards at every width. Mocked clipboard success and rejection paths passed; no page script errors in the harness.
- Static tests verified every referenced local downloadable file/image exists, no homepage branding-page link, separate entry configuration, noindex, and all illustrations present.
- npm install failed with registry DNS error `EAI_AGAIN`; local HTTP navigation also blocked by the environment. Actual Vite build, HTTP download delivery, Google Fonts rendering, live routing and real clipboard permissions remain unverified. After deployment verify /branding and /branding/, download each format, copy colours, and smoke-test the homepage order form. No live Netlify submission attempted.

# QA Report — Zorina's Delights

## Checks actually performed

- **Node order/catalogue tests:** 6 passed, 0 failed (`npm run test`). Checks catalogue availability, advertised price, valid order parsing, rejection of unavailable concepts, invalid quantities and contact details, WhatsApp message semantics, and Netlify AJAX field encoding.
- **JavaScript syntax:** `node --check` passed for app modules and build script.
- **Chromium browser smoke tests:** Desktop 1440px, tablet 768px, mobile 390px, narrow mobile 320px. For browser testing, source HTML/CSS/JS/assets were loaded into an isolated page because the execution environment blocks local URL navigation. All six gallery cards rendered, no JavaScript page errors were reported and there was no unwanted horizontal document overflow at these sizes.
- **Mobile navigation:** open button toggled `aria-expanded=true`; Escape restored `aria-expanded=false`.
- **Product enquiry:** Selecting the kit chose the expected product and displayed R120 for quantity 2, clearly marked as an estimate based on the flyer.
- **Local Netlify route:** Correctly displayed an informative error instead of reporting a successful submission.
- **Mocked Netlify route:** Inspected a simulated URL-encoded `POST /` including `form-name`, honeypot, customer information, product and consent fields. Successful mocked response revealed the success panel. **This was a mock, not an actual Netlify submission.**
- **WhatsApp:** Browser test intercepted `window.open` and confirmed it was called with an encoded `wa.me` enquiry URL; no real message was sent.
- **Static sanity checks:** 8 SVG files parsed as valid XML, HTML IDs unique and all in-page anchor targets present.
- **Visual review:** Desktop and mobile full-page previews captured from actual Chromium rendering of the locally inlined site source.

## Not verified in this environment

- `npm install` and actual Vite production bundling. The environment could not resolve the public npm registry; Vite was not installed locally. Run `npm install && npm run build` on a machine with registry access or in Netlify CI.
- Real Netlify form detection, successful submission, notification delivery and spam classification; these require a deployed Netlify site.
- Actual site URL, domain, social-card fetching and canonical URL until deployment.
- Business accuracy (current price, stock, WhatsApp number, collection arrangements, owner story, product photo permission).
- Formal WCAG audit or multi-browser compatibility certification.

## Release recommendation

The project is ready for the owner to inspect and deploy to a Netlify preview, **not for an unverified public launch**. Confirm the details in README, install/build in CI, enable form detection, submit a test enquiry, inspect the Forms dashboard, and check the deployed canonical/social metadata.

## Phase 2: Halaal logo integration (2026-11-21)

- Added the provided Halaal logo as an optimised local WebP asset (`public/images/halaal-logo.webp`).
- Added restrained trust badges in the hero, collection status, ordering section and footer. The accessible text is “All products are Halaal”.
- Styled the mark for dark and light surfaces and responsive layouts; did not touch ordering or gallery JavaScript.
- No certification body is named and the word “certified” is not used, because the owner only confirmed that the products are Halaal.
- Before public launch, the owner should confirm continued accuracy and permission to use the supplied graphic.

### Halaal update verification

- `npm test`: **8/8 automated tests passed**, including two Halaal-branding regression tests and all six previous tests.
- In-memory Chromium visual/interaction harness exercised **1440px, 768px, 375px, and 320px** wide layouts. At all four widths the page had **no horizontal overflow** or JavaScript page errors; **all four Halaal mark images loaded**, six product cards were rendered, and setting quantity 2 retained the **R120** flyer-price estimate. The mobile menu opened at 375px and 320px.
- The browser harness used inlined local CSS/images and re-mapped the original JavaScript module imports to in-memory module URLs because this container's Chromium blocks navigation to local and HTTP addresses. It is useful for responsive layout/regression checks but **is not a substitute for checking a real Vite build in a hosted browser**.
- The environment could not complete `npm install` (timed out while fetching packages), so a production `npm run build` was **not verified**. Run `npm install && npm run build` in an environment with access to the npm registry.
- Netlify live form delivery, deployed image loading and notification emails **must still be verified after deployment**. No payment or real customer enquiry was submitted.


## Phase 3: Persistent navigation Halaal badge (2026-11-21)

- **Request:** Make the Halaal identity visible in the header even when the hero badge is below the fold. Keep the hero badge.
- **Implementation:** Added a pale-sage navigation capsule with the existing owner-supplied emblem and "Halaal" label, fixed in the sticky header row across breakpoints. The hero, collection, order and footer emblems are unchanged.
- **Automated:** `npm test` — **9/9 tests pass**, including a new regression for simultaneous navigation and hero placement. `node --check` passed for the application's JavaScript modules and postbuild script.
- **Browser layout:** An in-memory Chromium harness (locally inlined HTML/CSS and embedded images) checked widths **320, 375, 390, 430, 550, 760, 768, 820, 980, 1024, 1160, 1170, 1280 and 1440px**. Confirmed the badge was on-screen, logo loaded, no horizontal document overflow, no collisions with logo/navigation/CTA/menu button, and header remained sticky when scrolled. At mobile widths, the menu could be opened and closed using Escape while the badge stayed visible.
- **Visual snapshots:** `Zorinas-Delights-Halaal-Nav-1440-preview.png` and `Zorinas-Delights-Halaal-Nav-375-preview.png` were captured separately (not shipped as part of website source).
- **Unverified:** Actual Vite production bundle and deployed Netlify form. `npm install` failed with DNS resolution error `EAI_AGAIN` while accessing `registry.npmjs.org`; no npm dependencies were installed. Check with `npm install && npm run build` in a working environment, then verify live Netlify form delivery.

## Concept 1 identity refresh (2026-11-21)

**Automated tests:** Existing 9 Node tests passed; new logo-specific tests added and passed (see `npm test`). This covers all existing product/order utility tests and the Halaal placement/copy tests as well as the new branding reference assertions.

**Layout inspections:** Used Chromium with the site's current HTML and combined CSS, inlined as data for isolated layout QA because local URL navigation is blocked by this environment's browser policy. The browser confirmed the SVG assets load, the navigation elements remain separated, and there is no horizontal overflow at **320, 360, 375, 430, 768, 980, 1170 and 1440px**. The live Vite page's full JavaScript lifecycle was **not** covered by these inlined-layout inspections, and screenshot fonts may fall back when remotely hosted Google Fonts are unavailable.

**Production build limitation:** The npm registry was unavailable; `npm install` timed out, so `npm run build` was **not** executed or claimed successful. Deploy or run locally with network access to validate the Vite production output and, subsequently, real Netlify Forms delivery.

**Preserved functionality:** No changes made to the JavaScript modules handling gallery, ordering, navigation, or scroll animation. The original green Halaal asset is byte-identical to the most recent supplied ZIP.

## Signature Reveal QA — current update

### Verified in this environment

- `npm test`: **21/21 tests passed** (15 prior regression tests and 6 new intro tests). The bootstrap from the actual homepage was exercised in a Node VM with simulated storage, events and timer. Tests cover first visit/refresh/new separate session, reduced motion, storage denial, fade lifecycle, keyboard and pagehide dismissal, watchdog, original vector path equivalence, unchanged dependency list and absence on the separate branding entry.
- Offline Chromium rendering of the actual homepage HTML and CSS, with styles/images embedded and sessionStorage mocked because the environment blocks HTTP and file navigation. The page's Vite application module and remote fonts were omitted for this visual harness; this is not a full built-app browser test. The overlay appeared, original hero motion was paused, fade-start released the motion and the overlay was removed at fade completion. Measured fade interval: approximately 600ms. Visually checked partial signature and completed logo. Centring and viewport fit checked at 1440×900, 320×568, 375×812, 768×1024, 1024×768, 1920×1080 and 568×320. Tab dismissal, reduced-motion skip, disabled-JavaScript skip and repeat-session mock passed.
- Compared project files against the previous Branding Page ZIP: unrelated source files and all assets are byte-identical; no existing page sections removed. New overlay is hidden by default and has no external artwork request. Existing application interactions are covered by previous unit tests but were not end-to-end retested in a live browser for this update.

### Not verified

- Actual Vite production build or full live navigation: npm offline install failed with `ENOTCACHED` for Vite, and browser HTTP/file navigation was blocked by the environment. Run `npm install && npm run build` locally and verify session behavior with real sessionStorage, `/branding/` routing, homepage interactions and Netlify form delivery on the deployed site.
- No live form submission or deployment performed.

## Catalogue Expansion V2.0 (2026-11-22)

**Implemented:** Nine flyer-based product ranges, six frozen and three sweet; flavour-aware pack prices, CSS masonry filters, dynamic variant dropdown, pack quantity labels and quote-only doughnuts. Eight new WebP crops from the client flyers, all labelled as promotional imagery. WhatsApp and Netlify Form enquiries include calculated selection information. The original Signature Reveal, independent brand library, logo and Halaal placements remain.

**Automated tests:** `npm test`: **25/25 tests passed** (replaces six earlier catalogue tests with ten V2 catalogue/order tests while retaining all 15 branding/Halaal/Signature Reveal regression tests). All touched JavaScript modules passed `node --check`.

**Offline browser interaction checks:** An in-memory Chromium harness loaded the actual source HTML and CSS with locally inlined assets and a wrapper of the JavaScript modules (the environment blocks HTTP/file navigation). At **1440px, 768px, 375px and 320px**, confirmed 9 cards total, filters 6/3, pies/steak/two packs = R1200, doughnut total = “Quote required”, no broken card images, no horizontal overflow, no page script errors, and the local Netlify form correctly warns it is disabled. At mobile widths, navigation opens/closes correctly. Desktop and mobile previews were visually rendered; this was **not** a real Vite build. These tests used reduced-motion rendering and do not re-certify the first-visit intro animations. Browser form delivery via a deployed Netlify endpoint was not tested.

**Known constraints:**
- `npm install` failed with `EAI_AGAIN` contacting `registry.npmjs.org` (2026-11-22), so no actual `npm run build` was possible here. The user must verify a production Vite build and the separate `/branding/` route on Netlify or a networked machine.
- Netlify Forms detection, actual submission/notification delivery, and live WhatsApp hand-off still need verification after deployment; unit tests validate the generated payloads and URL only.
- Seller must verify all prices, availability, pack sizes (particularly doughnuts), the duplicate Sausage Rolls line, current WhatsApp number, collection arrangements, final privacy copy and permission to use promotional imagery/Halaal emblem.
- This is an enquiry flow for **one product range per request**, not a checkout or basket.

**Additional V2 browser test:** With form delivery enabled in the offline harness and `fetch` mocked (no external request), confirmed a pies/steak/two-pack form submission produced a URL-encoded `POST /` with `product`, `variant`, `quantity`, `form-name`, consent and computed `product-details` showing R1200; the success panel appeared. In the same harness, a WhatsApp click produced the expected prefilled `wa.me` URL without sending a message. This is not a live Netlify or WhatsApp test.

## Signature Reveal timing restoration (2026-11-22)

- Compared the original Signature Reveal ZIP with Catalogue V2: `preloader.css`, `preloader.js`, and `main.js` were identical; the original playback key was also unchanged. The session-storage skip could therefore make the intro seem absent on re-visits.
- Intentionally made the visible writing stages less rushed, without extending the original 2.6-second end-to-end animation or weakening reduced-motion accessibility.
- Versioned the once-per-session key, validated original session v1 → new v2 intro → v2 refresh skipped.
- Automated test and browser verification details recorded alongside this release. No Netlify form submission performed. Production build still needs verification if Vite cannot be installed in this environment.

**Latest verification:** `npm test`: **27/27 passed**. Offline headless Chromium, using the original bootstrap, logo SVG and CSS injected into an isolated document, checked the active intro, 2.0s delay + 0.6s fade, dismissal after ~2.8s, versioned session skip on repeat, and reduced-motion skip at 375×812 and 1440×900. The page was not served through Vite for this visual test. `npm run build` could not execute (`vite: not found`); `npm install` failed with `EAI_AGAIN` for registry.npmjs.org. A production build and live Netlify enquiry delivery remain unverified.

## Signature Reveal 50% slower (2026-11-22)

- Made a timing-only change to the intro: 3.0s drawing/hold followed by 0.9s fade = **3.9s overall**. Scaled SVG masks, typeset transition and complete-coverage timings 1.5×.
- Raised the watchdog to 4.6s to avoid cutting off the longer animation. The first-visit key is versioned `.v3`; prior `.v2` sessions get one new playback, subsequent refreshes skip.
- Accessibility: prefers-reduced-motion, Tab/Escape and storage failure behaviour preserved.
- No product/gallery/order, `/branding`, image, font or Halaal changes.

### Current verification

- `npm test`: **27/27 passing**; `node --check` passed for the unchanged loader helper and main module.
- Offline Chromium test at **320×568, 375×812, 768×1024, 1440×900** confirmed a 3.0s pre-fade hold plus 0.9s fade, release of the paused hero at fade start, finished/dismissed overlay after the fade, a session key on first playback, skipped repeat playback, and no horizontal overflow in the isolated intro render.
- Reduced-motion browser setting skipped the intro.
- Tested the intro using inline source HTML, SVG and CSS in Chromium; not a Vite production bundle. The previously reported production build and live Netlify form caveats remain.
