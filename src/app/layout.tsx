import { humanChatAvailable } from "@/lib/naila/human-chat";
import { rootSeo } from "@/lib/orbilect-search";
import SiteHeader from "@/components/header";
import SiteFooter from "@/components/footer";
import NailaVisitorTracking from "@/components/naila/visitor";
import { Suspense } from "react";
import Naila from "@/components/naila";
import BackToTop from "./_home/workbench/back-to-top";

import "./globe-popup-actions.css";
import CookieConsent from "@/components/cookie-consent";
import SeoInvestmentOffer from "./_components/seo-investment-offer";
import "./orbilect-responsive.css";
import SiteScrollReveal from "./site-scroll-reveal";
import ScrollExperience from "./scroll-experience";
import { Poppins } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import "./section-headings.css";
import "./orbilect-cta.css";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = rootSeo;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body suppressHydrationWarning={process.env.NODE_ENV === "development"}>
        <SiteHeader />
        <span id="site-content" tabIndex={-1} />
        {children}  <ScrollExperience />
        <SiteScrollReveal />
      <SeoInvestmentOffer />
      <CookieConsent />
      <Naila humanChatEnabled={humanChatAvailable()} />
      {process.env.NAILA_VISITS_ENABLED === "1" && <Suspense fallback={null}><NailaVisitorTracking /></Suspense>}
      
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
