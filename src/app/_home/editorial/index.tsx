import { ServicesReputation } from "../../services/_components/seo-support";
import GlobalLocations from "@/components/global-locations";
import { HomeBlogCards } from "../../blogs/blog-directory";
import { EcommerceManagementSection } from "../../services/ecommerce-management/ecommerce-management-section";
import GalleryPromotion from "../../website-design-gallery/gallery-promotion";
import FinalCta from "../final-cta";
import FaqAuditButton from "./faq-audit-button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import cta from "@/styles/orbilect-cta.module.css";
import styles from "./editorial.module.css";



const faqs = [
  {
    question: "How long does SEO take to show results?",
    answer: "It depends on your starting point, competition, and how quickly changes go live. We use the audit to identify what to fix first and agree on what we’ll measure over time.",
  },
  {
    question: "When will I start seeing changes?",
    answer: "You can review updates to pages and content as soon as they go live. Search engines need time to revisit those pages. We look for changes in indexing and search impressions before judging trends in traffic, enquiries, or sales.",
  },
  {
    question: "How much does Orbilect SEO cost?",
    answer: "Regular Starter SEO starts at $650 per billing cycle. Published promotional offers have separate eligibility and terms. Your quote depends on the size of your website, the markets you serve, and the work needed. Your proposal outlines the scope, deliverables, and fees.",
  },
  {
    question: "What is your refund policy?",
    answer: "Refund eligibility depends on the terms in your signed agreement. If you want us to review a payment, send us the invoice number and a brief description of the issue.",
  },
  {
    question: "What services does Orbilect SEO offer?",
    answer: "We offer on-page SEO, off-page SEO, technical SEO, ecommerce SEO, digital marketing, and website redesign. On-page SEO can include keyword research, SEO content writing, metadata, and internal linking.",
  },
  {
    question: "What does the free SEO audit cover?",
    answer: "We review your website for search visibility gaps, technical issues, and on-page improvements. We flag the fixes we’d prioritize and explain why they matter for your business.",
  },
  {
    question: "Do you guarantee a #1 Google ranking?",
    answer: "Search rankings vary by query, location, competition, and the results Google chooses to show. We agree on practical targets and track progress through search visibility, relevant traffic, and conversions where tracking is available.",
  },
  {
    question: "Can you help with Shopify and other ecommerce websites?",
    answer: "Yes. We can review product pages, collections, site navigation, and technical issues such as duplicate URLs. We prioritize changes that help shoppers find the products they’re looking for.",
  },
  {
    question: "Can you work with our existing website and team?",
    answer: "Yes. We can coordinate with your developers, writers, or marketing team and agree on who implements each change. If a redesign is part of the scope, we plan for URL redirects and existing pages that already attract search traffic.",
  },
  {
    question: "How will I know if the work is paying off?",
    answer: "We start with a baseline and agree on the metrics that matter to your business. Reporting can cover search impressions, clicks, priority pages, and leads or sales where tracking is available.",
  },
];

export default function HomeEditorial() {
  return (
    <>
      <section id="our-blogs" className={styles.blogs} aria-labelledby="blogs-heading">
        <div className={styles.container}>
          <div className={styles.blogHeader}>
            <div>
              <p data-site-eyebrow="" data-reveal="off">{"Our blogs"}</p>
              <h2 data-site-heading="" id="blogs-heading" data-orbilect-title="">Practical guides for <span>better search visibility</span></h2>
              <p>Find out what to fix, what to measure, and where to start with SEO.</p>
            </div>
            <Link href="/blogs" className={`${cta.cta} ${cta.ctaBlack} ${styles.button}`} data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />

              View all blogs
            </Link>
          </div>

          <HomeBlogCards />
        </div>
      </section>

      <EcommerceManagementSection />
      <GalleryPromotion home />
      <GlobalLocations />
      <ServicesReputation />
      <HomeFaq hideSectionLabel />
    <FinalCta />
    </>
  );
}

export function HomeFaq({
  hideCta = false,
  hideSectionLabel = false,
  items = faqs,
  introTitle = "What to expect from Orbilect SEO",
  introCopy = "Get clear answers on pricing, timelines, and how we work. If you’re wondering where your own website stands, start with a free audit.",
}: {
  hideCta?: boolean;
  hideSectionLabel?: boolean;
  items?: ReadonlyArray<{ question: string; answer: string }>;
  introTitle?: string;
  introCopy?: string;
}) {
  return (
      <section id="faqs" className={styles.faqs} aria-labelledby="faq-heading">
        <div className={`${styles.container} ${styles.faqLayout}`}>
          <div className={styles.faqIntro}>
            {!hideSectionLabel && (
              <>
                <div className="orbilect-section-label">SEO FAQ</div>
                <p data-site-eyebrow="" data-reveal="off">Frequently asked questions</p>
              </>
            )}
            <h2 data-site-heading="" id="faq-heading" data-orbilect-title=""><span>Frequently</span><br />asked questions</h2>
            <div className={styles.introCard}>
              <h3>{introTitle}</h3>
              <p>{introCopy}</p>
              {hideCta ? null : (
                <FaqAuditButton className={`${cta.cta} ${cta.ctaBlack} ${styles.button}`}>
                <span className={cta.ctaIcon} aria-hidden="true"><ArrowUpRight /></span>
                Get a free SEO audit
              </FaqAuditButton>
              )}
            </div>
          </div>

          <div className={styles.questions}>
            {items.map(({ question, answer }, index) => (
              <details key={question} name="orbilect-faq" open={index === 0}>
                <summary>
                  {question}
                  <span className={styles.toggle} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
  );
}
