---
title: "What’s !important #4: Videos & View Transitions, Named Media Queries, How Browsers Work, and More"
source: "https://css-tricks.com/whats-important-4/"
publishedDate: "2026-01-30"
category: "css"
feedName: "css-tricks"
author: "Daniel Schwarz"
---

Neither Chrome, Safari, nor Firefox have shipped new features in the last couple of weeks, but fear not because leading this issue of What’s !important is some of the web development industry’s best educators with, frankly, some _killer_ content.

### Maintaining video state across different pages using view transitions

Chris Coyier demonstrates [how to maintain a video’s state across different pages using CSS view transitions](https://frontendmasters.com/blog/view-transitions-playing-video/). He notes that this is fairly easy to do with same-page view transitions, but with multi-page view transitions you’ll need to leverage JavaScript’s `pageswap` event to save information about the video’s state in `sessionStorage` as a JSON string (works with audio and iframes too), and then use that information to restore the state on `pagereveal`. Yes, there’s a _tiiiiny_ bit of audio stutter because we’re technically faking it, but it’s still super neat.

Also, CodePen, which I’m sure you already know was founded by Chris, announced a [private beta of CodePen 2.0](https://codepen.io/beta), which you can request to be a part of. One of the benefits of CodePen 2.0 is that you can create actual projects with multiple files, which means that you can create view transitions in CodePen. Pretty cool!

### How to ‘name’ media queries

Kevin Powell shows us [how to leverage CSS cascade layers to ‘name’ media queries](https://www.youtube.com/watch?v=dag6qCNH0Nw). This technique isn’t as effective as [`@custom-media`](https://css-tricks.com/can-we-have-custom-media-queries-please/) ([or even container style queries, as one commenter suggested](https://www.youtube.com/watch?v=dag6qCNH0Nw&lc=UgxtIYf38HlXJKM7TKB4AaABAg)), but until those are supported in all web browsers, Kevin’s trick is pretty creative.

Adam Argyle reminded us last week that [`@custom-media` is being trialed in Firefox Nightly](https://nerdy.dev/custom-media) (no word on [container style queries](https://css-tricks.com/almanac/rules/c/container/#aa-style-queries) yet), but if you get up to speed on [CSS cascade layers](https://css-tricks.com/css-cascade-layers/), you can utilize Kevin’s trick in the meantime.

### Vale’s CSS reset

I do love a good CSS reset. It doesn’t matter how many of them I read, I always discover something awesome and add it to my own reset. From [Vale’s CSS reset](https://vale.rocks/posts/css-reset) I stole `svg:not([fill]) { fill: currentColor; }`, but there’s much more to take away from it than that!

### How browsers work

If you’ve ever wondered how web browsers actually work — how they get IP addresses, make HTTP requests, parse HTML, build DOM trees, render layouts, and paint, the recently-shipped [How Browsers Work](https://howbrowserswork.com/) by Dmytro Krasun is an incredibly interesting, interactive read. It really makes you wonder about the bottlenecks of web development languages and why certain HTML, CSS, and JavaScript features are the way they are.

![A diagram showing the HTML parsing process with a code example on the left and the resulting DOM tree structure on the right.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/how-browsers-work-1024x658.png?resize=1024%2C658&ssl=1)

### How CSS layout works

In addition, Polypane explains [the fundamentals of CSS layout](https://polypane.app/blog/understanding-the-fundamentals-of-css-layout/), including the box model, lines and baselines, positioning schemes, the stacking context, grid layout, and flexbox. If you’re new to CSS, I think these explanations will really help you click with it. If you’re an old-timer (like me), I still think it’s important to learn how these foundational concepts apply to newer CSS features, especially since CSS is evolving exponentially these days.

![A diagram showing CSS z-index stacking order with code examples on the left and visual representations of layered elements on the right.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/how-css-layout-works-1024x658.png?resize=1024%2C658&ssl=1)

### CSS masonry is (probably) just around the corner

Speaking of layouts, Jen Simmons clarifies [when we’ll be able to use `display: grid-lanes`](https://webkit.org/blog/17758/when-will-css-grid-lanes-arrive-how-long-until-we-can-use-it/), otherwise known as CSS masonry. While it’s not supported in any web browser yet, Firefox, Safari, and Chrome/Edge are _all_ trialing it, so that could change pretty quickly. Jen provides some polyfills, anyway!

If you want to get ahead of the curve, you can [let Sunkanmi Fafowora walk you through `display: grid-lanes`](https://css-tricks.com/masonry-layout-is-now-grid-lanes/).

![A comparison showing two masonry-style card layouts labeled 'Grid Lanes' and 'CSS Grid 1' with different arrangements of image cards.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/css-display-grid-lanes-1024x574.jpg?resize=1024%2C574&ssl=1)

Source: Webkit.

### Theming animations using relative color syntax

If you’re obsessed with design systems and organization, and you tend to think of illustration and animation as impressive but messy art forms, Andy Clarke’s article on [theming animations using CSS relative color syntax](https://www.smashingmagazine.com/2026/01/smashing-animations-part-8-css-relative-colour/) will truly help you to bridge the gap between art and logic. If CSS variables are your jam, then this article is definitely for you.

![A diagram showing CSS color calculations with code examples above and visual comparisons of lightness, chroma, and hue adjustments below.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/animations-and-relative-color-syntax-1024x658.png?resize=1024%2C658&ssl=1)

### Modals vs. pages (and everything in-between)

Modals? Pages? Lightboxes? Dialogs? Tooltips? Understanding the different types of overlays and knowing when to use each one is still pretty confusing, especially since newer CSS features like popovers and interest invokers, while incredibly useful, are making the landscape more cloudy. In short, Ryan Neufeld clears up the whole [modal vs. page](https://uxplanet.org/modal-vs-page-a-decision-making-framework-34453e911129) thing and even provides a framework for deciding which type of overlay to use.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/the-different-types-of-overlays-1024x493.jpg?resize=1024%2C493&ssl=1)

Source: UX Planet

### Text scaling support is being trialed in Chrome Canary

You know when you’re dealing with text that’s been increased or decreased at the OS-level? _Well…_if you’re a web developer, maybe you don’t. After all, this feature doesn’t work on the web! However, Josh Tumath tells us that [Chrome Canary is trialing a meta tag that makes web browsers respect this OS setting](https://www.joshtumath.uk/posts/2026-01-27-try-text-scaling-support-in-chrome-canary/). If you’re curious, it’s `<meta name="text-scale" content="scale">`, but Josh goes into more detail and it’s worth a read.

See you next time!