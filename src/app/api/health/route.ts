export function GET() {
  return Response.json({ status: "ok", release: "reliability-v21" }, {
    headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}
