import { pageSeo } from "@/lib/orbilect-search";
import type { Metadata } from "next";
import { StoryPage } from "../newsroom-stories";
import { stories } from "../stories";

const story = stories[0];

const seoBaseMetadata: Metadata = { title: story.title, description: story.summary };

export default function Page() { return <StoryPage story={story} />; }


// Orbilect search metadata
export const metadata = pageSeo("/newsroom/orbilect-reviews", seoBaseMetadata as import("next").Metadata);
