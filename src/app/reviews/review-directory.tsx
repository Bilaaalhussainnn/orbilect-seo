import Image from "@/components/optimized-image";
import { ArrowUpRight, Star } from "lucide-react";
import { reviewPlatforms } from "@/lib/review-platforms";
import { ReviewEmbed } from "./review-embed";
import { directoryEntries } from "./review-directory-data";
import styles from "./reviews.module.css";

type Profile = { reviewUrl?: string; embedUrl?: string };

export default function ReviewDirectory({ profiles }: { profiles: Map<string, Profile> }) {
  return <ul className={styles.cards} role="list">
    {/* Google has a public default; account-specific configured URLs take precedence. */}
    {reviewPlatforms.filter(platform => platform.id === "google" || platform.id === "bing").map(platform => {
      const profile = profiles.get(platform.id);
      const href = profile?.reviewUrl;
      const label = platform.label;
      const logo = <Image src={"/review-platforms/" + platform.mark} alt={label} width={200} height={72} unoptimized />;
      if (platform.id === "google" && href) return <li id="review-google" key={platform.id} className={`${styles.card} ${styles.directoryCard}`}>
        <a className={styles.cardLink} href={href} target="_blank" rel="noopener noreferrer" aria-label="Visit Orbilect SEO on Google (opens in a new tab)">
          <h3 className={styles.directoryTitle}>{label}</h3>
          <span className={styles.logoBox}>{logo}</span>
          <span className={styles.reviewStatus}>Business profile and reviews</span>
          <span className={styles.profileCta}><span className={styles.profileArrow} aria-hidden="true">↗</span>Visit our profile</span>
        </a>
        {profile?.embedUrl && <details className={styles.badgeDetails}><summary>Show reviews</summary><div className={styles.widgetSlot}><ReviewEmbed label={label} url={profile.embedUrl} /></div></details>}
      </li>;
      return <li id={"review-" + platform.id} key={platform.id} className={`${styles.card} ${styles.directoryCard} ${styles.accountCard}`}>
        <h3 className={styles.directoryTitle}>{label}</h3>
        {href ? <a className={styles.logoBox} href={href} target="_blank" rel="noopener noreferrer" aria-label={"Visit " + label + " (opens in a new tab)"}>{logo}</a> : <div className={styles.logoBox}>{logo}</div>}
        <div className={styles.cardFooter}>{href ? <a href={href} target="_blank" rel="noopener noreferrer">View profile and reviews<ArrowUpRight size={15} aria-hidden="true" /></a> : <p>Profile link coming soon</p>}</div>
        {profile?.embedUrl && <details className={styles.badgeDetails}><summary>Show reviews</summary><div className={styles.widgetSlot}><ReviewEmbed label={label} url={profile.embedUrl} /></div></details>}
      </li>;
    })}
    {directoryEntries.map(entry => {
      const href = entry.directory ? profiles.get(entry.id)?.reviewUrl ?? entry.href : entry.href;
      const isDirectory = entry.directory && href === entry.href;
      return <li id={"review-" + entry.id} key={entry.id} className={`${styles.card} ${styles.directoryCard}`}>
        <a className={styles.cardLink} href={href} target="_blank" rel={isDirectory ? "nofollow noopener noreferrer" : "noopener noreferrer"} aria-label={"Visit " + entry.label + (isDirectory ? " directory" : " profile for Orbilect SEO") + " (opens in a new tab)"}>
          <h3 className={styles.directoryTitle}>{entry.label}</h3>
          <span className={styles.logoBox}>
            <span className={entry.badgeYear ? styles.reviewBadge : undefined}>
              <Image src={"/review-platforms/" + entry.mark} alt={entry.badgeYear ? "RightFirms Read Reviews badge" : entry.label} width={200} height={72} unoptimized />
              {entry.badgeYear && <span className={styles.reviewBadgeYear}>2026</span>}
            </span>
          </span>
          <span className={styles.reviewStatus}>
            {entry.rating ? <>
              <span className={styles.blueStars} aria-label={entry.rating.value + " out of 5 stars"}>{[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" strokeWidth={0} aria-hidden="true" />)}</span>
              <span>{entry.rating.value.toFixed(1)}/5 · {entry.rating.count} {entry.rating.count === 1 ? "review" : "reviews"}</span>
            </> : <span>{isDirectory ? "Explore the directory" : entry.noReviews ? "No reviews yet" : "See latest reviews"}</span>}
          </span>
          <span className={styles.profileCta}><span className={styles.profileArrow} aria-hidden="true">↗</span>{isDirectory ? "Visit platform" : "Visit our profile"}</span>
        </a>
      </li>;
    })}
  </ul>;
}
