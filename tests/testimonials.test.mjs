import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { initTestimonials } from '../src/scripts/testimonials.js';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const html = read('index.html');
const section = html.match(/<section class="sweet-words[\s\S]*?<\/section>/)?.[0] ?? '';

test('four genuine static reviews, no invented names or ratings, just before order', () => {
  assert.equal((section.match(/<blockquote>/g) || []).length, 4);
  assert.equal((section.match(/>Anonymous customer<\/figcaption>/g) || []).length, 4);
  for (const text of ['past five years', 'little slice of home', 'expertise bar none', 'doughnuts are definitely my favourite']) assert.ok(section.includes(text));
  assert.ok(html.indexOf(section) > html.indexOf('id="collection"'));
  assert.ok(html.indexOf(section) < html.indexOf('id="order"'));
  assert.doesNotMatch(html, /href=["']#testimonials["']/);
  assert.doesNotMatch(read('branding/index.html'), /sweet-words/);
});

test('existing Vite entry and scripts plus new carousel import and stylesheet are present', () => {
  for (const file of ['src/main.js', 'src/styles/testimonials.css', 'src/scripts/testimonials.js']) assert.ok(existsSync(new URL(`../${file}`, import.meta.url)));
  assert.match(html, /src="\/src\/main\.js"/);
  assert.match(html, /href="\/src\/styles\/testimonials\.css"/);
  assert.match(read('src/main.js'), /initTestimonials\(\);/);
  const { scripts } = JSON.parse(read('package.json'));
  assert.equal(scripts.dev, 'vite');
  assert.match(scripts.build, /vite build/);
  assert.equal(scripts.preview, 'vite preview');
});

function node(children = []) {
  const attrs = new Map(), classes = new Set(), handlers = new Map();
  return { attrs, classes, children, textContent: '', hidden: true, scrollLeft: 20,
    classList: { contains: c => classes.has(c), add: c => classes.add(c), toggle: (c, v) => v ? classes.add(c) : classes.delete(c) },
    setAttribute: (k, v) => attrs.set(k, v), removeAttribute: k => attrs.delete(k),
    append(...items) { children.push(...items); }, cloneNode() { return node([...children]); },
    addEventListener: (k, fn) => { const list = handlers.get(k) || []; list.push(fn); handlers.set(k, list); },
    fire: (k, evt = {}) => (handlers.get(k) || []).forEach(fn => fn(evt)) };
}
function fixture(reduced = false) {
  const groups = [node([node(), node()]), node([node(), node()])];
  const tracks = groups.map(group => node([group]));
  tracks.forEach((track, i) => track.querySelector = () => groups[i]);
  const rows = tracks.map(track => { const row = node(); row.querySelector = () => track; return row; });
  const root = node(), button = node(), label = node(), icon = node();
  const lookup = {'[data-sw-pause]':button,'[data-sw-label]':label,'.sweet-words__pause-icon':icon};
  root.querySelector = s => lookup[s] || null; root.querySelectorAll = () => rows;
  return { doc: { querySelector: () => root, defaultView: {matchMedia: () => ({matches: reduced})} }, root, button, label, rows, tracks, groups };
}
test('each row gets exactly three equal visual copies, hidden from assistive technology; initialization is idempotent', () => {
  const f = fixture(); initTestimonials(f.doc); initTestimonials(f.doc);
  assert.equal(f.button.hidden,false);
  for (const track of f.tracks) {
    assert.equal(track.children.length, 4);
    assert.equal(track.children[0].attrs.has('aria-hidden'),false);
    for (const copy of track.children.slice(1)) {
      assert.equal(copy.attrs.get('aria-hidden'),'true'); assert.ok(copy.attrs.has('inert'));
      assert.ok(copy.classes.has('sweet-words__copy')); assert.equal(copy.children.length,2);
    }
  }
});
test('pause and resume give keyboard and native touch browsing of original reviews', () => {
  const f = fixture(); initTestimonials(f.doc); f.button.fire('click');
  assert.ok(f.root.classes.has('is-browsing')); assert.equal(f.button.attrs.get('aria-pressed'),'true');
  assert.equal(f.label.textContent,'Resume movement');
  assert.equal(f.rows[0].attrs.get('tabindex'),'0');
  f.button.fire('click'); assert.ok(!f.root.classes.has('is-browsing')); assert.equal(f.rows[0].scrollLeft,0);
  f.rows[0].fire('pointerdown',{pointerType:'mouse'}); assert.ok(!f.root.classes.has('is-browsing'));
  f.rows[0].fire('pointerdown',{pointerType:'touch'}); assert.ok(f.root.classes.has('is-browsing'));
});
test('absent or incomplete markup fails open; reduced motion does not trigger touch browsing', () => {
  assert.doesNotThrow(() => initTestimonials({querySelector: () => null}));
  const f = fixture(); f.root.querySelector = () => null; initTestimonials(f.doc);
  assert.equal(f.root.classes.has('is-enhanced'), false); assert.equal(f.button.hidden, true);
  const reduced = fixture(true); initTestimonials(reduced.doc);
  reduced.rows[0].fire('pointerdown',{pointerType:'touch'}); assert.ok(!reduced.root.classes.has('is-browsing'));
  assert.match(section, /data-sw-pause[^>]+hidden/);
});
test('two opposing full-bleed tracks use seamless equal-group translation, edge fades and reduced motion', () => {
  assert.equal((section.match(/data-sw-row/g)||[]).length,2);
  assert.match(section,/sweet-words__row--right/); assert.match(section,/sweet-words__row--left/);
  const css = read('src/styles/testimonials.css');
  assert.match(css,/translate3d\(-25%, 0, 0\)/); assert.match(css,/52s linear infinite/);
  assert.match(css,/animation-direction: reverse/); assert.match(css,/mask-image: linear-gradient/);
  assert.match(css,/animation-play-state: paused/); assert.match(css,/prefers-reduced-motion: reduce/);
  assert.match(css,/animation: none; transform: none/);
});
