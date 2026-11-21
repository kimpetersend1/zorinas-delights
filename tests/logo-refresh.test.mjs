import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';

const base = new URL('../', import.meta.url);
const html = readFileSync(new URL('index.html', base), 'utf8');
const mainCSS = readFileSync(new URL('src/styles/main.css', base), 'utf8');
const responsiveCSS = readFileSync(new URL('src/styles/responsive.css', base), 'utf8');
const asset = (f) => new URL(`public/branding/${f}`, base);

test('selected editorial logo is integrated into header and footer, replacing legacy text logo', () => {
  assert.match(html, /class="brand__emblem" src="\/branding\/logo-mark\.svg"/);
  assert.match(html, /class="brand__wordmark" src="\/branding\/logo-horizontal\.svg"/);
  assert.match(html, /class="footer__logo" src="\/branding\/logo-footer\.svg"/);
  assert.doesNotMatch(html, /brand__mark|brand__type|footer__wordmark|footer__brand-sub/);
  assert.match(mainCSS, /\.brand__wordmark/);
  assert.match(responsiveCSS, /\.brand__emblem \{ display: none; \}/);
});

test('logo assets are real vectors with responsive and transparent alternatives', () => {
  for (const name of ['logo-primary.svg','logo-horizontal.svg','logo-mark.svg','logo-footer.svg']) {
    const svg = readFileSync(asset(name),'utf8');
    assert.match(svg, /<svg[^>]+viewBox=/);
    assert.match(svg, /<path\b/);
    assert.ok(statSync(asset(name)).size > 1000);
  }
  for (const name of ['logo-primary.png','logo-horizontal.png','logo-mark.png','logo-footer.png','logo-primary.webp','logo-horizontal.webp','logo-footer.webp']) {
    assert.ok(statSync(asset(name)).size > 5000, name);
  }
});

test('existing Halaal imagery remains separate from the new Zorina brand assets', () => {
  assert.equal((html.match(/src="\/images\/halaal-logo.webp"/g) ?? []).length, 5);
  assert.doesNotMatch(readFileSync(asset('logo-primary.svg'),'utf8'), /halaal|halal|certif/i);
  assert.match(html, /class="nav-halaal"/);
  assert.match(html, /class="halaal-badge halaal-badge--hero"/);
});
