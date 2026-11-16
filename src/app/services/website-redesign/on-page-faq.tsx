import styles from "../../_home/editorial/editorial.module.css";

const faqs = [
  {
    "question": "Do I need a full redesign or just a few fixes?",
    "answer": "We review the pages and journeys causing the most friction. We may recommend targeted updates if the existing site can support them."
  },
  {
    "question": "How much does a redesign cost?",
    "answer": "Pricing depends on page count, content, integrations, migration, and support. We confirm what’s included and the price before starting."
  },
  {
    "question": "Will a redesign affect my existing SEO?",
    "answer": "A rebuild can affect visibility, especially when URLs or content change. We inventory important pages, map redirects, and verify key destinations after launch."
  },
  {
    "question": "Can you keep my existing branding?",
    "answer": "Yes. We can work with your current logo, typography, and colors, or apply a refreshed design if agreed in the scope."
  },
  {
    "question": "Do you handle copywriting?",
    "answer": "We can retain, edit, or rewrite priority copy as agreed. You’ll know which pages need input from your team before we publish."
  },
  {
    "question": "Can you integrate our booking tool or CRM?",
    "answer": "We assess what the tool supports and confirm how enquiries and confirmations should flow. Integrations are scoped before development."
  },
  {
    "question": "Will the site work on phones and tablets?",
    "answer": "We build responsive layouts and test priority pages and forms across representative screen sizes."
  },
  {
    "question": "Can I edit the site after launch?",
    "answer": "Where the build includes an editable CMS, we document what your team can change and explain how to make routine updates."
  },
  {
    "question": "What support is included after launch?",
    "answer": "The proposal specifies the support period, what fixes are covered, and how to request changes or ongoing maintenance."
  },
  {
    "question": "How do we know the redesign worked?",
    "answer": "We verify navigation, forms, and bookings at launch, then compare tracked enquiry and conversion data with the baseline when enough data is available."
  }
];

export function OnPageFaq() {
  return (
    <section id="faqs" className={styles.faqs} aria-labelledby="on-page-faq-heading">
      <div className={[styles.container, styles.faqLayout].join(" ")}>
        <div className={styles.faqIntro}>
          <p data-site-eyebrow="" data-reveal="off">{"Faqs"}</p>
          <h2 data-site-heading="" id="on-page-faq-heading"><span>Website Redesign</span><br />frequently asked questions</h2>
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
