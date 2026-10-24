---
title: "Fast is a design decision"
source: "https://shannadige.com/blog/performance-is-design/"
publishedDate: "2026-10-23"
category: "design"
feedName: "Sidebar"
---

Once upon a time, there were 3 designers who worked together but seperately in Enterpriseland. They shipped products for stakeholders to view actionable insights and make informed strategic decisions. The first designer setup design weekly standups with the whole team but used 2 whole hours to argue for diverse states in every data display. The second designer spent months deliberating over font faces from available repositories and ended up creating their own from scratch. The third designer spent their time on delivery and shipped specs with the team that pushed the cutting edge of what UX meant with microinteractions, animations, and motion design.

In Enterpriseland bureaucracy runs the show: designers deliberate with PMs and engineers on the final state, and eventually they get what they want. But the users suffered: they would spend up to minutes at a time waiting for their dashboards and applications to load up. The users came from all places, and nearly all of them did not care for the designers’ work, but rather the job they needed to accomplish. The designers learned about this, only as they got allocated to other workstreams and had no capacity to fix these issues.

And they all lived happily ever after…?

## Everyone is a builder now

A year ago a portfolio, landing page, or a small product/prototype meant either using a template or a few weekends. Now it’s a paragraph typed into a prompt box. That’s great. More people are making things for the web than ever. Plenty of them are designers who used to hand a mockup across the table and had to wait for the final result.

What the prompt box doesn’t ask is how the thing should _perform_. Not many think first to write “make sure the largest image isn’t lazy-loaded” or “serve the HTML from somewhere near my visitors” in their first prompt, so the generated site rarely touches this process. It looks right on the laptop it was built on, with everything already cached from the last 40 or so previews. That’s the best case. A visitor on a three-year-old phone, on a train, opening your site or app for the first time is the worst case.

Building has gotten cheap. But a slow page still costs something (TINSTAAFL): the visitor pays by waiting.

I built a panel on my site to track how my site’s taste and resource needs compares against the reality of the web. It’s under “Performance” in the menu. It lists how long the server took to answer, when the first and largest things painted, how many bytes came down, how much of it was JavaScript, and frame rate while a user scrolls. The browser measures all of it. And figured, why not include it in a transparent way that everyone can audit?

