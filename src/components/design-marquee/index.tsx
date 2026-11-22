"use client";
import { AssetImage } from "@/components/optimized-image";

import { useEffect, useRef, useState } from "react";
import type { GalleryDesign } from "@/lib/design-gallery";
import styles from "./marquee.module.css";

export default function DesignMarquee({images,rows=2,label,compact=false}:{images:GalleryDesign[];rows?:number;label:string;compact?:boolean}){
 const element=useRef<HTMLDivElement>(null);const [near,setNear]=useState(false),[ready,setReady]=useState(false);
 useEffect(()=>{const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setNear(true);observer.disconnect();}},{rootMargin:"600px"});if(element.current)observer.observe(element.current);return()=>observer.disconnect();},[]);
 useEffect(()=>{if(!near)return;let live=true;
  const probes=[...new Map(images.map(image=>[image.src,image])).values()].map(image=>new Promise<void>(resolve=>{
   const probe=new window.Image();probe.decoding="async";probe.onload=()=>{probe.decode().catch(()=>{}).then(()=>resolve());};probe.onerror=()=>resolve();
   if(image.srcSet){probe.sizes="(max-width: 800px) 144px, 240px";probe.srcset=image.srcSet;}probe.src=image.src;
  }));Promise.all(probes).then(()=>{if(live)setReady(true);});return()=>{live=false;};
 },[near,images]);
 const perRow=Math.max(1,Math.ceil(images.length/rows));
 return <div ref={element} className={styles.gallery} data-ready={ready} data-compact={compact} aria-label={label+" sample website designs"}>
  {Array.from({length:rows},(_,row)=>{
   const part=images.slice(row*perRow,(row+1)*perRow),designs=part.length?part:images.slice(0,perRow);
   if(!designs.length)return null;
   const filled=Array.from({length:Math.max(16,designs.length)},(_,i)=>designs[i%designs.length]);
   return <div className={styles.lane} key={row}><div className={`${styles.track} ${row%2===0?styles.right:""}`}>
    {[0,1].map(group=><div className={styles.group} key={group} aria-hidden={group===1?true:undefined}>{filled.map((image,index)=><figure className={styles.card} key={index} aria-hidden={index>=designs.length?true:undefined}>
     <AssetImage src={image.src} srcSet={image.srcSet} sizes="(max-width: 800px) 144px, 240px" alt={image.name+" — sample website design"} width={480} height={600} loading={near?"eager":"lazy"} decoding="async" draggable={false}/>
    </figure>)}</div>)}
   </div></div>;
  })}
 </div>;
}
