# Zorina's Delights — The Sweet Atelier

An original, responsive one-page website for Zorina's Delights built with **vanilla HTML, CSS and JavaScript**, powered by **Vite** and prepared for **Netlify**. No frontend UI framework or database is required.

## What's included

- Sticky navigation with a keyboard-accessible mobile menu and a **permanently visible Halaal badge**, including on narrow phone screens.
- Editorial hero, decorative product illustrations, an about section and a small crop from the supplied flyer labelled as source material.
- Owner-supplied Halaal emblem displayed in the sticky navigation, hero, collection information, order section and footer, with the wording **“All products are Halaal”**.
- Responsive, category-filterable CSS masonry gallery with **nine enquiry-enabled product ranges** (six frozen savouries, three sweet treats) derived from the owner-supplied flyers, with clearly labelled unconfirmed prices.
- Product and variety selection, pack-aware quantities and calculated **flyer-price estimates**; each card pre-selects its product. Doughnuts show **Quote required** because their price and selling pack size were not supplied.
- Two separate order routes: WhatsApp opens a prefilled message **which the customer must send**, and Netlify Forms posts an AJAX enquiry to Netlify after deployment.
- Success and error feedback, honeypot field, explicit contact consent, and brief privacy information.
- On-scroll reveals and hover treatments with `prefers-reduced-motion` support.
- SEO/social metadata, SVG favicon, locally stored decorative artwork, social preview, and deployment configuration.


## Brand refresh: Concept 1 — Elegant Editorial Wordmark

The new logo is installed in the **sticky header**, the **footer** and the **favicon**, and the social-preview card has been updated. This replaces the previous text-and-star website logo, **not** the separate green Halaal emblem. No gallery or order functionality was changed for the logo update.

All new files are under `public/branding/`. They are transparent where appropriate and reference the owner's chosen Concept 1 direction:

| Asset | Purpose |
| --- | --- |
| `logo-primary.svg` | Full-size, transparent vector; script + DELIGHTS + caramel heart flourish |
| `logo-primary.png` / `.webp` | Transparent raster versions of the primary mark |
| `logo-horizontal.svg` | Space-saving header lockup, without the extended flourish |
| `logo-horizontal.png` / `.webp` | Transparent raster copies of the header lockup |
| `logo-mark.svg` / `.png` | Compact circular **Z** and heart monogram for icons or labels |
| `logo-footer.svg` | Light-on-dark reverse logo used on the dark footer |
| `logo-footer.png` / `.webp` | Transparent raster copies of the reverse logo |
| `../favicon.svg` | Simplified, small-size browser favicon in the same palette |

**Brand palette:** cocoa `#5B3826`, caramel `#C68A49`, ivory `#FFF0D8`, honey highlight `#E8AF75`.

**Where it is wired up:** `index.html` references `logo-mark.svg` and `logo-horizontal.svg` in the header and `logo-footer.svg` in the footer. Styling lives in `src/styles/main.css` and `src/styles/responsive.css`. Mobile navigation intentionally hides the extra circular mark while retaining the full brand name in a compact horizontal lockup so that the Halaal badge and menu button remain visible. These logo assets are traced/cleaned reproductions of an AI-generated design concept, not a typeset source font or a hand-drawn vector master. Review final print artwork with a designer before large-format production.

**To swap the logo later:** replace the matching SVGs while retaining their viewBox proportions, or adjust `.brand__wordmark` sizing in responsive CSS. Keep the Halaal logo and its copy separate; no certification claim is made.

## Product Catalogue Expansion V2.0 (2026-11-22)

**Flyer-derived product ranges:**

| Product range | Advertised varieties / prices | Pack size |
|---|---|---|
| Samoosas | Chicken R400; Mince R500; Cheese R450 | 100 pieces |
| Pies | Chicken R500; Mince R500; Steak R600 | 100 pieces |
| Spring Rolls | Vegetable R420; Chicken R450 | 100 pieces |
| Sausage Rolls | R480 | 100 pieces |
| Quiche | Spinach & Feta R450; Chicken & Mushroom R500 | 100 pieces |
| Half Moons | Chicken R500; Steak R550 | 100 pieces |
| Cape Malay Koesisters | R50 | 12 |
| Golden-Brown Doughnuts | **Price on request** | **Unspecified** |
| Koesisters DIY Kit | R60, 12 koesisters plus syrup and coconut | One kit |

