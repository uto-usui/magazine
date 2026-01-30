---
title: "The World of CSS Transforms"
source: "https://www.joshwcomeau.com/css/transforms/"
publishedDate: "2021-08-09"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

Like so many things in CSS, the `transform` property is surprisingly remarkable.

At first glance, it may seem like a pretty niche thing. How often do we need to rotate or skew something, after all? And yet, the more I learn about `transform`, the more I find myself taking advantage of it. In my blog's codebase, I've used the `transform` property _more than 800 times_!

In this blog post, we're diving deep into the `transform` property. I'll show you some of the cool and unexpected things you can do with it!

## [Link to this heading](#transform-functions-1)Transform functions

The `transform` property can do a _whole bunch_ of different things, through the use of transform functions like `translate` and `skew`.

Let's look at each in turn.

### [Link to this heading](#translation-2)Translation

Translation allows us to move an item around:

`transform: translate(0px, 0px);`

x:0px

y:0px

We can use `translate` to shift an item along in either axis: `x` moves side to side, `y` moves up and down. Positive values move down and to the right. Negative values move up and to the left.

Critically, _the item's in-flow position doesn't change_. As far as our layout algorithms are concerned, from Flow to Flexbox to Grid, this property has no effect.

For example: in this visualization, we have 3 children aligned using Flexbox. When we apply a transform to the middle child, the Flexbox algorithm doesn't notice, and keeps the other children in the same place:

`transform: translate(0px, 0px);`

x:0px

y:0px

This is similar to how `top` / `left` / `right` / `bottom` work in positioned layout, with relatively-positioned elements.

When we want to move an element along a single axis, we can use `translateX` and `translateY`:

```
.box {
  transform: translateY(20px);

  /* It's equivalent to: */
  transform: translate(0px, 20px);
}
```

There's one thing that makes `translate` ridiculously powerful, though. Something _totally unique_ in the CSS language.

When we use a percentage value in `translate`, that percentage refers to _the element's own size_, not the available space within the parent container.

For example:

`transform: translate(0%, 0%);`

x:0%

y:0%

Setting `transform: translateY(-100%)` moves the box up by its exact height, no matter what that height is, to the pixel.

This is incredibly handy when we want an element to sit _just_ outside another one:

Code Playground

Code editor:

Result

A common usecase for this trick is to add a "close" button just outside a dialog box:

Code Playground

Code editor:

Result

With the magic of `calc`, we can even mix relative and absolute units:

`transform: translateX(calc(0% + 0px));`

Percentage:0%

Pixels:0px

This allows us to add a "buffer", so that we can translate something by its own size _plus_ a few extra pixels.

### [Link to this heading](#scale-3)Scale

Alright, let's look at another transform function!

`scale` allows us to grow or shrink an element:

`transform: scale(1);`

Ratio:1

Scale uses a unitless value that represents a _multiple_, similar to `line-height`. `scale(2)` means that the element should be 2x as big as it would normally be.

We can also pass multiple values, to scale the `x` and `y` axis independently:

`transform: scale(1, 1);`

x:1

y:1

At first glance, this might seem equivalent to setting `width` and `height`, but there's one big difference.

Check out what happens when our element has some text in it:

Hello World

`transform: scale(1);`

Ratio:1

The text scales up and down with the element. We aren't just transforming the size and shape of the box, we're transforming the _entire element_ and all of its descendants.

It may seem like a bummer that `scale` will stretch/squash the element's contents, but we can actually use this effect to our advantage. For example, check out this old-timey TV power animation:

