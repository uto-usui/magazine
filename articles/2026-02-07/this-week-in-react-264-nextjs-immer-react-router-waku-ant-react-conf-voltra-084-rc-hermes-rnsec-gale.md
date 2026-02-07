---
title: "This Week In React #264: Next.js, Immer, React Router, Waku, Ant, React Conf, | Voltra, 0.84 RC, Hermes, RNSec, Galeria, Nitro, Radon, Facetpack, Rock, Haptics | Chrome, Astro, Turborepo, Rspack, Rising Stars"
source: "https://thisweekinreact.com/newsletter/264"
publishedDate: "2026-01-14"
category: "frontend"
feedName: "This Week In React"
---

Hi everyone! Kacper and Filip from [Software Mansion](https://swmansion.com/) here! 👋

It's not too late—we're finally back from our Christmas break, and the entire newsletter team wishes you a happy New Year!

The winter break brought a lot of great articles from the community. While for some, early January is a time for reflection, summaries, and reviews of 2025, others can’t stop shipping.

In the React space, we have a new version of Next.js 16.1, security fixes for React Router, and the announcement of Waku 1.0 alpha.

As for React Native, we have the release of Voltra, a new way to create Live Activities & Widgets, and a sneak peek of React Native 0.84 with Hermes v1 enabled by default.

As always, thanks for supporting us on your favorite platform:

-   🦋 [Bluesky](https://slo.im/last/b)
-   ✖️ [X / Twitter](https://slo.im/last/x)
-   👔 [LinkedIn](https://slo.im/last/l)
-   👽 [Reddit](https://slo.im/last/r)

**Don't miss the next email!**

![](https://thisweekinreact.com/emails/separators/christmas.png)

[![Cut Code Review Time & Bugs in Half](https://thisweekinreact.com/emails/issues/264/codereview.jpg)](https://coderabbit.link/F8zN5Km)

**[Cut Code Review Time & Bugs in Half](https://coderabbit.link/F8zN5Km)**

Code reviews are critical but time-consuming. CodeRabbit acts as your AI co-pilot, providing instant Code review comments and potential impacts of every pull request. 

Beyond just flagging issues, CodeRabbit provides one-click fix suggestions and lets you define custom code quality rules using AST Grep patterns, catching subtle issues that traditional static analysis tools might miss.

CodeRabbit has so far reviewed more than 10 million PRs, installed on 2 million repositories, and used by 100 thousand Open-source projects. CodeRabbit is free for all open-source repo's.

[**Get Started Today**](https://coderabbit.link/F8zN5Km)

![](https://thisweekinreact.com/emails/separators/christmas.png)

## ⚛️ React[​](#react "Direct link to ⚛️ React")

-   💸 [Product for Engineers - Your product ideas probably suck (that's ok)](https://go.posthog.com/twir-jan14)
-   📜 [How to Steal Any React Component](https://fant.io/react/): An interactive article that shows it’s possible to extract React Fiber information and feed it to an LLM to reconstruct almost any React component.
-   📜 [Building Type-Safe Compound Components](https://tkdodo.eu/blog/building-type-safe-compound-components): A convenient API for grouping dialogs, modals, and selects, but it’s not the easiest to ensure their type safety. Dominik suggests using the so-called Component Factory Pattern to provide strong type guarantees.
-   📜 [Experimenting with Bun: From Idea to Production in a Week](https://www.tbeeren.com/post/experimenting-with-bun-from-idea-to-production-in-a-week): A successful case study of swapping Node.js for Bun to run React SSR workloads.
-   📜 [Using React Transitions for low-priority text editor updates](https://handlewithcare.dev/blog/transition_low_priority_editor_updates/): This interactive article shows how to leverage `useDeferredValue` to render the editor preview with a lower priority to keep the main editor responsive.
-   📜 [Sharing data with Client Components](https://next-16-recipes.vercel.app/sharing-data-with-client-components): RSCs can’t use Context directly. Instead, they can pass data (such as the current user) to Client Components that can later expose it as Context. Passing a promise does not block the navigation and improves performance.
-   📜 [Understanding useEffectEvent](https://peterkellner.net/2026/01/09/understanding-react-useeffectevent-vs-useeffect/): How `useEffectEvent` solves `useEffect` stale closure problem.
-   📜 [I used a generator to build a replenishable queue](https://macarthur.me/posts/queue/): Building a file upload UX with `useSyncExternalStore`.
-   📜 [How Good Is AI at Coding React (Really)?](https://addyo.substack.com/p/how-good-is-ai-at-coding-react-really)
-   📜 [Comprehensive introduction to measuring and improving React app performance](https://www.debugbear.com/blog/measuring-react-app-performance)
-   📜 [How to write good frontend tests: 37 tips and tricks](https://howtotestfrontend.com/resources/how-to-write-good-frontend-tests)
-   💸 [Building AI Voice Agents at Scale — The executive playbook by ElevenLabs](https://r2trck.com/twir-4)
-   📦 [Next.js 16.1 - Filesystem cache for `next dev`, bundle analyzer, improved debugging](https://nextjs.org/blog/next-16-1)
-   📦 [Immer 11.1 - Performance improvements](https://github.com/immerjs/immer/releases/tag/v11.1.0)
-   📦 [React Router 7.12 - Security fixes](https://reactrouter.com/changelog#v7120)
-   📦 [Waku 1.0 alpha - Stable API surface](https://waku.gg/blog/waku-v1-alpha)
-   📦 [Ant Design 6.2](https://github.com/ant-design/ant-design/releases/tag/6.2.0)
-   🎥 [React Conf 2025 - All the talks and interviews are now online](https://conf.react.dev/)
-   🎥 [Theo - I moved off of Next.js (to TanStack Start)](https://www.youtube.com/watch?v=Sc5ca-VJdxY)
-   🎥 [Cosden Solutions - The Better Way to Use React Query](https://www.youtube.com/watch?v=e2OC3aaiGhI)
-   🎙️ [Meta Tech Podcast 82 - CSS at Scale with StyleX](https://insidefacebookmobile.libsyn.com/82-css-at-scale-with-stylex)

**Don't miss the next email!**

![](https://thisweekinreact.com/emails/separators/christmas.png)

[![React Performance, v2](https://thisweekinreact.com/emails/issues/264/react_performance.jpg)](https://frontendmasters.com/courses/react-performance-v2/?utm_source=reactweekly&utm_medium=email&utm_campaign=reactperf)

**[React Performance, v2](https://frontendmasters.com/courses/react-performance-v2/?utm_source=reactweekly&utm_medium=email&utm_campaign=reactperf)**

Make React apps fast where it actually matters.

An advanced performance course from **Steve Kinney**, focused on diagnosing real bottlenecks and fixing slow, janky React apps using modern React 19 patterns.

🚀 **Modern React**: Suspense, transitions, deferred values, hydration, server actions  
🔍 **Debug Faster**: Find unnecessary re-renders with React DevTools & the Profiler  
🧠 **Smart Optimization**: Memoization, virtualization, code splitting, optimistic UI  
⚡ **Feel-Fast UX**: Learn how React Fiber prioritizes work to keep apps responsive

⏱ 4+ hours • ⭐ 4.8 rating  
🏫 From **Frontend Masters**

👉 Watch the course: [https://frontendmasters.com/courses/react-performance-v2/](https://frontendmasters.com/courses/react-performance-v2/?utm_source=reactweekly&utm_medium=email&utm_campaign=reactperf)

![](https://thisweekinreact.com/emails/separators/christmas.png)

## 📱 React-Native[​](#react-native "Direct link to 📱 React-Native")

[![Voltra](https://thisweekinreact.com/emails/issues/264/voltra.jpg)](https://www.callstack.com/blog/live-activities-and-widgets-with-react-say-hello-to-voltra)

[**Voltra 1.0 - Live Activities & Widgets with JSX in React Native**](https://www.callstack.com/blog/live-activities-and-widgets-with-react-say-hello-to-voltra)

Voltra is a new library that allows React Native devs to compose Live Activities and Widgets using SwiftUI primitives in just JSX, without having to write native code.

While previous community attempts, such as [expo-apple-targets](https://github.com/EvanBacon/expo-apple-targets) or [expo-live-activity](https://github.com/software-mansion-labs/expo-live-activity), either supported a limited set of possible layouts or required knowledge of Swift, Voltra overcomes these limitations.

Note that Expo is also working on their own [solution for Widgets & Live Activities](https://x.com/k7grzywacz/status/2000980494998175934) coming in Expo SDK 55.

![](https://thisweekinreact.com/emails/separators/christmas.png)

-   💸 [Radon PRO - turn your code editor into an integrated experience. Try it out and enjoy the best way to build React Native apps.](https://radon.swmansion.com/?utm_source=TWIR1)
-   👀 [Hermes V1 enabled by default starting from React Native 0.84](https://github.com/reactwg/react-native-releases/issues/1202): A faster Hermes JS-engine added as experimental in RN 0.82 will be the standard in the next stable RN release.
-   📜 [Expo - Cutout camera effects in React Native with Expo Camera and MaskedView](https://expo.dev/blog/cutout-camera-effects-in-react-native-with-expo-camera-and-maskedview): Explanation on how to make parts of UI see-through to the camera feed behind them. This creates the illusion that the phone is transparent.
-   📜 [TikTok-style video feed in React Native](https://www.mux.com/blog/slop-social): Tips on building a well-optimized short-form vertical video feed using FlashList, directional preloading (5 videos ahead, 1 behind), and aggressive video pausing.
-   📜 [Animating SFSymbol Icons in the native iOS tab bar](https://davey.bearblog.dev/animating-sfsymbol-icons-in-the-native-ios-tab-bar/): The author describes a workaround for animating icons in the native bottom tabs navigator. He had to traverse the native view hierarchy to apply the effect to the base `UIImageView`.
-   📜 [How to compile JavaScript to C with Static Hermes](https://devongovett.me/blog/static-hermes.html): It looks like Hermes has valid use cases outside of the React Native world. The creator of Parcel was able to compile the Less.js CSS preprocessor into a C library that he can call from Rust.
-   📜 [Callstack - React Native Wrapped 2025: A Month-by-Month Recap of The Year](https://www.callstack.com/blog/react-native-wrapped-2025-a-month-by-month-recap-of-the-year)
-   📜 [Infinite Red - React Native Wrapped 2025: The Year We Entered Our Polishing Era](https://shift.infinite.red/react-native-wrapped-2025-the-year-we-entered-our-polishing-era-79c6a3e5b4b7)
-   📜 [Software Mansion - React Native in 2026: Trends & Predictions](https://blog.swmansion.com/react-native-in-2026-trends-our-predictions-463a837420c7)
-   📦 [RNSEC - Security Scanner for React Native](https://www.rnsec.dev/): a CLI that scans RN & Expo apps for security vulnerabilities & hardcoded secrets
-   📦 [Facetpack](https://github.com/ecrindigital/facetpack): Promising 36x faster Metro transforms for React Native using OXC in place of Babel
-   📦 [Tickle - AHAP-style haptics for React Native](https://github.com/Renegades-Studio/react-native-tickle): Supports transient & continuous haptics. Callable from UI Thread.
-   📦 [React Native 0.84 RC.0](https://github.com/facebook/react-native/releases/tag/v0.84.0-rc.0): Updates to React 19.2.3, lots of accessibility improvements, added `onKeyDown`/`onKeyUp` events
-   📦 [Galeria 2.0 - New transition style, corner radius interpolation, page indicators, blur overlay](https://github.com/nandorojo/galeria/releases/tag/v2.0.0)
-   📦 [Nitro 0.33 - `HybridViews` recycling and `UIView` subclasses support](https://github.com/mrousavy/nitro/releases/tag/v0.33.0)
-   📦 [Radon 1.15 - Run Maestro tests directly in Radon](https://radon.swmansion.com/docs/getting-started/changelog#1.15.x)
-   📦 [Sonner Native 0.23 - Toast library - Added `positionStyle` prop](https://github.com/gunnartorfis/sonner-native/releases/tag/v0.23.0)
-   📦 [Rock 0.12 - Brownfield-ready modular toolkit - Support for RN 0.83 & 0.82](https://github.com/callstackincubator/rock/releases/tag/v0.12.0)
-   🎥 [Simon Grimm - Choosing the Right React Native Stack in 2026](https://www.youtube.com/watch?v=LZFEr9QDIVg)
-   🎥 [Building v0 iOS and Fixing React Native Along the Way](https://www.youtube.com/watch?v=rhLBFKlEXPM)
-   🎙️[RNR 350 - React Native Wrapped 2025](https://infinite.red/react-native-radio/rnr-350-react-native-wrapped-2025)

![](https://thisweekinreact.com/emails/separators/christmas.png)

## 🔀 Other[​](#other "Direct link to 🔀 Other")

-   📊 [2025 JavaScript Rising Stars](http://risingstars.js.org/2025/en)
-   📖 [The Concise TypeScript Book](https://github.com/gibbok/typescript-book) - an interesting alternative to the official TypeScript documentation.
-   📜 [Logging Sucks](https://loggingsucks.com/) - an opinion piece about good logging practices in the age of distributed systems.
-   📜 [require(esm) in Node.js: from experiment to stability](https://joyeecheung.github.io/blog/2025/12/30/require-esm-in-node-js-from-experiment-to-stability/) - Deep dive into challenges of bringing require(esm) into a stable version of Node.js.
-   📜 [Signals vs Query-Based Compilers](https://marvinh.dev/blog/signals-vs-query-based-compilers/) - A comparison of 2 different approaches to building incremental systems.
-   📜 [NPM to implement staged publishing](https://socket.dev/blog/npm-to-implement-staged-publishing) - The future plans for protecting against supply chain attacks.
-   📦 [Chrome 144](https://developer.chrome.com/blog/new-in-chrome-144?hl=en) - New `<geolocation>` element, Temporal API, and devtools improvements.
-   📦 [Astro 6 beta - Redesigned dev server experience](https://astro.build/blog/astro-6-beta/)
-   📦 [Turborepo 2.7 - DevTools, composable config](https://turborepo.dev/blog/turbo-2-7)
-   📦 [Rspack 1.7 - Final version before v2](https://rspack.rs/blog/announcing-1-7)

![](https://thisweekinreact.com/emails/separators/christmas.png)

## 🤭 Fun[​](#fun "Direct link to 🤭 Fun")

[![alt](https://thisweekinreact.com/emails/issues/264/meme.jpg)](https://x.com/sebastienlorber/status/1975502820393820260)

See ya! 👋