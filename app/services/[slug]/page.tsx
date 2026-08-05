import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/content/site";
import { adExamples, explainers, type Video } from "@/content/videos";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbListSchema,
  graph,
  serviceSchemaFromContent,
} from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { VideoEmbed } from "@/components/video-embed";
import { Breadcrumbs } from "@/components/services/breadcrumbs";
import { IncludesList } from "@/components/services/includes-list";
import { RelatedServices } from "@/components/services/related-services";
import { ServiceCta } from "@/components/services/service-cta";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

/**
 * One page per service.
 *
 * The live site sells six services from a single `/our-services/` URL. A URL can
 * only be the best answer to one question, so that page competes with itself six
 * ways and wins none of them. Everything below exists to give each service its
 * own URL, its own title, its own description and its own Service markup.
 *
 * Page-level copy lives in this file rather than in `content/site.ts`: the
 * shared content module holds what other modules read (the summary, the detail
 * line, the offer list), while titles, section prose and cross-links are
 * decisions about this template and belong next to it.
 */

const inlineLink =
  "rounded-sm text-accent underline decoration-accent-dim/60 underline-offset-4 transition-colors hover:text-ink hover:decoration-accent";

type ServicePageCopy = {
  /** Bare title — `buildMetadata` appends the brand when it still fits 60 chars. */
  metaTitle: string;
  metaDescription: string;
  /** h2 for the main prose band. */
  bodyHeading: string;
  /** Paragraphs following the client's own `detail` line. */
  body: ReactNode[];
  /** Optional video band, built from verified assets in content/videos.ts. */
  media?: {
    heading: string;
    lead: string;
    videos: Video[];
    /** Columns at the widest breakpoint. Vertical creative wants three. */
    columns: 2 | 3;
  };
  /** Slugs for the related band, most relevant first. */
  related: string[];
  ctaHeading: string;
};

