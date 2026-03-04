---
title: "New to the web platform in February"
source: "https://web.dev/blog/web-platform-02-2026?hl=en"
publishedDate: "2026-02-26"
category: "web-standards"
feedName: "web.dev"
---

Discover some of the interesting features that have landed in stable and beta web browsers during February 2026.

![Rachel Andrew](https://web.dev/images/authors/rachelandrew.jpg)

Published: February 26, 2026

## Stable browser releases

[Chrome 145](https://developer.chrome.com/release-notes/145), [Firefox 148](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/148), and [Safari 26.3](https://developer.apple.com/documentation/safari-release-notes/safari-26_3-release-notes) released to stable during February. This post takes a look at the many new features this month, with several things becoming Baseline Newly available.

### The `text-justify` CSS property

Chrome 145 adds full support for the [`text-justify`](https://developer.mozilla.org/docs/Web/CSS/text-justify) CSS property. This property provides more control over text justification when you use `text-align: justify`.

### Column wrapping for multicol

Chrome 145 adds support for the `column-wrap` and `column-height` CSS properties from Multicol Level 2. This lets columns wrap onto a new row in the block direction, which helps avoid horizontal overflow and provides more flexibility in responsive design.

Learn more in [Support for wrapped columns in multi-column layout](https://developer.chrome.com/blog/multicol-wrapping).

### Customizable `<select>` listbox mode

Chrome 145 also includes the customizable `<select>` listbox rendering mode. This renders the select element in-flow or in the page, rather than with a separate button and popup.

### The `shape()` CSS function

Firefox 148 adds the [`shape()`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/basic-shape/shape) CSS function by default. It lets you define custom shapes in properties like `clip-path` and `offset-path` using standard CSS syntax, to create and edit shapes with CSS units and math functions.

### Iterators in JavaScript

Firefox 148 introduces [`Iterator.zip()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Iterator/zip) and `Iterator.zipKeyed()`. These static methods return a new iterator that groups input elements at each iteration step across multiple data sources.

### The HTML Sanitizer API

Firefox 148 now supports the [`HTML Sanitizer API`](https://developer.mozilla.org/docs/Web/API/HTML_Sanitizer_API). This lets you safely filter HTML before inserting it into the DOM, which helps reduce the risk of XSS attacks.

### Device Bound Session Credentials (DBSC)

Chrome 145 lets websites bind a user's session to their specific device using [Device Bound Session Credentials (DBSC)](https://developer.chrome.com/docs/web-platform/device-bound-session-credentials). This makes it significantly harder to use stolen session cookies on other machines.

### Overflow on replaced elements

In Firefox 148, you can now use the `overflow`, `overflow-x`, and `overflow-y` CSS properties on replaced elements (for example, images or video) in the same way you use them with other elements.

### The Origin API

Chrome 145 fills a gap in the platform by introducing an `Origin` object. This object encapsulates the origin concept and provides helpful methods, such as comparison, serialization, and parsing.

### Zstandard (Zstd) compression

Safari 26.3 introduces support for Zstandard (Zstd). This compression algorithm makes website files smaller and improves loading speeds and efficiency. You can use Zstd for HTTP compression, which provides faster decompression and better compression ratios.

## Beta browser releases

Beta browser versions provide a preview of features that will be in the next stable browser release. You can test new features or removals that might affect your site before the stable release. New beta releases this month include [Firefox 149](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/149) and [Chrome 146](https://developer.chrome.com/blog/chrome-146-beta).

[Chrome 146](https://developer.chrome.com/blog/chrome-146-beta) adds scroll-triggered animations in CSS and also includes the Sanitizer API. [Firefox 149](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/149) includes `popover="hint"`, the Close Watcher API, and the Reporting API.