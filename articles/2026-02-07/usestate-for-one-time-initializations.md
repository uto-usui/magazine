---
title: "useState for one-time initializations"
source: "https://tkdodo.eu/blog/use-state-for-one-time-initializations"
publishedDate: "2021-03-12"
category: "frontend"
feedName: "TkDodo"
---

![use state pitfalls](https://tkdodo.eu/blog/static/3618c6401c627a3352a2218e5567bfab/7d769/use-state-pitfalls.png "use state pitfalls")

* * *

-   [#1: Don't over useState](https://tkdodo.eu/blog/dont-over-use-state)
-   [#2: Putting props to useState](https://tkdodo.eu/blog/putting-props-to-use-state)
-   [#3: Things to know about useState](https://tkdodo.eu/blog/things-to-know-about-use-state)
-   **#4: useState for one-time initializations**
-   [#5: useState vs. useReducer](https://tkdodo.eu/blog/use-state-vs-use-reducer)

-   [한국어](https://www.philly.im/blog/use-state-for-one-time-initializations)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

When we talk about memoization and keeping references stable, _useMemo_ is usually the first thing that comes to mind. I'm not in the mood for writing much text today,so I'm just gonna lead with a (real-world) example that happened to me this week:

## The Example[](#the-example)

Suppose you have a resource that you only want to initialize once per life-time of your app. The recommended pattern is usually to create the instance _outside_ of the component:

static-instance

```
1// ✅ static instance is only created once2const resource = new Resource()3
4const Component = () => (5  <ResourceProvider resource={resource}>6    <App />7  </ResourceProvider>8)
```

The _const resource_ is created once when the js bundle is evaluated, and then made available to our app via the _ResourceProvider_. So far, so good. This usually works well for resources that you need once per App, like [redux stores](https://react-redux.js.org/api/provider#example-usage).

In our case however, we were mounting the Component (a [micro-frontend](https://micro-frontends.org/)) multiple times, and each one needs their own _resource_. All hell breaks loose if two of those share the same resource. So we needed to move it _into_ the _Component_:

create-in-component

```
1const Component = () => {2  // 🚨 be aware: new instance is created every render3  const resource = new Resource()4  return (5    <ResourceProvider resource={resource}>6      <App />7    </ResourceProvider>8  )9}
```

I think it is rather obvious that this is not a good idea. The render function now creates a new Resource on every render! This will coincidentally work if we only render our _Component_ once, but this is nothing you should ever rely on. Re-renders can (and likely will) happen, so be prepared!

The first solution that came to our mind was to _useMemo_. After all, _useMemo_ is for only re-computing values if dependencies change, and we don't have a dependency here, so this looked wonderful:

use-memo

```
1const Component = () => {2  // 🚨 still not truly stable3  const resource = React.useMemo(() => new Resource(), [])4  return (5    <ResourceProvider resource={resource}>6      <App />7    </ResourceProvider>8  )9}
```

Again, this might coincidentally work for some time, but let's have a look at what the [react docs](https://reactjs.org/docs/hooks-reference.html#usememo) have to say about _useMemo_:

> You may rely on useMemo as a performance optimization, not as a semantic guarantee. In the future, React may choose to “forget” some previously memoized values and recalculate them on next render, e.g. to free memory for offscreen components. Write your code so that it still works without useMemo — and then add it to optimize performance.

Wait, what? If we should write our code in a way that it still works without _useMemo_, we are basically not making our code any better by adding it. We are not really concerned about performance here, we want true referential stability please. What's the best way to achieve this?

### state to the rescue[](#state-to-the-rescue)

Turns out, it's _state_. State is guaranteed to only update if you call the setter. So all we need to do is _not_ call the setter, and since it's the second part of the returned tuple, we can just _not_ destruct it. We can even combine this very well with the [lazy initializer](https://tkdodo.eu/blog/things-to-know-about-use-state#2-the-lazy-initializer) to make sure the resource constructor is only invoked once:

use-state

```
1const Component = () => {2  // ✅ truly stable3  const [resource] = React.useState(() => new Resource())4  return (5    <ResourceProvider resource={resource}>6      <App />7    </ResourceProvider>8  )9}
```

With this trick, we will make sure that our resource is truly only created once per component lifecycle. 🚀

### what about refs?[](#what-about-refs)

I think you can achieve the same with [useRef](https://reactjs.org/docs/hooks-reference.html#useref), and according to the [rules of react](https://gist.github.com/sebmarkbage/75f0838967cd003cd7f9ab938eb1958f), this wouldn't even break purity of the render function:

use-ref

```
1const Component = () => {2  // ✅ also works, but meh3  const resource = React.useRef(null)4  if (!resource.current) {5    resource.current = new Resource()6  }7  return (8    <ResourceProvider resource={resource.current}>9      <App />10    </ResourceProvider>11  )12}
```

Honestly, I don't know why you should do it this way - I think this looks rather convoluted, and TypeScript will also not like it, because _resource.current_ can technically be _null_. I prefer to just _useState_ for these cases.

* * *

Leave a comment below ⬇️ or reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions.

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)