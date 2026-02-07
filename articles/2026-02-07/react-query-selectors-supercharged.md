---
title: "React Query Selectors, Supercharged"
source: "https://tkdodo.eu/blog/react-query-selectors-supercharged"
publishedDate: "2025-08-04"
category: "frontend"
feedName: "TkDodo"
---

![silver coupe scale model on brown wooden table](https://tkdodo.eu/blog/static/16d83414a9457294db215abbd51fb613/bbe0c/supercharged.jpg "silver coupe scale model on brown wooden table")

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
-   [#24: The Query Options API](https://tkdodo.eu/blog/the-query-options-api)
-   [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations)
-   [#26: How Infinite Queries work](https://tkdodo.eu/blog/how-infinite-queries-work)
-   [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/react-query-api-design-lessons-learned)
-   [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/react-query-the-bad-parts)
-   [#29: Concurrent Optimistic Updates in React Query](https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query)
-   **#30: React Query Selectors, Supercharged**

-   [한국어](https://velog.io/@willy4202/%EB%8D%94-%EA%B0%95%EB%A0%A5%ED%95%B4%EC%A7%84-React-Query-%EC%85%80%EB%A0%89%ED%84%B0)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Ah, [`select`](https://tanstack.com/query/latest/docs/framework/react/guides/render-optimizations#select). One of my favourite features in React Query that you'll hopefully never need. But if you need, it can be a life-saver.

## Global State and Subscriptions[](#global-state-and-subscriptions)

As I've described in [#18: Inside React Query](https://tkdodo.eu/blog/inside-react-query#querycache), React Query consists of one global state - the QueryCache - that holds information about all Queries. Whenever something in a Query changes, we want to inform all QueryObservers (the things that get created with `useQuery`) about that change.

Now ideally, we'd want to avoid that every component is subscribed to everything. A change in the `todos` Query shouldn't re-render a component that is only interested in the `profile` Query. Otherwise, we could've just used a top-level `useState` and distribute that with `React Context` throughout our application. Controlling subscriptions, and making them fine-grained, is why state management solutions exist in the first place.

## The QueryHash[](#the-queryhash)

As you may know, React Query has the above mentioned feature built-in. Of course, `useQuery` doesn't subscribe to the whole QueryCache. The QueryKey you pass to `useQuery` gets hashed deterministically into a QueryHash, and `useQuery` will only get notified about changes to that Query.

In essence, it's like we're pre-filtering down to the Query you're interested in. And mostly, that's enough. Data from one endpoint changes, your component re-renders. Data from another endpoint changes, it doesn't. So what more do we need?

## Fine-grained Subscriptions[](#fine-grained-subscriptions)

Sometimes, endpoints return a lot of data, and we aren't interested in all of that. Especially in situations where we have fields that change often, and fields that change rarely, we might want to have subscriptions that are more fine-grained while still storing the full response in the cache. To get there, we can use `select`.

## What is `select`?[](#what-is-select)

`select` is an option we can pass to `useQuery` to pick, transform, or otherwise compute a result that our component should subscribe to. It's a way to get derived state that is _very_ similar to how [deriving data with selectors](https://redux.js.org/usage/deriving-data-selectors) works in redux.

Let's say we fetch some product data from an API of ours:

productOptions

```
1const productOptions = (id: string) => {2  return queryOptions({3    queryKey: ['product', id],4    queryFn: () => fetchProduct(id),5  })6}
```

and we want to create a component that only renders the product title

ProductTitle

```
1function ProductTitle({ id }: Props) {2  const productQuery = useSuspenseQuery(productOptions(id))3
4  return <h1>{productQuery.data.title}</h1>5}
```

That will certainly work, and is likely fine for most situations. However, the endpoint could also return information that might change a lot more often than the title, like the number of purchases or comments.

Of course, an occasional re-render of this simple component just because something unrelated changes isn't the end of the world, but let's assume we really want to optimize this.

That's where `select` can help: Instead of subscribing our component to all product data, we're gonna pick the field (or fields) we're interested in:

select-title

```
1function ProductTitle({ id }: Props) {2  const productTitleQuery = useSuspenseQuery({3    ...productOptions(id),4    select: (data) => data.title,5  })6
7  return <h1>{productTitleQuery.data}</h1>8}
```

A component that uses `select` will only be subscribed to the result of the `select` function, so it will only re-render if that result changes. In this example, since the title probably doesn't change often, the component will rarely need to re-render, even if other properties of the product data change frequently.

Even better - we can also "pick" multiple properties if we want to, and we don't have to worry about referential stability, because React Query uses [structural sharing](https://tkdodo.eu/blog/react-query-render-optimizations#structural-sharing) on the `select` result. This is different than some other libraries, like `zustand`, where [atomic selectors](https://tkdodo.eu/blog/working-with-zustand#prefer-atomic-selectors) are preferred.

In essence, this means code like this will also work as you'd expect:

pick-multiple-values

```
1function Product({ id }: Props) {2  const productQuery = useSuspenseQuery({3    ...productOptions(id),4    select: (data) => ({5      title: data.title,6      description: data.description,7    }),8  })9
10  return (11    <main>12      <h1>{productQuery.data.title}</h1>13      <p>{productQuery.data.description}</p>14    </main>15  )16}
```

If either `title` or `description` changes, we get a re-render, otherwise not. That's pretty cool.😎

## Typing Select Abstractions[](#typing-select-abstractions)

You might not have noticed it in the examples above, but they are all valid TypeScript code. In fact, they are not only valid, but also type-safe and inferred. That means the `data` field on the object you get back from `useQuery` will be typed to whatever `select` returns.

However, this only works if you let type inference do it's magic 🪄, which means we don't want to manually "provide" generic type parameters to `useQuery`. Please read [#6: React Query and TypeScript](https://tkdodo.eu/blog/react-query-and-type-script#infer-all-the-things) for more information on that if you haven't done so already.

This is relatively easy to adhere to, but brings one question: How can I write a reusable abstraction in TypeScript that includes `select`? What type sorcery is needed to e.g. make `productOptions` that get `select` as an argument?

how-do-I-type-select?

```
1const productOptions = (id:string, select) => {2  return queryOptions({3    queryKey: ['product', id],4    queryFn: () => fetchProduct(id),5    // ⬇️ how do I type select ?6    select,7  })8}
```

My usual answer is - don't do it! We've built [the Query Options API](https://tkdodo.eu/blog/the-query-options-api) specifically to make it easier to abstract shared options away, while at the same time allowing you to specify additional options directly at the usage site. That's why all the code we've seen so far shows almost no indication that TypeScript is even used. Isn't that great?

But TkDodo, what if I _really_ want it? Okay, fine, if you must do this, it's a bit more involved, especially if you want `select` to be optional:

select-abstraction

```
1const productOptions = <TData = ProductData>(2  id: string,3  select?: (data: ProductData) => TData4) => {5  return queryOptions({6    queryKey: ['product', id],7    queryFn: () => fetchProduct(id),8    select,9  })10}
```

The trick here is to add a type parameter `TData` that defaults to whatever your `queryFn` returns, and then define `select` as a function from that type towards `TData`. That way, if you don't provide `select`, your `data` will be `ProductsData`, but if you do provide the transformation function, you will get back whatever this function returns. Here's a [TypeScript Playground](https://www.typescriptlang.org/play/?#code/JYWwDg9gTgLgBAbzgRwK4FMoE8DyYbAQB2AzgDRyonoDKVY6p6AihtnAL5wBmUEIcAEQABGAENS4gMYBrAPRR0YqTAC0aTFkEBuAFC6YWBnDgAFPgBNUKgCJjxcALyJdJgjAA26AFxwSMKGAiAHNXOAt0EilA-EIiX39AkN0OfQipDzFFHlQiFTiedBgpAAtzCCsVAApgCwSAoOCASl9ykGBqAB5yypg7cQA+fSlifzgwS2sYPAJRpzhOgBV+sXmeqZWBqrDa+qTgsjDqLxUAfl8qi3sxVsnba6anAbhl691Hx2eEMMUYVCgiCg2LhYqMqt8TCYNNgANLoLC+ADaAHIJhUpsiKLUALqHSFAzQAMXicCqH2e3CKpXW1VqTTxkOO6BUDI4TRSw1G8CQVwcXGcVFo9EY1FYmiqaN6MziJCqyNqqgAjJjwtcnqrxAA6dxeOBNdlyOT4kwAPVOuiAA) if you're curious.

## Supercharging `select` with Memoization[](#supercharging-select-with-memoization)

Since we're already optimizing, why not take it one step further and assume that our function we run in `select` is _really_ expensive. Like, maybe we're looping through a large product list and calculate the average rating for each product based on thousands of user reviews, filtering out invalid entries, and sorting the top-rated items — all in one pass. We'll call it `expensiveSuperTransformation` from now on. If we write our code normally with `select`, here's what we get:

expensiveSuperTransformation

```
1function ProductList({ filters }: Props) {2  const productsQuery = useSuspenseQuery({3    ...productListOptions(filters),4    select: (data) => expensiveSuperTransformation(data),5  })6
7  return (8    <ul>9      {productsQuery.data.map((product) => (10        <li>{product.summary}</li>11      ))}12    </ul>13  )14}
```

This should work fine, but there's one catch: Our `expensiveSuperTransformation` will now run on every render - not matter what caused it. To understand why, we have to know that React Query will re-run the `select` function in two cases:

1.  When `data` changes.
    
    This should be obvious, because if we get new `data`, we might get a new result from our transformation, so we have to run it. This is fine.
    
2.  When the `select` function itself changes.
    
    React Query tracks the referential identity of the `select` function as a additional performance measure. If it gets "the same function" passed in, it knows that it can only produce the same result, so it can skip running it again (Unless you rely on shared mutable state inside it, so just don't do that 😅).
    

Inline functions though are always newly created, on each render, so that optimization doesn't apply. This is actually a good feature, because it means we can close over additional props and don't have to worry about stale results:

minRating

```
1function ProductList({ filters, minRating }: Props) {2  const productsQuery = useSuspenseQuery({3    ...productListOptions(filters),4    select: (data) => expensiveSuperTransformation(data, minRating),5  })6
7  return (8    <ul>9      {productsQuery.data.map((product) => (10        <li>{product.summary}</li>11      ))}12    </ul>13  )14}
```

Now, if `minRating` changes, we're quite happy that the `select` function re-runs to give us the newest computation. So how can we tell React Query that it's fine to skip the computation in the first example, but not in the second?

### Stabilizing `select`[](#stabilizing-select)

The key is to pass a stable reference to `select`, and React has a good, built-in way to achieve that: `useCallback`.

select-useCallback

```
1function ProductList({ filters, minRating }: Props) {2  const productsQuery = useSuspenseQuery({3    ...productListOptions(filters),4    select: React.useCallback(5      (data) => expensiveSuperTransformation(data, minRating),6      [minRating]7    ),8  })9
10  return (11    <ul>12      {productsQuery.data.map((product) => (13        <li>{product.summary}</li>14      ))}15    </ul>16  )17}
```

Now, we'll get a stable reference passed to `select` unless `minRating` changes, and that's exactly what we want. And if we don't have any dependencies, we can even just move the function outside of our component to make it stable - no `useCallback` with empty dependency array necessary:

stable-select

```
1const select = (data: Array<Product>) =>2  expensiveSuperTransformation(data)3
4function ProductList({ filters }: Props) {5  const productsQuery = useSuspenseQuery({6    ...productListOptions(filters),7    select,8  })9
10  return (11    <ul>12      {productsQuery.data.map((product) => (13        <li>{product.summary}</li>14      ))}15    </ul>16  )17}
```

## The Final Boss[](#the-final-boss)

This works great so far, but wait, there's more. What happens if we render the same component multiple times now. How often do you think `select` would run?

Well, it runs once per component. Specifically, once per `QueryObserver`, because that's where the result of `select` is cached. Each call to `useQuery` creates a `QueryObserver`, so it has to run `select` at least once for each of those.

That's a bummer because it means our `expensiveSuperTransformation` might still run more than once per `data`, and we _really_ don't want that. What can we do?

We add more memoization, of course!

### More Memoization[](#more-memoization)

We really just want to memoize our `expensiveSuperTransformation` by its inputs, but this has to happen outside of React Query, because React Query caches this per observer. So, we can bring in a library like [fast memoize](https://www.npmjs.com/fast-memoize) that'll do just that:

fast-memoize

```
1import memoize from 'fast-memoize'2
3const select = memoize((data: Array<Product>) =>4  expensiveSuperTransformation(data)5)6
7function ProductList({ filters }: Props) {8  const productsQuery = useSuspenseQuery({9    ...productListOptions(filters),10    select,11  })12
13  return (14    <ul>15      {productsQuery.data.map((product) => (16        <li>{product.summary}</li>17      ))}18    </ul>19  )20}
```

Let's say we render our `ProductList` three times now. What happens is that `select` will run all three times (once per `QueryObserver`, there's no way around that), but the `expensiveSuperTransformation` will only run once because it will hit the cache of `fast-memoize` twice, as it runs with the same `data`. And if `data` changes, same thing: three runs of `select`, but only one run of the `expensiveSuperTransformation`.

That is as optimized as we can be.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)