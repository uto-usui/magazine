---
title: "React Query Render Optimizations"
source: "https://tkdodo.eu/blog/react-query-render-optimizations"
publishedDate: "2021-03-20"
category: "frontend"
feedName: "TkDodo"
---

20.03.2021 — [ReactJs](https://tkdodo.eu/blog/tags/react-js), [React Query](https://tkdodo.eu/blog/tags/react-query), [JavaScript](https://tkdodo.eu/blog/tags/java-script), [TypeScript](https://tkdodo.eu/blog/tags/type-script) — 4 min read

![optimizations](https://tkdodo.eu/blog/static/0ac0fd0336e25f620a83f91956333882/bbe0c/optimizations.jpg "optimizations")

**Last Update: 2023-10-21**

-   [#1: Practical React Query](https://tkdodo.eu/blog/practical-react-query)
-   [#2: React Query Data Transformations](https://tkdodo.eu/blog/react-query-data-transformations)
-   **#3: React Query Render Optimizations**
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

-   [한국어](https://highjoon-dev.vercel.app/blogs/3-react-query-render-optimizations/)
-   [正體中文](https://yuri-journal.me/%E8%BB%9F%E9%AB%94%E9%96%8B%E7%99%BC/2022061017/)
-   [Español](https://rubenvara.io/react-query/optimizacion-renderizado-react-query/)
-   [简体中文](https://juejin.cn/post/7169141418454155295)
-   [日本語](https://zenn.dev/matazou/articles/0645957b2b9168)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

* * *

I've already written quite a bit about render optimizations when describing the select option in [#2: React Query Data Transformations](https://tkdodo.eu/blog/react-query-data-transformations). However, "Why does React Query re-render my component two times even though nothing changed in my data" is the question I probably needed to answer the most (apart from maybe: "Where can I find the v2 docs" 😅). So let me try to explain it in-depth.

## isFetching transition[](#isfetching-transition)

I haven't been entirely honest in the [last example](https://tkdodo.eu/blog/react-query-data-transformations#3-using-the-select-option) when I said that this component will only re-render if the length of todos change:

count-component

```
1export const useTodosQuery = (select) =>2  useQuery({3    queryKey: ['todos'],4    queryFn: fetchTodos,5    select,6  })7export const useTodosCount = () =>8  useTodosQuery((data) => data.length)9
10function TodosCount() {11  const todosCount = useTodosCount()12
13  return <div>{todosCount.data}</div>14}
```

Every time you make a background refetch, this component will re-render twice with the following query info:

```
1{ status: 'success', data: 2, isFetching: true }2{ status: 'success', data: 2, isFetching: false }
```

That is because React Query exposes a lot of meta information for each query, and `isFetching` is one of them. This flag will always be true when a request is in-flight. This is quite useful if you want to display a background loading indicator. But it's also kinda unnecessary if you don't do that.

### notifyOnChangeProps[](#notifyonchangeprops)

For this use-case, React Query has the `notifyOnChangeProps` option. It can be set on a per-observer level to tell React Query: Please only inform this observer about changes if one of these props change. By setting this option to `['data']`, we will find the optimized version we seek:

optimized-with-notifyOnChangeProps

```
1export const useTodosQuery = (select, notifyOnChangeProps) =>2  useQuery({3    queryKey: ['todos'],4    queryFn: fetchTodos,5    select,6    notifyOnChangeProps,7  })8export const useTodosCount = () =>9  useTodosQuery((data) => data.length, ['data'])
```

You can see this in action in the [optimistic-updates-typescript](https://github.com/tannerlinsley/react-query/blob/9023b0d1f01567161a8c13da5d8d551a324d6c23/examples/optimistic-updates-typescript/pages/index.tsx#L35-L48) example in the docs.

### Staying in sync[](#staying-in-sync)

While the above code works well, it can get out of sync quite easily. What if we want to react to the `error`, too? Or we start to use the `isLoading` flag? We have to keep the `notifyOnChangeProps` list in sync with whichever fields we are actually using in our components. If we forget to do that, and we only observe the `data` property, but get an `error` that we also display, our component will not re-render and is thus outdated. This is especially troublesome if we hard-code this in our custom hook, because the hook does not know what the component will actually use:

outdated-component

```
1export const useTodosCount = () =>2  useTodosQuery((data) => data.length, ['data'])3
4function TodosCount() {5  // 🚨 we are using error,6  // but we are not getting notified if error changes!7  const { error, data } = useTodosCount()8
9  return (10    <div>11      {error ? error : null}12      {data ? data : null}13    </div>14  )15}
```

As I have hinted in the disclaimer in the beginning, I think this is way worse than the occasional unneeded re-render. Of course, we can pass the option to the custom hook, but this still feels quite manual and boilerplate-y. Is there a way to do this automatically? Turns out, there is:

### Tracked Queries[](#tracked-queries)

I'm quite proud of this feature, given that it was my first major contribution to the library. If you set `notifyOnChangeProps` to `'tracked'`, React Query will keep track of the fields you are using during render, and will use this to compute the list. This will optimize exactly the same way as specifying the list manually, except that you don't have to think about it. You can also turn this on globally for all your queries:

tracked-queries

```
1const queryClient = new QueryClient({2  defaultOptions: {3    queries: {4      notifyOnChangeProps: 'tracked',5    },6  },7})8function App() {9  return (10    <QueryClientProvider client={queryClient}>11      <Example />12    </QueryClientProvider>13  )14}
```

With this, you never have to think about re-renders again. Of course, tracking the usages has a bit of an overhead as well, so make sure you use this wisely. There are also some limitations to tracked queries, which is why this is an opt-in feature:

-   If you use [object rest destructuring](https://github.com/tc39/proposal-object-rest-spread/blob/6ee4ce3cdda246746fc46fb149bb8b43c28e704d/Rest.md), you are effectively observing all fields. Normal destructuring is fine, just don't do this:

problematic-rest-destructuring

```
1// 🚨 will track all fields2const { isLoading, ...queryInfo } = useQuery(...)3
4// ✅ this is totally fine5const { isLoading, data } = useQuery(...)
```

-   Tracked queries only work "during render". If you only access fields during effects, they will not be tracked. This is quite the edge case though because of dependency arrays:

tracking-effects

```
1const queryInfo = useQuery(...)2
3// 🚨 will not corectly track data4React.useEffect(() => {5    console.log(queryInfo.data)6})7
8// ✅ fine because the dependency array is accessed during render9React.useEffect(() => {10    console.log(queryInfo.data)11}, [queryInfo.data])
```

-   Tracked queries don't reset on each render, so if you track a field once, you'll track it for the lifetime of the observer:

no-reset

```
1const queryInfo = useQuery(...)2
3if (someCondition()) {4    // 🟡 we will track the data field if someCondition was true in any previous render cycle5    return <div>{queryInfo.data}</div>6}
```

## Structural sharing[](#structural-sharing)

A different, but no less important render optimization that React Query has turned on out of the box is _structural sharing_. This feature makes sure that we keep referential identity of our `data` on every level. As an example, suppose you have the following data structure:

```
1[2  { "id": 1, "name": "Learn React", "status": "active" },3  { "id": 2, "name": "Learn React Query", "status": "todo" }4]
```

Now suppose we transition our first todo into the _done_ state, and we make a background refetch. We'll get a completely new json from our backend:

```
1[2-  { "id": 1, "name": "Learn React", "status": "active" },3+  { "id": 1, "name": "Learn React", "status": "done" },4  { "id": 2, "name": "Learn React Query", "status": "todo" }5]
```

Now React Query will attempt to compare the old state and the new and keep as much of the previous state as possible. In our example, the todos array will be new, because we updated a todo. The object with id 1 will also be new, but the object for id 2 will be the same reference as the one in the previous state - React Query will just copy it over to the new result because nothing has changed in it.

This comes in very handy when using selectors for partial subscriptions:

optimized-selectors

```
1// ✅ will only re-render if _something_ within todo with id:2 changes2// thanks to structural sharing3const { data } = useTodo(2)
```

As I've hinted before, for selectors, structural sharing will be done twice: Once on the result returned from the `queryFn` to determine if anything changed at all, and then once more on the _result_ of the selector function. In some instances, especially when having very large datasets, structural sharing _can_ be a bottleneck. It also only works on json-serializable data. If you don't need this optimization, you can turn it off by setting `structuralSharing: false` on any query.

Have a look at the [replaceEqualDeep tests](https://github.com/tannerlinsley/react-query/blob/80cecef22c3e088d6cd9f8fbc5cd9e2c0aab962f/src/core/tests/utils.test.tsx#L97-L304) if you want to learn more about what happens under the hood.

* * *

Phew, this was quite a handful. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️ I'm always happy to help!

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)