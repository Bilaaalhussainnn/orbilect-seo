import { HowWeWork } from "../_home/growth";
import processContent from "../_home/growth/content.json";
import { WebsiteRedesignPromotion } from "../services/website-redesign/website-redesign-promotion";
import { pageSeo, siteUrl } from "@/lib/orbilect-search";
import { getIndustryDesigns } from "@/lib/design-gallery";
import SeoJsonLd from "@/components/seo/json-ld";
import { ServiceHero, type ServiceScene } from "../services/_components/service-story";
import TechnologyStack from "../_home/technology-stack";
import { HomeFaq } from "../_home/editorial";
import FinalCta from "../_home/final-cta";
import GalleryBrowser from "./gallery-browser";
import { galleryFaqs } from "./gallery-content";
import styles from "./gallery.module.css";

export const metadata = pageSeo("/website-design-gallery");
const scenes: ServiceScene[] = [
  { id: "search", label: "Discover", address: "A website that feels like your brand", title: "Find a visual direction", copy: "Browse industry collections and choose the details that fit your customers.", items: ["Twelve industries", "Distinctive layouts"] },
  { id: "page", label: "Explore", address: "Responsive by design", title: "Built for every screen", copy: "Bring clear content, mobile navigation, and useful features together.", items: ["Mobile-friendly", "Thoughtful interaction"] },
  { id: "links", label: "Create", address: "Your next chapter", title: "Make the design yours", copy: "Share your favourite examples and we’ll scope a website around your goals.", items: ["Custom design", "Clear next steps"] },
];

export default function WebsiteDesignGallery() {
  const galleries = getIndustryDesigns();
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": siteUrl("/website-design-gallery#page"), url: siteUrl("/website-design-gallery"), name: "Website Design Gallery", description: "Responsive website and landing page design inspiration across twelve industries.", isPartOf: { "@id": siteUrl("/#website") }, mainEntity: { "@id": siteUrl("/website-design-gallery#collections") } },
    { "@type": "ItemList", "@id": siteUrl("/website-design-gallery#collections"), numberOfItems: galleries.length, itemListElement: galleries.map((gallery, index) => ({ "@type": "ListItem", position: index + 1, name: gallery.name + " website design inspiration", url: siteUrl("/industries/" + gallery.slug + "#industry-design-heading") })) },
    { "@type": "FAQPage", mainEntity: galleryFaqs.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
  ] };
  return <main className={styles.page}>
    <SeoJsonLd data={schema} />
    <ServiceHero eyebrow="Website Design Gallery" title="Make your first impression" accent="worth a second look." intro="Explore website and landing page design inspiration for twelve industries. Find your direction, then build an experience around your brand and customers." scenes={scenes} ctaLabel="Explore the collections" />
    <section id="service-intro" className={styles.intro} aria-labelledby="gallery-intro-title"><div className={styles.wrap}><p className={styles.eyebrow}>Design for the way people browse</p><h2 id="gallery-intro-title">Attractive on the surface.<br /><span>Thoughtful at every step.</span></h2><p>Your website often introduces your business before anyone speaks to your team. Strong visual design helps people understand your offer, while readable content, fast-loading pages, and clear navigation help them decide what to do next.</p><div className={styles.introGrid}><article><h3>Start with the smallest screen</h3><p>Mobile-friendly website design means usable menus, clear type, comfortable touch targets, and forms people can complete on the move. Responsive layouts should feel considered on tablets and desktop too.</p></article><article><h3>Make your brand easy to recognise</h3><p>A consistent visual language, useful images, and focused page hierarchy help visitors recognise what makes your business different and find the information they need.</p></article><article><h3>Give every visit a clear next step</h3><p>Connect design with content and SEO. Help visitors move from discovering a service or product to comparing options, booking, buying, or sending an enquiry.</p></article></div></div></section>
    <GalleryBrowser galleries={galleries} />
    <TechnologyStack />
    <HowWeWork heading="From your first message" accent="to your next website" intro="Choose a design direction, then contact us with your current website, requirements, and goals. We’ll review the work with you and agree the scope before kickoff." steps={processContent.process.map(([slug], index) => [slug, ...[
      ["Tell us what you want to build", "Use our Contact page to share your current URL, industry, preferred gallery designs, and the customer actions that matter most."],
      ["Agree confidentiality and access", "Confirm how project information will be shared. Use secure, role-based invitations when access is required."],
      ["Review your current website", "We assess mobile usability, important content, navigation, existing URLs, integrations, and the changes your website needs."],
      ["Approve the design and scope", "Review the proposed platform, page layouts, features, deliverables, timeline, and investment before work begins."],
      ["Confirm your invoice and kickoff", "We issue an invoice for the agreed scope and payment terms, then confirm responsibilities and the project schedule."],
      ["Build, test, and launch", "Review the design, test mobile and tablet journeys, check forms and redirects, and launch once the agreed checks are complete."],
    ][index]])} />
    <WebsiteRedesignPromotion />
    <HomeFaq hideSectionLabel items={galleryFaqs} introTitle="Your design questions, answered" introCopy="Explore how we turn visual inspiration into a responsive website built around your requirements." />
    <FinalCta />
  </main>;
}
