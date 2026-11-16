import type { ReactNode } from "react";
import LeadPanel from "../../../components/lead-panel";

export default function FaqAuditButton({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return <LeadPanel source="faq-audit" className={className}>{children}</LeadPanel>;
}
