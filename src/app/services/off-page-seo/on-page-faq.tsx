import styles from "../../_home/editorial/editorial.module.css";

const faqs = [
  {
    "question": "What does Off-page SEO include?",
    "answer": "We review backlinks, citations, brand mentions, and review themes. The plan can include listing corrections, link reclamation, and editorial outreach."
  },
  {
    "question": "Do you sell packages of backlinks?",
    "answer": "We focus on relevant editorial opportunities and verifiable listings. Outreach and placements are reported individually."
  },
  {
    "question": "Can you guarantee a publication will link to us?",
    "answer": "Editors control what they publish. We agree on research and outreach deliverables and report actual responses and placements."
  },
  {
    "question": "Which directories should my business be on?",
    "answer": "We prioritize sources your customers use, such as credible trade associations, relevant local directories, and platforms where your category is active."
  },
  {
    "question": "What if a directory lists our old address?",
    "answer": "We document the conflicting details, confirm the correct information, and use the directory’s correction or ownership process where available."
  },
  {
    "question": "Can you recover a link lost after a redesign?",
    "answer": "We trace its old destination, identify the best replacement, and recommend a redirect or request an update when appropriate."
  },
  {
    "question": "Do you help with negative reviews?",
    "answer": "We identify recurring complaints, help draft appropriate responses, and suggest operational fixes for issues customers keep reporting."
  },
  {
    "question": "What do you need for digital PR?",
    "answer": "Useful inputs include original data, project details, specialist commentary, or a customer story you have permission to share."
  },
  {
    "question": "How do you report results?",
    "answer": "We report verified listings and placements, link destinations, and relevant referral activity when analytics is available."
  },
  {
    "question": "When should we review impact?",
    "answer": "Corrections and outreach can be reviewed early. We revisit referral traffic and enquiries after placements have had time to reach an audience."
  }
];

export function OnPageFaq() {
  return (
    <section id="faqs" className={styles.faqs} aria-labelledby="on-page-faq-heading">
      <div className={[styles.container, styles.faqLayout].join(" ")}>
        <div className={styles.faqIntro}>
          <p data-site-eyebrow="" data-reveal="off">{"Faqs"}</p>
          <h2 data-site-heading="" id="on-page-faq-heading"><span>Off-page SEO</span><br />frequently asked questions</h2>
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
