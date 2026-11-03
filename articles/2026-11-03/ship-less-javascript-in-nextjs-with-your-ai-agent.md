---
title: "Ship less JavaScript in Next.js with your AI agent"
source: "https://nextjs.org/blog/ship-less-javascript-with-ai"
publishedDate: "2026-10-28"
category: "frontend"
feedName: "Next.js Blog"
author: "Will Binns-Smith"
---

As codebases grow, subtle changes to where and how JavaScript modules import one another can drastically impact how quickly users load and experience your app. In Next.js 16.1, we shipped the initial version of the Turbopack Bundle Analyzer, giving developers insights into their app's JavaScript bundles.

Now, in Next.js 16.4, we're giving your AI agent the tools to investigate those relationships and optimize your bundles. At Vercel, agents have identified and cut nearly **two megabytes** of unnecessary compressed JavaScript across v0 and vercel.com, with many critical pages saving hundreds of kilobytes. Let's dive into how it works.

## [Copy link to heading](#bundle-analysis-now-for-agents)Bundle analysis, now for agents

Next.js now includes an agent skill to **automatically** optimize your app's JavaScript bundles. Since it uses its detailed module graph, the analyzer requires Turbopack, the default bundler since Next.js 16.

First, upgrade to Next.js 16.4 and add the [`next-bundle-optimizer`](https://www.skills.sh/vercel/next.js/next-bundle-optimizer) skill.

Then run the skill in your AI agent with `/next-bundle-optimizer`.

The skill gives your agent access to Turbopack’s module graph to uncover unexpected import relationships. Consider this attempt to defer a heavy component:

If HeavyComponentLoader is the only module importing `./HeavyComponent`, its code will be deferred. However, if **any other** module in the same bundle statically imports `./HeavyComponent`, **its code still loads upfront**.

To find issues like these, the skill guides the agent to export saved `next analyze` snapshots as JSON and reconstruct Turbopack's module and chunk graphs for querying. Export the graph data for your own tools with `next analyze export`.

The agent identifies large [groups of connected modules](https://en.wikipedia.org/wiki/Louvain_method) and determines their impact on the bundle. It traces their import chains and uses [minimum cut](https://en.wikipedia.org/wiki/Minimum_cut) to identify a small set of import boundaries that could defer those modules. It then checks the proposed changes against your source code and how the components are used interactively in your app.

The agent can also find and fix:

-   opportunities to move logic to React Server Components
-   duplicate versions of large dependencies
-   cases where tree shaking couldn't be applied and pulls in unused code

By default, the skill reports issues and suggested fixes. Run `/next-bundle-optimizer fix` to apply the proposed changes, rerun the analysis, and compare snapshots to measure their impact. Then ask your agent to open a pull request for each change.

### [Copy link to heading](#putting-the-agent-to-work-at-vercel)Putting the agent to work at Vercel

We used [`next-bundle-optimizer`](https://www.skills.sh/vercel/next.js/next-bundle-optimizer) to audit the [v0](https://v0.app/) frontend, as well as the frontend of [vercel.com](https://vercel.com/). The agent quickly identified opportunities to reduce compressed initial JavaScript across nearly every page.

In v0, the agent found:

-   an experimental code editor loaded eagerly on nearly every v0 page, including for users outside the experiment. Saved **150 KB** on most pages.
-   the app's centralized dialog registry eagerly loaded some heavy dialog components. Saved **40–650 KB** depending on the page.
-   an unused trace viewer component that was reachable by most route modules. Saved **7–61 KB** depending on the page.

and on vercel.com:

-   markdown rendering, syntax highlighting, and chart drawing for Vercel Agent were shipped even without the agent panel open. Saved **255 KB** on the dashboard page.
-   a heavy natural language date parsing library was eagerly loaded before users interacted with the assistant. Saved **55 KB** on average.
-   url parsing code was imported through a shared utility file that also pulled in the entire observability query engine. Saved **125 KB** on the deployments page.

In each case, we had the agent open a pull request, we verified the fix on a preview deployment, and shipped it.

In total, the agent has saved nearly two megabytes of compressed JavaScript across pages in our apps, either by eliminating it entirely, or deferring its loading until necessary.

## [Copy link to heading](#bundle-analysis-for-humans)Bundle analysis for humans

The interactive bundle analyzer now has new tools for exploring your app's bundles yourself. To launch the bundle analyzer, run `next analyze` in your Next.js app directory.

### [Copy link to heading](#find-your-largest-routes)Find your largest routes

A new route summary homepage highlights your largest client routes, giving you a starting point for investigating bundle size.

From there, open a route and sort the new table view by size to find its largest contributors.

/blog/\[slug\] · TableClient

Route resources, compressed size (estimated)

Behind async boundary

30.0 kB

components/code-block.tsxInitial load

22.0 kB

components/search.tsxInitial + async paths

18.0 kB

node\_modules/@example/blog-markdown/parser.jsBehind async boundary

14.0 kB

lib/client-runtime.tsInitial load

12.0 kB

components/related-posts.tsxInitial load

9.0 kB

lib/table-of-contents.tsInitial load

9.0 kB

app/blog/\[slug\]/page.tsxInitial load

6.0 kB

app/blog/layout.tsxInitial load

3.0 kB

Total · compressed (estimated)

123.0 kB

Sort sources by size; expand a package to inspect its modules. Illustrative blog app.

### [Copy link to heading](#compare-bundles-as-your-app-changes)Compare bundles as your app changes

The analyzer now automatically saves snapshots of the analyses you run. Diff them to measure an optimization’s impact or investigate bundle growth after a feature or dependency update.

/blog/\[slug\] · CompareClient

Total size123.0 kB → 81.0 kB−42.0 kB

Sources added0

Sources removed0

Sources changed6

Sources identical4

Scroll the table to compare all sizes →

Source changes between Original and Optimize rendering

↕ app/blog/layout.tsx

3.0 kB

7.0 kB

+4.0 kB

↕ components/related-posts.tsx

9.0 kB

5.0 kB

−4.0 kB

↕ lib/table-of-contents.ts

9.0 kB

3.0 kB

−6.0 kB

↕ node\_modules/@example/blog-markdown/parser.js

14.0 kB

6.0 kB

−8.0 kB

↕ components/code-block.tsx

22.0 kB

8.0 kB

−14.0 kB

↕ components/search.tsx

18.0 kB

4.0 kB

−14.0 kB

Total

123.0 kB

81.0 kB

−42.0 kB

Choose saved builds, then explore changes in the table or treemap. Illustrative blog app.

### [Copy link to heading](#focus-on-the-critical-render-path)Focus on the critical render path

The analyzer now highlights modules on the critical render path and lets you filter out async dependencies, leaving only the code that loads synchronously for the initial render.

/blog/\[slug\] · TreemapClient

Initial load only123.0 kB · 10 modules

All Route Modules

123.0 kB

node\_modules

/

player.js20.0 kB

controls.js10.0 kB

parser.js14.0 kB

components

/

code-block.tsx22.0 kB

search.tsx18.0 kB

related-posts.tsx9.0 kB

lib

/

table-of-contents.ts9.0 kB

client-runtime.ts12.0 kB

app

/

layout.tsx3.0 kB

page.tsx6.0 kB

Behind async boundaryInitial + async paths

Async-only modules disappear; modules with an initial path remain. Illustrative blog app.

Learn more about the [Next.js Bundle Analyzer](https://nextjs.org/docs/app/guides/package-bundling), or install the optimizer skill to start investigating your app's bundles with your agent.

## [Copy link to heading](#feedback-and-community)Feedback and community

Try the analyzer and optimizer skill on your own app, and share your feedback on the dedicated [GitHub discussion](https://github.com/vercel/next.js/discussions/86731). You can also find us on:

-   [GitHub Discussions](https://github.com/vercel/next.js/discussions)
-   [GitHub Issues](https://github.com/vercel/next.js/issues)
-   [Discord Community](https://nextjs.org/discord)