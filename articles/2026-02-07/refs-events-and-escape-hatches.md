---
title: "Refs, Events and Escape Hatches"
source: "https://tkdodo.eu/blog/refs-events-and-escape-hatches"
publishedDate: "2022-09-17"
category: "frontend"
feedName: "TkDodo"
---

![silhouette of people during concert](https://tkdodo.eu/blog/static/dc42a104f61d3807ed467f84cbad670c/bbe0c/silhouette-of-people-during-concert.jpg "silhouette of people during concert")

-   [#1: Hooks, Dependencies and Stale Closures](https://tkdodo.eu/blog/hooks-dependencies-and-stale-closures)
-   **#2: Refs, Events and Escape Hatches**

_No translations available._-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

I hope that after reading part one about [stale closures in React](https://tkdodo.eu/blog/hooks-dependencies-and-stale-closures), you now have a good understanding of why they can occur and how to avoid them.

However, it is sometimes quite cumbersome to have to think about referential stability when passing functions around, and it can also get a bit boilerplate-y with all those additional _useCallbacks_.

I already left a bunch of clues in the previous article that there might be a way to make this easier, so here we go:

## Photoshop[](#photoshop)

Remember this sentence?

> The thing about the picture is - it cannot change. Once we have taken it, its content is sealed (unless we use photoshop).

In React, we almost always think in immutability. _Props_ cannot be changed (from within a component), and _state_ updates are merely scheduled and also need to happen in an immutable way. Everything we see and work with is essentially a _const_.

We always see the things from the time they were created, but if they are _mutated_ in place, we would still see the latest value. Let's take the basic example from part 1 and store the value in a mutable variable outside the React component:

Now it's hopefully obvious that this is _not_ how you would work with React. Having a variable outside the component means it's shared between component instances, and React doesn't know about it, which is why we have to manually force our component to re-render.

But it showcases one thing: _mutating_ a variable in place bypasses our mental modal of pictures that cannot change.

Mutations are literally photoshop. They can alter existing images after they have been taken. And what's the React way to hold mutable values? [Refs](https://beta.reactjs.org/learn/escape-hatches#referencing-values-with-refs)!

## Refs[](#refs)

Refs are just bags that can contain an arbitrary mutable value. The ref itself is referentially stable, so we don't have to include it in dependency arrays, and the _.current_ property has the actual value. Refs offer an escape hatch from Reacts one way data flow model, because updates on refs are not going to make your component to re-render. This comes in quite handy if we have to pass functions around, e.g. to custom hooks.

As an example, let's implement a somewhat common use-case of storing a value and triggering a callback after some debounced time:

useDebouncedState

```
1export const useDebouncedState = (callback, delay) => {2  const [value, setValue] = React.useState('')3
4  React.useEffect(() => {5    const timeoutId = setTimeout(() => {6      if (value) {7        callback(value)8      }9    }, delay)10
11    return () => {12      clearTimeout(timeoutId)13    }14  }, [value, delay, callback])15
16  return [value, setValue]17}
```

We've added _callback_ to the effect's dependency array as the linter wants, but that has a downside: consumers will need to memoize the function, which is not a very developer friendly interface. Of course, they'll most often just want to use an inline function, without having to care about referential stability:

inline-function

```
1const [state, setState] = useDebouncedState((value) => {2  alert(value)3}, 1000)
```

This will potentially run our effect too often, e.g. if the component re-renders for another reason. However, omitting the function from the dependency array is not an option, as it would potentially introduce stale closures.

### The latest ref[](#the-latest-ref)

I first read about a pattern called _the latest ref_ in [this article](https://epicreact.dev/the-latest-ref-pattern-in-react/) by [Kent C. Dodds](https://twitter.com/kentcdodds). The idea is to store the function (our callback) in a ref so that we can omit it from the dependency array. All we then need to do is to make sure that the ref is updated when the function changes, and we can do that with an additional effect:

the-latest-ref

```
1export const useDebouncedState = (callback, delay) => {2  const [value, setValue] = React.useState('')3  // 👇 store callback in a ref4  const ref = React.useRef(callback)5
6  // 👇 update the ref when the callback changes7  React.useLayoutEffect(() => {8    ref.current = callback9  }, [callback])10
11  React.useEffect(() => {12    const timeoutId = setTimeout(() => {13      if (value) {14        // 👇 use the ref instead of the callback15        ref.current(value)16      }17    }, delay)18
19    return () => {20      clearTimeout(timeoutId)21    }22  // 👇 no need to include the callback23  }, [value, delay])24
25  return [value, setValue]26}
```

Admittedly, this does add more boilerplate, but it pays off - especially for libraries or reusable hooks due to the improved developer experience for consumers of the hook. Also, hold on tight because React might actually ship a hook that does this for us in the future:

## useEvent[](#useevent)

Recently, the React team has worked on an RFC about a dedicated hook for this behaviour called [useEvent](https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md). The idea is to have a hook that is similar to _useCallback_, except that it doesn't have a dependency array, but still returns a stable function reference without suffering from stale closure problems.

As pointed out in the [new beta docs](https://beta.reactjs.org/learn/separating-events-from-effects#declaring-an-event-function), those event functions behave a lot more like an event handler (hence the name). The logic inside it is not reactive, and it always sees the latest values of your props and state.

Would that hook exist already, we could rewrite our _useDebouncedState_ hook like this:

useEvent

```
1export const useDebouncedState = (callback, delay) => {2  const [value, setValue] = React.useState('')3
4  // 👇 declare the event5  const onTimeout = React.useEvent(callback);6
7  React.useEffect(() => {8    const timeoutId = setTimeout(() => {9      if (value) {10        // 👇 use the event11        onTimeout(value);12      }13    }, delay);14
15    return () => {16      clearTimeout(timeoutId);17    };18  // 🎉 no need to include onTimeout19  }, [value, delay]);20
21  return [value, setValue]22}
```

This looks pretty clean to me, and if you want to have a user-land implementation of _useEvent_ right now, have a look at this implementation by [Diego Haz](https://bsky.app/profile/haz.dev):

[

![Avatar for diegohaz](https://tkdodo.eu/blog/static/11a71749fc55051761495a2aebe9dd96/47930/diegohaz.jpg)

Haz

@

diegohaz

Do you want to use the proposed \`useEvent\` hook now with TypeScript?

Here you go: gist.github.com/diegohaz/69509...

![Screenshot of code where a useEvent function is defined and used. Text version available on the link in the tweet.](https://tkdodo.eu/blog/static/8573aebadf66cb9115a96f4ade61ac31/583fd/FSJNvbJWUAIVEGB.jpg)

\-

May 7, 2022



](https://x.com/diegohaz/status/1522868292301606912)

You can use it until React ships their own hook, but be aware that you have to include the returned function in the dependency array because unlike the native implementation, the linter cannot know that the function is stable. I personally can't wait until this ships because it will simplify a lot of my code. 🙌

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)