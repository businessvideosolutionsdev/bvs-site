import { absoluteAssetUrl, absoluteUrl, canonicalPath } from "@/lib/seo";
import { serviceAreas, site, type Service, type TeamMember } from "@/content/site";

/**
 * Typed JSON-LD builders.
 *
 * The live site ships essentially no structured data: no Organization, no
 * LocalBusiness, no Service, no BreadcrumbList, and — on a video production
 * company — no VideoObject anywhere. These builders exist so that a page adding
 * schema is a one-line import rather than a hand-written blob of JSON.
 *
 * Every node carries a stable `@id`, so nodes emitted by different components on
 * the same page merge into one entity graph instead of competing duplicates.
 */

/** A single JSON-LD node. `@type` is required; everything else is free-form. */
export type SchemaNode = {
  "@type": string | string[];
  "@id"?: string;
  [key: string]: unknown;
};

/** A reference to a node defined elsewhere in the graph. */
export type NodeRef = { "@id": string };

/** A `@graph` document, ready to hand to `<JsonLd />`. */
export type SchemaGraph = {
  "@context": "https://schema.org";
  "@graph": SchemaNode[];
};

const CONTEXT = "https://schema.org" as const;

/**
 * Stable entity identifiers. Fragment `@id`s on the origin are the convention:
 * they are globally unique, they never 404, and they survive URL changes to any
 * individual page.
 */
export const ORGANIZATION_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

/** Reference the sitewide business entity from any other node. */
export const organizationRef: NodeRef = { "@id": ORGANIZATION_ID };

/** Drops `undefined`, `null`, empty strings and empty arrays from a node. */
function compact<T extends Record<string, unknown>>(input: T): T {
  const output: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    output[key] = value;
  }
  return output as T;
}

function warn(message: string): void {
  if (typeof window === "undefined") {
    console.warn(`[schema] ${message}`);
  }
}

/**
 * Wraps nodes into a single `@graph` document.
 *
 * One `<script>` holding a graph beats several scripts holding loose nodes:
 * `@id` references resolve within the document, and Google's parser has one
 * thing to read instead of four.
 */
export function graph(...nodes: (SchemaNode | null | undefined)[]): SchemaGraph {
  return {
    "@context": CONTEXT,
    "@graph": nodes.filter((node): node is SchemaNode => Boolean(node)),
  };
}

/** Converts a duration in seconds to the ISO 8601 form schema.org expects (`PT1M35S`). */
export function secondsToIso8601Duration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;

  const parts = [
    hours > 0 ? `${hours}H` : "",
    minutes > 0 ? `${minutes}M` : "",
    rest > 0 || seconds === 0 ? `${rest}S` : "",
  ].join("");

  return `PT${parts}`;
}

function postalAddress(): SchemaNode {
  return {
    "@type": "PostalAddress",
    ...site.address,
  };
}

function areaServedNodes(): SchemaNode[] {
  return serviceAreas.map((area) => ({
    "@type": "City",
    name: area.city,
    containedInPlace: {
      "@type": "State",
      name: area.region,
    },
  }));
}

function sameAs(): string[] {
  return site.social.map((profile) => profile.href).filter(Boolean);
}

/**
 * The sitewide business entity, as a plain Organization.
 *
 * Prefer `localBusinessSchema()` for the root layout: it is the same entity with
 * the same `@id`, plus the address, phone and service-area properties that local
 * results depend on. This one is here for pages that want to reference the
 * organization without restating the local signals.
 */
export function organizationSchema(overrides: Partial<SchemaNode> = {}): SchemaNode {
  return compact({
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: site.legalName,
    alternateName: site.name,
    url: `${site.url}/`,
    email: site.email,
    telephone: site.phoneE164,
    description: site.description,
    foundingDate: site.foundingDate,
    address: postalAddress(),
    logo: site.logo
      ? compact({
          "@type": "ImageObject",
          "@id": `${site.url}/#logo`,
          url: absoluteAssetUrl(site.logo),
          contentUrl: absoluteAssetUrl(site.logo),
          width: site.logoWidth || undefined,
          height: site.logoHeight || undefined,
          caption: site.name,
        })
      : undefined,
    image: site.logo ? { "@id": `${site.url}/#logo` } : undefined,
    sameAs: sameAs(),
    ...overrides,
  });
}

/**
 * The sitewide business entity with its local signals — emit this once in the
 * root layout.
 *
 * It deliberately reuses `ORGANIZATION_ID` rather than minting a second id.
 * LocalBusiness is a subtype of Organization, so this is one entity described
 * more completely, not two entities that a parser has to reconcile. If a page
 * also emits `organizationSchema()`, the two merge cleanly on `@id`.
 *
 * `geo` and `openingHoursSpecification` are omitted on purpose: coordinates and
 * hours are not verified, and wrong ones actively damage local ranking.
 */
