import { cn } from "@/components/ui/cn";

/**
 * The "what's included" list on a service page.
 *
 * The same strings go into the Service JSON-LD as an OfferCatalog, so this list
 * and the structured data can never disagree — both read `service.includes`.
 */
export function IncludesList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <ul className={cn("grid gap-x-8 gap-y-4 sm:grid-cols-2", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-1 h-4 w-4 shrink-0 text-accent"
          >
            <path d="m4 12.5 5 5L20 6.5" />
          </svg>
          <span className="text-body text-muted">{item}</span>
        </li>
      ))}
    </ul>
  );
}
