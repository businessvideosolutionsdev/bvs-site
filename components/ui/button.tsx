import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/components/ui/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-sans font-medium " +
  "whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  /* Brand blue is a fill here, with white text — the 9.3:1 pairing. */
  primary:
    "bg-brand text-white shadow-brand hover:bg-brand-strong focus-visible:outline-accent",
  secondary:
    "border border-line-strong bg-white/[0.03] text-ink hover:border-accent-dim hover:bg-white/[0.06]",
  ghost: "text-muted hover:bg-white/[0.05] hover:text-ink",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-small",
  md: "h-11 px-5 text-small",
  lg: "h-13 px-7 text-body",
};

export type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

/**
 * Exported so a component that has to render its own element (a form submit
 * inside a wrapper, a nav item) can still look exactly like a Button.
 */
export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleProps = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

export type ButtonProps = ButtonStyleProps & {
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

/** A real `<button>`. Use for anything that acts, not navigates. */
export function Button({
  variant,
  size,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}

export type ButtonLinkProps = ButtonStyleProps & {
  href: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">;

/**
 * A link that looks like a button. Internal hrefs go through `next/link` for
 * client navigation; mailto/tel/external fall back to a plain anchor and pick
 * up `rel="noreferrer"` automatically.
 */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = buttonClass({ variant, size, className });
  const isExternal = /^(https?:|mailto:|tel:|#)/.test(href);

  if (isExternal) {
    const isHttp = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        rel={isHttp ? "noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
