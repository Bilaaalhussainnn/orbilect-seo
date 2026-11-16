import { Check, Compass, Target } from "lucide-react";
import styles from "./team-beliefs.module.css";

const principles = [
  {
    icon: Compass,
    title: "Question the brief",
    copy: "We ask what customers need and where they get stuck. That can reveal a simpler fix or a better use of the project budget.",
  },
  {
    icon: Check,
    title: "Own the outcome",
    copy: "We agree on who owns each milestone, raise blockers early, and check the work before handing it over.",
  },
  {
    icon: Target,
    title: "Build for the long run",
    copy: "We explain what changed, how to measure the result, and what your team needs to maintain or improve it after launch.",
  },
];

export default function TeamBeliefs() {
  return (
    <section className={styles.section} aria-labelledby="team-beliefs-title">
      <div className={styles.layout}>
        <header className={styles.heading}>
          <p className={styles.eyebrow} data-site-eyebrow="" data-reveal="off">What we believe</p>
          <h2 id="team-beliefs-title">How we think<br /><span>How we work</span></h2>
          <p>
            At Orbilect SEO, we bring search specialists, designers, and developers
            together early so each team understands the problem we’re trying to solve.
            We question assumptions, take responsibility for what we commit to, and
            build work our clients can keep using and improving after launch.
          </p>
        </header>

        <ul className={styles.principles}>
          {principles.map(({ icon: Icon, title, copy }) => (
            <li key={title}>
              <span className={styles.icon} aria-hidden="true"><Icon size={22} /></span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
