import type { NextConfig } from "next";
import imageRelease from "./src/lib/image-release.json";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      ...["/industry-covers/:path*", "/industry-covers-landscape/:path*", "/service-covers-landscape/:path*"].map(source => ({
        source, headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      })),
      { source: "/locations-dark-v11/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/image-media/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/design-media/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
  compress: true,
  // Only immutable, release-versioned assets receive a year-long cache lifetime.
  images: { formats: ["image/avif", "image/webp"], localPatterns: [{ pathname: "/**", search: "" }, { pathname: "/**", search: "?v=" + imageRelease.version }] },
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
