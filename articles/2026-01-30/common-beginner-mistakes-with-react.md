---
title: "Common Beginner Mistakes with React"
source: "https://www.joshwcomeau.com/react/common-beginner-mistakes/"
publishedDate: "2023-03-06"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

A couple years ago, I was teaching React at a local coding bootcamp, and I noticed that there were a handful of things that kept catching students off guard. People kept falling into the same pits!

In this tutorial, we're going to explore 9 of the most common gotchas. You'll learn how to steer around them, and hopefully avoid a lot of frustration.

In order to keep this blog post light and breezy, we won't dig _too_ much into the reasons behind these gotchas. This is more of a quick reference.

## [Link to this heading](#evaluating-with-zero-1)Evaluating with zero

Alright, let's start with one of the most pervasive gotchas. I've seen this one “in the wild” on a handful of production apps!

Take a look at the following setup:

Code Playground

import React from 'react';
import ShoppingList from './ShoppingList';

function App() {
  const \[items, setItems\] = React.useState(\[\]);
  
  return (
    <div\>
      {items.length && <ShoppingList items\={items} />}
    </div\>
  );
}

export default App;

Our goal is to conditionally show a shopping list. If we have at least 1 item in the array, we should render a `ShoppingList` element. Otherwise, we shouldn't render anything.

And yet, we wind up with a random `0` in the UI!

This happens because `items.length` evaluates to `0`. And since 0 is a falsy value in JavaScript, the `&&` operator short-circuits, and the entire expression resolves to `0`.

It's effectively as if we had done this:

```
function App() {
  return (
    <div>
      {0}
    </div>
  );
}
```

Unlike other falsy values (`''`, `null`, `false`, etc), the number 0 is a valid value in JSX. After all, there are plenty of scenarios in which we really _do_ want to print the number `0`!

**How to fix it:** Our expression should use a “pure” boolean value (true/false):

```
function App() {
  const [items, setItems] = React.useState([]);

return (
    <div>
      {items.length > 0 && (
        <ShoppingList items={items} />
      )}
    </div>
  );
}
```

`items.length > 0` will always evaluate to either `true` or `false`, and so we'll never have any issues.

Alternatively, we can use a _ternary expression_:

```
function App() {
  const [items, setItems] = React.useState([]);

return (
    <div>
      {items.length
        ? <ShoppingList items={items} />
        : null}
    </div>
  );
}
```

Both options are perfectly valid, and it comes down to personal taste.

## [Link to this heading](#mutating-state-2)Mutating state

Let's keep working with our shopping list example. Suppose we have the ability to add new items:

Code Playground

import React from 'react';
import ShoppingList from './ShoppingList';
import NewItemForm from './NewItemForm';

function App() {
  const \[items, setItems\] = React.useState(\[
    'apple',
    'banana',
  \]);
  
  function handleAddItem(value) {
    items.push(value);
    setItems(items);
  }
  
  return (
    <div\>
      {items.length > 0 && <ShoppingList items\={items} />}
      <NewItemForm handleAddItem\={handleAddItem} />
    </div\>
  )
}

export default App;

The `handleAddItem` function is called whenever the user submits a new item. Unfortunately, it doesn't work! When we enter an item and submit the form, that item is not added to the shopping list.

**Here's the problem:** we're violating maybe the most sacred rule in React. We're mutating state.

Specifically, the problem is this line:

```
function handleAddItem(value) {
  items.push(value);
  setItems(items);
}
```

React relies on an state variable's _identity_ to tell when the state has changed. When we push an item into an array, we aren't changing that array's identity, and so React can't tell that the value has changed.

**How to fix it:** We need to create a brand new array. Here's how I'd do it:

```
function handleAddItem(value) {
  const nextItems = [...items, value];
  setItems(nextItems);
}
```

Instead of modifying an existing array, I'm creating a new one from scratch. It includes all of the same items (courtesy of the `...` [spread syntax](https://www.joshwcomeau.com/operator-lookup/?match=restspread)), as well as the newly-entered item.

The distinction here is between editing an existing item, versus creating a new one. When we pass a value to a state-setter function like `setCount`, it needs to be a new entity.

**The same thing is true for objects:**

