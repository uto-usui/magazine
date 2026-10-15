---
title: "New to the web platform in September"
source: "https://web.dev/blog/web-platform-09-2026?hl=en"
publishedDate: "2026-10-02"
category: "web-standards"
feedName: "web.dev"
---

Discover some of the interesting features that have landed in stable and beta web browsers during September 2026.

![Rachel Andrew](https://web.dev/images/authors/rachelandrew.jpg)

Published: October 2, 2026

## Stable browser releases

It's the first month of bi-weekly Chrome and Firefox releases. That means [Chrome 153](https://developer.chrome.com/release-notes/153), [Chrome 154](https://developer.chrome.com/release-notes/154), [Firefox 155](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/155), [Firefox 156](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/156), [Firefox 157](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/157), and [Safari 27](https://developer.apple.com/documentation/safari-release-notes/safari-27-release-notes) released to stable during September 2026. This post takes a look at the new features landing across browsers, including a large number of features reaching Baseline Newly available.

### The `progress()` CSS function becomes Baseline

Firefox 155 adds support for the [`progress()`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/progress) CSS math function, making it Baseline Newly available.

The `progress()` function returns a `<number>` representing the position of one calculation between a start value and an end value. Typically, the result is clamped between `0` and `1`, which makes it useful for driving fluid sizing, opacity, or colors based on container or viewport dimensions. Both Firefox 155 and Safari 27 also add support for the `no-clamp` keyword option, allowing the returned progress value to extend below `0` or above `1`.

```
.card {
  opacity: progress(100vw, 320px, 1200px);
}
```

### Relative alpha colors with `alpha()` become Baseline

Firefox 155 and Safari 27 both add support for the [`alpha()`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/color_value/alpha) relative color function from CSS Color 5.

The `alpha()` function takes an origin color and returns that color with an adjusted alpha (transparency) channel while preserving its color channels and color space:

```
.overlay {
  background-color: alpha(var(--brand-color) / 50%);
}
```

With Chrome 151, Firefox 155, and Safari 27 all supporting `alpha()`, this function is now Baseline Newly available.

### The `revert-rule` CSS keyword becomes Baseline

Safari 27 adds support for the [`revert-rule`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/revert-rule) CSS-wide keyword.

While `revert` rolls back the cascade to the user or user-agent origin and `revert-layer` rolls back to a previous cascade layer, `revert-rule` rolls back a property's value to what it would have been if the current style rule weren't present. With support in Chrome, Firefox, and now Safari 27, `revert-rule` is Baseline Newly available.

### `<image>` values in `light-dark()` become Baseline

Safari 27 adds support for using `<image>` values inside the [`light-dark()`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/color_value/light-dark) CSS function.

Previously limited to `<color>` values, `light-dark()` can now switch between two images—such as `url()` images or CSS gradients—based on the active light or dark `color-scheme`. With support across Chrome, Firefox, and Safari 27, `<image>` values in `light-dark()` are now Baseline Newly available.

### Scroll anchoring with `overflow-anchor` becomes Baseline

Safari 27 enables scroll anchoring and adds support for the [`overflow-anchor`](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/overflow-anchor) CSS property.

Scroll anchoring adjusts the scroll position automatically when DOM changes above the visible viewport would otherwise cause content to jump while the user is reading or interacting with the page. You can use `overflow-anchor: none` to opt specific elements out of acting as anchor nodes. With Safari 27 joining Chrome and Firefox, scroll anchoring is now Baseline Newly available.

### The `font-width` property and `@font-face` descriptor become Baseline

CSS Fonts 4 replaced `font-stretch` with [`font-width`](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-width) as the canonical name for selecting normal, condensed, or expanded font faces, keeping `font-stretch` as a legacy alias.

Firefox 155 adds support for the `font-width` CSS property, the [`font-width`](https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@font-face/font-width) `@font-face` descriptor, and `CSSStyleDeclaration.fontWidth`. Chrome 154 also adds the `font-width` descriptor in `@font-face` rules and the `width` property on `FontFace` objects. Together with existing support in Safari, `font-width` is now Baseline Newly available.

### `sizes="auto"` for lazy-loaded images becomes Baseline

Safari 27 adds support for the `auto` keyword in the [`sizes`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/sizes) attribute on `<img>` elements that use `loading="lazy"`.

When you specify `sizes="auto"` (or a `sizes` list beginning with `auto`), the browser uses the rendered layout width of the lazy-loaded image to select the most appropriate image source from `srcset`. With support in Chrome, Firefox, and now Safari 27, `sizes="auto"` is Baseline Newly available.

### Async iteration and transferable `ReadableStream` objects become Baseline

Safari 27 includes several updates to [`ReadableStream`](https://developer.mozilla.org/docs/Web/API/ReadableStream):

-   Support for async iteration over `ReadableStream` objects using `for await...of` loops and `ReadableStream.prototype.values()`.
-   Support for transferring `ReadableStream` objects between contexts using `postMessage()`.
-   Support for the [`ReadableStream.from()`](https://developer.mozilla.org/docs/Web/API/ReadableStream/from_static) static method to create a `ReadableStream` from an iterable or async iterable object (also supported in Firefox).

With Safari 27, async iterable streams and transferable `ReadableStream` objects are now Baseline Newly available.

### `AnimationEvent.animation` and `TransitionEvent.animation` become Baseline

Safari 27 adds the [`animation`](https://developer.mozilla.org/docs/Web/API/AnimationEvent/animation) property to `AnimationEvent` and the [`animation`](https://developer.mozilla.org/docs/Web/API/TransitionEvent/animation) property to `TransitionEvent`.

This property returns the `Animation` object associated with the CSS animation or transition event, making it easier to inspect or control the animation directly from an event listener. With Chrome, Firefox, and Safari 27 supporting this property, it is now Baseline Newly available.

### The `maxAge` option in `cookieStore.set()` becomes Baseline

Safari 27 adds support for the `maxAge` option when setting a cookie with [`cookieStore.set()`](https://developer.mozilla.org/docs/Web/API/CookieStore/set), letting you specify a cookie's lifetime as a duration in seconds rather than calculating an absolute `expires` timestamp. With support across Chrome, Firefox, and Safari 27, the `maxAge` option is now Baseline Newly available.

### Customizable `<select>` in Safari 27

Safari 27 adds support for customizable `<select>` menus using `appearance: base-select` and the [`<selectedcontent>`](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/selectedcontent) element, joining Chrome.

Opting a `<select>` and its `::picker(select)` pseudo-element into `appearance: base-select` switches the control to a stylable base appearance, allowing rich HTML content inside `<option>` elements and custom styling for the button and drop-down picker.

### Declarative `<camera>` and `<microphone>` elements in Chrome

Chrome 153 introduces the `<camera>` and `<microphone>` HTML capability elements.

Building on the `<usermedia>` element, `<camera>` and `<microphone>` provide dedicated, user-activated declarative controls for requesting single-capability video or audio capture access without triggering script-initiated permission prompts on page load.

### JavaScript `Iterator` and `Promise` additions

Chrome 153 adds [`Iterator.prototype.join()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Iterator/join) along with joint iteration using [`Iterator.zip()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Iterator/zip) and [`Iterator.zipKeyed()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Iterator/zipKeyed).

Firefox 155 implements [`Promise.allKeyed()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/allKeyed) and [`Promise.allSettledKeyed()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettledKeyed), which accept a dictionary object of promises and resolve to an object with the same keys.

### WebTransport updates in Firefox 155

Firefox 155 expands its [`WebTransport`](https://developer.mozilla.org/docs/Web/API/WebTransport) implementation:

-   Support for application-level protocol negotiation with the `protocols` option in the [`WebTransport()`](https://developer.mozilla.org/docs/Web/API/WebTransport/WebTransport) constructor and the [`WebTransport.protocol`](https://developer.mozilla.org/docs/Web/API/WebTransport/protocol) property. With support in Chrome, Safari, and now Firefox 155, `WebTransport.protocol` is Baseline Newly available.
-   Support for [`createSendGroup()`](https://developer.mozilla.org/docs/Web/API/WebTransport/createSendGroup), [`draining`](https://developer.mozilla.org/docs/Web/API/WebTransport/draining), [`exportKeyingMaterial()`](https://developer.mozilla.org/docs/Web/API/WebTransport/exportKeyingMaterial), and [`WebTransportDatagramDuplexStream.createWritable()`](https://developer.mozilla.org/docs/Web/API/WebTransportDatagramDuplexStream/createWritable).

### Service Worker Static Routing API in Safari 27

Safari 27 adds support for the Service Worker Static Routing API through [`InstallEvent.addRoutes()`](https://developer.mozilla.org/docs/Web/API/InstallEvent/addRoutes).

This API lets a service worker register declarative routing rules at install time so matching requests can bypass service worker startup and fetch directly from the network or cache, improving navigation performance.

## Beta browser releases

Beta browser versions give you a preview of things that will be in the next stable version of the browser. It's a great time to test new features, or removals, that could impact your site before the world gets that release. New betas this month are [Chrome 155](https://chromestatus.com/release-notes/155), [Chrome 156](https://chromestatus.com/release-notes/156), [Firefox 158](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/158), and [Safari 27.2](https://developer.apple.com/documentation/safari-release-notes/safari-27_2-release-notes).

Chrome 155 beta includes CSS `margin-trim`, `symbols()`, and `text-decoration-skip-spaces`, along with JPEG XL (`image/jxl`) decoding support, text module imports (`import ... with { type: "text" }`), and Digital Credentials API issuance support.

Chrome 156 beta includes the CSS `random()` function, CSS `corner` shorthand properties, single-axis scroll containers, `scroll-snap-type: pair`, the `image-animation` property and `:animated-image` pseudo-class, media element state pseudo-classes (`:playing`, `:paused`, `:seeking`, `:buffering`, `:stalled`, `:muted`, `:volume-locked`), deferred module evaluation (`import defer`), and the HTML `<install>` element and Web Install API.

Safari 27.2 beta adds support for `safe` and `unsafe` overflow alignment when paired with `normal`, enables `safe` alignment on fixed-position boxes and `::picker(select)` elements, and renames `flow-tolerance` to `fit-tolerance` for `display: grid-lanes`.