import type { Metadata } from "next";
import { noIndexPaths, site } from "@/content/site";

/**
 * Metadata helpers.
 *
 * Every page builds its `metadata` export through `buildMetadata()` so that the
 * four things the live-site audit found missing are structurally impossible to
 * forget: a canonical URL, an og:image, a title inside Google's pixel budget,
 * and a description that does not truncate.
 *
 * Under `output: "export"` all of this resolves at build time and is baked into
 * the emitted HTML, so there is no runtime cost and no server involved.
 */

/**
 * Google renders roughly 580px of title on desktop. 60 characters is the
 * conventional proxy for that. Longer titles are not penalised — they are just
 * truncated, and the truncated half is usually the differentiating half.
 */
export const TITLE_MAX_LENGTH = 60;

/**
 * Descriptions truncate around 155–160 characters. The live homepage ships 202.
 */
export const DESCRIPTION_MAX_LENGTH = 160;

/** Separator used when appending the brand to a page title. */
const BRAND_SEPARATOR = " | ";

/**
 * Strips the invisible characters that survive copy-paste out of Word, Docs and
 * WordPress editors — zero-width space/non-joiner/joiner, BOM, word joiner and
 * non-breaking space — then collapses whitespace.
 *
 * This is not hypothetical: the live `/our-services/` title contains a literal
 * U+200B, which breaks exact-match title checks and looks like a stray gap.
 */
export function sanitizeText(value: string): string {
  return value
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, "")
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Normalises a path to the shape `trailingSlash: true` emits: a leading slash,
 * exactly one trailing slash, no duplicate slashes. Query strings and fragments
 * are dropped — neither belongs in a canonical URL.
 */
