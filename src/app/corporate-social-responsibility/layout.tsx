import sizes from "../section-heading-scale.module.css";
import ResponsibilityNext from "./responsibility-next";
// Orbilect CSR sections
import type { ReactNode } from "react";
import ResponsibilityContent from "./responsibility-content";

export default function CorporateResponsibilityLayout({ children }: { children: ReactNode }) {
  return (
    <div className={sizes.scope}>
      {children}
      <ResponsibilityContent />
      <ResponsibilityNext />
    </div>
  );
}
