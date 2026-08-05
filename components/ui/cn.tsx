/**
 * Tiny class-name joiner. Deliberately not `clsx` — the site has no runtime
 * dependencies beyond React and this covers every case we actually have.
 */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}
