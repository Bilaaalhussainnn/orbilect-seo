import listedIndustries from "../../app/_home/industry-growth/industries.json";
import { businessDescription } from "@/lib/site-identity";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import TechnologyScene from "../header/technology-scene";
import { SocialLinks } from "../header/social-links";
import styles from "./footer.module.css";

const industryLinks = listedIndustries.map(({ name, slug }) => [name, "/industries/" + slug]);
const groups = [
  { title: "Services", href: "/services", links: [
    ["On-page SEO", "/services/on-page-seo"], ["Off-page SEO", "/services/off-page-seo"],
    ["Technical SEO", "/services/technical-seo"], ["Ecommerce SEO", "/services/ecommerce-seo"],
    ["Website redesign", "/services/website-redesign"],
  ] },
  { title: "Industries", href: "/industries", links: industryLinks },
  { title: "Company", href: "/about", links: [
    ["Pricing", "/pricing"], ["How we work", "/how-we-work"], ["Careers", "/careers"],
    ["Staffing", "/staffing"], ["Blogs", "/blogs"], ["Website Design Gallery", "/website-design-gallery"],
  ] },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <TechnologyScene showGrowthOrbs={false} />
      <div className={styles.inner}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link href="/" aria-label="Orbilect SEO home">
              <Image src="/brand/orbilect-seo-wordmark-dark.png" alt="Orbilect SEO" width={176} height={47} unoptimized />
            </Link>
            <p>{businessDescription}</p>
            <a href="mailto:info@orbilectseo.com" className={styles.contact}><Mail size={17} aria-hidden="true" />info@orbilectseo.com</a>
            <a href="tel:+16466400070" className={styles.contact}><Phone size={17} aria-hidden="true" />+1 (646) 640-0070</a>
            <SocialLinks className={styles.social} />
          </div>
          <nav aria-label="Footer navigation" className={styles.navigation}>
            {groups.map(({ title, href, links }) => (
              <section key={title} className={styles.group}>
                <h2><Link href={href}>{title}</Link></h2>
                <ul>{links.map(([label, url]) => <li key={url}><Link href={url}>{label}</Link></li>)}</ul>
              </section>
            ))}
          </nav>
        </div>
        <div className={styles.legal}>
          <p>© {process.env.ORBILECT_COPYRIGHT_YEAR} Orbilect SEO. All rights reserved.</p>
          <nav aria-label="Legal links">
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms-and-conditions">Terms and conditions</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
