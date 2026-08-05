import Link from "next/link";
import { cn } from "@/components/ui/cn";

/**
 * The BVS play mark, redrawn as vector from the supplied 612px PNG so it stays
 * crisp at 20px in the footer and 200px in a hero. Geometry (circle centre,
 * triangle bbox, corner radius) was measured off the original artwork.
 *
 * The circle is the exact brand blue, #000BEC. That is legitimate here — it is
 * a fill, not text — and the white triangle carries the contrast against a dark
 * canvas. The faint inner ring stops the disc dissolving into near-black.
 */
export function BvsMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={cn("block", className)}
    >
      <circle cx="256" cy="256" r="256" fill="#000BEC" />
      <circle
        cx="256"
        cy="256"
        r="254"
        fill="none"
        stroke="#7C8CFF"
        strokeOpacity="0.35"
        strokeWidth="4"
      />
      <path
        d="M178.4 138.5 L178.4 372.9 L384.5 256 Z"
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="28"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type LogoProps = {
  /** Where the lockup links to. Pass `null` to render a non-linking lockup. */
  href?: string | null;
  /** Hide the wordmark and show the mark alone. */
  markOnly?: boolean;
  className?: string;
  markClassName?: string;
};

/**
 * The wordmark is typeset rather than imaged. The supplied lockup PNGs carry a
 * drop shadow and a clipped "S", and live text stays sharp, selectable and
 * responsive — so only the mark comes from artwork.
 */
export function Logo({
  href = "/",
  markOnly = false,
  className,
  markClassName,
}: LogoProps) {
  const content = (
    <>
      <BvsMark className={cn("h-9 w-9 shrink-0", markClassName)} />
      {markOnly ? (
        <span className="sr-only">Business Video Solutions</span>
      ) : (
        <span className="font-display text-[0.9375rem] leading-none font-semibold tracking-[-0.02em] text-ink">
          Business Video Solutions
        </span>
      )}
    </>
  );

  const classes = cn(
    "group inline-flex items-center gap-3 rounded-md",
    className,
  );

  if (href === null) {
    return <span className={classes}>{content}</span>;
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
