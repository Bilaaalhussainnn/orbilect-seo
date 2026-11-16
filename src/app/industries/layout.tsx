import sizes from "../section-heading-scale.module.css";
import type { ReactNode } from "react";

export default function SectionHeadingLayout({ children }: { children: ReactNode }) {
  return <div className={sizes.scope}>{children}</div>;
}
