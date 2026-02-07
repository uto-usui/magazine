---
title: "Ref Callbacks, React 19 and the Compiler"
source: "https://tkdodo.eu/blog/ref-callbacks-react-19-and-the-compiler"
publishedDate: "2024-12-08"
category: "frontend"
feedName: "TkDodo"
---

08.12.2024 — [ReactJs](https://tkdodo.eu/blog/tags/react-js), [JavaScript](https://tkdodo.eu/blog/tags/java-script), [TypeScript](https://tkdodo.eu/blog/tags/type-script) — 4 min read

![minimalist photography of three crank phones](https://tkdodo.eu/blog/static/29f8f2260af04d6c7e9c2fba7790c2fc/bbe0c/ref-callbacks.jpg "minimalist photography of three crank phones")

-   [#1: Avoiding useEffect with callback refs](https://tkdodo.eu/blog/avoiding-use-effect-with-callback-refs)
-   **#2: Ref Callbacks, React 19 and the Compiler**

-   [한국어](https://www.gwansik.dev/posts/ref-callbacks-react-19-and-the-compiler)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

It's been more than two years since I published my first article about [callback refs](https://tkdodo.eu/blog/avoiding-use-effect-with-callback-refs). I didn't think I'd write about that topic again, but time moves on, things change, and I learned a thing or two as well in the meantime.

Turns out, some of the things I wrote were not 100% correct, and React also changes with v19, so I thought it's a good idea to re-visit this topic.

There are two things I dislike about that first blogpost:

1.  It's using a `focus` example. "Just use the autoFocus attribute" is something I heard a lot. Yes, it was just an example to show something you can do with a node. From now on, I'll replace that with `node.scrollIntoView({ behavior: "smooth" })`. This is not an important change, but needs to be said regardless.
    
2.  It's focusing too much on `useCallback` as a solution, which wasn't really the point, and is also technically not correct. This _is_ an important change, so let's focus on that for a second:
    

## `useCallback`[](#usecallback)

I wrote [a full blogpost](https://tkdodo.eu/blog/use-state-for-one-time-initializations) on why `useMemo` is no semantic guarantee that the computation will only run when the dependency array changes, and since `useCallback` is just a variation of `useMemo`, the same rules apply. The [react docs](https://react.dev/reference/react/useCallback#caveats) clearly say that while the cached result will not be arbitrarily thrown away between renders, you should still treat `useCallback` as a performance optimization only, which means your code should still work if you remove it. It might not work as efficiently as before, but it also shouldn't crash.

One of my example clearly violates that:

ref-callback-with-use-callback

```
1function CustomInput() {2  const ref = React.useCallback((node) => {3    node?.scrollIntoView({ behavior: 'smooth' })4  }, [])5
6  return <input ref={ref} defaultValue="Hello world" />7}
```

If our intention here is to scroll to the node when we "mount" the `input`, we rely on `useCallback` to do that for us. Once we remove it, we will scroll to our node on every re-render. That's likely not what we want.

The better solution here is to move the function out of the `CustomInput` component:

ref-with-stable-function

```
1function scrollIntoView(node) {2  node?.scrollIntoView({ behavior: 'smooth' })3}4
5function CustomInput() {6  return <input ref={scrollIntoView} defaultValue="Hello world" />7}
```

This will never re-create the function during a re-render of `CustomInput`, so it captures our intent perfectly. This is great for when we want to do something with just the node, and we want to perform that operation only once.

* * *

But what if we can't move it out of the component, because we depend on something inside it - like in the other example - where we are measuring a DOM node and storing that value in react state?

measure-a-dom-node

```
1function MeasureExample() {2  const [height, setHeight] = React.useState(0)3
4  const measuredRef = React.useCallback(node => {5    if (node !== null) {6      setHeight(node.getBoundingClientRect().height)7    }8  }, [])9
10  return (11    <>12      <h1 ref={measuredRef}>Hello, world</h1>13      <h2>The above header is {Math.round(height)}px tall</h2>14    </>15  )16}
```

I think this example is still perfectly fine, because we can remove `useCallback` and our code will still work just the same. If you're wondering why that is, here's what's happening:

-   On the first render, React will execute the `measuredRef` function after it rendered the `h1`.
-   Then, it will call `setHeight` with a new value (e.g. 56), triggering another re-render.
-   That render will then again call `measuredRef` (because it will be invoked on every render if we pass an inline function).
-   This time however, `setHeight` will get the same value (56) passed, so it will bail out of re-rendering, stopping the chain.

So the neat little `useState` optimization to skip re-renders when it sees an identical value works to our advantage here, but it also means this falls apart if we try to store newly created objects in state every time:

store-rect-in-state

```
1function MeasureExample() {2  const [rect, setRect] = React.useState({ height: 0 })3
4  const measuredRef = (node) => {5    if (node !== null) {6      // 🚨 infinite re-renders here ⬇️7      setRect(node.getBoundingClientRect())8    }9  })10
11  return (12    <>13      <h1 ref={measuredRef}>Hello, world</h1>14      <h2>The above header is {Math.round(rect.height)}px tall</h2>15    </>16  )17}
```

This isn't great, so I would stick to storing primitive values, or `useLayoutEffect` if I really have to.

### React Compiler[](#react-compiler)

Another reason to not use `useCallback` for those cases is the upcoming React Compiler. I know it's still in beta, but I like to think that there is a future where adopting the React Compiler is a given for any codebase out there. The problem with `useCallback` calls that we need for our code to work is that we then don't know which ones we can safely remove. [Sathya](https://bsky.app/profile/gsathya.bsky.social) (who works on the compiler) said it very well:

[

![Avatar for Satya](https://tkdodo.eu/blog/static/b26f8b4224860efd0bc393ed64f6df7b/5a7c3/sathya.jpg)

Sathya

@

gsathya.bsky.social

Imagine you're adopting the compiler and the compiler works great on your app and you ship it. Now you want to delete the useMemo/useCallback from your code to improve dx. How do you know which ones are safe to remove?

\-

Nov 22, 2024



](https://bsky.app/profile/gsathya.bsky.social/post/3lbjz4g3czc2t)

This thinking makes the theoretical "React might throw away the cached result and ruin my app" a really practical "I might remove the `useCallback` call and ruin my app", which isn't something I'm looking forward to.

## React 19[](#react-19)

Ref callbacks got an upgrade in React 19 - they can now return a [cleanup function](https://react.dev/blog/2024/12/05/react-19#cleanup-functions-for-refs). They work the same as cleanup functions in effects - React will call them when the component unmounts. In those cases, the ref won't be called with `null` anymore.

That's a nice convenience change, and it means we can now do things that require a cleanup inside our ref. We might not want to use `getBoundingClientRect` to measure our DOM node, as it could cause [layout thrashing](https://gist.github.com/paulirish/5d52fb081b3570c81e3a), and it also doesn't update to dynamic sizing.

A [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) can address both problems, and we can now create one and clean it up inside our ref callback (with or without `useCallback`):

ResizeObserver

```
1function MeasureExample() {2  const [height, setHeight] = React.useState(0)3
4  const measuredRef = (node) => {5    const observer = new ResizeObserver(([entry]) => {6      setHeight(entry.contentRect.height)7    })8
9    observer.observe(node)10
11    return () => {12      observer.disconnect()13    }14  }15
16  return (17    <>18      <h1 ref={measuredRef}>Hello, world</h1>19      <h2>The above header is {Math.round(height)}px tall</h2>20    </>21  )22}
```

## Ref Callback or useEffect?[](#ref-callback-or-useeffect)

Thanks to cleanup functions, ref callbacks might look like the new `useEffect`, so the real question is: When should we use which solution? My rules of thumb are:

-   If we need access to the `node`, I prefer ref callbacks - especially if I can extract the function out of the react component. Those are still less code than `useRef` + `useEffect`, and, as pointed out in my first article, they convey intent better because they are tied to rendering of the child, not the parent.
    
-   If I have a (real) side-effect that doesn't need the node (like writing to `document.title`), I wouldn't do that in a ref. This just causes confusion and seems like an unnecessary step just to "avoid" effects at all costs.
    
-   For async operations, choose neither - use [Tanstack React Query](https://tanstack.com/query/latest).
    

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)