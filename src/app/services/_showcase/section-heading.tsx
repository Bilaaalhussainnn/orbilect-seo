import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import investment from "../../_components/service-investment.module.css";
import styles from "./showcase.module.css";

export function ShowcaseHeading({id, eyebrow, title, accent, intro, enquiry, ctaHref, ctaLabel = "Contact us"}: {
  id: string;
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  enquiry: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <header className={investment.intro}>
      <p className={investment.eyebrow}>{eyebrow}</p>
      <h2 id={id}>{title} <span>{accent}</span></h2>
      <p>{intro}</p>
      <div className={investment.links}>
        <Link className={`${investment.cta} ${styles.contact}`} data-orbilect-cta="black"
          href={ctaHref ?? ("/contact?request=" + encodeURIComponent(enquiry) + "#request-proposal")}>
          <span data-orbilect-cta-icon="" data-explicit-arrow="" aria-hidden="true"><ArrowUpRight size={16} /></span>
          {ctaLabel}
        </Link>
      </div>
    </header>
  );
}
