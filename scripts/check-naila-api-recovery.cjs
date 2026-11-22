const { spawn } = require('node:child_process');
const { randomBytes, createHmac } = require('node:crypto');
const assert = require('node:assert/strict');
const secret = randomBytes(32).toString('hex');
const server = spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port','0'],{
  env:{...process.env,NAILA_SESSION_SECRET:secret},stdio:['ignore','pipe','pipe']
});
const timer = setTimeout(()=>{server.kill();console.error('API recovery verification timed out');process.exitCode=1;},30000);
(async()=>{
 try {
  const address=await new Promise((resolve,reject)=>{let output='';server.stdout.on('data',chunk=>{output+=chunk;const url=output.match(/Local:\s+(http:\/\/127\.0\.0\.1:\d+)/)?.[1];if(url&&output.includes('Ready'))resolve(url);});server.on('error',reject);server.on('exit',code=>reject(Error('Server exited '+code)));});
  const oldState=Buffer.from(JSON.stringify({id:'test-legacy-cookie',warnings:5,curses:8,expires:Math.floor(Date.now()/1000)+3600})).toString('base64url');
  let cookie='orbilect_naila='+oldState+'.'+createHmac('sha256',secret).update(oldState).digest('hex');
  const history=[];
  for(const [text,expected] of [
   ['Hey, I need help',/help/i],
   ['zqxvfr',/rephrase|help|clarify/i],
   ['I need help with technical SEO',/SEO|crawl|index/i],
   ['this is fucking frustrating, can you help with SEO?',/SEO|help/i],
   ['What is robots.txt?',/not a password/i],
   ['Do you do free audits?',/free SEO audit/i],
   ["What's the cost of that?",/free SEO audit/i],
   ['What current offers do you have?',/500|600/i],
  ]) {
   const response=await fetch(address+'/api/naila',{method:'POST',headers:{origin:'https://orbilectseo.com','sec-fetch-site':'same-origin','content-type':'application/json',cookie},body:JSON.stringify({action:'message',text,recentMessages:history})});
   const result=await response.json();assert.equal(response.status,200,text+' → '+JSON.stringify(result));assert.ok(!result.blocked,text);assert.match(result.text,expected,text);cookie=response.headers.get('set-cookie')?.split(';')[0]||cookie;history.push(text);
  }
  const longContext=await fetch(address+'/api/naila',{method:'POST',headers:{origin:'https://orbilectseo.com','sec-fetch-site':'same-origin','content-type':'application/json',cookie},body:JSON.stringify({action:'message',text:'I need help',recentMessages:Array.from({length:50},()=> '界'.repeat(400))})});
  assert.equal(longContext.status,200,'Fifty international-language context messages must fit the request limit');
  const external=await fetch(address+'/api/naila',{method:'POST',headers:{origin:'https://unrelated.example','sec-fetch-site':'cross-site','content-type':'application/json'},body:JSON.stringify({action:'message',text:'Hello'})});
  assert.equal(external.status,403);
  console.log('Passed live API recovery: legacy warning cookie, unclear message, topic recovery, frustration, glossary, audit cost context, promotions, and cross-origin rejection.');
 } finally { clearTimeout(timer);server.kill(); }
})().catch(error=>{console.error(error.message);process.exitCode=1;});
