import Link from "next/link";
import {
  centralFloridaLocations,
  locationPath,
  statewideLocations,
  type Location,
} from "@/content/locations";
import { services, site } from "@/content/site";
import {
  breadcrumbListSchema,
  graph,
  localBusinessSchema,
  type SchemaNode,
} from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { LocationBreadcrumbs } from "@/components/locations/location-breadcrumbs";
import { LocationCard } from "@/components/locations/location-card";
import { LocationCta } from "@/components/locations/location-cta";

/**
 * =============================================================================
 * /locations/ — the hub
 * =============================================================================
 *
 * The live site advertises all twelve of these cities on its homepage and has a
 * "VIEW ALL LOCATIONS" button that goes nowhere, because no location page has
 * ever existed. This is the page that button should have pointed at.
 *
 * The grouping is the honest one rather than the flattering one: six cities we
 * can drive to from the studio in under half an hour, and six we cannot. Every
 * card carries its distance, so a visitor knows which they are looking at
 * before they click.
 */

const PATH = "/locations/";

export const metadata = buildMetadata({
  title: "Florida Video Marketing Locations",
  description:
    "Video production, Meta ads and local SEO across twelve Florida cities, produced from our Casselberry studio. Central Florida in person, the rest by trip.",
  path: PATH,
});

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Locations" },
];

/** An ItemList of the twelve city pages, in the order the hub renders them. */
function locationsItemList(all: Location[]): SchemaNode {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(PATH)}#locations`,
    name: "Service areas",
    numberOfItems: all.length,
    itemListElement: all.map((location, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: location.city,
      url: absoluteUrl(locationPath(location.slug)),
    })),
  };
}

export default function LocationsPage() {
  const all = [...centralFloridaLocations, ...statewideLocations];

  const schema = graph(
    localBusinessSchema(),
    breadcrumbListSchema(
      crumbs.map((crumb) => ({ name: crumb.label, path: crumb.href })),
      { path: PATH },
    ),
    locationsItemList(all),
  );

  return (
    <>
      <JsonLd id="schema-locations" data={schema} />

      <Section size="lg" className="overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand/12 blur-[120px]"
        />

        <div className="relative">
          <LocationBreadcrumbs items={crumbs} />

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Eyebrow>Service areas</Eyebrow>
              <h1 className="mt-6 text-h1 text-balance">
                Video marketing across Florida, from one Casselberry studio
              </h1>
              <p className="mt-7 max-w-copy text-lead text-muted">
                We work in twelve Florida markets. Six of them are close enough
                to the studio that a crew can be there and back inside a
                morning. The other six are a genuine drive, so the work is
                structured differently — and each page says which it is rather
                than implying an office that is not there.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <ButtonLink href="/contact/" size="lg">
                  Book a Strategy Call
                </ButtonLink>
                <ButtonLink href="/services/" variant="secondary" size="lg">
                  See the services
                </ButtonLink>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-2xl border border-line bg-raised p-7 shadow-lift sm:p-8">
                <p className="font-mono text-eyebrow text-faint uppercase">
                  One address, twelve markets
                </p>
                <address className="mt-5 text-body text-ink not-italic">
                  {site.address.streetAddress}
                  <br />
                  {site.address.addressLocality}, {site.address.addressRegion}{" "}
                  {site.address.postalCode}
                </address>
                <p className="mt-5 text-small text-muted">
                  Everything on this site is produced from that address. There
                  are no branch offices, and no page in this section pretends
                  otherwise — every distance below is measured from it.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </Section>

      <Section tone="surface" divided>
        <div className="max-w-copy">
          <Eyebrow>Central Florida</Eyebrow>
          <h2 className="mt-6 text-h2">
            The cities we can be in before lunch
          </h2>
          <p className="mt-6 text-body text-muted">
            Casselberry, Winter Park, Altamonte Springs, Maitland, Lake Mary and
            Sanford sit inside a twenty-mile arc around the studio, across
            Seminole and Orange counties. On-location filming here is routine
            rather than an event, which changes what is worth planning: content
            in batches, reshoots without renegotiation, and crews that can work
            around your trading hours instead of a travel day.
          </p>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {centralFloridaLocations.map((location) => (
            <LocationCard
              key={location.slug}
              location={location}
              featured={location.tier === "studio"}
            />
          ))}
        </ul>
      </Section>

      <Section divided>
        <div className="max-w-copy">
          <Eyebrow>The rest of Florida</Eyebrow>
          <h2 className="mt-6 text-h2">
            Markets that take a drive, and what that changes
          </h2>
          <p className="mt-6 text-body text-muted">
            Tampa, Jacksonville, Naples, Fort Myers, Fort Lauderdale and
            Pensacola are between two and seven hours from the studio. The
            recurring work — ad account management, creative iteration,
            automations, appointment setting and SEO — runs remotely and is no
            different for the distance. Filming is what changes: it is scheduled
            as production days or multi-day trips, planned to bank creative
            rather than to be summoned at short notice.
          </p>
          <p className="mt-5 text-body text-muted">
            Each of these pages states the distance and the time zone where it
            matters, and answers the office question directly. Pensacola in
            particular is 450 miles away, and its page says so.
          </p>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {statewideLocations.map((location) => (
            <LocationCard key={location.slug} location={location} />
          ))}
        </ul>
      </Section>

      <Section tone="surface" divided>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>What we do in all of them</Eyebrow>
            <h2 className="mt-6 text-h3">
              The same six services, weighted differently per market
            </h2>
            <p className="mt-6 text-body text-muted">
              Which of these leads depends on where you are. Home services in
              Lee County need speed to lead; a Maitland professional services
              firm needs expertise on camera and a pipeline that remembers a
              lead from March. Each city page says which two or three we would
              start with there, and why.
            </p>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {services.map((service) => (
              <li key={service.slug} className="bg-surface">
                <Link
                  href={`/services/${service.slug}/`}
                  className="group flex h-full items-center justify-between gap-4 p-7 transition-colors hover:bg-raised"
                >
                  <span className="text-h4 text-ink transition-colors group-hover:text-accent">
                    {service.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-micro text-faint"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <LocationCta
        heading="Not sure which of these you are?"
        body="Most businesses sit across two or three of these markets at once. Book a strategy call and we will work out where your customers actually come from before anyone draws a targeting radius."
      />
    </>
  );
}
