---
title: "Context Inheritance in TanStack Router"
source: "https://tkdodo.eu/blog/context-inheritance-in-tan-stack-router"
publishedDate: "2025-10-12"
category: "frontend"
feedName: "TkDodo"
---

![photo of library with turned on lights](https://tkdodo.eu/blog/static/6653eeb80747b592fade73413af94bbb/bbe0c/inheritance.jpg "photo of library with turned on lights")

-   [#1: The Beauty of TanStack Router](https://tkdodo.eu/blog/the-beauty-of-tan-stack-router)
-   **#2: Context Inheritance in TanStack Router**

-   [한국어](https://chapdo.vercel.app/posts/%EB%B2%88%EC%97%AD-Context-Inheritance-in-TanStack-Router/)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

[TanStack Router](https://tanstack.com/router) has a lot of great features, so it's hard to pick favorites. That said, there is one thing that blew my mind once I saw it in action, and that is how the router lets you accumulate state between nested routes - not just at runtime, but also on type-level.

This feature works in a type-safe and fully inferred way for all parent-child route relations, but let's start with the most simple one where I think you'd be surprised if that didn't work:

## Path Params[](#path-params)

To show a quite minimal example, let's just take two nested routes:

nested-routes

```
1- dashboard.$dashboardId2  - route.tsx3  - widget.$widgetId4    - index.tsx
```

If we look at the child route (a widget on a dashboard), we can see that we get all params from our hierarchy back when calling `Route.useParams()`:

use-params

```
1export const Route = createFileRoute(2  '/dashboard/$dashboardId/widget/$widgetId/'3)({4  component: Widget,5})6
7function Widget() {8  const params = Route.useParams()9  //    ^? { dashboardId: string, widgetId: string }10}
```

This is literally what you'd expect from a type-safe router, after all, `$dashboardId` is right there in the path next to `$widgetId`, so why is this cool?

Well, what if we'd want to express that `$dashboardId` is a number? We would define that on the parent route by parsing the `params` with our favourite validation library:

params-parsing

```
1import { type } from 'arktype'2
3export const Route = createFileRoute('/dashboard/$dashboardId')({4  component: Dashboard,5  params: {6    parse: type({ dashboardId: 'string.integer.parse' }).assert,7  },8})
```

This change leads to something amazing: Every child route in the route tree now knows about this. [The docs](https://tanstack.com/router/latest/docs/framework/react/guide/path-params#path-params-can-be-used-by-child-routes) simply say that "once a path param has been parsed, it is available to all child routes", but look what happens to our types:

dashboardId-number

```
1function Widget() {2  const params = Route.useParams()3  //    ^? { dashboardId: number, widgetId: string }4}
```

The `Widget` now knows that the `dashboardId` is a `number`. Just like that. It knows. 🤯

Let that sink in for a minute, because it has some cool implications. Because if we can define things on the parent and have the children know about their types for path params, what stops us from applying the same concept to other state our router manages?

Nothing stops us, that's what. And in fact, there are a couple of other places where this inheritance works as well:

## Search Params[](#search-params)

Yes, `searchParams` can inherit context on type-level from their parents, too. Let's say we want to have an optional `?debug` boolean flag available everywhere in our app. All we need to do is define it on our root component with:

debug-search-param

```
1export const Route = createRootRouteWithContext<RouteContext>()({2  validateSearch: type({ debug: 'boolean=false' }).assert,3  component: Root,4})
```

and now any component will get access to that boolean flag via `useSearch`:

useSearch

```
1function Widget() {2  const search = Route.useSearch()3  //    ^? { debug: boolean }4}
```

If we add more search params in our tree, they will be merged on type-level to produce the most accurate result. For example, our widget route might get a date range filter:

merged-search-params

```
1export const Route = createFileRoute(2  '/dashboard/$dashboardId/widget/$widgetId/'3)({4  validateSearch: type({ 'range?': "'7d' | '30d' | '90d'" }).assert,5  component: Widget,6})7
8function Widget() {9  const search = Route.useSearch()10  //    ^? { debug: boolean, range?: '7d' | '30d' | '90d' }11}
```

But if we used `useSearch` on the dashboard route, we would only get access to the `debug` flag. This merging is insanely powerful, because it makes sure that every component gains access to all the state available throughout its parent route hierarchy. All it needs to do is to declare which route is used on.

## Router Context[](#router-context)

Another property of the Router that can do inheritance is the [Router Context](https://tanstack.com/router/latest/docs/framework/react/guide/router-context). This context is created at the root route if we use `createRootRouteWithContext`, and it's initial values are passed to `createRouter` itself. It is generally used for dependency injection into route loaders. When used with TanStack Query, we usually use it to distribute the `QueryClient`:

router-context

```
1const queryClient = new QueryClient()2
3const router = createRouter({4  routeTree,5  context: {6    queryClient,7  },8  Wrap: ({ children }) => {9    return (10      <QueryClientProvider client={queryClient}>11        {children}12      </QueryClientProvider>13    )14  },15})
```

Then, this `queryClient` instance is available in all loaders:

queryClient-in-loader

```
1export const Route = createFileRoute('/dashboard/$dashboardId')({2  loader: async ({ context, params }) => {3    //             ^? { queryClient: QueryClient }4    await context.queryClient.ensureQueryData(5      dashboardQueryOptions(params.dashboardId)6    )7  },8  component: Dashboard,9})10
11function Dashboard() {12  const params = Route.useParams()13  const { data } = useSuspenseQuery(14    dashboardQueryOptions(params.dashboardId)15  )16}
```

This is great, but Route Context is more than just dependency injection. Again, the [docs state](https://tanstack.com/router/latest/docs/framework/react/guide/router-context#modifying-the-router-context) that "that you can modify the context at each route and the modifications will be available to all child routes."

### Route Context[](#route-context)

To modify the context for a specific route, we can define the `beforeLoad` function and return whatever we want:

beforeLoad

```
1export const Route = createFileRoute('/dashboard/$dashboardId')({2  beforeLoad: () => ({ hello: 'world' } as const),3  loader: async ({ context, params }) => {4    //             ^? {5    //                  queryClient: QueryClient;6    //                  readonly hello: "world";7    //                }8    await context.queryClient.ensureQueryData(9      dashboardQueryOptions(params.dashboardId)10    )11  },12  component: Dashboard,13})
```

Whatever we return will not only be available to this route's loader, but also wherever we consume the context in child routes, for example, with `useRouteContext`:

useRouteContext

```
1function Widget() {2  const { hello } = Route.useRouteContext()3  //      ^? "world"4}
```

Okay, so the context can also evolve and inherit values from its parents, but where would that be useful? Of course we can use it for things like [building generic breadcrumbs](https://tanstack.com/router/latest/docs/framework/react/guide/router-context#processing-accumulated-route-context), but I think I've found a killer use-case for React Query as well that I will be writing about in the next blog post.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)