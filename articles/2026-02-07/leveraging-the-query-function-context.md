---
title: "Leveraging the Query Function Context"
source: "https://tkdodo.eu/blog/leveraging-the-query-function-context"
publishedDate: "2021-10-26"
category: "frontend"
feedName: "TkDodo"
---

26.10.2021 — [ReactJs](https://tkdodo.eu/blog/tags/react-js), [React Query](https://tkdodo.eu/blog/tags/react-query), [JavaScript](https://tkdodo.eu/blog/tags/java-script), [TypeScript](https://tkdodo.eu/blog/tags/type-script) — 4 min read

![context](https://tkdodo.eu/blog/static/f77f007a5cfde787408ed16d3fbab168/bbe0c/context.jpg "context")

**Last Update: 2023-01-03**

-   [#1: Practical React Query](https://tkdodo.eu/blog/practical-react-query)
-   [#2: React Query Data Transformations](https://tkdodo.eu/blog/react-query-data-transformations)
-   [#3: React Query Render Optimizations](https://tkdodo.eu/blog/react-query-render-optimizations)
-   [#4: Status Checks in React Query](https://tkdodo.eu/blog/status-checks-in-react-query)
-   [#5: Testing React Query](https://tkdodo.eu/blog/testing-react-query)
-   [#6: React Query and TypeScript](https://tkdodo.eu/blog/react-query-and-type-script)
-   [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/using-web-sockets-with-react-query)
-   [#8: Effective React Query Keys](https://tkdodo.eu/blog/effective-react-query-keys)
-   **#8a: Leveraging the Query Function Context**
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

-   [한국어](https://highjoon-dev.vercel.app/blogs/8a-leveraging-the-query-function-context)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

We all strive to improve as engineers, and as time goes by, we hopefully succeed in that endeavour. Maybe we learn new things that invalidate or challenge our previous thinking. Or we realise that patterns that we thought ideal would not scale to the level we now need them to.

Quite some time has passed since I first started to use React Query. I think I learned a great deal on that journey, and I've also "seen" a lot. I want my blog to be as up-to-date as possible, so that you can come back here and re-read it, knowing that the concepts are still valid. This is now more relevant than ever since [Tanner Linsley](https://twitter.com/tannerlinsley) agreed to link to my blog from the official [React Query documentation](https://react-query.tanstack.com/community/tkdodos-blog).

That's why I've decided to write this addendum to my [Effective React Query Keys](https://tkdodo.eu/blog/effective-react-query-keys) article. Please make sure to read it first to have an understanding of what we are talking about.

## Hot take[](#hot-take)

Don't use inline functions - leverage the Query Function Context given to you, and use a Query Key factory that produces object keys

Inline functions are by far the easiest way to pass parameters to your `queryFn`, because they let you close over other variables available in your custom hook. Let's look at the evergreen todo example:

inline-query-fn

```
1type State = 'all' | 'open' | 'done'2type Todo = {3  id: number4  state: TodoState5}6type Todos = ReadonlyArray<Todo>7
8const fetchTodos = async (state: State): Promise<Todos> => {9  const response = await axios.get(`todos/${state}`)10  return response.data11}12
13export const useTodos = () => {14  // imagine this grabs the current user selection15  // from somewhere, e.g. the url16  const { state } = useTodoParams()17
18  // ✅ The queryFn is an inline function that19  // closures over the passed state20  return useQuery({21    queryKey: ['todos', state],22    queryFn: () => fetchTodos(state),23  })24}
```

Maybe you recognize the example - It's a slight variation of [#1: Practical React Query - Treat the query key like a dependency array](https://tkdodo.eu/blog/practical-react-query#treat-the-query-key-like-a-dependency-array). This works great for simple examples, but it has a quite substantial problem when having lots of parameters. In bigger apps, it's not unheard of to have lots of filter and sorting options, and I've personally seen up to 10 params being passed.

Suppose we want to add sorting to our query. I like to approach these things from the bottom up - starting with the `queryFn` and letting the compiler tell me what I need to change next:

sorting-todos

```
1type Sorting = 'dateCreated' | 'name'2const fetchTodos = async (3  state: State,4  sorting: Sorting5): Promise<Todos> => {6  const response = await axios.get(`todos/${state}?sorting=${sorting}`)7  return response.data8}
```

This will certainly yield an error in our custom hook, where we call `fetchTodos`, so let's fix that:

useTodos-with-sorting

```
1export const useTodos = () => {2  const { state, sorting } = useTodoParams()3
4  // 🚨 can you spot the mistake ⬇️5  return useQuery({6    queryKey: ['todos', state],7    queryFn: () => fetchTodos(state, sorting),8  })9}
```

Maybe you've already spotted the issue: Our `queryKey` got out of sync with our actual dependencies, and no red squiggly lines are screaming at us about it 😔. In the above case, you'll likely spot the issue very fast (hopefully via an integration test), because changing the sorting does not automatically trigger a refetch. And, let's be honest, it's also pretty obvious in this simple example. I have however seen the `queryKey` diverge from the actual dependencies a couple of times in the last months, and with greater complexity, those can result in some hard to track issues. There's also a reason why React comes with the [react-hooks/exhaustive-deps eslint rule](https://reactjs.org/docs/hooks-rules.html#eslint-plugin) to avoid that.

So will React Query now come with its own eslint-rule? 👀

Well, that would be one option. There is also the [babel-plugin-react-query-key-gen](https://github.com/dominictwlee/babel-plugin-react-query-key-gen) that solves this problem by generating query keys for you, including all your dependencies. React Query however comes with a different, built-in way of handling dependencies: The `QueryFunctionContext`.

## QueryFunctionContext[](#queryfunctioncontext)

The `QueryFunctionContext` is an object that is passed as argument to the `queryFn`. You've probably used it before when working with _infinite queries_:

useInfiniteQuery

```
1// this is the QueryFunctionContext ⬇️2const fetchProjects = ({ pageParam }) =>3  fetch('/api/projects?cursor=' + pageParam)4
5useInfiniteQuery({6  queryKey: ['projects'],7  queryFn: fetchProjects,8  getNextPageParam: (lastPage) => lastPage.nextCursor,9  initialPageParam: 0,10})
```

React Query uses that object to inject information about the _query_ to the `queryFn`. In case of _infinite queries_, you'll get the return value of `getNextPageParam` injected as `pageParam`.

However, the context also contains the `queryKey` that is used for this query (and we're about to add more cool things to the context), which means you actually don't have to close over things, as they will be provided for you by React Query:

query-function-context

```
1const fetchTodos = async ({ queryKey }) => {2  // 🚀 we can get all params from the queryKey3  const [, state, sorting] = queryKey4  const response = await axios.get(`todos/${state}?sorting=${sorting}`)5  return response.data6}7
8export const useTodos = () => {9  const { state, sorting } = useTodoParams()10
11  // ✅ no need to pass parameters manually12  return useQuery({13    queryKey: ['todos', state, sorting],14    queryFn: fetchTodos,15  })16}
```

With this approach, you basically have no way of using any additional parameters in your `queryFn` without also adding them to the `queryKey`. 🎉

## How to type the QueryFunctionContext[](#how-to-type-the-queryfunctioncontext)

One of the ambitions for this approach was to get full type safety and infer the type of the `QueryFunctionContext` from the `queryKey` passed to `useQuery`. This wasn't easy, but React Query supports that since [v3.13.3](https://github.com/tannerlinsley/react-query/releases/tag/v3.13.3). If you inline the `queryFn`, you'll see that the types are properly inferred (thank you, Generics):

query-key-type-inference

```
1export const useTodos = () => {2  const { state, sorting } = useTodoParams()3
4  return useQuery({5    queryKey: ['todos', state, sorting] as const,6    queryFn: async ({ queryKey }) => {7      const response = await axios.get(8        // ✅ this is safe because the queryKey is a tuple9        `todos/${queryKey[1]}?sorting=${queryKey[2]}`10      )11      return response.data12    },13  })14}
```

This is nice and all, but still has a bunch of flaws:

-   You can still just use whatever you have in the closure to build your query
-   Using the `queryKey` for building the url in the above way is still unsafe because you can stringify everything.

### Query Key Factories[](#query-key-factories)

This is where query key factories come in again. If we have a typesafe query key factory to build our keys, we can use the return type of that factory to type our `QueryFunctionContext`. Here's how that might look:

typed-query-function-context

```
1const todoKeys = {2  all: ['todos'] as const,3  lists: () => [...todoKeys.all, 'list'] as const,4  list: (state: State, sorting: Sorting) =>5    [...todoKeys.lists(), state, sorting] as const,6}7
8const fetchTodos = async ({9  queryKey,10}: // 🤯 only accept keys that come from the factory11QueryFunctionContext<ReturnType<typeof todoKeys['list']>>) => {12  const [, , state, sorting] = queryKey13  const response = await axios.get(`todos/${state}?sorting=${sorting}`)14  return response.data15}16
17export const useTodos = () => {18  const { state, sorting } = useTodoParams()19
20  // ✅ build the key via the factory21  return useQuery({22    queryKey: todoKeys.list(state, sorting),23    queryFn: fetchTodos24  })25}
```

The type `QueryFunctionContext` is exported by React Query. It takes one generic, which defines the type of the `queryKey`. In the above example, we set it to be equal to whatever the _list_ function of our key factory returns. Since we use [const assertions](https://tkdodo.eu/blog/the-power-of-const-assertions), all our keys will be strictly typed tuples - so if we try to use a key that doesn't conform to that structure, we will get a type error.

## Object Query Keys[](#object-query-keys)

While slowly transitioning to the above approach, I noticed that array keys are not really performing that well. This becomes apparent when looking at how we destruct the query key now:

weird-destruct

```
1const [, , state, sorting] = queryKey
```

We basically leave out the first two parts (our hardcoded scopes _todo_ and _list_) and only use the dynamic parts. Of course, it didn't take long until we added another scope at the beginning, which again led to wrongly built urls:

![destruct query key](https://tkdodo.eu/blog/static/45281c9e1a8d84d36fd5e44bca8fbf36/7d769/destruct-query-key.png "destruct query key")

Source: A PR I recently made

Turns out, _objects_ solve this problem really well, because you can use named destructuring. Further, they have _no drawback_ when used inside a query key, because fuzzy matching for query invalidation works the same for objects as for arrays. Have a look at the [partialDeepEqual](https://github.com/tannerlinsley/react-query/blob/9e414e8b4f3118b571cf83121881804c0b58a814/src/core/utils.ts#L321-L338) function if you're interested in how that works.

Keeping that in mind, this is how I would construct my query keys with what I know today:

object-keys

```
1const todoKeys = {2  // ✅ all keys are arrays with exactly one object3  all: [{ scope: 'todos' }] as const,4  lists: () => [{ ...todoKeys.all[0], entity: 'list' }] as const,5  list: (state: State, sorting: Sorting) =>6    [{ ...todoKeys.lists()[0], state, sorting }] as const,7}8
9const fetchTodos = async ({10  // ✅ extract named properties from the queryKey11  queryKey: [{ state, sorting }],12}: QueryFunctionContext<ReturnType<typeof todoKeys['list']>>) => {13  const response = await axios.get(`todos/${state}?sorting=${sorting}`)14  return response.data15}16
17export const useTodos = () => {18  const { state, sorting } = useTodoParams()19
20  return useQuery({21    queryKey: todoKeys.list(state, sorting),22    queryFn: fetchTodos23  })24}
```

Object query keys even make your fuzzy matching capabilities more powerful, because they have no order. With the array approach, you can tackle everything todo related, all todo lists, or the todo list with a specific filter. With objects keys, you can do that too, but also tackle all lists (e.g. todo lists and profile lists) if you want to:

fuzzy-matching-with-object-keys

```
1// 🕺 remove everything related to the todos feature2queryClient.removeQueries({3  queryKey: [{ scope: 'todos' }]4})5
6// 🚀 reset all todo lists7queryClient.resetQueries({8  queryKey: [{ scope: 'todos', entity: 'list' }]9})10
11// 🙌 invalidate all lists across all scopes12queryClient.invalidateQueries({13  queryKey: [{ entity: 'list' }]14})
```

This can come in quite handy if you have multiple overlapping scopes that have a hierarchy, but where you still want to match everything belonging to the sub-scope.

## Is this worth it?[](#is-this-worth-it)

As always: it depends. I've been loving this approach lately (which is why I wanted to share it with you), but there is certainly a tradeoff here between complexity and type safety. Composing query keys inside the key factory is slightly more complex (because _queryKeys_ still have to be an Array at the top level), and typing the context depending on the return type of the key factory is also not trivial. If your team is small, your api interface is slim and / or you're using plain JavaScript, you might not want to go that route. As per usual, choose whichever tools and approaches make the most sense for your specific situation. 🙌

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)