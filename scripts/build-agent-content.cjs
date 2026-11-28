/* Generate public Markdown from the same production HTML users and crawlers receive. */
const fs=require('node:fs'),path=require('node:path'),{parse}=require('next/dist/compiled/node-html-parser');
const origin='https://orbilectseo.com';
const clean=s=>s.replace(/\s+/g,' ').trim();
const escape=s=>s.replace(/([\\`*_\[\]])/g,'\\$1');
function absolute(href){if(typeof href!=='string'||!href)return '';try{const u=new URL(href,origin);return ['https:','http:','mailto:','tel:'].includes(u.protocol)?u.href:'';}catch{return '';}}
function markdown(node){
 if(node.nodeType===3)return escape(node.text.replace(/\s+/g,' '));
 const tag=node.tagName?.toLowerCase()??'';
 const children=()=>node.childNodes.map(markdown).join('');
 if(['script','style','template','svg','canvas','nav','aside','dialog','form','button','input','select','textarea'].includes(tag)||node.hasAttribute?.('hidden'))return '';
 if(/^h[1-6]$/.test(tag))return '\n\n'+'#'.repeat(Number(tag[1]))+' '+escape(clean(node.getAttribute('aria-label')??node.text))+'\n\n';
 if(tag==='pre')return '\n\n```\n'+node.text.trim()+'\n```\n\n';
 if(tag==='code')return '`'+node.text.replace(/`/g,'')+'`';
 if(tag==='img'){const alt=node.getAttribute('alt');return alt?'\n\n!['+escape(alt)+']('+absolute(node.getAttribute('src'))+')\n\n':'';}
 if(tag==='a'){const url=absolute(node.getAttribute('href'));const label=clean(children());return label&&url?'['+label+']('+url+')':label;}
 if(tag==='table'){
  const rows=node.querySelectorAll('tr').map(tr=>tr.querySelectorAll('th,td').map(cell=>clean(markdown(cell)).replace(/\|/g,'\\|')));
  if(!rows.length)return '';const width=Math.max(...rows.map(r=>r.length));for(const row of rows)while(row.length<width)row.push('');
  return '\n\n'+(node.querySelector('caption')?clean(node.querySelector('caption').text)+'\n\n':'')+'| '+rows[0].join(' | ')+' |\n| '+Array(width).fill('---').join(' | ')+' |\n'+rows.slice(1).map(row=>'| '+row.join(' | ')+' |').join('\n')+'\n\n';
 }
 if(tag==='ul'||tag==='ol')return '\n\n'+node.childNodes.filter(n=>n.tagName==='LI').map((li,i)=>(tag==='ol'?(i+1)+'. ':'- ')+markdown(li).trim().replace(/\n/g,'\n  ')).join('\n')+'\n\n';
 if(tag==='br')return '\n';
 if(tag==='strong'||tag==='b')return '**'+children().trim()+'**';
 if(tag==='summary')return '\n\n**'+children().trim()+'**\n\n';
 if(['p','section','article','div','figure','figcaption','details','dl','dt','dd','blockquote','header','footer'].includes(tag))return '\n\n'+children().trim()+'\n\n';
 return children();
}
const xml=fs.readFileSync('.next/server/app/sitemap.xml.body','utf8');
const routes=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const manifest=[];fs.rmSync('public/agent-markdown',{recursive:true,force:true});fs.mkdirSync('public/agent-markdown',{recursive:true});
for(const route of routes){
 if(/^\/(api|admin|internal)(\/|$)/.test(route))throw Error('Private route in sitemap');
 const doc=parse(fs.readFileSync('.next/server/app/'+(route==='/'?'index':route.slice(1))+'.html','utf8'));
 const main=doc.querySelector('main');if(!main)throw Error('No main content: '+route);
 const title=clean(main.querySelector('h1')?.getAttribute('aria-label')??main.querySelector('h1')?.text??'Orbilect SEO');
 const description=doc.querySelector('meta[name="description"]')?.getAttribute('content')??'';
 const file=(route==='/'?'index':route.slice(1))+'.md';const dest=path.join('public/agent-markdown',file);fs.mkdirSync(path.dirname(dest),{recursive:true});
 for(const node of main.querySelectorAll('[aria-hidden="true"],h1'))node.remove();
 const body=('# '+escape(title)+'\n\n'+markdown(main)).split("\n").map(line=>line.trimEnd()).join("\n").replace(/\n{3,}/g,'\n\n').trim();
 fs.writeFileSync(dest,body+'\n\n---\n\nCanonical page: '+origin+route+'\n\nContent use: search=yes, ai-input=yes, ai-train=no.\n');
 manifest.push({path:route,title,description,file,markdownUrl:origin+'/agent-markdown/'+file});
}
fs.writeFileSync('public/agent-markdown/manifest.json',JSON.stringify(manifest,null,2)+'\n');
const groups=[['Company and contact',p=>['/','/about','/our-team','/how-we-work','/contact','/staffing','/reviews'].includes(p.path)],['Services',p=>p.path==='/services'||p.path.startsWith('/services/')],['Industries and design',p=>p.path==='/website-design-gallery'||p.path.startsWith('/industries')],['Guides and articles',p=>p.path.startsWith('/blogs')],['Pricing and policies',p=>['/pricing','/privacy-policy','/terms-and-conditions','/how-free-audit-works'].includes(p.path)],['Newsroom and other public pages',p=>true]];
const seen=new Set(),lines=['# Orbilect SEO','','> Public information about Orbilect SEO services, industries, guides, pricing and contact options. Orbilect SEO is a product of Orbilect Labs.','','The Intelligence Behind How Customers Find Your Brand.','','Use these pages as sources and link to their canonical HTML URLs when citing them. Prices, availability and service scope require confirmation against the live pricing page and a written quotation. No ranking, rich-result or delivery outcome is guaranteed.','','Public content may be used for search and inference (ai-input); AI model training is not permitted by the published Content-Signal preference. These signals do not grant access to private pages.','','Each link below opens a Markdown version of the corresponding public page. Ordinary HTML remains available at the canonical page URL shown in each document. No sign-in, customer records, admin data or internal systems are included.','','MCP endpoint: https://orbilectseo.com/mcp. Server card: https://orbilectseo.com/mcp/server-card. Browser tools expose the same public read-only information.',''];
for(const [heading,test]of groups){const pages=manifest.filter(p=>!seen.has(p.path)&&test(p));if(!pages.length)continue;lines.push('## '+heading,'');for(const p of pages){seen.add(p.path);lines.push('- ['+p.title+']('+p.markdownUrl+'): '+p.description);}lines.push('');}
fs.writeFileSync('public/llms.txt',lines.join('\n').trimEnd()+'\n');
console.log('Generated '+manifest.length+' public Markdown pages, a matching manifest and llms.txt.');
module.exports={markdown};
