---
title: "The State Initializer Pattern"
source: "https://kentcdodds.com/blog/the-state-initializer-pattern"
publishedDate: "2021-11-05"
category: "frontend"
feedName: "Kent C. Dodds"
---

When I was working on [`downshift`](https://github.com/downshift-js/downshift), I came across a situation where my users (myself included) needed the ability to at any time reset the dropdown we were building to its initial state: no input value, nothing highlighted, nothing selected, closed. But I also had users who wanted the "initial state" to have some default input, default selection, or remain open. So I came up with the state initializers pattern to support all these use cases.

The state initializer pattern allows you to expose an API to users to be able to reset your component to its original state without having to completely unmount and remount the component.

Actually, this pattern is similar in some ways to `defaultValue` in HTML. Sometimes the consumer of your hook or component wants to initialize the value of your state. The state initializer pattern allows you to do that.

Take this for example:

```
function Counter() {
	const [count, setCount] = React.useState(0)
	const increment = () => setCount((c) => c + 1)
	const reset = () => setCount(0)
	return (
		<div>
			<button onClick={increment}>{count}</button>
			<button onClick={reset}>Reset</button>
		</div>
	)
}
```

So our component has a way to initialize its state (to `0`) and it also supports a way to reset the state to that initial value.

So what this pattern is for is to allow outside users of your component to control that initial state value. For example. If someone wanted to start the count off as `1` they might want to do this:

```
<Counter initialCount={1} />
```

Some libraries that implement this pattern use the prefix `default` instead of `initial` to match the `defaultValue` from the `input` element. While this makes sense, I still prefer the prefix `initial` since I feel like it communicates the purpose and use case more clearly.

To support the `initialCount` prop, here's all we need to do:

```
function Counter({ initialCount = 0 }: { initialCount?: number }) {
	//              ^^^ accept the prop with a default value so it's optional
	const [count, setCount] = React.useState(initialCount) // <-- pass it to your state
	const increment = () => setCount((c) => c + 1)
	const reset = () => setCount(initialCount) // <-- pass that initialCount value to the reset function
	return (
		<div>
			<button onClick={increment}>{count}</button>
			<button onClick={reset}>Reset</button>
		</div>
	)
}
```

And here's that with an initial count of `8`:

That's the core bit for the pattern. But it is missing one important edge case.

What happens if the user of your component changes the value of `initialCount` after your component is mounted? Wouldn't that defeat the purpose of the whole "initial" part of our prop name? Here's an example of that where the consumer of our count is changing the `initialCount` after the initial mount every 500ms:

Clicking "reset" above will reset our component to a different state from its initial state which is probably a mistake, so we want that to not be possible. Click it multiple times and it's getting reset to something completely different every time. Now, I definitely agree with you. This is an example of someone using the API wrong. But if it's not a lot of work we may as well make this impossible right?

So, how can we grab hold of the actual initial value and ignore any changes to that prop? I've got a hint for you. It's not so complicated as `useEffect` with an `isMounted` boolean or whatever. It's actually pretty simple. And there are a few ways we could do it:

```
const { current: initialState } = React.useRef({ count: initialCount })
const [initialState] = React.useState({ count: initialCount })
const [initialState] = React.useReducer((s) => s, { count: initialCount })

// actual initial count is: initialState.count
```

Between those options, I prefer the `useRef`, but you do you my friend. Let's do it! Here's that with the `initialCount` set to `2`:

And even if someone were to randomly change the `initialCount` value, our component wouldn't care.

## [Resetting state via `key`](#resetting-state-via-key)

If you've not already read [Understanding React's key prop](https://kentcdodds.com/blog/understanding-reacts-key-prop), I recommend you give that a quick read right now. You done? Great, let's continue

One other thing I want to call out is you can actually reset a component pretty easily without any API at all. It's a built-in React API for all components: the `key` prop. Simply provide a `key` and set that `key` prop to a new value any time you want to re-initialize the component. This will unmount and remount the component brand new. Here's the code for that:

```
function KeyPropReset() {
	const [key, setKey] = React.useState(0)
	const resetCounter = () => setKey((k) => k + 1)
	return <KeyPropResetCounter key={key} reset={resetCounter} />
}

function KeyPropResetCounter({ reset }) {
	const [count, setCount] = React.useState(0)
	const increment = () => setCount((c) => c + 1)
	return <CountUI count={count} increment={increment} reset={reset} />
}
```

And here's that rendered:

You'll notice that we had to restructure the code a bit to support this. In some situations that may not be possible/desireable.

Additionally, there are more implications to unmounting and remounting a component (which is what changes to the `key` prop will do). For example, in my Advanced React Patterns workshop, we've got an animation when state changes. Check out the impact of the `key` approach on that:

**With the key reset approach** (notice there's no animation):

[![Clicking a toggle component, then a reset button which shows no animation on reset](https://res.cloudinary.com/kentcdodds-com/image/upload/f_auto,q_auto,w_1600/v1636121505/kentcdodds.com/content/blog/the-state-initializer-pattern/key-reset.gif)](https://advanced-react-patterns-next.netlify.app/isolated/examples/resetting-via-key-prop.tsx)

**With the state initializer pattern** (notice there is an animation):

[![Clicking a toggle component, then a reset button which shows no animation on reset](https://res.cloudinary.com/kentcdodds-com/image/upload/f_auto,q_auto,w_1600/v1636121497/kentcdodds.com/content/blog/the-state-initializer-pattern/state-initializer-pattern.gif)](https://advanced-react-patterns-next.netlify.app/isolated/final/05.extra-1.tsx)

Also unmounting and remounting components will call `useEffect` cleanups and callbacks as well. That might be what you want, but it might not be.

## [Conclusion](#conclusion)

The state initializer pattern is pretty simple. In fact, for a long time I removed it from my [Advanced React Patterns](https://epicreact.dev/patterns) workshop because I didn't think it was worth the time. But after a few times delivering that workshop without it, people started asking me about the problems it solves so I've added it back. Hope this post helps you in your work. Good luck!