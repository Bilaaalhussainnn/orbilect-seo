import Script from "next/script";

/** Set only to the certificate ID issued for Orbilect SEO by its DMCA.com account. */
export default function DmcaBadge() {
  const id = process.env.DMCA_BADGE_ID;
  if (!id || !/^[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}$/i.test(id)) return null;
  return <div>
    <a href={`https://www.dmca.com/Protection/Status.aspx?ID=${id}`} title="DMCA.com Protection Status" className="dmca-badge" target="_blank" rel="noopener noreferrer">
      {/* The official badge is delivered directly by DMCA.com, without a Node image proxy. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=${id}`} alt="DMCA.com Protection Status" width="120" height="24" loading="lazy" decoding="async" />
    </a>
    <Script id="dmca-badge-helper" src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js" strategy="lazyOnload" />
  </div>;
}
