---
title: "Stop buttons triggering zoom when they’re double tapped"
source: "https://piccalil.li/blog/stop-buttons-triggering-zoom-when-theyre-double-tapped/"
publishedDate: "2026-09-23"
category: "css"
feedName: "Piccalilli"
author: "Andy Bell"
---

I stumbled across [this great project](https://bsky.app/profile/renderg.host/post/3mvipol2rzk2m) by [Barry Prendergast](https://renderg.host/). It’s a web-based radio player with a _lush_ UI. On mobile I spotted that as I was rapidly flicking through the stations to find one that was on air, the browser was zooming in and out.

Here’s a screen clip:

I thought this behaviour was related to their viewport meta tag setup, but they have that set up perfectly:

`<meta name="viewport" content="width=device-width, initial-scale=1.0">`

Now, you could prevent the zooming by adding `, maximum-scale=1.0, user-scalable=no` to the `content` attribute, but **don’t do that** because it prevents zooming at all, which is a [WCAG violation](https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html).

What’s actually happening here is the browser is responding to the double tap gesture, which in the case of Safari on iOS, zooms into the button element I’m tapping. Luckily there’s a CSS one-liner for us that gets the job done.

`.button {   touch-action: manipulation; }`

As per [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action):

> Enable panning and pinch zoom gestures, but disable additional non-standard gestures such as double-tap to zoom. Disabling double-tap to zoom removes the need for browsers to delay the generation of **click** events when the user taps the screen. This is an alias for “**pan-x pan-y pinch-zoom**” (which, for compatibility, is itself still valid).

[Advert![Mindful Design. Learn to design for real humans. Available now](https://piccalil.b-cdn.net/images/ads/md-ad-landscape-post-launch.jpg?format=webp)](https://piccalil.li/mindful-design?utm_source=piccalilli&utm_medium=graphical-ad)

Let’s see it in action. First, here’s a couple of buttons without `touch-action`. Try rapidly tapping on your phone/touch device:

Here are the same buttons _with_ `touch-action` applied:

Handy!

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_

[Advert![Complete CSS. Take your CSS skills beyond the next level. Available now!](https://piccalil.b-cdn.net/images/ads/complete-css-ad-landscape-free-lessons.png?format=webp)](https://piccalil.li/complete-css/lessons/3?utm_source=piccalilli&utm_medium=graphical-ad)

* * *