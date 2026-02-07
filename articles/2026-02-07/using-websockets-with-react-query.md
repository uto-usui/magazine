---
title: "Using WebSockets with React Query"
source: "https://tkdodo.eu/blog/using-web-sockets-with-react-query"
publishedDate: "2021-06-06"
category: "frontend"
feedName: "TkDodo"
---

![react query websockets](https://tkdodo.eu/blog/static/2bedcabee00a030b6f61274741777e3b/bbe0c/react-query-websockets.jpg "react query websockets")

-   [#1: Practical React Query](https://tkdodo.eu/blog/practical-react-query)
-   [#2: React Query Data Transformations](https://tkdodo.eu/blog/react-query-data-transformations)
-   [#3: React Query Render Optimizations](https://tkdodo.eu/blog/react-query-render-optimizations)
-   [#4: Status Checks in React Query](https://tkdodo.eu/blog/status-checks-in-react-query)
-   [#5: Testing React Query](https://tkdodo.eu/blog/testing-react-query)
-   [#6: React Query and TypeScript](https://tkdodo.eu/blog/react-query-and-type-script)
-   **#7: Using WebSockets with React Query**
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

-   [한국어](https://highjoon-dev.vercel.app/blogs/7-using-websockets-with-react-query/)
-   [Español](https://rubenvara.io/react-query/websockets-react-query)
-   [简体中文](https://xfsnowind.github.io/zh-cn/blogs/react-query/using-web-sockets-with-react-query/)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

How to handle live data using WebSockets together with React Query has been one of the most asked questions lately, so I thought I'd give it a try, play around with it a bit and report my findings. That's what this post is about :)

## What are WebSockets[](#what-are-websockets)

Simply put, WebSockets allow push messages, or "live data", to be sent from the server to the client (browser). Usually with HTTP, the client makes a request to the server, specifying that they would like some data please, the server responds with that data or an error and then the connection closes.

Since the client is the one opening the connections and initiating the requests, that leaves no room for the server to push data to the client when the server knows that an update is available.

That's where [WebSockets](https://en.wikipedia.org/wiki/WebSocket) kick in.

Like with any other HTTP request, the browser initiates the connection, but indicates that they would like to upgrade the connection to a WebSocket. If the server accepts this, they will then switch the protocol. This connection will not terminate, but will stay open until either side decides to close it. Now, we have a fully functioning bi-directional connection open, where both sides can transmit data.

This has the main advantage that the server can now push selective updates to the client. This can come in very handy if you have multiple users viewing the same data, and one user makes an update. Usually, the other clients will not see that update until they actively refetch. WebSockets allow to instantly push those updates in real-time.

## React Query integration[](#react-query-integration)

Since React Query is primarily a client side async state management library, I will _not_ talk about how to set up WebSockets on the server. I've honestly never done it, and it also depends on which technology you are using in the backend.

React Query doesn't have anything built-in specifically for WebSockets. That doesn't mean that WebSockets are not supported or that they don't work well with the library. It's just that React Query is _very_ agnostic when it comes to how you fetch your data: All it needs is a resolved or rejected `Promise` to work - the rest is up to you.

## Step by Step[](#step-by-step)

The general idea is to setup your queries as usual, as if you wouldn't be working with WebSockets. Most of the time, you will have your usual HTTP endpoints to query and mutate entities.

a-standard-query

```
1const usePosts = () =>2  useQuery({ queryKey: ['posts', 'list'], queryFn: fetchPosts })3
4const usePost = (id) =>5  useQuery({6    queryKey: ['posts', 'detail', id],7    queryFn: () => fetchPost(id),8  })
```

Additionally, you can setup an app-wide `useEffect` that connects you to your WebSocket endpoint. How that works totally depends on which technology you are using. I've seen people subscribe to live data from [Hasura](https://github.com/tannerlinsley/react-query/issues/171#issuecomment-649810136). There's a great article about connecting to [Firebase](https://aggelosarvanitakis.medium.com/a-real-time-hook-with-firebase-react-query-f7eb537d5145). In my example, I will simply use the browser's native [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket):

useReactQuerySubscription

```
1const useReactQuerySubscription = () => {2  React.useEffect(() => {3    const websocket = new WebSocket('wss://echo.websocket.org/')4    websocket.onopen = () => {5      console.log('connected')6    }7
8    return () => {9      websocket.close()10    }11  }, [])12}
```

### Consuming data[](#consuming-data)

After we've setup the connection, we will likely have some sort of callback that will be called when data comes in over the WebSocket. Again, what that data is depends entirely on how you'd like to set it up. Inspired by [this message](https://github.com/tannerlinsley/react-query/issues/171#issuecomment-649716718) from [Tanner Linsley](https://github.com/tannerlinsley), I like to send _events_ from the backend instead of complete data objects:

event-based-subscriptions

```
1const useReactQuerySubscription = () => {2  const queryClient = useQueryClient()3  React.useEffect(() => {4    const websocket = new WebSocket('wss://echo.websocket.org/')5    websocket.onopen = () => {6      console.log('connected')7    }8    websocket.onmessage = (event) => {9      const data = JSON.parse(event.data)10      const queryKey = [...data.entity, data.id].filter(Boolean)11      queryClient.invalidateQueries({ queryKey })12    }13
14    return () => {15      websocket.close()16    }17  }, [queryClient])18}
```

That's really all you need to make list and detail views update when you receive an event.

-   `{ "entity": ["posts", "list"] }` will invalidate the posts list
-   `{ "entity": ["posts", "detail"], id: 5 }` will invalidate a single post
-   `{ "entity": ["posts"] }` will invalidate everything post related

[Query Invalidation](https://react-query.tanstack.com/guides/query-invalidation) plays really nice together with WebSockets. This approach avoids the problem of over pushing, because if we receive an event for an entity that we are not interested in at the moment, nothing will happen. For example, if we are currently on the _Profile_ page, and we receive an update for _Posts_, `invalidateQueries` will make sure that the next time we get to our _Posts_ page, it will be refetched. However, it will not refetch it right away, because we have no active observers. If we never go to that page again, the pushed update would be completely unnecessary.

### Partial data updates[](#partial-data-updates)

Of course, if you have big data sets that receive small, but frequent updates, you might still want to push partial data down the WebSocket.

Title of the post has changed? Just push the title. Number of likes have changed - push it down.

For these partial updates, you can use [queryClient.setQueryData](https://react-query.tanstack.com/reference/QueryClient#queryclientsetquerydata) to directly update the query cache instead of just invalidating it.

This will be a bit more cumbersome if you have multiple query keys for the same data, e.g. if you have multiple filter criteria as part of the query key, or if you want to update list _and_ detail view with the same message. [queryClient.setQueriesData](https://react-query.tanstack.com/reference/QueryClient#queryclientsetqueriesdata) is a relatively new addition to the library that will allow you to tackle this use-case as well:

partial-updates

```
1const useReactQuerySubscription = () => {2  const queryClient = useQueryClient()3  React.useEffect(() => {4    const websocket = new WebSocket('wss://echo.websocket.org/')5    websocket.onopen = () => {6      console.log('connected')7    }8    websocket.onmessage = (event) => {9      const data = JSON.parse(event.data)10      queryClient.setQueriesData(data.entity, (oldData) => {11        const update = (entity) =>12          entity.id === data.id13            ? { ...entity, ...data.payload }14            : entity15        return Array.isArray(oldData)16          ? oldData.map(update)17          : update(oldData)18      })19    }20
21    return () => {22      websocket.close()23    }24  }, [queryClient])25}
```

It's a bit too dynamic for my taste, doesn't handle addition or deletion, and TypeScript won't like it very much, so I'd personally rather stick to query invalidation.

Nevertheless, here is a [codesandbox example](https://codesandbox.io/s/react-query-websockets-ep1op) where I'm handling both type of events: invalidation and partial updates. (_Note: The custom hook is a bit more convoluted because in the example, I use the same WebSocket to simulate the server round trip. Don't worry about it if you have a real server_).

## Increasing StaleTime[](#increasing-staletime)

React Query comes with a [default staleTime](https://react-query.tanstack.com/guides/important-defaults) of _zero_. This means that every query will be immediately considered as stale, which means it will refetch when a new subscriber mounts or when the user refocuses the window. It is aimed to keep your data as up-to-date as necessary.

This goal overlaps a lot with WebSockets, which update your data in real-time. Why would I need to refetch at all if I just manually _invalidated_ because the server just told me to do so via a dedicated message?

So if you update all your data via websockets anyways, consider setting a high `staleTime`. In my example, I just used `Infinity`. This means the data will be fetched initially via `useQuery`, and then always come from the cache. Refetching only happens via the explicit query invalidation.

You can best achieve this by setting global query defaults when creating the `QueryClient`

infinite-stale-time

```
1const queryClient = new QueryClient({2  defaultOptions: {3    queries: {4      staleTime: Infinity,5    },6  },7})
```

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)