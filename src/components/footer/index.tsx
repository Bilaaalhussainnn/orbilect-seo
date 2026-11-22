import TypingTagline from "@/components/typing-tagline";
import Image from "@/components/optimized-image";
import Link from "next/link";
import { Depth } from "@/app/_home/workbench/depth";
import { Search, Mail, MapPin, Phone } from "lucide-react";
import industries from "../../app/_home/industry-growth/industries.json";
import { pakistanAddress } from "@/lib/site-identity";
import { SocialLinks } from "../header/social-links";
import styles from "./footer.module.css";
const groups = [
  { title: "Search expertise", links: [["On-page SEO","/services/on-page-seo"],["Off-page SEO","/services/off-page-seo"],["Technical SEO","/services/technical-seo"],["Ecommerce SEO","/services/ecommerce-seo"],["SEO content writing","/services/seo-content-writing"],["Digital PR","/services/digital-pr"]] },
  { title: "Growth & design", links: [["Digital marketing","/services/digital-marketing"],["PPC management","/services/ppc-management"],["Paid social","/services/paid-social-advertising"],["Email marketing","/services/email-marketing"],["Marketing analytics","/services/marketing-analytics"],["Website redesign","/services/website-redesign"],["Landing page design","/services/landing-page-design"],["Ecommerce management","/services/ecommerce-management"]] },
  { title: "Industries", links: industries.map(item=>[item.name,"/industries/"+item.slug]) },
  { title: "Company", links: [["About us","/about"],["Our team","/our-team"],["How we work","/how-we-work"],["Careers","/careers"],["Offshore staffing","/staffing"],["Responsibility","/corporate-social-responsibility"],["Contact us","/contact"]] },
  { title: "Explore & learn", links: [["Website Design Gallery","/website-design-gallery"],["Blogs","/blogs"],["Newsroom","/newsroom"],["Reviews","/reviews"],["Pricing","/pricing"],["How the free audit works","/how-free-audit-works"],["All services","/services"]] },
];
export default function SiteFooter() {
  return <footer className={styles.footer}>
    <div className={styles.wrap}>
      <div className={styles.brand}><Link href="/" aria-label="Orbilect SEO home"><Image src="/brand/orbilect-seo-wordmark-dark.png" width={176} height={47} alt="Orbilect SEO" unoptimized/></Link><Depth><div className={styles.signature}><span className={styles.emblem} aria-hidden="true"><Search /></span><p><strong><TypingTagline onView /></strong></p></div></Depth></div>
      <div className={styles.columns}>
        {groups.map(group=><nav key={group.title} aria-label={group.title+" footer links"}><h2>{group.title}</h2><ul>{group.links.map(([label,href])=><li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>)}
        <section className={styles.contacts} aria-labelledby="footer-contact"><h2 id="footer-contact">Contact info</h2>
          <h3>United States</h3><a href="tel:+16466400070"><Phone/>+1 (646) 640-0070</a><a href="mailto:info@orbilectseo.com"><Mail/>info@orbilectseo.com</a><p><MapPin/>450 Park Avenue, Suite 2800, New York, NY 10022, United States</p>
          <h3>Pakistan</h3><a href="tel:+923092152810"><Phone/>+92 309 215-2810</a><a href="mailto:info@orbilectseo.com"><Mail/>info@orbilectseo.com</a><p><MapPin/>{pakistanAddress}</p>
        </section>
      </div>
      <div className={styles.social}><p>Follow us for more</p><SocialLinks className={styles.icons}/></div>
    </div>
    <div className={styles.legal}><div className={styles.wrap}><p>© {process.env.ORBILECT_COPYRIGHT_YEAR} Orbilect SEO. All rights reserved.</p><nav aria-label="Legal links"><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms-and-conditions">Terms and conditions</Link></nav></div></div>
  </footer>;
}
