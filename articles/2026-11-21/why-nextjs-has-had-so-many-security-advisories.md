---
title: "Why Next.js has had so many security advisories"
source: "https://react.statuscode.com/issues/498"
publishedDate: "2026-11-20"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/ds7cbagrj5mmhgomkj4i.jpg)](https://xyflow.com/blog/react-flow-13-major-release)

💡 If you're an existing user, there's [a migration guide](https://reactflow.dev/learn/troubleshooting/migrate-to-v13). _Vue Flow_ has also now joined the xyflow family, alongside _Svelte Flow_.

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/f168661f.webp)](https://sentry.io/resources/automated-debugging/?utm_source=reactstatus&utm_medium=paid-community&utm_campaign=automateddebugging-fy27q4-evergreen&utm_content=newsletter-primary-resource-hub-learnmore)

[How to Build Your Own Automated Debugging Workflow](https://sentry.io/resources/automated-debugging/?utm_source=reactstatus&utm_medium=paid-community&utm_campaign=automateddebugging-fy27q4-evergreen&utm_content=newsletter-primary-resource-hub-learnmore "sentry.io") — Factory, Exa, and Bolt connected their coding agents to Sentry so production errors become fix PRs, not tickets. Get the recipes for Claude Code, Cursor, Copilot, or bring your own coding agent.

Sentry

[Why Next.js Has Had 51 Security Advisories This Year](https://nextjs.org/blog/how-were-using-ai-to-make-nextjs-more-secure "nextjs.org") — You've surely noticed Next.js is getting a _lot_ of security releases recently, but why? Unsurprisingly, it's AI, which is making old bugs easier to find, with 70% of this year's vulnerabilities found in code at least a year old. The team explains how it's responding and helping us stay up to date.

The Next.js Team

⚠️ In related news, a campaign dubbed [React2STEAL](https://opensourcemalware.com/blog/react2steal-github-actions) is exploiting servers that are still unpatched against React2Shell and the old middleware bypass, in order to publish their secrets. [Here's what to check](https://www.chainguard.dev/unchained/react2steal-what-it-is-and-what-to-check) on your apps.

📄 [When an Import Becomes a Zip Bomb: Catching Bundle Regressions in Next.js](https://bra31k.dev/en/blog/bundle-size-regressions/) – By setting up per-route JavaScript budgets in CI. Sergey Patrakeev

📄 [React 19.3's View Transitions, Tested: What Actually Animates?](https://devtrillo.com/writing/react-19-3-view-transitions/) – Hint: not a plain `setState`. Esteban Trillo

📄 [Shared Element Transitions Grow Up in Reanimated 4.8](https://swmansion.com/blog/shared-element-transitions-in-reanimated-4-8-0/) – Now on by default, and they move the real view. Bartłomiej Błoniarz (Software Mansion)

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/eekvnbhdbukialvphr1t.jpg)](https://react-anatomy.com/)

[Detent: A Wheel Picker for React with Real Inertia](https://detent.hayder.sh/ "detent.hayder.sh") — An iOS-style wheel picker that uses its own physics rather than `scroll-snap`, meaning that a 'throw' has momentum and lands cleanly on options. The demo on the homepage is very cute and worth… a spin. 😎

Hayder

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/syuisr0pjgfgzjub1sks.jpg)](https://github.com/recharts/recharts/releases/tag/v3.11.0)

-   📊 [Recharts 3.11](https://github.com/recharts/recharts/releases/tag/v3.11.0) _(above)_ – Popular charting library. Now with [context-based themes](https://recharts.github.io/en-US/guide/theming/) and accessible fill patterns.
    
-   ⚠️ [React Router 8.5.2](https://github.com/remix-run/react-router/releases/tag/react-router%408.5.2) and [7.18.6](https://github.com/remix-run/react-router/releases/tag/react-router%407.18.6) – Upgrade to either version for fixes covering [seven security advisories](https://github.com/remix-run/react-router/security), four rated high.
    
-   [You Might Not Need an Effect 1.2](https://github.com/nickjvandyke/eslint-plugin-react-you-might-not-need-an-effect/releases/tag/v1.2.0) – ESLint plugin that flags unnecessary `useEffect` calls. Now 'sees through' popular third-party effect wrappers.
    
-   [ka-table 13.0](https://github.com/komarovalexander/ka-table/releases/tag/13.0.0) – Lightweight React table component. Now a keyboard-accessible ARIA grid and has added fixed columns and virtual scrolling of columns.
    
-   [Redux Toolkit 2.15](https://github.com/reduxjs/redux-toolkit/releases/tag/v2.15.0) – Each store now gets its own RTK Query runtime, fixing long-standing SSR and test isolation problems.
    
-   📱 [React Native Bottom Sheet 1.0](https://swmansion.com/changelog/react-native-bottom-sheet-1-0-0/) – Software Mansion's bottom sheet goes stable.
    

📰 Classifieds

🔥 Let the cloud take the heat. [Expo Simulators](https://try.expo.dev/3UGcylH) runs iOS simulators and Android emulators for your agents, and your laptop’s RAM stays free.

* * *

⚡ Next.js, Astro or React Router site? [Fimo](https://fimo.ai/?utm_source=reactstatus&utm_medium=newsletter&utm_campaign=agents-launch&utm_content=nov20) hosts it and runs AI agents that keep it found on Google and in AI answers.

* * *

🎬 Your app needs video, not a video team. Upload any format to [Hyperserve's API](https://hyperserve.io/?utm_source=reactstatus&utm_medium=newsletter&utm_campaign=classified_nov20), get back MP4 on a global CDN. Ship video in an afternoon.

📢  Elsewhere in the ecosystem

-   The Next.js team is [experimenting with Switchyard](https://github.com/vercel/next.js/pull/101695), a Go-powered server that [sits in front of `next start`](https://github.com/vercel/next.js/pull/102035). Currently, it forwards requests to Node, but the plan is to move routing work out of Node and into Switchyard. If you're self-hosting Next.js, this is one for your long-term radar.
    
-   [Solid 2.0 is now stable](https://www.solidjs.com/blog/solid-2-0-the-long-hold/). Async is now part of the signals graph and server functions have moved into core. There are also new diagnostics aimed at coding agents.
    
-   If you want to try speeding up your npm package installs, vlt's registry mirror [serves much less metadata](https://www.vlt.io/blog/registry-metadata-70-percent-smaller), making clean installs 20-70% faster and, now, [it's open for all to use](https://vlt.io/blog/free-public-npm-mirror) with no account/token needed.
    
-   🐘 [PostgreSQL 19 is finally here!](https://www.postgresql.org/about/news/postgresql-19-released-3449/) If Postgres is part of your stack, our sister newsletter [_Postgres Weekly_ covered it in depth this week](https://postgresweekly.com/issues/674) (please subscribe! 😅)
    
-   [npkill 1.0](https://zaldih.com/en/post/npkill-1-0-0/) (`npx npkill`) no longer just clears out old `node_modules` folders, but build output and caches like `.next` and `.turbo` too.