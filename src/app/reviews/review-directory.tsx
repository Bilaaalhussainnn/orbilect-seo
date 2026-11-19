import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { reviewPlatforms } from "@/lib/review-platforms";
import { ReviewEmbed } from "./review-embed";
import ProviderImage from "./provider-image";
import styles from "./reviews.module.css";

type Profile = { reviewUrl?: string; embedUrl?: string };
type DirectoryEntry = {
  id: string;
  label: string;
  mark: string;
  href?: string;
  widget?: "designrush" | "trustpilot" | "clutch" | "truefirms" | "smartcustomer";
  badge?: string;
  directory?: boolean;
};

const profileLinks: Record<string, string> = {
  techbehemoths: "https://techbehemoths.com/company/orbilect-seo",
  designrush: "https://www.designrush.com/agency/profile/orbilect-seo#reviews",
  trustpilot: "https://www.trustpilot.com/review/orbilectseo.com",
  clutch: "https://clutch.co/profile/orbilect-seo",
};

const widgets: Record<string, DirectoryEntry["widget"]> = {
  designrush: "designrush", trustpilot: "trustpilot", clutch: "clutch",
};

// This list belongs only to the reviews directory. Shared carousels stay unchanged.
const entries: DirectoryEntry[] = [
  ...reviewPlatforms.filter(platform => !["softwareworld", "yelp", "reviewsio", "bbb"].includes(platform.id)).map(platform => ({
    id: platform.id,
    label: platform.id === "google" ? "Google Business Account" : platform.label,
    mark: "/review-platforms/" + platform.mark,
    href: profileLinks[platform.id],
    widget: widgets[platform.id],
    badge: platform.id === "techbehemoths" ? "https://cdn.techbehemoths.com/public/static/validation/tb-verified-logo.svg" : undefined,
  })),
  { id: "rightfirms", label: "RightFirms", mark: "/review-platforms/rightfirms-company.webp", href: "https://www.rightfirms.co/company/orbilect-seo", badge: "/review-platforms/rightfirms-company.webp" },
  { id: "techreviewer", label: "Techreviewer", mark: "/review-platforms/techreviewer.svg", href: "https://techreviewer.co/companies/orbilect-seo" },
  // The supplied TopDevelopers URL is a directory, not an Orbilect SEO profile.
  { id: "topdevelopers", label: "TopDevelopers.co", mark: "/review-platforms/topdevelopers.svg", href: "https://www.topdevelopers.co/directory/web-development-companies", badge: "https://www.topdevelopers.co/assets/badges/app-2026/Web-Development/badge-top-web-development-companies-2026.png", directory: true },
  // Add a verified profile URL here when TrueFirms supplies one; keep company ID in the widget.
  { id: "truefirms", label: "TrueFirms", mark: "/review-platforms/truefirms.png", widget: "truefirms" },
  { id: "smartcustomer", label: "SmartCustomer", mark: "/review-platforms/smartcustomer.svg", href: "https://www.smartcustomer.com/reviews/orbilectseo.com", widget: "smartcustomer" },
];

export default function ReviewDirectory({ profiles }: { profiles: Map<string, Profile> }) {
  return <ul className={styles.cards} role="list">
    {entries.map(entry => {
      const profile = profiles.get(entry.id);
      const href = entry.href ?? profile?.reviewUrl;
      const rel = entry.directory ? "nofollow noopener noreferrer" : "noopener noreferrer";
      const logo = <Image src={entry.mark} alt={entry.label} width={200} height={72} unoptimized />;
      return <li id={"review-" + entry.id} key={entry.id} className={`${styles.card} ${styles.directoryCard}`}>
        <h3 className={styles.directoryTitle}>{entry.label}</h3>
        {href ? <a className={styles.logoBox} href={href} target="_blank" rel={rel}
          aria-label={"Visit " + entry.label + " (opens in a new tab)"}>{logo}</a> : <div className={styles.logoBox}>{logo}</div>}

        <div className={styles.cardFooter}>
          {href ? <a href={href} target="_blank" rel={rel}>{entry.directory ? "View listing" : "View profile and reviews"}<ArrowUpRight size={15} aria-hidden="true" /></a>
            : <p>Profile link coming soon</p>}
        </div>
        {(entry.widget || entry.badge || profile?.embedUrl) && <details className={styles.badgeDetails}>
          <summary>{entry.widget || profile?.embedUrl ? "Show reviews" : "Show badge"}</summary>
        <div className={styles.widgetSlot}>
          {entry.widget ? <iframe className={styles.providerWidget}
            src={"/api/review-widgets/" + entry.widget} title={entry.label + " reviews for Orbilect SEO"}
            loading="lazy" width="100%" height={220} referrerPolicy="strict-origin-when-cross-origin" />
            : entry.badge && href ? <a href={href} target="_blank" rel={rel} className={styles.badgeBox}
              data-techbehemoths-verification={entry.id === "techbehemoths" ? "" : undefined}>
              <span className={styles.badgeImage}>
                <ProviderImage src={entry.badge} fallback={entry.mark} alt={entry.id === "techbehemoths" ? "TechBehemoths Verification" : entry.label + " company badge"}
                  width={200} height={180} />
                {entry.id === "rightfirms" && <span className={styles.badgeYear}>2026</span>}
              </span>
            </a> : profile?.embedUrl ? <ReviewEmbed label={entry.label} url={profile.embedUrl} />
            : null}
        </div>

        </details>}
      </li>;
    })}
  </ul>;
}
