---
title: "Status Checks in React Query"
source: "https://tkdodo.eu/blog/status-checks-in-react-query"
publishedDate: "2021-03-27"
category: "frontend"
feedName: "TkDodo"
---

27.03.2021 — [react](https://tkdodo.eu/blog/tags/react), [React Query](https://tkdodo.eu/blog/tags/react-query), [JavaScript](https://tkdodo.eu/blog/tags/java-script), [TypeScript](https://tkdodo.eu/blog/tags/type-script) — 3 min read

![status checks](https://tkdodo.eu/blog/static/6cda595cbac1c0f639595e928340f225/bbe0c/status-checks.jpg "status checks")

**Last Update: 2023-10-21**

-   [#1: Practical React Query](https://tkdodo.eu/blog/practical-react-query)
-   [#2: React Query Data Transformations](https://tkdodo.eu/blog/react-query-data-transformations)
-   [#3: React Query Render Optimizations](https://tkdodo.eu/blog/react-query-render-optimizations)
-   **#4: Status Checks in React Query**
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

-   [한국어](https://highjoon-dev.vercel.app/blogs/4-status-checks-in-react-query/)
-   [Español](https://rubenvara.io/react-query/comprobar-estado-react-query/)
-   [简体中文](https://juejin.cn/post/7170939711991742477)
-   [日本語](https://makotot.dev/posts/status-checks-in-react-query-translation-ja)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

One advantage of React Query is the easy access to status fields of the query. You instantly know if your query is loading or if it's erroneous. For this, the library exposes a bunch of boolean flags, which are mostly derived from the internal state machine. Looking at [the types](https://github.com/TanStack/query/blob/87358d73582b369f06cc81d0dfa135323df7d43d/packages/query-core/src/types.ts#L441), your query can be in one of the following states:

-   `success`: Your query was successful, and you have `data` for it
-   `error`: Your query did not work, and an `error` is set
-   `pending`: Your query has no data

Note that the `isFetching` flag is _not_ part of the internal state machine - it is an additional flag that will be true whenever a request is in-flight. You can be fetching and success, you can be fetching and error - but you cannot be loading and success at the same time. The state machine makes sure of that.

## The standard example[](#the-standard-example)

Most examples look something like this:

standard-example

```
1const todos = useTodos()2
3if (todos.isPending) {4  return 'Loading...'5}6if (todos.error) {7  return 'An error has occurred: ' + todos.error.message8}9
10return <div>{todos.data.map(renderTodo)}</div>
```

Here, we check for pending and error first, and then display our data. This is probably fine for some use-cases, but not for others. Many data fetching solutions, especially hand-crafted ones, have no refetch mechanism, or only refetch on explicit user interactions.

But React Query does.

It refetches quite aggressively per default, and does so without the user actively requesting a refetch. The concepts of `refetchOnMount`, `refetchOnWindowFocus` and `refetchOnReconnect` are great for keeping your data accurate, but they might cause a confusing ux if such an automatic background refetch fails.

## Background errors[](#background-errors)

In many situations, if a background refetch fails, it could be silently ignored. But the code above does not do that. Let's look at two examples:

-   The user opens a page, and the initial query loads successfully. They are working on the page for some time, then switch browser tabs to check emails. They come back some minutes later, and React Query will do a background refetch. Now that fetch fails.
-   Our user is on page with a list view, and they click on one item to drill down to the detail view. This works fine, so they go back to the list view. Once they go to the detail view again, they will see data from the cache. This is great - except if the background refetch fails.

In both situations, our query will be in the following state:

```
1{2  "status": "error",3  "error": { "message": "Something went wrong" },4  "data": [{ ... }]5}
```

As you can see, we will have _both_ an error _and_ the stale data available. This is what makes React Query great - it embraces the stale-while-revalidate caching mechanism, which means it will always give you data if it exists, even if it's stale.

Now it's up to us to decide what we display. Is it important to show the error? Is it enough to show the stale data only, if we have any? Should we show both, maybe with a little _background error_ indicator?

There is no clear answer to this question - it depends on your exact use-case. However, given the two above examples, I think it would be a somewhat confusing user experience if data would be replaced with an error screen.

This is even more relevant when we take into account that React Query will retry failed queries three times per default with exponential backoff, so it might take a couple of seconds until the stale data is replaced with the error screen. If you also have no background fetching indicator, this can be really perplexing.

This is why I usually check for data-availability first:

data-first

```
1const todos = useTodos()2
3if (todos.data) {4  return <div>{todos.data.map(renderTodo)}</div>5}6if (todos.error) {7  return 'An error has occurred: ' + todos.error.message8}9
10return 'Loading...'
```

Again, there is no clear principle of what is right, as it is highly dependent on the use-case. Everyone should be aware of the consequences that aggressive refetching has, and we have to structure our code accordingly rather than strictly following the simple todo-examples 😉.

Special thanks go to [Niek Bosch](https://github.com/boschni) who first highlighted to me why this pattern of status checking can be harmful in some situations.

* * *

Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)