import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { services } from "@/content/site";

/*
 * The six service lines, rendered straight from `content/site.ts`.
 *
 * The names are verified; the `summary` fields are still empty while the copy is
 * written. Each card therefore renders its summary only when there is one — an
 * empty paragraph is invisible, whereas a placeholder sentence would ship a
 * plausible-sounding lie about what the business sells. When the copy lands the
 * cards fill in with no change here.
 */

export function ServicesOverview() {
  if (services.length === 0) return null;

  return (
    <Section id="services" tone="surface" size="lg" divided>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-copy">
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-6 text-h2">
            Everything the engine needs, under one roof.
          </h2>
        </div>

        <Link
          href="/services/"
          className="group inline-flex shrink-0 items-center gap-2 text-small font-medium text-accent transition-colors hover:text-ink"
        >
          All services
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          >
            &rarr;
          </span>
        </Link>
      </div>

      <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <li key={service.slug} className="bg-canvas">
            <Link
              href={`/services/${service.slug}/`}
              className="group flex h-full flex-col p-7 transition-colors hover:bg-raised sm:p-8"
            >
              <span
                aria-hidden="true"
                className="font-mono text-micro text-faint tabular-nums transition-colors group-hover:text-accent"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-6 text-h4 text-ink">{service.title}</h3>

              {service.summary ? (
                <p className="mt-3 text-small text-muted">{service.summary}</p>
              ) : null}

              <span
                aria-hidden="true"
                className="mt-8 text-small text-faint transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-accent"
              >
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
