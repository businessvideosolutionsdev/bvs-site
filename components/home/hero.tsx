import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { VideoEmbed } from "@/components/video-embed";
import { site } from "@/content/site";
import { explainers } from "@/content/videos";

/*
 * The hero.
 *
 * SEO note — this is the fix for the single worst finding in the audit. The live
 * site's <h1> reads "Your Entire Marketing Engine." while the visible headline
 * continues "...Built for Florida Businesses." The geo keyword sat outside the
 * heading, so the one element Google weights most heavily said nothing about
 * where the business operates. Here the whole line is the h1, and it is the only
 * h1 on the page.
 *
 * Copy is the client's own hero wording, tightened to sentence case. Nothing is
 * invented.
 */

const explainer = explainers.find((video) => !video.vertical);

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      {/*
       * A single soft brand light behind the headline. Decorative, so it is
       * hidden from assistive tech; it is a fill, never text.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-64 left-1/2 h-[46rem] w-[76rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,11,236,0.22),transparent)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="animate-rise lg:col-span-7">
            <Eyebrow>Florida video marketing agency</Eyebrow>

            <h1 className="mt-7 text-h1">
              Your entire marketing engine.{" "}
              <span className="text-accent">Built for Florida businesses.</span>
            </h1>

            <p className="mt-7 max-w-copy text-lead text-muted">
              Whether you&rsquo;re a service company or an e-commerce brand, we
              build everything: scripts, video, ads, automations, CRM and AI
              systems.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/contact/" size="lg">
                Book a Strategy Call
              </ButtonLink>
              <ButtonLink href="#client-results" variant="secondary" size="lg">
                Watch client results
              </ButtonLink>
            </div>

            <p className="mt-10 font-mono text-micro tracking-wide text-faint uppercase">
              {site.location}
              <span aria-hidden="true" className="mx-2 text-accent-dim">
                /
              </span>
              Serving businesses across Florida
            </p>
          </div>

          {explainer && (
            <div className="animate-fade lg:col-span-5">
              <VideoEmbed
                id={explainer.id}
                title={explainer.title}
                vertical={explainer.vertical}
              />
              <p className="mt-4 flex items-center gap-3 font-mono text-micro tracking-wide text-faint uppercase">
                <span
                  aria-hidden="true"
                  className="h-px w-6 shrink-0 bg-accent-dim/70"
                />
                {explainer.label ?? explainer.title}
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
