# BVS website

This is a static HTML, CSS and JavaScript website. Shared assets live in
`public/`, the homepage template in `templates/home.html`, and testimonials and
blog content in `content/`. `scripts/render-pages.mjs` generates the pages.
`npm run build` validates local references and creates a clean `dist/`.
Use Node 22, `npm run check` and `npm test` before publishing. Deployment uses the pinned
Wrangler version and explicit static-assets configuration in `wrangler.jsonc`.

Preserve the existing visual design, real client identities and sourced claims.
Use original photos and video frames for behind-the-scenes crew imagery. The
user rejected AI-enhanced crew photos because their faces changed. Do not
regenerate crew faces or reuse the rejected walking/Pilates enhancements.
Do not stage local authentication files, research, recordings or generated build
output. New client metrics must be supported by BVS source material.
The user prefers to send content to Codex for publishing. Follow `CONTENT.md`;
no CMS is needed. Keep exactly six featured stories on the desktop homepage; show only the first
three on mobile. The full testimonial library remains available on every device.

Cloudflare target: `bvs-site` in the account named in `wrangler.jsonc`.
Local authentication uses the `bvs` Wrangler profile. GitHub authentication for
this workspace uses `.tools/github` through `GH_CONFIG_DIR`; do not change
global accounts or store credentials in tracked files.

Custom-domain/DNS migration is separate from the preview deployment. Preserve
email and the existing `call.` and `get.` funnel hosts. See `DEPLOY.md`.
