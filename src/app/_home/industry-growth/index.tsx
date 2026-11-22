import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import LeadPanel from "@/components/lead-panel";
import cta from "@/styles/orbilect-cta.module.css";
import industries from "./industries.json";
import styles from "./industry-growth.module.css";

export { default as SearchComparison } from "./search-comparison";


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
