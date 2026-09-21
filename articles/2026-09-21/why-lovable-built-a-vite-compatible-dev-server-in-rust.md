---
title: "Why Lovable built a Vite-compatible dev server in Rust"
source: "https://react.statuscode.com/issues/491"
publishedDate: "2026-09-18"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/quq4fg4kyd0bg7hnz44s.jpg)](https://brookslybrand.com/posts/do-frameworks-matter-anymore/)

[Do Frameworks Matter Anymore?](https://brookslybrand.com/posts/do-frameworks-matter-anymore/ "brookslybrand.com") — A Remix team member picks at the _just-let-AI-use-React_ trope. If frameworks don't matter, why use React? Skip one and agents improvise their own makeshift 'frameworks', so Brooks wants new, better ones with solid abstractions and constraints.

Brooks Lybrand

💡 If agents _are_ reading your code, structure seems to matter a lot. [One developer's experiment](https://ondrejvelisek.github.io/the-cost-of-abstraction-for-humans-and-ai-agents/) found an over-abstracted React app cost agents up to 5x more to work on.

[OJ: A Rust-Native, Vite-Compatible Dev Server](https://lovable.dev/blog/faster-previews-oj "lovable.dev") — Lovable spins up a million Vite dev servers a day, so one of its engineers [built OJ](https://rapha.land/introducing-oj/), a Rust dev server that reads your existing `vite.config.ts` and runs Vite plugins, but focused on low memory use and cold start times. It's [open source](https://github.com/lovablelabs/oj) but experimental.

Raphael Amorim (Lovable)

**IN BRIEF:**

-   [React Router 8.4](https://reactrouter.com/changelog#v840) reduces re-renders: components that only call `useLocation` (say) no longer re-render when a navigation starts. There's also an opt-in, _unstable_ route matcher that cuts navigation times by up to 88% on large apps.
    
-   [Motion](https://motion.dev/) 13.4 has landed adding [AnimateView](https://motion.dev/docs/react-animate-view) to animate elements between different views using the browser's native View Transition API and React 19.3's [`ViewTransition` component](https://react.dev/blog/2026/09/09/react-19-3#view-transition).
    
-   📱 [Expo SDK 58 is in beta](https://expo.dev/changelog/sdk-58-beta), built for iOS 27 on React Native 0.88 RC, with _App Intents_ support and a new CLI tool aimed at coding agents.
    

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/afaokicwppgsd63qh1c5.jpg)](https://github.com/shadcn-ui/lint)

-   🗓️ [ilamy Calendar 3.0](https://ilamy.dev/) – 'Full calendar' component. [v3.0](https://github.com/kcsujeet/ilamy-calendar/releases/tag/v3.0.0) aligns an event's end point with RFC 5545 and the Google Calendar API. ([Demo](https://ilamy.dev/demo/))
    
-   📊 [billboard.js 4.1](https://netil.medium.com/billboard-js-4-1-0-live-resizing-configurable-subchart-react-subpath-csp-safe-worker-e1a6fd0ece88) – The popular charting library has brought its React component into the main package.
    
-   [React Native Skia 2.12](https://github.com/Shopify/react-native-skia) – High-performance Skia-powered 2D graphics library.
    
-   [SSGOI 7.1](https://ssgoi.dev/) – Native app-like page transitions built on the Web Animations API.
    
-   [react-native-nitro-sqlite 9.8](https://github.com/margelo/react-native-nitro-sqlite) – JSI-backed SQLite library for React Native.
    

📰 Classifieds

[Build with strategy. Lead with curiosity](https://jobs.fidelity.com/en/life-at-fidelity/our-stories/tech-careers/fidelity-tech-strategy-empowers-associates/?utm_source=javascript&utm_medium=paidsocial&utm_campaign=jobssocial&utm_content=awn-tech-sl2-txt) - Fidelity is looking for technologists that ask questions, challenge conventions and care about the impact of their products.

* * *

⚡ [Zuplo](https://zuplo.link/iRC6nqO) puts every API, AI, and MCP request behind one gateway. Route traffic, guard your MCP servers, and cap your AI costs. [Try it free](https://zuplo.link/iRC6nqO).

📢  Elsewhere in the ecosystem

-   ⚠️ Attackers are [scanning for exposed Vite dev servers](https://www.f5.com/labs/articles/cloud-takeover-mass-scanning-for-exposed-vite-endpoints-cve-2026-39364) to exploit a bug (patched in Vite 7.3.2 and 8.0.5) to access `.env` files. Check your setup if you haven't updated in a while.
    
-   TC39's Hemanth HM has a popular [functional programming 'jargon' reference](https://github.com/hemanth/functional-programming-jargon), but has now also created [a visual map of FP concepts](https://hemanth.github.io/functional-programming-jargon/) including JavaScript examples of each.
    
-   Philip Walton shows how [TypeScript can complain when you use newer Web APIs](https://philipwalton.com/articles/modern-web-types/) due to its DOM types only covering APIs shipped in _multiple_ engines. His new [modern-web-types](https://github.com/philipwalton/modern-web-types) `lib.dom` replacement fills in those gaps.
    
-   GitHub Actions now has [a `cache-mode` setting](https://socket.dev/blog/github-actions-cache-mode) to limit cache access per workflow/job, a defence against the kind of cache poisoning that [compromised TanStack's npm packages a few months ago](https://tanstack.com/blog/npm-supply-chain-compromise-postmortem).
    
-   Vercel has [unveiled a 'flat rate' CDN pricing option](https://vercel.com/blog/introducing-flat-rate-cdn) (for _Pro_ teams) which might take the sting out of some of your bills…