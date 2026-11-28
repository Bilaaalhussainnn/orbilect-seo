import additions from "./article-editorial-additions.json";

export type ArticleAdditionSection = {
  id: string;
  title: string;
  paragraphs: string[];
  sources: string[][];
};

type ArticleAdditions = { updatedAt: string; sections: ArticleAdditionSection[] };
const entries: Record<string, ArticleAdditions | undefined> = additions;

export function getArticleAdditions(slug: string): ArticleAdditions {
  const entry = entries[slug];
  if (!entry || entry.sections.length !== 4) {
    throw new Error("Missing editorial additions for published article: " + slug);
  }
  return entry;
}