![Old-timey black-and-white video, showing people walking in a city](https://www.joshwcomeau.com/images/transforms/old-time.gif)

`transform: scale(1, 1);   filter: brightness(100%);`

Power status:

OnOff

For this animation, the squashing effect actually improves the effect!

And, if we _really_ don't want our text to squash, we can apply an _inverse transform_ to the child.

This is an advanced technique, far beyond the scope of this blog post, but know that it's possible to use `scale` to increase an element's size _without_ distorting its children. Libraries like [Framer Motion(opens in new tab)](https://www.framer.com/motion/) take advantage of this fact to build highly-performant animations without stretching or squashing.

### [Link to this heading](#rotate-4)Rotate

You guessed it: `rotate` will rotate our elements:

`transform: rotate(0deg);`

Rotation:0deg

We typically use the `deg` unit for rotation, short for degrees. But there's another handy unit we can use, one which might be easier to reason about:

`transform: rotate(0turn);`

Rotation:0turn

The `turn` unit represents how many turns the element should make. 1 turn is equal to 360 degrees.

It's obscure, but well-supported; the `turn` unit goes all the way back to IE 9!

### [Link to this heading](#skew-5)Skew

Finally, `skew` is a seldom-used but pretty-neat transformation:

Hello World

`transform: skew(0deg);`

Skew:0deg

As with `translate`, we can skew along either axis:

Hello World

`transform: skewX(0deg);`

Rotation:0deg

Axis:

XY

Skew can be useful for creating diagonal decorative elements (à la [Stripe(opens in new tab)](https://stripe.com/)). With the help of `calc` and some trigonometry, it can also be used on elements without distorting the text! This technique is explored in depth in Nils Binder's awesome blog post, “[Create Diagonal Layouts Like It's 2020(opens in new tab)](https://9elements.com/blog/pure-css-diagonal-layouts/)”.

## [Link to this heading](#transform-origin-6)Transform origin

Every element has an _origin_, the anchor that the transform functions execute from.

Check out how rotation changes when we tweak the transform origin:

`transform: rotate(0deg);   transform-origin: center;`

Rotation:0deg

Transform Origin:

center (default)

Show Origin:

truefalse

The transform origin acts as a pivot point!

It isn't exclusive to rotation, either; here's how it affects scale:

`transform: scale(1);   transform-origin: center;`

Scale:1

Transform Origin:

center (default)

Show Origin:

truefalse

This is useful for certain kinds of effects (for example, an element "growing out of" another one).

## [Link to this heading](#combining-multiple-operations-7)Combining multiple operations

We can string together multiple transform functions by space-separating them:

`transform: translateX(0px) rotate(0deg);`

x:0px

Rotation:0deg

**The order is important:** the transform functions will be applied sequentially. Check out what happens if we _reverse_ the order:

`transform: rotate(0deg) translateX(0px);`

Rotation:0deg

x:0px

The transform functions are applied from right to left, like composition in functional programming.

In the first demo, we rotate the element in its natural position, and then translate it along the X axis.

In this second demo, however, we translate the element first. When we apply the rotation, it rotates _around its origin_, which hasn't changed.

Here's the same demo, but with the origin shown:

`transform: rotate(0deg) translateX(0px);   transform-origin: center;`

Rotation:0deg

x:0px

Transform Origin:

center (default)

We can use this to our advantage:

Code Playground

Code editor:

Result

In this example, we start by positioning the moon in the dead center of the planet. Our animation will shift it 80px to the right, and then cause it to rotate in a circle. Because the moon's origin is still in the center of the planet, it orbits around at a distance.

Try changing `80px` in the from/to blocks to see how it affects the animation!

## [Link to this heading](#inline-elements-8)Inline elements

One common gotcha with transforms is that they don't work with inline elements in Flow layout.

Code Playground

Code editor:

Result

Inline elements don't enjoy being jostled. Their goal is to wrap around some content with as little disruption as possible. Transforms aren't their cup of tea.

The easiest fix is to switch it to use `display: inline-block`, or to use a different layout mode (eg. Flexbox or Grid).

## [Link to this heading](#the-third-dimension-9)The third dimension

In addition to the 2D transforms we've covered in this tutorial, CSS can transform elements in a third dimension!

3D transforms have their own quirks and idiosyncracies. In order to do them justice, I'll be writing a separate post all about 3D transforms. Stay tuned!

## [Link to this heading](#going-deeper-10)Going deeper

I have a confession to make: this tutorial wasn't originally written as a blog post. It's been ported over from my recent CSS course:

[![Screenshot of this lesson within a course platform, showing a list of related lessons.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Ftransforms%2Fcourse.png&w=1200&q=75)](https://css-for-js.dev/)

[CSS for JavaScript Developers(opens in new tab)](https://css-for-js.dev/) is a comprehensive multi-format course with the goal of transforming your relationship with CSS.

The course is specifically created for folks who work with a JS framework like React or Angular or Vue. We cover the fundamentals of CSS, but within the context of the modern JS ecosystem.

It goes _way deeper_ than my blog posts. There are over 150 videos, in addition to dozens of exercises and projects.

I've been working on it full-time for over a year now. Almost 5000 people purchased it in an early crowdfunding round, and their feedback has made the course _so much better._

Learn more here: [css-for-js.dev(opens in new tab)](https://css-for-js.dev/).

### Last updated on

January 6th, 2025