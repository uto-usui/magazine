---
title: "Next.js 16.4, and a new way to visualize React apps"
source: "https://react.statuscode.com/issues/493"
publishedDate: "2026-10-09"
category: "frontend"
feedName: "React Status"
---

ℹ️ We're back from a week off, but we're taking next week off too, so will be back on Friday, October 23.  
\_\_  
_Your editor, Peter Cooper_

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/fe3wu7d71nyuy9efyaox.jpg)](https://julesblom.com/writing/react-visual-notation)

[A Visual Notation for React's Parent and Owner Trees](https://julesblom.com/writing/react-visual-notation "julesblom.com") — A proposed diagram notation for React apps that shows both where each element ends up (the parent tree) and which component created it (the owner tree), with marks for context, Suspense, memo, error boundaries and RSC. There's also [a playground](https://julesblom.com/react-trees) that draws trees from code you paste in.

Jules Blom

**IN BRIEF:**

-   The React Foundation's working groups will meet in person for the first time at the [Contributors Summit](https://www.react.foundation/summit) in London next month. It's invite-only, but contributors can [nominate themselves](https://docs.google.com/forms/d/e/1FAIpQLSf-ATKZ0np5wFvWEOJlFeNp52BazYF5_fT7ubuvr3C0IHxheQ/viewform?pli=1).
    
-   📱 Following in Shopify's footsteps, [Coinbase says it's moving its app off React Native](https://www.linkedin.com/posts/adamawolf_senior-software-engineer-native-mobile-activity-7511201803389186048-JV6b) too, repeating the _"AI coding agents have collapsed the cost of building a feature twice"_ idea and saying they can access new platform features sooner.
    
-   Barbara Markiewicz, formerly of Callstack, [𝕏 has joined the React Foundation](https://x.com/sethwebster/status/2105422444529963495) as its Director of Community.
    

📄 [Making React Context Cheap with React Compiler](https://jjenzz.com/making-react-context-cheap/) – Can React Compiler avoid the need for context selectors? A 5,000-radio benchmark suggests it can. Jenna Smith

📄 [React Folder Structure Best Practices (2026 Edition)](https://www.robinwieruch.de/react-folder-structure/) Robin Wieruch

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/xev4fnt8ayacadkzw5go.jpg)](https://tanstack.com/blog/tanstack-charts-1-0)

[Ink 8: React for CLIs Gets Scrollable Views](https://github.com/vadimdemedes/ink/releases/tag/v8.0.0 "github.com") — The popular TUI renderer, as used by Claude Code and Gemini CLI. New props on `Box` enable scrollable views, `render()` takes any Node stream, and incremental rendering only rewrites changed parts of lines for less flicker.

Vadim Demedes

💡 In other good news, the docs for all the Redux libraries now live together on [redux.js.org](https://redux.js.org/), including those [for Redux Toolkit](https://redux.js.org/toolkit).

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/rgnwjhbzdrqa7dl0695h.jpg)](https://mantine.dev/changelog/9-7-0/)

-   [Mantine 9.7](https://mantine.dev/changelog/9-7-0/) – The popular component suite adds a new app onboarding [Tour component](https://mantine.dev/core/tour/) (_shown above_), plus its MCP server now exposes far more of the docs.
    
-   [React Native Skia 3.0](https://wcandillon.github.io/react-native-skia/docs/getting-started/migration/) – Now uses Skia's new Graphite GPU backend, which you can [▶️ see in action here](https://www.youtube.com/watch?v=L-PNQi1nBSA).
    
-   [React Native Testing Library 14.1](https://github.com/callstack/react-native-testing-library/releases/tag/v14.1.0) – Now supports React Native 0.88 and React 19.3, and adds a `pullToRefresh()` user event.
    
-   [Lexical 0.51](https://github.com/facebook/lexical/releases/tag/v0.51.0) – Meta's extensible text editor framework. Now ESM-only, and _“a big step towards Lexical 1.0.”_
    
-   [Base UI 1.9](https://github.com/mui/base-ui/releases/tag/v1.9.0) – Unstyled, accessible React components. Adds filterable menus (in preview) plus many focus and Drawer fixes.
    
-   ⭐ [MSW 3.0](https://mswjs.io/blog/introducing-msw-3.0) – Popular API mocking library. Now ESM-only, with GraphQL subscription support and a lighter footprint.
    
-   [React Aria 1.22](https://react-aria.adobe.com/releases/v1-22-0) – Adds a new swipeable `Sheet` component, [explained here](https://react-aria.adobe.com/blog/sheet).
    
-   [Material UI 9.5](https://github.com/mui/material-ui/releases/tag/v9.5.0)
    

📢  Elsewhere in the ecosystem

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/i0c745kvfckcevjrlsvu.jpg)](https://shaders.com/updates/shaders-is-open-source)

-   ✨ Want effects that ripple, glow or melt into ASCII without writing shader code? [Shaders](https://shaders.com/updates/shaders-is-open-source) has open sourced its WebGPU engine and [190+ effect components](https://shaders.com/docs/components), which drop into React like any other component.
    
-   Six years after work began, [Preact 11 is here](https://preactjs.com/blog/preact-11/). The tiny React alternative gains [Hydration 2.0](https://preactjs.com/guide/v11/upgrade-guide/#hydration-20) and automatic ref forwarding, and if you use `preact/compat` to run React code on it, the [upgrade guide](https://preactjs.com/guide/v11/upgrade-guide/) is worth a look.
    
-   Last week, [Remix 3.0](https://github.com/remix-run/remix/releases/tag/remix%403.0.0) went stable, and it's no longer built on React. Curious what the post-React Remix is like? Sergio Xalambrí reflects on [six months of building with v3](https://sergiodxa.com/articles/the-remix-way).
    
-   🤖 Theo Browne set AI agents loose on porting TypeScript 7 to Rust, and [ts-rust](https://github.com/pingdotgg/ts-rust) is the (very experimental) result.
    
-   🚨 Breaking news as we go to press: [Deno is joining Cloudflare](https://blog.cloudflare.com/deno-joins-cloudflare/).