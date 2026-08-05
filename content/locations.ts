import { citySlug, serviceAreas, services } from "@/content/site";

/**
 * =============================================================================
 * Per-city content for /locations/
 * =============================================================================
 *
 * WHY THIS FILE IS SO LONG
 *
 * Twelve city pages built from one template with the city name swapped in is a
 * doorway-page pattern. Google names it explicitly in its spam policies, and on
 * a site this small it would drag the whole domain down rather than win twelve
 * new rankings. The only defence is that each page says something that is only
 * true of that city — so every field below is hand-written per city, and there
 * is no string interpolation of the city name anywhere in the prose.
 *
 * WHAT IS AND IS NOT CLAIMED HERE
 *
 * Everything asserted about a place is stable public geography: counties,
 * interstate exits, named business districts, adjacent municipalities, drive
 * distances from the studio, time zones. Nothing asserts a client, a campaign,
 * a result, a review or an office. The business has exactly one address —
 * 75 Concord Dr Unit B, Casselberry — and the copy for the other eleven cities
 * is written to never imply otherwise, because a location page hinting at an
 * office that does not exist is the fastest way to lose a Google Business
 * Profile.
 *
 * `proofGaps` on each entry lists the local proof the page still needs and is
 * deliberately never rendered. It is a work order for the client, not copy.
 */

/**
 * How the business actually reaches the city, which drives page structure:
 *
 * `studio`    — the office is here. One city only: Casselberry.
 * `metro`     — inside the Orlando metro, a short drive from the studio, so
 *               on-location crews are routine and same-week.
 * `statewide` — a real trip. Production is booked in blocks; the recurring
 *               work (ads, automations, SEO, appointment setting) runs remotely.
 */
export type LocationTier = "studio" | "metro" | "statewide";

/** Hub grouping. Central Florida is the drive-time cluster; the rest is travel. */
export type LocationGroup = "central-florida" | "statewide";

export type LocationServiceFocus = {
  /** Must match a `slug` in `services` from content/site.ts. */
  slug: string;
  /** Why this service in particular suits this market. City-specific. */
  why: string;
};

export type LocationFaq = {
  question: string;
  answer: string;
};

export type Location = {
  /** Must match a `city` in `serviceAreas` — the sitemap is derived from that list. */
  city: string;
  /** Derived from `citySlug` so the route, hub link and sitemap can never drift. */
  slug: string;
  county: string;
  group: LocationGroup;
  tier: LocationTier;
  /** Small label above the h1 — the county or region, not a keyword stuffing slot. */
  eyebrow: string;
  /** <= 60 characters. Distinct per city; no shared template. */
  title: string;
  /** <= 160 characters. Distinct per city; no shared template. */
  description: string;
  /** The single h1. Names the city and the service category. */
  h1: string;
  /** Opening paragraph. Sets the angle that makes this page not the last one. */
  lede: string;
  /**
   * One line for the hub card. Deliberately not derived from `lede` — the hub
   * is where a visitor decides which of twelve pages is theirs, and twelve
   * truncated first sentences is exactly the sameness this section has to avoid.
   */
  cardLine: string;
  /**
   * The line the client already publishes for this city, verbatim, or "".
   * Six of the twelve have one; the other six were never written.
   */
  publishedLine: string;
  /** Distance and travel from the Casselberry studio. Honest, not aspirational. */
  travel: { label: string; body: string };
  /** Heading for the market section — varied so the pages do not rhyme. */
  marketHeading: string;
  /** What this market actually looks like. The differentiating section. */
  market: string[];
  /** Named districts, corridors and adjacent areas covered from this page. */
  places: string[];
  /** Caption above the places list. */
  placesLabel: string;
  /** Heading for the how-we-work section. */
  approachHeading: string;
  /** How the work is delivered here specifically. Tier drives the substance. */
  approach: string[];
  /** Heading above the service grid. Authored, for the same reason as the rest. */
  servicesHeading: string;
  /** Which of the six services lead in this market, and why. Ordered. */
  services: LocationServiceFocus[];
  /** City names (must exist in `serviceAreas`) for internal links. */
  nearby: string[];
  /** Questions a buyer in this city would actually ask. */
  faqs: LocationFaq[];
  /**
   * NOT RENDERED. The local proof this page needs before it can compete on
   * anything beyond structure — a named client, a shoot, a number. Left as a
   * gap on purpose: an invented case study is worse than a thin page.
   */
  proofGaps: string[];
};

/*
 * -----------------------------------------------------------------------------
 * The twelve.
 * -----------------------------------------------------------------------------
 * Ordered studio first, then the drive-time cluster north and south of it, then
 * the statewide markets roughly by distance. The hub renders them in this order.
 */
