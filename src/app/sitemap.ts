import type { MetadataRoute } from "next";
import { IDENTITY } from "@/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: IDENTITY.siteUrl,
      lastModified: new Date("2026-11-22"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
