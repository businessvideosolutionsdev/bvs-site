import { proofPoints } from "@/content/videos";
import { testimonialAnchor } from "@/components/work/testimonial-grid";

/**
 * The two numbers on this page.
 *
 * Both are the clients' own published claims, lifted from the testimonials
 * further down — not agency-side reporting, and not rounded up. Each one links
 * to the video it came from, so the number and its source are never more than
 * a click apart. If a figure cannot be traced to a video on this page, it does
 * not belong in this component.
 */
export function ProofStrip() {
  if (proofPoints.length === 0) return null;

  return (
    <div>
      <dl className="grid gap-10 sm:grid-cols-2 sm:gap-8">
        {proofPoints.map((point) => (
          <div
            key={point.source}
            className="border-t border-line pt-6 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
          >
            <dt className="font-display text-h1 text-accent">{point.metric}</dt>
            <dd className="mt-3 max-w-xs text-lead text-ink">
              {point.claim}
              <a
                href={`#${testimonialAnchor(point.source)}`}
                className="mt-3 block text-small text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-accent"
              >
                Watch the testimonial
              </a>
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 max-w-copy text-micro text-faint">
        Both figures are the clients&rsquo; own, stated by them on camera in the
        videos below. We publish them as what they are &mdash; their words, not
        a promise of the same outcome for anyone else.
      </p>
    </div>
  );
}
