import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Schibsted_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { graph, localBusinessSchema, webSiteSchema } from "@/lib/schema";
import "./globals.css";

/*
 * Three faces, one job each.
 *
 * Schibsted Grotesk — display. An editorial grotesk with real character in the
 *   a/g/R and a tall x-height, so headlines hold up at 96px without the
 *   default-template feel of Inter or Geist at large sizes.
 * Inter — text. Still the best-fitted screen face for 14-18px UI and body copy;
 *   it does the reading while the display face does the talking.
 * IBM Plex Mono — micro labels only (eyebrows, phone number, section markers).
 *   A tracked-out mono label is the detail that reads as "production company"
 *   rather than "small business template".
 *
 * The first two are variable fonts, so the whole weight range costs one file.
 */
const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/*
 * Sitewide structured data, emitted once here rather than per page.
 *
 * `localBusinessSchema()` deliberately reuses the Organization @id instead of
 * minting a second one, so Google sees ONE entity described fully — an
 * Organization that is also a LocalBusiness — rather than two competing records
 * for the same company. Page-level schema (Service, BreadcrumbList, FAQPage)
 * references this same @id from the individual pages.
 *
 * The live site has none of this today.
 */
const siteSchema = graph(localBusinessSchema(), webSiteSchema());

export const metadata: Metadata = {
  metadataBase: site.url ? new URL(site.url) : undefined,
  title: {
    default: site.name,
    template: `%s | ${site.shortName}`,
  },
  description: site.description || undefined,
  applicationName: site.name,
  icons: {
    /* `app/favicon.ico` is picked up by the file convention; this covers iOS. */
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#07080b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${schibstedGrotesk.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only rounded-pill focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand focus:px-5 focus:py-3 focus:text-small focus:font-medium focus:text-white"
        >
          Skip to content
        </a>

        <SiteHeader />

        {/*
         * The header is sticky rather than fixed and is transparent until the
         * page scrolls, so `main` needs no offset — a hero simply starts at the
         * top of its own band and the bar dissolves into it.
         */}
        <main id="main" className="flex-1">
          {children}
        </main>

        <SiteFooter />

        <JsonLd data={siteSchema} id="site-schema" />
      </body>
    </html>
  );
}
