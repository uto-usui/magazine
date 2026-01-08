---
title: "Keyframes Tokens: Standardizing Animation Across Projects"
source: "https://smashingmagazine.com/2025/11/keyframes-tokens-standardizing-animation-across-projects/"
publishedDate: "2025-11-21"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Amit Sheen)"
---

-   24 min read
-   [CSS](https://smashingmagazine.com/category/css), [Animation](https://smashingmagazine.com/category/animation), [Techniques](https://smashingmagazine.com/category/techniques)

Animations can be one of the most joyful parts of building interfaces, but without structure, they can also become one of the biggest sources of frustration. By consolidating and standardizing keyframes, you take something that is usually messy and hard to manage and turn it into a clear, predictable system.

Picture this: you join a new project, dive into the codebase, and within the first few hours, you discover something frustratingly familiar. Scattered throughout the stylesheets, you find multiple `@keyframes` definitions for the same basic animations. Three different fade-in effects, two or three slide variations, a handful of zoom animations, and at least two different spin animations because, well, why not?

```
@keyframes pulse {
  from {
    scale: 1;
  }
  to {
    scale: 1.1;
  }
}

@keyframes bigger-pulse {
  0%, 20%, 100% { 
    scale: 1; 
  }
  10%, 40% { 
    scale: 1.2; 
  }
}
```

If this scenario sounds familiar, you’re not alone. In my experience across various projects, one of the most consistent quick wins I can deliver is **consolidating and standardizing keyframes**. It’s become such a reliable pattern that I now look forward to this cleanup as one of my first tasks on any new codebase.

## The Logic Behind The Chaos

This redundancy makes perfect sense when you think about it. We all use the same fundamental animations in our day-to-day work: fades, slides, zooms, spins, and other common effects. These animations are pretty straightforward, and it’s easy to whip up a quick `@keyframes` definition to get the job done.

Without a centralized animation system, developers naturally write these keyframes from scratch, unaware that similar animations already exist elsewhere in the codebase. This is especially common when working in component-based architectures (which most of us do these days), as teams often work in parallel across different parts of the application.

The result? Animation chaos.

## The Small Problem

The most obvious issues with keyframes duplication are wasted development time and unnecessary code bloat. Multiple keyframe definitions mean multiple places to update when requirements change. Need to adjust the timing of your fade animation? You’ll need to hunt down every instance across your codebase. Want to standardize easing functions? Good luck finding all the variations. This multiplication of maintenance points makes even simple animation updates a time-consuming task.

## The Bigger Problem

This keyframes duplication creates a much more insidious problem lurking beneath the surface: **the global scope trap.** Even when working with component-based architectures, CSS keyframes are always defined in the global scope. This means all keyframes apply to all components. Always. Yes, your animation doesn’t necessarily use the keyframes you defined in your component. It uses the last keyframes that match that exact same name that were loaded into the global scope.

As long as all your keyframes are identical, this might seem like a minor issue. But the moment you want to customize an animation for a specific use case, you’re in trouble, or worse, you’ll be the one causing them.

Either your animation won’t work because another component loaded after yours, overwriting your keyframes, or your component loads last and accidentally changes the animation behavior for every other component using that keyframe’s name, and you may not even realize it.

Here’s a simple example that demonstrates the problem:

```
.component-one {
  /* component styles */
  animation: pulse 1s ease-in-out infinite alternate;
}

/* this @keyframes definition will not work */
@keyframes pulse {
  from {
    scale: 1;
  }
  to {
    scale: 1.1;
  }
} 

/* later in the code... */

.component-two {
  /* component styles */
  animation: pulse 1s ease-in-out infinite;
}

/* this keyframes will apply to both components */
@keyframes pulse {
  0%, 20%, 100% { 
    scale: 1; 
  }
  10%, 40% { 
    scale: 1.2; 
  }
}
```

Both components use the same animation name, but the second `@keyframes` definition overwrites the first one. Now both `component-one` and `component-two` will use the second keyframes, regardless of which component defined which keyframes.

See the Pen \[Keyframes Tokens - Demo 1 \[forked\]\](https://codepen.io/smashingmag/pen/JoXrOqz) by [Amit Sheen](https://codepen.io/amit_sheen).

See the Pen [Keyframes Tokens - Demo 1 \[forked\]](https://codepen.io/smashingmag/pen/JoXrOqz) by [Amit Sheen](https://codepen.io/amit_sheen).

The worst part? This often works perfectly in local development but breaks mysteriously in production when build processes change the loading order of your stylesheets. You end up with animations that behave differently depending on which components are loaded and in what sequence.

## The Solution: Unified Keyframes

The answer to this chaos is surprisingly simple: **predefined dynamic keyframes stored in a shared stylesheet**. Instead of letting every component define its own animations, we create centralized keyframes that are well-documented, easy to use, maintainable, and tailored to the specific needs of your project.

Think of it as **keyframes tokens**. Just as we [use tokens for colors and spacing](https://www.smashingmagazine.com/2024/05/naming-best-practices/), and many of us already use tokens for animation properties, like duration and easing functions, why not use tokens for keyframes as well?

This approach can integrate naturally with any current design token workflow you’re using, while solving both the small problem (code duplication) and the bigger problem (global scope conflicts) in one go.

**The idea is straightforward:** create a single source of truth for all our common animations. This shared stylesheet contains carefully crafted keyframes that cover the animation patterns our project actually uses. No more guessing whether a fade animation already exists somewhere in our codebase. No more accidentally overwriting animations from other components.

But here’s the key: these aren’t just static copy-paste animations. They’re designed to be dynamic and customizable through CSS custom properties, allowing us to maintain consistency while still having the flexibility to adapt animations to specific use cases, like if you need a slightly bigger “pulse” animation in one place.

## Building The First Keyframes Token

One of the first low-hanging fruits we should tackle is the “fade-in” animation. In one of my recent projects, I found over a dozen separate fade-in definitions, and yes, they all simply animated the `opacity` from `0` to `1`.

So, let’s create a new stylesheet, call it `kf-tokens.css`, import it into our project, and place our keyframes with proper comments inside of it.

```
/* keyframes-tokens.css */

/*
 * Fade In - fade entrance animation
 * Usage: animation: kf-fade-in 0.3s ease-out;
 */
@keyframes kf-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

This single `@keyframes` declaration replaces all those scattered fade-in animations across our codebase. Clean, simple, and globally applicable. And now that we have this token defined, we can use it from any component throughout our project:

```
.modal {
  animation: kf-fade-in 0.3s ease-out;
}

.tooltip {
  animation: kf-fade-in 0.2s ease-in-out;
}

.notification {
  animation: kf-fade-in 0.5s ease-out;
}
```

See the Pen \[Keyframes Tokens - Demo 2 \[forked\]\](https://codepen.io/smashingmag/pen/yyOzPdv) by [Amit Sheen](https://codepen.io/amit_sheen).

See the Pen [Keyframes Tokens - Demo 2 \[forked\]](https://codepen.io/smashingmag/pen/yyOzPdv) by [Amit Sheen](https://codepen.io/amit_sheen).

**Note:** _We’re using a `kf-` prefix in all our `@keyframes` names. This prefix serves as a namespace that prevents naming conflicts with existing animations in the project and makes it immediately clear that these keyframes come from our keyframes tokens file._

## Making A Dynamic Slide

The `kf-fade-in` keyframes work great because it’s simple and there’s little room to mess things up. In other animations, however, we need to be much more dynamic, and here we can leverage the enormous power of [CSS custom properties](https://www.smashingmagazine.com/2017/04/start-using-css-custom-properties/). This is where keyframes tokens really shine compared to scattered static animations.

Let’s take a common scenario: “slide-in” animations. But slide in from where? `100px` from the right? `50%` from the left? Should it enter from the top of the screen? Or maybe float in from the bottom? So many possibilities, but instead of creating separate keyframes for each direction and each variation, we can build one flexible token that adapts to all scenarios:

```
/*
 * Slide In - directional slide animation
 * Use --kf-slide-from to control direction
 * Default: slides in from left (-100%)
 * Usage: 
 *   animation: kf-slide-in 0.3s ease-out;
 *   --kf-slide-from: -100px 0; // slide from left
 *   --kf-slide-from: 100px 0;  // slide from right
 *   --kf-slide-from: 0 -50px;  // slide from top
 */

@keyframes kf-slide-in {
  from {
    translate: var(--kf-slide-from, -100% 0);
  }
  to {
    translate: 0 0;
  }
}
```

Now we can use this single `@keyframes` token for any slide direction simply by changing the `--kf-slide-from` custom property:

```
.sidebar {
  animation: kf-slide-in 0.3s ease-out;
  /* Uses default value: slides from left */
}

.notification {
  animation: kf-slide-in 0.4s ease-out;
  --kf-slide-from: 0 -50px; /* slide from top */
}

.modal {
  animation:
    kf-fade-in 0.5s,
    kf-slide-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  --kf-slide-from: 50px 50px; /* slide from bottom-right */
}
```

This approach gives us incredible flexibility while maintaining consistency. One keyframe declaration, infinite possibilities.

See the Pen \[Keyframes Tokens - Demo 3 \[forked\]\](https://codepen.io/smashingmag/pen/raeGYXr) by [Amit Sheen](https://codepen.io/amit_sheen).

See the Pen [Keyframes Tokens - Demo 3 \[forked\]](https://codepen.io/smashingmag/pen/raeGYXr) by [Amit Sheen](https://codepen.io/amit_sheen).

And if we want to make our animations even more flexible, allowing for “slide-out” effects as well, we can simply add a `--kf-slide-to` custom property, similar to what we’ll see in the next section.

## Bidirectional Zoom Keyframes

Another common animation that gets duplicated across projects is “zoom” effects. Whether it’s a subtle scale-up for toast messages, a dramatic zoom-in for modals, or a gentle scale-down effect for headings, zoom animations are everywhere.

Instead of creating separate keyframes for each scale value, let’s build one flexible set of `kf-zoom` keyframes:

```
/*
 * Zoom - scale animation
 * Use --kf-zoom-from and --kf-zoom-to to control scale values
 * Default: zooms from 80% to 100% (0.8 to 1)
 * Usage:
 *   animation: kf-zoom 0.2s ease-out;
 *   --kf-zoom-from: 0.5; --kf-zoom-to: 1;   // zoom from 50% to 100%
 *   --kf-zoom-from: 1; --kf-zoom-to: 0;     // zoom from 100% to 0%
 *   --kf-zoom-from: 1; --kf-zoom-to: 1.1;   // zoom from 100% to 110%
 */

@keyframes kf-zoom {
  from {
    scale: var(--kf-zoom-from, 0.8);
  }
  to {
    scale: var(--kf-zoom-to, 1);
  }
}
```

With one definition, we can achieve any zoom variation we need:

```
.toast {
  animation:
    kf-slide-in 0.2s,
    kf-zoom 0.4s ease-out;
  --kf-slide-from: 0 100%; /* slide from top */
  /* Uses default zoom: scales from 80% to 100% */
}

.modal {
  animation: kf-zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  --kf-zoom-from: 0; /* dramatic zoom from 0% to 100% */
}

.heading {
  animation:
    kf-fade-in 2s,
    kf-zoom 2s ease-in;
  --kf-zoom-from: 1.2; 
  --kf-zoom-to: 0.8; /* gentle scale down */
}
```

The default of `0.8` (80%) works perfectly for most UI elements, like toast messages and cards, while still being easy to customize for special cases.

See the Pen \[Keyframes Tokens - Demo 4 \[forked\]\](https://codepen.io/smashingmag/pen/WbwZdQZ) by [Amit Sheen](https://codepen.io/amit_sheen).

See the Pen [Keyframes Tokens - Demo 4 \[forked\]](https://codepen.io/smashingmag/pen/WbwZdQZ) by [Amit Sheen](https://codepen.io/amit_sheen).

You might have noticed something interesting in the recent examples: we’ve been **combining animations**. One of the key advantages of working with `@keyframes` tokens is that they’re designed to integrate seamlessly with each other. This smooth composition is intentional, not accidental.

We’ll discuss animation composition in more detail later, including where they can become problematic, but most combinations are straightforward and easy to implement.

**Note:** _While writing this article, and maybe because of writing it, I found myself rethinking the whole idea of entrance animations. With all the recent advances in CSS, do we still need them at all? Luckily, Adam Argyle explored the same questions and expressed them brilliantly [in his blog](https://nerdy.dev/using-starting-style-and-transition-behavior-for-enter-and-exit-stage-effects). This doesn’t contradict what’s written here, but it does present an approach worth considering, especially if your projects rely heavily on entrance animations._

## Continuous Animations

While entrance animations, like “fade”, “slide”, and “zoom” happen once and then stop, continuous animations loop indefinitely to draw attention or indicate ongoing activity. The two most common continuous animations I encounter are “spin” (for loading indicators) and “pulse” (for highlighting important elements).

These animations present unique challenges when it comes to creating keyframes tokens. Unlike entrance animations that typically go from one state to another, continuous animations need to be highly customizable in their behavior patterns.

### The Spin Doctor

Every project seems to use multiple spin animations. Some spin clockwise, others counterclockwise. Some do a single 360-degree rotation, others do multiple turns for a faster effect. Instead of creating separate keyframes for each variation, let’s build one flexible spin that handles all scenarios:

```
/*
 * Spin - rotation animation
 * Use --kf-spin-from and --kf-spin-to to control rotation range
 * Use --kf-spin-turns to control rotation amount
 * Default: rotates from 0deg to 360deg (1 full rotation)
 * Usage:
 *   animation: kf-spin 1s linear infinite;
 *   --kf-spin-turns: 2;   // 2 full rotations
 *   --kf-spin-from: 0deg; --kf-spin-to: 180deg;  // half rotation
 *   --kf-spin-from: 0deg; --kf-spin-to: -360deg; // counterclockwise
 */

@keyframes kf-spin {
  from {
    rotate: var(--kf-spin-from, 0deg);
  }
  to {
    rotate: calc(var(--kf-spin-from, 0deg) + var(--kf-spin-to, 360deg) * var(--kf-spin-turns, 1));
  }
}
```

Now we can create any spin variation we like:

```
.loading-spinner {
  animation: kf-spin 1s linear infinite;
  /* Uses default: rotates from 0deg to 360deg */
} 

.fast-loader {
  animation: kf-spin 1.2s ease-in-out infinite alternate;
  --kf-spin-turns: 3; /* 3 full rotations for each direction per cycle */
}

.steped-reverse {
  animation: kf-spin 1.5s steps(8) infinite;
  --kf-spin-to: -360deg; /* counterclockwise */
}

.subtle-wiggle {
  animation: kf-spin 2s ease-in-out infinite alternate;
  --kf-spin-from: -16deg;
  --kf-spin-to: 32deg; /* wiggle 36 deg: between -18deg and +18deg */
}
```

See the Pen \[Keyframes Tokens - Demo 5 \[forked\]\](https://codepen.io/smashingmag/pen/MYyErbq) by [Amit Sheen](https://codepen.io/amit_sheen).

See the Pen [Keyframes Tokens - Demo 5 \[forked\]](https://codepen.io/smashingmag/pen/MYyErbq) by [Amit Sheen](https://codepen.io/amit_sheen).

The beauty of this approach is that the same keyframes work for loading spinners, rotating icons, wiggle effects, and even complex multi-turn animations.

## The Pulse Paradox

Pulse animations are trickier because they can “pulse” different properties. Some pulse the `scale`, others pulse the `opacity`, and some pulse `color` properties like brightness or saturation. Rather than creating separate keyframes for each property, we can create keyframes that work with any CSS property.

Here’s an example of a pulse keyframe with `scale` and `opacity` options:

```
/* 
 * Pulse - pulsing animation
 * Use --kf-pulse-scale-from and --kf-pulse-scale-to to control scale range
 * Use --kf-pulse-opacity-from and --kf-pulse-opacity-to to control opacity range
 * Default: no pulse (all values 1)
 * Usage:
 *   animation: kf-pulse 2s ease-in-out infinite alternate;
 *   --kf-pulse-scale-from: 0.95; --kf-pulse-scale-to: 1.05; // scale pulse
 *   --kf-pulse-opacity-from: 0.7; --kf-pulse-opacity-to: 1; // opacity pulse
 */

@keyframes kf-pulse {
  from {
    scale: var(--kf-pulse-scale-from, 1);
    opacity: var(--kf-pulse-opacity-from, 1);
  }
  to {
    scale: var(--kf-pulse-scale-to, 1);
    opacity: var(--kf-pulse-opacity-to, 1);
  }
}
```

This creates a flexible pulse that can animate multiple properties:

```
.call-to-action { 
  animation: kf-pulse 0.6s infinite alternate;
  --kf-pulse-opacity-from: 0.5; /* opacity pulse */
}

.notification-dot {
  animation: kf-pulse 0.6s ease-in-out infinite alternate;
  --kf-pulse-scale-from: 0.9; 
  --kf-pulse-scale-to: 1.1; /* scale pulse */
}

.text-highlight {
  animation: kf-pulse 1.5s ease-out infinite;
  --kf-pulse-scale-from: 0.8;
  --kf-pulse-opacity-from: 0.2;
  /* scale and opacity pulse */
}
```

See the Pen \[Keyframes Tokens - Demo 6 \[forked\]\](https://codepen.io/smashingmag/pen/xbVXpRo) by [Amit Sheen](https://codepen.io/amit_sheen).

See the Pen [Keyframes Tokens - Demo 6 \[forked\]](https://codepen.io/smashingmag/pen/xbVXpRo) by [Amit Sheen](https://codepen.io/amit_sheen).

This single `kf-pulse` keyframe can handle everything from subtle attention grabs to dramatic highlights, all while being easy to customize.

## Advanced Easing

One of the great things about using keyframes tokens is how easy it is to expand our animation library and provide effects that most developers would not bother to write from scratch, like _elastic_ or _bounce_.

Here is an example of a simple “bounce” keyframes token that uses a `--kf-bounce-from` custom property to control the jump height.

```
/*
 * Bounce - bouncing entrance animation
 * Use --kf-bounce-from to control jump height
 * Default: jumps from 100vh (off screen)
 * Usage:
 *   animation: kf-bounce 3s ease-in;
 *   --kf-bounce-from: 200px; // jump from 200px height
 */

@keyframes kf-bounce {
  0% {
    translate: 0 calc(var(--kf-bounce-from, 100vh) * -1);
  }

  34% {
    translate: 0 calc(var(--kf-bounce-from, 100vh) * -0.4);
  }

  55% {
    translate: 0 calc(var(--kf-bounce-from, 100vh) * -0.2);
  }

  72% {
    translate: 0 calc(var(--kf-bounce-from, 100vh) * -0.1);
  }

  85% {
    translate: 0 calc(var(--kf-bounce-from, 100vh) * -0.05);
  }

  94% {
    translate: 0 calc(var(--kf-bounce-from, 100vh) * -0.025);
  }

  99% {
    translate: 0 calc(var(--kf-bounce-from, 100vh) * -0.0125);
  }

  22%, 45%, 64%, 79%, 90%, 97%, 100% {
    translate: 0 0;
    animation-timing-function: ease-out;
  }
}
```

Animations like “elastic” are a bit trickier because of the calculations inside the keyframes. We need to define `--kf-elastic-from-X` and `--kf-elastic-from-Y` separately (both are optional), and together they let us create an elastic entrance from any point on the screen.

```
/*
 * Elastic In - elastic entrance animation
 * Use --kf-elastic-from-X and --kf-elastic-from-Y to control start position
 * Default: enters from top center (0, -100vh)
 * Usage:
 *   animation: kf-elastic-in 2s ease-in-out both;
 *   --kf-elastic-from-X: -50px;
 *   --kf-elastic-from-Y: -200px; // enter from (-50px, -200px)
 */

@keyframes kf-elastic-in {
  0% {
    translate: calc(var(--kf-elastic-from-X, -50vw) * 1) calc(var(--kf-elastic-from-Y, 0px) * 1);
  }

  16% {
    translate: calc(var(--kf-elastic-from-X, -50vw) * -0.3227) calc(var(--kf-elastic-from-Y, 0px) * -0.3227);
  }

  28% {
    translate: calc(var(--kf-elastic-from-X, -50vw) * 0.1312) calc(var(--kf-elastic-from-Y, 0px) * 0.1312);
  }

  44% {
    translate: calc(var(--kf-elastic-from-X, -50vw) * -0.0463) calc(var(--kf-elastic-from-Y, 0px) * -0.0463);
  }

  59% {
    translate: calc(var(--kf-elastic-from-X, -50vw) * 0.0164) calc(var(--kf-elastic-from-Y, 0px) * 0.0164);
  }

  73% {
    translate: calc(var(--kf-elastic-from-X, -50vw) * -0.0058) calc(var(--kf-elastic-from-Y, 0px) * -0.0058);
  }

  88% {
    translate: calc(var(--kf-elastic-from-X, -50vw) * 0.0020) calc(var(--kf-elastic-from-Y, 0px) * 0.0020);
  }

  100% {
    translate: 0 0;
  }
}
```

This approach makes it easy to reuse and customize advanced keyframes across our project, just by changing a single custom property.

```
.bounce-and-zoom {
  animation:
    kf-bounce 3s ease-in,
    kf-zoom 3s linear;
  --kf-zoom-from: 0;
}

.bounce-and-slide {
  animation-composition: add; /* Both animations use `translate` */
  animation:
    kf-bounce 3s ease-in,
    kf-slide-in 3s ease-out;
  --kf-slide-from: -200px;
}

.elastic-in {
  animation: kf-elastic-in 2s ease-in-out both;
}
```

See the Pen \[Keyframes Tokens - Demo 7 \[forked\]\](https://codepen.io/smashingmag/pen/QwNqadQ) by [Amit Sheen](https://codepen.io/amit_sheen).

See the Pen [Keyframes Tokens - Demo 7 \[forked\]](https://codepen.io/smashingmag/pen/QwNqadQ) by [Amit Sheen](https://codepen.io/amit_sheen).

Up to this point, we’ve seen how we can consolidate keyframes in a smart and efficient way. Of course, you might want to tweak things to better fit your project’s needs, but we’ve covered examples of several common animations and everyday use cases. And with these keyframes tokens in place, we now have powerful building blocks for creating consistent, maintainable animations across the entire project. No more duplicated keyframes, no more global scope conflicts. Just a clean, convenient way to handle all our animation needs.

But the real question is: **How do we compose these building blocks together?**

## Putting It All Together

We’ve seen that combining basic keyframes tokens is simple. We don’t need anything special but to define the first animation, define the second one, set the variables as needed, and that’s it.

```
/* Fade in + slide in */
.toast {
  animation:
    kf-fade-in 0.4s,
    kf-slide-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  --kf-slide-from: 0 40px;
}

/* Zoom in + fade in */
.modal {
  animation:
    kf-fade-in 0.3s,
    kf-zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  --kf-zoom-from: 0.7;
  --kf-zoom-to: 1;
}

/* Slide in + pulse */
.notification {
  animation:
    kf-slide-in 0.5s,
    kf-pulse 1.2s ease-in-out infinite alternate;
  --kf-slide-from: -100px 0;
  --kf-pulse-scale-from: 0.95;
  --kf-pulse-scale-to: 1.05;
}
```

These combinations work beautifully because each animation targets a different property: `opacity`, `transform` (`translate`/`scale`), etc. But sometimes there are conflicts, and we need to know why and how to deal with them.

When two animations try to animate the same property — for example, both animating `scale` or both animating `opacity` — the result will not be what you expect. By default, only one of the animations is actually applied to that property, which is the last one in the `animation` list. This is a limitation of how CSS handles multiple animations on the same property.

For example, this will not work as intended because only the `kf-pulse` animation will apply.

```
.bad-combo {
  animation:
    kf-zoom 0.5s forwards,
    kf-pulse 1.2s infinite alternate;
  --kf-zoom-from: 0.5;
  --kf-zoom-to: 1.2;
  --kf-pulse-scale-from: 0.8;
  --kf-pulse-scale-to: 1.1;
}
```

## Animation Addition

The simplest and most direct way to handle multiple animations that affect the same property is to use the `animation-composition` property. In the last example above, the `kf-pulse` animation replaces the `kf-zoom` animation, so we will not see the initial zoom and will not get the expected `scale` `to` of `1.2`.

By setting the `animation-composition` to `add`, we tell the browser to _combine_ both animations. This gives us the result we want.

```
.component-two {
  animation-composition: add;
}
```

See the Pen \[Keyframes Tokens - Demo 8 \[forked\]\](https://codepen.io/smashingmag/pen/YPqrYZw) by [Amit Sheen](https://codepen.io/amit_sheen).

See the Pen [Keyframes Tokens - Demo 8 \[forked\]](https://codepen.io/smashingmag/pen/YPqrYZw) by [Amit Sheen](https://codepen.io/amit_sheen).

This approach works well for most cases where we want to combine effects on the same property. It is also useful when we need to combine animations with static property values.

For example, if we have an element that uses the `translate` property to position it exactly where we want, and then we want to animate it in with the `kf-slide-in` keyframes, we get a nasty visible jump without `animation-composition`.

See the Pen \[Keyframes Tokens - Demo 9 \[forked\]\](https://codepen.io/smashingmag/pen/myPBpWr) by [Amit Sheen](https://codepen.io/amit_sheen).

See the Pen [Keyframes Tokens - Demo 9 \[forked\]](https://codepen.io/smashingmag/pen/myPBpWr) by [Amit Sheen](https://codepen.io/amit_sheen).

With `animation-composition` set to `add`, the animation is smoothly combined with the existing transform, so the element stays in place and animates as expected.

## Animation Stagger

Another way of handling multiple animations is to “stagger” them — that is, start the second animation slightly after the first one finishes. It is not a solution that works for every case, but it is useful when we have an entrance animation followed by a continuous animation.

```
/* fade in + opacity pulse */
.notification {
  animation:
    kf-fade-in 2s ease-out,
    kf-pulse 0.5s 2s ease-in-out infinite alternate;
  --kf-pulse-opacity-to: 0.5;
}
```

See the Pen \[Keyframes Tokens - Demo 10 \[forked\]\](https://codepen.io/smashingmag/pen/bNpoaqo) by [Amit Sheen](https://codepen.io/amit_sheen).

See the Pen [Keyframes Tokens - Demo 10 \[forked\]](https://codepen.io/smashingmag/pen/bNpoaqo) by [Amit Sheen](https://codepen.io/amit_sheen).

## Order Matters

A large part of the animations we work with use the `transform` property. In most cases, this is simply more convenient. It also has a performance advantage as transform animations can be GPU-accelerated. But if we use transforms, we need to accept that the order in which we perform our transformations matters. _A lot_.

In our keyframes so far, we’ve used _individual transforms_. According to the specs, these are always applied in a fixed order: first, the element gets `translate`, then `rotate`, then `scale`. This makes sense and is what most of us expect.

However, if we use the `transform` property, the order in which the functions are written is the order in which they are applied. In this case, if we move something 100 pixels on the X-axis and then rotate it by 45 degrees, it is _not_ the same as first rotating it by 45 degrees and then moving it 100 pixels.

```
/* Pink square: First translate, then rotate */ 
.example-one {
  transform: translateX(100px) rotate(45deg);
}

/* Green square: First rotate, then translate */
.example-two { 
  transform: rotate(45deg) translateX(100px);
}
```

See the Pen \[Keyframes Tokens - Demo 11 \[forked\]\](https://codepen.io/smashingmag/pen/zxqEpZb) by [Amit Sheen](https://codepen.io/amit_sheen).

See the Pen [Keyframes Tokens - Demo 11 \[forked\]](https://codepen.io/smashingmag/pen/zxqEpZb) by [Amit Sheen](https://codepen.io/amit_sheen).

But according to the `transform` order, all individual transforms — everything we’ve used for the keyframes tokens — happens before the transform functions. That means anything you set in the `transform` property will happen _after_ the animations. But if you set, for example, `translate` together with the `kf-spin` keyframes, the `translate` will happen _before_ the animation. Confused yet?!

This leads to situations where static values can cause different results for the same animation, like in the following case:

```
/* Common animation for both spinners */ 
.spinner {
  animation: kf-spin 1s linear infinite;
}

/* Pink spinner: translate before rotate (individual transform) */
.spinner-pink {
  translate: 100% 50%;
}

/* Green spinner: rotate then translate (function order) */
.spinner-green {
  transform: translate(100%, 50%);
}
```

See the Pen \[Keyframes Tokens - Demo 12 \[forked\]\](https://codepen.io/smashingmag/pen/NPNaXjw) by [Amit Sheen](https://codepen.io/amit_sheen).

See the Pen [Keyframes Tokens - Demo 12 \[forked\]](https://codepen.io/smashingmag/pen/NPNaXjw) by [Amit Sheen](https://codepen.io/amit_sheen).

You can see that the first spinner (pink) gets a `translate` that happens before the `rotate` of `kf-spin`, so it first moves to its place and then spins. The second spinner (green) gets a `translate()` function that happens after the individual transform, so the element first spins, then moves relative to its current angle, and we get that wide orbit effect.

**No, this is not a bug**. It is just one of those things we need to know about CSS and keep in mind when working with multiple animations or multiple transforms. If needed, you can also create an additional set of `kf-spin-alt` keyframes that rotate elements using the `rotate()` function.

## Reduced Motion

And while we’re talking about alternative keyframes, we cannot ignore the “no animation” option. One of the biggest advantages of using keyframes tokens is that **accessibility** can be baked in, and it is actually quite easy to do. By designing our keyframes with accessibility in mind, we can ensure that [users who prefer reduced motion get a smoother, less distracting experience](https://www.smashingmagazine.com/2021/10/respecting-users-motion-preferences/), without extra work or code duplication.

The exact meaning of “Reduced Motion” can change a bit from one animation to another, and from project to project, but here are a few important points to keep in mind:

### Muting Keyframes

While some animations can be softened or slowed down, there are others that should disappear completely when reduced motion is requested. Pulse animations are a good example. To make sure these animations do not run in reduced motion mode, we can simply wrap them in the appropriate media query.

```

@media (prefers-reduced-motion: no-preference) {
  @keyfrmaes kf-pulse {
    from {
      scale: var(--kf-pulse-scale-from, 1);
      opacity: var(--kf-pulse-opacity-from, 1);
    }
    to {
      scale: var(--kf-pulse-scale-to, 1);
      opacity: var(--kf-pulse-opacity-to, 1);
    }
  }
}
```

This ensures that users who have set `prefers-reduced-motion` to `reduce` will not see the animation and will get an experience that matches their preference.

### Instant In

There are some keyframes we cannot simply remove, such as entrance animations. The value must change, must animate; otherwise, the element won’t have the correct values. But in reduced motion, this transition from the initial value should be instant.

To achieve this, we’ll define an extra set of keyframes where the value jumps immediately to the end state. These become our default keyframes. Then, we’ll add the regular keyframes inside a media query for `prefers-reduced-motion` set to `no-preference`, just like in the previous example.

```
/* pop in instantly for reduced motion */
@keyframes kf-zoom {
  from, to {
    scale: var(--kf-zoom-to, 1);
  }
}

@media (prefers-reduced-motion: no-preference) {
  /* Original zoom keyframes */
  @keyframes kf-zoom {
    from {
      scale: var(--kf-zoom-from, 0.8);
    }
    to {
      scale: var(--kf-zoom-to, 1);
    }
  }
}
```

This way, users who prefer reduced motion will see the element appear instantly in its final state, while everyone else gets the animated transition.

### The Soft Approach

There are cases where we do want to keep some movement, but much softer and calmer than the original animation. For example, we can replace a bounce entrance with a gentle fade-in.

```

@keyframes kf-bounce {
  /* Soft fade-in for reduced motion */
}

@media (prefers-reduced-motion: no-preference) {
  @keyframes kf-bounce {
    /* Original bounce keyframes */
  }
}
```

Now, users with reduced motion enabled still get a sense of appearance, but without the intense movement of a bounce or elastic animation.

With the building blocks in place, the next question is how to make them part of the actual workflow. Writing flexible keyframes is one thing, but making them reliable across a large project requires a few strategies that I had to learn the hard way.

## Implementation Strategies & Best Practices

Once we have a solid library of keyframes tokens, the real challenge is how to bring them into everyday work.

-   The temptation is to drop all keyframes in at once and declare the problem solved, but in practice I have found that **the best results come from gradual adoption**. Start with the most common animations, such as fade or slide. These are easy wins that show immediate value without requiring big rewrites.
-   **Naming is another point that deserves attention.** A consistent prefix or namespace makes it obvious which animations are tokens and which are local one-offs. It also prevents accidental collisions and helps new team members recognize the shared system at a glance.
-   **Documentation is just as important as the code itself.** Even a short comment above each keyframes token can save hours of guessing later. A developer should be able to open the tokens file, scan for the effect they need, and copy the usage pattern straight into their component.
-   **Flexibility is what makes this approach worth the effort.** By exposing sensible custom properties, we give teams room to adapt the animation without breaking the system. At the same time, try not to overcomplicate. Provide the knobs that matter and keep the rest opinionated.
-   Finally, **remember accessibility**. Not every animation needs a reduced motion alternative, but many do. Baking in these adjustments early means we never have to retrofit them later, and it shows a level of care that our users will notice even if they never mention it.

In my experience, treating keyframes tokens as part of our design tokens workflow is what makes them stick. Once they are in place, they stop feeling like special effects and become part of the design language, a natural extension of how the product moves and responds.

## Wrapping Up

Animations can be one of the most joyful parts of building interfaces, but without structure, they can also become one of the biggest sources of frustration. By treating keyframes as tokens, you take something that is usually messy and hard to manage and turn it into a clear, predictable system.

The real value is not just in saving a few lines of code. It is in the **confidence** that when you use a fade, slide, zoom, or spin, you know exactly how it will behave across the project. It is in the **flexibility** that comes from custom properties without the chaos of endless variations. And it is in the **accessibility** built into the foundation rather than added as an afterthought.

I have seen these ideas work in different teams and different codebases, and the pattern is always the same.

> [Once the tokens are in place, keyframes stop being a scattered collection of tricks and become part of the design language. They make the product feel more intentional, more consistent, and more alive.](https://twitter.com/share?text=%0aOnce%20the%20tokens%20are%20in%20place,%20keyframes%20stop%20being%20a%20scattered%20collection%20of%20tricks%20and%20become%20part%20of%20the%20design%20language.%20They%20make%20the%20product%20feel%20more%20intentional,%20more%20consistent,%20and%20more%20alive.%0a&url=https://smashingmagazine.com%2f2025%2f11%2fkeyframes-tokens-standardizing-animation-across-projects%2f)
> 
> “

If you take one thing from this article, let it be this: **animations deserve the same care and structure we already give to colors, typography, and spacing**. A small investment in keyframes tokens pays off every time your interface moves.

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (gg, yk)