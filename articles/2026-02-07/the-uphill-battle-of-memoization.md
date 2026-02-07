---
title: "The Uphill Battle of Memoization"
source: "https://tkdodo.eu/blog/the-uphill-battle-of-memoization"
publishedDate: "2023-09-30"
category: "frontend"
feedName: "TkDodo"
---

![a steep way to the top of a mountain](https://tkdodo.eu/blog/static/b68409c532c3a42b3c194c245bb5b553/1bed9/uphill.png "a steep way to the top of a mountain")

-   **#1: The Uphill Battle of Memoization**
-   [#2: The Useless useCallback](https://tkdodo.eu/blog/the-useless-use-callback)

-   [한국어](https://velog.io/@cnsrn1874/the-uphill-battle-of-memoization)
-   [Português (Brasil)](https://dev.to/oaraujocesar/a-ardua-batalha-da-memoizacao-3nja)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

* * *

There's lots of good content out there already about what you should do before you reach for [React.memo](https://react.dev/reference/react/memo). Dan's post [before you memo](https://overreacted.io/before-you-memo/) and Kent's [simple trick to optimize React re-renders](https://kentcdodds.com/blog/optimize-react-re-renders) are both great reads.

The idea is to let component composition solve the problem for you, either by moving state down or lifting content up. This is brilliant because component composition is React's natural mental model. As Dan points out, this will also work well with Server Components, which are now a reality.

What's missing from most of the articles I've read is the why. Yes, composition is great, but what's the problem with using `React.memo`? Why isn't it just as good as a first choice?

So, here's my take on it:

Memo is too easy to break

To recap: When react renders a component tree, it will do so top-down, for all children. Once a render has started, there is no way for us to stop it. Mostly, that's a good thing, because renders make sure that we see a correct reflection of our state on the screen. Also, renders are usually fast.

Then of course there are those edge cases where they aren't. We all have some components that don't render as fast as we wish they would, for some reason we can't easily change. Luckily, React can still "abort" renders, and it will do that if it sees "the same thing". That's what makes techniques like lifting content up work in the first place:

lift-content-up

```
1function App() {2  return (3    <ColorPicker>4      <p>Hello, world!</p>5      <ExpensiveTree />6    </ColorPicker>7  )8}9
10function ColorPicker({ children }) {11  const [color, setColor] = React.useState('red')12  return (13    <div style={{ color }}>14      <input15        value={color}16        onChange={(event) => setColor(event.target.value)}17      />18      {children}19    </div>20  )21}
```

If `children` are always the exact same references, React can short-circuit the render. Even if `color` changes, the `ExpensiveTree` will not re-render with it.

The alternative solution would be to keep rendering everything from within the same component, but slap a `React.memo` around the `ExpensiveTree` component:

react-memo

```
1function App() {2  const [color, setColor] = useState('red')3  return (4    <div style={{ color }}>5      <input6        value={color}7        onChange={(event) => setColor(event.target.value)}8      />9      <p>Hello, world!</p>10      <ExpensiveTree />11    </div>12  )13}14
15function ExpensiveComponent() {16  return <div>I'm expensive!</div>17}18
19const ExpensiveTree = React.memo(ExpensiveComponent)
```

If we wrap a component with `React.memo`, React will skip rendering that component (and its children) if its props are unchanged. This will certainly achieve the same result as changing the component composition, but it's a lot easier to break in the future.

When a component is memoized, React will compare each prop with [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is). If they haven't changed, re-rending can be skipped. This works fine in our current example, because our component actually has no props. It will also work with primitive values as props, but it's not so great with functions, objects and arrays.

Let's make an innocent looking change to our `ExpensiveComponent` - adding a `style` prop:

style

```
1function ExpensiveComponent({ style }) {2  return <div style={style}>I'm expensive!</div>3}4
5const ExpensiveTree = React.memo(ExpensiveComponent)
```

This is usually how components evolve over time - props get added. The thing is - consumers of the `ExpensiveTree` component don't necessarily know that it is memoized. After all, this is just a performance optimization and an implementation detail.

If we now add an inline style prop when rendering our `ExpensiveTree` component:

inline-style

```
1<ExpensiveTree style={{ backgroundColor: 'blue' }} />
```

we've inadvertently ruined the memoization, because the `style` prop will be a new object on every render. For React, it looks like props have changed, so it cannot skip rendering.

Okay, sure, we can fix this by wrapping the `style` prop in `React.useMemo`:

useMemo

```
1function App() {2  const memoizedStyle = React.useMemo(3    () => ({ backgroundColor: 'blue' }),4    []5  )6
7  return <ExpensiveTree style={memoizedStyle} />8}
```

This is possible in our simple case, but imagine how our code would look if we have more props that need memoization. It will make our code harder to reason about, and there's no guarantee that consumers will actually do that memoization.

It further becomes a lot harder when `style` itself comes in as a prop to the component rendering the `ExpensiveTree`:

style-prop

```
1function App({ style }) {2  const memoizedStyle = React.useMemo(() => style, [style])3
4  return <ExpensiveTree style={memoizedStyle} />5}
```

This memoization doesn't really achieve anything. We don't know if `style` will be passed as an inline object to `App`, so memoizing it here is pointless. We'd need to create a stable reference at the call-side of `App`.

## {children}[](#children)

What's worse - this isn't the only way how our perf improvement can break. Another gotcha is that memoized components won't work as you might expect if they accept `children`:

```
1function App() {2  return (3    <ExpensiveTree>4      <p>Hello, world!</p>5    </ExpensiveTree>6  )7}8
9function ExpensiveComponent({ children }) {10  return (11    <div>12      I'm expensive!13      {children}14    </div>15  )16}17
18const ExpensiveTree = React.memo(ExpensiveComponent)
```

Oof, I have to admit - I didn't know for a long time that this will break memoization. Why would it? I'm always passing the same, stable `<p>` tag as children, right? Well, not really. JSX is just syntactic sugar for `React.createElement`, which will create a new object on every render. So, even though the `<p>` tag looks like it's the same to us, it won't be the same reference.

We can surely wrap the children we're passing the memoized component into `useMemo` too, but I hope you're realizing by now that we're fighting an uphill battle that's hardly winnable. The next person might just come and pass an empty object or array as fallback value to a prop on our memoized component, and we're back to square one:

fallback-value

```
1//💥 why can't we have nice things 😭2<ExpensiveTree someProp={someStableArray ?? []} />
```

## The alternative[](#the-alternative)

So using `React.memo` is a bit of a minefield, and choosing one of the proposed alternatives seems way better to me. But sometimes, we seemingly can't avoid memoizing a component. Let's take a look at the example I've seen on twitter that sparked the idea for this blogpost:

[

![Avatar for housecor](https://tkdodo.eu/blog/static/8ced62210867cdc226803c2f87975ed9/d6138/housecor.png)

Cory House

@

housecor

I rarely need to do React performance optimizations.

But we have a page with 5 big tables and a summary bar. When one table changes, everything renders. It's slow.

Solution:

1\. I wrapped each table in memo.  
2\. I wrapped the functions passed down in useCallback.

MUCH faster.

\-

Sep 28, 2023



](https://x.com/housecor/status/1707358107532210193)

Here, I'd expect the component tree to look something like this (I'm using two tables instead of five for brevity):

tables

```
1function App() {2  const [state, setState] = React.useState({3    table1Data: [],4    table2Data: [],5  })6
7  return (8    <div>9      <Table1 data={state.table1Data} />10      <Table2 data={state.table2Data} />11      <SummaryBar12        data={calculateSummary(state.table1Data, state.table2Data)}13      />14    </div>15  )16}
```

`state` holds the data of both tables, and the `SummaryBar` needs access to all of it. We can't move state down into the tables, and we also can't compose the components in a different way. It seems that memoization is our only option.

### Don't start rendering[](#dont-start-rendering)

Remember when I said that once a render started, we have no way of stopping it? That's still true, but what if we'd stop the render from starting in the first place ... 🤔

If `state` wouldn't live at the top of the `App`, we wouldn't need to re-render the whole tree whenever it changes. But where could it live instead? We've already established that we can't move it down - so let's put it to the side - outside of React.

This is precisely what most state management solutions do. They store the state outside of React and surgically trigger re-renders of the parts of the component tree that need to know about changes. If you've used [React Query](https://tanstack.com/query/latest/docs/react/overview) before - that's exactly what's happening there as well. Without that technique, you'd see way more re-renders than you'd like to.

So yes, my proposed alternative solution is to bring in an effective state manager. I'm gonna use [zustand](https://zustand.surge.sh/) because it's the one I'm most familiar with:

zustand

```
1const useTableStore = create((set) => ({2  table1Data: [],3  table2Data: [],4  actions: {...}5}))6
7export const useTable1Data = () =>8  useTableStore((state) => state.table1Data)9export const useTable2Data = () =>10  useTableStore((state) => state.table2Data)11export const useSummaryData = () =>12  useTableStore((state) =>13    calculateSummary(state.table1Data, state.table2Data)14  )
```

Now every component can subscribe internally to the state it is interested in, avoiding any top-down renders. If `table2Data` updates, `Table1` won't re-render. This is as effective as memoizing the tables, but won't suffer from the pitfalls where adding new props can negatively impact performance.

## A way out[](#a-way-out)

Granted, all solutions we have here are not great. Memoizing in general makes our code harder to read, and it's easy to get wrong, which makes it the worst option for me. Using external state managers is a bit better - you might have that dependency in your App anyway. Adapting the way you compose components is still the best option, but it's not always possible.

What would really be a way out is if we'd change the rules of the game. [Records and Tuples](https://github.com/tc39/proposal-record-tuple), an ECMAScript proposal that's in stage 2 for quite some time, would help us with arrays and objects, but not for functions. [Sebastien Lorber](https://twitter.com/sebastienlorber) has a [great read](https://sebastienlorber.com/records-and-tuples-for-react) on that.

The React team has also hinted that they are working on a compiler called [React Forget](https://www.youtube.com/watch?v=lGEMwh32soc), which will supposedly memoize everything for us automatically. With that in place, we could get the perf optimizations of `React.memo` without the error surface.

* * *

That's it for today. Feel free to reach out to me on [bluesky 🦋](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)