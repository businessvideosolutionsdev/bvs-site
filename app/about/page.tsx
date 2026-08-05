import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbListSchema,
  graph,
  organizationSchema,
  personSchemaFromContent,
} from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Approach } from "@/components/about/approach";
import { TeamGrid, teamMembers } from "@/components/about/team";

/*
 * /about/
 *
 * Every claim on this page comes from the client's own live site — the origin
 * story, the mission, the vision, the differentiator, the positioning line, the
 * five step names and all three bios. It has been tightened and given a
 * structure; nothing has been added to it. Where a fact does not exist (team
 * headshots, a founding date, awards, headcount, years-in-business figures) the
 * page simply does not have that element.
 */

const PATH = "/about/";

/*
 * The four disciplines they say they pulled into one process. Verbatim, in
 * their order. Rendered as a list rather than as prose because it is the single
 * clearest statement of what the company actually is.
 */
const DISCIPLINES = [
  "Video production",
  "Strategic advertising",
  "Marketing automation",
  "Performance analysis",
];

export const metadata: Metadata = buildMetadata({
  title: "About Us & How We Work",
  description:
    "Meet the Florida team behind Business Video Solutions: our mission, our five-step approach, and why we measure video by business results, not view counts.",
  path: PATH,
});

const schema = graph(
  organizationSchema(),
  breadcrumbListSchema([{ name: "Home", path: "/" }, { name: "About" }], {
    path: PATH,
  }),
  ...teamMembers.map((member) => personSchemaFromContent(member)),
);

export default function AboutPage() {
  const telHref = `tel:${site.phoneE164 || site.phone.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <JsonLd id="about-schema" data={schema} />

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
              About
            </li>
          </ol>
        </nav>

        <div className="mt-12 max-w-3xl">
          <Eyebrow>About us</Eyebrow>
          <h1 className="mt-6 text-h1 text-ink">
            A video company that measures itself in leads, not views
          </h1>
          <p className="mt-7 max-w-copy text-lead text-muted">
            Business Video Solutions is a video marketing agency in Casselberry,
            Florida. We started it after watching the same thing happen over and
            over: beautiful visuals alone don&rsquo;t consistently produce leads
            or sales.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <ButtonLink href="/contact/" size="lg">
            Book a strategy call
          </ButtonLink>
          <ButtonLink href="/work/" variant="secondary" size="lg">
            See the work
          </ButtonLink>
        </div>
      </Section>

      <Section id="why" tone="surface" size="lg" divided>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>Why we started</Eyebrow>
            <h2 className="mt-6 text-h2 text-ink">
              The gap we kept running into
            </h2>
          </div>

          <div className="lg:col-span-7">
            <blockquote className="border-l border-accent-dim pl-7">
              <p className="font-display text-h3 text-ink">
                Beautiful visuals alone don&rsquo;t consistently produce leads or
                sales.
              </p>
            </blockquote>

            <p className="mt-9 max-w-copy text-lead text-muted">
              So we stopped treating the video as the deliverable. Four things
              that most businesses buy from four different suppliers were pulled
              into a single process, run by one team, pointed at one outcome.
            </p>

            <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {DISCIPLINES.map((discipline) => (
                <li
                  key={discipline}
                  className="bg-surface px-6 py-5 text-small text-ink"
                >
                  {discipline}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-small text-muted">
              <Link
                href="/services/"
                className="text-accent underline decoration-accent-dim/60 underline-offset-4 transition-colors hover:decoration-accent"
              >
                See how those four fit together
              </Link>{" "}
              in the services we run.
            </p>
          </div>
        </div>
      </Section>

      <Section id="mission" size="lg" divided>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-xl border border-line bg-raised p-9 shadow-lift sm:p-11">
            <Eyebrow>Mission</Eyebrow>
            <p className="mt-7 text-lead text-ink">
              Help businesses grow by creating strategic video content and
              marketing systems that build trust, generate leads, and support
              long-term success.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-raised p-9 shadow-lift sm:p-11">
            <Eyebrow>Vision</Eyebrow>
            <p className="mt-7 text-lead text-ink">
              To become Florida&rsquo;s most trusted video marketing partner,
              helping businesses build cohesive, measurable growth strategies
              through creative thinking and data-informed decisions.
            </p>
          </div>
        </div>
      </Section>

      <Section id="difference" tone="surface" size="lg" divided>
        <div className="max-w-3xl">
          <Eyebrow>What makes us different</Eyebrow>
          <h2 className="mt-6 text-h2 text-ink">
            Most agencies give you &ldquo;pretty&rdquo; videos. We give you a
            visual engine for lead generation and e-commerce growth.
          </h2>
          <p className="mt-8 max-w-copy text-lead text-muted">
            We measure a video by the business results it helps create rather
            than by vanity metrics like view counts. Every project supports a
            larger business objective &mdash; which is why the only numbers on
            our{" "}
            <Link
              href="/work/"
              className="text-accent underline decoration-accent-dim/60 underline-offset-4 transition-colors hover:decoration-accent"
            >
              work page
            </Link>{" "}
            are ones clients gave us themselves, on camera.
          </p>
        </div>
      </Section>

      <Section id="approach" size="lg" divided>
        <div className="max-w-2xl">
          <Eyebrow>Our approach</Eyebrow>
          <h2 className="mt-6 text-h2 text-ink">Five steps, in this order</h2>
          <p className="mt-6 text-lead text-muted">
            The sequence matters more than any single stage. Skipping discovery
            is how a business ends up with a beautiful video that sells nothing.
          </p>
        </div>

        <div className="mt-14">
          <Approach />
        </div>
      </Section>

      <Section id="team" tone="surface" size="lg" divided>
        <div className="max-w-2xl">
          <Eyebrow>The team</Eyebrow>
          <h2 className="mt-6 text-h2 text-ink">Three people, three jobs</h2>
          <p className="mt-6 text-lead text-muted">
            Small on purpose. The person who plans the shoot, the person who runs
            the ads and the person who delivers the work all talk to each other
            daily.
          </p>
        </div>

        <div className="mt-16">
          <TeamGrid />
        </div>
      </Section>

      <Section id="studio" size="md" divided>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Eyebrow>The studio</Eyebrow>
            <h2 className="mt-6 text-h2 text-ink">Come and see us</h2>
            <address className="mt-8 flex flex-col gap-2 text-lead text-muted not-italic">
              <span>
                {site.address.streetAddress}
                <br />
                {site.address.addressLocality}, {site.address.addressRegion}{" "}
                {site.address.postalCode}
              </span>
              <a
                href={telHref}
                className="w-fit text-ink transition-colors hover:text-accent"
              >
                {site.phone}
              </a>
            </address>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-lead text-muted">
              We work with businesses across Florida, and we would rather start
              with a conversation about what you need to sell more of than with a
              quote for a video.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact/" size="lg">
                Book a strategy call
              </ButtonLink>
              <ButtonLink href="/services/" variant="secondary" size="lg">
                See what we do
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
