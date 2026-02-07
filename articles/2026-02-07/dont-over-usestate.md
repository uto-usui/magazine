---
title: "Don't over useState"
source: "https://tkdodo.eu/blog/dont-over-use-state"
publishedDate: "2020-08-29"
category: "frontend"
feedName: "TkDodo"
---

29.08.2020 — [ReactJs](https://tkdodo.eu/blog/tags/react-js), [useState pitfalls](https://tkdodo.eu/blog/tags/use-state-pitfalls) — 3 min read

![use state pitfalls](https://tkdodo.eu/blog/static/3618c6401c627a3352a2218e5567bfab/7d769/use-state-pitfalls.png "use state pitfalls")

* * *

-   **#1: Don't over useState**
-   [#2: Putting props to useState](https://tkdodo.eu/blog/putting-props-to-use-state)
-   [#3: Things to know about useState](https://tkdodo.eu/blog/things-to-know-about-use-state)
-   [#4: useState for one-time initializations](https://tkdodo.eu/blog/use-state-for-one-time-initializations)
-   [#5: useState vs. useReducer](https://tkdodo.eu/blog/use-state-vs-use-reducer)

-   [한국어](https://www.philly.im/blog/dont-over-use-state)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

`useState` is considered to be the most basic of all the hooks provided by React. It is also the one you are most likely to use (no pun intended), alongside `useEffect`.

Yet over the last couple of months, I have seen this hook being misused a lot. This has mostly nothing to do with the hook itself, but because state management is never easy.

This is the first part of a series I'm calling _useState pitfalls_, where I will try to outline common scenarios with the useState hook that might better be solved differently.

## What is state?[](#what-is-state)

I think it all boils down to understanding what state is. Or more precisely, what state _isn't_. To comprehend this, we have to look no further than [the official react docs](https://reactjs.org/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state):

> Ask three questions about each piece of data:

> Is it passed in from a parent via props? If so, it probably isn’t state. Does it remain unchanged over time? If so, it probably isn’t state. Can you compute it based on any other state or props in your component? If so, it isn’t state.

So far, so easy. Putting _props to state_ (1) is a whole other topic I will probably write about another time \[edit: I did that in [part 2](https://tkdodo.eu/blog/putting-props-to-use-state)\], and if you are not using the setter at all (2), then it is hopefully pretty obvious that we are _not_ dealing with state.

That leaves the third question: _derived state_. It might seem quite apparent that a value that can be computed from a state value is _not_ its own state. However, when I reviewed some code challenges for a client of mine lately, this is exactly the pattern I have seen a lot, even from senior candidates.

## An example[](#an-example)

The exercise is pretty simple and goes something like this: Fetch some data from a remote endpoint (a list of items with categories) and let the user filter by the category.

The way the state was managed looked something like this most of the time:

use-state

```
1import { fetchData } from './api'2import { computeCategories } from './utils'3
4const App = () => {5  const [data, setData] = React.useState(null)6  const [categories, setCategories] = React.useState([])7
8  React.useEffect(() => {9    async function fetch() {10      const response = await fetchData()11      setData(response.data)12    }13
14    fetch()15  }, [])16
17  React.useEffect(() => {18    if (data) {19      setCategories(computeCategories(data))20    }21  }, [data])22
23  return <>...</>24}
```

At first glance, this looks okay. You might be thinking: We have an effect that fetches the data for us, and another effect that keeps the categories _in sync_ with the data. This is exactly what the useEffect hook is for (keeping things in sync), so what is bad about this approach?

## Getting out of sync[](#getting-out-of-sync)

This will actually work fine, and it's also not totally unreadable or hard to reason about. The problem is that we have a "publicly" available function `setCategories` that future developers might use.

If we intended our categories to be solely dependent on our data (like we expressed with our useEffect), this is bad news:

bad-news

```
1import { fetchData } from './api'2import { computeCategories, getMoreCategories } from './utils'3
4const App = () => {5  const [data, setData] = React.useState(null)6  const [categories, setCategories] = React.useState([])7
8  React.useEffect(() => {9    async function fetch() {10      const response = await fetchData()11      setData(response.data)12    }13
14    fetch()15  }, [])16
17  React.useEffect(() => {18    if (data) {19      setCategories(computeCategories(data))20    }21  }, [data])22
23  return (24    <>25      ...26      <Button onClick={() => setCategories(getMoreCategories())}>27        Get more28      </Button>29    </>30  )31}
```

Now what? We have no predictable way of telling what "categories" are.

-   The page loads, categories are _X_
-   User clicks the button, categories are _Y_
-   If the data fetching re-executes, say, because we are using [react-query](https://react-query.tanstack.com/), which has features like automatic re-fetching when you focus your tab or when you re-connect to your network (it's awesome, you should give it a try), the categories will be _X_ again.

Inadvertently, we have now introduced a hard to track bug that will only occur every now and then.

## No-useless-state[](#no-useless-state)

Maybe this is not so much about useState after all, but more about a misconception with useEffect: It should be used to sync your state _with something outside of React_. Utilizing useEffect to sync _two react states_ is rarely right.

So I'd like to postulate the following:

> Whenever a state setter function is only used synchronously in an effect, get rid of the state!

— TkDodo

This is loosely based on what [@sophiebits](https://bsky.app/profile/sophiebits.com) posted recently on twitter:

[

![Avatar for sophiebits](https://tkdodo.eu/blog/static/3e07290a2f8fabdfcd15e904b931a61f/47930/sophiebits.jpg)

ms. sophie bites

@

AvatarSophiebits

WTB a lint rule that detects

const \[processedData, setProcessedData\] = useState();

useEffect(() => {

  let processed = /\* do something with data \*/;

  setProcessedData(processed);

}, \[data\]);

and tells you to use useMemo instead.

\-

Aug 13, 2020



](https://x.com/AvatarSophiebits/status/1293710971274289152)

This is solid advice, and I'd go even further and suggest that unless we have proven that the calculation is expensive, I wouldn't even bother to memoize it. Don't prematurely optimize, always measure first. We want to have proof that something is slow before acting on it. For more on this topic, I highly recommend [this article by @ryanflorence](https://reacttraining.com/blog/react-inline-functions-and-performance).

In my world, the example would look just like this:

no-useless-state

```
1import { fetchData } from './api'2import { computeCategories } from './utils'3
4const App = () => {5  const [data, setData] = React.useState(null)6-  const [categories, setCategories] = React.useState([])7+  const categories = data ? computeCategories(data) : []89  React.useEffect(() => {10    async function fetch() {11      const response = await fetchData()12        setData(response.data)13      }1415      fetch()16    }, [])1718-  React.useEffect(() => {19-    if (data) {20-      setCategories(computeCategories(data))21-    }22-  }, [data])2324  return <>...</>25}
```

We've reduced complexity by halving the amount of effects and we can now clearly see that categories is _derived from_ data. If the next person wants to calculate categories differently, they have to do it from _within_ the `computeCategories` function. With that, we will always have a clear picture of what categories are and where they come from.

A single source of truth.

* * *

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)