const entries: Omit<Location, "slug">[] = [
  /* ===========================================================================
   * CASSELBERRY — the flagship. The only page that can say "come here".
   * ========================================================================= */
  {
    city: "Casselberry",
    county: "Seminole County",
    group: "central-florida",
    tier: "studio",
    eyebrow: "Seminole County — our studio",
    title: "Video Marketing Agency in Casselberry, FL",
    description:
      "Our studio is on Concord Drive in Casselberry, off SR 436. Video production, Meta ads, automations and local SEO for Seminole County businesses.",
    h1: "Video Marketing and Meta Ads in Casselberry, Florida",
    cardLine: "The studio. Fifteen minutes from most of Seminole County.",
    servicesHeading: "Six services, run from fifteen minutes away",
    lede:
      "Casselberry is the one city on this list where you can knock on the door. The studio sits on Concord Drive, a few hundred yards off SR 436, which means a Casselberry business can shoot a quarter of ad creative in a morning and be back behind the counter by lunch.",
    publishedLine:
      "Professional video marketing and Meta ads for local Casselberry businesses.",
    travel: {
      label: "This is the studio",
      body: "75 Concord Dr Unit B, Casselberry, FL 32707. Everything on this site is produced from here, and every other city we serve is measured out from this address.",
    },
    marketHeading: "What advertising in Casselberry is actually up against",
    market: [
      "Casselberry is a corridor city. The commercial life of it runs along SR 436 and US 17-92, and almost every business here draws from traffic that is passing through on its way somewhere else in the Orlando metro. That is a genuinely awkward position to advertise from: the customer base is local, but the media market is regional, and a Meta campaign set to Orlando will spend most of its budget on people who will never turn off 436.",
      "The businesses that live on that corridor are mostly service businesses — home services, auto, dental and medical practices, med spas, restaurants and the trades. They compete against operators in Winter Park and Altamonte Springs with bigger budgets and, often, better-looking creative. Production quality is not vanity in that fight; it is the thing that makes a smaller local operator look like the safe choice.",
      "The other structural fact worth naming is that Casselberry sits inside three overlapping search markets at once: its own city name, Seminole County, and the much larger Orlando metro that most people default to searching for. A local SEO plan that only optimises for one of the three leaves the other two on the table.",
    ],
    placesLabel: "Covered from the studio without leaving the neighbourhood",
    places: [
      "SR 436 / Semoran Boulevard corridor",
      "US 17-92 corridor",
      "Red Bug Lake Road",
      "Fern Park",
      "Winter Springs",
      "Longwood",
      "Oviedo",
      "Goldenrod",
    ],
    approachHeading: "Working with us from down the road",
    approach: [
      "Being in the same city changes the shape of the work more than people expect. Shoots get scheduled around your trading hours rather than around a travel day, reshoots are a Tuesday morning rather than a renegotiation, and if a campaign needs three more hooks cut because the first batch fatigued, that is a short drive rather than a production cycle.",
      "It also means we can shoot on your premises as easily as in the studio. For a lot of Casselberry businesses the location is the product — the workshop, the treatment room, the kitchen, the yard — and that footage does more in a Meta feed than anything shot against a backdrop.",
    ],
    services: [
      {
        slug: "meta-ads-production",
        why: "The corridor problem is a targeting and creative problem: enough creative variants to keep a tight local radius from fatiguing, rather than one hero video pushed at the whole metro.",
      },
      {
        slug: "studio-production",
        why: "Shot here or at your premises. Being fifteen minutes away is what makes filming a full quarter of content in one session realistic for a business that cannot close for a day.",
      },
      {
        slug: "local-seo",
        why: "Casselberry, Seminole County and Orlando are three different search markets that overlap on your doorstep. Each needs its own answer on your Google Business Profile and site.",
      },
      {
        slug: "marketing-automations",
        why: "Corridor traffic converts in bursts. Automated follow-up is what stops a busy Friday of enquiries from being a dead Monday.",
      },
      {
        slug: "appointment-setting",
        why: "For service businesses on 436, the gap between an enquiry and a booked slot is where most of the revenue leaks out.",
      },
      {
        slug: "website-seo",
        why: "The organic half of the same job: pages that rank for what people actually type when they are already in the area.",
      },
    ],
    nearby: ["Winter Park", "Altamonte Springs", "Maitland"],
    faqs: [
      {
        question: "Where exactly is the studio?",
        answer:
          "75 Concord Dr Unit B, Casselberry, FL 32707, just off SR 436. Visits are by appointment — call (321) 415-4586 first so someone is there and the space is not mid-shoot.",
      },
      {
        question: "Can you film at our Casselberry premises instead of the studio?",
        answer:
          "Yes, and for most local service businesses it is the better call. Your workspace carries more credibility in a Meta feed than a neutral backdrop does.",
      },
      {
        question: "Do you only work with Casselberry businesses?",
        answer:
          "No. Casselberry is where the studio is, but the same team covers the rest of Seminole County, the wider Orlando metro, and eleven other Florida markets. Everything is produced from this address.",
      },
    ],
    proofGaps: [
      "TODO: a named Casselberry client with permission to be named — the flagship page is the one page where a local proof point matters most.",
      "TODO: photography of the actual studio and the Concord Drive exterior. A location page for a real address with no photograph of it is a wasted trust signal.",
      "TODO: confirmed opening hours, so the page and the Google Business Profile can agree.",
    ],
  },

  /* ===========================================================================
   * WINTER PARK — brand-led, high-consideration. Not a direct-response market.
   * ========================================================================= */
  {
    city: "Winter Park",
    county: "Orange County",
    group: "central-florida",
    tier: "metro",
    eyebrow: "Orange County — 4 miles from the studio",
    title: "Winter Park Video Ads and Brand Film Production",
    description:
      "Brand-led video and Meta ad creative for Winter Park practices, boutiques and firms. Filmed on Park Avenue or in our Casselberry studio, ten minutes away.",
    h1: "Video Marketing for Winter Park Brands",
    cardLine: "A market where the film is the differentiator, not the offer.",
    servicesHeading: "What a Winter Park brand usually needs first",
    lede:
      "Winter Park does not buy the way the rest of the metro buys. Park Avenue, Hannibal Square and the practices along Orlando Avenue sell considered, high-ticket decisions to an audience that is unusually good at spotting cheap production — which makes it one of the few local markets where the film itself is the differentiator, not the offer stacked on top of it.",
    publishedLine:
      "High-converting video marketing and ad creatives for Winter Park brands.",
    travel: {
      label: "About four miles south of the studio",
      body: "Straight down US 17-92 from Casselberry — roughly ten to fifteen minutes outside rush hour. Close enough that a Park Avenue shoot and a studio session can share the same day.",
    },
    marketHeading: "A market where the creative has to carry the brand",
    market: [
      "The Winter Park customer is making high-consideration purchases: cosmetic dentistry and aesthetics, private wealth and law, interior design, real estate, independent boutique retail and restaurants that trade on atmosphere. Almost none of that converts on a first impression. It converts after several exposures, which means the job of the video is to build recognition and taste before it ever asks for anything.",
      "That has a direct consequence for how a Meta account should be built here. A pure direct-response structure — one offer, one lead form, judge it on cost per lead in week one — systematically underprices this audience and tends to attract the least valuable half of it. The accounts that work in Winter Park lean on brand-led top-of-funnel film, then retarget the people who actually watched it.",
      "Winter Park is also small and dense. Rollins College, Park Avenue, Winter Park Village and Hannibal Square sit within roughly a mile of each other, so audience sizes get tight fast. Tight audiences fatigue quickly, and creative volume — not budget — becomes the constraint on how long a campaign can run.",
    ],
    placesLabel: "Districts and corridors we film in",
    places: [
      "Park Avenue",
      "Hannibal Square",
      "Winter Park Village",
      "Orlando Avenue / US 17-92",
      "Aloma Avenue",
      "Rollins College area",
      "Baldwin Park",
    ],
    approachHeading: "How a Winter Park engagement usually runs",
    approach: [
      "Brand film first, cut-downs second. One production day usually produces the anchor piece plus the eight to twelve short variants a Meta account needs to keep a small, affluent audience from seeing the same thing twice in a week.",
      "Because the studio is ten minutes up 17-92, we film on location far more often here than we do for the statewide markets. For a Park Avenue boutique or a practice with a designed interior, the room is a large part of the brand — shooting it somewhere else throws away the strongest asset the business owns.",
    ],
    services: [
      {
        slug: "studio-production",
        why: "The production values are the argument in this market. Filmed in your space on Park Avenue or in the studio, whichever the brand is better served by.",
      },
      {
        slug: "meta-ads-production",
        why: "Small, dense, affluent audiences fatigue fast. This market needs a steady supply of variants far more than it needs a bigger daily budget.",
      },
      {
        slug: "appointment-setting",
        why: "High-ticket enquiries here are consultations, not transactions. The follow-up between the enquiry and the consultation is where they are won or lost.",
      },
      {
        slug: "local-seo",
        why: "Winter Park searches are frequently made from inside Orlando's map radius. Getting the Winter Park entity right is what separates you from the Orlando results.",
      },
    ],
    nearby: ["Maitland", "Casselberry", "Altamonte Springs"],
    faqs: [
      {
        question: "Can you film on Park Avenue or inside our space?",
        answer:
          "Yes. On-location filming is the norm for Winter Park work — the interior is usually the strongest brand asset the business has. Permits or building permissions are worth checking before the shoot date.",
      },
      {
        question: "Is Meta advertising worth it for a high-ticket Winter Park business?",
        answer:
          "It is, but not on a direct-response structure judged in week one. The audience is small and considered, so it is normally built as brand-led reach plus retargeting, and measured over a longer window.",
      },
      {
        question: "How far are you from Winter Park?",
        answer:
          "About four miles. The studio is in Casselberry, roughly ten to fifteen minutes up US 17-92, so shoot days do not need a travel allowance.",
      },
    ],
    proofGaps: [
      "TODO: a Winter Park client — ideally a Park Avenue retailer or a cosmetic practice — with permission to be named and a before/after on ad performance.",
      "TODO: stills or a reel from an actual Winter Park shoot. A brand-led page with no visible brand work is arguing against itself.",
    ],
  },

  /* ===========================================================================
   * ALTAMONTE SPRINGS — franchises, multi-location, overlapping radii.
   * ========================================================================= */
  {
    city: "Altamonte Springs",
    county: "Seminole County",
    group: "central-florida",
    tier: "metro",
    eyebrow: "Seminole County — I-4 exit 92",
    title: "Altamonte Springs Video Marketing and Meta Ads",
    description:
      "Meta ad creative and video production for Altamonte Springs retail, healthcare and multi-location operators around I-4 exit 92 and the SR 436 corridor.",
    h1: "Video Ads and Marketing for Altamonte Springs Businesses",
    cardLine: "Trade areas that ignore the city limits, and operators with several sites.",
    servicesHeading: "Built for operators with overlapping trade areas",
    lede:
      "Altamonte Springs is where I-4 meets SR 436, and that interchange is the whole commercial story of the city. It concentrates retail, healthcare and franchise operators into a few square miles — and it means that almost every advertiser here is bidding for the same drivers as advertisers in Longwood, Forest City, Apopka, Maitland and Casselberry.",
    publishedLine:
      "High-performing video ads and marketing services for local businesses.",
    travel: {
      label: "About five miles west of the studio",
      body: "Casselberry to Altamonte Springs is a straight run west along SR 436 — usually fifteen minutes. Crews and equipment travel by road, so a half-day shoot stays a half-day.",
    },
    marketHeading: "The overlapping-radius problem",
    market: [
      "Uptown Altamonte, Cranes Roost, Altamonte Mall and the medical cluster around AdventHealth Altamonte generate an enormous amount of local commercial traffic for a city of this size. The catch is that the trade area is not shaped like the city. A five-mile radius drawn around the mall covers most of Longwood, a chunk of Maitland, part of Apopka and all of Casselberry — so a Meta campaign geo-targeted to Altamonte Springs is either paying for people who will never come, or excluding people who visit weekly.",
      "The businesses here skew towards categories where that matters most: retail, restaurant and fitness franchises, urgent care and specialist medical, home services and the professional offices around 436. Franchise and multi-location operators in particular carry a second problem — brand-controlled creative that has to be adapted for a local audience without breaking the franchisor's standards.",
      "Volume is the honest answer to both. Multi-location operators need more creative than a single-site business, cut per location and per offer, and the geographic targeting needs to be drawn around where customers actually come from rather than around a city boundary that no shopper has ever thought about.",
    ],
    placesLabel: "Areas and corridors this page covers",
    places: [
      "Uptown Altamonte and Cranes Roost",
      "Altamonte Mall district",
      "SR 436 / East Altamonte Drive",
      "I-4 exit 92 corridor",
      "Forest City",
      "Longwood",
      "Apopka",
    ],
    approachHeading: "Built for operators with more than one location",
    approach: [
      "A single production day is planned to feed several locations at once: shared brand footage plus location-specific cutaways, so each site gets creative that names its own address without paying for its own shoot.",
      "Targeting is drawn from the trade area rather than the city limits, and each location gets its own ad set so that spend can be moved towards the sites that actually convert instead of being averaged across all of them.",
    ],
    services: [
      {
        slug: "meta-ads-production",
        why: "Overlapping trade areas need per-location ad sets and enough creative to fill them. This is the service that does the heavy lifting in Altamonte.",
      },
      {
        slug: "appointment-setting",
        why: "Urgent care, dental, fitness and home services all live or die on how fast an enquiry becomes a booked slot — the volume around 436 makes that gap expensive.",
      },
      {
        slug: "marketing-automations",
        why: "Multi-location operators need leads routed to the right site automatically, not sorted by hand in a shared inbox.",
      },
      {
        slug: "local-seo",
        why: "Each location needs its own Google Business Profile treated as its own entity, or the strongest site cannibalises the rest.",
      },
    ],
    nearby: ["Casselberry", "Maitland", "Lake Mary"],
    faqs: [
      {
        question: "We have several locations around Seminole County. Can one shoot cover them all?",
        answer:
          "Usually, yes. The production day is planned around shared brand footage plus short location-specific pickups, so each site ends up with creative that names its own address.",
      },
      {
        question: "Should we target Altamonte Springs or the whole Orlando metro?",
        answer:
          "Neither, normally. The trade area around I-4 exit 92 crosses several city boundaries, so targeting is better drawn around where customers actually travel from than around the city name.",
      },
      {
        question: "Do you work with franchisees who have brand guidelines to follow?",
        answer:
          "Yes. Franchise creative is a constraint to work inside, not around — the local adaptation happens in the hook, the offer and the call to action rather than in the brand elements.",
      },
    ],
    proofGaps: [
      "TODO: a multi-location or franchise client in Seminole County willing to be named. This page's whole argument is about multi-location work and it currently has no example.",
      "TODO: confirm whether BVS has experience working inside franchisor brand guidelines — the FAQ above claims a capability that should be verified before it ships.",
    ],
  },

  /* ===========================================================================
   * MAITLAND — B2B, office park, long sales cycles.
   * ========================================================================= */
  {
    city: "Maitland",
    county: "Orange County",
    group: "central-florida",
    tier: "metro",
    eyebrow: "Orange County — Maitland Center",
    title: "Maitland, FL Video Production for B2B Marketing",
    description:
      "Video and Meta ad marketing for Maitland professional services firms around Maitland Center and SR 414, built for long B2B cycles, not impulse buys.",
    h1: "Video Marketing for Maitland Businesses",
    cardLine: "B2B buyers, long sales cycles, and expertise on camera.",
    servicesHeading: "The services that suit a long sales cycle",
    lede:
      "Maitland is the most business-to-business city in this part of the metro. Maitland Center and the offices strung along Maitland Boulevard hold accountancy, law, insurance, financial advice, IT and agency work — audiences that do not buy from a fifteen-second offer video and are not supposed to.",
    publishedLine:
      "Targeted video marketing solutions for growing Maitland businesses.",
    travel: {
      label: "About five miles south-west of the studio",
      body: "Casselberry to Maitland Center runs across 436 and down Maitland Avenue, roughly fifteen minutes. Executive interviews are usually filmed in your own boardroom rather than at the studio.",
    },
    marketHeading: "Selling something with a six-month sales cycle",
    market: [
      "A B2B buyer in Maitland Center is not the person a standard Meta funnel is designed for. They are researching for weeks, they are not the only decision-maker, and there is no offer that shortens that meaningfully. Video still works — better than almost anything else — but its job is credibility and familiarity across a long window, not a same-day conversion.",
      "That changes what gets filmed. The highest-value asset for a professional services firm is usually its people explaining something genuinely useful: how a valuation actually works, what a policy does not cover, why a project overran. Expertise on camera is the closest thing a firm has to a referral at scale, and it is content the firm's competitors are structurally reluctant to make.",
      "It also changes what gets measured. Cost per lead is the wrong first number here, because a small number of the right conversations is worth more than a pile of forms. The pipeline is the metric, which is why the CRM and automation side of this work matters more in Maitland than it does in a retail market a few miles away.",
    ],
    placesLabel: "Where the work happens",
    places: [
      "Maitland Center office park",
      "Maitland Boulevard / SR 414",
      "I-4 exit 90",
      "Lake Lily and downtown Maitland",
      "Maitland Avenue corridor",
      "Eatonville",
      "Winter Park border",
    ],
    approachHeading: "Interview-led production, pipeline-led measurement",
    approach: [
      "A single half-day in your office typically yields a full quarter of expert-led content: a handful of longer explainer pieces plus the short cuts that carry them into a Meta or YouTube feed. Filming in the firm's own space costs less time than moving five partners to a studio.",
      "The campaign side is built around a longer attribution window and a CRM that can show which conversations came from which content — because a page of leads that never becomes a pipeline is a very expensive way to be busy.",
    ],
    services: [
      {
        slug: "studio-production",
        why: "Expert interviews with your own partners and specialists, filmed on site. In professional services this is the asset that does the selling.",
      },
      {
        slug: "marketing-automations",
        why: "Long cycles need nurture. Without it, a lead generated in March is forgotten by the time it is ready to buy in July.",
      },
      {
        slug: "website-seo",
        why: "B2B buyers research before they enquire. Ranking for the questions they research is how you get into the shortlist early.",
      },
      {
        slug: "appointment-setting",
        why: "Fewer, better conversations. The value here is qualification, not volume.",
      },
    ],
    nearby: ["Winter Park", "Altamonte Springs", "Casselberry"],
    faqs: [
      {
        question: "Does Meta advertising work for a B2B firm?",
        answer:
          "It does, but not as a lead-form-and-hope campaign. It works as reach and retargeting against expertise-led content, measured on pipeline over a longer window rather than on cost per form fill.",
      },
      {
        question: "Can you film in our offices at Maitland Center?",
        answer:
          "Yes, and it is usually the practical option — moving several partners to a studio costs more billable hours than the shoot itself.",
      },
      {
        question: "How much content does one filming day produce?",
        answer:
          "For an interview-led session, typically enough for a quarter: several longer explainer pieces and the short-form cuts derived from them. The exact count depends on how many people are on camera.",
      },
    ],
    proofGaps: [
      "TODO: a Maitland professional services client, and a real pipeline number rather than a lead count. This page argues for pipeline measurement and cannot yet show one.",
      "TODO: confirm which CRM the automations are actually built in — B2B buyers in this market will ask, and a vague answer costs the enquiry.",
    ],
  },

  /* ===========================================================================
   * SANFORD — two distinct economies in one city. The most useful local insight.
   * ========================================================================= */
  {
    city: "Sanford",
    county: "Seminole County",
    group: "central-florida",
    tier: "metro",
    eyebrow: "Seminole County seat",
    title: "Sanford FL Social Video and Lead-Gen Ad Creative",
    description:
      "Social video and Meta ad creative for Sanford businesses. Historic downtown and the SR 46 trades corridor are two markets that need two plans.",
    h1: "Social Video and Ad Creative for Sanford Businesses",
    cardLine: "Two economies in one city: historic downtown and the SR 46 corridor.",
    servicesHeading: "Different services for the two halves of Sanford",
    lede:
      "Sanford is really two economies wearing one city name. There is the walkable historic downtown around First Street and the Lake Monroe RiverWalk — restaurants, breweries, antiques, events — and there is the SR 46 and airport belt of trades, logistics and industrial operators. They need almost nothing in common from a marketing plan.",
    publishedLine:
      "Engaging social media videos and lead-generating ad creatives for Sanford brands.",
    travel: {
      label: "About sixteen miles north of the studio",
      body: "Twenty-five minutes up US 17-92 or I-4 from Casselberry. Close enough for evening and weekend filming downtown, which is when that part of Sanford actually looks like itself.",
    },
    marketHeading: "Two markets, two plans",
    market: [
      "Downtown Sanford trades on atmosphere and footfall. A brewery, a restaurant or an antiques dealer on First Street is competing for a discretionary evening out against every other option in Seminole County, and the thing that wins it is short, frequent, genuinely social video — the place looking busy and alive, filmed when it is busy and alive. That is a content cadence problem, not a campaign problem.",
      "The SR 46 corridor, the industrial park and the businesses around Orlando Sanford International Airport are the opposite. Contractors, logistics operators, auto and marine trades and equipment suppliers sell high-value, infrequent, considered work. They need lead generation with real qualification behind it, and creative that demonstrates competence rather than atmosphere.",
      "Being the Seminole County seat adds a third wrinkle worth knowing: a lot of search demand around Sanford is county-level and administrative rather than city-level and commercial, which makes keyword selection here noticeably less obvious than in the cities to the south.",
    ],
    placesLabel: "Both sides of the city",
    places: [
      "Historic downtown and First Street",
      "Lake Monroe and the RiverWalk",
      "Sanford Avenue",
      "SR 46 corridor",
      "Orlando Sanford International Airport area",
      "Midway and Goldsboro",
      "Lake Mary border",
    ],
    approachHeading: "Which half of Sanford are you?",
    approach: [
      "For downtown businesses the engagement is built around volume and recency: regular short-form filming so the feed shows this month rather than last year, plus paid distribution tight enough to reach the surrounding towns without spilling into Orlando.",
      "For the SR 46 and airport corridor it is the inverse — fewer, more substantial pieces demonstrating capability, pointed at a much smaller audience, with the qualification and follow-up handled by automation because these leads are worth chasing properly.",
    ],
    services: [
      {
        slug: "meta-ads-production",
        why: "Downtown needs frequent, current, social-native video. Ad creative here goes stale in weeks, not quarters.",
      },
      {
        slug: "local-seo",
        why: "Sanford search demand mixes county-seat administrative queries with commercial ones. Sorting the two out is most of the local SEO job here.",
      },
      {
        slug: "appointment-setting",
        why: "For the trades and contractors along SR 46, the value is in qualifying enquiries before anyone drives out to quote.",
      },
      {
        slug: "studio-production",
        why: "Capability-led film for industrial and trade operators — the work itself, shot properly, is the credential.",
      },
    ],
    nearby: ["Lake Mary", "Altamonte Springs", "Casselberry"],
    faqs: [
      {
        question: "Can you film downtown in the evening or at a weekend?",
        answer:
          "Yes, and for hospitality on First Street that is usually the point — a venue filmed empty on a Tuesday afternoon advertises the wrong thing.",
      },
      {
        question: "We are a contractor off SR 46, not a downtown business. Is this still relevant?",
        answer:
          "It is a different plan entirely. Fewer, longer capability-led pieces, tighter targeting and much more emphasis on qualifying the enquiries that come in.",
      },
      {
        question: "How far is Sanford from your studio?",
        answer:
          "About sixteen miles, twenty-five minutes up 17-92 or I-4 from Casselberry.",
      },
    ],
    proofGaps: [
      "TODO: one downtown Sanford hospitality client and one SR 46 trade client — this page splits the city in two and needs an example on each side.",
      "TODO: confirm whether evening and weekend shoot availability is genuinely offered before the FAQ above promises it.",
    ],
  },

  /* ===========================================================================
   * LAKE MARY — corporate corridor. Brand standards and recruitment.
   * ========================================================================= */
  {
    city: "Lake Mary",
    county: "Seminole County",
    group: "central-florida",
    tier: "metro",
    eyebrow: "Seminole County — I-4 exit 98",
    title: "Lake Mary Video Marketing and Meta Ad Campaigns",
    description:
      "Cinematic video and Meta ad campaigns for Lake Mary businesses around Colonial TownPark, Heathrow and Primera, including recruitment film.",
    h1: "Cinematic Video Marketing for Lake Mary Businesses",
    cardLine: "Corporate corridor work, brand books included — and recruitment film.",
    servicesHeading: "What corridor businesses tend to buy",
    lede:
      "Lake Mary is the corporate end of Seminole County. Colonial TownPark, Heathrow and the Primera office parks around I-4 exit 98 hold employers with real marketing departments, existing brand standards and, frequently, a hiring problem that is more urgent than their lead problem.",
    publishedLine:
      "Cinematic video marketing and Meta ad campaigns to scale Lake Mary businesses.",
    travel: {
      label: "About thirteen miles north of the studio",
      body: "Twenty minutes up I-4 or 17-92 from Casselberry. Corporate shoots usually run on site at TownPark or Heathrow, with the studio available for controlled interview setups.",
    },
    marketHeading: "Where the brief usually arrives half-written",
    market: [
      "The businesses along the Lake Mary corridor are mostly further along than the metro average. Financial services, technology, healthcare administration and the professional firms that serve them tend to arrive with a brand book, a colour palette, a legal review process and an opinion about how they should look on camera. That is a better starting point than a blank page, and it means the production work is closer to executing a standard than inventing one.",
      "It also means the corridor competes for the same affluent residential audience that Heathrow, Longwood and Lake Mary proper contain — a market small enough that a Meta campaign can genuinely saturate it. Frequency management stops being a technical footnote and becomes the main reason a campaign either keeps working or quietly stops.",
      "The other real demand here is recruitment. Corridor employers are hiring against every other employer on the same stretch of I-4, and a careers page with no film on it is at a straightforward disadvantage against one that shows the building, the team and the work.",
    ],
    placesLabel: "The corridor and around it",
    places: [
      "Colonial TownPark",
      "Heathrow",
      "Primera office park",
      "Lake Mary Boulevard",
      "I-4 exit 98",
      "Longwood",
      "Sanford border",
    ],
    approachHeading: "Working inside an existing brand",
    approach: [
      "Production is scoped against your brand standards rather than around them — colour, typography, tone and any legal or compliance review built into the schedule instead of discovered at delivery. For regulated clients that review step is the difference between a two-week and a two-month turnaround.",
      "On the media side the plan assumes a small, saturable local audience: capped frequency, planned creative rotation, and separate campaigns for customer acquisition and recruitment because they are aimed at different people and judged on different numbers.",
    ],
    services: [
      {
        slug: "studio-production",
        why: "Higher production values, executed inside an existing brand book — including recruitment and culture film for corridor employers.",
      },
      {
        slug: "meta-ads-production",
        why: "The local audience is small enough to saturate, so planned creative rotation matters more here than in a larger market.",
      },
      {
        slug: "marketing-automations",
        why: "Corridor businesses usually already have a CRM. The work is making it actually route and follow up, rather than replacing it.",
      },
      {
        slug: "website-seo",
        why: "Established brands often rank for their own name and nothing else. The gap is the non-branded search their competitors are quietly taking.",
      },
    ],
    nearby: ["Sanford", "Altamonte Springs", "Casselberry"],
    faqs: [
      {
        question: "We already have brand guidelines and a marketing team. How does that work?",
        answer:
          "Normally well. The guidelines become the scope rather than a constraint discovered late, and your team keeps sign-off — the review step is built into the schedule up front.",
      },
      {
        question: "Do you produce recruitment or employer-brand video?",
        answer:
          "Yes. It is one of the more common asks along the corridor, and it is planned as a separate campaign from customer acquisition because it targets different people and is judged on different numbers.",
      },
      {
        question: "Is the local audience big enough for a sustained Meta campaign?",
        answer:
          "It is, with frequency capped and creative rotated on a schedule. Lake Mary is small enough that an unmanaged campaign will show the same people the same video until it stops working.",
      },
    ],
    proofGaps: [
      "TODO: a Lake Mary corridor employer, ideally one where recruitment film was produced, with permission to be named.",
      "TODO: confirm whether BVS has worked under a compliance or legal review process — this page claims familiarity with it and that should be verified.",
    ],
  },

  /* ===========================================================================
   * TAMPA — the biggest auction they serve. Day-trip production.
   * ========================================================================= */
  {
    city: "Tampa",
    county: "Hillsborough County",
    group: "statewide",
    tier: "statewide",
    eyebrow: "Hillsborough County — Tampa Bay",
    title: "Tampa Video Marketing and Meta Ads Production",
    description:
      "Meta ad creative and video production for Tampa businesses. A two-hour drive from our Casselberry studio, so production days happen on location in Tampa Bay.",
    h1: "Video Marketing and Meta Ads for Tampa Businesses",
    cardLine: "The most expensive auction we work in. Creative volume is the lever.",
    servicesHeading: "Where the leverage is in an expensive market",
    lede:
      "Tampa is the largest and most expensive advertising market we work in, and the economics of it are different from Orlando's in a way that catches people out: the same budget buys fewer impressions, the auction has more sophisticated advertisers in it, and creative fatigue arrives faster because the good operators are all publishing constantly.",
    publishedLine: "",
    travel: {
      label: "About 100 miles west — under two hours on I-4",
      body: "Close enough that Tampa production runs as a scheduled shoot day rather than a trip. The campaign, automation and reporting work runs from Casselberry continuously.",
    },
    marketHeading: "Competing in a metro that outspends you",
    market: [
      "Tampa Bay is one of the larger media markets in the south-east, and it behaves like one. Westshore, Water Street, downtown and the professional corridors are full of businesses running properly resourced paid social, and the practical effect is that mediocre creative simply does not clear the auction at a sensible cost. Budget alone will not fix that; more and better creative sometimes will.",
      "The bay itself is the other thing to plan around. St. Petersburg and Clearwater are a bridge away and are, for many businesses, a genuinely separate trade area with a separate drive-time reality. Treating Tampa Bay as one audience is convenient and usually wrong — the customer who will cross the Howard Frankland for you is not the same customer as the one in Hyde Park.",
      "The upside is scale. Tampa is large enough that narrow, specific positioning still has a viable audience behind it, which is rarely true in smaller Florida markets. A campaign that would starve for volume in Sanford can run comfortably here on a much tighter definition of who it is for.",
    ],
    placesLabel: "Areas we produce for",
    places: [
      "Westshore business district",
      "Downtown Tampa and Water Street",
      "Ybor City",
      "Hyde Park and South Tampa",
      "Brandon and Riverview",
      "St. Petersburg",
      "Clearwater",
    ],
    approachHeading: "How a Casselberry studio serves Tampa",
    approach: [
      "We do not have an office in Tampa and this page will not pretend otherwise. What we have is a studio in Casselberry and about a hundred miles of I-4, which is short enough that filming happens on location in Tampa on scheduled production days rather than being batched into occasional trips.",
      "Everything that recurs — ad account management, creative iteration, automations, reporting and appointment setting — runs remotely and continuously, which is how it would run even if the office were on Kennedy Boulevard. The part that genuinely benefits from being in the room is the filming, and that is the part we drive for.",
    ],
    services: [
      {
        slug: "meta-ads-production",
        why: "In an expensive auction, creative volume is the lever that actually moves cost per result. This is the core of most Tampa engagements.",
      },
      {
        slug: "studio-production",
        why: "Filmed on location in Tampa Bay on scheduled production days, planned to bank several months of creative in one visit.",
      },
      {
        slug: "marketing-automations",
        why: "Higher lead volume makes manual follow-up the bottleneck faster here than in a smaller market.",
      },
      {
        slug: "appointment-setting",
        why: "Expensive clicks make unworked leads expensive mistakes. Speed to first contact matters more the more you paid for the lead.",
      },
    ],
    nearby: ["Fort Myers", "Casselberry"],
    faqs: [
      {
        question: "Do you have an office in Tampa?",
        answer:
          "No. Our only office is the studio at 75 Concord Dr Unit B, Casselberry. Tampa filming happens on location, and the ongoing campaign work is managed remotely.",
      },
      {
        question: "How often would you actually be in Tampa?",
        answer:
          "As often as the production schedule needs — it is under two hours each way, so a shoot day is a day, not a trip. Most engagements plan filming in batches to keep the creative pipeline ahead of fatigue.",
      },
      {
        question: "Should our campaigns cover St. Petersburg and Clearwater too?",
        answer:
          "Only if your customers genuinely cross the bay for you. For many local service businesses they do not, and including them quietly inflates cost per result.",
      },
    ],
    proofGaps: [
      "TODO: at least one named Tampa Bay client. This is the largest market on the list and the page currently competes on structure alone.",
      "TODO: a real Tampa production day in the reel — the claim that filming happens on location is much stronger with footage attached.",
    ],
  },

  /* ===========================================================================
   * JACKSONVILLE — a city too large for one radius. Strongest technical angle.
   * ========================================================================= */
  {
    city: "Jacksonville",
    county: "Duval County",
    group: "statewide",
    tier: "statewide",
    eyebrow: "Duval County — North Florida",
    title: "Jacksonville Video Ads and Marketing Automation",
    description:
      "Video marketing and Meta ads for Jacksonville businesses. Duval is too large for one ad radius, so campaigns are built by district and by beach, not city-wide.",
    h1: "Video Marketing and Meta Ads Across Jacksonville",
    cardLine: "750 square miles of city. One ad radius is the wrong unit.",
    servicesHeading: "The services that survive a 750-square-mile city",
    lede:
      "Jacksonville covers roughly 750 square miles — the largest city by land area in the contiguous United States — and that single fact should change how every ad campaign in it is built. A Mandarin customer and a Jacksonville Beach customer share a city name and almost nothing else, including a willingness to drive to you.",
    publishedLine: "",
    travel: {
      label: "About 130 miles north — roughly two hours",
      body: "Up I-95 or SR 417 from Casselberry. Production runs as scheduled shoot days; account management, automation and reporting run continuously from the studio.",
    },
    marketHeading: "One city name, a dozen trade areas",
    market: [
      "Because Duval County consolidated with the city, the boundary that Meta and Google both treat as \"Jacksonville\" is enormous. Targeting it as one audience means a Southside dental practice pays to reach people forty-five minutes away in Baldwin who were never going to book. The fix is unglamorous and effective: build by district — Southside and Tinseltown, Riverside and Avondale, San Marco, Mandarin, the Northside — and treat each as its own trade area with its own creative reference points.",
      "The Beaches are a separate market again. Jacksonville Beach, Neptune Beach and Atlantic Beach have their own commercial character, their own seasonality and their own reluctance to drive inland. So do the suburbs that are not technically in Duval at all: Orange Park in Clay County, and Ponte Vedra and Nocatee in St. Johns, where a great deal of the region's higher-income growth actually sits.",
      "The economy behind all of this leans towards logistics, insurance, healthcare, financial services back-office and the enormous home-services demand that follows fast residential growth in St. Johns County. Those are lead-generation businesses with real sales processes attached, which is why the automation and follow-up side of the work usually earns more here than another round of creative would.",
    ],
    placesLabel: "Districts and adjacent markets",
    places: [
      "Southside and Tinseltown",
      "Riverside and Avondale",
      "San Marco",
      "Mandarin",
      "Northside and Oceanway",
      "Jacksonville Beach, Neptune Beach and Atlantic Beach",
      "Orange Park (Clay County)",
      "Ponte Vedra and Nocatee (St. Johns County)",
    ],
    approachHeading: "How a Casselberry studio serves Jacksonville",
    approach: [
      "There is no Jacksonville office — the studio is in Casselberry, about two hours south. Filming is scheduled as production days in Jacksonville, planned to bank enough creative that the campaign is never waiting on a shoot.",
      "The recurring work is remote by design: district-level campaign structure, creative iteration, CRM automation and reporting. For a business spread across Duval and St. Johns, the highest-value part of the engagement is usually the routing and follow-up logic rather than the camera.",
    ],
    services: [
      {
        slug: "meta-ads-production",
        why: "District-level campaign structure with creative that references the right side of the city, instead of one radius covering 750 square miles.",
      },
      {
        slug: "marketing-automations",
        why: "Multi-district lead flow needs routing, speed-to-lead and nurture built in — this is usually where the biggest gain is in Jacksonville.",
      },
      {
        slug: "local-seo",
        why: "Duval, Clay and St. Johns are three counties on one map. Location targeting and Google Business Profile work have to account for all three.",
      },
      {
        slug: "studio-production",
        why: "Filmed on location across the districts you actually serve, banked in batches to cover the gap between production days.",
      },
    ],
    nearby: ["Sanford", "Casselberry"],
    faqs: [
      {
        question: "Do you have a Jacksonville office?",
        answer:
          "No. The studio is at 75 Concord Dr Unit B, Casselberry, about two hours south. Filming happens on location in Jacksonville and the campaign work is managed remotely.",
      },
      {
        question: "Why not just target Jacksonville as one audience?",
        answer:
          "Because the city covers roughly 750 square miles. A single radius spends most of a local business's budget on people who will never travel to it. District-level ad sets cost the same to run and waste far less.",
      },
      {
        question: "Do you cover Ponte Vedra, Nocatee and Orange Park?",
        answer:
          "Yes. They sit in St. Johns and Clay counties rather than Duval, but commercially they are part of the same market and are usually worth their own ad sets.",
      },
    ],
    proofGaps: [
      "TODO: a named Jacksonville client, ideally one operating across more than one district — that is the specific claim this page makes.",
      "TODO: confirm realistic production-day frequency for a two-hour drive so the scheduling answer above reflects what is actually offered.",
    ],
  },

  /* ===========================================================================
   * NAPLES — season is the whole planning constraint.
   * ========================================================================= */
  {
    city: "Naples",
    county: "Collier County",
    group: "statewide",
    tier: "statewide",
    eyebrow: "Collier County — South-west Florida",
    title: "Naples FL Luxury Brand Video and Meta Ad Strategy",
    description:
      "Video marketing and Meta ads for Naples businesses, planned around season. Creative filmed and budgets weighted for the Collier County winter, not the summer.",
    h1: "Video Marketing for Naples Brands",
    cardLine: "November to April decides the year. The creative has to be ready first.",
    servicesHeading: "What a seasonal Naples business needs, in order",
    lede:
      "Naples runs on a calendar that most marketing plans ignore. From roughly November to April the county's population and spending swell, and then they leave. A campaign built without that in mind spends its best creative in July and its smallest budget in February, which is exactly backwards.",
    publishedLine: "",
    travel: {
      label: "About 200 miles south-west — roughly three and a half hours",
      body: "I-4 to I-75 from Casselberry. Production is planned as multi-day trips, ideally scheduled ahead of season so the creative is ready before the audience arrives.",
    },
    marketHeading: "Planning around season instead of against it",
    market: [
      "The seasonal swing in Collier County is not a marketing detail, it is the market. Restaurants, home services, aesthetics, marine, interior design, real estate and the luxury trades all see their year concentrated into a handful of months, and the businesses that do well are the ones whose creative was finished and whose retargeting audiences were already warm before the season started.",
      "That has an awkward production consequence: footage shot in the off-season has to look like the season. Empty streets, empty dining rooms and off-peak light read as failure to an audience that only knows Naples full. Planning shoots ahead of the swing — or filming during it for use the following year — is a scheduling decision worth more than most creative decisions.",
      "The audience itself is affluent, older on average than the state, and unusually intolerant of cheap production. Fifth Avenue South and Third Street South set a visual standard that a business advertising to the same customers has to at least approach. Below that line, video does not underperform gently; it actively signals the wrong tier.",
    ],
    placesLabel: "Collier County and the coast north of it",
    places: [
      "Fifth Avenue South",
      "Third Street South and Old Naples",
      "Park Shore and Vanderbilt Beach",
      "North Naples",
      "Marco Island",
      "Bonita Springs",
      "Estero",
    ],
    approachHeading: "How a Casselberry studio serves Naples",
    approach: [
      "There is no Naples office — the studio is in Casselberry, about three and a half hours away across the state. Because that is a genuine trip rather than a drive, production is planned as multi-day blocks that bank a season's worth of creative in one visit, scheduled around when the city looks the way it needs to look.",
      "Between visits, everything that does not need a camera runs from the studio: campaign management, creative iteration from the banked footage, automations, appointment setting and reporting. For a seasonal business the budget calendar is part of that work — weighting spend towards the months that actually convert instead of running flat all year.",
    ],
    services: [
      {
        slug: "studio-production",
        why: "The visual standard on Fifth Avenue South is the floor, not the target. Filmed in multi-day blocks timed to how the city looks in season.",
      },
      {
        slug: "meta-ads-production",
        why: "Creative and budget weighted to the November-to-April swing, with retargeting audiences built before season rather than during it.",
      },
      {
        slug: "appointment-setting",
        why: "In a compressed season, a slow response is a lost booking — there is no second chance in August.",
      },
      {
        slug: "website-seo",
        why: "Seasonal search demand is predictable, which makes it plannable. Pages should be ranking before the audience lands, not after.",
      },
    ],
    nearby: ["Fort Myers", "Fort Lauderdale"],
    faqs: [
      {
        question: "Do you have an office in Naples?",
        answer:
          "No. Our only office is the studio in Casselberry, about three and a half hours north-east. Filming in Naples is planned as multi-day production trips.",
      },
      {
        question: "When should a seasonal Naples business start its campaign?",
        answer:
          "Before season, not during it. Creative finished and warm audiences built ahead of November is what makes the winter months efficient rather than expensive.",
      },
      {
        question: "Do you cover Marco Island and Bonita Springs?",
        answer:
          "Yes. They are part of the same trade area for most Naples businesses and are usually worth their own targeting rather than being folded into a Naples radius.",
      },
    ],
    proofGaps: [
      "TODO: a Naples client and a real season-over-season comparison. Seasonality is this page's entire argument and it currently has no evidence behind it.",
      "TODO: confirm what a multi-day production trip actually costs the client in travel, so the page can be specific instead of implying it is free.",
    ],
  },

  /* ===========================================================================
   * FORT MYERS — Cape Coral is the catchment nobody targets. Trades-weighted.
   * ========================================================================= */
  {
    city: "Fort Myers",
    county: "Lee County",
    group: "statewide",
    tier: "statewide",
    eyebrow: "Lee County — South-west Florida",
    title: "Fort Myers Video Marketing for Home Services",
    description:
      "Meta ads and video production for Fort Myers home services and trades, built for the whole Lee County catchment including Cape Coral and Lehigh Acres.",
    h1: "Video Marketing for Fort Myers and Lee County Businesses",
    cardLine: "Cape Coral is in your catchment whether you targeted it or not.",
    servicesHeading: "What actually moves the numbers for Lee County trades",
    lede:
      "Most Fort Myers ad accounts make the same mistake: they target Fort Myers. Cape Coral sits across the river with a larger population than the city itself, Lehigh Acres and North Fort Myers add tens of thousands more, and a campaign drawn around the city limits is quietly ignoring most of its own market.",
    publishedLine: "",
    travel: {
      label: "About 175 miles south-west — roughly three hours",
      body: "I-4 to I-75 from Casselberry. Production is scheduled as trips; campaign management, automation and reporting run continuously from the studio.",
    },
    marketHeading: "The catchment is bigger than the city",
    market: [
      "Lee County's population is spread across several municipalities that behave as one trade area. Cape Coral, North Fort Myers, Lehigh Acres, Estero and Bonita Springs all send customers into and across Fort Myers, and for a home services business the practical service radius crosses those boundaries constantly. Geo-targeting drawn on the city name is the single most common way local budget gets wasted here.",
      "The demand mix is weighted towards home services and contracting more heavily than anywhere else on this list — roofing, remodelling, pools, HVAC, marine, landscaping and the associated trades — alongside the seasonal hospitality and retail that South-west Florida shares with Naples. That is a lead-generation market, and it rewards proof of work far more than it rewards brand film.",
      "It is also a market where trust is doing unusual work. Homeowners in Lee County have had reason to be careful about who they let onto a property, and video that shows the crew, the process and finished jobs answers a question that a written testimonial cannot. The most valuable thing a contractor here can film is the work itself.",
    ],
    placesLabel: "The Lee County catchment",
    places: [
      "Downtown Fort Myers River District",
      "McGregor Boulevard",
      "Cape Coral",
      "North Fort Myers",
      "Lehigh Acres",
      "Estero and Bonita Springs",
      "Fort Myers Beach and Sanibel",
    ],
    approachHeading: "How a Casselberry studio serves Fort Myers",
    approach: [
      "There is no office in Fort Myers — the studio is in Casselberry, about three hours north-east. Filming is planned as production trips, and for trades clients a large share of the useful footage comes from job sites rather than a set, which changes the scheduling: we film where the crews already are.",
      "The recurring work runs remotely from the studio — campaign structure across the Lee County municipalities, creative rotation, lead routing and follow-up. For a contractor, speed to first contact usually moves the numbers more than the next creative iteration does.",
    ],
    services: [
      {
        slug: "meta-ads-production",
        why: "Targeting built around the real Lee County catchment — Cape Coral, Lehigh Acres and North Fort Myers included — rather than around the city name.",
      },
      {
        slug: "appointment-setting",
        why: "Home services leads go cold in hours. Qualifying and booking them quickly is worth more here than another round of creative.",
      },
      {
        slug: "local-seo",
        why: "A contractor serving several municipalities needs each of them to be a real page and a real signal, not one line on a service-area list.",
      },
      {
        slug: "studio-production",
        why: "Job-site filming. For trades, finished work and the crew on camera answer the trust question that testimonials cannot.",
      },
    ],
    nearby: ["Naples", "Tampa"],
    faqs: [
      {
        question: "Should our ads cover Cape Coral as well as Fort Myers?",
        answer:
          "Almost certainly. Cape Coral has a larger population than Fort Myers itself and sits inside the normal service radius for most home services businesses. Excluding it is usually an accident rather than a decision.",
      },
      {
        question: "Can you film on our job sites?",
        answer:
          "Yes, and for trades it is normally the most useful footage available — the work in progress and the finished result do more than anything filmed on a set.",
      },
      {
        question: "Do you have an office in Fort Myers?",
        answer:
          "No. Our only office is the studio in Casselberry. Filming in Lee County is scheduled as production trips, and the ongoing campaign work is managed remotely.",
      },
    ],
    proofGaps: [
      "TODO: a Lee County home services or contracting client with permission to be named, and job-site footage in the reel.",
      "TODO: confirm minimum engagement size for a market three hours from the studio — the trip economics should be stated honestly rather than left implied.",
    ],
  },

  /* ===========================================================================
   * FORT LAUDERDALE — the most expensive DMA on the list, and a language question.
   * ========================================================================= */
  {
    city: "Fort Lauderdale",
    county: "Broward County",
    group: "statewide",
    tier: "statewide",
    eyebrow: "Broward County — South Florida",
    title: "Fort Lauderdale Video Marketing and Meta Ads",
    description:
      "Video and Meta ad production for Fort Lauderdale and Broward businesses, built for one of the most competitive and multilingual ad markets in Florida.",
    h1: "Video Marketing and Meta Ads in Fort Lauderdale",
    cardLine: "South Florida costs, South Florida competition, and a language question.",
    servicesHeading: "What it takes to compete in Broward",
    lede:
      "Fort Lauderdale sits inside the Miami–Fort Lauderdale–West Palm Beach media market, which is one of the largest and most contested in the country. Everything costs more here, creative fatigues faster, and the audience is genuinely multilingual — three facts that make a campaign copied from a Central Florida account underperform almost immediately.",
    publishedLine: "",
    travel: {
      label: "About 215 miles south-east — roughly three and a half hours",
      body: "Florida's Turnpike from Casselberry. Production is scheduled as multi-day trips; the account, automation and reporting work runs continuously from the studio.",
    },
    marketHeading: "An expensive auction with a language question in it",
    market: [
      "Broward advertisers compete against Miami-Dade budgets in an auction where impressions are expensive and every category has well-funded incumbents. Two things move the needle: more creative variants in rotation than a smaller market would need, and much tighter targeting, because the cost of reaching the wrong person is higher than it is anywhere else on this list.",
      "The language question is not optional. A large share of the South Florida audience is Spanish-dominant or bilingual, and for some categories an English-only campaign is addressing a fraction of the available market. That is a production decision to make before the shoot rather than a subtitle added afterwards — it changes casting, script and often the offer itself.",
      "Underneath the metro is a set of very specific local economies: the marine and yachting trade around Port Everglades and the New River, hospitality and events along Las Olas and the beach, real estate and construction across Broward, and the professional services that serve all of it. These are not one market, and a campaign that treats Broward as a single audience gets the worst of every one of them.",
    ],
    placesLabel: "Fort Lauderdale and the rest of Broward",
    places: [
      "Las Olas Boulevard",
      "Flagler Village and downtown",
      "Fort Lauderdale Beach",
      "Port Everglades and the marine district",
      "Hollywood and Dania Beach",
      "Plantation and Sunrise",
      "Pompano Beach and Coral Springs",
    ],
    approachHeading: "How a Casselberry studio serves Fort Lauderdale",
    approach: [
      "There is no Fort Lauderdale office — the studio is in Casselberry, about three and a half hours north. Filming is planned as multi-day production trips designed to bank a long run of creative, because in this market the campaign will consume variants faster than a monthly shoot could supply them.",
      "Campaign management, creative iteration, automations and appointment setting run from the studio between trips. That is the part of the work where being local changes nothing — an ad account is managed the same way from Casselberry as it would be from Las Olas.",
    ],
    services: [
      {
        slug: "meta-ads-production",
        why: "The most contested auction we work in. Variant volume and tight targeting are the two levers that reliably move cost per result here.",
      },
      {
        slug: "studio-production",
        why: "Filmed in multi-day blocks so the creative pipeline stays ahead of how fast this market burns through it.",
      },
      {
        slug: "marketing-automations",
        why: "Expensive leads make manual follow-up the most costly bottleneck in the funnel.",
      },
      {
        slug: "appointment-setting",
        why: "When a lead costs South Florida money, the response time on it is a budget decision rather than an admin one.",
      },
    ],
    nearby: ["Naples", "Fort Myers"],
    faqs: [
      {
        question: "Can you produce Spanish-language ad creative?",
        answer:
          "This should be scoped on the call rather than assumed either way — for many Broward categories it is the difference between reaching the market and reaching part of it, and it affects casting and scripting from the start.",
      },
      {
        question: "Do you have an office in Fort Lauderdale?",
        answer:
          "No. Our only office is the studio at 75 Concord Dr Unit B, Casselberry. South Florida filming is scheduled as production trips and the account work is managed remotely.",
      },
      {
        question: "Why is Fort Lauderdale advertising more expensive than Orlando?",
        answer:
          "It sits in the Miami–Fort Lauderdale–West Palm Beach media market, where there are more advertisers with larger budgets bidding for the same attention. Creative quality and targeting precision matter more as a result.",
      },
    ],
    proofGaps: [
      "TODO: confirm whether BVS can genuinely deliver Spanish-language production. The FAQ deliberately does not claim it — it should be answered properly before this page goes live.",
      "TODO: a Broward client with permission to be named. Without one, this page is competing on argument alone in the hardest market on the list.",
    ],
  },

  /* ===========================================================================
   * PENSACOLA — the honest outlier. Seven hours away and in a different time zone.
   * ========================================================================= */
  {
    city: "Pensacola",
    county: "Escambia County",
    group: "statewide",
    tier: "statewide",
    eyebrow: "Escambia County — Florida Panhandle",
    title: "Pensacola Video Marketing and Paid Social Ads",
    description:
      "Meta ads, automations and video for Pensacola businesses. Run remotely from our Casselberry studio with production booked as scheduled Panhandle trips.",
    h1: "Video Marketing and Paid Social for Pensacola Businesses",
    cardLine: "Seven hours west and an hour behind. Remote-first, and honest about it.",
    servicesHeading: "What works well at 450 miles, and what does not",
    lede:
      "Pensacola is the farthest city we serve, by a wide margin — around 450 miles from the studio and in the Central time zone rather than Eastern. Pretending that makes no difference would be dishonest, so this page says plainly how the work is structured instead.",
    publishedLine: "",
    travel: {
      label: "About 450 miles west — and an hour behind",
      body: "Roughly a seven-hour drive from Casselberry, in Central time. Recurring work runs remotely; filming is booked as planned multi-day trips, not on demand.",
    },
    marketHeading: "A Gulf Coast market with three distinct engines",
    market: [
      "Pensacola's economy runs on tourism along Pensacola Beach and Perdido Key, a large military and defence-adjacent presence around Naval Air Station Pensacola, and the healthcare and professional services that support both. Each has a different buying rhythm, and the tourism side is sharply seasonal in a way that mirrors South-west Florida but peaks in summer rather than winter.",
      "It is also a relatively contained market. Downtown around Palafox Street, the beach communities, and the Gulf Breeze and Navarre corridor east of the bay make up most of the commercial audience, which means paid social audiences here are small enough to saturate quickly and creative fatigue is a live constraint rather than a theoretical one.",
      "The practical consequence is that the services which do not require a camera on site — ad management, automation, appointment setting and SEO — carry a larger share of the value in Pensacola than they do anywhere closer to the studio. That is a real limitation, stated plainly, not a positioning line.",
    ],
    placesLabel: "The market this page covers",
    places: [
      "Downtown and Palafox Street",
      "Pensacola Beach",
      "Perdido Key",
      "Gulf Breeze",
      "Navarre",
      "Escambia and Santa Rosa counties",
    ],
    approachHeading: "Being straight about a seven-hour drive",
    approach: [
      "There is no Pensacola office and no crew stationed in the Panhandle. The studio is in Casselberry, about seven hours east, so filming is booked as planned multi-day trips that bank several months of creative at once — not as a shoot that can be added to next week's schedule.",
      "Everything else runs remotely and continuously: Meta ad management, creative iteration from the banked footage, automations, appointment setting and SEO. Meetings account for the hour of time difference. If a business needs frequent, responsive, on-site filming, a local Pensacola crew will serve it better than we can, and it is worth saying so before an engagement rather than after it.",
    ],
    services: [
      {
        slug: "meta-ads-production",
        why: "Managed remotely and continuously. In a small, saturable market the planned creative rotation matters more than the shoot cadence.",
      },
      {
        slug: "marketing-automations",
        why: "Distance-proof by nature — this is the work that runs identically whether we are seven hours away or seven minutes.",
      },
      {
        slug: "appointment-setting",
        why: "Handled remotely, and unaffected by the drive. Worth accounting for the Central time zone in call windows.",
      },
      {
        slug: "website-seo",
        why: "Tourism and seasonal search demand in Escambia County is predictable enough to plan pages around months in advance.",
      },
    ],
    nearby: ["Tampa", "Casselberry"],
    faqs: [
      {
        question: "How does a Casselberry agency serve Pensacola properly?",
        answer:
          "By being clear about the split. Ad management, automation, appointment setting and SEO run remotely with no loss of quality. Filming is booked as scheduled multi-day trips rather than on demand.",
      },
      {
        question: "Are you in the same time zone as us?",
        answer:
          "No. Pensacola is Central time and our studio is Eastern, so we are an hour ahead of you. Call windows and campaign schedules are set with that in mind.",
      },
      {
        question: "What if we need filming at short notice?",
        answer:
          "That is the honest limitation of the distance. Short-notice on-site filming is better served by a local Panhandle crew, and we will say so rather than take the work and travel badly.",
      },
    ],
    proofGaps: [
      "TODO: this is the thinnest page of the twelve and it should stay honest about that. It needs either a real Pensacola client or a documented remote-delivery process before it deserves to rank.",
      "TODO: confirm whether BVS has ever produced in the Panhandle, and whether trip-based production is genuinely offered at this distance. If it is not, this page should be reduced to a remote-services page or removed from the sitemap entirely.",
    ],
  },
];

