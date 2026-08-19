---
title: "Reliable Query Prefetching with TanStack Router"
source: "https://tkdodo.eu/blog/reliable-query-prefetching-with-tanstack-router"
publishedDate: "2026-08-18"
category: "frontend"
feedName: "TkDodo"
---

![Reliable Query Prefetching with TanStack Router](https://tkdodo.eu/.netlify/images?w=640&h=427&fit=cover&url=%2Fblog%2F_astro%2Fchairs.BS4rheeq.jpg)

Photo by [Mario Heller](https://unsplash.com/@heller_mario)

-   _No translations available._
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

TanStack Router

-   [#1: The Beauty of TanStack Router](https://tkdodo.eu/blog/the-beauty-of-tan-stack-router)
-   [#2: Context Inheritance in TanStack Router](https://tkdodo.eu/blog/context-inheritance-in-tan-stack-router)
-   [#3: TanStack Router and Query](https://tkdodo.eu/blog/tan-stack-router-and-query)
-   #4: Reliable Query Prefetching with TanStack RouterCurrent

In [the last blog post](https://tkdodo.eu/blog/tan-stack-router-and-query) of this series, I described all the advantages of the imo recommended pattern to do data fetching in TanStack Router with TanStack Query. To recap, it’s about triggering fetches as early as possible in the loader, but also about treating the loader as an event handler so that components can “pick up” the promise with `useSuspenseQuery` or `useQuery`.

The takeaway here should be that a component should, if possible, probably never initiate data fetching on its own. Yes, it’s great in theory that you have a fully self-contained component that has its own data requirements and resolves them automatically when it renders. But in practice, if that’s the only place where we fetch, we are 1) doing this probably way later than we ideally should and 2) we can easily introduce [fetch waterfalls](https://tkdodo.eu/blog/seeding-the-query-cache#fetch-waterfalls) (with or without suspense).

So, route loader to the rescue. 🎉 As usual, there is a cost to it though:

## The Great Divergence

[](#the-great-divergence)

The big drawback of this approach is that you essentially duplicate what you do in the component in a second location - the route loader. Now duplication is not the end of the world, and it’s a fine trade-off for the UX you are giving your app, but there is one thing that’s really critical to keep in mind as your app grows:

Those two places have to be 100% in sync

And usually, over time, this gets harder to ensure. Minimal examples are great for blogposts, but they don’t necessarily reflect the real world. As we’ve built larger apps with TanStack Router, we’ve hit this “limitation” pretty quickly. There are a couple of things that contributed to this:

1.  Your components usually won’t stay in the `Route` file.

At least not completely. `component: Dashboard` is nice, but `Dashboard` is likely composed of a lot more components, who will also need access to the route APIs. TanStack Router has us covered with the [getRouteApi (opens in a new window)](https://tanstack.com/router/latest/docs/framework/react/api/router/getRouteApiFunction#getrouteapi-returns), so we can easily start to break things up into separate files:

```
const Route = getRouteApi('/dashboard/$dashboardId')function DashboardContent() {  const params = Route.useParams()  const { data } = useSuspenseQuery(    dashboardQueryOptions(params.dashboardId),  )}
```

This is a good thing, but it means when we change how the component uses a Query, we might not immediately think about also adapting this in the route loader.

2.  There is no error if the two aren’t the same

While I have been thinking about a [Strict Mode (opens in a new window)](https://github.com/TanStack/query/discussions/8064) to help with prefetching mismatches, we don’t have anything right now, so diverging is really easy to accidentally do.

This means that as your product grows and new features are added, simply changing how you fetch data in the component can cause two issues: you’ll prefetch data you don’t actually need (potentially blocking the route), and you’ll also trigger another fetch for the data you do need, creating a waterfall effect.

Also, if you remove a query from a component but don’t clean-up the route loader, you’ll be unnecessarily prefetching data you don’t need at all.

## Example

[](#example)

Suppose we want to add a feature to our Dashboard where we can filter for a date in the past to essentially get a historical snapshot of its data and widgets at that point in time. Since we want this to be shareable, we’ll add an optional `?asOf=YYYY-MM-DD` query parameter to our Dashboard route and consume that in the component:

```
const Route = getRouteApi('/dashboard/$dashboardId')function DashboardContent() {  const params = Route.useParams()  const { asOf } = Route.useSearch()  const { data } = useSuspenseQuery(    dashboardQueryOptions(params.dashboardId, { asOf }),  )}
```

Now if we load our Dashboard, everything still works fine, and if we change the search param, we’ll also see data from that snapshot. LGTM, ship it. 🚢

I think I already spoiled what the bug is: If we now share a route to our Dashboard, we will:

-   Load data in the route loader for “today” (as we haven’t adapted the `asOf` param in the route loader)
-   Wait until that data is available, then render the component
-   Now fetch again from within the component with the `asOf` param present
-   Since `asOf` will have to be a part of our `QueryKey`, we will get a completely new Query, thus we’ll re-suspend the component until that data is available to

Only then will we render the component with the accurate data.

This is quite bad because it makes the most common use-case (adding features) hard to get right and the bugs that come from this aren’t easy to spot either. I think we actually hit that issue in the first couple of routes we created, where we were pre-fetching an InfiniteQuery in the route loader that optionally had `search`, `sortBy` and `sortDirection` query params. 😔

It’s a really easy mistake to make, so how do we fix it?

## Fix the Route Loader

[](#fix-the-route-loader)

Well first, we should probably update the route loader to include the optional param there, too. This has to be done with an additional layer of indirection called [loaderDeps (opens in a new window)](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#using-search-params-in-loaders).

```
export const Route = createFileRoute('/dashboard/$dashboardId')({  validateSearch: type({ 'asOf?': 'string.date.iso' }).assert,  loaderDeps: ({ search: { asOf } }) => ({ asOf }),  loader: async ({ context, params, deps }) => {    await context.queryClient.ensureQueryData(      dashboardQueryOptions(params.dashboardId, deps),    )  },  component: Dashboard,})
```

This fixes the symptoms (we can now share URLs again without doing multiple unnecessary requests) but it doesn’t address the root cause at all. It’s still likely that we will make the same mistake on the next route again. To make it less likely to happen, we need to fix the duplication.

### Fix the Duplication

[](#fix-the-duplication)

Let’s compare the two query related calls again - the one in the loader and the one in the component:

```
//loaderawait context.queryClient.ensureQueryData(  dashboardQueryOptions(params.dashboardId, deps),)// componentconst { data } = useSuspenseQuery(  dashboardQueryOptions(params.dashboardId, { asOf }),)
```

We can see that both instances share the same query options, the only difference is the function they’re passed to: `ensureQueryData` for an imperative, one-time fetch, and `useSuspenseQuery` for setting up a reactive subscription.

In our case, the bug happened because those two weren’t actually using the same options. If the component always relied on the same `queryOptions` as the loader, they couldn’t drift apart, so let’s just put the options into Route Context and consume them in both places.

```
export const Route = createFileRoute('/dashboard/$dashboardId')({  validateSearch: type({ 'asOf?': 'string.date.iso' }).assert,  loaderDeps: ({ search: { asOf } }) => ({ asOf }),  context: ({ params, deps }) => ({    dashboardQueryOptions: dashboardQueryOptions(      params.dashboardId,      deps,    ),  }),  loader: async ({ context }) => {    await context.queryClient.ensureQueryData(      context.dashboardQueryOptions,    )  },  component: Dashboard,})// in a different file, far far awayconst routeApi = getRouteApi('/dashboard/$dashboardId')function DashboardContent() {  const context = routeApi.useRouteContext()  const { data } = useSuspenseQuery(context.dashboardQueryOptions)}
```

A couple of things happened here. First, we’re no longer depending on `params` or `deps` inside the loader _or_ the component. The `context` function is now the only place where we use those, and its job is to create the `queryOptions` we want to share and put them under an arbitrary key onto the context.

Then, the loader only uses the `context`, and the component also only uses the `context` with `Route.useRouteContext()`.

This little layer of indirection has a lot of advantages. Not only can our de-duplication bug no longer happen, we also know when a component uses a query that has been prefetched. That means we are much more likely to look at the route loader and clean up prefetches if we remove the usage in the component.

And because context inherits from parents, sub-routes will know about those `queryOptions`, too. We could, for example, prefetch some user data in the root route loader:

```
export const Route = createRootRouteWithContext<RouteContext>()({  validateSearch: type({ debug: `boolean=false` }).assert,  context: () => ({    userQueryOptions: queryOptions({      queryKey: ['user'],      queryFn: getUser,    }),  }),  loader: async ({ context }) => {    await context.queryClient.ensureQueryData(      context.userQueryOptions,    )  },  component: Root,})
```

And then use them too in our Widgets:

```
function Widget() {  const { userQueryOptions, dashboardQueryOptions } =    Route.useRouteContext()}
```

We will see all `queryOptions` that have been created by any parent, as long as they add it to the route context. 🎉

### A Final Note on Subscriptions

[](#a-final-note-on-subscriptions)

When this feature made it to the router, I was a bit concerned about what our components subscribe to. As you’ve seen, we’ve basically replaced all subscriptions to `useParams` and `useSearch` with just a single call to `useRouteContext`:

```
function DashboardContent() {  const params = Route.useParams()  const { asOf } = Route.useSearch()  const context = Route.useRouteContext()}
```

Even with [fine-grained subscriptions](https://tkdodo.eu/blog/the-beauty-of-tan-stack-router#fine-grained-subscriptions) (which Route Context also supports), wouldn’t we get a new `queryOptions` object every render that isn’t structurally sharable because it contains functions? And wouldn’t that make everything re-render all the time?

Rest assured: That’s not the case. The `context` function only runs when either `params` or `loaderDeps` changes, so if there’s a change to an unrelated search param (like `debug`), your components that are subscribed to the Route Context won’t re-render unnecessarily.

All in all, I’ve found this the best and most scalable solution to ensure that our components actually consume the same things that the route loader prefetches.

* * *

That’s it for today. Feel free to reach out to me on [bluesky (opens in a new window)](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

Check out [monolisa.dev](https://www.monolisa.dev/?ref=dominik)

[![Query.gg - The official React Query course](https://tkdodo.eu/.netlify/images?w=4096&h=400&fit=cover&url=%2Fblog%2F_astro%2Fquery-gg.Ch3mBCol.jpg)](https://query.gg/?s=dom)

[![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/.netlify/images?w=4096&h=256&fit=cover&url=%2Fblog%2F_astro%2Fbytes.PgTxoh9S.jpg)](https://bytes.dev/?r=dom)

## Continue Series

© 2026 by TkDodo's blog. All rights reserved.