---
title: "New to the web platform in June"
source: "https://web.dev/blog/web-platform-06-2026?hl=en"
publishedDate: "2026-06-30"
category: "web-standards"
feedName: "web.dev"
---

Discover some of the interesting features that have landed in stable and beta web browsers during June 2026.

![Rachel Andrew](https://web.dev/images/authors/rachelandrew.jpg)

Published: June 30, 2026

## Stable browser releases

[Chrome 149](https://developer.chrome.com/release-notes/149), [Chrome 150](https://developer.chrome.com/release-notes/150), and [Firefox 152](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/152) released to stable during June. There was no Safari stable release this month. This post takes a look at the new features landing in web browsers.

### Sizing form controls with `field-sizing` becomes Baseline

Firefox 152 introduces support for the [`field-sizing`](https://developer.mozilla.org/docs/Web/CSS/field-sizing) CSS property, making automatic form control sizing Baseline Newly available across all major browser engines.

The `field-sizing` property lets form controls like `<textarea>`, `<input>`, and `<select>` shrink or grow dynamically to fit their content (`field-sizing: content`) instead of remaining fixed at a default size (`field-sizing: fixed`). This eliminates the need for JavaScript workarounds when building text inputs or textareas that resize as users type.

```
textarea {
  field-sizing: content;
}
```

### Basic shapes `rect()` and `xywh()` in `shape-outside` become Baseline

With Chrome 149 shipping support for the [`rect()`](https://developer.mozilla.org/docs/Web/CSS/basic-shape/rect) and [`xywh()`](https://developer.mozilla.org/docs/Web/CSS/basic-shape/xywh) shape functions in the `shape-outside` property, these basic shapes are now Baseline Newly available across major browsers.

The `rect()` and `xywh()` functions let you define rectangular float exclusion areas using exact inset coordinates or origin-and-dimensions syntax. This offers a simpler and more readable syntax than using `polygon()` for rectangular float wrapping shapes.

### Automatic font scaling with CSS `text-fit`

Chrome 150 introduces the `text-fit` CSS property, letting developers automatically scale font sizes to fit the width of a containing box.

```
.headline {
  text-fit: grow;
}
```

### CSS gap decorations

Chrome 149 introduces support for CSS gap decorations in grid and flexbox layouts. Gap decorations let you add lines and styling directly to the spacing between grid and flex items, similar to `column-rule` in multi-column layouts.

```
.grid-container {
  display: grid;
  gap: 20px;
  column-rule: 2px solid red;
  row-rule: 1px dashed gray;
}
```

Learn more in [Gap decorations: Now in Chromium](https://developer.chrome.com/blog/gap-decorations-stable).

### CSS `background-clip: border-area`

Chrome 150 adds support for `background-clip: border-area` from CSS Backgrounds Level 4.

This value clips element backgrounds specifically to the border area, letting you create custom gradient borders, decorative frame edges, and animated border effects without requiring extra wrapping elements or pseudo-elements.

### Programmatic scroll promises

Chrome 150 updates programmatic scroll methods (`scrollTo()`, `scrollBy()`, and `scrollIntoView()`) to return a Promise.

The returned Promise resolves when the smooth scrolling animation finishes, providing a reliable signal for triggering follow-up actions once scrolling settles.

### Declarative keyboard navigation with `focusgroup`

Chrome 150 introduces support for the `focusgroup` attribute.

The `focusgroup` attribute lets developers declaratively manage arrow key navigation across composite UI controls (such as toolbars, tablists, and menus) without manually writing keyboard event listeners.

```
<div focusgroup="toolbar wrap" aria-label="Text formatting">
  <button type="button">Bold</button>
  <button type="button">Italic</button>
  <button type="button">Underline</button>
</div>
```

Learn more from the [Focusgroup Explainer](https://open-ui.org/components/scoped-focusgroup.explainer/).

### WebSockets supported in Back/Forward Cache (bfcache)

In Chrome 149, pages with active WebSocket connections can now enter the Back/Forward Cache (bfcache).

Previously, an open WebSocket connection rendered a page ineligible for bfcache. Now, the browser automatically closes active WebSocket connections upon bfcache entry, allowing the page to be cached and instantly restored when navigated back to.

### Interim and header response timing in Resource Timing

Firefox 152 adds support for [`firstInterimResponseStart`](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/firstInterimResponseStart) and [`finalResponseHeadersStart`](https://developer.mozilla.org/docs/Web/API/PerformanceResourceTiming/finalResponseHeadersStart) on the `PerformanceResourceTiming` interface.

These can be used to measure how long it takes for the browser to receive interim HTTP responses and the final HTTP response after sending a request, respectively.

### Action buttons for Notifications

Firefox 152 adds support for notification action buttons using the [`actions`](https://developer.mozilla.org/docs/Web/API/Notification/actions) property on `Notification` and options in `ServiceWorkerRegistration.showNotification()`.

You can now include action buttons on OS notifications and listen for user interactions when buttons are tapped.

## Beta browser releases

Beta browser versions give you a preview of features in the next stable version of the browser. It's a great time to test new features, or removals, that could impact your site before the world gets that release. New betas this month are [Firefox 153](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/153) and [Safari 27](https://developer.apple.com/documentation/safari-release-notes/safari-27-release-notes).

Firefox 153 beta introduces support for `Error.stackTraceLimit` to configure maximum captured stack trace depth, `IDBObjectStore.getAllRecords()` and `IDBIndex.getAllRecords()` for retrieving indexed records, and `RTCDtlsTransport.getRemoteCertificates()` for WebRTC security inspection. Add-on developers also gain a new `publicSuffix` API and `userScripts.execute()` method for on-demand script injection.

Safari 27 beta introduces transform-aware anchor positioning, the `:heading` pseudo-class for matching heading elements, the `revert-rule` keyword to roll back cascade layers, support for the `stretch` keyword in box sizing, and `:host:has()` compound selectors.