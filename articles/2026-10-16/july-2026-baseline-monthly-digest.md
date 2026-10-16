---
title: "July 2026 Baseline monthly digest"
source: "https://web.dev/blog/baseline-digest-jul-2026?hl=en"
publishedDate: "2026-08-10"
category: "web-standards"
feedName: "web.dev"
---

![Jeremy Wagner](https://web.dev/images/authors/jlwagner-v7.jpg)

Published: August 10, 2026

Welcome to the monthly Baseline digest. In this edition, explore web platform features, articles, and tools shared by the web developer community.

## The Baseline Features audit is now in Lighthouse

To track the Baseline features that your site uses, use the Baseline Features audit in Lighthouse. See [The Baseline Features audit is now available in Lighthouse](https://web.dev/blog/baseline-lighthouse-features-audit) to learn how the audit helps you identify modern web capabilities in your audits.

## Testing Modern Web Guidance against a React app

[Ahmad Alfy](https://alfy.blog/) tested Modern Web Guidance against a production React application to see how agentic coding skills perform with real-world codebases. Read [Testing Google's "modern-web-guidance" skill against a real React app](https://alfy.blog/2026/07/25/modern-web-guidance.html) to see how it identifies outdated patterns and surfaces current best practices.

## Baseline 2026: 4 APIs That Changed How I Code

[Dennis Morello](https://morello.dev/) walks through four web platform APIs that reached Baseline in 2026, including the Navigation API, container style queries, `:open`, and `Math.sumPrecise()`. See [Baseline 2026: 4 APIs That Changed How I Code](https://morello.dev/blog/baseline-2026-web-platform-apis) to see how these additions let you drop external dependencies in favor of built-in platform features.

## Baseline Newly available features

The following features are supported across all core browser engines and are now newly available in Baseline.

### `Intl.Locale`

Working with internationalization and locale identifiers is now easier with `Intl.Locale`. The `Intl.Locale` object provides a standard way to parse, manipulate, and query Unicode locale tags, such as language, script, and region sub-tags, without needing custom string-parsing logic. See the [MDN documentation for `Intl.Locale`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale).

## Baseline Widely available features

These features are now supported across all major browser engines long enough to be considered Baseline Widely available, making them safe to use without polyfills.

### `Array.fromAsync()`

If you want to convert an async iterable straight into an array, `Array.fromAsync()` is now interoperable. It functions like `Array.from()`, but it is built specifically for asynchronous data streams. For more information, see the [MDN reference for `Array.fromAsync()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync).

### Image file type and format guide

Choosing the right image format for the web involves many options. The updated MDN guide details browser support across modern image formats to help you select an imagery strategy for your site. See the [MDN Image file type and format guide](https://developer.mozilla.org/docs/Web/Media/Guides/Formats/Image_types) for more information.

### `rect()` CSS function

Defining rectangular clip paths and offset paths in CSS is even cleaner with the `rect()` basic shape function. It lets you specify inset distances from containing block edges directly. For more information about the syntax, see the [MDN documentation for `rect()`](https://developer.mozilla.org/docs/Web/CSS/Reference/Values/basic-shape/rect).

## That's a wrap!

That's it for this month's digest. If a Baseline update or community post was missed, let the team know so it can be included in an upcoming issue. If you have questions or feedback about Baseline, file an issue on the [issue tracker](https://github.com/web-platform-dx/web-features/issues).