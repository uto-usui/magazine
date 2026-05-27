---
title: "TanStack Router and Query"
source: "https://tkdodo.eu/blog/tan-stack-router-and-query"
publishedDate: "2026-05-26"
category: "frontend"
feedName: "TkDodo"
---

![TanStack Router and Query](https://tkdodo.eu/.netlify/images?w=760&h=303&fit=cover&url=%2Fblog%2F_astro%2Fsilhouette.2E7oKcse.jpg)

Photo by [kabita Darlami](https://unsplash.com/@itskabita)

TanStack RouterReact Query

-   [#1: The Beauty of TanStack Router](https://tkdodo.eu/blog/the-beauty-of-tan-stack-router)
-   [#2: Context Inheritance in TanStack Router](https://tkdodo.eu/blog/context-inheritance-in-tan-stack-router)
-   #3: TanStack Router and QueryCurrent

-   Earlier parts of the series are hidden
    
-   [#30: React Query Selectors, Supercharged](https://tkdodo.eu/blog/react-query-selectors-supercharged)
-   [#31: Creating Query Abstractions](https://tkdodo.eu/blog/creating-query-abstractions)
-   #32: TanStack Router and QueryCurrent

All 33 parts in the series

-   [#1: Practical React Query](https://tkdodo.eu/blog/practical-react-query)
-   [#2: React Query Data Transformations](https://tkdodo.eu/blog/react-query-data-transformations)
-   [#3: React Query Render Optimizations](https://tkdodo.eu/blog/react-query-render-optimizations)
-   [#4: Status Checks in React Query](https://tkdodo.eu/blog/status-checks-in-react-query)
-   [#5: Testing React Query](https://tkdodo.eu/blog/testing-react-query)
-   [#6: React Query and TypeScript](https://tkdodo.eu/blog/react-query-and-type-script)
-   [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/using-web-sockets-with-react-query)
-   [#8: Effective React Query Keys](https://tkdodo.eu/blog/effective-react-query-keys)
-   [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/leveraging-the-query-function-context)
-   [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query)
-   [#10: React Query as a State Manager](https://tkdodo.eu/blog/react-query-as-a-state-manager)
-   [#11: React Query Error Handling](https://tkdodo.eu/blog/react-query-error-handling)
-   [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/mastering-mutations-in-react-query)
-   [#13: Offline React Query](https://tkdodo.eu/blog/offline-react-query)
-   [#14: React Query and Forms](https://tkdodo.eu/blog/react-query-and-forms)
-   [#15: React Query FAQs](https://tkdodo.eu/blog/react-query-fa-qs)
-   [#16: React Query meets React Router](https://tkdodo.eu/blog/react-query-meets-react-router)
-   [#17: Seeding the Query Cache](https://tkdodo.eu/blog/seeding-the-query-cache)
-   [#18: Inside React Query](https://tkdodo.eu/blog/inside-react-query)
-   [#19: Type-safe React Query](https://tkdodo.eu/blog/type-safe-react-query)
-   [#20: You Might Not Need React Query](https://tkdodo.eu/blog/you-might-not-need-react-query)
-   [#21: Thinking in React Query](https://tkdodo.eu/blog/thinking-in-react-query)
-   [#22: React Query and React Context](https://tkdodo.eu/blog/react-query-and-react-context)
-   [#23: Why You Want React Query](https://tkdodo.eu/blog/why-you-want-react-query)
-   [#24: The Query Options API](https://tkdodo.eu/blog/the-query-options-api)
-   [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations)
-   [#26: How Infinite Queries work](https://tkdodo.eu/blog/how-infinite-queries-work)
-   [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/react-query-api-design-lessons-learned)
-   [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/react-query-the-bad-parts)
-   [#29: Concurrent Optimistic Updates in React Query](https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query)
-   [#30: React Query Selectors, Supercharged](https://tkdodo.eu/blog/react-query-selectors-supercharged)
-   [#31: Creating Query Abstractions](https://tkdodo.eu/blog/creating-query-abstractions)
-   #32: TanStack Router and QueryCurrent

-   _No translations available._
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

It shouldn’t come as a surprise that TanStack Router integrates well with TanStack Query, after all, they’re from the same stack. But wait a second - doesn’t TanStack Router already come with support for caching?

```
export const Route = createFileRoute('/dashboard/$dashboardId')({  component: Dashboard,  staleTime: 10_000,  loader: ({ params }) => fetchDashboard(params.dashboardId),})function Dashboard() {  const dashboard = Route.useLoaderData()  return <h1>{dashboard.title}</h1>}
```

We can now access our `dashboard` thanks to `Route.useLoaderData`, and if users navigate away and come back to our route within the supplied `staleTime` (10 seconds), they will see cached data.

This is great, and works very well as long as we’re talking about Route Specific Data. If our `/dashboard/$dashboardId` route, or a child like `/dashboard/$dashboardId/widget/$widgetId` is the only one that needs issue detail data, the router cache is perfect.

But a lot of the time, we’ll need data across multiple routes, for example when handling user data. Since the built-in Router Cache is stored per-route, other routes won’t have access to that data and would need to fetch it (and cache it) on their own.

The Query Cache on the other hand is truly global and accessible on all routes and route loaders through the unique `queryKey`, which is one of the reasons why TanStack Query gets used a lot in client side applications.

## Combining Query and Router

[](#combining-query-and-router)

Queries can be used in components with hooks, and routers have loaders. If we use queries, why do we even need loaders? I’ve already talked a bit about this in [React Query Meets React Router](https://tkdodo.eu/blog/react-query-meets-react-router). Different router, but same concept.

In short, initiating fetches in route loaders is almost always a good idea, because it makes sure data will be available to your components as early as possible. They run before the component renders. They might even run before the js bundle for the component is downloaded and evaluated. And with the `prefetch: 'intent'` feature of TanStack Router, route loaders can be triggered before the user even clicks on links that take them to that route. Yes, you basically get prefetch-on-hover “for free” by using route loaders.

```
export const Route = createFileRoute('/dashboard/$dashboardId')({  loader: async ({ context, params }) => {    await context.queryClient.ensureQueryData(      dashboardQueryOptions(params.dashboardId),    )  },  component: Dashboard,})function Dashboard() {  const params = Route.useParams()  const { data } = useSuspenseQuery(    dashboardQueryOptions(params.dashboardId),  )}
```

Here, the route loader merely triggers the Query so that it can start fetching early. Then, when the component renders, it will either have data in the cache already (if we `await` in the loader) or it will pick up the in-flight promise. In any case, there will only be one request, and it will start as early as possible.

Additionally, there are a couple of things we need to keep in mind:

## Add the QueryClient to the Router Context

[](#add-the-queryclient-to-the-router-context)

This is necessary to get access to the `queryClient` in router specific methods like the loaders. The example already does this, but without the wiring, it won’t work:

```
const queryClient = new QueryClient()const router = createRouter({  routeTree,  context: {    queryClient,  },})
```

Additionally, make sure it’s the same `queryClient` you’re passing to the `QueryClientProvider`, otherwise they won’t see the same cache. You will also have to use `createRootRouteWithContext` for your root route instead of `createRootRoute`. This is all [well documented (opens in a new window)](https://tanstack.com/router/latest/docs/guide/router-context#typed-router-context).

### Turn off Router Caching

[](#turn-off-router-caching)

The router has built-in caching and its own stale-while-revalidate logic for when it should run the loaders. When using external caching libraries like TanStack Query, it’s best to just turn this off completely because we’d only want one player to control caching.

The only setting we’d need to tweak is `defaultPreloadStaleTime`, which handles how long preloaded data gets cached, and it defaults to `30s`. Everything else already defaults to 0.

```
const queryClient = new QueryClient()const router = createRouter({  routeTree,  context: {    queryClient,  },  defaultPreloadStaleTime: 0,})
```

## `useQuery` or `useSuspenseQuery` ?

[](#usequery-or-usesuspensequery)

That’s totally up to you, but I really like how Query integrates with the Suspense and Error Boundaries provided by the router. Since every route is wrapped in its own boundaries by default, we can simply call `useSuspenseQuery`, and it’ll pick up the same boundaries used by the loader, which we need to set up anyway. That means our components can focus on the sunshine case only. Even better, if we define default boundaries globally, we only have to set it up once:

```
const queryClient = new QueryClient()const router = createRouter({  routeTree,  context: {    queryClient,  },  defaultPreloadStaleTime: 0,  defaultPendingComponent: DefaultLoader,  defaultErrorComponent: DefaultError,})
```

## To `await` or not to `await` in the loader

[](#to-await-or-not-to-await-in-the-loader)

That’s a frequent question I’m getting when integrating Query with Router, so let me try to get to the bottom of it. Most examples will show `await` in the loader for “blocking” data because that’s what you would do without Query integration, and that’s fine. The router will show the `pendingComponent` while the loader is `pending`, and only render the component afterwards. That’s why data coming from `useLoaderData` is guaranteed to be defined. For [deferred data loading (opens in a new window)](https://tanstack.com/router/latest/docs/guide/deferred-data-loading#deferred-data-loading-with-await), you would return a non-awaited Promise from the loader and use the `Await` component from the router.

But when you integrate with TanStack Query, you can shift that decision to the component if you never `await` in the loader. That decision can simply be made by using `useSuspenseQuery` for blocking data and `useQuery` for deferred data.

```
export const Route = createFileRoute('/dashboard/$dashboardId')({  loader: ({ context, params }) => {    context.queryClient.prefetchQuery(      dashboardQueryOptions(params.dashboardId),    )    context.queryClient.prefetchQuery(      widgetCountQueryOptions(params.dashboardId),    )  },  component: Dashboard,})function Dashboard() {  const params = Route.useParams()  const { data: dashboardData } = useSuspenseQuery(    dashboardQueryOptions(params.dashboardId),  )  const { data: widgetCountData } = useQuery(    widgetCountQueryOptions(params.dashboardId),  )}
```

Look at that loader! It’s not even an `async` function. It doesn’t `await` anything or `return` anything. But since `useSuspenseQuery` integrates so well with the router’s boundaries, we get the same behavior as if we’d `await` the Dashboard Query. There’s also no waterfalls if call `useSuspenseQuery` multiple times in the same component, because the fetch has already been started.

And on type level, we get `dashboardData` to never be `undefined` thanks to `useSuspenseQuery`, while our non-blocking `widgetCount` is of type `number | undefined`, so we can decide to e.g. show an inline skeleton loader while that request is pending.

### What about SSR?

[](#what-about-ssr)

When upgrading from TanStack Router to the full-stack framework [TanStack Start (opens in a new window)](https://tanstack.com/start/latest), you’ll get full-stack capabilities like full-document SSR, streaming, server functions, server components and more. The framework itself is probably worth a separate blogpost, but for the Query integration, it’s good to know that almost nothing really changes.

TanStack Start offers a unique execution model, where the loaders are isomorphic, meaning they will run on the server during SSR and on the client during navigations. This model works exceptionally well with client-side caches like TanStack Query.

On the first page load, the server-fetched data is streamed to the client during SSR, which seeds the QueryCache. After that, your application becomes a SPA with client-side transitions, giving you the best of both worlds: Fast, server rendered page loads and fast navigations.

Also, our component and loader code doesn’t have to change one bit. The only thing we have to make sure is that data fetched on the server is somehow winding up in the client side cache. For that, TanStack Start offers a [simple integration (opens in a new window)](https://tanstack.com/router/latest/docs/integrations/query) that we can wire up globally:

This integration ensures that data fetched on the server is automatically dehydrated and streamed to the client, where it will be hydrated and put into the client side cache for you.

There’s one thing to keep an eye on: For the server to be able to generate the initial HTML, data needs to either be fully available when the component renders on the server, or you need to use React Suspense.

With the Query integration, using `useQuery` means you’ll need to `await` the data in the loader so it’s ready on the initial render. Otherwise, data will still populate the client cache later, but the server-rendered HTML won’t include the component markup. `useSuspenseQuery` doesn’t require that extra step, since Suspense works with streaming SSR and can progressively render once the data resolves, which is a pretty good reason to use suspense. 🔥

## Always use a Query

[](#always-use-a-query)

While the router already gives you a way to access data with `useLoaderData`, it’s not recommended when combining it with Query. TanStack Query keeps track of which queries are actively used, and for that, it needs Query Observers. Those observers are created with `useQuery` (or `useSuspenseQuery`). Without those hook calls, queries are seen as “inactive”, which has a bunch of implications:

-   You don’t get automatic refetches on triggers like window focus or when you re-gain network connection, because that relies on the query being actively used.
-   Query Invalidation won’t re-fetch a Query because that too relies on the query being actively used (unless you change the `refetchType`).
-   Queries that aren’t actively used are eligible for garbage collection, so you might see your Query being removed from the cache even though you are “using” it.

Knowing that, relying on `useLoaderData` might work at first, but it can become problematic over time, especially the garbage collection. The easiest thing that prevents falling into this trap is to:

## Treat the loader as an event handler

[](#treat-the-loader-as-an-event-handler)

If we were to treat the loader like a simple fire-and-forget event handler that only primes our cache without actually returning any data, `useLoaderData` would just give us `undefined`, which isn’t very usable. That’s good because we shouldn’t use it - we should `use(Suspense)Query`. 😁

I find this generally a good mental model to have about route loaders, because it clearly defines what they are for: A point in time to initiate data fetching after a user interaction (navigating to page or showing intent to do so). This can also be introduced gradually as a performance enhancement to speed up loading our pages. Even without the loader in place, our pages should still work.

* * *

That’s it for today. Feel free to reach out to me on [bluesky (opens in a new window)](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

Check out [monolisa.dev](https://www.monolisa.dev/?ref=dominik)

[![Query.gg - The official React Query course](https://tkdodo.eu/.netlify/images?w=4096&h=400&fit=cover&url=%2Fblog%2F_astro%2Fquery-gg.Ch3mBCol.jpg)](https://query.gg/?s=dom)

[![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/.netlify/images?w=4096&h=256&fit=cover&url=%2Fblog%2F_astro%2Fbytes.PgTxoh9S.jpg)](https://bytes.dev/?r=dom)

## Continue Series

TanStack RouterReact Query

© 2026 by TkDodo's blog. All rights reserved.