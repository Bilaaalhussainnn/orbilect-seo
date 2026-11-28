export const publicToolDefinitions = [
  {
    name: "search_public_pages", description: "Find Orbilect SEO services, industries, pricing, policies and guides. Returns source URLs for citation; does not search private systems.",
    inputSchema: { type: "object", properties: { query: { type: "string", minLength: 2, maxLength: 120 }, limit: { type: "integer", minimum: 1, maximum: 8, default: 5 } }, required: ["query"], additionalProperties: false },
  },
  {
    name: "read_public_page", description: "Read the published Markdown of a public Orbilect SEO page selected from search results. Does not retrieve arbitrary URLs or private pages.",
    inputSchema: { type: "object", properties: { path: { type: "string", minLength: 1, maxLength: 200, description: "A public site path returned by search_public_pages." } }, required: ["path"], additionalProperties: false },
  },
  {
    name: "get_contact_information", description: "Return Orbilect SEO's public contact details and contact page. Does not submit personal information or contact the team.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
] as const;
export const publicToolAnnotations = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };
