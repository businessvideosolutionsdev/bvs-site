import Link from "next/link";
import type { Metadata } from "next";
import { adExamples, explainers, testimonials } from "@/content/videos";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbListSchema, graph, organizationSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { VideoEmbed } from "@/components/video-embed";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { AdGrid } from "@/components/work/ad-grid";
import { ProofStrip } from "@/components/work/proof-strip";
import { TestimonialGrid } from "@/components/work/testimonial-grid";
import { videoSchemaNodes } from "@/components/work/video-metadata";

/*
 * /work/ — the replacement portfolio.
 *
 * Nine WordPress theme-demo pages (a Porsche Macan film, Finlandia, a Paris
 * motorcycle dealership, one carrying "Copyright Ivory Productions GmbH") 301
 * here from /project/*. None of that work was ever the client's, and it was
 * roughly 60% of the indexed site.
 *
 * So this page is built exclusively from content/videos.ts: six real client
 * testimonials, six real ad examples and two real process videos, every ID
 * verified against the client's own YouTube channel. There are no invented
 * projects, briefs, clients, dates or outcomes on this page, and there is no
 * placeholder case study waiting to be filled in. A short honest portfolio is
 * the entire point of the rebuild — padding it recreates the problem.
 */

const PATH = "/work/";

export const metadata: Metadata = buildMetadata({
  title: "Our Work: Results & Ad Examples",
  description:
    "Client testimonials and vertical ad creative produced by Business Video Solutions for Florida businesses. Only our own work, including $3 leads for i9 Sports.",
  path: PATH,
});

const schema = graph(
  organizationSchema(),
  breadcrumbListSchema([{ name: "Home", path: "/" }, { name: "Work" }], {
    path: PATH,
  }),
  /*
   * Emits nothing until `videoFacts` in components/work/video-metadata.tsx has
   * a real uploadDate and description per video. See the TODO there — those two
   * fields are the only thing standing between this page and 14 VideoObjects.
   */
  ...videoSchemaNodes([...testimonials, ...adExamples, ...explainers], PATH),
);

export default function WorkPage() {
  return (
    <>
      <JsonLd id="work-schema" data={schema} />

      <Section size="lg">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-mono text-micro text-faint">
            <li>
              <Link href="/" className="transition-colors hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-muted">
              Work
            </li>
          </ol>
        </nav>

        <div className="mt-12 max-w-3xl">
          <Eyebrow>Work</Eyebrow>
          <h1 className="mt-6 text-h1 text-ink">
            Our work, and the clients who vouch for it
          </h1>
          <p className="mt-7 max-w-copy text-lead text-muted">
            A short portfolio, on purpose. Every video on this page was produced
            by Business Video Solutions for a real client &mdash; and six of them
            are the clients doing the talking.
          </p>
        </div>

        <p className="mt-10 max-w-copy border-l border-accent-dim/60 pl-6 text-small text-faint">
          No stock footage, no licensed showreel, no other studio&rsquo;s film.
          If it is on this page, we made it, and it is published on our own
          YouTube channel.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <ButtonLink href="/contact/" size="lg">
            Book a strategy call
          </ButtonLink>
          <ButtonLink href="/services/" variant="secondary" size="lg">
            See what we do
          </ButtonLink>
        </div>
      </Section>

      <Section id="results" tone="surface" size="md" divided>
        <Eyebrow>Client-reported results</Eyebrow>
        <h2 className="mt-6 max-w-2xl text-h2 text-ink">
          Two numbers, both traceable to a client saying them out loud
        </h2>
        <div className="mt-14">
          <ProofStrip />
        </div>
      </Section>

      <Section id="testimonials" size="lg" divided>
        <div className="max-w-2xl">
          <Eyebrow>Client testimonials</Eyebrow>
          <h2 className="mt-6 text-h2 text-ink">Six clients, in their own words</h2>
          <p className="mt-6 text-lead text-muted">
            The most useful thing we can show you is somebody else saying it.
            These six were filmed with businesses we work with across Florida.
          </p>
        </div>

        <div className="mt-16">
          <TestimonialGrid videos={testimonials} />
        </div>

        <p className="mt-14 max-w-copy text-micro text-faint">
          Only the i9 Sports testimonial names its business. We will not attach a
          name, job title or company to anyone who has not agreed to it, so the
          rest stay as they are until they do.
        </p>
      </Section>

      <Section id="ad-examples" tone="surface" size="lg" divided>
        <div className="max-w-2xl">
          <Eyebrow>Ad creative</Eyebrow>
          <h2 className="mt-6 text-h2 text-ink">
            Ads built for the feed, not for a showreel
          </h2>
          <p className="mt-6 text-lead text-muted">
            Vertical, sound-on, and cut to survive the first second of a scroll.
            This is the format we produce and run &mdash;{" "}
            <Link
              href="/services/"
              className="text-accent underline decoration-accent-dim/60 underline-offset-4 transition-colors hover:decoration-accent"
            >
              see how production and ads fit together
            </Link>
            .
          </p>
        </div>

        <div className="mt-16">
          <AdGrid videos={adExamples} />
        </div>
      </Section>

      <Section id="process" size="lg" divided>
        <div className="max-w-2xl">
          <Eyebrow>Working with us</Eyebrow>
          <h2 className="mt-6 text-h2 text-ink">What it actually looks like</h2>
          <p className="mt-6 text-lead text-muted">
            Two videos from our own channel: how we launch a brand-new client in
            month one, and how the shoots themselves run.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-8">
          {explainers.map((video) => (
            <article key={video.id}>
              <VideoEmbed
                id={video.id}
                title={video.title}
                vertical={video.vertical}
              />
              <h3 className="mt-5 text-h4 text-ink">
                {video.label ?? video.title}
              </h3>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="surface" size="md" divided>
        <div className="max-w-2xl">
          <h2 className="text-h2 text-ink">
            Want work like this with your name on it?
          </h2>
          <p className="mt-6 text-lead text-muted">
            Book a strategy call and we will walk through what we would film, who
            it would be aimed at, and where it would run.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact/" size="lg">
              Book a strategy call
            </ButtonLink>
            <ButtonLink href="/about/" variant="secondary" size="lg">
              Meet the team
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
