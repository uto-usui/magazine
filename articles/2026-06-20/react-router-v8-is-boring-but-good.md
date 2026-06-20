---
title: "React Router v8 is boring but good"
source: "https://react.statuscode.com/issues/479"
publishedDate: "2026-06-19"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/xlwnqlc6bo8ugxfe8r2q.jpg)](https://remix.run/blog/react-router-v8)

**IN BRIEF:**

-   **The [Rust-port of React Compiler](https://github.com/react/react/pull/36173) has been merged!** Support is already landing in popular projects, like [in Next.js](https://github.com/vercel/next.js/pull/94573) (already in [canary](https://nextjs.org/docs/app/getting-started/upgrading#canary-version)), [Oxlint 1.70](https://oxc.rs/docs/guide/usage/linter/rules/react/react-compiler.html), [swc](https://github.com/swc-project/swc/pull/11917) and [Rolldown](https://github.com/rolldown/rolldown/pull/9801).
    
-   [React Native 0.86](https://reactnative.dev/blog/2026/06/11/react-native-0.86) has been released with edge-to-edge support on Android 15+ and DevTools improvements.
    
-   WordPress announced it's [upgrading to React 19](https://make.wordpress.org/core/2026/05/27/react-19-upgrade-in-wordpress/) in WordPress 7.1, but [this has now been temporarily reverted](https://make.wordpress.org/core/2026/06/05/react-19-upgrade-temporarily-reverted-in-gutenberg/) due to plugin compatibility problems.
    
-   📊 Expo has unveiled [a (free) open beta of _EAS Observe_](https://expo.dev/blog/introducing-observe), its performance monitoring/observability service for React Native apps.
    
-   The [release candidate of TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/) has been released.
    

[Can Signals Make _React Redux_ Faster at Scale?](https://github.com/reduxjs/react-redux/pull/2318 "github.com") — A PR by Mark Erikson where he experiments with signals-based `SignalProvider` and `useSignalSelector` drop-ins that only re-run selectors for components whose state actually changed, with some noteworthy performance gains.

Mark Erikson

📄 [TanStack Start: A Mental Model for Next.js Developers](https://www.adarsha.dev/blog/tanstack-mental-model-for-nextjs-developers) – Maps TanStack Start onto Next.js concepts with side-by-side code comparisons. Adarsha Acharya

📄 [How We Cut Slow Responses by 80% Migrating to Next.js App Router](https://dev.to/subito/how-we-cut-slow-responses-by-80-migrating-to-nextjs-app-router-37da) – A classifieds site moved from Pages Router to App Router, cut slow responses, and tackled some Nginx and Akamai HTML streaming gotchas. Francesca Milan (Subito)

📄 [When React Hooks Stop Scaling: Moving Complex State to Zustand](https://orizens.com/blog/2026-06-18-zustand/) Oren Farhi

📄 [TypeScript Performance in TanStack Table V9](https://tanstack.com/blog/tanstack-table-v9-typescript-performance) Kevin Van Cott

📄 [React Native Needs a New Video Player](https://www.mux.com/blog/react-native-needs-a-new-video-player) Joshua Alphonse

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/uxi7ogpottz1lt23kr1u.jpg)](https://marketplace.visualstudio.com/items?itemName=yurii.react-props-first)

📰 Classifieds

Flaky tests slowing down dev? [Meticulous](https://www.meticulous.ai/?utm_source=reactstatus&utm_medium=newsletter&utm_campaign=26q2&utm_content=classified) gives engineers confidence to ship faster by autonomously testing every edge case of your web app.

* * *

🚀 [`clerk deploy` walks your app to production](https://go.clerk.com/relF84R): instance clone, DNS setup, OAuth credentials, SSL check. Guided, resumable, and [available now](https://go.clerk.com/relF84R).

* * *

React review changed when AI started writing the JSX. [AgentField](https://agentfield.ai/blog/ai-native-code-review/?utm_source=react&utm_medium=newsletter&utm_campaign=react-260619&utm_id=react-260619-blog-ai-native-code-review&utm_content=blog-ai-native-code-review) breaks down the four jobs of code review - and which three get harder once AI writes the diff. [→ Read the post](https://agentfield.ai/blog/ai-native-code-review/?utm_source=react&utm_medium=newsletter&utm_campaign=react-260619&utm_id=react-260619-blog-ai-native-code-review&utm_content=blog-ai-native-code-review).

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/cu3lkurhu6bqogc16s9h.jpg)](https://tisoap.github.io/react-flow-smart-edge/docs)

-   [React Flow Smart Edge 4.9](https://tisoap.github.io/react-flow-smart-edge/docs) _(above)_ – A custom 'edge' type for [React Flow](https://reactflow.dev/) that uses A\* pathfinding and never intersects with other nodes.
    
-   [Ink 7.1](https://github.com/vadimdemedes/ink/releases/tag/v7.1.0) – The popular TUI renderer [adds `suspendTerminal()`](https://github.com/vadimdemedes/ink/pull/972) for temporarily handing the terminal over to a child process (like an editor, say).
    
-   📱 [Voltra 2.0](https://www.use-voltra.dev/) – Build Live Activities & widgets in iOS/Android React Native apps. [v2.0](https://github.com/callstackincubator/voltra/releases/tag/v2.0.0) no longer requires Expo Modules.
    
-   [StyleX 0.19.0](https://github.com/facebook/stylex/blob/main/CHANGELOG.md#0190-jun-14-2026) – Meta's styling system adds a new package for inline atomic styles, plus ESLint 10 compatibility.
    
-   [MUI X 9.6](https://github.com/mui/mui-x/releases/tag/v9.6.0) – The popular component suite rolls out bug fixes and improvements to radial bar charts.
    
-   📊 [react-plotly.js 4.0](https://github.com/plotly/react-plotly.js/releases/tag/v4.0.0) – Component for rendering interactive [Plotly](https://plotly.com/javascript/) charts.
    
-   [React Aria 1.19.0](https://react-aria.adobe.com/releases/v1-19-0) – Adobe's accessible component suite.