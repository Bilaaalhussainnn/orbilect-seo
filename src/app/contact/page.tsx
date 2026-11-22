import PageStructuredData from "@/components/seo/page-data";
import { businessDescription } from "@/lib/site-identity";
import { pageSeo } from "@/lib/orbilect-search";
import ContactPageHero from "./contact-page-hero";
import { InvestmentBeforeFaq } from "../_components/investment-before-faq";
import { ServicesReputation } from "../services/_components/seo-support";
import GlobalLocations from "@/components/global-locations";
import { WhyChooseOrbilect } from "../about/search-strategy-sections";
import SeoRequestPrefill from "../_components/seo-request-prefill";
import { Suspense as SeoRequestSuspense } from "react";
import { HomeFaq } from "../_home/editorial";
// Orbilect contact page
import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import FinalCta from "../_home/final-cta";
import cta from "@/styles/orbilect-cta.module.css";
import styles from "./contact.module.css";

const seoBaseMetadata: Metadata = {
  title: "Contact Orbilect SEO",
  description:
    "Talk to Orbilect SEO about your website, search visibility, and a custom SEO proposal. Call +1 (646) 640-0070 or email info@orbilectseo.com.",
};

const directions =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("450 Park Avenue, Suite 2800, New York, NY 10022, US");

export default function ContactPage() {
  return (
    <main>
      <PageStructuredData route="/contact" />
      <ContactPageHero />

      <SeoRequestSuspense><SeoRequestPrefill /></SeoRequestSuspense>
      <FinalCta contactDetails={<ContactDetails />} />
      <WhyChooseOrbilect />
      <GlobalLocations />

      <ServicesReputation placement="contact" />
      <InvestmentBeforeFaq routes={["/contact"]} />
      <HomeFaq hideCta hideSectionLabel />


    </main>
  );
}

function ContactDetails() {
  return (
    <div>
      <p className={styles.businessDescription}>
        {businessDescription}
      </p>
    <div id="contact-details" className={styles.detailsGrid} aria-label="Contact information">
      <div className={styles.detail}>
        <Phone size={22} aria-hidden="true" />
        <h3>US Phone</h3>
        <a href="tel:+16466400070">+1 (646) 640-0070</a>
      </div>
      <div className={styles.detail}>
        <Mail size={22} aria-hidden="true" />
        <h3>Email us</h3>
        <a href="mailto:info@orbilectseo.com">info@orbilectseo.com</a>
      </div>
      <div className={styles.detail}>
        <MapPin size={22} aria-hidden="true" />
        <h3>New York office</h3>
        <address>
          450 Park Avenue, Suite 2800<br />
          New York City, New York 10022, US
        </address>
        <a className={styles.directions} href={directions}>
          Get directions <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </div>
    </div>
  );
}


// Orbilect search metadata
export const metadata = pageSeo("/contact", seoBaseMetadata as import("next").Metadata);
