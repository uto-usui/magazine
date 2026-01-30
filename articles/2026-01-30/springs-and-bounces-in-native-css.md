---
title: "Springs and Bounces in Native CSS"
source: "https://www.joshwcomeau.com/animation/linear-timing-function/"
publishedDate: "2025-10-28"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

When creating animations, we can decide how to transition between states using a _timing function._ Historically, we’ve used Bézier curves for this, which provide us with a range of different options:

ease-in

ease-in-out

ease

In this demo, each of these circles moves from side to side over the same duration, but they’re _interpolated_ very differently. This can dramatically change how the animation feels.

Bézier curves are great, but there are certain things they just can’t do. For example:

spring

bounce

In the past, we’ve needed to rely on JavaScript libraries to provide these sorts of interpolations, which introduces a whole bunch of trade-offs; most JavaScript animations run on the main thread, for example, which means they won’t run smoothly if other stuff is happening in our application!

Fortunately, modern CSS has provided us a new tool that enables us to create springs, bounces, and so much more all in native CSS: the `linear()` timing function. In this blog post, I’ll show you how it works, and share some tools you can use to get started right away!

## [Link to this heading](#the-linear-function-1)The linear() function

The core idea here is surprisingly simple: instead of using mathematically-derived Bézier curves, we can instead draw the easing curve we want, by specifying a set of individual points on a cartesian plane.

For example, this graph approximates an “ease” curve using 11 points:

— Progress —

— Time —

This _looks_ like a curve, but if you look closely, you’ll notice that it’s actually a bunch of straight line segments. It’s like those “connect the dots” drawings, where a shape emerges from a bunch of straight lines.

