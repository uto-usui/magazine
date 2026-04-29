---
title: "New to the web platform in April"
source: "https://web.dev/blog/web-platform-04-2026?hl=en"
publishedDate: "2026-04-24"
category: "web-standards"
feedName: "web.dev"
---

Discover some of the interesting features that have landed in stable and beta web browsers during April 2026.

![Rachel Andrew](https://web.dev/images/authors/rachelandrew.jpg)

Published: April 24, 2026

## Stable browser releases

[Chrome 147](https://developer.chrome.com/release-notes/147) and [Firefox 150](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/150) released to stable during April. There was no stable release of Safari this month. This post takes a look at the many new features this month.

### The `contrast-color()` CSS function becomes Baseline

With Chrome 147 shipping the [`contrast-color()`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/color_value/contrast-color) function, this useful accessibility feature is now available across all major engines, making it Baseline Newly available.

This function takes a color value and returns either black or white, depending on which provides the highest contrast against the provided color. This helps ensure your text meets accessibility contrast requirements.

### Scroll-driven animation range properties are now Baseline

Firefox 150 includes support for `animation-range-start` and `animation-range-end` properties, as well as the `animation-range` shorthand. This makes these properties Baseline Newly available.

These properties allow you to control where along a scroll-driven animation timeline an animation will start and end.

### The `ariaNotify()` method

Firefox 150 introduces support for the `ariaNotify()` method on `Document` and `Element`. This method allows content authors to queue a string of text to be announced by a screen reader.

This provides a more reliable and ergonomic alternative to ARIA live regions, especially for announcements not tied to DOM updates.

### Auto sizes for lazy-loaded images

Firefox 150 now supports the `"auto"` keyword for the `sizes` attribute of `<img>` elements. This allows lazy-loaded images to use the calculated image layout size to select the best source from a `srcset`, simplifying responsive image setup.

### Element-scoped view transitions

Chrome 147 exposes `element.startViewTransition()` on arbitrary HTML elements. This allows for transitions scoped to a specific element, meaning pseudo-elements are affected by ancestor clips and transforms, and multiple transitions can run concurrently.

### CSS `border-shape` property

Chrome 147 introduces the `border-shape` property, allowing you to create non-rectangular borders with shapes like polygons or circles.

### SVG `<textPath>` path attribute

Chrome 147 adds support for the `path` attribute on the SVG `<textPath>` element, letting you define text path geometry inline.

### Modulepreload support for JSON and style

Chrome 147 adds support for JSON and style module types as `<link rel="modulepreload">` destinations.

### `Math.sumPrecise`

Chrome 147 implements the TC39 proposal for `Math.sumPrecise`, returning a precise sum of values in an iterable. This method is now Baseline Newly available.

## Beta browser releases

Beta browser versions give you a preview of things that will be in the next stable version of the browser. It's a great time to test new features, or removals, that could impact your site before the world gets that release. New betas this month are [Chrome 148](https://developer.chrome.com/blog/chrome-148-beta), [Firefox 151](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/151), and [Safari 26.5](https://developer.apple.com/documentation/safari-release-notes/safari-26_5-release-notes).

Chrome 148 beta includes name-only container queries in CSS, lazy loading for video and audio elements, and the `at-rule()` function for feature detection in `@supports`.

Firefox 151 beta includes CSS container style queries.

The Safari 26.5 beta includes support for the `:open` pseudo-class on `<details>`, `<dialog>`, `<select>`, and `<input>` elements, in addition to a large number of issue resolutions.