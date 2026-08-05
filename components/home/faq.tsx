import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import type { FaqItem } from "@/lib/schema";

/*
 * FAQ.
 *
 * The five questions and answers are the client's own, verbatim (the only edit
 * is "i9 Sport" -> "i9 Sports", which is the client's actual name as it appears
 * in their own client list).
 *
 * Exported so `app/page.tsx` can feed the exact same strings to `faqPageSchema`.
 * Structured FAQ data must match what is visible on the page; deriving both from
 * one array makes drift impossible.
 *
 * Built on <details>/<summary>, so it opens and closes with no JavaScript, works
 * before hydration, and is findable by the browser's own in-page search.
 */
export const homeFaqs: FaqItem[] = [
  {
    question: "What types of businesses do you work with?",
    answer:
      "We specialize in working with Florida-based businesses and e-commerce brands that are ready to scale. Our client portfolio ranges from local service providers like i9 Sports and Paradise Dental to national e-commerce brands like Enjuku Racing.",
  },
  {
    question:
      "How is your virtual production studio different from traditional video production?",
    answer:
      "Our virtual production studio allows us to create premium, cinematic environments without the logistical costs and time constraints of traditional location shoots.",
  },
  {
    question: "Do you just create videos, or do you handle the advertising too?",
    answer:
      "We're a full-service solution. We don't just produce beautiful videos and hand them off — we engineer complete Meta Ad campaigns designed to convert.",
  },
  {
    question: "What kind of results can I expect from your video ads?",
    answer:
      "Our approach is performance-driven, focusing on metrics that matter: lower customer acquisition costs, increased conversion rates, and measurable ROI.",
  },
  {
    question: "What's the first step to working with you?",
    answer:
      "Start by booking a strategy call through our website. During this consultation, we'll discuss your business goals, current marketing challenges, target audience, and how our video-first approach can drive growth.",
  },
];

export function HomeFaq() {
  return (
    <Section id="faq" tone="surface" size="lg" divided>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-6 text-h2">
            Questions we get asked.
          </h2>
          <p className="mt-6 text-body text-muted">
            Anything not covered here, ask us on the call.
          </p>
          <ButtonLink href="/contact/" variant="secondary" className="mt-8">
            Book a Strategy Call
          </ButtonLink>
        </div>

        <div className="lg:col-span-8">
          <ul>
            {homeFaqs.map((faq) => (
              <li key={faq.question} className="border-b border-line">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-h4 text-ink transition-colors group-hover:text-accent">
                      {faq.question}
                    </h3>

                    {/* A plus that becomes a minus. Two rules, no icon font. */}
                    <span
                      aria-hidden="true"
                      className="relative mt-1.5 h-4 w-4 shrink-0 text-accent"
                    >
                      <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
                      <span className="absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>

                  <p className="max-w-copy pr-10 pb-7 text-body text-muted">
                    {faq.answer}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
