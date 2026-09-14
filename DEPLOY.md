# Cloudflare deployment

This repository replaces the earlier Next.js implementation with a static site.
Cloudflare serves `dist/` directly through Workers Static Assets. No Next.js,
OpenNext adapter or server runtime is needed.

Live preview: https://bvs-site.calm-lab-01f1.workers.dev

## Local preview

Use Node 22. Run `npm run dev` and open http://localhost:4173.
The preview server listens only on localhost.

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

## Before moving the business domain

The preview deployment is separate from WordPress. Before changing production
DNS, back up WordPress, inventory current indexed URLs and redirects, preserve
email DNS and the `call.` / `get.` funnel subdomains, review analytics and
metadata, and verify the existing calendar's confirmation redirect.

Test the preview on desktop/mobile, video dialogs, telephone/email links and
calendar availability. Do not submit a real appointment as a test.

## Rollback

Use the Worker deployment history to redeploy a previous version. Git history
also preserves the earlier implementation. Do not force-push or delete that
history. DNS is managed separately.
