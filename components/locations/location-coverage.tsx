import Link from "next/link";
import { resolveNearby, type Location } from "@/content/locations";

export type LocationPlacesProps = {
  location: Location;
};

/**
 * The named districts, corridors and adjacent municipalities a city page covers.
 *
 * This is the most load-bearing list on the page for local search. "Fort Myers"
 * as a target is nearly useless without Cape Coral and Lehigh Acres beside it,
 * and "Jacksonville" without its districts is a 750-square-mile guess. Naming
 * the real geography is also what makes each page verifiably about somewhere.
 */
export function LocationPlaces({ location }: LocationPlacesProps) {
  return (
    <div className="rounded-2xl border border-line bg-raised p-8 shadow-lift">
      <h3 className="font-mono text-eyebrow text-faint uppercase">
        {location.placesLabel}
      </h3>
      <ul className="mt-6 flex flex-wrap gap-2">
        {location.places.map((place) => (
          <li
            key={place}
            className="rounded-pill border border-line-strong px-3.5 py-1.5 text-small text-muted"
          >
            {place}
          </li>
        ))}
      </ul>
    </div>
  );
}

export type LocationNearbyProps = {
  location: Location;
};

/**
 * Links to the neighbouring cities we also serve.
 *
 * Twelve orphaned city pages are twelve weak pages. Linking each one to the
 * cities it genuinely borders — and every one of them back to the studio page —
 * gives the section an internal shape that matches the actual geography rather
 * than a flat list dumped in a footer.
 */
export function LocationNearby({ location }: LocationNearbyProps) {
  const nearby = resolveNearby(location);

  if (nearby.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="font-mono text-eyebrow text-faint uppercase">
        Nearby markets we cover
      </h3>
      <ul className="mt-5 flex flex-col gap-px overflow-hidden rounded-xl border border-line bg-line">
        {nearby.map((item) => (
          <li key={item.href} className="bg-canvas">
            <Link
              href={item.href}
              className="group flex items-baseline justify-between gap-4 px-5 py-4 transition-colors hover:bg-raised"
            >
              <span className="text-small text-ink transition-colors group-hover:text-accent">
                {item.city}
              </span>
              <span className="font-mono text-micro text-faint">
                {item.eyebrow}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
