import { TypedFounderName } from "./founder-motion";
import styles from "./leadership-message.module.css";

export default function LeadershipMessage() {
  return (
    <section className={styles.section} aria-labelledby="leadership-title">
      <div className={styles.layout}>
        <div className={styles.portrait}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/team/bilalhussain.jpg" alt="Bilal Hussain" loading="lazy" />
        </div>

        <div className={styles.panel}>
          <span className={styles.quoteMark} aria-hidden="true">”</span>
          <div className={styles.content}>
            <h2 id="leadership-title">Founder &amp; <span>CEO</span></h2>
            <blockquote>
              <p>
                Technology is changing how people discover businesses, make decisions, and get work done.
                At Orbilect Labs, I want us to help shape that change by building websites, apps, and software
                that make everyday tasks easier. We bring search specialists, designers, and engineers together
                from the start so people can find what they need and use it with confidence. As new tools emerge,
                I ask our teams a practical question: what can someone do better because of what we built?
              </p>
            </blockquote>

            <div className={styles.signature}>
              <TypedFounderName />
              <p>Founder &amp; CEO, Orbilect Labs</p>
            </div>

            <div className={styles.links}>
              <a href="mailto:bilalhussain@orbilectseo.com" aria-label="Email Bilal Hussain" title="Email Bilal Hussain">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <rect x="2.5" y="5" width="19" height="14" rx="2" />
                  <path d="m3.5 6.5 8.5 6 8.5-6" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/bilaaallllll/" aria-label="Bilal Hussain on LinkedIn" title="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2zM7.93 19H4.97V9.45h2.96V19zM6.45 8.15a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44zM19 19h-2.96v-4.65c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46V19H9.74V9.45h2.84v1.3h.04c.4-.75 1.36-1.55 2.81-1.55C18.44 9.2 19 11.18 19 13.75V19z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
