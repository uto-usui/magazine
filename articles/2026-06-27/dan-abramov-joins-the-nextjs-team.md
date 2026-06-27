---
title: "Dan Abramov joins the Next.js team"
source: "https://react.statuscode.com/issues/480"
publishedDate: "2026-06-26"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/iwsfel0vwljz7a6wvivj.jpg)](https://nextjs.org/blog/next-16-3-instant-navigations)

[Making Next.js Navigations Feel Instant Without Going Full SPA](https://nextjs.org/blog/next-16-3-instant-navigations "nextjs.org") — A preview of Next.js 16.3 is available that tackles a common gripe about Server Components: sluggish navigation. New opt-in behaviors keep the server-side benefits, while making navigations feel like an SPA. They’ve also created [🤖 an agent skill](https://github.com/vercel/next.js/blob/canary/skills/next-cache-components-adoption/SKILL.md) to help existing projects adopt the new features.

Clark, Story and the Next.js Team

🎉 In [a Bluesky thread](https://bsky.app/profile/danabra.mov/post/3mp5b3n3xgc2k) commenting on the release, Dan Abramov revealed [he's joining the Next.js team](https://bsky.app/profile/danabra.mov/post/3mp5b3nd3ws2k) on a part-time basis!

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/432b659e.png)](https://www.meticulous.ai/?utm_source=reactstatus&utm_medium=newsletter&utm_campaign=26q2&utm_content=primary)

[Still Writing Tests Manually? Meticulous AI Is Here](https://www.meticulous.ai/?utm_source=reactstatus&utm_medium=newsletter&utm_campaign=26q2&utm_content=primary "www.meticulous.ai") — Notion, Dropbox, Wiz and LaunchDarkly now use a testing paradigm they can’t work without. Built by former Palantir engineers, Meticulous automatically creates an evolving suite of E2E UI tests, delivering exhaustive coverage with no developer effort.

Meticulous

**IN BRIEF:**

-   [Vite 8.1](https://vite.dev/blog/announcing-vite8-1) includes a 'bundled dev mode' that makes apps with large numbers of modules boot/reload faster (testing on an app with 10,000 components showed a 15x speedup, with more modest gains on real-world apps).
    
-   [Rsbuild 2.1](https://rsbuild.rs/blog/v2-1) has been released and now includes the new Rust implementation of React Compiler, plus TanStack Start support.
    
-   Meanwhile, Rolldown and Vite have temporarily [𝕏 _removed_ the initial Rust React Compiler integration](https://x.com/boshen_c/status/2069449703935336846) citing a 17% increase in binary size.
    

[Moving Linear from styled‑components to StyleX](https://www.skovhus.dev/blog/moving-linear-from-styled-components-to-stylex "www.skovhus.dev") — Linear migrated its React apps away from a runtime CSS-in-JS approach for ~30% faster renders when navigating between pages. An agent-built codemod (of some 100k lines!) did the grunt work, but Kenneth is honest about what still needed a human touch.

Kenneth Skovhus

[Writing Custom Renderers for React](https://www.callstack.com/blog/writing-custom-renderers-for-react "www.callstack.com") — When React 19 deprecated React Test Renderer, the React Native Testing Library maintainer built his own. The upside? We get a tour of the reconciler internals he had to wrangle along the way.

Maciej Jastrzębski (Callstack)

📄 [Waku’s Unique Feature: Slices](https://newsletter.daishikato.com/p/waku-s-unique-feature-slices) – A slice is a reusable component with its own render config, and a lazy mode that loads independently, akin to Astro’s server islands. Daishi Kato

📄 [How an Underrated Refactor Saved 90% Memory Usage](https://tanstack.com/blog/tanstack-table-v9-memory-performance) – The tale of how [TanStack Table](https://tanstack.com/table/latest) v9 uses _far_ less memory than v8 on large tables. Kevin Van Cott (TanStack)

📄 [Building a Video Call App with Filters in React Native](https://blog.margelo.com/building-videocall-app-with-filters) Ritesh Shukla

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/edufdnsa3faxxatpmwxy.jpg)](https://takumi.kane.tw/)

[Takumi 2.0 Beta: Render React Components to Images](https://takumi.kane.tw/ "takumi.kane.tw") — A Rust-powered engine that renders JSX to images _without_ a headless browser. v2.0 adds SVG output support, on-demand Google Fonts use, improved non-Latin character support, and new docs. There’s a [v2 upgrade guide](https://takumi.kane.tw/docs/upgrade/v2) for existing users. _(TanStack uses this on their site.)_

Kane Wang et al.

-   [TinyBase v8.5](https://tinybase.org/guides/releases/#v8-5) – Reactive data store and sync engine backend for powering apps that need to feel fast _and_ work offline. v8.5 adds a module for rendering reactive SVG chart components in React apps.
    
-   [React Admin 5.15](https://github.com/marmelab/react-admin) – SPA framework providing a React and Material Design frontend to REST or GraphQL APIs. v5.15 adds [MUI v9](https://mui.com/blog/introducing-mui-v9/) support.
    
-   📊 [Recharts 3.9](https://github.com/recharts/recharts/releases/tag/v3.9.0) – React + D3 charting library. v3.9 adds [new animations](https://recharts.github.io/en-US/guide/animations/) and a guide to using them.
    
-   [RedwoodSDK 1.5](https://github.com/redwoodjs/sdk/releases/tag/v1.5.0) – The Cloudflare-based server-first React framework adds Vite 8 support.
    
-   [React Native Reanimated 4.5](https://github.com/software-mansion/react-native-reanimated/releases/tag/4.5.0) – Declarative API for smooth animations.
    
-   [ReactUse 1.0](https://reactuse.org/) – A library of 160+ production-ready hooks.
    
-   [Mantine v9.4](https://mantine.dev/changelog/9-4-0/) – Popular, extensive component suite.
    

📰 Classifieds

🏢 [Add org context to OAuth flows](https://go.clerk.com/43T2gZt): users pick an org, clients get an org\_id claim.

* * *

⚛️ You compose React from components. Compose your AI backend the same way — agents as typed APIs, native TypeScript SDK, 100+ recipes. [→ Star on GitHub](https://agentfield.ai/github/?utm_source=react&utm_medium=newsletter&utm_campaign=react-260626&utm_id=react-260626-github-cta&utm_content=github-cta).

📢  Elsewhere in the ecosystem

-   [Deno 2.9](https://deno.com/blog/v2.9) has been released with the headline feature being [a way to create cross-platform desktop apps](https://docs.deno.com/runtime/desktop/).
    
-   [Node.js v26.4 (Current)](https://nodejs.org/en/blog/release/v26.4.0) has been released with experimental support for [package maps](https://nodejs.org/api/packages.html#package-maps) which let Node resolve packages from a static JSON file rather than walking `node_modules`.
    
-   The [first preview release of `npm` 12 is available](https://github.com/npm/cli/releases/tag/v12.0.0-pre.1) if you want to get testing.
    
-   Ever struggled to understand what the [AT Protocol](https://en.wikipedia.org/wiki/AT_Protocol) is and how it relates to Bluesky? Dan Abramov clears it up in [There Are No Instances in atproto](https://overreacted.io/there-are-no-instances-in-atproto/), comparing atproto's architecture to RSS vs Mastodon's approach.
    
-   Sticking with atproto, Node's James M Snell ponders the possibility [of running the npm package system on AT Protocol.](https://www.jasnell.me/posts/what-if-npm-ran-on-atproto)
    
-   🕹️ [A Quake port rendered entirely with CSS](https://cssquake.com/) and DOM elements (no WebGL or canvas) – that's cool, right?