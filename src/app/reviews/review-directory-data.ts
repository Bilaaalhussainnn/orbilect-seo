// Public profile snapshots checked on 24 November 2026. Never combine providers' ratings.
export type DirectoryEntry = {
  id: string; label: string; mark: string; href: string;
  rating?: { value: number; count: number; checkedAt: string };
  noReviews?: boolean; directory?: boolean; badgeYear?: boolean;
};
export const directoryEntries: readonly DirectoryEntry[] = [
  { id: "trustpilot", label: "Trustpilot", mark: "trustpilot.svg", href: "https://www.trustpilot.com/review/orbilectseo.com", noReviews: true },
  { id: "designrush", label: "DesignRush", mark: "designrush.png", href: "https://www.designrush.com/agency/profile/orbilect-seo#reviews" },
  { id: "techbehemoths", label: "TechBehemoths", mark: "techbehemoths.png", href: "https://techbehemoths.com/company/orbilect-seo", rating: { value: 5, count: 1, checkedAt: "2026-11-24" } },
  { id: "clutch", label: "Clutch", mark: "clutch.png", href: "https://clutch.co/profile/orbilect-seo", noReviews: true },
  { id: "goodfirms", label: "GoodFirms", mark: "goodfirms.png", href: "https://www.goodfirms.co/company/orbilect-seo", noReviews: true },
  // Retain the existing platform where an Orbilect SEO profile has not been supplied.
  { id: "trustradius", label: "TrustRadius", mark: "trustradius.png", href: "https://www.trustradius.com/", directory: true },
  { id: "rightfirms", label: "RightFirms", mark: "rightfirms-reviews.webp", href: "https://www.rightfirms.co/company/orbilect-seo", badgeYear: true },
  { id: "techreviewer", label: "Techreviewer", mark: "techreviewer.svg", href: "https://techreviewer.co/companies/orbilect-seo", noReviews: true },
  { id: "topdevelopers", label: "TopDevelopers.co", mark: "topdevelopers.svg", href: "https://www.topdevelopers.co/directory/web-development-companies", directory: true },
  { id: "truefirms", label: "TrueFirms", mark: "truefirms.png", href: "https://www.truefirms.co/company/Orbilect-SEO/4364", noReviews: true },
  { id: "smartcustomer", label: "SmartCustomer", mark: "smartcustomer.svg", href: "https://www.smartcustomer.com/reviews/orbilectseo.com", noReviews: true },
  { id: "findbestfirms", label: "FindBestFirms", mark: "findbestfirms.png", href: "https://findbestfirms.com/company/orbilect-seo/", noReviews: true },
  { id: "selectedfirms", label: "SelectedFirms", mark: "selectedfirms-seo.webp", href: "https://selectedfirms.co/agency/orbilect-seo", noReviews: true },
  { id: "agencyspotter", label: "Agency Spotter", mark: "agencyspotter.svg", href: "https://www.agencyspotter.com/orbilect-seo", noReviews: true },
  { id: "trusteditfirms", label: "Trusted IT Firms", mark: "trusteditfirms.webp", href: "https://trusteditfirms.com/company/orbilect-seo/", noReviews: true },
  { id: "agencylisted", label: "AgencyListed", mark: "agencylisted.svg", href: "https://agencylisted.com/agencies/orbilect-seo" },
  { id: "semfirms", label: "SEMfirms", mark: "semfirms.png", href: "https://www.semfirms.com/profile/orbilect-seo", noReviews: true },
];
