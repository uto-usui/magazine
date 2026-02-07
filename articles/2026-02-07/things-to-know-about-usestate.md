---
title: "Things to know about useState"
source: "https://tkdodo.eu/blog/things-to-know-about-use-state"
publishedDate: "2021-02-13"
category: "frontend"
feedName: "TkDodo"
---

![use state pitfalls](https://tkdodo.eu/blog/static/3618c6401c627a3352a2218e5567bfab/7d769/use-state-pitfalls.png "use state pitfalls")

* * *

-   [#1: Don't over useState](https://tkdodo.eu/blog/dont-over-use-state)
-   [#2: Putting props to useState](https://tkdodo.eu/blog/putting-props-to-use-state)
-   **#3: Things to know about useState**
-   [#4: useState for one-time initializations](https://tkdodo.eu/blog/use-state-for-one-time-initializations)
-   [#5: useState vs. useReducer](https://tkdodo.eu/blog/use-state-vs-use-reducer)

-   [한국어](https://www.philly.im/blog/things-to-know-about-use-state)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

[React.useState](https://reactjs.org/docs/hooks-reference.html#usestate) is pretty straightforward to use. A value, a setter function, an initial state. What hidden gems could possibly be there to know about? Well, here are 5 things you can profit from on a daily basis that you might not have known:

## 1: The functional updater[](#1-the-functional-updater)

Good old _setState_ (in React class components) had it, and _useState_ has it, too: The functional updater! Instead of passing a new value to the setter that we get from _useState_, we can also pass a function to it. React will call that function and gives us the _previousValue_, so that we can calculate a new result depending on it:

functional-updater

```
1const [count, setCount] = React.useState(0)2
3// 🚨 depends on the current count value to calculate the next value4<button onClick={() => setCount(count + 1)}>Increment</button>5
6// ✅ uses previousCount to calculate next value7<button onClick={() => setCount(previousCount => previousCount + 1)}>Increment</button>
```

This might be totally irrelevant, but it might also introduce subtle bugs in some situations:

### Calling the same setter multiple times[](#calling-the-same-setter-multiple-times)

Live example:

Each click will only increment the count once, because both calls to _setCount_ close over the same value (_count_). It's important to know that _setCount_ will _not_ immediately set the count. The useState updater only schedules an update. It basically tells React:

> Please set this value to the new value, somewhen.

And in our example, we are telling React the same thing twice:

> Please set the count to two  
> Please set the count to two

React does so, but this is probably not what we intended to say. We wanted to express:

> Please increment the current value  
> Please increment the current value (again)

The functional updater form ensures this:

### When async actions are involved[](#when-async-actions-are-involved)

Kent C. Dodds has written a lengthy post about this [here](https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates), and the conclusion is:

> Any time I need to compute new state based on previous state, I use a function update.

— Kent C. Dodds

I can second that conclusion and encourage you to read that article thoroughly.

### Bonus: Avoiding dependencies[](#bonus-avoiding-dependencies)

The functional updater form can also help you to avoid dependencies for _useEffect_, _useMemo_ or _useCallback_. Suppose you want to pass an increment function to a memoized child component. We can make sure the function doesn't change too often with _useCallback_, but if we close over _count_, we will still create a new reference whenever count changes. The functional updater avoids this problem altogether:

avoiding-dependencies

```
1function Counter({ incrementBy = 1 }) {2  const [count, setCount] = React.useState(0)3
4  // 🚨 will create a new function whenever count changes because we close over it5  const increment = React.useCallback(() => setCount(count + incrementBy), [6    incrementBy,7    count,8  ])9
10  // ✅ avoids this problem by not using count at all11  const increment = React.useCallback(12    () => setCount((previousCount) => previousCount + incrementBy),13    [incrementBy]14  )15}
```

### Bonus2: Toggling state with useReducer[](#bonus2-toggling-state-with-usereducer)

Toggling a Boolean state value is likely something that you've done once or twice before. Judging by the above rule, it becomes a bit boilerplate-y:

🚨-toggle-with-use-state

```
1const [value, setValue] = React.useState(true)2
3<button onClick={() => setValue(previousValue => !previousValue)}>Toggle</button>
```

If the only thing you want to do is toggle the state value, maybe even multiple times in one component, _useReducer_ might be the better choice, as it:

-   shifts the toggling logic from the setter invocation to the hook call
-   allows you to name your toggle function, as it's not just a setter
-   reduces repetitive boilerplate if you use the toggle function more than once

✅-toggle-with-use-reducer

```
1const [value, toggleValue] = React.useReducer(previous => !previous, true)2
3<button onClick={toggleValue}>Toggle</button>
```

I think this shows quite well that reducers are not only good for handling "complex" state, and you don't need to dispatch events with it at all costs.

## 2: The lazy initializer[](#2-the-lazy-initializer)

When we pass an initial value to _useState_, the initial variable is always created, but React will only use it for the first render. This is totally irrelevant for most use cases, e.g. when you pass a string as initial value. In rare cases, we have to do a complex calculation to initialize our state. For these situations, we can pass a function as initial value to _useState_. React will only invoke this function when it really needs the result (= when the component mounts):

lazy-initializer

```
1// 🚨 will unnecessarily be computed on every render2const [value, setValue] = React.useState(3  calculateExpensiveInitialValue(props)4)5
6// ✅ looks like a small difference, but the function is only called once7const [value, setValue] = React.useState(() =>8  calculateExpensiveInitialValue(props)9)
```

## 3: The update bailout[](#3-the-update-bailout)

When you call the updater function, React will not always re-render your component. It will bail out of rendering if you try to update to the same value that your state is currently holding. React uses [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#description) to determine if the values are different. See for yourself in this live example:

## 4: The convenience overload[](#4-the-convenience-overload)

This one is for all TypeScript users out there. Type inference for _useState_ usually works great, but if you want to initialize your value with _undefined_ or _null_, you need to explicitly specify the generic parameter, because otherwise, TypeScript will not have enough information:

use-state-type-inferrence

```
1// 🚨 age will be inferred to `undefined` which is kinda useless2const [age, setAge] = React.useState(undefined)3
4// 🆗 but a bit lengthy5const [age, setAge] = React.useState<number | null>(null)
```

Luckily, there is a [convenience overload](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7a0d9c019f2b48b36b88691247870e6885b97a02/types/react/v16/index.d.ts#L921-L928) of _useState_ that will add _undefined_ to our passed type if we completely omit the initial value. It will also be _undefined_ at runtime, because not passing a parameter at all is equivalent to passing _undefined_ explicitly:

use-state-convenience-overload

```
1// ✅ age will be `number | undefined`2const [age, setAge] = React.useState<number>()
```

Of course, if you absolutely have to initialize with _null_, you need the lengthy version.

## 5: The implementation detail[](#5-the-implementation-detail)

_useState_ is (kinda) implemented with _useReducer_ under the hood. You can see this in [the source code here](https://github.com/facebook/react/blob/1a7472624661270008011fd77f097d71e6249de9/packages/react-reconciler/src/ReactFiberHooks.new.js#L1242-L1246). There is also a great article by Kent C. Dodds on [how to implement useState with useReducer](https://kentcdodds.com/blog/how-to-implement-usestate-with-usereducer).

## Conclusion[](#conclusion)

The first 3 of those 5 things are actually mentioned directly in the Hooks API Reference of the official React docs I linked to at the very beginning 😉. If you didn't know about these things before - now you do!

* * *

How many of these points did you know? Leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)