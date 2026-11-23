/**
 * Catalogue V2 — transcribed from the owner's two promotional flyers (2026-11-22),
 * plus the existing DIY-kit flyer. All amounts are advertised, unverified prices.
 * A range is one card; its flavours are price-bearing variants.
 * The flyers' savouries are priced PER 100 ITEMS, not individually.
 * Keep unknown prices null; never infer a price or quantity from imagery.
 */
const flyerPhoto = 'Promotional photograph cropped from the supplied flyer; actual appearance may vary.';

export const categories = [
  { id: 'all', label: 'All delights' },
  { id: 'frozen', label: 'Frozen savouries' },
  { id: 'sweet', label: 'Sweet treats' },
];

export const products = [
  {
    id: 'samoosas', name: 'Samoosas', category: 'frozen',
    kicker: 'FROZEN SAVOURIES · 100 PIECES',
    description: 'Choose from chicken, mince or cheese samoosas. Keep frozen as advised on the flyer.',
    variants: [
      { id: 'chicken', name: 'Chicken', price: 400 },
      { id: 'mince', name: 'Mince', price: 500 },
      { id: 'cheese', name: 'Cheese', price: 450 },
    ],
    packSize: 100, packUnit: 'pieces', quantityLabel: 'Packs of 100',
    image: '/images/samoosas-flyer.webp', alt: 'Promotional flyer image showing triangular golden samoosas',
    imageWidth: 720, imageHeight: 590, tone: 'honey', imageNote: flyerPhoto,
  },
  {
    id: 'pies', name: 'Pies', category: 'frozen',
    kicker: 'FROZEN SAVOURIES · 100 PIECES',
    description: 'Mini pies offered in chicken, mince and steak varieties.',
    variants: [
      { id: 'chicken', name: 'Chicken', price: 500 },
      { id: 'mince', name: 'Mince', price: 500 },
      { id: 'steak', name: 'Steak', price: 600 },
    ],
    packSize: 100, packUnit: 'pieces', quantityLabel: 'Packs of 100',
    image: '/images/pies-flyer.webp', alt: 'Promotional flyer image of golden savoury pies',
    imageWidth: 720, imageHeight: 590, tone: 'cream', imageNote: flyerPhoto,
  },
  {
    id: 'spring-rolls', name: 'Spring Rolls', category: 'frozen',
    kicker: 'FROZEN SAVOURIES · 100 PIECES',
    description: 'Vegetable or chicken spring rolls, available in advertised packs of 100.',
    variants: [
      { id: 'vegetable', name: 'Vegetable', price: 420 },
      { id: 'chicken', name: 'Chicken', price: 450 },
    ],
    packSize: 100, packUnit: 'pieces', quantityLabel: 'Packs of 100',
    image: '/images/spring-rolls-flyer.webp', alt: 'Promotional flyer image of crisp filled spring rolls',
    imageWidth: 720, imageHeight: 590, tone: 'apricot', imageNote: flyerPhoto,
  },
  {
    id: 'sausage-rolls', name: 'Sausage Rolls', category: 'frozen',
    kicker: 'FROZEN SAVOURIES · 100 PIECES',
    description: 'Golden savoury sausage rolls, advertised at one price for 100 items.',
    price: 480,
    packSize: 100, packUnit: 'pieces', quantityLabel: 'Packs of 100',
    image: '/images/sausage-rolls-flyer.webp', alt: 'Promotional flyer image of pastry sausage rolls',
    imageWidth: 720, imageHeight: 590, tone: 'cocoa', imageNote: flyerPhoto,
  },
  {
    id: 'quiche', name: 'Quiche', category: 'frozen',
    kicker: 'FROZEN SAVOURIES · 100 PIECES',
    description: 'Choose spinach & feta or chicken & mushroom.',
    variants: [
      { id: 'spinach-feta', name: 'Spinach & Feta', price: 450 },
      { id: 'chicken-mushroom', name: 'Chicken & Mushroom', price: 500 },
    ],
    packSize: 100, packUnit: 'pieces', quantityLabel: 'Packs of 100',
    image: '/images/quiche-flyer.webp', alt: 'Promotional flyer image of a savoury quiche',
    imageWidth: 720, imageHeight: 590, tone: 'sage', imageNote: flyerPhoto,
  },
  {
    id: 'half-moons', name: 'Half Moons', category: 'frozen',
    kicker: 'FROZEN SAVOURIES · 100 PIECES',
    description: 'Half-moon shaped savoury pastries in chicken or steak varieties.',
    variants: [
      { id: 'chicken', name: 'Chicken', price: 500 },
      { id: 'steak', name: 'Steak', price: 550 },
    ],
    packSize: 100, packUnit: 'pieces', quantityLabel: 'Packs of 100',
    image: '/images/half-moons-flyer.webp', alt: 'Promotional flyer image of half-moon pastries',
    imageWidth: 720, imageHeight: 590, tone: 'rose', imageNote: flyerPhoto,
  },
  {
    id: 'ready-koesisters', name: 'Cape Malay Koesisters', category: 'sweet',
    kicker: 'SWEET TREATS · 12 PIECES',
    description: 'Traditional Cape Malay koesisters, described on the flyer as flavoured with cinnamon, aniseed and a hint of ginger.',
    price: 50,
    packSize: 12, packUnit: 'koesisters', quantityLabel: 'Packs of 12',
    image: '/images/ready-koesisters-flyer.webp', alt: 'Promotional flyer image of koesisters coated with coconut',
    imageWidth: 720, imageHeight: 730, tone: 'honey', imageNote: flyerPhoto,
  },
  {
    id: 'doughnuts', name: 'Golden-Brown Doughnuts', category: 'sweet',
    kicker: 'SWEET TREATS · ASK FOR A QUOTE',
    description: 'Freshly made golden-brown doughnuts advertised on the flyer. Price and selling pack size were not supplied.',
    price: null,
    packSize: null, packUnit: null, quantityLabel: 'Requested quantity (ask seller about pack sizes)',
    image: '/images/doughnuts-flyer.webp', alt: 'Promotional flyer image of golden-brown doughnuts',
    imageWidth: 720, imageHeight: 730, tone: 'rose', imageNote: flyerPhoto,
  },
  {
    id: 'koesisters-diy-kit', name: 'Koesisters DIY Kit', category: 'sweet',
    kicker: 'THE ORIGINAL DELIGHT · 12 PIECES',
    description: '12 koesisters, syrup and desiccated coconut. Syrup. Sprinkle. Enjoy.',
    price: 60,
    packSize: 12, packUnit: 'koesisters per kit', quantityLabel: 'DIY kits (12 per kit)',
    image: '/images/koesisters-diy-kit-client-20261123.webp', alt: 'Promotional photo of the Koesisters DIY Kit with syrup, coconut and 12 koesisters',
    imageWidth: 1024, imageHeight: 1536, tone: 'honey', feature: true,
    imageNote: 'Client-supplied product photo for the DIY kit. R60 was advertised on the supplied flyer.',
  },
];

export const availableProducts = products; // All nine are enquiries, not guaranteed stock.
export const formatPrice = (value) => Number.isFinite(value) ? `R${value.toFixed(0)}` : 'Price on request';

export function getVariants(product) {
  return product?.variants?.length ? product.variants : [{ id: 'standard', name: 'Standard', price: product?.price ?? null }];
}
export function getVariant(product, variantId) {
  return getVariants(product).find((variant) => variant.id === variantId);
}
export function minPrice(product) {
  const prices = getVariants(product).map((variant) => variant.price).filter(Number.isFinite);
  return prices.length ? Math.min(...prices) : null;
}
export function estimateFor(product, variantId, quantity) {
  const variant = getVariant(product, variantId);
  if (!variant || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 999 || !Number.isFinite(variant.price)) return null;
  return variant.price * quantity;
}
export function packDescription(product) {
  return product.packSize ? `${product.packSize} ${product.packUnit}` : 'Pack size to confirm with seller';
}
