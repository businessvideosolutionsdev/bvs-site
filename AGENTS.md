# BVS website

This is a static HTML, CSS and JavaScript website. Source lives in `public/`.
`npm run build` validates local asset references and creates a clean `dist/`.
Use Node 22 and `npm run check` before building. Deployment uses the pinned
Wrangler version and explicit static-assets configuration in `wrangler.jsonc`.

Preserve the existing visual design, real client identities and sourced claims.
Do not stage local authentication files, research, recordings or generated build
output. New client metrics must be supported by BVS source material.

Cloudflare target: `bvs-site` in the account named in `wrangler.jsonc`.
Local authentication uses the `bvs` Wrangler profile. GitHub authentication for
this workspace uses `.tools/github` through `GH_CONFIG_DIR`; do not change
global accounts or store credentials in tracked files.

Custom-domain/DNS migration is separate from the preview deployment. Preserve
email and the existing `call.` and `get.` funnel hosts. See `DEPLOY.md`.
