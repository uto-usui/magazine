---
title: "New to the web platform in May"
source: "https://web.dev/blog/web-platform-05-2026?hl=en"
publishedDate: "2026-05-29"
category: "web-standards"
feedName: "web.dev"
---

Discover some of the interesting features that have landed in stable and beta web browsers during May 2026.

![Rachel Andrew](https://web.dev/images/authors/rachelandrew.jpg)

Published: May 29, 2026

## Stable browser releases

[Chrome 148](https://developer.chrome.com/release-notes/148), [Firefox 151](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/151), and [Safari 26.5](https://developer.apple.com/documentation/safari-release-notes/safari-26_5-release-notes) released to stable during May. This post takes a look at the many new features this month.

### The `:open` CSS pseudo-class becomes Baseline

Safari 26.5 is mostly a release of fixes to existing features. However, it also includes support for the [`:open` pseudo-class](https://developer.mozilla.org/docs/Web/CSS/:open), making this feature Baseline Newly available.

The `:open` pseudo-class lets you style elements that have "open" and "closed" states when they are open. This applies to elements such as `<details>` and `<dialog>` when they are open, as well as `<select>` and `<input>` elements (like color or date pickers) when their picker interfaces are showing. This provides a cleaner, semantic alternative to styling using attributes like `details[open]`.

### CSS name-only container queries become Baseline

With Chrome 148 shipping this month, [name-only container queries](https://developer.mozilla.org/docs/Web/CSS/CSS_container_queries) are now Baseline Newly available.

Previously, when writing a container query, you were required to specify a size or style query condition alongside the container name, and establish the container's type with the `container-type` property. Now, you can query the presence of a named container by its name only, without any additional condition. Furthermore, you no longer need to set a `container-type` on the ancestor if you are only querying by name:

```
#container {
  container-name: --sidebar;
}

@container --sidebar {
  .content {
    padding: 2rem;
  }
}
```

### Container style queries for custom properties become Baseline

Firefox 151 introduces support for `style()` queries on `@container`, making container style queries for custom properties Baseline Newly available.

Container style queries allow you to apply styles to elements based on the CSS properties of a parent container. While size queries are extremely powerful, style queries enable you to query non-size features. In particular, this release brings full cross-browser support for querying custom properties. For example, you can check if a custom property `--theme` is set to `dark` on a parent container:

```
@container style(--theme: dark) {
  .card {
    background-color: #1a1a1a;
    color: #fff;
  }
}
```

### Lazy loading for video and audio elements

Chrome 148 introduces native [lazy loading](https://developer.mozilla.org/docs/Web/Performance/Guides/Lazy_loading) for `<video>` and `<audio>` elements with the `loading="lazy"` attribute.

Just like `<img>` and `<iframe>` elements, you can now instruct the browser to delay loading media resources until they are close to the viewport. This helps improve page load performance, save bandwidth, and reduce data usage for your users. Learn more from the team who implemented this feature in [How To Use Standard HTML Video and Audio Lazy-Loading on the Web Today](https://engineering.squarespace.com/blog/2026/how-to-use-standard-html-video-and-audio-lazy-loading-on-the-web-today).

### The Document Picture-in-Picture API

Firefox 151 introduces support for the Document Picture-in-Picture API on desktop platforms.

Unlike the standard Picture-in-Picture API which lets you view a `<video>` element in an always-on-top window, the Document Picture-in-Picture API lets you open an always-on-top window containing arbitrary HTML content. This enables rich interactive overlays such as video conference participant grids, interactive stock tickers, or timers that persist even when navigating away from the page.

### Web Serial API expands platform support

Firefox 151 adds support for the [Web Serial API](https://developer.mozilla.org/docs/Web/API/Web_Serial_API) on desktop platforms, and Chrome 148 adds support for it on Android.

The Web Serial API provides a way for websites to read from and write to serial devices, for example, microcontrollers, 3D printers, development boards, and peripheral hardware. In Firefox, using the Web Serial API requires users to install a synthetically generated site permission add-on, ensuring a safe and controlled mechanism to manage access.

## Beta browser releases

Beta browser versions give you a preview of features in the next stable version of the browser. It's a great time to test new features, or removals, that could impact your site before the world gets that release. New betas this month are [Chrome 149](https://developer.chrome.com/blog/chrome-149-beta) and [Firefox 152](https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/152). There is no Safari beta this month.

Chrome 149 beta includes exciting CSS updates like CSS gap decorations, letting you style the whitespace (gaps) between flex and grid items. It also supports `path()` and `shape()` as well as `rect()` and `xywh()` basic shape functions in the `shape-outside` property, and `path-length` as a CSS property. On the API side, programmatic scroll methods like `scrollTo()`, `scrollBy()`, and `scrollIntoView()` now return Promises resolving when smooth scrolling completes, and pages with active WebSocket connections can now qualify for back/forward caching (BFCache).

Firefox 152 beta introduces full support for the `field-sizing` property, which lets form controls automatically adjust their size to fit their contents. It also adds `actions` and `maxActions` properties to the `Notification` interface, and `options.pseudoElement` support in `Element.getAnimations()`.