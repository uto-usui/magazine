---
title: "TanStack Start is finally stable"
source: "https://react.statuscode.com/issues/494"
publishedDate: "2026-10-23"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/ejihjkazanj4b02abevr.jpg)](https://tanstack.com/blog/tanstack-start-1-0)

TanStack Start Reaches 1.0

After a year as a release candidate, [TanStack Start 1.0 is officially stable](https://tanstack.com/blog/tanstack-start-1-0). Tanner Linsley explains how it grew out of _TanStack Router_, and is candid about RSC, which felt like _"this box we had to check to be taken seriously as a React framework"_, and which [tanstack.com](https://tanstack.com/) itself no longer uses. Plus:

-   📊 [The same app in Start and Next.js 16.4, benchmarked](https://www.fabwaseem.com/blog/tanstack-start-vs-nextjs) – _Start_ handled 2.9x-8.6x more dynamic requests and built ~1.7x faster with type-checking included.
    
-   🚚 Moving over? There are official guides for [migrating from Next.js](https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js) and [from the RC](https://tanstack.com/start/latest/docs/framework/react/migrate-from-release-candidate). Sarthak Mishra [moved his site over from Astro](https://sarthakmishra.com/blog/astro-to-tanstack-start) (and explains why) and Lovable offers older projects a migration option ([here's how one went](https://sesam.hu/post/down-the-rabbit-hole-tanstack-start-migration)).
    
-   💬 Ryan Carniato called it [_"a React metaframework with an architecture I can get behind"_](https://bsky.app/profile/ryansolid.bsky.social/post/3mxrordjou22l), while in [the r/reactjs thread](https://www.reddit.com/r/reactjs/comments/1x52hc9/tanstack_start_10_is_finally_stable/) Tanner explained why '1.0' is listed as `1.169` on npm.
    

* * *

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/927c2926.png)](https://master.dev/courses/typescript-ai/?utm_source=email&utm_medium=reactstatus&utm_content=typescriptcooper)

[TypeScript in the Age of AI](https://master.dev/courses/typescript-ai/?utm_source=email&utm_medium=reactstatus&utm_content=typescriptcooper "master.dev") — Knowing TypeScript deeply is how you get better code out of AI. Adam Rackis of Spotify shows you how to steer AI toward simpler, correct types and catch the mistakes it slips in.

Master.dev

**IN BRIEF:**

-   ⚠️ Last week, [Next.js patched two critical RCEs](https://nextjs.org/blog/nextjs-security-update-october-14-2026), one rooted in React Server Components, and [a public PoC](https://hash-sec.com/blog/the-use-cache-rce-how-a-typed-array-bug-in-nextjs-became-remote-code-execution) is now out. Update Next.js to 16.4.1 or 15.5.28; for other RSC setups, update the `react-server-dom-*` packages to 19.3.1 (or 19.2.9/19.1.10/19.0.9).
    
-   [React DevTools for agents now has official docs](https://react.dev/reference/dev-tools/react-devtools-cdt-mcp), covering how it exposes profiling and component data to coding agents through Chrome DevTools MCP.
    
-   📱 [Expo SDK 58](https://expo.dev/changelog/sdk-58) is out, using the new [React Native 0.88](https://reactnative.dev/blog/2026/10/19/react-native-0.88), targeting iOS 27 and ready for the iPhone Duo on day one.
    
-   [React Native for Web has active maintainers again](https://github.com/necolas/react-native-web/discussions/2872) and is moving to the React Foundation's GitHub org.
    
-   [TypeScript 7.1 is now in beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/), adding a programmatic API and more speed. Type-checking MUI's docs is 1.9x faster and uses half the memory.
    

[Dead Code Shouldn't Exist](https://tkdodo.eu/blog/dead-code-shouldnt-exist "tkdodo.eu") — The slides and transcript from a popular talk Dominik has given at several conferences this year on how Sentry removed 28K lines of unused code with [Knip](https://knip.dev/).

Dominik Dorfmeister

🤖 [Testing AI-Generated Code: Lint the Pattern, Test the Decision](https://www.robinwieruch.de/testing-ai-generated-code/) – Structural lint rules and shared harnesses beat a test beside every component. Robin Wieruch

📱 [Apple Didn't Invent the Foldable. It Might Make You Support One.](https://shift.infinite.red/apple-didnt-invent-the-foldable-it-might-make-you-support-one-7a00c142e77d) – Getting a React Native app ready for the iPhone Duo's three compatibility tiers. Sean Barker (Infinite Red)

📄 [Loading a 9MB WebAssembly Module Earlier Made Recraft's Editor 17% Faster](https://bra31k.dev/en/blog/same-bytes-17-percent-faster) – Suspending components left the module's download waiting its turn in the React tree. Sergey Patrakeev (Recraft)

🛠  Code, Tools & Libraries

[![Pixel demo: graphical React apps running in a terminal](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/nishfkuexsqapfi2rcgp.jpg)](https://pixelgui.com/)

[Pixel: Build Graphical Applications in the Terminal](https://pixelgui.com/ "pixelgui.com") — Like _Ink_, but with "pixel perfect" graphics. It's a React renderer that draws rounded corners, gradients and proper fonts in terminals that support the Kitty graphics protocol, and that can even embed Chromium WebViews to run web apps in a pane(!)

Rob Pruzan (Zenbu Labs)

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1792586346/br715i8krli31hn0g9bi.png)](https://www.env.style/)

[Tamagui 3: One React UI Codebase for Web and Native](https://tamagui.dev/blog/version-three "tamagui.dev") — A styling system and UI kit for sharing one codebase between React web apps and React Native. v3 adds an opt-in (beta) C++ native runtime that applies theme changes without re-rendering, plus React Strict DOM and Tailwind-style syntax.

Nate Wienert

-   [Hydrogen 2026.10](https://shopify.dev/changelog/blog/hydrogen-2026-10-is-now-available) – Shopify's commerce toolkit is now a library you can drop into existing Next.js or React Router apps.
    
-   [Morphicons 2.0](https://github.com/guillermolg00/morphicons/releases/tag/v2.0.0) – Spring-physics morphing between SVG icons. Now filled icons morph too, not just stroked ones. [See it in action on its homepage](https://www.morphicons.com/).
    
-   [Unistyles 3.6](https://github.com/jpudysz/react-native-unistyles/releases/tag/v3.6.0) – High-performance React Native styling library. Now with an experimental zero-config Metro integration instead of the Babel plugin.
    
-   [Motion 14.6](https://motion.dev/changelog) – Adds keyboard grab-and-move to `Reorder` lists, plus `stepFrames` for deterministic animation testing.
    

🎶  And finally… make a little noise

[![Strudel Flow: a musical pad connected to voice and filter nodes](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/dtm0yamwanrjkzjtlgke.jpg)](https://xyflow.com/strudel-flow)

Fancy making a little music with React? [Strudel Flow 2](https://xyflow.com/strudel-flow) is an open source React app built with [React Flow](https://reactflow.dev/) and `shadcn/ui`. Connect instruments and effects to generate [Strudel](https://strudel.cc/) code, or load a community patch and start turning knobs.

The [source code](https://github.com/xyflow/strudel-flow) offers a neat extension point: define an instrument or effect in a small `.node.ts` file, then supply a React component for a custom interface. As [the team says](https://xyflow.com/blog/strudel-flow-version-2), _"coding is a fun thing to do for its own sake."_ 🤘