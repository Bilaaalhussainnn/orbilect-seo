import { NextResponse, type NextRequest } from "next/server";
import { legacyImageTarget } from "./lib/legacy-image";
import { getPublishedPosts } from "./app/blogs/blog-data";

const published = new Set(getPublishedPosts().map(post => post.slug));

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/_next/image") {
    const target = legacyImageTarget(request.nextUrl.searchParams.get("url"));
    if (!target) return new NextResponse("Unknown image", { status: 404 });
    const response = NextResponse.redirect(new URL(target, request.url), 307);
    response.headers.set("Cache-Control", "public, max-age=3600");
    return response;
  }
  const slug = request.nextUrl.pathname.split("/").filter(Boolean).at(-1);
  if (!slug || published.has(slug)) return NextResponse.next();

  // Return Next's not-found page before the blog layout starts streaming.
  return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
}

export const config = {
  matcher: ["/blogs/:slug([^/.]+)", "/_next/image"],
};
