import { categories, availableProducts, products, formatPrice, getVariants, minPrice, packDescription } from '../data/products.js';

const gallery = document.querySelector('#product-gallery');
const productSelect = document.querySelector('#product');
const filters = document.querySelector('#product-filters');
const galleryCount = document.querySelector('#gallery-count');

function element(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

function cardFor(product, index) {
  const card = element('article', `product-card reveal product-card--${product.category}`);
  card.dataset.category = product.category;
  card.style.setProperty('--reveal-delay', `${(index % 3) * 65}ms`);
  const media = element('div', 'product-card__media');
  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.alt;
  image.width = product.imageWidth;
  image.height = product.imageHeight;
  image.loading = index < 2 ? 'eager' : 'lazy';
  image.decoding = 'async';
  const badge = element('span', 'product-card__badge', product.category === 'frozen' ? 'Frozen · 100 pieces' : product.packSize ? 'Sweet · Pack of 12' : 'Sweet · Ask for a quote');
  media.append(image, badge);

  const body = element('div', 'product-card__body');
  body.append(element('span', 'product-card__kicker', product.kicker));
  body.append(element('h3', 'product-card__name', product.name));
  body.append(element('p', 'product-card__description', product.description));

  if (product.variants?.length) {
    const variants = element('ul', 'product-card__variants');
    variants.setAttribute('aria-label', `Varieties and advertised prices for ${product.name}`);
    product.variants.forEach(({ name, price }) => {
      const item = element('li', 'product-card__variant');
      item.append(element('span', '', name), element('strong', '', formatPrice(price)));
      variants.append(item);
    });
    body.append(variants);
  }

  const bottom = element('div', 'product-card__bottom');
  const price = element('div', 'product-card__price');
  const minimum = minPrice(product);
  price.append(element('strong', '', minimum === null ? 'Ask for a quote' : `${product.variants?.length ? 'From ' : ''}${formatPrice(minimum)}`));
  price.append(element('small', '', product.packSize ? `Advertised per ${packDescription(product)} · verify price` : 'Price & pack size to confirm'));
  const button = element('button', 'product-card__action', 'Enquire ↗');
  button.type = 'button';
  button.dataset.product = product.id;
  button.setAttribute('aria-label', `Enquire about ${product.name}`);
  bottom.append(price, button);
  body.append(bottom, element('small', 'product-card__disclaimer', product.imageNote));
  card.append(media, body);
  return card;
}

function setFilter(category) {
  if (!categories.some((entry) => entry.id === category)) return;
  let visible = 0;
  gallery.querySelectorAll('.product-card').forEach((card) => {
    const matches = category === 'all' || card.dataset.category === category;
    card.hidden = !matches;
    if (matches) {
      card.classList.add('is-visible'); // No invisible cards when changing filters after initial scroll reveal.
      visible++;
    }
  });
  filters.querySelectorAll('[data-filter]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.filter === category));
  });
  if (galleryCount) galleryCount.textContent = `${visible} ${visible === 1 ? 'range' : 'ranges'} shown`;
}

export function renderGallery(onProductChosen) {
  if (!gallery || !productSelect) return;
  gallery.replaceChildren(...products.map(cardFor));
  if (filters) {
    filters.replaceChildren(...categories.map(({ id, label }) => {
      const button = element('button', 'product-filter', label);
      button.type = 'button';
      button.dataset.filter = id;
      button.setAttribute('aria-pressed', String(id === 'all'));
      return button;
    }));
    filters.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-filter]');
      if (button && filters.contains(button)) setFilter(button.dataset.filter);
    });
  }
  setFilter('all');

  productSelect.replaceChildren(element('option', '', 'Choose a product'));
  productSelect.firstElementChild.value = '';
  categories.filter((category) => category.id !== 'all').forEach((category) => {
    const group = document.createElement('optgroup');
    group.label = category.label;
    availableProducts.filter((product) => product.category === category.id).forEach((product) => {
      const option = document.createElement('option');
      option.value = product.id;
      const minimum = minPrice(product);
      option.textContent = `${product.name} — ${minimum === null ? 'price on request' : `from ${formatPrice(minimum)}`}`;
      group.append(option);
    });
    productSelect.append(group);
  });

  gallery.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-product]');
    if (!button || !gallery.contains(button)) return;
    const productId = button.dataset.product;
    if (!availableProducts.some((item) => item.id === productId)) return;
    productSelect.value = productId;
    onProductChosen(productId);
    document.querySelector('#order')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start',
    });
  });
}
