---
title: "Why test IDs are an accessibility code smell"
source: "https://react.statuscode.com/issues/468"
publishedDate: "2026-03-27"
category: "frontend"
feedName: "React Status"
---

🐣 **We're taking next week off** for a little Easter break, so we'll be back in your inbox on April 10. Happy Easter to you, if you celebrate. 😊  
\_\_  
_Peter Cooper, your editor_

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/zx3dmsmknn2qhghpyumu.jpg)](https://react-joyride.com/)

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/3ba859a8.png)](https://frontendmasters.com/courses/enterprise-ui-dev-v2/?utm_source=email&utm_medium=reactstatus&utm_content=uidev)

[UI Development at Scale](https://frontendmasters.com/courses/enterprise-ui-dev-v2/?utm_source=email&utm_medium=reactstatus&utm_content=uidev "frontendmasters.com") — Join Steve Kinney for this video course exploring how to architect large enterprise-scale frontend systems. You'll cover UI patterns, runtime composition, build-time approaches, monorepos, scaling, testing and much more.

Frontend Masters

[Taking Next.js to More Platforms with Next.js 16.2's Adapter API](https://nextjs.org/blog/nextjs-across-platforms "nextjs.org") — Last week’s [Next.js 16.2](https://nextjs.org/blog/next-16-2) release made _adapters_ stable. They provide an API for different platforms to customize the build process to their needs. This post explains how the feature works and how several providers are coming together to make it happen with Netlify, Cloudflare and AWS adapters expected later this year.

Jimmy Lai and JJ Kasper (Vercel)

**IN BRIEF:**

-   🤖 Dan Abramov put Claude to good use creating [a fix](https://github.com/facebook/react/pull/36134) for [a React bug](https://github.com/facebook/react/issues/35821). [Here, he explains the approach he took.](https://bsky.app/profile/danabra.mov/post/3mhrdue7gds2h)
    
-   🔈 Fallen behind React Native's flurry of activity recently? The hosts of _React Native Radio_ [catch up on five months of React Native and Expo releases.](https://infinite.red/react-native-radio/rnr-357-react-native-082084-expo-55)
    
-   🇳🇴 [React Norway](https://reactnorway.com/) is taking place on June 5 in Oslo. It has a very _rockin'_ site and a line up to match including Jack Herrington, Dominik Dorfmeister, and Aurora Scharff.
    
-   [TypeScript 6.0 was released](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/) earlier this week. Be prepared to make a few tsconfig changes!
    

[Test IDs Are an Accessibility Smell](https://tkdodo.eu/blog/test-ids-are-an-a11y-smell "tkdodo.eu") — Dominik argues `data-testid` is a smell, not a best practice, and switching to role-based selectors gives you accessibility checking _“almost for free.”_ Complete with before/after examples and tips for making your markup more query-friendly.

Dominik Dorfmeister

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/oeniypjiqz6x75twvowr.jpg)](https://semiotic.nteract.io/)

[TanStack DB 0.6 Adds Persistence, Offline Support, and Hierarchical Data](https://tanstack.com/blog/tanstack-db-0.6-app-ready-with-persistence-and-includes "tanstack.com") — TanStack DB puts a reactive queryable database inside your app, so you read and filter data locally instead of hitting an API. 0.6’s headline feature is SQLite-backed persistence with adapters for web, mobile, and server environments. The post goes deep on several other additions worth your time too.

Willis and De Porre (TanStack)

-   [Jotai 2.19.0](https://github.com/pmndrs/jotai/releases/tag/v2.19.0) – Primitive and flexible state management for React applications.
    
-   💳 [React Stripe.js 6.0](https://github.com/stripe/react-stripe-js) – Components for Stripe.js and Stripe Elements.
    
-   [Astro 6.1](https://astro.build/blog/astro-610/)
    

📰 Classifieds

[Sentry](https://blog.sentry.io/setting-up-next-js-source-maps-sentry/?utm_source=reactstatus&utm_medium=paid-community&utm_campaign=nextjs-fy27q1-nextjs&utm_content=newsletter-link-blog-sourcemaps-learnmore) - Why your Next.js stack traces point to random chunks (and how to fix it).

* * *

😎 [React Summit](https://reactsummit.com/?utm_source=partner&utm_medium=reactstatus) - June 12 & 16, Amsterdam & Online. Stay on top of the latest in the React ecosystem with 60+ amazing talks and workshops.

* * *

👾 A conference for engineers who did the big rewrite - and lived to tell the story. [BugBash](https://antithesis.com/bugbash/conference2026/) 2026, April 23-24, Washington DC.

📢  Elsewhere in the ecosystem

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/qegpblo65p48v9fmuxtn.jpg)](https://stroke.abhii.space/)

-   [Stroke](https://stroke.abhii.space/) is a cute idea. Draw in a field on the page (e.g. a signature or some handwriting), click a button, and get some [Motion](https://motion.dev/docs/react) code you can drop into a component to re-animate what you drew. _(No, I can't draw to save my life, as evidenced above.. 😅)_
    
-   [Vavite 6](https://github.com/cyco130/vavite) is a Vite plugin for developing and building server-side Node apps, so you can use Vite both for the frontend and backend of an app, complete with HMR at both ends.
    
-   James Garbutt of the [e18e](https://e18e.dev/) project looks at [the three biggest causes of `node_modules` bloat](https://43081j.com/2026/03/three-pillars-of-javascript-bloat): needless ES3-era compat packages, micro-libraries with a single consumer, and ponyfills for APIs that shipped years ago.
    
-   🤖 Phil Eaton surveyed 112 major source-available projects (Bun, Next.js, React, etc.) to [get a picture of their stance towards AI-assisted contributions](https://theconsensus.dev/p/2026/03/02/source-available-projects-and-their-ai-contribution-policies.html). Of those, only four have an outright ban.
    
-   🔒 More than ever, it's essential to ensure no secrets have snuck into your repos. [Secretlint](https://github.com/secretlint/secretlint) is a linting tool dedicated entirely to the task. It's written in Node but can be used with Docker against projects of any language.