---
title: "New to the web platform in July"
source: "https://web.dev/blog/web-platform-07-2026?hl=en"
publishedDate: "2026-07-31"
category: "web-standards"
feedName: "web.dev"
---

Discover some of the interesting features that have landed in stable and beta web browsers during July 2026.

![Rachel Andrew](https://web.dev/images/authors/rachelandrew.jpg)

Published: July 31, 2026

## Stable browser releases

[Chrome 151](https://developer.chrome.com/release-notes/151), [Firefox 153](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/153), and [Safari 26.6](https://developer.apple.com/documentation/safari-release-notes/safari-26_6-release-notes) released to stable during July 2026. This post takes a look at the new features landing across the web platform this month.

### HTML parser updates in Firefox 153 bring customizable `<select>` closer

Firefox 153 updates HTML parsing rules for [`<select>`](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/select) elements. Previously, only `<option>`, `<optgroup>`, and `<hr>` elements were allowed to be parsed as children inside a `<select>`. With this update, all nested elements can be parsed into the DOM inside `<select>`, laying the groundwork for customizable select elements across browsers.

### The `ruby-overhang` CSS property

Chrome 151 adds support for the [`ruby-overhang`](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-overhang) CSS property. This property controls whether ruby annotation text can overhang adjacent base characters. It accepts `auto`, `spaces`, or `none` keywords. Per the CSS specification, `none` is aliased to `spaces`, which allows ruby text to overhang only whitespace and CJK punctuation, preventing unnecessary layout gaps while maintaining readability.

### Declarative Shadow DOM manual slot assignment

Chrome 151 introduces the `shadowrootslotassignment` attribute on the [`<template>`](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/template) element. This attribute allows declarative shadow roots to configure manual slot assignment instead of named slot assignment. Previously, manual slot assignment was only available imperatively with `attachShadow({slotAssignment: "manual"})`. It accepts `named` (default) or `manual`, and is reflected in JavaScript through the [`shadowRootSlotAssignment`](https://developer.mozilla.org/docs/Web/API/HTMLTemplateElement/shadowRootSlotAssignment) property on `HTMLTemplateElement`.

### The `animation` property on `AnimationEvent` and `TransitionEvent`

Chrome 151 adds a read-only `animation` attribute to the [`AnimationEvent`](https://developer.mozilla.org/docs/Web/API/AnimationEvent) and [`TransitionEvent`](https://developer.mozilla.org/docs/Web/API/TransitionEvent) interfaces. This attribute returns the underlying [`Animation`](https://developer.mozilla.org/docs/Web/API/Animation) object associated with the event, allowing you to query animation state directly inside event listeners.

### Desktop Picture-in-Picture API in Firefox

Firefox 153 brings support for the [Picture-in-Picture API](https://developer.mozilla.org/docs/Web/API/Picture-in-Picture_API) to desktop platforms. This provides a standard web API for sites to toggle display of a `<video>` element between the page and a floating, always-on-top window, allowing users to keep watching video content while switching tabs or interacting with other applications.

### The `Intl.Locale` Info API

Firefox 153 adds support for the TC39 `Intl.Locale` info proposal. This adds several getter methods to [`Intl.Locale`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale) instances, including `getCalendars()`, `getCollations()`, `getHourCycles()`, `getNumberingSystems()`, `getTextInfo()`, `getTimeZones()`, and `getWeekInfo()`. These methods allow developers to inspect locale-specific conventions without needing external internationalization data libraries.

With this release these methods are now Baseline Newly available.

```
const jaJP = new Intl.Locale("ja-JP");
console.log(jaJP.getCalendars()); // ["gregory", "japanese"]
```

### `IDBObjectStore.getAllRecords()` and `IDBIndex.getAllRecords()`

Firefox 153 introduces [`IDBObjectStore.getAllRecords()`](https://developer.mozilla.org/docs/Web/API/IDBObjectStore/getAllRecords) and [`IDBIndex.getAllRecords()`](https://developer.mozilla.org/docs/Web/API/IDBIndex/getAllRecords). These IndexedDB methods retrieve all matching records (including primary keys, index keys, and values) in a single request, eliminating the need to write complex cursor iteration logic when fetching dataset subsets or full object store contents.

### `textStream()` for `Response`, `Request`, and `Blob`

Chrome 151 adds the `textStream()` method to `Response`, `Request`, and `Blob` objects. This convenient helper method provides a readable stream of decoded text strings directly from binary body data, equivalent to piping `body` through a `TextDecoderStream()`.

### The `<usermedia>` capability element MVP

Chrome 151 introduces the declarative `<usermedia>` capability element. This browser-controlled element provides an explicit, user-initiated mechanism for requesting camera and microphone access. By anchoring permission prompts to a clear user interaction with a trusted element, `<usermedia>` improves prompt transparency and user experience while offering a straightforward recovery path if permission was previously denied.

Find out more in [Introducing the HTML `<usermedia>` element](https://developer.chrome.com/blog/usermedia-html-element).

### Bug fixes and quality-of-life updates in Safari 26.6

Safari 26.6 shipped with important bug fixes and stability enhancements:

-   Fixed an issue where the `ic` length unit scaled incorrectly with page zoom.
-   Fixed `position-area` fallback behavior for fixed-positioned elements when the page body is scrollable.
-   Corrected CSS `zoom` interaction with font properties (`font-size`, `font-weight`, `font-style`, `font-variant`) on iPad when requesting desktop sites.
-   Fixed deletion of partitioned cookies using cookie headers.

## Beta browser releases

Beta browser versions give you a preview of features coming to the next stable release. It's an ideal time to test new features or check for breaking changes before they reach all users. New betas this month are [Chrome 152](https://developer.chrome.com/blog/chrome-152-beta), [Firefox 154](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/154), and [Safari 27](https://developer.apple.com/documentation/safari-release-notes/safari-27-release-notes).

Chrome 152 beta includes `CSSPseudoElement` support for `::backdrop`, `::scroll-marker`, and `::view-transition`, the global `autocorrect` HTML attribute, media element pseudo-classes (`:playing`, `:paused`, `:muted`), the CSS Color 5 `alpha()` relative color function, the `window-drag` property, the CPU Performance API, and WebGPU subgroup size control.

Firefox 154 beta introduces WebRTC transport improvements including `RTCIceTransport.getSelectedCandidatePair()` and the `selectedcandidatepairchange` event, as well as the `error` event on `RTCDtlsTransport`.

Safari 27 beta brings a large suite of new features, including the `ariaNotify` API for screen reader announcements, `contain: style` for quote counters, case-sensitive `s` modifier in attribute selectors, the `stretch` keyword for box sizing, `:host:has()` compound selectors, the `:heading` pseudo-class, `revert-rule` keyword, transform-aware anchor positioning, `color-mix()` with more than two colors, and the `no-clamp` option on `progress()`.