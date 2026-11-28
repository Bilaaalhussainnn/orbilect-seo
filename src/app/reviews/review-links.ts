import "server-only";
import { googleBusinessProfileUrl, reviewPlatforms } from "@/lib/review-platforms";

type ReviewProfile = { reviewUrl?: string; embedUrl?: string };
const widgetHosts: Record<string, readonly string[]> = {
  trustpilot: ["widget.trustpilot.com"],
  reviewsio: ["widget.reviews.io"],
  techbehemoths: ["techbehemoths.com", "www.techbehemoths.com"],
  designrush: ["designrush.com", "www.designrush.com"],
  clutch: ["widget.clutch.co"],
};

function validUrl(value: unknown, hosts: readonly string[], allowSubdomains = false) {
  if (typeof value !== "string") return;
  try {
    const parsed = new URL(value);
    if (parsed.protocol === "https:" && !parsed.username && !parsed.password && !parsed.port &&
        hosts.some(host => host === parsed.hostname || (allowSubdomains && parsed.hostname.endsWith("." + host)))) {
      return parsed.href;
    }
  } catch {}
}

export function configuredReviewProfiles() {
  const profiles = new Map<string, ReviewProfile>([["google", { reviewUrl: googleBusinessProfileUrl }]]);
  try {
    const input = JSON.parse(process.env.ORBILECT_REVIEW_PROFILES ?? "{}");
    for (const { id, domains } of reviewPlatforms) {
      const entry = input?.[id];
      const reviewUrl = validUrl(entry?.reviewUrl, domains, true);
      if (!reviewUrl) continue;
      const embedUrl = validUrl(entry?.embedUrl, widgetHosts[id] ?? []);
      profiles.set(id, { reviewUrl, embedUrl });
    }
  } catch {}
  return profiles;
}
