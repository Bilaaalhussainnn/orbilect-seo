const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'), {
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}
}).outputText, filename);
const { answer } = require('../src/lib/naila/answers.ts');
const { declinesHelp, closingMessage } = require('../src/lib/naila/conversation.ts');
const { conversationServices, glossaryReply } = require('../src/lib/naila/knowledge-and-continuity.ts');
const terms = require('../src/lib/naila/technical-glossary.json');
const industries = require('../src/app/_home/industry-growth/industries.json');
const platforms=['WordPress','Shopify','Next.js','React','Webflow'];
const markets=['Karachi','Manchester','New York','Toronto','Sydney'];
const goals=['more qualified enquiries','more bookings','better mobile usability','clearer product discovery','more relevant search traffic'];
const hellos=['Hey, I need help','Hello, can you help me?','Hi, I need help','Can you help me?','Hey, can you help?'];
const closings=['That’ll be all','I don’t need any further help, thanks.','Thank you, that’ll be all.','Please close this chat.','That’ll be all, I don’t need any further help.'];
const conversations=[];
assert.equal(terms.length,100);
for (let i=0;i<100;i++) {
  const service=conversationServices[i%conversationServices.length];
  const industry=industries[i%industries.length];
  const platform=platforms[Math.floor(i/10)%platforms.length];
  const goal=goals[Math.floor(i/20)%goals.length];
  const market=markets[Math.floor(i/5)%markets.length];
  const term=terms[i];
  const turns=[
    [hellos[i%5],/help/i],
    ["I'm considering "+service.name+" for the website of our "+industry.name+" business in "+market,/we can help/i],
    ['We already have a website.',/share|review|current/i],
    ['It runs on '+platform+'.',/platform|current experience/i],
    ['Our goal is '+goal+'.',/goal.*(?:review|prioriti|measure)/i],
    ['What would you check first?',/start with/i],
    ['Do you do FREE audits?',/free SEO audit/i],
    ["What's the cost of that?",/free SEO audit/i],
    ["Let's return to the "+service.name+' work.',/we can help/i],
    ["What's the estimated cost of "+service.name+'?',/quote|scope|budget|650|1,500/i],
    ['Is ad spend included?',/separate/i],
    ['Can I get a discount?',/can’t approve a discount/i],
    ['What current offers do you have?',/promotion|offers|advertis/i],
    ['How long would the project take?',/timeline|schedule|scope/i],
    ['Can you promise first position on Google?',/guarantee/i],
    ['What is '+term.term+'?',new RegExp(term.definition.slice(0,25).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i')],
    ["I'm not sure I explained that well.",/keep going|one thing/i],
    ['Could you explain that in simpler words?',/simpler|one step|unpack/i],
    ['Please keep helping with our '+service.name+' project.',/we can help/i],
    ['What do you need from us to start?',/website URL|target market/i],
    ['Will you need my passwords?',/don’t send passwords/i],
    ['Where can I see design examples?',/gallery/i],
    ['How do I contact a strategist?',/within 24 hours/i],
    ['Thank you, that helps.',/keep going|welcome/i],
    [closings[i%5],null],
  ];
  const history=[],messages=[];
  for (let t=0;t<turns.length;t++) {
    const [question,expected]=turns[t];
    assert.equal(declinesHelp(question),t===24,'Unexpected close: scenario '+(i+1)+', '+question);
    const reply=t===24?{text:closingMessage,endChat:true}:answer(question,false,history.slice(-50));
    if(expected) assert.match(reply.text,expected,'Scenario '+(i+1)+', turn '+(t+1)+': '+question);
    assert.ok(!/outside what I can help|couldn.t quite understand|temporarily unavailable|24 hours.*try again/i.test(reply.text),'Conversation refused unexpectedly');
    messages.push({role:'customer',text:question},{role:'naila',text:reply.text,...(reply.actions?{links:reply.actions}:{}),...(reply.endChat?{endChat:true}:{})});
    history.push(question);
  }
  assert.equal(messages.length,50);
  conversations.push({id:'conversation-'+String(i+1).padStart(3,'0'),fictionalExample:true,service:service.name,industry:industry.name,platform,market,goal,messages});
}
// A definition must not prevent a later ordinary service request from succeeding.
assert.ok(glossaryReply('What is robots.txt?').text.includes('not a password'));
assert.ok(!declinesHelp('I don’t need an audit. Can you help with website redesign?'));
if(process.argv.includes('--write')) {
  fs.mkdirSync(path.join(__dirname,'../docs/naila'),{recursive:true});
  fs.writeFileSync(path.join(__dirname,'../docs/naila/100-conversations.json'),JSON.stringify(conversations,null,2)+'\n');
  const markdown=['# Naila: 100 fictional conversation examples','', 'Each conversation contains 50 messages: 25 customer messages and 25 tested Naila replies. These are support examples and regression cases, not customer transcripts or model-training claims.',''];
  for(const c of conversations){markdown.push('## '+c.id+' — '+c.industry+' / '+c.service,'');for(const m of c.messages){markdown.push('**'+(m.role==='customer'?'Customer':'Naila')+'**','',m.text,'');for(const a of m.links??[])markdown.push('['+a.text+']('+a.href+')','');}}
  fs.writeFileSync(path.join(__dirname,'../docs/naila/100-conversations.md'),markdown.join('\n').trimEnd()+'\n');
}
console.log('Passed 100 conversations × 50 messages = 5,000 messages; all 100 definitions, clarification recovery, follow-ups, offers and explicit closings covered.');
