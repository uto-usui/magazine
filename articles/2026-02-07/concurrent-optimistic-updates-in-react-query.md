---
title: "Concurrent Optimistic Updates in React Query"
source: "https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query"
publishedDate: "2025-04-28"
category: "frontend"
feedName: "TkDodo"
---

28.04.2025 — [ReactJs](https://tkdodo.eu/blog/tags/react-js), [React Query](https://tkdodo.eu/blog/tags/react-query), [Mutations](https://tkdodo.eu/blog/tags/mutations), [TypeScript](https://tkdodo.eu/blog/tags/type-script), [JavaScript](https://tkdodo.eu/blog/tags/java-script) — 5 min read

![A blurry photo of a city at night](https://tkdodo.eu/blog/static/09ef9aff91b1d085f7d52d18e2db1319/bbe0c/concurrent-optimistic-updates.jpg "A blurry photo of a city at night")

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
-   **#29: Concurrent Optimistic Updates in React Query**
-   [#30: React Query Selectors, Supercharged](https://tkdodo.eu/blog/react-query-selectors-supercharged)

-   [한국어](https://velog.io/@cnsrn1874/concurrent-optimistic-updates-in-react-query)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

[Optimistic Updates](https://tanstack.com/query/v5/docs/framework/react/guides/optimistic-updates) are one of those techniques that are great to [make your app feel faster than it really is](https://www.youtube.com/watch?v=nxzVZ7FYdwE&t=651s), but it's also one of the things that's easiest in todo-app style demos.

Look, I can instantly append a task to a list when I press `Enter` on the input field. That's great in theory, but in practice, there's likely more challenges awaiting you.

## Re-creating server logic on the client[](#re-creating-server-logic-on-the-client)

I have already written a bit about this in [#12: Mastering Mutation in React Query](https://tkdodo.eu/blog/mastering-mutations-in-react-query#optimistic-updates), but it's an important point to re-iterate on. With optimistic UI, you're essentially trying to foresee what the server will do, and implement that on the client beforehand.

This can be quite straight-forward, for example, if the user is interacting with a toggle button. Usually, all we need to do is take the current boolean state and invert it:

toggle-isActive

```
1queryClient.setQueryData(['items', 'detail', item.id], (prevItem) =>2  prevItem3    ? {4        ...prevItem,5        isActive: !prevItem.isActive,6      }7    : undefined8)
```

That's not too much code to write, and it has a great effect on the UX: Rather than having to wait until the request is finished before the UI reacts, our users can now click the button and it instantly see their change reflected. There's not much that's worse than a toggle button that slides to the new state half a second after I clicked it. 😅

### More complex update logic[](#more-complex-update-logic)

In other situations, it's not that easy, and we don't have to invent a complex scenario to get there. Let's just assume we have a list of items that have a category, which our users can use for filtering. When they edit an item, we show that in a modal dialog, and once they're done, we want to optimistically update the list they are currently seeing.

Finding the item in the list of items is not the problem, and merging the updates is also not that bad:

update-item-in-list

```
1queryClient.setQueryData(['items', 'list', filters], (prevItems) =>2  prevItems?.map((item) =>3    item.id === newItem.id ? { ...item, ...newItem } : item4  )5)
```

This, too, works great, until we realize the edge-case when a user updates a category of our item, which would remove the item from the current filter. We aren't handling that yet. Even the GitHub list view gets that wrong when we're using inline editing to remove a `label` that we have currently filtered for. Let's fix that:

filter-wrong-categories

```
1queryClient.setQueryData(['items', 'list', filters], (prevItems) =>2  prevItems3    ?.map((item) =>4      item.id === newItem.id ? { ...item, ...newItem } : item5    )6    .filter((item) => filters.categories.includes(item.category))7)
```

Now, the item optimistically disappears, which is what we'd want, because that's what the server would do when the list gets refetched. We just forgot that we can also filter by text. Now we need to do the same thing for `item.title` and ...

* * *

I hope you get the point by now that in many realistic scenarios, optimistic updates come with the drawback of having to know _exactly_ what will happen on the server, and having to re-create and duplicate that logic on the client. Sometimes, that's totally worth it, but I'd also say that a lot of times, it might not be. And it gets even harder if our users can update the same entity multiple times at the same time.

## Concurrent Optimistic Updates[](#concurrent-optimistic-updates)

Let's go back to our toggle button example once more, but this time, let's code the full optimistic mutation:

optimistic-toggle-mutation

```
1const useToggleIsActive = (id: number) =>2  useMutation({3    mutationFn: api.toggleIsActive,4    onMutate: async () => {5      await queryClient.cancelQueries({6        queryKey: ['items', 'detail', id],7      })8
9      queryClient.setQueryData(['items', 'detail', id], (prevItem) =>10        prevItem11          ? {12              ...prevItem,13              isActive: !prevItem.isActive,14            }15          : undefined16      )17    },18    onSettled: () => {19      queryClient.invalidateQueries({20        queryKey: ['items', 'detail', id],21      })22    },23  })
```

This is a minimal example where we write to the cache before the mutation starts, and invalidate it once it finished. I've omitted the `rollback` logic you'll usually see and that we also show [in the docs](https://tanstack.com/query/v5/docs/framework/react/guides/optimistic-updates#updating-a-single-todo) because it's irrelevant for what I want to talk about, and you can also get by without it. 😉

### Window of Inconsistency[](#window-of-inconsistency)

One thing I didn't leave out is the manual Query Cancellation, because it's pretty relevant to avoid the window of inconsistency. Without it, here is what could happen:

![A query starts because of an invalidation event, and a mutation happens shortly afterwards. When the query settles, the UI overwrites the optimistic update and creates a window of inconsistency.](https://tkdodo.eu/blog/static/b9342fdc45837e70ec1a9b6b8a08f6cd/7d769/window-of-inconsistency.png "A query starts because of an invalidation event, and a mutation happens shortly afterwards. When the query settles, the UI overwrites the optimistic update and creates a window of inconsistency.")

If our mutation starts while we already have a request in-flight, our optimistic update would get overwritten when that request finishes. Since we start another invalidation at the end, it would be fine eventually, but it can create a jarring user experience where state toggles back and forth. This behaviour can most commonly happen when users focus a screen to perform an update, and that focus event will trigger an invalidation thanks to `refetchOnWindowFocus`.

### Query Cancellation[](#query-cancellation)

Query cancellation fixes this because it essentially aborts all currently running queries that could interfere with our optimistic update when the mutation starts:

![A query starts because of an invalidation event, and a mutation happens shortly afterwards. The start of the mutation cancels the query, so there is on inconsistency anymore.](https://tkdodo.eu/blog/static/a57f13d118191fbb9c9cabea2f9a0cc8/7d769/with-query-cancellation.png "A query starts because of an invalidation event, and a mutation happens shortly afterwards. The start of the mutation cancels the query, so there is on inconsistency anymore.")

It even works fine if we have multiple mutations that write to the same entity, given that the invalidation is already running when the second mutation starts. But that's not a given. Let's look at this scenario where query cancellation doesn't help:

![A mutation starts, and before it finishes, a second mutation starts. When the first mutation settles, it triggers an invalidation, which can revert the optimistic update of the second mutations (if it's fast enough), which again causes inconsistencies](https://tkdodo.eu/blog/static/6d3c47ae919acf5695e21bfdabc01583/7d769/concurrent-mutations.png "A mutation starts, and before it finishes, a second mutation starts. When the first mutation settles, it triggers an invalidation, which can revert the optimistic update of the second mutations (if it's fast enough), which again causes inconsistencies")

Here, the second mutation starts while the first mutation is still running, so when it begins, there is nothing it could cancel. But then, the first mutation settles and we call `queryClient.invalidateQueries`. If that refetch is faster than our second mutation, our UI will revert and we'll see the dreaded window of inconsistency again.

Note that this is quite an edge case. If the second mutation wouldn't take that long, the second invalidation would _also_ cancel the first invalidation, as imperative calls to `invalidateQueries` cancel refetches per default. You might see your concurrent mutations working fine for weeks, and then you'll get this flash-of-old-UI once and don't know where it comes from. So how can we fix this?

### Preventing over-invalidation[](#preventing-over-invalidation)

The problem is actually right there in our code: every time when a mutation settles, we invalidate:

always-invalidate

```
1onSettled: () => {2  queryClient.invalidateQueries({3    queryKey: ['items', 'detail', id],4  })5}
```

So what if we made that a little bit smarter? Looking at the diagram from above, we know that the first invalidation is fruitless because there's a "related" mutation ongoing, which will also do an invalidation at the end. The trick is to skip those invalidations, and it's just one line of code:

skip-invalidations

```
1onSettled: () => {2  if (queryClient.isMutating() === 1) {3    queryClient.invalidateQueries({4      queryKey: ['items', 'detail', id],5    })6  }7}
```

`queryClient.isMutating()` is an imperative way to look at how many mutations are currently running. And since we only want to do an invalidation if there's no other mutation in-flight, we check for `1`. That's because when `onSettled` is invoked, our own mutation is still in progress, so this count will never be `0` here. Note that we really want this check to happen imperatively, right before calling the invalidation. If we'd switch this to `useIsMutating()`, we'd likely run into [stale closure issues](https://tkdodo.eu/blog/hooks-dependencies-and-stale-closures).

### Limiting the scope[](#limiting-the-scope)

The check is currently pretty wide. If there's any other mutation running, our invalidation will be skipped. That's fine if we have no other mutations in progress, or if we [invalidate everything](https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations) at the end anyways.

But if we do fine-grained invalidations, we have to be careful about not skipping too many of them. A good balance would be to tag related mutations with a `mutationKey`, then use that as a filter for `isMutating`:

limited-scope

```
1const useToggleIsActive = (id: number) =>2  useMutation({3    mutationKey: ['items'],4    mutationFn: api.toggleIsActive,5    onMutate: async () => {6      await queryClient.cancelQueries({7        queryKey: ['items', 'detail', id],8      })9
10      queryClient.setQueryData(['items', 'detail', id], (prevItem) =>11        prevItem12          ? {13              ...prevItem,14              isActive: !prevItem.isActive,15            }16          : undefined17      )18    },19    onSettled: () => {20      if (queryClient.isMutating({ mutationKey: ['items'] }) === 1) {21        queryClient.invalidateQueries({22          queryKey: ['items', 'detail', id],23        })24      }25    },26  })
```

With this code, this is how our final flow looks like:

![A query starts because of an invalidation event, and a mutation happens shortly afterwards. The start of the mutation cancels the query. Then, a second mutation starts. When the first mutation finishes, it doesn't invalidate, because it sees another mutation being active.](https://tkdodo.eu/blog/static/0860c0c0b1220641ca9d400a03e7e47c/7d769/limited-invalidations.png "A query starts because of an invalidation event, and a mutation happens shortly afterwards. The start of the mutation cancels the query. Then, a second mutation starts. When the first mutation finishes, it doesn't invalidate, because it sees another mutation being active.")

It's pretty resilient. Thanks' to query cancellation and limited invalidations, we should never see a flickering UI that shows an inconsistent state. 🙌

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)