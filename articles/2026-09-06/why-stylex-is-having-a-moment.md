---
title: "Why StyleX is having a moment"
source: "https://react.statuscode.com/issues/489"
publishedDate: "2026-09-04"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/chyecu202ca5onsfqt58.jpg)](https://linear.app/now/styling-linear-for-the-future-stylex)

💡 Over at _Syntax_, Scott and Wes asked [▶️ why is everyone moving to StyleX?](https://www.youtube.com/watch?v=NIG9GbVU5po) The extra rigidity isn't much fun for humans, but agents thrive on it. ([Transcript](https://syntax.fm/show/1035/why-everyone-is-moving-to-stylex/transcript).)

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/a5d0db7f.png)](https://blog.sentry.io/evaluate-session-replay-software/?utm_source=reactstatus&utm_medium=paid-community&utm_campaign=replay-fy27q3-evergreen&utm_content=newsletter-primary-blog-replay-guide-learnmore)

[How to Evaluate Session Replay Software](https://blog.sentry.io/evaluate-session-replay-software/?utm_source=reactstatus&utm_medium=paid-community&utm_campaign=replay-fy27q3-evergreen&utm_content=newsletter-primary-blog-replay-guide-learnmore "blog.sentry.io") — Use these criteria to compare session replay tools: recording methodology, privacy architecture, integration depth, overhead, AI-readability, and mobile support. These are the choices that determine whether replay helps you ship more reliable software.

Sentry

[How Turbopack Chunks Your JavaScript](https://nextjs.org/blog/turbopack-chunking "nextjs.org") — An explainer of how Turbopack chunks a Next.js app's JavaScript, and the (experimental) Next.js 16.3 options for tuning the process. Useful if you're focused on getting smaller client bundles.

Sam Poder

**IN BRIEF:**

-   [Vitest 5.0 is out](https://vitest.dev/blog/vitest-5.html) and is ~15% faster on its React SPA benchmark, and adds a built-in [trace view](https://vitest.dev/guide/browser/trace-view) that lets you step back through a browser test after it runs. [The migration guide](https://vitest.dev/guide/migration/) covers breaking changes.
    
-   [𝕏 TanStack and Vercel are teaming up](https://x.com/tan_stack/status/2094888852607652280) to make Vercel a 'first-class home' for [TanStack Start](https://tanstack.com/start/latest), with [a new deploy guide](https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel) as the starting point.
    
-   A draft [`@types/react` update for React 19.3](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/75429) offers a preview ([in this diff](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/75429/files)) of what's stabilizing, including [`browser()`](https://react.dev/reference/react-dom/browser), `ViewTransition`, and Fragment refs.
    
-   [Margelo is joining Callstack](https://margelo.com/blog/margelo-joins-callstack) in a deal valuing the Nitro Modules and VisionCamera creators at over €20m.
    

[_thank u, next_: Replacing Next.js with a Vibe-Coded 'Framework'](https://maxleiter.com/blog/thank-u-next "maxleiter.com") — An Anthropic engineer replaced Next.js on his personal site with a 'framework' Claude built in a few hours. Even if you dislike the premise, the before/after numbers, cost breakdown, downsides, and browser quirks it surfaced make it a neat writeup.

Max Leiter

🤖 [Agentic Coding: Bet on the Primitives](https://www.robinwieruch.de/agentic-coding-bet-on-primitives/) – Why agents able to 'hand roll' code can tip the balance from using big libraries towards simpler primitives. Recharts vs D3, for example. Robin Wieruch

📄 [How Shopify Raised Mobile End-to-End Test Stability to 98%](https://shopify.engineering/mobile-e2e-testing) – They rebuilt their React Native E2E suite to primarily use computer vision over `testID`s. Michael Garfinkle (Shopify)

🤖 [Testing Google's _Modern Web Guidance_ Skill Against a Real React App](https://alfy.blog/2026/07/25/modern-web-guidance.html) Ahmad Alfy

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/kxry6khewk7uzwkifsuo.jpg)](https://mantine.dev/changelog/9-6-0/)

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/vgrpnii6qehg4oqqlwy2.jpg)](https://react-aria.adobe.com/releases/v1-21-0)

-   [React Aria 1.21.0](https://react-aria.adobe.com/releases/v1-21-0) – Adobe's popular component suite adds a new `NavigationTree` component _(above)_ and `Menu` gets a big upgrade too.
    
-   [React Countdown Clock 3.0](https://github.com/pughpugh/react-countdown-clock/releases/tag/v3.0.0) – Canvas-based countdown component now rewritten for React 18 and 19 and using `requestAnimationFrame` for smoother rendering. [Live demo](https://pughpugh.github.io/react-countdown-clock/).
    
-   [Uppy 6.0](https://uppy.io/blog/uppy-6.0/) – Popular, powerful modular file uploader, with [React components](https://uppy.io/docs/react/) and [React Router](https://uppy.io/docs/reactrouter/) and [Next.js](https://uppy.io/docs/nextjs/) integrations.
    
-   [Storybook 10.6](https://github.com/storybookjs/storybook/releases/tag/v10.6.0) – The component workshop adds CLI bindings for agents to drive Storybook's tools and skills.
    
-   [React Native WebGPU 0.9](https://github.com/wcandillon/react-native-webgpu) – WebGPU implementation for React Native, now with a [hosted Expo template](https://github.com/wcandillon/react-native-webgpu/tree/main/apps/expo-webgpu) to get started.
    

📢  Elsewhere in the ecosystem

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/qhg5uwb2bt4l51pjidwq.jpg)](https://zod.dev/blog/zod-4-5)

-   [Zod 4.5 is here](https://zod.dev/blog/zod-4-5) with `z.compile()` for compiling schemas ahead of time, schemas that use 9x less memory, and a fast path for checking validity without a full parse. With how much React form and API code leans on Zod, it's worth investigating.
    
-   ⚠️ With supply chain worms hitting React-related packages recently, [Drydock](https://drydock.org/) may be useful for package authors: it diffs the tarball you're going to publish against the last published version, so you can spot nasties that slipped in.
    
-   Amid the excitement of [the Bun 1.4 release](https://bun.com/blog/bun-v1.4), you may have missed `build` and `Bun.build` now [have a built-in React compiler](https://bun.com/blog/bun-v1.4#built-in-react-compiler) and [`Bun.markdown.react()`](https://bun.com/blog/bun-v1.4#bun-markdown) offers a native way to convert Markdown into React elements.
    
-   [Native HTML and CSS Features That Replaced JavaScript](https://ronaldsvilcins.com/2026/08/30/native-html-and-css-features-that-replaced-javascript/) rounds up the accordions, dialogs, popovers and effects you may no longer need a component/dependency for.