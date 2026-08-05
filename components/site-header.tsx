"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

type NavItem = { href: string; label: string };

/*
 * TODO: these belong in content/site.ts (`site.nav`, `site.cta`, `site.phone`),
 * which is owned by another agent and is still empty. The header prefers those
 * values the moment they land and falls back to the agreed IA until then.
 * Every internal href keeps its trailing slash — `trailingSlash: true`.
 */
const FALLBACK_NAV: NavItem[] = [
  { href: "/services/", label: "Services" },
  { href: "/work/", label: "Work" },
  { href: "/locations/", label: "Locations" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

const FALLBACK_CTA: NavItem = {
  href: "/contact/",
  label: "Book a Strategy Call",
};

/** From the brief. TODO: drop once `site.phone` is filled in. */
const FALLBACK_PHONE = "(321) 415-4586";

const stripSlash = (path: string) =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const nav = site.nav.length > 0 ? site.nav : FALLBACK_NAV;
  const cta = site.cta ?? FALLBACK_CTA;
  const phone = site.phone || FALLBACK_PHONE;
  const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  const isActive = (href: string) => {
    const here = stripSlash(pathname);
    const there = stripSlash(href);
    if (there === "/") return here === "/";
    return here === there || here.startsWith(`${there}/`);
  };

  /*
   * Close the mobile menu on navigation, otherwise it covers the new page.
   * Adjusting state during render rather than in an effect — this is the
   * "derive state from props" pattern, and it avoids the extra committed
   * frame where the panel is still open over the page you just moved to.
   */
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  // The bar is transparent over the top of a hero and only materialises once
  // content starts passing underneath it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu is open: lock the page, close on Escape, and keep focus
  // inside the panel so a keyboard user cannot tab into the page behind it.
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === toggleRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color]",
        scrolled || open
          ? "border-b border-line bg-canvas/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6 lg:h-20">
        <Logo className="-m-1 p-1" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block rounded-md px-3.5 py-2 text-small font-medium transition-colors",
                      active ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3.5 bottom-0 h-px bg-accent transition-opacity",
                        active ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="hidden rounded-md px-3 py-2 font-mono text-small tracking-tight text-muted transition-colors hover:text-ink xl:block"
          >
            <span className="sr-only">Call us on </span>
            {phone}
          </a>

          <ButtonLink
            href={cta.href}
            size="sm"
            className="hidden sm:inline-flex"
          >
            {cta.label}
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="site-mobile-nav"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-muted transition-colors hover:text-ink lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="h-6 w-6"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M3.5 8h17M3.5 16h17" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/*
       * Rendered only while open, so the links never sit in the tab order of a
       * closed menu and the scroll lock and focus move stay in step with it.
       */}
      {open && (
        <div
          id="site-mobile-nav"
          ref={panelRef}
          className="fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto border-t border-line bg-canvas lg:hidden"
        >
          <Container className="flex min-h-full flex-col py-10">
            <nav aria-label="Primary (mobile)">
              <ul className="flex flex-col">
                {nav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href} className="border-b border-line/70">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between gap-4 py-5 font-display text-h3",
                          active ? "text-ink" : "text-muted",
                        )}
                      >
                        {item.label}
                        {active && (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-10 flex flex-col gap-4">
              <ButtonLink href={cta.href} size="lg" className="w-full">
                {cta.label}
              </ButtonLink>
              <a
                href={telHref}
                className="rounded-md py-2 text-center font-mono text-small text-muted"
              >
                <span className="sr-only">Call us on </span>
                {phone}
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
