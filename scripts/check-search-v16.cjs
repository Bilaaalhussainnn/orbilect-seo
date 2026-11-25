/* Validate emitted production HTML, or verify a deployed release with --live URL. */
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { parse } = require('next/dist/compiled/node-html-parser');
const origin = 'https://orbilectseo.com';
const local = '.next/server/app/';
const normalize = value => new URL(value, origin).href;
function check(html, url) {
  const doc = parse(html), get = selector => doc.querySelector(selector)?.getAttribute('content');
  const title = doc.querySelector('title')?.textContent;
  const description = get('meta[name="description"]');
  assert.ok(title?.includes('Orbilect SEO'), 'Missing brand: ' + url);
  assert.ok(description, 'Missing description: ' + url);
  const canonicals = doc.querySelectorAll('link[rel="canonical"]');
  assert.equal(canonicals.length, 1, 'Canonical count: ' + url);
  assert.equal(normalize(canonicals[0].getAttribute('href')), url, 'Canonical: ' + url);
  for (const network of ['og', 'twitter']) {
    const attr = network === 'og' ? 'property' : 'name';
    assert.equal(get(`meta[${attr}="${network}:title"]`), title, 'Title mismatch: ' + url);
    assert.equal(get(`meta[${attr}="${network}:description"]`), description, 'Description mismatch: ' + url);
  }
  for (const meta of doc.querySelectorAll('meta[name="robots"],meta[name="googlebot"]')) {
    assert.ok(!/\b(noindex|none)\b/i.test(meta.getAttribute('content') || ''), 'Blocked: ' + url);
  }
  const nodes = doc.querySelectorAll('script[type="application/ld+json"]').flatMap(script => {
    const data = JSON.parse(script.innerHTML); return data['@graph'] ?? [data];
  });
  for (const [type, id] of [['Organization', '/#organization'], ['WebSite', '/#website']]) {
    assert.ok(nodes.some(n => n['@type'] === type && n['@id'] === origin + id && n.name === 'Orbilect SEO'), 'Incomplete identity: ' + url);
  }
  const page = nodes.find(n => ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage'].includes(n['@type']) && normalize(n.url) === url);
  assert.ok(page, 'Missing page entity: ' + url);
  assert.equal(page.name, title, 'Page schema/title mismatch: ' + url);
  assert.equal(page.description, description, 'Page schema/description mismatch: ' + url);
  assert.ok(!nodes.some(n => n.aggregateRating), 'Unexpected self-serving rating: ' + url);
  return { url, title, description, schemaTypes: nodes.map(n => n['@type']) };
}
async function main() {
  if (process.argv[2] === '--live') {
    const base = new URL(process.argv[3] || origin);
    const response = await fetch(base, { signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('x-orbilect-seo-release'), 'search-v16', 'Old/missing release header. Check Hostinger deployment, then purge HTML cache if needed.');
    assert.ok(!/noindex/i.test(response.headers.get('x-robots-tag') || ''));
    const row = check(await response.text(), normalize(base.pathname));
    console.log('Updated homepage metadata and release verified:', row.title);
    return;
  }
  const xml = fs.readFileSync(local + 'sitemap.xml.body', 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => normalize(m[1]));
  assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
  const rows = urls.map(url => {
    const route = new URL(url).pathname;
    return check(fs.readFileSync(local + (route === '/' ? 'index' : route.slice(1)) + '.html', 'utf8'), url);
  });
  assert.equal(new Set(rows.map(r => r.title)).size, rows.length, 'Duplicate titles');
  assert.equal(new Set(rows.map(r => r.description)).size, rows.length, 'Duplicate descriptions');
  fs.mkdirSync('reports', { recursive: true });
  fs.writeFileSync('reports/search-v16.json', JSON.stringify({ release: 'search-v16', pages: rows.length, rows }, null, 2));
  console.log('Passed metadata, self-contained schema, canonical and unique-title checks for ' + rows.length + ' public pages.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
