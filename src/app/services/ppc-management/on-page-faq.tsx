import styles from "../../_home/editorial/editorial.module.css";

const faqs = [
  {
    "question": "What does PPC management include?",
    "answer": "We audit or build campaigns, research keywords, write ads, review landing pages, verify conversion tracking, and optimize budgets and bids around agreed goals."
  },
  {
    "question": "Which paid search platforms do you manage?",
    "answer": "We work with Google Ads and Microsoft Advertising. We recommend where to start based on your audience, budget, and what you can measure."
  },
  {
    "question": "Is ad spend included in the management fee?",
    "answer": "We show platform spend and management fees separately in the proposal. That makes it clear what funds the ads and what covers our work."
  },
  {
    "question": "How much should I spend to start?",
    "answer": "We propose a test budget based on your locations, services, competition, and lead economics. We review the first results before recommending a larger commitment."
  },
  {
    "question": "Can you take over an existing PPC account?",
    "answer": "Yes. We review historical performance, existing campaigns, and tracking first. We keep useful account history and agree on the changes before making them."
  },
  {
    "question": "How do you reduce spend on irrelevant clicks?",
    "answer": "We review the search terms triggering your ads, add relevant exclusions, and adjust targeting when the data shows spend going to searches that don’t fit."
  },
  {
    "question": "What if we don’t have a dedicated landing page?",
    "answer": "We can assess an existing page or recommend a dedicated one. We agree separately on any copy, design, or development needed for the campaign."
  },
  {
    "question": "How do you tell a qualified lead from a form submission?",
    "answer": "We agree on criteria such as location, service need, and urgency. We compare tracked calls and forms with your team’s feedback and CRM data where available."
  },
  {
    "question": "How quickly can we judge PPC performance?",
    "answer": "We check tracking and search relevance soon after launch. A reliable cost per qualified enquiry takes enough conversion data to compare, so we set review points based on spend and volume."
  },
  {
    "question": "Does running Google Ads improve my organic rankings?",
    "answer": "Ad spend does not improve organic rankings. Paid search data can help us spot useful queries or landing-page gaps to address through separate SEO work."
  }
];

export function OnPageFaq() {
  return (
    <section id="faqs" className={styles.faqs} aria-labelledby="on-page-faq-heading">
      <div className={[styles.container, styles.faqLayout].join(" ")}>
        <div className={styles.faqIntro}>
          <p data-site-eyebrow="" data-reveal="off">{"Faqs"}</p>
          <h2 data-site-heading="" id="on-page-faq-heading"><span>PPC Management</span><br />frequently asked questions</h2>
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
