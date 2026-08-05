import type { ReactNode } from "react";
import { cn } from "@/components/ui/cn";

const widths = {
  shell: "max-w-shell",
  copy: "max-w-copy",
  narrow: "max-w-narrow",
} as const;

export type ContainerWidth = keyof typeof widths;

export type ContainerProps = {
  /** `shell` is the page gutter, `copy` a readable measure, `narrow` for forms. */
  width?: ContainerWidth;
  className?: string;
  children: ReactNode;
};

/**
 * The single horizontal rhythm for the site. Every band of content sits inside
 * one of these so the header, footer and page sections stay in the same
 * vertical lines all the way down.
 */
export function Container({
  width = "shell",
  className,
  children,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        widths[width],
        className,
      )}
    >
      {children}
    </div>
  );
}