const servicePages: Record<string, ServicePageCopy> = {
  "meta-ads-production": {
    metaTitle: "Meta Video Ads Production",
    metaDescription:
      "Facebook and Instagram video ads produced to stop the scroll and drive action. Vertical creative built to generate leads and sales for Florida businesses.",
    bodyHeading: "Ads made for the feed, not repurposed for it",
    body: [
      "The first second decides whether the other twenty are ever seen. A Meta ad is watched on a phone, held vertically, in a feed that scrolls whether or not you earned the stop — so that is where the craft goes: the opening frame, the first line, the reason to stay.",
      "That makes ad creative a different job from a brand film. It is shot vertically, cut short, and built around a single clear ask rather than a tour of everything the business does.",
      <>
        Every ad is produced with the outcome in mind — generating leads and
        driving sales, not collecting views. What happens after the click
        matters just as much, which is why this usually runs alongside{" "}
        <Link href="/services/marketing-automations/" className={inlineLink}>
          marketing automations
        </Link>{" "}
        and{" "}
        <Link href="/services/appointment-setting/" className={inlineLink}>
          appointment setting
        </Link>
        .
      </>,
    ],
    media: {
      heading: "Ad creative we've produced",
      lead: "Vertical creative made for Facebook and Instagram feeds.",
      videos: adExamples,
      columns: 3,
    },
    related: [
      "studio-production",
      "marketing-automations",
      "appointment-setting",
    ],
    ctaHeading: "Let's talk about what you want to run.",
  },

  "studio-production": {
    metaTitle: "Studio Video Production Florida",
    metaDescription:
      "Professional video production in our Florida studio: commercials, promos, educational content and social assets, plus virtual production environments.",
    bodyHeading: "A room built for it, and a set that can be anything",
    body: [
      "Shoots run in our own fully equipped studio, with professional lighting and sound already rigged. A controlled room means the picture and the audio match from the first take to the last, and a shoot day stays a shoot day.",
      "The virtual production studio is what changes the arithmetic. It allows us to create premium, cinematic environments without the logistical costs and time constraints of traditional location shoots — so the look of a scene becomes a creative decision rather than a scheduling problem.",
      <>
        One session produces more than one thing: the commercial, the shorter
        cuts, the educational pieces and the social media assets that carry the
        brand between campaigns. Most of what we film ends up running as{" "}
        <Link href="/services/meta-ads-production/" className={inlineLink}>
          Meta ads
        </Link>
        .
      </>,
    ],
    media: {
      heading: "Inside the work",
      lead: "How a new client's first month of filming runs, and how we shoot social ads.",
      videos: explainers,
      columns: 2,
    },
    related: ["meta-ads-production", "marketing-automations", "website-seo"],
    ctaHeading: "Let's talk about what you want to film.",
  },

  "marketing-automations": {
    metaTitle: "Marketing Automation and CRM",
    metaDescription:
      "Marketing automation that turns new leads into loyal customers: CRM integration, personalized follow-up sequences and automated customer communication.",
    bodyHeading: "The part that runs while you're working",
    body: [
      "A lead that waits is a lead that cools. Automation means the first reply goes out the moment someone raises their hand, the follow-up continues after that, and none of it depends on anybody remembering to send it.",
      "Your CRM sits at the center of it. Every inquiry is recorded, every conversation lives in one place, and follow-up sequences are personalized to what the person actually asked about rather than blasted to everyone on the list.",
      <>
        This is where advertising stops leaking. Traffic from{" "}
        <Link href="/services/meta-ads-production/" className={inlineLink}>
          Meta ads
        </Link>{" "}
        and from{" "}
        <Link href="/services/website-seo/" className={inlineLink}>
          search
        </Link>{" "}
        both land in the same system, so no lead is treated as a one-off.
      </>,
    ],
    related: [
      "appointment-setting",
      "meta-ads-production",
      "studio-production",
    ],
    ctaHeading: "Let's talk about what happens after the lead arrives.",
  },

  "appointment-setting": {
    metaTitle: "Appointment Setting Services",
    metaDescription:
      "Convert interest into qualified business opportunities with a streamlined appointment-setting process: lead qualification and direct meeting scheduling.",
    bodyHeading: "Interest is not the same as an opportunity",
    body: [
      "Inquiries are qualified before they reach you, so the meetings on your calendar are with people who fit what you actually sell — not everyone who happened to click.",
      "Scheduling happens directly. No thread that dies after two replies, no chasing a time that suits both parties. The outcome is a calendar of real conversations rather than a list of names to work through.",
      <>
        It sits directly on top of{" "}
        <Link href="/services/marketing-automations/" className={inlineLink}>
          marketing automations
        </Link>
        : the automated follow-up keeps the conversation alive, and qualification
        decides which of those conversations is worth your time.
      </>,
    ],
    related: ["marketing-automations", "meta-ads-production", "local-seo"],
    ctaHeading: "Let's talk about filling your calendar.",
  },

  "website-seo": {
    metaTitle: "Website SEO Services",
    metaDescription:
      "Improve visibility where your customers search. On-page SEO, content optimization, technical improvements and internal linking, built for long-term growth.",
    bodyHeading: "On the page, and underneath it",
    body: [
      "It starts on the page: the titles, headings and copy that tell a search engine what a page is for, and content that answers what someone actually typed rather than what we wish they had.",
      "Underneath that sits the technical side — how the site is structured, how quickly it loads, and how its pages link to one another so that authority reaches the pages that need it instead of pooling on the homepage.",
      <>
        Search does not stop when the ad budget does, which is why it belongs
        next to your{" "}
        <Link href="/services/meta-ads-production/" className={inlineLink}>
          Meta ads
        </Link>{" "}
        rather than instead of them. If your customers are nearby,{" "}
        <Link href="/services/local-seo/" className={inlineLink}>
          local SEO
        </Link>{" "}
        is the other half of the job.
      </>,
    ],
    related: ["local-seo", "marketing-automations", "studio-production"],
    ctaHeading: "Let's talk about what your site should be ranking for.",
  },

  "local-seo": {
    metaTitle: "Local SEO Services in Florida",
    metaDescription:
      "Connect with customers in your service area. Local SEO covering website optimization, Google Business Profile and consistent local listings across Florida.",
    bodyHeading: "How you show up in your own service area",
    body: [
      "Local search runs on its own logic. The map results lean heavily on your Google Business Profile and on whether the rest of the web agrees about who you are, where you are and how to reach you.",
      "So the work runs on both sides at once: your website optimized for the places you serve, your Google Business Profile kept complete and current, and your local listings consistent everywhere they appear.",
      <>
        It shares its foundations with{" "}
        <Link href="/services/website-seo/" className={inlineLink}>
          website SEO
        </Link>{" "}
        — same site, same technical groundwork, aimed at a searcher who is
        nearby and ready.
      </>,
    ],
    related: ["website-seo", "appointment-setting", "meta-ads-production"],
    ctaHeading: "Let's talk about how you show up locally.",
  },
};

