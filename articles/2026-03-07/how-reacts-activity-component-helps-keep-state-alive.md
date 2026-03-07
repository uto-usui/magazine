---
title: "How React’s Activity component helps keep state alive"
source: "https://react.statuscode.com/issues/465"
publishedDate: "2026-03-06"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/b3ja8qoff7o5p8saohzz.jpg)](https://www.patreon.com/posts/seven-years-to-typescript-152144830)

[Seven Years to TypeScript: Migrating 11,000 Files at Patreon](https://www.patreon.com/posts/seven-years-to-typescript-152144830 "www.patreon.com") — The creator monetization platform had a million lines of largely React-based JavaScript on its hands, and while adopting TypeScript on new code was going well, getting _all_ their code (often using legacy React conventions) upgraded was daunting. This insight-heavy retrospective covers the tools and techniques involved.

Gavy Aggarwal (Patreon)

**IN BRIEF:**

-   VoidZero's Alexander Lichter [wrote a mega 'ViteLand' roundup](https://voidzero.dev/posts/whats-new-feb-2026) covering the latest Oxfmt Beta, Vite, Vitest, and community updates.
    
-   Devon Govett, maintainer of [React Aria](https://react-aria.adobe.com/), makes the case for [why you'd use a JavaScript modal library](https://github.com/adobe/react-spectrum/discussions/9696#discussioncomment-15942257) instead of the browser's native `dialog` element.
    
-   The [first RC of React Native 0.85.0](https://github.com/facebook/react-native/releases/tag/v0.85.0-rc.0) is out.
    

📄 [How I used Cursor to Migrate Frameworks](https://kentcdodds.com/blog/how-i-used-cursor-to-migrate-frameworks) – From Remix v2 to React Router v7, specifically. Kent C Dodds

📺 [Cloudflare Just 'Slop Forked' Next.js](https://www.youtube.com/watch?v=abbeIUOCzmw) – A characteristically irreverent five-minute take on last week’s big news of [Cloudflare building its `vinext` Next.js clone.](https://blog.cloudflare.com/vinext/) Fireship

📄 [Creating iOS Home Screen Widgets and Live Activities in Expo](https://expo.dev/blog/home-screen-widgets-and-live-activities-in-expo) Jakub Grzywacz (Expo)

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/qmzdgirov2dkswp99fss.jpg)](https://tinybase.org/)

-   [React Native Skia 2.5](https://github.com/Shopify/react-native-skia) – High-performance Skia-based 2D graphics library for React Native. ([More info.](https://shopify.github.io/react-native-skia/docs/getting-started/installation))
    
-   [React-Custom-Scroll 7.1](https://github.com/rommguy/react-custom-scroll) – Customize browser scrollbars while preserving native behavior. Now works with React 19. ([Demo.](https://rommguy.github.io/react-custom-scroll/exampleDist/index.html))
    
-   [Cron Generator 2.2](https://github.com/sojinantony01/react-cron-generator) – Component for users to build cron expressions. ([Demo.](https://sojinantony01.github.io/react-cron-generator/))
    
-   🌐 [next-translate 3.0](https://github.com/aralroca/next-translate) – Easy internationalization (i18n) for Next.js.
    
-   [React Icons 5.6](https://github.com/react-icons/react-icons) – Include popular icons in your React apps easily.
    
-   🗓️ [ilamy Calendar 1.4](https://github.com/kcsujeet/ilamy-calendar) – Full GCal-style calendar component.
    

📢  Elsewhere in the ecosystem

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/ow8v1ayxrd7tbgmosqar.jpg)](https://cant-maintain.saschb2b.com/)

-   [Can't Maintain](https://cant-maintain.saschb2b.com/) is a quick web game where you have to pick which of two sets of props is better. If you get it wrong, it provides guidance as to why one set is better than the other.
    
-   [Inertia](https://inertiajs.com/), a popular glue layer for using React (or Svelte or Vue) as a view layer in server-driven apps, has [unveiled its v3 beta](https://laravel.com/blog/inertiajs-v3-is-now-in-beta). It now requires React 19, drops Axios, adds first-class support for optimistic updates, and more.
    
-   [npmx.dev](https://npmx.dev/) is a new, fast way to browse and search the official npm registry that's entered _alpha_ this week with [a post running through all the details.](https://npmx.dev/blog/alpha-release)
    
-   Eric Allam shares [a full post-mortem of how _Trigger_ was hit by Shai-Hulud](https://trigger.dev/blog/shai-hulud-postmortem), the recent worm that attacked the npm supply chain and compromised thousands of packages and repos.