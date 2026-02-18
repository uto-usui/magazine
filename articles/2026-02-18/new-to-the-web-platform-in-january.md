---
title: "New to the web platform in January"
source: "https://web.dev/blog/web-platform-01-2026?hl=en"
publishedDate: "2026-01-30"
category: "web-standards"
feedName: "web.dev"
---

Discover some of the interesting features that have landed in stable and beta web browsers during January 2026.

![Rachel Andrew](https://web.dev/images/authors/rachelandrew.jpg)

Published: January 30, 2026

## Stable browser releases

[Chrome 144](https://developer.chrome.com/release-notes/144) and [Firefox 147](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/147) released to stable during January. This post takes a look at the many new features this month, with several things becoming Baseline Newly available.

### CSS Anchor Positioning

Firefox 147 includes support for CSS Anchor Positioning, making this feature [Baseline Newly available](https://web.dev/baseline). This API lets you position elements relative to other elements, known as anchors. This is useful for tooltips, menus, and popovers, where you want an element to be positioned relative to another element on the page.

### The Navigation API

Also becoming [Baseline Newly available](https://web.dev/baseline) with Firefox 147 is the [Navigation API](https://developer.mozilla.org/docs/Web/API/Navigation_API). This API provides a modern way to initiate, intercept, and manage navigations in your application.

### Find-in-page styling with `::search-text`

Chrome 144 includes the `::search-text` pseudo-element. This feature exposes find-in-page search result styling to authors as a highlight pseudo-element, similar to `::selection` and `::spelling-error`. This lets you customize the appearance of search results when a user uses the browser's find-in-page functionality.

Find out more on the Igalia blog in [Find-in-Page Highlight styling](https://blogs.igalia.com/schenney/find-in-page-highlight-styling/).

### The `<geolocation>` element

Chrome 144 introduces the `<geolocation>` element, a declarative, user-activated control for accessing the user's location. It streamlines the user and developer journey by handling the permission flow and directly providing location data to the site, often eliminating the need for a separate JavaScript API call.

Learn more in [Introducing the HTML `<geolocation>` element](https://developer.chrome.com/blog/geolocation-html-element).

### The Temporal API

Chrome 144 includes the [Temporal API](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Temporal). This provides standard objects and functions for working with dates and times. This is a significant addition to JavaScript, offering a robust and modern replacement for the `Date` object.

### CSS `caret-shape`

Chrome 144 introduces the `caret-shape` property, which lets you specify the shape of the text insertion caret. You can choose between `auto`, `bar`, `block`, and `underscore`.

### View Transition enhancements

Firefox 147 includes identifying view transition types. These provide a mechanism by which different _types_ can be specified for active view transitions. CSS can then be used to apply animations to DOM elements when their content updates, depending on the transition type specified. Firefox 147 adds support for single-page app (SPA) view transition types only, not cross-document view transition types.

Firefox also now supports the `activeViewTransition` property on the `Document` interface, which returns the `ViewTransition` object for the active transition.

## Beta browser releases

Beta browser versions give you a preview of things that will be in the next stable version of the browser. It's a great time to test new features, or removals, that could impact your site before the world gets that release. New betas this month are [Chrome 145](https://developer.chrome.com/blog/chrome-145-beta) and [Firefox 148](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/148).

Chrome 145 includes the `text-justify` property to control justification methods, and improvements to multi-column layout with `column-wrap` and `column-height`. It also brings the `onanimationcancel` event to `GlobalEventHandlers`. Additionally, customizable `<select>` is extended to listboxes.

Firefox 148 includes support for `Location.ancestorOrigins`, allowing you to determine if a document is embedded in an `<iframe>` and by which sites.