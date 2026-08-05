import { Container } from "@/components/ui/container";

/*
 * Client wordmark strip.
 *
 * These fifteen names are the client's own list of real clients. Logo files were
 * not supplied, so each name is typeset rather than imaged — a typeset wordmark
 * row is honest, stays sharp, and reflows on a phone. It also means there is no
 * <img> here to give a bad alt to.
 *
 * TODO: swap for real supplied logo artwork (SVG preferred). When that happens
 * each entry gains a `logo` path and an alt of "<Client name> logo"; the layout
 * below does not need to change.
 */
const CLIENTS = [
  "Bumble Bee Blinds",
  "i9 Sports",
  "iMold",
  "Xineering",
  "Renovation Depot",
  "Wildscape",
  "Fair Field Farms",
  "Paradise Dental",
  "Spinelabs",
  "Overtone",
  "DeBary",
  "Vision Technology Solutions",
  "WOW",
  "Southern Foam",
  "Enjuku Racing",
];

export function ClientWordmarks() {
  return (
    <section
      aria-labelledby="client-wordmarks-label"
      className="border-t border-line py-14 sm:py-16"
    >
      <Container>
        <p
          id="client-wordmarks-label"
          className="text-center font-mono text-eyebrow tracking-[0.22em] text-faint uppercase"
        >
          Trusted by Florida businesses and national e-commerce brands
        </p>

        <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-11">
          {CLIENTS.map((client) => (
            <li
              key={client}
              className="font-display text-[0.9375rem] leading-none font-semibold tracking-[-0.015em] text-faint transition-colors hover:text-muted"
            >
              {client}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
