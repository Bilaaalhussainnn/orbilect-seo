import styles from "../../_home/editorial/editorial.module.css";

const faqs = [
  {
    question: "What does your On-page SEO service include?",
    answer: "We map searches to priority pages, review titles and headings, improve page copy and internal links, and check image descriptions and relevant schema. The scope depends on the pages and fixes we agree on.",
  },
  {
    question: "Which pages should we optimize first?",
    answer: "We look for pages that matter to enquiries or sales and have a clear reason to improve. That might be a service page with relevant impressions but few clicks, or a useful category page customers struggle to find.",
  },
  {
    question: "What’s the difference between On-page SEO and Technical SEO?",
    answer: "On-page SEO improves what an individual page says and how it connects to other pages. Technical SEO deals with issues such as crawling, indexing, redirects, and site-wide templates. If a technical blocker affects a priority page, we flag it early.",
  },
  {
    question: "Do you have to rewrite the whole website?",
    answer: "Usually we start with the pages where changes will matter most. We may keep the strongest copy and revise specific titles, sections, examples, or links. We recommend a larger rewrite when the existing page cannot answer the searches it should serve.",
  },
  {
    question: "Can you work with our existing CMS or content team?",
    answer: "Yes. We can work in your CMS when access and scope allow, or hand over page-by-page recommendations for your team to implement. We agree on who publishes and who checks the changes before work starts.",
  },
  {
    question: "Will Google show the title and description you write?",
    answer: "Google may use your title and description or generate a different title link or snippet. We write clear suggestions and align them with the visible content so the search result and page tell a consistent story.",
  },
  {
    question: "What if two pages compete for the same search?",
    answer: "We compare the queries, the pages, and what visitors need. We may clarify each page’s purpose, change internal links, or consolidate pages where they cover the same job and a single destination would serve customers better.",
  },
  {
    question: "How soon will we see results from On-page SEO?",
    answer: "We check discovery and indexing first. Search visibility may take weeks or months to change, and meaningful enquiry data can take longer on lower-traffic sites. We agree on review windows and report what the data shows.",
  },
  {
    question: "How do you connect On-page SEO to leads or sales?",
    answer: "We use Search Console to check visibility and clicks, then use available analytics or conversion tracking to review calls, forms, or sales from organic landing pages. We agree on which actions count before reporting on results.",
  },
  {
    question: "Will On-page SEO guarantee a ranking or a number of visitors?",
    answer: "We agree on the pages, deliverables, and measurements we can control. Rankings and traffic depend on search demand, competing results, and how search engines evaluate the site, so we don’t commit to a position or visitor count.",
  },
];

export function OnPageFaq() {
  return (
    <section id="faqs" className={styles.faqs} aria-labelledby="on-page-faq-heading">
      <div className={[styles.container, styles.faqLayout].join(" ")}>
        <div className={styles.faqIntro}>
          <p data-site-eyebrow="" data-reveal="off">{"Faqs"}</p>
          <h2 data-site-heading="" id="on-page-faq-heading"><span>On-page SEO</span><br />frequently asked questions</h2>
          <div className={styles.introCard}>
            <h3>Before we edit your pages</h3>
            <p>Find out which pages we work on, how changes get published, and how we measure the result.</p>
          </div>
        </div>
        <div className={styles.questions}>
          {faqs.map(({ question, answer }, index) => (
            <details key={question} name="on-page-seo-faq" open={index === 0}>
              <summary>{question}<span className={styles.toggle} aria-hidden="true" /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
