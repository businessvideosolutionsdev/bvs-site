const CANONICAL_HOST = 'businessvideosolutions.net';
const securityHeaders = {
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // Start with the audit's short first phase. Increase only after production verification.
  'Strict-Transport-Security': 'max-age=300',
  'X-Content-Type-Options': 'nosniff',
};

const legacyRedirects = new Map([
  ['/about-us', '/about/'],
  ['/about-2', '/about/'],
  ['/maitland-fl', '/service-areas/'],
  ['/casselberry-fl', '/service-areas/'],
  ['/lake-mary-fl', '/service-areas/'],
  ['/sanford-fl', '/service-areas/'],
  ['/altamonte-springs', '/service-areas/'],
  ['/winter-park-fl', '/service-areas/'],
  ['/meta-ads-production-orlando', '/services/'],
  ['/services/social-media-content-creation-orlando', '/services/'],
  ['/appointment-setting-orlando', '/services/'],
  ['/marketing-automation-orlando', '/services/'],
  ['/services/meta-ads-production-orlando', '/services/'],
  ['/studio-video-production-orlando', '/services/'],
  ['/meta-ads-production', '/services/'],
  ['/lead-generation-ecommerce-ads-orlando', '/services/'],
  ['/studio-production-orlando', '/services/'],
  ['/project/ivory-fly-style', '/testimonials/'],
]);

const removedPaths = new Set([
  '/*',
  '/2021/07/06/products',
  '/comments/feed',
  '/feed',
  '/category/cinema',
  '/category/urban/feed',
  '/2019/10/31/post-with-gallery/feed',
]);

const normalizePath = pathname => pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

function secure(response) {
  const secured = new Response(response.body, response);
  for (const [name, value] of Object.entries(securityHeaders)) secured.headers.set(name, value);
  return secured;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isBvsHost = url.hostname === CANONICAL_HOST || url.hostname === `www.${CANONICAL_HOST}`;

    if (isBvsHost && (url.protocol !== 'https:' || url.hostname !== CANONICAL_HOST)) {
      url.protocol = 'https:';
      url.hostname = CANONICAL_HOST;
      return secure(Response.redirect(url, 301));
    }

    const path = normalizePath(url.pathname);
    const destination = legacyRedirects.get(path);
    if (destination) {
      return secure(Response.redirect(new URL(destination, url.origin), 301));
    }

    if (removedPaths.has(path) || path.startsWith('/wp-')) {
      return secure(new Response('This legacy URL is permanently gone.', {
        status: 410,
        headers: {
          'Cache-Control': 'public, max-age=3600',
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Robots-Tag': 'noindex',
        },
      }));
    }

    return secure(await env.ASSETS.fetch(request));
  },
};
