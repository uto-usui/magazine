---
title: "An Interactive Guide to Keyframe Animations"
source: "https://www.joshwcomeau.com/animation/keyframe-animations/"
publishedDate: "2021-08-31"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

CSS keyframe animations are _awesome_. They're one of the most powerful, versatile tools in CSS, and we can use them for all sorts of nifty things.

But they're also often misunderstood. They're a bit quirky, and if you don't understand those quirks, using them can be quite frustrating.

In this tutorial, we're diving deep into CSS keyframes. We'll figure out how they work, and see how to build some pretty swanky animations with them. ✨

## [Link to this heading](#syntax-1)Syntax

The main idea with a CSS keyframe animation is that it'll interpolate between different chunks of CSS.

For example, here we define a keyframe animation that will smoothly ramp an element's horizontal position from `-100%` to `0%`:

```
@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}
```

Each `@keyframes` statement needs a name! In this case, we've chosen to name it `slide-in`. You can think of this like a global variable.If you're using vanilla CSS, you'll need to take care that you don't reuse the same name! Thankfully, modern tooling can auto-generate unique names for us to solve this problem.

Keyframe animations are meant to be general and reusable. We can apply them to specific selectors with the `animation` property:

(To re-run the animation, refresh the “Result” pane by clicking the    icon.)

As with the `transition` property, `animation` requires a duration. Here we've said that the animation should last 1 second (1000ms).

The browser will _interpolate_ the declarations within our `from` and `to` blocks, over the duration specified. This happens immediately, as soon as the property is set.

We can animate multiple properties in the same animation declaration. Here's a fancier example that changes multiple properties:

## [Link to this heading](#timing-functions-2)Timing functions

