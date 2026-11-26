import type { MetadataRoute } from "next";
import { IDENTITY } from "@/content";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${IDENTITY.siteUrl}/sitemap.xml`,
  };
}
