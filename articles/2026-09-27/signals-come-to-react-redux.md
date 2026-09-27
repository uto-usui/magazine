---
title: "Signals come to React-Redux"
source: "https://react.statuscode.com/issues/492"
publishedDate: "2026-09-25"
category: "frontend"
feedName: "React Status"
---

👋 We're taking a week off next week, so we'll be back on Friday, October 9.  
\_\_  
_Your editor, Peter Cooper_

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/wurtgptbln8tma7ldkus.jpg)](https://github.blog/engineering/user-experience/rendering-huge-pull-requests-in-the-github-copilot-app/)

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/a903eb2f.png)](https://coderabbit.link/ad-cooperpress-003)

[Fewer Findings. Only Real Risks](https://coderabbit.link/ad-cooperpress-003 "coderabbit.link") — AI-generated code can introduce vulnerabilities that are easy to miss in a pull request. **CodeRabbit Security** continuously reviews your codebase for complex bugs and security risks, using full-codebase context to follow data flows, dependencies, and patterns beyond the latest diff.

CodeRabbit

💡 The runtime is a fraction of React's size, but the trade-off is no concurrent rendering ([this Japanese blog post](https://azukiazusa.dev/blog/what-is-tanstack-redact/) has a nice look into that). There's also no license yet, and it can be considered experimental.

**IN BRIEF:**

-   ⚠️ Using `next/og` on Node? [Next.js 16.3.6](https://nextjs.org/blog/nextjs-security-update-september-22-2026) fixes a critical RCE in `ImageResponse` affecting v16.2+. [A scheduled release next week](https://nextjs.org/blog/upcoming-nextjs-security-release-september-2026) will fix nine more vulnerabilities.
    
-   [Astro](https://astro.build/)'s React integration [reaches v7.0](https://github.com/withastro/astro/releases/tag/@astrojs/react@7.0.0), moving from Babel to Oxc and adding React Compiler support with a `compiler: true` option.
    
-   Vercel has [made its bug bounty program public](https://vercel.com/blog/the-vercel-bug-bounty-program-is-now-publicly-available), folding its private and open source programs (which covered Next.js) into one.
    

[React-Redux 9.4 Alpha Adds Opt-In `useSignalSelector`](https://github.com/reduxjs/react-redux/releases/tag/v9.4.0-alpha.0 "github.com") — Redux runs every mounted selector on every dispatch, which gets costly in huge apps. The new opt-in, signals-based `useSignalSelector` tracks which state each selector reads, so a dispatch only re-runs selectors whose data changed.

Mark Erikson

💡 Alpha 0, above, has the full explainer, but [Alpha 1](https://github.com/reduxjs/react-redux/releases/tag/v9.4.0-alpha.1) landed yesterday with a key bugfix and corrected benchmarks.

📄 [Helix: How Shopify is Using LLMs to Move Its App Off React Native](https://shopify.engineering/helix) – A look behind the scenes of Shopify's [recently announced migration](https://shopify.engineering/back-to-native) from React Native to Swift and Kotlin. Talha Naqvi (Shopify)

📄 [Props Are Not a Design System](https://vitonsky.net/blog/2026/09/18/design-system/) – Why arbitrary style props make every button a one-off. Robert Vitonsky

📄 [AI, Open Source, and the Long Road to _TanStack Charts_](https://tannerlinsley.com/posts/ai-open-source-and-the-long-road-to-tanstack-charts) – A look into how Tanner builds with agents now. Tanner Linsley

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/lccwqt7l0qcob0e72z9o.jpg)](https://github.com/seek-oss/playroom)

💡 Along similar lines, Nearform has just released [v5](https://github.com/FormidableLabs/react-live/releases/tag/react-live%405.0.0) of [React Live](https://nearform.com/open-source/react-live/docs), a live editing experience for React components but better suited for use in docs, blog posts, etc.

[pdfcn: Copy-Paste Components for Making PDFs](https://www.pdfcn.dev/ "www.pdfcn.dev") — Takes the shadcn approach to PDF generation, with components for tables, headers, lists, and larger blocks for things like invoices and reports. Rendering is done with [Takumi](https://takumi.kane.tw/docs/pdf) or [Forme](https://docs.formepdf.com/quickstart), both WASM-based engines that don't need a headless browser.

Aniket Pawar

-   [React Native Reanimated 4.7](https://github.com/software-mansion/react-native-reanimated/releases/tag/4.7.0) – Create smooth animations and interactions in React Native apps. Layout animations now run on its new engine by default.
    
-   [gridstack.js 14.0](https://github.com/gridstack/gridstack.js/releases/tag/v14.0.0) – The popular drag-and-drop dashboard layout library adds a `list` mode that reflows widgets like a reorderable list. ([Demos](https://gridstackjs.com/demo/index.html).)
    
-   😀 [Frimousse 0.4](https://frimousse.liveblocks.io/) – Lightweight, unstyled emoji picker component.
    
-   [React Three Fiber 9.8](https://github.com/pmndrs/react-three-fiber/releases/tag/v9.8.0) – Now compatible with React 19.3.
    

And finally…

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/ovbpaehwz8p6qlfastfd.jpg)](https://guokaigdg.github.io/animal-island-ui/)