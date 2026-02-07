---
title: "Middleware in React Router"
source: "https://remix.run/blog/middleware"
publishedDate: "2025-09-17"
category: "frontend"
feedName: "Remix Blog"
---

The long-awaited middleware feature is now stable in React Router [7.9.0](https://github.com/remix-run/react-router/blob/main/CHANGELOG.md#v790) via the `future.v8_middleware` flag! It's been a long road to get here, but we wanted to make sure we got this one right. We think it was worth the wait.

## Remix v1/v2 patterns

React Router has always embraced nested routes. Remix layered on a compelling SSR story which included built-in [data loading primitives](https://reactrouter.com/start/framework/data-loading). To keep your application fast, route loaders ran in parallel for all matched routes for a given URL. This was crucial for performance, but meant that you couldn't do any sequential logic in your loaders, nor could you short-circuit out from a parent route. We received lots of questions and saw lots of incorrect attempts to do both of these in early Remix apps.

Often, folks wanted to access parent loader data from a child loader - but this wasn't possible because they run in parallel:

```
// app/root.tsx
export async function loader({ request }) {
  let user = await getUser(request);
  return { user };
}

// app/routes/_index.tsx
export async function loader({ request }) {
  // ❌ No way to access `user` here
}
```

Other times, folks would incorrectly assume a redirect from a parent loader would prevent the child `loader` from running - but this was also not the case:

```
// app/routes/_auth.tsx
export async function loader({ request }) {
  let user = await getUser(request);
  if (!user) {
    throw redirect("/login");
  }
}

// app/routes/_auth.profile.tsx
export async function loader({ request }) {
  // ❌ This code still runs even if there's no logged-in user
  let data = await getUserData(request);
  return data;
}
```

These were easy mistakes to make because nested routes could lead you to assume this would work - especially coming from the "load data in your component" patterns that were popular in React SPAs prior to Remix. We documented these behaviors clearly, but we always knew that it was a gap in our API.

To avoid the above issues, you had a few options, none of which were ideal:

-   Perform authentication checks in each loader - this got redundant quickly and was easy to forget on new routes
-   Opt out of `react-router-serve` and manage your own HTTP server (i.e., `express`, `hono`) where you could use their middleware APIs to short circuit or provide data via `getLoadContext`

There were also plenty of other common use-cases that weren't easy to do without a middleware abstraction:

-   Request timing and logging
-   Post-handler 404 redirects (usually based on CMS content)
-   Setting common outgoing Response headers

## First attempt

Middleware was needed as a way to run route logic sequentially, prior to (and after!) running loaders in parallel. We knew this early on and opened an [RFC](https://github.com/remix-run/react-router/discussions/9564) back in late 2022 which quickly became the _most upvoted_ proposal in the project. We even did an [initial implementation](https://github.com/remix-run/react-router/pull/9975) in early 2023 (much thanks to [Fresh](https://fresh.deno.dev/docs/concepts/middleware) and [Hono](https://hono.dev/docs/guides/middleware), whose APIs provided inspiration for our design).

But then we realized that middleware in the existing data loading architecture wasn't actually as useful as it appeared. At the time, route loaders were fetched individually in parallel HTTP calls - one per loader. This meant that there was no shared request context between parent and child loaders because they were separate HTTP requests, so they couldn't actually share data.

Instead, middleware would run on every request - so you wouldn't actually be reducing the number of requests to your DB as you'd still be checking the user on every request. So your code would clean up a bit without having to repeat your checks in the loaders, but **functionally there wouldn't be any real change in runtime behavior**. In the worst case, a parent middleware might even load data for a child request which would never even use the data.

We had to make some other changes before we could ship a middleware API that made your code easier _and also_ lowered the number of times you needed to talk to your DB. We needed an architecture where parent and child loaders _shared_ a singular request context... enter "[Single Fetch](https://v2.remix.run/docs/guides/single-fetch)". The Single Fetch feature was a re-working of the way server loaders were called from the client, combining the parallel HTTP requests into a singular HTTP request for all loaders.

However, because this was specific to server-rendered apps, we couldn't just implement it in the core of React Router because it didn't make sense in SPA's where there is no HTTP request for loaders. We had to build an abstraction for React Router that would let an application override the mechanism in which loaders were executed. This landed as the [`dataStrategy`](https://reactrouter.com/api/data-routers/createBrowserRouter#optsdatastrategy) API for Data Routers, which allowed Remix to implement the Single Fetch feature only for SSR apps.

In the meantime, we were also iterating on a new type-safe Context API over in the [Remix the Web](https://github.com/mjackson/remix-the-web) project (which has since moved into the [Remix](https://github.com/remix-run/remix) repo in preparation for Remix 3). This provided a much better type-story than the `AppLoadContext` interface we were using to provide data from your HTTP server into Remix at the time.

So, we haven't been dragging our feet since our original implementation in 2023! We just had to make some larger underlying architectural changes before we could land a proper middleware API in React Router (and release v7, and work on route typegen, and figure out an RSC integration that would play nice with middleware, etc.).

### Middleware in v7

We landed our initial [unstable implementation](https://github.com/remix-run/react-router/pull/12941) of middleware behind a future flag in [7.3.0](https://github.com/remix-run/react-router/blob/main/CHANGELOG.md#v730). Since then, we've been iterating on the API/implementation and working closely with community members who adopted the unstable flag for alpha testing. We received a _ton_ of valuable feedback from those folks that helped us move the API to an even better spot in the end.

We're excited to finally stabilize these APIs in [7.9.0](https://github.com/remix-run/react-router/blob/main/CHANGELOG.md#v790) behind the `future.v8_middleware` flag and can't wait to see the interesting patterns folks come up with when using them. There are already a handful of useful middlewares available in [remix-utils](https://github.com/sergiodxa/remix-utils?tab=readme-ov-file#middleware) that are worth checking out!

Below are the two examples referenced above using the new middleware APIs.

Providing data from a parent to a child:

```
// app/root.tsx
const context = createContext<User>();

const userMiddleware: Route.MiddlewareFunction = ({ context }) => {
  let user = await getUser(request);
  context.set(userContext, user); // 👈 Provide data here
};

export const middleware = [userMiddleware];

export async function loader({ context }) {
  return { user: context.get(userContext) }; // 👈 Access data here
}

// app/routes/_index.tsx
export async function loader({ request }) {
  let user = context.get(userContext); // 👈 Access data here
  // ...
}
```

Short-circuiting child loaders with a redirect:

```
// app/routes/_auth.tsx
const requireUserMiddleware: Route.MiddlewareFunction = ({ context }) => {
  let user = await getUser(request);
  if (!user) {
    throw redirect("/login");
  }
  // ...
};

export const middleware = [requireUserMiddleware];

// app/routes/_auth.profile.tsx
export async function loader({ request }) {
  // ✅ This code will never run if there's no logged-in user
  let data = await getUserData(request);
  return data;
}
```

For more information on using these APIs and examples of common use-cases, please check out the [decision doc](https://github.com/remix-run/react-router/blob/main/decisions/0014-context-middleware.md) and the [Middleware documentation](https://reactrouter.com/how-to/middleware). As always, if you have any questions, please feel free to open an issue or discussion on [Github](https://github.com/remix-run/react-router) or reach out to us in [Discord](https://rmx.as/discord).