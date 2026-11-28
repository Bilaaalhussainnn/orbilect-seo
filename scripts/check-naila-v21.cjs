const assert=require('node:assert/strict'), fs=require('node:fs'), ts=require('typescript');
require.extensions['.ts']=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,file);
const {answer}=require('../src/lib/naila/answers.ts');
const {advanceContact,sealContactDraft,openContactDraft}=require('../src/lib/naila/lead-capture.ts');
const {parseLead,saveLead}=require('../src/lib/leads/server.ts');
const patterns=require('../src/lib/naila/conversation-patterns.json');
const glossary=require('../src/lib/naila/technical-glossary.json');
const industries=require('../src/app/_home/industry-growth/industries.json');
const data=[], secret='fictional-test-key-not-a-production-secret';
assert.equal(patterns.length,200);
for(let i=0;i<200;i++) {
 const pattern=patterns[i], history=[], messages=[];
 const qs=['Hello, can you help me?',pattern.example,'Our goal is more qualified enquiries.','What would you check first?','We already have a website.','It runs on WordPress.','Do you do free SEO audits?',"What's the cost of that?",'Tell me about '+pattern.topic,'How long would the project take?','Is ad spend included?','Can I get a discount?','What current offers do you have?','Can you guarantee first position on Google?',...Array.from({length:8},(_,j)=>'What is '+glossary[(i*8+j)%glossary.length].term+'?'),"I'm not sure I explained that well.",'Could you explain that in simpler words?','Tell me about '+pattern.topic,'What do you need from us to start?','Will you need my passwords?','Where can I see design examples?','Tell me about '+industries[i%industries.length].name,'Thank you, that helps.','zqxvfr','I need help with technical SEO'];
 for(const q of qs){const r=answer(q,false,history.slice(-100));assert.ok(r.text?.length>10);assert.ok(!/outside what I can help|temporarily unavailable|try again in 24 hours/i.test(r.text));if(q===qs.at(-1))assert.match(r.text,/SEO|crawl|index/i);messages.push({role:'customer',text:q},{role:'naila',text:r.text,...(r.actions?{links:r.actions}:{})});history.push(q);}
 assert.equal(messages.length,64);
 let state;
 const turns=['How do I contact your team?','Fictional Customer','not-an-email','customer@example.com','email only','no website',pattern.topic,'Improve qualified enquiries and website conversions.','change email','updated@example.com','yes'];
 for(const q of turns) {
  const result=advanceContact(q,state);assert.ok(result,q);state=result.draft;
  if(state){const sealed=sealContactDraft(state,secret);assert.deepEqual(openContactDraft(sealed,secret),state);assert.equal(openContactDraft(sealed+'x',secret),undefined);const cookie=Buffer.from(JSON.stringify({id:'fixture',expires:9999999999,lead:sealed})).toString('base64url');assert.ok(cookie.length+150<4096,'cookie must fit browser limits');}
  if(result.reply){assert.ok(!result.reply.actions?.some(a=>a.href.includes('/contact')));messages.push({role:'customer',text:q},{role:'naila',text:result.reply.text});}
  if(result.ready){assert.equal(result.ready.email,'updated@example.com');parseLead({id:state.id,source:'naila-callback',name:state.name,email:state.email,phone:state.phone,website:state.website,service:state.service,message:state.message,page:'/'});messages.push({role:'customer',text:q},{role:'naila',text:'[Submit only through the API. Confirm receipt only after durable lead storage succeeds.]'});}
 }
 assert.ok(advanceContact('cancel',state).draft===undefined);
 data.push({id:pattern.id,fictionalExample:true,topic:pattern.topic,industry:industries[i%industries.length].name,messages});
}
// Questions do not discard a contact draft, and declining does not close ordinary chat.
let draft=advanceContact('Please call me').draft;
assert.ok(advanceContact('What is technical SEO?',draft).interrupted);
assert.equal(advanceContact('Cancel',draft).draft,undefined);
assert.match(answer('Can you help with ecommerce SEO?',false,['unclear words']).text,/SEO|product|store/i);
if(process.argv.includes('--write')){fs.mkdirSync('docs/naila',{recursive:true});fs.writeFileSync('docs/naila/200-conversations-v21.json',JSON.stringify(data,null,2)+'\n');}
// Fake database only: no real customer records or email are created.
(async()=>{
 process.env.SUPABASE_URL='https://database.example';process.env.SUPABASE_SECRET_KEY='fixture-key';const original=global.fetch;
 let saved;
 global.fetch=async(url,init)=>{assert.match(String(url),/^https:\/\/database\.example\//);if(init.method==='POST'){saved=JSON.parse(init.body);return Response.json([{...saved,inquiry_code:'TEST-1',email_status:'pending'}]);}return Response.json([{...saved,inquiry_code:'TEST-1',email_status:'pending'}]);};
 try {const lead=parseLead({id:draft.id,source:'naila-callback',name:'Test Customer',email:'customer@example.com',phone:'',website:'',service:'Help me choose',message:'Please review our project.',page:'/'});assert.equal((await saveLead(lead)).code,'TEST-1');global.fetch=async()=>{throw Error('Mock database outage');};await assert.rejects(()=>saveLead(lead));}finally{global.fetch=original;}
 console.log('Passed 200 fictional conversations × 86 messages, 200 recognition patterns, long-context recovery, contact corrections, encryption, cancellation and mocked durable submission/failure.');
})().catch(e=>{console.error(e);process.exitCode=1;});
