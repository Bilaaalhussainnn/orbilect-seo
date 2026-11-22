const fs=require('node:fs'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const {parse}=require('next/dist/compiled/node-html-parser');
const http=require('node:http');
const xml=fs.readFileSync('.next/server/app/sitemap.xml.body','utf8');
const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
let breadcrumbs=0;
for(const url of urls){
 const route=new URL(url).pathname,file='.next/server/app/'+(route==='/'?'index':route.slice(1))+'.html';
 const doc=parse(fs.readFileSync(file,'utf8'));
 const nodes=doc.querySelectorAll('script[type="application/ld+json"]').flatMap(s=>{const data=JSON.parse(s.innerHTML);return data['@graph']??[data]});
 assert.ok(nodes.length,'No structured data on '+route);
 assert.ok(!nodes.some(n=>n.aggregateRating),'Unexpected self-serving aggregate rating '+route);
 if(route==='/'){
  const org=nodes.find(n=>n['@type']==='Organization');assert.equal(org.name,'Orbilect SEO');assert.ok(org.sameAs.includes('https://www.pinterest.com/orbilectseo/'));assert.equal(org.logo.width,423);assert.equal(org.logo.height,113);
  const website=nodes.find(n=>n['@type']==='WebSite');assert.equal(website.publisher['@id'],org['@id']);assert.ok(nodes.some(n=>n['@type']==='WebPage'));
 }else{
  const lists=nodes.filter(n=>n['@type']==='BreadcrumbList');assert.equal(lists.length,1,'Expected exactly one breadcrumb list on '+route);
  const list=lists[0].itemListElement;assert.ok(list.length>=2);list.forEach((item,index)=>{assert.equal(item.position,index+1);assert.ok(item.name?.trim());assert.equal(new URL(item.item).origin,'https://orbilectseo.com')});assert.equal(list.at(-1).item,url);breadcrumbs++;
 }
 const meta=doc.querySelectorAll('meta[name="robots"],meta[name="googlebot"]');assert.ok(meta.length);assert.ok(!meta.some(m=>/noindex|none/.test(m.getAttribute('content')??'')));
}
console.log('Passed '+urls.length+' public pages with structured data; '+breadcrumbs+' unique breadcrumb trails, canonical brand graph and public indexing directives.');
const server=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port','0'],{stdio:['ignore','pipe','pipe']});let output='',started=false;const timeout=setTimeout(()=>{server.kill();process.exitCode=1;},30000);
server.stdout.on('data',async chunk=>{output+=chunk;const base=output.match(/Local:\s+(http:\/\/127\.0\.0\.1:\d+)/)?.[1];if(!base||!output.includes('Ready')||started)return;started=true;
try{
 for(const route of ['/','/about','/services/technical-seo?source=canonical-check','/robots.txt','/sitemap.xml']){
  const res=await new Promise((resolve,reject)=>{http.get(base+route,{headers:{Host:'www.orbilectseo.com'}},response=>{response.resume();response.on('end',()=>resolve(response));}).on('error',reject);});assert.equal(res.statusCode,308,'www host '+route);assert.equal(new URL(res.headers.location).href,new URL('https://orbilectseo.com'+route).href);
 }
 for(const ua of ['Mozilla/5.0','Googlebot/2.1 (+http://www.google.com/bot.html)']){
  const res=await fetch(base+'/',{headers:{'user-agent':ua}});assert.equal(res.status,200);assert.ok(!/noindex/i.test(res.headers.get('x-robots-tag')??''));assert.ok((await res.text()).includes('Orbilect SEO'));
 }
 const admin=await fetch(base+'/admin',{redirect:'manual'});assert.match(admin.headers.get('x-robots-tag')??'',/noindex/);await admin.text();
 console.log('Passed production www redirects with paths/queries preserved, browser/Googlebot-labelled requests, and private admin noindex.');
}catch(e){console.error(e);process.exitCode=1;}finally{clearTimeout(timeout);server.kill();}});
