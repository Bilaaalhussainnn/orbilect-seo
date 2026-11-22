const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict'),sharp=require('sharp');
const {parse}=require('next/dist/compiled/node-html-parser');
(async()=>{
const home=parse(fs.readFileSync('.next/server/app/index.html','utf8'));
const wall=home.querySelector('section[aria-labelledby="gallery-promotion-heading"] [data-ready]');
assert.ok(wall);assert.equal(wall.childNodes.filter(n=>n.nodeType===1).length,4);
const imgs=wall.querySelectorAll('img');assert.equal(imgs.length,32);const sources=[...new Set(imgs.map(x=>x.getAttribute('src')))];assert.equal(sources.length,16);
let bytes=0;for(const src of sources){assert.ok(src.startsWith('/design-media/'));bytes+=fs.statSync('public'+src).size;}
assert.ok(bytes<1024*1024,'Home gallery exceeds 1 MiB at its largest supplied thumbnail size');
const versions=require('../src/lib/image-versions.json');for(const [src,hash] of Object.entries(versions)){assert.equal(crypto.createHash('sha256').update(fs.readFileSync('public'+decodeURIComponent(src))).digest('hex').slice(0,12),hash,'Stale media version '+src);}
assert.ok(home.querySelectorAll('img').some(img=>/\?v=[a-f0-9]{12}/.test(img.getAttribute('src')??'')),'No image cache versions rendered');
for(const city of ['new-york','brampton','manchester','sydney','doha','karachi']){const file='public/locations-dark-v11/'+city+'.webp';const m=await sharp(file).metadata();assert.equal(m.width,960);assert.equal(m.height,640);assert.ok(fs.statSync(file).size<65*1024);}
for(const route of ['privacy-policy','terms-and-conditions']){const page=parse(fs.readFileSync('.next/server/app/'+route+'.html','utf8'));const os=page.querySelector('#orbilect-os');assert.ok(os);assert.ok(os.querySelectorAll('p').length>=20);assert.ok(/employees|employee/.test(os.text));}
assert.ok(!fs.existsSync('public/service-showcase/ui/healthcare-light.webp'));
const report=require('../docs/performance/image-compression.json');assert.ok(report.after<report.before*.2);
console.log('Passed: four vertical columns, 16 unique previews, 32 image nodes; maximum Home gallery thumbnail download '+(bytes/1024).toFixed(0)+' KiB; '+Object.keys(versions).length+' valid content-versioned assets; six city images under 65 KiB; 40+ OS policy statements.');
})().catch(e=>{console.error(e);process.exitCode=1});
