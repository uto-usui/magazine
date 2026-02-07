---
title: "Effective React Query Keys"
source: "https://tkdodo.eu/blog/effective-react-query-keys"
publishedDate: "2021-06-13"
category: "frontend"
feedName: "TkDodo"
---

13.06.2021 — [ReactJs](https://tkdodo.eu/blog/tags/react-js), [React Query](https://tkdodo.eu/blog/tags/react-query), [JavaScript](https://tkdodo.eu/blog/tags/java-script), [TypeScript](https://tkdodo.eu/blog/tags/type-script) — 4 min read

![keys](https://tkdodo.eu/blog/static/bb0cf6c7bce80ebc7c101954b313bf9a/bbe0c/keys.jpg "keys")

**Last Update: 2022-04-23**

-   [#1: Practical React Query](https://tkdodo.eu/blog/practical-react-query)
-   [#2: React Query Data Transformations](https://tkdodo.eu/blog/react-query-data-transformations)
-   [#3: React Query Render Optimizations](https://tkdodo.eu/blog/react-query-render-optimizations)
-   [#4: Status Checks in React Query](https://tkdodo.eu/blog/status-checks-in-react-query)
-   [#5: Testing React Query](https://tkdodo.eu/blog/testing-react-query)
-   [#6: React Query and TypeScript](https://tkdodo.eu/blog/react-query-and-type-script)
-   [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/using-web-sockets-with-react-query)
-   **#8: Effective React Query Keys**
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

-   [한국어](https://highjoon-dev.vercel.app/blogs/8-effective-react-query-keys/)
-   [日本語](https://makotot.dev/posts/effective-react-query-keys-translation-ja)
-   [简体中文](https://juejin.cn/post/7262745726966939706)
-   [Español](https://rubenvara.io/react-query/claves-eficaces-react-query/)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

[Query Keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys) are a very important core concept in React Query. They are necessary so that the library can internally cache your data correctly and refetch automatically when a dependency to your query changes. Lastly, it will allow you to interact with the Query Cache manually when needed, for example, when updating data after a mutation or when you need to manually invalidate some queries.

Let's quickly have a look at what these three points mean before showing you how I personally organize Query Keys to be able to do these things more effectively.

## Caching Data[](#caching-data)

Internally, the Query Cache is just a JavaScript object, where the keys are serialized Query Keys and the values are your Query Data plus meta information. The keys are hashed in a [deterministic way](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys#query-keys-are-hashed-deterministically), so you can use objects as well (on the top level, keys have to be strings or arrays though).

The most important part is that keys need to be _unique_ for your queries. If React Query finds an entry for a key in the cache, it will use it. Please also be aware that you cannot use the same key for `useQuery` _and_ `useInfiniteQuery`. There is, after all, only _one_ Query Cache, and you would share the data between these two. That is not good because infinite queries have a fundamentally different structure than "normal" queries.

```
1useQuery({2  queryKey: ['todos'],3  queryFn: fetchTodos,4})5
6// 🚨 this won't work7useInfiniteQuery({8  queryKey: ['todos'],9  queryFn: fetchInfiniteTodos,10})11
12// ✅ choose something else instead13useInfiniteQuery({14  queryKey: ['infiniteTodos'],15  queryFn: fetchInfiniteTodos,16})
```

## Automatic Refetching[](#automatic-refetching)

Queries are declarative.

This is a _very_ important concept that cannot be emphasized enough, and it's also something that might take some time to "click". Most people think about queries, and especially refetching, in an _imperative_ way.

I have a query, it fetches some data. Now I click this button and I want to refetch, but with different parameters. I've seen many attempts that look like this:

imperative-refetch

```
1function Component() {2  const { data, refetch } = useQuery({3    queryKey: ['todos'],4    queryFn: fetchTodos,5  })6
7  // ❓ how do I pass parameters to refetch ❓8  return <Filters onApply={() => refetch(???)} />9}
```

The answer is: You don't.

That's not what `refetch` is for - it's for refetching _with the same parameters_.

If you have some _state_ that changes your data, all you need to do is to put it in the Query Key, because React Query will trigger a refetch automatically whenever the key changes. So when you want to apply your filters, just change your _client state_:

query-key-drives-the-query

```
1function Component() {2  const [filters, setFilters] = React.useState()3  const { data } = useQuery({4    queryKey: ['todos', filters],5    queryFn: () => fetchTodos(filters),6  })7
8  // ✅ set local state and let it drive the query9  return <Filters onApply={setFilters} />10}
```

The re-render triggered by the `setFilters` update will pass a different Query Key to React Query, which will make it refetch. I have a more in-depth example in [#1: Practical React Query - Treat the query key like a dependency array](https://tkdodo.eu/blog/practical-react-query#treat-the-query-key-like-a-dependency-array).

## Manual Interaction[](#manual-interaction)

Manual Interactions with the Query Cache are where the structure of your Query Keys is most important. Many of those interaction methods, like [invalidateQueries](https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientinvalidatequeries) or [setQueriesData](https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientsetquerydata) support [Query Filters](https://tanstack.com/query/latest/docs/framework/react/guides/filters#query-filters), which allow you to fuzzily match your Query Keys.

## Effective React Query Keys[](#effective-react-query-keys)

Please note that these points reflect my personal opinion (as everything on this blog, actually), so don't take it as something that you absolutely must do when working with Query Keys. I have found these strategies to work best when your App becomes more complex, and they also scale quite well. You definitely don't need to do this for a Todo App 😁.

### Colocate[](#colocate)

If you haven't yet read [Maintainability through colocation](https://kentcdodds.com/blog/colocation) by [Kent C. Dodds](https://twitter.com/kentcdodds), please do. I don't believe that storing all your Query Keys globally in `/src/utils/queryKeys.ts` will make things better. I keep my Query Keys next to their respective queries, co-located in a feature directory, so something like:

```
1- src2  - features3    - Profile4      - index.tsx5      - queries.ts6    - Todos7      - index.tsx8      - queries.ts
```

The _queries_ file will contain everything React Query related. I usually only export custom hooks, so the actual Query Functions as well as Query Keys will stay local.

### Always use Array Keys[](#always-use-array-keys)

Yes, Query Keys can be a string, too, but to keep things unified, I like to always use Arrays. React Query will internally convert them to an Array anyhow, so:

always-use-array-keys

```
1// 🚨 will be transformed to ['todos'] anyhow2useQuery({ queryKey: 'todos' })3// ✅4useQuery({ queryKey: ['todos'] })
```

​Update: With React Query v4, all keys need to be Arrays.

### Structure[](#structure)

Structure your Query Keys from _most generic_ to _most specific_, with as many levels of granularity as you see fit in between. Here's how I would structure a todos list that allows for filterable lists as well as detail views:

```
1['todos', 'list', { filters: 'all' }]2['todos', 'list', { filters: 'done' }]3['todos', 'detail', 1]4['todos', 'detail', 2]
```

With that structure, I can invalidate everything todo related with `['todos']`, all the lists or all the details, as well as target one specific list if I know the exact key. [Updates from Mutation Responses](https://react-query.tanstack.com/guides/updates-from-mutation-responses) become a lot more flexible with this, because you can target all lists if necessary:

updates-from-mutation-responses

```
1function useUpdateTitle() {2  return useMutation({3    mutationFn: updateTitle,4    onSuccess: (newTodo) => {5      // ✅ update the todo detail6      queryClient.setQueryData(7        ['todos', 'detail', newTodo.id],8        newTodo9      )10
11      // ✅ update all the lists that contain this todo12      queryClient.setQueriesData(['todos', 'list'], (previous) =>13        previous.map((todo) =>14          todo.id === newTodo.id ? newTodo : todo15        )16      )17    },18  })19}
```

This might not work if the structure of lists and details differ a lot, so alternatively, you can also of course just invalidate all the lists instead:

invalidate-all-lists

```
1function useUpdateTitle() {2  return useMutation({3    mutationFn: updateTitle,4    onSuccess: (newTodo) => {5      queryClient.setQueryData(6        ['todos', 'detail', newTodo.id],7        newTodo8      )9
10      // ✅ just invalidate all the lists11      queryClient.invalidateQueries({12        queryKey: ['todos', 'list']13      })14    },15  })16}
```

If you know which list you are currently on, e.g. by reading the filters from the url, and can therefore construct the exact Query Key, you can also combine this two methods and call `setQueryData` on your list and invalidate all the others:

combine

```
1function useUpdateTitle() {2  // imagine a custom hook that returns3  // the current filters, stored in the url4  const { filters } = useFilterParams()5
6  return useMutation({7    mutationFn: updateTitle,8    onSuccess: (newTodo) => {9      queryClient.setQueryData(10        ['todos', 'detail', newTodo.id],11        newTodo12      )13
14      // ✅ update the list we are currently on15      queryClient.setQueryData(16        ['todos', 'list', { filters }],17        (previous) =>18          previous.map((todo) =>19            todo.id === newTodo.id ? newtodo : todo20          )21      )22
23      // 🥳 invalidate all the lists,24      // but don't refetch the active one25      queryClient.invalidateQueries({26        queryKey: ['todos', 'list'],27        refetchActive: false,28      })29    },30  })31}
```

​Update: In v4, `refetchActive` has been replaced with `refetchType`. In the above example, that would be `refetchType: 'none'`, because we don't want to refetch anything.

### Use Query Key factories[](#use-query-key-factories)

In the examples above, you can see that I've been manually declaring the Query Keys a lot. This is not only error-prone, but it also makes changes harder in the future, for example, if you find out that you'd like to add _another_ level of granularity to your keys.

That's why I recommend one Query Key factory per feature. It's just a simple object with entries and functions that will produce query keys, which you can then use in your custom hooks. For the above example structure, it would look something like this:

query-key-factory

```
1const todoKeys = {2  all: ['todos'] as const,3  lists: () => [...todoKeys.all, 'list'] as const,4  list: (filters: string) => [...todoKeys.lists(), { filters }] as const,5  details: () => [...todoKeys.all, 'detail'] as const,6  detail: (id: number) => [...todoKeys.details(), id] as const,7}
```

This gives me a lot of flexibility, as each level builds on top of another, but is still independently accessible:

examples

```
1// 🕺 remove everything related2// to the todos feature3queryClient.removeQueries({4  queryKey: todoKeys.all5})6
7// 🚀 invalidate all the lists8queryClient.invalidateQueries({9  queryKey: todoKeys.lists()10})11
12// 🙌 prefetch a single todo13queryClient.prefetchQueries({14  queryKey: todoKeys.detail(id),15  queryFn: () => fetchTodo(id),16})
```

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)