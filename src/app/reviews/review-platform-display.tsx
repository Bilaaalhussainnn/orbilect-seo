"use client";

import Image from "next/image";
import Link from "next/link";
import { reviewDirectoryPath, reviewPlatforms, reviewsPath } from "@/lib/review-platforms";
import styles from "./review-platforms.module.css";

export function PlatformMark({ platform, size = 16 }: { platform: (typeof reviewPlatforms)[number]; size?: number }) {
  return <Image src={"/review-platforms/" + platform.mark} alt="" width={size} height={size} unoptimized />;
}

export function ReviewPlatformDisplay({ size = "compact", exclude = [] }: { size?: "compact" | "large"; exclude?: readonly string[] }) {
  const large = size === "large";

  return (
    <div className={styles.carousel} data-size={size} aria-label="Review platforms carousel" role="region">
      <div className={styles.viewport}>
        <div className={styles.track}>
          {[false, true].map(duplicate => (
            <ul key={String(duplicate)} className={styles.platforms} aria-label="Review platforms" role="list" aria-hidden={duplicate || undefined}>
              {reviewPlatforms.filter(platform => !exclude.includes(platform.id)).map(platform => (
                <li key={platform.id}>
                  <Link href={reviewsPath + "#review-" + platform.id} className={styles.tile} prefetch={false}
                    tabIndex={duplicate ? -1 : undefined}
                    aria-label={platform.id === "google" ? "Google Business Account" : undefined}>
                    <PlatformMark platform={platform} size={large ? 32 : 16} />
                    <span>{platform.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export { reviewDirectoryPath };
