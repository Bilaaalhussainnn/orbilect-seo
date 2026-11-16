const profiles = [
  { name: "LinkedIn", url: "https://www.linkedin.com/company/orbilect-seo", path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm-9 7H7v8h3Zm-1.5-4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM18 13c0-2-1-3-2.6-3-1 0-1.7.4-2.1 1v-1H11v8h2.7v-4.2c0-1 .5-1.5 1.2-1.5s1 .6 1 1.5V18H18Z" },
  { name: "YouTube", url: "https://www.youtube.com/@OrbilectSEO", path: "M21.6 6.3A2.8 2.8 0 0 0 19.7 4.4C18 4 12 4 12 4s-6 0-7.7.4a2.8 2.8 0 0 0-1.9 1.9C2 8 2 12 2 12s0 4 .4 5.7a2.8 2.8 0 0 0 1.9 1.9C6 20 12 20 12 20s6 0 7.7-.4a2.8 2.8 0 0 0 1.9-1.9c.4-1.7.4-5.7.4-5.7s0-4-.4-5.7ZM10 15.5v-7l6 3.5-6 3.5Z" },
  { name: "Facebook", url: "https://www.facebook.com/orbilectseo/", path: "M14 22v-9h3l.45-3.5H14V7.25c0-1 .28-1.75 1.74-1.75h1.86V2.36A25 25 0 0 0 14.9 2C12.22 2 10.4 3.64 10.4 6.65V9.5h-3V13h3v9z" },
  { name: "Instagram", url: "https://www.instagram.com/orbilectseo/", path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" },
  { name: "X", url: "https://x.com/orbilectseo", path: "M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.5 5.4 22H2.3l7.3-8.4L1.8 2h6.5l4.5 6.9L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" },
] as const;

const headerProfiles = new Set(["LinkedIn", "Facebook", "X"]);

export function SocialLinks({ className, header = false }: { className: string; header?: boolean }) {
  return (
    <ul className={className} aria-label="Orbilect SEO social profiles">
      {profiles.filter(({ name }) => !header || headerProfiles.has(name)).map(({ name, url, path }) => (
        <li key={name}>
          <a href={url} aria-label={name} title={name}>
            <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d={path} fill="currentColor" fillRule="evenodd" />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
