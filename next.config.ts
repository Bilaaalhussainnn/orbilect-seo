import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
