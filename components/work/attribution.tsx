/**
 * Who is speaking in a testimonial.
 *
 * Only the i9 Sports video names its client — the other five are unattributed
 * on the client's own channel, and attaching a name to a face without
 * permission is not a design decision we get to make.
 *
 * This registry is the drop-in point: add `name`, `title` and/or `company`
 * against a video ID and the card renders the attribution line and a monogram
 * automatically. `TestimonialCard` already reserves the space, so filling these
 * in changes no layout and needs no redesign.
 *
 * TODO: collect name, job title and company for the five unattributed
 * testimonials. An anonymous testimonial converts far less well, and it cannot
 * be marked up as a schema.org `Review` at all.
 */
export type Attribution = {
  /** Person's full name, e.g. "Jane Rivera". */
  name?: string;
  /** Their job title, e.g. "Owner". */
  title?: string;
  /** Their business, e.g. "i9 Sports". */
  company?: string;
};

export const testimonialAttribution: Record<string, Attribution> = {
  /* Verified: this video names i9 Sports in its own title and content. */
  "mARd-XNChiE": { company: "i9 Sports" },

  /* TODO: the remaining five. Left absent rather than guessed. */
  // "LEVT91_ZYns": {},
  // "JNrRvurOxCg": {},
  // "4mHIRd7luA8": {},
  // "C9wi7aRW4TE": {},
  // "lejODGvvYxg": {},
};

/** True when we know anything at all about who is speaking. */
export function hasAttribution(attribution: Attribution | undefined): boolean {
  return Boolean(attribution?.name || attribution?.title || attribution?.company);
}

/** "Jane Rivera, Owner, i9 Sports" — from whichever parts exist. */
export function attributionLine(attribution: Attribution | undefined): string {
  if (!attribution) return "";
  return [attribution.name, attribution.title, attribution.company]
    .filter(Boolean)
    .join(", ");
}

/**
 * Initials for the monogram. Person names only — "i9 Sports" reduced to "IS"
 * reads as a mistake, so a company-only attribution falls back to the quote
 * glyph the card draws when this returns "".
 */
export function attributionInitials(attribution: Attribution | undefined): string {
  const words = (attribution?.name ?? "").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";

  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}
