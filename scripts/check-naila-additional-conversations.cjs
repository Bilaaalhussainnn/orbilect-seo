const fs=require('node:fs'),assert=require('node:assert/strict'),ts=require('typescript');
require.extensions['.ts']=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,file);
const {answer}=require('../src/lib/naila/answers.ts'),{conversationServices}=require('../src/lib/naila/knowledge-and-continuity.ts'),{closingMessage,declinesHelp}=require('../src/lib/naila/conversation.ts');
const industries=require('../src/app/_home/industry-growth/industries.json'),glossary=require('../src/lib/naila/technical-glossary.json');
const examples=[];
for(let i=0;i<100;i++){
 const service=conversationServices[i%10],industry=industries[i%12],history=[];
 const opening = ["I'm considering ","I'm looking for ","I'm interested in ","Let's return to ","Please keep helping with our "][i%5];
 const branches=[
  ['We already have a website.','It runs on WordPress.','Our goal is more bookings.','What would you check first?','Do you do FREE audits?',"What's the cost of that?",'What do you need from us to start?'],
  ['It runs on Shopify.','Our goal is more relevant search traffic.','What current offers do you have?','Can I get a discount?','How long would the project take?','Can you promise first position on Google?','What do you need from us to start?'],
  ['Our goal is more qualified enquiries.','What would you check first?',"What's the estimated cost of "+service.name+'?','Is ad spend included?','Will you need my passwords?','Where can I see design examples?','What do you need from us to start?'],
  ['We already have a website.','It runs on Next.js.','Our goal is better mobile usability.','Where can I see design examples?','What current offers do you have?','How long would the project take?','Will you need my passwords?'],
  ['It runs on Webflow.','Our goal is clearer product discovery.',"What's the estimated cost of "+service.name+'?','Can I get a discount?','What current offers do you have?','Is ad spend included?','How long would the project take?'],
  ['We already have a website.','Our goal is more bookings.','You misunderstood me.','Please keep helping with our '+service.name+' project.','What would you check first?','Do you do FREE audits?',"What's the cost of that?"],
  ['Our goal is more qualified enquiries.','Will you need my passwords?','What is your privacy policy?','What would you check first?',"What's the estimated cost of "+service.name+'?','How long would the project take?','What do you need from us to start?'],
  ['It runs on React.','Our goal is better mobile usability.','What would you check first?','Could you explain that in simpler words?','Please keep helping with our '+service.name+' project.','Where can I see design examples?','What do you need from us to start?'],
  ['We already have a website.','It runs on WordPress.','What would you check first?','Can you promise first position on Google?','How long would the project take?','What current offers do you have?','Will you need my passwords?'],
  ['Our goal is more relevant search traffic.','Do you do FREE audits?',"What's the cost of that?",'Please keep helping with our '+service.name+' project.','Where can I see design examples?','What do you need from us to start?','Will you need my passwords?']
 ];
 const questions=[opening+service.name+' for our '+industry.name+' business.',...branches[Math.floor(i/10)],'What is '+glossary[i].term+'?','How do I contact a strategist?','Thank you, that helps.',['That’ll be all','Please close this chat.','I don’t need any further help, thanks.'][i%3]];
 const messages=[{role:'naila',text:'Hello! I’m Naila 🙂 How can I help you today?'}];
 questions.forEach((q,t)=>{let reply;if(t===11){assert.ok(declinesHelp(q));reply={text:closingMessage,endChat:true};}else reply=answer(q,false,history);
 assert.ok(reply.text?.length>20);assert.ok(!/temporarily unavailable|24 hours.*try again|couldn.t quite understand/i.test(reply.text));
 if(q==='You misunderstood me.')assert.match(reply.text,/one step|trying to achieve/i);
 assert.ok(!/Could you rephrase that|outside what I can help/i.test(reply.text),q);
 messages.push({role:'customer',text:q},{role:'naila',text:reply.text,...(reply.actions?{links:reply.actions}:{}),...(reply.endChat?{endChat:true}:{})});history.push(q);
 });
 assert.equal(messages.length,25);examples.push({id:'additional-'+String(i+1).padStart(3,'0'),fictionalExample:true,industry:industry.name,service:service.name,messages});
}
assert.match(answer('Can I sign in to Orbilect OS with Gmail?',false).text,/personal email accounts are not permitted/i);
assert.match(answer('Can I take screenshots of Orbilect OS customer data?',false).text,/screenshots.*prohibited/i);
if(process.argv.includes('--write')){
 fs.writeFileSync('docs/naila/100-additional-conversations.json',JSON.stringify(examples,null,2)+'\n');
 fs.writeFileSync('docs/naila/100-additional-conversations.md','# 100 additional Naila conversations\n\nEach contains exactly 25 messages: an opening from Naila, 12 customer messages and 12 tested replies. Fictional examples generated through the actual reply engine; regression material, not model training or real customers.\n\n'+examples.map(c=>'## '+c.id+' — '+c.service+' / '+c.industry+'\n\n'+c.messages.map(m=>'**'+m.role+'**: '+m.text).join('\n\n')).join('\n\n')+'\n');
}
console.log('Passed 100 additional conversations × 25 messages, recovery, OS policies, service/pricing follow-ups and explicit chat endings.');
