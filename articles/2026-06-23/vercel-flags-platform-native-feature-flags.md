---
title: "Vercel Flags: Platform-native feature flags"
source: "https://vercel.com/blog/vercel-flags-platform-native-feature-flags"
publishedDate: "2026-06-22"
category: "frontend"
feedName: "Vercel"
author: "Malavika Tadeusz"
---

At Vercel, feature flags are how we ship. From new features to model updates in v0, and even infrastructure changes like a production database migration where a flag was the cutover. The [v0](https://v0.app/) team alone runs hundreds at any given moment.

Merging code sends a build to production, but the feature flags control whether users can see what changed. Flags let you ship on your own schedule, release to segments when you're ready, and roll back by immediately by toggling a flag, without touching source files or redeploying.

[Vercel Flags](https://vercel.com/docs/flags/vercel-flags) is platform-native: server-side by default, zero impact on page performance, and directly integrated with the frameworks you already use.

## [Link to heading](#what-is-vercel-flags)What is Vercel Flags

Vercel Flags lets you create feature flags, define targeting rules by user attributes, segments, or environment, run progressive rollouts, and flip kill switches if something breaks in production.

From your code, you read flags through [Flags SDK](https://flags-sdk.dev/), an open-source, provider-agnostic library we maintain with first-class adapters for [Next.js](https://nextjs.org/) and [SvelteKit](https://svelte.dev/docs/kit). If you are using another framework, you can consume Vercel Flags using the built-in OpenFeature provider.

The [Vercel Flags dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fflags%2Factive) sits alongside your project and deployments, where you can create and manage flags.

![The Vercel Flags dashboard showing a list of active feature flags with their current values and types across Production, Preview, and Development environments](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4q9hgON5IGIgIVHZ5Vkyrj%2F695a95781ff7490686aa4ba3911718de%2Fflags-tab-light.avif&w=1920&q=75)![The Vercel Flags dashboard showing a list of active feature flags with their current values and types across Production, Preview, and Development environments](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3BlEzp4s26LwDD1ZdaUQAU%2F27a9bfb247dab9bbc019b734dba3cb85%2Fflags-tab-dark.avif&w=1920&q=75)

Active flags across environments, each with their current value and type.

But what makes Vercel Flags different from other flag services is the framework integration.

## [Link to heading](#why-framework-native-matters)Why framework-native matters

Other flag providers give you a generic SDK to wire through your framework yourself, and a separate dashboard to manage flags in. Vercel Flags is built into the Vercel platform, so you manage flags in the same dashboard as your deployments, and your code reads them through the framework-native Flags SDK.

### [Link to heading](#server-side-evaluation)Server-side evaluation

When a flag is evaluated on the client, users see a loader, a flicker, or a layout shift. The browser can't render the correct view until the flag value comes back. The Flags SDK evaluates on the server instead. With Next.js React Server Components, you read the flag with `await` during render. The correct view is determined server-side and the browser renders it directly, with no separate flag request. That value comes from Vercel Flags, where a configuration change propagates to every region within milliseconds.

app/page.tsx

```
import { showNewFeature } from "@/flags"export default async function Page() {  const isEnabled = await showNewFeature()  return isEnabled ? <NewDashboard /> : <OldDashboard />}
```

Reading the flag server-side in a route. The user receives the correct variant before the page paints.

For advanced cases, you can pass the flag as a promise to a client component rather than awaiting it. This lets the page start rendering before the flag value arrives, with the component showing a fallback in the meantime. The flag still resolves on the server, so there is no browser-side request for it.

### [Link to heading](#automatic-flag-registration)Automatic flag registration

Vercel Flags registers flags automatically. Define one in code, deploy, and it appears in the dashboard as a draft. Promote the draft when you're ready to configure targeting and roll out. Remove the flag from your code and the dashboard marks it as unreferenced, so you always know what's safe to archive. The flags you write are the flags you manage, with no separate list to keep in sync by hand.

flags.ts

```
import { flag } from "flags/next"import { vercelAdapter } from "@flags-sdk/vercel"export const showNewFeature = flag({  key: "show-new-feature",  adapter: vercelAdapter()})
```

Defining a flag with the Flags SDK and the Vercel adapter.

### [Link to heading](#precompute)Precompute

Static pages are fast and consistent because they are served from the CDN regions closest to you and your users. But adding a flag makes a page dynamic. Either you render server-side and lose CDN delivery, or you fetch the flag client-side and get layout shift back. However, Flags SDK comes with an optional, advanced pattern that solves this. Precompute lets you build all variants at build time, distribute them through the CDN, and have [Routing Middleware](https://vercel.com/docs/routing-middleware) (the `proxy.ts` file in Next.js) route each user to the right one. Every page stays static and loads with no layout shift.

**Note:** Precompute is an advanced but powerful pattern. [Read the docs](https://flags-sdk.dev/docs/frameworks/next/precompute) to learn more.

### [Link to heading](#agent-native-flag-management)Agent-native flag management

The [`vercel flags`](https://vercel.com/docs/cli/flags) CLI exposes the same flag management from your terminal, so you and your coding agents can create flags, configure targeting, run rollouts, and archive them.

### [Link to heading](#overriding-flags-in-the-browser)Overriding flags in the browser

[Flags Explorer](https://vercel.com/docs/flags/flags-explorer), built into the [Vercel Toolbar](https://vercel.com/docs/vercel-toolbar), lets you override any flag in your browser session to test a variant. The shared configuration stays untouched and you do not redeploy.

## [Link to heading](#vercel-ships-on-vercel-flags)Vercel ships on Vercel Flags

While [we made Vercel Flags generally available](https://vercel.com/changelog/vercel-flags-ga) in April 2026, we've been using it internally for over a year. The [v0](https://v0.app/) team is a good example of what this looks like at scale, with hundreds of flags active at any given moment.

Here are some examples of what teams put behind flags:

-   New features under development
    
-   AI model routing per user or segment
    
-   Operational kill switches
    
-   Database migrations and provider swaps
    
-   Beta access for early customers or internal teams
    

For a product like v0, any added latency degrades the end-user experience. Because Vercel Flags evaluates server-side, the team gets feature flagging without the additional round trip that client-side flag evaluation adds.

Because every new feature is built behind a flag, developers can merge to `main` continuously without releasing unfinished work. There are no long-lived branches and no painful merge conflicts to resolve. Deploying code and releasing a feature become two separate decisions.

A release moves through a controlled progression. The developer who built the feature sees it first, then the internal team. After that, the flag steps up through 5%, 10%, 25%, and 50% of users for six hours each, before going to everyone. If something goes wrong at any stage, the team can kill the feature without making a code change or redeploying.

Flags also control v0's AI model traffic, shifting gradually when a new model launches rather than cutting over all at once.

v0 even ran a production database migration with a flag. We kept the old and new databases in sync, and the flag controlled which database was in use. Flipping the flag was the cutover itself. We rehearsed it in staging repeatedly, then ran it in production without degrading traffic. The flag turned a high-stakes infrastructure change into something the team could practice, schedule, and ship with confidence.

## [Link to heading](#get-started)Get started

Once shipping code and releasing a feature are separate stages, you can start to just ship things with a level of confidence that you couldn't get from PRs alone.

[Vercel Flags](https://vercel.com/docs/flags/vercel-flags) is available on every plan. The [`vercel flags`](https://vercel.com/docs/cli/flags) CLI allows you and your agents to create, inspect, manage rollouts, and archive flags from anywhere.

Read the [Vercel Flags documentation](https://vercel.com/docs/flags/vercel-flags) to get started, or ask your agent for help with the [Flags SDK skill](https://skills.sh/vercel/flags/flags-sdk).