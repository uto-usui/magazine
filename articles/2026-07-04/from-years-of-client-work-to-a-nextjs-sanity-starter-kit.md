---
title: "From Years of Client Work to a Next.js + Sanity Starter Kit"
source: "https://tympanus.net/codrops/2026/07/02/from-years-of-client-work-to-a-next-js-sanity-starter-kit/"
publishedDate: "2026-07-02"
category: "design"
feedName: "Codrops"
author: "Edoardo Lunardi"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/tca-codrops-cover-scaled.jpg.webp?x68649)](https://www.contentarchitecture.dev/?utm_source=codrops&utm_medium=referral&utm_campaign=tca-codrops&utm_content=cta-top "From Years of Client Work to a Next.js + Sanity Starter Kit Demo")

_**Editor’s Note:** At Codrops, we love celebrating talented developers who turn years of experience into tools that help others build better. We’re excited to support Edo’s launch and hope you’ll enjoy the story behind what he’s created._

The first week of every CMS build I took on looked the same. Spin up the frontend, wire the Studio, model the page builder from scratch, rebuild the SEO layer, re-do the webhook revalidation, re-style the same contact form for the fourth time. By the time the work the client actually hired me for began, three days of the budget were gone and they had not seen a single pixel that mattered.

For years I treated that as the cost of headless. The first few days disappear into plumbing and you make peace with it. What broke that story was watching the same bugs come back. Not similar ones. The same ones. A Sanity migration that nuked a dataset. A CDN that served a stale OG image for three weeks while a client assumed I had shipped it wrong. A webhook that fired twice and corrupted a sitemap. Every project, a fresh instance of a problem I had already solved on the last one and left behind in a repo I would never open again.

So I started keeping the fixes. One project, then two, then ten, every patch folded back into one boilerplate instead of into a client repo I would abandon. **That boilerplate is now [The Content Architecture](https://www.contentarchitecture.dev/?utm_source=codrops&utm_medium=referral&utm_campaign=tca-codrops&utm_content=intro), a Next.js and Sanity starter I ship every client project on.**

This is the story of what it solves, and why after years of refining it I decided to put it in other engineers’ hands.

If you’d like to build on the same foundation I use for every client project, you can get it at an introductory launch price **until July 16, 2026.**

## The work nobody quotes for

The expensive part of a headless build is never the part you scope. Clients pay for the homepage, the case studies, the animation, the thing they can see. What they cannot see, and what I never put a line item against, is the page builder modeled so editors cannot break it, draft mode and live preview wired up and silently broken until you chase down why, the cache bug where published content goes stale and the client swears the site is wrong, a Studio your editors can navigate without emailing you. None of that shows up in a screenshot. All of it costs days.

The fix for work like that is not a pile of features. It is a set of decisions made once and committed, so you start every project past them instead of relitigating each one. The difference shows up the moment you bring a coding agent into it.

## Why a decided foundation beats a pile of features

Ask Claude Code or Cursor to build a headless setup from scratch and you get a different architecture every run. All plausible, none decided. The link field handles internal refs one time and forgets email the next. The page builder has guardrails on Tuesday and none on Wednesday. The fetch layer caches correctly until the run where it does not. The agent is not wrong. It has no opinion to hold, so it invents one each time and you inherit the drift.

Take the fetch layer, the part that quietly causes the stale-content bug on most projects. The decision lives in a single helper, with the reasoning baked in:

```
// One fetch helper, two caches, decided once.
//
// Production: useCdn = false
//   → reads hit Sanity's live API and return current content
//   → the Next.js Data Cache fronts every fetch (force-cache + tags)
//   → so the live API is touched only when a webhook busts a tag,
//     not once per visitor
//
// Development: useCdn = true
//   → the CDN is the cheaper read while iterating locally
//   → a few seconds of edge lag costs nothing during a build
//
// Publish → GROQ webhook → /api/revalidate → revalidateTag(tag)
//   → Data Cache drops the tag → next request is fresh
```

The CDN is off where freshness matters, the Data Cache carries the load, and a webhook invalidates exact tags on publish. The stale-content bug stops being a midnight problem because the boundary between the two caches is owned instead of left undefined. That is the shape of every decision in the kit: made once, written down, the same on every project.

It also means agents work for you instead of against you. An `AGENTS.md` and a dozen scoped skills hand Claude Code or Cursor the conventions, so they build inside the architecture rather than inventing a new one each run. You hold the structure, the agent handles the typing, and the drift disappears.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/tca-codrops-3-1200x527.jpg.webp?x68649)

## Problems I no longer solve twice

Everything in the kit earned its place by being a problem I hit on real client work and refused to fix more than once. A few of the ones that cost the most time:

**The three fields nobody gets right the first time.** A link field that handles internal refs, external URLs, email, and params in one place. A media field that normalizes image, Mux, Rive, and Lottie into one shape, each returning dimensions so layout shift never enters the conversation. A page builder with guardrails instead of a free-for-all. Typed, reusable, composed everywhere.

**The stale-content bug, gone.** The fetch layer above, fresh reads in production, the Data Cache doing the work, webhooks invalidating on publish, draft mode and preview wired in and working.

**Editors emailing to ask where their content lives.** A Studio where every document type sits where editors expect it. Pages own their routes, singletons stay locked, nobody hunts for the homepage.

**SEO bolted on the week before launch.** Per-page metadata from schema, a sitemap driven by Sanity, OpenGraph with auto-cropped images, robots.txt, all there from the first commit.

**Sites that AI agents read badly.** Agents see your client’s site as token-heavy HTML and cite it wrong. The kit ships an editor-owned `llms.txt`, drafted by AI in one click, and per-page Markdown served on the same URL through content negotiation, so an agent asking for Markdown gets clean content while a browser still gets HTML. The full reasoning is in a [dedicated write-up](https://www.contentarchitecture.dev/blog/serve-content-to-ai-agents-llms-txt-markdown-sanity?utm_source=codrops&utm_medium=referral&utm_campaign=tca-codrops&utm_content=agent-writeup).

Past those sit the parts you stop thinking about: basic auth for staging, spam-protected forms with Resend, redirects managed in Sanity, view transitions, and a setup script that provisions the Sanity project, mints the tokens, adds CORS, registers the webhook, and writes your `.env`. The first run is handled, not documented in a README you have to follow.

The architecture is fixed. The tools on top, Tailwind, Biome, Mux, Rive, Lottie, are defaults wired in cleanly so they come out cleanly. Don’t want Tailwind, prefer ESLint, no Mux on this build? Pull them. What you keep is the part underneath: how content is modeled, fetched, and composed.

## Why one person, not a team

The architecture is consistent because one mind held it from the first schema file to the last revalidation hook. Nobody overrode the opinion. Nobody added a field because a stakeholder asked nicely. That is not a limitation dressed up as a virtue. It is why it holds together.

I am also the heaviest user. The kit runs underneath my client work, so the bug I hit on a Friday is the patch that ships Monday, and a problem you run into is one my own projects are about to. Paying users on the repo are a forcing function on my own work: I cannot let the schema rot, skip a Next.js major, or sit on a breaking change in a Sanity plugin. You buy the repo and you own it. No dashboard, no seats, no telemetry.

I will not claim this is the perfect stack for everyone. No such thing exists. What I can say is that it covers 99% of my own work, the animation-heavy, content-driven client sites I build week to week. That alone validates it for me. If your work looks like mine, the odds are it covers yours too.

## What it has shipped

This is not a side project cleaned up for sale. It is the foundation under real client sites, the kind that win the awards.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/tca-codrops-1.webp?x68649)

A few of them: [Good Fella](https://good-fella.com/), [House of Honey](https://www.houseofhoney.com/), [Aspen Search](https://www.aspensearch.com/), [Anuc Home](https://www.anuchome.com/), [Serve Robotics](https://www.serverobotics.com/), [Muralia](https://www.muralia.at/), [blink](https://www.blink.trade/), [WASL](https://www.waslarchitects.com/), [Creative Lives in Progress](https://creativelivesinprogress.com/), [my own site](https://www.edoardolunardi.dev/), and [the Content Architecture site itself](https://www.contentarchitecture.dev/?utm_source=codrops&utm_medium=referral&utm_campaign=tca-codrops&utm_content=showcase-self). Work built on this foundation has been recognized by [Awwwards](https://www.awwwards.com/), [FWA](https://thefwa.com/), and [CSSDA](https://www.cssdesignawards.com/). The hours I used to lose to plumbing went into the parts of those sites a jury notices. Now other engineers get those hours back too, and the kit keeps growing in the same direction: less plumbing, more of the work worth doing.

## What you get back

The next three days of every project, the ones that used to vanish before the client saw a single pixel worth looking at. On every build from here, that time is yours from the start, free to spend on the creative work the client is writing the check for.

The reasoning behind every decision is written up in full, free to read, across four pieces on [CMS structure](https://www.edoardolunardi.dev/blog/the-content-architecture-cms-structure?utm_source=codrops&utm_medium=referral&utm_campaign=tca-codrops&utm_content=series-1-structure), [content models](https://www.edoardolunardi.dev/blog/the-content-architecture-content-models?utm_source=codrops&utm_medium=referral&utm_campaign=tca-codrops&utm_content=series-2-models), [page composition](https://www.edoardolunardi.dev/blog/the-content-architecture-page-composition?utm_source=codrops&utm_medium=referral&utm_campaign=tca-codrops&utm_content=series-3-composition), and [content primitives](https://www.edoardolunardi.dev/blog/the-content-architecture-content-primitives?utm_source=codrops&utm_medium=referral&utm_campaign=tca-codrops&utm_content=series-4-primitives). Read the thinking first and decide it fits.

When you are ready to skip the rebuild, [The Content Architecture](https://www.contentarchitecture.dev/?utm_source=codrops&utm_medium=referral&utm_campaign=tca-codrops&utm_content=cta-final) is the repo I ship on. One payment, lifetime updates, yours to keep. If you are unsure whether it fits the way you work, [write to me](mailto:hello@edoardolunardi.dev) and I will tell you straight, sometimes that means telling you it is not the right fit.