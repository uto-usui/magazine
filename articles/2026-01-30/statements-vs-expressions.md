---
title: "Statements Vs. Expressions"
source: "https://www.joshwcomeau.com/javascript/statements-vs-expressions/"
publishedDate: "2022-07-11"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

So, a few years ago, I was teaching web development at a local coding bootcamp, and a student asked me this question:

> What's the difference between a “statement” and an “expression” in JavaScript?

I felt like I knew the answer to this question, but when I tried to explain it, I couldn't put it into words. I had a _feeling_ about it, but my actual knowledge was surprisingly hazy.

There's nothing more humbling than teaching 😅. Students have a knack for identifying the "fuzzy spots" in our understanding.

I've since come to realize that this question is _supremely_ important. It's a load-bearing concrete pillar that will help support a ton of JavaScript knowledge.

This is _especially_ true for React developers. Most of those JSX rules you've had to memorize, and always forget to follow, are the result of this statement/expression duality.

In this blog post, I'm going to share some of the epiphanies I've had about this distinction, and how we can use this information in our day-to-day work.

## [Link to this heading](#expressions-1)Expressions

At its core, an expression is a bit of JavaScript code that produces a value.

For example, these are all expressions:

-   `1` — produces `1`
    
-   `"hello"` — produces `"hello"`
    
-   `5 * 10` — produces `50`
    
-   `num > 100` — produces either `true` or `false`
    
-   `isHappy ? "🙂" : "🙁"` — produces an emoji
    
-   `[1, 2, 3].pop()` — produces the number `3`
    

Expressions can contain expressions. For example, how many expressions do you count in this chunk of JS code? Make a guess, and then _drag the slider_ to see them each highlighted:

Highlighted Expression:—

## [Link to this heading](#statements-2)Statements

A JavaScript program is a sequence of statements. Each statement is an instruction for the computer to do something.

Here are some examples of statements in JavaScript:

```
let hi = 5;
```

```
if (hi > 10) {
  // More statements here
}
```

```
throw new Error('Something exploded!');
```

Here's how I like to think about this: statements are the rigid structure that holds our program together, while expressions fill in the details.

Statements often have "slots" for expressions. We can put any expression we like into those slots.

For example, declaring a variable has an expression slot:

```
let hi = /* some expression */;
```

We can use _any of the expressions_ we saw earlier in that slot:

```
let hi = 1;
let hi = "hello";
let hi = 5 * 10;
let hi = num > 100;
let hi = isHappy ? "🙂" : "🙁";
let hi = [1, 2, 3].pop();
```

In terms of valid syntax, expressions are _interchangeable_. If a statement has an expression slot, we can put **any** expression there, and the code will run. We won't get a syntax error.

_That said,_ we can still run into other issues. For example, the following code is syntactically valid, but we'll crash the browser tab if we try to run it, since it causes an infinite loop:

```
while ("hello") {
  // Because “hello” never changes, this loop will
  // run over and over until the script crashes.
  // Syntactically valid, but still problematic.
}
```

### [Link to this heading](#a-handy-trick-3)A handy trick

Want to know whether a chunk of JS is an expression or a statement? Try to log it out!

```
console.log(/* Some chunk of JS here */);
```

If it runs, the code is an _expression_. If you get an error, it's a _statement_ (or, possibly, invalid JS).

As a bonus, we can even see what the expression resolves to, since it'll be printed in the browser console!

This works because **all function arguments must be expressions.** Expressions produce a value, and that value will be passed into the function. Statements don't produce a value, and so they can't be used as function arguments.

Even as an experienced developer, I rely a _ton_ on `console.log`. It's a wonderfully versatile tool!

## [Link to this heading](#expressions-as-statements-4)Expressions as statements

Here is an expression: `1 + 2 + 3`.

What happens if we create a JS file that includes only this expression? Let's imagine we save the following content as `test.js`:

```
1 + 2 + 3
```

How many statements does this file have? Zero or one?

