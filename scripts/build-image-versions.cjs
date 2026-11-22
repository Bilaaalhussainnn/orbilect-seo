const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),sharp=require('sharp');
sharp.concurrency(2);
const versions={},delivery={};
function walk(folder){const result=[];for(const entry of fs.readdirSync(folder,{withFileTypes:true})){const file=path.join(folder,entry.name);if(entry.isDirectory()){if(!['design-media','image-media','industry-showcases'].includes(entry.name))result.push(...walk(file));}else if(/\.(png|jpe?g|webp|avif|svg)$/i.test(file))result.push(file);}return result;}
(async()=>{
fs.mkdirSync('public/image-media',{recursive:true});let before=0,after=0;
for(const file of walk('public')){
 const input=fs.readFileSync(file),url='/'+file.slice('public/'.length).split(path.sep).map(encodeURIComponent).join('/'),hash=crypto.createHash('sha256').update(input).digest('hex').slice(0,12);versions[url]=hash;
 const wordmark=url.startsWith('/brand/')&&url.includes('wordmark');
 const toolLogo=/^\/(?:technology-stack|service-showcase\/logos|platform-logos)\//.test(url);
 if(!/\.(png|jpe?g)$/i.test(file)||(!wordmark&&!toolLogo&&input.length<80*1024))continue;
 const meta=await sharp(input).metadata();if((meta.pages??1)>1)continue;
 const quality=wordmark||toolLogo?82:68;
 const widths=wordmark?[240,480]:toolLogo?[96,192]:[480,960,1200];
 const variants=[];for(const width of widths){
  const dest='public/image-media/'+hash+'-q'+quality+'-'+width+'.webp';
  if(!fs.existsSync(dest))await sharp(input).rotate().resize({width,height:toolLogo?256:wordmark?200:1500,fit:'inside',withoutEnlargement:true}).webp({quality,effort:6}).toFile(dest);
  const m=await sharp(dest).metadata();if(!variants.some(v=>v.width===m.width))variants.push({src:dest.slice('public'.length),width:m.width,bytes:fs.statSync(dest).size});
 }
 const largest=variants.at(-1);if(largest.bytes<input.length*.85){delivery[url]={src:largest.src,srcSet:variants.map(v=>v.src+' '+v.width+'w').join(', ')};before+=input.length;after+=largest.bytes;}
}
fs.writeFileSync('src/lib/image-versions.json',JSON.stringify(versions,null,2)+'\n');fs.writeFileSync('src/lib/image-delivery.json',JSON.stringify(delivery,null,2)+'\n');fs.writeFileSync('src/lib/image-release.json',JSON.stringify({version:crypto.createHash('sha256').update(JSON.stringify(versions)).digest('hex').slice(0,12)})+'\n');
console.log('Versioned '+Object.keys(versions).length+' images; '+Object.keys(delivery).length+' additional WebP deliveries: '+(before/1048576).toFixed(2)+' MiB → '+(after/1048576).toFixed(2)+' MiB.');
})().catch(e=>{console.error(e);process.exitCode=1});
