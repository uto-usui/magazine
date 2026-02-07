---
title: "How Infinite Queries work"
source: "https://tkdodo.eu/blog/how-infinite-queries-work"
publishedDate: "2024-09-14"
category: "frontend"
feedName: "TkDodo"
---

![steel wool photography during nighttime](https://tkdodo.eu/blog/static/3db65eaf8152724adba70779a16b5d85/bbe0c/infinite-queries.jpg "steel wool photography during nighttime")

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
-   **#26: How Infinite Queries work**
-   [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/react-query-api-design-lessons-learned)
-   [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/react-query-the-bad-parts)
-   [#29: Concurrent Optimistic Updates in React Query](https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query)
-   [#30: React Query Selectors, Supercharged](https://tkdodo.eu/blog/react-query-selectors-supercharged)

-   [한국어](https://velog.io/@cnsrn1874/how-infinite-queries-work)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

This week, a very interesting [bug report](https://github.com/TanStack/query/issues/8046) was filed for [Infinite Queries](https://tanstack.com/query/v5/docs/framework/react/guides/infinite-queries) in React Query. It was interesting because up to this point, I firmly believed that React Query doesn't have any bugs.

Okay, not really, but I was pretty sure it doesn't have any bugs that would a) affect a large number of users and b) would be because of some architectural constraint in the library itself.

We do of course have edge-case bugs for quite specific situations that need workarounds (can't really live without those) and also some known limitations that might be annoying to accept, for example, that suspense is not working with query cancellation.

But this bug report hit different. It was obviously wrong behavior. We also didn't regress here - it has always worked this way. It could still be classified as an edge case, because for it to happen, you would need to:

-   Have an Infinite Query that has already once successfully fetched multiple pages.
-   Have a refetch where fetching at least one page succeeded, but then the next page failed to fetch.
-   Use at least one retry (default is three).

This likely won't hit you every day, but it also isn't a huge edge-case. I was surprised that in the last four years, no one has reported this. So I asked on twitter and it seems like users have been getting this bug in the past, but also didn't think React Query would have such a huge flaw and thus didn't report it. Seems like we're at least all aligned on the overall quality in React Query. 🙌

* * *

To understand the issue (and why it freaked me out initially), we have to understand how infinite queries are different from normal "single queries".

## Infinite Queries[](#infinite-queries)

Infinite queries are React Query's way to make those doom-scrolling pages we all hate so much somewhat simple to implement. In many ways, they are identical to single queries.

In our cache, every query is represented as an instance of the `Query` class (If you haven't read [#18: Inside React Query](https://tkdodo.eu/blog/inside-react-query), now would be a good time). That instance is responsible for managing the state around the query, and it also holds the `promise` for the current fetch. That's what makes deduplication work - if `query.fetch` is called while the query is already in fetching state, the active promise will be re-used.

Further, the query holds an instance of a `retryer`, which is singlehandedly responsible for doing all logic around retries. If a query wants to fetch data, it tells the `retryer` to start, and it'll get a `promise` back. That promise will only resolve or reject after all retries have been used up.

A simplified, pseudo-code version would look something like this:

retryer

```
1class Query() {2  fetch() {3    if (this.state.fetchStatus === 'idle') {4      this.#dispatch({ type: 'fetch' })5      this.#retryer = createRetryer(6        fetchFn: this.options.queryFn,7        retry: this.options.retry,8        retryDelay: this.options.retryDelay9      )10      return this.#retryer.start()11    }12
13    return this.#retryer.promise14  }15}
```

The `retryer` will call the `fetchFn` passed to it, and it might call it multiple times when doing retries (this is important for understanding the bug, so remember this). All of this is the same for single queries and infinite queries, as there is no separate representation of an `InfiniteQuery` in the cache.

## Differences to Single Queries[](#differences-to-single-queries)

The only thing that really distinguishes infinite queries is how `data` is structured and how we retrieve that `data`. Usually, what you return from the `queryFn` winds up directly in the cache - a simple 1:1 relationship.

With infinite queries, every single call of the `queryFn` will only return one part - one page - of the whole data structure. The pages are like a linked list, where every page depends on the previous one to get its data.

But conceptually, it's still just one query that lives under one QueryKey. We achieve the difference by attaching a different `QueryBehavior` to it.

## QueryBehavior[](#querybehavior)

I wasn't totally honest before about the fact that the `queryFn` gets passed directly to the `retryer`. There is a thin layer around it. For single queries, it's set to executing the `queryFn` only. But for infinite queries, it will take the function from the `infiniteQueryBehavior`:

query-behavior

```
1class Query() {2  fetch() {3    if (this.state.fetchStatus === 'idle') {4      this.#dispatch({ type: 'fetch' })5      this.#retryer = createRetryer(6        fetchFn: this.options.behavior.onFetch(7          this.context,8          this.options.queryFn9        ),10        retry: this.options.retry,11        retryDelay: this.options.retryDelay12      )13      return this.#retryer.start()14    }15
16    return this.#retryer.promise17  }18}
```

The behavior for an infinite query knows what it has to do when it is being run. For example, when you call `fetchNextPage`, it knows to call the `queryFn` passed to it once and append the page to the cached data. If a refetch happens, it executes the `queryFn` in a loop, always calling `getNextPageParam` to ensure consistency. It might look something like this:

InfiniteQueryBehavior

```
1function infiniteQueryBehavior() {2  return {3    onFetch: (context, queryFn) => {4      return async function fetchFn() {5        if (context.direction === 'forward') {6          return [...context.data, await fetchNextPage(queryFn)]7        }8        if (context.direction === 'backward') {9          return [await fetchPreviousPage(queryFn), ...context.data]10        }11
12        const remainingPages = context.data.length13        let currentPage = 014        const result = { pages: [] }15
16        do {17          const param = getNextPageParam(result)18          if (param == null) {19            break20          }21          result.pages.push(await fetchNextPage(queryFn, param))22          currentPage++23        } while (currentPage < remainingPages)24
25        return result26      }27    },28  }29}
```

I think conceptually, this is a brilliant design. All we need to do to make a query an infinite query is to attach the `infiniteQueryBehavior` to it, and the rest works just the same. The `fetchInfiniteQuery` function on the `queryClient` literally does just this:

fetchInfiniteQuery

```
1fetchInfiniteQuery(options) {2  return this.fetchQuery({3    ...options,4    behavior: infiniteQueryBehavior()5  })6}
```

Nothing more to be done. No differences in caching, revalidation or subscriptions. So where's the bug?

## The Bug 🐞[](#the-bug-)

It has to do with the hierarchy of things: The `query` holds the `retryer`, and the `retryer` receives the `fetchFn` returned from the `infiniteQueryBehavior`. As we established earlier, the `retryer` might fire the `fetchFn` multiple times, namely if it catches an error and retries.

Since the `fetchFn` has the fetching loop, the whole loop will re-start and re-fetch in case of a retry. This doesn't matter if the first page failed to fetch, but if a page in the middle fails (the bug reproduction mentions rate limiting as a realistic example), we will re-set the loop and start from scratch. With rate limiting, this means we might never succeed in fetching all pages!

This freaked me out because I was questioning the architecture. Do we need to reverse the order? Does every fetch inside the `infiniteQueryBehavior` need its own retryer? That would be a huge refactoring, and it would likely also affect single queries.

## The Fix 🕵️‍♂️[](#the-fix-%EF%B8%8F%EF%B8%8F)

I couldn't stop thinking about this bug. I didn't want to completely re-write those layers. I thought that the only thing missing was having the `infiniteQueryBehavior` remember at which point to re-start the loop. It turns out, this is trivial with javascript closures. We can hoist the relevant information out of the returned function, so when it's invoked again, it will "remember" where it was:

hoisting

```
1function infiniteQueryBehavior() {2  return {3    onFetch: (context, queryFn) => {4      const remainingPages = context.data.length5      let currentPage = 06      const result = { pages: [] }7
8      return async function fetchFn() {9        if (context.direction === 'forward') {10          return [...context.data, await fetchNextPage(queryFn)]11        }12        if (context.direction === 'backward') {13          return [await fetchPreviousPage(queryFn), ...context.data]14        }15
16        do {17          const param = getNextPageParam(result)18          if (param == null) {19            break20          }21          result.pages.push(await fetchNextPage(queryFn, param))22          currentPage++23        } while (currentPage < remainingPages)24
25        return result26      }27    },28  }29}
```

This way, when `fetchNextPage` fails, the `retyer` will pause and eventually call the `fetchFn` again. But now, it will know where it has to continue, and it will also still retain the information about previously successfully fetched pages. 🎉

Sure, this means a setting of `retry: 3` means three retries over all pages, not three retries per page, but it's still consistent with how single queries work - it's three retries per query, no matter how often it actually fetches.

If you want to see the actual fix, the PR can be found on [GitHub](https://github.com/TanStack/query/pull/8049). Also thanks to [incepter](https://github.com/incepter) for working with me on this and for creating the initial failing test case. 🙏

Of course I added a regression in that PR and broke [tRPC v11](https://trpc.io/), but that's a story for another day ...

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)