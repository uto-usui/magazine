---
title: "New to the web platform in October"
source: "https://web.dev/blog/web-platform-10-2025?hl=en"
publishedDate: "2025-10-30"
category: "web-standards"
feedName: "web.dev"
---

Discover some of the interesting features that have landed in stable and beta web browsers during October 2025.

![Rachel Andrew](https://web.dev/images/authors/rachelandrew.jpg)

Published: October 30, 2025

## Stable browser releases

[Chrome 142](https://developer.chrome.com/blog/new-in-chrome-142) and [Firefox 144](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/144) released to stable during October, this post takes a look at what that means for the web platform.

### The View Transitions API for Single-Page Apps

Firefox 144 includes support for same-document view transitions. This includes support for:

-   The `:active-view-transition` pseudo-class
-   The `view-transition-class` property
-   The `view-transition-name` property
-   The `::view-transition` pseudo-element
-   The `::view-transition-group()` pseudo-element
-   The `::view-transition-image-pair()` pseudo-element
-   The `::view-transition-new()` pseudo-element
-   The `::view-transition-old()` pseudo-element

This makes [same-document view transitions Baseline Newly available](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available).

### The `command` and `commandfor` attributes on the `<button>` element

Firefox 144 supports `command` and `commandfor`. You can find out more about these attributes in [Introducing `command` and `commandfor`](https://developer.chrome.com/blog/command-and-commandfor).

### The `moveBefore()` method

The `moveBefore()` method is now supported by Firefox on the `Element`, `DocumentFragment` and `Document` interfaces. This lets you move an immediate child element of the object, before another of its child elements, with both elements retaining their state.

Learn more in [Preserve state during DOM mutations with moveBefore()](https://developer.chrome.com/blog/movebefore-api).

### `:target-before` and `:target-after` pseudo-classes

Chrome 142 adds pseudo-classes that match scroll markers that are before or after the active marker (matching `:target-current`) within the same scroll marker group, as determined by flat tree order:

-   `:target-before`: Matches all scroll markers that precede the active marker in the flat tree order within the group.
-   `:target-after`: Matches all scroll markers that follow the active marker in the flat tree order within the group.

### Range syntax for style container queries and `if()`

Chrome 142 enhances CSS style queries and the `if()` function by adding support for [range syntax](https://web.dev/articles/media-query-range-syntax).

It extends style queries beyond exact value matching (for example, `style(--theme: dark)`). Developers can use comparison operators (such as `>` and `<`) to compare custom properties, literal values (for example, 10px or 25%), and values from substitution functions like `attr()` and `env()`. For a valid comparison, both sides must resolve to the same data type. It is limited to the following numeric types: `<length>`, `<number>`, `<percentage>`, `<angle>`, `<time>`, `<frequency>`, and `<resolution>`.

### Interest Invokers (the `interestfor` attribute)

Chrome 142 also adds an `interestfor` attribute to `<button>` and `<a>` elements. This attribute adds "interest" behaviors to the element. When a user _shows interest_ in the element, actions are triggered on the target element, for example, showing a popover.

The user agent detects when a user shows interest in the element through methods such as holding the pointer over the element, hitting special hotkeys on the keyboard, or long-pressing the element on touchscreens. When interest is shown or lost, an `InterestEvent` fires on the target, which has default actions for popovers, such as showing and hiding the popover.

## Beta browser releases

Beta browser versions give you a preview of things that will be in the next stable version of the browser. It's a great time to test new features, or removals, that could impact your site before the world gets that release. New betas this month are [Firefox 145](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/144) and [Chrome 143](https://developer.chrome.com/blog/chrome-143-beta), with [Safari 26.1](https://developer.apple.com/documentation/safari-release-notes/safari-26_1-release-notes) ongoing.

Firefox 145 includes the `source` property of the `ToggleEvent` interface and the `Atomics.waitAsync()` static method.

Chrome 145 includes CSS anchored fallback container queries. This introduces `@container anchored(fallback)` to style descendants of anchor-positioned elements based on which `position-try-fallbacks` value is applied.