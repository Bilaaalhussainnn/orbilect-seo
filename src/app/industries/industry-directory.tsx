import Link from "next/link";
import BrandCta from "@/components/brand-cta";
import industries from "../_home/industry-growth/industries.json";
import styles from "./industry-directory.module.css";
export default function IndustryDirectory() {
  return <>
    <section className={styles.intro} aria-labelledby="industry-introduction"><div className={styles.wrap}>
      <p className={styles.eyebrow}>Built around your customers</p>
      <h2 id="industry-introduction">Different industries.<br/><span>A clear direction for yours.</span></h2>
      <p>A vehicle buyer, a patient, and a software buyer take different paths to a decision. We connect industry-specific SEO, useful content, mobile-friendly website design, and measurable enquiry journeys around the people you need to reach.</p>
      <div className={styles.principles}><p><strong>Understand the search</strong>Focus on the questions and comparisons that matter in your market.</p><p><strong>Design the journey</strong>Make products, services, and the next step easy to explore on every screen.</p><p><strong>Measure useful demand</strong>Connect visibility with relevant enquiries, bookings, purchases, or demos.</p></div>
    </div></section>
    <section id="industries" className={styles.directory} aria-labelledby="industry-directory-title"><div className={styles.wrap}>
      <p className={styles.eyebrow}>Industry expertise</p><h2 id="industry-directory-title">Find your industry.<br/><span>Build your next advantage.</span></h2>
      <p>Explore twelve industries and see how we adapt search strategy, content, and website design to each customer journey.</p>
      <div className={styles.grid}>{industries.map(industry=><article key={industry.slug} className={styles.card}>
        <Link href={"/industries/"+industry.slug} className={styles.visual} aria-label={"Explore "+industry.name}><img src={"/industry-covers-landscape/"+industry.slug+".webp"} alt="" width={960} height={540} loading="lazy" decoding="async"/></Link>
        <div className={styles.copy}><h3><Link href={"/industries/"+industry.slug}>{industry.name} <span>SEO & design</span></Link></h3><p>{industry.summary}</p><BrandCta href={"/industries/"+industry.slug}>Explore {industry.name}</BrandCta></div>
      </article>)}</div>
    </div></section>
  </>;
}
