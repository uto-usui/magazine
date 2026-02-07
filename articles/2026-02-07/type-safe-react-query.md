---
title: "Type-safe React Query"
source: "https://tkdodo.eu/blog/type-safe-react-query"
publishedDate: "2023-01-07"
category: "frontend"
feedName: "TkDodo"
---

![safety helmet](https://tkdodo.eu/blog/static/e0ec14fbe0d5abfb91286b7bf0e56212/bbe0c/type-safe.jpg "safety helmet")

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
-   [#11: React Query Error Handling](https://tkdodo.eu/blog/react-query-error-handling)
-   [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/mastering-mutations-in-react-query)
-   [#13: Offline React Query](https://tkdodo.eu/blog/offline-react-query)
-   [#14: React Query and Forms](https://tkdodo.eu/blog/react-query-and-forms)
-   [#15: React Query FAQs](https://tkdodo.eu/blog/react-query-fa-qs)
-   [#16: React Query meets React Router](https://tkdodo.eu/blog/react-query-meets-react-router)
-   [#17: Seeding the Query Cache](https://tkdodo.eu/blog/seeding-the-query-cache)
-   [#18: Inside React Query](https://tkdodo.eu/blog/inside-react-query)
-   **#19: Type-safe React Query**
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

-   [한국어](https://velog.io/@cnsrn1874/%EB%B2%88%EC%97%AD-Type-safe-React-Query)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

I think we can all agree that using TypeScript is a good idea. Who doesn't like type safety? It's a great way to catch bugs early on, and it allows us to offload some complexity of our apps to the type definitions so that we don't have to keep them in our heads forever.

The level of type safety can drastically vary from project to project. After all, every valid JavaScript code _can_ be valid TypeScript code - depending on the TS settings. And there is also a big difference between "having types" and "being type-safe".

To truly leverage the power of TypeScript, there is one thing that you need above all:

## Trust[](#trust)

We need to be able to _trust_ our type definitions. If we don't, our types become a mere suggestion - we can't rely on them to be accurate. So we go above and beyond to make sure we _can_ trust them:

-   We enable the [strictest](https://www.typescriptlang.org/tsconfig#strict) of TypeScript settings.
-   We add [typescript-eslint](https://typescript-eslint.io/) to forbid the `any` type as well as `ts-ignore`.
-   We point out all type assertions in code reviews.

And still - we are probably lying. A LOT. Even if we adhere to all the above things.

## Generics[](#generics)

Generics are essential in TypeScript. As soon as you want to implement something remotely complex, you will have to reach for them - especially when you're writing a reusable library.

However, as a user of a library, you ideally shouldn't need to care about their Generics. They are an implementation detail. So whenever you provide a generic "manually" to a function via the angle brackets, it's kinda bad for one of two reasons:

It's either unnecessary, or you're lying to yourself.

## About angle brackets[](#about-angle-brackets)

Angle brackets makes your code look "more complex" than it has to be. As an example, let's look at how `useQuery` is often written:

useQuery-with-angle-brackets

```
1type Todo = { id: number; name: string; done: boolean }2
3const fetchTodo = async (id: number) => {4  const response = await axios.get(`/todos/${id}`)5  return response.data6}7
8const query = useQuery<Todo>({9  queryKey: ['todos', id],10  queryFn: () => fetchTodo(id),11})12
13query.data14//    ^?(property) data: Todo | undefined
```

The main problem here is that `useQuery` has four generics. By providing only one of them manually, the other three fall back to their default values. You can read about why that's bad in [#6: React Query and TypeScript](https://tkdodo.eu/blog/react-query-and-type-script#the-four-generics).

Just to be on the same page - `axios.get` returns `any` (just like `fetch` would, but [ky](https://github.com/sindresorhus/ky) does this slightly better by giving us `unknown` back per default). It doesn't know what the `/todos/id` endpoint will return. And because we don't want our `data` property to be `any` as well, we have to "override" the inferred generic by providing it manually. Or do we?

The better way is to type the `fetchTodo` function itself:

typed-fetchTodo

```
1type Todo = { id: number; name: string; done: boolean }2
3// ✅ typing the return value of fetchTodo4const fetchTodo = async (id: number): Promise<Todo> => {5  const response = await axios.get(`/todos/${id}`)6  return response.data7}8
9// ✅ no generics on useQuery10const query = useQuery({11  queryKey: ['todos', id],12  queryFn: () => fetchTodo(id),13})14
15// 🙌 types are still properly inferred16query.data17//    ^?(property) data: Todo | undefined
```

Now with this, React Query can properly infer what data will be from the result of the `queryFn`. No need for manual generics. If the _input_ to `useQuery` is sufficiently typed, you will _not_ have to add angle brackets to it. 🎉

## Lying angle brackets[](#lying-angle-brackets)

Alternatively, we can also tell our data fetching layer, in this case `axios`, what the expected type is by providing the Generics via angle brackets there:

providing-generics

```
1const fetchTodo = async (id: number) => {2  const response = await axios.get<Todo>(`/todos/${id}`)3  return response.data4}
```

Now we don't even have to type the `fetchTodo` function if we don't want to because type inference will again work for us here. Those generics are not unnecessary per se, but they are a lie because they violate the golden rule of Generics.

### The golden rule of Generics[](#the-golden-rule-of-generics)

I learned this rule from [@danvdk's](https://twitter.com/danvdk) great book [Effective TypeScript](https://effectivetypescript.com/2020/08/12/generics-golden-rule/). It basically states:

For a Generic to be useful, it must appear at least twice.

The so called "return-only" generics are nothing more than a type assertion in disguise. The (slightly simplified) type signature for `axios.get` reads:

axios-get-type-signature

```
1function get<T = any>(url: string): Promise<{ data: T, status: number}>
```

The Type `T` only appears in one place - the return type. So it's a lie! We could've just as well written:

explicit-type-assertion

```
1const fetchTodo = async (id: number) => {2  const response = await axios.get(`/todos/${id}`)3  return response.data as Todo4}
```

At least this type assertion (`as Todo`) is explicit and not hidden. It shows that we are bypassing the compiler, that we are getting something unsafe and trying to turn it into something we can trust.

## Trust again[](#trust-again)

And now we are back to trust. How can we trust that what we're getting over the wire is in fact of a certain type? We cannot, and maybe that's okay.

I used to refer to this situation as a "trusted boundary". We _have to_ trust that what the backend returns is what we have agreed upon. If it's not, this isn't _our_ fault - it's the fault of the backend team.

Of course, the customer doesn't care. All they see is "cannot read property name of undefined" or something similar. Frontend devs will be called into the escalation, and it will take us quite a bit of time to actually figure out that we're not getting the right shape of data over the wire, because the error will appear in a completely different place.

So is there something that we can do to give us trust?

## zod[](#zod)

[zod](https://zod.dev/) is a beautiful validation library that lets you define a schema you can validate against _at runtime_. On top of that, it infers the type of the validated data directly from the schema.

This basically means that instead of writing a type definition and then asserting that something is that type, we write a schema and validate that the input conforms to that schema - at which point it _becomes_ that type.

I first heard about zod when working with forms. It makes total sense to validate user input. As a nice side effect, the input will also be typed correctly after the validation. But we can not only validate user input - we can validate anything. Url params for example. Or network responses...

### validation in the queryFn[](#validation-in-the-queryfn)

  

parsing-with-zod

```
1import { z } from 'zod'2
3// 👀 define the schema4const todoSchema = z.object({5  id: z.number(),6  name: z.string(),7  done: z.boolean(),8})9
10const fetchTodo = async (id: number) => {11  const response = await axios.get(`/todos/${id}`)12  // 🎉 parse against the schema13  return todoSchema.parse(response.data)14}15
16const query = useQuery({17  queryKey: ['todos', id],18  queryFn: () => fetchTodo(id),19})
```

This isn't even more code than before. We've basically exchanged two things:

-   the manual type definition of the `Todo` type with the `todoSchema` definition.
-   the type assertion with the schema parsing.

This plays so well together with React Query because `parse` throws a descriptive `Error` if something went wrong, which will make React Query go into `error` state - just as if the network call itself failed. And from the client perspective - it did fail, because it didn't return the expected structure. Now we have an `error` state that we need to handle anyway, and there will be no surprises for our users.

It also goes nicely with another guideline of mine:

The more your TypeScript code looks like JavaScript, the better.

Apart from `id: number`, there isn't a single thing that differentiates this TS code from JS. There is no added TypeScript complexity - we just get the benefits of type safety. Type inference "flows" through our code like a hot knife through butter. 🤤

### Tradeoffs[](#tradeoffs)

Schema parsing is a great concept to be aware of, but it's not for free. For starters, your schemas should be as resilient as you want them to be. If it doesn't matter that an optional property is `null` or `undefined` at runtime, you might create a miserable user experience if you fail the query because of something like that. So design your schemas resiliently.

Also, parsing does come with an overhead, as data must be analyzed at runtime to see if it fits the required structure. So it might not make sense to apply this technique everywhere.

## What about getQueryData[](#what-about-getquerydata)

You might have noticed that `queryClient.getQueryData` suffers from the same problem: It contains a return-only generic, and it will default to `unknown` if you don't provide it.

getQueryData-generic

```
1const todo = queryClient.getQueryData(['todos', 1])2//    ^? const todo: unknown3
4const todo = queryClient.getQueryData<Todo>(['todos', 1])5//    ^? const todo: Todo | undefined
```

Since React Query cannot know what you put into the `QueryCache` (as there is no up-front defined overall schema), this is the best we can do. Of course, you can also parse the result of `getQueryData` with a schema, but this isn't really necessary if you've validated the cached data before. Also, direct interactions with the `QueryCache` should be done sparingly.

Tools on top of React Query, like [react-query-kit](https://tanstack.com/query/v4/docs/react/community/liaoliao666-react-query-kit), do a great job at alleviating the pain, but they can only go so far and basically hide the lie a bit more for you.

## End-to-end type safety[](#end-to-end-type-safety)

While there isn't a lot more that React Query can do for us in this regard, there are other tools that can. If you are in control over both your frontend and backend, and if they even live in the same monorepo together, consider using tools like [tRPC](https://trpc.io/) or [zodios](https://www.zodios.org/). They both build on top of React Query for the client-side data fetching solution, but they both have what it takes to become truly type-safe: an upfront API / router definition.

With that, types on the frontend can be inferred from whatever the backend produces - without a chance of being wrong. They also both use `zod` for defining the schema (tRPC is validation library agnostic, but `zod` is the most popular), so learning how to work with `zod` could definitely go on your list to learn for 2023. 🎊

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)