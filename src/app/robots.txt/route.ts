export function GET() {
  return new Response(`User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /
Disallow: /api
Disallow: /admin
Disallow: /internal

Sitemap: https://orbilectseo.com/sitemap.xml
`, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
