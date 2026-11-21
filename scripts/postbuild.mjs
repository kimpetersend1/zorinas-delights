/**
 * On Netlify, its URL environment variable provides the site's actual URL.
 * Generate sitemap/canonical/social image URLs ONLY when a real site URL is known.
 * This avoids inventing a domain or publishing an example.com canonical URL.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url);
const htmlPath = new URL('index.html', dist);
const siteUrlCandidate = process.env.SITE_URL || process.env.URL || process.env.VITE_SITE_URL || '';
let siteUrl;
try {
  const candidate = new URL(siteUrlCandidate);
  if (candidate.protocol === 'https:' && !candidate.hostname.endsWith('.example') && candidate.hostname !== 'example.com') {
    siteUrl = candidate.origin + candidate.pathname.replace(/\/$/, '');
  }
} catch { /* intentionally skip unknown domain */ }

if (siteUrl) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl.replace(/&/g, '&amp;')}/</loc></url>\n</urlset>\n`;
  await writeFile(new URL('sitemap.xml', dist), xml);
  await writeFile(new URL('robots.txt', dist), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
  let html = await readFile(htmlPath, 'utf8');
  const tags = `    <link rel="canonical" href="${siteUrl}/" />\n    <meta property="og:url" content="${siteUrl}/" />\n`;
  html = html.replace('<title>', tags + '    <title>');
  html = html.replaceAll('content="/social-preview.jpg"', `content="${siteUrl}/social-preview.jpg"`);
  await writeFile(htmlPath, html);
  console.log(`Created sitemap and canonical URLs for ${siteUrl}`);
} else {
  await writeFile(new URL('robots.txt', dist), 'User-agent: *\nAllow: /\n');
  console.log('No HTTPS site URL set: skipped canonical and sitemap; set SITE_URL for production.');
}