export function canonicalPath(path: string): string {
  const withoutQuery = path.split(/[?#]/)[0];
  const trimmed = withoutQuery.replace(/^\/+/, "").replace(/\/+$/, "");
  if (trimmed === "") return "/";
  return `/${trimmed.replace(/\/{2,}/g, "/")}/`;
}

/** Absolute URL for a site-relative path, or an already-absolute URL unchanged. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${site.url}${canonicalPath(path)}`;
}

/**
 * Absolute URL for a static asset in /public. Unlike `absoluteUrl` this does not
 * add a trailing slash — `/og-default.png/` would 404.
 */
export function absoluteAssetUrl(assetPath: string): string {
  if (/^https?:\/\//i.test(assetPath)) return assetPath;
  return `${site.url}/${assetPath.replace(/^\/+/, "")}`;
}

/**
 * Warnings are emitted on the server unconditionally rather than behind a
 * `NODE_ENV !== "production"` check. Under static export every page is
 * prerendered during `next build`, which runs in production mode — gating on
 * NODE_ENV would silence the warning at the only moment it can be seen. There
 * is no production runtime to spam: the output is plain HTML.
 */
function warn(message: string): void {
  if (typeof window === "undefined") {
    console.warn(`[seo] ${message}`);
  }
}

/**
 * Appends the brand to a title only when the result still fits the budget.
 *
 * The live `/our-services/` title is 86 characters and names the brand twice.
 * That happens when a page hardcodes the brand and a root `title.template`
 * appends it again. Pages should pass a bare title and let this decide.
 */
export function withBrand(
  title: string,
  options: { brand?: string; separator?: string; max?: number } = {},
): string {
  const {
    brand = site.name,
    separator = BRAND_SEPARATOR,
    max = TITLE_MAX_LENGTH,
  } = options;

  const clean = sanitizeText(title);
  if (clean === "") return brand;

  // Already mentions the brand — appending it again is the audit finding.
  if (clean.toLowerCase().includes(brand.toLowerCase())) return clean;

  const combined = `${clean}${separator}${brand}`;
  return combined.length <= max ? combined : clean;
}

export type OgImageInput =
  | string
  | {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    };

export type BuildMetadataOptions = {
  /**
   * Page title, without the brand — `buildMetadata` appends it via `withBrand`
   * unless `brandSuffix: false`. Emitted as `title.absolute` so a root-layout
   * `title.template` can never double up on it.
   */
  title: string;
  /** Meta description. Keep at or under 160 characters. */
  description: string;
  /** Site-relative path of this page, e.g. `/services/local-seo/`. */
  path: string;
  /** Set false when the title already carries its own branding. */
  brandSuffix?: boolean;
  /** Overrides the default OG image. */
  image?: OgImageInput;
  /** `article` for blog posts and case studies, `website` otherwise. */
  type?: "website" | "article";
  /** Forces `noindex, nofollow`. Also applied automatically to `noIndexPaths`. */
  noIndex?: boolean;
  /** ISO 8601. Article pages only. */
  publishedTime?: string;
  /** ISO 8601. Article pages only. */
  modifiedTime?: string;
  /** Author names. Article pages only. */
  authors?: string[];
  /** Merged over everything above, for the rare page that needs an escape hatch. */
  extra?: Metadata;
};

function resolveImage(image: OgImageInput | undefined) {
  if (typeof image === "string") {
    return {
      url: absoluteAssetUrl(image),
      width: site.ogImageWidth,
      height: site.ogImageHeight,
      alt: site.ogImageAlt,
    };
  }
  if (image) {
    return {
      url: absoluteAssetUrl(image.url),
      width: image.width ?? site.ogImageWidth,
      height: image.height ?? site.ogImageHeight,
      alt: sanitizeText(image.alt ?? site.ogImageAlt),
    };
  }
  return {
    url: absoluteAssetUrl(site.ogImage),
    width: site.ogImageWidth,
    height: site.ogImageHeight,
    alt: site.ogImageAlt,
  };
}

/**
 * Builds a complete `Metadata` object for a page.
 *
 * Guarantees, per page: an absolute canonical URL, an absolute og:image, an
 * og:url that matches the canonical, a Twitter card, and title/description
 * sanitised of invisible characters and length-checked at build time.
 */
export function buildMetadata(options: BuildMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    brandSuffix = true,
    image,
    type = "website",
    noIndex,
    publishedTime,
    modifiedTime,
    authors,
    extra,
  } = options;

  const route = canonicalPath(path);
  const url = absoluteUrl(route);

  const resolvedTitle = brandSuffix ? withBrand(title) : sanitizeText(title);
  const resolvedDescription = sanitizeText(description);
  const resolvedImage = resolveImage(image);

  if (resolvedTitle.length === 0) {
    warn(`${route} has an empty title.`);
  } else if (resolvedTitle.length > TITLE_MAX_LENGTH) {
    warn(
      `${route} title is ${resolvedTitle.length} chars (max ${TITLE_MAX_LENGTH}) and will truncate in results: "${resolvedTitle}"`,
    );
  }

  if (resolvedDescription.length === 0) {
    warn(
      `${route} has an empty meta description — Google will invent one from the page body.`,
    );
  } else if (resolvedDescription.length > DESCRIPTION_MAX_LENGTH) {
    warn(
      `${route} description is ${resolvedDescription.length} chars (max ${DESCRIPTION_MAX_LENGTH}) and will truncate.`,
    );
  }

  const shouldNoIndex = noIndex ?? noIndexPaths.includes(route);

  const metadata: Metadata = {
    // `absolute` opts out of any root-layout title template. The template is
    // useful as a default; a page that has thought about its title should win.
    title: { absolute: resolvedTitle },
    description: resolvedDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title: resolvedTitle,
      description: resolvedDescription,
      locale: "en_US",
      images: [resolvedImage],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedImage.url],
    },
    robots: shouldNoIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    ...extra,
  };

  return metadata;
}

/**
 * Root-layout defaults, for `app/layout.tsx` to spread into its own `metadata`.
 *
 * Deliberately carries no `description`: a site-wide fallback description is
 * copy nobody has written yet, and an inherited description on every page is
 * one of the duplicate-metadata patterns the audit flagged. Pages supply their
 * own through `buildMetadata()`.
 *
 * `metadataBase` is set so that any relative metadata URL a page writes by hand
 * still resolves. `buildMetadata()` itself always emits absolute URLs, so it
 * does not depend on this.
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s${BRAND_SEPARATOR}${site.name}`,
  },
  applicationName: site.name,
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: `${site.url}/`,
    images: [
      {
        url: absoluteAssetUrl(site.ogImage),
        width: site.ogImageWidth,
        height: site.ogImageHeight,
        alt: site.ogImageAlt,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
