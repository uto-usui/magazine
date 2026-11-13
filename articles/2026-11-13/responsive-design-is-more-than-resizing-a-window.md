---
title: "Responsive design is more than resizing a window"
source: "https://frontendfoc.us/issues/766"
publishedDate: "2026-11-11"
category: "frontend"
feedName: "Frontend Focus"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1794399820/g4ohjfqewzkqxwe6thco.png)](https://ishadeed.com/article/beyond-the-viewport/)

[Beyond the Viewport: Introducing _Site Seeing_](https://ishadeed.com/article/beyond-the-viewport/ "ishadeed.com") — Making a design responsive means tackling more than just resizing, with real users often having on-screen keyboards, split views, docked DevTools, and other things open, or even using oddly sized in-app browsers. Ahmad's [new, free browser-based tool](https://lab.ishadeed.com/tools/site-seeing/) is designed to preview your layouts in these awkward contexts.

Ahmad Shadeed

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/82bd8c3e.png)](https://master.dev/courses/local-ai/?utm_source=email&utm_medium=frontendfocus&utm_content=localaicooper)

[Run AI Coding Models on Your Own Machine](https://master.dev/courses/local-ai/?utm_source=email&utm_medium=frontendfocus&utm_content=localaicooper "master.dev") — Local models are now good enough for everyday coding. Learn to run them on your own Mac or GPU, wire them into your editor and terminal agents, and keep your code private with no per-token bill.

Master.dev

🤖 [Modern Web Guidance 1.0: Web Expertise for AI Agents](https://developer.chrome.com/blog/modern-web-guidance-v1 "developer.chrome.com") — Coding agents can write good code, but tend to fall behind on Web standards and best practices. Chrome's skills for steering agents toward modern, Baseline-aware HTML/CSS are now stable, and it's not just Google: Lea Verou, Patrick Brosset (Edge), and Jake Archibald (Firefox) are among the project's owners.

Philip Walton (Google)

[The Web is More Than Enough](https://ftrain.com/aboard-the-web-is-more-than-enough "ftrain.com") — An encouraging reminder of the immense power of the Web platform and how advanced use of WebAssembly, Web Crypto, WebGL, and Web Audio is increasingly within the reach of developers to build apps you'd once never have imagined in the browser.

Paul Ford

⚡️ IN BRIEF

-   🗳️ The State of JS survey for 2026 is [open now and seeking responses](https://survey.devographics.com/en-US/survey/state-of-js/2026?ref=frontendfocus).
    
-   🦊 [Firefox 160](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/160) is now stable. [On-device speech recognition](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API#on-device_speech_recognition) via the Web Speech API arrives on desktop, and you can experiment with `blocking="render"` and lazy loading for video and audio behind flags.
    
-   ♿ GitHub now recognizes [an `ACCESSIBILITY.md` file](https://github.blog/open-source/maintainers/accessibility-statements-now-have-a-home-on-github/) and surfaces it on a repository's overview page.
    
-   🦓 Zigzag is [a new lightweight browser for macOS](https://zigzagbrowser.com/), coming in at just 18MB.
    

📙 Articles, Opinions & Tutorials

[Computing with CSS Layout](https://noscript.ing/compute "noscript.ing") — How much can CSS 'compute' on its own? Leaning on the behavior of CSS grid, flexbox, and more, this interactive piece shows how to read CSS's 'calculations' back as numbers and put them to practical use, including drawing animated charts.

Agustin Capeletto

[System Colors Need to Work Together](https://www.aaron-gustafson.com/notebook/system-colors-need-to-work-together/ "www.aaron-gustafson.com") — You might expect paired CSS system colors like `HighlightText` and `Highlight` to be readable together, but in Chrome on Android's dark mode they manage a contrast ratio of only 1.98:1. Aaron's [cross-browser study](https://aarongustafson.github.io/system-color-study/) shows which pairs hold up.

Aaron Gustafson

[CSS-Tricks, Version 20](https://css-tricks.com/css-tricks-version-20/ "css-tricks.com") — Now under new ownership, the site is getting JavaScript cleanup, a Sass reorganization, and more, which Geoff explains in detail.

Geoff Graham

🧰 Tools, Code & Resources

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/kkcktihimonjpqqyvwwm.jpg)](https://britecharts.github.io/britecharts/blog/britecharts-3)

[Britecharts 3.0: Ready-Made, Accessible D3 Charts](https://britecharts.github.io/britecharts/blog/britecharts-3 "britecharts.github.io") — A long-awaited major release for this library of reusable D3 charts makes them accessible by default, with screen reader data tables and keyboard navigation. Also adds dark mode, TypeScript types, and a treemap. [The docs](https://britecharts.github.io/britecharts/docs/Britecharts) are really good.

Marcos Iglesias

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1794397533/zeqzwunisnhxw2vliv1b.png)](https://www.bagui.pro/)

[Master CSS 2.0: A Markup-Driven CSS Language](https://master.co/blog/master-css-v2 "master.co") — A utility-class framework where one class can carry a value, selector and condition (e.g. `fg-blue-70:hover@sm`). v2 adds design tokens defined in your own CSS, a wide-gamut color palette, and linting and editor tooling.

Aoyue Design

🛑 Finally, if you want to keep the bots _out_…

[A Blunt Banhammer Blocks Basic Bots Ballistically](https://shkspr.mobi/blog/2026/11/blunt-banhammer-blocks-basic-bots-ballistically/ "shkspr.mobi") — Terence Eden's site was plagued by bots using up his bandwidth, so he built an interesting honeypot that lures the `robots.txt`\-ignoring bots in and hands out a ban. It works, with an almost 90% drop in bandwidth used, but there are some tradeoffs.

If you're happy to lean on the cloud for protection, Nick Gray recounts [his year of fighting scrapers with Cloudflare](https://patronview.com/news/99-percent-of-my-website-traffic-is-bots/), including his firewall rules and failed experiments.

Meanwhile, with a more… 'creative' approach, Utku Sen filled a test site's code with _taboo_ phrases and found [AI agents refused to touch it](https://utkusen.substack.com/p/tricking-deepseek-into-not-hacking). This may be more useful if you want to prevent casual reverse engineering/vulnerability hunting, though.

Finally, even if you welcome crawlers, they can make your analytics misleading. Hugo Attal looked into his server logs and found [90% of his 'human' visitors were bots](https://luna-park.app/blog/my-human-visitors-were-bots).

Till next time…