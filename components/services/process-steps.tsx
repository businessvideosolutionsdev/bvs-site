import { cn } from "@/components/ui/cn";

export type ProcessStep = {
  name: string;
  description: string;
};

/**
 * The real five-step engagement, in the client's own words.
 *
 * Exported so the hub page and any future page (a location page, a pitch deck
 * export) describe the same process in the same order. A process that is worded
 * differently in two places reads as two processes.
 */
export const PROCESS: ProcessStep[] = [
  {
    name: "Discovery",
    description:
      "We learn about your business, your audience, your goals and your current marketing efforts.",
  },
  {
    name: "Strategy",
    description:
      "We develop a creative and marketing plan tailored to your objectives.",
  },
  {
    name: "Production",
    description:
      "Our team creates professional content designed for your marketing channels.",
  },
  {
    name: "Launch",
    description:
      "Campaigns are prepared for advertising, websites, landing pages and social media.",
  },
  {
    name: "Optimization",
    description:
      "We monitor performance, identify opportunities and continue improving results.",
  },
];

/**
 * The process as a numbered list.
 *
 * A real `<ol>`, because the order is the point — a screen-reader user hears
 * "list item 3 of 5" and gets the same information the numerals give everyone
 * else. The rule above each step is decorative and drawn with a border rather
 * than a character so it never reaches the accessibility tree.
 */
export function ProcessSteps({ className }: { className?: string }) {
  return (
    <ol
      className={cn(
        "grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6",
        className,
      )}
    >
      {PROCESS.map((step, index) => (
        <li key={step.name} className="relative border-t border-line pt-6">
          {/* A short brand-blue tick over the hairline, marking the step. */}
          <span
            aria-hidden="true"
            className="absolute -top-px left-0 h-px w-10 bg-accent"
          />

          <span className="font-mono text-micro text-faint">
            {String(index + 1).padStart(2, "0")}
          </span>

          <h3 className="mt-4 text-h4 text-ink">{step.name}</h3>

          <p className="mt-2 text-small text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
