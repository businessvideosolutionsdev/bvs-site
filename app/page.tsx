import type { Metadata } from "next";
import { AdReel } from "@/components/home/ad-reel";
import { ClientWordmarks } from "@/components/home/client-wordmarks";
import { CtaBand } from "@/components/home/cta-band";
import { HomeFaq, homeFaqs } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { ServiceAreas } from "@/components/home/service-areas";
import { ServicesOverview } from "@/components/home/services-overview";
import { Testimonials } from "@/components/home/testimonials";
import { WhyUs } from "@/components/home/why-us";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";
import { faqPageSchema, graph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

/*
 * Homepage.
 *
 * Section order is the argument the page makes: the offer, who already trusts
 * it, the proof, why us, what we sell, the work, the objections, where we work,
 * the ask. Proof sits second because the live site buries these six testimonials
 * on /call-confirmation/ — a page only reachable *after* booking. Moving them
 * above the fold-and-a-half is the point of this rebuild.
 *
 * Headings: exactly one <h1> (in `Hero`, carrying the geo keyword), then one
 * <h2> per section, then <h3> per item. No level is skipped.
 */

export const metadata: Metadata = buildMetadata({
  // 30 chars, so `withBrand` can still append " | Business Video Solutions"
  // and land at 57 — inside Google's ~60-character title budget.
  title: "Florida Video Marketing Agency",
  description: site.description,
  path: "/",
});

/*
 * FAQPage is built from the same `homeFaqs` array the section renders, so the
 * structured data can never describe questions the page does not show.
 *
 * Deliberately NOT emitted here: VideoObject for the testimonials and ad spots.
 * Google requires `uploadDate` and a real `description` on every VideoObject and
 * we have neither for these twelve videos — an invented upload date is a bad
 * structured-data claim, and an incomplete node is ignored anyway.
 * TODO: pull uploadDate + description per video from the YouTube Data API, then
 * add `youTubeVideoSchema()` nodes to this graph. That is the single highest-
 * value schema left on the site.
 */
const schema = graph(faqPageSchema(homeFaqs, { path: "/" }));

export default function Home() {
  return (
    <>
      <JsonLd id="home-schema" data={schema} />

      <Hero />
      <ClientWordmarks />
      <Testimonials />
      <WhyUs />
      <ServicesOverview />
      <AdReel />
      <HomeFaq />
      <ServiceAreas />
      <CtaBand />
    </>
  );
}
