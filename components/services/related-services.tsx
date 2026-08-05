import Link from "next/link";
import { services } from "@/content/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { ServiceCard } from "@/components/services/service-card";

export type RelatedServicesProps = {
  /** Slugs of the services to surface, in the order they should appear. */
  slugs: string[];
  /** Current page's slug, filtered out defensively. */
  exclude?: string;
};

/**
 * The related-services band at the foot of a service page.
 *
 * This is the internal linking the old single-URL /our-services/ page could not
 * do: six services on one URL have nothing to link to each other with. Each
 * detail page now points at the two or three services a visitor on this page is
 * most likely to need next, which spreads crawl paths and internal authority
 * across all six instead of pooling it on one.
 */
export function RelatedServices({ slugs, exclude }: RelatedServicesProps) {
  const related = slugs
    .filter((slug) => slug !== exclude)
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is (typeof services)[number] => Boolean(service));

  if (related.length === 0) return null;

  return (
    <Section tone="surface" size="md" divided>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow>Related</Eyebrow>
          <h2 className="mt-5 text-h2 text-ink">Works well alongside</h2>
        </div>

        <Link
          href="/services/"
          className="rounded-md text-small font-medium text-accent transition-colors hover:text-ink"
        >
          All services
        </Link>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {related.map((service) => (
          <ServiceCard key={service.slug} service={service} compact />
        ))}
      </div>
    </Section>
  );
}
