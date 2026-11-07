---
title: "Redux Toolkit's road to 3.0"
source: "https://react.statuscode.com/issues/496"
publishedDate: "2026-11-06"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/ouvobggjw2zmigv3z8xx.jpg)](https://www.theverge.com/news/1027379/discord-ditching-electron-web-app)

▶️ Just prior to this reveal, Software Mansion interviewed Discord's Chas Jhin about how React Native development works at Discord's scale, in the ominously titled ['Maybe React Native Is Impossible'](https://www.youtube.com/watch?v=NYOM5ujWI9Y).

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/01c20d97.png)](https://master.dev/courses/local-ai/?utm_source=email&utm_medium=reactstatus&utm_content=localaicooper)

[Run AI Coding Models on Your Own Machine](https://master.dev/courses/local-ai/?utm_source=email&utm_medium=reactstatus&utm_content=localaicooper "master.dev") — Local models are now good enough for everyday coding. Learn to run them on your own Mac or GPU, wire them into your editor and terminal agents, and keep your code private with no per-token bill.

Master.dev

[A Roadmap for Redux Toolkit v2.x and 3.0](https://github.com/reduxjs/redux-toolkit/discussions/5536 "github.com") — Mark Erikson has laid out the roadmap for Redux (complete with a neat history lesson) with RTK 3.0 expected in six to eight months, going ESM-only with 'React 19-scale' breaking changes. But a run of 2.x releases will ship the groundwork first, starting with [2.14](https://github.com/reduxjs/redux-toolkit/releases/tag/v2.14.0) this week.

Mark Erikson

**IN BRIEF:**

-   ⚠️ Update to Next.js 16.4.5 or 15.5.29, as appropriate: [the November security release](https://nextjs.org/blog/november-2026-security-release) fixes seven advisories. Most are Cache Components bugs, so the post is worth reading.
    
-   🤖 TanStack Query maintainer Dominik Dorfmeister says [work on Query v6 can start once 'slop PRs' stop coming in](https://bsky.app/profile/tkdodo.eu/post/3mzdpknm7x227) and taking up his time, leading to a thread on the effects of AI-made contributions on maintainers.
    
-   Vercel is [folding Next.js's Data Cache into Runtime Cache](https://vercel.com/blog/simplifying-runtime-caching-on-vercel) with bigger allocations but… new per-read and per-write pricing. Hobby teams migrate on November 29, but [check the dates and prices](https://vercel.com/changelog/data-cache-is-moving-to-runtime-cache) for your use case.
    
-   Vercel builds also now [block known-malicious npm package versions](https://vercel.com/changelog/blocking-malicious-npm-packages-before-and-during-installation) before and during install, on all plans and with no configuration needed.
    

[Next.js is Prototyping Go(lang) Route Handlers](https://github.com/vercel/next.js/pull/100130 "github.com") — A merged experimental PR lets an App Router route be a `route.go` file exporting `GET` and friends, compiled by Turbopack and run in supervised Go-powered workers. Tim says Rust could follow along the same path.

Tim Neutkens (Vercel)

[Understanding React Internals: A Deep Dive](https://www.alexandretrotel.org/articles/understanding-react-internals "www.alexandretrotel.org") — A seven-part, source-grounded tour of React's internals that, unusually, starts from the server end before getting to fibers, lanes and the commit phase.

Alexandre Trotel

📄 [Why We Finally Left Next.js for TanStack Start](https://harrisonmilbradt.com/writing/nextjs-to-tanstack-start) – Production memory leaks in two Next.js 16.3 releases were the last straw. Harrison Milbradt

📄 [Writable Derived State: Stop Synchronizing State](https://playfulprogramming.com/posts/writable-derived-state) – Using `clientData ?? serverData` instead of a `useEffect` that wipes user edits on refetch. Corbin Crutchley

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/bl5l2bsrtakodwasfc7d.jpg)](https://skullet.lochie.me/)

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/pqjgb8mjxtsjhmrzjeis.jpg)](https://react-resizable-panels.vercel.app/examples/workspace)

-   [Preact 11.2](https://github.com/preactjs/preact/releases/tag/11.2.0) – Now has a [runtime for React Compiler output](https://github.com/preactjs/preact/releases/tag/11.1.0) via `preact/compat`, plus scoped custom element registries in shadow roots.
    
-   [XState 6.0 Beta](https://github.com/statelyai/xstate/releases/tag/xstate%406.0.0-beta.0) – _"No further breaking changes are planned"_ for public APIs, and [`@xstate/react` 7](https://github.com/statelyai/xstate/releases/tag/%40xstate/react%407.0.0-beta.0) is in beta alongside.
    
-   [TanStack Redact 0.3](https://github.com/TanStack/redact/releases/tag/%40tanstack%2Fredact%400.3.0) – The lightweight, synchronous-only React / React DOM replacement adds browser SPA plugins for Webpack and Rspack.
    
-   [React Native 0.89 RC](https://github.com/react/react-native/releases/tag/v0.89.0-rc.0) – Faster text layout and native module calls, legacy bridge APIs gone. Stable expected in December.
    
-   [Storybook 11.0 Beta](https://github.com/storybookjs/storybook/releases/tag/v11.0.0-beta.0)
    

📰 Classifieds

🤖 [Fimo](https://fimo.ai/?utm_source=reactstatus&utm_medium=newsletter&utm_campaign=agents-launch&utm_content=nov06) gives your marketers a visual editor and AI agents for SEO and GEO. No more tickets for your React devs. By the Strapi team.

* * *

[QVAC](https://get.qvac.tether.io/React-Status) allows you to run any AI capabilities for free, on your phone or laptop, privately. [Try the QVAC SDK now on GitHub](https://get.qvac.tether.io/React-Status).

📢  Elsewhere in the ecosystem

-   James Long [has been reviving _Prepack_](https://jamesbox.exe.xyz/artifacts/prepack-revived/), Facebook's abandoned JavaScript partial evaluator. There's a [React demo](https://jamesbox.exe.xyz/northstar/prepack/) where a pretend site is server rendered three ways, by React, by Prepack's output (which essentially 'compiles' React away), and a hybrid, with the render times to compare.
    
-   [Node.js 27 _Alpha_](https://nodejs.org/en/blog/release/v27.0.0-alpha.0.0.0) has landed, the first version using Node's new [release process](https://nodejs.org/en/about/previous-releases) (where a release will spend six months in 'alpha' before going _Current_), while [Node 26](https://nodejs.org/en/blog/release/v26.13.0) is now the new LTS line.
    
-   Chrome 157 rolled out this week with [HTML-in-Canvas now stable](https://developer.chrome.com/blog/html-in-canvas). It provides a way to draw real DOM elements into 2D, WebGL and WebGPU canvases. [The demos](https://chrome.dev/html-in-canvas/) are striking.
    
-   Vercel has released [Geist Serif](https://vercel.com/blog/introducing-geist-serif), a new serif font that shares metrics with [Geist Sans](https://fonts.google.com/specimen/Geist) so the two can mix cleanly. It's not on Google Fonts yet, but the [`geist` npm package](https://github.com/vercel/geist-font/releases/tag/v1.9.0) includes it.