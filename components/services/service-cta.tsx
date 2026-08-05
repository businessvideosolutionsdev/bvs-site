import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

export type ServiceCtaProps = {
  /** Defaults to the sitewide ask. Override to name the service in the heading. */
  heading?: string;
  body?: string;
  /** Label for the primary button. Defaults to `site.cta.label`. */
  action?: string;
};

/**
 * The closing band on every services page.
 *
 * One ask, one destination. The phone number sits beside it as a plain `tel:`
 * link rather than a second button — a local business that hides its number
 * behind a form loses the callers who were ready to call.
 */
export function ServiceCta({ heading, body, action }: ServiceCtaProps) {
  const telHref = `tel:${site.phoneE164 || site.phone.replace(/[^\d+]/g, "")}`;
  const label = action ?? site.cta?.label ?? "Book a Strategy Call";

  return (
    <Section tone="surface" size="md" divided>
      <div className="relative overflow-hidden rounded-3xl border border-line bg-raised px-7 py-14 shadow-panel sm:px-12 sm:py-16">
        {/* A single wash of brand light behind the ask — a fill, never text. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-24 h-80 w-80 rounded-full bg-brand/20 blur-3xl"
        />

        <div className="relative max-w-copy">
          <Eyebrow>Next step</Eyebrow>

          <h2 className="mt-6 text-h2 text-ink">
            {heading ?? "Let's talk about what you're trying to sell."}
          </h2>

          <p className="mt-5 text-lead text-muted">
            {body ??
              "Tell us who your customers are and what you want more of. We'll walk you through what we would film, what we would run, and what happens to a lead once it arrives."}
          </p>

          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <ButtonLink href={site.cta?.href ?? "/contact/"} size="lg">
              {label}
            </ButtonLink>

            <a
              href={telHref}
              className="rounded-md font-mono text-small text-muted transition-colors hover:text-ink"
            >
              <span className="sr-only">Call us on </span>
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
