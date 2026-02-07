---
title: "React Query Error Handling"
source: "https://tkdodo.eu/blog/react-query-error-handling"
publishedDate: "2021-09-10"
category: "frontend"
feedName: "TkDodo"
---

![error handling](https://tkdodo.eu/blog/static/81915dee3ffd49bc0840fbb93cb81b71/bbe0c/error-handling.jpg "error handling")

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
-   **#11: React Query Error Handling**
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

-   [한국어](https://highjoon-dev.vercel.app/blogs/11-react-query-error-handling)
-   [Español](https://rubenvara.io/react-query/gestion-errores-react-query)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Handling errors is an integral part of working with asynchronous data, especially data fetching. We have to face it: Not all requests will be successful, and not all Promises will be fulfilled.

Oftentimes, it is something that we don't focus on right from the beginning though. We like to handle "sunshine cases" first where error handling becomes an afterthought.

However, not thinking about how we are going to handle our errors might negatively affect user experience. To avoid that, let's dive into what options React Query offers us when it comes to error handling.

## Prerequisites[](#prerequisites)

React Query needs a rejected Promise in order to handle errors correctly. Luckily, this is exactly what you'll get when you work with libraries like [axios](https://axios-http.com/).

If you are working with [the fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) or other libraries that _do not_ give you a rejected Promise on erroneous status codes like 4xx or 5xx, you'll have to do the transformation yourself in the `queryFn`. This is covered in [the official docs](https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default).

## The standard example[](#the-standard-example)

Let's see how most examples around displaying errors look like:

the-standard-example

```
1function TodoList() {2  const todos = useQuery({3    queryKey: ['todos'],4    queryFn: fetchTodos5  })6
7  if (todos.isPending) {8    return 'Loading...'9  }10
11  // ✅ standard error handling12  // could also check for: todos.status === 'error'13  if (todos.isError) {14    return 'An error occurred'15  }16
17  return (18    <div>19      {todos.data.map((todo) => (20        <Todo key={todo.id} {...todo} />21      ))}22    </div>23  )24}
```

Here, we're handling error situations by checking for the `isError` boolean flag (which is derived from the `status` enum) given to us by React Query.

This is certainly okay for some scenarios, but has a couple of drawbacks, too:

1.  It doesn't handle background errors very well: Would we really want to unmount our complete Todo List just because a background refetch failed? Maybe the api is temporarily down, or we reached a rate limit, in which case it might work again in a few minutes. You can have a look at [#4: Status Checks in React Query](https://tkdodo.eu/blog/status-checks-in-react-query) to find out how to improve that situation.
    
2.  It can become quite boilerplate-y if you have to do this in every component that wants to use a query.
    

To solve the second issue, we can use a great feature provided directly by React itself:

## Error Boundaries[](#error-boundaries)

[Error Boundaries](https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries) are a general concept in React to catch runtime errors that happen during rendering, which allows us to react (pun intended) properly to them and display a fallback UI instead.

This is nice because we can wrap our components in Error Boundaries at any granularity we want, so that the rest of the UI will be unaffected by that error.

One thing that Error Boundaries _cannot_ do is catch asynchronous errors, because those do not occur during rendering. So to make Error Boundaries work in React Query, the library internally catches the error for you and re-throws it in the next render cycle so that the Error Boundary can pick it up.

I think this is a pretty genius yet simple approach to error handling, and all you need to do to make that work is pass the `throwOnError` flag to your query (or provide it via a default config):

throwOnError

```
1function TodoList() {2  // ✅ will propagate all fetching errors3  // to the nearest Error Boundary4  const todos = useQuery({5    queryKey: ['todos'],6    queryFn: fetchTodos,7    throwOnError: true,8  })9
10  if (todos.data) {11    return (12      <div>13        {todos.data.map((todo) => (14          <Todo key={todo.id} {...todo} />15        ))}16      </div>17    )18  }19
20  return 'Loading...'21}
```

Starting with [v3.23.0](https://github.com/tannerlinsley/react-query/releases/tag/v3.23.0), you can even customize which errors should go towards an Error Boundary, and which ones you'd rather handle locally by providing a function to `throwOnError`:

granular-error-boundaries

```
1useQuery({2  queryKey: ['todos'],3  queryFn: fetchTodos,4  // 🚀 only server errors will go to the Error Boundary5  throwOnError: (error) => error.response?.status >= 500,6})
```

This also works for [mutations](https://react-query.tanstack.com/guides/mutations), and is quite helpful for when you're doing form submissions. Errors in the 4xx range can be handled locally (e.g. if some backend validation failed), while all 5xx server errors can be propagated to the Error Boundary.

## Showing error notifications[](#showing-error-notifications)

For some use-cases, it might be better to show error toast notifications that pop up somewhere (and disappear automatically) instead of rendering Alert banners on the screen. These are usually opened with an imperative api, like the one offered by [react-hot-toast](https://react-hot-toast.com/):

react-hot-toast

```
1import toast from 'react-hot-toast'2
3toast.error('Something went wrong')
```

So how can we do this when getting an error from React Query?

### The onError callback[](#the-onerror-callback)

the-onError-callback

```
1const useTodos = () =>2  useQuery({3    queryKey: ['todos'],4    queryFn: fetchTodos,5    // ⚠️ looks good, but is maybe _not_ what you want6    onError: (error) =>7      toast.error(`Something went wrong: ${error.message}`),8  })
```

At first glance, it looks like the `onError` callback is exactly what we need to perform a side effect if a fetch fails, and it will also work - for as long as we only use the custom hook once!

You see, the `onError` callback on `useQuery` is called for every `Observer`, which means if you call `useTodos` twice in your application, you will get two error toasts, even though only one network request fails.

Conceptually, you can imagine that the onError callback functions similar to a `useEffect`. So if we expand the above example to that syntax, it will become more apparent that this will run for every consumer:

useEffect-error-toast

```
1const useTodos = () => {2  const todos = useQuery({3    queryKey: ['todos'],4    queryFn: fetchTodos5  })6
7  // 🚨 effects are executed for every component8  // that uses this custom hook individually9  React.useEffect(() => {10    if (todos.error) {11      toast.error(`Something went wrong: ${todos.error.message}`)12    }13  }, [todos.error])14
15  return todos16}
```

Of course, if you don't add the callback to your custom hook, but to the invocation of the hook, this is totally fine. But what if we don't really want to notify all Observers that our fetch failed, but just notify the user _once_ that the underlying fetch failed? For that, React Query has callbacks on a different level:

### The global callbacks[](#the-global-callbacks)

The global callbacks need to be provided when you create the `QueryCache`, which happens implicitly when you create a `new QueryClient`, but you can also customize that:

query-cache-callbacks

```
1const queryClient = new QueryClient({2  queryCache: new QueryCache({3    onError: (error) =>4      toast.error(`Something went wrong: ${error.message}`),5  }),6})
```

This will now only show an error toast once for each query, which exactly what we want.🥳 It is also likely the best place to put any sort of error tracking or monitoring that you want to perform, because it's guaranteed to run only once per request and _cannot_ be overwritten like e.g. the defaultOptions.

## Putting it all together[](#putting-it-all-together)

The three main ways to handle errors in React Query are:

-   the `error` property returned from useQuery
-   the `onError` callback (on the query itself or the global QueryCache / MutationCache)
-   using Error Boundaries

You can mix and match them however you want, and what I personally like to do is show error toasts for background refetches (to keep the stale UI intact) and handle everything else locally or with Error Boundaries:

background-error-toasts

```
1const queryClient = new QueryClient({2  queryCache: new QueryCache({3    onError: (error, query) => {4      // 🎉 only show error toasts if we already have data in the cache5      // which indicates a failed background update6      if (query.state.data !== undefined) {7        toast.error(`Something went wrong: ${error.message}`)8      }9    },10  }),11})
```

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)