The six frozen ranges are priced per **100 items**, not per piece. The new flyer lists Sausage Rolls twice (once under the Spring Rolls block); V2 represents it only once, pending seller confirmation. The two types of koesisters are separate products with distinct flyer prices. **All prices are unverified advertisements.**

Products use cropped imagery from the owner-supplied flyers and each card explicitly states that these are promotional photos and actual appearance may vary. The original DIY kit illustration is unchanged.

**Order flow:** Filter by All / Frozen Savouries / Sweet Treats; select a product from a card or the form; choose a variety when relevant; enter a pack quantity; review the *estimated* total, or a quote-required state for doughnuts; use WhatsApp or Netlify Forms. The WhatsApp enquiry includes the variety, amount, pack size and estimate. The Netlify submission contains the same computed summary in the statically declared `product-details` field. Nothing is charged or reserved. The form supports **one product range per enquiry**, not a multi-product basket.

**V2 changes:** `src/data/products.js`, `src/scripts/gallery.js`, `src/scripts/orders.js`, `src/scripts/order-utils.js`, `index.html`, `src/styles/components.css`, new `public/images/*-flyer.webp` images, updated tests, this README, `CHANGELOG.md` and `QA_REPORT.md`. No new npm dependencies, branding changes or additional homepage links to `/branding`.

## Quick start

Requires **Node.js 22** (configured for Netlify). From the project folder:

```bash
npm install
npm run dev
```

Open the local address printed by Vite (typically `http://localhost:5173`).

```bash
npm run test    # Node's built-in test runner; no extra testing packages
npm run build   # creates dist/
npm run preview # locally previews dist/
```

The standard local build deliberately **does not send Netlify form enquiries**, since a local web server is not Netlify's submission service. WhatsApp links can still be tested, but use test contact details and do not submit real orders before the business owner signs off.

## Deploy to Netlify

1. Push the project to a Git repository and import it into Netlify (or use an equivalent repository deployment flow).
2. `netlify.toml` specifies `npm run build`, `dist`, and Node 22. Netlify installs dependencies during build.
3. In Netlify's project dashboard, check **Forms → Form detection** and enable form detection if necessary. Re-deploy **after** enabling it.
4. The order form is present in **index.html at build time** with `name="zorinas-order"`, `data-netlify="true"`, `netlify-honeypot="bot-field"`, and `form-name="zorinas-order"`. It does **not** rely on JavaScript for form discovery.
5. `VITE_NETLIFY_FORMS_ENABLED = "true"` is set in `netlify.toml`. This is a public feature switch, **not** a secret. It enables submission only in the Netlify build.
6. Perform a real test enquiry on the deployed site; verify receipt in **Forms → Verified submissions**, and review spam handling and submission notifications. A local successful fetch response is not evidence of Netlify delivery.
7. Set up any intended email notifications and confirm how the business handles customer contact information.

**Important:** If a site is built outside Netlify with `VITE_NETLIFY_FORMS_ENABLED=true`, the app will attempt an AJAX POST but no guarantee exists that a static preview server handles it. Only treat the route as functional after a real verified Netlify submission.

## Ordering workflow

A visitor selects one of the nine advertised product ranges, chooses a variety where applicable, specifies how many advertised packs (or a requested amount for doughnuts), enters contact details and optional notes, and consents to contact. There are two routes:

- **Continue with WhatsApp:** opens a new WhatsApp tab with order details filled in, but does **not** send anything automatically. The visitor reviews and sends the message there.
- **Send via website form:** on a Netlify build, AJAX posts URL-encoded form fields. An inline acknowledgement is shown after a successful HTTP response. A successful HTTP response should be confirmed against the Netlify dashboard.

Both routes are **enquiries only** — no payment, stock reservation, order confirmation, user accounts, or persistent cart is provided.

## Owner sign-off before public launch

Please verify all details taken from the three supplied flyers:

