import { ArrowUpRight, Mail } from "lucide-react";
import styles from "./workplace-integrity.module.css";

const email = "careers@orbilectseo.com";
const emailHref = `mailto:${email}?subject=Orbilect%20SEO%20job%20application`;

const steps = [
  { title: "Submit your application", copy: "Apply through the vacancy listing on our website. If the listing accepts email applications, send your résumé to careers@orbilectseo.com and put the role title in the subject line." },
  { title: "Initial screening call", copy: "We discuss your experience, availability, and interest in the role, and answer your initial questions." },
  { title: "First interview", copy: "Meet the hiring team to talk through your experience, how you approach the work, and what the role involves." },
  { title: "Role-specific assessment, if needed", copy: "Some roles include a practical assessment. If one applies, we’ll explain the task, the time involved, and what we’ll evaluate." },
  { title: "Final interview", copy: "Discuss responsibilities, team expectations, and any remaining questions with the hiring lead." },
  { title: "Background and qualification checks", copy: "We explain which checks apply to the role. These may include verifying your degree, employment history, professional references, or other relevant credentials." },
  { title: "Written offer and follow-up", copy: "If selected, you’ll receive a written offer detailing your role, department, designation, salary, other compensation and benefits, start date, and employment terms. We’ll follow up to discuss the offer and answer questions before you decide." },
];

export default function CareersClosing() {
  return (
    <>
      <section className={`${styles.section} ${styles.hiring}`} aria-labelledby="careers-hiring">
        <div className={styles.wrap}>
          <header className={styles.heading}>
            <p className={styles.eyebrow} data-site-eyebrow="" data-reveal="off">Hiring process</p>
            <h2 id="careers-hiring">From application <span>to offer</span></h2>
            <p>Here’s what to expect when a position opens. The vacancy listing will explain how to apply and which steps are relevant to the role.</p>
          </header>
          <div className={styles.hiringGrid}>
            <div className={styles.applyCard}>
              <Mail size={24} aria-hidden="true" />
              <h3>Where to apply</h3>
              <p>Check Current Openings for the application link. For roles that accept email, attach your résumé and include the position you’re applying for.</p>
              <a href={emailHref}>{email}</a>
            </div>
            <ol className={styles.steps}>
              {steps.map(({ title, copy }, index) => (
                <li key={title}>
                  <details open={index === 0} name="careers-hiring">
                    <summary>{title}</summary>
                    <p>{copy}</p>
                  </details>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      

      <section className={`${styles.section} ${styles.final}`} aria-labelledby="careers-final">
        <div className={styles.wrap}>
          <header className={styles.heading}>
            <p className={styles.eyebrow} data-site-eyebrow="" data-reveal="off">Careers at Orbilect SEO</p>
            <h2 id="careers-final">Find your next <span>opportunity with us</span></h2>
            <p>See the current hiring status here. When a vacancy opens, we’ll post the role and application instructions on this page and share it on our official social channels.</p>
          </header>
          <div className={styles.actions}>
            <a className={styles.primary} href="#openings">View current openings <ArrowUpRight size={18} aria-hidden="true" /></a>
            <a className={styles.secondary} href={`mailto:${email}`}>Email the careers team <Mail size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </>
  );
}
