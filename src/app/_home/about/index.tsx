import { businessDescription } from "@/lib/site-identity";
import HomeCta from "../workbench/home-cta";
import GrowthConsole from "../workbench/growth-console";
import styles from "../workbench/workbench.module.css";
import delivery from "../workbench/delivery.module.css";

export default function About() {
  return (
    <section id="about" className={styles.white} aria-labelledby="about-title">
      <div className={styles.wrap}>
        <div className={delivery.growthLayout}>
          <div className={styles.intro}>
            <p data-site-eyebrow="" data-reveal="off">About Orbilect SEO</p>
            <h2 data-site-heading="" id="about-title">From being found to <span>winning more business</span></h2>
            <p>{businessDescription}</p>
            <div className={styles.actions}>
              <HomeCta href="/services">Explore our services</HomeCta>
              <HomeCta href="/about" variant="white">About us</HomeCta>
            </div>
          </div>
          <GrowthConsole />
        </div>
      </div>
    </section>
  );
}
