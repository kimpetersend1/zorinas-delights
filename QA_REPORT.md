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
