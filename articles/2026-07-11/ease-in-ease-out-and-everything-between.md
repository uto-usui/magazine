---
title: "Ease in, ease out, and everything between"
source: "https://www.carmenansio.com/articles/css-easing-explained/"
publishedDate: "2026-07-10"
category: "design"
feedName: "Sidebar"
---

You have already done this. If you have ever grabbed a handle in the pen tool, one of those little control points hanging off a path in Figma, and pulled until the curve bent the way you wanted, you already know how to write a CSS easing curve. It is the same handle. `cubic-bezier()` hands you two of them. The only difference is what they bend: in the pen tool they bend a shape, here they bend time.

That is not a metaphor. Pierre Bézier invented those handles at Renault in the 1960s to describe the curve of a car body, and the `cubic-bezier()` in your stylesheet is literally his math. The pen tool and the easing function are the same tool pointed at different things.

The handles mostly go untouched. The `cubic-bezier()` values in a token file get pasted from somewhere and never questioned, and `ease-in-out` becomes the reflex for anything not worth a second thought. But when you start dragging them, watching each one move a real element, they stop being magic numbers. Here they are. Drag them.

`cubic-bezier(0.25, 0.1, 0.25, 1)`

```
/* The two handles you just dragged, as four numbers */
transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
/*                                      ↑     ↑    ↑     ↑
                                        x1    y1   x2    y2
   x1, y1 = the handle that leaves the start
   x2, y2 = the handle that arrives at the end      */
```

That dot is running the exact curve in the graph, live. The four numbers are just the two handle positions: `x1, y1` for the handle leaving the start, `x2, y2` for the one arriving at the end. The `x` values are time and stay between 0 and 1, because time does not run backward. The `y` values are progress, and progress is allowed to shoot past 1 or dip below 0. The rest of this is naming the positions worth remembering.

## Easing is where the frames bunch up

Before any of this was code, an animator planning a move drew a timing chart: a little ladder of tick marks down the side of a drawing, one tick per in-between frame, showing where each one landed. Evenly spaced ticks meant constant speed. Ticks crowded together meant the drawing barely moved from one frame to the next, which the eye reads as slow. Ticks spread far apart meant fast.

An easing curve is that timing chart. Sample the curve at even moments in time, read off how far the motion has traveled at each one, and you get the spacing of the frames, the faint ghosts below. Now drag the **time** handle yourself. You move it at one steady rate, and the three balls move at three different ones. That gap between the time you put in and the motion you get out is the whole of easing:

time

linear

ease-in

ease-out

drag the time handle

```
// One linear time value drives every row through its own easing curve.
const p = easing(t);                 // t: linear time in.  p: eased progress out.
ball.style.left = `${p * 100}%`;     // same t, three different p, three motions.
```

`linear` spaces the frames evenly, so it moves like a machine. `ease-in` crowds them at the start, barely moving before it takes off. `ease-out` crowds them at the end, arriving fast and settling. That is all easing decides: where the in-between frames land. It is the same interpolation the whole of motion runs on, which I pulled apart in [The Maths Behind Every Animation](https://www.carmenansio.com/articles/maths-behind-animation/). The curve is just a friendlier way to draw the chart.

## in, out, and the one rule

The keyword names point at the crowded end. `ease-in` is slow at the start, `ease-out` slow at the end, `ease-in-out` slow at both. The difference is easy to shrug at on a curve and impossible to ignore on a real component. Here is the same notification arriving with each one. Tap to send it in again:

Message sent

Delivered to 3 people

```
.card {
  animation: slide-in 0.7s both;
  animation-timing-function: cubic-bezier(0, 0, 0.58, 1); /* ease-out */
}
@keyframes slide-in {
  from { opacity: 0; transform: translateX(48px) scale(0.96); }
  to   { opacity: 1; transform: none; }
}
```

`ease-out` arrives fast and settles, decisive. `ease` dawdles at both ends. `ease-in` barely moves and then snaps home, which is exactly what makes an entrance feel sluggish. `spring` overshoots and rocks back. Same card, same 0.7 seconds, four different tempers. Which is the case for the one rule worth keeping over the definitions:

-   **Entering the screen: `ease-out`.** It arrives at full speed and settles, which reads as decisive.
-   **Leaving the screen: `ease-in`.** It starts gently and accelerates away, so it reads as _gone_ rather than yanked.
-   **Moving between two visible spots: `ease-in-out`.** A card reordering, a thumb crossing a toggle, where you want continuity at both ends.

`ease-in` on an entrance is the specific reason most sluggish interfaces feel sluggish: the thing you are waiting for spends its first frames barely moving. This matters most exactly where things appear and disappear, which has its own set of tools, `@starting-style` and discrete transitions, covered in [CSS Entry & Exit Animations](https://www.carmenansio.com/articles/css-entry-exit-animations/).

## The keywords are just presets

Every keyword is one spot to leave the handles. These are not approximations, they are the exact values the browser uses. Type any of them into the playground at the top and the handles jump to match:

```
ease         →  cubic-bezier(0.25, 0.1, 0.25, 1.0)
ease-in      →  cubic-bezier(0.42, 0.0, 1.0,  1.0)
ease-out     →  cubic-bezier(0.0,  0.0, 0.58, 1.0)
ease-in-out  →  cubic-bezier(0.42, 0.0, 0.58, 1.0)
linear       →  cubic-bezier(0.0,  0.0, 1.0,  1.0)
```

`ease-out` is just “first handle pinned to the origin, so the curve leaves at full speed.” No magic in the keyword, only a spot worth memorizing.

## Past the edges of the box

The keywords all keep their handles inside the square. The interesting curves live outside it. Go back to the playground and drag the top handle above the box, past a `y` of 1: the curve arcs over the ceiling and the dot overshoots its target before easing back. That is a spring. Drag a handle below the floor and the dot winds up, dipping backward before it launches. Those two moves, overshoot and windup, are the ones no keyword can reach, and they are why `cubic-bezier(0.34, 1.56, 0.64, 1)` shows up in so many stylesheets: the `1.56` is a handle shoved above the ceiling.

Which handful of those curves are worth keeping as named tokens, and how to choreograph several of them into a sequence that feels intentional, is a craft of its own, the subject of [The Art of CSS Motion](https://www.carmenansio.com/articles/art-of-css-motion/) and [Building a Motion System](https://www.carmenansio.com/articles/motion-tokens-design-systems/). And a single Bézier has a hard ceiling: two handles, one arc. A real spring crosses its target more than once as it settles, and no two handles can draw that. When you need the genuine physics, CSS `linear()` lets you pour in a real spring equation, which I went all the way into in [Spring Physics in CSS](https://www.carmenansio.com/articles/spring-physics-css/).

## The reduced-motion boundary

Every choice above assumes the motion runs at all. Plenty of people turn it off at the OS level, and honoring that is the first line I put in a project, not the last:

```
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

The element still lands in its final state, with no travel in between. The handles decide how a thing moves. This decides whether it moves at all, and that one comes first.

Motion

Reach for

Entering the screen

`ease-out`

Leaving the screen

`ease-in`

Moving between visible positions

`ease-in-out`

Needs a bounce or overshoot

a handle past `y = 1`, or `linear()`

You have been dragging these handles for years in the pen tool. The only new idea is that one of the axes is time. Grab them, push the curve until the motion feels right, then read the four numbers off and keep them.