/**
 * The rendered list. `slug` is derived from `citySlug` — the same function the
 * route registry in content/site.ts uses — so /locations/[city] and the sitemap
 * are guaranteed to agree.
 */
export const locations: Location[] = entries.map((entry) => ({
  ...entry,
  slug: citySlug(entry.city),
}));

/*
 * Build-time integrity checks. These run during `next build` (every page is
 * prerendered) and cost nothing at runtime, since the output is static HTML.
 *
 * The failure they exist to catch is silent: a city added to `serviceAreas`
 * lands in the sitemap immediately, and without an entry here that sitemap URL
 * would 404. A warning in the build log is the cheapest place to find that.
 */
if (typeof window === "undefined") {
  const bySlug = new Set(locations.map((location) => location.slug));

  for (const area of serviceAreas) {
    if (!bySlug.has(citySlug(area.city))) {
      console.warn(
        `[locations] "${area.city}" is in serviceAreas and in the sitemap but has no entry in content/locations.ts — /locations/${citySlug(area.city)}/ will 404.`,
      );
    }
  }

  const known = new Set(serviceAreas.map((area) => area.city));
  const serviceSlugs = new Set(services.map((service) => service.slug));

  for (const location of locations) {
    if (!known.has(location.city)) {
      console.warn(
        `[locations] "${location.city}" has a page but is not in serviceAreas, so it is missing from the sitemap and from LocalBusiness areaServed.`,
      );
    }
    for (const focus of location.services) {
      if (!serviceSlugs.has(focus.slug)) {
        console.warn(
          `[locations] ${location.city} references service "${focus.slug}", which does not exist in content/site.ts.`,
        );
      }
    }
    for (const city of location.nearby) {
      if (!known.has(city)) {
        console.warn(
          `[locations] ${location.city} links to nearby city "${city}", which has no page.`,
        );
      }
    }
  }
}

