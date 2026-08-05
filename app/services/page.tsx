import type { Metadata } from "next";
import { services, site } from "@/content/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { breadcrumbListSchema, graph, type SchemaNode } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs } from "@/components/services/breadcrumbs";
import { ProcessSteps } from "@/components/services/process-steps";
import { ServiceCard } from "@/components/services/service-card";
import { ServiceCta } from "@/components/services/service-cta";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

const PATH = "/services/";

export const metadata: Metadata = buildMetadata({
  title: "Video Marketing Services",
  description:
    "Video production, Meta ads, marketing automations, appointment setting and SEO for Florida businesses. Six services, each on its own page.",
  path: PATH,
});

/**
 * The services hub.
 *
 * This page replaces the live site's `/our-services/`, which stacked all six
 * services onto one URL and gave each an "Explore more" link that went nowhere.
 * One URL cannot rank for six different search intents, so the hub's job here is
 * narrow: say what the six are, say how they fit together, and hand every one of
 * them off to a page that can compete on its own terms.
 */
export default function ServicesPage() {
  const serviceList: SchemaNode = {
    "@type": "ItemList",
    "@id": `${absoluteUrl(PATH)}#services`,
    name: "Services",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: absoluteUrl(`/services/${service.slug}/`),
    })),
  };

  return (
    <>
      <JsonLd
        id="services-schema"
        data={graph(
          serviceList,
          breadcrumbListSchema(
            [{ name: "Home", path: "/" }, { name: "Services" }],
            { path: PATH },
          ),
        )}
      />

      <Section size="lg">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Services" }]}
        />

        <div className="mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Services</Eyebrow>

            <h1 className="mt-6 text-h1 text-ink">
              Video marketing services for Florida businesses
            </h1>
          </div>

          <div className="lg:col-span-5 lg:pt-16">
            <p className="text-lead text-muted">
              {site.tagline} We film the creative, build the ads it becomes,
              and set up the follow-up that catches what they bring in — then
              keep the site earning attention that costs nothing per click.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact/" size="lg">
                Book a Strategy Call
              </ButtonLink>
              <ButtonLink href="/work/" variant="secondary" size="lg">
                See the work
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section id="all-services" tone="surface" size="md" divided>
        <div className="max-w-copy">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-5 text-h2 text-ink">Six services, one engine</h2>
          <p className="mt-5 text-lead text-muted">
            Each one stands on its own, and each one makes the next one work
            harder. Production feeds the ads. The ads feed the automations. The
            automations fill the calendar. SEO keeps the whole thing running
            when the ad spend pauses.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={index}
            />
          ))}
        </div>
      </Section>

      <Section id="process" size="md">
        <div className="max-w-copy">
          <Eyebrow>Process</Eyebrow>
          <h2 className="mt-5 text-h2 text-ink">How we work</h2>
          <p className="mt-5 text-lead text-muted">
            The same five steps whether you come to us for one service or all
            six. Nothing gets filmed before we know what it has to do.
          </p>
        </div>

        <ProcessSteps className="mt-14" />
      </Section>

      <ServiceCta />
    </>
  );
}
