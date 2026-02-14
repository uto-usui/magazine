---
title: "Building bulletproof React components and handling billion-row tables"
source: "https://react.statuscode.com/issues/462"
publishedDate: "2026-02-13"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/xwgdmp5juj69nmnjhfgj.jpg)](https://2025.stateofreact.com/en-US)

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/2a531980.png)](https://frontendmasters.com/courses/javascript-hard-parts-v3/?utm_source=email&utm_medium=reactstatus&utm_content=jshardpartsv3)

[The Most Loved JavaScript Course Year After Year](https://frontendmasters.com/courses/javascript-hard-parts-v3/?utm_source=email&utm_medium=reactstatus&utm_content=jshardpartsv3 "frontendmasters.com") — JavaScript: The Hard Parts is rated 4.92 on average by thousands of developers. Build real mental models for how JavaScript works, from execution context and closures to async behavior and modern language features.

Frontend Masters

[Building Bulletproof React Components](https://shud.in/thoughts/build-bulletproof-react-components "shud.in") — Ten production-tested patterns to ensure your components survive the gauntlet of portals, transitions, hydration, being used server-side, and other modern React features. An elegant, no-nonsense guide from the co-creator of [SWR](https://swr.vercel.app/) and creator of Vercel’s [React Best Practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) skill.

Shu Ding

**IN BRIEF:**

-   [TypeScript 6.0 is now in beta.](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0-beta/) It acts as a bridge to the eventual Go-based TypeScript 7, but packs in a few changes that could trip you up.
    
-   [ESLint v10.0 is out](https://eslint.org/blog/2026/02/eslint-v10.0.0-released/) and now tracks JSX references, enabling correct scope analysis of JSX elements.
    
-   [Bun v1.3.9](https://bun.sh/blog/bun-v1.3.9) has been released with a faster, [more efficient `Bun.markdown.react()`](https://bun.sh/blog/bun-v1.3.9#faster-bun-markdown-react).
    
-   ✏️ Rick Hanlon is [working on an extensive rewrite](https://github.com/reactjs/react.dev/pull/8284) of the `useActionState` docs. You can [see an early draft here.](https://github.com/rickhanlonii/react.dev/blob/58b6c16b63ce764e2545447239f2491ea45f7470/src/content/reference/react/useActionState.md)
    

[React Native 0.84: Now Hermes V1 by Default](https://reactnative.dev/blog/2026/02/11/react-native-0.84 "reactnative.dev") — Hermes V1 is now the default JS engine on iOS and Android, improving performance and reducing memory usage. iOS ships with precompiled binaries, cutting build times. Under the hood, everything now runs on React 19.2.3.

Hunt, Lee, et al.

[Implementing Virtual Scrolling at Billion-Row Scale](https://rednegra.net/blog/20260212-virtual-scroll/ "rednegra.net") — A technical walkthrough of building a table component ([HighTable](https://github.com/hyparam/hightable)) that handles billions of rows while deftly handling browser DOM limits, scrollbar precision problems, and accessibility constraints, coupled with plenty of diagrams and demos.

Sylvain Lesage

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/bar4sonl5hvlbqxk5mn9.jpg)](https://frankentui.com/web_react)

[FrankenTUI: Embed Terminal UIs in Any React Page](https://frankentui.com/web_react "frankentui.com") — [FrankenTUI](https://frankentui.com/) is a bold TUI framework and runtime built in Rust, and you can now bring FrankenTUI apps into React: _“Anywhere you’d embed a code editor, you can now embed a full terminal UI.”_ The [demo](https://frankentui.com/web) is rather mind-boggling; one of those projects where it’s hard to determine if it’s visionary or completely out-there (in a good way)!

Jeffrey Emanuel

[Tambo 1.0: A Generative UI Toolkit for React](https://tambo.co/blog/posts/introducing-tambo-generative-ui "tambo.co") — Give an agent your existing components and it picks and customizes the right ones for tasks users want to perform. It’s open source, but the project is backed by a commercial offering for the server-side part (you can self-host it for free). [GitHub repo.](https://github.com/tambo-ai/tambo)

Michael Milstead

💡 Vercel's [json-render](https://json-render.dev/) covers similar ground but at a lower level.

[Ink 6.7: Build Rich Terminal Apps with React](https://github.com/vadimdemedes/ink/releases/tag/v6.7.0 "github.com") — Ink, used by Claude Code, Gemini CLI, Gatsby, Prisma, et al., lets you use a component-based model for building terminal apps. v6.7 notably adds support for concurrent rendering and synchronized updates (less flicker!)

Vadim Demedes et al.

-   [Wasp 0.21.0](https://github.com/wasp-lang/wasp/releases/tag/v0.21.0) – Rails-like framework for React, Node.js, and Prisma. Now installable through `npm` and now using Tailwind CSS 4, Vitest 4, and React Router 7.
    
-   [Downshift 9.3](https://github.com/downshift-js/downshift) – Primitives to build WAI-ARIA compliant React autocomplete, combo box & select dropdown components.
    
-   [ReUI 2.0](https://reui.io/) – A suite of hundreds of React and Tailwind CSS UI components, patterns, and effects for `shadcn/ui` projects.
    
-   [Sentry React Native 8.0](https://github.com/getsentry/sentry-react-native/releases/tag/8.0.0) – Official Sentry SDK for React Native.
    
-   [Ant Design 6.3](https://github.com/ant-design/ant-design/releases/tag/6.3.0)
    

📢  Elsewhere in the ecosystem

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/hu0nhnzbxnpcr645v1de.jpg)](https://npmx.dev/compare?packages=zustand,jotai,valtio)

-   We're loving [npmx.dev](https://npmx.dev/) as a new, alternative way to browse packages in the official npm registry. It also provides a cool way to [quickly compare packages.](https://npmx.dev/compare?packages=zustand,jotai)
    
-   [How to Make an HTTP Request in Node.js](https://nodejsdesignpatterns.com/blog/nodejs-http-request/) covers a _lot_ of ground on using `fetch` productively, not just the basics.
    
-   📊 Data from over 100,000 sites was boiled down into [a report on modern CSS usage.](https://www.projectwallace.com/the-css-selection/2026) The median number of CSS rules per site was 2,802, with one page somehow using a whopping 210,695 rules.
    
-   [The _Windows XP_ experience, recreated with React!](https://react-xp.jamiepates.com/)