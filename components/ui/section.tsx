import type { ReactNode } from "react";
import { cn } from "@/components/ui/cn";
import { Container, type ContainerWidth } from "@/components/ui/container";

const tones = {
  canvas: "bg-canvas",
  surface: "bg-surface",
  raised: "bg-raised",
  none: "",
} as const;

/** Generous by default — whitespace is most of what reads as "expensive". */
const sizes = {
  sm: "py-16 sm:py-20",
  md: "py-20 sm:py-28",
  lg: "py-24 sm:py-32 lg:py-40",
} as const;

export type SectionProps = {
  id?: string;
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  /** Hairline along the top edge, for stacking bands of the same tone. */
  divided?: boolean;
  /** Skip the built-in Container when the section needs a full-bleed child. */
  bleed?: boolean;
  width?: ContainerWidth;
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  tone = "none",
  size = "md",
  divided = false,
  bleed = false,
  width = "shell",
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        tones[tone],
        sizes[size],
        divided && "border-t border-line",
        className,
      )}
    >
      {bleed ? children : <Container width={width}>{children}</Container>}
    </section>
  );
}
