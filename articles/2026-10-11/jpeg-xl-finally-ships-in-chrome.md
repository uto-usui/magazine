---
title: "JPEG XL finally ships in Chrome"
source: "https://frontendfoc.us/issues/761"
publishedDate: "2026-10-07"
category: "frontend"
feedName: "Frontend Focus"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1791377151/zcmpgavkykt1yvycst3c.png)](https://blog.cloudflare.com/how-fast-is-the-web/)

[How Fast is the Web? Exploring Billions of Real-User Measurements](https://blog.cloudflare.com/how-fast-is-the-web/ "blog.cloudflare.com") — A new free BigQuery dataset of anonymized real user Core Web Vitals from 10,000 large Cloudflare-fronted sites, updated daily and covering Safari/WebKit as well as Chrome. The post covers some of the initial findings, including how downloads are usually the smallest part of a slow LCP.

Townsend & Jansma (Cloudflare)

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/9c1e8128.png)](https://www.meticulous.ai/?utm_source=frontend_focus&utm_medium=newsletter&utm_campaign=26q4&utm_term=primary+content)

[Would You Let Your AI Agent Grade Its Own Homework?](https://www.meticulous.ai/?utm_source=frontend_focus&utm_medium=newsletter&utm_campaign=26q4&utm_term=primary+content "www.meticulous.ai") — Agents write code faster than ever. They even review their own work. But who’s reviewing them? Dropbox, Notion & ElevenLabs don’t take the risk. With Meticulous, every change is exhaustively verified, with zero developer effort.

Meticulous

[Shipping JPEG XL in Chrome](https://developer.chrome.com/blog/jpeg-xl-in-chrome "developer.chrome.com") — Chrome 155, [released yesterday](https://chromestatus.com/release-notes/155), introduced support for JPEG XL (`.jxl`) images. They can offer 30-50% better compression than JPEG, HDR support, and more.

Versari, Firsching, Jägenstedt (Chrome for Developers)

📺 If you're catching up on Chrome, [▶️ this video from Matthias Rohmer](https://www.youtube.com/watch?v=vukchAoaTdE) runs through DevTools changes across versions 151 to 153.

[The State of HTML 2026 Survey is Open](https://survey.devographics.com/en-US/survey/state-of-html/2026 "survey.devographics.com") — Devographics’ annual look at how we use HTML, forms, web components and browser APIs is back, and should take 10-15 minutes. Browser vendors use the results to prioritize their roadmaps, so your answers help decide what ships next.

Devographics

⚡️ IN BRIEF

-   🌐 The site on reserved domain [`example.com`](https://example.com/) has [just been redesigned](https://www.debugbear.com/blog/example-dot-com-redesign-history), including a new JavaScript file to serve multi-language content (and [here's why](https://www.oliverdunk.com/2026/09/30/iana-reply)).
    
-   🆕 Rachel Andrew rounds up [what’s new to the web platform in September](https://web.dev/blog/web-platform-09-2026), a bumper month for Baseline with `progress()`, `alpha()` and `revert-rule` all now Newly available.
    
-   ♿️ [WebAIM's eleventh Screen Reader User Survey](https://webaim.org/projects/screenreadersurvey11/) is out: 1,780 responses, JAWS back ahead of NVDA, and 68% saying web accessibility has stagnated or worsened in the past year.
    
-   ✏️ SVG 2 has [moved closer to becoming a formal W3C Recommendation](https://www.w3.org/news/2026/updated-candidate-recommendation-scalable-vector-graphics-svg-2/), with an updated Candidate Recommendation focused on cross-browser consistency.
    

📙 Articles, Opinions & Tutorials

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1791378182/l1zbrpshfosqjcoleudn.png)](https://calibreapp.com/blog/airline-websites-are-slow)

[CSS Does Your Tooltip Positioning Now](https://allthingssmitty.com/2026/10/05/css-does-your-tooltip-positioning-now/ "allthingssmitty.com") — Matt takes a look at CSS Anchor Positioning, namely `anchor-name` and `position-anchor`, and how to use them to build tooltips and dropdowns that hold their position through window resizes and page scrolls.

Matt Smith

👀 Meanwhile, Patrick Brosset [digs into why `title` tooltips are so underused](https://patrickbrosset.com/articles/2026-10-02-opening-the-can-of-tooltips/) and floats the Edge team’s proposed stylable `::tooltip`.

[Why Don’t More Developers 'Use the Platform'?](https://nolanlawson.com/2026/10/03/why-dont-more-developers-use-the-platform/ "nolanlawson.com") — Nolan, a big Web platform advocate, casts a thoughtful look at the common alternative, exploring _why_ we often rebuild things platforms already give us in JavaScript and CSS.

Nolan Lawson

[The Road to Dart Sass 2](https://sass-lang.com/blog/the-road-to-dart-sass-2/ "sass-lang.com") — Sass may not be the default choice it once was, but the project keeps moving. Dart Sass 2.0 is now slated for release in December. It’ll turn most of 1.x's deprecation warnings into hard errors.

Natalie Weizenbaum

🧰 Tools, Code & Resources

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1791370403/pyymmpu0vsvqjbllns7l.png)](https://panda-css.com/blog/panda-css-v2)

[Panda CSS 2.0](https://panda-css.com/blog/panda-css-v2 "panda-css.com") — A major release of a popular CSS-in-JS library. 2.0 keeps the same `css()` API but gets a much faster compiler (_rebuilt in Rust_). Other new additions include publishable design systems, view-transition styling, an ESLint plugin, and a new typography preset.

Adebayo, Adebesin, Adebayo (Panda CSS)

📺 [Video.js 10: Five Players Rebuilt as One](https://videojs.org/blog/videojs-10 "videojs.org") — Sixteen years after helping move video off Flash, Video.js has been rebuilt from scratch, bringing in the teams behind Plyr, Vidstack, Media Chrome, and Mux Player. You get React and web components, a 60% smaller bundle, and skins you can make your own.

Steve Heffernan

🎨 One for fans of gradients

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/tkpcgzk23a0nyvguow3j.jpg)](https://lab.ishadeed.com/tools/gradient-visualizer/)

[Gradient Visualizer: Debug Multi-Layer CSS Gradients](https://lab.ishadeed.com/tools/gradient-visualizer/ "lab.ishadeed.com") — Paste a `background` value made up of gradients and Ahmad's new tool pulls each layer apart so you can inspect it alone, view the stack in 3D, replay it as a timelapse, edit it and get fresh code back.

Ahmad Shadeed