/** Lookup by slug. Returns undefined for an unknown city. */
export function getLocation(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug);
}

/** The drive-time cluster around the studio, in the order defined above. */
export const centralFloridaLocations: Location[] = locations.filter(
  (location) => location.group === "central-florida",
);

/** Markets reached by travel rather than by drive. */
export const statewideLocations: Location[] = locations.filter(
  (location) => location.group === "statewide",
);

export type ResolvedServiceFocus = {
  slug: string;
  title: string;
  href: string;
  why: string;
};

/**
 * Resolves a location's service focuses against `services` in content/site.ts,
 * so service titles live in exactly one place. An unknown slug is dropped
 * rather than rendered as a dead link — the build warning above already flagged it.
 */
export function resolveServices(location: Location): ResolvedServiceFocus[] {
  return location.services.flatMap((focus) => {
    const service = services.find((candidate) => candidate.slug === focus.slug);
    if (!service) return [];
    return [
      {
        slug: service.slug,
        title: service.title,
        href: `/services/${service.slug}/`,
        why: focus.why,
      },
    ];
  });
}

/** Site-relative path for a city page. One definition, used everywhere. */
export function locationPath(slugOrCity: string): string {
  return `/locations/${citySlug(slugOrCity)}/`;
}

/**
 * Resolves the `nearby` city names to linkable entries. Cities without a page
 * are dropped so the page can never render an internal link that 404s.
 */
export function resolveNearby(
  location: Location,
): { city: string; href: string; eyebrow: string }[] {
  return location.nearby.flatMap((city) => {
    const match = locations.find((candidate) => candidate.city === city);
    if (!match) return [];
    return [{ city: match.city, href: locationPath(match.slug), eyebrow: match.county }];
  });
}
