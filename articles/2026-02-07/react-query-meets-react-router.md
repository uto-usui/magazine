---
title: "React Query meets React Router"
source: "https://tkdodo.eu/blog/react-query-meets-react-router"
publishedDate: "2022-08-28"
category: "frontend"
feedName: "TkDodo"
---

![rq rr](https://tkdodo.eu/blog/static/c8bc28e11f96386a9ff0a7b3869cebc9/bbe0c/rq-rr.jpg "rq rr")

**Last Update: 2022-12-11**

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
-   **#16: React Query meets React Router**
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

-   [한국어](https://itchallenger.tistory.com/719)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

[Remix](https://remix.run/) is changing the game, and they are bringing their data fetching concepts (loaders and actions) to purely client side rendered applications with [React Router 6.4](https://reactrouter.com/en/6.4.0/start/overview). I went through their great [tutorial](https://reactrouter.com/en/6.4.0/start/tutorial) that shows the concept very well and demonstrates how you can quickly build a small, but feature-rich app.

With React Router coming into the data fetching game, it is naturally interesting to understand how this competes or correlates with existing data fetching and caching libraries like React Query. So let me spoil it right here:

They are a match made in heaven

## A router that fetches data[](#a-router-that-fetches-data)

To recap: React Router will allow you to define [loaders](https://reactrouter.com/en/6.4.0/route/loader) on each route, which will be called when the route is visited. In the route component itself, you can `useLoaderData()` to get access to that data. Updating data is as simple as submitting a `Form`, which will call an [action](https://reactrouter.com/en/6.4.0/route/action) function. Actions invalidate all active loaders, so you'll automagically see updated data on your screen.

If this sounds very similar to `queries` and `mutations` - you are right, it does. So the questions that have been popping up after the announcement of [Remixing React Router](https://remix.run/blog/remixing-react-router) are:

-   Would we still want React Query now that we can fetch in the route?
-   If we already use React Query, do we want to (and how can we) leverage the new React Router features?

### It's not a cache[](#its-not-a-cache)

To me, the answers to both questions are clearly: YES. As [Ryan Florence](https://twitter.com/ryanflorence) from the remix team has put it: "React Router is not a cache":

[

![Avatar for ryanflorence](https://tkdodo.eu/blog/static/39f03fb56a95b14d9441ba73908ecc8a/47930/ryanflorence.jpg)

Ryan Florence

@

ryanflorence

Nah, React Router is not a cache.

Browsers have this built in with HTTP and libraries like React Query have this job nailed down.

React Router is about \*when\*, data caching libs are about \*what\*.

\-

Aug 22, 2022



](https://x.com/ryanflorence/status/1561731634419773447)

Fetching "as early as possible" is an important concept to provide the best possible user experience. Full Stack frameworks like [NextJs](https://nextjs.org/) or Remix move this step to the server, because that is the earliest entry point. With client rendered applications, we have no such luxury.

### Fetching early[](#fetching-early)

What we are usually doing is fetching on component mount - when data is first needed. That is not great, as it will lead to a loading spinner visible to the user for as long as we are initially fetching. [Prefetching](https://tanstack.com/query/v4/docs/guides/prefetching) can help, but only for subsequent navigations, and you need to manually set it up for every way to navigate to a route.

The router however is the first component that always knows which page you are trying to visit, and because it now has loaders, it can know which data those pages need to render. This is great for the first page visit - but loaders are called on _every_ page visit. And as the router has no cache, it will hit the server again, unless we do something about it.

As an example (yes, this is from the tutorial mentioned before. Credits go to Ryan Florence), suppose you have a list of contacts. If you click on one of them, you show the contact details:

src/routes/contact.jsx

```
1import { useLoaderData } from 'react-router-dom'2import { getContact } from '../contacts'3
4// ⬇️ this is the loader for the detail route5export async function loader({ params }) {6  return getContact(params.contactId)7}8
9export default function Contact() {10  // ⬇️ this gives you data from the loader11  const contact = useLoaderData()12  // render some jsx13}
```

src/main.jsx

```
1import Contact, { loader as contactLoader } from './routes/contact'2
3const router = createBrowserRouter([4  {5    path: '/',6    element: <Root />,7    children: [8      {9        path: 'contacts',10        element: <Contacts />,11        children: [12          {13            path: 'contacts/:contactId',14            element: <Contact />,15            // ⬇️ this is the loader for the detail route16            loader: contactLoader,17          },18        ],19      },20    ],21  },22])
```

If you navigate to `contacts/1`, data for that contact will be fetched _before_ the component is rendered. By the time we want to show the Contact, `useLoaderData` will have data readily available. This is awesome as it not only improves the user experience, but look at that developer experience of co-located data fetching and rendering! I love it. 🥰

### Fetching too often[](#fetching-too-often)

The big drawback of not having a cache shows when you go to Contact 2 and then back to Contact 1 again. If you are used to React Query, you will know that data for Contact 1 is cached already, so we can show it instantly and kick of a background refetch if data is considered stale. With the loader approach, we will have to fetch that data again (and wait for it to finish fetching!), even though we have already fetched it before.

And that is exactly where React Query comes in.

What if we can use the loader to pre-fill the React Query Cache, but still `useQuery` in the component to get all the React Query goodies like `refetchOnWindowFocus` and showing stale data instantly? To me, this sounds like the best of both worlds. The router is responsible for fetching data early (if we don't have it), and React Query is responsible for caching and keeping the data fresh.

## Querifying the example[](#querifying-the-example)

Let's try to move the example in that direction:

src/routes/contacts.jsx

```
1import { useQuery } from '@tanstack/react-query'2import { getContact } from '../contacts'3
4// ⬇️ define your query5const contactDetailQuery = (id) => ({6  queryKey: ['contacts', 'detail', id],7  queryFn: async () => getContact(id),8})9
10// ⬇️ needs access to queryClient11export const loader =12  (queryClient) =>13  async ({ params }) => {14    const query = contactDetailQuery(params.contactId)15    // ⬇️ return data or fetch it16    return (17      queryClient.getQueryData(query.queryKey) ??18      (await queryClient.fetchQuery(query))19    )20  }21
22export default function Contact() {23  const params = useParams()24  // ⬇️ useQuery as per usual25  const { data: contact } = useQuery(contactDetailQuery(params.contactId))26  // render some jsx27}
```

src/main.jsx

```
1const queryClient = new QueryClient()2
3const router = createBrowserRouter([4  {5    path: '/',6    element: <Root />,7    children: [8      {9        path: 'contacts',10        element: <Contacts />,11        children: [12          {13            path: 'contacts/:contactId',14            element: <Contact />,15            // ⬇️ pass the queryClient to the route16            loader: contactLoader(queryClient),17          },18        ],19      },20    ],21  },22])
```

There are a couple of things going on here, so let's break it down:

### The loader needs access to the QueryClient.[](#the-loader-needs-access-to-the-queryclient)

The loader is not a hook, so we can't `useQueryClient`. Importing the QueryClient directly is something that [I'm not recommending](https://tkdodo.eu/blog/react-query-fa-qs#why-should-i-usequeryclient), so passing it explicitly seems like the best alternative.

### getQueryData ?? fetchQuery[](#getquerydata--fetchquery)

We want the loader to wait for our data to be ready and return it to get a good experience on the first loads. We also want errors to be thrown to the [errorElement](https://reactrouter.com/en/6.4.0/route/error-element), so `fetchQuery` is the best option. Note that `prefetchQuery` doesn't return anything and catches errors internally (otherwise, they are equivalent).

`getQueryData` does the trick for returning any data we have in the cache, even if it's stale. This ensures that recurring visits to a page will show data immediately. Only if `getQueryData` returns `undefined` (meaning nothing is in the cache), we'll actually do the fetch.

An alternative approach would be to set a `staleTime` for `fetchQuery`:

alternative-loader

```
1export const loader =2  (queryClient) =>3  ({ params }) =>4    queryClient.fetchQuery({5      ...contactDetailQuery(params.contactId),6      staleTime: 1000 * 60 * 2,7    })
```

Setting the `staleTime` to two minutes tells `fetchQuery` to resolve data immediately if it's available and not older than two minutes, otherwise, it will go and fetch it. If you are fine with stale data _not_ being shown in the component, this is a good alternative.

Setting `staleTime` to `Infinity` is almost equivalent to the `getQueryData` approach, except that manual query invalidation takes precedence over `staleTime`. So I like the `getQueryData` approach a bit better, even if it is slightly more code.

​Update: As of [v4.18.0](https://github.com/TanStack/query/releases/tag/v4.18.0), you can use the built-in [queryClient.ensureQueryData](https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientensurequerydata) method to achieve the same thing. It is literally implemented with `getQueryData ?? fetchQuery`, but it's a common enough use-case for the library to have it out of the box.

### A TypeScript tip[](#a-typescript-tip)

With this, it is guaranteed that calling `useQuery` in the component will have some data available, just like calling `useLoaderData` would. However, TypeScript has no way of knowing this - the data returned is of type `Contact | undefined`.

Thanks to [Matt Pocock](https://twitter.com/mattpocockuk) and his [contribution](https://github.com/TanStack/query/pull/3834) to React Query v4, we can now exclude `undefined` from the union if `initialData` is provided.

And where would we get `initialData` from? `useLoaderData` of course! We can even infer the type from the loader function:

initial-data

```
1export default function Contact() {2  const initialData = useLoaderData() as Awaited<3    ReturnType<ReturnType<typeof loader>>4  >5  const params = useParams()6  const { data: contact } = useQuery({7    ...contactDetailQuery(params.contactId),8    initialData,9  })10  // render some jsx11}
```

It's a bit much to write because our loader is a function that returns a function, but we can tuck that away in a single util. Also, it seems that right now, using type assertions is the only way to narrow the return type of `useLoaderData`. 🤷‍♂️ But it will nicely narrow the type of the `useQuery` result, which is what we want. 🙌

## Invalidating in actions[](#invalidating-in-actions)

The next piece of the puzzle involves query invalidation. Here is how an action would look without React Query, straight from the tutorial (yes, this is all it takes to perform an update):

src/routes/edit.jsx

```
1export const action = async ({ request, params }) => {2  const formData = await request.formData()3  const updates = Object.fromEntries(formData)4  await updateContact(params.contactId, updates)5  return redirect(`/contacts/${params.contactId}`)6}
```

Actions invalidate loaders, but because we've set up our loaders to always return data from the cache, we won't see any updates unless we somehow invalidate the cache. It's just one line of code really:

src/routes/edit.jsx

```
1export const action =2  (queryClient) =>3  async ({ request, params }) => {4    const formData = await request.formData()5    const updates = Object.fromEntries(formData)6    await updateContact(params.contactId, updates)7    await queryClient.invalidateQueries({ queryKey: ['contacts'] })8    return redirect(`/contacts/${params.contactId}`)9  }
```

The [fuzzy matching of invalidateQueries](https://tanstack.com/query/v4/docs/guides/query-invalidation#query-matching-with-invalidatequeries) will make sure that our list and our detail view will get new data in the cache by the time the action is finished, and we're redirecting back to the detail view.

### await is the lever[](#await-is-the-lever)

However, this will make our action function take longer and block the transition. Would we not be able to trigger the invalidation, then redirect to the detail view, show the stale data and then let it update in the background once the new data is available? Of course we can: Just leave out the `await` keyword:

src/routes/edit.jsx

```
1export const action =2  (queryClient) =>3  async ({ request, params }) => {4    const formData = await request.formData()5    const updates = Object.fromEntries(formData)6    await updateContact(params.contactId, updates)7    queryClient.invalidateQueries({ queryKey: ["contacts"] });8    return redirect(`/contacts/${params.contactId}`)9  }
```

Await literally becomes a lever you can pull in either direction (This analogy is based on Ryan's great talk [When To Fetch](https://www.youtube.com/watch?v=95B8mnhzoCM). Please watch it if you haven't already):

-   Is it important to transition back to the detail view as soon as possible? Do not await.
-   Is it important to avoid potential layout shifts when showing stale data, or do you want to keep the action pending until you have all new data? Use await.

If multiple invalidations are involved, you can also mix and match the two approaches to wait for important refetches, but let less important ones be done in the background.

## Summary[](#summary)

I'm very excited about the new React Router release. It's a great step forward to enable all applications to trigger fetches as early as possible. However, it is not a replacement for caching - so go ahead and combine React Router with React Query to get the best of both worlds. 🚀

If you want to explore this topic some more, I've implemented the app from the tutorial and added React Query on top of it - you can find it in [the examples of the official docs](https://tanstack.com/query/latest/docs/framework/react/examples/react-router).

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)