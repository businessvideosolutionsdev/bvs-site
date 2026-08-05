/**
 * Single source of truth for site copy and configuration.
 *
 * Every value here is either verified real business data or an empty value with
 * a `TODO:` next to it. Nothing is invented — an empty string renders as nothing,
 * which is always better than shipping a plausible-sounding lie about the client.
 *
 * Other modules read this; it imports nothing.
 */

export const site = {
  /** Trading name, used in UI. */
  name: "Business Video Solutions",
  /** Registered legal name, used in Organization / LocalBusiness JSON-LD. */
  legalName: "Business Video Solutions LLC",
  shortName: "BVS",

  /**
   * Canonical origin. The domain stays on `.net` — do not "correct" this to `.com`.
   * No trailing slash: the helpers in lib/seo.ts append the path.
   */
  url: "https://www.businessvideosolutions.net",

  /**
   * Positioning line and description.
   *
   * NOT invented — both are taken from the client's own live site and tightened.
   * The tagline is their existing hero. The description is their existing meta
   * description cut from 202 chars (which Google truncates) to fit the 160-char
   * limit enforced by lib/seo.ts, keeping "Florida", "video marketing agency"
   * and "Meta ad" intact.
   * TODO: client to confirm or replace — this is their old copy, not new copy.
   */
  tagline: "Your entire marketing engine. Built for Florida businesses.",
  description:
    "Florida video marketing agency pairing cinematic production with data-driven Meta ad strategy. Video, ads, automations and CRM built to generate leads.",

  email: "info@businessvideosolutions.net",
  phone: "(321) 415-4586",
  /** E.164, for `tel:` links and JSON-LD `telephone`. */
  phoneE164: "+13214154586",
  /** Short human-readable location line. */
  location: "Casselberry, FL",

  /** Postal address (NAP). Must match the Google Business Profile character for character. */
  address: {
    streetAddress: "75 Concord Dr Unit B",
    addressLocality: "Casselberry",
    addressRegion: "FL",
    postalCode: "32707",
    addressCountry: "US",
  },

  /**
   * Default Open Graph image, relative to /public.
   *
   * Generated from the real logo lockup on the brand canvas colour — a holding
   * asset so social shares are never blank. It is deliberately plain.
   * TODO: replace with designed artwork if the client wants something richer.
   */
  ogImage: "/og-default.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "Business Video Solutions — Florida video marketing agency",

  /** Site logo, relative to /public. Used by Organization JSON-LD. */
  logo: "/bvs-logo.png",
  logoWidth: 1048,
  logoHeight: 260,

  /**
   * Where the contact form POSTs its JSON payload.
   *
   * Static export means no server and no API route, so this has to be an
   * external endpoint — a Cloudflare Worker, a GoHighLevel inbound webhook,
   * Formspree or similar. Decided once we know where leads should land.
   */
  formEndpoint: "",

  /**
   * Header / footer navigation.
   * TODO: confirm against the pages that actually ship. These hrefs have to
   * match real routes or the header links 404 — they mirror `routes` below.
   */
  nav: [
    { href: "/services/", label: "Services" },
    { href: "/work/", label: "Work" },
    { href: "/locations/", label: "Locations" },
    { href: "/about/", label: "About" },
    { href: "/contact/", label: "Contact" },
  ] as { href: string; label: string }[],

  /**
   * Primary header call to action. Matches the live site's existing wording
   * ("BOOK YOUR STRATEGY CALL") so the offer stays recognisable to returning
   * visitors and to anyone arriving from an ad that uses the same phrase.
   */
  cta: { href: "/contact/", label: "Book a Strategy Call" } as {
    href: string;
    label: string;
  } | null,

  /**
   * Real social profiles only. These are emitted as schema.org `sameAs`, which
   * is an identity claim — a wrong URL points Google at someone else's business.
   *
   * Instagram is verified: it is the profile linked from the client's own
   * call-confirmation page.
   * TODO: YouTube channel URL (the channel "Business Video Solutions Marketing
   * Orlando Florida" is confirmed to exist via oEmbed, but its canonical URL is
   * not), plus LinkedIn and Facebook if they exist.
   */
  social: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/business_video_solutions/",
    },
  ] as { label: string; href: string }[],

  /** Founding date, ISO 8601. TODO: confirm with the client. */
  foundingDate: "",
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  includes: string[];
};

/**
 * The six real service lines.
 *
 * `summary` and `detail` are the client's own live copy, tightened — not new
 * claims. `summary` is the one-line positioning statement each service already
 * carries on /our-services/; `detail` is the paragraph underneath it. Both feed
 * the page body AND the Service JSON-LD description, so they have to read as
 * sentences rather than as keywords.
 *
 * `includes` lists only capabilities the client already advertises. Nothing here
 * is inferred from "an agency like this probably also does X" — an OfferCatalog
 * is a public statement about what the business sells.
 *
 * The order is the order they appear on the live site and on /services/.
 */
