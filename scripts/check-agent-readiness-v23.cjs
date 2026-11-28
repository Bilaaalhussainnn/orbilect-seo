const fs=require('node:fs'),assert=require('node:assert/strict'),{spawn}=require('node:child_process'),{parse}=require('next/dist/compiled/node-html-parser');
(async()=>{
 const {Client}=await import('@modelcontextprotocol/sdk/client/index.js');const {StreamableHTTPClientTransport}=await import('@modelcontextprotocol/sdk/client/streamableHttp.js');
 const server=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port','0'],{stdio:['ignore','pipe','pipe']});
 const timeout=setTimeout(()=>{server.kill();console.error('Agent verification timed out');process.exitCode=1;},60000);let client;
 try{
 const base=await new Promise((resolve,reject)=>{let output='';server.stdout.on('data',b=>{output+=b;const url=output.match(/Local:\s+(http:\/\/127\.0\.0\.1:\d+)/)?.[1];if(url&&output.includes('Ready'))resolve(url);});server.on('error',reject);server.on('exit',code=>reject(Error('Server exited '+code)));});
 const get=(path,headers={})=>fetch(base+path,{headers,signal:AbortSignal.timeout(10000)});
 const robots=await get('/robots.txt');assert.equal(robots.status,200);const robotText=await robots.text();assert.match(robotText,/Content-Signal: search=yes, ai-input=yes, ai-train=no/);assert.match(robotText,/Disallow: \/admin/);assert.ok(!robotText.includes('Disallow: /\n'));
 const llms=await get('/llms.txt');assert.equal(llms.status,200);const index=await llms.text();assert.ok(index.startsWith('# Orbilect SEO'));assert.match(index,/agent-markdown\/blogs\/how-to-build-a-shopify-store.md/);
 const pages=JSON.parse(fs.readFileSync('public/agent-markdown/manifest.json','utf8'));assert.equal(pages.length,97);
 for(const page of pages){assert.ok(!/^\/(?:api|admin|internal)(?:\/|$)/.test(page.path));assert.ok(fs.readFileSync('public/agent-markdown/'+page.file,'utf8').includes('Canonical page: https://orbilectseo.com'+page.path));}
 for(const route of ['/','/services/technical-seo','/blogs/how-to-build-a-shopify-store']){
  const html=await get(route,{Accept:'text/html'});assert.equal(html.status,200);assert.match(html.headers.get('content-type'),/text\/html/);assert.match(html.headers.get('vary')??'',/Accept/i);
  const md=await get(route,{Accept:'text/markdown'});assert.equal(md.status,200);assert.match(md.headers.get('content-type'),/text\/markdown/);assert.match(md.headers.get('cache-control'),/no-store/);assert.match(md.headers.get('vary'),/Accept/);const markdown=await md.text();assert.ok(markdown.startsWith('# '));assert.ok(!/noindex/i.test(md.headers.get('x-robots-tag')??''),'Canonical negotiated responses stay indexable');assert.ok(!markdown.includes('<script'));if(route.endsWith('shopify-store')){assert.match(markdown,/Step 1\. Compare Shopify plans/);assert.match(markdown,/Step 30\./);assert.match(markdown,/\| Basic \|/);}
  const after=await get(route,{Accept:'text/html'});assert.match(after.headers.get('content-type'),/text\/html/,'Markdown must not poison HTML requests');
 }
 assert.match((await get('/agent-markdown/index.md')).headers.get('x-robots-tag'),/noindex/,'Only supplemental duplicate files are noindex');
 for(const accept of ['*/*','text/html,application/xhtml+xml','text/markdown;q=0,text/html','text/html;q=1,text/markdown;q=0.5','text/markdown;q=0.1,*/*;q=1'])assert.match((await get('/',{Accept:accept})).headers.get('content-type'),/text\/html/,accept);
 assert.match((await get('/',{Accept:'text/markdown;q=1,text/html;q=0.5'})).headers.get('content-type'),/text\/markdown/);
 assert.equal((await get('/blogs/no-such-public-article',{Accept:'text/markdown'})).status,404);
 assert.equal((await get('/agent-content?path=%2Fadmin')).status,404);
 assert.equal((await get('/agent-content?path=https%3A%2F%2Fexample.com')).status,404);
 const legacy=await get('/.well-known/mcp/server-card.json');assert.equal(legacy.status,200);assert.match(legacy.headers.get('content-type'),/application\/json/);assert.equal(legacy.headers.get('access-control-allow-origin'),'*');const card=await legacy.json();assert.equal(card.endpoint,'https://orbilectseo.com/mcp');assert.ok(card.capabilities.tools&&card.capabilities.resources);
 const current=await get('/mcp/server-card');assert.equal(current.status,200);const modern=await current.json();assert.equal(modern.remotes[0].url,card.endpoint);assert.equal(modern.name,'com.orbilectseo/public-website');
 client=new Client({name:'orbilect-qa',version:'1.0.0'},{capabilities:{}});await client.connect(new StreamableHTTPClientTransport(new URL(base+'/mcp')));
 assert.deepEqual(client.getServerCapabilities().tools,card.capabilities.tools);assert.deepEqual(client.getServerCapabilities().resources,card.capabilities.resources);
 const {tools}=await client.listTools();assert.deepEqual(tools.map(t=>t.name).sort(),['get_contact_information','read_public_page','search_public_pages']);assert.ok(tools.every(t=>t.annotations.readOnlyHint&&t.annotations.destructiveHint===false));
 const search=await client.callTool({name:'search_public_pages',arguments:{query:'Shopify store',limit:3}});const matches=JSON.parse(search.content[0].text).results;assert.ok(matches.some(p=>p.path==='/blogs/how-to-build-a-shopify-store'));
 const page=await client.callTool({name:'read_public_page',arguments:{path:'/blogs/how-to-build-a-shopify-store'}});assert.match(page.content[0].text,/Step 1\./);assert.ok(!page.isError);
 const blocked=await client.callTool({name:'read_public_page',arguments:{path:'/admin/naila/chats'}});assert.equal(blocked.isError,true);
 assert.equal((await client.callTool({name:'read_public_page',arguments:{path:'../../package.json'}})).isError,true);
 const contact=await client.callTool({name:'get_contact_information',arguments:{}});assert.match(contact.content[0].text,/info@orbilectseo.com/);
 const resources=await client.listResources();assert.equal(resources.resources.length,98);assert.ok(resources.resources.every(r=>!r.uri.includes('/admin')));
 const resource=await client.readResource({uri:resources.resources.find(r=>r.uri.endsWith('/index.md')).uri});assert.match(resource.contents[0].text,/# /);
 const bad=await fetch(base+'/mcp',{method:'POST',headers:{Origin:'https://unrelated.example','Content-Type':'application/json',Accept:'application/json,text/event-stream'},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/list'})});assert.equal(bad.status,403);
 // Browser tools use the same stateless protocol path, without storing a session.
 const browserCall=await fetch(base+'/mcp',{method:'POST',headers:{Origin:'https://orbilectseo.com','Content-Type':'application/json',Accept:'application/json,text/event-stream','MCP-Protocol-Version':'2025-11-25'},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/call',params:{name:'get_contact_information',arguments:{}}})});assert.equal(browserCall.status,200);assert.match((await browserCall.json()).result.content[0].text,/info@orbilectseo.com/);
 const report={release:'agent-readiness-v23',pages:97,contentSignal:true,llms:true,markdownNegotiation:true,cacheSeparation:true,mcpSdkHandshake:true,tools:tools.map(t=>t.name),resources:resources.resources.length,legacyCard:true,currentCard:true,privateAccessRejected:true};fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/agent-readiness-v23.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
 }finally{await client?.close();clearTimeout(timeout);server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
