import { staffingSupportFaqs } from "@/lib/customer-operations-faqs";
import styles from "../_home/editorial/editorial.module.css";

const faqs = [
  [
    "What roles can Orbilect SEO help us fill?",
    "We source SEO specialists, writers, paid media and social media marketers, designers, developers, analytics specialists, and digital operations staff. Share what you need done and we’ll help define the role."
  ],
  [
    "How much does a dedicated offshore specialist cost?",
    "Your quote depends on the role, experience level, working hours, and coverage. We confirm the fee, what it includes, and how it’s billed before you commit."
  ],
  [
    "How long does it take to find someone?",
    "Timing depends on the skills you need, candidate availability, and how quickly interviews and approvals can happen. We agree on an estimated schedule after reviewing your brief."
  ],
  [
    "How do you screen and shortlist candidates?",
    "We research the market, post the role, review applications, assess practical skills, and interview suitable candidates. You receive a shortlist with relevant assessment notes."
  ],
  [
    "Can we interview candidates and make the final choice?",
    "Yes. You can interview the finalists, ask them about their work, and decide who joins your team."
  ],
  [
    "Can our specialist work during US business hours?",
    "Tell us your time zone and how much overlap you need. We confirm the schedule and candidate availability before you make a selection."
  ],
  [
    "Where will the specialist work?",
    "Your specialist works from our office using an approved workstation. Personal electronic devices, pens, and paper are prohibited in the work area."
  ],
  [
    "Can we work directly with our specialist?",
    "Yes. Your designated team can communicate directly with the specialist about priorities, feedback, and approvals. We agree on the channels and working routine during onboarding."
  ],
  [
    "How do we control access to our tools and client data?",
    "You authorize the accounts and permissions needed for the role. We agree on any handling restrictions before work starts and coordinate access removal when it’s no longer needed."
  ],
  [
    "What if the specialist isn’t the right fit or we need to end the engagement?",
    "Tell us what isn’t working so we can review the issue with you. Any replacement, notice, billing, and handover arrangements follow the signed staffing agreement."
  ],
  ...staffingSupportFaqs.map(({ question, answer }) => [question, answer]),
];

export function StaffingFaq() {
  return (
    <section id="staffing-faqs" className={styles.faqs} aria-labelledby="staffing-faq-heading">
      <div className={[styles.container, styles.faqLayout].join(" ")}>
        <div className={styles.faqIntro}>
          <p data-site-eyebrow="" data-reveal="off">{"Staffing faqs"}</p>
          <h2 data-site-heading="" id="staffing-faq-heading"><span>Staffing</span><br />frequently asked questions</h2>
          <div className={styles.introCard}>
            <h3>Before you hire</h3>
            <p>Find out how we shortlist candidates, what your quote covers, and how your specialist works with your team.</p>
          </div>
        </div>
        <div className={styles.questions}>
          {faqs.map(([question, answer], index) => (
            <details key={question} name="orbilect-staffing-faq" open={index === 0}>
              <summary>{question}<span className={styles.toggle} aria-hidden="true" /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
