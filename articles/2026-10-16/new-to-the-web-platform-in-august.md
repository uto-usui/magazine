---
title: "New to the web platform in August"
source: "https://web.dev/blog/web-platform-08-2026?hl=en"
publishedDate: "2026-08-28"
category: "web-standards"
feedName: "web.dev"
---

Discover some of the interesting features that have landed in stable and beta web browsers during August 2026.

![Rachel Andrew](https://web.dev/images/authors/rachelandrew.jpg)

Published: August 28, 2026

## Stable browser releases

[Chrome 152](https://developer.chrome.com/release-notes/152) and [Firefox 154](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/154) released to stable during August 2026. There was no new Safari stable release this month. This post takes a look at the new features landing across the web platform. It's been an excellent month for features becoming Baseline Newly available.

### The `text-box` properties become Baseline

Firefox 154 introduces support for [`text-box-trim`](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-trim), [`text-box-edge`](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-edge), and the [`text-box`](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box) shorthand property.

These properties give you fine-grained control over text alignment and spacing in the block direction. Font metrics often include extra vertical space above and below glyphs (leading and half-leading), which can make vertical alignment uneven and cause unexpected spacing around headings or icons.

The `text-box-edge` property specifies the font metrics to trim to (such as `cap alphabetic` or `ex alphabetic`), and `text-box-trim` specifies whether to trim the over edge, under edge, or both. The `text-box` shorthand combines both properties.

With support in Safari 18.2, Chrome 133, and now Firefox 154, the `text-box` properties are now Baseline Newly available.

### The `sibling-count()` and `sibling-index()` CSS functions become Baseline

Firefox 154 adds support for the [`sibling-count()`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/sibling-count) and [`sibling-index()`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/sibling-index) CSS functions.

The `sibling-count()` function returns an integer representing the total number of sibling DOM elements in the parent container (including the element itself). The `sibling-index()` function returns the 1-based position of the current element among its siblings.

These functions let you calculate layout sizes, staggered animation delays, and color variations dynamically in CSS without needing JavaScript or utility classes. They are now Baseline Newly available.

### The `autocorrect` global HTML attribute becomes Baseline

Chrome 152 adds support for the global [`autocorrect`](https://developer.mozilla.org/docs/Web/HTML/Reference/Global_attributes/autocorrect) HTML attribute and reflects it on [`HTMLElement.prototype.autocorrect`](https://developer.mozilla.org/docs/Web/API/HTMLElement/autocorrect).

The `autocorrect` attribute lets you control whether automatic spelling and punctuation correction is enabled on editable elements, including `<input>`, `<textarea>`, and elements with `contenteditable`. It accepts `on` and `off`.

With Safari and Firefox already supporting this attribute, the global `autocorrect` attribute is now Baseline Newly available.

### `CSSPseudoElement` support for `::backdrop`, `::scroll-marker`, and `::view-transition`

Chrome 152 extends [`CSSPseudoElement`](https://developer.mozilla.org/docs/Web/API/CSSPseudoElement) support (previously available for `::after`, `::before`, and `::marker`) to include `::backdrop`, `::scroll-marker`, and `::view-transition`.

Supporting `CSSPseudoElement` for `::backdrop` lets you attach event listeners directly to the backdrop pseudo-element, making it straightforward to close a dialog when clicking outside the dialog content without computing coordinate bounding boxes. For `::scroll-marker`, it facilitates capturing user interaction events, and for `::view-transition`, it enables intercepting transitions or building geometry-aware animations.

### Relative alpha colors with the `alpha()` CSS function

Chrome 152 introduces the [`alpha()`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/color_value/alpha) function from CSS Color 5 for relative alpha colors.

The `alpha()` function takes an existing origin color and returns that color with an adjusted alpha (transparency) channel, preserving the color channels and working seamlessly in any color space:

### The `window-drag` CSS property

Chrome 152 adds support for the standard `window-drag` CSS property.

When developing installed desktop web applications, you can use `window-drag` to designate specific areas of your layout—such as custom title bars or headers—as draggable regions. Pointer drag gestures on these regions move the top-level application window rather than scrolling or selecting page content. This standardizes and renames the older `app-region` property, using values `move` and `none` with standard CSS inheritance.

### The `OpaqueRange` API

Chrome 152 introduces `OpaqueRange`, representing a live text range within form control values such as `<textarea>` and text-based `<input>` elements.

`OpaqueRange` enables range-based APIs, including `getBoundingClientRect()`, `getClientRects()`, and the CSS Custom Highlight API, to operate on form control text for inline suggestions, spelling highlights, and anchored popovers. It maintains component encapsulation by exposing value offsets rather than internal shadow tree container nodes.

### New `Iterator` helper methods in Firefox

Firefox 154 adds several new methods to [`Iterator.prototype`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Iterator):

-   [`includes()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Iterator/includes): Checks whether an iterator produces a specified value, returning `true` or `false`.
-   [`join()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Iterator/join): Concatenates all elements produced by the iterator into a string separated by a delimiter, similar to `Array.prototype.join()`.
-   [`chunks()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Iterator/chunks): Returns a helper iterator that yields consecutive fixed-size array chunks from the underlying iterator.
-   [`windows()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Iterator/windows): Returns a helper iterator that yields a sliding window array over the iterator.

### WebRTC transport improvements in Firefox

Firefox 154 introduces several WebRTC transport additions:

-   [`RTCIceTransport.getSelectedCandidatePair()`](https://developer.mozilla.org/docs/Web/API/RTCIceTransport/getSelectedCandidatePair) and the [`selectedcandidatepairchange`](https://developer.mozilla.org/docs/Web/API/RTCIceTransport/selectedcandidatepairchange_event) event, allowing applications to inspect the currently active ICE candidate pair.
-   The [`error`](https://developer.mozilla.org/docs/Web/API/RTCDtlsTransport/error_event) event on [`RTCDtlsTransport`](https://developer.mozilla.org/docs/Web/API/RTCDtlsTransport), allowing applications to listen for DTLS transport and fingerprint errors.
-   Support for the `rtcp` configuration parameters on `RTCRtpReceiver.getParameters()` and `RTCRtpSender.getParameters()`.
-   WebRTC transport statistics, reporting `RTCCertificateStats` and additional `RTCTransportStats`.

With support in Chrome, Safari, and now Firefox 154, `RTCIceTransport.getSelectedCandidatePair()` and the `RTCDtlsTransport` `error` event are now Baseline Newly available.

## Beta browser releases

Beta browser versions give you a preview of features coming in the next stable version of the browser. It's an ideal time to test new features or check for breaking changes before they reach all users. New betas this month are [Chrome 153](https://developer.chrome.com/blog/chrome-153-beta) and [Firefox 155](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/155). There is no Safari beta this month.

Chrome 153 beta includes single-axis scroll containers (`overflow: scroll clip`) and the `scroll-axis-lock` CSS property to prevent gesture axis locking. On the JavaScript side, it adds TC39 Iterator `join()` and joint iteration (`zip`). Web API additions include dedicated single-capability declarative elements `<camera>` and `<microphone>`.

Firefox 155 beta updates `SVGAElement` to implement `HyperlinkElementUtils`, exposing standard URL properties (`protocol`, `hostname`, `pathname`, `search`, `hash`) and `origin` on SVG `<a>` elements. It also adds indexed setters to SVG list interfaces (`SVGNumberList`, `SVGPointList`, `SVGStringList`, `SVGTransformList`).