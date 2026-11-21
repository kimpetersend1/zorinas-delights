import { renderGallery } from './scripts/gallery.js';
import { initNavigation } from './scripts/navigation.js';
import { initOrders, selectOrderProduct } from './scripts/orders.js';
import { initAnimations } from './scripts/animations.js';
import { afterSignatureReveal } from './scripts/preloader.js';

renderGallery(selectOrderProduct);
initNavigation();
initOrders();
afterSignatureReveal(initAnimations);

document.querySelector('#year').textContent = String(new Date().getFullYear());
