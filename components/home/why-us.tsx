import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

/*
 * Positioning + the three reasons to choose BVS.
 *
 * All copy here is the client's own, verbatim or lightly tightened for sentence
 * case. Three numbered lines rather than three icon cards: the numerals give the
 * section a rhythm without pretending an emoji is a diagram.
 */

const REASONS = [
  {
    title: "High-performing ad content",
    body: "Strategic video creatives engineered for engagement, clicks and conversions — not just views.",
  },
  {
    title: "Full-service support",
    body: "From storyboarding to campaign analytics, you get end-to-end production and marketing guidance.",
  },
  {
    title: "Real growth results",
    body: "We don't just capture attention — we help local businesses get found, get calls and get customers.",
  },
];

export function WhyUs() {
  return (
    <Section tone="canvas" size="lg">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>Why BVS</Eyebrow>
          <h2 className="mt-6 text-h2">
            A visual engine, not just pretty videos.
          </h2>
          <p className="mt-7 text-lead text-muted">
            Most agencies give you &ldquo;pretty&rdquo; videos. We give you a
            visual engine for lead generation and e-commerce growth. Based in
            Florida, our team combines the artistry of cinematic filmmaking with
            the raw data of Meta ad strategy.
          </p>
        </div>

        <div className="lg:col-span-7">
          <ol className="flex flex-col">
            {REASONS.map((reason, index) => (
              <li
                key={reason.title}
                className="grid gap-x-6 gap-y-3 border-t border-line py-8 first:border-t-0 first:pt-0 sm:grid-cols-[auto_1fr] sm:gap-x-8 sm:py-10 sm:first:pt-0"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-small text-accent tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="text-h3">{reason.title}</h3>
                  <p className="mt-3 max-w-copy text-body text-muted">
                    {reason.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
