# Publishing content with Codex

Send Codex the article draft, a topic with source notes, or a new client video.
Include any preferred title, images and publish date. Codex prepares the page,
checks it locally and publishes through the existing GitHub/Cloudflare workflow.
No separate CMS login is required.

## Blog posts

1. Write the article in `content/posts/<slug>.md`. Use Markdown headings, lists
   and links. The page already supplies the title as its H1; start sections at H2.
2. Add an entry to `content/blog.json` with a unique lowercase hyphenated `slug`,
   `title`, `description`, `category`, ISO `date`, `image`, `imageAlt` and
   `published`. Use `published: false` while drafting. Drafts are excluded from
   generated pages, the blog index, related posts, RSS and the sitemap.
3. Put approved images in `public/assets/`. Use `/assets/...` URLs in content.
4. For revisions, retain the original `date` and add an ISO `updated` date.
   Keep the slug stable to preserve existing links.

The build generates `/blog/`, each article page, related article links, reading
times, metadata, article structured data and `/blog/feed.xml`. Only publish
reviewed content; Markdown is a trusted source format and supports raw HTML.
Draft source files remain visible in this public GitHub repository, so never
put confidential content or unapproved client information in a committed draft.

## Client stories

Add an entry to `content/testimonials.json`. Include the client's `name`, unique
`slug`, `category`, `metric`, metric `label`, short `summary`, `headline`,
`paragraphs`, `image`, `video`, and a `featured` boolean. Use the existing fields
as examples. Metrics and claims must be supported by the supplied client video
or BVS's published source; use a descriptive headline when no number is verified.

- `video` accepts a YouTube video ID or `/assets/videos/<slug>.mp4`.
- Locally hosted videos must stay under 25 MiB each. They load only when opened.
- Use a clean landscape 16:9 thumbnail without captions over the image.
- Exactly six stories should have `featured: true`; desktop shows all six and
  mobile shows the first three. Order the strongest mobile stories first.
- Optionally add `source` with the original public Instagram or YouTube URL.
  The hosted player remains local while the source note links to that post.
- All entries receive a page and appear in the library. New categories create
  new filter buttons automatically.
- The library shows six stories per batch on desktop and three on mobile.
  The View more button reveals the next batch and scrolls to it smoothly.
  Filtering starts a fresh batch; all stories remain in the static HTML.
- Keep campaign periods and lead qualification tied to the source. The i9
  video verifies 806 new members in the first month; it does not describe the
  1,227 leads as qualified.

## Photography and motion

Use original photos and video frames for crew imagery. The user rejected
AI-generated crew enhancements because their faces changed. Keep those images
out of the public assets. Crop with the layout and preserve people's likenesses.

The homepage client strip contains 14 logos from the original BVS site; DeBary
is excluded at the user's request. It moves horizontally in response to page
scrolling and supports manual horizontal scrolling. It does not autoplay.
The hero result card also responds to scrolling on desktop and mobile.
Entry animations and interactions respect reduced-motion preferences.

## Review and publish

Run `npm run check` and `npm test`, then `npm run dev`. Review the new page,
mobile layout, links and video if present at http://localhost:4173. The local
server rebuilds after source edits; refresh the browser to see the result.

Commit source and approved public media on a `codex/` branch, push, review the
Cloudflare branch build, then merge to `main`. Verify the production build and
open the published URLs. Follow the existing account instructions in `AGENTS.md`
and `DEPLOY.md`. Never commit authentication files, local research or `dist/`.

## Domain and search settings

`content/site.json` controls the canonical site URL and `indexable` setting.
The current Workers preview uses `indexable: false`. When the business domain is
ready, set `url` to that domain and `indexable: true`, then rebuild and deploy.
The sitemap, canonical links, sharing images and feed update together. Review
redirects from old WordPress URLs as part of that separate domain migration.

## Local review updates

The hero now features Courtesy Screening. Its approximate $150K monthly revenue
figure comes from the user's September 14 review update, not an attribution of
that entire revenue amount to BVS ads. The hero links to the full original interview.
The Florida section uses the photo explicitly supplied in that same review,
converted to WebP without generative changes. Publishing remains on hold.
