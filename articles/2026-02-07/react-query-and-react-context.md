---
title: "React Query and React Context"
source: "https://tkdodo.eu/blog/react-query-and-react-context"
publishedDate: "2023-07-22"
category: "frontend"
feedName: "TkDodo"
---

![context](https://tkdodo.eu/blog/static/9b27d274802aec07ecc7e854423c460b/bbe0c/context.jpg "context")

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
-   [#17: Seeding the Query Cache](https://tkdodo.eu/blog/seeding-the-query-cache)
-   [#18: Inside React Query](https://tkdodo.eu/blog/inside-react-query)
-   [#19: Type-safe React Query](https://tkdodo.eu/blog/type-safe-react-query)
-   [#20: You Might Not Need React Query](https://tkdodo.eu/blog/you-might-not-need-react-query)
-   [#21: Thinking in React Query](https://tkdodo.eu/blog/thinking-in-react-query)
-   **#22: React Query and React Context**
-   [#23: Why You Want React Query](https://tkdodo.eu/blog/why-you-want-react-query)
-   [#24: The Query Options API](https://tkdodo.eu/blog/the-query-options-api)
-   [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations)
-   [#26: How Infinite Queries work](https://tkdodo.eu/blog/how-infinite-queries-work)
-   [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/react-query-api-design-lessons-learned)
-   [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/react-query-the-bad-parts)
-   [#29: Concurrent Optimistic Updates in React Query](https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query)
-   [#30: React Query Selectors, Supercharged](https://tkdodo.eu/blog/react-query-selectors-supercharged)

-   [한국어](https://velog.io/@cnsrn1874/react-query-and-react-context)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

One of the best traits of React Query is that you can use a query wherever you want in your component tree: Your `<ProductTable>` component can fetch its own data, co-located, right where you need it to be:

ProductTable

```
1function ProductTable() {2  const productQuery = useProductQuery()3
4  if (productQuery.data) {5    return <table>...</table>6  }7
8  if (productQuery.isError) {9    return <ErrorMessage error={productQuery.error} />10  }11
12  return <SkeletonLoader />13}
```

To me, this is great because it makes the `ProductTable` decoupled and independent: It's responsible for reading its own dependencies: Product Data. If it's in the cache already, great, we'll just read it. If not, we'll go fetch it. And we can see similar patterns emerge with React Server Components. They, too, allow us to fetch data right inside our components. No more arbitrary splits between _stateful_ and _stateless_, or _smart_ and _dumb_ components.

So being able to fetch data right in a component, where you need it, is immensely useful. We can literally take the `ProductTable` component and move it anywhere in our App, and it will just work. The component is very _resilient to change_, which is the main reason why I'm advocating for accessing your query directly wherever you need to (via a custom hook), both in [#10: React Query as a State Manager](https://tkdodo.eu/blog/react-query-as-a-state-manager) and [#21: Thinking in React Query](https://tkdodo.eu/blog/thinking-in-react-query).

It's not a silver bullet though - it comes with tradeoffs. This shouldn't be surprising, because at the end of the day, everything is a tradeoff. But what are we trading in here, exactly?

## Being self-contained[](#being-self-contained)

For a component to be autonomous, it means it has to handle cases where query data is not available (yet), in particular: loading and error states. This is not a big deal for our `<ProductTable>` component, because very often, when it first loads, it will actually display that `<SkeletonLoader />`.

But there are lots of other situations where we just want to read some information from some parts of our query, where we _know_ that the query has been already used further up the tree. For example, we might have a `userQuery` that contains information about the logged-in user:

useCurrentUserQuery

```
1export const useUserQuery = (id: number) => {2  return useQuery({3    queryKey: ['user', id],4    queryFn: () => fetchUserById(id),5  })6}7export const useCurrentUserQuery = () => {8  const id = useCurrentUserId()9
10  return useUserQuery(id)11}
```

We will probably use this query quite early in our component tree, to check which user rights the logged-in user has, and it might further determine if we can actually see the page or not. It is _essential_ information that we want everywhere on our page.

Now further down the tree, we might have a component that wants to display the `userName`, which we can get from the `useCurrentUserQuery` hook:

UserNameDisplay

```
1function UserNameDisplay() {2  const { data } = useCurrentUserQuery()3  return <div>User: {data.userName}</div>4}
```

Of course, TypeScript won't let us, because `data` is potentially undefined. But we know better - it can't be undefined, because in our situation, the `UserNameDisplay` won't be rendered without the query being already initiated further up the tree.

That's a bit of a dilemma. Do we want to just shut up TS here and do `data!.userName`, because we know it will be defined? Do we play it safe and do `data?.userName` (which is possible here, but might not be so easy to pull off in other situations)? Do we just add a guard: `if (!data) return null`? Or do we add proper loading and error handling to all 25 places where we call `useCurrentUserQuery`?

To be honest - I think all of those ways are kind of suboptimal. I don't want to litter my codebase with checks that can "never happen" (to the best of my current knowledge). But I also don't want to ignore TypeScript, because (as usual), TS is right.

### An implicit dependency[](#an-implicit-dependency)

Our problem comes from the fact that we have an _implicit dependency_: A dependency that only exists in our head, in our knowledge of the application structure, but it's not visible in the code itself.

Even though we know that we can safely call `useCurrentUserQuery` without having to check for data not being defined, no static analysis can verify this. Our co-workers might not know it. I myself might not know this anymore 3 months from now.

The most dangerous part is that it might be true now, but it might no longer be true in the future. We can decide to render another instance of `UserNameDisplay` somewhere in our App, where we might not have user data in the cache, or where we might have user data in the cache _conditionally_, e.g. if we have visited a different page before.

This is quite the opposite of the `<ProductTable>` component: Instead of being resilient to change, it becomes error-prone to refactorings. We wouldn't expect the `UserNameDisplay` component to break just because we move some seemingly unrelated components around...

### Make it explicit[](#make-it-explicit)

The solution is, of course, to make the dependency _explicit_. And there is no better way to do this than with React Context:

## React Context[](#react-context)

There's quite the myth about React Context, so let's get this straight: No, React Context is not a state manager. It can become a seemingly good solution for state management when combined with `useState` or `useReducer`, but tbh, I've never really liked this approach, as I've been burned by situations like these too much:

[

![Avatar for TkDodo](https://tkdodo.eu/blog/static/f5315ea49d7e41077957b8c547d2dedb/37851/1021430.jpg)

Dominik 🔮

@

TkDodo

🕵️ We've fixed a huge performance problem this week by moving useState + context over to zustand. It was the same amount of code. The lib is < 1kb.

⚛️ Don't use context for state management. Use it for dependency injection only. The right tool for the job!

zustand.surge.sh

\-

Feb 19, 2022



](https://x.com/TkDodo/status/1495072479118864398)

So you'll likely be better off just using a dedicated tool. [Mark Erikson](https://twitter.com/acemarke), maintainer of Redux and writer of very long blog posts, has a good article on that topic: [Blogged Answers: Why React Context is Not a "State Management" Tool (and Why It Doesn't Replace Redux)](https://blog.isquaredsoftware.com/2021/01/context-redux-differences/).

My tweet mentions it already: React Context is a _dependency injection_ tool. It allows you to define which "things" your component needs to work, and any parent is responsible for providing that information.

This is conceptually the same as prop-drilling, which is the process of passing props down via multiple layers. Context allows you to do the same: Take some values and pass them as props to children, except that you can leave out a couple of layers:

![Component tree show props passing over two components vs. context passing where the grand-child can read it directly](https://tkdodo.eu/blog/static/3dde95d439907435dd48049d20c95e8a/7d769/props-vs-context.png "Component tree show props passing over two components vs. context passing where the grand-child can read it directly")

With context, you just skip the middle man. In our `useCurrentUserQuery` example, it can help us make that dependency explicit: Instead of reading the `useCurrentUserQuery` directly in all components where we want to skip the data-availability check, we read it from React Context. And that context will be filled by the parent that actually does the first check:

CurrentUserContext

```
1const CurrentUserContext = React.createContext<User | null>(null)2
3export const useCurrentUserContext = () => {4  return React.useContext(CurrentUserContext)5}6
7export const CurrentUserContextProvider = ({8  children,9}: {10  children: React.ReactNode11}) => {12  const currentUserQuery = useCurrentUserQuery()13
14  if (currentUserQuery.isPending) {15    return <SkeletonLoader />16  }17
18  if (currentUserQuery.isError) {19    return <ErrorMessage error={currentUserQuery.error} />20  }21
22  return (23    <CurrentUserContext.Provider value={currentUserQuery.data}>24      {children}25    </CurrentUserContext.Provider>26  )27}
```

Here, we take the `currentUserQuery` and put the resulting data into React Context, if it exists (by eliminating loading and error states upfront). We can then read from that context safely in our children, e.g. the `UserNameDisplay` component:

UserNameDisplay-with-React-Context

```
1function UserNameDisplay() {2  const data = useCurrentUserContext()3  return <div>User: {data.username}</div>4}
```

With that, we have made our implicit dependency (we know data has been fetched earlier in the tree) explicit. Whenever someone looks at `UserNameDisplay`, they will know that they need to have data provided from the `CurrentUserContextProvider`. That is something you can keep in mind when refactoring. If you change where the Provider is rendered, you will also know that this will affect all children using that context. That's something you can't know when a component is just using a query - because queries are usually global in your whole app, and data might or might not exist.

### Pleasing TypeScript[](#pleasing-typescript)

TypeScript still won't like it much, because React Context is designed to also work _without_ a Provider, where it will give you the default value of the Context, and that's `null` in our case. Since we never want `useCurrentUserContext` to work in a situation where we are outside a Provider, we can add an invariant to our custom hook:

context-with-invariant

```
1export const useCurrentUserContext = () => {2  const currentUser = React.useContext(CurrentUserContext)3  if (!currentUser) {4    throw new Error('CurrentUserContext: No value provided')5  }6
7  return currentUser8}
```

This method ensures that we will fail fast and with a good error message if we ever accidentally access `useCurrentUserContext` in the wrong place. And with that, TypeScript will infer the value `User` for our custom hook, so we can safely use it and access properties on it.

### State Syncing[](#state-syncing)

You might be thinking: Isn't this "state syncing" - copying one value from React Query and putting into another method of state distribution?

The answer is: No, it is not! The single source of truth is still the query. There is no way to change the context value apart from the Provider, which will always reflect the latest data the query has. Nothing gets copied here, and nothing can get out of sync. Passing `data` from React Query as a prop to a child component is also not "state syncing", and since context is similar to prop drilling, it's also not "state syncing".

### Request Waterfalls[](#request-waterfalls)

Nothing is without drawbacks, and neither is this technique. Specifically, it might create network waterfalls, because your component tree will stop rendering (it "suspends") at the Provider, so child components won't be rendered and can't fire off network requests, even if they are unrelated.

I'd mostly consider this approach for data that is _mandatory_ for my sub-tree: User information is a good example because we might not know what to render anyway without that data.

### Suspense[](#suspense)

Talking about Suspense: Yes, you can achieve a similar architecture with React Suspense, and yes, it has the same drawback: potential request waterfalls, which I've already written about in [#17: Seeding the Query Cache](https://tkdodo.eu/blog/seeding-the-query-cache).

One problem is that in the current major version (v4), using `suspense: true` on your query won't type narrow `data`, because there are still ways to disable the query and have it not run.

However, since v5, there is an explicit `useSuspenseQuery` hook, where data is guaranteed to be defined once the component renders. With that, we can do:

UserNameDisplay-with-suspense

```
1function UserNameDisplay() {2  const { data } = useSuspenseQuery(...)3  return <div>User: {data.username}</div>4}
```

and TypeScript will be happy about it. 🎉

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)