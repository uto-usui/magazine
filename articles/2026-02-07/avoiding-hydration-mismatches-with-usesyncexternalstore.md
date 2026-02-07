---
title: "Avoiding Hydration Mismatches with useSyncExternalStore"
source: "https://tkdodo.eu/blog/avoiding-hydration-mismatches-with-use-sync-external-store"
publishedDate: "2024-02-21"
category: "frontend"
feedName: "TkDodo"
---

![A person with two shoes, one is green, one is orange](https://tkdodo.eu/blog/static/4c3fb2e346536b940032b1d2d3e1449a/bbe0c/mismatch.jpg "A person with two shoes, one is green, one is orange")

_No translations available._-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Hydration mismatches are among the most dreaded errors a React developer could potentially face:

Uncaught Error: Text content does not match server-rendered HTML.

How can this even be? We were promised isomorphic rendering - first on the server, then on the client. Write your code once, execute twice.

Except that the server isn't the client. It might run in another timezone or with a different locale, thus rendering different information than on the client, e.g. when Dates are involved. It also doesn't have access to APIs that are only available in the Browser, like `window`.

date-rendering

```
1function LastUpdated() {2  const date = getLastUpdated()3  return <span>Last updated at: {date.toLocaleDateString()}</span>4}
```

If the server has a different locale than the client, the dates might be rendered as "21/02/2024" on one end, but as "2/21/2024" on the other. When a mismatch like that happens, React will scream at us, because it wants the server rendered output to exactly match the one on the client to provide [the best possible user experience](https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html).

But as we've seen, the mismatch is unavoidable in some cases. So how do we "fix" it?

## suppressHydrationWarning[](#suppresshydrationwarning)

This feels a bit like an `eslint-ignore` or a `@ts-expect-error`, and it's probably fine if you know what you're doing. Just stick `suppressHydrationWarning` on the element in question and call it a day:

suppressHydrationWarning

```
1function LastUpdated() {2  const date = getLastUpdated()3  return (4    <span suppressHydrationWarning>5      Last updated at: {date.toLocaleDateString()}6    </span>7  )8}
```

According to [the docs](https://react.dev/reference/react-dom/components/common#common-props), this is an escape hatch and shouldn't be overused. So what else can we do?

## double render pass[](#double-render-pass)

Another popular fix is to render twice on the client. Basically, we render on the server with the information we have, which will produce static markup. Then, on the client, we will try to produce the same output as on the server for the first render cycle. This makes sure hydration doesn't error. Then, we'll trigger another render cycle with the "real" client information.

The drawback here of course is a short flash of content, as we can see in this animation (focus on the time):

Since the timezone is only known on the client, the server render cannot possibly know what's the correct time to display, as it's different for every user, depending on their location.

Another variation of this approach is to just render `null` on the server and let the correct content "appear" on the client only.

Whatever value you choose for server rendering, code will usually look something like this:

double-render-pass

```
1function LastUpdated() {2  const [isClient, setIsClient] = React.useState(false)3
4  React.useEffect(() => {5    setIsClient(true)6  }, [])7
8  if (!isClient) {9    return null10  }11
12  const date = getLastUpdated()13  return <span>Last updated at: {date.toLocaleDateString()}</span>14}
```

Since effects won't run on the server, `null` will be returned first. Then, on the client, the first render cycle will also yield `null`. After the effect has kicked in, our date will be displayed correctly.

This is a bit of boilerplate to write, but we can abstract it away if we want (I'm sure there's a package for it, too 😂), and it's a quite common pattern.

So what's the problem with it?

## Client Side Transitions[](#client-side-transitions)

The double render is a necessary evil when the component is server rendered - but in a traditionally SSR'd application, not every page is server rendered. Usually, only the page you first land on will need to produce static markup. After that, every navigation is a client side transition, similar to an SPA. They make an async request to get data (think `getServerSideProps` in nextJs), and then render the next page on the client only.

In those cases however, the double render pass workaround with `useEffect` will slow us down unnecessarily. We are on the client already, but our code doesn't know that. It will render `null` regardless, then trigger the effect, then render the content. And we also can't add additional checks if we are on the client, because the first client render after SSR needs to render `null`, too. 😭

What we are looking for is a solution that knows about server rendering, and more importantly, when the first client render is happening. And surprisingly, the best hook for this seems to be `useSyncExternalStore`.

## useSyncExternalStore[](#usesyncexternalstore)

Even though the primary use-case for `useSyncExternalStore` is to subscribe to external stores, it has an interesting second trait: It allows us to distinguish between a `serverSnapshot` and a `clientSnapshot`. Let's see what [the docs](https://react.dev/reference/react/useSyncExternalStore) have to say about `getServerSnapshot`:

This is exactly what we need to avoid hydration errors, and moreover, if we transition to a page with `useSyncExternalStore` on the client, the `clientSnapshot` will immediately be taken.

There's just one problem: which "store" should we subscribe to? It might look weird, but the answer is: We'll just use an empty store subscription that never updates. The `clientSnapshot` will be evaluated during every render anyways, and there is no need to push updates from outside of react into this component.

Since the `subscribe` parameter is mandatory, our code would look something like this:

useSyncExternalStore

```
1const emptySubscribe = () => () => {}2
3function LastUpdated() {4  const date = React.useSyncExternalStore(5    emptySubscribe,6    () => lastUpdated.toLocaleDateString(),7    () => null8  )9
10  return date ? <span>Last updated at: {date}</span> : null11}
```

`subscribe` needs to be a stable function, so we have to declare it outside of the React component. I found this pattern a bit hacky, so I had to get confirmation from the React team that this is a good idea before publishing this article.

[

![Avatar for acdlite](https://tkdodo.eu/blog/static/eaea4dcbfdb68915f8301eb04cbf8324/47930/acdlite.jpg)

Andrew Clark

@

acdlite

I’m glad you like this pattern but which part of this feels like a hack to you? Preventing hydration mismatches is exactly what the getServerSnapshot argument is designed for

\-

Dec 30, 2023



](https://x.com/acdlite/status/1741161736936558721)

I wish there would be a more ergonomic way, but I haven't found any. Maybe I should make a package out of this ... 🤔

* * *

This pattern also makes it quite easy to create a `ClientGate` - a component that will only render on the client, where you can safely access browser only APIs:

ClientGate

```
1function ClientGate({ children }) {2  const isServer = React.useSyncExternalStore(3    emptySubscribe,4    () => false,5    () => true6  )7
8  return isServer ? null : children()9}10
11function App() {12  return (13    <main>14      Hello Server15      <ClientGate>{() => `Hello Client ${window.title}`}</ClientGate>16    </main>17  )18}
```

### Minimizing Layout Shifts[](#minimizing-layout-shifts)

Layout shifts are not ideal, and not rendering a component completely just because one detail depends on client information can lead to bigger layout shifts than necessary. What if JS never loads - we wouldn't be able to show any information at all for those parts of the screen.

So if we can produce a stable date output on the server, we can limit the content shift to only the date, similar to what the page in the previously shown GIF is doing:

stable-server-value

```
1const emptySubscribe = () => () => {}2
3function LastUpdated() {4  const date = React.useSyncExternalStore(5    emptySubscribe,6    () => lastUpdated.toLocaleDateString(),7    () => lastUpdated.toLocaleDateString('en-US')8  )9
10  return <span>Last updated at: {date}</span>11}
```

Note that it's important to pass a static locale, because the server snapshot will be evaluated on the server and on the client. If we would let the runtime infer the locale (by not passing anything), we'd run into the whole hydration error scenario too.

## Client hints[](#client-hints)

In the future, [HTTP Client hints](https://developer.mozilla.org/en-US/docs/Web/HTTP/Client_hints) will hopefully make this whole situation better, because it will give servers a way to know information that is only available on the client before rendering anything. With that, we could SSR correct information without needing to resort to workarounds. Until then, I think this is as good as it gets, and I'd prefer `useSyncExternalStore` to the effect solution any day.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)