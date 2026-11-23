import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { availableProducts, categories, estimateFor, formatPrice, getVariant, getVariants, minPrice, products } from '../src/data/products.js';
import { getOrderDetails, getNetlifyPayload, getWhatsAppMessage, getWhatsAppUrl } from '../src/scripts/order-utils.js';

function makeForm(overrides = {}) {
  const values = {
    'form-name': 'zorinas-order', 'customer-name': 'Alex Smith',
    'phone': '+27 82 123 4567', product: 'samoosas', variant: 'chicken',
    quantity: '2', notes: 'Please confirm the collection time',
    consent: 'yes', 'bot-field': '', ...overrides,
  };
  const form = new FormData();
  Object.entries(values).forEach(([key, value]) => form.set(key, value));
  return form;
}

const product = (id) => products.find((item) => item.id === id);

test('nine grouped advertised ranges: six frozen and three sweet, without speculative cards', () => {
  assert.equal(products.length, 9);
  assert.equal(availableProducts.length, 9);
  assert.equal(products.filter((p) => p.category === 'frozen').length, 6);
  assert.equal(products.filter((p) => p.category === 'sweet').length, 3);
  assert.deepEqual(categories.map((c) => c.id), ['all', 'frozen', 'sweet']);
  assert.equal(new Set(products.map((p) => p.id)).size, 9);
  for (const p of products) {
    assert.equal(p.concept, undefined);
    assert.ok(existsSync(new URL(`../public${p.image}`, import.meta.url)), `Missing image: ${p.image}`);
  }
});

test('frozen savouries prices match the owner flyer and are per 100 items', () => {
  const expected = {
    samoosas: [400, 500, 450], pies: [500, 500, 600],
    'spring-rolls': [420, 450], 'sausage-rolls': [480],
    quiche: [450, 500], 'half-moons': [500, 550],
  };
  for (const [id, prices] of Object.entries(expected)) {
    const item = product(id);
    assert.equal(item.packSize, 100, id);
    assert.deepEqual(getVariants(item).map((v) => v.price), prices, id);
  }
  assert.equal(minPrice(product('samoosas')), 400);
  assert.equal(minPrice(product('pies')), 500);
});

test('sweet prices are distinct; doughnut quote and pack size are unknown', () => {
  assert.equal(product('ready-koesisters').price, 50);
  assert.equal(product('ready-koesisters').packSize, 12);
  assert.equal(product('koesisters-diy-kit').price, 60);
  assert.equal(product('koesisters-diy-kit').packSize, 12);
  assert.equal(product('doughnuts').price, null);
  assert.equal(product('doughnuts').packSize, null);
  assert.equal(minPrice(product('doughnuts')), null);
  assert.equal(formatPrice(minPrice(product('doughnuts'))), 'Price on request');
});

test('chosen flavour and quantity yield the correct advertised pack total', () => {
  const details = getOrderDetails(makeForm({ product: 'samoosas', variant: 'mince', quantity: '3' }));
  assert.equal(details.variant.name, 'Mince');
  assert.equal(details.quantity, 3);
  assert.equal(details.estimate, 1500);
  assert.equal(estimateFor(product('quiche'), 'chicken-mushroom', 2), 1000);
  assert.equal(estimateFor(product('pies'), 'steak', 2), 1200);
  assert.equal(estimateFor(product('koesisters-diy-kit'), 'standard', 2), 120);
  assert.equal(estimateFor(product('doughnuts'), 'standard', 2), null);
});

test('tampered or incomplete product and flavour IDs are rejected', () => {
  assert.throws(() => getOrderDetails(makeForm({product: 'concept-treat-box'})), /available product/);
  assert.throws(() => getOrderDetails(makeForm({product: 'pies', variant: 'cheese'})), /valid variety/);
  assert.throws(() => getOrderDetails(makeForm({product: 'samoosas', variant: ''})), /valid variety/);
  assert.throws(() => getOrderDetails(makeForm({product: 'samoosas', variant: 'standard'})), /valid variety/);
  assert.throws(() => getOrderDetails(makeForm({product: 'sausage-rolls', variant: 'chicken'})), /valid variety/);
});

test('invalid quantities, contact data and missing consent are rejected', () => {
  for (const qty of ['0', '-4', '1.5', '1000', 'foo', '']) assert.throws(() => getOrderDetails(makeForm({quantity: qty})), /quantity/);
  assert.throws(() => getOrderDetails(makeForm({phone: '123'})), /contact number/);
  assert.throws(() => getOrderDetails(makeForm({consent: ''})), /contact/);
  assert.throws(() => getOrderDetails(makeForm({notes: 'a'.repeat(601)})), /notes/);
});

test('WhatsApp URL includes flavour, pack size, price and a clear enquiry disclaimer', () => {
  const details = getOrderDetails(makeForm({product: 'pies', variant: 'steak', quantity: '2'}));
  const url = new URL(getWhatsAppUrl(details));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/27828404145');
  const message = url.searchParams.get('text');
  assert.match(message, /Variety: Steak/);
  assert.match(message, /2 pack\(s\) × 100 pieces/);
  assert.match(message, /Advertised price per pack: R600/);
  assert.match(message, /Estimated flyer total: R1200/);
  assert.match(message, /not a confirmed order or payment/);
  assert.equal(message, getWhatsAppMessage(details));
});

test('unknown doughnut pricing creates quote request without inventing units or totals', () => {
  const details = getOrderDetails(makeForm({product: 'doughnuts', variant: 'standard', quantity: '12'}));
  assert.equal(details.estimate, null);
  const message = getWhatsAppMessage(details);
  assert.match(message, /selling unit\/pack size unconfirmed/);
  assert.match(message, /Price on request/);
  assert.doesNotMatch(message, /Estimated flyer total: R\d/);
});

test('Netlify payload retains static form fields and trusted computed product summary', () => {
  const data = new URLSearchParams(getNetlifyPayload(makeForm({product: 'quiche', variant: 'spinach-feta', quantity: '4'})));
  assert.equal(data.get('form-name'), 'zorinas-order');
  assert.equal(data.get('bot-field'), '');
  assert.equal(data.get('customer-name'), 'Alex Smith');
  assert.equal(data.get('product'), 'quiche');
  assert.equal(data.get('variant'), 'spinach-feta');
  assert.equal(data.get('quantity'), '4');
  assert.equal(data.get('consent'), 'yes');
  assert.match(data.get('product-details'), /Spinach & Feta/);
  assert.match(data.get('product-details'), /Estimated flyer total: R1800/);
});

test('HTML includes category filtering and statically detectable Netlify variant/summary fields', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /id="product-filters"/);
  assert.match(html, /id="gallery-count"/);
  assert.match(html, /id="variant" name="variant"/);
  assert.match(html, /name="product-details"/);
  assert.match(html, /data-netlify="true"/);
});
