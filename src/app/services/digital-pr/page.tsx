import Link from "next/link";
import SeoJsonLd from "@/components/seo/json-ld";
import { pageSeo, serviceSchema } from "@/lib/orbilect-search";
import { proposalFormHref } from "@/lib/leads/sources";
import { InvestmentBeforeFaq } from "../../_components/investment-before-faq";
import { HomeFaq } from "../../_home/editorial";
import { ServiceHero, type ServiceScene } from "../_components/service-story";
import styles from "../_components/service-story.module.css";
import { DigitalPrWork } from "./digital-pr-work";

const route = "/services/digital-pr";
export const metadata = pageSeo(route);

const scenes = [
  { id: "search", label: "Story", address: "Campaign / Evidence", title: "Make a useful story easy to verify", copy: "Start with a finding, expert perspective, or useful resource grounded in evidence.", items: ["Audience", "Sources"] },
  { id: "page", label: "Pitch", address: "Campaign / Outreach", title: "Take it to publications that cover the subject", copy: "Give each editor a clear reason why the story matters to their readers.", items: ["Media list", "Pitch"] },
  { id: "links", label: "Coverage", address: "Campaign / Reporting", title: "See what earned attention and why", copy: "Review published mentions, referral traffic, and actions that matter to your business.", items: ["Mentions", "Referral visitors"] },
] satisfies ServiceScene[];

const faqs = [
  { question: "Can you guarantee coverage or a backlink?", answer: "No. Editors decide whether to cover a story and which links to include. We agree on the research, materials, outreach, and reporting we can deliver." },
  { question: "Is digital PR the same as distributing a press release?", answer: "A press release can provide facts for a timely announcement. Digital PR also includes research campaigns, expert commentary, resource outreach, and customized pitches for relevant audiences." },
  { question: "How do you choose publications?", answer: "We look at the topics they cover, their audience, geographic relevance, and recent editorial work. A smaller trade publication can be more relevant than a broad general-news site." },
  { question: "What will I be able to measure?", answer: "We report outreach, replies, published coverage, relevant mentions, and earned links. We use available analytics to check referral visits and conversions where attribution is reliable." },
];

export default function DigitalPrPage() {
  return (
    <main>
      <SeoJsonLd data={serviceSchema(route)} />
      <ServiceHero eyebrow="Digital PR and outreach" title="Earn attention" accent="with stories worth sharing"
        intro="Turn useful research, expert insight, and real news into editorial pitches. Reach the people who follow your industry, then see what coverage sends readers to your business."
        ctaLabel="Explore our digital PR work" showCtaArrow scenes={scenes} />
      <section id="service-intro" className={styles.light} aria-labelledby="digital-pr-intro">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow} data-site-eyebrow="">What we do</p>
            <h2 id="digital-pr-intro">What <span>digital PR covers</span></h2>
          </div>
          <div className={styles.prose}>
            <p>Digital PR earns editorial attention by giving publications a credible reason to cover your business, expertise, or research. We find the angle, develop the materials, and pitch relevant editors and industry publishers.</p>
            <p>It works best when you can bring original data, a subject-matter expert, a newsworthy development, or a resource worth citing. Our team turns that material into a campaign and helps you reach people likely to find it useful.</p>
            <Link href={proposalFormHref("Digital PR", "Help me plan a digital PR campaign.")} className={styles.cta} data-orbilect-cta="black"><span data-orbilect-cta-icon="" aria-hidden="true" />Request a proposal</Link>
          </div>
        </div>
      </section>
      <DigitalPrWork />
      <section className={styles.light} aria-labelledby="digital-pr-reporting">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div><p className={styles.eyebrow} data-site-eyebrow="">Reporting and standards</p><h2 id="digital-pr-reporting">Measure the <span>quality of coverage</span></h2></div>
          <div className={styles.prose}>
            <p>We track where you were mentioned, who the publication reaches, what it linked to, and whether it sent relevant visitors. When tracking is available, we look at the leads or enquiries that followed.</p>
            <p>Publishers control editorial coverage. We don’t buy links to influence rankings or promise placements. <a href="https://developers.google.com/search/docs/essentials/spam-policies#link-spam">Read Google’s guidelines on link spam</a>.</p>
            <p><Link href="/services/off-page-seo">Explore off-page SEO</Link> for a broader view of links and mentions, or <Link href="/reviews">see how we approach online reputation</Link>.</p>
          </div>
        </div>
      </section>
      <InvestmentBeforeFaq routes={[route]} />
      <HomeFaq hideCta hideSectionLabel items={faqs} introTitle="Before we pitch your story" introCopy="See what we can prepare, what editors decide, and how we measure the result." />
    </main>
  );
}
