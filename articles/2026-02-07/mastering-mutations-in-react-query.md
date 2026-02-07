---
title: "Mastering Mutations in React Query"
source: "https://tkdodo.eu/blog/mastering-mutations-in-react-query"
publishedDate: "2021-10-09"
category: "frontend"
feedName: "TkDodo"
---

![mutations](https://tkdodo.eu/blog/static/e7fe4197241e1f30c5b0b6f2bc497c64/bbe0c/mutations.jpg "mutations")

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
-   **#12: Mastering Mutations in React Query**
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

-   [한국어](https://highjoon-dev.vercel.app/blogs/12-mastering-mutations-in-react-query)
-   [Español](https://rubenvara.io/react-query/mutaciones-react-query)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

We've covered a lot of ground already when it comes to the features and concepts React Query provides. Most of them are about _retrieving_ data - via the `useQuery` hook. There is however a second, integral part to working with data: updating it.

For this use-case, React Query offers the `useMutation` hook.

## What are mutations?[](#what-are-mutations)

Generally speaking, mutations are functions that have a side effect. As an example, have a look at the `push` method of Arrays: It has the side effect of _changing_ the array in place where you're pushing a value to:

mutable-array-push

```
1const myArray = [1]2myArray.push(2)3
4console.log(myArray) // [1, 2]
```

The _immutable_ counterpart would be `concat`, which can also add values to an array, but it will return a new Array instead of directly manipulating the Array you operate on:

immutable-array-concat

```
1const myArray = [1]2const newArray = myArray.concat(2)3
4console.log(myArray) //  [1]5console.log(newArray) // [1, 2]
```

As the name indicates, _useMutation_ also has some sort of side effect. Since we are in the context of [managing server state](https://tkdodo.eu/blog/react-query-as-a-state-manager) with React Query, mutations describe a function that performs such a side effect _on the server_. Creating a todo in your database would be a mutation. Logging in a user is also a classic mutation, because it performs the side effect of creating a token for the user.

In some aspects, `useMutation` is very similar to `useQuery`. In others, it is quite different.

## Similarities to useQuery[](#similarities-to-usequery)

`useMutation` will track the state of a mutation, just like `useQuery` does for queries. It'll give you `loading`, `error` and `status` fields to make it easy for you to display what's going on to your users.

You'll also get the same nice callbacks that `useQuery` has: `onSuccess`, `onError` and `onSettled`. But that's about where the similarities end.

## Differences to useQuery[](#differences-to-usequery)

useQuery is declarative, useMutation is imperative.

By that, I mean that queries mostly run automatically. You define the dependencies, but React Query takes care of running the query immediately, and then also performs smart background updates when deemed necessary. That works great for queries because we want to keep what we see on the screen _in sync_ with the actual data on the backend.

For mutations, that wouldn't work well. Imagine a new todo would be created every time you focus your browser window 🤨. So instead of running the mutation instantly, React Query gives you a function that you can invoke whenever you want to make the mutation:

imperative-mutate

```
1function AddComment({ id }) {2  // this doesn't really do anything yet3  const addComment = useMutation({4    mutationFn: (newComment) =>5      axios.post(`/posts/${id}/comments`, newComment),6  })7
8  return (9    <form10      onSubmit={(event) => {11        event.preventDefault()12        // ✅ mutation is invoked when the form is submitted13        addComment.mutate(14          new FormData(event.currentTarget).get('comment')15        )16      }}17    >18      <textarea name="comment" />19      <button type="submit">Comment</button>20    </form>21  )22}
```

Another difference is that mutations don't share state like `useQuery` does. You can invoke the same `useQuery` call multiple times in different components and will get the same, cached result returned to you - but this won't work for mutations.

## Tying mutations to queries[](#tying-mutations-to-queries)

Mutations are, per design, not directly coupled to queries. A mutation that likes a blog post has no ties towards the query that fetches that blog post. For that to work, you would need some sort of underlying schema, which React Query doesn't have.

To have a mutation reflect the changes it made on our queries, React Query primarily offers two ways:

### Invalidation[](#invalidation)

This is conceptually the simplest way to get your screen up-to-date. Remember, with server state, you're only ever displaying a snapshot of data from a given point in time. React Query tries to keep that up-to-date of course, but if you're deliberately changing server state with a mutation, this is a great point in time to tell React Query that some data you have cached is now "invalid". React Query will then go and refetch that data if it's currently in use, and your screen will update automatically for you once the fetch is completed. The only thing you have to tell the library is _which_ queries you want to invalidate:

invalidation-from-mutation

```
1const useAddComment = (id) => {2  const queryClient = useQueryClient()3
4  return useMutation({5    mutationFn: (newComment) =>6      axios.post(`/posts/${id}/comments`, newComment),7    onSuccess: () => {8      // ✅ refetch the comments list for our blog post9      queryClient.invalidateQueries({10        queryKey: ['posts', id, 'comments']11      })12    },13  })14}
```

Query invalidation is pretty smart. Like all [Query Filters](https://react-query.tanstack.com/guides/filters#query-filters), it uses fuzzy matching on the query key. So if you have multiple keys for your comments list, they will all be invalidated. However, only the ones that are currently active will be refetched. The rest will be marked as stale, which will cause them to be refetched the next time they are used.

As an example, let's assume we have the option to sort our comments, and at the time the new comment was added, we have two queries with comments in our cache:

```
1['posts', 5, 'comments', { sortBy: ['date', 'asc'] }2['posts', 5, 'comments', { sortBy: ['author', 'desc'] }
```

Since we're only displaying one of them on the screen, `invalidateQueries` will refetch that one and mark the other one as stale.

### Direct updates[](#direct-updates)

Sometimes, you don't want to refetch data, especially if the mutation already returns everything you need to know. If you have a mutation that updates the title of your blog post, and the backend returns the complete blog post as a response, you can update the query cache directly via `setQueryData`:

update-from-mutation-response

```
1const useUpdateTitle = (id) => {2  const queryClient = useQueryClient()3
4  return useMutation({5    mutationFn: (newTitle) =>6      axios7        .patch(`/posts/${id}`, { title: newTitle })8        .then((response) => response.data),9    // 💡 response of the mutation is passed to onSuccess10    onSuccess: (newPost) => {11      // ✅ update detail view directly12      queryClient.setQueryData(['posts', id], newPost)13    },14  })15}
```

Putting data into the cache directly via `setQueryData` will act as if this data was returned from the backend, which means that all components using that query will re-render accordingly.

I'm showing some more examples of direct updates and the combination of both approaches in [#8: Effective React Query Keys](https://tkdodo.eu/blog/effective-react-query-keys#structure).

* * *

I personally think that most of the time, invalidation should be preferred. Of course, it depends on the use-case, but for direct updates to work reliably, you need more code on the frontend, and to some extent duplicate logic from the backend. Sorted lists are for example pretty hard to update directly, as the position of my entry could've potentially changed because of the update. Invalidating the whole list is the "safer" approach.

## Optimistic updates[](#optimistic-updates)

Optimistic updates are one of the key selling points for using React Query mutations. The `useQuery` cache gives us data instantly when switching between queries, especially when combined with [prefetching](https://react-query.tanstack.com/guides/prefetching). Our whole UI feels very snappy because of it, so why not get the same advantage for mutations as well?

A lot of the time, we are quite certain that an update will go through. Why should the user wait for a couple of seconds until we get the okay from the backend to show the result in the UI? The idea of optimistic updates is to fake the success of a mutation even before we have sent it to the server. Once we get a successful response back, all we have to do is invalidate our view again to see the real data. In case the request fails, we're going to roll back our UI to the state from before the mutation.

This works great for small mutations where instant user feedback is actually required. There is nothing worse than having a toggle button that performs a request, and it doesn't react at all until the request has completed. Users will double or even triple click that button, and it will just feel "laggy" all over the place.

### Example[](#example)

I've decided to _not_ show an additional example. The [official docs](https://react-query.tanstack.com/guides/optimistic-updates) cover that topic very well, and they also have a codesandbox example [in TypeScript](https://tanstack.com/query/v4/docs/examples/react/optimistic-updates-typescript).

I further think that optimistic updates are a bit over-used. Not every mutation needs to be done optimistically. You should really be sure that it rarely fails, because the UX for a rollback is not great. Imagine a Form in a Dialog that closes when you submit it, or a redirect from a detail view to a list view after an update. If those are done prematurely, they are hard to undo.

Also, be sure that the instant feedback is really required (like in the toggle button example above). The code needed to make optimistic updates work is non-trivial, especially compared to "standard" mutations. You need to mimic what the backend is doing when you're faking the result, which can be as easy as flipping a Boolean or adding an item to an Array, but it might also get more complex really fast:

-   If the todo you're adding needs an id, where do you get it from?
-   If the list you're currently viewing is sorted, will you insert the new entry at the right position?
-   What if another user has added something else in the meantime - will our optimistically added entry switch positions after a refetch?

All these edge cases might make the UX actually worse in some situations, where it might be enough to disable the button and show a loading animation while the mutation is in-flight. As always, choose the right tool for the right job.

## Common Gotchas[](#common-gotchas)

Finally, let's dive into some things that are good to know when dealing with mutations that might not be that obvious initially:

### awaited Promises[](#awaited-promises)

Promises returned from the mutation callbacks are awaited by React Query, and as it so happens, `invalidateQueries` returns a Promise. If you want your mutation to stay in `loading` state while your related queries update, you have to return the result of `invalidateQueries` from the callback:

awaited-promises

```
1{2  // 🎉 will wait for query invalidation to finish3  onSuccess: () => {4    return queryClient.invalidateQueries({5      queryKey: ['posts', id, 'comments'],6    })7  }8}9{10  // 🚀 fire and forget - will not wait11  onSuccess: () => {12    queryClient.invalidateQueries({13      queryKey: ['posts', id, 'comments']14    })15  }16}
```

### Mutate or MutateAsync[](#mutate-or-mutateasync)

`useMutation` gives you two functions - `mutate` and `mutateAsync`. What's the difference, and when should you use which one?

`mutate` doesn't return anything, while `mutateAsync` returns a Promise containing the result of the mutation. So you might be tempted to use `mutateAsync` when you need access to the mutation response, but I would still argue that you should almost always use `mutate`.

You can still get access to the `data` or the `error` via the callbacks, and you don't have to worry about error handling: Since `mutateAsync` gives you control over the Promise, you also have to catch errors manually, or you might get an [unhandled promise rejection](https://stackoverflow.com/questions/40500490/what-is-an-unhandled-promise-rejection).

accessing-mutation-data

```
1const onSubmit = () => {2  // ✅ accessing the response via onSuccess3  myMutation.mutate(someData, {4    onSuccess: (data) => history.push(data.url),5  })6}7
8const onSubmit = async () => {9  // 🚨 works, but is missing error handling10  const data = await myMutation.mutateAsync(someData)11  history.push(data.url)12}13
14const onSubmit = async () => {15  // 😕 this is okay, but look at the verbosity16  try {17    const data = await myMutation.mutateAsync(someData)18    history.push(data.url)19  } catch (error) {20    // do nothing21  }22}
```

Handling errors is not necessary with `mutate`, because React Query catches (and discards) the error for you internally. It is literally implemented with: _mutateAsync().catch(noop)_😎

The only situations where I've found `mutateAsync` to be superior is when you really need the Promise for the sake of having a Promise. This can be necessary if you want to fire off multiple mutations concurrently and want to wait for them all to be finished, or if you have dependent mutations where you'd get into callback hell with the callbacks.

### Mutations only take one argument for variables[](#mutations-only-take-one-argument-for-variables)

Since the last argument to `mutate` is the options object, `useMutation` can currently only take _one_ argument for variables. This is certainly a limitation, but it can be easily worked around by using an object:

multiple-variables

```
1// 🚨 this is invalid syntax and will NOT work2const mutation = useMutation({3  mutationFn: (title, body) => updateTodo(title, body),4})5mutation.mutate('hello', 'world')6
7// ✅ use an object for multiple variables8const mutation = useMutation({9  mutationFn: ({ title, body }) => updateTodo(title, body),10})11mutation.mutate({ title: 'hello', body: 'world' })
```

To read more on why that is currently necessary, have a look at [this discussion](https://github.com/tannerlinsley/react-query/discussions/1226).

### Some callbacks might not fire[](#some-callbacks-might-not-fire)

You can have callbacks on `useMutation` as well as on `mutate` itself. It is important to know that the callbacks on `useMutation` fire before the callbacks on `mutate`. Further, the callbacks on `mutate` might not fire _at all_ if the component unmounts before the mutation has finished.

That's why I think it's a good practice to separate concerns in your callbacks:

-   Do things that are absolutely necessary and logic related (like query invalidation) in the `useMutation` callbacks.
-   Do UI related things like redirects or showing toast notifications in `mutate` callbacks. If the user navigated away from the current screen before the mutation finished, those will purposefully not fire.

This separation is especially neat if `useMutation` comes from a custom hook, as this will keep query related logic in the custom hook while UI related actions are still in the UI. This also makes the custom hook more reusable, because how you interact with the UI might vary on a case by case basis - but the invalidation logic will likely always be the same:

separate-concerns

```
1const useUpdateTodo = () =>2  useMutation({3    mutationFn: updateTodo,4    // ✅ always invalidate the todo list5    onSuccess: () => {6      queryClient.invalidateQueries({7        queryKey: ['todos', 'list']8      })9    },10  })11
12// in the component13
14const updateTodo = useUpdateTodo()15updateTodo.mutate(16  { title: 'newTitle' },17  // ✅ only redirect if we're still on the detail page18  // when the mutation finishes19  { onSuccess: () => history.push('/todos') }20)
```

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Query.gg - The official React Query course](https://tkdodo.eu/blog/static/f059bff16ad8b150d6670f202e67e3b8/209e8/query-gg.jpg)

](https://query.gg/?s=dom)