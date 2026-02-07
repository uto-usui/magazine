---
title: "The Query Options API"
source: "https://tkdodo.eu/blog/the-query-options-api"
publishedDate: "2024-01-17"
category: "frontend"
feedName: "TkDodo"
---

![Three moons and a hand pondering between which one to pick, the middle one has the React Query logo](https://tkdodo.eu/blog/static/67ae57a7685ffe99c4e4bb4255043f1b/8ba6c/ponder.jpg "Three moons and a hand pondering between which one to pick, the middle one has the React Query logo")

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
-   [#22: React Query and React Context](https://tkdodo.eu/blog/react-query-and-react-context)
-   [#23: Why You Want React Query](https://tkdodo.eu/blog/why-you-want-react-query)
-   **#24: The Query Options API**
-   [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations)
-   [#26: How Infinite Queries work](https://tkdodo.eu/blog/how-infinite-queries-work)
-   [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/react-query-api-design-lessons-learned)
-   [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/react-query-the-bad-parts)
-   [#29: Concurrent Optimistic Updates in React Query](https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query)
-   [#30: React Query Selectors, Supercharged](https://tkdodo.eu/blog/react-query-selectors-supercharged)

-   [한국어](https://velog.io/@cnsrn1874/the-query-options-api)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

React Query version 5 was released about three months ago, and with it, we got one of the biggest "breaking" changes in the library's history. All of our functions now only get one object passed, instead of multiple arguments. We call this object the Query Options, because it contains all the options you need to create a query:

```
1- useQuery(2-   ['todos'],3-   fetchTodos,4-   { staleTime: 5000 }5- )6+ useQuery({7+   queryKey: ['todos'],8+   queryFn: fetchTodos,9+   staleTime: 500010+ })
```

This isn't only true for `useQuery` calls, but also for imperative actions like invalidating a query:

```
1- queryClient.invalidateQueries(['todos'])2+ queryClient.invalidateQueries({ queryKey: ['todos'] })
```

Now technically, this API isn't new. Most of our functions had overloads, so even in v3, you could already pass an object instead of multiple arguments. It's just that it wasn't really advocated for. All examples, the docs and many blog posts (including this one) used the old API, which is why this was a breaking change for most apps.

So why did we do it?

## A better abstraction[](#a-better-abstraction)

First of all, having all those overloads is a chore for maintainers, and it's also not clear for users. Why can I call the same function in multiple ways - is one better than the other? So, streamlining the API, thus making it easier for new starters to understand it, was one goal. "Always pass one object" is as simple and extensible as it gets.

But also, it turns out that one object to rule them all is simply a very good abstraction for when you want to share query options between different functions. I discovered this "by accident" when I wrote the [React Query meets React Router](https://tkdodo.eu/blog/react-query-meets-react-router) article, where want to share query options between prefetching and our `useQuery` call. Now usually, you could just write custom hooks as your primary way to re-use queries. But that doesn't work when imperative function calls like `prefetching` are involved. So I came up with something, and [Alex](https://bsky.app/profile/ralexanderson%E2%80%8D.com) noted this as a good pattern:

{/ _NOTE: The tweet id leads to Alex's now protected X account_ /}

[

![Avatar for ralex1993](https://tkdodo.eu/blog/static/322bf4b29995309c168de104bc3adddd/47930/ralex1993.jpg)

R. Alex Anderson 🚀

@

ralex1993

First time I saw this React Query pattern was @TkDodo's React Router blog post

Brilliant 👏

dev.to/tkdodo/react-q...

![A code block with the following code in it const contactDetailQuery = (id) => ({ queryKey: ['contacts', 'detail', id], queryFn: async () => getContact(id),
}) ... queryClient.fetchQuery( contactDetailQuery(params.contactId)
) ... useQuery(contactDetailQuery(params.contactId))](https://tkdodo.eu/blog/static/7f614e77346f7b39853c545379db6e53/2d813/Fcnj9l0XEAMnLdV.jpg)

\-

Sep 14, 2022



](https://x.com/ralex1993/status/1570036707134676994)

Turns out, if all your functions have the same interface - accepting a single object - it makes a lot of sense to abstract that object away into a query definition. Once you have that, you can pass it everywhere:

todos-query

```
1const todosQuery = {2  queryKey: ['todos'],3  queryFn: fetchTodos,4  staleTime: 5000,5}6
7// ✅ works8useQuery(todosQuery)9
10// 🤝 sure11queryClient.prefetchQuery(todosQuery)12
13// 🙌 oh yeah14useSuspenseQuery(todosQuery)15
16// 🎉 absolutely17useQueries([{18  queries: [todosQuery]19}]
```

In hindsight, this pattern just feels beautiful as the main abstraction for queries, and I wanted to apply it everywhere. There was just one problem:

## TypeScript[](#typescript)

The way TypeScript handles excess properties is quite special. If you inline them, TypeScript will be like: Why are you doing this - it doesn't make any sense, I'll error out:

inlined-objects

```
1useQuery({2  queryKey: ['todos'],3  queryFn: fetchTodos,4  stallTime: 5000,5})
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAOQACMAhgHaoMDGA1gPRTr2swBaAI458VAFDiYeMOjgAVCABMIcALyJxcbXGBKAXHEbIQAI1zjC4pelYAbej1LJG-YBEal0MVgAtFKqgAFACUhgAK5CDAGAA8AIJQUPR4sQEQAHwZkmhYonhBCFpwIrh4ANLoeIYA2lQwyhCoVAC6ADTFpfgAYoyGJN5+6agd2iz0dnbyoOiGAKwADEsdhCFAA)

Object literal may only specify known properties, but 'stallTime' does not exist in type 'UseQueryOptions<Todo\[\], Error, Todo\[\], string\[\]>'. Did you mean to write 'staleTime'?(2769)

Which is cool, because it catches typos like the one above. But what if you abstract the whole object away into a constant, like our pattern suggests?

no-error

```
1const todosQuery = {2  queryKey: ['todos'],3  queryFn: fetchTodos,4  stallTime: 5000,5}6
7useQuery(todosQuery)
```

[TypeScript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAOQACMAhgHaoMDGA1gPRTr2swBaAI458VAFDiYeMOjgAVCABMIcALyJxcbXGBKAXHEbIQAI1zjC4pelYAbej1LJG-YBEal0MVgAtFKqgAFACUhgAK5CDAGAA8AIJQUPR4sQEQAHwZkqweLHAwyhCo2LgEGghacCJlANLoeIYA2lSFgVQAugA0VTX4AGKMhiTefumoPdos9HZ28qDohgCsAAxrPVbiaFiieEFtxaX4IUA)

No error. 🙈

TypeScript is quite relaxed in these situations, because at runtime, the "extra" property `stallTime` doesn't hurt, and you might want to use that object in a context where the property is required. TypeScript can't know that. And since `staleTime` is optional, we are now just _not_ passing it. Of course, this is "valid", but it's not what we'd expect, and it can be a costly mistake to find.

## queryOptions[](#queryoptions)

That's why we've introduced a type-safe helper function in v5 called `queryOptions`. At runtime, it doesn't do anything:

queryOptions

```
1export function queryOptions(options) {2  return options3}
```

But on type level, it's a real powerhouse that not only fixes the above typo issue (see the [fixed playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ4A0cAjjvgPJgzAQB2qcAvnAGZQQhwDkAAjAIb0BAYwDWAeijp+wmAFpSuPFwBQKmHjDo4AFQgATCHAC8iFXAtxg+gFxxayEACNcKxiv3phAG35TWyLSyNLSs6DDCABZ6hqgAFACUdgAK7CDAGAA8AIJQUPx4mTEQAHwlasJ0qPAwBhCo2EomJGR4lNRVcQjmLUoA0uh4dgDaXLWxXAC6BD2K+ABitHYs4VHFqDMW1fze3jqg6HYArAAMZzOMCWpoWK1x4-WN+AlAA)) - it can also help us make other parts of the `queryClient` more type-safe:

### DataTag[](#datatag)

There's one thing about `queryClient.getQueryData` and similar functions that has always been a bit annoying in React Query: On type level, they return `unknown`. That's because React Query doesn't have an up-front, centralized definition, so when you call `queryClient.getQueryData(['todos'])`, there's no way how the library could know what type will be returned.

We are forced to help out ourselves by providing the type parameter to the function call:

manual-type-parameter

```
1const todos = queryClient.getQueryData<Array<Todo>>(['todos'])2//    ^? const todos: Todo[] | undefined
```

To be clear, this isn't at all safer than just using type assertions, but at least `undefined` will be added to the union for us. If we refactor what our `fetchTodos` endpoint returns, we won't be notified here of the new type. 😔

But now that we have a function that co-locates `queryKey` and `queryFn`, we can associate the type of the `queryFn` and "tag" our `queryKey` with it. Notice what happens when we pass the `queryKey` that was created via `queryOptions` to `getQueryData`:

tagged-query-key

```
1const todosQuery = queryOptions({2  queryKey: ['todos'],3  queryFn: fetchTodos,4  staleTime: 5000,5})6
7const todos = queryClient.getQueryData(todosQuery.queryKey)8//    ^? const todos: Todo[] | undefined
```

[TypeScript Playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ4A0cAjjvgPJgzAQB2qR2ueAwgDbDq3wC+cAZlAgg4AcgACMAIb1pAYwDWAeijopcmAFpSzUQCg9MPGHRwAKhAAmEOAF5EeuE7jBLALji1kIAEa49PHqW6HJsUqoCyLQaNLQC6DByABYW1qgAFACUHgAKQiDAGAA8AIJQUFJ4RakQAHy1BnJ0qPA6+Oyc3Hae6ADucEztHFwwWY3N8DBWEKiDeN1teJTUzekIjiRkeADS6HgeANqiU2miALoEG4sAYrQe-AnJNQwbLVJs6Gag6B4ArAAMgMuPEy41kcBOMwWWw6IwAdABzBJzAAiUmk6Uhsy2cMWuzwoKUSmccAAegB+IA)

🤯

This is pure TypeScript magic, contributed by the one and only [Mateusz Burzyński](https://twitter.com/AndaristRake). If we look at `todosQuery.queryKey`, we can see that it's not only a string array, but it also contains information about what the `queryFn` returns:

dataTagSymbol

```
1(property) queryKey: string[] & {2  [dataTagSymbol]: Todo[];3}
```

That information will then be read out by `getQueryData` (and other functions like `setQueryData`, too), to infer the type for us. This brings a whole new level of type safety to React Query, while at the same time making it easier for us to re-use query options. A huge win in DX. 🚀

## Query Factories[](#query-factories)

So, if you're asking me, I want to use this pattern and the `queryOptions` helper everywhere. I would even take it to a point where custom hooks won't be my first choice for abstractions. They seem a bit pointless if all they do is:

custom-hooks

```
1const useTodos = () => useQuery(todosQuery)
```

There's nothing wrong with calling `useQuery` in your component directly, especially if you sometimes want to mix it with `useSuspenseQuery`. Of course, if the hook does more, like additional memoization with `useMemo`, it's still perfectly fine to add it. But I wouldn't immediately reach for it like I did before.

Additionally, I'm seeing [Query Key Factories](https://tkdodo.eu/blog/effective-react-query-keys) in a bit of a different light now. I've come to learn that:

Separating QueryKey from QueryFunction was a mistake

The `queryKey` defines the dependencies to our `queryFn` - everything we use inside it must go into the key. So why define keys in one central place while having the functions far a way from them in our custom hooks?

However, if we combine the two patterns, we're getting the best of all worlds: Type safety, co-location and great DX. 🚀

An example query factory could look something like this:

query-factory

```
1const todoQueries = {2  all: () => ['todos'],3  lists: () => [...todoQueries.all(), 'list'],4  list: (filters: string) =>5    queryOptions({6      queryKey: [...todoQueries.lists(), filters],7      queryFn: () => fetchTodos(filters),8    }),9  details: () => [...todoQueries.all(), 'detail'],10  detail: (id: number) =>11    queryOptions({12      queryKey: [...todoQueries.details(), id],13      queryFn: () => fetchTodo(id),14      staleTime: 5000,15    }),16}
```

It contains a mix of key-only entries that we can use to build a hierarchy and for query invalidation, as well as full query objects created with the `queryOptions` helper.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)