Here's the deal: expressions can't exist on their own. They're _always_ part of a statement. And so in this case, we have a statement that looks like this:

```
/* expression slot */;
```

The statement is essentially empty aside from its expression slot. Our expression `1 + 2 + 3` fills this slot, and our statement is complete.

In other words, all of the following lines are valid statements:

```
// Statement 1:
let hi = /* expression slot */;

// Statement 2:
return /* expression slot */;

// Statement 3:
if (/* expression slot */) { }

// Statement 4:
/* expression slot */;
```

Often, tutorials will falsely state that expressions are statements, but this isn't quite right. Expressions and statements are distinct things. But it's possible for a statement to wrap around an expression without providing any additional characters. **Think of it like wrapping a sandwich in clear shrink wrap.**

Statements typically end in a semi-colon, which marks the end of the statement. The semi-colon isn't necessary for certain statements, like `if` statements, `while` loops, and function declarations.

## [Link to this heading](#practical-implications-in-react-5)Practical implications in React

If you've worked with React before, you're probably aware that squiggly brackets (`{` and `}`) allow us to embed bits of JavaScript within our JSX, like this:

```
function CountdownClock({ secondsRemaining }) {
  return (
    <div>
      Time left:
      {Math.round(secondsRemaining / 60)} minutes!
    </div>
  );
}
```

This is part of what makes React so magical; we have the full power of JavaScript available to us.

But there's a catch — we can't put _any_ JavaScript inside the curly brackets. Specifically, we can only include _expressions_, not statements. The squiggly brackets essentially **create an expression slot within our JSX.**

If we try to embed a _statement_ here, like an if/else statement, we'll get an error:

```
function CountdownClock({ secondsRemaining }) {
  return (
    // 🚫 Throws a SyntaxError
    <div>
      {if (secondsRemaining > 0) {
        `${secondsRemaining} seconds left`
      } else {
        "Time expired!"
      }}
    </div>
  );
}
```

This blows up because statements don't produce a value, only _expressions_ produce a value. If we want to embed if/else logic in our JSX, we need to use a [ternary operator](https://www.joshwcomeau.com/operator-lookup/?match=ternary) expression:

```
function CountdownClock({ secondsRemaining }) {
  return (
    // ✅ No problemo
    <div>
      {secondsRemaining > 0
        ? `${secondsRemaining} seconds left`
        : "Time expired!"
      }
    </div>
  );
}
```

This might seem like a weird JSX/React limitation, but **it's actually a JavaScript limitation.**

I think we often blame React for seemingly arbitrary rules, like how components must return a single top-level element. But more often than not, React is just warning us about a _JavaScript_ limitation.

Understanding the difference between statements and expressions is an important first step towards demystifying a whole category of React warnings and bugs. We also need to learn about how JSX compiles into JavaScript, and how React's reconciliation and render cycle works… but, alas, those topics are beyond the scope of this blog post!

Incidentally, I just released a comprehensive React course, the resource I wish existed when I was learning React. It's called [The Joy of React(opens in new tab)](https://www.joyofreact.com/). It'll help you build a robust, rock-solid intuition of React, and we'll have a lot of fun along the way. 😄

[![Visit the “Joy of React” homepage](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fjoy-of-react.png&w=3840&q=75)](https://www.joyofreact.com/)

## [Link to this heading](#in-summary-6)In summary

A JavaScript program consists of a sequence of statements. Each statement is an instruction to do something, like create a variable, run an if/else condition, or start a loop.

Expressions produce a value, and these values are slotted into statements, like a Super Nintendo cartridge that changes what the Super Nintendo does.

Expressions are _always_ part of a statement, even if that statement is otherwise empty. For example, the code below runs a loop _without_ using a `for` statement, but it still includes an “empty wrapper” statement:

```
data.forEach(item => console.log(item));
```

It can take a while for this distinction to become intuitive, but hopefully this blog post has clarified a few things!

### Last updated on

August 22nd, 2025