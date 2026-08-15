---
title: "The Next.js team is doing a Reddit AMA"
source: "https://react.statuscode.com/issues/487"
publishedDate: "2026-08-14"
category: "frontend"
feedName: "React Status"
---

🗓️ We're taking a break next week, so we're back in your inbox on August 28.  
\_\_  
_Your editor, Peter Cooper_

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/gtnjd4ymausiuh6vt3lz.jpg)](https://tanstack.com/blog/announcing-tanstack-form-v2-alpha)

[A Tour of TanStack Form v2: Now in Alpha](https://tanstack.com/blog/announcing-tanstack-form-v2-alpha "tanstack.com") — The headless form library has been rebuilt from the ground up after a year of v1 feedback. The big change is validation: instead of one handler per event, validators become a pipeline where each declares its own triggers and conditions. Type safety and SSR improve too.

Luca Jakob (TanStack)

[React Native 0.87 Released](https://reactnative.dev/blog/2026/08/11/react-native-0.87 "reactnative.dev") — Its public JavaScript API is now the _[Strict TypeScript API](https://reactnative.dev/docs/strict-typescript-api)_ with types generated from RN's source. [Metro](https://reactnative.dev/docs/metro) bumps to the leaner v0.87, and there's (experimental) Swift Package Manager support for iOS.

Peng, Cucci, Dall'Agnol, and Falch

[Migrating a Large Flow Monorepo to TypeScript](https://engineeringblog.yelp.com/2026/08/migrating-a-large-flow-monorepo-to-typescript.html "engineeringblog.yelp.com") — Yelp picked Flow in 2017 as it handled React better than TypeScript did. A fair call at the time, but undoing that took years of converting hundreds of packages and 1.4 million lines of code, with both typecheckers running the whole time.

Shawn Walton (Yelp)

**IN BRIEF:**

-   👥 The Next.js team (now including Dan Abramov and Pete Hunt) is doing an AMA (Ask Me Anything) on Reddit this coming Tuesday (August 18). You can [post your questions on this thread](https://www.reddit.com/r/nextjs/comments/1vnlcsk/were_the_nextjs_team_ask_us_anything/) in advance.
    
-   [Biome 2.5.8](https://github.com/biomejs/biome/releases/tag/%40biomejs%2Fbiome%402.5.8) is out with a new [`useReactCompiler` rule](https://biomejs.dev/linter/rules/use-react-compiler/) that runs React Compiler in lint mode and reports which components and hooks wouldn't compile safely (effectively a 'dry run' before you enable the compiler).
    
-   🇫🇷 [React Native Connection](https://reactnativeconnection.io/), the French React Native conference, returns to Paris on September 24.
    

[Making Navigations Instant in v0](https://nextjs.org/blog/making-v0-navigations-instant "nextjs.org") — Next.js 16.3 includes an `instant()` test helper for Playwright that asserts what is painted before the network responds. Vercel looped an agent against it to speed up its AI app builder, [v0](https://v0.app/).

Jude Gao (Next.js Team)

▶  [Own the RSC Pipeline: Cache and Compose It Yourself](https://www.youtube.com/watch?v=6lSH1-ytd7E "www.youtube.com") — RSC is a primitive, not an architecture, argues the contributor behind TanStack Start's implementation. It's two React functions and a stream, so you can cache it, and even take it offline. _(18 minutes.)_

Manuel Schiller

[Making Referential Stability a Type](https://www.jovidecroock.com/blog/referential-stability-types/ "www.jovidecroock.com") — Jovi, of the Preact core team, turns referential stability into a branded type, so a component can demand a stable array or callback and `tsc` rejects the inline literal. Experimental.

Jovi De Croock

📄 [Scanning Barcodes in React Native Apps](https://margelo.com/blog/react-native-barcode-scanner) – A pleasantly thorough roundup of the options from the creator of VisionCamera. Marc Rousavy

📺 [React Native Tools That Actually Save Me Time](https://www.youtube.com/watch?v=PypMPaW0wu4) Simon Grimm

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/pll76rbdbs9pumnj7csz.jpg)](https://gtkx.dev/blog/gtkx-1-0)

[GTKX 1.0: The React Framework for Linux](https://gtkx.dev/blog/gtkx-1-0 "gtkx.dev") — A way to build native Linux desktop apps with React. Write JSX, get real GTK4 and Adwaita widgets with no webview, in an ordinary Node process with npm packages and even Fast Refresh support.

Eugenio Depalo

💡 1.0 is the big release, but [GTKX 1.1](https://gtkx.dev/blog/gtkx-1-1) landed just after with a `gtkx deploy` command that produces a distributable Flatpak, `.deb`/`.rpm` and AppImage in one go.

[kbar 1.0: A Cmd+K Interface for React Apps](https://kbar.vercel.app/ "kbar.vercel.app") — After five years of betas, this simple way to add in-page commands and search now fully supports React 18 and 19. You can try it out right on the page too.

Tim Chang

-   [React Hook Form 7.85.0](https://github.com/react-hook-form/react-hook-form/releases/tag/v7.85.0) – Adds support for React 19.2's <`Activity`\>.
    
-   [Motion 13.1](https://motion.dev/changelog) – The animation library's Reorder component gains multidimensional reordering, axis detection, and RTL support.
    
-   [Next.js 16.3.1](https://github.com/vercel/next.js/releases/tag/v16.3.1) – Cleans up some elements of the [16.3 release](https://nextjs.org/blog/next-16-3) like repeated prefetch loops, cache entries being discarded too eagerly after a tag revalidation, and `headers()` returning a stale view of the request.
    
-   [Sonner 2.0.8](https://github.com/emilkowalski/sonner/releases/tag/v2.0.8) – The first release in over a year for the popular toast component ([demo](https://sonner.emilkowal.ski/)).
    

📰 Classifieds

🎤 Dive deep into React in the heart of London. [Join React Advanced](https://reactadvanced.com/?utm_source=partner&utm_medium=reactstatus): 2 days of talks & workshops for senior React engineers. Oct 23 & 26.

* * *

Meet [chat.agent on Trigger.dev](https://fandf.co/4clejtQ): durable AI agents built with the AI SDK you already use. Long-lived LLM sessions that survive deploys, crashes & refreshes.

* * *

📉 Cold launch, time to interactive and per-route timings from real users, tied to the build that changed them: [Expo Observe](https://try.expo.dev/observe-react-status).

And that's a wrap! We'll see you again on Friday, August 28! 👋

_P.S. A huge thanks to everyone who's sent in submissions lately. There have been so many that I've fallen well behind, but every email gets read and I'll catch up on my return :-)_