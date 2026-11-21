import { renderGallery } from './scripts/gallery.js';
import { initNavigation } from './scripts/navigation.js';
import { initOrders, selectOrderProduct } from './scripts/orders.js';
import { initAnimations } from './scripts/animations.js';

renderGallery(selectOrderProduct);
initNavigation();
initOrders();
initAnimations();

document.querySelector('#year').textContent = String(new Date().getFullYear());
