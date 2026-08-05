import Link from "next/link";
import { resolveServices, type Location } from "@/content/locations";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

export type LocationServicesProps = {
  location: Location;
  heading: string;
};

/**
 * Which of the six services lead in this market, and why.
 *
 * Two things are deliberate here. First, the set and the order differ per city —
 * Maitland leads with studio production and automation because B2B sells on
 * expertise and pipeline; Fort Myers leads with ads and appointment setting
 * because home services leads go cold in hours. Second, every card links to the
 * service page, which is the internal linking these pages exist to provide:
 * twelve city pages funnelling authority into six service pages.
 *
 * Service titles come from `services` in content/site.ts, never from a string
 * written here, so a renamed service cannot leave a stale label behind.
 */
export function LocationServices({ location, heading }: LocationServicesProps) {
  const focuses = resolveServices(location);

  if (focuses.length === 0) return null;

  return (
    <Section tone="surface" divided>
      <div className="max-w-copy">
        <Eyebrow>What we run here</Eyebrow>
        <h2 className="mt-6 text-h2">{heading}</h2>
      </div>

      <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {focuses.map((focus, index) => (
          <li key={focus.slug} className="bg-surface">
            <Link
              href={focus.href}
              className="group flex h-full flex-col p-8 transition-colors hover:bg-raised sm:p-10"
            >
              <span className="font-mono text-micro text-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-h4 text-ink transition-colors group-hover:text-accent">
                {focus.title}
              </h3>
              <p className="mt-3 text-small text-muted">{focus.why}</p>
              <span
                aria-hidden="true"
                className="mt-6 font-mono text-micro text-accent uppercase"
              >
                Explore the service
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-small text-muted">
        <Link
          href="/services/"
          className="text-accent underline underline-offset-4 transition-colors hover:text-ink"
        >
          See all six services
        </Link>{" "}
        — every one of them is available in this market, whether or not it leads
        the list above.
      </p>
    </Section>
  );
}
