import Link from "next/link";
import { services, site } from "@/content/site";
import { cn } from "@/components/ui/cn";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

/*
 * Icon artwork keyed by the `label` used in `site.social`. A profile only
 * renders if it appears in that list AND has artwork here, so an unrecognised
 * network is skipped rather than drawn as a blank tile.
 */
const SOCIAL_ICONS: Record<string, string> = {
  YouTube:
    "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3Z",
  Instagram:
    "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4Zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3Zm6.9-11.1a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5Z",
  LinkedIn:
    "M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3ZM10 9h3.8v1.7h.05a4.2 4.2 0 0 1 3.75-2c4 0 4.75 2.6 4.75 6V21h-4v-5.6c0-1.35 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v5.7h-4Z",
  Facebook:
    "M13.5 21v-8h2.6l.4-3h-3V8.1c0-.9.25-1.5 1.5-1.5H16.6V3.9A20 20 0 0 0 14.3 3.8c-2.3 0-3.8 1.4-3.8 3.9V10H8v3h2.5v8Z",
};

const linkClass =
  "inline-block rounded-md py-1 text-small text-muted transition-colors hover:text-ink";

/* Column headings. Quieter than `Eyebrow` — the footer should not shout. */
const headingClass = "font-mono text-eyebrow text-faint uppercase";

export function SiteFooter() {
  const { phone, email, address } = site;
  const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  /*
   * Services has its own column, so Company carries the rest of the primary
   * nav. Derived from `site.nav` so the header and footer cannot drift.
   */
  const companyLinks = site.nav.filter((item) => item.href !== "/services/");

  /* Real, verified profiles only — these are also emitted as schema `sameAs`. */
  const social = site.social.filter(
    (item) => item.href && SOCIAL_ICONS[item.label],
  );

  const positioning = site.tagline || site.description;

  return (
    <footer className="mt-auto border-t border-line bg-surface">
      {/* A single hairline of brand light — the only accent the footer needs. */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-accent-dim/50 to-transparent"
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo />

            {positioning && (
              <p className="mt-6 max-w-sm text-small text-muted">
                {positioning}
              </p>
            )}

            {social.length > 0 && (
              <ul className="mt-8 flex items-center gap-2">
                {social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      rel="noreferrer"
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border border-line",
                        "text-muted transition-colors hover:border-accent-dim hover:text-ink",
                      )}
                    >
                      <span className="sr-only">{item.label}</span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4.5 w-4.5"
                      >
                        <path d={SOCIAL_ICONS[item.label]} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-labelledby="footer-services" className="lg:col-span-3">
            <h2 id="footer-services" className={headingClass}>
              Services
            </h2>
            <ul className="mt-5 flex flex-col gap-1">
              {services.length > 0 ? (
                services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}/`}
                      className={linkClass}
                    >
                      {service.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link href="/services/" className={linkClass}>
                    All services
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company" className="lg:col-span-2">
            <h2 id="footer-company" className={headingClass}>
              Company
            </h2>
            <ul className="mt-5 flex flex-col gap-1">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className={headingClass}>Studio</h2>
            <address className="mt-5 flex flex-col gap-3 text-small text-muted not-italic">
              <span className="block">
                {address.streetAddress}
                <br />
                {address.addressLocality}, {address.addressRegion}{" "}
                {address.postalCode}
              </span>
              <a href={telHref} className="transition-colors hover:text-ink">
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="break-all transition-colors hover:text-ink"
              >
                {email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-micro text-faint">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-micro tracking-wide text-faint uppercase">
            {address.addressLocality}, Florida
          </p>
        </div>
      </Container>
    </footer>
  );
}
