export type Tool = { name: string; logo: string; fallback: string; use: string; result: string };

export const groups = [
  {
    "name": "SEO research",
    "icon": "Search",
    "tools": [
      {
        "name": "Semrush",
        "logo": "/technology-stack/semrush.png",
        "fallback": "https://www.google.com/s2/favicons?domain=semrush.com&sz=64",
        "use": "Compare keyword demand and competing pages.",
        "result": "A keyword shortlist mapped to priority pages."
      },
      {
        "name": "Ahrefs",
        "logo": "/technology-stack/ahrefs.png",
        "fallback": "https://www.google.com/s2/favicons?domain=ahrefs.com&sz=64",
        "use": "Review competitors, backlinks, and content gaps.",
        "result": "A list of pages and links worth pursuing."
      },
      {
        "name": "Google Search Console",
        "logo": "/technology-stack/search-console.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=search.google.com&sz=64",
        "use": "Review search queries, clicks, and indexing.",
        "result": "A baseline for priority pages and a list of indexing issues."
      },
      {
        "name": "Google Trends",
        "logo": "https://api.iconify.design/simple-icons/googletrends.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=trends.google.com&sz=64",
        "use": "Compare how interest changes across markets and seasons.",
        "result": "A publishing calendar aligned with demand."
      },
      {
        "name": "Screaming Frog",
        "logo": "https://www.google.com/s2/favicons?domain=screamingfrog.co.uk&sz=64",
        "fallback": "https://www.google.com/s2/favicons?domain=screamingfrog.co.uk&sz=64",
        "use": "Crawl URLs to find broken links and duplicate metadata.",
        "result": "A prioritized list of site fixes."
      },
      {
        "name": "PageSpeed Insights",
        "logo": "https://api.iconify.design/simple-icons/pagespeedinsights.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=pagespeed.web.dev&sz=64",
        "use": "Review page experience and performance diagnostics.",
        "result": "A shortlist of fixes for slow templates."
      }
    ]
  },
  {
    "name": "Blog production",
    "icon": "FileText",
    "tools": [
      {
        "name": "Google Docs",
        "logo": "/technology-stack/google-docs.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=docs.google.com&sz=64",
        "use": "Draft articles with comments and tracked suggestions.",
        "result": "A reviewable draft with a clear approval trail."
      },
      {
        "name": "Grammarly",
        "logo": "/technology-stack/grammarly.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=grammarly.com&sz=64",
        "use": "Review grammar, clarity, and consistency during editing.",
        "result": "Clean copy ready for a final human review."
      },
      {
        "name": "Notion",
        "logo": "/technology-stack/notion.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=notion.so&sz=64",
        "use": "Organize briefs, sources, and article assignments.",
        "result": "An editorial calendar with owners and deadlines."
      },
      {
        "name": "WordPress",
        "logo": "/technology-stack/wordpress.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=wordpress.org&sz=64",
        "use": "Build and preview articles in the publishing workflow.",
        "result": "Formatted articles with metadata and internal links."
      },
      {
        "name": "Hemingway Editor",
        "logo": "https://www.google.com/s2/favicons?domain=hemingwayapp.com&sz=64",
        "fallback": "https://www.google.com/s2/favicons?domain=hemingwayapp.com&sz=64",
        "use": "Find dense sentences and awkward phrasing.",
        "result": "A readability pass on customer-facing copy."
      },
      {
        "name": "Surfer",
        "logo": "https://www.google.com/s2/favicons?domain=surferseo.com&sz=64",
        "fallback": "https://www.google.com/s2/favicons?domain=surferseo.com&sz=64",
        "use": "Compare topic coverage with competing search results.",
        "result": "A brief with relevant questions and subtopics."
      }
    ]
  },
  {
    "name": "Web development",
    "icon": "Code2",
    "tools": [
      {
        "name": "HTML5",
        "logo": "/technology-stack/html5.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=developer.mozilla.org&sz=64",
        "use": "Structure pages with semantic, accessible markup.",
        "result": "Clean templates with meaningful headings and landmarks."
      },
      {
        "name": "Next.js",
        "logo": "/technology-stack/nextjs.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=nextjs.org&sz=64",
        "use": "Build sites with route-level metadata and flexible rendering.",
        "result": "A maintainable site with search-ready page templates."
      },
      {
        "name": "React",
        "logo": "/technology-stack/react.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=react.dev&sz=64",
        "use": "Create reusable interfaces and interactive components.",
        "result": "Components your team can extend across pages."
      },
      {
        "name": "TypeScript",
        "logo": "https://api.iconify.design/logos/typescript-icon.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=typescriptlang.org&sz=64",
        "use": "Catch mismatched data and component props before release.",
        "result": "A typed codebase that is easier to maintain."
      },
      {
        "name": "GitHub",
        "logo": "https://api.iconify.design/logos/github-icon.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=github.com&sz=64",
        "use": "Track changes and review releases before merging.",
        "result": "A versioned project with a clear change history."
      },
      {
        "name": "Cloudflare",
        "logo": "https://api.iconify.design/logos/cloudflare-icon.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=cloudflare.com&sz=64",
        "use": "Set up caching and delivery for public pages.",
        "result": "Delivery settings documented for your team."
      }
    ]
  },
  {
    "name": "Visual builders",
    "icon": "LayoutTemplate",
    "tools": [
      {
        "name": "Wix",
        "logo": "/technology-stack/wix.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=wix.com&sz=64",
        "use": "Set up editable pages, forms, and site navigation.",
        "result": "A site your team can update in the visual editor."
      },
      {
        "name": "Squarespace",
        "logo": "/technology-stack/squarespace.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=squarespace.com&sz=64",
        "use": "Build service pages and connect enquiries or bookings.",
        "result": "A responsive site with a clear route to contact."
      },
      {
        "name": "Webflow",
        "logo": "/technology-stack/webflow.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=webflow.com&sz=64",
        "use": "Build responsive layouts and structured CMS collections.",
        "result": "Reusable layouts and editable content collections."
      },
      {
        "name": "Framer",
        "logo": "/technology-stack/framer.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=framer.com&sz=64",
        "use": "Build and publish responsive marketing pages.",
        "result": "A visually editable site with reusable sections."
      },
      {
        "name": "Elementor",
        "logo": "/technology-stack/elementor.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=elementor.com&sz=64",
        "use": "Create WordPress layouts using reusable visual templates.",
        "result": "Templates editors can update without code changes."
      },
      {
        "name": "Weebly",
        "logo": "https://api.iconify.design/simple-icons/weebly.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=weebly.com&sz=64",
        "use": "Improve the layout and navigation of an existing site.",
        "result": "Updated pages with clearer paths to enquiry."
      }
    ]
  },
  {
    "name": "Design and creative",
    "icon": "PenTool",
    "tools": [
      {
        "name": "Figma",
        "logo": "/technology-stack/figma.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=figma.com&sz=64",
        "use": "Prototype page layouts and map key interactions.",
        "result": "An interactive prototype and reusable design components."
      },
      {
        "name": "Canva",
        "logo": "/technology-stack/canva.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=canva.com&sz=64",
        "use": "Build templates for repeatable campaign and social assets.",
        "result": "Editable artwork your team can reuse."
      },
      {
        "name": "Adobe Photoshop",
        "logo": "/technology-stack/photoshop.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=adobe.com&sz=64",
        "use": "Retouch and prepare campaign and website imagery.",
        "result": "Exported images sized for the channels you use."
      },
      {
        "name": "Adobe Illustrator",
        "logo": "https://api.iconify.design/logos/adobe-illustrator.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=adobe.com&sz=64",
        "use": "Build scalable brand assets and custom icons.",
        "result": "Vector artwork ready for web and print."
      },
      {
        "name": "Adobe After Effects",
        "logo": "https://api.iconify.design/logos/adobe-after-effects.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=adobe.com&sz=64",
        "use": "Create short motion assets for campaigns and pages.",
        "result": "Motion exports sized for their placements."
      },
      {
        "name": "Adobe Premiere Pro",
        "logo": "https://api.iconify.design/logos/adobe-premiere.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=adobe.com&sz=64",
        "use": "Edit and format video for campaign placements.",
        "result": "Video cuts and aspect ratios ready for publishing."
      }
    ]
  },
  {
    "name": "Paid media",
    "icon": "Megaphone",
    "tools": [
      {
        "name": "Google Ads",
        "logo": "https://api.iconify.design/logos/google-ads.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=ads.google.com&sz=64",
        "use": "Build search and shopping campaigns around defined goals.",
        "result": "Campaigns with budgets, assets, and conversion goals."
      },
      {
        "name": "Microsoft Advertising",
        "logo": "https://api.iconify.design/logos/microsoft-icon.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=ads.microsoft.com&sz=64",
        "use": "Adapt campaigns to the Microsoft search network.",
        "result": "A campaign structure and search-term review plan."
      },
      {
        "name": "Meta Ads Manager",
        "logo": "https://api.iconify.design/logos/meta-icon.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=facebook.com&sz=64",
        "use": "Plan and test Facebook and Instagram ad creative.",
        "result": "A campaign with a creative and audience testing plan."
      },
      {
        "name": "LinkedIn Campaign Manager",
        "logo": "https://api.iconify.design/logos/linkedin-icon.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=linkedin.com&sz=64",
        "use": "Build campaigns around relevant professional audiences.",
        "result": "A B2B audience and lead-generation test."
      },
      {
        "name": "TikTok Ads Manager",
        "logo": "https://api.iconify.design/logos/tiktok-icon.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=ads.tiktok.com&sz=64",
        "use": "Test short-form creative across audience segments.",
        "result": "A campaign setup and creative testing schedule."
      },
      {
        "name": "Pinterest Ads",
        "logo": "https://api.iconify.design/logos/pinterest.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=ads.pinterest.com&sz=64",
        "use": "Promote products and offers through visual discovery.",
        "result": "Campaign assets and a plan for tracking conversions."
      }
    ]
  },
  {
    "name": "Ecommerce platforms",
    "icon": "ShoppingCart",
    "tools": [
      {
        "name": "Shopify",
        "logo": "/platform-logos/shopify.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=shopify.com&sz=64",
        "use": "Improve collection templates and product navigation.",
        "result": "Store templates and metadata aligned with search intent."
      },
      {
        "name": "WooCommerce",
        "logo": "/platform-logos/woocommerce.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=woocommerce.com&sz=64",
        "use": "Review product URLs, attributes, and category structure.",
        "result": "A catalog with clearer category paths and product details."
      },
      {
        "name": "Adobe Commerce / Magento",
        "logo": "/platform-logos/magento.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=business.adobe.com&sz=64",
        "use": "Review layered navigation, canonical URLs, and product data.",
        "result": "An SEO plan for product and category templates."
      },
      {
        "name": "BigCommerce",
        "logo": "https://api.iconify.design/simple-icons/bigcommerce.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=bigcommerce.com&sz=64",
        "use": "Review storefront navigation, page metadata, and templates.",
        "result": "A prioritized list of catalog and storefront improvements."
      },
      {
        "name": "Wix Studio",
        "logo": "/technology-stack/wix.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=wix.com&sz=64",
        "use": "Design responsive storefronts and refine collection pages.",
        "result": "Product and collection layouts built for easier browsing."
      },
      {
        "name": "Google Merchant Center",
        "logo": "https://api.iconify.design/simple-icons/googlemerchantcenter.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=merchants.google.com&sz=64",
        "use": "Check product feed data and resolve listing issues.",
        "result": "A cleaner feed and a plan for ongoing feed checks."
      }
    ]
  },
  {
    "name": "Analytics and tracking",
    "icon": "BarChart3",
    "tools": [
      {
        "name": "Google Analytics 4",
        "logo": "https://api.iconify.design/logos/google-analytics.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=analytics.google.com&sz=64",
        "use": "Measure traffic, enquiries, purchases, and other key events.",
        "result": "A measurement plan with conversion definitions."
      },
      {
        "name": "Google Tag Manager",
        "logo": "https://api.iconify.design/logos/google-tag-manager.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=tagmanager.google.com&sz=64",
        "use": "Configure and test tags and event triggers.",
        "result": "Documented tags and tested triggers."
      },
      {
        "name": "Looker Studio",
        "logo": "https://api.iconify.design/simple-icons/looker.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=lookerstudio.google.com&sz=64",
        "use": "Connect reporting sources and visualize campaign results.",
        "result": "A dashboard focused on agreed business metrics."
      },
      {
        "name": "Microsoft Clarity",
        "logo": "https://api.iconify.design/logos/microsoft-icon.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=clarity.microsoft.com&sz=64",
        "use": "Review heatmaps and recordings where consent permits.",
        "result": "A shortlist of navigation and form friction points."
      },
      {
        "name": "Hotjar",
        "logo": "https://api.iconify.design/simple-icons/hotjar.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=hotjar.com&sz=64",
        "use": "Gather feedback and review how visitors use key pages.",
        "result": "Evidence for usability improvements to test."
      },
      {
        "name": "Matomo",
        "logo": "https://api.iconify.design/simple-icons/matomo.svg",
        "fallback": "https://www.google.com/s2/favicons?domain=matomo.org&sz=64",
        "use": "Configure analytics and track agreed events.",
        "result": "A measurement setup tailored to your reporting needs."
      }
    ]
  }
] as const;
