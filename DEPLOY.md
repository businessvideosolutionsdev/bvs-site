# Cloudflare deployment

This repository replaces the earlier Next.js implementation with a static site.
Cloudflare serves `dist/` directly through Workers Static Assets. No Next.js,
OpenNext adapter or server runtime is needed.

Production: https://businessvideosolutions.net

Worker preview: https://bvs-site.calm-lab-01f1.workers.dev

## Local preview

Use Node 22. Run `npm run dev` and open http://localhost:4173.
The preview server listens only on localhost.
Install dependencies with `npm ci` first. Pages are generated from `templates/`
and `content/`; do not edit `dist/` directly. See `CONTENT.md` for publishing.

## Manual deployment

Install pinned tooling with `npm ci`. Authenticate the correct account with
`npx wrangler auth create bvs`. Review the account with
`npx wrangler auth activate bvs` followed by `npx wrangler whoami`. Local authentication is kept separate from
other projects; credential files must never be committed.

Run `npm run deploy`. This checks the JavaScript, builds a clean `dist/`, and
deploys to `bvs-site` using the `bvs` profile. The account ID is pinned in
`wrangler.jsonc`. There are no domain routes in this configuration.

## Git integration

Repository: https://github.com/businessvideosolutionsdev/bvs-site

Cloudflare Workers Builds settings:

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Non-production version command: `npx wrangler versions upload`
- Root directory: `/`
- Node version: 22 (from `.node-version`)

The dashboard deployment uses its existing build token, not the local profile.
Pushes to `main` update the Worker; branch builds upload preview versions.
For this workspace, set `GH_CONFIG_DIR` to `.tools/github` before Git pushes or
GitHub CLI operations so they use the BVS account.

## Production domain and SEO routing

The business domain is managed separately from the Worker deployment. Do not
change DNS from this repository. Preserve email DNS and the `call.` / `get.`
funnel subdomains.

`content/site.json` uses the final HTTPS domain with `indexable: true`.
Rebuilding generates production canonical URLs, Open Graph links, a sitemap and
RSS. The Workers preview uses the same production canonicals, so it is not
presented to search engines as a second canonical website.

`src/worker.js` redirects HTTP and `www` requests to the canonical HTTPS host,
maps valuable legacy About, service and location URLs to durable replacement
pages, and returns `410 Gone` for obsolete WordPress feeds and system paths.
Keep the redirect tests passing when changing routes.

The same Worker adds the audit-approved security headers to every response:

- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security: max-age=300`

The HSTS value is intentionally the five-minute first rollout phase. After the
production domain, assets, forms, embeds and required subdomains have been
verified over HTTPS, increase it in controlled phases. Do not add
`includeSubDomains` or `preload` until every BVS subdomain is inventoried and
confirmed HTTPS-only.

Test the preview on desktop/mobile, video dialogs, telephone/email links and
calendar availability. Do not submit a real appointment as a test.

## Rollback

Use the Worker deployment history to redeploy a previous version. Git history
also preserves the earlier implementation. Do not force-push or delete that
history. DNS is managed separately.

## Persistent staging

Staging Worker: `bvs-site-staging`. Public review URL: https://bvs-site-staging.calm-lab-01f1.workers.dev

The `staging` Git branch deploys only to this separate Worker using
`npm run build:staging` and `npm run deploy:staging`. Production continues to use
`main` and the original `wrangler.jsonc`. No DNS or custom domains are configured.
Staging is noindex, with a visible review banner. Booking is disabled on BVS;
Courtesy form validation runs normally but delivery is simulated, without CRM
requests or storing lead details. No production secrets are copied.

After review, promote selected changes through a PR to `main` only with explicit
publishing approval. Keep the staging config and preparation script available;
production build/deploy scripts do not invoke them.
