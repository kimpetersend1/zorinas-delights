import { availableProducts, formatPrice } from '../data/products.js';
import { getOrderDetails, getNetlifyPayload, getWhatsAppUrl } from './order-utils.js';

const form = document.querySelector('#order-form');
const formStatus = document.querySelector('#form-status');
const netlifyButton = document.querySelector('#netlify-submit');
const whatsappButton = document.querySelector('#whatsapp-submit');
const summary = document.querySelector('#order-summary');
const success = document.querySelector('#form-success');
const newEnquiry = document.querySelector('#new-enquiry');
const productSelect = document.querySelector('#product');
const quantityInput = document.querySelector('#quantity');
// Netlify sets this build-time flag via netlify.toml. Local builds do not claim live form delivery.
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

function updateSummary() {
  const product = availableProducts.find((item) => item.id === productSelect?.value);
  const qty = Number(quantityInput?.value);
  const calculated = product && Number.isSafeInteger(qty) && qty > 0 && qty <= 999
    ? `${formatPrice(product.price * qty)}` : '—';
  const label = summary?.querySelector('strong');
  if (label) label.textContent = calculated;
}

function validateAndRead() {
  setStatus('');
  form.querySelectorAll('[aria-invalid="true"]').forEach((node) => node.removeAttribute('aria-invalid'));
  if (!form.checkValidity()) {
    form.reportValidity();
    return null;
  }
  try {
    return getOrderDetails(new FormData(form));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Please check your details.';
    const phone = form.querySelector('#phone');
    if (message.includes('contact number')) {
      phone?.setAttribute('aria-invalid', 'true');
      phone?.focus();
    }
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
  updateSummary();
  setStatus('');
  productSelect?.focus({ preventScroll: true });
}

export function initOrders() {
  if (!form || !productSelect || !whatsappButton || !netlifyButton) return;
  updateSummary();
  productSelect.addEventListener('change', updateSummary);
  quantityInput.addEventListener('input', updateSummary);

  whatsappButton.addEventListener('click', () => {
    const details = validateAndRead();
    if (!details) return;
    const url = getWhatsAppUrl(details);
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    // Some browsers return null despite opening a tab; always include a fallback URL.
    setStatus('A prefilled WhatsApp message has been prepared. Review it and tap Send in WhatsApp; this website has not placed the order.', 'success', url);
    void opened;
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const details = validateAndRead();
    if (!details) return;
    if (!netlifyFormsEnabled) {
      setStatus('Website form delivery is disabled in local builds. Deploy to Netlify with form detection enabled, or choose WhatsApp to send your enquiry.', 'error');
      return;
    }

    setSending(true);
    try {
      const body = getNetlifyPayload(new FormData(form));
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!response.ok) throw new Error(`Submission failed (HTTP ${response.status}).`);
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (error) {
      console.error('Order enquiry submission failed:', error);
      setStatus('We could not send your enquiry through the website. Please retry or use WhatsApp instead.', 'error');
    } finally {
      setSending(false);
    }
  });

  newEnquiry?.addEventListener('click', () => {
    form.reset();
    if (availableProducts.length === 1) productSelect.value = availableProducts[0].id;
    updateSummary();
    setStatus('');
    success.hidden = true;
    form.hidden = false;
    productSelect.focus();
  });
}
