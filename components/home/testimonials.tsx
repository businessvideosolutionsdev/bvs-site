import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { VideoEmbed } from "@/components/video-embed";
import { testimonials } from "@/content/videos";

/*
 * The reason this rebuild exists.
 *
 * On the live site these six videos appear only on /call-confirmation/ — the
 * page you reach *after* booking a call. The strongest trust asset the business
 * owns is shown exclusively to people who have already converted. Here it sits
 * directly under the hero, above the services, above everything else.
 */

type Attribution = {
  name?: string;
  role?: string;
  company?: string;
};

/*
 * Attribution by YouTube id. Only i9 Sports is named in the source material, so
 * only i9 Sports is named here — an invented name on a testimonial is fraud, not
 * a placeholder.
 *
 * TODO: the remaining five need a name, title and company from the client. Add
 * them to this map and the card renders them; no layout change is required. Once
 * every testimonial is attributed they also become eligible for Review schema,
 * which unattributed ones are not.
 */
const ATTRIBUTION: Record<string, Attribution> = {
  "mARd-XNChiE": { company: "i9 Sports" },
};

function attributionLine(attribution: Attribution | undefined): string | null {
  if (!attribution) return null;
  const parts = [attribution.name, attribution.role, attribution.company].filter(
    (part): part is string => Boolean(part && part.trim()),
  );
  return parts.length > 0 ? parts.join(", ") : null;
}

export function Testimonials() {
  return (
    <Section id="client-results" tone="surface" size="lg" divided>
      <div className="max-w-copy">
        <Eyebrow>Client testimonials</Eyebrow>
        <h2 className="mt-6 text-h2">Results, in our clients&rsquo; own words.</h2>
        <p className="mt-6 text-lead text-muted">
          Six clients, on camera, on what changed after we took over their video
          and their ad campaigns.
        </p>
      </div>

      <ul className="mx-auto mt-14 grid max-w-[64rem] gap-x-6 gap-y-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => {
          const attribution = attributionLine(ATTRIBUTION[testimonial.id]);

          return (
            <li key={testimonial.id} className="flex flex-col">
              <VideoEmbed
                id={testimonial.id}
                title={testimonial.title}
                vertical={testimonial.vertical}
              />

              <h3 className="mt-5 text-h4 text-ink">
                {testimonial.label ?? testimonial.title}
              </h3>

              {attribution ? (
                <p className="mt-2 font-mono text-micro tracking-wide text-accent uppercase">
                  {attribution}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="mt-16 flex flex-col items-start gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-copy text-body text-muted">
          Want to talk through what this would look like for your business?
        </p>
        <ButtonLink href="/contact/" size="lg">
          Book a Strategy Call
        </ButtonLink>
      </div>
    </Section>
  );
}
