import styles from "./ranking-progress.module.css";

const stages = [
  {
    time: "First weeks",
    title: "Fix what’s holding pages back",
    body: "We benchmark the searches that matter, then fix crawl barriers, broken internal links, and gaps on priority service, product, and location pages.",
  },
  {
    time: "Days to weeks after publishing",
    title: "Watch pages return to search",
    body: "Google can take days to weeks to revisit updated pages. We check whether priority URLs are indexed and which searches start generating impressions.",
  },
  {
    time: "Over the following months",
    title: "Build visibility and measure results",
    body: "We improve pages using query and click data, add useful supporting content, and track enquiries or sales where conversion tracking is available.",
  },
];

const factors = [
  {
    title: "Search intent and content quality",
    body: "A page has a better chance of competing when it answers the search directly. We check whether visitors need a service page, product category, comparison, or guide, then make that page useful for the decision they’re making.",
  },
  {
    title: "Crawlability and page structure",
    body: "Indexing rules, broken links, and confusing navigation can make important pages harder to discover or index. We check robots.txt, redirects, canonicals, and internal links so search engines can reach the right pages.",
  },
  {
    title: "Relevant links and references",
    body: "Internal links help connect related pages. Relevant links from trusted industry sites can also help search engines understand how your pages fit into the wider web.",
  },
  {
    title: "Competition and your starting point",
    body: "An existing page with impressions gives us more data to work with than a new page. Competitive searches can take longer to gain ground, especially when the pages already ranking answer the query well.",
  },
  {
    title: "Location and changes in search results",
    body: "Results can vary by location, language, device, and query. We compare trends across your target searches and locations because a single position can move from day to day.",
  },
];

export default function RankingProgress() {
  return (
    <section className={styles.section} aria-labelledby="ranking-progress-heading">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <div className="orbilect-section-label">{"Ranking Factors"}</div>
          <p data-site-eyebrow="" data-reveal="off">{"How your website earns higher rankings"}</p>
          <h2 data-site-heading="" id="ranking-progress-heading" data-orbilect-title="">
            How your website earns <span>higher rankings</span>
          </h2>
          <p>
            Search visibility builds page by page. We make your priority pages
            easier to discover, improve what visitors find on them, and use real
            search data to decide what to improve next.
          </p>
        </header>

        <ol className={styles.timeline}>
          {stages.map((stage) => (
            <li key={stage.title}>
              <p className={styles.time}>{stage.time}</p>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </li>
          ))}
        </ol>

        <div className={styles.factors}>
          <div>
            <h3>What shapes <span>your timeline</span></h3>
            <p>
              Some changes show up sooner. Broader improvements can take
              several months to show, and rankings can rise or fall along
              the way.
            </p>
            <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide">
              Google’s guide to SEO timing
            </a>
          </div>
          <div className={styles.accordion}>
            {factors.map((factor) => (
              <details key={factor.title}>
                <summary>{factor.title}</summary>
                <p>{factor.body}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
