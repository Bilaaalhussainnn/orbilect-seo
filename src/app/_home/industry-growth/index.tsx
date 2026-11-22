import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import LeadPanel from "@/components/lead-panel";
import industries from "./industries.json";
import styles from "./industry-growth.module.css";

export { default as SearchComparison } from "./search-comparison";


const titleParts: Record<string, [string, string]> = {
  "arts-entertainment": ["Arts & ", "Entertainment"],
  automotive: ["Auto", "motive"],
  ecommerce: ["E", "commerce"],
  education: ["Edu", "cation"],
  finance: ["Fin", "ance"],
  "food-beverages": ["Food & ", "Beverages"],
  healthcare: ["Health", "care"],
  hospitality: ["Hospi", "tality"],
  logistics: ["Log", "istics"],
  manufacturing: ["Manu", "facturing"],
  "real-estate": ["Real ", "Estate"],
  saas: ["Sa", "aS"],
};

function IndustryImage({ slug }: { slug: string }) {
  return (
    <div className={styles.imageFrame} aria-hidden="true">
      <img className={styles.image} src={"/industry-covers/" + slug + ".webp"} alt="" width={640} height={800} loading="lazy" decoding="async" />
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
              <LeadPanel source="industries-audit" className={styles.primaryCta} />
            ) : (
              <Link href="/industries" className={styles.primaryCta}><span className={styles.ctaDisc} aria-hidden="true"><ArrowUpRight /></span>
                
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
                    <h3 aria-label={industry.name}><span>{titleParts[industry.slug]?.[0] ?? industry.name}</span><span className={styles.nameAccent}>{titleParts[industry.slug]?.[1]}</span></h3>
                    <p>{industry.summary}</p>
                    <span className={styles.view}><span className={styles.ctaDisc} aria-hidden="true"><ArrowUpRight /></span>Explore SEO services</span>
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
