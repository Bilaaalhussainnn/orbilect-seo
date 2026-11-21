/* Audits the HTML served by a production build. */
const fs = require("node:fs");
const path = require("node:path");

const origin = "https://orbilectseo.com";
const base = new URL(process.argv[2] || "http://127.0.0.1:3000");
const root = path.join(__dirname, "..", "src", "app");
const failures = new Set();
const titles = new Map();
const descriptions = new Map();
const pages = new Map();
const linkedPaths = new Map();
const linkedSections = new Map();
const assets = new Map();
const fail = message => failures.add(message);

const htmlEntities = new Map([["amp", "&"], ["quot", '"'], ["apos", "'"], ["lt", "<"], ["gt", ">"], ["nbsp", " "]]);
const decode = value => value?.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, entity) => {
  if (!entity.startsWith("#")) return htmlEntities.get(entity.toLowerCase()) ?? whole;
  const point = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : Number(entity.slice(1));
  return point > 0 && point <= 0x10FFFF ? String.fromCodePoint(point) : whole;
});
const tagPattern = name => new RegExp("<" + name + "(?=[\\s/>])(?:\"[^\"]*\"|'[^']*'|[^\"'<>])*>", "gi");
const attributes = (html, name) => [...html.matchAll(tagPattern(name))].map(([tag]) =>
  Object.fromEntries([...tag.matchAll(/\s([^\s=<>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>]+))/g)]
    .map(([, key, double, single, unquoted]) => [key.toLowerCase(), decode(double ?? single ?? unquoted)])));
const withoutScripts = html => html.replace(/<!--[^]*?-->|<script\b[^]*?<\/script\s*>/gi, "");
const textContent = html => decode(html?.replace(/<[^>]*>/g, ""))?.replace(/\s+/g, " ").trim();
const assetPath = url => url.pathname === "/_next/image" ? url.searchParams.get("url") : url.pathname;

async function get(route, method = "GET") {
  const response = await fetch(new URL(route, base), {
    method, redirect: "manual", signal: AbortSignal.timeout(25_000),
  });
  return { response, text: method === "GET" ? await response.text() : "" };
}

async function batch(items, check) {
  for (let index = 0; index < items.length; index += 6) {
    await Promise.all(items.slice(index, index + 6).map(async item => {
      try { await check(item); } catch (error) { fail(item[0] + " — " + error.message); }
    }));
  }
}

function sameSite(href, route) {
  const url = new URL(href, new URL(route, origin));
  if (url.origin === origin) return url;
  return undefined;
}

function addImage(src, route) {
  if (!src) return;
  const url = sameSite(src, route);
  const file = url && assetPath(url);
  if (typeof file === "string" && file.startsWith("/") && !file.startsWith("//")) assets.set(file, route);
}

function appRoutes(directory = root, parts = []) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.isDirectory() && !/^[_@]/.test(entry.name)) {
      const segments = /^\([^)]*\)$/.test(entry.name) ? parts : [...parts, entry.name];
      return appRoutes(path.join(directory, entry.name), segments);
    }
    return entry.isFile() && /^page\.(?:js|jsx|ts|tsx)$/.test(entry.name) ? ["/" + parts.join("/")] : [];
  });
}

function checkUnique(map, value, name, route) {
  if (!value) { fail(route + " is missing " + name); return; }
  const normalized = value.toLowerCase().replace(/\s+/g, " ").trim();
  if (map.has(normalized)) fail(route + " and " + map.get(normalized) + " share " + name + " " + JSON.stringify(value));
  map.set(normalized, route);
}

function checkSchema(html, route, canonical) {
  const nodes = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([^]*?)<\/script>/gi)]
    .flatMap(([, source]) => {
      const data = JSON.parse(source);
      return Array.isArray(data) ? data : (data["@graph"] ?? [data]);
    });
  const getNode = type => nodes.find(node => node["@type"] === type);
  if (route === "/") {
    const organization = getNode("Organization");
    const website = getNode("WebSite");
    if (!organization?.name || !organization.logo?.url || organization.url !== canonical) {
      fail(route + " has incomplete Organization schema.");
    } else addImage(organization.logo.url, route);
    if (!website?.name || website.url !== canonical || !organization?.["@id"] ||
        website.publisher?.["@id"] !== organization["@id"]) fail(route + " has incomplete WebSite schema.");
  }
  if (route.startsWith("/blogs/")) {
    const article = getNode("BlogPosting") ?? getNode("Article");
    if (!article?.headline || !article.description || !article.author?.name ||
        !Number.isFinite(Date.parse(article.datePublished)) ||
        article.mainEntityOfPage?.["@id"] !== canonical || !article.image?.length) {
      fail(route + " has incomplete Article schema.");
    } else article.image.forEach(src => addImage(src, route));
  }
  if (route.startsWith("/services/")) {
    const service = getNode("Service");
    if (!service?.name || !service.description || service.url !== canonical || !service.provider?.["@id"]) {
      fail(route + " has incomplete Service schema.");
    }
  }
}

