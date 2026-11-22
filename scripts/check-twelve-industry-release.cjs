const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parse } = require('next/dist/compiled/node-html-parser');
const industries = require('../src/app/_home/industry-growth/industries.json');
assert.equal(industries.length, 12);
assert.deepEqual(industries.map(x => x.name), industries.map(x => x.name).sort((a,b) => a.localeCompare(b)));
for (const industry of industries) {
  const html = fs.readFileSync(path.join('.next/server/app/industries', industry.slug + '.html'), 'utf8');
  const page = parse(html);
  const related = page.querySelector('nav[aria-labelledby="related-industry-title"]');
  assert.ok(related, industry.slug + ': missing related industries');
  const links = related.querySelectorAll('li a');
  assert.equal(links.length, 11, industry.slug + ': must link to eleven peers');
  assert.ok(!links.some(link => link.getAttribute('href') === '/industries/' + industry.slug));
  const nextSection = html.slice(html.indexOf('</nav>', html.indexOf('aria-labelledby="related-industry-title"')) + 6);
  assert.match(nextSection, /^<section[^>]*aria-labelledby="faq-heading"/);
  assert.ok(fs.statSync('public/industry-covers/' + industry.slug + '.webp').size < 100 * 1024);
  assert.ok(page.querySelector('h1'));
}
const additions = require('../src/app/blogs/article-deep-dives.json');
assert.equal(Object.keys(additions).length, 41);
assert.ok(!additions['what-is-search-engine-optimization']);
for (const [slug, sections] of Object.entries(additions)) {
  assert.equal(sections.length, 5);
  const page = parse(fs.readFileSync('.next/server/app/blogs/' + slug + '.html','utf8'));
  for (const {id,title} of sections) {
    const heading = page.querySelector('h2#' + id);
    assert.ok(heading, slug + ': missing ' + id);
    assert.equal(heading.text, title);
  }
  assert.ok(page.text.includes('2026-11-22'));
}
const index = require('../src/lib/naila/public-content.json');
for (const route of ['/privacy-policy', '/terms-and-conditions', ...industries.map(x=>'/industries/'+x.slug)]) {
  assert.ok(index.some(x => x.path === route && x.sections.length), 'Naila missing ' + route);
}
// Render the real client carousel to verify 4x4 logical images and one loop copy.
const ts = require('typescript');
require.extensions['.tsx'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true }
}).outputText,filename);
require.extensions['.css'] = module => { module.exports = new Proxy({}, {get:(_,key)=>String(key)}); };
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const Wall = require('../src/app/website-design-gallery/vertical-designs.tsx').default;
const images=Array.from({length:16},(_,i)=>({src:'/sample-'+i+'.webp',name:'Layout '+i}));
const wall=parse(renderToStaticMarkup(React.createElement(Wall,{images,label:'Automotive'})));
assert.equal(wall.querySelectorAll('figure').length,32);
assert.equal(new Set(wall.querySelectorAll('img').map(x=>x.getAttribute('src'))).size,16);
assert.equal(wall.querySelectorAll('[aria-hidden="true"]').length,4);
console.log('Passed: 12 industries, 132 peer links directly before FAQs, 205 article additions, Naila policy/industry coverage, 4x4 gallery and cover budgets.');
