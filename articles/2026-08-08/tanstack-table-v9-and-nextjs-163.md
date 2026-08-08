---
title: "TanStack Table v9 and Next.js 16.3"
source: "https://react.statuscode.com/issues/486"
publishedDate: "2026-08-07"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/tdvf8n2ypodcj3csupni.jpg)](https://tanstack.com/blog/announcing-tanstack-table-v9)

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/479adce5.png)](https://coderabbit.link/ad-cooperpress-001)

[Code Review That Learns How Your Team Ships](https://coderabbit.link/ad-cooperpress-001 "coderabbit.link") — Reply to CodeRabbit in plain English and it remembers, turning your standards into learnings applied to every future PR. Path-based rules, AST instructions and 40+ linters, minus the false-positive noise. Same bar for every PR.

CodeRabbit

💡 Vercel has put together [a guide to its support for Next.js 16.3](https://vercel.com/blog/vercel-supports-next-js-16-3) and the efficiency gains seen from its new features.

**IN BRIEF:**

-   Upgraded to [React Router v8](https://remix.run/blog/react-router-v8) yet? [React Router v9 is now under discussion](https://github.com/remix-run/react-router/discussions/15371) and you're invited to comment with questions or changes you'd like to see.
    
-   🇪🇸 [React Alicante](https://reactalicante.es/) takes place this September 24-26 in Spain. Mark Erikson, Aurora Scharff, Dominik Dorfmeister, and Matteo Collina are on the speaker list.
    
-   shadcn has added [a new `Questionnaire` component](https://ui.shadcn.com/docs/components/base/questionnaire) (in Base UI, React Aria, and Radix UI flavors) for rendering multi-step questionnaires.
    
-   🇩🇪 [reactCon](https://www.nextappcon.com/reactcon) is a React Native conference taking place in Berlin, October 7-9.
    

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/rk6mx0cvwj0ccpzqec7o.jpg)](https://platejs.org/)

🤖 [use-webmcp-tool: A Hook for Using WebMCP](https://github.com/GoogleChromeLabs/use-webmcp-tool "github.com") — [WebMCP](https://developer.chrome.com/docs/ai/webmcp) is a proposed web standard for exposing page-based JavaScript functions for AI agents to use. This hook wraps its usual imperative API for React's declarative approach.

Sarah Drasner (Google Chrome Labs)

-   [SWR 2.5](https://swr.vercel.app/) – A minimal hook-based data fetching mechanism with caching, revalidation and deduplication. [v2.5](https://github.com/vercel/swr/releases/tag/v2.5.0) adds RSC cache preloading and an `unload()` API to clear the cache and discard in-flight operations.
    
-   [React Aria 1.20](https://react-aria.adobe.com/releases/v1-20-0) – Adobe's popular component suite adds new `PreviewTrigger` and `TokenField` components.
    
-   [react-dropzone 20.0](https://react-dropzone.js.org/) – React hook providing a standards-compliant drag-and-drop zone for files. Now requires Node 22+. ([Examples](https://react-dropzone.js.org/examples/basic))
    
-   [Base UI 1.7](https://base-ui.com/react/overview/releases/v1-7-0) – The unstyled UI component library that's [shadcn/ui's new default](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default).
    
-   [Astryx 0.3](https://github.com/facebook/astryx/releases/tag/v0.3.0) – Meta's React and StyleX-based design system. ([Homepage](https://astryx.atmeta.com/))
    
-   [Material UI 9.3](https://github.com/mui/material-ui/releases/tag/v9.3.0) – Popular, comprehensive suite of React components.
    
-   [react-hcaptcha 2.1](https://github.com/hCaptcha/react-hcaptcha) – Component for the reCAPTCHA alternative.
    
-   [React Three Fiber 9.7](https://github.com/pmndrs/react-three-fiber/releases/tag/v9.7.0) – React renderer for Three.js.
    

📢  Elsewhere in the ecosystem

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/bxe6plfkpetnok8vflch.jpg)](https://flueframework.com/blog/flue-2/)

-   🤖 Fred K. Schott, of [Astro](https://astro.build/) fame, has [unveiled Flue 2.0](https://flueframework.com/blog/flue-2/), the latest version of his TypeScript-based open agent framework. The novel addition is using React-style hooks (called Agent Hooks – _see above_) to build dynamic agents that manage their own state.
    
-   Talking of Astro, [Astro 7.2 has been released](https://astro.build/blog/astro-720/) with experimental incremental static build support (skipping the regeneration of prerendered pages which haven't changed since the last build).
    
-   ⚠️ Earlier this week, [the `keyv` package was compromised by attackers](https://www.aikido.dev/blog/keyv-and-friends-compromised-in-npm-supply-chain-attack) who injected a credential-stealing worm which spread across [400+ other packages](https://github.com/wiz-sec-public/wiz-research-iocs/blob/main/reports/keyv-packages.csv) so far.