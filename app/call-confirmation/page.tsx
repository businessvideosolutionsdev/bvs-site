import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MetaPixelEvent } from "@/components/meta-pixel-event";
import { VideoEmbed } from "@/components/video-embed";
import { buildMetadata } from "@/lib/seo";
import { adExamples, explainers, instagramUrl, testimonials } from "@/content/videos";

/**
 * Post-booking confirmation page.
 *
 * This route already exists on the live site and is linked from the GoHighLevel
 * booking flow, so it has to survive the cutover — without it, every person who
 * books a call lands on a 404 immediately after converting.
 *
 * It is `noindex` (enforced automatically via `noIndexPaths` in content/site.ts).
 * A confirmation page ranking for a brand query is a genuinely bad outcome, and
 * the live site currently has exactly that problem.
 */
export const metadata = buildMetadata({
  title: "Your consultation is confirmed",
  description:
    "Your strategy call with Business Video Solutions is booked. Watch this short briefing before we speak.",
  path: "/call-confirmation/",
  noIndex: true,
});

/**
 * The pre-call briefing video, hosted on the client's GoHighLevel CDN.
 *
 * Deliberately NOT reused anywhere else on the site — it addresses someone who
 * has already booked and would make no sense to a first-time visitor.
 */
const PRE_CALL_VIDEO =
  "https://assets.cdn.filesafe.space/IdYLiqd4MYC4lJv3ayal/media/6a3aad4cee187be6895545e2.mp4";

export default function CallConfirmationPage() {
  return (
    <>
      {/*
       * TODO: the Meta Pixel BASE script is not installed on this site yet. Until
       * it is, this event is a no-op and booked calls will not be attributed to
       * Meta ad spend. The old page fired this event, so tracking regresses at
       * cutover unless the base pixel is added (ideally in app/layout.tsx or via
       * a tag manager). Flagged for the client — needs their Pixel ID.
       */}
      <MetaPixelEvent event="Schedule" />

      <Container className="py-20 sm:py-28">
        <div className="mx-auto max-w-copy text-center">
          <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-raised px-4 py-2 text-small text-accent">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Your consultation is confirmed
          </span>

          <h1 className="mt-8 text-h1">
            Use this page to do your research on us
          </h1>

          <p className="mt-6 text-lead text-muted">
            To make the most of our time together, please review the materials
            below before our call.
          </p>
        </div>

        {/* Step 1 — the briefing video */}
        <section className="mt-20" aria-labelledby="briefing">
          <div className="mx-auto max-w-copy text-center">
            <Eyebrow as="p">Step one</Eyebrow>
            <h2 id="briefing" className="mt-4 text-h2">
              Watch this first
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-line bg-raised shadow-panel">
              <video
                className="aspect-video w-full"
                src={PRE_CALL_VIDEO}
                title="Pre-call briefing video"
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </section>

        {/* Step 2 — objection handling */}
        {explainers.length > 0 && (
          <section className="mt-24" aria-labelledby="questions">
            <div className="mx-auto max-w-copy text-center">
              <Eyebrow as="p">Step two</Eyebrow>
              <h2 id="questions" className="mt-4 text-h2">
                Get your questions answered
              </h2>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2">
              {explainers.map((video) => (
                <VideoEmbed
                  key={video.id}
                  id={video.id}
                  title={video.label ?? video.title}
                  vertical={video.vertical}
                  showTitle
                />
              ))}
            </div>
          </section>
        )}

        {/* Proof */}
        <section className="mt-24" aria-labelledby="testimonials">
          <div className="mx-auto max-w-copy text-center">
            <Eyebrow as="p">Real ROI. Real sales.</Eyebrow>
            <h2 id="testimonials" className="mt-4 text-h2">
              What our clients say
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((video) => (
              <VideoEmbed
                key={video.id}
                id={video.id}
                title={video.label ?? video.title}
                vertical={video.vertical}
                showTitle
              />
            ))}
          </div>
        </section>

        {/* Craft */}
        <section className="mt-24" aria-labelledby="ad-examples">
          <div className="mx-auto max-w-copy text-center">
            <Eyebrow as="p">The work</Eyebrow>
            <h2 id="ad-examples" className="mt-4 text-h2">
              Ad examples
            </h2>
            <p className="mt-4 text-muted">
              The level of quality we bring to your brand.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {adExamples.map((video) => (
              <VideoEmbed
                key={video.id}
                id={video.id}
                title={video.title}
                vertical={video.vertical}
              />
            ))}
          </div>
        </section>

        <div className="mt-24 text-center">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-xl border border-line bg-raised px-6 py-4 text-small transition-colors hover:border-line-strong"
          >
            <span className="text-ink">See more on Instagram</span>
            <span aria-hidden="true" className="text-accent">
              &rarr;
            </span>
          </a>
        </div>
      </Container>
    </>
  );
}
