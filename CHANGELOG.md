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