In “[An Interactive Guide to CSS Transitions](https://www.joshwcomeau.com/animation/css-transitions/#timing-functions)”, we learned all about the different timing functions built into CSS.

We have access to the same library of timing functions for our keyframe animations. And, like with `transition`, the default value is `ease`.

We can override it with the `animation-timing-function` property:

## [Link to this heading](#looped-animations-3)Looped animations

By default, keyframe animations will only run once, but we can control this with the `animation-iteration-count` property:

It's somewhat rare to specify an integer like this, but there is one special value that comes in handy: `infinite`.

For example, we can use it to create a loading spinner:

Note that for spinners, we generally want to use a `linear` timing function so that the motion is constant (though this is somewhat subjective—try changing it and see what you think!).

## [Link to this heading](#multi-step-animations-4)Multi-step animations

In addition to the `from` and `to` keywords, we can also use percentages. This allows us to add more than 2 steps:

The percentages refer to the progress through the animation. `from` is really just “Syntactic sugar” describes alternative syntax that makes the language easier to read/write (“sweeter”). Typically, it's an abstraction that hides a less-tasty, more-complex underlying mechanism. for `0%`. And `to` is sugar for `100%`.

Importantly, _the timing function applies to each step_. We don't get a single ease for the entire animation.

In this playground, both spinners complete 1 full rotation in 2 seconds. But `multi-step-spin` breaks it into 4 distinct steps, and each step has the timing function applied:

Unfortunately, we can't control this behaviour using CSS keyframe animations, though it _is_ configurable using the Web Animations API. If you find yourself in a situation where the step-by-step easing is problematic, I'd suggest [checking it out(opens in new tab)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)!

## [Link to this heading](#alternating-animations-5)Alternating animations

Let's suppose that we want an element to "breathe", inflating and deflating.

We could set it up as a 3-step animation:

It spends the first half of the duration growing to be 1.5x its default size. Once it reaches that peak, it spends the second half shrinking back down to 1x.

This works, but there's a more-elegant way to accomplish the same effect. We can use the `animation-direction` property:

`animation-direction` controls the order of the sequence. The default value is `normal`, going from 0% to 100% over the course of the specified duration.

We can also set it to `reverse`. This will play the animation backwards, going from 100% to 0%.

The interesting part, though, is that we can set it to `alternate`, which ping-pongs between `normal` and `reverse` on subsequent iterations.

Instead of having 1 big animation that grows and shrinks, we set our animation to grow, and then reverse it on the next iteration, causing it to shrink.

## [Link to this heading](#shorthand-values-6)Shorthand values

We've picked up a lot of animation properties in this lesson, and it's been a lot of typing!

Fortunately, as with `transition`, we can use the `animation` shorthand to combine all of these properties.

The above animation can be rewritten:

```
.box {
  /*
  From this:
    animation: grow-and-shrink 2000ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;

  ...to this:
  */
  animation: grow-and-shrink 2000ms ease-in-out infinite alternate;
}
```

Here's a piece of good news, as well: **the order doesn't matter.** For the most part, you can toss these properties in any order you want. You don't need to memorize a specific sequence.

There is an exception: `animation-delay`, a property we'll talk more about shortly, needs to come after the duration, since both properties take the same value type (milliseconds/seconds).

For this reason, I prefer to exclude delay from the shorthand:

```
.box {
  animation: grow-and-shrink 2000ms ease-in-out infinite alternate;
  animation-delay: 500ms;
}
```

## [Link to this heading](#fill-modes-7)Fill Modes

Probably the most confusing aspect of keyframe animations is _fill modes_. They're the biggest obstacle on our path towards keyframe confidence.

Let's start with a problem.

We want our element to fade out. The animation itself works fine, but when it's over, the element pops back into existence:

If we were to graph the element's opacity over time, it would look something like this:

![graph showing how the opacity goes from 1 to 0 over the first second, and then jumps to 1, its default value, forever](https://www.joshwcomeau.com/images/keyframe-animations/fill-mode-bug.svg)

Why does the element jump back to full visibility? Well, the declarations in the `from` and `to` blocks only apply _while the animation is running_.

After 1000ms has elapsed, the animation packs itself up and hits the road. The declarations in the `to` block dissipate, leaving our element with whatever CSS declarations have been defined elsewhere. Since we haven't set `opacity` for this element anywhere else, it snaps back to its default value (`1`).

One way to solve this is to add an `opacity` declaration to the `.box` selector:

While the animation is running, the declarations in the `@keyframes` statement overrule the opacity declaration in the `.box` selector. Once the animation wraps up, though, that declaration kicks in and keeps the box hidden.

So, we can update our CSS so that the element's properties match the `to` block, but is that really the best way?

### [Link to this heading](#filling-forwards-8)Filling forwards

Instead of relying on fallback declarations, let's consider another approach, using `animation-fill-mode`:

`animation-fill-mode` lets us persist the final value from the animation, _forwards in time_.

![graph showing how the opacity goes from 1 to 0 over the first second, and then stays at 0, forward in time](https://www.joshwcomeau.com/images/keyframe-animations/fill-mode-forwards.svg)

"forwards" is a very confusing name, but hopefully seeing it on this graph makes it a bit clearer!

When the animation ends, `animation-fill-mode: forwards` will copy/paste the declarations in the final block, persisting them forwards in time.

### [Link to this heading](#filling-backwards-9)Filling backwards

We don't always want our animations to start immediately! As with `transition`, we can specify a delay, with the `animation-delay` property.

Unfortunately, we run into a similar issue:

For that first half-second, the element is fully visible!

![graph showing how the opacity starts at 1, before jumping down to 0 when the animation starts](https://www.joshwcomeau.com/images/keyframe-animations/fill-mode-delay.svg)

The CSS in the `from` and `to` blocks is only applied while the animation is running. Frustratingly, the `animation-delay` period doesn't count. So for that first half-second, it's as if the CSS in the `from` block doesn't exist.

`animation-fill-mode` has another value that can help us here: `backwards`. This will apply the CSS from the first block _backwards in time_.

![The same graph as above, but fixed so that opacity is 0 until the animation starts](https://www.joshwcomeau.com/images/keyframe-animations/fill-mode-backwards.svg)

“Forwards” and “backwards” are confusing values, but here's an analogy that might help: imagine if we had recorded the user's session from the moment the page loaded. We could scrub forwards and backwards in the video. We can scrub backwards, before the animation has started, or forwards, after the animation has ended.

What if we want to persist the animation forwards _and_ backwards? We can use a third value, `both`, which persists in both directions:

![The same graph as above, but fixed so that opacity is 0 until the animation starts](https://www.joshwcomeau.com/images/keyframe-animations/fill-mode-both.svg)

Personally, I wish that `both` was the default value. It's so much more intuitive! Though it _can_ make it a bit harder to understand where a particular CSS value has been set.

Like all of the animation properties we're discussing, it can be tossed into the `animation` shorthand salad:

```
.box {
  animation: slide-in 1000ms ease-out both;
  animation-delay: 500ms;
}
```

## [Link to this heading](#dynamic-animations-with-css-variables-10)Dynamic animations with CSS variables

Keyframe animations are cool enough on their own, but when we mix them with CSS variables (AKA CSS custom properties), things get ⚡️ next-level ⚡️.

Let's suppose that we want to create a bouncing-ball animation, using everything we've learned in this lesson:

CSS animations are meant to be generic and reusable, but this animation will always cause an element to bounce by 20px. Wouldn't it be neat if different elements could supply different "bounce heights"?

With CSS variables, we can do exactly that:

Our `@keyframes` animation has been updated so that instead of bouncing to `-20px`, it accesses the value of the `--bounce-offset` property. And since that property has a different value in each box, they each bounce to different amounts.

This strategy allows us to create reusable, customizable keyframe animations. Think of it like props to a React component!

## [Link to this heading](#just-the-beginning-11)Just the beginning

As I was building the last couple demos, I realized just how much CSS has evolved in the past few years!

It's become an _incredible language_, expressive and flexible and powerful. I love writing CSS.

And yet, so many front-end developers have a _very_ different relationship with the language. I've spoken to hundreds of JavaScript developers who find CSS frustrating and confusing. Sometimes, the exact same CSS will behave totally differently! It feels so inconsistent.

I have a theory about this: unlike with JS, so much of CSS is _implicit_ and behind-the-scenes. It's not enough to know the _properties_; you need to know the _principles_ driving them.

I've spent the last year working full-time on a course that will help teach CSS at a deeper, more fundamental level. If you found this blog post helpful, you'll _love_ the course.

It's called [CSS for JavaScript Developers(opens in new tab)](https://css-for-js.dev/), and it's just been released to the public. You can learn more at [css-for-js.dev(opens in new tab)](https://css-for-js.dev/).

### Last updated on

April 3rd, 2025