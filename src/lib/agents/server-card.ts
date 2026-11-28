import { publicToolDefinitions } from "./tools";
export const mcpIdentity = { name: "com.orbilectseo/public-website", title: "Orbilect SEO Public Website", version: "1.0.0", websiteUrl: "https://orbilectseo.com" };
export const mcpCapabilities = { tools: { listChanged: false }, resources: { listChanged: false, subscribe: false } };
export const serverCard = {
  $schema: "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
  ...mcpIdentity,
  description: "Search and read Orbilect SEO's public services, guides and contact information.",
  remotes: [{ type: "streamable-http", url: "https://orbilectseo.com/mcp", supportedProtocolVersions: ["2025-11-25", "2025-06-18", "2025-03-26"] }],
  _meta: { "com.orbilectseo/public-capabilities": mcpCapabilities, "com.orbilectseo/read-only": true },
};
// Compatibility document for scanners implementing the older SEP-1649 discovery shape.
export const legacyServerCard = {
  version: "1.0", protocolVersion: "2025-11-25", serverInfo: mcpIdentity,
  name: mcpIdentity.title, description: serverCard.description,
  transport: { type: "streamable-http", endpoint: "https://orbilectseo.com/mcp" },
  endpoint: "https://orbilectseo.com/mcp", capabilities: mcpCapabilities,
  tools: publicToolDefinitions, resources: ["dynamic"],
  documentationUrl: "https://orbilectseo.com/llms.txt",
};
export const cardHeaders = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=3600", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, If-None-Match" };
