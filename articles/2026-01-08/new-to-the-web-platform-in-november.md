---
title: "New to the web platform in November"
source: "https://web.dev/blog/web-platform-11-2025?hl=en"
publishedDate: "2025-11-26"
category: "web-standards"
feedName: "web.dev"
---

Discover some of the interesting features that have landed in stable and beta web browsers during November 2025.

![Rachel Andrew](https://web.dev/images/authors/rachelandrew.jpg)

Published: November 26, 2025

## Stable browser releases

[Firefox 145](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/145) and [Safari 26.1](https://developer.apple.com/documentation/safari-release-notes/safari-26_1-release-notes) released to stable during November, this post takes a look at what that means for the web platform.

### Safari 26.1

This release of Safari is mostly a release that fixes bugs and compatibility issues with existing features.

There's a couple of additions with support for relative units in SVG, and support for remembering the last successful `position-try` fallback in CSS anchor positioning to reduce layout jumps when styles change.

### `Atomics.waitAsync()`

Firefox 145 now supports the `Atomics.waitAsync()` static method. This method allows synchronization of threads based upon the value in a shared memory location. It waits asynchronously for the value and returns an object representing the operation's result. With this release, it's now Baseline Newly available.

### The `ToggleEvent` `source` property

Firefox also supports the `source` property of the `ToggleEvent` interface. If a popover is triggered to open or close by an HTML element such as a `<button>`, the event's source property will contain the element that triggered the popover.

### The `Integrity-Policy` and `Integrity-Policy-Report-Only` HTTP headers

The `Integrity-Policy` and `Integrity-Policy-Report-Only` HTTP headers are supported in Firefox for script resources. These allow websites to enforce subresource integrity guarantees for scripts.

## Beta browser releases

Beta browser versions give you a preview of things that will be in the next stable version of the browser. It's a great time to test new features, or removals, that could impact your site before the world gets that release. New betas this month are [Firefox 146](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/146) and [Safari 26.2](https://developer.apple.com/documentation/safari-release-notes/safari-26_2-release-notes).

Firefox 146 includes the CSS [`contrast-color()`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/color_value/contrast-color) function and the `display-p3-linear` color space in `<color>`. Also included is the CSS [`@scope`](https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@scope) at-rule letting you select elements in specific DOM subtrees, which will become Baseline Newly available.

Safari 26.2 is shaping up to be a release full of new features for the browser. It includes the CSS `random()` function, along with the [`field-sizing`](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/field-sizing) property. `hidden=until-found` is also included, as are the `command` and `commandfor` attributes on buttons.