| Detail | Currently used | Action before launch |
| --- | --- | --- |
| Business | Zorina's Delights | Confirm styling and spelling |
| Product catalogue | Nine ranges: six frozen savouries, Cape Malay koesisters, doughnuts and DIY kit | **Confirm availability, varieties and whether all items remain offered** |
| Kit contents | 12 koesisters, syrup, desiccated coconut | Verify contents |
| Advertised prices | Frozen savouries R400–R600 per 100, koesisters R50 per 12, DIY kit R60 | **Confirm every current price and pack size** |
| Doughnuts | Price and selling pack size not supplied | **Provide a confirmed price, unit and ordering quantity** |
| Duplicate flyer entry | Sausage Rolls R480 also appears in the Spring Rolls price list | **Confirm it is one product at R480 / 100** |
| WhatsApp number | 082 840 4145 | **Verify ownership and number** |
| Collection | Bonnie Brae | **Verify collection area, method, timing** |
| About text | Draft with an explicit placeholder notice | Replace with owner's authentic story |
| Old gallery concepts | Removed from the homepage; original files remain in the brand library | Keep or archive illustration assets according to brand requirements |
| Product imagery | Eight cropped promotional images from the supplied new flyers; DIY remains illustrated | **Confirm rights to use and that the promotional photos represent actual offerings** |
| Image from flyer | Small labelled crop of supplied flyer | Confirm public-use permission and quality |
| Halaal status | Owner confirms all products are Halaal; provided green Halaal emblem is displayed | Confirm continued accuracy, the owner's right to use the emblem and whether any separate certification claim is appropriate (no certification claim is made on this website) |
| Legal/privacy | Short process disclosure | Owner to confirm final privacy policy and relevant obligations |

Each gallery listing is a product **enquiry**, not an availability guarantee or a binding offer. All amounts remain subject to the seller’s confirmation; doughnuts deliberately have no invented price.

## Editing the site

- **Catalogue:** `src/data/products.js` — each product has an `id`, `category`, `name`, description, image dimensions and pack information. A product either has a `price` or a `variants` array (`id`, `name`, `price` per advertised pack). Use `price: null` for prices not provided; never invent a value. Prices must be confirmed with the owner before launch. The exported `categories` drive the gallery filter and form groups. `getVariants`, `minPrice` and `estimateFor` centralise calculations.
- **Phone and collection area:** `src/data/business.js` — use international digits (e.g. `27…`) for `phoneDigits`. **The footer also currently prints the phone and collection area** in `index.html`, so update them there too. A future enhancement could centralise these static footer fields.
- **Content:** `index.html`.
- **Main visual system:** `src/styles/main.css`; product and order components: `src/styles/components.css`; breakpoints: `src/styles/responsive.css`.
- **Interactions:** `src/scripts/`.
- **Illustrations:** `public/images/`. Original vector assets can be regenerated with `python3 scripts/generate-art.py` (Python standard library only).
- **Halaal logo:** `public/images/halaal-logo.webp` is a web-optimised version of the supplied green circular Halaal graphic, without altering its wording or symbol. Its five placements are in `index.html`, styled in `src/styles/main.css` and `src/styles/responsive.css`. The owner states that all products are Halaal. The site intentionally does **not** claim third-party certification.

All dynamic gallery content is inserted using `textContent` and DOM creation rather than HTML interpolation from user input.

## SEO and social previews

`public/social-preview.jpg`, Open Graph and Twitter metadata are included. When the production build environment provides Netlify's actual HTTPS `URL` (or `SITE_URL` / `VITE_SITE_URL`), `scripts/postbuild.mjs` creates `dist/sitemap.xml`, inserts the **real** canonical URL and absolute social-image URLs, and adds the sitemap address to `dist/robots.txt`.

If no valid HTTPS domain is known (such as during a local build), the script intentionally **skips canonical and sitemap generation** rather than publishing a fabricated URL. After enabling a custom domain, perform another production deployment and check canonical and social metadata in the deployed HTML.

External Google Fonts are requested when online; system fonts serve as fallbacks when offline or blocked. Product illustrations and social preview are local assets. The small cropped flyer image is a locally stored WebP.

## Project map

```text
index.html
netlify.toml
package.json
public/
  favicon.svg
  robots.txt
  social-preview.jpg
  images/            # includes halaal-logo.webp, supplied by business owner
src/
  main.js
  data/            # products and business configuration
  scripts/         # gallery, ordering, navigation, animations
  styles/          # base, components, responsive
tests/             # Node tests for catalogue and order helpers
scripts/
  generate-art.py  # local original SVG illustrations
  postbuild.mjs    # canonical / sitemap for real site URL
```

