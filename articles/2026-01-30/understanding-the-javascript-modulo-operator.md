---
title: "Understanding the JavaScript Modulo Operator"
source: "https://www.joshwcomeau.com/javascript/modulo-operator/"
publishedDate: "2023-09-18"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

When I was first learning to code, I remember finding the Modulo operator (%) _extremely_ confusing. 😬

If you don't understand what it's doing, the values it produces seem completely random:

```
const what = 10 % 4; // 2
const the = 10 % 10; // 0
const heck = 4 % 10; // 4
```

In this blog post, we're going to learn how this operator works by refining our mental model for division. We'll also cover a practical, every-day use case for this curious fella.

### [Link to this heading](#rethinking-division-1)Rethinking division

Suppose we have the following bit of arithmetic:

```
12 ÷ 4
```

Division can often feel pretty abstract or theoretical, but there's a practical way to think about it: we want to divide a number into equally-sized groups.

**Drag the slider to see how this operation can be visualized:**

Number of Groups:1

12 ÷ 1 = 12

`12 ÷ 4` evaluates to `3`, because each group holds exactly 3 items. Essentially, we're figuring out how many items will be held inside each group.

In the example widget above, our dividend (the number to be divided) is 12. 12 is a _remarkably_ clean number when it comes to division; it can be split neatly in lots of different ways.

Suppose we had the following equation instead:

```
11 ÷ 4
```

This equation evaluates to `2.75`. Each group has 2 complete items, and then ¾ths of another item.

This works if we're dividing up pizzas or cakes… **but what if the items are indestructible?** What if we _can't_ break each item up into smaller fractions?

In that case, we'd be able to fit 2 items into each group, and we'd be left with 3 additional items:

Number of Groups:4

Remainder Area

11 ÷ 4 = 2 (and 3 leftover)

**This is known as the _remainder_.** It's what the modulo operator produces.

In cases where the number can be equally divided into groups (eg. `12 ÷ 4`), there is nothing left over:

```
12 % 4; // 0
```

In situations where the dividend (the number to be divided) _can't_ be split equally into groups, the modulo operator lets us know how much is left over:

```
11 % 4; // 3
```

### [Link to this heading](#a-real-world-use-case-2)A real-world use case

So, I'm not a mathematician, I'm a web developer. All of this math stuff is interesting, but let's talk about how the modulo operator can come in handy on the web.

Specifically, there's one sort of problem that I seem to run into a lot, where the modulo operator offers the perfect solution: _circular arrays._

For example, suppose we have an array of 3 colors. Each second, we want to switch to the next color in the list. When we reach the end of the list, we want to jump back to the first item:

-   red
    
-   yellow
    
-   blue
    

Time Elapsed

0

This is a surprisingly tricky problem. Suppose we have a variable called `timeElapsed` that starts at 0 and increments by 1 every second; we have to somehow map this ever-increasing value to an array with only 3 items.

Essentially, we need to write a function that produces the following results:

```
const COLORS = ['red', 'yellow', 'blue'];

getColor({ timeElapsed: 0 }); // 'red'
getColor({ timeElapsed: 1 }); // 'yellow'
getColor({ timeElapsed: 2 }); // 'blue'
getColor({ timeElapsed: 3 }); // 'red'
getColor({ timeElapsed: 4 }); // 'yellow'
getColor({ timeElapsed: 5 }); // 'blue'
getColor({ timeElapsed: 6 }); // 'red'
getColor({ timeElapsed: 7 }); // 'yellow'
getColor({ timeElapsed: 8 }); // 'blue'
// ...And so on, forever
```

Let's look at how the modulo operator can help us solve this problem:

```
const COLORS = ['red', 'yellow', 'blue'];

function getColor({ timeElapsed }) {
  const colorIndex = timeElapsed % COLORS.length;

  return COLORS[colorIndex];
}
```

Miraculously, this does exactly what we need! This method will always return one of the 3 colors, as long as `timeElapsed` is an integer. And it'll cycle through the 3 colors as `timeElapsed` increases.

`COLORS.length` is equal to `3`, since there are 3 colors in our array. And so, as `timeElapsed` increments from 0 to 8, this function winds up performing the following sequence of calculations:

```
const colorIndex = 0 % 3; // 0
const colorIndex = 1 % 3; // 1
const colorIndex = 2 % 3; // 2
const colorIndex = 3 % 3; // 0
const colorIndex = 4 % 3; // 1
const colorIndex = 5 % 3; // 2
const colorIndex = 6 % 3; // 0
const colorIndex = 7 % 3; // 1
const colorIndex = 8 % 3; // 2
```

We can then use this `colorIndex` to look up the color from the `COLORS` array. It's guaranteed to always cycle within the range of available indexes for that array.

To understand why this works, it's worth remembering our new model for division: we're trying to divide `timeElapsed` into 3 equally-sized groups, without any fractional or decimal values. The remainder will always be either 0, 1, or 2. It will never be 3+, because if there _was_ 3 left, we could fit 1 more in each group!

Essentially, it's as if we had the ability to create a “circular” array. No matter how large our underlying `timeElapsed` value grows, we can have it cycle indefinitely through the colors in the `COLORS` array.

In my opinion, this trick alone makes the modulo operator worth learning! I've used this circular-array trick dozens of times over the years, and it's just one of several practical use cases for this handy operator.

## [Link to this heading](#a-sneaky-surprise-3)A sneaky surprise

So, I have a confession to make… This blog post wasn't originally meant for this blog. 😮

For the past two years, I've been working on the ultimate educational resource for React. It's called [The Joy of React(opens in new tab)](https://www.joyofreact.com/).

In that course, one of the projects is to build an interactive MDX-based blog, just like my real blog! **And in that project, we build this very blog post, interactive widgets and all!**

[

![Screenshot of this blog post on an entirely separate blog, titled “Bits & Bytes”](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fmodulo-operator%2Fbits-and-bytes.png&w=3840&q=75)

](https://www.final-project.blog/javascript-modulo-operator)

You'll learn how to build performant full-stack web applications with Next.js, using all the latest-and-greatest features (the App Router, React Server Components, etc). You'll create the complex layout animations in this post, using Framer Motion. And, most importantly, you'll build a rock-solid intuition for React, so that you can build _your own_ projects from scratch.

_The Joy of React_ is distributed exclusively through my own custom course platform. It's not like other online courses, where you sit and watch me code. My platform encourages experimentation and play. You'll learn by doing.

We start at the very beginning, and move through the gnarliest parts of working with React. You'll learn the “happy practices” that I've settled on after more than 10 years of professional React experience. You'll learn about advanced full-stack React techniques, like Suspense and Streaming Server Side Rendering. All 100% up-to-date.

[![Visit the “Joy of React” homepage](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fjoy-of-react.png&w=3840&q=75)](https://www.joyofreact.com/)

You can learn more about the course, and discover the joy of building with React:

### Last updated on

July 24th, 2025