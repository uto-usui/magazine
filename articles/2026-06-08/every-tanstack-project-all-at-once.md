---
title: "Every TanStack project all at once"
source: "https://react.statuscode.com/issues/477"
publishedDate: "2026-06-05"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/ezbozrzpomsqiyxqrqs6.jpg)](https://performance.dev/the-conductor-rewrite)

[The Conductor Rewrite: What They Changed to Make It Fast](https://performance.dev/the-conductor-rewrite "performance.dev") — A founder interview turned React performance teardown on how [Conductor](https://www.conductor.build/), a Mac app for coordinating coding agents, got 2x faster. It walks through a re-render trap, routing choices, and virtualization work on its chat view that added up to the win. I loved seeing the entire stack listed out too.

Dennis Brotzky

💡 The author previously did [a similar breakdown of Linear](https://performance.dev/how-is-linear-so-fast-a-technical-breakdown).

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/a26f6648.jpg)](https://blog.sentry.io/nextjs-supabase-observability/?utm_source=reactstatus&utm_medium=paid-community&utm_campaign=nextjs-fy27q2-evergreen&utm_content=newsletter-primary-supabase-nextjs-blog-learnmore)

[Next.js + Supabase: Catch N+1 Queries Before Users Do](https://blog.sentry.io/nextjs-supabase-observability/?utm_source=reactstatus&utm_medium=paid-community&utm_campaign=nextjs-fy27q2-evergreen&utm_content=newsletter-primary-supabase-nextjs-blog-learnmore "blog.sentry.io") — Learn how you can use one trace from your Next.js page load through the API route, into the Edge Function, down to the Postgres query. Auto-detect N+1 queries, drain Supabase logs into Sentry, and let Seer suggest fixes for new issues.

Sentry

**IN BRIEF:**

-   [React 19.2.7](https://github.com/facebook/react/releases/tag/v19.2.7), [19.1.8](https://github.com/facebook/react/releases/tag/v19.1.8) and [19.0.7](https://github.com/facebook/react/releases/tag/v19.0.7) have been released to fix a regression in Server Actions.
    
-   Lovable, a popular AI-powered site builder, has [switched to TanStack Start by default](https://lovable.dev/blog/building-apps-using-tanstack-start) for all its AIuser-created apps, and explains why.
    
-   In two new releases this week, `shadcn/ui` has added [an `eject` command](https://ui.shadcn.com/docs/cli#eject) to inline shadcn's Tailwind code into your own CSS, and the ability to [use public GitHub repos as registries](https://ui.shadcn.com/docs/registry/github).
    
-   🔒 There are new versions of React Router v7 (7.16.0), v6 (6.30.4) and Remix 2 (2.17.5) to fix [seven vulnerabilities](https://github.com/remix-run/react-router/security/advisories).
    
-   [VoidZero](https://voidzero.dev/), the company behind Vite, Vitest, Rolldown, Oxc, and Vite+, [is joining Cloudflare.](https://blog.cloudflare.com/voidzero-joins-cloudflare/)
    

▶  [All 17 TanStack Projects in One App](https://www.youtube.com/watch?v=J4kzovOTNKw "www.youtube.com") — [TanStack](https://tanstack.com/) now offers a huge suite of projects and libraries (Start, Form, Router, etc.) and this is a surprisingly good way to see what they all do in just 14 minutes.

Jack Herrington

📄 [Component Architecture for React Server Components](https://aurorascharff.no/posts/component-architecture-for-react-server-components/) – An exploration of how RSCs let you improve your page architecture. Aurora Scharff

📄 [Things I Learned While Building Expo](https://evanbacon.dev/blog/expo) – Evan’s been at Expo since the early days and created Expo Router, but he’s now leaving. Evan Bacon

📄 [How We Cut Build Times by Two-Thirds by Deleting Our CMS](https://blog.sentry.io/cut-build-times-delete-cms/) – A Gatsby to Astro migration. Eli Lennox (Sentry)

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/qunwaqog39wgicotatxq.jpg)](https://react-spectrum.adobe.com/releases/v1-4-0)

-   [Mantine 9.3](https://mantine.dev/changelog/9-3-0/) – The huge component suite adds a responsive layout option for pagination, text-wrap controls, a hook for resizable split-panes, a way to create in-situ context menus, and more.
    
-   [Constate 4.0](https://github.com/diegohaz/constate) – Local state manager that uses hooks and Context. Now ESM-only.
    
-   [React Gantt 2.7](https://github.com/svar-widgets/react-gantt) – A component for the popular timeline visualization approach.
    
-   [Ink 7.0.5](https://github.com/vadimdemedes/ink) – A bug fix release for the popular React TUI renderer.
    
-   [MUI X 9.4](https://github.com/mui/mui-x/releases/tag/v9.4.0), [pnpm 11.5](https://pnpm.io/blog/releases/11.5), [React Email 6.5](https://github.com/resend/react-email/releases/tag/react-email%406.5.0)
    

📰 Classifieds

Flaky tests slowing down dev? [Meticulous](https://www.meticulous.ai/?utm_source=reactstatus&utm_medium=newsletter&utm_campaign=26q2&utm_content=classified) gives engineers confidence to ship faster by autonomously testing every edge case of your web app.

📡  And one for the future..

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/ihrldmlx7alp5tnnoja6.jpg)](https://github.com/AndrewPrifer/liquid-dom)

[Liquid DOM: _Liquid Glass_ for the Web](https://github.com/AndrewPrifer/liquid-dom "github.com") — A striking implementation of Apple-style ‘liquid glass’, with React bindings. You need WebGPU and the experimental [HTML-in-Canvas API](https://developer.chrome.com/blog/html-in-canvas-origin-trial) enabled to get the most from it, but it’s a neat look into the (near) future of browser capabilities.

Andrew Prifer