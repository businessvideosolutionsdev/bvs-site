import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

/*
 * Closing call to action.
 *
 * The panel is `raised` rather than a slab of #000BEC: the brand blue stays a
 * fill on the button, where it sits under white text at 9.3:1, and the panel
 * carries the brand as light instead. Copy is the client's own answer to "what's
 * the first step", turned round to address the reader.
 */

export function CtaBand() {
  const telHref = `tel:${site.phoneE164 || site.phone.replace(/[^\d+]/g, "")}`;

  return (
    <Section tone="canvas" size="lg">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-raised px-7 py-16 text-center shadow-panel sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,11,236,0.35),transparent)]"
        />

        <div className="relative mx-auto flex max-w-copy flex-col items-center">
          <Eyebrow rule={false}>Next step</Eyebrow>

          <h2 className="mt-6 text-h2">
            Book a strategy call.
          </h2>

          <p className="mt-6 text-lead text-muted">
            We&rsquo;ll talk through your business goals, your current marketing
            challenges and your target audience — and how a video-first approach
            would drive growth for you.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <ButtonLink href="/contact/" size="lg">
              Book a Strategy Call
            </ButtonLink>

            <a
              href={telHref}
              className="rounded-md px-3 py-2 font-mono text-small tracking-tight text-muted transition-colors hover:text-ink"
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
