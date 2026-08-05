import { site } from "@/content/site";
import type { Location } from "@/content/locations";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import {
  LocationBreadcrumbs,
  type Crumb,
} from "@/components/locations/location-breadcrumbs";

export type LocationHeroProps = {
  location: Location;
  crumbs: Crumb[];
};

/**
 * The top of a city page: the single h1, the angle, and the travel panel.
 *
 * The travel panel is doing more work than it looks like it is. Every page
 * except Casselberry states the distance from the studio in plain numbers, so
 * a visitor in Pensacola knows before they read anything else that the office
 * is seven hours away. That is both the honest answer and the thing that stops
 * these twelve pages reading as one page printed twelve times.
 */
export function LocationHero({ location, crumbs }: LocationHeroProps) {
  const phone = site.phone || "(321) 415-4586";
  const telHref = `tel:${(site.phoneE164 || phone).replace(/[^\d+]/g, "")}`;

  return (
    <Section size="lg" className="overflow-hidden">
      {/* A single wash of brand light behind the headline, nothing more. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand/12 blur-[120px]"
      />

      <div className="relative">
        <LocationBreadcrumbs items={crumbs} />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>{location.eyebrow}</Eyebrow>

            <h1 className="mt-6 text-h1 text-balance">{location.h1}</h1>

            <p className="mt-7 max-w-copy text-lead text-muted">
              {location.lede}
            </p>

            {location.publishedLine && (
              <p className="mt-8 border-l-2 border-accent-dim/70 pl-5 text-body text-ink">
                {location.publishedLine}
              </p>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="/contact/" size="lg">
                Book a Strategy Call
              </ButtonLink>
              <ButtonLink href={telHref} variant="secondary" size="lg">
                {phone}
              </ButtonLink>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-line bg-raised p-7 shadow-lift sm:p-8">
              <p className="font-mono text-eyebrow text-faint uppercase">
                From the studio
              </p>
              <p className="mt-5 text-h4 text-ink">{location.travel.label}</p>
              <p className="mt-3 text-small text-muted">
                {location.travel.body}
              </p>

              <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7">
                <div>
                  <dt className="font-mono text-micro text-faint uppercase">
                    County
                  </dt>
                  <dd className="mt-1.5 text-small text-ink">
                    {location.county}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-micro text-faint uppercase">
                    Studio
                  </dt>
                  {/*
                   * The one address the business has, on every city page. The
                   * point is not decoration: a location page that never names a
                   * real address is the pattern Google treats as a doorway, and
                   * naming a fake local one is worse than either.
                   */}
                  <dd className="mt-1.5 text-small text-ink">
                    {site.address.addressLocality}, {site.address.addressRegion}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
