# Technical SEO implementation

This branch implements the two BVS technical-audit workbooks reviewed in October 2026.

## Implemented locally

- Made public pages indexable and changed every generated canonical, Open Graph URL, sitemap entry and feed URL from the preview host to `https://businessvideosolutions.net`.
- Added a Worker that consolidates HTTP and `www` onto the HTTPS non-`www` canonical, preserves paths and query strings, redirects useful legacy URLs, and returns `410 Gone` for obsolete WordPress/feed URLs.
- Added durable `/services/`, `/service-areas/` and `/about/` destinations for the legacy redirects.
- Added `Referrer-Policy`, `X-Content-Type-Options` and the five-minute first HSTS rollout phase to every Worker response.
- Added descriptive text to content images and validation that prevents empty image descriptions from returning.
- Re-encoded testimonial thumbnails and added compressed WebP derivatives for the other flagged images. Original source photographs remain unchanged.
- Replaced the obsolete Meta Blueprint training link with its current path.

The canonical host is intentionally the non-`www` production domain. This differs from the second workbook's suggested `www` example but satisfies the underlying requirement: one HTTPS host, one self-canonical URL per page and permanent redirects from every alternate host.

## Required after publishing

1. Re-crawl production and confirm all public pages return `index,follow`, a self-canonical URL, and the three security headers.
2. Submit `https://businessvideosolutions.net/sitemap.xml` in Google Search Console and request indexing for the homepage, services, service areas, about, testimonials and blog hubs.
3. Verify forms, booking links, video playback and browser consoles before increasing HSTS beyond `max-age=300`.
4. Inventory every subdomain before considering HSTS `includeSubDomains` or preload.
5. Re-run the image crawl and confirm only the optimized derivatives are linked from public pages.

Publishing and Search Console submission are deliberately not performed by this local implementation.
