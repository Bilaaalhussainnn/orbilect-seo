import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [{ source: "/design-media/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }];
  },
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
