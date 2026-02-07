---
title: "useState vs useReducer"
source: "https://tkdodo.eu/blog/use-state-vs-use-reducer"
publishedDate: "2021-09-26"
category: "frontend"
feedName: "TkDodo"
---

![usestate vs usereducer](https://tkdodo.eu/blog/static/4b9244e41524bf53a06f77265d5061df/bbe0c/usestate-vs-usereducer.jpg "usestate vs usereducer")

**Last Update: 2022-04-23**

* * *

-   [#1: Don't over useState](https://tkdodo.eu/blog/dont-over-use-state)
-   [#2: Putting props to useState](https://tkdodo.eu/blog/putting-props-to-use-state)
-   [#3: Things to know about useState](https://tkdodo.eu/blog/things-to-know-about-use-state)
-   [#4: useState for one-time initializations](https://tkdodo.eu/blog/use-state-for-one-time-initializations)
-   **#5: useState vs. useReducer**

-   [한국어](https://www.philly.im/blog/use-state-vs-use-reducer)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

The question about which state management solution to use might be just as old as React itself (or maybe even older), and answers to it are manifold. To me, there is only one good answer, and it's the same answer I will give to every seemingly complex question:

> It depends.

— TkDodo

It depends on the type of state. It depends on update frequency. It depends on scoping.

If you know me, you know I have strong preferences on what to do with [server state](https://tkdodo.eu/blog/react-query-as-a-state-manager). So lets keep that out of the picture and look at everything that's left:

## Client State[](#client-state)

Before hooks, there was only one way of managing client state locally: in class-based components with _this.setState_. The state had to be an object, and the update function accepted a partial version of it.

Hooks changed that in a fundamental way. Not only could you now also manage state in functional components, you got two different ways of doing so with _useState_ and _useReducer_.

I think the way most people approached the switch from class based state management to hooks was to split up the object and go towards a single _useState_ for each field:

Before:

class-based-set-state

```
1class Names extends React.Component {2  state = {3    firstName: '',4    lastName: '',5  }6
7  render() {8    return (9      <div>10        <input11          value={this.state.firstName}12          onChange={(event) =>13            this.setState({ firstName: event.target.value })14          }15        />16        <input17          value={this.state.lastName}18          onChange={(event) =>19            this.setState({ lastName: event.target.value })20          }21        />22      </div>23    )24  }25}
```

After:

separate-use-states

```
1const Names = () => {2  const [firstName, setFirstName] = React.useState('')3  const [lastName, setLastName] = React.useState('')4
5  return (6    <div>7      <input8        value={firstName}9        onChange={(event) => setFirstName(event.target.value)}10      />11      <input12        value={lastName}13        onChange={(event) => setLastName(event.target.value)}14      />15    </div>16  )17}
```

This is pretty much the textbook example, and the split makes a lot of sense here. The two fields are pretty self-sufficient as they update on their own.

But this isn't always the case. Sometimes, you might have state that actually updates together. In those situations, I don't think it makes sense to split it up into multiple useStates.

One example that comes to mind is storing mouse coordinates (x/y). Using two _useStates_ seems super weird for something that always updates together, so I would use a single state object here:

single-state-object

```
1const App = () => {2  const [{ x, y }, setCoordinates] = React.useState({ x: 0, y: 0 })3
4  return (5    <button6      onClick={(event) => {7        setCoordinates({ x: event.screenX, y: event.screenY })8      }}9    >10      Click, {x} {y}11    </button>12  )13}
```

## Form state[](#form-state)

I think a single useState object also works fine for a simple generic form, where the structure might be different each time you're using it, and you only want to update one field at the time. You can't really have multiple _useStates_ for that, so a rudimentary custom hook implementation could look something like this:

use-form

```
1const useForm = <State extends Record<string, unknown>>(2  initialState: State3) => {4  const [values, setValues] = React.useState(initialState)5  const update = <Key extends keyof State>(name: Key, value: State[Key]) =>6    setValues((form) => ({ ...form, [name]: value }))7
8  return [values, update] as const9}
```

So, for _useState_, to decide if I want to split state up or not, I go by the following rule:

State that updates together should live together.

## Batching[](#batching)

Consider using a single state object over calling multiple _useState_ setters in a row. React is very good at batching those state updates together in synchronous event handlers, but still struggles with batching in async functions. This will get better with [Automatic Batching in React 18](https://github.com/reactwg/react-18/discussions/21), but structuring your code in a way so that you can reason about what state belongs together will help with readability and maintainability in the long run, regardless of performance concerns.

## useReducer[](#usereducer)

I believe [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) is still heavily underused. The main thinking around _useReducer_ seems to be that you only need it for "complex state". As I've written previously, it's pretty good for [toggling state](https://tkdodo.eu/blog/things-to-know-about-use-state#bonus2-toggling-state-with-usereducer):

toggle-with-use-reducer

```
1const [value, toggleValue] = React.useReducer(previous => !previous, true)2
3<button onClick={toggleValue}>Toggle</button>
```

It's also an often used way to implement _forceUpdate_ (which almost every global state manager needs to inform subscribers about state changes if that state is kept outside of React):

force-update-with-use-reducer

```
1const forceUpdate = React.useReducer((state) => state + 1, 0)[1]
```

​Update: React 18 provides the [useSyncExternalStore](https://reactjs.org/docs/hooks-reference.html#usesyncexternalstore) hook, so libraries are moving away from _forceUpdate_.

None of these implementations are particularly complex, and I think it really shows the flexibility of _useReducer_. That being said, it also shines when you update multiple parts of your state from different "actions", e.g. when implementing a multi-step wizard. You might want to initialize the second step depending on data chosen in the first step, or you might want to discard data of the third step when going back to the second.

All these dependencies between parts of your state would need you to call _setState_ multiple times in a row when you have independent _useStates_ (one for each step), and it would also get quite messy if you'd had a single state object.

### useReducer tips[](#usereducer-tips)

When I'm using _useReducer_, I try to adhere to the [redux style guide](https://redux.js.org/style-guide/style-guide). It's a great writeup that I can totally recommend, and most of the points also translate very well to _useReducer_, for example:

-   [Do Not Mutate State](https://redux.js.org/style-guide/style-guide#do-not-mutate-state)
-   [Reducers Must Not Have Side Effects](https://redux.js.org/style-guide/style-guide#reducers-must-not-have-side-effects)
-   [Model Actions as Events, not Setters](https://redux.js.org/style-guide/style-guide#model-actions-as-events-not-setters)

#### event driven reducers[](#event-driven-reducers)

Working immutably and not having side effects in reducers are things that most people will adhere to automatically, because it's in line with what react itself needs you do.

Modelling actions as events is something that I really want to emphasize on, because it's one of the biggest advantages of reducers. By doing so, you can keep all your application logic _inside_ the reducer instead of spread around various parts of the ui. This will not only make it easier to reason about state transitions, it will also make your logic super easy to test (really, pure functions are the easiest to test).

To illustrate the concept, let's have a quick look at the standard _counter_ example:

event-driven-reducer

```
1const reducer = (state, action) => {2  // ✅ ui only dispatches events, logic is in the reducer3  switch (action) {4    case 'increment':5      return state + 16    case 'decrement':7      return state - 18  }9}10
11function App() {12  const [count, dispatch] = React.useReducer(reducer, 0)13
14  return (15    <div>16      Count: {count}17      <button onClick={() => dispatch('increment')}>Increment</button>18      <button onClick={() => dispatch('decrement')}>Decrement</button>19    </div>20  )21}
```

The logic is not very sophisticated (adding 1 or subtracting 1), but it's still _logic_. We can extend that to allow an upper / lower bound, or customize the amount of numbers to increase / decrease with each click.

All of that would happen _inside_ the reducer. Compare that to an example where the reducer is "dumb" and just accepts the new number:

🚨-dumb-reducer

```
1const reducer = (state, action) => {2  switch (action.type) {3    // 🚨 dumb reducer that doesn't do anything, logic is in the ui4    case 'set':5      return action.value6  }7}8
9function App() {10  const [count, dispatch] = React.useReducer(reducer, 0)11
12  return (13    <div>14      Count: {count}15      <button onClick={() => dispatch({ type: 'set', value: count + 1 })}>16        Increment17      </button>18      <button onClick={() => dispatch({ type: 'set', value: count - 1 })}>19        Decrement20      </button>21    </div>22  )23}
```

This works the same, but is not as extensible as the previous example. So generally speaking, try to avoid actions that have _set_ in their name.

#### passing props to reducers[](#passing-props-to-reducers)

Another great trait of reducers is that you can inline them, or close over props. This comes in very handy if you need access to props or server state (e.g. coming from a [useQuery](https://react-query.tanstack.com/) hook) _inside_ your reducer. Instead of "copying" these things into the reducer by using the state initializer, you can pass it to a function:

reducer-with-props

```
1const reducer = (data) => (state, action) => {2  // ✅ you'll always have access to the latest3  // server state in here4}5
6function App() {7  const { data } = useQuery(key, queryFn)8  const [state, dispatch] = React.useReducer(reducer(data))9}
```

This goes very well with the concept of [separating server and client state](https://tkdodo.eu/blog/practical-react-query#keep-server-and-client-state-separate), and it actually wouldn't work at all if you'd pass _data_ as _initialValue_, because when the reducer first runs, _data_ will be _undefined_ (as we still need to fetch it first).

So you'd wind up creating effects that try to sync the state into the reducer, which can get you in all sorts of troubles with background updates.

Extending our event driven counter example where we fetch an _amount_ parameter from an endpoint would work pretty well with this approach. And of course, I'd use a custom hook for that:

use-counter-state

```
1const reducer = (amount) => (state, action) => {2  switch (action) {3    case 'increment':4      return state + amount5    case 'decrement':6      return state - amount7  }8}9
10const useCounterState = () => {11  const { data } = useQuery({ queryKey: ['amount'], queryFn: fetchAmount })12  return React.useReducer(reducer(data ?? 1), 0)13}14
15function App() {16  const [count, dispatch] = useCounterState()17
18  return (19    <div>20      Count: {count}21      <button onClick={() => dispatch('increment')}>Increment</button>22      <button onClick={() => dispatch('decrement')}>Decrement</button>23    </div>24  )25}
```

Note how we didn't need to change anything in the ui at all because of the clear separation provided by the custom hook. 🎉

## Rule of thumb[](#rule-of-thumb)

In summary, my rule of thumb of when to use what would be:

-   if state updates independently - separate _useStates_
-   for state that updates together, or only one field at a time updates - a single _useState_ object
-   for state where user interactions update different parts of the state - _useReducer_

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)