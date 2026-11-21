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
