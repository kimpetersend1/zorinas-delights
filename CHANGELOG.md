## 2026-11-23 — Pre-fried roti range added

- Added **Pre-Fried Rotis** as a separate catalogue category and filter; the flyer does not say these are frozen, so they are not grouped with frozen savouries.
- Added Plain Roti (R75), Garlic & Dhanya (R100) and Garlic & Chilli (R100), each advertised per pack of 10.
- Added a clean, optimised WebP crop of the supplied flyer photo, product preparation copy (fry for 1 minute on each side), and an asset card on `/branding`.
- The product dropdown, variety selection, pack quantity estimate, WhatsApp message and Netlify `product-details` payload use the existing shared order flow; no new dependencies or form fields.
- Updated catalogue counts, category copy, README and regression tests. Existing DIY Kit image, 3.9-second Signature Reveal, Halaal placements, logo and unrelated product data remain unchanged.

## 2026-11-23 — DIY Kit image display correction

- The new client-supplied DIY Kit image is the **only** product image used for this item.
- The catalogue and `/branding` artwork page both reference `public/images/koesisters-diy-kit-client-20261123.webp` to avoid stale image URLs.
- The old `/images/koesister-kit.svg` is now a compatibility image containing the client photograph, not the retired illustration; `/images/koesister-kit-photo.webp` also matches the client photo.
- The decorative SVG generator no longer overwrites the compatibility asset.
- **Important:** The website must be rebuilt and redeployed from this ZIP. A previously open site or old deployment will continue to show the old illustration until its code and assets are updated. After deploying, do a hard refresh or open a private window.

- Replaced the DIY Kit illustration with the client-supplied product photo everywhere it appears, including the catalogue and /branding page.
## Signature Reveal 50% slower (2026-11-22)

- Extended the full first-visit animated introduction from **2.6 seconds to 3.9 seconds** (50% longer), proportionally stretching logo drawing, letter reveals and the final fade.
- Changed the exit animation from **2.0–2.6s** to **3.0–3.9s**, and the fail-open watchdog from **3.0s** to **4.6s** so it cannot interrupt the intended fade.
- Versioned once-per-session playback from `.v2` to `.v3`, enabling one view of the updated animation even if an earlier version was already viewed during the current session. Subsequent refreshes skip the intro.
- Preserved the signature artwork, reduced-motion and keyboard skips, hero handoff, product catalogue, ordering, Halaal branding and direct-access `/branding` page. No new dependencies.

## Signature Reveal timing restoration (2026-11-22)

