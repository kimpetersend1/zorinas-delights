import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path,root),'utf8');
const html = read('branding/index.html');

test('brand library is a separate Vite HTML entry, marked noindex, not linked from home', () => {
  assert.match(read('vite.config.js'), /branding\/index\.html/);
  assert.match(html, /name="robots" content="noindex, follow"/);
  assert.doesNotMatch(read('index.html'), /href=["'](?:\.\/)?\/?branding\/?(?:[?#][^"']*)?["']/i);
  assert.doesNotMatch(read('scripts/postbuild.mjs'), /branding\/index|<loc>[^<]*branding/);
  assert.doesNotMatch(html, /src\/main\.js|src\/styles\/main\.css/);
});
test('all local brand-library image and download targets exist', () => {
  for (const match of html.matchAll(/(?:src|href)="(\/(?:branding|images)\/[^"#]+|\/favicon\.svg|\/social-preview\.jpg)"/g)) {
    assert.ok(existsSync(new URL('public'+match[1],root)), match[1]);
  }
  for (const family of ['primary','horizontal','mark','footer']) {
    assert.match(html, new RegExp(`href="/branding/logo-${family}\\.svg" download`));
  }
  assert.equal((html.match(/data-copy="#[0-9A-F]{6}"/g)||[]).length,4);
});
test('page covers all packaged illustration assets, with concepts clearly marked', () => {
  for (const target of ['/images/hero-illustration.svg','/images/koesisters-diy-kit-client-20261123.webp','/images/pre-fried-rotis-flyer.webp','/images/concept-treat-box.svg','/images/concept-sharing-tray.svg','/images/concept-gifting.svg','/images/concept-weekend.svg','/images/concept-surprise.svg']) {
    assert.ok(html.includes(target), target);
  }
  assert.equal((html.match(/Catalogue concept · not for sale/g)||[]).length,5);
});
