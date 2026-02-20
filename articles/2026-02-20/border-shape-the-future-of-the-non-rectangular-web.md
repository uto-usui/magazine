---
title: "border-shape: the future of the non-rectangular web"
source: "https://una.im/border-shape/"
publishedDate: "2026-02-19"
category: "css"
feedName: "Una Kravets"
---

![](https://una.im/posts/border-shape/thumb.jpg)

Published on February 19, 2026

Creating non-standard shapes on the web, like a speech bubble or a heart have typically required you to cut off your actual borders with `clip-path`. More recently, [`corner-shape`](https://www.google.com/search?q=%5Bhttps://developer.mozilla.org/en-US/docs/Web/CSS/corner-shape%5D\(https://developer.mozilla.org/en-US/docs/Web/CSS/corner-shape\)) landed in Chrome, which gives us more options for styling how a corner looks, but is still quite limited.

> This is where `border-shape` comes in. It’s a powerful upcoming CSS primitive that defines a custom shape for an element’s border.

`border-shape` is currently available for testing in Chrome Canary 146+ with the experimental web platform features flag turned on. Part of the [CSS Borders and Box Decorations Module Level 4](https://drafts.csswg.org/css-borders-4/#border-shape), this property allows developers to define the geometry of an element’s border using the same flexible syntax we use for paths and `shape()`.

## All about `border-shape`

Unlike `clip-path`, which simply masks an element, `border-shape` actually redefines the “box” itself. When you apply a shape to a border, the background, the border-image, focus outline, and the box-shadow all follow that new geometry.

See demo on [Codepen](https://codepen.io/una/pen/ByzYMVb)

The property accepts several values, including:

-   **Basic Shapes:** `circle()`, `ellipse()`, `inset()`, and `polygon()`.
-   **The `shape()` function:** A powerful new way to draw complex paths directly in CSS (in Chrome and a part of [Interop 2026](https://web.dev/blog/interop-2026#the_shape_css_function))
-   **Path Strings:** Similar to SVG path data (e.g., `path("M 10 10 L 90 10 ...")`).

## `border-shape` vs. `corner-shape`

While both are new and live within the same Level 4 specification, `border-shape` and `corner-shape` serve two different architectural purposes.

`corner-shape` doesn’t extend beyond corner styling, so you couldn’t have a cut-out or extrusion in the middle-bottom of your element, or create non-normative shapes like a star. It’s great when you want to adjust the corners to some simple, browser-provided shapes, but for more complex shapes, you’ll want to reach for `border-shape`.

I built a little tool to help you quickly play with it:

See the Pen [Simple corner-shape visualizer](https://codepen.io/una/pen/PwNozMX) by Una Kravets ([@una](https://codepen.io/una)) on [CodePen](https://codepen.io/).

## Tooltips with `border-shape`

The first thought that came to mind when I saw this API was _“Amazing! we can finally do tooltips—for real!”_ This is a big deal! _(That was not AI generated, I use em dashes my friends. I studied typography in college)._

Previously, to create tooltips in CSS, you had to either cut off the edges of a div using `clip-path` or use the [triangle hack](https://css-tricks.com/snippets/css/css-triangle/) with pseudo elements. Both have their downsides.

In this demo, I’m building a tooltip around the border using the arrow position, height, and width. It also includes the border radius in the calculation (optional). Play with the values to build your own tooltip and copy the code, with a `clip-path` fallback. This is why on unsupported devices, you will see the border cut off on the bottom of the tooltip. With `border-shape` supported, borders and shadows work as expected.

See the Pen [Border-shape demo](https://codepen.io/una/pen/bNeLmoZ) by Una Kravets ([@una](https://codepen.io/una)) on [CodePen](https://codepen.io/).

First set the variables:

```
--r: 10px;  /* Corner Radius */
--ap: 50%;  /* Arrow Position */
--ah: 10px; /* Arrow Height */
--aw: 10px; /* Arrow Width (Half) */
```

Then create the `border-shape` `shape()`:

```
border-shape: shape(from var(--r) 0,
  hline to calc(100% - var(--r)),
  curve to right var(--r) with right top,
  vline to calc(100% - (var(--r) + var(--ah))),
  curve to calc(100% - var(--r)) calc(100% - var(--ah)) with right calc(100% - var(--ah)),
  hline to calc(var(--ap) + var(--aw)),
  line by calc(var(--aw) * -1) var(--ah),
  line by calc(var(--aw) * -1) calc(var(--ah) * -1),
  hline to var(--r),
  curve to left calc(100% - (var(--r) + var(--ah))) with left calc(100% - var(--ah)),
  vline to var(--r),
  curve to var(--r) top with left top);
}
```

Now you can take this and put it into action, like in this tooltip demo, which animates the `border-shape` based on its `anchor` position using [anchored container queries](https://developer.chrome.com/blog/anchored-container-queries):

See demo on [Codepen](https://codepen.io/una/pen/RNRQqvN).

See the Pen [border-shape + anchored CQ](https://codepen.io/una/pen/RNRQqvN) by Una Kravets ([@una](https://codepen.io/una)) on [CodePen](https://codepen.io/).

## Chevron nav demo

See demo on [Codepen](https://codepen.io/una/pen/ByzYMVb).

See the Pen [border-shape chevron nav styled](https://codepen.io/una/pen/ByzYMVb) by Una Kravets ([@una](https://codepen.io/una)) on [CodePen](https://codepen.io/).

This one looks a little simpler. To “type-read” this out: starting from the top-left, move to the end of the div clockwise (less the arrow size, because we then need to start drawing out to the arrow point). Then, draw a line to the center right point. Then, draw a line back to the bottom at 100% of the element less the arrow-size. Again, move all the way to the left. Finally, draw a line inward to the center at the width of the arrow size, and close it.

```
border-shape: shape(
  from top left,                            
  hline to calc(100% - var(--arrow-size)), 
  line to right center,                           
  line to calc(100% - var(--arrow-size)) bottom,
  hline to left,                                
  line to var(--arrow-size) center,              
  close                                      
);
```

The first element has a slight adjustment where I just removed the line before the `close` instead of adding the inset chevron of the last step above.

```
border-shape: shape(
  from top left,                            
  hline to calc(100% - var(--arrow-size)), 
  line to right center,                           
  line to calc(100% - var(--arrow-size)) bottom,
  hline to left,      
  close                                      
);
```

This demo is really neat because you can add a gap and really see how this works. No need to mess with z-index, no layering, and borders/outlines will follow the `border-shape` perfectly. Just real geometry. Pretty cool!

## Scalloped Borders

Next, I wanted to explore more complex borders like this scalloped border. This is one of the first [Houdini demos](https://extra-css.netlify.app/) I built back in the day. This one is a bunch of arcs going clockwise.

![dog photo with scalloped borders](https://una.im/posts/border-shape/scalloped-border.jpeg)

See demo on [Codepen](https://codepen.io/una/pen/bNePyrR). Yes it's a little much but I was testing the intersection of both borders and shadows.

```
border-shape: shape(
    from 0% 0%,

    /* TOP EDGE: Moving +X */
    arc by 20% 0% of 10% 10% small cw,
    arc by 20% 0% of 10% 10% small cw,
    arc by 20% 0% of 10% 10% small cw,
    arc by 20% 0% of 10% 10% small cw,
    arc by 20% 0% of 10% 10% small cw,

    /* RIGHT EDGE: Moving +Y */
    arc by 0% 20% of 10% 10% small cw,
    arc by 0% 20% of 10% 10% small cw,
    arc by 0% 20% of 10% 10% small cw,
    arc by 0% 20% of 10% 10% small cw,
    arc by 0% 20% of 10% 10% small cw,

    /* etc... */

    close
  ) content-box;
```

You may have noticed a new keyword there `content-box`, which specifies that you’re using all of the coordinated and percentages relative to the element’s content-area inside of its padding. So in this example, you will always have 5 scallops which are 20% of the width or height (depending on direction). You also need to make sure the padding is wide enough to cover the edges, though there is an [open issue](https://github.com/w3c/csswg-drafts/issues/13506) about how this should behave.

## Wrap up

`border-shape` is a really big change to geometry on the web platform, and experimenting with this capability is a lot of fun! I think it’s a game-changer for the non-rectangular web.

To experiment with it now, you’ll need to be in the latest Chrome Canary with the Experimental Web Platform Features flag enabled (`chrome://flags/#enable-experimental-web-platform-features`).