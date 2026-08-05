# Deploying businessvideosolutions.net to Cloudflare Pages

A runbook for shipping the Business Video Solutions site.
Follow it top to bottom the first time; afterwards only §5 (deploys) matters.

**Time to first deploy:** ~15 minutes, plus DNS propagation.
**You will need:** a Cloudflare account and registrar access for
`businessvideosolutions.net`.

**There are no secrets, no API keys, and no environment variables to manage.**
That is by design — see §1.

---

## 1. How this is put together

The site is a Next.js **static export** (`output: 'export'` in
`next.config.ts`). `next build` writes plain HTML/CSS/JS to `out/`. There is no
Next.js server, no database, and no backend of any kind in production.

Booking runs on the client's **existing GoHighLevel booking widget**, embedded
as an iframe from their own white-labelled domain:

```
https://get.businessvideosolutions.net/widget/booking/tsH596xa7wEMt84KP8bH
```

The URL lives in exactly one place — `BOOKING_WIDGET_URL` in
`components/booking-embed.tsx`. Change it there and nowhere else.

```
bvs-site/
├── app/                          Next.js routes            ─┐
├── components/                                              │
│   └── booking-embed.tsx         the GHL iframe embed       ├─ `next build`
├── content/, lib/                                           │      ↓
├── public/                                                  │    out/
│   ├── _headers                  security + caching headers │  (Pages "build
│   └── _redirects                301 map from WordPress    ─┘   output dir")
└── next.config.ts
```

Cloudflare Pages serves `out/` as static assets from its edge. Nothing else
runs.

### Why there is no `functions/` directory

An earlier plan had Cloudflare Pages Functions calling the GoHighLevel API
directly, so we could build a fully custom booking calendar. **That was
dropped at the client's request** — they did not want the operational burden of
hosting and rotating API credentials.

The consequence is worth stating plainly: the booking UI is GoHighLevel's
design, not ours, and it cannot be restyled. The widget is a cross-origin
iframe, so our CSS cannot reach inside it. The only lever we have is the
styling GHL's own calendar settings expose. If the client later wants a
custom-designed calendar, that decision reverses and the API work comes back —
along with a GHL Private Integration Token, a location id, a calendar id, and a
bot-protection key to manage.

**If a `functions/` directory is ever added, re-read §7.** Pages Functions
silently disable `_redirects` for any path they claim, and a root-level
`functions/_middleware.ts` claims *every* path.

---

## 2. Create the Pages project

Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**,
then pick the `bvs-site` repository and branch `main`.

Build settings:

| Setting | Value |
| --- | --- |
| Framework preset | **Next.js (Static HTML Export)** — or *None*, then fill in the rest by hand |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | *(leave blank)* |
| Node version | `20` or newer — set env var `NODE_VERSION=20` if the build picks something older |

Do **not** choose the plain "Next.js" preset. That one expects a
server-rendered app and will fight the static export.

That is the entire configuration. There is nothing to add under Settings →
Environment variables.

### A note on Pages vs. Workers

Cloudflare now recommends **Workers with static assets** for brand-new
projects, and Pages is no longer where new features land. Pages is *not*
deprecated and remains fully supported, so this deployment is safe and
appropriate. For a pure static site the two are functionally equivalent; if you
ever migrate, the only things needing attention are `_headers` and `_redirects`.

---

## 3. Custom domain and DNS

### 3a. If `businessvideosolutions.net` is already a zone in this Cloudflare account

1. Pages project → **Custom domains** → **Set up a custom domain**.
2. Enter `businessvideosolutions.net`. Cloudflare creates the DNS record for
   you (a flattened CNAME at the apex). Accept it.
3. Repeat for `www.businessvideosolutions.net`.
4. Decide which is canonical — apex is the usual choice — and add a **Redirect
   Rule** (Rules → Redirect Rules) sending `www.businessvideosolutions.net/*`
   → `https://businessvideosolutions.net/$1` with a 301. Do not attempt this in
   `_redirects`; that file matches paths, not hostnames.

### 3b. If the domain is still at another registrar (GoDaddy, etc.)

Preferred: move the zone to Cloudflare.

1. Cloudflare → **Add a site** → `businessvideosolutions.net`.
2. Let it import the existing records. **Check the MX and TXT records before
   continuing** — losing email during a website migration is the classic way to
   turn a good day bad. Screenshot the old zone first.
3. **Do not touch the `get.` subdomain.** `get.businessvideosolutions.net` is
   the client's white-labelled GoHighLevel host and it serves the booking
   widget. Its existing record must survive the migration exactly as-is, or
   booking breaks site-wide. Verify it after the zone goes Active:
   `curl -sI https://get.businessvideosolutions.net/widget/booking/tsH596xa7wEMt84KP8bH | head -1`
   must still return `HTTP/2 200`.
