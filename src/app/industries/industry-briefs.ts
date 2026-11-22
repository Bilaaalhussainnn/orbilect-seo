type IndustryBrief = {
  name: string;
  businesses: string;
  headline: [string, string];
  offers: [string, string, string];
  searches: [string, string, string];
  audience: string;
  action: string;
  proof: string;
  local: string;
  friction: string;
};

export const briefs = {
  "arts-entertainment": {
    name: "Arts & Entertainment", businesses: "venues, event organisers, artists, and creative businesses",
    headline: ["Be discovered before", "the curtain rises"],
    offers: ["Event programmes", "Venue information", "Performer profiles"],
    searches: ["live music events this weekend", "theatre venues near me", "book a live performer"],
    audience: "audiences, organisers, and creative buyers", action: "book tickets or send an enquiry",
    proof: "accurate schedules, venue details, accessibility information, and booking options",
    local: "venues and event locations", friction: "dates, availability, entry requirements, and accessibility",
  },
  "food-beverages": {
    name: "Food & Beverages", businesses: "restaurants, cafés, food brands, and beverage businesses",
    headline: ["Get found before", "the next order"],
    offers: ["Menus and products", "Location information", "Ordering and reservations"],
    searches: ["restaurants with vegetarian options near me", "café opening hours", "reserve a restaurant table"],
    audience: "diners, shoppers, and wholesale buyers", action: "order, reserve, or contact your team",
    proof: "current menus, dietary information, opening hours, and fulfilment options",
    local: "restaurant, café, and service locations", friction: "menu availability, dietary requirements, delivery coverage, and booking options",
  },

  finance: {
    name: "Finance", businesses: "accounting and financial services firms",
    headline: ["Get found before", "the first consultation"],
    offers: ["Bookkeeping", "Tax preparation", "Financial advisory"],
    searches: ["outsourced bookkeeping for restaurants", "small business tax preparation near me", "fractional CFO for growing businesses"],
    audience: "owners and finance teams", action: "request a consultation",
    proof: "team credentials, engagement scope, and examples of industries served",
    local: "office locations and service areas",
    friction: "what records to prepare and how the first consultation works",
  },
  ecommerce: {
    name: "Ecommerce", businesses: "online retailers and product brands",
    headline: ["Get discovered", "before checkout"],
    offers: ["Product categories", "Product comparisons", "Buying guides"],
    searches: ["waterproof hiking boots for women", "carry-on luggage with laptop sleeve", "how to choose a standing desk"],
    audience: "online shoppers", action: "choose a product and check out",
    proof: "product specifications, fit details, stock, delivery, and returns",
    local: "store pages and pickup locations where available",
    friction: "which product fits their needs and when it can arrive",
  },
  education: {
    name: "Education", businesses: "schools, training providers, and course creators",
    headline: ["Be the course", "students find first"],
    offers: ["Career training", "Online courses", "Admissions"],
    searches: ["part-time accounting courses", "online project management certificate", "evening trade school admissions"],
    audience: "prospective learners and families", action: "request course information or apply",
    proof: "curriculum, schedule, prerequisites, and instructor information",
    local: "campuses and enrollment offices",
    friction: "entry requirements, start dates, and how to apply",
  },
  healthcare: {
    name: "Healthcare", businesses: "clinics and healthcare practices",
    headline: ["Help patients find", "the right practice"],
    offers: ["Clinic locations", "Physical therapy", "New patient visits"],
    searches: ["physical therapy clinic near me", "sports rehabilitation clinic", "how to book a new patient appointment"],
    audience: "prospective patients and caregivers", action: "find the right location and request an appointment",
    proof: "provider credentials, services offered, accessibility, and appointment information",
    local: "clinic locations, hours, and appointment links",
    friction: "what to bring and how to contact the practice",
  },
  "home-services": {
    name: "Home Services", businesses: "local trades and home service companies",
    headline: ["Be the call", "homeowners make"],
    offers: ["Plumbing", "HVAC", "Electrical services"],
    searches: ["water heater repair near me", "air conditioning repair service", "electrician for panel upgrade"],
    audience: "homeowners and property managers", action: "call or request a service visit",
    proof: "service coverage, job examples, credentials, and availability",
    local: "cities and neighborhoods your crews actually serve",
    friction: "whether you serve their address and how soon you can visit",
  },
  hospitality: {
    name: "Hospitality", businesses: "hotels, venues, and hospitality operators",
    headline: ["Get found where", "guests plan to stay"],
    offers: ["Hotel stays", "Event venues", "Group bookings"],
    searches: ["family hotel near the convention center", "small wedding venue with parking", "hotel group rates near downtown"],
    audience: "travelers and event planners", action: "book direct or send an event enquiry",
    proof: "room types, capacity, amenities, photos, and booking terms",
    local: "properties, venues, and nearby landmarks",
    friction: "availability, parking, and what is included",
  },
  logistics: {
    name: "Logistics", businesses: "freight, warehousing, and fulfillment providers",
    headline: ["Get found before", "the freight quote"],
    offers: ["Regional freight", "Warehousing", "Order fulfillment"],
    searches: ["regional freight delivery services", "third party warehouse near Dallas", "fulfillment provider for Shopify stores"],
    audience: "shippers and operations teams", action: "request a freight or fulfillment quote",
    proof: "lanes, warehouse capabilities, shipment limits, and integration options",
    local: "terminals, warehouse locations, and service lanes",
    friction: "coverage, shipment requirements, and quote turnaround",
  },
  manufacturing: {
    name: "Manufacturing", businesses: "manufacturers and industrial suppliers",
    headline: ["Get shortlisted", "before the RFQ"],
    offers: ["Precision machining", "Fabrication", "Production runs"],
    searches: ["custom aluminum parts manufacturer", "small batch sheet metal fabrication", "precision CNC machining supplier"],
    audience: "engineers and procurement teams", action: "submit a qualified RFQ",
    proof: "materials, tolerances, certifications, and production capabilities",
    local: "facilities and markets you can supply",
    friction: "minimum quantities, drawings, and production lead times",
  },
  "professional-services": {
    name: "Professional Services", businesses: "consultancies and specialist firms",
    headline: ["Be the firm", "clients shortlist"],
    offers: ["Consulting", "Architecture", "Specialist advisory"],
    searches: ["operations consultant for small business", "commercial architects near me", "business process improvement consultant"],
    audience: "owners and project leads", action: "schedule an introductory call",
    proof: "team experience, relevant projects, deliverables, and engagement scope",
    local: "offices and client markets",
    friction: "whether your team fits the project and how an engagement begins",
  },
  "real-estate": {
    name: "Real Estate", businesses: "brokerages, agents, and property businesses",
    headline: ["Get found before", "the first showing"],
    offers: ["Property listings", "Neighborhood guides", "Seller enquiries"],
    searches: ["two-bedroom apartments for sale", "homes near commuter rail", "real estate agent for selling a townhouse"],
    audience: "buyers, renters, and sellers", action: "request a showing or talk to an agent",
    proof: "current listing details, local knowledge, and clear agent contact information",
    local: "neighborhoods, developments, and brokerage offices",
    friction: "listing availability and how to arrange a viewing",
  },
  saas: {
    name: "SaaS", businesses: "software companies and subscription platforms",
    headline: ["Get discovered", "before the demo"],
    offers: ["Use cases", "Feature comparisons", "Integrations"],
    searches: ["inventory software for small businesses", "inventory software with multi-location tracking", "inventory software Shopify integration"],
    audience: "software buyers and operations teams", action: "start a trial or request a demo",
    proof: "feature details, integration requirements, customer examples, and onboarding information",
    local: "regional landing pages where the product differs by market",
    friction: "whether the software fits their workflow and existing tools",
  },
} satisfies Record<string, IndustryBrief>;

export type IndustrySlug = keyof typeof briefs;
