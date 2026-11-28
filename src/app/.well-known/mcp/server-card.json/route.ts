import { legacyServerCard, cardHeaders } from "@/lib/agents/server-card";
export function GET() { return Response.json(legacyServerCard, { headers: cardHeaders }); }
export function OPTIONS() { return new Response(null, { status: 204, headers: cardHeaders }); }
