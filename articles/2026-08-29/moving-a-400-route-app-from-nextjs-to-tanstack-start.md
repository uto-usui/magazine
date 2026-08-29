---
title: "Moving a 400-route app from Next.js to TanStack Start"
source: "https://react.statuscode.com/issues/488"
publishedDate: "2026-08-28"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/osspuzqgnjn3ggmsvqfq.jpg)](https://lovable.dev/blog/how-we-migrated-lovable-dev-away-from-nextjs)

[How Lovable Migrated from Next.js to TanStack Start](https://lovable.dev/blog/how-we-migrated-lovable-dev-away-from-nextjs "lovable.dev") — Lovable moved nearly 400 routes and more than 850K lines of code off a Next.js app running on Vercel onto TanStack Start on its own platform. The heart of the story is how they ran _both_ frameworks in parallel behind a proxy, with a shared folder of code between them.

Alexander Lebedev (Lovable)

[What We Learnt Building a Data Grid in React, Vue, and Svelte](https://svar.dev/blog/building-data-grid-in-react-vue-svelte/ "svar.dev") — SVAR ships the same data grid for React, Vue and Svelte, so they know how frameworks differ. But do those differences affect performance? Barely. No winner is declared, as _"the expensive parts of a fast data grid turned out to be almost entirely framework-independent."_

Maksim Kozhukh (SVAR)

**IN BRIEF:**

-   ⚠️ [Two critical unauthenticated RCEs affecting Next.js have been patched.](https://nextjs.org/blog/august-2026-security-release) Update to 16.3.3 or 15.5.24, as appropriate.
    
-   React's [_Canary_](https://react.dev/community/versioning-policy#canary-channel) channel has [a `browser()` API](https://react.dev/reference/react-dom/browser) for components that can't render on the server. `use(browser())` stops server rendering that component, leaves the nearest <`Suspense`\> fallback in its place, then renders as normal in the browser.
    
-   [Parallel transitions are now on by default](https://github.com/react/react/pull/37290) in Canary builds, React Native included. Already in production at Meta and may make it into React 19.3. If you're unfamiliar with the concept, [learn more about them here](https://github.com/react/react/pull/35392).
    

[Reliable Query Prefetching with TanStack Router](https://tkdodo.eu/blog/reliable-query-prefetching-with-tanstack-router "tkdodo.eu") — Prefetch in a loader and you're writing the query twice, and those copies can drift over time. Dominik's fix puts `queryOptions` in route context so the loader and component use the same definition, and sub-routes get them too.

Dominik Dorfmeister

🛠  Code, Tools & Libraries

[Oxlint Gets React Compiler Support](https://oxc.rs/blog/2026-08-18-react-compiler-support "oxc.rs") — [Oxlint](https://oxc.rs/docs/guide/usage/linter) now includes 22 rules that run React Compiler's own validation passes to catch [Rules of React](https://react.dev/reference/rules) violations. Oxc also ships a package that applies the automatic memoization itself, which it claims can be over 10 times faster than the Babel plugin.

Boshen (Oxc)

-   📱 [Ionic Framework v9](https://ionic.io/blog/announcing-ionic-framework-9) – The mobile-first UI toolkit for React, Angular and Vue returns after a two-year gap with React Router 6 support and more. There's [an upgrade guide for v8 users](https://ionicframework.com/docs/updating/9-0).
    
-   [GTKX 1.5](https://gtkx.dev/blog/gtkx-1-5) – Create native GTK-powered Linux desktop apps with React. Now with an adapter to connect React Hook Form to native Adwaita controls.
    
-   [Streamdown 2.6](https://github.com/vercel/streamdown/releases/tag/streamdown%402.6.0) – Vercel's replacement for `react-markdown` focused on AI-powered streaming of Markdown content. ([Homepage](https://streamdown.ai/).)
    
-   [react-jsonschema-form 6.8](https://github.com/rjsf-team/react-jsonschema-form) – Component for declaratively building web forms using JSON Schema. ([Playground](https://rjsf-team.github.io/react-jsonschema-form/).)
    
-   [nuqs 2.10](https://github.com/47ng/nuqs) – Type-safe search params state manager. Like `useState`, but stored in the URL query string.
    
-   [Material UI 9.4](https://github.com/mui/material-ui/releases/tag/v9.4.0) – Comprehensive React component suite.
    

📰 Classifieds

🌌 Ever heard a React talk in a planetarium? React Summit US, 4th edition: Nov 17 & 20, New York & Online. [Reserve your spot!](https://reactsummit.us/?utm_source=partner&utm_medium=reactstatus)

* * *

Meet [chat.agent on Trigger.dev](https://fandf.co/3Sq6so6): durable AI agents built with the AI SDK you already use. Long-lived LLM sessions that survive deploys, crashes & refreshes.

💬  The Next.js team answered your questions

The Next.js team spent a morning on Reddit's `r/nextjs` [answering user-submitted questions](https://www.reddit.com/r/nextjs/comments/1vrq0tp/were_the_nextjs_team_ask_us_anything/) on Next.js 16.3, the App Router, RSC, caching and upgrades. A few responses are worth a closer look:

-   [Why no 'proper middleware' or GET Server Actions?](https://www.reddit.com/r/nextjs/comments/1vrq0tp/comment/p4feoa5/) – The thread's top-voted question asks why TanStack Start has both and Next.js neither. Pete Hunt
    
-   ['I agree that it has gotten more complicated over the years'](https://www.reddit.com/r/nextjs/comments/1vrq0tp/comment/p4fu9st/) – Told Next.js is an overengineered mess and that RSC made it an "architectural disaster", Pete concedes the complexity but considers the latter claim unfair. Pete Hunt
    
-   [Built-in pagination and infinite loading?](https://www.reddit.com/r/nextjs/comments/1vrq0tp/comment/p4f7pqj/) – "We're working on it", with no details yet. In the meantime, Andrew suggests [SWR](https://vercel.com/oss/swr) or TanStack Query. Andrew Clark
    
-   [What the team is most excited about next](https://www.reddit.com/r/nextjs/comments/1vrq0tp/comment/p4fqlki/) – Primitives for fetching data outside navigations, static-aware primitives for feature flags and experiments, and Fragment refs and View Transitions going stable in React 19.3. Sam, Aurora and Joseph
    
-   ['TanStack Start is pretty good too'](https://www.reddit.com/r/nextjs/comments/1vrq0tp/comment/p4fl9ah/) – When a reader is told to just switch frameworks, Pete's reply is disarming: _"Hey that's not very nice! TanStack Start is pretty good too though and their new branding is great."_ Pete Hunt
    

_(Apologies if any of the links above demand a Reddit login. Apparently they are starting to do that more often now.)_

It'd be neat if the core React team did one of these sometime – the React Native team [did one a decade ago](https://www.reddit.com/r/IAmA/comments/3wyb3m/we_are_the_team_working_on_react_native_ask_us/) that was very popular.