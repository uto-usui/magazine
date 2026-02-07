---
title: "Automatic Query Invalidation after Mutations"
source: "https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations"
publishedDate: "2024-05-25"
category: "frontend"
feedName: "TkDodo"
---

![gray and white robot illustration with the TanStack and React Query logo](https://tkdodo.eu/blog/static/243b985bce537d8db87a22e0841247be/bbe0c/automatic-invalidation.jpg "gray and white robot illustration with the TanStack and React Query logo")

**Last Update: 2025-11-25**

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
-   **#25: Automatic Query Invalidation after Mutations**
-   [#26: How Infinite Queries work](https://tkdodo.eu/blog/how-infinite-queries-work)
-   [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/react-query-api-design-lessons-learned)
-   [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/react-query-the-bad-parts)
-   [#29: Concurrent Optimistic Updates in React Query](https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query)
-   [#30: React Query Selectors, Supercharged](https://tkdodo.eu/blog/react-query-selectors-supercharged)

-   [한국어](https://www.sxungchxn.dev/blog/189f225c-7bc4-49f2-b08d-f5b11e4fd48e)
-   [简体中文](https://juejin.cn/post/7388033492569325622)
-   [日本語](https://makotot.dev/posts/automatic-query-invalidation-after-mutations-translation-ja)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Queries and Mutations are two sides of the same coin. A Query defines an asynchronous resource for reading, which often comes from data fetching. A Mutation on the other hand is an action to update such a resource.

When a Mutation finishes, it very likely affects Queries. For example, updating an `issue` will likely affect the list of `issues`. So it might be a bit surprising that React Query does not link Mutations to Queries at all.

The reason behind this is quite simple: React Query is totally un-opinionated about how you manage your resources, and not everyone likes re-fetching after a Mutation. There are cases where the Mutation returns updated data, which we'd want to then [put into the cache manually](https://tanstack.com/query/v5/docs/framework/react/guides/updates-from-mutation-responses) to avoid another network roundtrip.

There are also many different ways of how you'd want to do invalidation:

-   Do you invalidate in `onSuccess` or `onSettled`?  
    The former will only be invoked when the Mutation succeeded, while the latter will also run in case of errors.
-   Do you want to `await` invalidations?  
    [Awaiting an invalidation](https://tkdodo.eu/blog/mastering-mutations-in-react-query#awaited-promises) will result in the Mutation staying in `pending` state until the refetch has finished. This can be a good thing, for example if you'd want your form to stay disabled until then, but it might also be not what you want in case you want to navigate from a detail screen to an overview page as soon as possible.

Since there isn't a one-size-fits-all solution, React Query provides nothing out of the box. However, it's not at all difficult to implement automatic invalidation the way you want them to behave in React Query thanks to the [global cache callbacks](https://tanstack.com/query/v5/docs/reference/MutationCache#global-callbacks).

## The Global Cache Callbacks[](#the-global-cache-callbacks)

Mutations have callbacks - `onSuccess`, `onError` and `onSettled`, which you have to define on each separate `useMutation`. Additionally, the same callbacks exist on the `MutationCache`. Since there is only one `MutationCache` for our application, those callbacks are "global" - they are invoked for _every_ Mutation.

It's not quite obvious how to create a `MutationCache` with callbacks, because in most examples, the `MutationCache` is implicitly created for us when we create the `QueryClient`. However, we can also create the cache itself manually and provide callbacks to it:

create-MutationCache

```
1import { QueryClient, MutationCache } from '@tanstack/react-query'2
3const queryClient = new QueryClient({4  mutationCache: new MutationCache({5    onSuccess,6    onError,7    onSettled,8  }),9})
```

The callbacks get the same arguments as the ones on `useMutation`, except that they will also get the Mutation instance as last parameter. And just like the usual callbacks, returned Promises will be awaited.

So how can the global callback help us with automatic invalidation? Well - we can just call `queryClient.invalidateQueries` inside the global callback:

automatic-invalidation

```
1const queryClient = new QueryClient({2  mutationCache: new MutationCache({3    onSuccess: () => {4      queryClient.invalidateQueries()5    },6  }),7})
```

With just 5 lines of code, we get a similar behaviour to what frameworks like Remix (sorry, React-Router) are doing as well: Invalidate everything after every submission. Shout out to Alex for showing me this path:

[

![Avatar for alexdotjs](https://tkdodo.eu/blog/static/1441f241636588b0812c5ec9e316f5f1/47930/alexdotjs.jpg)

Alex / KATT 🐱

@

alexdotjs

I just invalidate everything on every mutation

https://trpc.io/docs/client/re...

\-

Jan 8, 2024



](https://x.com/alexdotjs/status/1744467890277921095)

### But isn't that excessive ?[](#but-isnt-that-excessive-)

Maybe, maybe not. It depends. Again, that's why it isn't built in, because there are too many different ways to go about it. One thing we have to clarify here is that an invalidation doesn't always equate to a refetch.

Invalidation merely refetches all active Queries that it matches, and marks the rest as `stale`, so that they get refetched when they are used the next time.

This is usually a good trade-off. Consider having an Issue List with filters. Since each filter should be part of the QueryKey, we'll get multiple Queries in the cache. However, I'm only ever viewing one of those Queries at the same time. Refetching them all would lead to lots of unnecessary requests, and there's no guarantee that I will ever go back to a list with one of those filters.

So invalidation only refetches what I currently see on the screen (active Queries) to get an up-to-date view, and everything else will be refetched if we ever need them again.

## Tying invalidation to specific Queries[](#tying-invalidation-to-specific-queries)

Okay, hold on. What about fine-grained revalidation? Why would we invalidate the `profile` data when we add an `issue` to our list? That barely makes sense ...

Again, a trade-off. The code is as simple as it gets, and I would prefer fetching some data more often than strictly necessary over missing a refetch. Fine-grained revalidation is nice if you know exactly what you need to refetch, and that you'll never need to extend those matches.

In the past, we've often done fine-grained revalidation, just to find out that we'd need to add another resource into the mix later which doesn't fit the used invalidation pattern. At that point, we had to go through all mutation callbacks to see if that resource needed to be refetched as well. That's cumbersome and error-prone.

On top of that, we often use a medium-sized `staleTime` of ~2 minutes for most our Queries. So the impact of invalidating after an unrelated user interaction is negligible.

Of course, you can make your logic more involved to make your revalidation smarter. Here are some techniques I've used in the past:

### Tie it to the `mutationKey`[](#tie-it-to-the-mutationkey)

MutationKey and QueryKey have nothing in common, and the one for Mutations is also optional. You can tie them together if you want by using the MutationKey to specify which Queries should be invalidated:

mutationKey

```
1const queryClient = new QueryClient({2  mutationCache: new MutationCache({3    onSuccess: (_data, _variables, _context, mutation) => {4      queryClient.invalidateQueries({5        queryKey: mutation.options.mutationKey,6      })7    },8  }),9})
```

Then, you can give your Mutation a `mutationKey: ['issues']` to invalidate everything `issue` related only. And if you have a Mutation without a key, it would still invalidate everything. Nice.

### Exclude Queries depending on `staleTime`[](#exclude-queries-depending-on-staletime)

I often mark Queries as "static" by giving them `staleTime:Infinity`. If we don't want those Queries to be invalidated, we can look at the `staleTime` setting of a Query and exclude those via the `predicate` filter:

nonStaticQueries

```
1const queryClient = new QueryClient({2  mutationCache: new MutationCache({3    onSuccess: (_data, _variables, _context, mutation) => {4      const nonStaticQueries = (query: Query) => {5        const defaultStaleTime =6          queryClient.getQueryDefaults(query.queryKey).staleTime ?? 07        const staleTimes = query.observers8          .map((observer) => observer.options.staleTime)9          .filter((staleTime) => staleTime !== undefined)10
11        const staleTime =12          query.getObserversCount() > 013            ? Math.min(...staleTimes)14            : defaultStaleTime15
16        return staleTime !== Number.POSITIVE_INFINITY17      }18
19      queryClient.invalidateQueries({20        queryKey: mutation.options.mutationKey,21        predicate: nonStaticQueries,22      })23    },24  }),25})
```

Finding out the actual `staleTime` for a Query is not that trivial, because `staleTime` is an observer level property. But it's doable, and we can also combine the `predicate` filter with other filters like `queryKey`. Neat.

### Use the `meta` option[](#use-the-meta-option)

We can use `meta` to store arbitrary, static information about a Mutation. As an example, we can add an `invalidates` field to give "tags" to our mutation. These tags can then be used to fuzzily match Queries we'd want to invalidate:

the-meta-option

```
1import { matchQuery } from '@tanstack/react-query'2
3const queryClient = new QueryClient({4  mutationCache: new MutationCache({5    onSuccess: (_data, _variables, _context, mutation) => {6      queryClient.invalidateQueries({7        predicate: (query) =>8          // invalidate all matching tags at once9          // or everything if no meta is provided10          mutation.meta?.invalidates?.some((queryKey) =>11            matchQuery({ queryKey }, query)12          ) ?? true,13      })14    },15  }),16})17
18// usage:19useMutation({20  mutationFn: updateLabel,21  meta: {22    invalidates: [['issues'], ['labels']],23  },24})
```

Here, we still use the `predicate` function to get a single call to `queryClient.invalidateQueries`. But inside of it, we do fuzzy matching with `matchQuery` - a function you can import from React Query. It's the same function that gets used internally when passing a single `queryKey` as a filter, but now, we can do it with multiple keys.

This pattern is probably only slightly better than just having `onSuccess` callbacks on `useMutation` itself, but at least we don't need to bring in the QueryClient with `useQueryClient` every time. Also, if we combine this with invalidating everything per default, this will give us a good way to opt-out of that behaviour.

## To Await or not to Await[](#to-await-or-not-to-await)

In all the examples shown above, we are never `awaiting` an invalidation, and that's fine if you want your mutations to finish as fast as possible. One specific situation that I have come across a lot is wanting to invalidate everything, but have the Mutation stay pending until one important refetch is done. For example, I might want label specific Queries to be awaited after updating a label, but I wouldn't want to wait until everything is done refetching.

We can build this into our `meta` solution by extending how that structure is defined, for example:

meta-awaits

```
1useMutation({2  mutationFn: updateLabel,3  meta: {4    invalidates: 'all',5    awaits: ['labels'],6  },7})
```

Or, we can take advantage of the fact that callbacks on the MutationCache run before callbacks on `useMutation`. If we have our global callback set-up to invalidate everything, we can still add a local callback that just `awaits` what we want it to:

local-onSuccess

```
1const queryClient = new QueryClient({2  mutationCache: new MutationCache({3    onSuccess: () => {4      queryClient.invalidateQueries()5    },6  }),7})8
9useMutation({10  mutationFn: updateLabel,11  onSuccess: () => {12    // returning the Promise to await it13    return queryClient.invalidateQueries(14      { queryKey: ['labels'] },15      { cancelRefetch: false }16    )17  },18})
```

Here's what's happening:

-   First, the global callback runs and invalidates all Queries, but we since we neither `await` nor `return` anything, this is a "fire-and-forget" invalidation.
-   Then, our local callback will run immediately after that, where we will create a Promise for invalidating the `['labels']` only. Since we are returning that Promise, the Mutation will stay pending until `['labels']` are refetched.

* * *

I think this shows that it's not a lot of code to add an abstraction that you're comfortable with for automatic invalidation. Just keep in mind that every abstraction has a cost: It's a new API that needs to be learned, understood and applied properly.

I hope by showing all these possibilities, it's a bit clearer why we have nothing built into React Query. Finding an API that is flexible enough to cover all cases without being bloated is not an easy thing to do. For this, I prefer to give _you_ the tools to build this in user-land.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)