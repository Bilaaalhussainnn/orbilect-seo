import styles from "../../_home/editorial/editorial.module.css";

const faqs = [
  {
    "question": "What does Social Media Marketing include?",
    "answer": "We agree on a scope around channel audit, audience and topic research, content calendar, with verification and reporting included where agreed."
  },
  {
    "question": "Which platforms or tools do you work with?",
    "answer": "For this service we work with Instagram · Facebook · LinkedIn · TikTok. We confirm access, permissions, and fit before making changes."
  },
  {
    "question": "What do you need from us to get started?",
    "answer": "Share your current setup, the outcome you want, and a point of contact for approvals. We confirm the access needed for channel audit."
  },
  {
    "question": "Can you improve an existing setup?",
    "answer": "Yes. We review what is already working and document the changes we recommend before replacing or publishing anything."
  },
  {
    "question": "What does the first delivery look like?",
    "answer": "The first delivery addresses audience and topic research and content calendar. We confirm the exact scope and review process in the proposal."
  },
  {
    "question": "How do you check the customer experience?",
    "answer": "We test the path around a concrete example, such as “A post answering a common buying question”, and verify the intended next step: Visit the service page or start a conversation."
  },
  {
    "question": "What do you measure?",
    "answer": "We agree on the available data for post reach, referral visits, tracked conversations and flag any gaps that affect interpretation."
  },
  {
    "question": "When do we review the results?",
    "answer": "We review setup and quality early. We assess performance when there is enough comparable data and document the next test."
  },
  {
    "question": "How is the work priced?",
    "answer": "We quote for the agreed deliverables, implementation, review rounds, and any ongoing support."
  },
  {
    "question": "What happens after the first review?",
    "answer": "We review referral and enquiry reporting with your team, document findings, and agree on what to improve next."
  }
];

export function OnPageFaq() {
  return (
    <section id="faqs" className={styles.faqs} aria-labelledby="on-page-faq-heading">
      <div className={[styles.container, styles.faqLayout].join(" ")}>
        <div className={styles.faqIntro}>
          <p data-site-eyebrow="" data-reveal="off">{"Faqs"}</p>
          <h2 data-site-heading="" id="on-page-faq-heading"><span>Social Media Marketing</span><br />frequently asked questions</h2>
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