type ServiceParams = { slug: string };

/**
 * Required. Under `output: "export"` there is no server to render an unlisted
 * slug on demand, so a dynamic route without this fails the build outright.
 */
export function generateStaticParams(): ServiceParams[] {
  return services.map((service) => ({ slug: service.slug }));
}

/** Only the six slugs above exist. Anything else is a 404, not a render. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<ServiceParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  const copy = servicePages[slug];

  if (!service || !copy) return {};

  return buildMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: `/services/${slug}/`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<ServiceParams>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  const copy = servicePages[slug];

  if (!service || !copy) notFound();

  const path = `/services/${service.slug}/`;

  return (
    <>
      <JsonLd
        id={`service-schema-${service.slug}`}
        data={graph(
          serviceSchemaFromContent(service),
          breadcrumbListSchema(
            [
              { name: "Home", path: "/" },
              { name: "Services", path: "/services/" },
              { name: service.title },
            ],
            { path },
          ),
        )}
      />

      <Section size="lg">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services/" },
            { label: service.title },
          ]}
        />

        <div className="mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Service</Eyebrow>

            {/* The one h1 on the page, and it names the service exactly. */}
            <h1 className="mt-6 text-h1 text-ink">{service.title}</h1>

            <p className="mt-7 text-lead text-ink">{service.summary}</p>
          </div>

          <div className="lg:col-span-5 lg:pt-24">
            <p className="text-body text-muted">{service.detail}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact/" size="lg">
                Book a Strategy Call
              </ButtonLink>
              <ButtonLink href="/services/" variant="secondary" size="lg">
                All services
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface" size="md" divided>
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-h2 text-ink">{copy.bodyHeading}</h2>

            <div className="mt-8 flex flex-col gap-6 text-body text-muted">
              {copy.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-line bg-raised p-7 shadow-lift sm:p-8">
              <h2 className="font-mono text-eyebrow text-faint uppercase">
                What&apos;s included
              </h2>
              <IncludesList
                items={service.includes}
                className="mt-7 sm:grid-cols-1"
              />
            </div>
          </div>
        </div>
      </Section>

      {copy.media && copy.media.videos.length > 0 && (
        <Section size="md">
          <div className="max-w-copy">
            <Eyebrow>Watch</Eyebrow>
            <h2 className="mt-5 text-h2 text-ink">{copy.media.heading}</h2>
            <p className="mt-5 text-lead text-muted">{copy.media.lead}</p>
          </div>

          <div
            className={
              copy.media.columns === 3
                ? "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                : "mt-14 grid gap-8 md:grid-cols-2"
            }
          >
            {copy.media.videos.map((video) => (
              <VideoEmbed
                key={video.id}
                id={video.id}
                title={video.label ?? video.title}
                vertical={video.vertical}
                showTitle
              />
            ))}
          </div>
        </Section>
      )}

      <RelatedServices slugs={copy.related} exclude={service.slug} />

      <ServiceCta heading={copy.ctaHeading} />
    </>
  );
}
