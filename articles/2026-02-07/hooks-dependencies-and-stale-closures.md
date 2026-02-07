---
title: "Hooks, Dependencies and Stale Closures"
source: "https://tkdodo.eu/blog/hooks-dependencies-and-stale-closures"
publishedDate: "2022-04-24"
category: "frontend"
feedName: "TkDodo"
---

![people holding smartphones](https://tkdodo.eu/blog/static/8eea45764f2f9063d78f6fa6bfbdb347/bbe0c/people-holding-smartphones.jpg "people holding smartphones")

-   **#1: Hooks, Dependencies and Stale Closures**
-   [#2: Refs, Events and Escape Hatches](https://tkdodo.eu/blog/refs-events-and-escape-hatches)

_No translations available._-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

Working with [closures](https://en.wikipedia.org/wiki/Closure_\(computer_programming\)) is something that can become quite tricky, especially when dealing with hooks that have dependencies in React (think _useEffect_, _useMemo_, _useCallback_). A lot of bugs and frustration are tied pretty closely to that concept - even though it is nothing that React itself introduced. It's rather a language concept that hooks rely upon.

I love this question from Mark Erikson:

[

![Avatar for acemarke](https://tkdodo.eu/blog/static/8e4231885a3e5323ac447b3f0ec5359f/47930/acemarke.jpg)

Mark Erikson

@

acemarke

Question for the React community:

Has the shift from "how does \`this\`/binding work?"-type questions to "why is my state stale due to closures?"-type questions made things better, worse, or just "same thing but different" ?

(Inspired by the questions we see in @reactiflux daily)

\-

Aug 6, 2020



](https://x.com/acemarke/status/1291196140965302272)

To me, it has gotten subjectively better. Working with _this_ in class components was a pain, and errors did mostly show up at runtime. However, the behaviour you get due to stale closures are more subtle, and come up in more edge cases. The big advantage though is that they can be statically analyzed - and that's exactly what the [react-hooks/exhaustive-deps](https://reactjs.org/docs/hooks-rules.html#eslint-plugin) eslint rule does.

In this article, I'll try to break down what stale closures are, what they have to do with React and hooks, and why the lint rule is so important that I think you should set it to _error_. To get there, we must first understand what (stale) closures are:

## What are closures[](#what-are-closures)

I find the concept of closures somewhat hard to explain. Let's take a look at the definition on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures):

> A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

I would best rephrase this as: JavaScript functions can "see", and interact with, things that were defined outside of them. You might not know it, but you are probably using this concept _very_ often, for example, when using props of your React component inside a callback:

a-simple-closure

```
1function Counter({ count }) {2  const logCount = () => {3    // 💡 accessing count from the outer scope4    console.log('count', count)5  }6
7  return <button onClick={logCount}>Show me the count</button>8}
```

_logCount_ can access everything we define in the _Counter_ component, for example, the _count_ prop. You can easily check that you are relying on closures by moving the function to the outside of its parent. If it doesn't work anymore, it's because you don't have access to something you were "closing over" anymore:

moving-it-up

```
1// ❌ 'count' is not defined. (no-undef)2const logCount = () => {3  console.log('count', count)4}5function Counter({ count }) {6  return <button onClick={logCount}>Show me the count</button>7}
```

The nice part about closures in React is that it will "just work" if your component re-renders with a new prop. Have a look at this interactive example:

You can click both buttons a bunch of times, and you should see that the log function, which closures over _count_, will always have access to the "latest" count. Or so it seems.

But why is that, and is that always true?

## Taking a picture[](#taking-a-picture)

The last sentence of the MDN definition is the most important one, so let's have another look (emphasis mine):

In JavaScript, closures are created every time a function is created, _at function creation time._

Let me try to explain this with an analogy that has made closures "click" for me:

Suppose every time you are creating a function, you are taking a picture of it. That picture contains everything from the moment when the picture was created. In the foreground, you have the most important things (what the function is doing, the code it is executing etc.). In the background of the picture, you have everything that lives outside your function, but that you are also using inside. It's as if the _count_ variable has photo-bombed our picture - it is also in it.

The thing about the picture is - it _cannot_ change. Once we have taken it, its content is sealed (unless we use photoshop).

Calling a function is just looking at the picture and doing what's on it. We will then see everything from the time when it was created.

Every time the function is created, we throw away the old picture and take a new one. When React re-renders a component tree, it just re-runs everything top down. Here, this works to our advantage: Our _logCount_ function gets re-created because the _App_ component re-renders when the _count_ state is updated.

Because of that, we take a new picture (= re-create the _logCount_ function), that contains the "latest" count variable. So when we click our button, we know the correct count.

## Memoization[](#memoization)

For 98% of the code we write, this behaviour is great, and as I said, it just works. We don't even have to think about closures. That is, until we introduce memoization.

The remainder of the time, re-creating a function every render just doesn't cut it. Maybe we need to pass it to a memoized child component that is expensive to re-render, so we have memoized it.

For these cases, React offers ways to _not_ create functions (or values) every time, in the form of [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback) and [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo).

By allowing us to pass a dependency array to those hooks, we can let React know when it should re-create those things, and when it is safe to give us an old version of it.

It comes with the aforementioned eslint rule that tries to point us in the right direction, and tells us which dependencies we should include. Because the rule is set to _warn_ per default, it seems like an innocent thing to ignore. But it is not.

### Ignoring the linter[](#ignoring-the-linter)

Oftentimes, I see people ignore the rule with arguments like: "I only want to run this effect when the component mounts", or: "I only want to create the function once".

Whenever you do that, no new picture is taken. React will just give you the old one to look at. And as we now know, that means we'll have the old photo-bombed variables at our disposal, as opposed to "the latest ones". And that is commonly referred to as a "stale closure". Because the things you are seeing are not up-to-date, but stale.

We can see how ignoring the linter in our example will lead to non working code:

We instruct React to only create our _logCount_ function once, "on mount". It doesn't have any dependencies (an empty dependency array), so it will always "see" the count from the first render cycle, which is 1. Every time we click the button, it will log 1. This is certainly not what we had in mind.

* * *

Obviously, this was a very basic example. We can just include the count in the dependency Array, like the linter wants to, without problems. If count changes, we get a new picture. If our App re-renders for some other reason and count stays the same, we don't have to create a new function, and React can give us the old one. Nothing is stale here, because the only dependency we have is _count_, and that hasn't changed. This is pretty sweet.

But what about more complex dependencies? Like an object or a callback function that get provided via props that are _not_ referentially stable?

## Another example[](#another-example)

Once upon a time, we had a component that wasn't fast. It looked something like this:

slow-component

```
1function SlowComponent({ value, onChange }) {2  return <RenderSomethingSlow value={value} onChange={onChange} />3}
```

Our idea was to memoize it by wrapping it in [React.memo](https://reactjs.org/docs/react-api.html#reactmemo) so that it doesn't get rendered too often. Because _onChange_ is a function that gets passed in by consumers, _they_ would need to memoize the function to not make the component slow again.

We thought: "We actually only want to re-render our component when _value_ changes, so why don't we just omit the _onChange_ prop from the comparison function and side-step that problem?" 🤔

fast-but-buggy-component

```
1const FastComponent = React.memo(2  SlowComponent,3  (prevProps, nextProps) => prevProps.value === nextProps.value4)
```

As the React docs suggest, we can "return true if passing nextProps to render would return the same result as passing prevProps to render, otherwise return false".

We only care about _value_ for our render result, so what's wrong with this approach?

The answer lies again in _stale closures_: If the caller component re-creates _onChange_ for some reason, but _value_ doesn't change, we are not taking a new picture of our SlowComponent, which means it still sees the old _onChange_ function:

a-stale-closure

```
1function User({ name }) {2  const [count, increment] = React.useReducer((prev) => prev + 1, 1)3
4  // 🚨 name can become stale5  const logUser = () => {6    console.log(name, count)7  }8
9  return (10    <div>11      <button onClick={increment}>increment</button>12      <button onClick={logUser}>log</button>13      <FastComponent value={count} onChange={logUser} />14    </div>15  )16}
```

The _logUser_ function closures over _name_ and _count_, but _FastComponent_ knows nothing of the _name_ prop. It will only be re-created when _value_ changes, so if _onChange_ is called, it sees the _name_ from the last time _count_ has changed - which might or might not be stale.

This is a very tricky situation to be in, because your application can run perfectly fine for weeks or even months before you get a bug report that is likely very tricky to reproduce.

## Don't lie[](#dont-lie)

The best thing you can do is: Don't get yourself in this situation by lying about the dependencies. Functions cannot be easily excluded from dependency arrays, so take the linter seriously, and make that rule an _error_ in your codebase!

**Spoiler**: There _are_ ways to have your cake and eat it, too, but I will leave that for the next article. 😄

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)