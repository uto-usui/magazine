---
title: "Improving navigation experience in v0 with Next.js 16.4"
source: "https://nextjs.org/blog/improving-navigation-experience-in-v0-with-nextjs-16-4"
publishedDate: "2026-10-16"
category: "frontend"
feedName: "Next.js Blog"
author: "Aurora Scharff"
---

Previously, we shared how a coding agent used the `instant()` Playwright test helper to [make navigations instant](https://nextjs.org/blog/making-v0-navigations-instant) in [v0](https://v0.app/), Vercel's AI app builder. That work focused on the core `/chat` experience.

In other parts of v0, users saw loading skeletons when they returned to pages they had already opened. Useful content was not always ready before the first click, either. We wanted those pages to behave more like a single-page app, with content prefetched on the way in and still available on the way back.

[Next.js 16.3](https://nextjs.org/blog/next-16-3#partial-prefetching) introduced Partial Prefetching. [Next.js 16.4](https://nextjs.org/blog/next-16-4#excluding-content-from-a-prefetch) added more control over when cached content loads, along with the new [`next-partial-prefetching-optimizer` Skill](#try-it-yourself) for optimizing what gets prefetched.

In this post, we'll look at how we used the Skill to improve v0's navigation experience.

Navigating around Templates after the refactor.

## [Copy link to heading](#what-partial-prefetching-changes)What Partial Prefetching changes

In previous versions of Next.js, `prefetch={true}` fetched the entire destination, including dynamic content. This could fetch pages users never opened, while clicking before the prefetch finished still led to a slow navigation. Turning prefetching off avoided those requests but moved all of the work until after the click.

With [Partial Prefetching](https://nextjs.org/blog/next-16-3#partial-prefetching), Next.js prefetches the reusable parts of a route so they're ready before the click, while the rest loads during navigation. Cached content, including personalized content stored in the browser, can be prefetched and reused on return visits. For selected links, [`prefetch={true}`](https://nextjs.org/docs/app/api-reference/components/link#prefetch) resolves the destination URL so cached content for a dynamic route such as `/products/[id]` can be included in the prefetch.

Starting with [Next.js 16.4](https://nextjs.org/blog/next-16-4#whats-new-in-cache-components), `create-next-app` enables [Cache Components](https://nextjs.org/blog/next-16-4#whats-new-in-cache-components) and [Partial Prefetching](https://nextjs.org/blog/next-16-3#partial-prefetching) by default, as the recommended model for all Next.js apps:

When we started this work, v0 was already using Cache Components. The earlier work on `/chat` had also incrementally adopted Partial Prefetching for a few routes:

To bring the same model to the rest of v0, we enabled Partial Prefetching globally before starting the refactor. The [adoption guide](https://nextjs.org/docs/app/guides/adopting-partial-prefetching) includes an existing [`next-partial-prefetching-adoption` Skill](https://nextjs.org/docs/app/guides/ai-agents#next-partial-prefetching-adoption) for this change.

## [Copy link to heading](#making-the-goal-testable)Making the goal testable

Each navigation needed a clear, testable target for the prefetched UI.

The [`instant()` Playwright helper](https://nextjs.org/docs/app/guides/instant-navigation#prevent-regressions-with-e2e-tests) acts as a lock around the click. It holds back content that only arrives during navigation, so a test can assert on the UI available before the click:

In this example, the test checks that the template header, title, and preview are already available without showing the broad loading skeleton. If any of that UI is missing, the test fails.

## [Copy link to heading](#the-optimization-loop)The optimization loop

To automate this process, Next.js 16.4 includes the new [`next-partial-prefetching-optimizer` Skill](https://nextjs.org/docs/app/guides/ai-agents#next-partial-prefetching-optimizer). It guides an agent through the following loop until the `instant()` test passes:

   Choose the navigation and target UI
              │
              ▼
   Write a passing instant() test for the current UI
              │
              ▼
   Add the target assertions and confirm they fail
              │
              ▼
   Refactor the app ◀────────────────────────────┐
   using caching and prefetching                 │
              │                                  │
              ▼                                  │
   Rebuild and rerun the test                    │
              │                                  │
              ├── still failing ─────────────────┘
              │
              ▼ passing
   Verify the regression check and keep the test

This is especially useful in a larger codebase, where reaching the intended UI can take several iterations and refactors. The agent can keep running the loop until the `instant()` test passes.

The test remains in the codebase and can run in CI to catch future regressions.

The Skill can make a best effort from a broad goal. For this work, we wanted more control over exactly how the UI loaded, so the prompts below define what should be ready before the click and what could wait.

## [Copy link to heading](#applying-the-loop-across-v0)Applying the loop across v0

We asked an agent with the [Skill installed](#try-it-yourself) to run this workflow across v0 and split the work into feature-specific PRs. For each PR, we tried the interaction in the preview before merging, then tracked four production metrics after it shipped:

-   [**Runtime Cache spend**](https://vercel.com/docs/caching/runtime-cache#observability) for cache reads and writes
-   **Request volume** for the affected routes, including prefetch requests and [Function Invocations](https://vercel.com/docs/functions/usage-and-pricing#invocations)
-   [**Active CPU**](https://vercel.com/docs/functions/usage-and-pricing#active-cpu) used to serve those routes
-   [**Data transfer**](https://vercel.com/docs/manage-cdn-usage) from prefetch requests

Let's look at a few examples of how the Skill worked.

### [Copy link to heading](#prefetching-useful-content-for-templatesid)Prefetching useful content for `/templates/[id]`

Before the refactor, opening a card from `/templates` showed a loading skeleton while the template details loaded. Returning to the same template fetched those details again and brought back the skeleton.

The Templates page before the refactor.

The UX we wanted instead was:

Prompt

/next-partial-prefetching-optimizer When I open a Template from the "Templates" page, prefetch its header, title, and preview so I see them right away.

To make that UX possible, the agent separated public template data from personalized viewer state. The public data was safe to share across users, so the agent cached it with [`'use cache: remote'`](https://nextjs.org/docs/app/api-reference/directives/use-cache-remote).

On Vercel, this stores the result in [Runtime Cache](https://vercel.com/docs/caching/runtime-cache), where requests from different users and function instances can reuse it. With a self-hosted `next start`, `'use cache: remote'` uses memory unless you configure [`cacheHandlers.remote`](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheHandlers). Plain [`'use cache'`](https://nextjs.org/docs/app/api-reference/directives/use-cache) also uses memory by default.

The cached data also needed a lifetime and a way to invalidate it. [`cacheLife()`](https://nextjs.org/docs/app/api-reference/functions/cacheLife) sets the lifetime, while [`cacheTag()`](https://nextjs.org/docs/app/api-reference/functions/cacheTag) provides an invalidation key:

Publishing or updating a template calls [`revalidateTag()`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag), marking the cached data stale so a later request refreshes it.

With the template data now reusable, the agent added [`prefetch={true}`](#what-partial-prefetching-changes) to each link from `/templates`:

After the refactor, the template header, title, and preview were ready before the click and remained available when users returned:

The Templates page after the refactor.

### [Copy link to heading](#avoiding-unnecessary-prefetches-in-large-grids)Avoiding unnecessary prefetches in large grids

The first rollout made the selected template's content available immediately, but it also started a richer prefetch for every visible card in `/templates`. The [production metrics](#applying-the-loop-across-v0) showed that prefetch requests to `/templates/[id]` had increased **2.9×**, so we tuned when the richer prefetch started.

We still wanted to prefetch the card a user was likely to open, so we asked the agent:

Prompt

/next-partial-prefetching-optimizer On the "Templates" page, wait until I hover, focus, or touch a card before prefetching its details. Don't prefetch every card as soon as it appears.

The agent changed the richer prefetch to wait for [user intent](https://nextjs.org/docs/app/guides/prefetching#hover-triggered-prefetch), starting on hover, focus, or touch rather than when the card entered the viewport.

The core behavior can be expressed in a few lines:

In v0, the agent added this behavior to an existing custom Link wrapper:

For the Templates grid, this kept the selected Template's details available before the click without treating every card as equally likely to be opened. Throughout the refactor, the pattern was also used for other large lists and grids in v0. Smaller, fixed groups continued to prefetch when their links became visible.

### [Copy link to heading](#reusing-personalized-content-under-settings)Reusing personalized content under `/settings`

Before the refactor, pages under `/settings` could show their loading state on the first visit and again when users returned. Because the content is personalized, it needed to stay in the browser rather than a cache shared between users.

Settings before the refactor.

The UX we wanted was:

Prompt

/next-partial-prefetching-optimizer When I move between pages in "Settings", I want "Advanced", "Workspace", and "Usage" prefetched before I click them. Let the other pages load when I open them, then keep them available if I go back.

The agent used [`'use cache: private'`](https://nextjs.org/docs/app/api-reference/directives/use-cache-private) to keep this content in the browser.

URLs under `/settings` include the account or team in `[scope]`, such as `/acme/settings/advanced`. Passing `scope` into the cached function makes it part of the cache key, keeping each account or team's content separate. The **Advanced** page could reuse the result for five minutes:

For cached data that users could change, the agent paired each read with the action that updates it. For example, when users save **Custom Instructions** for v0 to follow across chats and projects, the [Server Action](https://nextjs.org/docs/app/guides/server-actions) calls [`updateTag()`](https://nextjs.org/docs/app/api-reference/functions/updateTag). This immediately expires the cached **Advanced** settings, so users see the new value in the same roundtrip.

Once this content was cached, the agent added `prefetch={true}` to the **Advanced**, **Workspace**, and **Usage** links to resolve each scoped destination and include its cached content in the prefetch. Other pages under `/settings` loaded after the click, then remained available when users returned.

After the refactor, the selected pages opened with their content ready, while the others stayed available after the first visit:

Settings after the refactor.

### [Copy link to heading](#balancing-prefetching-and-cost)Balancing prefetching and cost

We also wanted to improve navigation from `/projects` into an individual project. Before the refactor, opening one showed a broad loading state. Reopening it fetched the content again and brought the loading state back.

Projects before the refactor.

The **Recent Chats** section was still useful to cache for return visits, but it did not need to be prefetched.

Next.js 16.4 includes a new [`navigation()`](https://nextjs.org/docs/app/api-reference/functions/navigation) API that lets you decide which cached work waits until navigation:

Cached work after `navigation()` waits until the page opens, then stays available when users return. This works well for lower-priority content that isn't needed right away.

For this navigation, the UX we wanted was:

Prompt

/next-partial-prefetching-optimizer When I open a Project from the "Projects" page, I want the title and "Production Deployment" ready when I click. Prefetch them on hover, focus, or touch. Keep "Recent Chats" cached for return visits, but don't prefetch it.

The agent cached and prefetched the project details, with `navigation()` before **Recent Chats**:

Another use of `navigation()` was `/settings/usage`. The agent kept the tabs, filters, and **Activity** UI in the prefetch, while the credits dashboard and usage fields loaded during navigation and remained available on return visits.

After the refactor, the broad loading state was gone. The project title and **Production Deployment** section appeared first, followed by **Recent Chats**, which stayed cached for return visits:

Projects after the refactor.

## [Copy link to heading](#reviewing-the-results)Reviewing the results

We reviewed the metrics after each PR and tuned the work as we went. Once all the PRs had merged, the whole-app comparison showed total daily cost was **2.9% lower**, even as Shared Runtime Cache spend grew to **4.3×** its pre-refactor level, adding about **$3.44 per day**. Fewer requests and lower compute and transfer offset that increase, bringing the request-serving costs we tracked down **14.4%**.

Traffic and unrelated deployments changed during the same period, so we treated the whole-app numbers as confirmation that the refactor had not made v0 more expensive, not as savings caused solely by this work.

We also doubled the number of `instant()` tests covering these navigations. Across the areas we changed, users saw more useful content as soon as they opened a page and fewer loading states when they returned. The tests now protect that experience as v0 evolves.

## [Copy link to heading](#try-it-yourself)Try it yourself

You can use the [`next-partial-prefetching-optimizer` Skill](https://github.com/vercel/next.js/blob/canary/skills/next-partial-prefetching-optimizer/SKILL.md) to run the same loop in your app. It assumes your app already uses Cache Components and Partial Prefetching. The [Cache Components migration guide](https://nextjs.org/docs/app/guides/migrating-to-cache-components) and [Partial Prefetching adoption guide](https://nextjs.org/docs/app/guides/adopting-partial-prefetching) cover those prerequisites.

Install the Skill for your coding agent:

Once installed, the Skill may be invoked automatically when a request matches. In a harness with slash commands, it can also be selected explicitly by prefixing the navigation goal with `/next-partial-prefetching-optimizer`.

In harnesses without slash commands, it can be selected by naming the `next-partial-prefetching-optimizer` Skill in the prompt. Describe the navigation in your own words, as in the examples above, or ask the agent to find opportunities in your app.

To apply these patterns yourself, follow the [Optimizing prefetching guide](https://nextjs.org/docs/app/guides/optimizing-prefetching). The Skill uses the same guidance under the hood.

## [Copy link to heading](#feedback-and-community)Feedback and community

Try it on your own app, and let us know how it goes:

-   [GitHub Discussions](https://github.com/vercel/next.js/discussions)
-   [GitHub Issues](https://github.com/vercel/next.js/issues)
-   [Discord Community](https://nextjs.org/discord)