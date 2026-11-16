import { TrendingUp } from "lucide-react";
import SearchChannelScene from "../about/search-channel-scene";
import styles from "../about/search-strategy-sections.module.css";

export default function OrganicGrowthComparison() {
  return (
    <section className={styles.comparison} aria-labelledby="organic-growth-title">
      <div className={styles.container}>
        <div className="orbilect-section-label">{"Organic Search Strategy"}</div>
        <p data-site-eyebrow="" data-reveal="off">{"Why we invest in organic growth"}</p>
        <h2 data-site-heading="" id="organic-growth-title" className={styles.heading} data-orbilect-title="">
          Why we invest in <span>organic growth</span>
        </h2>
        <p className={styles.intro}>
          We lead with SEO because the work improves pages your business owns.
          A useful service page, product guide, or collection page can keep
          bringing in customers without a media charge for each organic click.
          Paid campaigns are useful when you need reach quickly, want to test an
          offer, or have a time-sensitive launch.
        </p>

        <SearchChannelScene variant="markers" />

        <aside className={styles.impact}>
          <TrendingUp size={22} aria-hidden="true" />
          <p>
            <strong>Where we start.</strong> We fix the pages with the clearest
            path from search to enquiry, booking, or sale. Then we track what
            those pages deliver and use the results to decide where to invest
            next. Organic growth takes time, and key pages need upkeep as
            demand and competition change.
          </p>
        </aside>
      </div>
    </section>
  );
}
