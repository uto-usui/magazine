---
title: "Zustand and React Context"
source: "https://tkdodo.eu/blog/zustand-and-react-context"
publishedDate: "2024-04-14"
category: "frontend"
feedName: "TkDodo"
---

14.04.2024 — [ReactJs](https://tkdodo.eu/blog/tags/react-js), [React Context](https://tkdodo.eu/blog/tags/react-context), [State Management](https://tkdodo.eu/blog/tags/state-management), [Zustand](https://tkdodo.eu/blog/tags/zustand) — 4 min read

![The zustand bear logo sitting under an arch](https://tkdodo.eu/blog/static/f18038b8566526e3d3dfcf7c3b807b2a/bbe0c/zustand-context.jpg "The zustand bear logo sitting under an arch")

-   [#1: Working with Zustand](https://tkdodo.eu/blog/working-with-zustand)
-   **#2: Zustand and React Context**

-   [한국어](https://velog.io/@ojj1123/zustand-and-react-context)
-   [简体中文](https://blog.jimmieluo.com/zustand-and-react-context)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Zustand is a great lib for global client-state management. It's simple, fast, and has a small bundle size. There is however one thing I don't necessarily like about it:

The stores are global.

Okay? But isn't that the point of global state management? To make that state available in your app, everywhere?

Sometimes, I think that's true. However, as I've looked at how I've been using zustand over the last couple of years, I've realized that more often than not, I've needed some state to be available globally to one component subtree rather than the whole application. With zustand, it's totally fine - encouraged even - to [create multiple, small stores](https://tkdodo.eu/blog/working-with-zustand#keep-the-scope-of-your-store-small) on a per-feature basis. So why would I need my Dashboard Filters store to be available globally if I only need it on the Dashboard route? Sure, I can do that when it doesn't hurt, but I've found that having global stores do have a couple of drawbacks:

### Initializing from Props[](#initializing-from-props)

Global stores are created outside of the React Component lifecycle, so we can't initialize the store with a value we get as a prop. With a global store, we need to create it first with a known default state, then sync props-to-store with `useEffect`:

sync-with-useEffect

```
1const useBearStore = create((set) => ({2  // ⬇️ initialize with default value3  bears: 0,4  actions: {5    increasePopulation: (by) =>6      set((state) => ({ bears: state.bears + by })),7    removeAllBears: () => set({ bears: 0 }),8  },9}))10
11const App = ({ initialBears }) => {12  //😕 write initialBears to our store13  React.useEffect(() => {14    useBearStore.set((prev) => ({ ...prev, bears: initialBears }))15  }, [initialBears])16
17  return (18    <main>19      <RestOfTheApp />20    </main>21  )22}
```

Apart from not wanting to write `useEffect`, this isn't ideal for two reasons:

1.  We first render `<RestOfTheApp />` with `bears: 0` before the effect kicks in, then render it once more with the correct `initialBears`.
2.  We don't really initialize our store with `initialBears` - we sync it. So if the `initialBears` change, we will see the update reflected in our store as well.

### Testing[](#testing)

I find [the testing docs](https://docs.pmnd.rs/zustand/guides/testing) for zustand pretty confusing and complex. It's all about mocking zustand and resetting the store between tests and so on. I think it all stems from the fact that the store is global. If it were scoped to a component subtree, we could render those components and the store would be isolated to it, not needing any of those "workarounds".

### Reusability[](#reusability)

Not all stores are singletons that we can use once in our App or once in a specific route. Sometimes, we want zustand stores for reusable components as well. One example from the past I can think of is a complex, multi-selection group component from our design-system. It was using local state passed down with React Context to manage the internal state of the selections. It became sluggish whenever an item was selected as soon as there were fifty or more items. It's what made me write this tweet:

[

![Avatar for TkDodo](https://tkdodo.eu/blog/static/f5315ea49d7e41077957b8c547d2dedb/37851/1021430.jpg)

Dominik 🔮

@

TkDodo

🕵️We've fixed a huge performance problem this week by moving useState + context over to zustand. It was the same amount of code. The lib is < 1kb.

⚛️Don't use context for state management. Use it for dependency injection only. The right tool for the job!

zustand.surge.sh

\-

Feb 19, 2022



](https://x.com/TkDodo/status/1495072479118864398)

If such a zustand store would be global, we couldn't instantiate the component multiple times without also sharing and overwriting each other's state.

* * *

Interestingly, there is a single way to fix all of these problems:

## React Context[](#react-context)

It's funny and ironic that React Context is the solution here, because using Context as a state management tool is what caused the aforementioned issue in the first place. But that's not what I'm proposing. The idea is to merely share the store instance via React Context - not the store values themselves.

Conceptually, this is what React Query is doing with the `<QueryClientProvider>`, and what `redux` is doing as well with their single store as well. Because the store instances are static singletons that don't change often, we can put them into React Context easily without causing re-rendering issues. Then, we can still create subscribers to the store that will be optimized by zustand. Here's how that can look like:

zustand-and-react-context

```
1import { createStore, useStore } from 'zustand'2
3const BearStoreContext = React.createContext(null)4
5const BearStoreProvider = ({ children, initialBears }) => {6  const [store] = React.useState(() =>7    createStore((set) => ({8      bears: initialBears,9      actions: {10        increasePopulation: (by) =>11          set((state) => ({ bears: state.bears + by })),12        removeAllBears: () => set({ bears: 0 }),13      },14    }))15  )16
17  return (18    <BearStoreContext.Provider value={store}>19      {children}20    </BearStoreContext.Provider>21  )22}
```

The main difference here is that we aren't using `create` like before, which would give us a ready-to-use hook. Instead, we are relying on the vanilla zustand function `createStore`, which will, well, just creates a store for us. And we can do that wherever we want to - even inside a component. However, we have to make sure that the creation of the store only happens once. We can do this with refs, but I prefer `useState` for that. I have [a separate blogpost](https://tkdodo.eu/blog/use-state-for-one-time-initializations) on that topic if you want to know why.

Because we create the store inside our component, we can close over props like `initialBears` and pass them to `createStore` as a true initial value. The `useState` initializer function only runs once, so updates to the prop will not be passed to the store. Then, we take the store instance and pass it to a plain React Context. There is nothing zustand specific here anymore.

* * *

After that, we need to consume that context whenever we want to select some values from our store. For that, we need to pass the `store` and the `selector` to the `useStore` hook we can get from zustand. This is best abstracted in a custom hook:

useBearStore

```
1const useBearStore = (selector) => {2  const store = React.useContext(BearStoreContext)3  if (!store) {4    throw new Error('Missing BearStoreProvider')5  }6  return useStore(store, selector)7}
```

Then, we can use the `useBearStore` hook like we are used to, and export custom hooks with atomic selectors:

useBears

```
1export const useBears = () => useBearStore((state) => state.bears)
```

* * *

This is a little bit more code to write than just creating a global store, but it solves all three problems:

1.  As the example shows, we can now initialize our store with props, because we create it inside the React Component tree.
2.  Testing becomes a piece of cake because we can either render a component that contains a `BearStoreProvider`, or we can render one ourselves just for the test. In both situations, the created store will be fully isolated to the test, so no resetting between tests is necessary.
3.  A component can now render a `BearStoreProvider` to provide its children with an encapsulated zustand store. We can render this component as often as we want on one page - each instance will have its own store, so we've achieved reusability.

So even though the [zustand docs](https://docs.pmnd.rs/zustand/getting-started/introduction#then-bind-your-components,-and-that's-it!) pride themselves about not needing a Context Provider to access a store, I think knowing how to combine store creation with React Context can come in quite handy in situations where encapsulation and reusability are required. I for one have used this abstraction more than truly global zustand stores. 😄

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)