![The performance panel open over the home page: page load 929 ms, server response 154 ms, first paint and largest paint 312 ms, layout shift 0.00, 687 KB transferred over 62 requests, 146 KB of JavaScript, 60 fps, longest task 59 ms, slowest response 40 ms.](https://shannadige.com/_astro/panel.DM7WPC1F_Zya9X4.webp)

One desktop visit to the home page. Yours will differ, and that's the point of tracking such behavior.

## Where the time goes

A page load is a chain of small trips. Every link in it can be slow. If you’re building with an agent, these are the ones worth understanding because you can simply ask your agent about them:

### Distance

A little physics first: light in fibre covers roughly 200 km per millisecond, and a fresh HTTPS connection needs a few round trips before the first byte of your page can leave the server. From Sydney to a single server in Virginia and back is about 16,000 km before any routing detours. A visitor there likely waits most of a second before anything can paint. No framework unfortunately fixes the rules bounding our physical world.

What CAN fix this is putting a copy of the page closer. A CDN (like Cloudflare, Fastly, or Vercel’s edge network) keeps your content files cached in data centers across the world, so the round trip is to a building in your visitor’s region rather than to where your local server happens to be.

My site works this way, primarily because it is content-heavy, relies on Cloudflare to serve photo and video content from its resources, saving my users time on downloading these resources to their machine.

### Where the HTML comes from

There are three ways to put words on a screen, and they cost very different amounts:

-   **Built ahead of time:** the HTML is generated once when you deploy and served as a file. My personal site works this way (Astro, built to static files, served from Cloudflare’s edge). The server has nothing to really “think” about before presenting to the user.
-   **Rendered on the server per request:** the server assembles the page every time someone asks. That’s right for anything personal or live, but the server has to do that work on every visit unless you cache the result.
-   **Assembled in the browser:** the server sends an almost empty page and a bundle of JavaScript, so the visitor’s device builds the page itself. Nothing meaningful paints until that bundle has downloaded, parsed and run. It’s also a page that search engines and AI agents may read as empty.

Several of the popular app builders start you on the third option, because it’s the simplest thing to generate and preview. For an app behind a login that might be fine. But for a portfolio, a blog, a marketing page or documentation, it means a visitor’s phone or laptop does work that your build could have done instead.

### Caching

Caching decides whether a second visit, or the second page of a first visit, repeats all the work of the first. The rule I follow is to give every file a name that changes when its contents change (most build tools do this for you) and tell browsers to keep those files for a year. Keep the HTML itself short-lived so a new deploy shows up straight away.

I learned that one the hard way: up until this month every file on my site was served with `max-age=0`, which tells the browser “you may keep this, but ask me first”. So each page view asked about roughly forty files, one round trip apiece. On top of that, every internal link went through a redirect that added a trailing slash, which cost about 800 ms per navigation on a throttled phone.

### Weight, and what arrives first

Bytes still matter, but order matters more. The browser can only paint the largest thing on screen once that thing has arrived. If it’s an image you’ve marked `loading="lazy"` (which is a common default and good advice for images further down the page), the browser waits on purpose.

That was my phone layout’s problem. The first card in the home page’s work carousel was the largest paint on a phone, and it was lazy-loaded at low priority. It was requested at about 1.1 seconds and landed at about 2.5. The fix was to stop treating it like everything else: phones now get a small pre-rendered print of that card, loaded straight away at high priority.

0 ms

Largest paint on a throttled phone, Oct 16

0 ms

The same test today, after the fix

### The main thread

JavaScript doesn’t only cost download time. While it runs, the page can’t respond to a tap. Google’s Core Web Vitals call this _Interaction to Next Paint_, with the ideal benchmark under 200 ms. The usual culprits are big bundles running on load or animations that never stop. I had one of those too: my hero’s animated network kept drawing animations after it scrolled off screen, and so it spent about 446 ms of every five seconds on desktop drawing something nobody could see; twice that on 120 Hz screens. Now there is logic to stop that from happening when off-screen.

## Engineering measures, design decides

It’s tempting to treat all of this as an engineering checklist: run Lighthouse, fix what’s red, ship. Engineering is where performance gets measured and tracked, yet someone should own those numbers the way someone owns uptime. From my personal experience, most of the expensive decisions on a page are design decisions that just so happen to have that performance cost.

A full-bleed autoplaying video in a hero is a design decision, done in taste. So is a custom font in four weights, a carousel with media above the fold, scroll-driven animations, or a page that only works once 500 KB of JavaScript has run. None of these are wrong, but each decision is a purchase paid against the visitor’s time and data. Design is the discipline that knows what the page is _for_, so design should be in the room when deciding what it’s worth spending.

What it’s worth depends on the use case:

-   **A landing page** lives or dies on its first screen. The largest paint (measured by LCP) _is_ the first impression, and every second of it costs you visitors you may have paid to bring there. Consider the minimum size of content required for your user to “get the gist” of your brand or product and how quickly it can be rendered on your target audience’s devices.
-   **A checkout or a form** cares about response to input. A button that takes 400 ms to acknowledge a tap reads as broken, people tap it again, and you may experience edge cases in API submissions. Understanding the length of a call based on these engineering components might help you design a disabled or loading state of your SUBMIT button.
-   **A dashboard people open every morning** can afford a heavier first load if repeat visits come from cache, but every interaction after that should be instant. How does data persist across the user’s workflows or parallel sessions?
-   **A portfolio** is your work. While it’s done with taste, images, logos, videos are your content, so the job is sending the right size of each in the right order. Then you can spend time crafting on how they arrive with performance and device constraints in mind.

## If you’re building with an agent

None of this takes a performance engineer. Ask the agent you’re building with these six questions, and it will answer them:

1.  **Where does my HTML come from?** Built ahead of time, rendered on the server, or assembled in the browser? If it’s the last one and the page is public content, ask what it would take to pre-render it.
2.  **Where is it served from?** Is it on a CDN with locations near the people you expect, or on one server in one region?
3.  **What’s cached, and for how long?** Hashed files for a year, HTML briefly. Ask it to show you the `Cache-Control` headers.
4.  **What’s the largest thing on the first screen, and when does it arrive?** Make sure it isn’t lazy-loaded and isn’t waiting behind a script.
5.  **How much JavaScript does this page ship, and what is it for?** If a page of text needs half a megabyte of it, something is along for the ride.
6.  **What does it feel like on a slow phone?** Open your browser’s dev tools, turn on network and CPU throttling, and load the page cold. Your laptop on fast wifi is the best case you’ll ever see.

Then write a budget down and keep it somewhere the next prompt will see (as context, skills, or however you + your agent work best).

As an example here are the numbers my site holds itself to, next to what it actually does. The first three are Google’s Core Web Vitals and their “good” thresholds, and first paint is Google’s threshold too; the rest are mine. The actual figures are the home page on a throttled phone, roughly what Lighthouse simulates (about 1.6 Mbps, 150 ms of latency and a processor four times slower than my laptop’s), as the median of three cold loads.

Two of those are over-budget. Server response is measuring against distance: from where I tested, my requests went to Cloudflare’s data centre in Atlanta rather than a closer one, which is routing I don’t aim to control, so about 100 ms of it is time on the server I’d like back but I’d need to weigh that against my intentions. The longest task is a single 78 ms stretch where the page can’t answer a tap. It only grows that long on a slow processor, and on a desktop it’s closer to the line (the visit in the screenshot above logged 59 ms). Both are on my list.

Measure

Budget

Actual

Largest paint

under 2.5 s

1.32 s

Response to input

under 200 ms

48 ms

Layout shift

under 0.1

0.00

First paint

under 1.8 s

1.32 s

Server response

under 200 ms

381 ms

Home page, transferred

under 1 MB

488 KB

JavaScript

under 250 KB

209 KB

Longest task

under 50 ms

78 ms

Frame rate

60 fps

60 fps

Tell your agent I say hello, or if you’re the agent, tell the user I said hello! Happy bug squashing ■