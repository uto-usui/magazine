---
title: "Different Approaches to Responsive CSS Motion Path"
source: "https://css-irl.info/responsive-css-motion-path/"
publishedDate: "2020-04-18"
category: "css"
feedName: "CSS IRL"
---

When it comes to using [CSS Motion Path](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Motion_Path), it always bugs me that the path itself is doesn’t scale. The path size, as created, is essentially a fixed size, in pixels. It means that responsive design with Motion Path is a little tricky, and requires some workarounds.

## Scaling the path

Happily, fellow CodePen enthusiast (and awesome animator) [Jhey Tompkins](https://twitter.com/jh3yy) has figured out a way to scale a path value, with some imaginative thinking, and charting library [D3](https://d3js.org/) - and has [written about it on CSS Tricks](https://css-tricks.com/create-a-responsive-css-motion-path-sure-we-can/). This is a clever way to scale the path if you _don’t_ want the elements on the path to scale themselves. It even allows for scaling the path on either axis, if we don’t want to preserve the aspect ratio. Jhey even put together a demo testing it on one of my own CodePen experiments:

## A transform approach

As Jhey’s demo shows, we’d also need to do some work to scale the text to get a result that’s useful for us. Sometimes it might make more sense to scale not only the path, but the elements animating on it, when the viewport is resized. I tested a different approach: using [Resize Observer](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) to calculate the transform `scale` value from a parent container. This outputs a custom property value, which is then used in a CSS transform:

This also with other content in the document flow, which I wasn’t sure it would.

Both of these approaches would benefit from more experimentation, and could be useful in different cases. I’m looking forward to working with them a bit more, as being able to scale paths would be a big incentive to using Motion Path in production.