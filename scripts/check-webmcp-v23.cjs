/* Exercise the installed React registration hook with simulated browser API surfaces. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript'),{randomUUID}=require('node:crypto');
async function test(surface,pathname='/'){
 const effects=[],cleanups=[],registered=new Map(),isPublic=!/^\/(api|admin|internal)(\/|$)/.test(pathname);
 const react={useState:value=>[typeof value==='boolean'?isPublic:typeof value==='function'?value():value,()=>{}],useRef:value=>({current:value}),useReducer:()=>[0,()=>{}],useEffect:effect=>effects.push(effect)};
 const modelContext={async registerTool(tool,options){registered.set(tool.name,tool);options?.signal?.addEventListener('abort',()=>registered.delete(tool.name));},unregisterTool(name){registered.delete(name);}};
 const document=surface==='document'?{modelContext}:{};const navigator=surface==='navigator'?{modelContext}:{};
 const fetch=async(url,request)=>{assert.equal(url,'/mcp');const body=JSON.parse(request.body);assert.ok(['search_public_pages','read_public_page','get_contact_information'].includes(body.params.name));return Response.json({jsonrpc:'2.0',id:body.id,result:{content:[{type:'text',text:'Public information only.'}]}});};
 function compile(file,imports){const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{allowJs:true,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;const module={exports:{}};const context={module,exports:module.exports,require:name=>{assert.ok(name in imports,name);return imports[name];},document,navigator,window:{location:{pathname}},AbortController,AbortSignal,fetch,crypto:{randomUUID},setInterval,clearInterval,console};vm.runInNewContext(code,context,{filename:file});return module.exports;}
 const definitions=compile('src/lib/agents/tools.ts',{});const hooks=compile('node_modules/use-webmcp-tool/useWebMCP.js',{react});const component=compile('src/components/agents/webmcp.tsx',{react,'next/navigation':{usePathname:()=>pathname},'use-webmcp-tool':hooks,'@/lib/agents/tools':definitions});
 component.default();for(const effect of effects){const cleanup=effect();if(typeof cleanup==='function')cleanups.push(cleanup);}await new Promise(resolve=>setImmediate(resolve));
 assert.equal(registered.size,surface==='none'||!isPublic?0:3,surface+' '+pathname);
 for(const tool of registered.values()){assert.ok(tool.name&&tool.description&&tool.inputSchema&&tool.execute);assert.equal(tool.annotations.readOnlyHint,true);const result=await tool.execute(tool.name==='read_public_page'?{path:'/about'}:tool.name==='search_public_pages'?{query:'SEO'}:{},{signal:new AbortController().signal});assert.ok(result.content?.[0].text);}
 for(const cleanup of cleanups)cleanup();assert.equal(registered.size,0,'Unmount must clean up tool registration');
}
(async()=>{await test('document');await test('navigator');await test('none');await test('document','/admin/naila');console.log('Passed WebMCP lifecycle tests: current document API, legacy navigator API, unsupported browser, private-page exclusion and public tool execution.');})().catch(e=>{console.error(e);process.exitCode=1;});