4. Cloudflare gives you two nameservers. Set them at the registrar, replacing
   the existing ones.
5. Wait for Cloudflare to report the zone Active (minutes to 24 hours), then
   follow §3a.

If the client will not move nameservers, point DNS at Pages directly:
`CNAME www → <project>.pages.dev`, and at the apex either an `ALIAS`/`ANAME`
record if the registrar supports one, or the registrar's forwarding to `www`.
This works but forfeits Cloudflare's CDN, WAF, and analytics for the apex, and
apex support varies by registrar — treat it as the fallback.

### 3c. Cutover checklist

Before flipping DNS:

- [ ] the `*.pages.dev` preview renders every page correctly
- [ ] the booking widget loads, resizes to fit, and accepts a test booking
- [ ] the redirects in §7 all return 301
- [ ] `/call-confirmation/` returns 200 — old ad and GHL links point at it
- [ ] `get.businessvideosolutions.net` still resolves and returns 200
- [ ] MX records for the domain are unchanged

After cutover, wait until HTTPS is confirmed working on the real domain before
considering HSTS preload. `public/_headers` already sends
`Strict-Transport-Security` with a two-year max-age; submitting the domain at
<https://hstspreload.org> is a separate, hard-to-reverse step. Do not do it on
day one.

---

## 4. Local development

```bash
npm run dev
```

That is all. There is no `.dev.vars`, no `wrangler` step, and nothing to
configure. The booking iframe loads the live GHL widget in development exactly
as it does in production.

To preview the real static output, including `_headers` and `_redirects`:

```bash
npm run build
npx wrangler pages dev out
```

**A test booking made from localhost is a real booking** in the client's live
GHL calendar. Delete any test appointments you create.

---

## 5. Deploying

Push to `main`. Cloudflare builds and deploys automatically. Every other branch
and every PR gets its own preview URL.

Manual deploy if you need one:

```bash
npm run build
npx wrangler pages deploy out --project-name=<your-pages-project>
```

Rollback: Pages → **Deployments** → pick a previous one → **Rollback**. It is
instant, because the assets are already at the edge.

---

## 6. The booking embed

`components/booking-embed.tsx` renders the widget. Usage:

```tsx
import { BookingEmbed } from "@/components/booking-embed";

<BookingEmbed />
<BookingEmbed eager title="Book your video strategy call" />
```

| Prop | Default | What it does |
| --- | --- | --- |
| `url` | `BOOKING_WIDGET_URL` | Point at a different calendar |
| `title` | "Book a call with Business Video Solutions" | Accessible name for the iframe |
| `minHeight` | `720` | Placeholder height; the iframe is never shorter |
| `fallbackHeight` | `1100` | Height used if auto-resize never arrives |
| `eager` | `false` | Load immediately instead of on scroll |
| `className` | — | Classes for the outer wrapper |

How it behaves:

- **Lazy by default.** The iframe `src` is not set until the component is
  within 600px of the viewport, so a widget low on a long page costs nothing on
  first paint. Pass `eager` on a dedicated booking page.
- **Auto-resizing.** The widget loads `iframeResizer.contentWindow.js`, and
  GHL's parent-side script at `https://link.msgsndr.com/js/form_embed.js`
  drives the resizing. Verified live: 200, ~34 KB, exposes
  `window.iFrameResize`, and loads no further external hosts of its own.
- **Survives client-side navigation.** GHL's script initialises once on
  `DOMContentLoaded` and has no MutationObserver, so an iframe mounted during a
  client-side route change would never be picked up by its own scan. The
  component calls `window.iFrameResize` against its own element instead of
  relying on that.
- **Degrades rather than collapsing.** If the script is blocked or never
  reports a height, the iframe locks to `fallbackHeight` so the booking flow
  stays visible instead of being clipped by `scrolling="no"`.
- **`<noscript>` fallback.** A direct link to the widget for no-JS visitors.

---

## 7. Verify the deployment

Replace `$SITE` with the preview or production origin.

```bash
SITE=https://businessvideosolutions.net

# Redirects. Every one of these must print 301 and the new Location.
for p in /our-services/ /about-us/ /blog-2/ /project/ \
         /project/blvl-emotion/ /project/blvl-internal-heights/ \
         /project/christchurch-kia-kaha-new-zealand/ /project/finlandia/ \
         /project/gwoon/ /project/ivory-fly-style/ /project/porsche-macan/ \
         /project/rendez-vous-at-mumbai/ /project/tendance-roadster/; do
  printf '%-46s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}' "$SITE$p")"
done

# Must NOT redirect. Expect 200 — old ads and GHL automations point here.
curl -s -o /dev/null -w '%{http_code}\n' "$SITE/call-confirmation/"

# Security headers.
curl -sI "$SITE/" | grep -iE 'content-security-policy|strict-transport|x-content-type|referrer-policy|x-frame-options'

# The booking widget host is reachable and still frameable.
curl -sI https://get.businessvideosolutions.net/widget/booking/tsH596xa7wEMt84KP8bH \
  | grep -iE '^HTTP|x-frame-options|content-security-policy'
# Expect: HTTP/2 200, and NO x-frame-options / frame-ancestors lines at all.

# GHL's parent-side embed script.
curl -s -o /dev/null -w '%{http_code} %{content_type} %{size_download}\n' \
  https://link.msgsndr.com/js/form_embed.js
```

