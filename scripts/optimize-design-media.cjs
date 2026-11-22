const fs=require("node:fs/promises"),path=require("node:path"),crypto=require("node:crypto"),sharp=require("sharp");
const root=path.join(__dirname,".."), publicDir=path.join(root,"public"), outDir=path.join(publicDir,"design-media");
const industries=require("../src/app/_home/industry-growth/industries.json");
sharp.concurrency(2);
async function main(){
 await fs.mkdir(outDir,{recursive:true});const mapping={}, jobs=[];
 for(const {slug} of industries){const folder=path.join(publicDir,"industry-showcases",slug);let files=[];try{files=await fs.readdir(folder,{withFileTypes:true});}catch(e){if(e.code!=="ENOENT")throw e;}
  for(const file of files.filter(f=>f.isFile()&&/\.(png|jpe?g|webp|avif)$/i.test(f.name)).sort((a,b)=>a.name.localeCompare(b.name,"en",{numeric:true})).slice(0,16))jobs.push({file:path.join(folder,file.name),url:"/industry-showcases/"+slug+"/"+encodeURIComponent(file.name),widths:[240,320,480]});
 }
 for(const name of ["semrush.png","ahrefs.png"])jobs.push({file:path.join(publicDir,"technology-stack",name),url:"/technology-stack/"+name,widths:[96]});
 let sourceBytes=0,previewBytes=0;
 async function processJob(job){
  const input=await fs.readFile(job.file),hash=crypto.createHash("sha256").update(input).update("webp-v2-q64").digest("hex").slice(0,16),variants=[];
  for(const width of job.widths){const name=hash+"-"+width+".webp",dest=path.join(outDir,name);try{await fs.access(dest);}catch{await sharp(input).rotate().resize({width,withoutEnlargement:true}).webp({quality:64,effort:6}).toFile(dest);}
   const meta=await sharp(dest).metadata();variants.push({src:"/design-media/"+name,width:meta.width,bytes:(await fs.stat(dest)).size});
  }
  const largest=variants.at(-1);mapping[job.url]={src:largest.src,srcSet:variants.map(v=>v.src+" "+v.width+"w").join(", ")};
  if(job.widths.length>1){sourceBytes+=input.length;previewBytes+=largest.bytes;}
 }
 let cursor=0;await Promise.all([0,1].map(async()=>{while(cursor<jobs.length){const job=jobs[cursor++];await processJob(job);}}));
 const sorted=Object.fromEntries(Object.entries(mapping).sort(([a],[b])=>a.localeCompare(b)));
 await fs.writeFile(path.join(root,"src/lib/design-media.json"),JSON.stringify(sorted,null,2)+"\n");
 const dashboard={};for(const {slug} of industries)for(const [url,item] of Object.entries(sorted).filter(([url])=>url.startsWith("/industry-showcases/"+slug+"/")).slice(0,2))dashboard[url]=item;
 await fs.writeFile(path.join(root,"src/lib/landing-previews.json"),JSON.stringify(dashboard,null,2)+"\n");
 console.log("Design previews: "+(jobs.length-2)+" originals "+(sourceBytes/1048576).toFixed(2)+" MiB → "+(previewBytes/1048576).toFixed(2)+" MiB at 480px ("+(100-previewBytes/sourceBytes*100).toFixed(1)+"% smaller). Original files unchanged.");
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
