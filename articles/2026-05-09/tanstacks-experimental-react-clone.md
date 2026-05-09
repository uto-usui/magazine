---
title: "TanStack's experimental React clone"
source: "https://react.statuscode.com/issues/473"
publishedDate: "2026-05-08"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/tepcqb9rqsjymbgvkat4.jpg)](https://tannerlinsley.com/posts/projecting-react)

[Projecting React](https://tannerlinsley.com/posts/projecting-react "tannerlinsley.com") — Tanner Linsley (he of [TanStack](https://tanstack.com/)) spent a day prompting an AI agent to regenerate React’s public API as a ~9KB runtime scoped to TanStack Start, and quietly shipped it on his blog and [tanstack.com](https://tanstack.com/), where it runs at 2–3× the speed of stock React. But the most interesting part is why he _isn’t_ properly releasing it (though [it _is_ on npm](https://www.npmjs.com/package/@tanstack/redact) if you're curious).

Tanner Linsley

💡 It's also noteworthy that Tanner didn't find [Preact](https://preactjs.com/) to be a good, lighter 'drop-in' replacement for React due to its slow drift away over the years.

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/a3a92880.png)](https://www.meticulous.ai/?utm_source=reactstatus&utm_medium=newsletter&utm_campaign=26q2&utm_content=primary)

[Still Writing Tests Manually? Meticulous AI Is Here](https://www.meticulous.ai/?utm_source=reactstatus&utm_medium=newsletter&utm_campaign=26q2&utm_content=primary "www.meticulous.ai") — Notion, Dropbox, Wiz and LaunchDarkly now use a testing paradigm they can’t work without. Built by former Palantir engineers, Meticulous automatically creates an evolving suite of E2E UI tests, delivering exhaustive coverage with no developer effort.

Meticulous

**IN BRIEF:**

-   📱 [Expo SDK 56 Beta is now available](https://expo.dev/changelog/sdk-56-beta). Speed and stability are the highlights, with much faster iOS builds, faster Android app startup times, and the Jetpack Compose (Android) and SwiftUI (iOS) APIs in Expo UI are stable.
    
-   🤖 Vercel has [open sourced `deepsec`](https://vercel.com/blog/introducing-deepsec-find-and-fix-vulnerabilities-in-your-code-base), a security harness for LLMs to perform security vulnerability scans on large repos.
    
-   [React Router v7.15.0](https://reactrouter.com/changelog#v7150) has been released with a variety of API tweaks to prepare for a React Router v8 release _'in the next month or two.'_
    

[Introducing TanStack Form](https://frontendmasters.com/blog/introducing-tanstack-form/ "frontendmasters.com") — A clean introduction to TanStack Form, walking through the headless-architecture mental model: state and validation in TanStack's hands, rendering entirely in yours.

Adam Rackis

🏖️ [What I Saw at React Miami 2026](https://brookslybrand.com/posts/react-miami-2026.html) – React Router, Remix, and the use of AI all popped up as common topics. Brooks Lybrand

📄 [Who Owns the Tree? RSC as a Protocol, Not an Architecture](https://tanstack.com/blog/who-owns-the-tree) Tanner Linsley

📄 [Untangling Dialogs in React Router](https://programmingarehard.com/2026/05/06/react-router-dialogs.html/) David Adams

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/yqozacdvsrttjzp6ihvy.jpg)](https://maplibre.org/maplibre-react-native/)

[shadcn CLI 4.7: Package Imports and Registry Target Aliases](https://ui.shadcn.com/docs/changelog/2026-05-package-imports-target-aliases "ui.shadcn.com") — Now supports `package.json#imports` for installing components, rewriting imports, and resolving third-party registries. Registry items also gain `files[].target` aliases for when you want a registry to drop components into specific folders.

shadcn / Vercel

-   [html-react-parser 6.1](https://github.com/remarkablemark/html-react-parser) – HTML to React parser that converts HTML strings into React elements. v6.1 adds Content Security Policy (CSP) support.
    
-   [Jotai 2.20.0](https://github.com/pmndrs/jotai/releases/tag/v2.20.0) – The primitive, flexible state management solution for React _"improves performance in high-throughput scenarios"_.
    
-   [Classicy 0.9](https://classicy.ing/) – React component collection with a classic Mac OS-inspired retro style.
    

📰 Classifieds

⚡[Nimbalyst](https://nimbalyst.com/?utm_source=cooperpress&utm_medium=newsletter&utm_campaign=react-status&utm_content=primary-apr14-2026): Visual workspace for building with Claude Code & Codex. Integrate and manage sessions, tasks & files. Visually edit markdown, mockups, diagrams, code.

* * *

📸 Scan barcodes, QR codes and others directly in the browser using [STRICH](https://strich.io/?ref=react-status), a lean JS library. [Free 30-day trial, try the demo app today!](https://strich.io/?ref=react-status)

📢  Elsewhere in the ecosystem

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/ck46oncyiofoth467qvt.jpg)](https://nodejs.org/en/blog/release/v26.0.0)

-   It's been a big week for Node.js with [Node.js 26.0 (Current)](https://nodejs.org/en/blog/release/v26.0.0) landing with the [Temporal API](https://bloomberg.github.io/js-blog/post/temporal/) enabled by default and a variety of V8 14.6 enhancements, but also [Node 26.1 (Current)](https://nodejs.org/en/blog/release/v26.1.0) with an experimental core FFI mechanism.
    
-   _Rolldown_, the high-performance bundler, [reached a stable v1.0 release.](https://voidzero.dev/posts/announcing-rolldown-1-0) It focuses on speed and Rollup plugin compatibility.
    
-   [Vitest](https://vitest.dev/) is tightly coupled to Vite, but a maintainer has [proposed making it "framework-agnostic"](https://github.com/vitest-dev/vitest/discussions/10271) to support other build tools and runtimes.
    
-   As part of the [Astro 6.2](https://astro.build/blog/astro-620/) release, the popular web framework for content sites teased [Astro v7 Alpha](https://astro.build/blog/astro-620/#astro-v7-alpha), its next Vite 8-based, Rust compiler-driven version. [Astro 6.3](https://astro.build/blog/astro-630/) also landed shortly after with a new, experimental 'advanced routing' feature for better integration with alternative runtimes and frameworks like [Hono](https://hono.dev/).