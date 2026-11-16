import IndustrySearchDevices from "../../industries/industry-search-devices";
import deviceStyles from "../../industries/industry-search-devices.module.css";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HeroAudit from "@/components/lead-panel/hero-audit";
import LeadPanel from "@/components/lead-panel";
import cta from "@/styles/orbilect-cta.module.css";
import industries from "./industries.json";
import styles from "./industry-growth.module.css";

export { default as SearchComparison } from "./search-comparison";

type Industry = (typeof industries)[number];

function IndustryImage({ slug }: { slug: string }) {
  return (
    <div className={styles.imageFrame} aria-hidden="true">
      <div className={styles.image}
        style={{ backgroundImage: `url("/industries/${slug}.png")` }} />
    </div>
  );
}

export function Industries({ directory = false }: { directory?: boolean } = {}) {
  return (
    <>
      <section id="industries" className={styles.section} aria-labelledby="industries-title">
      <div className={styles.wrap}>
        <p data-site-eyebrow="" data-reveal="off">{"Industry expertise"}</p>
        <h2 data-site-heading="" id="industries-title" className={styles.heading} data-orbilect-title="">
          Industries <span>we serve</span>
        </h2>

        <div className={styles.industryLayout}>
          <div className={styles.sticky}>
            <p className={styles.intro}>
              A hotel needs direct bookings. A manufacturer needs qualified RFQs.
              We build your SEO strategy around what your customers search for
              and the action they need to take next.
            </p>
            {directory ? (
              <LeadPanel source="industries-audit" />
            ) : (
              <Link href="/industries" className={`${cta.cta} ${cta.ctaBlack}`} data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />
                
                Explore industries
              </Link>
            )}
          </div>

          <ul className={styles.industryList}>
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link className={styles.industryRow} href={`/industries/${industry.slug}`}>
                  <IndustryImage slug={industry.slug} />
                  <div className={styles.industryCopy}>
                    <h3>{industry.name}</h3>
                    <p>{industry.summary}</p>
                    <span className={styles.view}>Explore SEO services <ArrowUpRight size={17} aria-hidden="true" /></span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
    </>
  );
}

export function IndustryDetail({ industry }: { industry: Industry }) {
  return (
    <main className={styles.section}>
      <div className={styles.wrap}>
        <div className="orbilect-section-label">{"Industry SEO"}</div>
        <div className={deviceStyles.detailHero}>
          <div>
            <p data-site-eyebrow="" data-reveal="off">{"Industry growth"}</p>
            <h1 data-site-heading="" className={styles.heading} data-orbilect-title="">SEO for <span>{industry.name}</span></h1>
            <p className={styles.intro}>{industry.summary}</p>
            <HeroAudit source="industry-detail-audit" />
          </div>
          <IndustrySearchDevices slug={industry.slug} title={industry.name} />
        </div>

        <div className={styles.detailGrid}>
          <IndustryImage slug={industry.slug} />
          <div>
            <div className="orbilect-section-label">{"Search Opportunity"}</div>
            <p data-site-eyebrow="" data-reveal="off">{"Why search visibility matters"}</p>
            
            <p>{industry.challenge}</p>
            <div className="orbilect-section-label">{"SEO Priorities"}</div>
            <p data-site-eyebrow="" data-reveal="off">{"What we prioritize"}</p>
            
            <ul>{industry.focus.map((item) => <li key={item}>{item}</li>)}</ul>
            <LeadPanel source="industry-detail-audit" />
          </div>
        </div>

        <Link href="/industries#industries" className={`${cta.cta} ${cta.ctaBlack}`} data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />
          
          Explore other industries
        </Link>
      </div>
    </main>
  );
}
