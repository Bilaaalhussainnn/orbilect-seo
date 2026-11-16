import SearchChannelScene from "./search-channel-scene";
import { ChartNoAxesCombined, FileText, Search, Wrench } from "lucide-react";
import styles from "./search-strategy-sections.module.css";

const comparisons = [
  {
    dimension: "Time to visibility",
    paid: "Ads can start appearing once the campaign is approved and live.",
    organic: "Visibility builds as search engines discover your updates and those pages earn stronger positions.",
  },
  {
    dimension: "What you pay for",
    paid: "Your media budget buys distribution. On search campaigns, that typically means paying for clicks.",
    organic: "Your budget funds research, technical improvements, and content. Organic clicks have no media fee.",
  },
  {
    dimension: "What happens when spending pauses",
    paid: "New traffic from the paused campaign stops when its ads stop running.",
    organic: "Published pages can keep attracting visits, though rankings fluctuate and important pages still need upkeep.",
  },
  {
    dimension: "Where it fits",
    paid: "Launches, seasonal promotions, and testing an offer against a specific audience.",
    organic: "Building visibility for recurring searches around your products, services, and locations.",
  },
];

const reasons = [
  {
    icon: Search,
    deliverable: "Search intent and page map",
    title: "We start with customer intent",
    body: "We map the searches that matter to your business to the pages most likely to satisfy them. That gives every priority page a clear audience and purpose.",
  },
  {
    icon: Wrench,
    deliverable: "Prioritized SEO action plan",
    title: "We turn the audit into a plan",
    body: "We rank findings by business impact and effort. You’ll see what needs fixing first, why it matters, and what your team needs to implement it.",
  },
  {
    icon: FileText,
    deliverable: "Recommendations for priority pages",
    title: "We improve the pages people buy from",
    body: "We work on service pages, product categories, and location pages alongside supporting content. We make the offer clearer and give visitors a useful next step.",
  },
  {
    icon: ChartNoAxesCombined,
    deliverable: "Search and conversion reporting",
    title: "We show what the work delivered",
    body: "We connect page changes to search visibility, relevant visits, and leads or sales where tracking is available. That gives you evidence for what to invest in next.",
  },
];

export default function SearchStrategySections() {
  return (
    <>
      <section className={styles.comparison} aria-labelledby="search-comparison-title">
        <div className={styles.container}>
          <div className="orbilect-section-label">{"Paid and Organic Search"}</div>
          <p data-site-eyebrow="" data-reveal="off">{"Search strategies"}</p>
          <h2 data-site-heading="" id="search-comparison-title" className={styles.heading} data-orbilect-title="">
            Paid campaigns <span>vs. organic SEO</span>
          </h2>
          <p className={styles.intro}>
            Paid campaigns help you reach customers on a schedule you control.
            SEO builds visibility for the searches customers make throughout the year.
          </p>

          <SearchChannelScene />

          <details style={{ marginTop: "1.5rem" }}>
            <summary style={{ cursor: "pointer", fontWeight: 600 }}>
              Compare timing, costs, and best uses
            </summary>
            <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">What changes</th>
                <th scope="col">Paid campaigns</th>
                <th scope="col">Organic SEO</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map(({ dimension, paid, organic }) => (
                <tr key={dimension}>
                  <th scope="row">{dimension}</th>
                  <td>{paid}</td>
                  <td>{organic}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </details>

          <aside className={styles.impact}>
            <ChartNoAxesCombined size={22} aria-hidden="true" />
            <p>
              <strong>How they work together.</strong> Paid campaigns can test which
              offers generate enquiries. Those results can inform which pages you
              improve for organic search. As those pages gain visibility, they can
              bring in customers beyond the campaign window.
            </p>
          </aside>
        </div>
      </section>

      <WhyChooseOrbilect />
    </>
  );
}

export function WhyChooseOrbilect() {
  return (
    <section className={styles.why} aria-labelledby="why-orbilect-title">
      <div className={[styles.container, styles.whyLayout].join(" ")}>
        <div className={styles.whyLead}>
          <p data-site-eyebrow="" data-reveal="off">{"Working with Orbilect"}</p>
          <h2 data-site-heading="" id="why-orbilect-title" className={styles.heading} data-orbilect-title="">
            Why choose <span>Orbilect SEO</span>
          </h2>
          <p className={styles.intro}>
            See which searches matter, which pages to improve first, and
            whether those changes help more customers find and contact you.
          </p>
        </div>

        <ul className={styles.whyList} role="list">
          {reasons.map(({ icon: Icon, title, body, deliverable }) => (
            <li key={title} className={styles.whyRow}>
              <Icon className={styles.whySymbol} size={26} strokeWidth={1.65} aria-hidden="true" />
              <div className={styles.whyCopy}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
              <div className={styles.whyDeliverable}>
                <span>What you get</span>
                <strong>{deliverable}</strong>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
