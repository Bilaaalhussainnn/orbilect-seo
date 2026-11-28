const fs=require('node:fs'),assert=require('node:assert/strict'),{parse}=require('next/dist/compiled/node-html-parser');
const slug='how-to-build-a-shopify-store',route='/blogs/'+slug;
const data=require('../src/app/blogs/article-content.json')[slug];
assert.equal(data.sections.length,30);
const ids=data.sections.map(s=>s.id);assert.equal(new Set(ids).size,30);
for(const [i,section] of data.sections.entries()){assert.ok(section.lead.startsWith('Step '+(i+1)+'. '));assert.ok(section.steps.length>=3);assert.ok(section.sources.length>0);}
assert.equal(ids[0],'choose-shopify-plan');assert.equal(ids[1],'create-shopify-account');
assert.ok(ids.indexOf('choose-store-domain')<ids.indexOf('compare-shopify-themes'));
assert.ok(ids.indexOf('compare-shopify-themes')<ids.indexOf('add-first-shopify-product'));
assert.ok(ids.indexOf('add-first-shopify-product')<ids.indexOf('variants-skus-and-stock'));
const images=data.sections.flatMap(s=>s.images??[]);assert.equal(images.length,10);
for(const image of images){assert.ok(image.alt&&image.source[1].startsWith('https://'));assert.ok(fs.statSync('public'+image.src).size<125000);assert.ok(image.width>0&&image.height>0);}
if(process.argv.includes('--build')){
 const doc=parse(fs.readFileSync('.next/server/app'+route+'.html','utf8')),article=doc.querySelector('article');
 assert.equal(doc.querySelectorAll('h1').length,1);
 for(const section of data.sections){const heading=article.querySelector('h2[id="'+section.id+'"]');assert.ok(heading&&heading.querySelector('span'));assert.ok(doc.querySelector('a[href="#'+section.id+'"]'));for(const step of section.steps)assert.ok(article.textContent.includes(step));}
 const text=article.textContent;assert.ok(text.indexOf('Compare Shopify plans')<text.indexOf('Create your Shopify account'));
 assert.ok(text.includes('$39 USD/month')&&text.includes('$29 USD/month')&&text.includes('Starter is not available to new stores'));
 assert.equal(article.querySelectorAll('img').length,10);assert.equal(article.querySelectorAll('table').length,3);
 for(const img of article.querySelectorAll('img'))assert.equal(img.getAttribute('loading'),'lazy');
 const words=text.trim().split(/\s+/).length;assert.ok(words>5500,'Substantial complete guide');
 const knowledge=require('../src/lib/naila/public-content.json').find(p=>p.path===route);assert.ok(knowledge);for(const id of ids)assert.ok(knowledge.sections.some(s=>s.href.endsWith('#'+id)),id);
 const schemas=doc.querySelectorAll('script[type="application/ld+json"]').flatMap(s=>{const j=JSON.parse(s.text);return j['@graph']??[j]});const post=schemas.find(s=>s['@type']==='BlogPosting');assert.equal(post.dateModified,'2026-11-29');
 assert.ok(post.citation.some(s=>s.url==='https://www.shopify.com/pricing'));
 fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/shopify-guide-v22.json',JSON.stringify({slug,steps:30,screenshots:10,words,tables:3,updated:'2026-11-29',screenshotBytes:images.reduce((n,i)=>n+fs.statSync('public'+i.src).size,0),note:'Genuine official Shopify references; no merchant account or store was created.'},null,2)+'\n');
 console.log('Passed Shopify guide: 30 chronological steps, '+words+' words, 10 attributed compressed screenshots/previews, 3 tables, complete TOC and Naila indexing.');
}else console.log('Passed source order, completeness and compressed screenshot checks for Shopify guide.');
