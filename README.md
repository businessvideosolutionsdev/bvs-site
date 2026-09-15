# Business Video Solutions

A new responsive marketing website for BVS, built from the owner's recording, supplied Drive footage, existing website, Instagram client stories and booking funnel.

## Run locally

Use Node.js 22. Install the pinned build and deployment tooling with `npm ci`.

```sh
npm run dev
```

Open http://localhost:4173.

```sh
npm run check
npm test
node scripts/serve.mjs --production
```

The build writes the static website to `dist/`. The preview server listens on localhost only. Preview: https://bvs-site.calm-lab-01f1.workers.dev — first manual deployment completed on 14 September 2026. Cloudflare deployment targets the `bvs-site` Worker. See `DEPLOY.md` for manual and Git deployment steps; production domain migration is separate.

## Editing

- `templates/home.html`: homepage sections and the shared header, footer and dialogs.
- `content/testimonials.json`: homepage selection, library and individual client stories.
- `content/blog.json` and `content/posts/`: article metadata and Markdown content.
- `content/site.json`: canonical domain and search indexing setting.
- `scripts/render-pages.mjs`: static page generation, metadata, sitemap and RSS.
- `public/styles.css`: colors, typography, layout and responsive styles.
- `public/app.js`: navigation, video dialogs, background playback and booking handoff.
- `public/assets/`: website images and the optimized silent background video.
- `DEPLOY.md`: deployment and future domain migration notes.
- `CONTENT.md`: the user's preferred workflow: send content to Codex to publish.

The local preview rebuilds after source changes; refresh the browser to see them.
The site includes the homepage, `/testimonials/`, 11 client story pages,
`/blog/`, seven guides, an RSS feed and a custom 404 page.

Contact: **(407) 791-0391**, **info@businessvideosolutions.net**. Both email links point to the displayed address.

## Booking and video

All four dropdowns use themed menus with keyboard controls, native select fallback and required-field feedback. Mobile shows the first three homepage testimonials; the library retains every story.

The testimonial library reveals six stories at a time on desktop and three on
mobile, with category filters and a smooth View more transition. The homepage
has a 14-logo grayscale strip driven by page scrolling, a scroll-responsive
hero result card, and subtle entry/hover animations. Reduced-motion preferences
disable the decorative movement.

The top and bottom forms ask for business type and service area, then open the existing BVS consultation calendar. Those selections personalize the local introduction; they are not saved as leads or transmitted to the calendar. The live calendar collects contact information and confirms the appointment. The page also provides a direct calendar link and phone fallback.

The existing confirmation page remains linked as a resource for people who have already booked. Its redirects, automations and CRM configuration have not been changed.

Testimonials open BVS YouTube videos or locally hosted client MP4s on demand, with direct video links. The background clip comes from the supplied Daydream Pools shoot, is silent, and respects reduced-motion and data-saving preferences. Third-party players and calendars may be blocked by some embedded browsers; the direct links remain available.

Fonts load from Google Fonts. Eleven locally hosted testimonial thumbnails were edited with AI to remove captions and fit the landscape cards. All case-study numbers are attributed BVS claims, not independently audited outcomes or guarantees. Each story links to its source video. Behind-the-scenes imagery uses original photos and video frames with CSS cropping; rejected AI crew images are excluded.

## Verification

- JavaScript syntax checks and static build/reference checks; unique page metadata, structured data, internal anchors, sitemap coverage, publishing flags and video-size checks.
- Desktop and mobile layout review, including 320px and 390px widths.
- Required booking fields, both calendar entry forms and live calendar availability in Microsoft Edge. No appointment was submitted.
- Testimonial playback in Edge, dialog close/focus restoration and iframe cleanup.
- Mobile navigation, section links, FAQ disclosure and contact link checks.
- No application console errors observed during the tested flows.

Local content-preparation tools, research, authentication files and raw recordings are excluded from version control and the static build.
