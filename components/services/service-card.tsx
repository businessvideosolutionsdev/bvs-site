import Link from "next/link";
import type { Service } from "@/content/site";
import { cn } from "@/components/ui/cn";

export type ServiceCardProps = {
  service: Service;
  /** Zero-based position. Renders as a mono index (01, 02, ...) when supplied. */
  index?: number;
  /** Drops the index and the capability chips, for dense related-service rows. */
  compact?: boolean;
  className?: string;
};

/**
 * One service, as a card that links to its own page.
 *
 * The whole card is the link — a card with a separate "Explore more" anchor
 * gives the same destination two tab stops and a much smaller hit area on a
 * phone. The arrow is decorative and marked as such; the accessible name comes
 * from the heading text inside the anchor.
 */
export function ServiceCard({
  service,
  index,
  compact = false,
  className,
}: ServiceCardProps) {
  const chips = compact ? [] : service.includes.slice(0, 3);

  return (
    <Link
      href={`/services/${service.slug}/`}
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-line bg-raised p-7 shadow-lift sm:p-8",
        "transition-[border-color,transform,background-color] hover:-translate-y-0.5 hover:border-accent-dim/60 hover:bg-raised/80",
        className,
      )}
    >
      {index !== undefined && !compact && (
        <span aria-hidden="true" className="font-mono text-micro text-faint">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <h3
        className={cn(
          "text-h3 text-ink",
          index !== undefined && !compact ? "mt-5" : "",
        )}
      >
        {service.title}
      </h3>

      {service.summary && (
        <p className="mt-3 text-small text-muted">{service.summary}</p>
      )}

      {chips.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {chips.map((item) => (
            <li
              key={item}
              className="rounded-pill border border-line px-3 py-1 font-mono text-micro text-faint"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      <span className="mt-auto flex items-center gap-2 pt-8 text-small font-medium text-accent">
        View {service.title}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
