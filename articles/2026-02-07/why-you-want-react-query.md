---
title: "Why You Want React Query"
source: "https://tkdodo.eu/blog/why-you-want-react-query"
publishedDate: "2023-11-07"
category: "frontend"
feedName: "TkDodo"
---

![white letters on brown wooden table, 'WANT' with reflection on shop window](https://tkdodo.eu/blog/static/558a62fa8bd717c8101185611cb7530b/bbe0c/want.jpg "white letters on brown wooden table, 'WANT' with reflection on shop window")

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
-   **#23: Why You Want React Query**
-   [#24: The Query Options API](https://tkdodo.eu/blog/the-query-options-api)
-   [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations)
-   [#26: How Infinite Queries work](https://tkdodo.eu/blog/how-infinite-queries-work)
-   [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/react-query-api-design-lessons-learned)
-   [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/react-query-the-bad-parts)
-   [#29: Concurrent Optimistic Updates in React Query](https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query)
-   [#30: React Query Selectors, Supercharged](https://tkdodo.eu/blog/react-query-selectors-supercharged)

-   [한국어](https://velog.io/@cnsrn1874/why-you-need-react-query)
-   [Español](https://dev.to/ccaracach/por-que-necesitas-react-query-3a1n)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

It's no secret that I ❤️ React Query for how it simplifies the way we're interacting with asynchronous state in our React applications. And I know a lot of fellow devs feel the same.

Sometimes though, I come across posts claiming that you don't need it to do something as "simple" as fetching data from a server.

> We don't need all the extra features that React Query has to offer, so we don't want to add a 3rd party library when we can just as easily fire a `fetch` in a `useEffect`.

To some degree, I think that's a valid point - React Query gives you a lot of features like caching, retries, polling, data synchronization, prefetching, ... and about a million more that would go way beyond the scope of this article. It's totally fine if you don't need them, but I still think this shouldn't stop you from using React Query.

So let's instead look at the standard fetch-in-`useEffect` example that came up on [Twitter](https://twitter.com/ken_wheeler/status/1719122802333118557) lately, and dive into why it might be a good idea to use React Query for those situation, too:

fetch-in-useEffect

```
1function Bookmarks({ category }) {2  const [data, setData] = useState([])3  const [error, setError] = useState()4
5  useEffect(() => {6    fetch(`${endpoint}/${category}`)7      .then(res => res.json())8      .then(d => setData(d))9      .catch(e => setError(e))10  }, [category])11
12  // Return JSX based on data and error state13}
```

If you think this code is fine for simple use cases where you don't need additional features, let me tell you that I immediately spotted 🐛 5 bugs 🪲 hiding in these 10 lines of code.

![This is fine meme](https://tkdodo.eu/blog/static/befb647000e4c4735714ae7fb0d9a4cd/4b306/this_is_fine.jpg "This is fine meme")

Maybe take a minute or two and see if you can find them all. I'll wait...

* * *

Hint: It's not the dependency array. That is fine.

* * *

## 1\. Race Condition 🏎[](#1-race-condition-)

There are reasons why the [official React docs](https://react.dev/reference/react/useEffect#fetching-data-with-effects) recommend using either a framework or a library like React Query for data fetching. While making the actual fetch request can be a pretty trivial exercise, making that state available predictably in your application is certainly not.

The effect is set up in a way that it re-fetches whenever `category` changes, which is certainly correct. However, network responses can arrive in a different order than you sent them. So if you change the category from `books` to `movies` and the response for `movies` arrives before the response for `books`, you'll end up with the wrong data in your component.

![Timeline that starts to fetch books, then fetches movies. Movies resolves faster so we setData(movies) before we setData(books)](https://tkdodo.eu/blog/static/f764b12ab2503323389f2613782cd57d/7d769/race.png "Timeline that starts to fetch books, then fetches movies. Movies resolves faster so we setData(movies) before we setData(books)")

At the end, you'll be left with an inconsistent state: Your local state will say that you have `movies` selected, but the data you're rendering is actually `books`.

The React docs say that we can fix this with a cleanup function and an `ignore` boolean, so let's do that:

ignore-flag

```
1function Bookmarks({ category }) {2  const [data, setData] = useState([])3  const [error, setError] = useState()4
5  useEffect(() => {6    let ignore = false7    fetch(`${endpoint}/${category}`)8      .then(res => res.json())9      .then(d => {10        if (!ignore) {11          setData(d)12        }13      })14      .catch(e => {15        if (!ignore) {16          setError(e)17        }18      })19      return () => {20        ignore = true21      }22  }, [category])23
24  // Return JSX based on data and error state25}
```

What happens now is that the effect cleanup function runs when `category` changes, setting the local `ignore` flag to true. If a fetch response comes in after that, it will not call `setState` anymore. Easy peasy.

## 2\. Loading state 🕐[](#2-loading-state-)

It's not there at all. We have no way to show a pending UI while the requests are happening - not for the first one and not for further requests. So, let's add that?

loading-state

```
1function Bookmarks({ category }) {2  const [isLoading, setIsLoading] = useState(true)3  const [data, setData] = useState([])4  const [error, setError] = useState()5
6  useEffect(() => {7    let ignore = false8    setIsLoading(true)9    fetch(`${endpoint}/${category}`)10      .then(res => res.json())11      .then(d => {12        if (!ignore) {13          setData(d)14        }15      })16      .catch(e => {17        if (!ignore) {18          setError(e)19        }20      })21      .finally(() => {22        if (!ignore) {23          setIsLoading(false)24        }25      })26      return () => {27        ignore = true28      }29  }, [category])30
31  // Return JSX based on data and error state32}
```

## 3\. Empty state 🗑️[](#3-empty-state-%EF%B8%8F)

Initializing `data` with an empty array seems like a good idea to avoid having to check for `undefined` all the time - but what if we fetch data for a category that has no entries yet, and we actually get back an empty array? We'd have no way to distinguish between "no data yet" and "no data at all". The loading state we've just introduced helps, but it's still better to initialize with `undefined`:

empty-state

```
1function Bookmarks({ category }) {2  const [isLoading, setIsLoading] = useState(true)3  const [data, setData] = useState()4  const [error, setError] = useState()5
6  useEffect(() => {7    let ignore = false8    setIsLoading(true)9    fetch(`${endpoint}/${category}`)10      .then(res => res.json())11      .then(d => {12        if (!ignore) {13          setData(d)14        }15      })16      .catch(e => {17        if (!ignore) {18          setError(e)19        }20      })21      .finally(() => {22        if (!ignore) {23          setIsLoading(false)24        }25      })26      return () => {27        ignore = true28      }29  }, [category])30
31  // Return JSX based on data and error state32}
```

## 4\. Data & Error are not reset when category changes 🔄[](#4-data--error-are-not-reset-when-category-changes-)

Both `data` and `error` are separate state variables, and they don't get reset when `category` changes. That means if one category fails, and we switch to another one that is fetched successfully, our state will be:

```
1data: dataFromCurrentCategory2error: errorFromPreviousCategory
```

The result will then depend on how we actually render JSX based on this state. If we check for `error` first, we'll render the error UI with the old message even though we have valid data:

error-first

```
1return (2  <div>3    { error ? (4      <div>Error: {error.message}</div>5    ) : (6      <ul>7        {data.map(item => (8          <li key={item.id}>{item.name}</div>9        ))}10      </ul>11    )}12  </div>13)
```

If we check data first, we have the same problem if the second request fails. If we always render both error and data, we're also rendering potentially outdated information . 😔

To fix this, we have to reset our local state when category changes:

reset-state

```
1function Bookmarks({ category }) {2  const [isLoading, setIsLoading] = useState(true)3  const [data, setData] = useState()4  const [error, setError] = useState()5
6  useEffect(() => {7    let ignore = false8    setIsLoading(true)9    fetch(`${endpoint}/${category}`)10      .then(res => res.json())11      .then(d => {12        if (!ignore) {13          setData(d)14          setError(undefined)15        }16      })17      .catch(e => {18        if (!ignore) {19          setError(e)20          setData(undefined)21        }22      })23      .finally(() => {24        if (!ignore) {25          setIsLoading(false)26        }27      })28      return () => {29        ignore = true30      }31  }, [category])32
33  // Return JSX based on data and error state34}
```

## 5\. Will fire twice in `StrictMode` 🔥🔥[](#5-will-fire-twice-in-strictmode-)

Okay, this is more of an annoyance than a bug, but it's definitely something that catches new React developers off guard. If your app is wrapped in `<React.StrictMode>`, React will intentionally [call your effect twice](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-re-running-effects-in-development) in development mode to help you find bugs like missing cleanup functions.

If we'd want to avoid that, we'd have to add another "ref workaround", which I don't think is worth it.

## Bonus: Error handling 🚨[](#bonus-error-handling-)

I didn't include this in the original list of bugs, because you'd have the same problem with React Query: `fetch` doesn't reject on HTTP errors, so you'd have to check for `res.ok` and throw an error yourself.

error-handling

```
1function Bookmarks({ category }) {2  const [isLoading, setIsLoading] = useState(true)3  const [data, setData] = useState()4  const [error, setError] = useState()5
6  useEffect(() => {7    let ignore = false8    setIsLoading(true)9    fetch(`${endpoint}/${category}`)10      .then(res => {11        if (!res.ok) {12          throw new Error('Failed to fetch')13        }14        return res.json()15      })16      .then(d => {17        if (!ignore) {18          setData(d)19          setError(undefined)20        }21      })22      .catch(e => {23        if (!ignore) {24          setError(e)25          setData(undefined)26        }27      })28      .finally(() => {29        if (!ignore) {30          setIsLoading(false)31        }32      })33      return () => {34        ignore = true35      }36  }, [category])37
38  // Return JSX based on data and error state39}
```

* * *

Our little "we just want to fetch data, how hard can it be?" `useEffect` hook became a giant mess of spaghetti code 🍝 as soon as we had to consider edge cases and state management. So what's the takeaway here?

Data Fetching is simple.  
Async State Management is not.

And this is where React Query comes in, because React Query is NOT a data fetching library - it's an async state manager. So when you say that you don't want it for doing something as simple as fetching data from an endpoint, you're actually right: Even with React Query, you need to write the same `fetch` code as before.

But you still need it to make that state predictably available in your app as easily as possible. Because let's be honest, I haven't written that `ignore` boolean code before I used React Query, and likely, neither have you. 😉

With React Query, the above code becomes:

react-query

```
1function Bookmarks({ category }) {2  const { isLoading, data, error } = useQuery({3    queryKey: ['bookmarks', category],4    queryFn: () =>5      fetch(`${endpoint}/${category}`).then((res) => {6        if (!res.ok) {7          throw new Error('Failed to fetch')8        }9        return res.json()10      }),11  })12
13  // Return JSX based on data and error state14}
```

That's about 50% of the spaghetti code above, and just about the same amount as the original, buggy snippet was. And yes, this addresses all the bugs we found automatically:

## 🐛 Bugs[](#-bugs)

-   🏎️   There is no race condition because state is always stored by its input (category).
-   🕐   You get loading, data and error states for free, including discriminated unions on type level.
-   🗑️   Empty states are clearly separated and can further be enhanced with features like `placeholderData`.
-   🔄   You will not get data or error from a previous category unless you opt into it.
-   🔥   Multiple fetches are efficiently deduplicated, including those fired by `StrictMode`.

So, if you're still thinking that you don't want React Query, I'd like to challenge you to try it out in your next project. I bet you'll not only wind up with code that is more resilient to edge cases, but also easier to maintain and extend. And once you get a taste of all the features it brings, you'll probably never look back.

## Bonus: Cancellation[](#bonus-cancellation)

A lot of folks on twitter mentioned missing request cancellation in the original snippet. I don't think that's necessarily a bug - just a missing feature. Of course, React Query has you covered here as well with a pretty straightforward change:

cancellation

```
1function Bookmarks({ category }) {2  const { isLoading, data, error } = useQuery({3    queryKey: ['bookmarks', category],4    queryFn: ({ signal }) =>5      fetch(`${endpoint}/${category}`, { signal }).then((res) => {6        if (!res.ok) {7          throw new Error('Failed to fetch')8        }9        return res.json()10      }),11  })12
13  // Return JSX based on data and error state14}
```

Just take the `signal` you get into the `queryFn`, forward it to `fetch`, and requests will be aborted automatically when category changes. 🎉

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)