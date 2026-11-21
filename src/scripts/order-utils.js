import { business } from '../data/business.js';
import { availableProducts, formatPrice } from '../data/products.js';

export function getOrderDetails(formData) {
  const productId = String(formData.get('product') || '').trim();
  const product = availableProducts.find((item) => item.id === productId);
  const name = String(formData.get('customer-name') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const notes = String(formData.get('notes') || '').trim();
  const quantityRaw = String(formData.get('quantity') || '').trim();
  const quantity = Number(quantityRaw);

  if (!product) throw new Error('Please choose an available product.');
  if (name.length < 2) throw new Error('Please enter your name.');
  if (phone.replace(/\D/g, '').length < 7) throw new Error('Please enter a valid contact number.');
  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 999) {
    throw new Error('Please enter a whole-number quantity between 1 and 999.');
  }
  if (notes.length > 600) throw new Error('Please shorten your notes to 600 characters.');
  if (String(formData.get('consent') || '') !== 'yes') {
    throw new Error('Please confirm that we may contact you about this enquiry.');
  }

  return { product, name, phone, notes, quantity };
}

export function getWhatsAppMessage({ product, name, phone, notes, quantity }) {
  const lines = [
    `Hello ${business.name}!`,
    '',
    'I would like to enquire about:',
    `Product: ${product.name}`,
    `Quantity: ${quantity}`,
    `Advertised unit price: ${formatPrice(product.price)} (to be confirmed)`,
    '',
    `Name: ${name}`,
    `Contact number: ${phone}`,
    ...(notes ? [`Notes: ${notes}`] : []),
    '',
    `I understand this is an enquiry, not a confirmed order or payment. Please confirm availability, pricing and collection in ${business.collectionArea}.`,
  ];
  return lines.join('\n');
}

export function getWhatsAppUrl(details) {
  return `https://wa.me/${business.phoneDigits}?text=${encodeURIComponent(getWhatsAppMessage(details))}`;
}

export function getNetlifyPayload(formData) {
  const payload = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    payload.append(key, String(value));
  }
  payload.set('form-name', 'zorinas-order');
  return payload.toString();
}
