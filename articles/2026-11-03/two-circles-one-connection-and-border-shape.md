---
title: "Two Circles, One Connection, and border-shape"
source: "https://blog.master.dev/two-circles-one-connection-and-border-shape/"
publishedDate: "2026-10-30"
category: "css"
feedName: "Frontend Masters Blog"
author: "Temani Afif"
---

In [the previous article](https://blog.master.dev/two-circles-one-arrow-and-anchor-positioning/), we combined anchor positioning with modern CSS features to connect two circles with an arrow. The idea was to create dynamic behavior where the arrow follows the movement of both circles and changes shape based on their distance. We can also show the distance!

At the time of writing, only Chrome and Edge fully support the features we’ll use. The demos in Firefox and Safari likely won’t look right.

Here is a demo from the previous article where you can drag both circles and see the magic in play:

While the technique was a bit elaborate, the shape was basic, so what about fancier shapes? Curved and distorted lines like the ones below.

![A diagram showing four colored blocks labeled A, B, C, and D connected by lines, with the left side depicting a complex network, while the right side illustrates a simpler connection of colored circles.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/p.png?resize=973%2C517&quality=80&ssl=1)

It may sound like a difficult task, but a new powerful feature will make it straightforward: It’s `border-shape`.

## Prerequisites

Well, you need to read [the first article](https://blog.master.dev/two-circles-one-arrow-and-anchor-positioning/) of this series. At least to the section “Linking the Circles” because it’s crucial to understand the anchor positioning part. I will use the same code structure and the same anchor positioning configuration. The only difference will be creating the shapes.

Here is our starting point:

`<div class="circle" size="170px"></div> <div class="circle" size="100px"></div>  <div class="link">   <a></a>   <b></b>   <c></c>   <d></d> </div>`Code language: HTML, XML (xml)

`.link> * {   position: absolute;   --_x: calc(anchor(--c1 inside) + anchor-size(--c1)/2);   --_y: calc(anchor(--c2 inside) + anchor-size(--c2)/2); } .link :is(a,b) {top:  var(--_x); bottom: var(--_y);} .link :is(a,c) {left: var(--_x); right:  var(--_y);} .link :is(c,d) {top:  var(--_y); bottom: var(--_x);} .link :is(b,d) {left: var(--_y); right:  var(--_x);}  .link b {scale: -1  1}  .link c {scale:  1 -1}  .link d {scale: -1 -1}   .circle {   width: calc(attr(size type(<length>)));   aspect-ratio: 1;   anchor-name: --c1; } .circle + .circle {   anchor-name: --c2; }`Code language: CSS (css)

And a demo picked from the previous article with a random shape built with `clip-path`.

The goal is to update that “ugly” shape with a fancy curved line using `border-shape`.

## Why border-shape?

In case you missed it, we got a lot of new features for creating shapes: `corner-shape`, `shape()`, and `border-shape`. I have a bunch of articles about them that I invite you to read. Some are short and quick to read, while others are lengthy and very detailed.

-   [Drawing CSS Shapes using corner-shape](https://blog.master.dev/drawing-css-shapes-using-corner-shape/)
-   [Let’s Reshape the Web using border-shape!](https://css-tip.com/border-shape/)
-   [Get Ready For the Powerful CSS border-shape Property!](https://css-tricks.com/get-ready-for-the-powerful-css-border-shape-property/)
-   [Better CSS Shapes Using shape()](https://css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs/)
-   [Making Complex CSS Shapes Using shape()](https://css-tricks.com/complex-css-shapes-with-shape-function/)

> Do I have to read them all?!

Not really; consider them as references if you want to dig more into those new features. For our case, you only need to understand how `border-shape` works, and it’s pretty simple.

`border-shape` lets us shape the whole element while keeping its decorations such as border, shadow, outline, etc. For comparison, `clip-path` shapes the element as well but clips everything. We all know how tricky it is to have borders when using `clip-path`. It’s no longer an issue with `border-shape`.

![Image showing three shapes: a solid square with a black border and red glow, a clip-path shape with a light blue fill, and a border-shaped figure with a black outline and red glow.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/p-jhYxb.png?resize=891%2C331&quality=80&ssl=1)

Showing the difference between clip-path and border-shape

Now, let’s consider the following example:

`.shape {   border: 10px solid #000;   background: red;   border-shape: polygon(0 0,100% 100%,0 100%); }`Code language: CSS (css)

Nothing fancy. A triangle with a border and a background.

Let’s update the shape and try a slightly more complex one using `shape()`.

`.shape {   border-shape: shape(from 0 0,curve to 100% 100% with 100% 0,line to 0 100%,close); }`Code language: CSS (css)

The shape contains 3 parts: one curved line and two straight lines. Let’s remove the straight lines and keep only the curved one:

`.shape {   border-shape: shape(from 0 0,curve to 100% 100% with 100% 0); }`Code language: CSS (css)

Do you see where I am going with this idea? If we remove the background color, only the curved line remains visible.

![Diagram illustrating the transformation of a red triangular shape into a red rounded shape through a series of transitions.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/9RiADzvB.png?resize=1101%2C237&quality=80&ssl=1)

We use `border-shape` combined with `shape()` to draw a path/line that connects two points, then we set the border property to control the thickness and color:

`.shape {   border: 10px solid #000;   border-shape: shape(...); }`Code language: CSS (css)

That’s it!

If you are new to `shape()`, don’t worry. We are not going crazy with it, so you can easily follow what’s coming next. That said, I have [a four-article series](https://css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs/) if you want to better understand the various commands (line, arc, curve, etc.).

## The Implementation

Let’s take our previous demo and replace `clip-path` with `border-shape`:

`.link > * {   position: absolute;   border: 12px solid #556270;   border-shape: shape(from 0 0,curve to 100% 100% with 100% 0); }`Code language: CSS (css)

Hmm, the result is quite strange. We get more curves than expected. The issue is the use of `border`. The link structure is a set of four elements to distinguish the four possible positions (You have read [the previous article](https://blog.master.dev/two-circles-one-arrow-and-anchor-positioning/), so you should know what I am talking about, right?). The anchor positioning configuration is set to make only one element visible at a time, meaning the others have a size of 0 (the width, the height, or both).

By setting a border, they no longer have a size of 0, so all of them are visible. That’s why you see four strange shapes, but only one is correct and should be visible. To fix this, let’s move the `border-shape` thing to a pseudo-element and use `overflow: hidden` on the main element.

`.link > * {   position: absolute;   overflow: hidden; } .link > *:before {   content: "";   position: absolute;   inset: 0;   border: 12px solid #556270;   border-shape: shape(from 0 0,curve to 100% 100% with 100% 0); }`Code language: CSS (css)

Better but still not perfect. The start and end of the curve aren’t perfectly centered within the circles, and the curve disappears when the circles align horizontally or vertically.

![Abstract illustration showing three circles in different sizes and colors: two larger teal circles, one smaller orange circle, with a curved line connecting a red dot to an orange circle.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/wEI8KfVQ.png?resize=878%2C367&quality=80&ssl=1)

To fix the alignment, we can add `border-box` as a second value to `border-shape`:

`.link > *:before {   border: 12px solid #556270;   /* we add border-box at the end */   border-shape: shape(from 0 0,curve to 100% 100% with 100% 0) border-box; }`Code language: CSS (css)

This will change the reference compared to the default behavior:

![Comparison of two box model settings in CSS: half-border-box (default) on the left with rounded corners, and border-box on the right with sharp corners.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/CmT475LI.png?resize=1096%2C380&quality=80&ssl=1)

Our shape is a line with a thickness equal to `border-width`. By default, that line is placed in a way to match the border area (don’t ask me why it’s called half-border-box). By using `border-box`, the midpoint of the line will start at the top-left corner of the element. If the line were straight, it would be half outside and half inside. You can clearly notice this behavior at the start and end of the curve.

This fixes the alignment issue:

Ah, `overflow: hidden` is hiding the outside part of the shape, which is not good. We need something different.

I will toggle the opacity of the pseudo-element based on the element size:

`.link * {   container-type: size; } .link *:before {   opacity: calc(sign(1cqw)*sign(1cqh)); }`Code language: CSS (css)

It’s the same technique I used in the first article:

> If either the width or the height of the element is `0`, it means that either `1cqh` or `1cqw` will be `0`. `sign()` of `0` is also `0` hence we get `opacity: 0` (invisible).

We can do the same with the display property if we combine it with `if()`:

`.link * {   container-type: size; } .link *:before {   display: if(style(calc(sign(1cqw)*sign(1cqh)) = 0):none); }`Code language: CSS (css)

The latter is more robust because it removes the element completely, avoiding weird overflow issues caused by invisible elements. I will remind you about this when we face such an issue.

Now, we are good!

Good but still not perfect. If you drag the circles around, you will notice that the curve gets misaligned at some points, and there is a weird jump when moving from one area to another. This is again because of the border.

The pseudo-element has a border width equal to `12px`, meaning that its width/height cannot be smaller than `24px`. When the main element shrinks from `24px` to `0px`, the pseudo-element will overflow, and we get that weird misalignment.

Since we cannot avoid that overflow, let’s keep it consistent all the time. Instead of using `inset: 0`, we use `inset: -12px`. This means the pseudo-element’s border always overflows the main element. This will shift the position of the curve, but we can fix that by changing `border-box` to `padding-box`.

`.link > *:before {   inset: -12px; /* instead of inset: 0 */   border: 12px solid #556270;   /* we add padding-box at the end */   border-shape: shape(from 0 0,curve to 100% 100% with 100% 0) padding-box; }`Code language: CSS (css)

Now, it’s perfect! The curve links both circles from their centers, and everything remains aligned when you update the circles’ positions.

Getting the correct position was a bit tricky, so I wanted to highlight the process I followed to align everything perfectly. If you are a bit lost, don’t worry; I struggled to find the right configuration too. Give it another read and play with the demos to better understand each fix.

## Improving the Shape

The shape I used was “ugly”, right? I know. It was only a temporary one to get the implementation done, but now we can update it with whatever we want. The good news is that we just need to update the `shape()` value without touching the rest of the code.

Let’s try the following:

`shape(from 0 0,curve to 50% 50% with 50% 0,smooth to 100% 100%)`Code language: CSS (css)

This time, I draw a first curve from the top-left corner to the middle, then use the `smooth` command to draw a second curve that mirrors the first one to the bottom-right corner.

A lot better!

We can still go fancier and update the shape based on the distance between the two circles.

`.link > *:before {   border-shape: if(     style((100cqw < 200px) or (100cqh < 200px)):      shape(from 0 0,line to 100% 100%);     else:      shape(from 0 0,curve to 50% 50% with 50% 0,smooth to 100% 100%);)    padding-box; }`Code language: CSS (css)

If the vertical or horizontal distance (defined by `100cqw` and `100cqh`) is less than `200px`, we transform the shape into a straight line. Otherwise, we keep the previous curve.

Here is an even better way to achieve the same thing:

`.link > *:before {   border-shape: if(     style((100cqw < 200px) or (100cqh < 200px)):      shape(from 0 0,curve to 50% 50% with 0   0,smooth to 100% 100%);     else:      shape(from 0 0,curve to 50% 50% with 50% 0,smooth to 100% 100%);)    padding-box; }`Code language: CSS (css)

Instead of changing the shape completely, we keep the same structure and update some values. By changing the `with` and making it equal to the initial point, the curve becomes a straight line.

It sounds more complex than the first one, but this code lets us have a smooth transition between both shapes since they share the same structure!

Do you see the potential of this technique? Not only can we easily draw complex curves with `shape()`, but we can also update them conditionally based on the distance between the two elements using `if()` and container query units. For this reason, there will be a third article to complete this series with more examples and more shapes!

What about the extremities of the line? Can we make them look better?

Yes, we can. For that, we have the other pseudo-element we can use to draw the extremities using `shape()` or any other technique depending on your needs.

Here is an example where I am applying the same CSS to both pseudo-elements. Then each one will have its own `border-shape` configuration.

`.link > *:before, .link > *:after {   content: "";   position: absolute;   inset: -12px;   border: 12px solid #556270;   display: if(style(calc(sign(1cqw)*sign(1cqh)) = 0):none);   /* draw the curved line */   border-shape: if(     style((100cqw < 200px) or (100cqh < 200px)):      shape(from 0 0,curve to 50% 50% with 0   0,smooth to 100% 100%);     else:      shape(from 0 0,curve to 50% 50% with 50% 0,smooth to 100% 100%);)    padding-box;   transition: border-shape .3s; } .link > *:after {   /* draw two circles */   border-shape:      shape(from 6px 0,arc by 0 .1px of 6px large,       move to calc(100% + 6px) 100%,arc by 0 .1px of 6px large)      padding-box }`Code language: CSS (css)

How am I creating the circles? This will be your homework. Try to dissect the `shape()` value to understand how one arc command can simulate a circle. Mastering `shape()` is crucial for this technique because it allows you to easily create complex connections, so don’t hesitate to learn more about it ([my four-article series](https://css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs/) is a good starting point).

Here is another example with arrow shapes.

This time, I am getting back to `clip-path` but still using `shape()` to create the arrows:

`.link {   --s: 25px; /* size of arrow */   --t: 12px; /* line thickness */ } .link > *:before, .link > *:after {   --a: atan(100cqh/100cqw);   --d: calc(var(--s)/sqrt(2));   display: if(style(calc(sign(1cqw)*sign(1cqh)) = 0):none); } .link > *:before {   inset: calc(-1*var(--t));   border: var(--t) solid #556270;   border-shape: if(     style((100cqw < 200px) or (100cqh < 200px)):      shape(from calc(var(--d)*cos(var(--a))) calc(var(--d)*sin(var(--a))),           line to calc(100% - calc(var(--d)*cos(var(--a))))                    calc(100% - calc(var(--d)*sin(var(--a)))));     else:      shape(from var(--d) 0,curve to 50% 50% with 50% 0,smooth to calc(100% - var(--d)) 100%);)    padding-box; } .link > *:after {   inset: 0;   border-image: conic-gradient(#556270 0 0) fill 0//99px;   clip-path: if(     style((100cqw < 200px) or (100cqh < 200px)):         shape(from 0 0,             line to calc(var(--s)*cos(var(--a) - 45deg)) calc(var(--s)*sin(var(--a) - 45deg)),            line to calc(var(--s)*cos(var(--a) + 45deg)) calc(var(--s)*sin(var(--a) + 45deg)),           move to 100% 100%,             line to calc(100% - var(--s)*cos(var(--a) - 45deg)) calc(100% - var(--s)*sin(var(--a) - 45deg)),            line to calc(100% - var(--s)*cos(var(--a) + 45deg)) calc(100% - var(--s)*sin(var(--a) + 45deg))          );     else:         shape(from 0 0,              line to var(--d) calc(-1*var(--d)),             line to var(--d) var(--d),           move to 100% 100%,              line to calc(100% - var(--d)) calc(100% - var(--d)),             line to calc(100% - var(--d)) calc(100% + var(--d))          );); }`Code language: CSS (css)

But the code is unreadable?! What the heck is this?

I know, I know. I said we’d keep things simple, but I cannot miss the chance to show what this technique can do. By introducing CSS variables and math functions, we can create complex-looking shapes with precision.

## Conclusion

Let’s stop here for this article. We will explore more examples in the next one. Until then, take the time to study the technique and how everything works. It has three parts: the anchor positioning configuration (explained in the first article), the `border-shape` configuration with the fixes to keep everything perfectly aligned, and the shape creation using `shape()`.

Don’t be discouraged by the complexity of the `shape()` function. It’s one of those features that takes a lot of practice to get used to.