import Image from "next/image";
import logos from "./seo-engine-logos.json";

const engines = [
  { name: "Google", logo: logos.google },
  { name: "Bing", logo: logos.bing },
  { name: "Yahoo!", logo: "/about/search-engines/yahoo.svg" },
  { name: "Yandex", logo: "/about/search-engines/yandex.svg" },
];

export default function SeoTimelineEngines({
  className,
  size = 24,
}: {
  className: string;
  size?: number;
}) {
  return (
    <ul className={className} aria-label="Search engines">
      {engines.map(({ name, logo }) => (
        <li key={name}>
          <Image src={logo} alt="" width={size} height={size} unoptimized />
          {name}
        </li>
      ))}
    </ul>
  );
}
