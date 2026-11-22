const fs=require('node:fs'),assert=require('node:assert/strict');
const {parse}=require('next/dist/compiled/node-html-parser');
const sharp=require('sharp');
const page=route=>parse(fs.readFileSync('.next/server/app/'+route+'.html','utf8'));
(async()=>{
 const industry=page('industries');assert.ok(industry.querySelector('h2#industry-introduction'));
 const directory=industry.querySelector('section[aria-labelledby="industry-directory-title"]');assert.equal(directory.querySelectorAll('article').length,12);for(const card of directory.querySelectorAll('article')){assert.ok(card.querySelector('h3 a'));assert.ok(card.querySelectorAll('a').some(a=>a.text.startsWith('Explore ')));}
 assert.ok(!industry.text.includes('Industry Investment'));
 for(const route of ['industries','about','services/website-redesign'])assert.ok(page(route).querySelector('section[aria-labelledby="gallery-promotion-heading"]'),'Missing reusable gallery: '+route);
 const home=page('index');const wall=home.querySelector('section[aria-labelledby="gallery-promotion-heading"] [data-ready]');assert.ok(wall);assert.equal(wall.childNodes.filter(n=>n.nodeType===1).length,4);assert.ok(!home.text.includes('Orbilect SEO Investment'));
 for(const folder of ['industry-covers-landscape','service-covers-landscape']){
  const files=fs.readdirSync('public/'+folder).filter(x=>x.endsWith('.webp'));assert.equal(files.length,folder.startsWith('industry')?12:6);
  for(const file of files){const m=await sharp('public/'+folder+'/'+file).metadata();assert.equal(m.width,960);assert.equal(m.height,540);assert.ok(fs.statSync('public/'+folder+'/'+file).size<100*1024);}
 }
 assert.ok(page('terms-and-conditions').querySelector('#naila-guidance'));
 assert.ok(page('privacy-policy').text.includes('up to 50 recent customer messages'));
 const index=require('../src/lib/naila/public-content.json');for(const route of ['/privacy-policy','/terms-and-conditions','/industries','/about'])assert.ok(index.find(x=>x.path===route)?.sections.length);
 console.log('Passed directory grid, shared gallery placement, four vertical home columns, pricing removal, 18 landscape assets, policy disclosure and public knowledge coverage.');
})().catch(e=>{console.error(e.message);process.exitCode=1;});
