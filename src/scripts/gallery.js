import { availableProducts, products, formatPrice } from '../data/products.js';

const gallery = document.querySelector('#product-gallery');
const productSelect = document.querySelector('#product');

function element(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

function makeProductCard(product, index) {
  const card = element('article', `product-card reveal ${product.concept ? 'product-card--concept' : 'product-card--feature'}`);
  card.style.setProperty('--reveal-delay', `${(index % 3) * 65}ms`);
  const media = element('div', 'product-card__media');
  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.alt;
  image.width = product.imageWidth;
  image.height = product.imageHeight;
  image.loading = index < 2 ? 'eager' : 'lazy';
  image.decoding = 'async';
  const badge = element('span', 'product-card__badge', product.concept ? 'Concept only · not for sale' : 'Featured · enquire');
  media.append(image, badge);

  const body = element('div', 'product-card__body');
  body.append(element('span', 'product-card__kicker', product.kicker));
  body.append(element('h3', 'product-card__name', product.name));
  body.append(element('p', 'product-card__description', product.description));
  const bottom = element('div', 'product-card__bottom');
  if (product.orderable) {
    const price = element('div', 'product-card__price');
    price.append(element('strong', '', formatPrice(product.price)));
    price.append(element('small', '', product.priceNote));
    const button = element('button', 'product-card__action', 'Enquire ↗');
    button.type = 'button';
    button.dataset.product = product.id;
    button.setAttribute('aria-label', `Enquire about ${product.name}`);
    bottom.append(price, button);
    body.append(bottom, element('small', 'product-card__disclaimer', 'Illustrated product artwork. Contents and advertised price are based on the supplied flyer.'));
  } else {
    bottom.append(element('span', 'product-card__unavailable', 'Gallery sample · not available to order'));
    body.append(bottom);
  }
  card.append(media, body);
  return card;
}

export function renderGallery(onProductChosen) {
  if (!gallery || !productSelect) return;
  const fragment = document.createDocumentFragment();
  products.forEach((product, index) => fragment.append(makeProductCard(product, index)));
  gallery.replaceChildren(fragment);

  availableProducts.forEach((product) => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = `${product.name} — advertised ${formatPrice(product.price)}`;
    productSelect.append(option);
  });
  if (availableProducts.length === 1) productSelect.value = availableProducts[0].id;

  gallery.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-product]');
    if (!button || !gallery.contains(button)) return;
    const productId = button.dataset.product;
    if (!availableProducts.some((item) => item.id === productId)) return;
    productSelect.value = productId;
    onProductChosen(productId);
    const order = document.querySelector('#order');
    order?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });
}
