import { getPublishedPosts, seoGuideSlug } from "./blog-data";
import articleContent from "./article-content.json";
import referenceImages from "./article-reference-images.json";
import articleDeepDives from "./article-deep-dives.json";
import articleExpansions from "./article-expansions.json";
import type { Guide, GuideExpansion } from "./guide-body";
import { getArticleAdditions } from "./article-additions";

const content: Record<string, (typeof articleContent)[keyof typeof articleContent] | undefined> = articleContent;
const expansions: Record<string, GuideExpansion | undefined> = articleExpansions;
const posts = getPublishedPosts().filter(post => post.slug !== seoGuideSlug);
const publishedSlugs = new Set(posts.map(post => post.slug));

for (const slug of [...Object.keys(content), ...Object.keys(expansions)]) {
  if (!publishedSlugs.has(slug)) throw new Error("Blog guide lacks a published record: " + slug);
}

const guides = posts.map(post => {
  const source = content[post.slug];
  if (!source) throw new Error("Published blog post lacks a guide: " + post.slug);

  const expansion = expansions[post.slug];
  if (!expansion || expansion.sections.length !== source.sections.length) {
    throw new Error("Missing or incomplete expansion for " + post.slug);
  }

  const guide: Guide = {
    ...source,
    checks: source.checks.map((check): [string, string] => {
      const [label, detail] = check;
      if (check.length !== 2 || typeof label !== "string" || typeof detail !== "string") {
        throw new Error("Invalid article checklist entry for " + post.slug);
      }
      return [label, detail];
    }),
  };
  const additions: Record<string, GuideExpansion["deepDive"]> = articleDeepDives;
  if (additions[post.slug]?.length !== 5) throw new Error("Incomplete deep dive for " + post.slug);
  const screenshots: Record<string, GuideExpansion["referenceImages"]> = referenceImages;
  const images = screenshots[post.slug];
  const sources = [...expansion.sources];
  const editorial = getArticleAdditions(post.slug);
  for (const section of editorial.sections) for (const source of section.sources) {
    if (!sources.some(entry => entry[1] === source[1])) sources.push(source);
  }
  for (const image of images ?? []) if (!sources.some(source => source[1] === image.source[1])) sources.push(image.source);
  return { post, guide, updatedAt: editorial.updatedAt, expansion: { ...expansion, sources, deepDive: additions[post.slug], editorialAdditions: editorial.sections, referenceImages: images } };
});

export function getPublishedGuides() {
  return guides;
}

export function findPublishedGuide(slug: string) {
  return guides.find(entry => entry.post.slug === slug);
}