## Accessibility & performance notes

Semantic sections, labelled fields, visible focus states, keyboard-operable mobile navigation, alt text, native form validation, status announcements, image dimensions and scroll transitions with reduced-motion support are included. The original DIY and hero illustrations are SVG; the eight new client-flyer image crops are optimised WebP. Lower gallery images load lazily. This is a practical foundation, not a claim of formal WCAG certification.

## Testing and known deployment limits

Run `npm run test` and `npm run build` after installation. **Netlify's live Forms endpoint, notifications, canonical URL and actual public deployment cannot be verified without a deployed Netlify site.** The downloadable project includes no credentials, secrets, payment integrations or backend service.

## Reference documentation

- [Netlify: Forms setup](https://docs.netlify.com/manage/forms/setup/)
- [Netlify: Vite guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/)
- [Netlify: Spam filters](https://docs.netlify.com/manage/forms/spam-filters/)

## Standalone brand library

Open `http://localhost:5173/branding/` after starting Vite, or append `/branding` to the deployed Netlify site's URL. This is an independent HTML entry (`branding/index.html`) configured alongside the existing homepage in `vite.config.js`. The production build is expected to emit `dist/branding/index.html`; confirm this and the direct URL when deploying. No SPA catch-all redirect is required.

The library showcases all four logo lockups and available export formats, the existing brand palette and font pairing, favicon, social preview, owner-supplied Halaal emblem, brand presentation, product/hero illustrations and supplied flyer crop. The downloadable logo ZIP is identical to the previously delivered Concept 1 logo pack. Individual download links point to bundled files; clipboard controls require a supported browser and a secure origin (HTTPS or localhost). A readable manual-copy fallback is included.

The homepage is unmodified and has no navigation link to the brand library. The library uses `noindex, follow` and is excluded from the generated sitemap. These measures do not make it private: anyone with the URL can open the page. No authentication was requested. Keep the Halaal and flyer-use permissions and commercial artwork review requirements in mind when sharing assets.

The brand library retains its independent `src/styles/branding.css` and `src/branding.js`. Catalogue and ordering files are now updated independently as part of V2. Remove neither the `/branding/` public assets nor the `/branding/index.html` source when maintaining the project.

## The Signature Reveal (homepage introduction)

The homepage now displays the approved Concept 1 wordmark on a warm ivory full-screen overlay. It uses inline SVG masks over the original vector paths, native CSS keyframes and a small vanilla JS lifecycle. No new dependencies are required.

- Timeline: signature from 0.06–1.11s, DELIGHTS from 0.98–1.34s, caramel flourish from 1.28–1.88s, short hold, fade from 2.0–2.6s. The original hero entrance and scroll reveal setup start at the beginning of the fade.
- Playback: once per page session (normally a tab's lifetime, including refreshes; browser session restoration or tab duplication may retain sessionStorage). The `/branding/` entry never runs the introduction. It does not add any links to the homepage.
- Accessibility and fallback: reduced-motion visitors skip it; Tab or Escape dismisses it immediately; the overlay is decorative and hidden from assistive technology. With JavaScript disabled or storage inaccessible it stays hidden. A 3-second watchdog in the early inline gate removes the overlay and releases the homepage if CSS animation events or the main module fail. A pagehide cleanup prevents a stale overlay when restoring from browser history. The watchdog is a fail-open deadline; unusually slow stylesheet loading can shorten the introductory sequence.
- Modify the timing and mask paths in `src/styles/preloader.css` and the inline SVG in `index.html`. If changing the total duration, also adjust the watchdog in the head script. The logo geometry is copied verbatim from `public/branding/logo-primary.svg` and split into masks, not redrawn; update those groups when replacing the approved logo.
- To replay during development, open DevTools Console and run `sessionStorage.removeItem('zorinas.signature-reveal.v1'); location.reload();` or open a fresh independent tab. Do not add this command to production code.

Run `npm install`, `npm test`, `npm run dev` and `npm run build` on your development machine. On Netlify, confirm the first homepage visit plays, refresh skips, /branding works independently, and the order form remains operational. The intro does not wait for every network request; it is a branded transition, not an indication of actual loading progress.
