import type { NextConfig } from "next";
import imageRelease from "./src/lib/image-release.json";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      { source: "/:path*", headers: [{ key: "X-Orbilect-SEO-Release", value: "reliability-v21" }] },
      { source: "/agent-markdown/:path*", headers: [{ key: "Content-Type", value: "text/markdown; charset=utf-8" }, { key: "Cache-Control", value: "public, max-age=3600" }, { key: "X-Robots-Tag", value: "noindex" }] },
      { source: "/llms.txt", headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }, { key: "Cache-Control", value: "public, max-age=3600" }] },
      ...["/brand/:path*", "/technology-stack/:path*", "/service-showcase/logos/:path*", "/platform-logos/:path*", "/naila/:path*"].map(source => ({
        source,
        has: [{ type: "query" as const, key: "v", value: imageRelease.version }],
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      })),
      ...["/industry-covers/:path*", "/industry-covers-landscape/:path*", "/service-covers-landscape/:path*"].map(source => ({
        source, headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      })),
      { source: "/locations-dark-v11/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/image-media/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/design-media/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
  async redirects() {
    return [{ source: "/:path*", has: [{ type: "host" as const, value: "www.orbilectseo.com" }], destination: "https://orbilectseo.com/:path*", permanent: true }];
  },
  compress: true,
  // Only immutable, release-versioned assets receive a year-long cache lifetime.
  images: { unoptimized: true, formats: ["image/avif", "image/webp"], localPatterns: [{ pathname: "/**", search: "" }, { pathname: "/**", search: "?v=" + imageRelease.version }] },
  cacheComponents: true,
  partialPrefetching: true,
  experimental: { cpus: 2, workerThreads: false },
};

export default {
  ...nextConfig,
  env: {
    ...nextConfig.env,
    ORBILECT_COPYRIGHT_YEAR: String(new Date().getUTCFullYear()),
  },
};
