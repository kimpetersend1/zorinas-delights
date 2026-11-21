import test from 'node:test';
import assert from 'node:assert/strict';
import { availableProducts, formatPrice, products } from '../src/data/products.js';
import { getOrderDetails, getNetlifyPayload, getWhatsAppMessage, getWhatsAppUrl } from '../src/scripts/order-utils.js';

const validForm = () => new FormData();
function makeForm(overrides = {}) {
  const values = {
    'form-name': 'zorinas-order',
    'customer-name': 'Alex Smith',
    'phone': '+27 82 123 4567',
    'product': 'koesisters-diy-kit',
    'quantity': '2',
    'notes': 'Please confirm the collection time',
    'consent': 'yes',
    'bot-field': '',
    ...overrides,
  };
  const form = validForm();
  Object.entries(values).forEach(([key, value]) => form.set(key, value));
  return form;
}

test('only the advertised kit is orderable; all five additional gallery cards are clearly concepts', () => {
  assert.equal(products.length, 6);
  assert.equal(availableProducts.length, 1);
  assert.equal(products.filter((product) => product.concept).length, 5);
  assert.equal(products.find((product) => product.id === 'koesisters-diy-kit').price, 60);
});

test('valid order details preserve customer intent', () => {
  const details = getOrderDetails(makeForm());
  assert.equal(details.name, 'Alex Smith');
  assert.equal(details.quantity, 2);
  assert.equal(details.product.id, 'koesisters-diy-kit');
  assert.equal(formatPrice(details.product.price * details.quantity), 'R120');
});

test('non-orderable catalogue concept is rejected even if form is modified', () => {
  assert.throws(() => getOrderDetails(makeForm({product: 'concept-treat-box'})), /available product/);
});

test('invalid quantities, short phone numbers, and missing consent are rejected', () => {
  for (const qty of ['0', '-4', '1.5', '1000', 'foo', '']) {
    assert.throws(() => getOrderDetails(makeForm({quantity: qty})), /quantity/);
  }
  assert.throws(() => getOrderDetails(makeForm({phone: '123'})), /contact number/);
  assert.throws(() => getOrderDetails(makeForm({consent: ''})), /contact/);
});

test('WhatsApp enquiry uses an international number and clearly says it is not confirmed', () => {
  const details = getOrderDetails(makeForm());
  const uri = new URL(getWhatsAppUrl(details));
  assert.equal(uri.hostname, 'wa.me');
  assert.equal(uri.pathname, '/27828404145');
  const message = uri.searchParams.get('text');
  assert.match(message, /Koesisters DIY Kit/);
  assert.match(message, /Quantity: 2/);
  assert.match(message, /not a confirmed order or payment/);
  assert.equal(message, getWhatsAppMessage(details));
});

test('Netlify AJAX payload retains the form registration name, honeypot and enquiry fields', () => {
  const encoded = getNetlifyPayload(makeForm());
  const data = new URLSearchParams(encoded);
  assert.equal(data.get('form-name'), 'zorinas-order');
  assert.equal(data.get('bot-field'), '');
  assert.equal(data.get('customer-name'), 'Alex Smith');
  assert.equal(data.get('quantity'), '2');
  assert.equal(data.get('consent'), 'yes');
});
