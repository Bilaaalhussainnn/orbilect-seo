import { ReputationOutsideMainServices } from "./_components/main-service-interactive";
import { ReputationOutsideOnPage } from "./on-page-seo/on-page-progression";
import { Suspense, type ReactNode } from "react";
import { ServicesReputation } from "./_components/seo-support";

export default function ServicesTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <ReputationOutsideOnPage><ReputationOutsideMainServices><ServicesReputation placement="detail" /></ReputationOutsideMainServices></ReputationOutsideOnPage>
      </Suspense>
      {/* Mount future service-detail FAQs here, after Search and Reputation. */}
    </>
  );
}
