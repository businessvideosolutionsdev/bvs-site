import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const output = resolve('dist');
const site = JSON.parse(await readFile('content/site.json', 'utf8'));
const stories = JSON.parse(await readFile('content/testimonials.json', 'utf8'));
const posts = JSON.parse(await readFile('content/blog.json', 'utf8'));
const origin = new URL(site.url).origin;
const files = (await readdir(output, {recursive:true})).filter(p=>p.endsWith('.html'));
const documents = new Map();
const titles = new Set();
const descriptions = new Set();
const canonicalPaths = new Set();
for (const file of files) {
  const html = await readFile(resolve(output, file), 'utf8');
  const path = '/' + file.replaceAll('\\','/').replace(/index\.html$/, '');
  documents.set(path, html);
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${path}: one primary heading`);
  assert.ok(!html.includes('{{HOME_STORIES}}'), `${path}: template rendered`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && !titles.has(title), `${path}: unique title`);
  assert.ok(description && !descriptions.has(description), `${path}: unique description`);
  titles.add(title); descriptions.add(description);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(canonical?.startsWith(origin + '/'), `${path}: configured canonical host`);
  if (path !== '/404.html') {
    assert.equal(canonical, origin+path, `${path}: canonical matches page`);
    canonicalPaths.add(path);
  }
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(graph['@context'], 'https://schema.org');
  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1];
  assert.equal(robots, site.indexable && path !== '/404.html' ? 'index,follow' : 'noindex,follow');
}
for (const [path,html] of documents) {
  for (const [,href] of html.matchAll(/href="([^"\s]+)"/g)) {
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const link = new URL(href, origin+path);
    if (link.hash.length < 2) continue;
    const target = documents.get(link.pathname);
    assert.ok(target?.includes(`id="${decodeURIComponent(link.hash.slice(1))}"`), `${path}: valid fragment ${href}`);
  }
}
const sitemap = await readFile(resolve(output,'sitemap.xml'),'utf8');
const sitemapPaths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
assert.deepEqual(new Set(sitemapPaths), canonicalPaths, 'Sitemap includes every public page exactly once');
assert.equal(sitemapPaths.length, canonicalPaths.size);
const home = documents.get('/');
assert.equal([...home.matchAll(/class="result-card"/g)].length, 6);
assert.ok(home.includes('<h3>Courtesy Screening</h3>'));
assert.ok(!home.includes('<h3>i9 Sports</h3>'));
for (const story of stories) {
  assert.ok(documents.has(`/testimonials/${story.slug}/`));
  if (story.video.startsWith('/')) {
    assert.ok((await stat(resolve(output,'.'+story.video))).size < 25 * 1024 * 1024, 'Hosted video fits static asset limit');
  }
}
const feed = await readFile(resolve(output,'blog/feed.xml'),'utf8');
assert.equal([...feed.matchAll(/<item>/g)].length, posts.filter(p=>p.published).length);
for (const post of posts) {
  assert.equal(documents.has(`/blog/${post.slug}/`), post.published, 'Only published articles have pages');
  assert.equal(feed.includes(`/blog/${post.slug}/`), post.published, 'Only published articles appear in feed');
}
console.log(`Verified ${canonicalPaths.size} public pages: metadata, structured data, internal anchors, sitemap, content and video sizes.`);
