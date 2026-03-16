---
title: "What a week: Vite 8.0, RedwoodSDK 1.0, shadcn/cli v4..."
source: "https://react.statuscode.com/issues/466"
publishedDate: "2026-03-13"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/wvvk35z5hqefldo3tdaf.jpg)](https://vite.dev/blog/announcing-vite8)

[Vite 8.0 Released](https://vite.dev/blog/announcing-vite8 "vite.dev") — A mega release for the popular build tool. Designed to be a smooth upgrade, there’s a _lot_ going on behind the scenes: `@vitejs/plugin-react` v6 no longer needs Babel (Oxc steps up), [Rolldown](https://rolldown.rs/) replaces Rollup and esbuild, Wasm SSR support, browser console forwarding to the terminal, and huge perf improvements. Great news for Remix, TanStack Start, and Astro users!

Vite

💡 [Vitest 4.1](https://vitest.dev/blog/vitest-4-1.html) has also been released with Vite 8 support.

**IN BRIEF:**

-   [Dan Abramov noted](https://bsky.app/profile/danabra.mov/post/3mgmxqsgugk25) that pages on the React site have a _'Copy Page'_ button that copies the page as Markdown (which you could feed to an agent, say). You can also add `.md` to the URL, [like in this example.](https://react.dev/learn/react-compiler/installation.md)
    
-   In [this _X_ post](https://x.com/en_JS/status/2031606726689173846), Joe Savona of the React team says that a Rust-powered version of the React Compiler is coming soon.
    
-   Interactive RSC sandboxes are [coming to the official React docs.](https://github.com/reactjs/react.dev/pull/8300)
    
-   If you use [React Admin](https://marmelab.com/react-admin/), enjoy [this roundup of recent developments.](https://marmelab.com/blog/2026/02/26/react-admin-february-2026-update.html)
    
-   [TypeScript 6.0 Release Candidate](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0-rc/) has been released.
    

[shadcn/cli v4 Released](https://ui.shadcn.com/docs/changelog/2026-03-cli-v4 "ui.shadcn.com") — [shadcn/ui](https://ui.shadcn.com/)'s [CLI tool](https://ui.shadcn.com/docs/cli) gets an upgrade aimed at humans _and_ agents with 'skills' to improve agent performance, _presets_ to pack a design system config into a simple ID (and switch between them), 'dry runs' to see what a registry will add prior to doing it, and `shadcn/create` is rebuilt with a set of components for fast preset previews.

shadcn

[An Empirical Study of Frontend Memory Leaks](https://stackinsight.dev/blog/memory-leak-empirical-study/ "stackinsight.dev") — Analysis of 500 repos (210 of which were React apps) for common patterns that lead to memory leaks. Missing timer cleanups and event listener removals made up the majority of problems found.

Ko-Hsin Liang

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/ggrchqegivs99f4ohysg.jpg)](https://rwsdk.com/blog/redwood-v1-getting-out-of-the-weeds)

[RedwoodSDK 1.0 Released: The Cloudflare-Native React Framework](https://rwsdk.com/blog/redwood-v1-getting-out-of-the-weeds "rwsdk.com") — RedwoodSDK, essentially a full reboot of the former _RedwoodJS_, is a server-first React framework, built as a Vite plugin, that integrates deeply with the Cloudflare platform ([why?](https://rwsdk.com/blog/why-cloudflare-unified-platform)) and its provision of workers, databases (D1), durable objects, storage (R2), AI APIs, etc.

Peter Pistorius

-   [React Aria 1.16.0](https://react-aria.adobe.com/releases/v1-16-0.html) – Adobe's suite of accessible components adds multi-select support to its combobox. [Try it here](https://react-aria.adobe.com/ComboBox) _(select 'multiple' on the right)._
    
-   [Astro 6.0](https://astro.build/blog/astro-6/) – A big update for the popular content site framework, including a built-in Fonts API, Content Security Policy API, a redesigned `astro dev` using Vite's new Environment API, and more.
    
-   [React Modal Sheet 5.4](https://github.com/Temzasse/react-modal-sheet) – Flexible bottom sheet component built with Motion.
    
-   [react-native-nitro-sqlite 9.6](https://github.com/margelo/react-native-nitro-sqlite/releases/tag/v9.6.0) – Fast SQLite library for React Native.
    
-   [react-share v5.3.0](https://github.com/nygardk/react-share/releases/tag/v5.3.0) – Social media share buttons for React apps.
    
-   📊 [Recharts 3.8](https://github.com/recharts/recharts/releases/tag/v3.8.0) – D3-powered React charting library.
    
-   [Preact 10.29.0](https://github.com/preactjs/preact/releases/tag/10.29.0) – The fast 3KB React alternative.
    
-   [BaseUI 1.3](https://base-ui.com/) – Unstyled UI component library.
    
-   [Ionic Framework 8.8](https://ionic.io/blog/announcing-ionic-framework-8-8)
    

📰 Classifieds

⚛️ [React Summit](https://reactsummit.com/?utm_source=partner&utm_medium=reactstatus) | The biggest gathering of React developers. June 12 & 16 - experience it live in beautiful Amsterdam or tune in from anywhere.

📢  Elsewhere in the ecosystem

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/rzzdhkvkzmafswznbki8.jpg)](https://bloomberg.github.io/js-blog/post/temporal/)

-   🕒 **It's about time…** At [this week's TC39 meeting](https://github.com/tc39/agendas/blob/main/2026/03.md), the Temporal proposal progressed to Stage 4. In [Temporal: The 9-Year Journey to Fix Time in JavaScript](https://bloomberg.github.io/js-blog/post/temporal/), Jason Williams explains how JavaScript's time/date handling has long been problematic and what Temporal brings to the table.
    
-   [theSVG](https://www.thesvg.org/) is a catalog of 4000+ brand icons you can grab as SVGs _or_ get JSX you can copy/paste into a React app. [Here's Apple's logo](https://www.thesvg.org/icon/apple), for example.
    
-   [Solid 2.0 is now in beta.](https://github.com/solidjs/solid/releases/tag/v2.0.0-beta.0) Solid is a UI framework that takes a fundamentally different signal-oriented approach to reactivity compared to React (no virtual DOM, for starters) but with similar syntax.
    
-   [Pushing and Pulling: Three Reactivity Algorithms](https://jonathan-frere.com/posts/reactivity-algorithms/) looks at different types of reactivity. It's not about React, per se, but the concepts are worth knowing.
    
-   [GitHub addresses its recent availability issues.](https://github.blog/news-insights/company-news/addressing-githubs-recent-availability-issues-2/)