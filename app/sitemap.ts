import type { MetadataRoute } from "next";
import { noIndexPaths, routes } from "@/content/site";
import { absoluteUrl, canonicalPath } from "@/lib/seo";

/**
 * XML sitemap.
 *
 * `sitemap.ts` is a metadata route, which Next.js treats as a GET-only Route
 * Handler. Under `output: "export"` handlers are executed once at build time and
 * their response written to disk, so this emits a real `out/sitemap.xml` — no
 * server needed. It is listed from robots.txt and should be submitted to Search
 * Console once the domain cuts over.
 *
 * Routes come from `content/site.ts` so the sitemap cannot drift from the nav.
 * Anything in `noIndexPaths` is filtered out: listing a `noindex` URL in a
 * sitemap is a direct contradiction and Search Console reports it as an error.
 *
 * `dynamic` is not optional here. Next 16.3 fails the build with
 * "export const dynamic = \"force-static\" not configured on route /sitemap.xml
 * with output: export" unless it is present — metadata routes compile to Route
 * Handlers, and a handler has to opt in to being prerendered. Do not remove it.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();
  const excluded = new Set(noIndexPaths.map(canonicalPath));

  return routes
    .filter((route) => !excluded.has(canonicalPath(route.path)))
    .map((route) => ({
      url: absoluteUrl(route.path),
      // No per-page timestamps exist yet, so this is the build date. Once posts
      // and case studies carry real dates, set `lastModified` on the route so
      // the value means something — Google ignores lastmod it cannot trust.
      lastModified: route.lastModified ? new Date(route.lastModified) : buildDate,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));
}
