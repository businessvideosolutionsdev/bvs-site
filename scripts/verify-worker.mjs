import assert from 'node:assert/strict';
import worker from '../src/worker.js';

const assetRequests = [];
const env = {
  ASSETS: {
    fetch(request) {
      assetRequests.push(request.url);
      return new Response('asset', { status: 200 });
    },
  },
};

async function request(url) {
  return worker.fetch(new Request(url), env);
}

function assertSecurityHeaders(response, source) {
  assert.equal(response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin', `${source}: referrer policy`);
  assert.equal(response.headers.get('strict-transport-security'), 'max-age=300', `${source}: phased HSTS`);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff', `${source}: MIME sniffing disabled`);
}

for (const [source, target] of [
  ['https://businessvideosolutions.net/about-us/', 'https://businessvideosolutions.net/about/'],
  ['https://businessvideosolutions.net/about-2/', 'https://businessvideosolutions.net/about/'],
  ['https://businessvideosolutions.net/maitland-fl/', 'https://businessvideosolutions.net/service-areas/'],
  ['https://businessvideosolutions.net/casselberry-fl/', 'https://businessvideosolutions.net/service-areas/'],
  ['https://businessvideosolutions.net/lake-mary-fl/', 'https://businessvideosolutions.net/service-areas/'],
  ['https://businessvideosolutions.net/sanford-fl/', 'https://businessvideosolutions.net/service-areas/'],
  ['https://businessvideosolutions.net/altamonte-springs/', 'https://businessvideosolutions.net/service-areas/'],
  ['https://businessvideosolutions.net/winter-park-fl/', 'https://businessvideosolutions.net/service-areas/'],
  ['https://businessvideosolutions.net/meta-ads-production-orlando', 'https://businessvideosolutions.net/services/'],
  ['https://businessvideosolutions.net/services/social-media-content-creation-orlando/', 'https://businessvideosolutions.net/services/'],
  ['https://businessvideosolutions.net/appointment-setting-orlando/', 'https://businessvideosolutions.net/services/'],
  ['https://businessvideosolutions.net/marketing-automation-orlando/', 'https://businessvideosolutions.net/services/'],
  ['https://businessvideosolutions.net/services/meta-ads-production-orlando/', 'https://businessvideosolutions.net/services/'],
  ['https://businessvideosolutions.net/studio-video-production-orlando/', 'https://businessvideosolutions.net/services/'],
  ['https://businessvideosolutions.net/meta-ads-production/', 'https://businessvideosolutions.net/services/'],
  ['https://businessvideosolutions.net/lead-generation-ecommerce-ads-orlando/', 'https://businessvideosolutions.net/services/'],
  ['https://businessvideosolutions.net/studio-production-orlando/', 'https://businessvideosolutions.net/services/'],
  ['https://businessvideosolutions.net/project/ivory-fly-style/', 'https://businessvideosolutions.net/testimonials/'],
]) {
  const response = await request(source);
  assert.equal(response.status, 301, `${source}: permanent redirect`);
  assert.equal(response.headers.get('location'), target, `${source}: expected destination`);
  assertSecurityHeaders(response, source);
}

for (const source of [
  'https://businessvideosolutions.net/feed/',
  'https://businessvideosolutions.net/comments/feed/',
  'https://businessvideosolutions.net/category/cinema/',
  'https://businessvideosolutions.net/category/urban/feed/',
  'https://businessvideosolutions.net/2019/10/31/post-with-gallery/feed/',
  'https://businessvideosolutions.net/2021/07/06/products/',
  'https://businessvideosolutions.net/wp-content/plugins/example/plugin.js',
  'https://businessvideosolutions.net/wp-includes/js/wp-emoji-release.min.js?ver=7.0.3',
]) {
  const response = await request(source);
  assert.equal(response.status, 410, `${source}: permanently gone`);
  assert.equal(response.headers.get('x-robots-tag'), 'noindex');
  assertSecurityHeaders(response, source);
}

for (const source of [
  'http://businessvideosolutions.net/services/?utm_source=test',
  'https://www.businessvideosolutions.net/about/',
]) {
  const response = await request(source);
  assert.equal(response.status, 301, `${source}: canonical host redirect`);
  const location = new URL(response.headers.get('location'));
  assert.equal(location.protocol, 'https:');
  assert.equal(location.hostname, 'businessvideosolutions.net');
  assertSecurityHeaders(response, source);
}

const assetResponse = await request('https://businessvideosolutions.net/blog/');
assert.equal(assetResponse.status, 200);
assertSecurityHeaders(assetResponse, 'static asset response');
assert.deepEqual(assetRequests, ['https://businessvideosolutions.net/blog/']);

console.log('Verified canonical host, redirects, gone URLs, security headers and static asset fallback.');
