---
title: "June 2026 Baseline monthly digest"
source: "https://web.dev/blog/baseline-digest-jun-2026?hl=en"
publishedDate: "2026-07-17"
category: "web-standards"
feedName: "web.dev"
---

![Jeremy Wagner](https://web.dev/images/authors/jlwagner-v7.jpg)

Published: July 17, 2026

Welcome once again to the Baseline monthly digest. In June 2026, `field-sizing` became Baseline Newly available, allowing form controls to automatically adjust to their content. Meanwhile, a wide range of CSS, HTML, and Web API features reached Baseline Widely available status, alongside important updates from the developer community.

## Baseline Alerts on Web Platform Status

Keeping track of when web features become interoperable is now easier with Baseline Alerts on the [Web Platform Status dashboard](https://webstatus.dev/). By signing in with GitHub, you can subscribe to notifications for features as they become Baseline Newly available, Widely available, or receive new browser implementations. Subscriptions can be configured to send email updates or custom RSS feeds on a monthly, weekly, or immediate schedule. You can scope alerts to saved searches—like all HTML features—create custom newsletters, generate shareable feature lists, or configure Slack webhooks to notify your engineering team.

Learn more in [Introducing Baseline Alerts](https://web.dev/blog/baseline-alerts).

## Baseline Newly available features

The features in this section are supported as of June 2026 in the core browser set and are now Baseline Newly available.

### `field-sizing`

The `field-sizing` CSS property provides control over the sizing behavior of form elements—such as `<textarea>`, `<input>`, and `<select>`—that traditionally have default fixed dimensions. With `field-sizing: content` form controls automatically expand or shrink to fit their content, reducing the need for custom JavaScript auto-resize scripts.

Learn more in the [MDN reference page for field-sizing](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/field-sizing).

## Baseline Widely available features

The following features became Baseline Widely available, meaning that they are now broadly compatible and usable in your projects.

### `:has()` pseudo-class

The `:has()` CSS parent selector lets you style an element based on its descendants or subsequent siblings. This functional pseudo-class enables conditional layout patterns directly in CSS without needing JavaScript to inspect DOM structures.

Read more in the [MDN page for the :has pseudo-class](https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:has).

### `HTMLIFrameElement.loading`

The `loading` property on `<iframe>` elements enables lazy loading for embedded frames. By specifying `loading="lazy"`, browsers defer loading offscreen iframes until they are scrolled near the viewport, saving network bandwidth and initial page load overhead.

Check out the details on the [MDN reference for HTMLIFrameElement.loading](https://developer.mozilla.org/docs/Web/API/HTMLIFrameElement/loading).

### `CanvasRenderingContext2D.reset()`

The `reset()` method on 2D canvas contexts clears the drawing context state—resetting properties like transformations, clipping paths, line styles, and fill styles back to their default values. This allows a canvas context to be reused cleanly without manual property cleanup.

Find out more on the [MDN documentation for CanvasRenderingContext2D.reset](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/reset).

### `cap` length unit

The `cap` font-relative unit corresponds to the nominal cap height of the element's font. It lets you align and size elements relative to the height of uppercase letters, enabling precise typographic layouts.

Learn more in the [MDN reference for length units](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/length#cap).

### `counter-set` property

The `counter-set` CSS property sets a CSS counter to a specified value, complementing `counter-reset` and `counter-increment`. It provides control when manipulating numbered lists, document outlines, or custom counter sequences.

Read the details on the [MDN page for counter-set](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-set).

### `createImageBitmap()`

The `createImageBitmap()` static method creates an asynchronous bitmap image from various image sources, including `<img>`, `<canvas>`, `Blob`, or `ImageData`. Because it decodes images off the main thread, it avoids blocking UI performance when handling complex canvas graphics.

Check the implementation details on the [MDN documentation for createImageBitmap](https://developer.mozilla.org/docs/Web/API/Window/createImageBitmap).

### `<easing-function>` data type

The `<easing-function>` CSS data type describes mathematical rate-of-change curves for transitions and animations. Beyond standard keywords like `ease-in` or `cubic-bezier()`, it supports functions like `linear()` to construct custom spring or bounce effects.

Learn how to use it on the [MDN reference for easing-function](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/easing-function).

### `&` nesting selector

The `&` nesting selector explicitly anchors child rule selectors to their parent selector when using built-in CSS nesting. It ensures clarity and correct specificity rules when defining nested hover, focus, or pseudo-class states.

Read the details on the [MDN guide for the nesting selector](https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/Nesting_selector).

### Responsive preloading with `rel="preload"`

The `media` attribute on `<link rel="preload">` elements enables responsive preloading of key assets. By combining `rel="preload"` with media queries, browsers download only the assets matching the user's viewport width or display characteristics early in the loading lifecycle.

Find out how to use it on the [MDN documentation for rel="preload"](https://developer.mozilla.org/docs/Web/HTML/Reference/Attributes/rel/preload#including_media).

### `HTMLMediaElement.preservesPitch`

The `preservesPitch` property on `<audio>` and `<video>` elements controls whether the browser adjusts audio pitch when changing the `playbackRate`. Setting it to `false` allows pitch shifts when speeding up or slowing down media playback.

Check out the details on the [MDN page for HTMLMediaElement.preservesPitch](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/preservesPitch).

### `:dir()` pseudo-class

The `:dir()` CSS pseudo-class matches elements based on text directionality (such as `ltr` or `rtl`), matching direction inherited from HTML attributes like `dir` or computed text context.

Learn more in the [MDN page for the :dir pseudo-class](https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:dir).

### `pow()` math function

The `pow()` CSS function calculates exponential power values directly within CSS declarations, raising a base number to an exponent (for example, `pow(2, 3)`). This simplifies responsive scaling and mathematical grid relationships.

Read the details on the [MDN reference for the pow function](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/pow).

### CSS `mask` property

The `mask` CSS shorthand property hides parts of an element using images or gradients as clipping layers. It combines sub-properties like `mask-image`, `mask-position`, and `mask-repeat` to create complex visual masking effects.

Find out more on the [MDN page for the mask property](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/mask).

### `@media (scripting)`

The `scripting` media feature tests whether client-side scripting (such as JavaScript) is enabled and available in the browser context. This allows progressive enhancement styles to target environments with or without active JavaScript.

Learn more in the [MDN reference for the scripting media feature](https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@media/scripting).

### `URL.canParse()`

The `URL.canParse()` static method checks whether a given string is a valid, parsable URL (with an optional base URL) without throwing an exception, simplifying runtime URL validation before instantiating `URL` objects.

Check the implementation details on the [MDN documentation for URL.canParse](https://developer.mozilla.org/docs/Web/API/URL/canParse_static).

### Storage Access API

The Storage Access API provides a mechanism for cross-site content embedded within third-party `<iframe>`s to request unpartitioned cookie and storage access, enabling authentication and stateful interactions across domain boundaries.

Read the details on the [MDN page for the Storage Access API](https://developer.mozilla.org/docs/Web/API/Storage_Access_API).

## That's a wrap

Tell us if we missed anything Baseline-related, and we will make sure it gets captured in a future edition! If you have any questions or want to provide feedback on Baseline, you can file an issue in our [issue tracker](https://github.com/web-platform-dx/web-features/issues).