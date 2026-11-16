import Link from "next/link";
import styles from "./careers-structure.module.css";

const structure = [
  ["Leadership", "Sets Orbilect SEO’s direction and takes responsibility for client commitments and team standards."],
  ["Senior management", "Turns priorities into operating plans, allocates resources, and resolves issues across departments."],
  ["Heads of departments", "Lead their disciplines, develop team leads, and oversee the quality of the work."],
  ["SEO and client delivery", "SEO Strategy, Technical SEO, Content and Editorial, Paid Media, Social Media, Design and UX, Web Development, and Analytics deliver the work agreed with each client."],
  ["Operations and organization support", "Quality Assurance, Training and Development, and Workforce Management support delivery. Compliance and IT support teams across Orbilect SEO."],
];

export default function CareersStructure() {
  return (
    <section className={styles.section} aria-labelledby="careers-structure">
      <div className={styles.wrap}>
        <header>
          <p className={styles.eyebrow} data-site-eyebrow="" data-reveal="off">Organizational structure</p>
          <h2 id="careers-structure">Orbilect SEO’s <span>structure</span></h2>
          <p>Explore how leadership, delivery teams, and support departments work together at Orbilect SEO.</p>
        </header>

        <div className={styles.accordion}>
          {structure.map(([title, copy], index) => (
            <details key={title} name="careers-seo-structure" open={index === 0}>
              <summary>{title}<span className={styles.toggle} aria-hidden="true" /></summary>
              <p>{copy}</p>
            </details>
          ))}
        </div>
        <Link className={styles.link} href="/our-team">View the full organizational structure on Our Team ↗</Link>
      </div>
    </section>
  );
}
