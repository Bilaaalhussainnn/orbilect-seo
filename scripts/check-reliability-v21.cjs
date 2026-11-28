const {spawn}=require('node:child_process'),http=require('node:http'),fs=require('node:fs'),assert=require('node:assert/strict'),{randomBytes}=require('node:crypto'),{parse}=require('next/dist/compiled/node-html-parser');
(async()=>{
 let server;const saved=new Map();let fail=false;
 const database=http.createServer(async(req,res)=>{let data='';for await(const chunk of req)data+=chunk;res.setHeader('content-type','application/json');if(fail){res.writeHead(503);return res.end('{}');}if(req.method==='POST'){const lead=JSON.parse(data);if(saved.has(lead.id))return res.end('[]');const row={...lead,inquiry_code:'TEST-RECEIPT',email_status:'accepted'};saved.set(lead.id,row);return res.end(JSON.stringify([row]));}const id=new URL(req.url,'http://test').searchParams.get('id')?.replace(/^eq\./,'');res.end(JSON.stringify(saved.has(id)?[saved.get(id)]:[]));});
 await new Promise(resolve=>database.listen(0,'127.0.0.1',resolve));
 const timeout=setTimeout(()=>{server?.kill();database.closeAllConnections();database.close();console.error('Reliability verification timed out');process.exitCode=1;},60000);
 try {
  server=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port','0'],{env:{...process.env,NAILA_SESSION_SECRET:randomBytes(32).toString('hex'),SUPABASE_URL:'http://127.0.0.1:'+database.address().port,SUPABASE_SECRET_KEY:'fictional-test-key',RESEND_API_KEY:'',NAILA_WEEKLY_REPORTS_ENABLED:'0'},stdio:['ignore','pipe','pipe']});
  const base=await new Promise((resolve,reject)=>{let output='';server.stdout.on('data',chunk=>{output+=chunk;const url=output.match(/Local:\s+(http:\/\/127\.0\.0\.1:\d+)/)?.[1];if(url&&output.includes('Ready'))resolve(url);});server.on('error',reject);server.on('exit',code=>reject(Error('Server exit '+code)));});
  const request=(url,options={})=>fetch(base+url,{...options,signal:AbortSignal.timeout(8000)});
  const health=await request('/api/health');assert.equal(health.status,200);assert.equal((await health.json()).release,'reliability-v21');assert.match(health.headers.get('cache-control'),/no-store/);
  const home=await request('/');const html=await home.text();assert.equal(home.status,200);assert.equal(home.headers.get('x-orbilect-seo-release'),'reliability-v21');assert.ok(!html.includes('src="/_next/image?'),'No request-time image optimizer URLs in homepage');assert.ok(!html.includes('site-readiness'),'No hydration-gated full-page overlay');
  const timings=await Promise.all(Array.from({length:16},async()=>{const t=performance.now();const r=await request('/');await r.arrayBuffer();assert.equal(r.status,200);return performance.now()-t;}));
  const delivery=require('../src/lib/image-delivery.json');const original=Object.keys(delivery)[0];
  const redirect=await request('/_next/image?url='+encodeURIComponent(original)+'&w=640&q=75',{redirect:'manual'});assert.equal(redirect.status,307,'Legacy image requests must redirect to static files');const image=await fetch(new URL(redirect.headers.get('location'),base));assert.equal(image.status,200);assert.match(image.headers.get('content-type'),/image/);
  assert.equal((await request('/_next/image?url=https%3A%2F%2Funrelated.example%2Fx.png&w=640&q=75',{redirect:'manual'})).status,404,'No open image proxy');
  const urls=[...fs.readFileSync('.next/server/app/sitemap.xml.body','utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
  for(const route of urls){const doc=parse(fs.readFileSync('.next/server/app/'+(route==='/'?'index':route.slice(1))+'.html','utf8'));assert.equal(doc.querySelectorAll('h1').length,1,'One H1: '+route);assert.ok(doc.querySelectorAll('img').every(img=>img.hasAttribute('alt')),'Image alternative attribute: '+route);}
  let cookie='';const history=[];let receiptCookie;
  async function turn(text,expectedStatus=200){const r=await request('/api/naila',{method:'POST',headers:{origin:'https://orbilectseo.com','sec-fetch-site':'same-origin','content-type':'application/json',cookie},body:JSON.stringify({action:'message',text,recentMessages:history.slice(-100),page:'/services/technical-seo'})});const value=await r.json();assert.equal(r.status,expectedStatus,text+' '+JSON.stringify(value));cookie=r.headers.get('set-cookie')?.split(';')[0]||cookie;assert.ok(cookie.length<3900,'Cookie remains within browser limits');history.push(text);return value;}
  for(let i=0;i<55;i++)assert.ok((await turn(i%2?'What is robots.txt?':'Tell me about technical SEO')).text);
  assert.match((await turn('How do I contact your team?')).text,/full name/i);assert.equal(saved.size,0);
  for(const text of ['Test Customer','bad-email','customer@example.com','email only','no website','technical SEO','Improve crawl access and conversion tracking.'])await turn(text);
  assert.equal(saved.size,0,'No lead stored before permission');
  assert.match((await turn('change email')).text,/email/i);await turn('corrected@example.com');
  fail=true;assert.ok((await turn('yes',503)).error);assert.equal(saved.size,0);fail=false;receiptCookie=cookie;
  const submitted=await turn('yes');assert.ok(submitted.leadSubmitted);assert.equal(saved.size,1);assert.equal([...saved.values()][0].email,'corrected@example.com');assert.equal([...saved.values()][0].source,'naila-callback');
  cookie=receiptCookie;assert.ok((await turn('yes')).leadSubmitted);assert.equal(saved.size,1,'Retry does not duplicate the lead');
  await turn('Please call me');await turn('cancel');assert.match((await turn('What is technical SEO?')).text,/crawl|index|technical/i);
  const context=await request('/api/naila',{method:'POST',headers:{origin:'https://orbilectseo.com','sec-fetch-site':'same-origin','content-type':'application/json',cookie},body:JSON.stringify({action:'message',text:'I need help',recentMessages:Array.from({length:100},()=> '界'.repeat(400))})});assert.equal(context.status,200);
  const report={release:'reliability-v21',pages:urls.length,parallelHomeRequests:timings.length,localMaxMs:Math.round(Math.max(...timings)),localMedianMs:Math.round(timings.sort((a,b)=>a-b)[8]),note:'Local smoke test only; production hosting, CDN and network timings differ.',leadFlow:'55-turn prelude, consent, correction, outage retry, deduplication, cancellation and topic recovery; fake local DB only'};
  fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/reliability-v21.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
 }finally{clearTimeout(timeout);server?.kill();database.closeAllConnections();await new Promise(resolve=>database.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});
