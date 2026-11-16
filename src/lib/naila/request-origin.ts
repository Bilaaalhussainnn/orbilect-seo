import type { NextRequest } from "next/server";

const publicOrigins = new Set([
  "https://orbilectseo.com",
  "https://www.orbilectseo.com",
  "https://scenic-deepskyblue-llama-17.hostingersite.com",
]);

export function isNailaSiteRequest(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");

  if (!origin || (fetchSite && fetchSite !== "same-origin")) return false;

  // Hostinger can present an internal origin to Next.js behind its HTTPS proxy.
  return origin === request.nextUrl.origin || publicOrigins.has(origin);
}
