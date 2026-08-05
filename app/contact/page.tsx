import { BookingEmbed } from "@/components/booking-embed";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { breadcrumbListSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = buildMetadata({
  title: "Book a Strategy Call",
  description:
    "Book a video marketing strategy call with Business Video Solutions in Casselberry, FL. Talk through your goals, your audience and what video should do for you.",
  path: "/contact/",
});

const breadcrumbs = breadcrumbListSchema(
  [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact/" },
  ],
  { path: "/contact/" },
);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} id="contact-breadcrumbs" />

      <Container className="py-20 sm:py-28">
        <div className="max-w-copy">
          <Eyebrow as="p">Contact</Eyebrow>
          <h1 className="mt-4 text-h1">
            Book your <span className="text-accent">strategy call</span>
          </h1>
          <p className="mt-6 text-lead text-muted">
            Pick a time that suits you. We&rsquo;ll talk through your goals, who
            you&rsquo;re trying to reach, and what video actually needs to do for
            your business before anyone talks about cameras.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/*
           * The booking widget is the conversion action on this page, so it
           * leads. It is a cross-origin GoHighLevel iframe: our CSS cannot
           * reach inside it, and its appearance is controlled from the
           * calendar's own settings in GoHighLevel, not from this repo.
           */}
          <div className="lg:col-span-8">
            <BookingEmbed
              eager
              title="Book a video marketing strategy call"
            />
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-xl border border-line bg-raised p-7 shadow-lift">
              <h2 className="text-h4">Prefer to talk first?</h2>
              <p className="mt-3 text-small text-muted">
                Call or email us directly and we&rsquo;ll get back to you.
              </p>

              <dl className="mt-7 space-y-6">
                <div>
                  <dt className="text-eyebrow font-mono text-faint uppercase">
                    Phone
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`tel:${site.phoneE164}`}
                      className="text-ink transition-colors hover:text-accent"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-eyebrow font-mono text-faint uppercase">
                    Email
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${site.email}`}
                      className="break-all text-ink transition-colors hover:text-accent"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-eyebrow font-mono text-faint uppercase">
                    Studio
                  </dt>
                  <dd className="mt-2">
                    <address className="text-ink not-italic">
                      {site.address.streetAddress}
                      <br />
                      {site.address.addressLocality},{" "}
                      {site.address.addressRegion} {site.address.postalCode}
                    </address>
                  </dd>
                </div>

                {/*
                 * TODO: opening hours. Deliberately not shown and deliberately
                 * absent from the LocalBusiness schema — published hours that
                 * are wrong are worse than no hours, both for visitors turning
                 * up and for the Google Business Profile. Needs the client.
                 */}
              </dl>
            </div>

            {/*
             * TODO: the old site also had a general contact form (name, email,
             * phone, city, ZIP, subject, message, SMS consent). It is not
             * rebuilt here because a static export has no backend to receive a
             * POST, and the client has opted out of the API integration. If they
             * want the form back it needs an external endpoint — a GoHighLevel
             * inbound webhook is the natural choice given the CRM they already
             * run. Note the SMS consent checkbox is a compliance requirement,
             * not decoration, and must come back with it.
             */}
          </aside>
        </div>
      </Container>
    </>
  );
}
