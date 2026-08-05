import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

/**
 * Blog index.
 *
 * This route exists mainly so the `/blog-2/` redirect from the old WordPress
 * site has somewhere real to land. The old page was broken in a specific way
 * worth remembering: it carried a CONTACT page's title and meta description
 * ("Contact Us | Proven Video Marketing Agency Orlando, FL") above an H1 of
 * "Blog", and had no posts.
 *
 * It is `noIndex` and excluded from the sitemap while empty — an indexed page
 * with no content is thin content, which drags on sitewide quality signals.
 *
 * TODO when the first post ships: remove `noIndex` here, and add `/blog/` back
 * to `routes` in content/site.ts so it re-enters the sitemap.
 */
export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Notes on video marketing, Meta ads and lead generation from the Business Video Solutions team.",
  path: "/blog/",
  noIndex: true,
});

export default function BlogPage() {
  return (
    <Container className="py-20 sm:py-28">
      <div className="max-w-copy">
        <Eyebrow as="p">Blog</Eyebrow>
        <h1 className="mt-4 text-h1">Notes from the studio</h1>
        <p className="mt-6 text-lead text-muted">
          Nothing published yet. We&rsquo;d rather leave this empty than fill it
          with filler.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink href="/work/">See the work instead</ButtonLink>
          <Link
            href="/contact/"
            className="text-small text-muted transition-colors hover:text-ink"
          >
            Or book a strategy call &rarr;
          </Link>
        </div>
      </div>
    </Container>
  );
}