export function localBusinessSchema(overrides: Partial<SchemaNode> = {}): SchemaNode {
  return compact({
    ...organizationSchema(),
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    // Video production has no schema.org type of its own; this is the standard
    // way to say what kind of local business it is.
    additionalType: "https://www.productontology.org/id/Video_production",
    areaServed: areaServedNodes(),
    contactPoint: compact({
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: site.phoneE164,
      email: site.email,
      areaServed: "US",
      availableLanguage: "English",
    }),
    ...overrides,
  });
}

/** The site itself. Useful once, in the root layout, alongside the business. */
export function webSiteSchema(overrides: Partial<SchemaNode> = {}): SchemaNode {
  return compact({
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${site.url}/`,
    name: site.name,
    description: site.description,
    publisher: organizationRef,
    inLanguage: "en-US",
    ...overrides,
  });
}

export type ServiceSchemaInput = {
  /** Service name, e.g. "Local SEO". */
  name: string;
  /** What the service is. Falls back to nothing rather than to filler. */
  description?: string;
  /** Site-relative path of the service page. */
  path: string;
  /** Defaults to the sitewide service areas. */
  areaServed?: SchemaNode[];
  /** Broad category, e.g. "Video Production". */
  serviceType?: string;
  /** Line items, rendered as an OfferCatalog. */
  includes?: string[];
};

/** A single service offered by the business. */
export function serviceSchema(input: ServiceSchemaInput): SchemaNode {
  const route = canonicalPath(input.path);
  const url = absoluteUrl(route);

  return compact({
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.serviceType ?? input.name,
    url,
    provider: organizationRef,
    areaServed: input.areaServed ?? areaServedNodes(),
    hasOfferCatalog:
      input.includes && input.includes.length > 0
        ? {
            "@type": "OfferCatalog",
            name: input.name,
            itemListElement: input.includes.map((item) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: item },
            })),
          }
        : undefined,
  });
}

/** Convenience wrapper: build a Service node straight from a `content/site.ts` entry. */
export function serviceSchemaFromContent(service: Service): SchemaNode {
  return serviceSchema({
    name: service.title,
    description: service.summary || service.detail,
    path: `/services/${service.slug}/`,
    includes: service.includes,
  });
}

export type BreadcrumbItem = {
  name: string;
  /** Site-relative path. Omit for the final crumb (the current page). */
  path?: string;
};

/**
 * Breadcrumb trail for the current page.
 *
 * Include the home crumb — Google uses position 1 as the trail root. The last
 * crumb should carry no `path`: it is the page the user is already on.
 */
export function breadcrumbListSchema(
  items: BreadcrumbItem[],
  options: { path?: string } = {},
): SchemaNode {
  const pageUrl = options.path ? absoluteUrl(options.path) : undefined;

  return compact({
    "@type": "BreadcrumbList",
    "@id": pageUrl ? `${pageUrl}#breadcrumb` : undefined,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  });
}

export type VideoObjectInput = {
  /** Video title. Required by Google. */
  name: string;
  /** Video description. Required by Google. */
  description: string;
  /**
   * Thumbnail URL(s). Required by Google — the image must be publicly
   * crawlable and at least 60x30px. Relative paths resolve against the origin.
   */
  thumbnailUrl: string | string[];
  /** ISO 8601 date, required by Google, e.g. "2026-02-14" or a full timestamp. */
  uploadDate: string;
  /** Direct URL to the video file (`.mp4` etc.). Not a player page. */
  contentUrl?: string;
  /** Player URL — the `src` of the embed iframe. */
  embedUrl?: string;
  /** Runtime in seconds; converted to ISO 8601. Takes precedence over `duration`. */
  durationSeconds?: number;
  /** Runtime already in ISO 8601 form, e.g. "PT1M35S". */
  duration?: string;
  /** Path of the page the video appears on. Drives the `@id` and `url`. */
  path?: string;
  /** Disambiguator when one page carries several videos. */
  id?: string;
  transcript?: string;
  inLanguage?: string;
  keywords?: string[];
  /** View count, if it is real. Never estimate this. */
  interactionCount?: number;
  /** ISO 8601. Only for videos that genuinely expire. */
  expires?: string;
  width?: number;
  height?: number;
};

/**
 * A video. This is the highest-value schema on the site: VideoObject is what
 * gets a thumbnail into the results page and makes a page eligible for the
 * video carousel — and the live site has none of it.
 *
 * Google requires `name`, `description`, `thumbnailUrl` and `uploadDate`, plus
 * at least one of `contentUrl` / `embedUrl` for a video to be indexable. Missing
 * pieces are warned about at build time rather than silently emitted.
 */
export function videoObjectSchema(input: VideoObjectInput): SchemaNode {
  const route = input.path ? canonicalPath(input.path) : undefined;
  const pageUrl = route ? absoluteUrl(route) : undefined;
  const fragment = input.id ? `#video-${input.id}` : "#video";

  const thumbnails = (
    Array.isArray(input.thumbnailUrl) ? input.thumbnailUrl : [input.thumbnailUrl]
  )
    .filter(Boolean)
    .map(absoluteAssetUrl);

  if (thumbnails.length === 0) {
    warn(`VideoObject "${input.name}" has no thumbnailUrl — Google will not index it.`);
  }
  if (!input.contentUrl && !input.embedUrl) {
    warn(
      `VideoObject "${input.name}" has neither contentUrl nor embedUrl — Google requires one of the two.`,
    );
  }
  if (!input.uploadDate) {
    warn(`VideoObject "${input.name}" has no uploadDate — Google requires it.`);
  }

  const duration =
    input.durationSeconds !== undefined
      ? secondsToIso8601Duration(input.durationSeconds)
      : input.duration;

  return compact({
    "@type": "VideoObject",
    "@id": pageUrl ? `${pageUrl}${fragment}` : undefined,
    name: input.name,
    description: input.description,
    thumbnailUrl: thumbnails,
    uploadDate: input.uploadDate,
    duration,
    contentUrl: input.contentUrl ? absoluteAssetUrl(input.contentUrl) : undefined,
    embedUrl: input.embedUrl,
    url: pageUrl,
    width: input.width,
    height: input.height,
    inLanguage: input.inLanguage ?? "en-US",
    isFamilyFriendly: true,
    keywords: input.keywords?.join(", "),
    transcript: input.transcript,
    expires: input.expires,
    publisher: organizationRef,
    creator: organizationRef,
    interactionStatistic:
      input.interactionCount !== undefined
        ? {
            "@type": "InteractionCounter",
            interactionType: { "@type": "WatchAction" },
            userInteractionCount: input.interactionCount,
          }
        : undefined,
  });
}

export type YouTubeVideoSchemaInput = Omit<
  VideoObjectInput,
  "embedUrl" | "contentUrl" | "thumbnailUrl" | "id"
> & {
  /** YouTube video id, e.g. `mARd-XNChiE`. */
  youTubeId: string;
  /** Override the derived thumbnail. Defaults to YouTube's `maxresdefault`. */
  thumbnailUrl?: string | string[];
};

/**
 * VideoObject for a YouTube-hosted video embedded on one of our pages.
 *
 * Marking up an embed you host on your own page is legitimate and is how a page
 * becomes eligible for the video carousel. `embedUrl` is the player URL;
 * `contentUrl` is deliberately not set, because we do not host the file and the
 * watch page is not a media file.
 *
 * `description` and `uploadDate` still have to be supplied — Google requires
 * both, and neither can be derived from a video id.
 */
export function youTubeVideoSchema(input: YouTubeVideoSchemaInput): SchemaNode {
  const { youTubeId, thumbnailUrl, ...rest } = input;

  return videoObjectSchema({
    ...rest,
    id: youTubeId,
    embedUrl: `https://www.youtube.com/embed/${youTubeId}`,
    thumbnailUrl:
      thumbnailUrl ?? `https://i.ytimg.com/vi/${youTubeId}/maxresdefault.jpg`,
  });
}

export type FaqItem = {
  question: string;
  /** Plain text or a short HTML string. */
  answer: string;
};

/**
 * FAQ block.
 *
 * Google restricted FAQ rich results to authoritative government and health
 * sites in 2023, so expect no rich snippet from this — it is still worth
 * emitting as entity context, but do not sell it to the client as stars.
 * Only mark up questions and answers that are actually visible on the page.
 */
export function faqPageSchema(
  items: FaqItem[],
  options: { path?: string } = {},
): SchemaNode {
  const pageUrl = options.path ? absoluteUrl(options.path) : undefined;

  return compact({
    "@type": "FAQPage",
    "@id": pageUrl ? `${pageUrl}#faq` : undefined,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });
}

export type PersonSchemaInput = {
  name: string;
  jobTitle?: string;
  description?: string;
  /** Path under /public, or an absolute URL. */
  image?: string;
  /** Path of the person's own page, if they have one. */
  path?: string;
  /** Verified profile URLs only — `sameAs` is an identity claim. */
  sameAs?: string[];
  /** Slug used for the `@id` fragment when there is no dedicated page. */
  slug?: string;
};

/** A team member. Also used as the `author` of blog posts. */
export function personSchema(input: PersonSchemaInput): SchemaNode {
  const route = input.path ? canonicalPath(input.path) : undefined;
  const pageUrl = route ? absoluteUrl(route) : undefined;
  const slug = input.slug ?? input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return compact({
    "@type": "Person",
    "@id": pageUrl ? `${pageUrl}#person` : `${site.url}/#person-${slug}`,
    name: input.name,
    jobTitle: input.jobTitle,
    description: input.description,
    image: input.image ? absoluteAssetUrl(input.image) : undefined,
    url: pageUrl,
    worksFor: organizationRef,
    sameAs: input.sameAs ?? [],
  });
}

/** Convenience wrapper: build a Person node straight from a `content/site.ts` entry. */
export function personSchemaFromContent(member: TeamMember): SchemaNode {
  return personSchema({
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: member.image,
    sameAs: member.sameAs,
    slug: member.slug,
  });
}
