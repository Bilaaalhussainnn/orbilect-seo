import { readFile } from "node:fs/promises";
import path from "node:path";
type Page = { path: string; title: string; description: string; file: string; markdownUrl: string };
const origin = "https://orbilectseo.com";
let catalog: Promise<Page[]> | undefined;
export function getPublicPages() {
  return catalog ??= readFile(path.join(process.cwd(), "public/agent-markdown/manifest.json"), "utf8").then(text => JSON.parse(text) as Page[]);
}
const tokens = (value: string) => value.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
let searchIndex: Promise<{page: Page; words: Set<string>; title: Set<string>}[]> | undefined;
export async function readPublicPage(route: string) {
  const page = (await getPublicPages()).find(page => page.path === route);
  if (!page) throw new Error("Choose a public page path returned by search_public_pages.");
  const markdown = await readFile(path.join(process.cwd(), "public/agent-markdown", page.file), "utf8");
  return { title: page.title, url: origin + page.path, markdown };
}
export async function searchPublicPages(query: string, limit = 5) {
  const pages = await getPublicPages();
  const index = await (searchIndex ??= Promise.all(pages.map(async page => {
    const content = await readPublicPage(page.path);
    return { page, title: new Set(tokens(page.title)), words: new Set(tokens(content.markdown)) };
  })));
  const terms = [...new Set(tokens(query))];
  return index.map(({page, words, title}) => ({page, score: terms.reduce((sum, term) => sum + (title.has(term) ? 4 : words.has(term) ? 1 : 0), 0)}))
    .filter(row=>row.score > 0).sort((a,b)=>b.score-a.score||a.page.path.localeCompare(b.page.path)).slice(0,limit)
    .map(({page})=>({path:page.path,title:page.title,url:origin+page.path,description:page.description}));
}
export const publicContact = {
  name: "Orbilect SEO", parentCompany: "Orbilect Labs", email: "info@orbilectseo.com",
  phone: "+1 (646) 640-0070", pakistanPhone: "+92 309 215-2810", whatsapp: "https://wa.me/16477994640",
  contactPage: origin + "/contact", servicesPage: origin + "/services",
  note: "Public contact information only. This tool does not submit an enquiry, send a message or book a call.",
};
