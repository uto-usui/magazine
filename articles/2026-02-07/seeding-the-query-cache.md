---
title: "Seeding the Query Cache"
source: "https://tkdodo.eu/blog/seeding-the-query-cache"
publishedDate: "2022-10-22"
category: "frontend"
feedName: "TkDodo"
---

![seeding](https://tkdodo.eu/blog/static/f9c7ab2e3da8295072c5194b9351dd78/bbe0c/seeding.jpg "seeding")

**Last Update: 2023-10-21**

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
-   **#17: Seeding the Query Cache**
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

-   [한국어](https://velog.io/@eunbinn/seeding-the-query-cache)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

A new RFC about [first class support for Promises](https://github.com/reactjs/rfcs/pull/229) has been released last week, and it got some talk going about how this would introduce fetch waterfalls if used incorrectly. So what are fetch waterfalls exactly?

## Fetch waterfalls[](#fetch-waterfalls)

A waterfall describes a situation where one request is made, and we wait for it to complete before firing another request.

Sometimes, this is unavoidable, because the first request contains information that is needed to make the second request. We also refer to these as [dependent queries](https://tanstack.com/query/v4/docs/guides/dependent-queries):

![component mounts, /user endpoint is being fetched, and after that, we fire off two requests for the user's projects and todos](https://tkdodo.eu/blog/static/5a0c2ea17c5a775f159e46c470a97778/7d769/dependent-queries.png "component mounts, /user endpoint is being fetched, and after that, we fire off two requests for the user's projects and todos")

In many cases though, we can actually fetch all the data we need in parallel, because it is independent data:

![component mounts, both /issues and /labels are fetched at the same time](https://tkdodo.eu/blog/static/7284be2140c3e29e4bfe41eef53d71f2/7d769/parallel-queries.png "component mounts, both /issues and /labels are fetched at the same time")

In React Query, we can do that in two different ways:

parallel-queries

```
1// 1. Use useQuery twice2const issues = useQuery({ queryKey: ['issues'], queryFn: fetchIssues })3const labels = useQuery({ queryKey: ['labels'], queryFn: fetchLabels })4
5// 2. Use the useQueries hook6const [issues, labels] = useQueries([7  { queryKey: ['issues'], queryFn: fetchIssues },8  { queryKey: ['labels'], queryFn: fetchLabels },9])
```

In both variants, React Query will kick off data fetching in parallel. So where do waterfalls come in?

### Suspense[](#suspense)

As described in the above linked RFC, suspense is a way to unwrap promises with React. A defining trait of promises is that they can be in three different states: `pending`, `fulfilled` or `rejected`.

When rendering components, we are mostly interested in the success scenario. Handling loading and error states in each and every component can be tedious, and suspense is aimed at solving this problem.

When a promise is _pending_, React will unmount the component tree and render a fallback defined by a `Suspense` boundary component. In case of errors, the error is bubbled up to the nearest `ErrorBoundary`.

This will decouple our components from handling those states, and we can focus on the happy path. It almost acts like synchronous code that just _reads_ a value from a cache. React Query offers a dedicated `useSuspenseQuery` hook for that since v5:

useQuery-with-suspense

```
1function Issues() {2  // 👓 read data from cache3  const { data } = useSuspenseQuery({4    queryKey: ['issues'],5    queryFn: fetchIssues,6  })7
8  // 🎉 no need to handle loading or error states9
10  return (11    <div>12      { /* TypeScript knows data can't be undefined */ }13      {data.map((issue) => (14        <div>{issue.title}</div>15      ))}16    </div>17  )18}19
20function App() {21  // 🚀 Boundaries handle loading and error states22  return (23    <Suspense fallback={<div>Loading...</div>}>24      <ErrorBoundary fallback={<div>On no!</div>}>25        <Issues />26      </ErrorBoundary>27    </Suspense>28  )29}
```

### Suspense waterfalls[](#suspense-waterfalls)

So this is nice and all, but it can backfire when you use multiple queries in the same component that have suspense turned on. Here is what happens:

![component mounts, /issues are fetched and component suspends. After the request is finished, component mounts and suspends again, triggering a fetch for /labels](https://tkdodo.eu/blog/static/54d16212ebb0b786e6cb90bc03b08534/7d769/fetch-waterfall.png "component mounts, /issues are fetched and component suspends. After the request is finished, component mounts and suspends again, triggering a fetch for /labels")

-   Component renders, tries to read the first query
-   Sees that there is no data in the cache yet, so it suspends
-   This unmounts the component tree, and renders the fallback
-   When the fetch is finished, the component tree is remounted
-   First query is now read successfully from the cache
-   Component sees the second query, and tries to read it
-   Second query has no data in the cache, so it suspends (again)
-   Second query is fetched
-   Component finally renders successfully

This will have pretty impactful implications on your application's performance, because you'll see that fallback for waaay longer than necessary.

The best way to circumvent this problem is to stick to one query per component, or to make sure that there is already data in the cache when the component tries to read it.

## Prefetching[](#prefetching)

The earlier you initiate a fetch, the better, because the sooner it starts, the sooner it can finish. 🤓

-   If your architecture supports server side rendering - consider [fetching on the server](https://tanstack.com/query/v5/docs/framework/react/guides/ssr).
-   If you have a router that supports loaders, consider [prefetching there](https://tanstack.com/query/v5/docs/framework/react/guides/prefetching).

But even if that's not the case, you can still use `prefetchQuery` to initiate a fetch before the component is rendered:

prefetching

```
1const issuesQuery = { queryKey: ['issues'], queryFn: fetchIssues }2
3// ⬇️ initiate a fetch before the component renders4queryClient.prefetchQuery(issuesQuery)5
6function Issues() {7  const issues = useSuspenseQuery(issuesQuery)8}
```

The call to `prefetchQuery` is executed as soon as your JavaScript bundle is evaluated. This works very well if you do [route base code splitting](https://reactjs.org/docs/code-splitting.html#route-based-code-splitting), because it means the code for a certain page will be lazily loaded and evaluated as soon as the user navigates to that page.

This means it will still be kicked off before the component renders. If you do this for both queries in our example, you will get those parallel queries back even when using suspense.

![prefetch for both queries triggers before the component mounts. component suspends for a short time until both queries re finished.](https://tkdodo.eu/blog/static/f577f42c9148f7a764f34fd904fafbec/7d769/prefetching.png "prefetch for both queries triggers before the component mounts. component suspends for a short time until both queries re finished.")

As we can see, the query will still suspend until both are done fetching, but because we've triggered them in parallel, the waiting time is now drastically reduced.

**Note**: `useQueries` doesn't support `suspense` right now, but it might do in the future. If we add support, the goal is to trigger all fetches in parallel to avoid those waterfalls.

### The use RFC[](#the-use-rfc)

I don't know enough about the RFC yet to properly comment on it. A big part is still missing, namely how the cache API will work. I do think it is a bit problematic that the default behaviour will lead to waterfalls unless developers explicitly seed the cache early on. I'm still pretty excited about it because it will likely make internals of React Query easier to understand and maintain. It remains to be seen if it is something that will be used in userland a lot.

## Seeding details from lists[](#seeding-details-from-lists)

Another nice way to make sure that your cache is filled by the time it is read is to seed it from other parts of the cache. Oftentimes, if you render a detail view of an item, you will have data for that item readily available if you've previously been on a list view that shows a list of items.

There are two common approaches to fill a detail cache with data from a list cache:

### Pull approach[](#pull-approach)

This is the one also described [in the docs](https://tanstack.com/query/v4/docs/guides/initial-query-data#initial-data-from-cache): When you try to render the detail view, you look up the list cache for the item you want to render. If it is there, you use it as initial data for the detail query.

pull-approach

```
1const useTodo = (id: number) => {2  const queryClient = useQueryClient()3  return useQuery({4    queryKey: ['todos', 'detail', id],5    queryFn: () => fetchTodo(id),6    initialData: () => {7      // ⬇️ look up the list cache for the item8      return queryClient9        .getQueryData(['todos', 'list'])10        ?.find((todo) => todo.id === id)11    },12  })13}
```

If the `initialData` function returns `undefined`, the query will proceed as normal and fetch the data from the server. And if something is found, it will be put into the cache directly.

Be advised that if you have `staleTime` set, no further background refetch will occur, as initialData is seen as _fresh_. This might not be what you want if your list was last fetched twenty minutes ago.

As shown [in the docs](https://tanstack.com/query/v4/docs/guides/initial-query-data#initial-data-from-the-cache-with-initialdataupdatedat), we can additionally specify `initialDataUpdatedAt` on our detail query. It will tell React Query when the data we are passing in as `initialData` was originally fetched, so it can determine staleness correctly. Conveniently, React Query also knows when the list was last fetched, so we can just pass that in:

initialDataUpdatedAt

```
1const useTodo = (id: number) => {2  const queryClient = useQueryClient()3  return useQuery({4    queryKey: ['todos', 'detail', id],5    queryFn: () => fetchTodo(id),6    initialData: () => {7      return queryClient8        .getQueryData(['todos', 'list'])9        ?.find((todo) => todo.id === id)10    },11    initialDataUpdatedAt: () =>12      // ⬇️ get the last fetch time of the list13      queryClient.getQueryState(['todos', 'list'])?.dataUpdatedAt,14  })15}
```

🟢   seeds the cache "just in time"  
🔴   needs more work to account for staleness

### Push approach[](#push-approach)

Alternatively, you can create detail caches whenever you fetch the list query. This has the advantage that staleness is automatically measured from when the list was fetched, because, well, that's when we create the detail entry.

However, there is no good callback to hook into when a query is fetched. The global `onSuccess` callback on the cache itself might work, but it would be executed for every query, so we'd have to narrow it down to the right query key.

The best way I've found to execute the push approach is to do it directly in the `queryFn`, after data has been fetched:

push-approach

```
1const useTodos = () => {2  const queryClient = useQueryClient()3  return useQuery({4    queryKey: ['todos', 'list'],5    queryFn: async () => {6      const todos = await fetchTodos()7      todos.forEach((todo) => {8        // ⬇️ create a detail cache for each item9        queryClient.setQueryData(['todos', 'detail', todo.id], todo)10      })11      return todos12    },13  })14}
```

This would create a detail entry for each item in the list immediately. Since there is no one interested in those queries at the moment, those would be seen as _inactive_, which means they might be garbage collected after `gcTime` has elapsed (default: 15 minutes).

So if you use the push approach, the detail entries you've created here might no longer be available once the user actually navigates to the detail view. Also, if your list is long, you might be creating way too many entries that will never be needed.

🟢   staleTime is automatically respected  
🟡   there is no good callback  
🟡   might create unnecessary cache entries  
🔴   pushed data might be garbage collected too early

* * *

Keep in mind that both approaches only work well if the structure of your detail query is exactly the same (or at least assignable to) the structure of the list query. If the detail view has a mandatory field that doesn't exist in the list, seeding via `initialData` is not a good idea. This is where `placeholderData` comes in, and I've written a comparison about the two in [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query).

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)