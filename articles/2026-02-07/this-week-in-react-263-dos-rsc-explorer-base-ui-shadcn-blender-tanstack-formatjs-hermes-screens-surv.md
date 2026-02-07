---
title: "This Week In React #263: DoS, RSC Explorer, Base UI, shadcn, Blender, TanStack, Format.js | Hermes, Screens, Survey, React Navigation, ZoomGrid, Radon, TrueSheet, PagerView, Nitro | Node.js, TypeScript, Safari, State of HTML"
source: "https://thisweekinreact.com/newsletter/263"
publishedDate: "2025-12-17"
category: "frontend"
feedName: "This Week In React"
---

Hi everyone! Filip and Krzysztof from [Software Mansion](https://swmansion.com/) here! 👋

It’s been another challenging week for the React ecosystem. Developers worldwide have been rushing to update their React versions to patch two new vulnerabilities. This serves as a good reminder for all of us to prioritize security during testing.

Fortunately, React Native remains mostly unaffected by these threats, as Server Components aren’t yet widely used in the mobile environment.

We are taking a well-deserved Christmas break 🎄 so this will be our last issue until January 14th.  
Merry Christmas and a Happy New Year to everyone! Thank you for reading our newsletter throughout the year. See you in 2026! 👋

As always, thanks for supporting us on your favorite platform:

-   🦋 [Bluesky](https://slo.im/last/b)
-   ✖️ [X / Twitter](https://slo.im/last/x)
-   👔 [LinkedIn](https://slo.im/last/l)
-   👽 [Reddit](https://slo.im/last/r)

**Don't miss the next email!**

![](https://thisweekinreact.com/emails/separators/christmas.png)

[![Internationalizing your Next.js app in 2026](https://thisweekinreact.com/emails/issues/263/crowdin.jpg)](https://learn.next-intl.dev/?discountCode=TWIRCZMG)

**[Internationalizing your Next.js app in 2026](https://learn.next-intl.dev/?discountCode=TWIRCZMG)**

Next.js 16 just landed — and with the new year around the corner, it’s the perfect time to take the pain out of your i18n setup and turn it into your competitive advantage. In [learn.next-intl.dev](https://learn.next-intl.dev/?discountCode=TWIR5W97), you’ll learn all the practical patterns you can apply immediately:

-   🌍 **I18n ≠ translations**: Understand the pieces that make a truly localized experience
-   **🏗️ Architecture that scales:** Routing, locales, time zones & currencies done right
-   **⚙️ The full picture**: Backend, CMS, SEO, dev tooling, AI translations & more

Enjoy [30% off](https://learn.next-intl.dev/?discountCode=TWIR5W97) for the holidays!

![](https://thisweekinreact.com/emails/separators/christmas.png)

## ⚛️ React[​](#react "Direct link to ⚛️ React")

![React DoS CVE](https://thisweekinreact.com/emails/issues/263/reactcve.jpg)

[**Denial of Service and Source Code Exposure in React Server Components**](https://react.dev/blog/2025/12/11/denial-of-service-and-source-code-exposure-in-react-server-components)

Another week, another set of React vulnerabilities - it’s a tough time for the React ecosystem. While these issues are less severe than the last one (allowing Remote Code Execution), they are still serious, and it’s recommended to upgrade React 19 again. Both are related to RSC and Server Actions.

The first ([CVE-2025-55184](https://www.cve.org/CVERecord?id=CVE-2025-55184)) is a denial-of-service flaw. Attackers can crash your server by sending a payload with a cyclical reference in the React Flight Protocol. This causes React to loop indefinitely until the server times out. The second vulnerability ([CVE-2025-55183](https://www.cve.org/CVERecord?id=CVE-2025-55183)) involves code exposure due to a lack of user input validation. Under certain conditions, this can lead to the source code of your implementation being leaked.

The maintainers reacted quite fast, and we have received several patch releases: [React 19.2.3](https://github.com/facebook/react/releases/tag/v19.2.3), [Next.js 16.0.10](https://github.com/vercel/next.js/releases/tag/v16.0.10), [Vercel/SWR 2.3.8](https://github.com/vercel/swr/releases/tag/v2.3.8)

More resources about the recent React vulnerabilities here:

-   📜 [Next.js Security Update](https://nextjs.org/blog/security-update-2025-12-11) - The necessary steps to secure your Next.js app against all the recent vulnerabilities.
-   🎥 [Ankita Kulkarni - 2 More React Security Issues](https://www.youtube.com/watch?v=yM2-UiuuHU0)
-   🎥 [Shruti Kapoor - React RCE Attack Explained - Critical Vulnerability CVSS 10.0](https://www.youtube.com/watch?v=bAC3eG0cFAs)
-   🎥 [Theo - The latest React vulnerabilities explained](https://www.youtube.com/watch?v=6kZPt-AELVk)
-   🎥 [Wes Bos - I’m gonna crash out (react2shell vulnerability)](https://www.youtube.com/watch?v=kmlMNtjFgoY)
-   🎙️ [PodRocket - React got hacked with David Mytton](https://podrocket.logrocket.com/react2shell-javascript-security-wake-up-call-david-mytton)

![](https://thisweekinreact.com/emails/separators/christmas.png)

![RSC Explorer](https://thisweekinreact.com/emails/issues/263/rscexplorer.jpg)

[**React Server Components Explorer**](https://overreacted.io/introducing-rsc-explorer/)

If recent security headlines had a silver lining, it’s the renewed interest in how React Server Components actually work under the hood. And Dan Abramov showed up just in time with [RSC Explorer](https://tangled.org/danabra.mov/rscexplorer), an interactive tool to help you visualize the wire format and master the mental model.

![](https://thisweekinreact.com/emails/separators/christmas.png)

![Base UI](https://thisweekinreact.com/emails/issues/263/baseui.jpg)

[**Base UI**](https://base-ui.com/)

Where components are rendered is not the only thing that should receive attention this week, as [Base UI 1.0](https://base-ui.com/) is now stable, marking the official release of the unstyled primitives developed by the original creators of Radix UI, Floating UI and MUI. It’s a significant addition to the "headless" ecosystem, offering a refined alternative to Radix UI or React Aria. All the shadcn/ui components have already been rebuilt to support Base UI ([tweet](https://x.com/shadcn/status/1999530415653113871)).

![](https://thisweekinreact.com/emails/separators/christmas.png)

-   💸 [Next.js 16 Route Handlers Explained: 3 Advanced Use Cases](https://strapi.io/blog/nextjs-16-route-handlers-explained-3-advanced-usecases?utm_campaign=19282052-Newsletter%20Sponsorships&utm_source=React&utm_medium=react-link)
-   🔐 [Storybook Security Advisory - CVE-2025-68429](https://storybook.js.org/blog/security-advisory/): Another security issue 😅 This time `.env` variables can inadvertently be exposed when publishing your Storybook v7+ to the web.
-   📖 Brand new [React Aria documentation](https://react-aria.adobe.com/getting-started) with interactive examples.
-   📜 [Intro to performance of React Server Components](https://calendar.perfplanet.com/2025/intro-to-performance-of-react-server-components/) - A deep and fair analysis of how RSC can improve page load time by shifting data fetching and rendering to the server, while also not keeping silent about the architectural trade-offs.
-   📜 [How AI Coding Agents Hid a Timebomb in Our App](https://acusti.ca/blog/2025/12/09/how-ai-coding-agents-hid-a-timebomb-in-our-app/) - Fun story where an infinite recursion bug was not immediately visible because it happened in the background due to leveraging the new `<Activity>` component.
-   📜 [React Compiler’s Silent Failures (And How to Fix Them)](https://acusti.ca/blog/2025/12/16/react-compiler-silent-failures-and-how-to-fix-them/) - When the Compiler can’t compile a component, it fails silently. The author discovered a secret ESLint rule `react-hooks/todo` that permits to fail-fast on patterns the Compiler doesn’t support yet.
-   📜 [Driving 3D scenes in Blender with React](https://romanliutikov.com/blog/driving-3d-scenes-in-blender-with-react) - A custom React reconcilier translates React operations into Python commands to communicate with the Blender API.
-   💸 [React Certification – Junior, Mid, and Senior level certification. Exam only or full prep bundle with trial exam & labs. Choose your path.](https://certificates.dev/react?friend=TWIR)
-   📦 [shadcn 3.6 - `npx shadcn create`](https://ui.shadcn.com/docs/changelog) - With this new CLI, you can now create your own customized `shadcn` component library, using either Radix UI or Base UI. [Theo also released a video about this](https://www.youtube.com/watch?v=aKPaxQJs-30) if you want to learn more about what has changed.
-   📦 [TanStack Start 1.141 - Vue Start](https://github.com/TanStack/router/pull/6055): After React and Solid, TanStack Start adds support for Vue. TanStack Start really is a… framework-agnostic meta-framework? 🤪
-   📦 [React Router 7.11 - `vite preview` support, stabilize `onError` API, new `unstable_defaultShouldRevalidate` opt-out API](https://github.com/remix-run/react-router/blob/main/CHANGELOG.md#v7110)
-   📦 [Format.JS for React - Multiple releases, breaking changes and a conversion to ESM](https://github.com/formatjs/formatjs/releases/tag/react-intl%408.0.0)
-   📦 [Recharts 3.6 - New `BarStack` component, support for ranged stacked `BarChart`](https://github.com/recharts/recharts/releases/tag/v3.6.0)
-   📦 [React Grid Layout 2.1 - Support for large-scale layouts and custom constraints](https://github.com/react-grid-layout/react-grid-layout/releases/tag/2.1.0) - you can test it in the [interactive docs’ showcase](https://react-grid-layout.github.io/react-grid-layout/examples/21-custom-constraints.html).
-   📦 [Slot JSX - Custom JSX pragma for powering asChild or render function prop patterns](https://github.com/jjenzz/slot-jsx-pragma)
-   🎙️ [PodRocket - TanStack, TanStack Start, and what’s coming next with Tanner Linsley](https://podrocket.logrocket.com/tanstack-tanstack-start-and-whats-coming-next-with-tanner-linsley)

**Don't miss the next email!**

![](https://thisweekinreact.com/emails/separators/christmas.png)

[![When your app become a floating window  - RN in VR ](https://thisweekinreact.com/emails/issues/263/callstack.jpg)](https://www.callstack.com/blog/mobile-vs-vr-key-differences-in-features-ui-and-ux?utm_campaign=meta&utm_source=twir&utm_medium=email&utm_content=sponsorship)

**[When your app become a floating window - RN in VR](https://www.callstack.com/blog/mobile-vs-vr-key-differences-in-features-ui-and-ux?utm_campaign=meta&utm_source=twir&utm_medium=email&utm_content=sponsorship)**

**VR pushes React Native developers to think more like adaptive-layout designers.** Instead of working with fixed viewports and predictable screen sizes, you’re designing for flexible windows that users can move, resize, and interact with in new ways. In this article, **Jan Jaworski from Callstack** breaks down how to bring mobile experience patterns into VR safely: where they map well and where you’ll need to rethink typography, spacing, accessibility, and interaction models.

If you want to build for Meta Quest with confidence, explore this [step-by-step React Native VR series](https://www.callstack.com/insights/vr-development?utm_campaign=meta&utm_source=twir&utm_medium=email&utm_content=sponsorship):

-   Get Started With Expo on Meta Quest
-   Use Expo Libraries on Horizon OS: A Guide to Compatibility
-   How to Release a React Native App on the Meta Horizon Store

_…and more._

![](https://thisweekinreact.com/emails/separators/christmas.png)

## 📱 React-Native[​](#react-native "Direct link to 📱 React-Native")

![State of React Native](https://thisweekinreact.com/emails/issues/263/stateofrn.png)

[**State of React Native**](https://survey.2025.stateofreactnative.com/?utm_source=thisweekinreact)

The State of React Native survey is back and ready to accept your responses!  
It has been slimmed down to avoid overlap the State of React survey, focusing more on the React Native side of things. Please answer and help the core maintainers and library authors understand what they should focus on next year! 🙏

![](https://thisweekinreact.com/emails/separators/christmas.png)

-   💸 [PostHog - Track errors and resolve issues with error tracking for React Native. Get your first 100k exceptions free every month.](https://go.posthog.com/twir-dec17)
-   👀 [React-Navigation 8.0 docs PR](https://github.com/react-navigation/react-navigation.github.io/pull/1451): We heard v8 alpha is dropping very soon! It should come with better TypeScript types, native Bottom Tabs by default, access to the params of parent screens, a new `pushParams()` API, and more.
-   👀 [React Native RFC - iOS Migration to SceneDelegate](https://github.com/react-native-community/discussions-and-proposals/pull/967) - A plan to adopt iOS UIScene lifecycle APIs instead of using AppDelegate.
-   🐦 [Sneak peek of Live Activities and Widgets in Expo UI, coming with SDK 55](https://x.com/k7grzywacz/status/2000980494998175934?s=20)
-   📜 [Official Hermes team blog](https://github.com/facebook/hermes/blob/static_h/doc/blog/README.md) - The Hermes team decided to collect articles about Hermes published on X over the last few years into a structured GitHub repository. There, you can find interesting insights into Hermes internals and JSI. The most recent one is Tzvetan Mikov [explaining how JSI extensions make it easier to contribute to the Hermes engine](https://github.com/facebook/hermes/blob/static_h/doc/blog/2025-12-12-new-way-to-contribute.md).
-   📜 [How to implement iOS widgets in Expo apps](https://expo.dev/blog/how-to-implement-ios-widgets-in-expo-apps) - A case study on using Swift UI Widgets with Expo, and how they can benefit your project by providing subtle, low-friction content for the user. This perfectly aligns with the latest signals from Expo that they are working on implementing Widgets for Expo UI components to make it even easier.
-   📜 [Debug Like a Senior - React Native Performance Panel](https://blog.swmansion.com/react-native-debugging-new-performance-panel-in-react-native-0-83-21ca90871f6d) - JS performance profiling in React Native used to be painful, but the new Performance Panel in React DevTools finally fills the DX gap. This article describes the panel's features and reveals some hidden gems you probably weren't aware of.
-   📜 [You can use the latest React Native DevTools without upgrading](https://andrei-calazans.com/posts/react-native-debugger-frontend/) - While it's more of a workaround than a formal solution, you can still use the new Performance profiler even if your project is stuck on an older version of React Native.
-   📜 [Expo now supports Maestro Cloud testing in your CI workflow](https://expo.dev/blog/expo-now-supports-maestro-cloud-testing-in-your-ci-workflow) - This is interesting, as Maestro is becoming an increasingly reliable testing solution in the mobile application world.
-   📜 [Why You Don’t Have to Minify JavaScript Code in React Native Apps](https://www.callstack.com/blog/why-you-dont-have-to-minify-javascript-code-in-react-native-apps) - Thanks to Hermes.
-   📜 [AI-powered code reviews for your Expo projects with CodeRabbit](https://expo.dev/blog/ai-powered-code-reviews-for-your-expo-projects)
-   📦 [Screens 4.19 - Support for iOS `bottomAccessory` in native tabs, enhanced bottom tab bar customization on Android](https://github.com/software-mansion/react-native-screens/releases/tag/4.19.0)
-   📦 [Radon IDE 1.14 - React Native 0.83 support, Radon AI, and Network Inspector improvements](https://github.com/software-mansion/radon-ide/releases/tag/v1.14.0)
-   📦 [True Sheet 3.4 - Custom dim view with smooth interpolation](https://github.com/lodev09/react-native-true-sheet/releases/tag/v3.4.0)
-   📦 [Pager View 8.0 - Full rewrite in Swift UI](https://github.com/callstack/react-native-pager-view/releases/tag/v8.0.0)
-   📦 [Zoom Grid - Zoomable grid component built on top of Shopify FlashList](https://github.com/wassgha/react-native-zoom-grid)
-   📦 [Nitro MLX 0.1 - Run LLMs on-device in React Native using MLX Swift](https://github.com/corasan/react-native-nitro-mlx/releases/tag/v0.1.0)
-   📦 [Nitro Markdown - High-performance parser using Nitro and md4c (C++)](https://github.com/JoaoPauloCMarra/react-native-nitro-markdown)
-   🎥 [Software Mansion - A Deep Dive into Shared Element Transitions (Reanimated 4.2)](https://www.youtube.com/watch?v=uQ7BGqJPkLo)
-   🎥 [Code with Beto - What’s new in React Native 0.83, React 19.2, new DevTools features](https://www.youtube.com/watch?v=jDQT2Rw6i6Q)
-   🎥 [Expo - How to add native iOS Widgets to your Expo app (SwiftUI + Expo Apple Targets)](https://www.youtube.com/watch?v=UH4ejdz3fko)
-   🎙️ [Rocket Ship 87 - React Native 0.83, Security Vulnerability, Faster Builds, Expo Router Sneak](https://share.transistor.fm/s/034db9b7)
-   🎙️ [RNR 349 - How 2025 changed the React Native job market](https://www.youtube.com/watch?v=5uC1GtXUrb8&list=PLFHvL21g9bk0HKMhHLDtlMwxy2Qpv4GHg&index=1)

![](https://thisweekinreact.com/emails/separators/christmas.png)

## 🔀 Other[​](#other "Direct link to 🔀 Other")

-   👀 [CSS scroll-triggered animations](https://developer.chrome.com/blog/scroll-triggered-animations) - a new version of Chrome will arrive in 2026 with scroll-triggered animations definable by CSS.
-   📊 [State of HTML 2025 - Survey results](https://2025.stateofhtml.com/en-US)
-   📜 [Why are my view transitions blinking?](https://piccalil.li/blog/why-are-my-view-transitions-blinking/) - A deep dive into the `view-transition-name` CSS property.
-   📜 [Symbol.iterator Is Pretty Neat, Actually](https://kettanaito.com/blog/symbol-iterator-is-pretty-neat-actually) - An interesting use case where getting control over the spread operator improves DX.
-   📦 [Safari 26.2 - `commandfor`, Navigation API, Map Upsert, auto-expanding textareas, `scrollbar-color`, and more](https://webkit.org/blog/17640/webkit-features-for-safari-26-2/) - A massive release, also unlocking cool APIs like the Navigation API that is now supported across all browsers!
-   📦 [Node 24.12 - Type stripping is now stable](https://nodejs.org/en/blog/release/v24.12.0): TypeScript support is officially stable in Node LTS!

![](https://thisweekinreact.com/emails/separators/christmas.png)

## 🤭 Fun[​](#fun "Direct link to 🤭 Fun")

[![alt](https://thisweekinreact.com/emails/issues/263/meme.jpg)](https://x.com/sebastienlorber/status/1999255728478171629)

See ya! 👋