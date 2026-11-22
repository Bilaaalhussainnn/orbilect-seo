import { getIndustryDesigns, mixedDesigns } from "@/lib/design-gallery";
import GalleryRows from "@/app/website-design-gallery/gallery-rows";
import investment from "../../_components/service-investment.module.css";
import { ShowcaseHeading } from "./section-heading";
export function DesignCarousel() {
 return <section id="ui-designs" className={investment.section} aria-labelledby="ui-designs-title"><div className={investment.wrap}><ShowcaseHeading id="ui-designs-title" eyebrow="Landing page inspiration" title="A clearer route" accent="to your next enquiry" intro="Explore current website and landing page design inspiration across twelve industries, then tailor the content and journey to your audience." enquiry="Landing page design" ctaLabel="Discuss your landing page"/></div><GalleryRows images={mixedDesigns(getIndustryDesigns(),16)} rows={2} label="Mixed industry"/></section>;
}
