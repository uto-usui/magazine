---
title: "React Query and TypeScript"
source: "https://tkdodo.eu/blog/react-query-and-type-script"
publishedDate: "2021-05-16"
category: "frontend"
feedName: "TkDodo"
---

![react query typescript](https://tkdodo.eu/blog/static/5bf14ba00a63f9f368079e6b9b260758/bbe0c/react-query-typescript.jpg "react query typescript")

**Last Update: 2023-10-21**

-   [#1: Practical React Query](https://tkdodo.eu/blog/practical-react-query)
-   [#2: React Query Data Transformations](https://tkdodo.eu/blog/react-query-data-transformations)
-   [#3: React Query Render Optimizations](https://tkdodo.eu/blog/react-query-render-optimizations)
-   [#4: Status Checks in React Query](https://tkdodo.eu/blog/status-checks-in-react-query)
-   [#5: Testing React Query](https://tkdodo.eu/blog/testing-react-query)
-   **#6: React Query and TypeScript**
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

-   [한국어](https://highjoon-dev.vercel.app/blogs/6-react-query-and-typescript/)
-   [Español](https://rubenvara.io/react-query/react-query-typescript)
-   [简体中文](https://juejin.cn/post/7260697121510490149)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

[TypeScript](https://www.typescriptlang.org/) is 🔥 - this seems to be a common understanding now in the frontend community. Many developers expect libraries to either be written in TypeScript, or at least provide good type definitions. For me, if a library is written in TypeScript, the type definitions are the best documentation there is. It's never wrong because it directly reflects the implementation. I frequently look at type definitions before I read API docs.

React Query was initially written in JavaScript (v1), and was then re-written to TypeScript with v2. This means that right now, there is very good support for TypeScript consumers.

There are however a couple of "gotchas" when working with TypeScript due to how dynamic and unopinionated React Query is. Let's go through them one by one to make your experience with it even better.

## Generics[](#generics)

React Query heavily uses [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html). This is necessary because the library does not actually fetch data for you, and it cannot know what _type_ the data will have that your api returns.

The TypeScript section in the [official docs](https://react-query.tanstack.com/typescript) is not very extensive, and it tells us to explicitly specify the Generics that `useQuery` expects when calling it:

explicit-generics

```
1function useGroups() {2  return useQuery<Group[], Error>({3    queryKey: ['groups'],4    queryFn: fetchGroups,5  })6}
```

Over time, React Query has added more Generics to the `useQuery` hook (there are now four of them), mainly because more functionality was added. The above code works, and it will make sure that the `data` property of our custom hook is correctly typed to `Group[] | undefined` as well as that our `error` will be of type `Error | undefined`. But it will not work like that for more advanced use-cases, especially when the other two Generics are needed.

### The four Generics[](#the-four-generics)

This is the current definition of the `useQuery` hook:

useQuery

```
1export function useQuery<2  TQueryFnData = unknown,3  TError = unknown,4  TData = TQueryFnData,5  TQueryKey extends QueryKey = QueryKey6>
```

There's a lot of stuff going on, so let's try to break it down:

-   `TQueryFnData`: the type returned from the `queryFn`. In the above example, it's `Group[]`.
-   `TError`: the type of Errors to expect from the `queryFn`. `Error` in the example.
-   `TData`: the type our `data` property will eventually have. Only relevant if you use the `select` option, because then the `data` property can be different from what the `queryFn` returns. Otherwise, it will default to whatever the `queryFn` returns.
-   `TQueryKey`: the type of our `queryKey`, only relevant if you use the `queryKey` that is passed to your `queryFn`.

As you can also see, all those Generics have default values, which means that if you don't provide them, TypeScript will fall back to those types. This works pretty much the same as default parameters in JavaScript:

default-parameters

```
1function multiply(a, b = 2) {2  return a * b3}4
5multiply(10) // ✅ 206multiply(10, 3) // ✅ 30
```

### Type Inference[](#type-inference)

TypeScript works best if you let it infer (or figure out) what type something should be on its own. Not only does it make code easier to _write_ (because you don't have to type all the types 😅), but it will also make it easier to _read_. In many instances, it can make code look exactly like JavaScript. Some simple examples of type inference would be:

type-inference

```
1const num = Math.random() + 5 // ✅ `number`2
3// 🚀 both greeting and the result of greet will be string4function greet(greeting = 'ciao') {5  return `${greeting}, ${getName()}`6}
```

When it comes to Generics, they can also generally be inferred from their usage, which is super awesome. You could also provide them manually, but in many cases, you don't need to.

generic-identity

```
1function identity<T>(value: T): T {2  return value3}4
5// 🚨 no need to provide the generic6let result = identity<number>(23)7
8// ⚠️ or to annotate the result9let result: number = identity(23)10
11// 😎 infers correctly to `string`12let result = identity('react-query')
```

### Partial Type Argument Inference[](#partial-type-argument-inference)

...doesn't exist in TypeScript yet (see this [open issue](https://github.com/microsoft/TypeScript/issues/26242)). This basically means that if you provide _one_ Generic, you have to provide _all_ of them. But because React Query has default values for Generics, we might not notice right away that they will be taken. The resulting error messages can be quite cryptic. Let's look at an example where this actually backfires:

default-generics

```
1function useGroupCount() {2  return useQuery<Group[], Error>({3    queryKey: ['groups'],4    queryFn: fetchGroups,5    select: (groups) => groups.length,6    // 🚨 Type '(groups: Group[]) => number' is not assignable to type '(data: Group[]) => Group[]'.7    // Type 'number' is not assignable to type 'Group[]'.ts(2322)8  })9}
```

Because we haven't provided the 3rd Generic, the default value kicks in, which is also `Group[]`, but we return `number` from our `select` function. One fix is to simply add the 3rd Generic:

third-generic

```
1function useGroupCount() {2  // ✅ fixed it3  return useQuery<Group[], Error, number>({4    queryKey: ['groups'],5    queryFn: fetchGroups,6    select: (groups) => groups.length,7  })8}
```

As long as we don't have Partial Type Argument Inference, we have to work with what we got.

So what's the alternative?

### Infer all the things[](#infer-all-the-things)

Let's start by _not_ passing in any Generics at all and let TypeScript figure out what to do. For this to work, we need the `queryFn` to have a good return type. Of course, if you inline that function without an explicit return type, you will have `any` - because that's what `axios` or `fetch` give you:

inlined-queryFn

```
1function useGroups() {2  // 🚨 data will be `any` here3  return useQuery({4    queryKey: ['groups'],5    queryFn: () =>6      axios.get('groups').then((response) => response.data),7  })8}
```

If you (like me) like to keep your api layer separated from your queries, you'll need to add type definitions anyways to avoid _implicit any_, so React Query can infer the rest:

inferred-types

```
1function fetchGroups(): Promise<Group[]> {2  return axios.get('groups').then((response) => response.data)3}4
5// ✅ data will be `Group[] | undefined` here6function useGroups() {7  return useQuery({ queryKey: ['groups'], queryFn: fetchGroups })8}9
10// ✅ data will be `number | undefined` here11function useGroupCount() {12  return useQuery({13    queryKey: ['groups'],14    queryFn: fetchGroups,15    select: (groups) => groups.length,16  })17}
```

Advantages of this approach are:

-   no more manually specifying Generics
-   works for cases where the 3rd (select) and 4th (QueryKey) Generic are needed
-   will continue to work if more Generics are added
-   code is less confusing / looks more like JavaScript

### What about error?[](#what-about-error)

What about error, you might ask? Per default, without any Generics, error will be inferred to `unknown`. This might sound like a bug, why is it not `Error`? But it is actually on purpose, because in JavaScript, you can throw _anything_ - it doesn't have to be of type `Error`:

totally-legit-throw-statements

```
1throw 52throw undefined3throw Symbol('foo')
```

Since React Query is not in charge of the function that returns the Promise, it also can't know what type of errors it might produce. So `unknown` is correct. Once TypeScript allows skipping some generics when calling a function with multiple generics (see [this issue for more information](https://github.com/microsoft/TypeScript/issues/10571)), we could handle this better, but for now, if we need to work with errors and don't want to resort to passing Generics, we can narrow the type with an instanceof check:

narrow-with-instanceof

```
1const groups = useGroups()2
3if (groups.error) {4  // 🚨 this doesn't work because: Object is of type 'unknown'.ts(2571)5  return <div>An error occurred: {groups.error.message}</div>6}7
8// ✅ the instanceOf check narrows to type `Error`9if (groups.error instanceof Error) {10  return <div>An error occurred: {groups.error.message}</div>11}
```

Since we need to make some kind of check anyways to see if we have an error, the instanceof check doesn't look like a bad idea at all, and it will also make sure that our error actually has a property message at runtime. This is also in line with what TypeScript has planned for the 4.4 release, where they'll introduce a new compiler flag `useUnknownInCatchVariables`, where catch variables will be `unknown` instead of `any` (see [here](https://github.com/microsoft/TypeScript/issues/41016)).

## Type Narrowing[](#type-narrowing)

I rarely use destructuring when working with React Query. First of all, names like `data` and `error` are quite universal (purposefully so), so you'll likely rename them anyway. Keeping the whole object will keep the context of what data it is or where the error is coming from. It will further help TypeScript to narrow types when using the status field or one of the status booleans, which it cannot do if you use destructuring:

type-narrowing

```
1const { data, isSuccess } = useGroups()2if (isSuccess) {3  // 🚨 data will still be `Group[] | undefined` here4}5
6const groupsQuery = useGroups()7if (groupsQuery.isSuccess) {8  // ✅ groupsQuery.data will now be `Group[]`9}
```

This has nothing to do with React Query, it is just how TypeScript works. [@danvdk](https://twitter.com/danvdk) has a good explanation for this behaviour

[

![Avatar for danvdk](https://tkdodo.eu/blog/static/acc0066f8c4f8542f545466a2896aa01/47930/danvdk.jpg)

Dan Vanderkam

@

danvdk

The comment from @TkDodo is exactly right, TypeScript does refinement on the types of individual symbols. Once you split them apart, it can't keep track of the relationship any more. Doing this in general would be computationally hard. It can also be hard for people.

\-

Feb 21, 2021



](https://x.com/danvdk/status/1363614288103964672)

## Type safety with the enabled option[](#type-safety-with-the-enabled-option)

I've expressed my ♥️ for the [enabled option](https://tkdodo.eu/blog/practical-react-query#the-enabled-option-is-very-powerful) right from the start, but it can be a bit tricky on type level if you want to use it for [dependent queries](https://react-query.tanstack.com/guides/dependent-queries) and disable your query for as long as some parameters are not yet defined:

the-enabled-option

```
1function fetchGroup(id: number): Promise<Group> {2  return axios.get(`group/${id}`).then((response) => response.data)3}4
5function useGroup(id: number | undefined) {6  return useQuery({7    queryKey: ['group', id],8    queryFn: () => fetchGroup(id),9    enabled: Boolean(id),10  })11  // 🚨 Argument of type 'number | undefined' is not assignable to parameter of type 'number'.12  //  Type 'undefined' is not assignable to type 'number'.ts(2345)13}
```

Technically, TypeScript is right, `id` is possibly `undefined`: the `enabled` option does not perform any type narrowing. Also, there are ways to bypass the `enabled` option, for example by calling the `refetch` method returned from `useQuery`. In that case, the `id` might really be `undefined`.

I've found the best way to go here, if you don't like the [non-null assertion operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator), is to accept that `id` can be `undefined` and reject the Promise in the `queryFn`. It's a bit of duplication, but it's also explicit and safe:

explicit-id-check

```
1function fetchGroup(id: number | undefined): Promise<Group> {2  // ✅ check id at runtime because it can be `undefined`3  return typeof id === 'undefined'4    ? Promise.reject(new Error('Invalid id'))5    : axios.get(`group/${id}`).then((response) => response.data)6}7
8function useGroup(id: number | undefined) {9  return useQuery({10    queryKey: ['group', id],11    queryFn: () => fetchGroup(id),12    enabled: Boolean(id),13  })14}
```

## Optimistic Updates[](#optimistic-updates)

Getting optimistic updates right in TypeScript is not an easy feat, so we've decided to add it as a comprehensive [example](https://react-query.tanstack.com/examples/optimistic-updates-typescript) to the docs.

The important part is: You have to explicitly type the `variables` argument passed to `onMutate` in order to get the best type inference. I don't fully comprehend why that is, but it again seems to have something to do with inference of Generics. Have a look [at this comment](https://github.com/tannerlinsley/react-query/pull/1366#discussion_r538459890) for more information.

## useInfiniteQuery[](#useinfinitequery)

For the most parts, typing `useInfiniteQuery` is no different from typing `useQuery`. One noticeable gotcha is that the `pageParam` value, which is passed to the `queryFn`, is typed as `any`. Could be improved in the library for sure, but as long as it's `any`, it's probably best to explicitly annotate it:

useInfiniteQuery

```
1type GroupResponse = { next?: number; groups: Group[] }2const queryInfo = useInfiniteQuery({3  queryKey: ['groups'],4  // ⚠️ explicitly type pageParam to override `any`5  queryFn: ({6    pageParam = 0,7  }: {8    pageParam: GroupResponse['next']9  }) => fetchGroups(groups, pageParam),10  getNextPageParam: (lastGroup) => lastGroup.next,11})
```

If `fetchGroups` returns a `GroupResponse`, `lastGroup` will have its type nicely inferred, and we can use the same type to annotate `pageParam`.

## Typing the default query function[](#typing-the-default-query-function)

I am personally not using a [defaultQueryFn](https://react-query.tanstack.com/guides/default-query-function), but I know many people are. It's a neat way to leverage the passed `queryKey` to directly build your request url. If you inline the function when creating the `queryClient`, the type of the passed `QueryFunctionContext` will also be inferred for you. TypeScript is just so much better when you inline stuff :)

defaultQueryFn

```
1const queryClient = new QueryClient({2  defaultOptions: {3    queries: {4      queryFn: async ({ queryKey: [url] }) => {5        const { data } = await axios.get(`${baseUrl}/${url}`)6        return data7      },8    },9  },10})
```

This just works, however, `url` is inferred to type `unknown`, because the whole `queryKey` is an `unknown Array`. At the time of the creation of the queryClient, there is absolutely no guarantee how the queryKeys will be constructed when calling `useQuery`, so there is only so much React Query can do. That is just the nature of this highly dynamic feature. It's not a bad thing though because it means you now have to work defensively and narrow the type with runtime checks to work with it, for example:

narrow-with-typeof

```
1const queryClient = new QueryClient({2  defaultOptions: {3    queries: {4      queryFn: async ({ queryKey: [url] }) => {5        // ✅ narrow the type of url to string6        // so that we can work with it7        if (typeof url === 'string') {8          const { data } = await axios.get(9            `${baseUrl}/${url.toLowerCase()}`10          )11          return data12        }13        throw new Error('Invalid QueryKey')14      },15    },16  },17})
```

I think this shows quite well why `unknown` is such a great (and underused) type compared to `any`. It has become my favourite type lately - but that is subject for another blog post. 😊

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)