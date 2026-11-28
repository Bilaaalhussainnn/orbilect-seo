import { NextResponse, type NextRequest } from "next/server";
import { legacyImageTarget } from "./lib/legacy-image";
import { prefersMarkdown } from "./lib/agents/accept";
import { getPublishedPosts } from "./app/blogs/blog-data";

const publishedBlogs = new Set(getPublishedPosts().map(post => "/blogs/" + post.slug));
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/_next/image") {
    const target = legacyImageTarget(request.nextUrl.searchParams.get("url"));
    if (!target) return new NextResponse("Unknown image", { status: 404 });
    const response = NextResponse.redirect(new URL(target, request.url), 307);
    response.headers.set("Cache-Control", "public, max-age=3600");
    return response;
  }
  const pathname = request.nextUrl.pathname;
  const markdown = pathname !== "/agent-content" && ["GET", "HEAD"].includes(request.method) &&
    !request.headers.has("rsc") && !request.headers.has("next-router-prefetch") &&
    prefersMarkdown(request.headers.get("accept") ?? "");
  let response: NextResponse;
  if (markdown) {
    const url = new URL("/agent-content",request.url);
    url.searchParams.set("path",pathname);
    response = NextResponse.rewrite(url);
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("CDN-Cache-Control", "no-store");
  } else if (/^\/blogs\/[^/.]+$/.test(pathname) && !publishedBlogs.has(pathname)) {
    response = NextResponse.rewrite(new URL("/_not-found",request.url), { status: 404 });
  } else response = NextResponse.next();
  response.headers.append("Vary", "Accept");
  return response;
}

export const config = {
  matcher: ["/_next/image", "/((?!api|admin|internal|_next|agent-markdown|mcp|\\.well-known|.*\\.[^/]+$).*)"],
};
