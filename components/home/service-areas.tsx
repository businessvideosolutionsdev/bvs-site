import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { citySlug, serviceAreas } from "@/content/site";

/*
 * Service-area strip.
 *
 * The live site names all twelve of these cities and links to "VIEW ALL
 * LOCATIONS" while having no location pages at all — the biggest organic gap in
 * the audit. These links point at the routes in the canonical registry
 * (`routes` in content/site.ts), which the sitemap already emits, so the
 * homepage, the sitemap and the schema `areaServed` list all agree.
 *
 * NOTE: this depends on /locations/[city]/ actually shipping. If those pages are
 * cut, the city names here must become plain text rather than links.
 */

export function ServiceAreas() {
  if (serviceAreas.length === 0) return null;

  return (
    <Section tone="canvas" size="md">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Eyebrow>Locations</Eyebrow>
          <h2 className="mt-6 text-h3">
            Working with businesses across Florida.
          </h2>
        </div>

        <div className="lg:col-span-8">
          <ul className="flex flex-wrap gap-x-2 gap-y-2">
            {serviceAreas.map((area) => (
              <li key={area.city}>
                <Link
                  href={`/locations/${citySlug(area.city)}/`}
                  className="inline-flex rounded-pill border border-line px-4 py-2 text-small text-muted transition-colors hover:border-accent-dim hover:text-ink"
                >
                  {area.city}
                  <span className="sr-only">, {area.region}</span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/locations/"
            className="group mt-7 inline-flex items-center gap-2 text-small font-medium text-accent transition-colors hover:text-ink"
          >
            All locations
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </Section>
  );
}
