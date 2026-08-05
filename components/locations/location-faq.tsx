import type { LocationFaq } from "@/content/locations";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

export type LocationFaqsProps = {
  city: string;
  faqs: LocationFaq[];
};

/**
 * Questions a buyer in this city would actually ask.
 *
 * Rendered as a plain definition list rather than collapsed `<details>`: the
 * matching FAQPage markup is only legitimate when the answers are visible on
 * the page, and hidden-by-default answers also cost the one thing an FAQ is
 * good for here, which is being read.
 *
 * On the six statewide pages one of these questions is always some form of
 * "do you have an office here", answered no. That is not modesty — a location
 * page that lets a visitor assume a local office is the exact thing that gets
 * a service-area business into trouble with Google and with customers.
 */
export function LocationFaqs({ city, faqs }: LocationFaqsProps) {
  if (faqs.length === 0) return null;

  return (
    <Section tone="surface" divided>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-6 text-h3">
            What businesses in {city} usually ask first
          </h2>
        </div>

        <dl className="flex flex-col lg:col-span-8">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="border-t border-line py-8 first:border-t-0 first:pt-0"
            >
              <dt className="text-h4 text-ink">{faq.question}</dt>
              <dd className="mt-3 max-w-copy text-body text-muted">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
