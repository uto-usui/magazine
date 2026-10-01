---
title: "Why GitHub now ships more CSS, not less"
source: "https://frontendfoc.us/issues/760"
publishedDate: "2026-09-30"
category: "frontend"
feedName: "Frontend Focus"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/wqdeehcjo7y0imo6gazv.jpg)](https://github.blog/engineering/architecture-optimization/improving-site-performance-by-shipping-more-css/)

[Improving Site Performance by Shipping More CSS](https://github.blog/engineering/architecture-optimization/improving-site-performance-by-shipping-more-css/ "github.blog") — GitHub details how it spent three years purging `styled-components` and 'CSS-in-JS' from `github․com` in favor of CSS Modules. The result? Shipping _more_ CSS, but GitHub reports 55% less time to server-side render a page.

Josh Black and Marie Lucca (GitHub)

💡 [CSS Modules](https://github.com/css-modules/css-modules) isn't a browser feature or standard, but a [widely supported](https://github.com/css-modules/css-modules/blob/master/docs/get-started.md) bundler convention where classes in a `.module.css` file get rewritten to unique names, scoping styles per file with no runtime cost.

[How Anthropic Made Claude's Web App Faster](https://claude.dev/blog/how-we-made-claude-ai-faster/ "claude.dev") — The tale of how a recent sprint (with Claude doing much of the work) cut Claude's time-to-typeable at the 75th percentile from 3.1s to 0.55s, from tracking layout shifts too small for CLS to flag, to a `:root:has()` selector costing 24ms per DOM change, and a jump caused by Chrome pre-rendering the page at the wrong height.

Wang, Attard, and G (Anthropic)

⚡️ IN BRIEF

-   🌀 Cloudflare has [launched Turnstile Spin](https://blog.cloudflare.com/turnstile-spin/), a way to let AI agents set up Turnstile's protection on sites you're building. Cloudflare now also has [a new `cf` CLI client](https://blog.cloudflare.com/cloudflare-cf-cli-launch/) which can work with all of its APIs (unlike Wrangler).
    
-   🧭 Safari Technology Preview 253 [is out now](https://webkit.org/blog/18357/release-notes-for-safari-technology-preview-253/), adding support for network throttling within the Web Inspector, amongst a huge number of fixes.
    
-   🦊 Firefox 157 [has a new look](https://blog.mozilla.org/en/firefox/new-firefox-design-is-here/), which you can [see in action here](https://www.youtube.com/watch?v=l7tQ1v4TCeY).
    
-   📉 In response to recent [chatter around the 'death' of web education](https://molily.de/web-dev-education/), Andy Bell shares [a bleak sketch](https://bell.bz/in-response-to-the-death-of-web-development-education/) of where things stand.
    
-   🟢 [Version 31 of developer browser Polypane is out now](https://polypane.app/blog/polypane-31-canvas-layout-elements-panel-improvements-and-chromium-155/), adding a new canvas layout, elements panel improvements, and an update to Chromium 155.
    
-   🔥 Got something you want to say about HTML? Manuel Matuzović is [seeking submissions for this year's HTMHell Advent Calendar](https://bsky.app/profile/matuzo.at/post/3mw65xm2co22o).
    

📙 Articles, Opinions & Tutorials

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1790768407/sqfroq51wfjasopm9vyc.png)](https://ishadeed.com/article/css-detect-overlap/)

[Detect When Elements Overlap with CSS](https://ishadeed.com/article/css-detect-overlap/ "ishadeed.com") — A neat bit of CSS lateral thinking to detect when two elements get too close or overlap, no JavaScript needed. It combines anchor positioning, style container queries, and scroll-driven animations, using an overflowing 'measure' element as the trigger.

Ahmad Shadeed

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1790770351/syci9fg7mqolp1gcvoci.png)](https://blog.master.dev/extracting-grid-information-using-css/)

[Extracting Grid Information Using CSS](https://blog.master.dev/extracting-grid-information-using-css/ "blog.master.dev") — A neat CSS-only proof of concept technique where you can get information about a grid structure (number of columns/rows, where items sit on the grid, etc). The technique relies on scroll-driven animations, oddly enough.

Temani Afif

[The Interface Cheat Sheet](https://interfaces.dev/cheat-sheet "interfaces.dev") — A helpful illustrated list of good UI advice, touching on points from border radiuses and transitions to the use of color, scaling and accessibility.

Jakub Krehel

[Custom Attributes Polyfill](https://www.keithcirkel.co.uk/custom-attributes-polyfill/ "www.keithcirkel.co.uk") — A polyfill for the proposed Custom Attributes spec, letting you attach reusable behaviours to any element via custom attributes with their own lifecycle hooks.

Keith Cirkel

[Fluid Typography](https://blog.damato.design/posts/fluid-typography/ "blog.damato.design") — Donnie argues that because container widths are unpredictable, using container queries to drive fluid font sizing isn't the right choice. He suggests we stick with viewport units to retain true control.

Donnie D’Amato

🧰 Tools, Code & Resources

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1790769815/tlckzjm42todmqsxh4zp.png)](https://transitions.dev/)

[Make Your Logo _Brighter_ Than White](https://www.soverybright.com/ "www.soverybright.com") — If you've got an HDR display, this browser-based tool will quickly make its trick clear. Drop in your logo, choose which colors should glow, and get an HDR version ready to download. Claims to make things up to 7.5x brighter in Chrome and Safari.

Chris Bennett

🙈 ...and finally

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1790772124/gqlozgf8qo5htymserbg.png)](https://bastardica.mitpit.com/)

Here's a [kinda crude font foundry](https://bastardica.mitpit.com/) that takes two web fonts and mixes their glyphs, with _unsettling_ results. I mean, why not make a Times New Roman/Comic Sans hybrid to catch folks off guard? And, yes, you can download the end result.