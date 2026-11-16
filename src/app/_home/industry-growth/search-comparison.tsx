import HomeCta from "../workbench/home-cta";
import InteractiveBrief, { type Brief } from "../workbench/interactive-brief";
import styles from "../workbench/workbench.module.css";

const approaches = [
  { label: "SEO", icon: "search", title: "Search engine optimization",
    detail: "Help search engines discover useful pages and match them to relevant queries. A shopper searching for a product category should find the collection page that meets that need.",
    points: ["Crawl and indexing", "Page relevance", "Internal links"] },
  { label: "GEO", icon: "network", title: "Generative engine optimization",
    detail: "Publish clear, well-sourced material that AI systems can understand and may reference. A buying guide with original evidence can give a comparison more substance.",
    points: ["Original evidence", "Clear sourcing", "Useful comparisons"] },
  { label: "AEO", icon: "answer", title: "Answer engine optimization",
    detail: "Write direct answers to specific questions. Make information like delivery times easy to find, then add the detail people need to make a decision.",
    points: ["Direct answers", "Descriptive headings", "Supporting detail"] },
] satisfies Brief[];

export default function SearchComparison() {
  return (
    <section id="seo-geo-aeo" className={styles.dark} aria-labelledby="comparison-title">
      <div className={styles.wrap}>
        <div className={styles.split}>
          <div className={styles.intro}>
            <p data-site-eyebrow="" data-reveal="off">Search strategies</p>
            <h2 id="comparison-title">SEO, GEO, and AEO <span>explained</span></h2>
            <p>People discover businesses through search results, AI-generated comparisons, and direct answers. See what each approach focuses on and how it can help customers find you.</p>
            <div className={styles.actions}><HomeCta href="/services">Explore our services</HomeCta></div>
          </div>
          <InteractiveBrief label="Compare search approaches" options={approaches} />
        </div>
      </div>
    </section>
  );
}
