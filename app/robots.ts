import type { MetadataRoute } from "next";
import { noIndexPaths, site } from "@/content/site";
import { canonicalPath } from "@/lib/seo";

/**
 * robots.txt.
 *
 * Like `sitemap.ts` this is a metadata route — a GET-only Route Handler that
 * Next.js runs once during `next build` and writes to `out/robots.txt` under
 * `output: "export"`.
 *
 * Note what `Disallow` does and does not do: it stops crawling, not indexing. A
 * disallowed URL with inbound links can still appear in results as a bare URL.
 * The real signal is the `noindex` meta tag, which `buildMetadata()` emits for
 * every path in `noIndexPaths`; these rules just save crawl budget on top.
 *
 * `dynamic` is not optional here. Next 16.3 fails the build with
 * "export const dynamic = \"force-static\" not configured on route /robots.txt
 * with output: export" unless it is present — metadata routes compile to Route
 * Handlers, and a handler has to opt in to being prerendered. Do not remove it.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          ...noIndexPaths.map(canonicalPath),
          // Next.js build artefacts. Nothing here is a page.
          "/_next/",
        ],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
