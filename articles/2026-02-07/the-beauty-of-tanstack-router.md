---
title: "The Beauty of TanStack Router"
source: "https://tkdodo.eu/blog/the-beauty-of-tan-stack-router"
publishedDate: "2025-05-25"
category: "frontend"
feedName: "TkDodo"
---

![Water droplets on white-petaled flower, TanStack router logo in the middle](https://tkdodo.eu/blog/static/a6f71d4626876eb87c1fc777cccb30d1/bbe0c/beauty.jpg "Water droplets on white-petaled flower, TanStack router logo in the middle")

-   **#1: The Beauty of TanStack Router**
-   [#2: Context Inheritance in TanStack Router](https://tkdodo.eu/blog/context-inheritance-in-tan-stack-router)

-   [한국어](https://chapdo.vercel.app/posts/%EB%B2%88%EC%97%AD-The-Beauty-of-TanStack-Router/)
-   [Русский](https://world.hey.com/naysayer/tanstack-router-42bdf625)
-   [Tiếng Việt](https://www.kirugi.pro/posts/the-beauty-of-tan-stack-router/)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

* * *

Choosing a Router is probably one of the most important architectural decisions we have to make. The router isn't just another dependency in `node_modules` - it's what holds your whole application together. It makes sure our users have a great experience when navigating between pages, and ideally, it also provides awesome DX to keep us sane while we have to add more and more routes.

Last year, I was tasked with merging two applications that were using different routing techniques. We carefully evaluated our options. We really liked aspects of one router and loved some parts that the other one did. But none of them felt like we could "have it all".

Luckily for us, [TanStack Router](https://tanstack.com/router/latest) had just hit v1 a few months ago, so we included it in our evaluation. And, what can I say, it had the best of all worlds. 🤩

In this article, I want to briefly outline the high-level features that make TanStack Router stand out from the rest for me. I plan to dig in deeper into each topic in follow-up posts.

## Type-Safe Routing[](#type-safe-routing)

As I said, routing is one of the most fundamental building blocks of your web application. So how come types around routing are ... so bad ? Like, literally an afterthought:

-   Here's a `useParams` hook, we'll give you `Record<string, string | undefined>`, go figure out the rest.
    
-   Here's a `<Link>` component that will prevent a full page reload and do a client-side transition instead. Great, but please build the url yourself - we accept any `string`: `<Link to={｀/issues/${issueId}｀}>`. We don't know if the url is valid. That's _your_ responsibility.
    

Feels like leftovers from a time where TypeScript didn't exist, things were implement with plain JS and we had types plucked on top that are only slightly better than `any`. I think that's literally what happened in a lot of existing routers, and to be fair, they have the disadvantage of being around _before_ TypeScript.

TanStack Router lives and breathes TypeScript - it's meant for it, they are a perfect match. Sure, you could use it without types, but why would you when the TypeScript support is this good? All features were engineered with fully inferred type safety in mind. That means no manual type assertions, no angle brackets `<>` to pass type parameters and type errors with informative messages when you do something that's invalid.

### StrictOrFrom[](#strictorfrom)

Of course, we still want a `useParams` hook, so how can we make it type-safe? Doesn't it depend on where it's called? Like - when I'm on `/issues/TSR-23`, we might get an `issueId` from the router, but when I'm on `/dashboards/25`, it's a `dashboardId`, which is also a `number`.🤔

That's why TanStack Router doesn't just have a `useParams` hook - that hook exists, but it has a mandatory param. Ideally, you can tell it where you're coming from:

useParams-with-from

```
1const { issueId } = useParams({ from: '/issues/$issueId' })2//      ^? const issueId: string
```

The `from` param is type-safe - a big union of all available routes - so you can't get that wrong. This is best for when you write a component that is specific to the issue detail route and that's only used there. It would fail at runtime with an `invariant` if used on a route where `issueId` doesn't exist.

I know what you're thinking - how can I write reusable components with this approach? I want to have a component that I use across multiple routes that can still call `useParams` and then maybe decide how they behave depending on which params exist?

While I think it's a lot more common to write components with `useParams` that only exist on a single route, TanStack Router has you covered here as well. Just pass `strict: false`:

useParams-with-strict

```
1const params = useParams({ strict: false })2//    ^? const params: {3//           issueId: string | undefined,4//           dashboardId: number | undefined5//       }
```

This will never fail at runtime, and what you get back is still better typed than most other solutions I've seen. Because the router knows about all existing routes, it can compute an intersection of all possibly existing params. That's mind-blowing tbh. 🤯 And the fact that you have to explicitly opt-in to either one of the methods makes reading a codebase based on TanStack router actually enjoyable. There's no second guessing if something will work, and you can actually refactor a route with confidence.

### Links[](#links)

It goes without saying that the `Link` component behaves just the same. Again, because the router knows about all existing routes, the `Link` component can know which routes exist, and which params you have pass:

type-safe-links

```
1<Link to="/issues/$issueId" params={{ issueId: 'TSR-25' }}>2  Go to details3</Link>
```

Here, you'll get the obvious type errors if you don't pass `issueId`, if you pass a different id, and id that isn't a string, or if you try to navigate `to` a url that doesn't exist. Just beautiful. 😍

## Search Param State Management[](#search-param-state-management)

Use the platform is a great principle, and nothing is more platform than the address bar in your browser. It's something the user can see. It's something they can copy-paste and share with others. It has automatic undo/redo built-in with back and forward navigations.

But, again, [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) are a mess when it comes to types. Yes, we can't know what's in there because users can directly manipulate it. The consensus is that user input can't be trusted and needs to be validated.

So, if search params are tied to a route, and we have to validate them because they can't be trusted, and we can't get type safety without validation - why doesn't the router validate them?

I really don't know, because that's exactly what TanStack Router does. You can get access to search params with `useSearch` - it's built on the same `StrictOrFrom` principle like path params - and validate the params directly on the route definition:

search-param-validation

```
1export const Route = createFileRoute('/issues')({2  validateSearch: issuesSchema,3})
```

TanStack Router supports [standard schema](https://standardschema.dev/), so you can write the `issuesSchema` with any of the [compatible libraries](https://standardschema.dev/#what-schema-libraries-implement-the-spec). You can also write the validation yourself, after all, it's just a function from `Record<string, unknown>` to whatever type you want to produce.

I've been enjoying [arktype](https://arktype.io/) a lot lately:

issuesSchema-with-arktype

```
1import { type } from 'arktype'2
3const issuesSchema = type({4  page: 'number > 0 = 1',5  filter: 'string = ""',6})7
8export const Route = createFileRoute('/issues')({9  validateSearch: issuesSchema,10})
```

That's it! Now calling `useSearch({ from: '/issues' })` will be fully validated & typed, and navigating to `/issues` (either with `useNavigate` or with a `<Link>`) will have a typed `search` option, too. The router will take care of properly parsing and serializing the values, even if it's nested object and arrays. To prevent unnecessary re-renders, results use [structural sharing](https://tanstack.com/router/latest/docs/framework/react/guide/render-optimizations#structural-sharing) by default, avoiding the creation of new objects on each update.

### Fine-grained Subscriptions[](#fine-grained-subscriptions)

Speaking of unnecessary re-renders, I don't think we talk enough about how one update to the url will usually re-render all subscribers. Now that's usually not a problem if you navigate between two pages, but if you have multiple nested routes that each want to write to the url, re-rendering the whole page can be extremely wasteful and worsen the user experience.

In one case, we had a table on a route with many filters that were all stored in the url. Upon clicking a row, the user was taken to a sub-route, which was opened as a dialog.

Opening the dialog would _always_ re-render the table, because we were using `useParams` inside. Of course the table had an Infinite Query, so if the user has loaded a bunch of pages, opening the dialog would be noticeably laggy.

This is literally the prime use case of "global state managers" like [redux](https://redux.js.org/) or [zustand](https://zustand-demo.pmnd.rs/) - they give us a way to subscribe to parts of a larger state so that our components only re-render when something they're interested in changes. So why doesn't this work for the url?

You can try to fight [The Uphill Battle of Memoization](https://tkdodo.eu/blog/the-uphill-battle-of-memoization) on your own, or you can use TanStack Router, which provides you with `selectors`:

fine-grained-selectors

```
1const page = useSearch({2  from: '/issues',3  select: (search) => search.page,4})
```

If you've worked with a selector-based state manager (or with [TanStack Query](https://tanstack.com/query/latest)) before, this should look familiar. Selectors are an explicit way to subscribe to parts of a larger piece of state, and they are available for various hooks like `useParams`, `useSearch`, `useLoaderData` and `useRouterState`. To me, this is one of the best features of the Router, and the one that sets it apart from other solutions. 🙌

## File-Based Routing[](#file-based-routing)

​Declarative Routing doesn't work. The idea to just have your app render your `<Route>` components sounds great at first, but it quickly becomes obvious that having `<Route>` spread around multiple nested components is a nightmare for maintainability. So many times I've seen something like:

declarative-routing

```
1<Route path="settings" element={<Settings />} />
```

in a code-base, only to realize that the path in the url isn't `/settings`. Maybe it's `/organization/settings` or `/user/$id/settings` - you won't know until you've traversed the component tree upwards. That's horrible.

Okay, then just don't split it up into multiple files? Sure, that basically leaves you with:

one-route-tree

```
1export function App() {2  return (3    <Routes>4      <Route path="organization">5        <Route index element={<Organization />} />6        <Route path="settings" element={<Settings />} />7      </Route>8      <Route path="user">...</Route>9    </Routes>10  )11}
```

This will likely become a huge, nested tree of Routes, which is fine, but there's another problem: In order to achieve type safety, routes must be known _in advance_, which is fundamentally incompatible with declarative routing.

That brings us to Code-Based Routing, which is the natural next evolution: If we want to have all our route definitions co-located anyway, why not move them out of the react component? That way, we can get extra type information about which routes exist upfront. That's what [createBrowserRoute](https://reactrouter.com/start/data/custom#1-create-a-router) in React Router does, and that's also how [createRouter](https://tanstack.com/router/latest/docs/framework/react/api/router/createRouterFunction) works in TanStack Router.

​File-Based Routing just takes the route config you would usually write yourself and moves them into a file system tree. I know it's controversial, but I kinda like that. I've found it to be the fastest way to get started, as well as the fastest way to map a url you see in your bug report to the code that gets rendered on your screen. It's also the best way to get [automatic code splitting](https://tanstack.com/router/latest/docs/framework/react/guide/code-splitting#using-automatic-code-splitting) for your routes. If you don't like deep directory trees, you can use [flat routes](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing#flat-routes) too, or even create [Virtual File Routes](https://tanstack.com/router/latest/docs/framework/react/routing/virtual-file-routes) if you want to customize the location of your route files.

Anyways, TanStack Router supports both code-based and file-based routing, because in the end, it's all code-based. 🤓

## Integrated Suspense Support[](#integrated-suspense-support)

My personal [relationship with React Suspense](https://tkdodo.eu/blog/react-19-and-suspense-a-drama-in-3-acts) feels more like a situationship, but I love that TanStack Router has built-in support for it. Per default, every route is wrapped in a `<Suspense>` boundary and an `<ErrorBoundary>`, so I can just `useSuspenseQuery` inside my route components and have data guaranteed to be available:

"useSuspenseQuery"

```
1export const Route = createFileRoute('/issues/$issueId')({2  loader: ({ context: { queryClient }, params: { issueId } }) => {3    void queryClient.prefetchQuery(issueQuery(issueId))4  },5  component: Issues,6})7
8function Issues() {9  const { issueId } = Route.useParams()10  const { data } = useSuspenseQuery(issueQuery(issueId))11  //      ^? const data: Issue12}
```

This means I can fully focus my components on displaying the happy path, without having to account for data being potentially `undefined` - even if I'm not awaiting anything in the loader. 🎉

## So Many More Things[](#so-many-more-things)

I haven't even touched on Route Context, Nested Routes, Query Integration, Search Middleware, how to get started in a monorepo or the optional SSR layer that is [TanStack Start](https://tanstack.com/start/latest), but let me tell you: They'll surely all blow your mind away.

The biggest problem with TanStack Router is that once you've worked with it, you'll have a harder time going back to other routing solutions - you get spoiled by its DX and type safety. Combined with React Query, this stack has been a game-changer for my productivity, and I can't wait to share more about it.

Kudos to [Tanner](https://bsky.app/profile/tannerlinsley.com), [Manuel](https://bsky.app/profile/manuelschiller.bsky.social), [Sean](https://bsky.app/profile/seancassiere.com) and [Christopher](https://bsky.app/profile/chorobin.bsky.social) - they've truly created a work of beauty. Their attention to detail, DX and type safety shows in every aspect of the router.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)