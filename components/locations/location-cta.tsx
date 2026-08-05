import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export type LocationCtaProps = {
  /** Heading. Authored per page rather than templated on the city name. */
  heading: string;
  /** One supporting line. */
  body: string;
};

/**
 * Closing call to action, with the real NAP under it.
 *
 * The address block is identical on all thirteen pages in this section and is
 * labelled as the studio, not as a branch. Consistent name, address and phone
 * across every page is the cheapest local-SEO win available, and it is the one
 * the current site gives away by having no location pages at all.
 */
export function LocationCta({ heading, body }: LocationCtaProps) {
  const phone = site.phone || "(321) 415-4586";
  const telHref = `tel:${(site.phoneE164 || phone).replace(/[^\d+]/g, "")}`;

  return (
    <Section tone="canvas" divided size="lg">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="text-h2">{heading}</h2>
          <p className="mt-6 max-w-copy text-lead text-muted">{body}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact/" size="lg">
              Book a Strategy Call
            </ButtonLink>
            <ButtonLink href={telHref} variant="secondary" size="lg">
              Call {phone}
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-line bg-raised p-8 shadow-lift">
            <p className="font-mono text-eyebrow text-faint uppercase">
              The studio
            </p>
            <address className="mt-5 flex flex-col gap-3 text-small text-muted not-italic">
              <span className="block text-ink">{site.name}</span>
              <span className="block">
                {site.address.streetAddress}
                <br />
                {site.address.addressLocality}, {site.address.addressRegion}{" "}
                {site.address.postalCode}
              </span>
              <a href={telHref} className="transition-colors hover:text-ink">
                {phone}
              </a>
              {site.email && (
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition-colors hover:text-ink"
                >
                  {site.email}
                </a>
              )}
            </address>
          </div>
        </div>
      </div>
    </Section>
  );
}
