import SeoJsonLd from "@/components/seo/json-ld";
import { origin, siteUrl } from "@/lib/orbilect-search";
import industries from "../_home/industry-growth/industries.json";
export default function IndustrySchema({ slug }: { slug: string }) {
  const item = industries.find(industry => industry.slug === slug);
  if (!item) return null;
  const url = siteUrl("/industries/" + slug);
  return <SeoJsonLd data={{ "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": url + "#page", url, name: item.name + " SEO Services", description: item.summary, isPartOf: { "@id": origin + "/#website" }, about: { "@id": url + "#service" }, primaryImageOfPage: { "@type": "ImageObject", url: siteUrl("/industry-covers/" + slug + ".webp"), width: 640, height: 800 } },
    { "@type": "Service", "@id": url + "#service", url, name: item.name + " SEO and website design", description: item.summary, serviceType: "SEO and website design", provider: { "@id": origin + "/#organization" } }
  ] }} />;
}
