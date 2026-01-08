---
title: "Smashing Animations Part 5: Building Adaptive SVGs With `<symbol>`, `<use>`, And CSS Media Queries"
source: "https://smashingmagazine.com/2025/10/smashing-animations-part-5-building-adaptive-svgs/"
publishedDate: "2025-10-06"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Andy Clarke)"
---

-   9 min read
-   [SVG](https://smashingmagazine.com/category/svg), [Animation](https://smashingmagazine.com/category/animation), [Design](https://smashingmagazine.com/category/design), [CSS](https://smashingmagazine.com/category/css)

SVGs, they scale, yes, but how else can you make them adapt even better to several screen sizes? Web design pioneer [Andy Clarke](https://stuffandnonsense.co.uk/) explains how he builds what he calls “adaptive SVGs” using `<symbol>`, `<use>`, and CSS Media Queries.

I’ve written quite a lot recently about how I [prepare and optimise](https://www.smashingmagazine.com/2025/06/smashing-animations-part-4-optimising-svgs/) SVG code to use as static graphics or in [animations](https://www.smashingmagazine.com/2025/05/smashing-animations-part-1-classic-cartoons-inspire-css/). I love working with SVG, but there’s always been something about them that bugs me.

To illustrate how I build adaptive SVGs, I’ve selected an episode of _The Quick Draw McGraw Show_ called “[Bow Wow Bandit](https://yowpyowp.blogspot.com/2012/06/quick-draw-mcgraw-bow-wow-bandit.html),” first broadcast in 1959.

[![Bow Wow Bandit illustration](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/1-quick-draw-mcgraw-show.png)](https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/1-quick-draw-mcgraw-show.png)

The Quick Draw McGraw Show © Warner Bros. Entertainment Inc. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/1-quick-draw-mcgraw-show.png))

In it, Quick Draw McGraw enlists his bloodhound Snuffles to rescue his sidekick Baba Looey. Like most Hanna-Barbera title cards of the period, the artwork was made by Lawrence (Art) Goble.

-   [Smashing Animations Part 1: How Classic Cartoons Inspire Modern CSS](https://www.smashingmagazine.com/2025/05/smashing-animations-part-1-classic-cartoons-inspire-css/)
-   [Smashing Animations Part 2: How CSS Masking Can Add An Extra Dimension](https://www.smashingmagazine.com/2025/05/smashing-animations-part-2-css-masking-add-extra-dimension/)
-   [Smashing Animations Part 3: SMIL’s Not Dead Baby, SMIL’s Not Dead](https://www.smashingmagazine.com/2025/05/smashing-animations-part-3-smil-not-dead/)
-   [Smashing Animations Part 4: Optimising SVGs](https://www.smashingmagazine.com/2025/06/smashing-animations-part-4-optimising-svgs/)

[![Quick Draw McGraw character pulling back on a dog leash attached to his bloodhound, Snuffles.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/2-andy-clarke-bow-wow-bandit-toon-title-recreation.png)](https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/2-andy-clarke-bow-wow-bandit-toon-title-recreation.png)

Andy Clarke’s Bow Wow Bandit Toon Title recreation (16:9). ([Large preview](https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/2-andy-clarke-bow-wow-bandit-toon-title-recreation.png))

Let’s say I’ve designed an SVG scene like that one that’s based on Bow Wow Bandit, which has a 16:9 aspect ratio with a `viewBox` size of 1920×1080. This SVG scales up and down (the clue’s in the name), so it looks sharp when it’s gigantic and when it’s minute.

[![16:9 aspect ration vs. 3:4.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/3-svgs-aspect-ratio.png)](https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/3-svgs-aspect-ratio.png)

Left: 16:9 aspect ratio loses its impact. Right: 3:4 format suits the screen size better. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/3-svgs-aspect-ratio.png))

But on small screens, the 16:9 aspect ratio ([live demo](https://stuffandnonsense.co.uk/toon-titles/quick-draw-3a.html)) might not be the best format, and the image loses its impact. Sometimes, a portrait orientation, like 3:4, would suit the screen size better.

[![Andy Clarke’s Bow Wow Bandit Toon Title recreation (3:4).](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/4-bow-wow-bandit-toon-title-recreation-portrait.png)](https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/4-bow-wow-bandit-toon-title-recreation-portrait.png)

Andy Clarke’s Bow Wow Bandit Toon Title recreation (3:4). ([Large preview](https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/4-bow-wow-bandit-toon-title-recreation-portrait.png))

But, herein lies the problem, as it’s not easy to reposition internal elements for different screen sizes using just `viewBox`. That’s because in SVG, internal element positions are locked to the coordinate system from the original `viewBox`, so you can’t easily change their layout between, say, desktop and mobile. This is a problem because animations and interactivity often rely on element positions, which break when the `viewBox` changes.

[![Left: 16:9 for larger screens. Right: 3:4 for smaller screens.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/5-svg-smaller-larger-screens.png)](https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/5-svg-smaller-larger-screens.png)

Left: 16:9 for larger screens. Right: 3:4 for smaller screens. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/5-svg-smaller-larger-screens.png))

My challenge was to serve a 1080×1440 version of Bow Wow Bandit to smaller screens and a different one to larger ones. I wanted the position and size of internal elements — like Quick Draw McGraw and his dawg Snuffles — to change to best fit these two layouts. To solve this, I experimented with several alternatives.

**Note:** Why are we not just using the `<picture>` with external SVGs? The [`<picture>` element](https://www.smashingmagazine.com/2014/05/responsive-images-done-right-guide-picture-srcset/) is brilliant for responsive images, but it only works with raster formats (like JPEG or WebP) and external SVG files treated as images. That means that you can’t animate or style internal elements using CSS.

## Showing And Hiding SVG

The most obvious choice was to include two different SVGs in my markup, one for small screens, the other for larger ones, then show or hide them using [CSS and Media Queries](https://www.smashingmagazine.com/2018/02/media-queries-responsive-design-2018/):

```
<svg id="svg-small" viewBox="0 0 1080 1440">
  <!-- ... -->
</svg>

<svg id="svg-large" viewBox="0 0 1920 1080">
  <!--... -->
</svg>


#svg-small { display: block; }
#svg-large { display: none; }

@media (min-width: 64rem) {
  #svg-small { display: none; }
  #svg-mobile { display: block; }
}
```

But using this method, both SVG versions are loaded, which, when the graphics are complex, means downloading lots and lots and lots of unnecessary code.

## Replacing SVGs Using JavaScript

I thought about using JavaScript to swap in the larger SVG at a specified breakpoint:

```
if (window.matchMedia('(min-width: 64rem)').matches) {
  svgContainer.innerHTML = desktopSVG; 
} else {
  svgContainer.innerHTML = mobileSVG;
}
```

Leaving aside the fact that JavaScript would now be critical to how the design is displayed, both SVGs would usually be loaded anyway, which adds DOM complexity and unnecessary weight. Plus, maintenance becomes a problem as there are now two versions of the artwork to maintain, doubling the time it would take to update something as small as the shape of Quick Draw’s tail.

## The Solution: One SVG Symbol Library And Multiple Uses

Remember, my goal is to:

-   Serve one version of Bow Wow Bandit to smaller screens,
-   Serve a different version to larger screens,
-   Define my artwork just once (DRY), and
-   Be able to resize and reposition elements.

I don’t read about it enough, but the `<symbol>` element lets you define reusable SVG elements that can be hidden and reused to improve maintainability and reduce code bloat. They’re like components for SVG: [create once and use wherever you need them](https://css-tricks.com/svg-symbol-good-choice-icons/):

```
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="quick-draw-body" viewBox="0 0 620 700">
    <g class="quick-draw-body">[…]</g>
  </symbol>
  <!-- ... -->
</svg>

<use href="#quick-draw-body" />
```

A `<symbol>` is like storing a character in a library. I can reference it as many times as I need, to keep my code consistent and lightweight. Using `<use>` elements, I can insert the same symbol multiple times, at different positions or sizes, and even in different SVGs.

Each `<symbol>` must have its own `viewBox`, which defines its internal coordinate system. That means paying special attention to how SVG elements are exported from apps like Sketch.

## Exporting For Individual Viewboxes

I wrote before about [how I export elements](https://www.smashingmagazine.com/2025/06/smashing-animations-part-4-optimising-svgs/) in layers to make working with them easier. That process is a little different when creating symbols.

[![](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/6-exporting-elements-from-sketch.png)](https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/6-exporting-elements-from-sketch.png)

My usual process of exporting elements from Sketch. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/6-exporting-elements-from-sketch.png))

Ordinarily, I would export all my elements using the same `viewBox`size. But when I’m creating a `symbol`, I need it to have its own specific `viewBox`.

[![Exporting elements from Sketch as individual SVG files.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/7-exporting-elements-sketch-individual-svgs-files.png)](https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/7-exporting-elements-sketch-individual-svgs-files.png)

Exporting elements from Sketch as individual SVG files. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/7-exporting-elements-sketch-individual-svgs-files.png))

So I export each element as an individually sized SVG, which gives me the dimensions I need to convert its content into a `symbol`. Let’s take the SVG of Quick Draw McGraw’s hat, which has a `viewBox` size of 294×182:

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 294 182">
  <!-- ... -->
</svg>
```

I swap the SVG tags for `<symbol>` and add its artwork to my SVG library:

```
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="quick-draw-hat" viewBox="0 0 294 182">
    <g class="quick-draw-hat">[…]</g>
  </symbol>
</svg>
```

Then, I repeat the process for all the remaining elements in my artwork. Now, if I ever need to update any of my symbols, the changes will be automatically applied to every instance it’s used.

## Using A `<symbol>` In Multiple SVGs

I wanted my elements to appear in both versions of Bow Wow Bandit, one arrangement for smaller screens and an alternative arrangement for larger ones. So, I create both SVGs:

```
<svg class="svg-small" viewBox="0 0 1080 1440">
  <!-- ... -->
</svg>

<svg class="svg-large" viewBox="0 0 1920 1080">
  <!-- ... -->
</svg>
```

…and insert links to my symbols in both:

```
<svg class="svg-small" viewBox="0 0 1080 1440">
  <use href="#quick-draw-hat" />
</svg>

<svg class="svg-large" viewBox="0 0 1920 1080">
  <use href="#quick-draw-hat" />
</svg>
```

## Positioning Symbols

Once I’ve placed symbols into my layout using `<use>`, my next step is to position them, which is especially important if I want alternative layouts for different screen sizes. Symbols behave like `<g>` groups, so I can scale and move them using attributes like `width`, `height`, and `transform`:

```
<svg class="svg-small" viewBox="0 0 1080 1440">
  <use href="#quick-draw-hat" width="294" height="182" transform="translate(-30,610)"/>
</svg>

<svg class="svg-large" viewBox="0 0 1920 1080">
  <use href="#quick-draw-hat" width="294" height="182" transform="translate(350,270)"/>
</svg>
```

I can place each `<use>` element independently using `transform`. This is powerful because rather than repositioning elements inside my SVGs, I move the `<use>` references. My internal layout stays clean, and the file size remains small because I’m not duplicating artwork. A browser only loads it once, which reduces bandwidth and speeds up page rendering. And because I’m always referencing the same `symbol`, their appearance stays consistent, whatever the screen size.

## Animating `<use>` Elements

Here’s where things got tricky. I wanted to animate parts of my characters — like Quick Draw’s hat tilting and his legs kicking. But when I added CSS animations targeting internal elements inside a `<symbol>`, nothing happened.

**Tip:** You can animate the `<use>` element itself, but not elements inside the `<symbol>`. If you want individual parts to move, make them their own symbols and animate each `<use>`.

Turns out, you can’t style or animate a `<symbol>`, because `<use>` creates shadow DOM clones that aren’t easily targetable. So, I had to get sneaky. Inside each `<symbol>` in my library SVG, I added a `<g>` element around the part I wanted to animate:

```
<symbol id="quick-draw-hat" viewBox="0 0 294 182">
  <g class="quick-draw-hat">
    <!-- ... -->
  </g>
</symbol>
```

…and animated it using an attribute substring selector, targeting the `href` attribute of the `use` element:

```
use[href="#quick-draw-hat"] {
  animation-delay: 0.5s;
  animation-direction: alternate;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-name: hat-rock;
  animation-timing-function: ease-in-out;
  transform-origin: center bottom;
}

@keyframes hat-rock {
from { transform: rotate(-2deg); }
to   { transform: rotate(2deg); } }
```

Once I’ve created my two visible SVGs — one for small screens and one for larger ones — the final step is deciding which version to show at which screen size. I use CSS Media Queries to hide one SVG and show the other. I start by showing the small-screen SVG by default:

```
.svg-small { display: block; }
.svg-large { display: none; }
```

Then I use a `min-width` media query to switch to the large-screen SVG at `64rem` and above:

```
@media (min-width: 64rem) {
  .svg-small { display: none; }
  .svg-large { display: block; }
}
```

This ensures there’s only ever one SVG visible at a time, keeping my layout simple and the DOM free from unnecessary clutter. And because both visible SVGs reference the same hidden `<symbol>` library, the browser only downloads the artwork once, regardless of how many `<use>` elements appear across the two layouts.

[![The final adaptive SVG.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/8-final-adaptive-svg.png)](https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/8-final-adaptive-svg.png)

View the final adaptive SVG on my [Toon Titles website](https://stuffandnonsense.co.uk/toon-titles/quick-draw-3.html). ([Large preview](https://files.smashing.media/articles/smashing-animations-part-5-building-adaptive-svgs/8-final-adaptive-svg.png))

## Wrapping Up

By combining `<symbol>`, `<use>`, CSS Media Queries, and specific transforms, I can build **adaptive SVGs** that reposition their elements without duplicating content, loading extra assets, or relying on JavaScript. I need to define each graphic only once in a hidden symbol library. Then I can reuse those graphics, as needed, inside several visible SVGs. With CSS doing the layout switching, the **result is fast and flexible**.

It’s a reminder that some of the most powerful techniques on the web don’t need big frameworks or complex tooling — just a bit of SVG know-how and a clever use of the basics.

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (gg, yk)