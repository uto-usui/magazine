---
title: "Fun with CSS Motion Path"
source: "https://css-irl.info/fun-with-css-motion-path/"
publishedDate: "2020-01-06"
category: "css"
feedName: "CSS IRL"
---

![screenshot of spiral motion path animation](https://css-irl.info/fun-with-css-motion-path-01.jpg)

Animating an element along a path is something we as developers would normally reach for a big old JS library (like [GSAP](https://greensock.com/gsap/)) for. But with the new [CSS Motion Path](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Motion_Path) module, we can create fancy path animations using only CSS!

I’ve created a couple of fun little animations that play around with these properties – we’ll walk through some of the techniques involved in this article.

## Simple path animation

To create a path animation we need to use `offset-path` with a value of the path we want to animate along (the syntax is like an SVG path), and animate the `offset-distance` property:

```
.obj {
  offset-path: path('M.4 84.1s127.4 188 267.7 0 247.3 0 247.3 0');
  animation: move 2000ms;
}

@keyframes move {
  100% {
    offset-distance: 100%;
  }
}
```

Here’s a simple example:

We can also change the rotational behaviour and position of the animated object using `offset-rotate` and `offset-position` respectively, which could allow for some cool effects. In this demo you can see the effect of `offset-rotate` when compared to the default: the second object does not rotate relative to the path, but remains fixed.

I was also interested in being able to show the actual path the elements are moving along. In the demos above I’m doing this by including an SVG with the same path co-ordinates in the HTML and using absolute positioning. The spec allows for a URL to be passed to the `path()` function (similar to `clip-path`), which would mean we could simply include the SVG path ID, and avoid duplicating the path in CSS. (Our CSS file becomes very messy when we include a complicated path with many coordinates!) But that doesn’t appear to be supported anywhere yet, so we’ll have to make do with using path coordinates.

This also means we have less control over making the animation responsive, as we can’t scale our SVG and have the path match. If we try and change the SVG width then the path remains at its original size. (I’m fairly sure this is the case, as I can’t get it to behave any other way – if you have a solution, please let me know!)

## “Drawing” the path

Not only can we move an element along the path, we can make it look like it’s drawing the path too. We can already “draw” SVG paths using the `stroke-dashoffset` and `stroke-dasharray` properties in CSS – the trick is setting the `stroke-dasharray` value to the length of the path, then animating from that offset value to 0:

```
.path {
  stroke-dasharray: 520;
  stroke-dashoffset: 520;
  animation: draw 1000ms;
}

@keyframes draw {
  100% {
    stroke-dashoffset: 0;
  }
}
```

([This article from CSS Tricks](https://css-tricks.com/svg-line-animation-works/) breaks it down in finer detail.)

If we use the “drawing” animation with the same duration and timing function (easing) as the `offset-path` animation, then these will happen simultaneously, and the path will appear as if it’s being drawn by the animated element.

In the second of the two demos at the beginning of this article, the animation moving the object along the path loops through twice for every cycle of the stroke animation. Using `stroke-dashoffset` the line is drawn in and then out again (going from a positive to a negative offset value), so it appears to be drawn and then subsequently erased:

```
.path {
  stroke-dasharray: 520;
  stroke-dashoffset: 520;
  animation: draw 1000ms;
}

@keyframes draw {
  0% {
    stroke-dashoffset: 520;
  }
  50% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -520;
  }
}
```

## Smoother animation with `box-shadow`

There’s one more little trick to these animations: When building the first example, I noticed that as it was quite fast, the animation looked jumpy at some points. To make the animation feel more natural I added a box shadow while the object was moving – this creates a kind of motion blur effect, and feels much smoother:

```
@keyframes move {
  10% {
    opacity: 1;
    offset-distance: 0%;
  }
  30% {
    box-shadow: -0.5rem 0 0.3rem salmon;
  }
  70% {
    box-shadow: -0.5rem 0 0.3rem salmon;
  }
  90% {
    opacity: 1;
    offset-distance: 100%;
    box-shadow: none;
  }
  100% {
    opacity: 0;
    offset-distance: 100%;
  }
}
```

## Browser support

At the time of writing, `offset-path` is only supported in Chrome – although it can be enabled in Firefox with the `layout.css.motion-path.enabled` flag, and is set to be supported as standard in the next Firefox release.

## Resources

[Dan Wilson](https://twitter.com/dancwilson) has created useful selection of [Codepen demos](https://codepen.io/danwilson/pens/public) that demonstrate the different properties of Motion Path. He’s also just published [an article](http://danielcwilson.com/blog/2020/01/motion-path-quirks/) on it. (Thanks [Adam Kuhn](https://twitter.com/cobra_winfrey) for pointing me in his direction!)