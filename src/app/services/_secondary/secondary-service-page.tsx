import { InvestmentBeforeFaq } from "../../_components/investment-before-faq";
import type { Metadata } from "next";
import Link from "next/link";
import { secondaryServices, type SecondarySlug } from "./catalog";
import { ServiceHero } from "../_components/service-story";
import { ArrowUpRight } from "lucide-react";
import { HowWeWork } from "../../_home/growth";
import styles from "../_components/service-story.module.css";

export function serviceMetadata(slug: SecondarySlug): Metadata {
  const service = secondaryServices[slug];
  return { title: service.name, description: service.summary };
}

export function SecondaryServicePage({ slug }: { slug: SecondarySlug }) {
  const service = secondaryServices[slug];
  const proposal = "/contact?request=" + encodeURIComponent(service.name) + "#request-proposal";

  return (
    <main>
      <ServiceHero
        eyebrow={service.name}
        title="Grow with"
        accent={service.name}
        intro={service.summary}
        ctaLabel="See what we do"
        scenes={[
          { id: "search", label: "Find the story", address: "Story brief", title: "Give editors something worth covering", copy: service.work[0], items: ["Audience", "Evidence"] },
          { id: "page", label: "Pitch the right publication", address: "Publication shortlist", title: "Match the story to the publication", copy: service.work[1], items: ["Editorial fit", "Tailored pitch"] },
          { id: "links", label: "Review coverage", address: "Coverage report", title: "Follow coverage through to outcomes", copy: service.work[2], items: ["Coverage", "Referrals"] },
        ]}
      />

      <section id="service-intro" className={styles.light} aria-labelledby="secondary-service-scope">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we do</p>
            <h2 id="secondary-service-scope">What to expect from <span>{service.name}</span></h2>
          </div>
          <div className={styles.prose}>
            <p>{service.fit} We develop the story, prepare source material, and pitch it to publications that reach the right readers.</p>
            <p>We track relevant coverage, referral visits, and the enquiries those visits generate where conversion tracking is available.</p>
            <div className={styles.introActions}>
              <Link href={proposal} data-orbilect-cta="black">
                <span data-orbilect-cta-icon="" data-explicit-arrow="" aria-hidden="true"><ArrowUpRight className={styles.ctaArrow} size={16} /></span>
                Request a proposal
              </Link>
              <Link href="/services#secondary-services">Explore all marketing services</Link>
            </div>
          </div>
        </div>
      </section>

      <HowWeWork />
      <InvestmentBeforeFaq routes={["/services/" + slug]} />
    </main>
  );
}