![a bunch of numbered dots form the shape of an apple](https://www.joshwcomeau.com/images/linear-timing-function/paint-by-numbers.png)

This is why they named it “linear()”. Unlike Bézier curves, which are actual mathematical curves, the `linear()` function only draws straight lines between a set of provided points.

Here’s what the actual CSS looks like for the `linear()` animation graphed above:

```
.block {
  transition:
    transform 500ms linear(0, 0.1, 0.25, 0.5, 0.68, 0.8, 0.88, 0.94, 0.98, 0.995, 1);
}
```

The `linear()` function takes a set of numbers, with 0 representing the starting value and 1 representing the final value. We can think of this as a ratio of the transition progress. We can pass as many numbers as we want, and they’ll all be evenly-spaced across the specified duration.

We can use `linear()` to emulate spring physics, capturing the data from a real modeled spring. Let’s suppose we’re trying to recreate this springy motion:

— Progress —

— Time —

Just for fun, I did my best to trace that springy shape by hand, guesstimating 11 values based on that graph. Here’s what that looks like:

— Progress —

— Time —

Yikes. This does not feel great. 😂

We’ll look at how to make it better, but first, here’s the code for this not-great animation:

```
linear(0, 1.25, 1, 0.9, 1.04, 0.99, 1.005, 0.996, 1.001, 0.999, 1);
```

Like with Bézier curves, the `linear()` function allows us to pick values outside the 0 to 1 range, to _overshoot_ the target like springs do. So that second value, `1.25`, means that we’ve overshot the target location by 25%.

**The problem is that 11 values are just not enough to faithfully reproduce a springy value like this.** The element is clearly moving robotically between discrete points rather than smoothly oscillating like a spring.

But if we crank up the number of points, the simulation becomes much more believable. I wrote some code to calculate the values for _50 points,_ and here’s the result:

— Progress —

— Time —

Much more convincing, right?

As you can tell from my failed experiment above, we aren’t really meant to write these `linear()` datasets by hand. Instead, we should use tools that dynamically calculate them for us.

### [Link to this heading](#dynamically-generating-linear-values-2)Dynamically generating linear() values

The best tool I’ve seen is [Linear() Easing Generator(opens in new tab)](https://linear-easing-generator.netlify.app/), by Jake Archibald and Adam Argyle. It comes pre-loaded with all of the math required to convert spring parameters into a highly-optimized `linear()` string, and if you have another JS-based timing function, you can easily edit the code to use that instead!

[![Screenshot of “linear-easing-generator”, a tool which has some JavaScript input on the left side and an animation visualization on the right, showing the result of the JavaScript calculations. At the bottom, the output CSS is shown, using linear(), and can be copied to use in your project](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Flinear-timing-function%2Flinear-easing-generator.png&w=1920&q=75)](https://linear-easing-generator.netlify.app/)

There’s also [Easing Wizard(opens in new tab)](https://easingwizard.com/), which is the most comprehensive and nicely-designed tool I’ve found. It uses `linear()` to model springs, bounces, wiggles, and more, and provides a bunch of tools to test out your timing functions.

[![Screenshot of “Easing Wizard”, another tool designed to help you customize spring transitions. This tool also visualizes the animation, but instead of raw JavaScript code as the input, you control spring parameters like stiffness, damping, and mass.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Flinear-timing-function%2Feasing-wizard.png&w=1920&q=75)](https://easingwizard.com/)

Both of these tools take advantage of a more-advanced syntax for the `linear()` timing function. In addition to the progress ratio, certain points also have a time percentage:

```
/* Example output from tool-generated linear() values: */
.thing {
  transition: transform 1500ms linear(
    0,
    0.013 0.6%,
    0.05 1.2%,
    0.2 2.5%,
    /* ✂️ Buncha points omitted */
    0.971 47.2%,
    1.012 59.1%,
    0.995 70.8%,
    1
  );
}
```

Like before, we have a list of progress ratios from 0 to 1 (or beyond, for overshooting). Most of these points also have a second value, a percentage. This controls where each point is placed in time. So, rather than having a bunch of evenly-spaced values, we can position them strategically, to achieve the same curve with a smaller # of points.

For example, we can model that same spring with only 25 points, instead of 50:

— Progress —

— Time —

Honestly, I’m not sure that this is _really_ much of a savings in terms of kilobytes; we use a smaller # of points, but each point requires two pieces of information instead of just one. Either way, both of the recommended tools use this syntax, so presumably they’ve found that it’s beneficial!

We’ll talk more about the performance implications shortly.

## [Link to this heading](#limitations-3)Limitations

The `linear()` function is a lovely API that greatly expands what we can do in vanilla CSS, but like everything, there are some tradeoffs and limitations worth considering.

### [Link to this heading](#one-its-still-time-based-4)1\. It’s still time-based

When using JavaScript libraries that implement physics-based animations like springs or bounces, we don’t specify an animation _duration_. Instead, we configure our animation using physical properties like stiffness, damping, and mass. The animation takes however long it takes based on the physics.

**That’s not how CSS transitions work, though.** CSS transitions require a duration:

```
.elem {
  transition: transform linear(...) 1200ms;
}
```

The [Linear() Easing Generator tool(opens in new tab)](https://linear-easing-generator.netlify.app/) solves this by dynamically deriving a duration based on the provided spring settings. The duration is calculated based on how much time is necessary until the spring settles down and stops moving.

This works in _most_ cases, but it means we can’t model a zero-friction spring. When we set “damping” to `0`, the spring _should_ oscillate forever, but there’s no such thing as an infinite-duration transition.

[Easing Wizard(opens in new tab)](https://easingwizard.com/) works a bit differently: “duration” is a user-configurable parameter, and it doesn’t recalculate as we adjust the spring settings. To make this work, Easing Wizard fudges the numbers a bit. Certain parameters are internally clamped, so that they won’t produce impossible curves.

For example, with low mass/stiffness, damping has little to no effect, which is definitely not how it should work. 😅

I prefer the solution that Jake/Adam came up with for Linear() Easing Generator, but really, there is no perfect solution here. Springs aren’t meant to be time-based, so it feels a bit like trying to come up with the best way to stuff a square peg into a round hole. It’s an awkward way to think about physics-based animation.

### [Link to this heading](#two-interrupts-5)2\. Interrupts

One of the hardest problems in web animation is dealing with interrupts. The web is a dynamic place, and there’s no guarantee that an element will be allowed to complete its transition. Sometimes, it’ll be updated halfway through. What should happen in that case?

Well, let’s give it a shot. This demo implements the same basic transition using the `linear()` function as well as React Spring, a library based around JavaScript spring physics. **Click the button quickly, to interrupt the transition:**

Using _linear()_:

Using _React Spring_:

If you click the button twice, very quickly, you should see something like this:

(If you’re not able to click that quickly, you can also focus the button and press "Enter" twice.)

When both animations run without interruption, they appear nearly identical. But if we trigger the button again mid-transition, they behave _very_ differently.

**Here’s the fundamental difference:** the version using React Spring takes the element’s _current inertia_ into account. It takes a moment to slow down, before swinging back in the opposite direction. The CSS version, by contrast, turns around instantly, as though it hit a wall.

And the CSS version’s behaviour feels unnatural. This spring is meant to be pretty loose and smooth, but on that rebound transition, it feels tight and quick. 🤔

The reason this happens is a bit complicated, and too much of a rabbit hole to get into here. To summarize at a high level, CSS transitions have [special logic(opens in new tab)](https://www.w3.org/TR/css-transitions-1/#reversing) for handling interrupts. There’s a concept in the specification called the _reversing shortening factor_ that proportionally reduces the duration of interrupted transitions. So, a spring intended to take 1600ms might re-run at only 400ms. This looks fine with Bézier curves, but we’re trying to emulate physics here, and we can’t just speed it up and expect it to feel natural.

It’s a bit like taking a recording of someone walking at a leisurely pace, speeding it up by 2x, and trying to pass it off as someone jogging. The speed might be correct, but it sure as heck won’t look natural!

### [Link to this heading](#three-performance-6)3\. Performance

In order to convincingly simulate a spring using `linear()`, we need _lots_ of data points. It’s not uncommon for my springs to have 40+ data points!

It _feels_ like this could have a significant impact on performance, but I wasn’t sure. And whenever I’m not sure about something like this, I try to figure it out with some testing.

I had two main concerns:

1.  Is the framerate affected by complex `linear()` values?
    
2.  Does it balloon the size of my CSS bundles?
    

The first concern was easy to test. I created a basic animation and tested two different `linear()` strings. The first string was the simplest possible value, `linear(0, 1)`. The second string had >100 values.

**Both animations ran equally smoothly, even on low-end hardware.** I could not detect even a small difference between the two approaches. 👍

For the second concern, I created 3 maximum-accuracy springs with Easing Wizard, with an average of 75 values each, and added them to the CSS for my course platform. It’s important to test things like this in the context of a real application.

Here are the resulting file sizes:

-   By default, my CSS bundle is 63.3kB, which compresses to 10.2kB with gzip.
    
-   With these extra springs, my CSS bundle grew to 67.1kB, which compresses to 11.5kB with gzip.
    

So, in this particular context, these 3 very-large springs added ~1.3kB to my CSS bundle.

To put that number in context: on a typical 3G connection (2mb/s), it will take 5ms (0.005 seconds) to download this extra chunk of CSS. It will also add some processing time on the device, but we’re still talking about a completely imperceptible amount of time.

Now, this assumes we only have 3 `linear()` chunks in the entire bundle. If you copy/paste this large string for every animation, you could wind up with dozens of copies, so it’s a good idea to use CSS variables to reuse the same `linear()` timing function in multiple places. Let’s talk about how to do that!

## [Link to this heading](#using-linear-effectively-7)Using `linear()` effectively

`linear()` strings tend to be big and unwieldy. In addition to the potential performance concerns, it’s also just kind of annoying to work with them!

Rather than sprinkle `linear()` values across the codebase, I recommend storing a handful of common timing functions in globally-available CSS variables. If you already have a system for design tokens, I think it’s a great idea to extend it with some `linear()` timing functions!

We also need to consider browser support. As I mentioned earlier, `linear()` is a somewhat-new feature, and isn’t available in all browsers.

Over the past few months, I’ve been experimenting with how to use these timing functions effectively. Here’s the pattern I’ve landed on:

```
html {
  --spring-smooth: cubic-bezier(...);
  --spring-smooth-time: 1000ms;

  @supports (animation-timing-function: linear(0, 1)) {
    /* stiffness: 235, damping: 10 */
    /* prettier-ignore */
    --spring-smooth: linear(...);
  }
}

/* Then, to use this timing function: */
@media (prefers-reduced-motion: no-preference) {
  .thing {
    transition:
      transform var(--spring-smooth) var(--spring-smooth-time);
  }
}
```

If the user is using an older browser which doesn't support `linear()`, we’ll provide a fallback transition using Bézier curves. You can use [Easing Wizard(opens in new tab)](https://easingwizard.com/) to come up with something that still feels alright (we can _kinda_ mimic springs using Bézier curves by overshooting the target; it doesn’t look anywhere near as smooth, but it’s a decent fallback option).

The `@supports` at-rule allows us to specify extra CSS in supported browsers. So, we overwrite `--spring-smooth` with the actual `linear()` value. I also like to record the stiffness/damping for springs in a comment, so that if I want to adjust the spring settings in the future, I remember how to reconstruct this `linear()` string. And finally, I add `prettier-ignore` to stop the Prettier formatter from putting each point on its own line, and turning this 1-line declaration into a 50-line list of numbers.

We can then use the `--spring-smooth` and `--spring-smooth-time` variables wherever we typically apply transitions or keyframe animations. Like with all animations, we should make sure to respect user motion preferences. I write more about the “prefers-reduced-motion” media query in my blog post, [Accessible Animations in React](https://www.joshwcomeau.com/react/prefers-reduced-motion/) (this post is mainly for React devs, but the first half of the post should still be useful for all web developers!).

## [Link to this heading](#going-deeper-8)Going deeper

For the past year, I’ve been working on the ultimate animations course. ✨

[![Whimsical Animations, a course from Josh W. Comeau](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fwhimsical-animations.jpg&w=1920&q=75)](https://whimsy.joshwcomeau.com/)

In this course, we use modern CSS features like `linear()` alongside JavaScript, SVG, and Canvas to create top-tier whimsical animations and interactions. I share all of the tips and tricks I’ve learned after nearly two decades of experience.

I’m hoping to release this course in the first half of 2026. You can learn more and sign up here:

-   [Whimsical Animations(opens in new tab)](https://whimsy.joshwcomeau.com/)
    

### Last updated on

October 28th, 2025