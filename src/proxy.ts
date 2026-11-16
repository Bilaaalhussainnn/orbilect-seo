import { NextResponse, type NextRequest } from "next/server";
import { getPublishedPosts } from "./app/blogs/blog-data";

const published = new Set(getPublishedPosts().map(post => post.slug));

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/").filter(Boolean).at(-1);
  if (!slug || published.has(slug)) return NextResponse.next();

  // Return Next's not-found page before the blog layout starts streaming.
  return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
}

export const config = {
  matcher: "/blogs/:slug([^/.]+)",
};
