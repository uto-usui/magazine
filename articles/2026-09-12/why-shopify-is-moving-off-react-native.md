---
title: "Why Shopify is moving off React Native"
source: "https://react.statuscode.com/issues/490"
publishedDate: "2026-09-11"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/o4qesq8gfg3dinfofghi.jpg)](https://react.dev/blog/2026/09/09/react-19-3)

What's New in React 19.3

[React 19.3 is here with a _huuuge_ release post](https://react.dev/blog/2026/09/09/react-19-3) (that's packed with examples) bringing two anticipated APIs out of experimental status, as well as some [Server Components additions](https://react.dev/blog/2026/09/09/react-19-3#new-react-server-components-features). Here are some of the goodies:

-   **Fragment Refs:** Manage focus, events and measurements across a group of DOM nodes (a _component_, say!) _without_ adding a wrapper element that could disrupt your layout.
    
-   **View Transitions:** <`ViewTransition`\> animates elements entering, leaving or changing in transition updates, with support for Suspense reveals and animations you can customize with CSS.
    

💡 For a hands-on feel, [Chris Coyier's review of `<ViewTransition>`](https://blog.master.dev/reacts-viewtransition-element/) from January still holds up, though it doesn't cover `addTransitionType`.

-   **Trusted Types support:** React now preserves trusted objects when passing values to DOM APIs like `innerHTML`, avoiding string coercion that caused browsers enforcing [Trusted Types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API) to reject them.
    
-   **Opt out of server rendering:** [`use(browser())`](https://react.dev/reference/react-dom/browser) lets a component render only in the browser, showing its nearest Suspense fallback in the generated HTML.
    

Elsewhere, <`Activity`\> gains Server Component support, there's support for the new <`select`\> parsing rules, and transitions now render independently, so a slow one no longer blocks unrelated ones. [The full release notes](https://github.com/react/react/releases/tag/v19.3.0) (not the same as the release post!) paint the full picture.

[Native is Now the Future of Mobile at Shopify](https://shopify.engineering/back-to-native "shopify.engineering") — Six years after going all-in on React Native, Shopify is rebuilding its apps in Swift and Kotlin, arguing coding agents have cut the cost of building the same features twice. We also learn what's going to happen to React Native Skia, FlashList and Restyle.

Shopify Engineering

**IN BRIEF:**

-   [Tailwind Labs, creator of Tailwind CSS, is joining Shopify](https://tailwindcss.com/blog/tailwind-is-joining-shopify). The open source projects stay MIT-licensed with the same team.
    
-   [React DevTools 8.0 is out](https://github.com/react/react/blob/main/packages/react-devtools/CHANGELOG.md#800) with the _Suspense_ tab on by default and the Timeline profiler gone, with the browser's _Performance_ panel taking over. There's also [an experimental package](https://github.com/react/react/tree/main/packages/react-devtools-cdt-mcp) that exposes React DevTools to coding agents through `chrome-devtools-mcp`.
    
-   TanStack has published [a write-up of its partnership with Vercel](https://tanstack.com/blog/vercel-partnership), with new TanStack AI adapters for Vercel's AI Gateway and Sandbox now available.
    
-   [Expo Modules 2.0 is on the way](https://expo.dev/blog/an-early-look-at-expo-modules-2-0), introducing annotation-based Swift and Kotlin classes for writing native modules.
    

[React Now Rusted All the Way Out](https://blog.master.dev/react-now-rusted-all-the-way-out/ "blog.master.dev") — A team moved a 1000+ file React Router app onto oxc's Rust port of the React Compiler and watched the compile step drop from 14.3s to 0.81s. Better still, the port already handles patterns the Babel-based 1.0 skips, and the post ends with the Vite config to make the switch.

Andrew Patton

📄 [What It Actually Takes to Migrate Discord to React Native's New Architecture](https://swmansion.com/blog/what-it-actually-takes-to-migrate-discord-to-react-native-s-new-architecture/) – Only 14% of the tickets covered the migration itself. The rest was all in the _long tail_. Kamil Delekta (Software Mansion)

🤖 [How the Next.js Team Closed 1,500 GitHub Issues in One Month](https://nextjs.org/blog/how-we-closed-1500-github-issues) – You won't be surprised that agents were involved. Marcos Hernanz (Next.js)

📄 [Your React App Can Unmount When a Reader Turns On Chrome Translate](https://dev.to/davlat_aliev_392c20ec5c92/your-react-app-unmounts-when-a-reader-turns-on-chrome-translate-2hn3) – Why the classic `removeChild` error happens, and why the usual monkey-patch can hide the crash while leaving the UI broken. Davlat Aliev

📄 [The Golden Switch: Migrating From Gatsby to Astro in Under 9¾ Days](https://evilmartians.com/chronicles/golden-switch-or-migrating-from-gatsby-to-astro-in-under-9-days) – Keeping their React components, after substantial prep work. Evil Martians

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/rrafub0hos1swqnddjcv.jpg)](https://github.com/pmndrs/jotai/blob/main/docs/guides/migrating-to-v3.mdx)

[Vidact: Compiles React Components Down to Direct DOM Code](https://www.vidact.dev/ "www.vidact.dev") — A compiler that takes React-style function components and hooks and emits direct DOM operations, a la Solid, with no VDOM or React runtime in the bundle. Beta, and unsupported React patterns will fail at build time.

Mohamad Mohebifar

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/hmlqx96kvtkdta8ze9t0.jpg)](https://visgl.github.io/react-google-maps/examples/map-3d-markers)

-   🗾 [React Google Maps 1.10](https://visgl.github.io/react-google-maps/) – Components and hooks for the Google Maps JavaScript API. Now with an expanded set of declarative 3D components, including models and markers ([demo](https://visgl.github.io/react-google-maps/examples/map-3d-markers)).
    
-   [Lexical 0.50](https://github.com/facebook/lexical/releases/tag/v0.50.0) – Meta's extensible text editor framework. Now with HMR support and a new `@lexical/compiler` package for build-time tree-shaking annotations.
    
-   [Base UI 1.8](https://base-ui.com/react/overview/releases/v1-8-0) – The unstyled component library that's now `shadcn/ui`'s default.
    
-   [wouter 3.11](https://github.com/molefrog/wouter/releases/tag/v3.11.0) – Minimalist-friendly ~2KB routing for React [and Preact](https://github.com/molefrog/wouter#preact-support).
    
-   [React Native 0.88 Release Candidate](https://github.com/react/react-native/releases/tag/v0.88.0-rc.0)