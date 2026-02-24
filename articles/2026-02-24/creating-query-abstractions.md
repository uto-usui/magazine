---
title: "Creating Query Abstractions"
source: "https://tkdodo.eu/blog/creating-query-abstractions"
publishedDate: "2026-02-23"
category: "frontend"
feedName: "TkDodo"
---

![Creating Query Abstractions](https://tkdodo.eu/.netlify/images?w=640&h=427&fit=cover&url=%2Fblog%2F_astro%2Fcreating.BJi0s_V2.jpg)

Photo by [Earl Wilcox](https://unsplash.com/@earl_plannerzone)

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
-   #31: Creating Query Abstractions

-   _No translations available._
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Developers love creating abstractions. We see some code that we’ll need in a different place - abstraction. Need this 3-liner, but slightly different - abstraction (with a flag). Need something that every `useQuery` should do - Create an aBsTrAcTiOn!

There’s nothing wrong with abstractions per se, but they have tradeoffs, like everything else. Dan’s talk [The wet codebase (opens in a new window)](https://www.deconstructconf.com/2019/dan-abramov-the-wet-codebase) is among one of my favourite talks ever, and he explains this really well.

## Custom Hooks

[](#custom-hooks)

In React, creating abstractions very often correlates with custom hooks. They are great for sharing logic between multiple components, or even just hiding that gnarly `useEffect` behind a good name. For the longest time, creating your own abstraction over `useQuery` meant writing a custom hook:

```
function useInvoice(id: number) {  return useQuery({    queryKey: ['invoice', id],    queryFn: () => fetchInvoice(id),  })}const { data } = useInvoice(1)
```

This is straightforward, and I can now call `useInvoice()` wherever I want instead of having to repeat the `queryKey` and `queryFn` all the time. It ensures consistency for the `queryKey`, which could otherwise lead to duplicate cache entries. And because it just returns what `useQuery` returns, we have an interface that is aligned with TanStack Query’s API surface, so there’s no surprise naming where this hook is used.

Types are also fully inferred, because we don’t annotate any generics manually anywhere, which is great. The more our TypeScript code looks like plain JavaScript, the better.

## Query Options

[](#query-options)

But what about the input to this custom hook ? `useQuery` has 24 options, and we with the current abstraction, we can’t pass any of those in. What if we want to pass a different `staleTime` for one of our screens where getting background updates isn’t as important? Sure, I guess we’ll just accept that as another parameter:

```
function useInvoice(id: number, staleTime: number) {  return useQuery({    queryKey: ['invoice', id],    queryFn: () => fetchInvoice(id),    staleTime,  })}
```

This still looks okay I guess, but next thing you know, somebody wants to integrate the Query with Error Boundaries, so they want to pass `throwOnError`. Okay, but that many parameters isn’t a good interface, I guess we should’ve just made it an object in the first place:

```
function useInvoice(  id: number,  options?: { staleTime?: number; throwOnError?: boolean },) {  return useQuery({    queryKey: ['invoice', id],    queryFn: () => fetchInvoice(id),    ...options,  })}
```

At this point, you’re likely wondering if you’re still on the right track. Always having to touch our small abstraction whenever there’s a new use-case that React Query covers doesn’t seem ideal. For the return value, we’ve chosen to stick to what the library returns - so can’t we just do the same thing for the options we get passed in?

### UseQueryOptions

[](#usequeryoptions)

We dig a bit deeper and find out that React Query exposes a type called `UseQueryOptions` - sounds like what we want:

```
import type { UseQueryOptions } from '@tanstack/react-query'function useInvoice(id: number, options?: Partial<UseQueryOptions>) {  return useQuery({    queryKey: ['invoice', id],    queryFn: () => fetchInvoice(id),    ...options,  })}
```

There are no type errors, so this works, right? Well, let’s look at a usage again:

```
const { data } = useInvoice(1, { throwOnError: true })
```

Our `data` has become of type `unknown`. This might be unexpected, but it all goes back to how Query uses Generics for ideal type inference. I’ve written about this before in [#6: React Query and TypeScript](https://tkdodo.eu/blog/react-query-and-type-script#the-four-generics). The problem might become more obvious once we inspect what `options` actually infers to:

```
declare const options: UseQueryOptions
```

`UseQueryOptions` has the same four generics, and if we omit them, its default values are taken instead. The default for `data` happens to be `unknown`, so when we spread those options onto our `useQuery`, the types are widened to `unknown`.

## TypeScript Libraries

[](#typescript-libraries)

I’ve found this to be a common problem with libraries that try to give you a lot of type safety through type inference. They tend to work really, really well when used “directly”, but as soon as you try to create low-level, generic abstractions over them, it becomes difficult to get right.

TanStack Query only has four generics, so we might be able to just re-create them. TanStack Form has 23 type parameters on most of the types and TanStack Router - let’s better not talk about that. 😂

So clearly, this only works to some degree. I have a four-year-old tweet about how to get it going with TanStack Query, but honestly, it’s a mess:

[

![Avatar for TkDodo](https://tkdodo.eu/blog/_astro/profile.CH3A0ub9.jpg)

Dominik 🔮

@

TkDodo

I have been asked a lot lately how to make your own low-level abstraction over useQuery and have it work in #TypeScript. My answer is usually: You don’t need it, as those abstractions are often too wide. But there are use-cases for it, so here is my take. Let’s break it down ⬇️

![UseApi](https://tkdodo.eu/blog/_astro/UseApi.CApobHhq.jpeg)

\-

Feb 9, 2022



](https://x.com/TkDodo/status/1491451513264574501)

### The Naive Solution

[](#the-naive-solution)

And because it’s so complicated, I’m seeing this done wrong all the time. The naive solution is to just declare the first type parameter on `UseQueryOptions`:

```
function useInvoice(  id: number,  options?: Partial<UseQueryOptions<Invoice>>,) {  return useQuery({    queryKey: ['invoice', id],    queryFn: () => fetchInvoice(id),    ...options,  })}const { data } = useInvoice(1, { throwOnError: true })
```

This “works” to infer `data` again, but falls apart if we need options that rely on other type parameters, like `select`:

```
const { data } = useInvoice(1, {  select: (invoice) => invoice.createdAt,Error ts(2322)  ― Type '(invoice: Invoice) => string' is not assignable to type '(data: Invoice) => Invoice'.
  Type 'string' is not assignable to type 'Invoice'.})
```

As the tweet shows, we can add more type parameters to our own abstractions, but this is takes us further away from code that looks like Just JavaScript™. The promise was that those libraries do the ugly TypeScript stuff for us so we don’t have to …

## Finding Better Abstractions

[](#finding-better-abstractions)

I’ve come to the conclusion that custom hooks are just not the right abstraction here, and that has multiple reasons:

-   Custom hooks can only be used in components or other hooks. This might’ve been fine when React Query first launched, but we’ve since seen that we want to use it on the server. We want to use it in route loaders. We want to use it for prefetching in event handlers. These are all environments where we can’t use hooks.
-   Custom hooks are a great way to share logic between components, which we aren’t doing here. We are sharing configurations.
-   The custom hook ties us to a specific implementation (`useQuery`), but we might want to switch that out. If we want to use [Suspense (opens in a new window)](https://react.dev/reference/react/Suspense) for data fetching, we need a different hook (`useSuspenseQuery`). There’s also `useQueries` for running multiple Queries in parallel - how can we combine that with `useInvoice` ? We can’t …

## The Query Options API

[](#the-query-options-api)

Since v5, my preferred way to create Query abstractions is not with custom hooks anymore but with `queryOptions`.

That API solves all mentioned problems and more. We can use it between different hooks, and even share it with imperative functions. It’s just a regular function, so it works anywhere. At runtime, it doesn’t do anything. Here’s the transpiled output:

```
function queryOptions(options) {  return options}
```

But on type level, it becomes a real powerhouse, making it the best way to share query configurations:

```
import { queryOptions } from '@tanstack/react-query'function invoiceOptions(id: number) {  return queryOptions({    queryKey: ['invoice', id],    queryFn: () => fetchInvoice(id),  })}const { data: invoice1 } = useQuery(invoiceOptions(1))const { data: invoice2 } = useSuspenseQuery(invoiceOptions(2))
```

Okay, this solves the interoperability problem, but how can I pass options now? If we’re adding options as a param to `invoiceOptions`, we’re back to square one.

## Composing QueryOptions

[](#composing-queryoptions)

Well, that’s the good news: We don’t have to do that. The idea is that `invoiceOptions` only contains the options we want to share between every usage. The best abstractions are not configurable, so we just keep it like that. If we want to set other options, we just pass them on top of `invoiceOptions` directly at the usage sites:

```
import { queryOptions } from '@tanstack/react-query'function invoiceOptions(id: number) {  return queryOptions({    queryKey: ['invoice', id],    queryFn: () => fetchInvoice(id),  })}const invoiceQuery = useQuery({  ...invoiceOptions(1),  throwOnError: true,  select: (invoice) => invoice.createdAt,})invoiceQuery.data
```

And this just works! With all options, full type inference, looks like JavaScript, absolutely straightforward. You can of course still create custom hooks if you want to, but they should likely be built on top of `queryOptions`, as that’s the first abstraction building block you should be reaching for. Simplicity is king, and it doesn’t get any simpler than this. 👑

* * *

That’s it for today. Feel free to reach out to me on [bluesky (opens in a new window)](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

Check out [monolisa.dev](https://www.monolisa.dev/?ref=dominik)

[![Query.gg - The official React Query course](https://tkdodo.eu/.netlify/images?w=4096&h=400&fit=cover&url=%2Fblog%2F_astro%2Fquery-gg.Ch3mBCol.jpg)](https://query.gg/?s=dom)

[![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/.netlify/images?w=4096&h=256&fit=cover&url=%2Fblog%2F_astro%2Fbytes.PgTxoh9S.jpg)](https://bytes.dev/?r=dom)

## Continue Series

© 2026 by TkDodo's blog. All rights reserved.