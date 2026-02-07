---
title: "Practical React Query"
source: "https://tkdodo.eu/blog/practical-react-query"
publishedDate: "2020-11-16"
category: "frontend"
feedName: "TkDodo"
---

![a wall full of old tools](https://tkdodo.eu/blog/static/27b1e5fe65872b6e010d2fa695669354/bbe0c/practical.jpg "a wall full of old tools")

**Last Update: 2023-10-21**

-   **#1: Practical React Query**
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

-   [한국어](https://highjoon-dev.vercel.app/blogs/1-practical-react-query/)
-   [正體中文](https://yuri-journal.me/%E8%BB%9F%E9%AB%94%E9%96%8B%E7%99%BC/2022060716)
-   [Português](https://dbrno.vercel.app/pt-BR/blog/practical-react-query)
-   [日本語](https://yamaneko.dev/blogs/translation_practical_react_query/)
-   [Español](https://rubenvara.io/react-query/consejos-practicos-react-query/)
-   [简体中文](https://juejin.cn/post/7164602747361165349)
-   [Русский](https://garbalau-blog.vercel.app/blog/react-query-overview)
-   [Polski](https://medium.com/@grzegorz.chyla/react-query-w-praktyce-f1da6e334065)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

When GraphQL and especially [Apollo Client](https://www.apollographql.com/docs/react/) became popular in ca. 2018, there was a lot of fuss about it completely replacing redux, and the question [Is Redux dead yet?](https://dev.to/markerikson/redux---not-dead-yet-1d9k) has been asked a lot.

I distinctly remember not understanding what this was all about. Why would some data fetching library replace your global state manager? What does one even have to do with the other?

I was under the impression that GraphQL clients like Apollo would only fetch the data for you, similar to what e.g. [axios](https://github.com/axios/axios) does for REST, and that you would still obviously need some way of making that data accessible to your application.

I couldn't have been more wrong.

## Client State vs. Server State[](#client-state-vs-server-state)

What Apollo gives you is not just the ability to describe which data you want and to fetch that data, it also comes with a _cache_ for that server data. This means that you can just use the same `useQuery` hook in multiple components, and it will only fetch data once and then subsequently return it from the cache.

This sounds _very_ familiar with what we, and probably many other teams as well, have mainly been using `redux` for: Fetch data from the server and make it available everywhere.

So it seems that we have always been treating this _server state_ like any other _client state_. Except that when it comes to _server state_ (think: A list of articles that you fetch, the details of a User you want to display, ...), your app does not own it. We have only borrowed it to display the most recent version of it on the screen for the user. It is the server who owns the data.

To me, that introduced a paradigm shift in how to think about data. If we can leverage the cache to display data that we do not own, there isn't really much left that is real client state that _also_ needs to be made available to the whole app. That made me understand why many think that Apollo can replace redux in lots of instances.

## React Query[](#react-query)

I have never had the chance to use GraphQL. We have an existing REST API, don't really experience problems with over-fetching, it just works, etc. Clearly, there aren't enough pain points for us to warrant a switch, especially given that you'd also have to adapt the backend, which isn't quite so simple.

Yet I still envied the simplicity of how data fetching can look like on the frontend, including the handling of loading and error states. If only there were something similar in React for REST APIs...

Enter [React Query](https://tanstack.com/query/latest/).

Made by the open sourcerer [Tanner Linsley](https://github.com/tannerlinsley) in late 2019, React Query takes the good parts of Apollo and brings them to REST. It works with any function that returns a Promise and embraces the _stale-while-revalidate_ caching strategy. The library operates on sane defaults that try to keep your data as fresh as possible while at the same time showing data to the user as early as possible, making it feel near instant at times and thus providing a great UX. On top of that, it is also very flexible and lets you customize various settings for when the defaults are not enough.

This article is not going to be an introduction to React Query though.

I think the docs are great at explaining Guides & Concepts, there are [Videos](https://tanstack.com/query/latest/docs/react/videos) from various Talks that you can watch, and Tanner has a React Query [Essentials Course](https://learn.tanstack.com/) you can take if you want to get familiar with the library.

I want to focus more on some practical tips that go beyond the docs, which might be useful when you are already working with the library. These are things I have picked up over the last couple of months when I was not only actively using the library at work, but also got involved in the React Query community, answering questions on Discord and in GitHub Discussions.

### The Defaults explained[](#the-defaults-explained)

I believe the React Query [Defaults](https://tanstack.com/query/latest/docs/react/guides/important-defaults) are very well-chosen, but they can catch you off guard from time to time, especially at the beginning.

First of all: React Query does _not_ invoke the `queryFn` on every re-render, even with the default `staleTime` of zero. Your app can re-render for various reasons at any time, so fetching every time would be insane!

> Always code for re-renders, and a lot of them. I like to call it render resiliency.

— Tanner Linsley

If you see a refetch that you are not expecting, it is likely because you just focused the window and React Query is doing a `refetchOnWindowFocus`, which is a great feature for production: If the user goes to a different browser tab, and then comes back to your app, a background refetch will be triggered automatically, and data on the screen will be updated if something has changed on the server in the meantime. All of this happens without a loading spinner being shown, and your component will not re-render if the data is the same as you currently have in the cache.

During development, this will probably be triggered more frequently, especially because focusing between the Browser DevTools and your app will also cause a fetch, so be aware of that.

Secondly, there seems to be a bit of confusion between `gcTime` and `staleTime`, so let me try to clear that up:

-   `staleTime`: The duration until a query transitions from fresh to stale. As long as the query is fresh, data will always be read from the cache only - no network request will happen! If the query is stale (which per default is: instantly), you will still get data from the cache, but a background refetch can happen [under certain conditions](https://tanstack.com/query/latest/docs/react/guides/caching).
-   `gcTime`: The duration until inactive queries will be removed from the cache. This defaults to 5 minutes. Queries transition to the inactive state as soon as there are no observers registered, so when all components which use that query have unmounted.

Most of the time, if you want to change one of these settings, it's the `staleTime` that needs adjusting. I have rarely ever needed to tamper with the `gcTime`. There is a good [explanation by example](https://tanstack.com/query/latest/docs/react/guides/caching#basic-example) in the docs as well.

### Use the React Query DevTools[](#use-the-react-query-devtools)

This will help you immensely in understanding the state a query is in. The DevTools will also tell you what data is currently in the cache, so you'll have an easier time debugging. In addition to that, I have found that it helps to throttle your network connection in the browser DevTools if you want to better recognize background refetches, since dev-servers are usually pretty fast.

### Treat the query key like a dependency array[](#treat-the-query-key-like-a-dependency-array)

I am referring to the dependency array of the [useEffect](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect) hook here, which I assume you are familiar with.

Why are these two similar?

Because React Query will trigger a refetch whenever the query key changes. So when we pass a variable parameter to our `queryFn`, we almost always want to fetch data when that value changes. Instead of orchestrating complex effects to manually trigger a refetch, we can utilize the query key:

feature/todos/queries.ts

```
1type State = 'all' | 'open' | 'done'2type Todo = {3  id: number4  state: State5}6type Todos = ReadonlyArray<Todo>7
8const fetchTodos = async (state: State): Promise<Todos> => {9  const response = await axios.get(`todos/${state}`)10  return response.data11}12
13export const useTodosQuery = (state: State) =>14  useQuery({15    queryKey: ['todos', state],16    queryFn: () => fetchTodos(state),17  })
```

Here, imagine that our UI displays a list of todos along with a filter option. We would have some local state to store that filtering, and as soon as the user changes their selection, we would update that local state, and React Query will automatically trigger the refetch for us, because the query key changes. We are thus keeping the user's filter selection _in sync_ with the query function, which is very similar to what a dependency array represents for useEffect. I don't think I have ever passed a variable to the `queryFn` that was _not_ part of the `queryKey`, too.

#### A new cache entry[](#a-new-cache-entry)

Because the query key is used as a key for the cache, you will get a new cache entry when you switch from 'all' to 'done', and that will result in a hard loading state (probably showing a loading spinner) when you switch for the first time. This is certainly not ideal, so if possible, we can try to pre-fill the newly created cache entry with [initialData](https://tanstack.com/query/latest/docs/react/guides/initial-query-data#initial-data-from-cache). The above example is perfect for that, because we can do some client side pre-filtering on our todos:

pre-filtering

```
1type State = 'all' | 'open' | 'done'2type Todo = {3  id: number4  state: State5}6type Todos = ReadonlyArray<Todo>7
8const fetchTodos = async (state: State): Promise<Todos> => {9  const response = await axios.get(`todos/${state}`)10  return response.data11}12
13export const useTodosQuery = (state: State) =>14  useQuery({15    queryKey: ['todos', state],16    queryFn: () => fetchTodos(state),17    initialData: () => {18      const allTodos = queryClient.getQueryData<Todos>([19        'todos',20        'all',21      ])22      const filteredData =23        allTodos?.filter((todo) => todo.state === state) ?? []24
25      return filteredData.length > 0 ? filteredData : undefined26    },27  })
```

Now, every time the user switches between states, if we don't have data yet, we try to show data from the 'all todos' cache. We can instantly show the 'done' todos that we have to the user, and they will still see the updated list once the background fetch finishes.

I think this is a great ux improvement for just a few lines of code.

### Keep server and client state separate[](#keep-server-and-client-state-separate)

This goes hand in hand with [putting-props-to-use-state](https://tkdodo.eu/blog/putting-props-to-use-state), an article I have written last month: If you get data from `useQuery`, try not to put that data into local state. The main reason is that you implicitly opt out of all background updates that React Query does for you, because the state "copy" will not update with it.

This is fine if you want to e.g. fetch some default values for a Form, and render your Form once you have data. Background updates are very unlikely to yield something new, and even if, your Form has already been initialized. So if you do that on purpose, make sure to _not_ fire off unnecessary background refetches by setting `staleTime`:

initial-form-data

```
1const App = () => {2  const { data } = useQuery({3    queryKey: ['key'],4    queryFn,5    staleTime: Infinity,6  })7
8  return data ? <MyForm initialData={data} /> : null9}10
11const MyForm = ({ initialData }) => {12  const [data, setData] = React.useState(initialData)13  ...14}
```

This concept will be a bit harder to follow through when you display data that you also want to allow the user to edit, but it has many advantages. I have prepared a little codesandbox example:

The important part of this demo is that we never put the value that we get from React Query into local state. This makes sure that we always see the latest data, because there is no local "copy" of it.

### The enabled option is very powerful[](#the-enabled-option-is-very-powerful)

The `useQuery` hook has many options that you can pass in to customize its behaviour, and the `enabled` option is a very powerful one that _enables_ you to do many cool things (pun intended). Here is a short list of things that we were able to accomplish thanks to this option:

-   [Dependent Queries](https://tanstack.com/query/latest/docs/react/guides/dependent-queries)  
    Fetch data in one query and have a second query only run once we have successfully obtained data from the first query.
-   Turn queries on and off  
    We have one query that polls data regularly thanks to `refetchInterval`, but we can temporarily pause it if a Modal is open to avoid updates in the back of the screen.
-   Wait for user input  
    Have some filter criteria in the query key, but disable it for as long as the user has not applied their filters.
-   Disable a query after some user input  
    e.g. if we then have a draft value that should take precedence over the server data. See the above example.

### Don't use the queryCache as a local state manager[](#dont-use-the-querycache-as-a-local-state-manager)

If you tamper with the queryCache (`queryClient.setQueryData`), it should only be for optimistic updates or for writing data that you receive from the backend after a mutation. Remember that every background refetch might override that data, so [use](https://reactjs.org/docs/hooks-state.html) [something](https://zustand.surge.sh/) [else](https://redux.js.org/) for local state.

### Create custom hooks[](#create-custom-hooks)

Even if it's only for wrapping one `useQuery` call, creating a custom hook usually pays off because:

-   You can keep the actual data fetching out of the ui, but co-located with your `useQuery` call.
-   You can keep all usages of one query key (and potentially type definitions) in one file.
-   If you need to tweak some settings or add some data transformation, you can do that in one place.

You have already seen an example of that in the [todos queries above](#treat-the-query-key-like-a-dependency-array).

* * *

I hope that these practical tips will help you to get started with React Query, so go check it out :) If you have any further questions, please let me know in the comments below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)