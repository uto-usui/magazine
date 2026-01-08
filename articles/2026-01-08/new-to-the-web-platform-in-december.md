---
title: "New to the web platform in December"
source: "https://web.dev/blog/web-platform-12-2025?hl=en"
publishedDate: "2025-12-16"
category: "web-standards"
feedName: "web.dev"
---

Discover some of the interesting features that have landed in stable and beta web browsers during December 2025.

![Rachel Andrew](https://web.dev/images/authors/rachelandrew.jpg)

Published: December 16, 2025

## Stable browser releases

[Chrome 143](https://developer.chrome.com/release-notes/143), [Firefox 146](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/146) and [Safari 26.2](https://developer.apple.com/documentation/safari-release-notes/safari-26_2-release-notes) released to stable during December. This post takes a look at the many new features this month, with several things becoming Baseline Newly available.

### The `@scope` CSS at-rule is now Baseline

Firefox 146 includes the [`@scope`](https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@scope) CSS at-rule which lets you select elements in specific DOM subtrees. Define a scope inside which selectors can target elements, and you avoid overly specific and lengthy selectors. For example, the following CSS only targets `<img>` elements if they are inside an element with a class of `.card`.

```
@scope (.card) {
    img {
        border-color: green;
    }
}
```

With Firefox 146, this useful at-rule is now Baseline Newly available. Learn more about it in [Limit the reach of your selectors with the CSS `@scope` at-rule](https://developer.chrome.com/docs/css-ui/at-scope).

### The `contrast-color()` CSS function

Also in Firefox 146 is the [`contrast-color()`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/color_value/contrast-color) function. This function takes a color value and returns a contrasting color, which aims to ensure WCAG AA minimum contrast.

For more examples see [How to have the browser pick a contrasting color in CSS](https://webkit.org/blog/16929/contrast-color/) on the WebKit blog.

Firefox is the first browser to ship the [`text-decoration-inset`](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-inset) property. This property lets you adjust the start and end points of an element's text decoration so it can be shortened, lengthened, or have its position shifted with respect to the rendered text.

### The `font-language-override` CSS property

Chrome 143 includes the [`font-language-override`](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-language-override) property. This lets you override the typeface behavior for a specific language. This is useful if you are using a typeface that doesn't have proper support for a language, you could opt to use glyphs from a similar language with better support.

### CSS anchored fallback container queries

Chrome 143 introduces `@container anchored(fallback)` to style descendants of anchor positioned elements based on which of `position-try-fallbacks` is applied.

Such queries can be used to style an anchored element's tether or its animations, based on how the anchor and the anchored element are positioned relative to each other.

### Side-relative syntax for `background-position-x/y` longhands

Also in Chrome, and now available across all browsers, is the ability to Define the background image's position relative to one of its edges in the longhand properties for `background-position`. For example:

```
.element {
  background-image: url(flower.gif);
  background-repeat: no-repeat;
  background-position-x: left 30px;
  background-position-y: bottom 20px;
}
```

### The animation `overallProgress` property

Safari 26.2 includes [`overallProgress`](https://developer.mozilla.org/docs/Web/API/Animation/overallProgress). This read-only property of the Animation interface returns a number between `0` and `1` indicating the animation's overall progress towards its finished state.

This property is now Baseline Newly available.

### LCP and INP are now Baseline Newly available

The [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp) and [Interaction to Next Paint (INP)](https://web.dev/articles/inp) metrics are now Baseline Newly available, with support in Safari 26.2 for the Contentful Paint API and Event Timing API needed to measure these metrics.

These features were included in Interop 2025, and you can now measure these metrics in the latest version of all major browsers.

**Largest Contentful Paint API**

**Event Timing API**

### CHIPS reaches Baseline Newly available

Safari 26.2 also includes CHIPS (Cookies Having Independent Partitioned State), which lets you opt a cookie into partitioned storage, with a separate cookie jar per top-level site.

### `hidden="until-found"`

Safari 26.2 includes support for [`hidden="until-found"`](https://developer.mozilla.org/docs/Web/HTML/Reference/Global_attributes/hidden), which now becomes Baseline Newly available.

### The `command` and `commandfor` attributes

Also for HTML in Safari 26.2 is support for [`command`](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/command) and [`commandfor`](https://developer.mozilla.org/docs/Web/API/HTMLButtonElement/commandfor) on buttons. This provides a declarative way to control popovers and dialogs.

Find out more in [Introducing `command` and `commandfor`](https://developer.chrome.com/blog/command-and-commandfor).

### The `scrollend` event

Another feature becoming Baseline Newly available with Safari 26.2 is the [`scrollend`](https://developer.mozilla.org/docs/Web/API/Element/scrollend_event) event. This event fires when scrolling completes, find out more about it in [Scrollend, a new JavaScript event](https://developer.chrome.com/blog/scrollend-a-new-javascript-event).

### The `scrollbar-color` property

The `scrollbar-color` property lets you change the color of the scrollbar _thumb_, and the scrollbar _track_. With Safari 26.2 this also becomes Baseline Newly available.

## Beta browser releases

Beta browser versions give you a preview of things that will be in the next stable version of the browser. It's a great time to test new features, or removals, that could impact your site before the world gets that release. New betas this month are [Firefox 147](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/147) and [Chrome 144](https://developer.chrome.com/blog/chrome-144-beta).

Chrome 144 includes the `::search-text` pseudo-element for find-in-page search result styling and `scrolled` support for `@scroll-state` letting you style descendants of containers based on the most recent scrolling direction. Also included is the Temporal API, with standard objects and functions for working with dates and times.

Firefox 147 is an exciting release that includes CSS anchor positioning, view transition types, and the Navigation API.

For more on exciting CSS and UI features that landed this year, check out [CSS Wrapped 2025](https://chrome.dev/css-wrapped-2025/).