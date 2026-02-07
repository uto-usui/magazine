---
title: "Working with Zustand"
source: "https://tkdodo.eu/blog/working-with-zustand"
publishedDate: "2022-11-20"
category: "frontend"
feedName: "TkDodo"
---

![The Zustand bear logo](https://tkdodo.eu/blog/static/e1e8fed6b1d37c9e638bbff95ec72b5a/18e3b/bear.jpg "The Zustand bear logo")

-   **#1: Working with Zustand**
-   [#2: Zustand and React Context](https://tkdodo.eu/blog/zustand-and-react-context)

-   [한국어](https://hyunjinee.notion.site/Working-with-Zustand-73c2d6bbb53d4c6e9944ddc5e23706a1)
-   [简体中文](https://manon.icu/blog/translate/react/working-with-zustand)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Global (client) state management wasn't always like it is today. I distinctly remember a time when our best option was Redux with higher order components using [connect](https://react-redux.js.org/api/connect) plus `mapStateToProps` and `mapDispatchToProps`.

Even the context api, initially, wasn't as ergonomic to use (pun intended), as it only supported render props [when it came out](https://reactjs.org/blog/2018/03/29/react-v-16-3.html#official-context-api).

Of course, everything changed when [hooks](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) were released. Not only did existing solutions become much easier to use, but new ones were born.

## Zustand[](#zustand)

One of them that I quickly grew to like was [Zustand](https://zustand.surge.sh/). It's a tiny library (v4.1.4 is 1.1kB Minified + Gzipped) that provides a simple API to create global state stores and subscribe to them via selectors. This pattern is conceptually similar to what Redux is doing, which is already known by many developers.

Much like React itself, Zustand is not opinionated. You _can_ combine it [with immer](https://github.com/pmndrs/zustand/tree/2b29d736841dc7b3fd7dec8cbfea50fee7295974#sick-of-reducers-and-changing-nested-state-use-immer) if you want to. You can [dispatch actions](https://github.com/pmndrs/zustand/tree/2b29d736841dc7b3fd7dec8cbfea50fee7295974#cant-live-without-redux-like-reducers-and-action-types), but you don't have to. It has powerful [middlewares](https://github.com/pmndrs/zustand/tree/2b29d736841dc7b3fd7dec8cbfea50fee7295974#middleware), but they are totally optional.

I do like that about the library. It provides the _bear_ minimum to get you started (hence the logo), and it's flexible enough to scale to your needs. However, it does leave you with a bunch of decisions to make yourself - analogous to how React doesn't prescribe a way to do styling.

It's also not _"magical"_. It doesn't track which fields you are using, as some similar libraries do; you have to subscribe "manually" with selectors. And in my experience, that's a good thing because it enforces being very explicit about your dependencies, which pays off as an app grows, even though it might be a little bit more to write.

I've been working with Zustand since 2018, in projects small and large. I've also [contributed](https://github.com/pmndrs/zustand/pulls?q=is%3Apr+author%3ATkDodo+is%3Aclosed) a bit to the library. Here are a couple of tips I've picked up along the way:

## Only export custom hooks[](#only-export-custom-hooks)

This is my number one tip for working with... everything in React, really. I've listed many [advantages of custom hooks](https://tkdodo.eu/blog/simplifying-use-effect#3-write-custom-hooks) before, and I believe they apply to working with Zustand as well.

custom-hooks

```
1// ⬇️ not exported, so that no one can subscribe to the entire store2const useBearStore = create((set) => ({3  bears: 0,4  fish: 0,5  increasePopulation: (by) =>6    set((state) => ({ bears: state.bears + by })),7  eatFish: () => set((state) => ({ fish: state.fish - 1 })),8  removeAllBears: () => set({ bears: 0 }),9}))10
11// 💡 exported - consumers don't need to write selectors12export const useBears = () => useBearStore((state) => state.bears)
```

They'll give you a cleaner interface, and you don't need to write the selector repeatedly everywhere you want to subscribe to just one value in the store. Also, it avoids accidentally subscribing to the entire store:

subscribe-to-the-entire-store

```
1// ❌ we could do this if useBearStore was exported2const { bears } = useBearStore()
```

While the result might be the same, you'll get the number of bears, the code above will subscribe you to the entire store, which means that your component will be informed about any state update, and therefore re-rendered, even if bears did _not_ change, e.g. because someone ate a fish.

While selectors _are_ optional in Zustand, I think they should always be used. Even if we have a store with just a single state value, I'd write a custom hook solely to be able to add more state in the future.

## Prefer atomic selectors[](#prefer-atomic-selectors)

This is already explained [in the docs](https://github.com/pmndrs/zustand/tree/2b29d736841dc7b3fd7dec8cbfea50fee7295974#selecting-multiple-state-slices), so I'll keep it brief, but it's still quite important because it can lead to degraded rendering performance if you "get it wrong".

Zustand decides when to inform your component that the state it is interested in has changed, by comparing the result of the selector with the result of the previous render. Per default, it does so with a [strict equality check](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality).

Effectively, this means that selectors have to return _stable_ results. If you return a new Array or Object, it will _always_ be considered a change, even if the content is the same:

ineffective-selectors

```
1// 🚨 selector returns a new Object in every invocation2const { bears, fish } = useBearStore((state) => ({3  bears: state.bears,4  fish: state.fish,5}))6
7// 😮 so these two are equivalent8const { bears, fish } = useBearStore()
```

If you want to return an Object or Array from a selector, you can adjust the comparison function to use shallow comparison:

shallow-comparison

```
1import shallow from 'zustand/shallow'2
3// ⬇️ much better, because optimized4const { bears, fish } = useBearStore(5  (state) => ({ bears: state.bears, fish: state.fish }),6  shallow7)
```

However, I much prefer the simplicity of just exporting two separate selectors:

atomic-selectors

```
1export const useBears = () => useBearStore((state) => state.bears)2export const useFish = () => useBearStore((state) => state.fish)
```

If a component really needs both values, it can consume both hooks.

## Separate Actions from State[](#separate-actions-from-state)

Actions are functions which update values in your store. These are static and never change, so they aren't technically "state". Organising them into a separate object in our store will allow us to expose them as a single hook to be used in any our components without any impact on performance:

separate-actions

```
1const useBearStore = create((set) => ({2  bears: 0,3  fish: 0,4  // ⬇️ separate "namespace" for actions5  actions: {6    increasePopulation: (by) =>7      set((state) => ({ bears: state.bears + by })),8    eatFish: () => set((state) => ({ fish: state.fish - 1 })),9    removeAllBears: () => set({ bears: 0 }),10  },11}))12
13export const useBears = () => useBearStore((state) => state.bears)14export const useFish = () => useBearStore((state) => state.fish)15
16// 🎉 one selector for all our actions17export const useBearActions = () =>18  useBearStore((state) => state.actions)
```

Note that it's totally fine to now destruct actions and only "use" one of them:

useBearActions

```
1const { increasePopulation } = useBearActions()
```

This might sound contradictory to the "atomic selectors" tip above, but it _really_ isn't. As actions never change, it doesn't matter that we subscribe to "all of them". The actions object can be seen as a single atomic piece.

## Model Actions as Events, not Setters[](#model-actions-as-events-not-setters)

This is a general tip, no matter if you're working with [useReducer](https://tkdodo.eu/blog/use-state-vs-use-reducer#event-driven-reducers), Redux or Zustand. In fact, this tip is straight from the magnificent [Redux style guide](https://redux.js.org/style-guide/style-guide#model-actions-as-events-not-setters). It will help you keep your business logic inside your store, and not in your components.

The examples above have already been using this pattern - the logic (e.g. "increase population") lives in the store. The component just calls the action, and the store decides what to do with it.

## Keep the scope of your store small[](#keep-the-scope-of-your-store-small)

Unlike Redux, where you're supposed to have a single store for your whole app, Zustand encourages you to have multiple, small stores. Each store can be responsible for a single piece of state. If you need to combine them, you can do that with - of course - custom hooks:

combine-stores

```
1const currentUser = useCredentialsStore((state) => state.currentUser)2const user = useUsersStore((state) => state.users[currentUser])
```

**Note:** Zustand does have another way to [combine stores into slices](https://github.com/pmndrs/zustand/blob/2b29d736841dc7b3fd7dec8cbfea50fee7295974/docs/guides/slices-pattern.md#slicing-the-store-into-smaller-stores), but I've never needed that. It doesn't look super straightforward to me, especially when TypeScript is involved. If I specifically needed that, I would rather opt for [Redux Toolkit](https://redux-toolkit.js.org/).

### Combinations with other libraries[](#combinations-with-other-libraries)

I honestly haven't needed to combine multiple Zustand stores very often, because most of the state in apps is either server or url state. I'm far more likely to combine a Zustand store with `useQuery` or `useParams`, for example, than I am to combine two separate stores.

Once again, the same principle applies: if you need to combine another hook with a Zustand store, custom hooks are your best friend:

combine-with-useQuery

```
1const useFilterStore = create((set) => ({2  applied: [],3  actions: {4    addFilter: (filter) =>5      set((state) => ({ applied: [...state.applied, filter] })),6  },7}))8
9export const useAppliedFilters = () =>10  useFilterStore((state) => state.applied)11
12export const useFiltersActions = () =>13  useFilterStore((state) => state.actions)14
15// 🚀 combine the zustand store with a query16export const useFilteredTodos = () => {17  const filters = useAppliedFilters()18  return useQuery({19    queryKey: ['todos', filters],20    queryFn: () => getTodos(filters),21  })22}
```

Here, the applied filters _drive_ the query, because they are part of the query key. Every time you call `addFilter`, which you can do from anywhere in your UI, you will automatically trigger a new query, which could also be used from anywhere in your UI. I find this to be pretty declarative and minimal, without being too magical.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)