export const services: Service[] = [
  {
    slug: "meta-ads-production",
    title: "Meta Ads Production",
    summary:
      "Advertising content built to stop scrolling and encourage action.",
    detail:
      "Create high-performing Facebook and Instagram video ads designed to capture attention and drive action.",
    includes: [
      "Facebook video ads",
      "Instagram video ads",
      "Vertical creative built for the feed",
      "Ads built to generate leads",
      "Ads built to drive sales",
    ],
  },
  {
    slug: "studio-production",
    title: "Studio Production",
    summary:
      "Professional video production that reflects the quality of your business.",
    detail:
      "Bring your ideas to life with professional video production that showcases your brand at its best. From commercials and promotional videos to educational content and social media assets.",
    includes: [
      "Commercials",
      "Promotional videos",
      "Educational content",
      "Social media assets",
      "Fully equipped studio with professional lighting and sound",
      "Virtual production environments",
    ],
  },
  {
    slug: "marketing-automations",
    title: "Marketing Automations",
    summary: "Turn new leads into lasting customer relationships.",
    detail:
      "Turn new leads into loyal customers with smart marketing automation that keeps your business running efficiently.",
    includes: [
      "CRM integration",
      "Personalized follow-up sequences",
      "Automated customer communication",
    ],
  },
  {
    slug: "appointment-setting",
    title: "Appointment Setting",
    summary: "Convert interest into qualified business opportunities.",
    detail:
      "Convert interest into qualified business opportunities with a streamlined appointment-setting process.",
    includes: [
      "Lead qualification",
      "Direct meeting scheduling",
      "A streamlined path from inquiry to booked meeting",
    ],
  },
  {
    slug: "website-seo",
    title: "Website SEO",
    summary: "Improve your visibility where customers are searching.",
    detail:
      "Improve your visibility where your customers are searching with a strategic SEO approach built for long-term growth.",
    includes: [
      "On-page SEO",
      "Content optimization",
      "Technical improvements",
      "Internal linking",
    ],
  },
  {
    slug: "local-seo",
    title: "Local SEO",
    summary: "Connect with customers in your service area.",
    detail:
      "Connect with customers in your service area by improving your visibility in local search results.",
    includes: [
      "Website optimization for local search",
      "Google Business Profile optimization",
      "Local listings",
    ],
  },
];

export type ServiceArea = {
  city: string;
  region: string;
};

/** Cities the business serves. Emitted as LocalBusiness `areaServed`. */
export const serviceAreas: ServiceArea[] = [
  { city: "Casselberry", region: "FL" },
  { city: "Winter Park", region: "FL" },
  { city: "Altamonte Springs", region: "FL" },
  { city: "Maitland", region: "FL" },
  { city: "Sanford", region: "FL" },
  { city: "Lake Mary", region: "FL" },
  { city: "Tampa", region: "FL" },
  { city: "Pensacola", region: "FL" },
  { city: "Jacksonville", region: "FL" },
  { city: "Naples", region: "FL" },
  { city: "Fort Lauderdale", region: "FL" },
  { city: "Fort Myers", region: "FL" },
];

/**
 * URL slug for a city name — "Altamonte Springs" becomes "altamonte-springs".
 *
 * Declared here rather than inlined so the route registry, the location pages
 * and any internal link all derive the same slug from the same source. A city
 * whose slug is computed in two places eventually gets two different slugs.
 */
export function citySlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  /** TODO: real bio copy per person. */
  bio: string;
  /** TODO: real headshot path under /public. */
  image: string;
  /** TODO: real profile URLs (LinkedIn etc.) — `sameAs` is an identity claim. */
  sameAs: string[];
};

export const team: TeamMember[] = [
  {
    slug: "christian-cotrone",
    name: "Christian Cotrone",
    role: "Founder / Video Ad Strategist",
    bio: "",
    image: "",
    sameAs: [],
  },
  {
    slug: "locksley-lennox",
    name: "Locksley Lennox",
    role: "Ads and Automations Specialist",
    bio: "",
    image: "",
    sameAs: [],
  },
  {
    slug: "jacob-ballard",
    name: "Jacob Ballard",
    role: "Director of Production and Fulfillment",
    bio: "",
    image: "",
    sameAs: [],
  },
];

export type Project = {
  slug: string;
  client: string;
  title: string;
  category: string;
  year: string;
  blurb: string;
};

/** TODO: real projects only. A portfolio of invented work is worse than none. */
export const projects: Project[] = [];

export type SiteRoute = {
  /** Path with a leading and trailing slash, matching `trailingSlash: true`. */
  path: string;
  /** Sitemap priority, 0.0–1.0. Relative importance within this site only. */
  priority: number;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  /** ISO date. Omit to fall back to the build date. */
  lastModified?: string;
};

/**
 * Canonical route registry — the one list app/sitemap.ts walks.
 *
 * TODO: keep in step with the pages that actually ship. A sitemap entry for a
 * route that 404s is worse than a missing entry: Search Console flags it and
 * crawl budget gets spent on nothing. Service detail routes are derived from
 * `services` so those two can never drift.
 */
export const routes: SiteRoute[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services/", priority: 0.9, changeFrequency: "monthly" },
  ...services.map((service) => ({
    path: `/services/${service.slug}/`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  { path: "/work/", priority: 0.8, changeFrequency: "monthly" },
  /*
   * Location pages are the single biggest organic gap on the current site: it
   * advertises all twelve of these cities and a "VIEW ALL LOCATIONS" link while
   * having no location pages at all. Derived from `serviceAreas` so the hub, the
   * sitemap and the schema `areaServed` list can never drift apart.
   */
  { path: "/locations/", priority: 0.8, changeFrequency: "monthly" },
  ...serviceAreas.map((area) => ({
    path: `/locations/${citySlug(area.city)}/`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
  { path: "/about/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact/", priority: 0.7, changeFrequency: "yearly" },
  /*
   * `/blog/` is intentionally ABSENT while it has no posts. The page exists so
   * the old `/blog-2/` redirect lands somewhere real, but an empty index is
   * thin content and is marked noindex. Add this entry back the moment the
   * first post ships:
   *   { path: "/blog/", priority: 0.6, changeFrequency: "weekly" },
   */
];

/**
 * Paths that must never be indexed. Confirmation and thank-you pages are thin
 * duplicates that dilute quality signals, and a confirmation page ranking for a
 * brand query is a genuinely bad outcome (the live site has exactly this).
 * TODO: confirm the real post-conversion routes once they exist.
 */
export const noIndexPaths: string[] = ["/call-confirmation/", "/thank-you/"];
