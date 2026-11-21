import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/styles/main.css', import.meta.url), 'utf8');
const asset = new URL('../public/images/halaal-logo.webp', import.meta.url);

test('Halaal owner-provided emblem is bundled and reused in all five intended placements', () => {
  assert.ok(statSync(asset).size > 1000);
  assert.equal((html.match(/src="\/images\/halaal-logo.webp"/g) ?? []).length, 5);
  for (const placement of ['nav-halaal', 'halaal-badge--hero', 'halaal-collection-note', 'halaal-badge--order', 'halaal-badge--footer']) {
    assert.ok(html.includes(placement), `Missing ${placement}`);
  }
});

test('Halaal wording does not claim independent certification', () => {
  assert.equal((html.match(/All products are Halaal/g) ?? []).length, 8); // visible text plus labels
  assert.doesNotMatch(html, /halaal certified|halal certified|certification body/i);
  assert.match(css, /\.halaal-badge--footer/);
});


test('Halaal badge is in persistent site header while original hero Halaal badge remains', () => {
  const headerMarkup = html.match(/<header class="site-header"[\s\S]*?<\/header>/)?.[0] ?? '';
  const heroMarkup = html.match(/<section class="hero[\s\S]*?<\/section>/)?.[0] ?? '';
  assert.match(headerMarkup, /class="nav-halaal" role="img" aria-label="All products are Halaal"/);
  assert.match(heroMarkup, /class="halaal-badge halaal-badge--hero"/);
  assert.match(css, /\.site-header \{[^}]*position: sticky; top: 0;/);
});
