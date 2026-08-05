/**
 * Real BVS video assets.
 *
 * Source: the GoHighLevel "vibe" export of the call-confirmation page, cross-checked
 * against the YouTube oEmbed API on 2026-08-05 — every ID below resolved to a live,
 * public video on the channel "Business Video Solutions Marketing Orlando Florida".
 * The `title` field is the REAL YouTube title; `label` is the display copy used on
 * the confirmation page, kept where it reads better than the raw title.
 *
 * DELIBERATELY EXCLUDED: the pre-call MP4 hosted at assets.cdn.filesafe.space
 * (6a3aad4cee187be6895545e2.mp4). That is the call-confirmation briefing video and
 * must not appear anywhere on the public marketing site.
 */

export type Video = {
  /** YouTube video ID. */
  id: string;
  /** Verified real YouTube title — use for VideoObject schema `name`. */
  title: string;
  /** Display copy for the site. Falls back to `title` when absent. */
  label?: string;
  /** Shot vertically (9:16). Affects embed aspect ratio. */
  vertical: boolean;
};

export const youTubeChannel = "Business Video Solutions Marketing Orlando Florida";

/**
 * Client testimonials. These are the strongest trust assets the business has and
 * are currently buried on /call-confirmation/, visible only to people who have
 * already booked. They belong on the homepage.
 *
 * TODO: attribution. Only the i9 Sports video names its client. For each of the
 * other five we need the person's name, title and company — an unattributed
 * testimonial carries far less weight and cannot be marked up as a Review.
 */
export const testimonials: Video[] = [
  {
    id: "mARd-XNChiE",
    title: "I9 Sports Testimonial: $3 Leads and Massive Growth",
    label: "i9 Sports: $3 leads and massive growth",
    vertical: true,
  },
  {
    id: "LEVT91_ZYns",
    title: "Booked out after partnering with BVS Orlando Florida",
    label: "Booked out after partnering with BVS",
    vertical: true,
  },
  {
    id: "JNrRvurOxCg",
    title: "From Zero to 300K THE BVS EFFECT #shorts",
    label: "From zero to 300K",
    vertical: true,
  },
  {
    id: "4mHIRd7luA8",
    title: "From Frustration to Full-Speed Growth #shorts",
    label: "From frustration to full-speed growth",
    vertical: true,
  },
  {
    id: "C9wi7aRW4TE",
    title: "Real ROI Real Sales #shorts",
    label: "Real ROI, real sales",
    vertical: true,
  },
  {
    id: "lejODGvvYxg",
    title: "Long-Term Partners. Long-Term Growth in Orlando Florida",
    label: "Long-term partners, long-term growth",
    vertical: true,
  },
];

/** Ad creative samples — the clearest demonstration of production quality. */
export const adExamples: Video[] = [
  { id: "yWBr_6x_D7c", title: "BVS Ad Example 1", vertical: true },
  { id: "7sqzgUuWfOc", title: "BVS Ad Example 2", vertical: true },
  { id: "Fomh8Ko3obs", title: "BVS Ad Example 3", vertical: true },
  { id: "a9Apbg_SudI", title: "BVS Ad Example 4", vertical: true },
  { id: "Jdy4JeQu9eA", title: "BVS Ad Example 5", vertical: true },
  { id: "q-qzb9AuXzc", title: "BVS Ad Example 6", vertical: true },
];

/**
 * Explainer videos answering common pre-sale objections.
 *
 * NOTE: the confirmation page labels `5j_Jidf2eaY` as "What kind of results could
 * I expect?", but its real YouTube title is identical to the i9 Sports testimonial
 * already listed above — it is a duplicate upload of the same footage. It is left
 * out here so the same video does not appear twice on one page.
 */
export const explainers: Video[] = [
  {
    id: "K6aPxJshimI",
    title: "This Is How We Launch a Brand-New Client the Right Way (Month 1 Shoot)",
    label: "What it's like working with us",
    vertical: false,
  },
  {
    id: "Zd0LY3v0Zp4",
    title: "Filming social media ads for the top businesses in Florida and how we do it!",
    label: "How it works",
    vertical: false,
  },
];

/**
 * Proof points pulled from the testimonial videos above. These are claims BVS has
 * already published, not invented figures — but they should be confirmed before
 * being used as headline copy, since a stated metric invites scrutiny.
 */
export const proofPoints = [
  { metric: "$3", claim: "cost per lead for i9 Sports", source: "mARd-XNChiE" },
  { metric: "300K", claim: "from zero, for one client", source: "JNrRvurOxCg" },
];

/** Verified real social profile, from the confirmation page. */
export const instagramUrl = "https://www.instagram.com/business_video_solutions/";
