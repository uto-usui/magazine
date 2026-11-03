---
title: "What’s !important #20: GTA 6 Scroll Effects, Scrollspies, random()"
source: "https://css-tricks.com/whats-important-20/"
publishedDate: "2026-11-02"
category: "css"
feedName: "css-tricks"
author: "Daniel Schwarz"
---

Good news first? Or bad news first?

Let’s do bad news first.

This is the final issue of **What’s !important** on CSS-Tricks.com. The _good_ news is that it’s coming back in an expanded form as the [CSS-Tricks newsletter](https://css-tricks.com/newsletters). I had ya there for a second, didn’t I? Sorry, I couldn’t decide whether to trick or treat, so I went for both. Happy Halloween!

The newsletter officially kicks off on November 10th. That’s after a way-too-long **four-year hiatus**. What the heck, right? It’s not only high time for it to come back, but for you to [get on the list](https://css-tricks.com/newsletters). You’ll get hand-written and hand-curated news, links, and editorials that you can only find there. Join the party with me!

So, let’s go out with a big bang for our “final” issue. It’s packed with some stuff that I’ve been holding onto since before [the site came back to life](https://css-tricks.com/css-tricks-has-a-new-owner/) earlier this week, but also some new stuff, and I can’t wait to finally get it out to you.

Scooch over Apple, Rockstar has something they’d like to say about fancy scrolling effects (to be fair, they’ve had 13 years to create them). First, check out [the GTA 6 website](https://www.rockstargames.com/VI) (which oddly doesn’t work in Firefox), then watch Kevin Powell’s [GTA 6 scroll effects walkthrough](https://www.youtube.com/watch?v=Fi1MvM7whzg), which is frankly the most fun that you can have while waiting (and waiting) for GTA 6.

[Mojtaba Seyedi](https://css-tricks.com/author/seyedi/) demonstrated [how to build a scrollspy with modern CSS](https://blog.master.dev/building-a-fancy-scrollspy-using-modern-css/). What’s a scrollspy, you ask? Well, if you have a navigation that links to different sections of the page, a scrollspy highlights the section that you’re currently on in the navigation.

## `random()` demos explained

Brecht De Ruyte showcased and explained some absolutely stunning [`random()` demos](https://www.smashingmagazine.com/2026/10/embracing-playful-imperfection-css-random-function/).

Here are a few of them:

Okay, that was more than a few…

## Implementing icons on the web in 2026 and beyond

Lea Verou explained, in detail, the [different ways of implementing icons on the web](https://lea.verou.me/blog/2026/icons/). Many exciting CSS features of the future are mentioned, including Linked Parameters, `ident()`, `@mixin` and `@apply`, the `@property` shorthand, and more, so it’s a really deep dive with a lot of intrigue.

## `::*`?

[Kilian Valkhof suggested a _universal pseudo-selector_](https://kilianvalkhof.com/2026/css-html/id-like-to-have-a-universal-pseudo-selector-in-css/). I mean, the universal selector (`*`) doesn’t select _pseudo_\-elements, which is why almost every website uses the following CSS snippet, right?

```
*,
::before,
::after {
  box-sizing: border-box;
}
```

But there are way more of them now (e.g., `::backdrop` and `::details-content`, to name just a couple of common ones in the context of `box-sizing: border-box`), so Kilian suggests `::*`.

I like it!

## New HTML and CSS features that are useful for design systems

Declan Chidlow told us [which new HTML and CSS features are useful for design systems](https://zeroheight.com/blog/new-html-and-css-features-you-should-be-using-in-your-design-system/). My favorites are `text-box`, `sibling-index()`, `sibling-count()`, `@scope`, and `@custom-media`, which are very handy even outside of design systems.

## Make `<textarea>`s adapt to their content

Adam Argyle shared a sweet CSS trick to [make `<textarea>`s adapt to their content](https://nerdy.dev/transitioning-field-sizing-content-with-css) (like `contenteditable`s do naturally):

As you can see, there’s a bit of anchor positioning going on there. Is it just me or is anchor positioning the most versatile CSS feature right now?

## Create wavy dividers using `random()` and `shape()`

Here’s another CSS trick, this one to [create wavy dividers using `random()` and `shape()`](https://css-tip.com/random-wavy-shapes/). This has [Temani Afif](https://css-tricks.com/author/afiftemani/) written all over it, doesn’t it?

## New color contrast checker

While it certainly isn’t the only color contrast checker out there, _[This hue shall pass](https://thishueshallpass.clearleft.com/?colors=23202c%2Cdae1e2%2Cffffff%2Ce1673e%2C4d3e74)_ is a new one that enables us to check every combination of colors, recognizes the difference between _Fail_ and _Fail: close to passing_, and allows us to adjust the lightness until the color contrast ratio meets the AA/AAA standards. I think I’ll be using this one (made by [Clearleft](https://clearleft.com/), by the way) from now on.

![](https://css-tricks.com/wp-content/uploads/2026/10/1-1024x642.png)

## Gradient visualizer (also new)

Concocted in Ahmad Shadeed’s lab, _[Gradient Layers](https://lab.ishadeed.com/tools/gradient-visualizer/)_ enables us to edit gradients or create them from scratch visually, which is easier than fiddling with CSS, especially if they have multiple layers.

![](https://css-tricks.com/wp-content/uploads/2026/10/2-1024x642.png)

## Two new gradient types on the way

On that note, we have [two new gradient types](https://github.com/w3c/csswg-drafts/blob/main/css-images-5/explainers/2d-gradients.md) on the way. Josh Tumath explained how they work and what their CSS code might look like.

A couple of simple examples:

```
background-image: mesh-gradient(red, blue; green, yellow);
```

![](https://css-tricks.com/wp-content/uploads/2026/10/3.png)

Source: [Josh Tumath](https://github.com/w3c/csswg-drafts/blob/main/css-images-5/explainers/2d-gradients.md).

```
background-image: freeform-gradient(red top left, yellow bottom right);
```

![](https://css-tricks.com/wp-content/uploads/2026/10/4.png)

Source: [Josh Tumath](https://github.com/w3c/csswg-drafts/blob/main/css-images-5/explainers/2d-gradients.md).

These examples are cool but it’s the image below that really demonstrates how awesome these gradient types are (this one uses a mesh gradient):

![](https://css-tricks.com/wp-content/uploads/2026/10/5.png)

Source: [Josh Tumath](https://github.com/w3c/csswg-drafts/blob/main/css-images-5/explainers/2d-gradients.md).

Do your thing, Ahmad!

## New web platform features and updates

-   [Chrome 155](https://chromestatus.com/release-notes/155)
    -   [`margin-trim`](https://css-tricks.com/almanac/properties/m/margin-trim/) (no Firefox support)
    -   [`symbols()`](https://css-tricks.com/almanac/functions/s/symbols/) (no Safari support)
    -   [`text-decoration-skip-spaces`](https://drafts.csswg.org/css-text-decor-4/#text-decoration-skip-spaces-property) (no Firefox or Safari support)
-   [Firefox 158](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/158)
    -   [JPEG XL](https://jpegxl.info/) (now Baseline)
    -   [CSS typed arithmetic](https://css-tricks.com/css-typed-arithmetic/) (now Baseline)
-   [Chrome 156](https://chromestatus.com/release-notes/156)
    -   [`random()`](https://css-tricks.com/almanac/functions/r/random/) (no Firefox support)
    -   [`:navigation-source`](https://alexanderburgos.netlify.app/blog/chrome-navigation-source-pseudo-class) (no Safari or Firefox support)
-   [Safari 27.1](https://webkit.org/blog/18486/webkit-features-for-safari-27-1/)
    -   _A whole bunch of CSS features for the iPhone Duo!_
-   [Firefox 159](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/159)
    -   [Scroll-driven animations](https://css-tricks.com/unleash-the-power-of-scroll-driven-animations/) (now Baseline)

Now, I’ll see you in a couple of weeks for **‌What’s !important #21**, but remember, you must subscribe to the [CSS-Tricks newsletter](https://css-tricks.com/newsletters/) to read it and every issue after it. It’ll include the same top-notch content from the best front-end authors as well as the latest web platform updates, but with free delivery and [a sponsor](https://css-tricks.com/advertising/). Thanks for sticking with us <3.