- Slowed the visible mask-writing stages (Zorina's signature, DELIGHTS and caramel heart) while keeping the entire intro at **2.6 seconds**, including the existing 600ms fade.
- Upgraded the per-session playback key from `zorinas.signature-reveal.v1` to `.v2` so returning visitors can experience the corrected animation once after this update; subsequent refreshes within the same session skip it.
- Kept the accessibility skip, fail-open watchdog, hero handoff and independent `/branding` page unchanged. No new dependencies and no unrelated storefront changes.

## 2026-11-21 — Standalone brand library

- Added a direct-access `/branding` showcase with editorial hero, four logo variants and individual downloads, copyable palette, typography, digital assets, illustration gallery and practical usage notes.
- Bundled the original logo kit and brand presentation for download.
- Configured a separate Vite HTML entry; no homepage link, homepage edits, routing dependency or changes to ordering logic.
- Added noindex and kept the route out of the existing sitemap generator; this is public direct access, not authentication.
- Added three regression tests. All 15 Node tests passed; offline Chromium responsive checks at seven widths passed.

## 2026-11-21 — Concept 1 logo refresh

- Replaced the earlier website's text-and-star logo with the selected elegant editorial signature wordmark.
- Added transparent SVG + PNG/WebP exports for primary, horizontal header, circular Z icon, and reverse footer variants.
- Updated the browser favicon and the brand lockup within the social-preview image.
- Revised responsive header CSS to retain both logo readability and the persistent Halaal badge on narrow viewports.
- Preserved the owner-provided green Halaal asset and its existing five placements; no change to the hero, catalogue, Netlify form or WhatsApp integration.
- Added branding regression tests and QA notes.

# Change Log

## 2026-11-21 — Persistent navigation Halaal badge

Added an always-visible, non-interactive Halaal trust marker to the existing sticky navigation. It uses the owner-supplied green Halaal symbol already bundled in the website plus a restrained pale-sage capsule and "Halaal" label. This makes the message visible immediately, even when the larger hero badge appears below the fold.

- **Desktop:** Badge sits between the navigation links and the existing Place an enquiry CTA.
- **Tablet/mobile:** Badge stays visible beside the brand and navigation toggle. It is not hidden inside the collapsible mobile menu.
- **Hero:** Original Halaal badge and all other Halaal placements remain as they were.
- **Accessibility:** Non-clickable trust marker has the accessible name "All products are Halaal"; no unsupported certification claim.
- **Scope:** Only `index.html`, the existing main/responsive CSS, the Halaal branding regression tests, and documentation were updated. Gallery data, forms, WhatsApp integration and navigation JavaScript were not changed.

**Verification:** 9/9 Node tests passed; a Chromium layout harness checked 14 viewports (320–1440px) with no horizontal overflow, header-item overlaps or JavaScript page errors. Sticky visibility, mobile menu opening/closing, icon loading and hero badge preservation passed. This harness uses locally inlined CSS and images and does not replace a deployed-site browser test.

**Build status:** Vite production build unavailable in this environment: the npm registry could not be resolved (`EAI_AGAIN`). Build on Netlify or a machine with internet access and verify the live form delivery there.


## 2026-11-21 — Halaal branding update

Added the green Halaal symbol supplied by Zorina's Delights. The logo is included as an optimised local image without changing its design, lettering or imagery. The copy reads **“All products are Halaal”** and does not suggest an independent certificate or certifier.

### Website changes

- **Hero:** Compact pale-sage Halaal badge below the primary actions.
- **Collection:** Small Halaal note alongside the catalogue's availability information.
- **Order:** Halaal reassurance badge on the dark order-section sidebar.
- **Footer:** Small Halaal emblem and wording beneath the brand description.
- **Styling:** Reusable badge styles, contrast treatments for light and dark sections, and mobile adjustments.

### Files updated

- `index.html`
- `src/styles/main.css`
- `src/styles/responsive.css`
- `README.md`
- `QA_REPORT.md`

### Files added

- `public/images/halaal-logo.webp`
- `tests/halaal-branding.test.mjs`
- `CHANGELOG.md`

No product prices, product catalogue data, animations, order logic, Netlify Forms configuration, navigation JavaScript or other business features were modified.

### Business-owner note

The owner states that all products are Halaal and provided the graphic. Before public launch, confirm that this remains accurate and that the owner may use the graphic. This update makes **no third-party certification claim**.

## Signature Reveal update

- Added homepage-only, approximately 2.6-second intro using the existing logo vectors and CSS-animated masks, followed by a fade.
- Added early sessionStorage/reduced-motion gate, keyboard dismissal, history cleanup and fail-open watchdog.
- Synchronised original hero and scroll entry animation setup with fade start.
- Added `src/styles/preloader.css`, `src/scripts/preloader.js`, and six regression tests; updated README and QA report.
- Preserved all remaining existing source and assets, including independent `/branding`, all Halaal placements, navigation and order flow. No new npm dependencies.

## 2026-11-22 — Product Catalogue Expansion V2.0

- Replaced the five homepage concept cards with flyer-derived product offerings. Current gallery: **nine** ranges (six frozen savouries and three sweet treats).
- Added category filter buttons (All, Frozen Savouries, Sweet Treats) with `aria-pressed`, visible result counts and keyboard support.
- Added optimised, cropped WebP product imagery from the two new owner-supplied flyers. All promotional image crops are labelled and the original DIY kit artwork remains unchanged.
- Expanded catalogue records with variant prices, pack sizes and quantities. Frozen savoury prices are explicitly **per 100 pieces**. Ready-made koesisters remain **R50 for 12**, while the **DIY kit is R60** as advertised on the older flyer.
- The duplicated Sausage Rolls R480 listing is represented only once. Doughnuts remain enquiry-only with an unconfirmed price and pack size; no totals are inferred.
- Upgraded the existing order form to dynamically populate varieties and pack-aware quantity labels, and to show a quote-required state for unknown prices.
- Updated the WhatsApp and Netlify Forms payloads to include the selected flavour, advertised pack details and estimated total. Continued to distinguish enquiries from completed orders or payments.
- Updated homepage catalogue and surrounding copy. Preserved the existing logo, all five Halaal placements, session-based Signature Reveal, `/branding` page with no homepage link, navigation, privacy disclosure and Netlify configuration.
- New and expanded automated regression tests. No additional packages or dependencies.
