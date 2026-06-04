---
title: "Rendering 3D meshes in the DOM with CSS"
source: "https://frontendfoc.us/issues/744"
publishedDate: "2026-06-03"
category: "frontend"
feedName: "Frontend Focus"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/pisqvualljdewbljlb2z.jpg)](https://meyerweb.com/eric/thoughts/2026/05/28/accessible-i-think-split-cell-table-headers/)

[Accessible (I Think) Split-Cell Table Headers](https://meyerweb.com/eric/thoughts/2026/05/28/accessible-i-think-split-cell-table-headers/ "meyerweb.com") — Eric Meyer tackles a niche `<table>` layout puzzle: diagonally-split table header cells like those in vintage NASA papers. He leans on `rowspan` and absolute positioning, while keeping things accessible with input from Alice Boxhall and Adrian Roselli.

Eric Meyer

🤖 [Chrome 149's Big Upgrades to AI Dev Assistance](https://developer.chrome.com/blog/new-in-devtools-149 "developer.chrome.com") — The [recently announced](https://developer.chrome.com/blog/devtools-for-agents-v1) MCP server and CLI for Chrome DevTools for agents is now officially stable in Chrome 149. It lets AI coding tools programmatically drive debugging, carry out perf audits, and more, should you want them to.

Matthias Rohmer (Chrome for Developers)

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/ffa4ccb5.png)](https://go.clerk.com/QXdadxL)

[Add Production-Ready Auth to Next.js in Minutes](https://go.clerk.com/QXdadxL "go.clerk.com") — Clerk CLI scaffolds auth into your Next.js project from the terminal. clerk config manages sign-in methods and session policies in code. clerk api fetches users, orgs, and sessions. No dashboard required.

Clerk

[Introducing the HTML-in-Canvas API Origin Trial in Chrome](https://developer.chrome.com/blog/html-in-canvas-origin-trial "developer.chrome.com") — HTML-in-Canvas lets you draw live, interactive HTML and CSS into a `<canvas>` element, combining DOM accessibility and text layout with performant low-level graphics. Handy for visualizations that need to stay fully interactable.

Nattestad & Markoborodova (Chrome for Developers)

💡 [Liquid DOM](https://github.com/AndrewPrifer/liquid-dom), a DOM-based implementation of Apple's 'liquid glass' effect offers a neat demo of HTML-in-Canvas (and WebGPU) if you have it enabled.

⚡️ IN BRIEF

-   📍 [Here's Rachel Andrew's latest round-up](https://web.dev/blog/web-platform-05-2026) of what features landed in stable and beta browsers during the past month, including three new Baseline additions.
    
-   🚢 Chrome 149 ships with CSS gap decorations for [styling the whitespace between flex and grid items](https://developer.chrome.com/blog/new-in-chrome-149).
    
-   📝 The [latest version of VS Code has improved its integrated browser](https://code.visualstudio.com/updates/v1_123#_integrated-browser) adding a bookmarking feature and more ways to capture screenshots.
    
-   ✨ Microsoft's Edge browser has [expanded its on-device AI capabilities](https://blogs.windows.com/msedgedev/2026/06/02/expanding-on-device-ai-in-microsoft-edge-new-models-and-apis-for-the-web/) with new models and APIs.
    
-   🤖 [The results from the 2026 _State of Web Dev AI_ survey](https://2026.stateofai.dev/en-US) are now live.
    

📙 Articles, Opinions & Tutorials

[Revealing Text with CSS `letter-spacing`](https://css-tricks.com/revealing-text-with-css-letter-spacing/ "css-tricks.com") — Preethi shares a desire for something like `::nth-letter` as a way to unlock creative, individual targeting of characters — but, until we have such a tool, she looks at what we can do today with `letter-spacing`, `::first-letter`, and `::first-line`.

Preethi Sam

[_Intentionally_ Blocking Rendering with JavaScript](https://www.jayfreestone.com/writing/intentional-render-blocking-javascript/ "www.jayfreestone.com") — We’re usually told to keep scripts non-blocking with `async`/`defer`, but _sometimes_ it’s worth holding back paint: `blocking="render"` keeps the parser running while preventing the layout flash when a component needs JavaScript to measure before it's shown.

Jay Freestone

📊 [Frontend’s Missing Metric: The TBT _Window_](https://csswizardry.com/2026/06/front-ends-missing-metric-the-tbt-window/ "csswizardry.com") — Harry makes the case for tracking the "TBT Window", the FCP-to-TTI interval during which Total Blocking Time is counted. Since it shifts as FCP or TTI move, TBT can regress with no real change in blocking work.

Harry Roberts

▶  [AI, Web and Standards](https://www.youtube.com/watch?v=ZJSmi_YL7Yo "www.youtube.com") — A 12-minute talk on web features that make AI integration easier, and the standards needed to curb AI’s damage to the web.

Hidde de Vries

🧰 Tools, Code & Resources

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/cellzi1ka9barclvytl9.jpg)](https://polycss.com/)

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1780483351/ufuphpwnnxya0rp7rzdx.png)](https://fontastic.space/)