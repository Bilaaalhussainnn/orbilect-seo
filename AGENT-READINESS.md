# Orbilect SEO public agent interfaces — v23

## Public features

- `/robots.txt` preserves search access, private-route exclusions and the sitemap. It declares `Content-Signal: search=yes, ai-input=yes, ai-train=no`: search and inference are permitted; model training is not. This is a published usage preference, not technical enforcement against every crawler.
- `/llms.txt` summarizes the business and links the public site in Markdown, following the llms.txt proposal. It includes all 97 current public pages, grouped by purpose.
- Explicit `Accept: text/markdown` requests to public page URLs receive the matching Markdown with `Content-Type: text/markdown`. Normal browser HTML, canonical tags and Google-facing structured data remain available. Quality preferences and Next.js RSC/prefetch requests are respected.
- Markdown is generated from production HTML after each build. Headings, numbered steps, links, tables, image captions and canonical source URLs are retained. Forms, scripts, decorative duplicates and private data are excluded. The generator replaces only its own generated `public/agent-markdown` folder. Run the complete `npm run build`, including postbuild; do not skip it in Hostinger.
- Three read-only WebMCP tools register after hydration on public pages in supporting browsers: `search_public_pages`, `read_public_page`, and `get_contact_information`. The GoogleChromeLabs React hook handles the current `document.modelContext` API; a feature-detected fallback supports older `navigator.modelContext` implementations. Ordinary browsers without WebMCP continue normally. No fake API/polyfill is installed to inflate an audit score.
- A working stateless MCP server at `/mcp` uses the official TypeScript SDK and Streamable HTTP with short JSON responses. It offers those same three tools and 98 resources (97 public Markdown pages plus the server card). It supports the SDK's stable 2025 protocol compatibility; it does not claim unsupported newer versions or keep a long-lived SSE process running.
- `/.well-known/mcp/server-card.json` supplies the requested legacy SEP-1649 compatibility document. `/mcp/server-card` supplies the newer experimental Server Card shape. Both identify the actual endpoint and public scope. The older proposal has evolved; these are discovery aids, not Google ranking requirements.

## Access and boundaries

Only the build-generated public sitemap catalog is readable. Arbitrary URLs, filesystem paths, admin routes, customer records, leads, analytics, credentials and internal systems are unavailable. Agent tools cannot submit enquiries, send messages, book appointments or alter the website. They require no authentication because they expose only already-public information. The MCP endpoint validates browser Origin headers; public discovery metadata permits cross-origin reads.

The runtime reads the newly generated catalog, so a fresh build does not expose a stale previous-build page list. Search indexing of Markdown is lazy and cached in memory; homepage rendering does not call an external API or wait for MCP.

## Deployment and caching

Publish to GitHub with the supplied publisher and confirm Hostinger finishes its automatic deployment. Preserve the standard build and start commands and existing environment variables; these public features require no new secret.

Purge stale HTML, robots.txt, llms.txt and discovery JSON once after deployment. Configure any upstream CDN to honor `Vary: Accept` and the origin's no-store policy for negotiated Markdown. Do not force-cache `/mcp` POST responses, `/agent-content`, APIs or private pages. Static `/agent-markdown/*.md` URLs are a fallback when a CDN cannot negotiate representations correctly; llms.txt links them directly. These generated static files use a short cache lifetime so future edits can refresh.

`GET /mcp` returns 405 by design: clients initialize with POST and can fetch metadata at `/mcp/server-card`. The server deliberately does not open long-lived SSE connections on the Hostinger Node process.

After deployment, rerun Hostinger's AI visibility scan. Browser support, scanner implementation and intermediary caches can affect the result. Passing these checks improves machine access; it does not guarantee citations, indexing, rich results or rankings in Google or any AI product.

## Verification

- `node scripts/check-agent-readiness-v23.cjs`: production HTTP content negotiation/cache separation, robots, llms.txt, both cards, official SDK handshake, tool/resource calls and private-path rejection.
- `node scripts/check-webmcp-v23.cjs`: lifecycle tests with the installed registration hook against simulated current, legacy and unsupported browser surfaces. This is not a claim of a native browser origin-trial test.
- Existing production crawl, SEO metadata, Shopify article and reliability checks remain applicable.

Primary references:

- https://contentsignals.org/
- https://llmstxt.org/index.md
- https://developer.chrome.com/docs/ai/webmcp/imperative-api
- https://github.com/GoogleChromeLabs/use-webmcp-tool
- https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1649
- https://github.com/modelcontextprotocol/ext-server-card
- https://modelcontextprotocol.io/specification/2025-11-25/basic/transports

Supplemental `/agent-markdown/` files are marked noindex to avoid competing with canonical HTML pages. The original public URLs and their negotiated Markdown responses remain indexable.
