import { business } from '../data/business.js';
import { availableProducts, estimateFor, formatPrice, getVariant, getVariants, packDescription } from '../data/products.js';

export function getOrderDetails(formData) {
  const productId = String(formData.get('product') || '').trim();
  const product = availableProducts.find((item) => item.id === productId);
  if (!product) throw new Error('Please choose an available product.');

  const variants = getVariants(product);
  // A single-price product uses its 'standard' option, even in a legacy form.
  const variantId = String(formData.get('variant') || (variants.length === 1 ? variants[0].id : '')).trim();
  const variant = getVariant(product, variantId);
  if (!variant) throw new Error('Please choose a valid variety for this product.');

  const name = String(formData.get('customer-name') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const notes = String(formData.get('notes') || '').trim();
  const quantity = Number(String(formData.get('quantity') || '').trim());
  if (name.length < 2 || name.length > 100) throw new Error('Please enter your name (2–100 characters).');
  if (phone.replace(/\D/g, '').length < 7 || phone.length > 30) throw new Error('Please enter a valid contact number.');
  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 999) {
    throw new Error('Please enter a whole-number quantity between 1 and 999.');
  }
  if (notes.length > 600) throw new Error('Please shorten your notes to 600 characters.');
  if (String(formData.get('consent') || '') !== 'yes') throw new Error('Please confirm that we may contact you about this enquiry.');

  return { product, variant, name, phone, notes, quantity, estimate: estimateFor(product, variant.id, quantity) };
}

export function getOrderSummaryText({ product, variant, quantity, estimate }) {
  return [
    `Product: ${product.name}`,
    ...(product.variants?.length ? [`Variety: ${variant.name}`] : []),
    `Requested quantity: ${product.packSize ? `${quantity} pack(s) × ${packDescription(product)}` : `${quantity} requested (selling unit/pack size unconfirmed)`}`,
    `Advertised price per pack: ${formatPrice(variant.price)}${product.packSize ? ` (${packDescription(product)})` : ' (pack size unconfirmed)'}`,
    `Estimated flyer total: ${estimate === null ? 'Price on request' : formatPrice(estimate)} (to be confirmed)`,
  ].join('\n');
}

export function getWhatsAppMessage(details) {
  const { name, phone, notes } = details;
  return [
    `Hello ${business.name}!`, '', 'I would like to enquire about:',
    getOrderSummaryText(details), '',
    `Name: ${name}`, `Contact number: ${phone}`,
    ...(notes ? [`Notes: ${notes}`] : []), '',
    `This is not a confirmed order or payment. Please confirm product availability, pack size, final price and collection arrangements in ${business.collectionArea}.`,
  ].join('\n');
}

export function getWhatsAppUrl(details) {
  return `https://wa.me/${business.phoneDigits}?text=${encodeURIComponent(getWhatsAppMessage(details))}`;
}

/** Netlify's HTML build detection can see the static product-details field. */
export function getNetlifyPayload(formData) {
  const details = getOrderDetails(formData);
  const payload = new URLSearchParams();
  for (const [key, value] of formData.entries()) payload.append(key, String(value));
  payload.set('form-name', 'zorinas-order');
  payload.set('variant', details.variant.id);
  payload.set('product-details', getOrderSummaryText(details));
  return payload.toString();
}
