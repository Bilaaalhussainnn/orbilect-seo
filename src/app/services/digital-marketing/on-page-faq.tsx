import styles from "../../_home/editorial/editorial.module.css";

const faqs = [
  {
    "question": "Which digital marketing channels do you recommend?",
    "answer": "We start with where customers are likely to look and what your team can measure. That may mean search, paid social, email, or a focused combination."
  },
  {
    "question": "Is ad spend included in management fees?",
    "answer": "We show media spend and management fees separately in the proposal so you can see what goes to platforms and what covers the work."
  },
  {
    "question": "Can you audit our existing ad account?",
    "answer": "Yes. We review structure, search terms, conversion tracking, landing pages, and budget allocation before recommending changes."
  },
  {
    "question": "Do you build landing pages?",
    "answer": "We can recommend or implement landing-page improvements when included in the scope. Larger builds are quoted separately."
  },
  {
    "question": "What counts as a qualified lead?",
    "answer": "We agree on criteria with you, such as service need, location, or budget. Your team’s feedback helps validate lead quality."
  },
  {
    "question": "How much should we spend to start?",
    "answer": "We propose a test budget based on the audience, offer, market, and measurement plan. We review the data before recommending a larger commitment."
  },
  {
    "question": "Can you run ads while we improve SEO?",
    "answer": "Yes. We can use paid campaigns to test terms and offers while improving pages that serve organic customers."
  },
  {
    "question": "How do you attribute calls and forms?",
    "answer": "We use agreed tracking tools and events where access allows. Reports identify gaps when a conversion cannot be tied confidently to a channel."
  },
  {
    "question": "Do we keep access to our accounts?",
    "answer": "We work with access to accounts you control where possible. Ownership and permissions are confirmed during onboarding."
  },
  {
    "question": "When do you change or scale a campaign?",
    "answer": "We review search terms, conversion quality, and costs. We adjust when the data supports it and document the reason."
  }
];

export function OnPageFaq() {
  return (
    <section id="faqs" className={styles.faqs} aria-labelledby="on-page-faq-heading">
      <div className={[styles.container, styles.faqLayout].join(" ")}>
        <div className={styles.faqIntro}>
          <p data-site-eyebrow="" data-reveal="off">{"Faqs"}</p>
          <h2 data-site-heading="" id="on-page-faq-heading"><span>Digital Marketing</span><br />frequently asked questions</h2>
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
