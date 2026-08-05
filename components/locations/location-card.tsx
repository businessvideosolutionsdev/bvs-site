import Link from "next/link";
import { locationPath, type Location } from "@/content/locations";
import { cn } from "@/components/ui/cn";

export type LocationCardProps = {
  location: Location;
  /** The studio card is visually promoted — it is the one address we have. */
  featured?: boolean;
};

/**
 * A city on the hub.
 *
 * Each card shows an authored one-liner rather than a truncated opening
 * sentence. That is a deliberate cost: twelve near-identical cards would tell a
 * visitor that these are twelve near-identical pages, and they would be right
 * to believe it. The distance line under each is the second differentiator —
 * it answers "will anyone actually come here" before the click.
 */
export function LocationCard({ location, featured = false }: LocationCardProps) {
  return (
    <li className="bg-canvas">
      <Link
        href={locationPath(location.slug)}
        className={cn(
          "group flex h-full flex-col p-8 transition-colors hover:bg-raised sm:p-9",
          featured && "bg-raised/60",
        )}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-h3 text-ink transition-colors group-hover:text-accent">
            {location.city}
          </h3>
          {featured && (
            <span className="rounded-pill bg-brand px-3 py-1 font-mono text-micro text-white uppercase">
              Studio
            </span>
          )}
        </div>

        <p className="mt-2 font-mono text-micro text-faint uppercase">
          {location.county}
        </p>

        <p className="mt-5 flex-1 text-small text-muted">{location.cardLine}</p>

        <p className="mt-6 border-t border-line pt-5 text-micro text-faint">
          {location.travel.label}
        </p>
      </Link>
    </li>
  );
}
