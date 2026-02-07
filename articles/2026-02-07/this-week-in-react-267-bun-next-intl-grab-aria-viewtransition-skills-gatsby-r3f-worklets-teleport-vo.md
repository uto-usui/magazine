---
title: "This Week In React #267: Bun, Next-Intl, Grab, Aria, ViewTransition, Skills, Gatsby, R3f | Worklets, Teleport, Voltra, AI SDK, Screens, Tamagui, Xcode, Agent-Device | State of JS, Temporal, Babel, Astro, npmx"
source: "https://thisweekinreact.com/newsletter/267"
publishedDate: "2026-02-04"
category: "frontend"
feedName: "This Week In React"
---

Hi everyone!

You’ll have to get used to it: yet another week filled with AI content. From MCPs to Agent Skills to AI-specific CLIs, we don’t know where to turn anymore.

We’re delighted to be ranked once again among the [top 5 newsletters in the State of JavaScript 2025 survey](https://2025.stateofjs.com/en-US/resources/#newsletters). Thanks for your trust!

By the way, we’d love your feedback — what do you like about the newsletter, and how could we make it better in 2026?

Just hit reply and let us know! ❤️

As always, thanks for supporting us on your favorite platform:

-   🦋 [Bluesky](https://slo.im/last/b)
-   ✖️ [X / Twitter](https://slo.im/last/x)
-   👔 [LinkedIn](https://slo.im/last/l)
-   👽 [Reddit](https://slo.im/last/r)

**Don't miss the next email!**

![](https://thisweekinreact.com/emails/separators/christmas.png)

[![React Performance, v2](https://thisweekinreact.com/emails/issues/267/frontendmasters.jpg)](https://frontendmasters.com/courses/react-performance-v2/?utm_source=reactweekly&utm_medium=email&utm_campaign=reactperf)

**[React Performance, v2](https://frontendmasters.com/courses/react-performance-v2/?utm_source=reactweekly&utm_medium=email&utm_campaign=reactperf)**

Make React apps fast where it actually matters.

An advanced performance course from **Steve Kinney**, focused on diagnosing real bottlenecks and fixing slow, janky React apps using modern React 19 patterns.

-   🚀 **Modern React**: Suspense, transitions, deferred values, hydration, server actions
-   🔍 **Debug Faster**: Find unnecessary re-renders with React DevTools & the Profiler
-   🧠 **Smart Optimization**: Memoization, virtualization, code splitting, optimistic UI
-   ⚡ **Feel-Fast UX**: Learn how React Fiber prioritizes work to keep apps responsive

⏱ 4+ hours • ⭐ 4.8 rating

🏫 From **Frontend Masters**  
👉 Watch the course: [https://frontendmasters.com/courses/react-performance-v2/](https://frontendmasters.com/courses/react-performance-v2/?utm_source=reactweekly&utm_medium=email&utm_campaign=reactperf)

![](https://thisweekinreact.com/emails/separators/christmas.png)

## ⚛️ React[​](#react "Direct link to ⚛️ React")

-   💸 [PostHog - 8 learnings from 1 year of agents](https://go.posthog.com/twir-feb4)
-   👀 [React DOM PR - Support for `SubmitEvent.submitter`](https://github.com/facebook/react/pull/35590)
-   👀 React.dev PRs - Revamp docs of [useOptimistic](https://github.com/reactjs/react.dev/pull/8264), [useActionState](https://github.com/reactjs/react.dev/pull/8284), and [useEffectEvent](https://github.com/reactjs/react.dev/pull/8279).
-   📜 [React’s ViewTransition Element](https://frontendmasters.com/blog/reacts-viewtransition-element/) - Chris Coyier compares the pros and cons of using `<ViewTransition>` VS the native platform API `document.startViewTransition()` in a React app.
-   📜 [Why Inngest migrated off Next.js to TanStack Start - Reducing local dev time by 83%](https://www.inngest.com/blog/migrating-off-nextjs-tanstack-start) - Ingress was an early adopter of RSCs but got bitten by them, experienced slow local DX despite using Turbopack. They share their migration strategy and lessons learned.
-   📜 [Reverse-Engineering Figma Make: Extracting React Apps from Binary Files](https://albertsikkema.com/ai/development/tools/reverse-engineering/2026/01/23/reverse-engineering-figma-make-files.html) - Figma Make uses React, Radix UI, and Tailwind under the hood, and you can recreate the underlying React app from `.fig` files.
-   📜 [The engineering behind GitHub Copilot CLI’s animated ASCII banner](https://github.blog/engineering/from-pixels-to-characters-the-engineering-behind-github-copilot-clis-animated-ascii-banner/) - Rendering reliable animated components to the terminal UI looks complex, even if you leverage the React Ink renderer.
-   📜 [Can AI actually debug complex React/Next.js issues?](https://www.developerway.com/posts/debugging-with-ai) - Throwing 3 real-world bugs at Claude Opus, it could only fix one properly.
-   📜 [React design system library MCP](https://alexocallaghan.com/react-design-system-library-mcp) - How to leverage the experimental Storybook MCP server
-   💸 [Building AI Voice Agents at Scale — The executive playbook by ElevenLabs](https://r2trck.com/twir-4)
-   📦 [Next Intl 4.8 - Ahead-of-time compilation](https://next-intl.dev/blog/precompilation) - This can significantly reduce your bundle size. Instead of bundling a full ICU parser to the client, it’s now possible to precompile ICU messages to a minified AST interpreted by a lightweight runtime.
-   📦 [Bun 1.3.8 - `Bun.markdown` API](https://bun.com/blog/bun-v1.3.8) - Comes with a first-class `Bun.markdown.react()` API and claims to be much faster than React alternatives.
-   📦 [React Grab 1.0 - Select context for coding agents directly from the website](https://www.react-grab.com/blog/1-0) - A convenient tool can make your coding agent 3x faster thanks to more precise prompts.
-   📦 [shadcn/ui updates - RTL support, unified Radix UI Package](https://ui.shadcn.com/docs/changelog)
-   📦 [React Aria 1.15 - New `render` prop, Agent Skills, constrain dates on blur](https://react-aria.adobe.com/releases/v1-15-0.html)
-   📦 [Gatsby 5.16 - Add support for React 19 and Node 24](https://github.com/gatsbyjs/gatsby/releases/tag/gatsby%405.16.0)
-   📦 [Rspress 2.0 - Documentation framework - Theme styling, AI-native, Shiki highlighting, performance, new plugins](https://rspress.rs/blog/rspress-v2)
-   📦 [React Three Fiber 10.0 alpha - Backward compatible, WebGPU support, TSL hooks, new scheduler](https://github.com/pmndrs/react-three-fiber/releases/tag/v10.0.0-alpha.1)
-   📦 [Travels 1.0 - Fast, framework-agnostic undo/redo library with React integrations](https://github.com/mutativejs/travels/releases/tag/v1.0.0)
-   📦 [Prefill - Partial application for React components](https://www.xoid.dev/blog/introducing-prefill)
-   📦 [Meteor 3.4 - Rspack integration, 4x faster builds, 8x smaller bundles, and extended bundler features](https://blog.meteor.com/meteor-3-4-is-out-rspack-integration-4x-faster-builds-8x-smaller-bundles-and-extended-bundler-36600fb45976)
-   📦 [ESLint React 2.9 - Extract React RSC sub-plugin, new RSC preset](https://github.com/Rel1cx/eslint-react/releases/tag/v2.9.0)
-   📦 [Rsbuild Plugin React Router 0.1 - Behavior closer to React Router's official Vite plugin](https://github.com/rstackjs/rsbuild-plugin-react-router/blob/main/CHANGELOG.md#010)
-   🤖 [React Router Agent Skills](https://github.com/remix-run/agent-skills)
-   🤖 [React Composition Patterns Agent Skills](https://skills.sh/vercel-labs/agent-skills/vercel-composition-patterns)
-   🎥 [Toby Mey - Where to put Auth in Next.js 16?](https://www.youtube.com/watch?v=98PvcFL6DmE)
-   🎥 [Remotion - Create motion graphics with AI – Simple tutorial for beginners](https://www.youtube.com/watch?v=5NRAOnKc3c8)

**Don't miss the next email!**

![](https://thisweekinreact.com/emails/separators/christmas.png)

[![Still writing tests manually?](https://thisweekinreact.com/emails/issues/267/meticulous.jpg)](https://www.meticulous.ai/?utm_source=thisweekinreact&utm_medium=newsletter&utm_campaign=26q1&utm_content=2nd)

**[Still writing tests manually?](https://www.meticulous.ai/?utm_source=thisweekinreact&utm_medium=newsletter&utm_campaign=26q1&utm_content=2nd)**

Notion, Dropbox and LaunchDarkly have found a new testing paradigm - and they can't imagine working without it. Built by [ex-Palantir engineers](https://www.meticulous.ai/?utm_source=thisweekinreact&utm_medium=newsletter&utm_campaign=26q1&utm_content=2nd), Meticulous autonomously creates a continuously evolving suite of E2E UI tests that delivers [near-exhaustive coverage](https://www.meticulous.ai/?utm_source=thisweekinreact&utm_medium=newsletter&utm_campaign=26q1&utm_content=2nd) with _zero developer effort_ - impossible to deliver by any other means. 

It works like magic in the background:

-   Near-exhaustive coverage on every test run
-   No test creation
-   **No maintenance (seriously)**
-   Zero flakes (built on a deterministic browser)

**🤨** Curious? [Book in a time to learn more](https://www.meticulous.ai/?utm_source=thisweekinreact&utm_medium=newsletter&utm_campaign=26q1&utm_content=2nd)

![](https://thisweekinreact.com/emails/separators/christmas.png)

## 📱 React-Native[​](#react-native "Direct link to 📱 React-Native")

[![Behind the Scenes of React Native Multithreading: Vision Camera V5 x React Native Worklets](https://thisweekinreact.com/emails/issues/267/worklets.jpg)](https://blog.swmansion.com/behind-the-scenes-of-react-native-multithreading-vision-camera-v5-x-react-native-worklets-a102c37b32ae)

**[Behind the Scenes of React Native Multithreading: Vision Camera V5 x React Native Worklets](https://blog.swmansion.com/behind-the-scenes-of-react-native-multithreading-vision-camera-v5-x-react-native-worklets-a102c37b32ae)**

Worklets have been extracted from Reanimated to become a first-class multithreading primitive. It has been integrated into the upcoming VisionCamera V5, enabling its real-time frame processor system to run directly on the Camera Thread.

Also, take a look at 📦 [Worklets 0.8 - Bundle Mode preview](https://github.com/software-mansion/react-native-reanimated/releases/tag/worklets-0.8.0-bundle-mode-preview-1). It makes it possible to use third-party libraries and do network requests within worklets. This mode is opt-in but might become the default in the future.

![](https://thisweekinreact.com/emails/separators/christmas.png)

-   💸 [Stop searching for components manually - try the Element Inspector in Radon to build React Native apps faster.](https://radon.swmansion.com/?utm_source=TWIR2&utm_medium=link2)
-   📜 [Building Voltra: Renderer](https://www.chmal.it/blog/building-voltra-renderer) - The creator of the Widgets and Live Activities library explains how it works under the hood. It’s a custom renderer, but using `react-reconciler` wasn’t a great fit, so they took inspiration from React DOM SSR code instead.
-   📜 [5 tips to increase mobile app downloads and retention in 2026](https://expo.dev/blog/how-to-increase-mobile-app-downloads-and-retention)
-   📦 [Teleport 1.0 - Brings true native portals to React Native](https://kirillzyusko.github.io/react-native-teleport/blog/welcome) - The equivalent of `ReactDOM.createPortal` for mobile, with additional view re-parenting, re-use, and pre-rendering capabilities. It’s cross-platform and also supports web.
-   📦 [Screens 4.21 - Android stack screen preloading, iOS xcassets icon catalogs support for key navigation UI elements](https://github.com/software-mansion/react-native-screens/releases/tag/4.21.0) - Note that iOS xcassets icon catalogs are [already integrated into React Navigation for native tabs](https://github.com/react-navigation/react-navigation/commit/5904082ab3f09787ea8a3581837057d7fd0033d0).
-   📦 [Xcode 26.3 RC - Unlocks the power of agentic coding](https://www.apple.com/newsroom/2026/02/xcode-26-point-3-unlocks-the-power-of-agentic-coding) - If you don’t want to use Xcode as an IDE, you can still leverage the new Xcode MCP and its `RenderPreview` tool to feed your AI with visual feedback (SwiftUI previews, it probably doesn’t work with RN views).
-   📦 [Agent-Device - CLI to control iOS and Android devices for AI agents](https://github.com/callstackincubator/agent-device) - The equivalent of Vercel’s `agent-browser` for mobile. Support for TV/desktop apps planned.
-   📦 [AI SDK Profiler - New Rozenite DevTools plugin](https://www.callstack.com/blog/announcing-ai-sdk-profiler-for-react-native) - Lets you inspect OpenTelemetry spans coming from the RN AI SDK
-   📦 [AI SDK 0.12 - Profiler plugin, ai v6, tool calling and re-ranking for Llama models](https://github.com/callstackincubator/ai/releases/tag/v0.12.0)
-   📦 [Tamagui 2.0 RC - Universal style library for React - More stable, easy, documented, fast, and feature-complete](https://tamagui.dev/blog/version-two)
-   📦 [Uniwind 1.3 - Support data attributes](https://github.com/uni-stack/uniwind/releases/tag/v1.3.0)
-   📦 [Superconfig - 18x faster than react-native-config, using Nitro](https://github.com/riteshshukla04/react-native-superconfig)
-   🎥 [Callstack - Implementing an Android TurboModule from Scratch](https://www.youtube.com/watch?v=2Pes2Y11yWM)
-   🎥 [React Native Live - New monthly live show channel from Infinite Red](https://www.youtube.com/@reactnativelive)
-   🎥 [Beto - Are You Leaking Your Environment Variables? React Native + Expo](https://www.youtube.com/watch?v=XkxmtLozKoA)
-   🎥 [Simon Grimm - 10 Tips You Need For Expo Router in 2026!](https://www.youtube.com/watch?v=mzRgSxf5oRk)
-   🎙️ [RNR 352 - Expo Launch with Cedric van Putten](https://infinite.red/react-native-radio/rnr-352-expo-launch-with-cedric-van-putten)

![](https://thisweekinreact.com/emails/separators/christmas.png)

## 🔀 Other[​](#other "Direct link to 🔀 Other")

-   📊 [State of JavaScript 2025 - Survey Results](https://2025.stateofjs.com/en-US/) - React and Next.js keep growing in usage, but satisfaction is decreasing. Meanwhile, alternatives such as Astro and Solid have pretty high satisfaction scores.
-   📜 [Implementing the Temporal proposal in JavaScriptCore](https://blogs.igalia.com/compilers/2026/01/31/implementing-the-temporal-proposal-in-javascriptcore/) - The JS Temporal API should be in all browsers relatively soon, with Safari being the last remaining browser. The implementation for JSC (Safari, Bun) is complete but not merged yet.
-   📜 [Node.js Path Traversal: Prevention & Security Guide](https://nodejsdesignpatterns.com/blog/nodejs-path-traversal-security/) - Explains how to secure your Node app from unsafe path inputs, such as `http://localhost:port/images/../../etc/passwd`.
-   📜 [Building a browser API in one shot](https://nolanlawson.com/2026/01/31/building-a-browser-api-in-one-shot/) - With a good prompt created by an expert, Claude Opus can one-shot a decent TypeScript implementation of `IndexedDB`.
-   📦 [Astro 5.17 - Dev toolbar placement, partitioned cookie, async file loader parser](https://astro.build/blog/astro-5170/)
-   📦 [Turborepo 2.8 - Git worktree support, Agent skills, AI-enabled](https://turborepo.dev/blog/2-8)
-   📦 [Babel 7.29 - The last Babel 7 minor release](https://babeljs.io/blog/2026/01/31/7.29.0) - They are also announcing Babel 8 in RC, aiming to be easy to adopt, and ESM-only.
-   🔗 [npmx - A fast, modern browser for the npm registry](https://github.com/npmx-dev/npmx.dev)

![](https://thisweekinreact.com/emails/separators/christmas.png)

## 🤭 Fun[​](#fun "Direct link to 🤭 Fun")

[![alt](https://thisweekinreact.com/emails/issues/267/meme.jpg)](https://x.com/sebastienlorber/status/2000908572562219440)

[![alt](https://thisweekinreact.com/emails/issues/267/meme2.jpg)](https://x.com/sebastienlorber/status/2013971000250003693)

See ya! 👋