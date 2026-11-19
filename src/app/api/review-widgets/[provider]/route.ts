// Separate documents preserve each vendor's DOMContentLoaded lifecycle and keep
// third-party widget CSS out of the Orbilect page. Only fixed, known snippets run.
const snippets = {
  designrush: `<script src="https://www.designrush.com/topbest/js/widgets/agency-reviews.js" defer></script>
    <div data-designrush-widget data-agency-id="134835" data-style="light" aria-label="DesignRush agency reviews section"></div>
    <noscript><a href="https://www.designrush.com/agency/profile/orbilect-seo#reviews" target="_blank" rel="noopener noreferrer">REVIEW US ON DESIGNRUSH</a></noscript>`,
  trustpilot: `<script src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async></script>
    <div class="trustpilot-widget" data-locale="en-US" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="6afca9d43fa55677fa4ee43a" data-style-height="52px" data-style-width="100%">
      <a href="https://www.trustpilot.com/review/orbilectseo.com" target="_blank" rel="noopener noreferrer">Trustpilot</a>
    </div>`,
  clutch: `<script src="https://widget.clutch.co/static/js/widget.js" defer></script>
    <div class="clutch-widget" data-url="https://widget.clutch.co" data-widget-type="14" data-height="50" data-nofollow="false" data-expandifr="true" data-scale="100" data-clutchcompany-id="2773709"></div>`,
  truefirms: `<script src="https://truefirms.co/public/truebadges/js/widget.js" defer></script>
    <div class="truefirm-widget" data-widget-type="w14" data-height="180" data-width="100" data-company-id="4364"></div>
    <p class="fallback">If this badge is unavailable, please check back later.</p>`,
  smartcustomer: `<link rel="dns-prefetch" href="https://widgets.smartcustomer.com">
    <link rel="dns-prefetch" href="https://widgetsapi.smartcustomer.com">
    <link rel="preconnect" href="https://widgets.smartcustomer.com" crossorigin="anonymous">
    <link rel="preconnect" href="https://widgetsapi.smartcustomer.com" crossorigin="anonymous">
    <link rel="preload" as="script" href="https://widgets.smartcustomer.com/js/v2/widgets.js?id=6afe1782ac3ff">
    <div class="stjr-badge"></div>
    <script src="https://widgets.smartcustomer.com/js/v2/widgets.js?id=6afe1782ac3ff" defer></script>`,
} as const;

export async function GET(_request: Request, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  if (!Object.prototype.hasOwnProperty.call(snippets, provider)) return new Response("Not found", { status: 404 });
  const snippet = snippets[provider as keyof typeof snippets];
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Orbilect SEO reviews</title><style>
    *{box-sizing:border-box}html,body{margin:0;min-width:0;background:#fff;color:#445267;font-family:Arial,sans-serif}body{padding:12px;min-height:200px;display:grid;align-content:center;gap:10px}body>div{max-width:100%;min-width:0}img,iframe{max-width:100%}iframe{border:0}a{color:#004aad}.fallback{font-size:12px;line-height:1.5;text-align:center}
    </style></head><body>${snippet}</body></html>`, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "frame-ancestors 'self'; object-src 'none'; base-uri 'none'",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
