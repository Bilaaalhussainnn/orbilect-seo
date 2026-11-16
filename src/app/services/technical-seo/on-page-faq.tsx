import styles from "../../_home/editorial/editorial.module.css";

const faqs = [
  {
    "question": "What is included in a Technical SEO audit?",
    "answer": "We review discovery, indexing, redirects, preferred URLs, sitemaps, and representative page performance. We prioritize findings by business impact."
  },
  {
    "question": "Can you fix the issues as well as audit them?",
    "answer": "Yes, when the stack and agreed access allow. We can also provide implementation tickets and verify work completed by your developers."
  },
  {
    "question": "Why isn’t an important page showing up in search?",
    "answer": "We check whether the URL is reachable, linked, indexable, and identified as the preferred version. Findings depend on the page and template."
  },
  {
    "question": "Do you need Search Console access?",
    "answer": "Access helps us inspect real URL and performance reports. We can start with public crawl checks and agree on access needed for deeper diagnosis."
  },
  {
    "question": "Can you help before a migration?",
    "answer": "Yes. We inventory priority URLs, prepare redirects, check staging, and define post-launch checks before changes go live."
  },
  {
    "question": "Do you work on JavaScript-heavy sites?",
    "answer": "We compare the HTML and rendered page, then check navigation, content, and metadata across representative routes."
  },
  {
    "question": "Can you improve Core Web Vitals?",
    "answer": "We identify likely causes and recommend template-level fixes. We verify what we can with lab checks and review available real-user data afterward."
  },
  {
    "question": "Do all crawl warnings need fixing?",
    "answer": "We prioritize issues that affect important URLs or user journeys. Intentional exclusions and alternate URLs often require documentation rather than changes."
  },
  {
    "question": "Will fixing technical issues guarantee rankings?",
    "answer": "Technical work clears specific obstacles. Search visibility also depends on the page’s relevance, competition, and demand."
  },
  {
    "question": "What do we get at handoff?",
    "answer": "You get prioritized findings, affected URLs or templates, implementation notes, and a record of what was verified."
  }
];

export function OnPageFaq() {
  return (
    <section id="faqs" className={styles.faqs} aria-labelledby="on-page-faq-heading">
      <div className={[styles.container, styles.faqLayout].join(" ")}>
        <div className={styles.faqIntro}>
          <p data-site-eyebrow="" data-reveal="off">{"Faqs"}</p>
          <h2 data-site-heading="" id="on-page-faq-heading"><span>Technical SEO</span><br />frequently asked questions</h2>
          <div className={styles.introCard}>
            <h3>{"Before we start your project"}</h3>
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
