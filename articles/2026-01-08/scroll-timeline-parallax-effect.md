---
title: "Scroll Timeline Parallax Effect"
source: "https://css-irl.info/scroll-timeline-parallax-effect/"
publishedDate: "2023-11-21"
category: "css"
feedName: "CSS IRL"
---

I’ve been playing around with [scroll-driven animations](https://drafts.csswg.org/scroll-animations-1) a bit lately. Scroll timelines allow us to link the progress of element’s animation to the progress of a scroll container, as I wrote about not long ago for [MDN](https://developer.mozilla.org/en-US/blog/scroll-progress-animations-in-css/).

It’s remarkably easy to link an animation to the root scroller (which in most cases, is probably where it’s going to be most useful). This demo uses the `animation-timeline` property to create a parallax effect. We’re creating an anonymous scroll timeline linked to a keyframe animation. The animation translates an element on the _y_ axis, using a custom property value. We’re using three elements positioned on top of each other as the background, foreground and middle ground layers. For each one all we have to do is adjust the custom property to change the amount that each layer moves, thereby changing whether they appear nearer or further away relative to the user. Pretty cool!

This demo will only work in Chromium for the moment.

See the Pen [Multi-layer parallax effect scroll timeline](https://codepen.io/michellebarker/pen/WNPzXew) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).