async function checkPage([route, sitemapCanonical]) {
  const { response, text } = await get(route);
  if (response.status !== 200) { fail(route + " returned HTTP " + response.status); return; }
  const html = withoutScripts(text);
  const head = html.match(/<head(?:\s[^>]*)?>([^]*?)<\/head>/i)?.[1] ?? "";
  const meta = attributes(head, "meta");
  const readingDirectives = attributes(html, "meta")
    .filter(entry => /^(robots|googlebot|bingbot)$/i.test(entry.name || "")).map(entry => entry.content);
  if (/\b(?:noindex|none)\b/i.test([response.headers.get("x-robots-tag"), ...readingDirectives].join(" "))) {
    fail(route + " is marked noindex.");
  }
  const headLinks = attributes(head, "link");
  const canonical = headLinks.filter(entry => entry.rel?.toLowerCase() === "canonical").map(entry => entry.href);
  if (canonical.length !== 1 ||
      !(canonical[0] === sitemapCanonical || (route === "/" && canonical[0] === origin))) {
    fail(route + " canonical: expected " + sitemapCanonical + "; found " + JSON.stringify(canonical));
  }
  if (/(?:^|;)\s*rel\s*=\s*"?canonical\b/i.test(response.headers.get("link") ?? "")) {
    fail(route + " also sends an HTTP canonical header.");
  }
  checkUnique(titles, textContent(head.match(/<title[^>]*>([^]*?)<\/title>/i)?.[1]), "title", route);
  const pageDescriptions = meta.filter(entry => entry.name === "description");
  if (pageDescriptions.length > 1) fail(route + " has more than one meta description.");
  checkUnique(descriptions, pageDescriptions[0]?.content?.trim(), "description", route);
  const headings = [...html.matchAll(/<h1(?=[\s>])[^>]*>([^]*?)<\/h1>/gi)];
  if (headings.length !== 1 || !textContent(headings[0]?.[1])) fail(route + " must have one non-empty HTML H1.");

  const graph = new Map(meta.filter(entry => entry.property).map(entry => [entry.property, entry.content]));
  if (!graph.get("og:title") || !graph.get("og:description") || !graph.get("og:image")) {
    fail(route + " has incomplete Open Graph metadata.");
  } else addImage(graph.get("og:image"), route);
  const xCard = meta.find(entry => entry.name === "twitter:card");
  if (!xCard?.content) fail(route + " is missing an X card type.");
  const socialImage = meta.find(entry => entry.name === "twitter:image");
  addImage(socialImage?.content, route);
  if (route === "/" && !headLinks.some(entry => entry.rel === "icon" && entry.href)) fail("Homepage is missing a favicon link.");
  headLinks.filter(entry => entry.rel === "icon").forEach(entry => addImage(entry.href, route));

  const ids = new Set(attributes(html, "[a-z][a-z0-9:-]*").map(tag => tag.id).filter(Boolean));
  const links = new Set();
  for (const { href } of attributes(html, "a")) {
    if (!href) continue;
    const url = sameSite(href, route);
    if (!url) continue;
    if (/^\/(?:api|_next)\//.test(url.pathname)) continue;
    links.add(url.pathname);
    if (url.hash && url.hash !== "#" && !url.hash.startsWith("#:~:text=")) {
      linkedSections.set(url.pathname + url.hash, route);
    }
    linkedPaths.set(url.pathname, route);
  }
  pages.set(route, { ids, links });
  for (const { src } of attributes(html, "img")) addImage(src, route);
  checkSchema(text, route, sitemapCanonical);
}

async function main() {
  const [robots, sitemap] = await Promise.all([get("/robots.txt"), get("/sitemap.xml")]);
  if (robots.response.status !== 200 ||
      !robots.text.split(/\r?\n/).includes("Sitemap: " + origin + "/sitemap.xml") ||
      !/^User-Agent:\s*\*\s*$/im.test(robots.text) || /^Disallow:\s*\/\s*$/im.test(robots.text)) {
    fail("robots.txt must allow crawling the public site and reference its canonical sitemap.");
  }
  if (sitemap.response.status !== 200 || !/<urlset\b[^>]*sitemaps\.org\/schemas\/sitemap\/0\.9/.test(sitemap.text)) {
    throw new Error("Invalid sitemap.xml response (HTTP " + sitemap.response.status + ").");
  }
  const sitemapPages = new Map();
  for (const [, loc] of sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = new URL(decode(loc));
    if (url.origin !== origin || url.username || url.password || url.search || url.hash ||
        sitemapPages.has(url.pathname) || /^\/(?:api|admin|internal)(?:\/|$)/.test(url.pathname)) {
      fail("Unexpected or duplicate sitemap URL " + loc);
    }
    sitemapPages.set(url.pathname, url.href);
  }
  const retiredIndustryRoutes = new Set(["/industries/home-services", "/industries/professional-services", "/industries/saas"]);
  for (const route of retiredIndustryRoutes) {
    const { response } = await get(route);
    if (response.status !== 308 || response.headers.get("location") !== "/industries") fail(route + " must permanently redirect to the active industry directory.");
    if (sitemapPages.has(route)) fail(route + " is a retired redirect and should not appear in the sitemap.");
  }
  const sourceRoutes = appRoutes();
  for (const route of sourceRoutes) {
    if (route === "/blogs/[slug]" || retiredIndustryRoutes.has(route)) continue;
    if (!sitemapPages.has(route)) fail(route + " exists in the App Router and is missing from the sitemap.");
  }
  if (!sitemapPages.has("/")) fail("Homepage is missing from the sitemap.");
  const missingArticle = await get("/blogs/nonexistent-orbilect-audit-page");
  if (missingArticle.response.status !== 404) {
    fail("An unpublished blog URL returned HTTP " + missingArticle.response.status + " instead of 404.");
  }
  for (const route of sitemapPages.keys()) {
    const generatedBlog = /^\/blogs\/[a-z0-9-]+$/.test(route) && sourceRoutes.includes("/blogs/[slug]");
    if (!generatedBlog && !sourceRoutes.includes(route)) fail(route + " is in the sitemap without a matching page.");
  }
  await batch([...sitemapPages], checkPage);
  const homeLinks = pages.get("/")?.links;
  for (const route of ["/about", "/services", "/blogs"]) {
    if (!homeLinks?.has(route)) fail("Homepage is missing an HTML link to " + route);
  }
  const inbound = new Set([...pages].flatMap(([from, page]) => [...page.links].filter(route => route !== from)));
  for (const route of sitemapPages.keys()) {
    if (route !== "/" && !inbound.has(route)) fail(route + " has no HTML link from another sitemap page.");
  }
  for (const [target, from] of linkedSections) {
    const url = new URL(target, origin);
    const targetPage = pages.get(url.pathname);
    if (targetPage && !targetPage.ids.has(decodeURIComponent(url.hash.slice(1)))) {
      fail("Missing section " + target + " linked from " + from);
    }
  }
  const otherLinks = [...linkedPaths].filter(([route]) => !sitemapPages.has(route));
  await batch(otherLinks, async ([route, from]) => {
    const { response } = await get(route, "HEAD");
    if (!response.ok) fail("Internal link from " + from + " to " + route + " returned HTTP " + response.status);
  });
  await batch([...assets], async ([asset, from]) => {
    const { response } = await get(asset, "HEAD");
    if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) {
      fail("Image used by " + from + " unavailable at " + asset + " (HTTP " + response.status + ").");
    }
  });
  console.log("Checked " + sitemapPages.size + " sitemap URLs, " + linkedSections.size +
    " linked sections, " + assets.size + " images, and " + otherLinks.length + " other paths on " + base.origin);
  for (const failure of [...failures].sort()) console.error("• " + failure);
  if (failures.size) process.exitCode = 1;
  else console.log("Passed route coverage, crawl, metadata, schema, links, and image checks.");
}

main().catch(error => {
  console.error(error.message + (error.cause ? " — " + error.cause.message : ""));
  process.exitCode = 1;
});
