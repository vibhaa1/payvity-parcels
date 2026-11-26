import type { MetadataRoute } from "next";
import { absoluteLocalizedUrl } from "@/lib/seo";

export const dynamic = "force-static";

const ROUTE_PATHS = [
  "/",
  "/amazon-locker/",
  "/impressum/",
  "/datenschutz/",
  "/agb/",
] as const;
const LAST_MODIFIED = new Date("2026-11-24");

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const routePath of ROUTE_PATHS) {
    const deUrl = absoluteLocalizedUrl("de", routePath);
    const enUrl = absoluteLocalizedUrl("en", routePath);

    entries.push(
      {
        url: deUrl,
        lastModified: LAST_MODIFIED,
        alternates: {
          languages: {
            "de-DE": deUrl,
            en: enUrl,
          },
        },
      },
      {
        url: enUrl,
        lastModified: LAST_MODIFIED,
        alternates: {
          languages: {
            "de-DE": deUrl,
            en: enUrl,
          },
        },
      }
    );
  }

  return entries;
}
