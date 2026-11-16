import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import LeadPanel from ".";
import type { AuditSource } from "@/lib/leads/sources";
import styles from "./hero-audit.module.css";

export default function HeroAudit({ source = "hero-audit" }: { source?: AuditSource }) {
  return (
    <div className={styles.action} data-hero-audit="">
      <LeadPanel source={source} ctaVariant="black">
        <span data-orbilect-cta-icon="" data-explicit-arrow="" aria-hidden="true"><ArrowUpRight size={17} /></span>
        Get a free SEO audit
      </LeadPanel>
    </div>
  );
}

export function HeroActions({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className ? styles.row + " " + className : styles.row} data-hero-actions="">{children}</div>;
}
