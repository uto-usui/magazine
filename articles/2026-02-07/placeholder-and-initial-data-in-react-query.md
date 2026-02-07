---
title: "Placeholder and Initial Data in React Query"
source: "https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query"
publishedDate: "2021-08-09"
category: "frontend"
feedName: "TkDodo"
---

09.08.2021 — [ReactJs](https://tkdodo.eu/blog/tags/react-js), [React Query](https://tkdodo.eu/blog/tags/react-query), [JavaScript](https://tkdodo.eu/blog/tags/java-script), [TypeScript](https://tkdodo.eu/blog/tags/type-script) — 4 min read

![placeholder and initial data](https://tkdodo.eu/blog/static/4ee595d88b40efaf69dcc173ed492632/bbe0c/placeholder-and-initial-data.jpg "placeholder and initial data")

-   [#1: Practical React Query](https://tkdodo.eu/blog/practical-react-query)
-   [#2: React Query Data Transformations](https://tkdodo.eu/blog/react-query-data-transformations)
-   [#3: React Query Render Optimizations](https://tkdodo.eu/blog/react-query-render-optimizations)
-   [#4: Status Checks in React Query](https://tkdodo.eu/blog/status-checks-in-react-query)
-   [#5: Testing React Query](https://tkdodo.eu/blog/testing-react-query)
-   [#6: React Query and TypeScript](https://tkdodo.eu/blog/react-query-and-type-script)
-   [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/using-web-sockets-with-react-query)
-   [#8: Effective React Query Keys](https://tkdodo.eu/blog/effective-react-query-keys)
-   [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/leveraging-the-query-function-context)
-   **#9: Placeholder and Initial Data in React Query**
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

-   [한국어](https://highjoon-dev.vercel.app/blogs/9-placeholder-and-initial-data-in-react-query)
-   [Español](https://rubenvara.io/react-query/data-inicial-placeholder/)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Today's article is all about improving the user experience when working with React Query. Most of the time, we (and our users) dislike pesky loading spinners. They are a necessity sometimes, but we still want to avoid them if possible.

React Query already gives us the tools to get rid of them in many situations. We get stale data from the cache while background updates are happening, we can [prefetch data](https://tanstack.com/query/latest/docs/react/guides/prefetching) if we know that we need it later, and we can even [keep previous data](https://tanstack.com/query/latest/docs/react/guides/paginated-queries#better-paginated-queries-with-placeholderdata) when our query keys change to avoid those hard loading states.

Another way is to _synchronously_ pre-fill the cache with data that we think will potentially be right for our use-case, and for that, React Query offers two different yet similar approaches: [Placeholder Data](https://tanstack.com/query/latest/docs/react/guides/placeholder-query-data) and [Initial Data](https://tanstack.com/query/latest/docs/react/guides/initial-query-data).

Let's start with what they both have in common before exploring their differences and the situations where one might be better suited than the other.

## Similarities[](#similarities)

As already hinted, they both provide a way to pre-fill the cache with data that we have synchronously available. It further means that if either one of these is supplied, our query will not be in `loading` state, but will go directly to `success` state. Also, they can both be either a _value_ or a function that returns a _value_, for those times when computing that value is expensive:

success-queries

```
1function Component() {2  // ✅ status will be success even if we have not yet fetched data3  const { data, status } = useQuery({4    queryKey: ['number'],5    queryFn: fetchNumber,6    placeholderData: 23,7  })8
9  // ✅ same goes for initialData10  const { data, status } = useQuery({11    queryKey: ['number'],12    queryFn: fetchNumber,13    initialData: () => 42,14  })15}
```

Lastly, neither has an effect if you already have data in your cache. So what difference does it make if I use one or the other? To understand that, we have to briefly take a look at how (and on which "level") the options in React Query work:

### On cache level[](#on-cache-level)

For each Query Key, there is only one cache entry. This is kinda obvious because part of what makes React Query great is the possibility to share the same data "globally" in our application.

Some options we provide to `useQuery` will affect that cache entry, prominent examples are `queryFn` and `gcTime`. Since there is only _one_ cache entry, those options specify how to get data for that entry, or when it can be garbage collected.

### On observer level[](#on-observer-level)

An observer in React Query is, broadly speaking, a subscription created for one cache entry. The observer watches the cache entry for changes and will be informed every time something changes.

The basic way to create an observer is to call `useQuery`. Every time we do that, we create an observer, and our component will re-render when data changes. This of course means we can have multiple observers watching the same cache entry.

By the way, you can see how many observers a query has by the number on the left of the Query Key in the React Query Devtools (3 in this example):

![observers](https://tkdodo.eu/blog/static/986ddce4accc50a039147674f2ece7c1/9bf66/observers.png "observers")

Some options that work on observer level would be `select` or `refetchInterval`. In fact, what makes `select` so great for [data transformations](https://tkdodo.eu/blog/react-query-data-transformations#3-using-the-select-option) is the ability to watch the same cache entry, but subscribe to different slices of its data in different components.

## Differences[](#differences)

`InitialData` works on cache level, while `placeholderData` works on observer level. This has a couple of implications:

### Persistence[](#persistence)

First of all, `initialData` is persisted to the cache. It's one way of telling React Query: I have "good" data for my use-case already, data that is as good as if it were fetched from the backend. Because it works on cache level, there can only be one `initialData`, and that data will be put into the cache as soon as the cache entry is created (meaning when the first observer mounts). If you try to mount a second observer with different `initialData`, it won't do anything.

`PlaceholderData` on the other hand is _never_ persisted to the cache. I like to see it as "fake-it-till-you-make-it" data. It's "not real". React Query gives it to you so that you can show it while the real data is being fetched. Because it works on observer level, you can theoretically even have different `placeholderData` for different components.

### Background refetches[](#background-refetches)

With `placeholderData`, you will always get a background refetch when you mount an observer for the first time. Because the data is "not real", React Query will get the real data for you. While this is happening, you will also get an `isPlaceholderData` flag returned from `useQuery`. You can use this flag to visually hint to your users that the data they are seeing is in fact just placeholderData. It will transition back to `false` as soon as the real data comes in.

`InitialData` on the other hand, because data is seen as good and valid data that we actually put into our cache, respects `staleTime`. If you have a `staleTime` of zero (which is the default), you will still see a background refetch.

But if you've set a `staleTime` (e.g. 30 seconds) on your query, React Query will see the `initialData` and be like:

> Oh, I'm getting fresh and new data here synchronously, thank you very much, now I don't need to go to the backend because this data is good for 30 seconds.

— React Query when it sees _initialData_ and _staleTime_

If that's not what you want, you can provide `initialDataUpdatedAt` to your query. This will tell React Query when this initialData has been created, and background refetches will be triggered, taking this into account as well. This is extremely helpful when using initialData from an existing cache entry by using the available `dataUpdatedAt` timestamp:

initialDataUpdatedAt

```
1const useTodo = (id) => {2  const queryClient = useQueryClient()3
4  return useQuery({5    queryKey: ['todo', id],6    queryFn: () => fetchTodo(id),7    staleTime: 30 * 1000,8    initialData: () =>9      queryClient10        .getQueryData(['todo', 'list'])11        ?.find((todo) => todo.id === id),12    initialDataUpdatedAt: () =>13      // ✅ will refetch in the background if our list query data14      // is older than the provided staleTime (30 seconds)15      queryClient.getQueryState(['todo', 'list'])?.dataUpdatedAt,16  })17}
```

### Error transitions[](#error-transitions)

Suppose you provide `initialData` or `placeholderData`, and a background refetch is triggered, which then fails. What do you think will happen in each situation? I've hidden the answers so that you can try to come up with them for yourselves if you want before expanding them.

InitialDataSince _initialData_ is persisted in the cache, the refetch error is treated like any other background error. Our query will be in _error_ state, but your _data_ will still be there.PlaceholderDataSince _placeholderData_ is "fake-it-till-you-make-it" data, and we didn't make it, we won't see that data anymore. Our query will be in _error_ state, and our _data_ will be _undefined_.

## When to use what[](#when-to-use-what)

As always, that is totally up to you. I personally like to use `initialData` when pre-filling a query from another query, and I use `placeholderData` for everything else.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)