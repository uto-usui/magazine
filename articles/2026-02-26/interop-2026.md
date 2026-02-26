---
title: "Interop 2026"
source: "https://css-tricks.com/interop-2026/"
publishedDate: "2026-02-17"
category: "css"
feedName: "css-tricks"
author: "Geoff Graham"
---

Interop 2026 is formally a thing. So, you know all of those wild, new CSS features we’re always poking at but always putting under a “lack of browser support” caveat? The Big Three — Blink (Chrome/Edge), WebKit (Safari), and Mozilla (Firefox) — are working together to bring full and consistent support to them!

You can read the blog posts yourself:

-   [Interop 2026: Continuing to improve the web for developers](https://web.dev/blog/interop-2026) (web.dev)
-   [Announcing Interop 2026](https://webkit.org/blog/17818/announcing-interop-2026/) (WekBit Blog)
-   [Launching Interop 2026](https://hacks.mozilla.org/2026/02/launching-interop-2026/) (Mozilla)
-   [Microsoft Edge and Interop 2026](https://blogs.windows.com/msedgedev/2026/02/12/microsoft-edge-and-interop-2026/) (Edge)

An, yes, there’s _plenty_ to get excited about specifically for CSS:

### Anchor positioning

From [our guide](https://css-tricks.com/css-anchor-positioning-guide/):

> > CSS Anchor Positioning gives us a simple interface to attach elements next to others just by saying which sides to connect — directly in CSS. It also lets us set a fallback position so that we can avoid the overflow issues we just described.

### Advanced `attr()`

We’ve actually had the `attr()` function for something like 15 years. But now we’re gonna be able to pass variables in there… _with type conversion!_

### Container style queries

We can already [query containers by “type”](https://css-tricks.com/almanac/properties/c/container-type/) but only by size. It’ll be so much cooler when we can apply styles based on other styles. Say:

```
@container style((font-style: italic) and (--color-mode: light)) {
  em, i, q {
    background: lightpink;
  }
}
```

### The `contrast-color()` function

Getting the right color contrast between foreground text and background can be easy enough, but it’s been more of a manual type thing that we might switch with a media query based on the current color scheme. With `contrast-color()` (I always want to write that as `color-contrast()`, maybe because [that was the original name](https://css-tricks.com/exploring-color-contrast-for-the-first-time/)) we can dynamically toggle the `color` between white and black.

```
button {
  --background-color: darkblue;
  background-color: var(--background-color);
  color: contrast-color(var(--background-color));
}
```

### Custom Highlights

_Highlight all the things!_ We’ve had `::selection` forever, but now we’ll have a bunch of others:

Pseudo-selector

Selects…

Notes

`::search-text`

Find-in-page matches

`::search-text:current`selects the current target

[`::target-text`](https://css-tricks.com/almanac/pseudo-selectors/t/target-text/)

Text fragments

Text fragments allow for programmatic highlighting using URL parameters. If you’re referred to a website by a search engine, it might use text fragments, which is why `::target-text` is easily confused with `::search-text`.

[`::selection`](https://css-tricks.com/almanac/pseudo-selectors/s/selection/)

Text highlighted using the pointer

[`::highlight()`](https://css-tricks.com/css-custom-highlight-api-early-look/)

Custom highlights as defined by JavaScript’s [Custom Highlight API](https://css-tricks.com/css-custom-highlight-api-early-look/)

[`::spelling-error`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::spelling-error)

Incorrectly spelled words

Pretty much applies to editable content only

[`::grammar-error`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::grammar-error)

Incorrect grammar

Pretty much applies to editable content only

### Dialogs and popovers

Finally, a JavaScript-less (and declarative) way to set elements on the top layer! We’ve really dug into these over the years.

**Article** on Oct 23, 2024

### [Clarifying the Relationship Between Popovers and Dialogs](https://css-tricks.com/clarifying-the-relationship-between-popovers-and-dialogs/)

**Article** on Jun 26, 2024

### [Poppin’ In](https://css-tricks.com/poppin-in/)

**Article** on Jan 26, 2026

### [There is No Need to Trap Focus on a Dialog Element](https://css-tricks.com/there-is-no-need-to-trap-focus-on-a-dialog-element/)

**Article** on Jul 25, 2024

### [Pop(over) the Balloons](https://css-tricks.com/popover-the-balloons/)

**Article** on Feb 19, 2025

### [Working With Multiple CSS Anchors and Popovers Inside the WordPress Loop](https://css-tricks.com/working-with-multiple-css-anchors-and-popovers-inside-the-wordpress-loop/)

**Article** on Jun 9, 2025

### [Creating an Auto-Closing Notification With an HTML Popover](https://css-tricks.com/creating-an-auto-closing-notification-with-an-html-popover/)

**Article** on Jul 23, 2025

### [A First Look at the Interest Invoker API (for Hover-Triggered Popovers)](https://css-tricks.com/a-first-look-at-the-interest-invoker-api-for-hover-triggered-popovers/)

**Article** on Jun 3, 2025

### [Getting Creative With HTML Dialog](https://css-tricks.com/getting-creative-with-html-dialog/)

**Link** on Jan 15, 2018

### [Meet the New Dialog Element](https://css-tricks.com/meet-new-dialog-element/)

**Link** on Dec 1, 2025

### [Prevent a page from scrolling while a dialog is open](https://css-tricks.com/prevent-a-page-from-scrolling-while-a-dialog-is-open/)

**Article** on Nov 20, 2024

### [Invoker Commands: Additional Ways to Work With Dialog, Popover… and More?](https://css-tricks.com/invoker-commands-additional-ways-to-work-with-dialog-popover-and-more/)

**Article** on Oct 7, 2019

### [Some Hands-On with the HTML Dialog Element](https://css-tricks.com/some-hands-on-with-the-html-dialog-element/)

### Media pseudo-classes

How often have you wanted to style an `<audio>` or `<video>` element based on its state? Perhaps with, JavaScript, right? We’ll have several states in CSS to work off:

-   `:playing`
-   `:paused`
-   `:seeking`
-   `:buffering`
-   `:stalled`
-   `:muted`
-   `:volume-locked`

I love this example [from the WebKit announcement](https://webkit.org/blog/17818/announcing-interop-2026/#media-pseudo-classes):

```
video:buffering::after {
  content: "Loading...";
}
```

### Scroll-driven animations

OK, we all want this one. We’re talking specifically about animation that responds to scrolling. In other words, there’s a direct link between scrolling progress and the animation’s progress.

```
#progress {
  animation: grow-progress linear forwards;
  animation-timeline: scroll();
}
```

### Scroll snapping

Nothing new here, but bringing everyone in line with how the specs have changed over the years!

**Almanac** on Feb 13, 2019

### [scroll-margin](https://css-tricks.com/almanac/properties/s/scroll-margin/)

[`.scroll-element { scroll-margin: 50px 0 0 50px; }`](https://css-tricks.com/almanac/properties/s/scroll-margin/)

**Almanac** on Feb 12, 2019

### [scroll-padding](https://css-tricks.com/almanac/properties/s/scroll-padding/)

[`.scroll-element{ scroll-padding: 50px 0 0 50px; }`](https://css-tricks.com/almanac/properties/s/scroll-padding/)

**Almanac** on Feb 21, 2019

### [scroll-snap-align](https://css-tricks.com/almanac/properties/s/scroll-snap-align/)

[`.element { scroll-snap-align: start; }`](https://css-tricks.com/almanac/properties/s/scroll-snap-align/)

**Almanac** on Mar 7, 2019

### [scroll-snap-stop](https://css-tricks.com/almanac/properties/s/scroll-snap-stop/)

[`.element { scroll-snap-stop: always; }`](https://css-tricks.com/almanac/properties/s/scroll-snap-stop/)

**Almanac** on Feb 4, 2019

### [scroll-snap-type](https://css-tricks.com/almanac/properties/s/scroll-snap-type/)

[`.scroll-element { scroll-snap-type: y mandatory; }`](https://css-tricks.com/almanac/properties/s/scroll-snap-type/)

**Article** on Feb 7, 2022

### [CSS Scroll Snap Slide Deck That Supports Live Coding](https://css-tricks.com/css-scroll-snap-slide-deck/)

**Article** on Aug 5, 2022

### [How I Added Scroll Snapping To My Twitter Timeline](https://css-tricks.com/how-i-added-scroll-snapping-to-my-twitter-timeline/)

**Link** on Mar 27, 2020

### [How to use CSS Scroll Snap](https://css-tricks.com/how-to-use-css-scroll-snap/)

**Article** on Mar 2, 2016

### [Introducing CSS Scroll Snap Points](https://css-tricks.com/introducing-css-scroll-snap-points/)

**Article** on Aug 15, 2018

### [Practical CSS Scroll Snapping](https://css-tricks.com/practical-css-scroll-snapping/)

### The `shape()` function

This is one that Temani has been all over lately and his [SVG Path to Shape Converter](https://css-generators.com/svg-to-css/) is a must-bookmark. The `shape()` can draw complex shapes when clipping elements with the `[clip-path](https://css-tricks.com/almanac/properties/c/clip-path/)` property. We’ve had the ability to draw basic shapes for years — think `circle`, `ellipse()`, and `polygon()` — but no “easy” way to draw more complex shapes. And now we have something less SVG-y that accepts CSS-y units, calculations, and whatnot.

```
.clipped {
  width: 250px;
  height: 100px;
  box-sizing: border-box;
  background-color: blue;
  clip-path: shape(
    from top left,
    hline to 100%,
    vline to 100%,
    curve to 0% 100% with 50% 0%,
  );
}
```

### View transitions

There are two types of view transitions: same-document (transitions on the same page) and cross-document (or what we often call multi-page transitions). Same-page transitions went Baseline in 2025 and now browsers are working to be cross-compatible implementations of cross-document transitions.

**Article** on Feb 21, 2025

### [Toe Dipping Into View Transitions](https://css-tricks.com/toe-dipping-into-view-transitions/)

**Article** on Jan 29, 2025

### [What on Earth is the \`types\` Descriptor in View Transitions?](https://css-tricks.com/what-on-earth-is-the-types-descriptor-in-view-transitions/)

**Almanac** on Jun 7, 2024

### [::view-transition](https://css-tricks.com/almanac/pseudo-selectors/v/view-transition/)

[`::view-transition { position: fixed; }`](https://css-tricks.com/almanac/pseudo-selectors/v/view-transition/)

**Almanac** on Jun 12, 2024

### [::view-transition-group](https://css-tricks.com/almanac/pseudo-selectors/v/view-transition-group/)

[`::view-transition-group(transition-name) { animation-duration: 1.25s; }`](https://css-tricks.com/almanac/pseudo-selectors/v/view-transition-group/)

**Almanac** on Jun 14, 2024

### [::view-transition-image-new](https://css-tricks.com/almanac/pseudo-selectors/v/view-transition-image-new/)

[`::view-transition-image-new(*) { animation-duration: 700ms; }`](https://css-tricks.com/almanac/pseudo-selectors/v/view-transition-image-new/)

**Almanac** on

### [::view-transition-image-old](https://css-tricks.com/almanac/pseudo-selectors/v/view-transition-image-old/)

[`::view-transition-image-old(*) { animation-duration: 700ms; }`](https://css-tricks.com/almanac/pseudo-selectors/v/view-transition-image-old/)

**Almanac** on

### [::view-transition-image-pair](https://css-tricks.com/almanac/pseudo-selectors/v/view-transition-image-pair/)

[`::view-transition-image-pair(root) { animation-duration: 1s; }`](https://css-tricks.com/almanac/pseudo-selectors/v/view-transition-image-pair/)

**Almanac** on Jan 22, 2026

### [::view-transition-new()](https://css-tricks.com/almanac/pseudo-selectors/v/view-transition-new/)

[`::view-transition-new(item) { animation-name: fade-in; }`](https://css-tricks.com/almanac/pseudo-selectors/v/view-transition-new/)

**Almanac** on

### [::view-transition-old()](https://css-tricks.com/almanac/pseudo-selectors/v/view-transition-old/)

[`::view-transition-old(item) { animation-name: fade-out; }`](https://css-tricks.com/almanac/pseudo-selectors/v/view-transition-old/)

**Almanac** on Jan 22, 2025

### [@view-transition](https://css-tricks.com/almanac/rules/v/view-transition/)

[`@view-transition { navigation: auto; }`](https://css-tricks.com/almanac/rules/v/view-transition/)

**Almanac** on Jul 2, 2025

### [view()](https://css-tricks.com/almanac/functions/v/view/)

[`.element { animation-timeline: view(); }`](https://css-tricks.com/almanac/functions/v/view/)

**Almanac** on Jan 20, 2026

### [view-transition-class](https://css-tricks.com/almanac/properties/v/view-transition-class/)

[`.element { view-transition-class: bearhugs; }`](https://css-tricks.com/almanac/properties/v/view-transition-class/)

**Almanac** on May 29, 2024

### [view-transition-name](https://css-tricks.com/almanac/properties/v/view-transition-name/)

[`.element { view-transition-name: image-zoom; }`](https://css-tricks.com/almanac/properties/v/view-transition-name/)

### CSS `zoom` property

Oh, I wasn’t expecting this! I mean, we’ve had `zoom` for years — our [Almanac page](https://css-tricks.com/almanac/properties/z/zoom/) was published back in 2011 — but as a non-standard property. I must have overlooked that it was Baseline 2024 newly available and worked on as part of Interop 2025. It’s carrying over into this year.

`zoom` is sorta like the [`scale()` function](https://css-tricks.com/almanac/properties/t/transform/#aa-values), but it actually affects the layout whereas `scale()` it’s merely visual and will run over anything in its way.

* * *

That’s a wrap! Bookmark the [Interop 2026 Dashboard](https://wpt.fyi/interop-2026) to keep tabs on how things are progressing along.