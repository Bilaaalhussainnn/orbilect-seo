import { businessDescription } from "@/lib/site-identity";
import { pageSeo } from "@/lib/orbilect-search";
import HowWeWorkClosing from "./how-we-work-closing";
import TechnologyStack from "../_home/technology-stack";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileText, LayoutTemplate, Link2, Megaphone, ShoppingCart, Wrench } from "lucide-react";
import LeadPanel from "@/components/lead-panel";
import SeoTimeline from "../about/seo-timeline";
import HowWeWork from "../_home/growth/how-we-work";
import { ServiceHero, type ServiceScene } from "../services/_components/service-story";
import styles from "./how-we-work-page.module.css";

const seoBaseMetadata: Metadata = {
  title: "How We Work",
  description:
    "See how Orbilect SEO brings technical SEO, content, digital marketing, and website redesign together, from discovery and audit to proposal and kickoff.",
};

const scenes: ServiceScene[] = [
  {
    id: "search",
    label: "Discovery",
    address: "Engagement brief",
    title: "Understand what your business needs",
    copy: "We learn who you want to reach, where customers get stuck, and what would make the work worthwhile.",
    items: ["Business goals", "Customer priorities"],
  },
  {
    id: "page",
    label: "Assessment",
    address: "Website and search review",
    title: "Find the work worth doing first",
    copy: "We review your starting point and identify the pages, technical issues, and opportunities that deserve attention.",
    items: ["Priority pages", "Search visibility"],
  },
  {
    id: "links",
    label: "Kickoff",
    address: "Scope and delivery",
    title: "Start with an agreed plan",
    copy: "Before kickoff, you know what’s included, who owns each task, and how we’ll review progress.",
    items: ["Deliverables", "Review points"],
  },
];

const services = [
  {
    name: "Technical SEO",
    icon: Wrench,
    href: "/services/technical-seo",
    description: "Fix crawl, indexing, and performance issues on the pages your business depends on.",
  },
  {
    name: "On-page SEO",
    icon: FileText,
    href: "/services/on-page-seo",
    description: "Match priority pages to what customers search for and make the next step clear.",
  },
  {
    name: "Off-page SEO",
    icon: Link2,
    href: "/services/off-page-seo",
    description: "Improve the listings, references, and other places customers check before choosing you.",
  },
  {
    name: "Ecommerce SEO",
    icon: ShoppingCart,
    href: "/services/ecommerce-seo",
    description: "Help shoppers find the right collections and products, then measure how organic visits contribute to orders.",
  },
  {
    name: "Digital Marketing",
    icon: Megaphone,
    href: "/services/digital-marketing",
    description: "Coordinate paid search, social, and content around the offers and audiences that matter to your business.",
  },
  {
    name: "Website Redesign",
    icon: LayoutTemplate,
    href: "/services/website-redesign",
    description: "Rebuild difficult-to-use pages and protect important search destinations during launch.",
  },
];

export default function HowWeWorkPage() {
  return (
    <main>
      <ServiceHero
        eyebrow="How we work"
        title="From the first conversation"
        accent="to a clear plan for growth"
        intro="See how we assess your website, agree on the work, and get started. You’ll know what we’re doing, why it matters, and how we’ll measure progress."
        scenes={scenes}
        ctaLabel="Explore how we work"
      />

      <section id="service-intro" className={styles.section} aria-labelledby="agency-model-title">
        <div className={styles.wrap}>
          <header className={styles.intro}>
            <p className={styles.eyebrow} data-site-eyebrow="">Orbilect SEO</p>
            <h2 id="agency-model-title">A 360° SEO agency <span>built around your business</span></h2>
            <p>{businessDescription}</p>
            <p>We start with what’s holding your site back. That might be an indexing issue, a page that misses what customers are looking for, or a checkout that’s hard to use. Your audit gives us a starting point for deciding what to fix first.</p>
            <div className={styles.auditAction}>
              <LeadPanel />
            </div>
          </header>

          <nav aria-label="Explore Orbilect SEO services">
            <ul className={styles.services}>
              {services.map(({ name, href, description, icon: Icon }) => (
                <li key={href}>
                  <Link href={href} className={styles.service}>
                    <span className={styles.serviceBody}>
                      <span className={styles.serviceIcon} aria-hidden="true"><Icon size={19} /></span>
                      <span className={styles.serviceCopy}>
                        <strong>{name}</strong>
                      <small>{description}</small>
                      </span>
                    </span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <SeoTimeline />
      <HowWeWork />
      <TechnologyStack />
      
      <HowWeWorkClosing />
    </main>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/how-we-work", seoBaseMetadata as import("next").Metadata);
