export const reviewsPath = "/reviews";
export const reviewDirectoryPath = "/reviews#review-platforms";
export const googleBusinessProfileUrl = "https://www.google.com/maps/search/?api=1&query=Orbilect%20SEO&query_place_id=ChIJQTaQVpRZwokRhRWr4hTB_po";

export const reviewPlatforms = [
  { id: "google", label: "Google Business Profile", mark: "google-profile.png", domains: ["google.com", "g.page", "maps.app.goo.gl", "share.google"] },
  { id: "bing", label: "Bing Business Account", mark: "bing.png", domains: ["bing.com", "bingplaces.com"] },
  { id: "yelp", label: "Yelp", mark: "yelp.svg", domains: ["yelp.com"] },
  { id: "trustpilot", label: "Trustpilot", mark: "trustpilot.svg", domains: ["trustpilot.com"] },
  { id: "designrush", label: "DesignRush", mark: "designrush.png", domains: ["designrush.com"] },
  { id: "techbehemoths", label: "TechBehemoths", mark: "techbehemoths.png", domains: ["techbehemoths.com"] },
  { id: "clutch", label: "Clutch", mark: "clutch.png", domains: ["clutch.co"] },
  { id: "goodfirms", label: "GoodFirms", mark: "goodfirms.png", domains: ["goodfirms.co"] },
  { id: "reviewsio", label: "REVIEWS.io", mark: "reviewsio.png", domains: ["reviews.io"] },
  { id: "trustradius", label: "TrustRadius", mark: "trustradius.png", domains: ["trustradius.com"] },
  { id: "bbb", label: "BBB", mark: "bbb.png", domains: ["bbb.org"] },
  { id: "softwareworld", label: "SoftwareWorld", mark: "softwareworld.png", domains: ["softwareworld.co"] },
] as const;