**Then check the booking widget in a real browser**, because none of the above
proves it renders:

1. Open the page with the widget. It should appear within a second or two.
2. Watch it resize as you move between the date grid and the time slots — no
   inner scrollbar, no clipped content.
3. Open DevTools → Console. **Any `Refused to frame…` or `Refused to load the
   script…` message is a CSP problem** — go to §9.
4. Complete a test booking end to end and confirm it lands in the GHL calendar.
   Delete it afterwards.

---

## 8. Is the strict CSP safe with the booking iframe?

**Yes — and the reason is worth understanding before anyone edits it.**

CSP is **per-document**. The policy in `public/_headers` governs *our* page. The
booking widget is a separate document in a nested browsing context, and it
serves no CSP of its own, so everything it loads —
`stcdn.leadconnectorhq.com`, `backend.leadconnectorhq.com`,
`images.leadconnectorhq.com`, `cdn.filesafe.space`, `storage.googleapis.com`,
`fonts.gstatic.com`, `js.authorize.net`, and the rest — is governed by the
widget's own context, not by our header. Those hosts are deliberately **absent**
from our policy; listing them would imply a control we do not have and would
mislead the next person to edit it.

Our policy only has to permit three things:

| Directive | Value | Why |
| --- | --- | --- |
| `script-src` | `https://link.msgsndr.com` | GHL's parent-side embed script. Verified to load no further external hosts. |
| `frame-src` | the widget origin, plus `*.leadconnectorhq.com` and `*.msgsndr.com` | See below. |
| `connect-src` | the LeadConnector backends | A hedge, in case a future `form_embed.js` starts pinging them from the parent. |

**The one genuine fragility, and how it is handled.** If the widget ever
navigates *itself* to a different GHL host mid-flow, that navigation **is**
checked against our `frame-src` — the parent's policy applies to frame
navigations even though it does not apply to the frame's own subresources. A
miss there breaks booking with nothing but a console error to show for it.
That is why `frame-src` uses the wildcards `https://*.leadconnectorhq.com` and
`https://*.msgsndr.com` rather than pinning the single widget URL. That is a
deliberate widening, not carelessness.

The other unavoidable looseness is `script-src 'unsafe-inline'`: a Next.js
static export inlines its hydration bootstrap and there is no server to mint a
per-request nonce. No CSP on a static export is "strict" in the nonce sense.

If booking ever breaks after a GHL change, the console will name the blocked
host. Add it to the specific directive — do not delete the policy.

---

## 9. Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Widget area is blank, console says `Refused to frame` | the widget navigated to a host outside `frame-src` | Add the host named in the console to `frame-src` in `public/_headers` |
| Widget loads but stays a fixed height with content clipped | `form_embed.js` was blocked, or never reported | Check the Network tab for `link.msgsndr.com`; verify `script-src` allows it. The component falls back to `fallbackHeight`, so this is degraded, not broken |
| Widget only breaks on client-side navigation | a regression in the resize attach logic | See `attachResizer` in `components/booking-embed.tsx` — GHL's own script only scans once, on `DOMContentLoaded` |
| Widget returns 404 or a GHL error page | the calendar was deleted, renamed, or the white-label domain changed | Get a fresh embed URL from GHL and update `BOOKING_WIDGET_URL` |
| `get.businessvideosolutions.net` stops resolving | its DNS record was dropped during the zone migration | Restore it — see §3b step 3 |
| Redirects return 200 instead of 301 | a `functions/` directory was added and is claiming those paths | Remove it, or scope it narrowly — see §1 |
| Redirects do nothing at all | `_redirects` did not reach `out/` | It must live in `public/`; confirm `out/_redirects` exists after a build |
| CSP errors after adding analytics or an embed | the new origin is not in the policy | Extend the specific directive in `public/_headers` — do not delete the policy |
| Booking succeeds but no confirmation email | GHL calendar notification settings | Check the calendar's notification config in GHL. Nothing in this repo touches it |

Bookings, contacts, reminders, and confirmation emails are all GoHighLevel's
responsibility. This repository renders a page and embeds a frame; if a booking
is missing, the answer is in GHL, not here.
