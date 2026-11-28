/* Verify actual source coverage and the production pages customers/crawlers receive. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { parse } = require('next/dist/compiled/node-html-parser');
const root = path.resolve(__dirname, '..');
const blog = path.join(root, 'src/app/blogs');
const additions = JSON.parse(fs.readFileSync(path.join(blog, 'article-editorial-additions.json'), 'utf8'));
const existing = JSON.parse(fs.readFileSync(path.join(blog, 'article-content.json'), 'utf8'));
const deepDives = JSON.parse(fs.readFileSync(path.join(blog, 'article-deep-dives.json'), 'utf8'));
const seo = 'what-is-search-engine-optimization';
const expected = [...Object.keys(existing), seo].sort();
assert.deepEqual(Object.keys(additions).sort(), expected, 'Every published article must have additions');
assert.equal(expected.length, 42);
const paragraphs = new Set();
let words = 0;
for (const [slug, article] of Object.entries(additions)) {
  assert.equal(article.sections.length, 4, slug);
  assert.equal(article.updatedAt, '2026-11-28', slug);
  const ids = new Set([...(existing[slug]?.sections.map(s => s.id) ?? []), ...(deepDives[slug]?.map(s => s.id) ?? [])]);
  for (const section of article.sections) {
    assert.match(section.id, /^[a-z][a-z0-9-]+$/);
    assert.ok(!ids.has(section.id), 'Duplicate section ID: ' + slug + '#' + section.id);
    ids.add(section.id);
    assert.equal(section.paragraphs.length, 2);
    assert.ok(section.sources.length > 0);
    for (const [label, href] of section.sources) {
      assert.ok(label && new URL(href).protocol === 'https:');
    }
    for (const paragraph of section.paragraphs) {
      assert.ok(!paragraphs.has(paragraph), 'Repeated paragraph in ' + slug);
      paragraphs.add(paragraph);
      words += paragraph.split(/\s+/).length;
    }
  }
}
if (process.argv.includes('--build')) {
  const app = path.join(root, '.next/server/app');
  const clean = value => value.replace(/\s+/g, ' ').trim();
  const index = JSON.parse(fs.readFileSync(path.join(root, 'src/lib/naila/public-content.json'), 'utf8'));
  const sitemap = parse(fs.readFileSync(path.join(app, 'sitemap.xml.body'), 'utf8'));
  const entries = new Map(sitemap.querySelectorAll('url').map(node => [node.querySelector('loc').text, node.querySelector('lastmod')?.text]));
  for (const [slug, article] of Object.entries(additions)) {
    const route = '/blogs/' + slug;
    const doc = parse(fs.readFileSync(path.join(app, route + '.html'), 'utf8'));
    const guide = doc.querySelector('article');
    assert.ok(guide, route);
    for (const section of article.sections) {
      const nodes = guide.querySelectorAll('h2[id="' + section.id + '"]');
      assert.equal(nodes.length, 1, route + '#' + section.id);
      assert.equal(clean(nodes[0].text), section.title);
      const content = clean(nodes[0].closest('section').text);
      for (const paragraph of section.paragraphs) assert.ok(content.includes(clean(paragraph)), 'Missing paragraph: ' + route);
      assert.ok(doc.querySelector('a[href="#' + section.id + '"]'), 'Missing contents link: ' + route);
    }
    const articles = doc.querySelectorAll('script[type="application/ld+json"]').flatMap(n => {
      const value = JSON.parse(n.text);return value['@graph'] ?? [value];
    }).filter(n => n['@type'] === 'BlogPosting');
    assert.equal(articles.length, 1, route);
    assert.equal(articles[0].dateModified, article.updatedAt, route);
    assert.equal(doc.querySelector('meta[property="article:modified_time"]')?.getAttribute('content'), article.updatedAt, route);
    assert.ok(doc.querySelector('time[datetime="' + article.updatedAt + '"]'), route);
    assert.equal(entries.get('https://orbilectseo.com' + route), article.updatedAt, route);
    const knowledge = index.find(n => n.path === route);
    assert.ok(knowledge, 'Naila page missing: ' + route);
    for (const section of article.sections) assert.ok(knowledge.sections.some(n => n.href.endsWith('#' + section.id)), 'Naila section missing: ' + route);
  }
  const reviews = parse(fs.readFileSync(path.join(app, 'reviews.html'), 'utf8'));
  const google = reviews.querySelector('#review-google');
  assert.ok(google && !google.text.includes('coming soon'));
  const link = google.querySelector('a');
  const profile = new URL(link.getAttribute('href'));
  assert.equal(profile.hostname, 'www.google.com');
  assert.equal(profile.searchParams.get('query_place_id'), 'ChIJQTaQVpRZwokRhRWr4hTB_po');
  assert.ok(google.text.includes('Visit our profile'));
  assert.ok(link.querySelector('img'));
  assert.equal(link.querySelectorAll('a').length, 0, 'Nested link in Google card');
  assert.ok(reviews.querySelector('#review-bing').text.includes('Profile link coming soon'), 'Bing must retain its existing state');
}
console.log('Passed 42 articles, 168 new sections, ' + words + ' original added words' + (process.argv.includes('--build') ? ', rendered content/TOCs, modified dates, sitemap, Naila index and Google profile card.' : '.'));
