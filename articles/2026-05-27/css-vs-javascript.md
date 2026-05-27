---
title: "CSS vs. JavaScript"
source: "https://www.joshwcomeau.com/animation/css-vs-javascript/"
publishedDate: "2026-05-26"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

One of the most common questions around animation performance is whether JS-based animations are slower than CSS-based ones. Should we always strive to use CSS transitions, or is it OK to use JavaScript animation libraries?

There’s a surprising amount of nuance to this question, and I think that the conventional wisdom isn’t quite right. In this post, we’re going to dig into this question and see the differences for ourselves!

## [Link to this heading](#comparing-css-keyframes-to-javascript-loops-1)Comparing CSS keyframes to JavaScript loops

Let’s suppose we’re building the following animation:

We can wire this up with a CSS keyframe, like this:

```
@keyframes bounce {
  to {
    transform: translateX(calc(var(--bounce-magnitude) * -1));
  }
}

.ball {
  --bounce-magnitude: 200px;
  animation: bounce 1000ms infinite alternate;
}
```

(I’m using a [CSS transform](https://www.joshwcomeau.com/css/transforms/) for this animation because it produces the smoothest motion. In cases where the container size is dynamic, we would need to calculate and apply `--bounce-magnitude` in JS.)

Alternatively, we could implement this animation using JavaScript! Before we consider JS libraries like GSAP or Motion, let’s start with a plain JS version:

```
const startTime = performance.now();

const ball = document.querySelector('.ball');

function animate() {
  const elapsedTime = performance.now() - startTime;

  // ✂️ Calculate `x` based on the amount of time that has passed.

  ball.style.transform = `translateX(${x}px)`;

  window.requestAnimationFrame(animate);
}
```

This code uses `requestAnimationFrame` to run the `animate` function on every frame (60 times per second on most displays). I’ve cut out the main logic to calculate `x` since it’s a bit complicated and not relevant for the topic at hand, but you can [see the full code(opens in new tab)](https://courses.joshwcomeau.com/playground/bouncing-ball-raf) if you’re curious.

_Here’s the question:_ which approach do you think runs more smoothly?

I think for most of us, our intuitions would tell us that the CSS version is more performant. And our intuition is correct, but maybe not for the reasons we think. 😅

You might think that the JS version is slower because it has to do all that extra work calculating the `x` value on every frame, or that there’s an extra cost to “crossing the bridge” between JavaScript and the DOM. But modern browser engines can tackle all of that stuff without breaking a sweat; even on low-end devices, that work happens in a tiny fraction of a millisecond, way too quick to affect the framerate of our animation.

**But there’s one significant difference:** the JavaScript version runs on the main thread, along with _everything else_ happening in our application. CSS transitions and keyframe animations run on a separate thread, so they aren’t disrupted when stuff happens in JavaScript.

**I’ve taken the liberty of creating a simulation.** Click the “Play” button to run the demo. Every few seconds, the main thread will be blocked. Notice what effect it has on these two animations:

Using CSS Keyframes

Using a JavaScript loop

In modern web applications, the main thread does _a lot_ of work. JavaScript frameworks like React are constantly making updates to the DOM, to keep it in sync with application state. Every time we make a `fetch` request (eg. to load more data, or to refresh existing data), that response has to be parsed by the main thread.

So, if you’ve ever seen a spinner freeze for a moment before the UI is updated, this is why! JavaScript-based animations have to compete for processing power with the rest of the application.

## [Link to this heading](#comparing-animation-libraries-2)Comparing animation libraries

In the example above, I used a `requestAnimationFrame` loop to update the UI on every frame in JavaScript. This is a pretty low-level technique; in practice, many developers use JavaScript libraries that provide a higher-level abstraction.

Let’s compare two popular animation libraries, [Motion(opens in new tab)](https://motion.dev/) (formerly Framer Motion) and [GSAP(opens in new tab)](https://gsap.com/):

Using CSS Keyframes

Using the Motion library

Using GSAP

Huh! Both Motion and GSAP are JavaScript-based, so you might expect them to share the same limitations of running on the main thread. But somehow, Motion manages to keep the animation running smoothly even when the main thread is occupied. 🤔

The secret is that Motion uses the [Web Animations API(opens in new tab)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) (WAAPI) under the hood. WAAPI is essentially a JavaScript interface that hooks into the same low-level animation engine as CSS keyframe animations. So, Motion is able to run its animations on a separate thread, avoiding the main pitfall of most other JavaScript animation libraries! 😮

To be fair to GSAP, it’s an enormously powerful library which includes features that probably aren’t compatible with WAAPI. So, it’s not that GSAP made the wrong choice, it’s that they’re choosing different trade-offs.

## [Link to this heading](#the-right-tool-for-the-job-3)The right tool for the job

In my own work, I try to use native CSS animations/transitions whenever I can. When I run into situations that CSS alone can’t handle, I try to use a library like Motion, which solves the problem without the drawbacks typically associated with JS libraries.

That said, CSS has become so powerful that there really aren’t _that_ many cases where we need to reach for an animation library these days; new APIs like View Transitions, [linear()](https://www.joshwcomeau.com/animation/linear-timing-function/), and [Animation Timeline](https://www.joshwcomeau.com/animation/scroll-driven-animations/) make it possible to do all sorts of stuff without JavaScript. ✨

We explore all of these tools, and so much more, in my brand-new course, [Whimsical Animations(opens in new tab)](https://whimsy.joshwcomeau.com/). I’ll show you how I design and implement top-tier animations using modern CSS, JavaScript, SVG, and Canvas.

[![Whimsical Animations, a course from Josh W. Comeau](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fwhimsical-animations.jpg&w=1920&q=75)](https://whimsy.joshwcomeau.com/)

These days, LLMs are great at generating syntax, but we still need to use our own judgment. In this blog post, we learned about the performance considerations between CSS and JavaScript, and my course is full of stuff like this. So, regardless of whether you’re writing code by hand or not, this course will help you create stunning animations and interactions.

**🌸 And I’m currently running my annual Spring Sale!** You can save up to $150 on the course, but only for a limited time. You can learn more here:

-   [Whimsical Animations(opens in new tab)](https://whimsy.joshwcomeau.com/)
    

### Last updated on

May 26th, 2026