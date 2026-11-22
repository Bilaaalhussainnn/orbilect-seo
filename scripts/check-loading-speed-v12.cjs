const fs=require('node:fs'),assert=require('node:assert/strict');const {parse}=require('next/dist/compiled/node-html-parser');
const home=parse(fs.readFileSync('.next/server/app/index.html','utf8'));
const loader=home.querySelector('.orbilect-loading');assert.ok(loader);assert.equal(loader.querySelectorAll('button,a').length,0);assert.equal(loader.querySelector('.orbilect-loading-tagline').querySelectorAll('span').length,3);
const css=fs.readFileSync('src/app/brand-experience.css','utf8');assert.ok(!/cursor\s*:/.test(css));assert.ok(!fs.existsSync('public/brand/orbilect-cursor.png'));assert.ok(css.includes('#020305'));assert.ok(css.includes('nth-child(2)'));
const wall=home.querySelector('section[aria-labelledby="gallery-promotion-heading"] [data-fast="true"]');assert.ok(wall);
const gallery=parse(fs.readFileSync('.next/server/app/website-design-gallery.html','utf8'));assert.ok(!gallery.querySelector('[data-fast="true"]'));
assert.ok(fs.readFileSync('src/app/website-design-gallery/vertical-designs.module.css','utf8').includes('animation-duration:36s'));
assert.ok(fs.readFileSync('src/components/footer/footer.module.css','utf8').includes('.signature strong { font-weight:700;color:#004AAD; }'));
const previews=require('../src/lib/landing-previews.json');assert.equal(Object.keys(previews).length,24);
const media=require('../src/lib/design-media.json');for(const [src,item] of Object.entries(media).filter(([url])=>url.startsWith('/industry-showcases/'))){assert.ok(item.srcSet.includes('320w'));for(const variant of item.srcSet.split(', '))assert.ok(fs.existsSync('public'+variant.split(' ')[0]),src);}
const delivery=require('../src/lib/image-delivery.json');for(const name of ['semrush.png','ahrefs.png']){const item=delivery['/technology-stack/'+name];assert.ok(item);assert.ok(fs.statSync('public'+item.src).size<10*1024);}
console.log('Passed darker button-free multicolour loader, native cursor restoration, solid #004AAD footer tagline, Home-only 36s wall, compact 24-design dashboard payload, 320px variants and small tool logos.');
