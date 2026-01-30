---
title: "Snappy UI Optimization with useDeferredValue"
source: "https://www.joshwcomeau.com/react/use-deferred-value/"
publishedDate: "2024-05-13"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

Over the years, React has given us a number of tools for optimizing the performance of our applications. One of the most powerful hidden gems is `useDeferredValue`. It can have a _tremendous_ impact on user experience in certain situations! ⚡

I recently used this hook to fix a gnarly performance issue on this blog, and it sorta blew my mind. The improvement on low-end devices felt illegal, like black magic.

`useDeferredValue` has a bit of an intimidating reputation, and it _is_ a pretty sophisticated tool, but it isn’t too scary with the right mental model. In this tutorial, I’ll show you exactly how it works, and how you can use it to dramatically improve the performance of your applications.

## [Link to this heading](#the-problem-1)The problem

A couple of years ago, I released [Shadow Palette Generator](https://www.joshwcomeau.com/shadow-palette/), a tool for generating realistic shadows:

By experimenting with sliders and other controls, you can design your own set of shadows. The CSS code is provided for you to copy/paste it into your own application.

**Here’s the problem:** the controls in this UI are designed to provide _immediate_ feedback; as the user slides the “Oomph” slider, for example, they see the effect of that change right away. This means that the UI is re-rendered _dozens of times a second_ while one of these inputs is being dragged.

Now, React is fast, and most of this UI is pretty easy to update. The problem is the _syntax-highlighted code snippet_ at the bottom:

![Screenshot of the code output from the above video, showing 4 declared CSS variables, fully syntax-highlighted](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fuse-deferred-value%2Fcss-snippet.png&w=1200&q=75)

Syntax highlighting is a surprisingly complex operation. First, the raw code has to be “tokenized”, a process which splits the code into a set of labeled pieces. Each token can be given a different color, and so each token needs to be wrapped in its own `<span>`.

Here’s the amount of markup required for a _single line_ from this snippet:

![screenshot of the developer tools, showing a <div> with 24 <span> elements, each with two classes and occasionally some inline styles.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fuse-deferred-value%2Fsingle-line-of-code.png&w=1920&q=75)

Without any optimizations, we’re asking React to re-calculate all of this markup _dozens of times per second._ On most devices, the browser just won’t be able to do this quickly enough, and things will get pretty choppy:

The `change` events are firing up to 60 times per second, but the UI can only process a handful of updates per second. The result is a UI that feels janky and unresponsive.

**It’s an interesting problem:** the most important part of this UI is the set of figures on the left showing what the shadows look like. We want this part to update _immediately_ in response to the user’s tweaks, so that they can understand the effect of their changes. We also want the controls themselves to feel snappy and responsive.

The code snippet, on the other hand, doesn’t _really_ need to be updated dozens of times a second; the user only cares about the code at the end, when they’re ready to copy it over to their application. By recalculating it on every change, the entire user experience is degraded.

Put another way, this UI has high-priority and low-priority areas:

![The same “Shadow Palette Generator” UI but with boxes drawn on top. The shadow output on the left and the controls are labeled “high priority”, while the code output in the bottom right is labeled “low priority”.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fuse-deferred-value%2Fhigh-vs-low-priority.png&w=1920&q=75)

We want the high-priority stuff to update in real-time, as quickly as possible. But the low-priority stuff should be put on the back burner.

### [Link to this heading](#an-imperfect-solution-2)An imperfect solution

My original solution to this problem used a technique known as “throttling”. Essentially, I restricted this component so that it could only re-render once every 200 milliseconds.

Here’s what this looked like:

Notice that the _code snippet_ updates much less frequently than the other parts of the UI? It will only update every 200 milliseconds, 5 times per second, while the rest of the UI can re-render as often as necessary.

This is _better_, but it's far from a perfect solution.

It still feels a bit laggy / janky; users won’t understand that we’re intentionally slowing down part of the UI!

More importantly, people use a wide variety of devices, from super-powerful modern computers to ancient low-end Android phones. If the user’s device is fast enough, the throttle is unnecessary, and we’re just slowing things down for no reason. On the other hand, if the device is really slow, 200ms might not be sufficient, and the important parts of the UI will still get janked up.

This is exactly the sort of problem that `useDeferredValue` can help with.

## [Link to this heading](#introducing-usedeferredvalue-3)Introducing useDeferredValue

`useDeferredValue` is a React hook that allows us to split our UI into high-priority and low-priority areas. It works by allowing React to interrupt itself when something important happens.

**To help us understand how this works, let’s start with a simpler example.** Consider this code:

```
function App() {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <ImportantStuff count={count} />
      <SlowStuff count={count} />

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}
```

Our piece of state is `count`, a number which can be incremented by clicking a button. `ImportantStuff` represents our high-priority part of the UI. We want this to update right away, whenever `count` changes. `SlowStuff` represents the less-important part of the UI.

Whenever the user clicks the button to increment `count`, React has to re-render _both_ of these child components before the UI can be updated.

**Let’s analyze this.** Click the button below to see this render in action:

count

1

1

20

40

60

80

100

The UI in this demo is a video, showing a recorded interaction. **You can scrub through this timeline to see exactly what the UI looked like at any moment in time.** Notice that the render starts when the button is clicked, but the UI doesn’t update until the render has completed.

This render represents the entire chunk of work that React has to do, rendering both `ImportantStuff` and `SlowStuff`. **Click/tap this render snapshot to peek inside:**

In this hypothetical example, `ImportantStuff` renders super quickly. The bulk of the time is spent rendering `SlowStuff`.

If the user clicks the button too quickly, our renders will “pile up”, since React isn't able to finish the job before the next update happens. This leads to janky UI:

count

1

count

2

count

3

1

20

40

60

80

100

120

140

Before that first render (`count: 1`) has finished, the user clicks the button again, setting `count` to `2`. React abandons that render and starts a new one with the correct value for `count`. The UI only gets updated when a render successfully completes.

Now, given all that context, let’s see how `useDeferredValue` helps us solve this problem.

Here’s the code:

```
function App() {
  const [count, setCount] = React.useState(0);
  const deferredCount = React.useDeferredValue(count);

  return (
    <>
      <ImportantStuff count={count} />
      <SlowStuff count={deferredCount} />

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}
```

For the initial render, `count` and `deferredCount` are the exact same value (`0`). When the user clicks the “Increment” button, though, something interesting happens:

count

1

dCount

0

count

1

dCount

1

1

20

40

60

80

100

Each render now shows the value for `count` as well as the deferred value we pass to `<SlowStuff>`. If there isn’t enough space to include their labels, the timeline instead shows `count` and `deferredCount` separated by a line.

Alright, let’s unpack this. When the `count` state changes, the `App` component re-renders immediately. `count` is now equal to `1`, but interestingly, `deferredCount` hasn’t changed. It still resolves to the previous value of `0`.

This means that `SlowStuff` receives the _exact same props_ that it did in the previous render. If it’s been memoized with `React.memo()`, it won’t bother re-rendering, since React already knows what would be produced. It’s able to re-use the stuff from the first render.

Right after that render finishes, a _second_ re-render is started, except now, `deferredCount` has been updated to match `count`’s value of `1`. This means that `SlowStuff` _will_ re-render this time. When all is said and done, the UI has been fully updated.

**Why go through all that song and dance??** You might be thinking that this seems unnecessarily complicated, that it's a lot of work to wind up in the same place as before.

**Here’s why this is so clever:** If React gets interrupted by another state change, _the important stuff has already been updated_. React can abandon the less-important second render, and start work immediately on the more-important part.

This is hard to describe in words, but hopefully this recording will make it clearer:

count

1

dCount

0

count

1

dCount

1

count

2

dCount

0

count

2

dCount

2

count

3

dCount

0

count

3

dCount

3

1

20

40

60

80

100

120

140

Like we saw earlier, the user is clicking too fast for React to finish updating everything in time. _But,_ because each re-render is split into high-priority and low-priority parts, React is still able to update the important part of the UI between clicks. When those extra clicks happen, React abandons its work-in-progress, but that’s fine since that work was low-priority.

_This is tricky business._ If you’re feeling a bit overwhelmed, the next section should help, as we explore the underlying mechanism that allows this to work.

### [Link to this heading](#gotcha-memoization-required-4)Gotcha: memoization required

An important thing to note: `useDeferredValue` only works when the slow / low-priority component has been wrapped with `React.memo()`:

```
import React from 'react';

function SlowComponent({ count }) {
  // Component stuff here
}

export default React.memo(SlowComponent);
```

`React.memo()` instructs React to _only re-render this component when its props/state changes_. Without `React.memo()`, `SlowComponent` would re-render whenever its parent component re-renders, regardless of whether the `count` prop has changed or not.

**This is a really important thing to understand, so let’s go over it in a bit more depth.** As a reminder, this is the relevant code:

```
function App() {
  const [count, setCount] = React.useState(0);
  const deferredCount = React.useDeferredValue(count);

  return (
    <>
      <ImportantStuff count={count} />
      <SlowStuff count={deferredCount} />

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}
```

When the user clicks the button for the first time, the `count` state will increment from `0` to `1`. The `App` component will re-render, but the `useDeferredValue` hook will re-use the _previous_ value. `deferredCount` will be assigned to `0`, not `1`.

The default behaviour in React is for _all_ child components to be re-rendered, regardless of whether their props have changed or not. Without `React.memo()`, both `ImportantStuff` and `SlowStuff` would re-render, and we wouldn't get any benefit from `useDeferredValue`.

When we wrap `SlowStuff` with `React.memo()`, React will check to see if a re-render is actually necessary by comparing the current props with the previous ones. And since `deferredCount` is still `0`, React says “Ok, nothing new here. This chunk of the UI doesn’t have to be recalculated”.

**This was the lightbulb moment for me.** `useDeferredValue` allows us to postpone rendering the low-priority parts of our UI, pushing that work down the road like a really boring homework assignment. Eventually, that work will be done, and the UI will be fully updated. But it's on the back burner; whenever the state changes, React abandons that work and focuses on the more important stuff.

### [Link to this heading](#gotcha-working-with-multiple-state-variables-5)Gotcha: Working with multiple state variables

So, we’ve seen how `useDeferredValue` works with a single primitive value like `count`. But things in the real world are rarely so simple.

In my “Shadow Palette Generator”, I have _several_ pieces of relevant state:

```
function ShadowPaletteGenerator() {
  const [oomph, setOomph] = React.useState(0.5);
  const [crispy, setCrispy] = React.useState(0.5);
  const [background, setBackground] = React.useState('#F00')
  const [tint, setTint] = React.useState(true);
  const [resolution, setResolution] = React.useState(0.75);
  const [lightPosition, setLightPosition] = React.useState({
    x: -0.2,
    y: -0.5,
  });

  const cssCode = generateShadows(oomph, crispy, background, tint, resolution, lightPosition);

  return (
    <>
      {/* Other stuff omitted for brevity */}

      <CodeSnippet lang="css" code={cssCode} />
    </>
  );
}
```

My initial thought was that I'd need to create a deferred value for each one:

```
const deferredOomph = React.useDeferredValue(oomph);
const deferredCrispy = React.useDeferredValue(crispy);
const deferredBg = React.useDeferredValue(background);
const deferredTint = React.useDeferredValue(tint);
const deferredResolution = React.useDeferredValue(resolution);
const deferredLight = React.useDeferredValue(lightPosition);
```

I _could_ do this, but there’s a simpler option. I can defer the _derived_ value, the chunk of CSS code generated within the render:

```
const [oomph, setOomph] = React.useState(0.5);
const [crispy, setCrispy] = React.useState(0.5);
const [background, setBackground] = React.useState('#F00')
const [tint, setTint] = React.useState(true);
const [resolution, setResolution] = React.useState(0.75);
const [lightPosition, setLightPosition] = React.useState({
  x: -0.2,
  y: -0.5,
});

const cssCode = generateShadows(oomph, crispy, backgroundColor, tint, resolution, lightPosition);

const deferredCssCode = React.useDeferredValue(cssCode);

return (
  <>
    {/* Other stuff omitted for brevity */}

    <CodeSnippet lang="css" code={deferredCssCode} />
  </>
);
```

The hook is called `useDeferredValue`, not `useDeferredState`. There’s no rule that says the value has to be a state variable!

This is why it’s so important to understand the underlying mechanism here. The critical thing is that our low-priority component (`CodeSnippet` in this case) doesn’t receive new values for any of its props during the high-priority render.

### [Link to this heading](#loading-indications-6)Loading indications

In some cases, we might want to make it clear to the user when parts of the UI are stale, so that they know that a re-calculation is in progress.

For example, maybe we could do something like this:

While `<SlowStuff>` is out of date, we make it semi-transparent and include a little spinner. That way, the user knows that this part of the UI is recalculating.

**But hm, how can we tell whether part of the UI is stale or not?** It turns out that we already have all the tools we need for this!

Here’s the code:

```
function App() {
  const [count, setCount] = React.useState(0);
  const deferredCount = React.useDeferredValue(count);

  const isBusyRecalculating = count !== deferredCount;

  return (
    <>
      <ImportantStuff count={count} />
      <SlowWrapper
        style={{ opacity: isBusyRecalculating ? 0.5 : 1 }}
      >
        <SlowStuff count={deferredCount} />

        {isBusyRecalculating && <Spinner />}
      </SlowWrapper>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}
```

We can tell whether the UI is stale or not by comparing `count` and `deferredCount`.

When I first saw this, I thought it was suspiciously simple. But when I really thought about it, it made sense:

-   During the first high-priority render, `deferredCount` reuses the previous value. `count` gets updated to `1`, but `deferredCount` is still `0`. The values are different.
    
-   During the low-priority render that follows, `deferredCount` is updated to the current value, `1`. Both `count` and `deferredCount` point to the same value.
    

The same mechanism that allows us to skip rendering `<SlowStuff>` on the first render also allows us to tell that the UI isn't fully in sync yet. Pretty cool, right?

Now, whether we actually _want_ to do this is another matter. I tested it out on my Shadow Palette Generator:

Personally, I don’t think that this is an improvement in this case. It draws the user’s attention to the code snippet when it _should_ stay fixed on the shadow figures.

Depending on the context, though, this could be a really useful way to make sure users know that part of the UI is stale!

### [Link to this heading](#speeding-up-the-initial-render-7)Speeding up the initial render

A couple of weeks ago, React 19 entered beta. This upcoming major version is tweaking a _bunch_ of stuff, and `useDeferredValue` is getting a nice new lil’ superpower!

Before React 19, `useDeferredValue` would get initialized to the supplied value:

```
function App() {
  const [count, setCount] = React.useState(0);
  const deferredCount = React.useDeferredValue(count);

  // On the initial render:
  console.log(deferredCount); // 0
  console.log(count === deferredCount); // true
}
```

React doesn’t do the "double render" thing we’ve been talking about because React doesn’t _have_ a previous value it can use. And so, effectively, `useDeferredValue` has no effect for the first render.

Starting in React 19, we can specify an initial value:

```
const deferredCount = React.useDeferredValue(count, initialValue);
```

**Why would we want to do this??** This pattern will allow us to potentially speed up the initial render.

For example, in our Shadow Palette Generator example, I could do something like this:

```
const cssCode = generateShadows(oomph, crispy, backgroundColor, tint, resolution, lightPosition);

const deferredCssCode = React.useDeferredValue(
  cssCode,
  null
);

return (
  <>
    {/* Other stuff omitted for brevity */}

    {deferredCssCode !== null && (
      <CodeSnippet lang="css" code={deferredCssCode} />
    )}
  </>
);
```

During the quick high-priority render, `deferredCssCode` will be `null`, and so we won’t even render `<CodeSnippet>`. Immediately after that quick render, however, this component automatically re-renders, filling in that slot with the code.

This should allow the application as a whole to become responsive more quickly, since we don’t have to wait for less-important parts of the UI.

## [Link to this heading](#a-world-of-difference-8)A world of difference

Alright, so with the `useDeferredValue` hook in place, check out what the end result looks like:

_So good!_ Everything is butter smooth. 💯

But hang on, I'm testing this on a high-end MacBook Pro. What is the experience like on a lower-end device?

A few years ago, I went into my local computer store and asked to buy the cheapest new Windows laptop they had. They dug up a US$110 Intel Celeron Acer laptop. Here’s how it runs on this machine, with `useDeferredValue` implemented:

It’s not as smooth, but for a machine that struggles to open its own _Start_ menu, this is pretty great! Notice that the code snippet doesn’t update until I've finished interacting with the controls. `useDeferredValue` is helping us _a ton_ here.

Like so much in React, `useDeferredValue` seems really complex unless you have the right mental model. Over the years, React has become a very sophisticated tool, and if we want to use it effectively, we need to develop an intuition for how it works.

I spent nearly two years creating the _ultimate_ resource for learning React. It's called [The Joy of React(opens in new tab)](https://www.joyofreact.com/). It covers everything I’ve learned after nearly a decade of professional React experience.

If you found this blog post helpful, you’ll get _so much_ out of my course. The course is optimized for “lightbulb moments”, building a robust mental model for how React works, and how you can use it to build rich, dynamic web applications.

[![Visit the “Joy of React” homepage](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fjoy-of-react.png&w=3840&q=75)](https://www.joyofreact.com/)

Visit [The Joy of React(opens in new tab)](https://www.joyofreact.com/) to learn more!

Thanks so much for reading! 💖

### Last updated on

December 3rd, 2025