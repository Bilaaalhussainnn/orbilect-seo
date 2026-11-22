import PageStructuredData from "@/components/seo/page-data";
import Link from "next/link";
import GlobalLocations from "@/components/global-locations";
import { ClipboardList, MessageSquare, ShieldCheck } from "lucide-react";
import TechnologyStack from "../_home/technology-stack";
import { ReviewsCompanyFit } from "./reviews-company-fit";
import { pageSeo } from "@/lib/orbilect-search";
import { proposalFormHref } from "@/lib/leads/sources";
import { reviewsPath } from "@/lib/review-platforms";
import { ServiceHero, type ServiceScene } from "../services/_components/service-story";
import { ReviewPlatformDisplay } from "./review-platform-display";
import { configuredReviewProfiles } from "./review-links";
import ReviewDirectory from "./review-directory";
import styles from "./reviews.module.css";

export const metadata = pageSeo(reviewsPath);

const scenes = [
  { id: "search", label: "Find", address: "Search and directories", title: "Help people find accurate information", copy: "Keep your profiles and links consistent across the places your customers use.", items: ["Listings", "Business details"] },
  { id: "page", label: "Review", address: "Customer experience", title: "Make space for honest feedback", copy: "People use detailed reviews to compare providers and understand what working with them is like.", items: ["Genuine experience", "Public and private options"] },
  { id: "links", label: "Improve", address: "Review and follow-up", title: "Turn repeated feedback into practical changes", copy: "Assign recurring problems to the team that can fix them and follow up where appropriate.", items: ["Recurring themes", "Service improvements"] },
] satisfies ServiceScene[];

export default function ReviewsPage() {
  const profiles = configuredReviewProfiles();
  const feedback = proposalFormHref("Service Review", "I’d like to share private feedback about the Orbilect SEO services I received.");
  return (
    <main>
      <PageStructuredData route="/reviews" />
      <ServiceHero eyebrow="Online reputation management" title="Reviews help us" accent="grow and improve"
        intro="Share your experience with Orbilect SEO. Public reviews help other businesses choose a provider, and honest feedback helps our team improve how we work."
        scenes={scenes} ctaLabel="Explore review options" showCtaArrow />
      <section id="service-intro" className={styles.section} aria-labelledby="reputation-intro">
        <div className={styles.wrap}>
          <header className={styles.header}>
            <p data-site-eyebrow="">How reputation works</p>
            <h2 id="reputation-intro">What customers find <span>before they decide</span></h2>
            <p>Online reputation management is the work of keeping your public information accurate, responding to genuine feedback, and fixing the problems it reveals. Just like our clients, we have a reputation to earn and maintain.</p>
            <p>Share any honest experience with our services. Helpful details include the work we delivered, how we communicated, and what we could do better. Keep confidential project details out of public reviews.</p>
          </header>
          <ReviewPlatformDisplay size="large" exclude={["yelp", "reviewsio", "bbb"]} />
        </div>
      </section>
      <section id="review-platforms" className={`${styles.section} ${styles.directory}`} aria-labelledby="review-directory-title">
        <div className={styles.wrap}>
          <div className={styles.feedbackHeader}>
            <header className={styles.header}>
              <p data-site-eyebrow="">Service feedback</p>
              <h2 id="review-directory-title">Choose where to <span>share your experience</span></h2>
              <p>Use an available public review link or send feedback directly to our team.</p>
            </header>
            <div className={styles.feedbackAction}>
              <div className={styles.feedbackArt} aria-hidden="true"><MessageSquare size={24} strokeWidth={1.65} /></div>
              <Link href={feedback} data-orbilect-cta="black" className={styles.cta}><span data-orbilect-cta-icon="" aria-hidden="true" />Send private feedback</Link>
            </div>
          </div>

          <ReviewDirectory profiles={profiles} />
        </div>
      </section>
      <section id="review-transparency" className={styles.section} aria-labelledby="transparency-title">
        <div className={styles.wrap}>
          <div className={styles.transparency}>
            <header className={styles.header}>
              <p data-site-eyebrow="">Transparency and quality</p>
              <h2 id="transparency-title" data-site-heading="">We’re proud to <span>stand behind our work</span></h2>
              <p>We’re proud to serve our clients and deliver work we can stand behind. You should know what we agreed to, what we delivered, and how we judge whether it worked.</p>
            </header>
            <ul className={styles.principles} role="list">
              <li><ClipboardList size={22} aria-hidden="true" /><div><h3>Clear commitments</h3><p>Agree on the scope, who owns each step, and what success looks like before work starts.</p></div></li>
              <li><ShieldCheck size={22} aria-hidden="true" /><div><h3>Work you can check</h3><p>Share the evidence behind recommendations and explain what the results do and don’t tell us.</p></div></li>
              <li><MessageSquare size={22} aria-hidden="true" /><div><h3>Honest feedback</h3><p>Welcome praise and criticism, and use repeated feedback to make specific improvements.</p></div></li>
            </ul>
          </div>
        </div>
      </section>
      <TechnologyStack />
      <ReviewsCompanyFit />
      <GlobalLocations />
    </main>
  );
}
