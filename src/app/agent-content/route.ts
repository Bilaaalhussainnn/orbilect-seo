import { readPublicPage } from "@/lib/agents/public-content";
export async function GET(request: Request) {
  const route = new URL(request.url).searchParams.get("path") ?? "/";
  try {
    const page = await readPublicPage(route);
    return new Response(page.markdown, { headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "private, no-store", "CDN-Cache-Control": "no-store", Vary: "Accept", "Content-Location": page.url, "Link": `<${page.url}>; rel="canonical"`, "X-Content-Type-Options": "nosniff" } });
  } catch { return new Response("Public page not found.", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } }); }
}
