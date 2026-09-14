# Business Video Solutions

A new responsive marketing website for BVS, built from the owner's recording, supplied Drive footage, existing website, Instagram client stories and booking funnel.

## Run locally

Use Node.js 22. Local preview needs no package installation; deployment tooling is installed with `npm ci`.

```sh
npm run dev
```

Open http://localhost:4173.

```sh
npm run check
npm run build
node scripts/serve.mjs --production
```

The build writes the static website to `dist/`. The preview server listens on localhost only. Preview: https://bvs-site.calm-lab-01f1.workers.dev — first manual deployment completed on 14 September 2026. Cloudflare deployment targets the `bvs-site` Worker. See `DEPLOY.md` for manual and Git deployment steps; production domain migration is separate.

## Editing

- `public/index.html`: content, sections, metadata, contact details and calendar fallback links.
- `public/styles.css`: colors, typography, layout and responsive styles.
- `public/app.js`: navigation, video dialogs, background playback and booking handoff.
- `public/assets/`: website images and the optimized silent background video.
- `DEPLOY.md`: deployment and future domain migration notes.

Contact: **(407) 791-0391**, **info@businessvideosolutions.net**. Both email links point to the displayed address.

## Booking and video

The top and bottom forms ask for business type and service area, then open the existing BVS consultation calendar. Those selections personalize the local introduction; they are not saved as leads or transmitted to the calendar. The live calendar collects contact information and confirms the appointment. The page also provides a direct calendar link and phone fallback.

The existing confirmation page remains linked as a resource for people who have already booked. Its redirects, automations and CRM configuration have not been changed.

Testimonials open the existing BVS YouTube videos on demand, with a direct YouTube link. The background clip comes from the supplied Daydream Pools shoot, is silent, and respects reduced-motion and data-saving preferences. Third-party players and calendars may be blocked by some embedded browsers; the direct links remain available.

Fonts load from Google Fonts. Six locally hosted testimonial thumbnails were edited with AI to remove captions and fit the landscape cards. All case-study numbers are attributed BVS claims, not independently audited outcomes or guarantees. Each story links to its original BVS YouTube video.

## Verification

- JavaScript syntax checks and static build/reference checks.
- Desktop and mobile layout review, including 320px and 390px widths.
- Required booking fields, both calendar entry forms and live calendar availability in Microsoft Edge. No appointment was submitted.
- Testimonial playback in Edge, dialog close/focus restoration and iframe cleanup.
- Mobile navigation, section links, FAQ disclosure and contact link checks.
- No application console errors observed during the tested flows.

Local content-preparation tools, research, authentication files and raw recordings are excluded from version control and the static build.
