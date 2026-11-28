---
title: "Ricky Hanlon leaves Meta (but not React)"
source: "https://react.statuscode.com/issues/499"
publishedDate: "2026-11-27"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/iyljdqwehjcad5y5dro8.jpg)](https://bsky.app/profile/ricky.fm/post/3n35lo3frik2z)

[Ricky Hanlon is Leaving Meta (But Not React)](https://bsky.app/profile/ricky.fm/post/3n35lo3frik2z "bsky.app") — After years helping get React _"from 4 million to 250 million weekly downloads"_, Ricky has left React's birthplace, noting _"most of the React Core team have left Meta"_. This is more an 'end of an era' than big news, as he'll continue to work on React, and [React getting its own foundation](https://react.dev/blog/2026/02/24/the-react-foundation) this year showed us the direction of travel.

Ricky Hanlon

💡 Paul O'Shannessy, who pushed React's first public code in 2013 and helped form the foundation, also left Meta this year and wrote [a look back at his 14 years there](https://zpao.com/posts/14-years-at-meta/).

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/cba882ff.png)](https://fandf.co/4t3keLj)

[Build Durable AI Agents & Workflows in TypeScript](https://fandf.co/4t3keLj "fandf.co") — Trigger.dev runs AI agents as tasks inside your codebase, in plain TypeScript with full control of runtime. No serverless timeouts, so even long agents run to completion, surviving refreshes, redeploys, and crashes. Write your logic, test it, and deploy agents that scale on demand.

Trigger.dev

[Your Tools are Hiding npm Audits From You](https://www.zachleat.com/web/npm-audit-report/ "www.zachleat.com") — `npm audit` on a new `create-next-app` app shows '0 vulnerabilities' but Next vendors over 100 packages and the audit doesn't notice those. To help counter this, Zach has built the [📊 Prototype Pollution Report](https://ppr.zachleat.dev/) which compares numerous frameworks' behaviors and vendored dependency vulnerabilities.

Zach Leatherman

[React Forms Beyond `onSubmit`](https://www.gmoniava.com/blog/react-forms-beyond-onsubmit "www.gmoniava.com") — See the differences between a form built three ways (with `onSubmit`, React 19's `action` prop, and `onSubmit` plus `useTransition`). Each has pros and cons, shown in a comparison table.

Giorgi Moniava

📄 [Can You Confidently Ship to Production From Your Phone?](https://expo.dev/blog/ship-to-production-from-your-phone) – How an Expo engineer fixed a bug and shipped an over-the-air update while on a walk. Rami Maalouf (Expo)

📄 [Why Base44 Now Generates New Apps with TanStack Start](https://base44.com/blog/base44-apps-full-stack) – Bye to SPAs plus separate backend functions; hello full-stack apps. Netanel Gilad (Base44)

📄 [Building Bulletproof React Components](https://shud.in/thoughts/build-bulletproof-react-components) – A re-run of a classic from the co-creator of [SWR](https://swr.vercel.app/). Shu Ding

📄 [React Testing Library is Faster When It's Part of the DOM](https://sigh.dev/posts/vibecoding-faster-react-tests/) – An interesting approach. Scott Cooper

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/zlcmbt26ptp7pwht5tzb.jpg)](https://generativeloaders.com/)

[Generative Loaders: Loading States for Generative UI](https://generativeloaders.com/ "generativeloaders.com") — Almost fifty elegant and accessible ways to show the 'thinking' moments in UIs, like when an LLM is generating text, an image is being generated, or even just while a background process is working on something.

Kasturi Khanke

[Sashay: Sliding, Resizable Panes for React](https://vcarl.com/sashay/ "vcarl.com") — A way to let users arrange your app the way they want by dragging and snapping edges between panes (and on phones, the edges become tabs). The homepage is a good demo itself.

Carl Vitullo

-   [react-pdf 11.1](https://github.com/wojtekmaj/react-pdf/releases/tag/v11.1.0) – Display PDFs in your React app. Now on a newer version of [PDF.js](https://mozilla.github.io/pdf.js/) with better performance and text selecting. ([Homepage with live demo](https://projects.wojtekmaj.pl/react-pdf/).)
    
-   [jest-dom 8.0](https://github.com/testing-library/jest-dom/releases/tag/v8.0.0) – Custom DOM matchers for Jest and Vitest. Note that Vitest users now need Vitest 5 or later.
    
-   [Voltra 2.7](https://github.com/callstackincubator/voltra/releases/tag/v2.7.0) – A way to build iOS _Live Activities_ and widgets as React Native components.
    
-   📊 [echarts-for-react 3.1](https://github.com/hustcc/echarts-for-react/releases/tag/v3.1.0) – React wrapper for Apache ECharts.
    
-   [Material UI 9.6](https://github.com/mui/material-ui/releases/tag/v9.6.0) – Comprehensive React component suite.
    

📰 Classifieds

⚛️ Inconsistent code from AI agents? [Nexity](https://github.com/Pagepro/nexity) pairs rules in plain files with 8 reviewers and auditors. For Claude Code, Codex, Cursor. MIT.

* * *

📱 Ship React Native fixes without waiting on app review. [Get Bitrise’s free guide to safe OTA updates](https://bitrise.io/guides/react-native-ota-updates-complete-guide?utm_campaign=cp_guide_the-complete-guide-to-react-native-ota-updates_all_2026-11-09&utm_source=React%20status&utm_medium=newsletter-11-27&utm_content=classified-slot-1).

📢  Elsewhere in the ecosystem

-   🤖 Vercel's [eve](https://eve.dev/), a Next.js-style framework for building AI agents, [has reached its 1.0 release](https://vercel.com/blog/eve-is-now-generally-available). It's _not_ a React project, but includes integrations for Next.js and TanStack Start, plus React bindings for building your own agent UIs.
    
-   If you're chasing bugs through a production bundle, [Chrome's DevTools can now show original variable and function names](https://developer.chrome.com/blog/new-in-devtools-december-2026#sources_original_scopes_view_stack_traces_and_expression_evaluation_with_ecma-426_source_map_scopes) in scopes/stack traces/console (as long as the source maps follow [the 'scopes' proposal](https://github.com/tc39/ecma426/blob/main/proposals/scopes.md)).
    
-   🗳️ [_The State of JavaScript 2026_ survey](https://survey.devographics.com/en-US/survey/state-of-js/2026) closes soon, so it's worth taking if you haven't yet as it's also a good way to put newer techniques on your radar.
    
-   🎉 The Svelte team is [celebrating the project's tenth birthday](https://svelte.dev/blog/ten-years-of-svelte).