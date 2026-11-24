const fs=require('node:fs'),assert=require('node:assert/strict');
const {parse}=require('next/dist/compiled/node-html-parser');
const xml=fs.readFileSync('.next/server/app/sitemap.xml.body','utf8');const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
let aligned=0;const titles=new Set();
for(const url of urls){
 const route=new URL(url).pathname;const doc=parse(fs.readFileSync('.next/server/app/'+(route==='/'?'index':route.slice(1))+'.html','utf8'));
 const title=doc.querySelector('title').textContent;const description=doc.querySelector('meta[name="description"]').getAttribute('content');
 assert.ok(!titles.has(title),'Duplicate title '+route);titles.add(title);
 for(const key of ['og:title','twitter:title']){const item=doc.querySelector(`meta[property="${key}"],meta[name="${key}"]`);assert.equal(item?.getAttribute('content'),title,key+' '+route)}
 for(const key of ['og:description','twitter:description']){const item=doc.querySelector(`meta[property="${key}"],meta[name="${key}"]`);assert.equal(item?.getAttribute('content'),description,key+' '+route)}
 const nodes=doc.querySelectorAll('script[type="application/ld+json"]').flatMap(s=>{const o=JSON.parse(s.innerHTML);return o['@graph']??[o]});
 const pages=nodes.filter(n=>['WebPage','AboutPage','ContactPage','CollectionPage','Service','BlogPosting','Article'].includes(n['@type'])&&n.url===url);
 for(const page of pages){assert.equal(page.description,description,'Schema description '+route);if(['WebPage','AboutPage','ContactPage','CollectionPage'].includes(page['@type']))assert.equal(page.name,title,'Schema page name '+route);aligned++;}
 assert.ok(pages.length,'Missing page/service/article schema '+route);
 assert.ok(!nodes.some(n=>n.aggregateRating),'Unexpected self-serving rating schema '+route);
}
const doc=parse(fs.readFileSync('.next/server/app/reviews.html','utf8'));
const cards=doc.querySelector('#review-platforms').querySelectorAll('li[id^="review-"]');assert.equal(cards.length,19);
for(const card of cards){if(['review-google','review-bing'].includes(card.id))continue;const links=card.querySelectorAll('a');assert.equal(links.length,1,card.id+' must have one link');assert.equal(card.querySelectorAll('button,details,iframe').length,0);assert.equal(new URL(links[0].getAttribute('href')).protocol,'https:');assert.ok(links[0].querySelector('img'))}
const tech=doc.querySelector('#review-techbehemoths');assert.ok(tech.textContent.includes('5.0/5 · 1 review'));assert.equal(tech.querySelectorAll('svg').length,5);
assert.ok(!doc.querySelector('#review-clutch').textContent.includes('/5'));
const selected=doc.querySelector('footer a[href*="selectedfirms.co/companies/seo"]');assert.ok(selected);assert.equal(selected.querySelector('img').getAttribute('alt'),'SelectedFirms Top SEO Company');
for(const card of cards){const src=card.querySelector('img').getAttribute('src').split('?')[0];assert.ok(fs.existsSync('public'+decodeURIComponent(src)),'Missing logo '+src)}
console.log(`Passed ${urls.length} distinct page titles, matching social metadata and ${aligned} schema descriptions; 19 review cards, five TechBehemoths stars, preserved account controls and global SelectedFirms badge.`);
