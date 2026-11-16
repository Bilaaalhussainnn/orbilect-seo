import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/orbilect-search";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api", "/admin", "/internal"] },
    sitemap: siteUrl("/sitemap.xml"),
  };
}
