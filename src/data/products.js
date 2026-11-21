/**
 * Product catalogue. Only entries with orderable: true can be enquired about.
 * The featured price is taken from the supplied flyer and MUST be verified before launch.
 * Placeholder products are illustrative concepts, not actual items for sale.
 */
export const products = [
  {
    id: 'koesisters-diy-kit',
    name: 'Koesisters DIY Kit',
    kicker: 'The featured delight',
    description: '12 koesisters, syrup and desiccated coconut. Syrup. Sprinkle. Enjoy.',
    price: 60,
    priceNote: 'Flyer price · please confirm',
    image: '/images/koesister-kit.svg',
    alt: 'Illustration of golden koesisters, a syrup bottle and a bowl of coconut',
    imageWidth: 900,
    imageHeight: 1100,
    orderable: true,
    concept: false,
    tone: 'honey',
    feature: true,
  },
  {
    id: 'concept-treat-box',
    name: 'The Treat Box',
    kicker: 'A future possibility',
    description: 'A concept tile for a possible future product. No item or price is confirmed.',
    image: '/images/concept-treat-box.svg',
    alt: 'Stylised illustration of a kraft treat box with a decorative bow',
    imageWidth: 900,
    imageHeight: 790,
    orderable: false,
    concept: true,
    tone: 'rose',
  },
  {
    id: 'concept-sharing-tray',
    name: 'A Sharing Tray',
    kicker: 'A future possibility',
    description: 'A concept tile only — product availability and details are unconfirmed.',
    image: '/images/concept-sharing-tray.svg',
    alt: 'Decorative illustration of a serving platter and golden pastries',
    imageWidth: 900,
    imageHeight: 1040,
    orderable: false,
    concept: true,
    tone: 'cream',
  },
  {
    id: 'concept-gifting',
    name: 'A Little Gift',
    kicker: 'A future possibility',
    description: 'A gallery design placeholder, not a currently available product.',
    image: '/images/concept-gifting.svg',
    alt: 'Illustrated gift box with ribbon and paper tag',
    imageWidth: 900,
    imageHeight: 880,
    orderable: false,
    concept: true,
    tone: 'cocoa',
  },
  {
    id: 'concept-weekend',
    name: 'The Weekend Edit',
    kicker: 'A future possibility',
    description: 'Visual concept for an additional range. Not available to order.',
    image: '/images/concept-weekend.svg',
    alt: 'Illustration of a ceramic cup beside a plate and a small sprig',
    imageWidth: 900,
    imageHeight: 1160,
    orderable: false,
    concept: true,
    tone: 'sage',
  },
  {
    id: 'concept-surprise',
    name: 'Something New',
    kicker: 'Watch this space',
    description: 'A labelled placeholder for a product to be announced by the owner.',
    image: '/images/concept-surprise.svg',
    alt: 'Modern illustrated packaging with a question mark and sunshine motifs',
    imageWidth: 900,
    imageHeight: 820,
    orderable: false,
    concept: true,
    tone: 'apricot',
  },
];

export const availableProducts = products.filter((product) => product.orderable);

export const formatPrice = (value) =>
  Number.isFinite(value) ? `R${value.toFixed(0)}` : 'Price on request';
