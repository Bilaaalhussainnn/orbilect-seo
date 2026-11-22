import { withBreadcrumbs } from "@/lib/orbilect-search";
export default function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify(withBreadcrumbs(data)).replace(/</g, "\\u003c"),
  }} />;
}
