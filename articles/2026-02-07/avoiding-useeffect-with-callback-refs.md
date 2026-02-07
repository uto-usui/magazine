---
title: "Avoiding useEffect with callback refs"
source: "https://tkdodo.eu/blog/avoiding-use-effect-with-callback-refs"
publishedDate: "2022-08-14"
category: "frontend"
feedName: "TkDodo"
---

![callback](https://tkdodo.eu/blog/static/e94b85b4c2523af8b8564f46928ebb18/bbe0c/callback.jpg "callback")

-   **#1: Avoiding useEffect with callback refs**
-   [#2: Ref Callbacks, React 19 and the Compiler](https://tkdodo.eu/blog/ref-callbacks-react-19-and-the-compiler)

-   [한국어](https://velog.io/@cnsrn1874/%EB%B2%88%EC%97%AD-callback-refs-%EC%82%AC%EC%9A%A9%EC%9C%BC%EB%A1%9C-useEffect-%EB%B0%A9%EC%A7%80%ED%95%98%EA%B8%B0)
-   [日本語](https://qiita.com/70ki8suda/items/831727af51c572e10ba8)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

**Last Update: 2024-12-08**

**Note: This article assumes a basic understanding of what _refs_ are in React.**

Even though refs are mutable containers where we can theoretically store arbitrary values, they are most often used to get access to a DOM node:

a-basic-ref

```
1const ref = React.useRef(null)2
3return <input ref={ref} defaultValue="Hello world" />
```

`ref` is a reserved property on build-in primitives, where React will store the DOM node after it was rendered. It will be set back to _null_ when the component is unmounted.

## Interacting with refs[](#interacting-with-refs)

For most interactions, you don't need to access the underlying DOM node, because React will handle updates for us automatically. A good example where you might need a ref is focus management.

There's a [good RFC](https://github.com/devongovett/rfcs-1/blob/patch-1/text/2019-focus-management.md) from [Devon Govett](https://twitter.com/devongovett) that proposes adding FocusManagement to react-dom, but right now, there is nothing in React that will help us with that.

### Focus with an effect[](#focus-with-an-effect)

So how would you, right now, focus an input element after it rendered? (I know [autofocus](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus) exists, this is an example. If this bothers you, imagine you'd want to animate the node instead.)

Well, most code I've seen tries to do this:

focus-an-input

```
1const ref = React.useRef(null)2
3React.useEffect(() => {4  ref.current?.focus()5}, [])6
7return <input ref={ref} defaultValue="Hello world" />
```

This is mostly fine and doesn't violate any rules. The empty dependency array is okay because the only thing used inside is the ref, which is stable. The linter won't complain about adding it to the dependency array, and the ref is also not read during render (which might be troublesome with concurrent React features).

The effect will run once "on mount" ([twice in strict mode](https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state)). By that time, React has already populated the ref with the DOM node, so we can focus it.

Yet this is _not_ the best way to do it and does have some caveats in some more advanced situations.

Specifically, it assumes that the ref is "filled" when the effect runs. If it's not available, e.g. because you pass the ref to a custom component which will defer the rendering or only show the input after some other user interaction, the content of the ref will still be _null_ when the effect runs and nothing will be focussed:

custom-form

```
1function App() {2  const ref = React.useRef(null)3
4  React.useEffect(() => {5    // 🚨 ref.current is always null when this runs6    ref.current?.focus()7  }, [])8
9  return <Form ref={ref} />10}11
12const Form = React.forwardRef((props, ref) => {13  const [show, setShow] = React.useState(false)14
15  return (16    <form>17      <button type="button" onClick={() => setShow(true)}>18        show19      </button>20      // 🧐 ref is attached to the input, but it's conditionally rendered21      // so it won't be filled when the above effect runs22      {show && <input ref={ref} />}23    </form>24  )25})
```

Here is what happens:

-   _Form_ renders.
-   _input_ is not rendered, _ref_ is still _null_.
-   effect runs, does nothing.
-   input is shown, _ref_ will be filled, but will not be focussed because effect won't run again.

The problem is that the effect is "bound" to the render function of the Form, while we actually want to express: "Focus the input when the input is rendered", not "when the form mounts".

## Callback refs[](#callback-refs)

This is where callback refs come into play. If you've ever looked at the [type declarations for refs](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/fc9b16957473f81a1d708e6948b8d61e292aeb58/types/react/v17/index.d.ts#L85), we can see that we can not only pass a ref object into it, but also a function:

```
1type Ref<T> = RefCallback<T> | RefObject<T> | null
```

Conceptually, I like to think about refs on React elements as functions that are called after the component has rendered. This function gets the rendered DOM node passed as argument. If the React element unmounts, it will be called once more with _null_.

Passing a ref from _useRef_ (a RefObject) to a React element is therefore just syntactic sugar for:

callback-ref

```
1<input2  ref={(node) => {3    ref.current = node;4  }}5  defaultValue="Hello world"6/>
```

Let me emphasize this once more:

All ref props are just functions!

And those functions run after rendering, where it is totally fine to execute side effects. Maybe it would have been better if _ref_ would just be called _onAfterRender_ or something.

With that knowledge, what stops us from focussing the input right inside the callback ref, where we have direct access to the node?

focus-with-callback-ref

```
1<input2  ref={(node) => {3    node?.focus()4  }}5  defaultValue="Hello world"6/>
```

Well, a tiny detail does: React will run this function after _every_ render. So unless we are fine with focussing our input that often (which we are likely not), we have to tell React to only run this when we want to.

### useCallback to the rescue[](#usecallback-to-the-rescue)

Luckily, React uses referential stability to check if the callback ref should be run or not. That means if we pass the same ref(erence, pun intended) to it, execution will be skipped.

And that is where _useCallback_ comes in, because that is how we ensure a function is not needlessly created. Maybe that's why they are called callback-refs - because you have to wrap them in _useCallback_ all the time. 😂

Here's the final solution:

callback-ref-with-use-callback

```
1const ref = React.useCallback((node) => {2  node?.focus()3}, [])4
5return <input ref={ref} defaultValue="Hello world" />
```

Comparing this to the initial version, it's less code and only uses one hook instead of two. Also, it will work in all situations because the callback ref is bound to the lifecycle of the DOM node, not of the component that mounts it. Further, it will not execute twice in strict mode (when running in the development environment), which seems to be important to many.

And as shown in this [hidden gem in the (old) React docs](https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node), you can use it to run any sort of side effects, e.g. call _setState_ in it. I'll just leave the example here because it's actually pretty good:

measure-a-dom-node

```
1function MeasureExample() {2  const [height, setHeight] = React.useState(0)3
4  const measuredRef = React.useCallback(node => {5    if (node !== null) {6      setHeight(node.getBoundingClientRect().height)7    }8  }, [])9
10  return (11    <>12      <h1 ref={measuredRef}>Hello, world</h1>13      <h2>The above header is {Math.round(height)}px tall</h2>14    </>15  )16}
```

So please, if you need to interact with DOM nodes directly after they rendered, try not to jump to _useRef_ + _useEffect_ directly, but consider using _callback refs_ instead.

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)