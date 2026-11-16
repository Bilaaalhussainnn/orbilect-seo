const { access, readFile, writeFile, rename } = require("node:fs/promises");
const path = require("node:path");
const { parse } = require("next/dist/compiled/node-html-parser");

const canonicalOrigin = "https://orbilectseo.com";
const destination = path.join(__dirname, "../src/lib/naila/public-content.json");
const buildApp = path.join(__dirname, "../.next/server/app");
const standalone = path.join(__dirname, "../.next/standalone");
const clean = text => text.replace(/\s+/g, " ").trim();

function indexPage(html, route) {
  const root = parse(html);
  const main = root.querySelector("main");
  if (!main) throw new Error("No public page content found at " + route);
  const title = clean(main.querySelector("h1")?.getAttribute("aria-label") ??
    main.querySelector("h1")?.text ?? root.querySelector("title")?.text ?? route);
  for (const node of main.querySelectorAll("script,style,template,svg,canvas,nav,aside,dialog,[hidden]")) node.remove();

  const groups = new Map();
  const add = (href, heading, value) => {
    if (!value) return;
    if (!groups.has(href + "|" + heading)) groups.set(href + "|" + heading, { href, heading, passages: new Set() });
    groups.get(href + "|" + heading).passages.add(value);
  };
  let heading = title;
  let href = route;
  // Walk in document order. Include closed details and tables, as their content is public.
  function walk(node) {
    if (node.nodeType === 3) {
      add(href, heading, clean(node.text));
      return;
    }
    const tag = node.tagName?.toLowerCase() ?? "";
    if (/^h[1-6]$/.test(tag)) {
      heading = clean(node.getAttribute("aria-label") ?? node.text) || heading;
      const sectionId = node.closest("section[id]")?.id;
      const fragment = route === "/privacy-policy" || route === "/terms-and-conditions"
        ? sectionId || node.id : node.id || sectionId;
      href = fragment ? route + "#" + encodeURIComponent(fragment) : route;
      return;
    }
    if (["p", "li", "summary", "figcaption", "th", "td", "dt", "dd", "blockquote", "label"].includes(tag) &&
        !node.querySelector("h1,h2,h3,h4,h5,h6,p,li,summary,figcaption,th,td,dt,dd,blockquote,label")) {
      add(href, heading, clean(node.text));
      return;
    }
    for (const child of node.childNodes ?? []) walk(child);
  }
  walk(main);
  const sections = [...groups.values()].map(({ href, heading, passages }) => ({ href, heading, passages: [...passages] }));
  if (!sections.length) throw new Error("Public page has no indexable text: " + route);
  return { path: route, title, sections };
}

async function writeIndex(destination, contents) {
  const temporary = destination + ".tmp";
  await writeFile(temporary, contents, { mode: 0o644 });
  await rename(temporary, destination);
}

async function run() {
  const sitemap = parse(await readFile(path.join(buildApp, "sitemap.xml.body"), "utf8"));
  const urls = sitemap.querySelectorAll("loc").map(node => new URL(node.text.trim()));
  if (!urls.length || urls.some(url => url.origin !== canonicalOrigin || url.search || url.hash ||
      /^\/(?:api|admin)(?:\/|$)/.test(url.pathname))) throw new Error("Unexpected public sitemap entries.");

  const routes = [...new Set(urls.map(url => url.pathname))];
  for (const policy of ["/privacy-policy", "/terms-and-conditions"]) {
    if (!routes.includes(policy)) throw new Error("Missing policy in sitemap: " + policy);
  }

  const pages = [];
  for (let start = 0; start < routes.length; start += 8) {
    pages.push(...await Promise.all(routes.slice(start, start + 8).map(async route => {
      const filename = route === "/" ? "index.html" : route.slice(1) + ".html";
      const html = await readFile(path.join(buildApp, filename), "utf8");
      return indexPage(html, route);
    })));
  }

  const contents = "[" + pages.map(page => JSON.stringify(page)).join(",\n") + "]\n";
  await writeIndex(destination, contents);
  const hasStandalone = await access(path.join(standalone, "server.js")).then(() => true, error => {
    if (error.code === "ENOENT") return false;
    throw error;
  });
  if (hasStandalone) await writeIndex(path.join(standalone, "src/lib/naila/public-content.json"), contents);
  console.log("Indexed " + pages.length + " public pages for Naila from build files.");
}

run().catch(error => { console.error(error.message); process.exitCode = 1; });
