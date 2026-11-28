import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { z } from "zod";
import { publicContact, getPublicPages, readPublicPage, searchPublicPages } from "@/lib/agents/public-content";
import { mcpIdentity, mcpCapabilities, serverCard } from "@/lib/agents/server-card";
import { publicToolAnnotations, publicToolDefinitions } from "@/lib/agents/tools";

const siteOrigin = "https://orbilectseo.com";
function permitted(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === siteOrigin || origin === "https://www.orbilectseo.com";
}
const headers = { "Cache-Control": "no-store", "Access-Control-Allow-Origin": siteOrigin, "Access-Control-Allow-Methods": "POST, GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version, MCP-Session-Id", "X-Robots-Tag": "noindex" };
const textResult = (text: string) => ({ content: [{ type: "text" as const, text }] });
export async function POST(request: Request) {
  if (!permitted(request)) return Response.json({ error: "Origin is not allowed." }, { status: 403, headers });
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true, maxRequestBodySize: 16384 });
  const server = new McpServer(mcpIdentity);
  const [search, read, contact] = publicToolDefinitions;
  server.registerTool(search.name, { description: search.description, inputSchema: z.object({ query: z.string().trim().min(2).max(120), limit: z.number().int().min(1).max(8).default(5) }).strict(), annotations: publicToolAnnotations }, async ({query,limit}) => textResult(JSON.stringify({ results: await searchPublicPages(query,limit) })));
  server.registerTool(read.name, { description: read.description, inputSchema: z.object({ path: z.string().min(1).max(200) }).strict(), annotations: publicToolAnnotations }, async ({path}) => {
    try { const page = await readPublicPage(path); return textResult(page.markdown); }
    catch { return { ...textResult("This is not an available public page. Use search_public_pages to choose a path."), isError: true }; }
  });
  server.registerTool(contact.name, { description: contact.description, inputSchema: z.object({}).strict(), annotations: publicToolAnnotations }, async () => textResult(JSON.stringify(publicContact)));
  for (const page of await getPublicPages()) server.registerResource(page.title, page.markdownUrl, { mimeType: "text/markdown", description: page.description }, async uri => ({ contents: [{ uri: uri.href, mimeType: "text/markdown", text: (await readPublicPage(page.path)).markdown }] }));
  server.registerResource("MCP Server Card", "mcp://server-card.json", { mimeType: "application/json" }, async uri => ({ contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(serverCard) }] }));
  // This public deployment exposes fixed read-only lists, without subscriptions.
  server.server.registerCapabilities(mcpCapabilities);
  try {
    await server.connect(transport);
    const response = await transport.handleRequest(request);
    for (const [key,value] of Object.entries(headers)) response.headers.set(key,value);
    return response;
  } finally { await server.close(); }
}
export function GET(request: Request) {
  if (!permitted(request)) return new Response("Origin is not allowed.", { status: 403, headers });
  return new Response("This stateless MCP endpoint accepts POST requests. Discovery: /mcp/server-card", { status: 405, headers: { ...headers, Allow: "POST, OPTIONS" } });
}
export function OPTIONS(request: Request) { return new Response(null, { status: permitted(request) ? 204 : 403, headers }); }
