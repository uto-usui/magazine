---
title: "Simplifying useEffect"
source: "https://tkdodo.eu/blog/simplifying-use-effect"
publishedDate: "2021-01-23"
category: "frontend"
feedName: "TkDodo"
---

![effect](https://tkdodo.eu/blog/static/960520b8aca100dc6d09523b58ca14b7/bbe0c/effect.jpg "effect")

-   [한국어](https://onlydev.tistory.com/156)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

[useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect). The hook everybody needs, but nobody wants. According to the official react docs, it's "_an escape hatch from React’s purely functional world into the imperative world_". The [complete guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/) by Redux author and React core team member [Dan Abramov](https://bsky.app/profile/danabra.mov) is a 49 minute read - and it takes at least twice the time to _really_ comprehend it.

useEffect is about as complex as it can get in ReactJs, and it is very unlikely that you can write an application without it. So let's try and apply some good principles to make working with useEffect more manageable:

## 1\. Write fewer effects[](#1-write-fewer-effects)

I've already written about a couple of ways to reduce the amount of effects in the [useState pitfalls series](https://tkdodo.eu/blog/tags/use-state-pitfalls):

-   In [part 1](https://tkdodo.eu/blog/dont-over-use-state), we've established that some effects can be replaced with _useMemo_ or even just normal function executions.
-   In [part 2](https://tkdodo.eu/blog/putting-props-to-use-state), I've outlined why trying to sync different react states with _useEffect_ is likely an anti-pattern and what you can do instead.

### Data fetching[](#data-fetching)

Data fetching is a very common side effect that is typically managed with _useEffect_. After all, most apps need to fetch data from somewhere. The scenario is so common that there are some very good libraries out there that will not only help you to make the complex logic more declarative, they will also give you a bunch of great additional features.

I'm obviously going to recommend my favourite open source library, [react-query](https://react-query.tanstack.com/) (I doubt that I will be able to write another article without mentioning it 😅), but [SWR](https://swr.vercel.app/), [Apollo](https://apollographql.com/client) and also [RTK-Query](https://rtk-query-docs.netlify.app/) are great as well. The point is: don't try and re-invent the wheel. Some problems have been solved before and are worth abstracting away. The amount of useEffects that I've had to write has been drastically reduced since I'm using react-query.

## 2\. Follow the single responsibility principle[](#2-follow-the-single-responsibility-principle)

A function or a class should do one thing, and one thing only. Your `processPayment` function is hopefully only going to process the payment and not additionally redirecting the user somewhere, because that is not it's responsibility. The same principle applies to the function that you pass to _useEffect_. There is no need to tuck everything in one _useEffect_:

one-effect-two-responsibilities

```
1React.useEffect(() => {2  document.title = 'hello world'3  trackPageVisit()4}, [])
```

Here, we want to perform some operations, like setting the document title and tracking a page visit with some analytics tool, when the component "mounts". While it may seem minor at first glance, we are doing two very different things in this one effect, and it could easily be split into two effects. The advantage becomes more apparent as dependencies of the effect change over time.

Suppose we now want to add a feature that syncs some local state with the document title:

sync-title

```
1const [title, setTitle] = React.useState('hello world')2
3React.useEffect(() => {4  document.title = title5  trackPageVisit()6}, [title])
```

Can you spot the bug? Every time the title changes, we are also tracking a page visit, which is probably not what we intended. Spitting it into two effects solves the problem, and I believe we should have done so right from the beginning:

single-responsibility

```
1const [title, setTitle] = React.useState('hello world')2
3React.useEffect(() => {4  document.title = title5}, [title])6
7React.useEffect(() => {8  trackPageVisit()9}, [])
```

Not only is the code now less buggy, it is also easier to reason about. Each effect is now half the size, so you can look at each one in isolation to better grasp what it is doing.

## 3\. Write custom hooks[](#3-write-custom-hooks)

I really don't like components where 50% of the code is hook calls. It usually shows that we are mixing our logic with our markup. Tucking them away in a custom hook has multiple advantages, apart from the obvious "you can reuse them":

### You can name them[](#you-can-name-them)

Giving variables and functions [a good name](https://tkdodo.eu/blog/on-naming-things) is like writing documentation, and the same applies to hooks. If you are using TypeScript, you will also benefit from a clearly defined interface:

named-hooks

```
1const useTitleSync = (title: string) => {2  React.useEffect(() => {3    document.title = title4  }, [title])5}6
7const useTrackVisit = () => {8  React.useEffect(() => {9    trackPageVisit()10  }, [])11}
```

All our effects are now nicely hidden inside custom hooks with descriptive names. Our component will only have two lines of hook calls instead of six, which means it is more focussed on its main responsibility: producing markup.

### You can encapsulate logic[](#you-can-encapsulate-logic)

This is probably the biggest advantage of custom hooks for me: We can tie things together that belong together, and we don't have to expose everything. The _useTitleSync_ hook is not ideal: it only covers the effect, and each component still needs to manage that title manually. So why don't we put _everything_ title related in the custom hook to encapsulate all the logic with it:

useTitle

```
1const useTitle = (initialTitle: string) => {2  const [title, setTitle] = React.useState(initialTitle)3
4  React.useEffect(() => {5    document.title = title6  }, [title])7
8  return [title, setTitle] as const9}
```

We can even take this one step further: If we only intend to show the title in the document title and nowhere else, we can keep the title value in the hook and expose only the setter, producing a minimal interface:

encapsulated-value

```
1const useTitle = (initialTitle: string) => {2  const [title, setTitle] = React.useState(initialTitle)3
4  React.useEffect(() => {5    document.title = title6  }, [title])7
8  return setTitle9}
```

### You can test them in isolation[](#you-can-test-them-in-isolation)

Testing the _useTitle_ hook without having to test the component that uses it has the advantage that you don't have to think about all the other things that are going on in that component, like page tracking. Testing custom hooks is very similar to testing any other util function:

testing-custom-hooks

```
1import { act, renderHook } from '@testing-library/react-hooks'2
3describe('useTitle', () => {4  test('sets the document title', () => {5    const { result } = renderHook(() => useTitle('hello'))6    expect(document.title).toEqual('hello')7
8    act(() => result.current('world'))9    expect(document.title).toEqual('world')10  })11})
```

## 4\. Give them names[](#4-give-them-names)

All the above reasons make me want to write custom hooks even if I only use them once. But if you cannot or don't want to extract it to a custom hook for whatever reason, the function passed to _useEffect_ can still have a name, so consider naming your effects:

named-effect

```
1const [title, setTitle] = React.useState('hello world')2
3React.useEffect(fuction syncTitle() {4  document.title = title5}, [title])
```

## 5\. Don't lie about dependencies[](#5-dont-lie-about-dependencies)

Not even, or actually especially not, for functions. I will just defer to Dan here, because I cannot describe it better than he already does in his [complete guide](https://overreacted.io/a-complete-guide-to-useeffect/#dont-lie-to-react-about-dependencies).

One additional thing that I think is worth mentioning is: not every effect needs dependencies. I've seen effects with 8+ dependencies, some of them being objects that are not memoized, so they will trigger the effect in every render anyways. So why bother, the second argument of _useEffect_ is optional after all. This comes in handy if your effect uses early returns or executes the side effect conditionally:

effect-without-dependencies

```
1const useInitializePayload = () => {2  const payload = usePayload()3  React.useEffect(() => {4    if (payload === null) {5      performSomeSideEffectThatInitializesPayload(value1, value2, ...valueN)6    }7  })8}
```

The dependency array for this effect would probably be quite large, or we could try to cheat with just `[payload]` as dependency. I find both ways to be inferior to just always running the effect and aborting if necessary.

* * *

I hope these tips will reduce complexity for you when working with _useEffect_. Let me know in the comments below how you prefer to organize your effects. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)