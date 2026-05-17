---
title: "A candid interview with Tanner Linsley"
source: "https://react.statuscode.com/issues/474"
publishedDate: "2026-05-15"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/izessnsy7oyohprp3lh0.jpg)](https://github.blog/engineering/architecture-optimization/from-latency-to-instant-modernizing-github-issues-navigation-performance/)

[From Latency to Instant: Improving _GitHub Issues_ Navigation Performance](https://github.blog/engineering/architecture-optimization/from-latency-to-instant-modernizing-github-issues-navigation-performance/ "github.blog") — GitHub rebuilt issue navigation around a local-first, stale-while-revalidate model: render from an IndexedDB cache, revalidate in the background. ~70% of React navigations are now instant & P10 down from 600ms to 70ms. A deep account of the caching & prefetch design on GitHub's React/Rails stack.

Alexander Lelidis (GitHub)

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/0dd4c496.png)](https://frontendmasters.com/courses/enterprise-ui-dev-v2/?utm_source=email&utm_medium=reactstatus&utm_content=uidevv2)

[Microfrontends, Monoliths, & Monorepos](https://frontendmasters.com/courses/enterprise-ui-dev-v2/?utm_source=email&utm_medium=reactstatus&utm_content=uidevv2 "frontendmasters.com") — Discover how to architect large, successful frontend systems in this detailed video course, hosted by Steve Kinney. Learn best practices for maintaining complex codebases while shipping high-quality software.

Frontend Masters

[A Technical Deep Dive Into the New Raycast](https://www.raycast.com/blog/a-technical-deep-dive-into-the-new-raycast "www.raycast.com") — [Raycast](https://www.raycast.com/) is a feature-rich macOS launcher app (imagine Spotlight but 10x) which has long had a React-based extension ecosystem, but now its new v2.0 app has a React frontend too.

Nikolaev and Mann (Raycast)

📄 [Security in React Applications](https://certificates.dev/blog/security-in-react-applications) – High-level tips and techniques for securing React apps. Aurora Scharff

📄 [RSC Server Functions Are Not An API Boundary](https://longho.dev/posts/rsc-server-functions-are-not-an-api-boundary/) Long Ho

📄 [The Hidden Cost of <Activity>](https://www.peterp.me/articles/hidden-cost-of-react-activity/) Peter Piekarczyk

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/tze0hinzt0gj9fqfqi3w.jpg)](https://mdxeditor.dev/)

[Fate 1.0: A Modern Data Framework for React](https://fate.technology/posts/fate-1.0 "fate.technology") — A new data framework from former Jest lead and ex-Meta engineer Christoph Nakazawa. Brings normalized caching, view co-location, and single-root-request composition on top of tRPC or native HTTP, with Prisma and now Drizzle support on the server. 1.0 adds live views over SSE, garbage collection, and a Vite plugin.

Christoph Nakazawa

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/r23bo3hkjgsxml3auhl2.jpg)](https://github.com/mantinedev/mantine/releases/tag/9.2.0)

-   [Mantine 9.2](https://github.com/mantinedev/mantine/releases/tag/9.2.0) – The popular component suite adds [TreeSelect](https://mantine.dev/core/tree-select/) _(above)_ for selecting hierarchical tree data, the dropdown-free [InlineDateTimePicker](https://mantine.dev/dates/inline-date-time-picker/), [RollingNumber](https://mantine.dev/core/rolling-number/) to animate value changes, a new `use-drag` hook, and more.
    
-   ⭐ [Waku 1.0 Beta](https://waku.gg/blog/waku-v1-beta) – The minimal React Server Components framework built atop Vite and Hono.
    
-   [whisper.rn 0.6](https://github.com/mybigday/whisper.rn) – React Native bindings to `whisper.cpp` for fast, on-device speech transcription.
    
-   [Ant Design 6.4.0](https://github.com/ant-design/ant-design/releases/tag/6.4.0) – Enterprise-class UI design language & component library.
    
-   [react-native-view-shot 5.1](https://github.com/gre/react-native-view-shot) – Capture a React Native view to an image.
    
-   [react-qr-scanner 2.6](https://github.com/yudielcurbelo/react-qr-scanner) – Scan QR codes in React apps.
    
-   [styled-components v7 Alpha](https://styled-components.com/docs/v7)
    

📰 Classifieds

Flaky tests slowing down dev? [Meticulous](https://www.meticulous.ai/?utm_source=reactstatus&utm_medium=newsletter&utm_campaign=26q2&utm_content=classified) gives engineers confidence to ship faster by autonomously testing every edge case of your web app.

* * *

🔐 [Clerk Directory Sync is now GA](https://go.clerk.com/ybGGI2q). Changes in Okta or Entra ID sync automatically to your app — no manual account management. Custom attribute mapping and IdP group-to-role assignment included.

* * *

[Trigger.dev](https://fandf.co/4nsnQnt) handles queues, retries, and long-running tasks so you can build production-ready agents and TypeScript workflows reliably at scale.

📢  Elsewhere in the ecosystem

-   🤖 Redux maintainer Mark Erikson goes deep with [his personal thoughts and experiences on the use of AI](https://blog.isquaredsoftware.com/2026/05/ai-thoughts-part-1-fears-opinions-journey/) in software development.
    
-   Daishi Kato shares [a brief update on Jotai](https://newsletter.daishikato.com/p/jotai-v2-20-0-and-the-store-building-blocks) ([v2.20.0](https://github.com/pmndrs/jotai/releases/tag/v2.20.0) was released last week) and says he's ready to start thinking about Jotai v3.
    
-   🤖 [TanStack AI](https://tanstack.com/ai/latest), the cross-provider AI SDK, [can now _stream_ typed structured output](https://tanstack.com/blog/streaming-structured-output) with a Zod schema.
    
-   [zero-native](https://zero-native.dev/) is Vercel's entry into the ecosystem of frameworks for building native JS desktop apps. It sits atop a Zig core and lets you pick between the system WebView or Chromium. There are [examples](https://github.com/vercel-labs/zero-native/tree/main/examples) covering how to build vanilla, React, Svelte, and Vue apps on top of it.
    
-   Luciano Mammino looks at [what's new in Node 26.0](https://nodejsdesignpatterns.com/blog/whats-new-in-nodejs-26/).