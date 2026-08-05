import Link from "next/link";
import { cn } from "@/components/ui/cn";

export type Crumb = {
  label: string;
  /** Site-relative path with a trailing slash. Omit on the current page. */
  href?: string;
};

/**
 * The visible breadcrumb trail.
 *
 * Deliberately paired with `breadcrumbListSchema()` on every page that renders
 * it: Google's guidance is that breadcrumb markup should describe a trail the
 * visitor can actually see and click, and marking up a trail that only exists in
 * JSON is the kind of mismatch that gets the enhancement dropped.
 *
 * The final crumb is plain text with `aria-current="page"` — linking a page to
 * itself is noise for a screen-reader user working through the list.
 */
export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("font-mono text-micro", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="rounded-sm text-faint transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-muted">
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span aria-hidden="true" className="text-faint/50">
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