```
// ❌ Mutates an existing object
function handleChangeEmail(nextEmail) {
  user.email = nextEmail;
  setUser(user);
}

// ✅ Creates a new object
function handleChangeEmail(email) {
  const nextUser = { ...user, email: nextEmail };
  setUser(nextUser);
}
```

Essentially, the `...` syntax is a way to copy/paste all of the stuff from an array/object into a brand new entity. This ensures that everything works properly.

## [Link to this heading](#not-generating-keys-3)Not generating keys

Here's a warning you've likely seen before:

Warning: Each child in a list should have a unique "key" prop.

The most common way for this to happen is when mapping over data. Here's an example of this violation:

Code Playground

Whenever we render an array of elements, we need to provide a bit of extra context to React, so that it can identify each item. Critically, this needs to be a _unique_ identifier.

Many online resources will suggest using the array index to solve this problem:

```
function ShoppingList({ items }) {
  return (
    <ul>
      {items.map((item, index) => {
        return (
          <li key={index}>{item}</li>
        );
      })}
    </ul>
  );
}
```

**I don't think this is good advice.** This approach will work _sometimes_, but it can cause some pretty big problems in other circumstances.

As you gain a deeper understanding of how React works, you'll be able to tell whether it's fine or not on a case-by-case basis, but honestly, I think it's easier to solve the problem in a way which is _always_ safe. That way, you never have to worry about it!

**Here's the plan:** Whenever a new item is added to the list, we'll generate a _unique ID_ for it:

```
function handleAddItem(value) {
  const nextItem = {
    id: crypto.randomUUID(),
    label: value,
  };

  const nextItems = [...items, nextItem];
  setItems(nextItems);
}
```

