import Link from "next/link";

export type Crumb = {
  label: string;
  /** Omit on the final crumb — the page the visitor is already on. */
  href?: string;
};

export type LocationBreadcrumbsProps = {
  items: Crumb[];
};

/**
 * The visible half of the breadcrumb trail.
 *
 * `breadcrumbListSchema()` emits the machine-readable half from the same array,
 * which matters: Google's guidance is that breadcrumb markup should describe a
 * trail the user can actually see. Two lists built from one source cannot drift.
 */
export function LocationBreadcrumbs({ items }: LocationBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-micro text-faint">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-line-strong">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
