---
title: "Testing React Query"
source: "https://tkdodo.eu/blog/testing-react-query"
publishedDate: "2021-04-04"
category: "frontend"
feedName: "TkDodo"
---

![testing](https://tkdodo.eu/blog/static/559ceecae597e1c577b0583d8327a388/bbe0c/testing.jpg "testing")

**Last Update: 2023-10-21**

-   [#1: Practical React Query](https://tkdodo.eu/blog/practical-react-query)
-   [#2: React Query Data Transformations](https://tkdodo.eu/blog/react-query-data-transformations)
-   [#3: React Query Render Optimizations](https://tkdodo.eu/blog/react-query-render-optimizations)
-   [#4: Status Checks in React Query](https://tkdodo.eu/blog/status-checks-in-react-query)
-   **#5: Testing React Query**
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

-   [한국어](https://highjoon-dev.vercel.app/blogs/5-testing-react-query/)
-   [Português](https://dbrno.vercel.app/pt-BR/blog/testing-react-query)
-   [Español](https://rubenvara.io/react-query/tests-react-query)
-   [日本語](https://makotot.dev/posts/testing-react-query-translation-ja)
-   [简体中文](https://xfsnowind.github.io/zh-cn/blogs/react-query/testing-react-query/)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Questions around the testing topic come up quite often together with React Query, so I'll try to answer some of them here. I think one reason for that is that testing "smart" components (also called [container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)) is not the easiest thing to do. With the rise of hooks, this split has been largely deprecated. It is now encouraged to consume hooks directly where you need them rather than doing a mostly arbitrary split and drill props down.

I think this is generally a very good improvement for colocation and code readability, but we now have more components that consume dependencies outside of "just props".

They might `useContext`. They might `useSelector`. Or they might `useQuery`.

Those components are technically no longer pure, because calling them in different environments leads to different results. When testing them, you need to carefully setup those surrounding environments to get things working.

## Mocking network requests[](#mocking-network-requests)

Since React Query is an async server state management library, your components will likely make requests to a backend. When testing, this backend is not available to actually deliver data, and even if, you likely don't want to make your tests dependent on that.

There are tons of articles out there on how to mock data with jest. You can mock your api client if you have one. You can mock fetch or axios directly. I can only second what Kent C. Dodds has written in his article [Stop mocking fetch](https://kentcdodds.com/blog/stop-mocking-fetch):

Use [mock service worker](https://mswjs.io/) by [@ApiMocking](https://twitter.com/ApiMocking)

It can be your single source of truth when it comes to mocking your apis:

-   works in node for testing
-   supports REST and GraphQL
-   has a [storybook addon](https://storybook.js.org/addons/msw-storybook-addon) so you can write stories for your components that `useQuery`
-   works in the browser for development purposes, and you'll still see the requests going out in the browser devtools
-   works with cypress, similar to fixtures

* * *

With our network layer being taken care of, we can start talking about React Query specific things to keep an eye on:

## QueryClientProvider[](#queryclientprovider)

Whenever you use React Query, you need a QueryClientProvider and give it a queryClient - a vessel which holds the `QueryCache`. The cache will in turn hold the data of your queries.

I prefer to give each test its own QueryClientProvider and create a `new QueryClient` for each test. That way, tests are completely isolated from each other. A different approach might be to clear the cache after each test, but I like to keep shared state between tests as minimal as possible. Otherwise, you might get unexpected and flaky results if you run your tests in parallel.

### For custom hooks[](#for-custom-hooks)

If you are testing custom hooks, I'm quite certain you're using [react-testing-library](https://testing-library.com/docs/react-testing-library/intro). It's the easiest thing there is to test hooks. With that library, we can wrap our hook in a [renderHook wrapper](https://testing-library.com/docs/react-testing-library/api/#renderhook), which is a React component to wrap the test component in when rendering. I think this is the perfect place to create the QueryClient, because it will be executed once per test:

wrapper

```
1const createWrapper = () => {2  // ✅ creates a new QueryClient for each test3  const queryClient = new QueryClient()4  return ({ children }) => (5    <QueryClientProvider client={queryClient}>6      {children}7    </QueryClientProvider>8  )9}10
11test('my first test', async () => {12  const { result } = renderHook(() => useCustomHook(), {13    wrapper: createWrapper(),14  })15})
```

### For components[](#for-components)

If you want to test a Component that uses a `useQuery` hook, you also need to wrap that Component in QueryClientProvider. A small wrapper around `render` from [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) seems like a good choice. Have a look at how React Query does it [internally for their tests](https://github.com/tannerlinsley/react-query/blob/ead2e5dd5237f3d004b66316b5f36af718286d2d/src/react/tests/utils.tsx#L6-L17).

## Turn off retries[](#turn-off-retries)

It's one of the most common "gotchas" with React Query and testing: The library defaults to three retries with exponential backoff, which means that your tests are likely to timeout if you want to test an erroneous query. The easiest way to turn retries off is, again, via the `QueryClientProvider`. Let's extend the above example:

no-retries

```
1const createWrapper = () => {2  const queryClient = new QueryClient({3    defaultOptions: {4      queries: {5        // ✅ turns retries off6        retry: false,7      },8    },9  })10
11  return ({ children }) => (12    <QueryClientProvider client={queryClient}>13      {children}14    </QueryClientProvider>15  )16}17
18test("my first test", async () => {19  const { result } = renderHook(() => useCustomHook(), {20    wrapper: createWrapper()21  })22}
```

This will set the defaults for all queries in the component tree to "no retries". It is important to know that this will only work if your actual `useQuery` has no explicit retries set. If you have a query that wants 5 retries, this will still take precedence, because defaults are only taken as a fallback.

### setQueryDefaults[](#setquerydefaults)

The best advice I can give you for this problem is: Don't set these options on `useQuery` directly. Try to use and override the defaults as much as possible, and if you really need to change something for specific queries, use [queryClient.setQueryDefaults](https://react-query.tanstack.com/reference/QueryClient#queryclientsetquerydefaults).

So for example, instead of setting retry on `useQuery`:

not-on-useQuery

```
1const queryClient = new QueryClient()2
3function App() {4  return (5    <QueryClientProvider client={queryClient}>6      <Example />7    </QueryClientProvider>8  )9}10
11function Example() {12  // 🚨 you cannot override this setting for tests!13  const queryInfo = useQuery({14    queryKey: ['todos'],15    queryFn: fetchTodos,16    retry: 5,17  })18}
```

Set it like this:

setQueryDefaults

```
1const queryClient = new QueryClient({2  defaultOptions: {3    queries: {4      retry: 2,5    },6  },7})8
9// ✅ only todos will retry 5 times10queryClient.setQueryDefaults(['todos'], { retry: 5 })11
12function App() {13  return (14    <QueryClientProvider client={queryClient}>15      <Example />16    </QueryClientProvider>17  )18}
```

Here, all queries will retry two times, only _todos_ will retry five times, and I still have the option to turn it off for all queries in my tests 🙌.

### ReactQueryConfigProvider[](#reactqueryconfigprovider)

Of course, this only works for known query keys. Sometimes, you really want to set some configs on a subset of your component tree. In v2, React Query had a [ReactQueryConfigProvider](https://react-query-v2.tanstack.com/docs/api#reactqueryconfigprovider) for that exact use-case. You can achieve the same thing in v3 with a couple of lines of codes:

ReactQueryConfigProvider

```
1const ReactQueryConfigProvider = ({ children, defaultOptions }) => {2  const client = useQueryClient()3  const [newClient] = React.useState(4    () =>5      new QueryClient({6        queryCache: client.getQueryCache(),7        mutationCache: client.getMutationCache(),8        defaultOptions,9      })10  )11
12  return (13    <QueryClientProvider client={newClient}>14      {children}15    </QueryClientProvider>16  )17}
```

You can see this in action in this [codesandbox example](https://codesandbox.io/s/react-query-config-provider-v3-lt00f).

## Always await the query[](#always-await-the-query)

Since React Query is async by nature, when running the hook, you won't immediately get a result. It usually will be in loading state and without data to check. The [async utilities](https://react-hooks-testing-library.com/reference/api#async-utilities) from react-hooks-testing-library offer a lot of ways to solve this problem. For the simplest case, we can just wait until the query has transitioned to success state:

waitFor

```
1const createWrapper = () => {2  const queryClient = new QueryClient({3    defaultOptions: {4      queries: {5        retry: false,6      },7    },8  })9  return ({ children }) => (10    <QueryClientProvider client={queryClient}>11      {children}12    </QueryClientProvider>13  )14}15
16test("my first test", async () => {17  const { result, waitFor } = renderHook(() => useCustomHook(), {18    wrapper: createWrapper()19  })20
21  // ✅ wait until the query has transitioned to success state22  await waitFor(() => result.current.isSuccess)23
24  expect(result.current.data).toBeDefined()25}
```

## Putting it all together[](#putting-it-all-together)

I've set up a quick repository where all of this comes nicely together: mock-service-worker, react-testing-library and the mentioned wrapper. It contains four tests - basic failure and success tests for custom hooks and components. Have a look here: [https://github.com/TkDodo/testing-react-query](https://github.com/TkDodo/testing-react-query)

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)