`crypto.randomUUID` is a method built into the browser (it's not a third-party package). It's available in [all major browsers(opens in new tab)](https://caniuse.com/mdn-api_crypto_randomuuid). It has nothing to do with cryptocurrencies.

This method generates a unique string, like `d9bb3c4c-0459-48b9-a94c-7ca3963f7bd0`.

By dynamically generating an ID whenever the user submits the form, we're _guaranteeing_ that each item in the shopping list has a unique ID.

Here's how we'd apply it as the key:

```
function ShoppingList({ items }) {
  return (
    <ul>
      {items.map((item, index) => {
        return (
          <li key={item.id}>
            {item.label}
          </li>
        );
      })}
    </ul>
  );
}
```

Importantly, we want to generate the ID **when the state is updated.** We _don't_ want to do this:

```
// ❌ This is a bad idea
<li key={crypto.randomUUID()}>
  {item.label}
</li>
```

Generating it in the JSX like this will cause the key to change on every render. Whenever the key changes, React will destroy and re-create these elements, which can have a big negative impact on performance.

This pattern — generating the key when the data is first created — can be applied to a wide range of situations. For example, here's how I'd create unique IDs when fetching data from a server:

```
const [data, setData] = React.useState(null);

async function retrieveData() {
  const res = await fetch('/api/data');
  const json = await res.json();

  // The moment we have the data, we generate
  // an ID for each item:
  const dataWithId = json.data.map(item => {
    return {
      ...item,
      id: crypto.randomUUID(),
    };
  });

  // Then we update the state with
  // this augmented data:
  setData(dataWithId);
}
```

## [Link to this heading](#missing-whitespace-4)Missing whitespace

Here's a dastardly gotcha I see _all the time_ on the web.

Code Playground

import React from 'react';

function App() {
  return (
    <p\>
      Welcome to Corpitech.com!
      <a href\="/login"\>Log in to continue</a\>
    </p\>
  );
}

export default App;

Notice that the two sentences are all smushed together:

![Annotated playground showing that there's a space missing between the two sentences](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fgotchas%2Fmissing-space.png%3Fv%3D2&w=1080&q=75)

This happens because the JSX compiler (the tool that turns the JSX we write into browser-friendly JavaScript) can't really distinguish between _grammatical_ whitespace, and the whitespace we add for indentation / code readability.

**How to fix it:** we need to add an explicit space character between the text and the anchor tag:

```
<p>
  Welcome to Corpitech.com!
  {' '}
  <a href="/login">Log in to continue</a>
</p>
```

**One little pro-tip:** if you use Prettier, it'll add these space characters for you automatically! Just be sure to let it do the formatting (don't pre-emptively split things onto multiple lines).

## [Link to this heading](#accessing-state-after-changing-it-5)Accessing state after changing it

This one catches _everyone_ off-guard at some point or other. When I taught at a local coding bootcamp, I lost track of the number of times people came to me with this issue.

Here's a minimal counter application: clicking on the button increments the count. See if you can spot the problem:

Code Playground

import React from 'react';

function App() {
  const \[count, setCount\] = React.useState(0);
  
  function handleClick() {
    setCount(count + 1);
    
    console.log({ count });
  }
  
  return (
    <button onClick\={handleClick}\>
      {count}
    </button\>
  );
}

export default App;

result

console

After incrementing the `count` state variable, we're logging the value to the console. Curiously, _it's logging the wrong value:_

![Annotated screenshot of the playground, showing how the button holds the number 1, but the console logs the number 0](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fgotchas%2Fmismatched-count-var.png&w=1920&q=75)

**Here's the problem:** state-setter function in React like `setCount` are _asynchronous_.

This is the problematic code:

```
function handleClick() {
  setCount(count + 1);
  console.log({ count });
}
```

It's easy to mistakenly believe that `setCount` functions like assignment, as though it was equivalent to doing this:

```
count = count + 1;
console.log({ count });
```

**This isn't how React is built though.** When we call `setCount`, we aren't re-assigning a variable. We're _scheduling an update._

It can take a while for us to fully wrap our heads around this idea, but here's something that might help it click: we _can't_ reassign the `count` variable, because it's a constant!

```
// Uses `const`, not `let`, and so it can't be reassigned
const [count, setCount] = React.useState(0);

count = count + 1; // Uncaught TypeError:
                   // Assignment to constant variable
```

**So how do we fix this?** Fortunately, we already know what this value should be. We need to capture it in a variable, so that we have access to it:

```
function handleClick() {
  const nextCount = count + 1;
  setCount(nextCount);

  // Use `nextCount` whenever we want
  // to reference the new value:
  console.log({ nextCount });
}
```

I like using the “next” prefix whenever I do stuff like this (`nextCount`, `nextItems`, `nextEmail`, etc). It makes it clearer to me that we're not updating the _current_ value, we're scheduling the _next_ value.

## [Link to this heading](#returning-multiple-elements-6)Returning multiple elements

Sometimes, a component needs to return _multiple_ top-level elements.

For example:

Code Playground

function LabeledInput({ id, label, ...delegated }) {
  return (
    <label htmlFor\={id}\>
      {label}
    </label\>
    <input
      id\={id}
      {...delegated}
    /\>

We want our `LabeledInput` component to return two elements: a `<label>` and an `<input>`. Frustratingly, we're getting an error:

Adjacent JSX elements must be wrapped in an enclosing tag.

This happens because JSX compiles to plain ol’ JavaScript. Here's what this code looks like when it hits the browser:

```
function LabeledInput({ id, label, ...delegated }) {
  return (
    React.createElement('label', { htmlFor: id }, label)
    React.createElement('input', { id: id, ...delegated })
  );
}
```

In JavaScript, we're not allowed to return multiple things like this. It's the same reason that this doesn't work:

```
function addTwoNumbers(a, b) {
  return (
    "the answer is"
    a + b
  );
}
```

**How do we fix it?** For a long time, the standard practice was to wrap both elements in a wrapper tag, like a `<div>`:

```
function LabeledInput({ id, label, ...delegated }) {
  return (
    <div>
      <label htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        {...delegated}
      />
    </div>
  );
}
```

By grouping our `<label>` and `<input>` in a `<div>`, we're only returning a single top-level element!

Here's what it looks like in plain JS:

```
function LabeledInput({ id, label, ...delegated }) {
  return React.createElement(
    'div',
    {},
    React.createElement('label', { htmlFor: id }, label),
    React.createElement('input', { id: id, ...delegated })
  );
}
```

JSX is a wonderful abstraction, but it can often obscure fundamental truths about JavaScript. I think it's often helpful to see how JSX is transformed into plain JS, to get a handle on what's actually happening.

With this new approach, we're returning a single element, and that element contains two children elements. Problem solved!

We can make this solution even better using _fragments_:

```
function LabeledInput({ id, label, ...delegated }) {
  return (
    <React.Fragment>
      <label htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        {...delegated}
      />
    </React.Fragment>
  );
}
```

`React.Fragment` is a React component that exists purely to solve this problem. It allows us to bundle up multiple top-level elements _without affecting the DOM_. This is great: it means we aren't polluting our markup with an unnecessary `<div>`.

It also has a convenient shorthand. We can write fragments like this:

```
function LabeledInput({ id, label, ...delegated }) {
  return (
    <>
      <label htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        {...delegated}
      />
    </>
  );
}
```

I like the symbolism here: the React team chose to use an empty HTML tag, `<>`, as a way of showing that fragments don't produce any real markup.

## [Link to this heading](#flipping-from-uncontrolled-to-controlled-7)Flipping from uncontrolled to controlled

Let's look at a typical form, binding an input to a piece of React state:

Code Playground

import React from 'react';

function App() {
  const \[email, setEmail\] = React.useState();
  
  return (
    <form\>
      <label htmlFor\="email-input"\>
        Email address
      </label\>
      <input
        id\="email-input"
        type\="email"
        value\={email}
        onChange\={event \=> setEmail(event.target.value)}
      />
    </form\>
  );
}

export default App;

result

console

If you start typing in this input, you'll notice a console warning:

Warning: A component is changing an uncontrolled input to be controlled.

**Here's how to fix it:** We need to initialize our `email` state to an empty string:

```
const [email, setEmail] = React.useState('');
```

When we set the `value` attribute, we tell React that we want this to be a _controlled_ input. That only works when we pass it a defined value, though! By initializing `email` to an empty string, we ensure that `value` is never being set to `undefined`.

## [Link to this heading](#missing-style-brackets-8)Missing style brackets

JSX is made to look and feel quite a lot like HTML, but there are some surprising differences between the two that tend to catch people offguard.

Most of the differences are well-documented, and the console warnings tend to be very descriptive and helpful. If you accidentally use `class` instead of `className`, for example, React will tell you exactly what the problem is.

But there's one subtle difference that tends to trip people up: **the `style` attribute.**

In HTML, `style` is written as a string:

```
<button style="color: red; font-size: 1.25rem">
  Hello World
</button>
```

In JSX, however, we need to specify it as an _object_, with camelCased property names.

Below, I've tried to do exactly this, but I wind up with an error. Can you spot the mistake?

Code Playground

import React from 'react';

function App() {
  return (
    <button
      style\={ color: 'red', fontSize: '1.25rem' }
    \>
      Hello World
    </button\>
  );
}

export default App;

The problem is that I need to use _double squigglies_, like this:

```
<button
  // "{{", instead of "{":
  style={{ color: 'red', fontSize: '1.25rem' }}
>
  Hello World
</button>
```

To understand why this is necessary, we need to dig into this syntax a bit.

In JSX, we use squiggly brackets to create an _expression slot_. We can put any valid JS expression in this slot. For example:

```
<button className={isPrimary ? 'btn primary' : 'btn'}>
```

Whatever we put between the `{}` will be evaluated as JavaScript, and the result will be set to this attribute. `className` will either be `'btn primary'` or `'btn'`.

With `style`, we first need to create an expression slot, _and then_ we want to pass a JavaScript object into this slot.

I think it's clearer if we pull the object out into a variable:

```
// 1. Create the style object:
const btnStyles = { color: 'red', fontSize: '1.25rem' };

// 2. Pass that object to the `style` attribute:
<button style={btnStyles}>
  Hello World
</button>

// Or, we can do it all in 1 step:
<button style={{ color: 'red', fontSize: '1.25rem' }}>
```

The outer set of squigglies creates an “expression slot” in the JSX. The inner set creates a JS object that holds our styles.

## [Link to this heading](#async-effect-function-9)Async effect function

Let's suppose we have a function which fetches some user data from our API on mount. We'll use the `useEffect` hook, and we want to use the `await` keyword.

Here's my first shot at it:

Code Playground

import React from 'react';
import { API } from './constants';

function UserProfile({ userId }) {
  const \[user, setUser\] = React.useState(null);
  
  React.useEffect(() \=> {
    const url = \`${API}/get-profile?id=${userId}\`;
    const res = await fetch(url);
    const json = await res.json();
    
    setUser(json.user);
  }, \[userId\]);
  
  if (!user) {
    return 'Loading…';
  }
  
  return (
    <section\>
      <dl\>
        <dt\>Name</dt\>
        <dd\>{user.name}</dd\>
        <dt\>Email</dt\>
        <dd\>{user.email}</dd\>
      </dl\>
    </section\>
  );
}

export default UserProfile;

Unfortunately, we get an error:

'await' is only allowed within async functions

Alright, that's no problem. Let's update the effect callback to be an async function, by prefixing it with the `async` keyword:

```
React.useEffect(async () => {
  const url = `${API}/get-profile?id=${userId}`;
  const res = await fetch(url);
  const json = await res.json();

  setUser(json);
}, [userId]);
```

Unfortunately, this doesn't work either; we get a cryptic error message:

destroy is not a function

**Here's the fix:** We need to create a separate async function _within_ our effect:

```
React.useEffect(() => {
  // Create an async function...
  async function runEffect() {
    const url = `${API}/get-profile?id=${userId}`;
    const res = await fetch(url);
    const json = await res.json();

    setUser(json);
  }

  // ...and then invoke it:
  runEffect();
}, [userId]);
```

To understand why this workaround is necessary, it's worth considering what the `async` keyword actually does.

For example, what would you guess this function returns?

```
async function greeting() {
  return "Hello world!";
}
```

At first glance, it seems obvious: it returns the string `"Hello world!"`! But actually, this function returns a _promise_. That promise _resolves_ to the string `"Hello world!"`.

This is a problem, because the `useEffect` hook isn't expecting us to return a promise! It expects us to return either nothing (like we are above), or a _cleanup function_.

Cleanup functions are well beyond the scope of this tutorial, but they're incredibly important. Most of our effects will have some sort of teardown logic, and we need to provide it to React ASAP, so that React can invoke it when the dependencies change, or the component unmounts.

With our "separate async function" strategy, we're still able to return a cleanup function right away:

```
React.useEffect(() => {
  async function runEffect() {
    // Effect logic here
  }
  runEffect();

  return () => {
    // Cleanup logic here
  }
}, [userId]);
```

You can name this function whatever you like, but I like the generic name `runEffect`. It makes clear that it holds the primary effect logic.

## [Link to this heading](#developing-an-intuition-10)Developing an intuition

At first glance, a lot of the fixes we've seen in this tutorial seem pretty arbitrary. Why, exactly, do we need to provide a unique key? How come we can't access state after changing it? And why on earth is `useEffect` so dang finicky?!

React has always been pretty tricky to become _truly_ comfortable with, and it's especially true nowadays with hooks. It takes a while for everything to _click._

I started using React back in 2015, and I remember thinking: “This is friggin’ cool, but I have no idea how this works.” 😅

Since then, I've been building my mental model of React one puzzle piece at a time. I've had a series of epiphanies, and each time, my mental model has become more sturdy, more robust. I began to understand _why_ React works the way it does.

I found I didn't have to keep memorizing arbitrary rules; instead, I could rely on my intuition. It's hard to overstate how much more _fun_ React became for me!

For the past two years, I've been developing an interactive self-paced online course called [**The Joy of React**](https://www.joyofreact.com/). It's a beginner-friendly course with one goal: to help you build your intuition of how React works, so that you can use it to build rich, dynamic web applications.

[![Visit the “Joy of React” homepage](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fjoy-of-react.png&w=3840&q=75)](https://www.joyofreact.com/)

My courses aren't like other courses; you won't sit and watch me code for hours and hours. The Joy of React mixes lots of different media types: there are videos, sure, but there are also interactive articles, challenging exercises, real-world-inspired projects, and even a mini-game or two.

You can learn more about the course, and discover the joy of building with React:

-   [The Joy of React(opens in new tab)](https://www.joyofreact.com/)
    

### Last updated on

December 3rd, 2025