---
title: "How to roll your own server-side React framework"
source: "https://react.statuscode.com/issues/467"
publishedDate: "2026-03-20"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/mugxsoqu3wdoesaay38f.jpg)](https://blog.platformatic.dev/react-ssr-framework-benchmark-tanstack-start-react-router-nextjs)

💡 As always with benchmarks, they present a single snapshot in time, are hard to get right, and real life situations vary a lot.

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/6733df67.png)](https://go.clerk.com/QPJOh73)

[Auth That Plays Nice with Suspense and Transitions](https://go.clerk.com/QPJOh73 "go.clerk.com") — Clerk Core 3 adds full support for React concurrent rendering — Suspense, transitions, and streaming SSR now work correctly with auth state. Also ships new hooks for custom sign-in and sign-up flows, a visual theme editor, and ~50KB smaller bundles.

Clerk

[Why We Rolled Our Own React Server Components Framework](https://www.aha.io/engineering/articles/why-we-rolled-our-own-rsc-framework "www.aha.io") — _Another_ one? The team at _Aha!_ had specific needs existing frameworks couldn’t meet, and modern React and Vite have made ‘rolling your own’ a realistic option. Josh shares a _lot_ of details on how to approach such a task yourself.

Josh Wilson (Aha!)

💡 If you go down the 'roll your own' rabbit hole, [Nitro v3](https://nitro.build/blog/v3-beta) is worth a look as it now makes it possible to [tie Vite and React](https://nitro.build/examples/vite-ssr-react) together to build server-side apps.

**IN BRIEF:**

-   [Expo UI in SDK 55](https://expo.dev/blog/expo-ui-in-sdk-55-jetpack-compose-now-available-for-react-native-apps) brings Jetpack Compose (now in beta) and reworked SwiftUI APIs into React Native apps.
    
-   The moderator of the `/r/reactjs` subreddit (Mark Erikson of Redux fame) is [seeking feedback on how to make the sub better.](https://www.reddit.com/r/reactjs/comments/1rugk9g/announcement_requesting_community_feedback_on_sub/)
    
-   [Solid](https://www.solidjs.com/)'s Ryan Carniato argues [two unpopular React design choices were unavoidable](https://dev.to/playfulprogramming/two-react-design-choices-developers-dont-like-but-cant-avoid-d6g) (deferred state commits and dependency arrays on effects) and signal-based alternatives (like Solid) only avoid them by staying synchronous.
    
-   🤖 In [a post on _X_](https://x.com/felixrieseberg/status/2034688574239776778), Anthropic's Felix Rieseberg reveals the [main Claude site](https://claude.ai/) and desktop apps have shifted to Vite and TanStack Router.
    

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/ujagdenzznvptt9h5kr9.jpg)](https://github.com/darula-hpp/shimmer-from-structure)

-   [Shimmer From Structure 2.4](https://github.com/darula-hpp/shimmer-from-structure) – Auto-generates pixel-perfect 'shimmer skeletons' for components that are loading _(above)_. [The homepage](https://shimmer-from-structure-docs.vercel.app/) is a great live demo.
    
-   [Streamdown 2.5](https://vercel.com/changelog/streamdown-2-5) – Vercel's component for rendering streaming Markdown.
    
-   ⌨️ [React Hotkeys 3.0](https://github.com/jaywcjlove/react-hotkeys) – Component to listen to keydown/keyup and defining and dispatching keyboard shortcuts.
    
-   [react-fontawesome 3.3](https://github.com/FortAwesome/react-fontawesome) – Official React component for _Font Awesome_ icons.
    
-   [next-forge 6.0](https://www.next-forge.com/) – Vercel's monorepo Turborepo template for Next.js apps.
    
-   [Modern.js 3.1](https://github.com/web-infra-dev/modern.js) – ByteDance's progressive React & Rsbuild framework.
    
-   [React Notion X 7.10](https://github.com/NotionX/react-notion-x) – Fast and accurate React renderer for Notion.
    
-   📅 [React Native DateTimePicker 9.1](https://github.com/react-native-datetimepicker/datetimepicker)
    
-   [React Native for Windows 0.82](https://github.com/microsoft/react-native-windows/releases/tag/react-native-windows_v0.82.0)
    

📢  Elsewhere in the ecosystem

-   🤖 [Addy Osmani introduces us to _comprehension debt_](https://addyosmani.com/blog/comprehension-debt/). In a world of agent-produced code, the question is now not _“how do we generate more code?”_ but _“how do we actually understand more of what we’re shipping?”_
    
-   🤖 Vercel has [updated its terms of service](https://vercel.com/changelog/updates-to-terms-of-service-march-2026) to allow for using code for AI model training and _"with AI model providers"_. It's off by default for _paid_ users, but Hobby users need to opt out manually.
    
-   ⚠️ All maintained Node.js versions (25.x, 24.x, 22.x and 20.x) [will get security releases next week](https://nodejs.org/en/blog/vulnerability/march-2026-security-releases) (on or after March 24) to address nine vulnerabilities.
    
-   [Bun v1.3.11](https://bun.sh/blog/bun-v1.3.11) has been released with `Bun.cron` for OS-level cron jobs and expression parsing, ANSI and grapheme-aware string slicing, and yet more [Node.js compatibility improvements.](https://bun.sh/blog/bun-v1.3.11#node-js-compatibility-improvements)
    
-   If upgrading to macOS 26 (Tahoe) has broken support for custom local TLDs (e.g. `.internal` or `.test`), [this Gist might be useful.](https://gist.github.com/adamamyl/81b78eced40feae50eae7c4f3bec1f5a)
    
-   And much, much more in [this week's _JavaScript Weekly._](https://javascriptweekly.com/issues/777)