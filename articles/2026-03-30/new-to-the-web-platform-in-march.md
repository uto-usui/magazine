---
title: "New to the web platform in March"
source: "https://web.dev/blog/web-platform-03-2026?hl=en"
publishedDate: "2026-03-27"
category: "web-standards"
feedName: "web.dev"
---

Discover some of the interesting features that have landed in stable and beta web browsers during March 2026.

![Rachel Andrew](https://web.dev/images/authors/rachelandrew.jpg)

Published: March 31, 2026

## Stable browser releases

[Chrome 146](https://developer.chrome.com/release-notes/146), [Firefox 149](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/149) and [Safari 26.4](https://developer.apple.com/documentation/safari-release-notes/safari-26_4-release-notes) released to stable during March. This post takes a look at the new features arriving on the platform this month.

### Optional container query conditions

Both Firefox 149 and Safari 26.4 include support for name-only `@container` queries that have no conditions. This lets you match against containers based solely on their names, making it more straightforward to style elements based on container context without needing to specify size or style constraints.

### Scroll-triggered animations

Chrome 146 adds scroll-position-based control of animations. This feature lets you create interactions declaratively with CSS, offloading work to a worker thread and improving performance. It also includes JavaScript interfaces for web animations. Learn more in [CSS scroll-triggered animations are coming](https://developer.chrome.com/blog/scroll-triggered-animations).

### The `trigger-scope` property

Along with scroll-triggered animations, Chrome 146 introduces the `trigger-scope` property. This lets you limit the visibility of animation trigger names, helping to isolate animation-to-trigger interactions and avoid global name conflicts.

### Popover `hint` value

Firefox 149 now supports the `hint` value for the `popover` global attribute. Popovers with the `hint` value won't close `auto` popovers when displayed, but will close other `hint` popovers, providing more fine-grained control over popover behavior.

### Grid lanes

Safari 16.4 supports `display: grid-lanes`, this is the value of `display` that switches on a masonry style layout.

### Math functions in `sizes` attribute

Safari 26.4 adds support for using the `min()`, `max()`, and `clamp()` math functions in the `sizes` attribute of `<img>` elements. This provides more flexibility for responsive image loading.

### JavaScript iterator sequencing

Both Chrome 146 and Safari 26.4 now support iterator sequencing, introducing `Iterator.concat(...items)` to create iterators by sequencing existing ones. This feature is now Baseline Newly available.

### CloseWatcher interface

Firefox 149 adds support for the [`CloseWatcher`](https://developer.mozilla.org/docs/Web/API/CloseWatcher) interface. This allows developers to implement components that can be closed using device-native mechanisms, such as the Esc key on Windows or the Back key on Android, in the same way as built-in dialogs and popovers.

## Beta browser releases

Beta browser versions provide a preview of features that will be in the next stable browser release. You can test new features or removals that might affect your site before the stable release. New beta releases this month include [Firefox 150](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/150) and [Chrome 147](https://developer.chrome.com/blog/chrome-147-beta).

### Chrome 147 beta

Chrome 147 beta includes `contrast-color()`—a CSS function that returns either black or white depending on which provides the highest contrast against the argument color. Also included is `border-shape` and element-scoped view transitions.

Firefox 150 beta adds the CSS `revert-rule` keyword, `customeElementRegistry` for Elements and DocumentOrShadowRoot, and `light-dark()` for images.