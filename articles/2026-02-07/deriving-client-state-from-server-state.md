---
title: "Deriving Client State from Server State"
source: "https://tkdodo.eu/blog/deriving-client-state-from-server-state"
publishedDate: "2025-09-01"
category: "frontend"
feedName: "TkDodo"
---

![red and blue lights from tower steel wool photography](https://tkdodo.eu/blog/static/8604416fae272dfb18f681b4ca225030/bbe0c/deriving.jpg "red and blue lights from tower steel wool photography")

-   [한국어](https://js-coding-place.tistory.com/entry/%EC%9B%90%EB%AC%B8-%EB%B2%88%EC%97%AD-%EC%84%9C%EB%B2%84-%EC%83%81%ED%83%9C%EC%97%90%EC%84%9C-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EB%81%8C%EC%96%B4%EC%98%A4%EA%B8%B0-tkdodo)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Just as I came back from vacation, I saw [this reddit question](https://www.reddit.com/r/reactjs/comments/1n4fz2m/is_this_the_biggest_tradeoff_for_zustand_am_i/) about the biggest trade-off when it comes to using `zustand`. The code looked something like this (I altered it slightly for updated syntax and packed it into a custom hook):

manual-sync

```
1const useSelectedUser = () => {2  const { data: users } = useQuery({3    queryKey: ['users'],4    queryFn: fetchUsers,5  })6  const { selectedUserId, setSelectedUserId } = useUserStore()7
8  // If the selected user gets deleted from the server,9  // Zustand won't automatically clear selectedUserId10  // You have to manually handle this:11  useEffect(() => {12    if (!users?.some((u) => u.id === selectedUserId)) {13      setSelectedUserId(null) // Manual sync required14    }15  }, [users, selectedUserId])16
17  return [selectedUserId, selectedUserId]18}
```

Of course, whenever I see a `useEffect`, especially one that calls `setSate` inside it, I want to find a better solution. In my experience, there is almost always one, and it's usually worth pursuing it. So let's take a step back and try to find out what we want to achieve first.

## Keeping State in Sync[](#keeping-state-in-sync)

In a nutshell, we want to keep our Client State - the `selectedUserId`, in sync with our Server State - the list of `users`. This makes sense: If a background refetch comes in from `useQuery`, and the user was deleted from our list while we still have it stored in state, that selection becomes invalid.

Since Queries [don't have an onSuccess callback](https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose), and the [trick to call setState during render](https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes) only works with React's built-in state, it seems that the only other available option is the dreaded `useEffect`

After all - how else should we update the user selection?

## Don't Sync State - Derive It[](#dont-sync-state---derive-it)

Remember [this article](https://kentcdodds.com/blog/dont-sync-state-derive-it) by [Kent C. Dodds](https://twitter.com/kentcdodds) where he takes a complex set of four different `useStates` and reduces them to just one by deriving the rest from the single source of truth ?

It turns out we can do something similar in our situation. The `useEffect` solution is a pretty imperative way of thinking:

> IF the `users` change AND our selection is invalid, THEN re-set the selection to `null`.

But can't we change that thinking to be a bit more declarative:

> Here is the `users` from the backend and the current selection, please give me the real state.

derived-selection

```
1const useSelectedUser = () => {2  const { data: users } = useQuery({3    queryKey: ['users'],4    queryFn: fetchUsers,5  })6  const { selectedUserId, setSelectedUserId } = useUserStore()7
8  const selectedId = users?.some((u) => u.id === selectedUserId)9    ? selectedUserId10    : null11
12  return [selectedId, setSelectedUserId]13}
```

This code is dead simple. Instead of updating the store value, we keep the selection as it is, but just return something different from our custom hook if the id cannot be found in the Server State anymore. In places where we call `useSelectedUser()`, we'll get back `null` just like before.

And since we don't touch the store, we also get some additional benefits with this:

-   If the user gets re-added to the list of users, our selection will automatically be restored too.
    
-   Maybe our UX changes and we don't want to remove the selection, but we just want to visually indicate that the selection is invalid instead. That's easily doable now because we always retain the original value:
    

isSelectionValid

```
1const useSelectedUser = () => {2  const { data: users } = useQuery({3    queryKey: ['users'],4    queryFn: fetchUsers,5  })6  const { selectedUserId, setSelectedUserId } = useUserStore()7  const isSelectionValid = users?.some((u) => u.id === selectedUserId)8
9  return [selectedUserId, setSelectedUserId, isSelectionValid]10}
```

## Where's the catch?[](#wheres-the-catch)

One obvious drawback to the deriving state solution is that you can't "trust" what is stored inside the user store anymore. If you read the `selectedUserId` from `useUserStore` somewhere else, you don't get the additional check, so you always have to read it from your custom hook.

I genuinely don't mind this, since I see the store more as a record of what was actually selected in the UI, rather than a source of the final, validated values.

And since the reddit question also mentions that redux toolkit "solves this" - I don't think it would work any different there. You would likely write a `selector` that reads from the API slice _and_ the slice that contains the user selection and combine the two, which is exactly what our custom hook does, too. If anything, it nudges you towards deriving state a bit more, which is great. 🎉

## A different Example[](#a-different-example)

The concept of not updating Client State when Server State changes can be useful in many cases. A common example is when prefilling forms with default values from the server:

default-value-effect

```
1function UserSelection() {2  const { data: users } = useQuery({3    queryKey: ['users'],4    queryFn: fetchUsers,5  })6  const [selection, setSelection] = useState()7
8  // use the first value as default selection9  useEffect(() => {10    if (users?.[0]) {11      setSelection(users[0])12    }13  }, [users])14
15  // return markup16}
```

This effect is not only verbose, it also has a bug 🐛 where it overwrites the current selection when new data comes in from the Query. This is easily fixable by adding another check, but the better solution would still be deriving state:

derived-default-value

```
1function UserSelection() {2  const { data: users } = useQuery({3    queryKey: ['users'],4    queryFn: fetchUsers,5  })6  const [selection, setSelection] = useState()7
8  const derivedSelection = selection ?? users?.[0]9
10  // return markup11}
```

All we need to do now is continue to work with `derivedSelection` instead of `selection` and we'll always get the value we want. 🚀

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)