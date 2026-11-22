import Link from "next/link";
import { ArrowUpRight, Building2, CarFront, Cloud, Factory, GraduationCap, HeartPulse, Hotel, Landmark, ShoppingBag, Theater, Truck, UtensilsCrossed } from "lucide-react";
import industries from "../_home/industry-growth/industries.json";
import styles from "./related-industries.module.css";
const icons: Record<string, typeof CarFront> = { "arts-entertainment": Theater, automotive: CarFront, ecommerce: ShoppingBag, education: GraduationCap, finance: Landmark, "food-beverages": UtensilsCrossed, healthcare: HeartPulse, hospitality: Hotel, logistics: Truck, manufacturing: Factory, "real-estate": Building2, saas: Cloud };
export default function RelatedIndustries({ current }: { current: string }) {
 return <nav className={styles.section} aria-labelledby="related-industry-title"><div className={styles.wrap}>
  <p className={styles.eyebrow}>Your next perspective</p><h2 id="related-industry-title">Explore other <span>industries</span></h2><p>Different customers. Different journeys. Discover how we bring search and website design together across the other eleven industries.</p>
  <ul>{industries.filter(item=>item.slug!==current).map(item=>{const Icon=icons[item.slug];return <li key={item.slug}><Link href={"/industries/"+item.slug}><span className={styles.symbol} aria-hidden="true"><i/><Icon/></span><strong>{item.name}</strong><ArrowUpRight size={18} aria-hidden="true"/></Link></li>;})}</ul>
  <Link className={styles.all} href="/industries">View all twelve industries</Link>
 </div></nav>;
}
