---
title: "React Query Data Transformations"
source: "https://tkdodo.eu/blog/react-query-data-transformations"
publishedDate: "2021-03-10"
category: "frontend"
feedName: "TkDodo"
---

![transformations](https://tkdodo.eu/blog/static/8dcd594d239f514bb0b7058364c3740b/bbe0c/transformations.jpg "transformations")

**Last Update: 2023-10-21**

-   [#1: Practical React Query](https://tkdodo.eu/blog/practical-react-query)
-   **#2: React Query Data Transformations**
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

-   [한국어](https://highjoon-dev.vercel.app/blogs/2-react-query-data-transformations/)
-   [正體中文](https://yuri-journal.me/%E8%BB%9F%E9%AB%94%E9%96%8B%E7%99%BC/2022060818/)
-   [Español](https://rubenvara.io/react-query/transformacion-data-react-query/)
-   [简体中文](https://juejin.cn/post/7165534728433434661)
-   [日本語](https://zenn.dev/matazou/articles/b06e53111fdd50)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Welcome to Part 2 of "Things I have to say about react-query". As I've become more and more involved with the library and the community around it, I've observed some more patterns people frequently ask about. Initially, I wanted to write them all down in one big article, but then decided to break them down into more manageable pieces. The first one is about a quite common and important task: Data Transformation.

## Data Transformation[](#data-transformation)

Let's face it - most of us are _not_ using GraphQL. If you do, then you can be very happy because you have the luxury of requesting your data in the format that you desire.

If you are working with REST though, you are constrained by what the backend returns. So how and where do you best transform data when working with react-query? The only answer worth a damn in software development applies here as well:

> It depends.

— Every developer, always

Here are 3+1 approaches on where you _can_ transform data with their respective pros and cons:

### 0\. On the backend[](#0-on-the-backend)

This is my favourite approach, if you can afford it. If the backend returns data in exactly the structure we want, there is nothing we need to do. While this might sound unrealistic in many cases, e.g. when working with public REST APIs, it is also quite possible to achieve in enterprise applications. If you are in control of the backend and have an endpoint that returns data for your exact use-case, prefer to deliver the data the way you expect it.

🟢   no work on the frontend  
🔴   not always possible

### 1\. In the queryFn[](#1-in-the-queryfn)

The `queryFn` is the function that you pass to `useQuery`. It expects you to return a Promise, and the resulting data winds up in the query cache. But it doesn't mean that you have to absolutely return data in the structure that the backend delivers here. You can transform it before doing so:

queryFn-transformation

```
1const fetchTodos = async (): Promise<Todos> => {2  const response = await axios.get('todos')3  const data: Todos = response.data4
5  return data.map((todo) => todo.name.toUpperCase())6}7
8export const useTodosQuery = () =>9  useQuery({10    queryKey: ['todos'],11    queryFn: fetchTodos,12  })
```

On the frontend, you can then work with this data "as if it came like this from the backend". No where in your code will you actually work with todo names that are _not_ upper-cased. You will also _not_ have access to the original structure. If you look at the react-query-devtools, you will see the transformed structure. If you look at the network trace, you'll see the original structure. This might be confusing, so keep that in mind.

Also, there is no optimization that react-query can do for you here. Every time a fetch is executed, your transformation will run. If it's expensive, consider one of the other alternatives. Some companies also have a shared api layer that abstracts data fetching, so you might not have access to this layer to do your transformations.

🟢   very "close to the backend" in terms of co-location  
🟡   the transformed structure winds up in the cache, so you don't have access to the original structure  
🔴   runs on every fetch  
🔴   not feasible if you have a shared api layer that you cannot freely modify

### 2\. In the render function[](#2-in-the-render-function)

As advised in [Part 1](https://tkdodo.eu/blog/practical-react-query), if you create custom hooks, you can easily do transformations there:

render-transformation

```
1const fetchTodos = async (): Promise<Todos> => {2  const response = await axios.get('todos')3  return response.data4}5
6export const useTodosQuery = () => {7  const queryInfo = useQuery({8    queryKey: ['todos'],9    queryFn: fetchTodos,10  })11
12  return {13    ...queryInfo,14    data: queryInfo.data?.map((todo) => todo.name.toUpperCase()),15  }16}
```

As it stands, this will not only run every time your fetch function runs, but actually on every render (even those that do not involve data fetching). This is likely not a problem at all, but if it is, you can optimize with `useMemo`. Be careful to define your dependencies _as narrow as possible_. `data` inside the queryInfo will be referentially stable unless something really changed (in which case you want to recompute your transformation), but the `queryInfo` itself will _not_. If you add `queryInfo` as your dependency, the transformation will again run on every render:

useMemo-dependencies

```
1export const useTodosQuery = () => {2  const queryInfo = useQuery({3    queryKey: ['todos'],4    queryFn: fetchTodos5  })6
7  return {8    ...queryInfo,9    // 🚨 don't do this - the useMemo does nothing at all here!10    data: React.useMemo(11      () => queryInfo.data?.map((todo) => todo.name.toUpperCase()),12      [queryInfo]13    ),14
15    // ✅ correctly memoizes by queryInfo.data16    data: React.useMemo(17      () => queryInfo.data?.map((todo) => todo.name.toUpperCase()),18      [queryInfo.data]19    ),20  }21}
```

Especially if you have additional logic in your custom hook to combine with your data transformation, this is a good option. Be aware that data can be potentially undefined, so use optional chaining when working with it.

🟢   optimizable via useMemo  
🟡   exact structure cannot be inspected in the devtools  
🔴   a bit more convoluted syntax  
🔴   data can be potentially undefined  
🔴   not recommended with tracked queries  

### 3\. using the select option[](#3-using-the-select-option)

v3 introduced built-in selectors, which can also be used to transform data:

select-transformation

```
1export const useTodosQuery = () =>2  useQuery({3    queryKey: ['todos'],4    queryFn: fetchTodos,5    select: (data) => data.map((todo) => todo.name.toUpperCase()),6  })
```

selectors will only be called if `data` exists, so you don't have to care about `undefined` here. Selectors like the one above will also run on every render, because the functional identity changes (it's an inline function). If your transformation is expensive, you can memoize it either with useCallback, or by extracting it to a stable function reference:

select-memoizations

```
1const transformTodoNames = (data: Todos) =>2  data.map((todo) => todo.name.toUpperCase())3
4export const useTodosQuery = () =>5  useQuery({6    queryKey: ['todos'],7    queryFn: fetchTodos,8    // ✅ uses a stable function reference9    select: transformTodoNames,10  })11
12export const useTodosQuery = () =>13  useQuery({14    queryKey: ['todos'],15    queryFn: fetchTodos,16    // ✅ memoizes with useCallback17    select: React.useCallback(18      (data: Todos) => data.map((todo) => todo.name.toUpperCase()),19      []20    ),21  })
```

Further, the select option can also be used to subscribe to only parts of the data. This is what makes this approach truly unique. Consider the following example:

select-partial-subscriptions

```
1export const useTodosQuery = (select) =>2  useQuery({3    queryKey: ['todos'],4    queryFn: fetchTodos,5    select,6  })7
8export const useTodosCount = () =>9  useTodosQuery((data) => data.length)10export const useTodo = (id) =>11  useTodosQuery((data) => data.find((todo) => todo.id === id))
```

Here, we've created a [useSelector](https://react-redux.js.org/api/hooks#useselector) like API by passing a custom selector to our `useTodosQuery`. The custom hooks still works like before, as `select` will be `undefined` if you don't pass it, so the whole state will be returned.

But if you pass a selector, you are now only subscribed to the result of the selector function. This is quite powerful, because it means that even if we update the name of a todo, our component that only subscribes to the count via `useTodosCount` will _not_ rerender. The count hasn't changed, so react-query can choose to _not_ inform this observer about the update 🥳 (Please note that this is a bit simplified here and technically not entirely true - I will talk in more detail about render optimizations in Part 3).

🟢   best optimizations  
🟢   allows for partial subscriptions  
🟡   structure can be different for every observer  
🟡   structural sharing is performed twice (I will also talk about this in more detail in [Part 3](https://tkdodo.eu/blog/react-query-render-optimizations))

* * *

That's all I have for today 👋. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu), if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)