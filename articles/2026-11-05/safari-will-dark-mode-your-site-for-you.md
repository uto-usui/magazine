---
title: "Safari will 'dark mode' your site for you"
source: "https://frontendfoc.us/issues/765"
publishedDate: "2026-11-04"
category: "frontend"
feedName: "Frontend Focus"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1793796147/eduaw5bendeycfhsuy0l.png)](https://webkit.org/blog/18541/introducing-adaptive-dark-mode/)

[Safari Introduces Adaptive Dark Mode](https://webkit.org/blog/18541/introducing-adaptive-dark-mode/ "webkit.org") — A new (opt-in) feature added to the Safari 27.3 beta that _automatically_ adapts light sites to dark ones. It's here because although around 40% of pages are loaded by users using dark mode, only 10% of page loads directly support it.

WebKit

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/b8bf63b6.png)](https://www.meticulous.ai/?utm_source=frontend_focus&utm_medium=newsletter&utm_campaign=26q4_1&utm_content=primary)

[Agents Didn’t Clear Your Plate. They Dumped Reviews on It](https://www.meticulous.ai/?utm_source=frontend_focus&utm_medium=newsletter&utm_campaign=26q4_1&utm_content=primary "www.meticulous.ai") — Your agents write PRs in minutes, then eat your afternoon in review. When did ‘saving time’ start to mean babysitting agents’ work? Meticulous verifies every UI change, with no developer effort. Devs at Dropbox & ElevenLabs have their afternoons back. You can too.

Meticulous

[Modern CSS Might Make Your Front-End More Complex](https://www.smashingmagazine.com/2026/11/modern-css-might-make-your-front-end-more-complex/ "www.smashingmagazine.com") — Swapping JavaScript for container queries and `:has()` can cut your code down but introduce bugs elsewhere in your layout. Gabriel shares four examples, including why `container-type` can collapse flex items to zero width.

Gabriel Shoyombo

⚡️ IN BRIEF

-   🤚 The CSSWG [has resolved](https://www.abeautifulsite.net/posts/revisiting-buttons-and-cursors/) that form controls get `cursor: pointer` by default under `appearance: base`. Cory LaViska explains the data and the objections.
    
-   🌐 [Chrome 158 is in beta](https://chromestatus.com/release-notes/158) (_stable due November 17_) with the <`install`\> element, media pseudo-classes like `:playing` and `:paused`, `::highlight(*)`, and [XSLT is on its way out](https://xslt.rip/).
    
-   🆕 Rachel Andrew shares [an update on changes to the web platform](https://web.dev/blog/web-platform-10-2026?hl=en) in October, including scroll-driven animations gaining support across all major engines.
    
-   🧰 [Chrome DevTools has added](https://developer.chrome.com/blog/new-in-devtools-november-2026) a visual position-area editor in Elements, Web Install manifest diagnostics, and MCP server improvements.
    
-   🤖 Google [will support a shared AI training control](https://developers.google.com/search/blog/2026/10/ai-training-control) in `robots.txt`, based on IETF AIPREF work, letting sites set a preference once for multiple AI providers.
    

📙 Articles, Opinions & Tutorials

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1793797217/cw26e17ihpdwpaqhkxag.png)](https://piccalil.li/blog/native-masonry-layouts-with-css-grid-lanes/)

[Native Masonry Layouts with CSS Grid Lanes](https://piccalil.li/blog/native-masonry-layouts-with-css-grid-lanes/ "piccalil.li") — A practical guide to native masonry layouts with CSS Grid Lanes, covering placement, fit-tolerance, horizontal layouts, subgrid and source-order accessibility. It's supported in only Safari right now, but other engines are working on it.

Saleh Mubashar

[Making Features Generic in CSS](https://rachelandrew.co.uk/archives/2026/11/02/making-features-generic-in-css/ "rachelandrew.co.uk") — Rachel takes a look at the new `flow-start` and `flow-end` alignment keywords, and touches upon why the CSSWG often renames things.

Rachel Andrew

[Quirks and Vintage Uses of CSS Table Display](https://vale.rocks/posts/table-display-values "vale.rocks") — Looks back at `display: table` and its related values, sharing what each does and the pre-flexbox tricks they enabled — while of course noting that you probably shouldn't reach for them today. A neat history lesson.

Declan Chidlow

🧡 [If You Love a Website, Back It Up](https://blog.mistys-internet.website/post/2026/10/29/if-you-love-a-website-back-it-up/ "blog.mistys-internet.website") — Following one of their favorite websites disappearing, a web-archiving practitioner explains how to go about preserving sites for yourself. A practical tour of browser-based capture techniques, automated crawling, and embedding the results.

Misty De Meo

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1793798261/pdysphxg4hnrkojir9jv.png)](https://mofu-dev.com/en/blog/fluid-foundation/)

[Spreading Liquid with Three.js](https://mofu-dev.com/en/blog/fluid-foundation/ "mofu-dev.com") — A technical walkthrough of a neat liquid-spreading effect (built for a cosmetics campaign). It shows off using a height map for thickness, a velocity map for movement, and fragment shaders to render the result. There's a satisfying demo to play with, too.

MISAKI NAKANO

[How a Split Webfont Slowed Down Text Layout](https://www.ivankristianto.com/split-webfont-text-layout/ "www.ivankristianto.com") — A font splitter put `i` and `j` in a different file from the rest of the alphabet, forcing extra text-shaping work within words (causing INP to suffer). Here's why, plus a script to check your own font CSS.

Ivan Kristianto

⚠️ Third-Party Scripts

Last week we [shared a PSA about forgotten script tags](https://blog.report-uri.com/deadtag-how-forgotten-website-tags-became-a-delivery-network-for-iphone-spyware/) and how what they load can be hijacked. Days later, a similar attack prominently appeared in the wild.

On October 29, [a performance monitoring script on Polymarket was swapped for a wallet drainer](https://blog.report-uri.com/polymarkets-csp-allowed-every-part-of-the-2-6-million-crypto-theft/). The URL of the script didn't change, just the payload, so the CSP let it through, but Scott Helme's write-up explains what would have stopped it.

Whatever you load from third parties, it's worth auditing for security, privacy, _and_ performance reasons. Some steps worth taking:

-   Pin scripts with [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity) where the vendor's file is static, and use the new [`Integrity-Policy-Report-Only` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Integrity-Policy-Report-Only) to find any you've missed.
-   [Self-host third-party resources](https://calendar.perfplanet.com/2019/self-hosting-third-party-resources-the-good-the-bad-and-the-ugly/) where you can. [Request Metrics explains](https://requestmetrics.com/web-performance/how-we-protect-our-javascript-agent/) how it protects its own agent and why it's safe to self-host.
-   [Load third-party JavaScript efficiently](https://web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript), or use [Partytown](https://partytown.qwik.dev/) to move it off the main thread entirely.
-   Audit what your page is loading with [Request Map](https://requestmap.webperf.tools/) and [Third Party Web](https://www.thirdpartyweb.today/).

Lastly, if _you_ provide third-party scripts to users, check out Jack Ellis's [writeup of how Fathom Analytics keeps their analytics script secure](https://usefathom.com/blog/how-we-secure-our-analytics-script) for some tips.

🧰 Tools, Code & Resources

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/bftm7xl9zsrx0bcz8dcy.jpg)](https://sidebearing-trim.js.org/)

[Astrotypes: Curated Font Pairings for Astro](https://astrotypes.com/ "astrotypes.com") — Search and preview font pairings sourced from Google Fonts, Bunny CDN, and Fontshare live on the page. Each pair has a copy command for various tools (npm, Yarn, Bun, etc).

Michael Andreuzza

[File Viewer: A Browser-Native Office, PDF, CAD, and Archive Viewer for Internal Web Apps](https://github.com/flyfish-dev/file-viewer "github.com") — Provides read-only views for Office, PDF/OFD, CAD, archives, email and more, with integrations for React, Vue, and Svelte. There's also [a live demo](https://demo.file-viewer.app/?lang=en-US) to try.

Flyfish Dev

📰 Classifieds

Know React? Then you and your coding agent can ship iOS and Android apps. [Expo](https://expo.dev/) runs the builds and CI/CD and gets you into the app stores.

* * *

🧪 In-browser testing inside your dev server. [TWD](https://twd.dev/?utm_source=frontendfocus&utm_medium=newsletter&utm_campaign=cooperpress-q4-2026) adds a test sidebar next to your app, and your AI agent runs it too. [Free and MIT](https://twd.dev/?utm_source=frontendfocus&utm_medium=newsletter&utm_campaign=cooperpress-q4-2026).

🔤 ...and finally

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/yk9k2ocjsueook0r53oa.jpg)](https://vercel.com/blog/introducing-geist-serif)

[Introducing Geist _Serif_](https://vercel.com/blog/introducing-geist-serif "vercel.com") — Vercel's Geist family gains a high-contrast display serif for headlines, built on the same metrics as Geist Sans so the two mix cleanly. [Geist Sans](https://fonts.google.com/specimen/Geist), [Geist Mono](https://fonts.google.com/specimen/Geist+Mono) and [Geist Pixel](https://fonts.google.com/specimen/Geist+Pixel) are on Google Fonts already; Serif isn't yet, but will be in due course.

Vercel