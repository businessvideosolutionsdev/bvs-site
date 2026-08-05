import type { ReactNode } from "react";
import { cn } from "@/components/ui/cn";

export type EyebrowProps = {
  /** Draws a short accent rule before the label. Reads as a chapter marker. */
  rule?: boolean;
  as?: "p" | "span" | "div";
  className?: string;
  children: ReactNode;
};

/**
 * The small tracked-out label that sits above a section heading. Mono, because
 * a timecode-ish label is what makes a production company's page look like a
 * production company's page rather than a template.
 */
export function Eyebrow({
  rule = true,
  as: Tag = "p",
  className,
  children,
}: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "flex items-center gap-3 font-mono text-eyebrow text-accent uppercase",
        className,
      )}
    >
      {rule && (
        <span
          aria-hidden="true"
          className="h-px w-8 shrink-0 bg-accent-dim/70"
        />
      )}
      {children}
    </Tag>
  );
}
