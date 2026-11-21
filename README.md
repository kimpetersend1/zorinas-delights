# Zorina's Delights — The Sweet Atelier

An original, responsive one-page website for Zorina's Delights built with **vanilla HTML, CSS and JavaScript**, powered by **Vite** and prepared for **Netlify**. No frontend UI framework or database is required.

## What's included

- Sticky navigation with a keyboard-accessible mobile menu and a **permanently visible Halaal badge**, including on narrow phone screens.
- Editorial hero, decorative product illustrations, an about section and a small crop from the supplied flyer labelled as source material.
- Owner-supplied Halaal emblem displayed in the sticky navigation, hero, collection information, order section and footer, with the wording **“All products are Halaal”**.
- Responsive CSS multi-column masonry gallery with **one enquirable product** and **five visibly labelled sample concepts** (not for sale).
- Product selection, quantity and calculated **flyer-price estimate**; product-card enquiries pre-select the relevant item.
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

A visitor selects the advertised **Koesisters DIY Kit**, enters a name, phone number, quantity and optional note, then agrees to contact about the enquiry. Two routes are available:

- **Continue with WhatsApp:** opens a new WhatsApp tab with order details filled in, but does **not** send anything automatically. The visitor reviews and sends the message there.
- **Send via website form:** on a Netlify build, AJAX posts URL-encoded form fields. An inline acknowledgement is shown after a successful HTTP response. A successful HTTP response should be confirmed against the Netlify dashboard.

Both routes are **enquiries only** — no payment, stock reservation, order confirmation, user accounts, or persistent cart is provided.

## Owner sign-off before public launch

Please verify all details taken from the submitted flyer:

| Detail | Currently used | Action before launch |
| --- | --- | --- |
| Business | Zorina's Delights | Confirm styling and spelling |
| Product | Koesisters DIY Kit | Confirm contents and description |
| Kit contents | 12 koesisters, syrup, desiccated coconut | Verify contents |
| Advertised unit price | R60 | **Verify current price** |
| WhatsApp number | 082 840 4145 | **Verify ownership and number** |
| Collection | Bonnie Brae | **Verify collection area, method, timing** |
| About text | Draft with an explicit placeholder notice | Replace with owner's authentic story |
| Gallery concepts | 5 illustrative concept cards, not orderable | Replace with real products, prices and photography when approved |
| Product illustrations | Original SVG artwork | Replace with actual approved photography when available |
| Image from flyer | Small labelled crop of supplied flyer | Confirm public-use permission and quality |
| Halaal status | Owner confirms all products are Halaal; provided green Halaal emblem is displayed | Confirm continued accuracy, the owner's right to use the emblem and whether any separate certification claim is appropriate (no certification claim is made on this website) |
| Legal/privacy | Short process disclosure | Owner to confirm final privacy policy and relevant obligations |

The sample gallery content is explicitly **not an offer of products**. The real kit has a visible note stating that the R60 price is from the flyer and may have changed.

## Editing the site

- **Catalogue:** `src/data/products.js` — each item has `id`, `name`, `description`, `image`, `imageWidth`, `imageHeight`, `orderable`, `concept`, and optional `price`. Do not set `orderable: true` without owner approval and an actual price/offer.
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

Semantic sections, labelled fields, visible focus states, keyboard-operable mobile navigation, alt text, native form validation, status announcements, image dimensions and scroll transitions with reduced-motion support are included. Product illustrations are SVG to minimize bytes and maintain crisp scaling. This is a practical foundation, not a claim of formal WCAG certification.

## Testing and known deployment limits

Run `npm run test` and `npm run build` after installation. **Netlify's live Forms endpoint, notifications, canonical URL and actual public deployment cannot be verified without a deployed Netlify site.** The downloadable project includes no credentials, secrets, payment integrations or backend service.

## Reference documentation

- [Netlify: Forms setup](https://docs.netlify.com/manage/forms/setup/)
- [Netlify: Vite guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/)
- [Netlify: Spam filters](https://docs.netlify.com/manage/forms/spam-filters/)
