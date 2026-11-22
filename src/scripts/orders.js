import { availableProducts, estimateFor, formatPrice, getVariants, packDescription } from '../data/products.js';
import { getOrderDetails, getNetlifyPayload, getWhatsAppUrl } from './order-utils.js';

const form = document.querySelector('#order-form');
const formStatus = document.querySelector('#form-status');
const netlifyButton = document.querySelector('#netlify-submit');
const whatsappButton = document.querySelector('#whatsapp-submit');
const summary = document.querySelector('#order-summary');
const success = document.querySelector('#form-success');
const newEnquiry = document.querySelector('#new-enquiry');
const productSelect = document.querySelector('#product');
const variantSelect = document.querySelector('#variant');
const variantField = document.querySelector('#variant-field');
const quantityInput = document.querySelector('#quantity');
const quantityLabel = document.querySelector('#quantity-label');
// Local preview never reports a form submission as delivered.
const netlifyFormsEnabled = import.meta.env?.VITE_NETLIFY_FORMS_ENABLED === 'true';

function setStatus(message, type = '', link = null) {
  if (!formStatus) return;
  formStatus.className = `form-status${type ? ` is-${type}` : ''}`;
  formStatus.replaceChildren(document.createTextNode(message));
  if (link) {
    const anchor = document.createElement('a');
    anchor.href = link;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.textContent = ' Open WhatsApp manually ↗';
    formStatus.append(anchor);
  }
}

function currentProduct() { return availableProducts.find((item) => item.id === productSelect.value); }

function updateVariants() {
  const product = currentProduct();
  const variants = getVariants(product);
  variantSelect.replaceChildren(...variants.map((variant) => {
    const option = document.createElement('option');
    option.value = variant.id;
    option.textContent = product?.variants?.length ? `${variant.name} — ${formatPrice(variant.price)}` : variant.name;
    return option;
  }));
  variantField.hidden = !product || !product.variants?.length;
  variantSelect.disabled = !product;
  quantityLabel.textContent = product?.quantityLabel || 'Quantity';
  quantityInput.value = '1';
  updateSummary();
}

function updateSummary() {
  const product = currentProduct();
  const variant = getVariants(product).find((item) => item.id === variantSelect.value);
  const qty = Number(quantityInput.value);
  const estimate = estimateFor(product, variant?.id, qty);
  const total = summary.querySelector('strong');
  const title = summary.querySelector('span');
  const note = summary.querySelector('small');
  if (!product || !variant || !Number.isSafeInteger(qty) || qty < 1 || qty > 999) {
    total.textContent = '—';
    title.textContent = 'ESTIMATED TOTAL';
    note.textContent = 'Choose a product, variety and valid quantity to preview an estimate.';
    return;
  }
  total.textContent = estimate === null ? 'Quote required' : formatPrice(estimate);
  title.textContent = estimate === null ? 'PRICE ON REQUEST' : 'ESTIMATED FLYER TOTAL';
  note.textContent = product.packSize
    ? `${qty} × ${packDescription(product)} · advertised price, to be confirmed. No payment taken.`
    : 'Price and selling pack size were not supplied. The seller must confirm both.';
}

function validateAndRead() {
  setStatus('');
  form.querySelectorAll('[aria-invalid="true"]').forEach((node) => node.removeAttribute('aria-invalid'));
  if (!form.checkValidity()) { form.reportValidity(); return null; }
  try { return getOrderDetails(new FormData(form)); }
  catch (error) {
    const message = error instanceof Error ? error.message : 'Please check your details.';
    const focusField = message.includes('contact number') ? form.querySelector('#phone')
      : message.includes('variety') ? variantSelect : message.includes('quantity') ? quantityInput : null;
    focusField?.setAttribute('aria-invalid', 'true');
    focusField?.focus();
    setStatus(message, 'error');
    return null;
  }
}

function setSending(sending) {
  netlifyButton.disabled = sending;
  whatsappButton.disabled = sending;
  netlifyButton.querySelector('.button__label').textContent = sending ? 'Sending your enquiry…' : 'Send via website form';
}

export function selectOrderProduct() {
  updateVariants();
  setStatus('');
  productSelect?.focus({ preventScroll: true });
}

export function initOrders() {
  if (!form || !productSelect || !variantSelect || !whatsappButton || !netlifyButton) return;
  updateVariants();
  productSelect.addEventListener('change', () => { updateVariants(); setStatus(''); });
  variantSelect.addEventListener('change', updateSummary);
  quantityInput.addEventListener('input', updateSummary);

  whatsappButton.addEventListener('click', () => {
    const details = validateAndRead();
    if (!details) return;
    const url = getWhatsAppUrl(details);
    window.open(url, '_blank', 'noopener,noreferrer');
    setStatus('A prefilled WhatsApp message is ready. Review and tap Send in WhatsApp; this website has not placed an order.', 'success', url);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!validateAndRead()) return;
    if (!netlifyFormsEnabled) {
      setStatus('Website form delivery is disabled in local builds. Deploy to Netlify with form detection enabled, or choose WhatsApp.', 'error');
      return;
    }
    setSending(true);
    try {
      const body = getNetlifyPayload(new FormData(form));
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!response.ok) throw new Error(`Submission failed (HTTP ${response.status}).`);
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (error) {
      console.error('Order enquiry submission failed:', error);
      setStatus('We could not send your enquiry through the website. Please retry or use WhatsApp instead.', 'error');
    } finally { setSending(false); }
  });

  newEnquiry?.addEventListener('click', () => {
    form.reset();
    updateVariants();
    setStatus('');
    success.hidden = true;
    form.hidden = false;
    productSelect.focus();
  });
}
