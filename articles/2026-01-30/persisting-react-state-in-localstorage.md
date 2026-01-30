---
title: "Persisting React State in localStorage"
source: "https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/"
publishedDate: "2020-02-25"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

Let's say we're building a calendar app, like Google Calendar. The app lets you toggle between three different displays: month, week, and day.

Toggling between views in a typical calendar application

Personally, I always want to see the "Week" view. It gives me everything I need to know about the current day, while also giving me a peek at what's coming up in the next couple of days.And the “month” view is absolutely overwhelming, I have no idea why it exists.

Thankfully, calendar apps know that users have strong preferences around this kind of thing, and the toggle is _“sticky”_. If I switch from “week” to “month” and refresh the page, the “month” view is the new default; it sticks.

Conversely, it's **super annoying** when form controls aren't sticky. For example: every month, I create 4-5 expenses through Expensify. Every single time, I have to swap the default currency from USD to CAD. Why can't it remember that I'm Canadian??

In this tutorial we'll see how we can create a _custom React hook_ to abstract away the "stickiness", so we get it for free whenever we need it.

## [Link to this heading](#show-me-the-code-1)Show me the code

Here's what our custom hook looks like:

```
function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);

    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

To show how it works, here's a quick counter demo with a sticky count. Try clicking it a few times, and then refresh this page. Notice that the “Current count” value is preserved:

Code Playground

import React from 'react';

function useStickyState(defaultValue, name) {
  const \[value, setValue\] = React.useState(() \=> {
    if (
      typeof window === 'undefined' ||
      !window.localStorage
    ) {
      return defaultValue;
    }

    const persistedValue =
      window.localStorage.getItem(name);

    return persistedValue !== null
      ? JSON.parse(persistedValue)
      : defaultValue;
  });

  React.useEffect(() \=> {
    window.localStorage.setItem(
      name,
      JSON.stringify(value)
    );
  }, \[name, value\]);

  return \[value, setValue\];
}

function App() {
  const \[count, setCount\] = useStickyState(
    0,
    'count'
  );

  return (
    <div className\="App"\>
      <h1\>Counter</h1\>
      <p\>Current count: {count}</p\>
      <button onClick\={() \=> setCount(count + 1)}\>
        Increment
      </button\>
    </div\>
  );
}

export default App;

If this code isn't clear to you, fear not! The rest of this tutorial explains it in greater detail 💫

### [Link to this heading](#in-practice-2)In practice

This hook makes a single assumption, which is reasonably safe in React apps: the value powering a form input is held in React state.

Here's a non-sticky implementation of a form control to switch between values:

```
const CalendarView = () => {
  const [mode, setMode] = React.useState('day');

  return (
    <>
      <select onChange={ev => setMode(ev.target.value)}>
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
      </select>

      {/* Calendar stuff here */}
    </>
  )
}
```

We can use our new "sticky" variant by swapping out the hook:

```
const CalendarView = () => {
  const [mode, setMode] = useStickyState('day', 'calendar-view');

  // Everything else unchanged
}
```

While the `useState` hook only takes 1 argument—the initial value—our `useStickyState` hook takes two arguments. The second argument is the key that will be used to get and set the value persisted in localStorage. The label you give it has to be unique, but it otherwise doesn't matter what it is.

## [Link to this heading](#how-it-works-3)How it works

Fundamentally, this hook is a wrapper around `useState`. It just does some other stuff too.

### [Link to this heading](#lazy-initialization-4)Lazy initialization

First, it takes advantage of [lazy initialization(opens in new tab)](https://reactjs.org/docs/hooks-reference.html#lazy-initial-state). This lets us pass a function to `useState` instead of a value, and that function will only be executed the first time the component renders, when the state is created.

```
const [value, setValue] = React.useState(() => {
  const stickyValue =
    window.localStorage.getItem(key);

  return stickyValue !== null
    ? JSON.parse(stickyValue)
    : defaultValue;
});
```

In our case, we're using it to check for the value in localStorage. If the value exists, we'll use that as our initial value. Otherwise, we'll use the default value passed to the hook ("day", in our earlier example).

### [Link to this heading](#keeping-localstorage-in-sync-5)Keeping localStorage in sync

The final step to this is to make sure that we update localStorage whenever the state value changes. For that, our trusty friend `useEffect` comes in handy:

```
React.useEffect(() => {
  window.localStorage.setItem(name, JSON.stringify(value));
}, [name, value]);
```

## [Link to this heading](#wrapping-up-6)Wrapping up

This hook is a small but powerful example of how custom hooks let us invent our own APIs for things. While [packages(opens in new tab)](https://www.npmjs.com/package/use-persisted-state) [exist(opens in new tab)](https://github.com/kripod/react-hooks) that solve this problem for us, I think there's a lot of value in seeing how to solve these problems ourselves 🧙🏻‍♂️

Special thanks to Satyajit Sahoo for a couple refactor suggestions 🌠

### Last updated on

February 24th, 2020