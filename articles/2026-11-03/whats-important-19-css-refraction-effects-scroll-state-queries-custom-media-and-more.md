---
title: "What’s !important #19: CSS Refraction Effects, Scroll State Queries, @custom-media, and More"
source: "https://css-tricks.com/whats-important-19/"
publishedDate: "2026-10-27"
category: "css"
feedName: "css-tricks"
author: "Daniel Schwarz"
---

[We’re _back_](https://css-tricks.com/css-tricks-has-a-new-owner/)! Don’t worry, this isn’t a trick (despite what our name suggests!). However, due to the hiatus, we’re also a little behind. That’s why this issue of **What’s !important** is absolutely stacked. All killer, no filler. Here’s what you missed.

**Note:** After four years, the CSS-Tricks newsletter is also returning! And these handy-dandy roundups will be moving there starting November 10th. More information on that soon, but for now, be sure to [subscribe](https://css-tricks.com/newsletters/) to get the latest front-end goodness and web platform updates in your inbox every two weeks. Or, maybe you’d like to [sponsor it](https://css-tricks.com/advertising/)?

By the way, before we dive in, [Mat Marquis](https://css-tricks.com/author/wilto/)’ _highly_ recommended [JavaScript for Everyone course](https://piccalil.li/javascript-for-everyone) is currently -30% off (code: `` `CSSTRICKSFRIENDS` ``). You don’t want to miss this.

## How to create background image refraction effects

[Preethi Sam](https://css-tricks.com/author/preethi/) demonstrated [how to create background image refraction effects with CSS](https://blog.master.dev/background-image-refraction-in-css/). The effects are stunning, can be animated, don’t need very much CSS (no JavaScript), and we don’t need to duplicate the image either.

## How to build components using style queries and `attr()`

Brecht De Ruyte demonstrated [how to build customizable components using container style queries and advanced `attr()`](https://utilitybend.com/blog/container-style-queries-and-advanced-attr-rethinking-how-to-wire-up-my-components-in-css), showcasing some incredible interactive demos, including the two below:

Dan Holloran showed us [how to use the different `scroll-state()` queries](https://danholloran.me/posts/css-scroll-state-queries-styling-stuck-snapped-and-scrollable) (`scrollable`, `scrolled`, `snapped`, and `stuck`). It’s not a long read, which is exactly what you want for a new but simple feature like this.

A quick, no-context CSS snippet to entice you:

```
@container scroll-state(stuck: top) {
  /* ... */
}
```

## The craziest CSS to ever exist

[Declan Chidlow](https://css-tricks.com/author/declanchidlow/) shared some of [the craziest CSS to ever exist](https://vale.rocks/posts/css-relics), and I mean _craziest_. Most of it comes from Internet Explorer, but let’s face it, you knew that already. Thankfully, they _don’t_ build them like they used to.

Remember this one?

```
-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=50)";
```

## How to animate CSS grids using anchor positioning

Bramus demonstrated [how to animate CSS grids using anchor positioning](https://www.bram.us/2026/09/07/animating-css-grid-layouts-with-css-anchor-positioning/). The idea is that we anchor content to its corresponding cell, and then as the grid reflows, it’s the content (not the cell) that animates with it.

(But it doesn’t work in Firefox due to what sounds like a bug.)

## New HTML features

Chris Coyier talked about a bunch of [new HTML features](https://blog.master.dev/new-things-you-should-know-about-html-here-in-mid-2026/), and honestly, there’s a whole lot in there that you definitely haven’t heard of. Like, I’m _certain_ of it.

## How to use container queries (the right way)

Victor Ayomipo contemplated [why container query adoption has been so terrible](https://www.smashingmagazine.com/2026/09/stop-treating-css-container-queries-traditional-media-queries/) despite them topping CSS wishlists for years. Victor thinks that we’re using them wrong, so he’s here to set the record straight.

_Speaking of container queries…_

Cory LaViska demonstrated [how to use `@custom-media` in addition to container style queries as a fallback](https://www.abeautifulsite.net/posts/named-breakpoints-without-sass/).

Also, don’t forget that [Declan has an extremely thorough `@custom-media` deep-dive](https://css-tricks.com/almanac/rules/c/custom-media/) in our Almanac.

## How to detect overlapping elements

Ahmad Shadeed tackled an interesting topic — [detecting overlapping elements](https://ishadeed.com/article/css-detect-overlap/) (with CSS, of course). If you’re keen on anchor positioning, scroll-driven animations, and again (!), container style queries, then this walkthrough is for you.

I want to know when the decorative element hits the section from the left edge, taking into consideration that the element might have a fluid position or size that changes with the viewport size or container size. Basically, it’s a dynamic problem. It’s not about using a media query to hide the decorative element, I want to hide it **upon overlapping**.

Maybe container queries are finally picking up?

## Introducing the `previewsrc` HTML attribute

[Patrick Brosset](https://css-tricks.com/author/patrickbrosset//) walked us through a [_proposal_ for the `previewsrc` HTML attribute](https://patrickbrosset.com/articles/2026-09-22-blurry-before-beautiful-image-previews-for-the-web/), which would enable us to supply preview images for images that haven’t yet loaded using only HTML. For example, we could supply a blurry preview image. However, I’d rather have something like `:loaded`/`:not(:loaded)` so that we can style/transition unloaded images with CSS rather than needing to create extra images.

Thoughts?

## Custom borders demo

[Temani Afif](https://css-tricks.com/author/afiftemani/) shared a [custom borders demo](https://css-tip.com/gradient-shapes/), where the trick is to declare a transparent border, use `border-shape` to define its shape, then declare a background in addition to `background-clip: border-area` so that it only shows up within the border, like this (requires Chrome at the moment):

## How to animate the background color of `::selection`

In a similar manner, Leon Arnott shared this awesome trick for [animating the background color of `::selection`](https://bsky.app/profile/leonarnott.bsky.social/post/3lpku3zr6w7sw), something that’s actually forbidden (or so we thought, anyway…):

> > Today in CSS: We all know you can change the highlight colour of selected text, but it's impossible to animate that colour. Unless… the colour was just a variable inherited from the parent element, using @​property to make it animatable… Hahahahaha…
> > 
> > [\[image or embed\]](https://bsky.app/profile/did:plc:5mchy3yba6puvai3dpo6wies/post/3lpku3zr6w7sw?ref_src=embed)
> > 
> > — Leon .\_. ([@leonarnott.bsky.social](https://bsky.app/profile/did:plc:5mchy3yba6puvai3dpo6wies?ref_src=embed)) [13:02 · Sep 17, 2026](https://bsky.app/profile/did:plc:5mchy3yba6puvai3dpo6wies/post/3lpku3zr6w7sw?ref_src=embed)

Again, three simple steps:

1.  Register `--bg-color` using `@property`
2.  Animate `--bg-color`’s value using `@keyframes`
3.  Declare `—bg-color: inherit` on `::selection`

And that’s it, really. Simply use `var(--bg-color)` on `::selection` or some other visually restrictive element.

## How to randomly animate an element along another element

Chris Coyier demonstrated [how to `random()`ly animate an element along the edge of another element](https://blog.master.dev/randomly-place-an-element-along-edge-of-another-element/). There’s a cute doggo, by the way. Probably should’ve led with that.

Polypane explained [how we might disable the root scroller accidentally](https://polypane.app/blog/the-root-scroller-and-how-not-to-lose-it/) (which is surprisingly easy to do — I’ve definitely done it), what we lose in doing so, and what to do instead.

Also, have you ever completely misunderstood how the root (`:root`/`html`) works? This is a solid explainer for that, too.

## How to disable the double-tap-to-zoom-in functionality

Speaking of accidents, have you ever tapped on a target twice, _apparently_ in quick succession, and ended up zooming in? Andy Bell revealed that [`touch-action: manipulation` disables the double-tap-to-zoom-in functionality](https://piccalil.li/blog/stop-buttons-triggering-zoom-when-theyre-double-tapped/). It isn’t new, but I don’t see many web developers using it. One for the CSS reset, I think?

## New web platform features and updates

Chrome and Firefox now ship every two weeks. The inaugural releases were fairly exciting (not smaller, as I assumed they’d be). In addition, Safari 27 (along with iOS, iPadOS, and macOS 27) shipped with some of the same features as Firefox, making them Baseline in the same release window. High fives all around!

-   [Firefox 155](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/155)
    -   [`alpha()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/alpha) (now Baseline)
    -   [`progress()`](https://css-tricks.com/almanac/functions/p/progress/) (now Baseline)
    -   Advanced [`attr()`](https://css-tricks.com/almanac/functions/a/attr/) (now Baseline)
-   [Chrome 153](https://developer.chrome.com/release-notes/153)
    -   [`scroll-axis-lock`](https://nerdy.dev/css-scroll-axis-lock) (no Safari or Firefox support)
    -   [`<camera>`](https://developer.chrome.com/blog/usermedia-html-element#the_roadmap_ahead) (no Safari or Firefox support)
    -   [`<microphone>`](https://developer.chrome.com/blog/usermedia-html-element#the_roadmap_ahead) (no Safari or Firefox support)
-   [Safari 27](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/)
    -   [`revert-rule`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/revert-rule) (now Baseline)
    -   [`alpha()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/alpha) (now Baseline)
    -   [`progress()`](https://css-tricks.com/almanac/functions/p/progress/) (now Baseline)
    -   [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark#:~:text=/*%20image%20url%20values%20*/%0Alight%2Ddark\(%0A%20%20url\(%22light%2Dicon.png%22\)%2C%0A%20%20url\(%22dark%2Dicon.png%22\)%0A\)%3B) image values (now Baseline)
    -   [`sizes=auto`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#auto_3) (now Baseline)
    -   3+ color values for [`color-mix()`](https://css-tricks.com/almanac/functions/c/color-mix/) (no Chrome support)
    -   [`ariaNotify`](https://css-tricks.com/the-siren-song-of-arianotify/) (no Chrome support)
    -   [`stretch`](https://css-tricks.com/we-completely-missed-width-height-stretch/) (no Firefox support)
    -   [Transform-aware anchor positioning](https://www.bram.us/2025/11/20/anchor-positioning-is-transform-aware-in-chrome-144/) (no Firefox support)
    -   [Customizable `<select>`](https://css-tricks.com/abusing-customizable-selects/) (no Firefox support)
    -   [`:heading`](https://css-tricks.com/almanac/functions/h/heading/) (no Chrome or Firefox support)
-   [Chrome 154](https://developer.chrome.com/release-notes/154)
    -   [`text-decoration-inset`](https://css-tricks.com/text-decoration-inset-is-like-padding-for-text-decorations/) (no Safari support)
    -   [`frame-sizing`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/frame-sizing) (no Safari or Firefox support)
    -   [`scroll-marker-group` modes](https://developer.chrome.com/release-notes/154#css_scroll-marker-group_modes) (no Safari or Firefox support)
-   [Firefox 157](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/157)
    -   [`at-rule()`](https://www.bram.us/2026/03/15/at-rule/) (no Safari support)
    -   [`overscroll-behavior: chain`](https://drafts.csswg.org/css-overscroll-1/#overscroll-shorthand) (no Safari support)

And, as always, thanks for tuning in!