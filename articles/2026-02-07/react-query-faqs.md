---
title: "React Query FAQs"
source: "https://tkdodo.eu/blog/react-query-fa-qs"
publishedDate: "2022-06-24"
category: "frontend"
feedName: "TkDodo"
---

![faq](https://tkdodo.eu/blog/static/0952b2a3e62a7f647653582701444243/bbe0c/faq.jpg "faq")

**Last Update: 2024-05-18**

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
-   **#15: React Query FAQs**
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

-   [한국어](https://velog.io/@cnsrn1874/%EB%B2%88%EC%97%AD-React-Query-FAQs)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

I have been answering _a lot_ of questions over the last 18 months regarding React Query. Being involved in the community and answering questions was what got me into open-source in the first place, and it was also a big factor for writing this React Query related series of articles.

I'm still excited to answer questions, especially if they are well formulated and of the non-standard kind. Please see my post [How can I?](https://tkdodo.eu/blog/how-can-i) if you don't know what I mean or want to know what makes a question a good question.

However, I have also seen a couple of repetitive questions that are mostly straight-forward for me to answer, but still require a bit of effort to get into writing. That's what this article is mainly about: To give myself yet another resource to point people towards when I see those questions again.

Without further ado, here are the top questions and my two cents on them:

## How can I pass parameters to refetch?[](#how-can-i-pass-parameters-to-refetch)

The short answer is still: you cannot. But there's a very good reason for that. Every time you _think_ that's what you want, you usually don't.

Mostly, code that wants to refetch with parameters looks something like this:

refetch-with-parameters

```
1const { data, refetch } = useQuery({2  queryKey: ['item'],3  queryFn: () => fetchItem({ id: 1 }),4})5
6<button onClick={() => {7  // 🚨 this is not how it works8  refetch({ id: 2 })9}})>Show Item 2</button>
```

Parameters or Variables are dependencies to your query. In the above code, we define a QueryKey `['item']`, so whatever we fetch will be stored under that key. If we were to refetch with a _different_ id, it would still write to the same place in the cache, because the key stays the same. So id 2 would then overwrite data for id 1. If you were to switch back to id 1, that data would be gone.

Caching different responses under different query keys is one of React Query's greatest strengths. The hypothetical "refetch-with-parameters" api would take that feature away. This is why `refetch` is only meant to replay the request with the same variables. So in essence, you don't really want a `refetch`: You want a _new fetch_ for a different id!

To use React Query effectively, you have to embrace the declarative approach: The query key defines all dependencies that the query function needs to fetch data. If you stick to that, all you have to do to get refetches is to update the dependency. A more realistic example would look like this:

dynamic-query-key

```
1const [id, setId] = useState(1)2
3const { data } = useQuery({4  queryKey: ['item', id],5  queryFn: () => fetchItem({ id }),6})7
8<button onClick={() => {9  // ✅ set id without explicitly refetching10  setId(2)11}})>Show Item 2</button>
```

`setId` will re-render the component, React Query will pick up the new key and start fetching for that key. It will also cache it separately from id 1.

The declarative approach also makes sure that no matter where or how you update the id, your query data will always be "in sync" with it. So your thinking goes from: "If I click that button, I want to refetch" towards: "I always want to see data for the current id".

You also don't have to store that id in `useState` - it can be done in any way to store client side state ([zustand](https://zustand.surge.sh/), [redux](https://redux-toolkit.js.org/), ...). In the above example, the URL would be a good place to store the id, too:

url-state

```
1const { id } = useParams()2
3const { data } = useQuery({4  queryKey: ['item', id],5  queryFn: () => fetchItem({ id }),6})7
8// ✅ change url, make useParams pick it up9<Link to="/2">Show Item 2</Link>
```

The best part about this approach is that you don't have to manage state, that you get sharable urls and that the browser back button will also just work for your users to navigate between items.

### Loading states[](#loading-states)

You might notice that switching query keys will put your query into hard loading state again. That is expected, because we change keys and there is no data for that key yet.

There are a bunch of ways to ease the transition, like setting a [placeholderData](https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query) for that key or [prefetching](https://tanstack.com/query/latest/docs/react/guides/prefetching) data for the new key ahead of time. A nice approach to tackle this problem is to instruct the query to keep previous data:

keep-previous-data

```
1import { keepPreviousData } from '@tanstack/react-query'2
3const { data, isPlaceholderData } = useQuery({4  queryKey: ['item', id],5  queryFn: () => fetchItem({ id }),6  // ⬇️ like this️7  placeholderData: keepPreviousData,8})
```

With this setting, React Query will still show data for id 1 while data for id 2 is being fetched. Additionally, the `isPlaceholderData` flag on the query result will be set to true, so that you can act accordingly in the UI. Maybe you want to show a background loading spinner in addition to the data, or you'd like to add opacity to the shown data, indicating that it's stale. That is totally up to you - React Query just gives you the means to do that. 🙌

## Why are updates not shown?[](#why-are-updates-not-shown)

When interacting with the Query Cache directly, be that because you want to perform an [update from a mutation response](https://react-query.tanstack.com/guides/updates-from-mutation-responses) or because you want to [invalidate from mutations](https://react-query.tanstack.com/guides/invalidations-from-mutations), I sometimes get reports that the updates are not reflected on the screen, or that it simply "doesn't work". If that's the case, it mostly boils down to one of two issues:

### 1: Query Keys are not matching[](#1-query-keys-are-not-matching)

Query Keys are hashed deterministically, so you don't have to keep referential stability or object key order in mind. However, when you call `queryClient.setQueryData`, the key must still match the existing key fully. As an example, those two keys do not match:

non-matching-keys

```
1['item', '1']2['item', 1]
```

The second value of the key array is a _string_ in the first example and a _number_ in the second. This can happen if you usually work with numbers, but get a string if you read from the URL with `useParams`.

The React Query Devtools are your best friend in this case, as you can clearly see which keys exist and which keys are currently fetching. Keep an eye on those pesky details though!

I recommend using [TypeScript](https://www.typescriptlang.org/) and [Query Key Factories](https://tkdodo.eu/blog/effective-react-query-keys) to help with that problem.

### 2: The QueryClient is not stable[](#2-the-queryclient-is-not-stable)

In most examples, we create the queryClient _outside_ the `App` component, which makes it referentially stable:

standard-example

```
1// ✅ created outside of the App2const queryClient = new QueryClient()3
4export default function App() {5  return (6    <QueryClientProvider client={queryClient}>7      <Example />8    </QueryClientProvider>9  )10}
```

The `QueryClient` holds the `QueryCache`, so if you create a new client, you also get a new cache, which will be empty. If you move the client creation into the `App` component, and your component re-renders for some other reason (e.g. a route change), your cache will be thrown away:

unstable-query-client

```
1export default function App() {2  // 🚨 this is not good3  const queryClient = new QueryClient()4
5  return (6    <QueryClientProvider client={queryClient}>7      <Example />8    </QueryClientProvider>9  )10}
```

If you have to create your client inside the `App`, make sure that it is referentially stable by using an instance ref or React state:

stable-query-client

```
1export default function App() {2  // ✅ this is stable3  const [queryClient] = React.useState(() => new QueryClient())4
5  return (6    <QueryClientProvider client={queryClient}>7      <Example />8    </QueryClientProvider>9  )10}
```

I do have a separate blog post on that topic: [useState for one-time initializations](https://tkdodo.eu/blog/use-state-for-one-time-initializations) .

## Why should I useQueryClient()...[](#why-should-i-usequeryclient)

... if I can just as well import the client?

The `QueryClientProvider` puts the created `queryClient` into React Context to distribute it throughout your app. You can best read it with `useQueryClient`. This does not create any extra subscriptions and will not cause any additional re-renders (if the client is stable - see above) - it just avoids having to pass the client down as a prop.

Alternatively, you could export the client and just import it wherever you need to:

exported-query-client

```
1// ⬇️ exported so that we can import it2export const queryClient = new QueryClient()3
4export default function App() {5  return (6    <QueryClientProvider client={queryClient}>7      <Example />8    </QueryClientProvider>9  )10}
```

Here are a couple of reasons why using the hook is preferred:

### 1: useQuery uses the hook too[](#1-usequery-uses-the-hook-too)

When you call `useQuery`, we call `useQueryClient` under the hood. This will look up the nearest client in React Context. Not a big deal, but if you ever get into the situation where the client you import is different from the one in context you'll have a hard to trace bug that could be avoided.

### 2: It decouples your app from the client[](#2-it-decouples-your-app-from-the-client)

The client you define in your `App` is your production client. It might have some default settings that work well in production. However, in testing, it might make sense to use different default values. One example is [turning off retries](https://tkdodo.eu/blog/testing-react-query#turn-off-retries) during testing, because testing erroneous queries might time out the test otherwise.

A big advantage of React Context when used as a dependency injection mechanism is that it decouples your app from its dependencies. `useQueryClient` just expects any client to be in the tree above - not a specific client. You'll lose that advantage if you import the production client directly.

### 3: You sometimes can't export[](#3-you-sometimes-cant-export)

It is sometimes necessary to create the `queryClient` inside the App component (as shown above). One example is when using server side rendering, because you want to avoid having multiple users share the same client.

The same is true when you work with microfrontends - Apps should be isolated. If you create the client outside the App, then use the same App twice on the same page, they'll share a client.

Lastly, if you want to use other hooks in the default values of the `queryClient`, you also need to create it inside the App. Consider a global error handler that wants to show a toast for every failing mutation:

use-other-hooks

```
1export default function App() {2  // ✅ we couldn't useToast outside of the App3  const toast = useToast()4  const [queryClient] = React.useState(5    () =>6      new QueryClient({7        mutationCache: new MutationCache({8          // ⬇️ but we need it here9          onError: (error) => toast.show({ type: 'error', error }),10        }),11      })12  )13
14  return (15    <QueryClientProvider client={queryClient}>16      <Example />17    </QueryClientProvider>18  )19}
```

So if you create your `queryClient` like that, there is no way that you can just export it and import it in your App.

My best guess on why you would want to export the client is if you're working with a legacy class component that needs to do some query invalidation - and you can't use hooks there. If that is the case, and you can't refactor to a functional component easily, consider creating a render props version:

useQueryClient-render-props

```
1const UseQueryClient = ({ children }) => children(useQueryClient())
```

usage

```
1<UseQueryClient>2  {(queryClient) => (3    <button4      onClick={() => queryClient.invalidateQueries({5        queryKey: ['items']6      })}7    >8      invalidate items9    </button>10  )}11</UseQueryClient>
```

And by the way, you can do the same thing for useQuery, or any other hook for that matter:

useQuery-render-props

```
1const UseQuery = ({ children, ...props }) => children(useQuery(props))
```

usage

```
1<UseQuery queryKey={["items"]} queryFn={fetchItems}>2  {({ data, isPending, isError }) => (3    // 🙌 return jsx here4  )}5</UseQuery>
```

## Why do I not get errors ?[](#why-do-i-not-get-errors-)

If your network request fails, you'd ideally want your query to go to the `error` state. If that doesn't happen, and you still see a successful query instead, that means that your `queryFn` did not return a failed Promise.

Remember: React Query doesn't know (or care) about status codes or network requests at all. It needs a resolved or rejected Promise that the `queryFn` needs to provide.

If React Query sees a rejected Promise, it can potentially start retries, pause queries if you are offline and eventually put the query into the error state, so it's quite an important thing to get right.

### The fetch API[](#the-fetch-api)

Luckily, many data fetching libraries like [axios](https://axios-http.com/) or [ky](https://github.com/sindresorhus/ky) transform erroneous status codes like 4xx or 5xx into failed Promises, so if your network request fails, your query fails too. The notable exception is the built-in [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), which will only give you a failed Promise if the request failed due to a network error.

This is of course [documented here](https://tanstack.com/query/latest/docs/framework/react/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default), but it's still a stumbling block if you've missed this.

wrong-fetch-api-example

```
1useQuery({2  queryKey: ['todos', todoId],3  queryFn: async () => {4    const response = await fetch('/todos/' + todoId)5    // 🚨 4xx or 5xx are not treated as errors6    return response.json()7  },8})
```

To overcome this, you need to check if the response was _ok_ and transform it into a rejected Promise if it wasn't:

correct-fetch-api-example

```
1useQuery({2  queryKey: ['todos', todoId],3  queryFn: async () => {4    const response = await fetch('/todos/' + todoId)5    // ✅ transforms 4xx and 5xx into failed Promises6    if (!response.ok) {7      throw new Error('Network response was not ok')8    }9    return response.json()10  },11})
```

### Logging[](#logging)

The second reason I've seen a lot is that errors are caught inside the `queryFn` for logging purposes. If you do that without re-throwing the error, you will again return a successful Promise implicitly:

wrong-logging-example

```
1useQuery({2  queryKey: ['todos', todoId],3  queryFn: async () => {4    try {5      const { data } = await axios.get('/todos/' + todoId)6      return data7    } catch (error) {8      console.error(error)9      // 🚨 here, an "empty" Promise<void> is returned10    }11  },12})
```

If you want to do this, remember to re-throw the error:

correct-logging-example

```
1useQuery({2  queryKey: ['todos', todoId],3  queryFn: async () => {4    try {5      const { data } = await axios.get('/todos/' + todoId)6      return data7    } catch (error) {8      console.error(error)9      // ✅ here, a failed Promise is returned10      throw error11    }12  },13})
```

An alternative and not so verbose way to handle errors is to use the `onError` callback of the QueryCache. You can read more about different ways to handle errors in [#11: React Query Error Handling](https://tkdodo.eu/blog/react-query-error-handling).

## Why is the `queryFn` not called?[](#why-is-the-queryfn-not-called)

From time to time, I get bug reports that the `queryFn` isn't called even though it should be. When that happens, the most likely reason is the use of `initialData` together with `staleTime`:

initialData-and-staleTime

```
1const { data } = useQuery({2  queryKey: ['todos'],3  queryFn: fetchTodos,4  initialData: [],5  staleTime: 5 * 1000,6})
```

The thing is that `initialData` is taken into account whenever a new cache entry is created, and that data is put into the cache. Once data is in the cache, React Query doesn't care (and actually doesn't know) where it came from. Could be from the `queryFn`, could be because you called `queryClient.setQueryData` manually, or because of `initialData`.

Combined with the `staleTime` setting, that `initialData` will now be seen as `fresh` for the next 5 seconds. So the "mount" of this `useQuery` instance will _not_ trigger a background refetch. Why should it - we have fresh data (an empty array) in the cache. This is especially tricky to see if `staleTime` is applied globally, and not `useQuery` itself.

The key takeaway here is that `initialData` should only be used if you have "real" data synchronously available - data that you'd happily cache for your users. The empty array is probably more of a "fallback" that you'd like to show until real data has been fetched. For that use-case, `placeholderData` is better:

placeholderData-and-staleTime

```
1const { data } = useQuery({2  queryKey: ['todos'],3  queryFn: fetchTodos,4  placeholderData: [],5  staleTime: 5 * 1000,6})
```

Since `placeholderData` is never cached, you'll always get a background refetch. You can read more about the differences between `placeholderData` and `initialData` [here](https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query).

Another fix (more of a workaround really) is to specify that your `initialData` is `stale` from the beginning. Per default, React Query uses `Date.now()` when it puts `initialData` into the cache. However, we can customize this with `initialDataUpdatedAt`. I found that setting this to `0` (or any time in the past really) works well to trigger a background update, too:

initialDataUpdatedAt

```
1const { data } = useQuery({2  queryKey: ['todos'],3  queryFn: fetchTodos,4  initialData: [],5  initialDataUpdatedAt: 0,6  staleTime: 5 * 1000,7})
```

* * *

Another situation where this behaviour is hard to spot is when dynamic Query Keys are used, e.g. for paginated queries:

paginated-queries

```
1const [page, setPage] = React.useState(0)2
3const { data } = useQuery({4  queryKey: ['todos', page],5  queryFn: () => fetchTodos(page),6  initialData: initialDataForPageZero,7  staleTime: 5 * 1000,8})
```

You might've wanted to express that only the Query with `page:0` would get the `initialData` into the cache, and that the `queryFn` is invoked when the `page` goes from `0` to `1`.

However, that's not the case. A Query with a different QueryKey is a completely new Query in the cache. It has no knowledge about your component or that you've used a different QueryKey before. That means `initialData` will be applied for it too (if it's specified like above).

What we have to do is to be quite specific about which Query should get the `initialData`:

correct-initial-data

```
1const [page, setPage] = React.useState(0)2
3const { data } = useQuery({4  queryKey: ['todos', page],5  queryFn: () => fetchTodos(page),6  initialData: page === 0 ? initialDataForPageZero : undefined,7  staleTime: 5 * 1000,8})
```

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)