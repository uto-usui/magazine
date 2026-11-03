---
title: "WebKit Features for Safari 27.2"
source: "https://webkit.org/blog/18515/webkit-features-for-safari-27-2/"
publishedDate: "2026-10-26"
category: "web-standards"
feedName: "WebKit Blog"
---

Safari 27.2 is here, refining Customizable Select, renaming a Grid Lanes property, and delivering 20 bug fixes across accessibility, media, CSS, and more.

## Customizable Select

Customizable Select originally [landed in Safari 27.0](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/#customizable-select). Since then, the web standards process continues to polish details. And implementations across all browsers are being updated to match.

For decades, when you use the `<select>` element and a user selects an option, it gets displayed in the “button” (the interactive part of the control that appears on the page). The new superpowers of Customizable Select include a `<selectedcontent>` element to give you more control over what’s displayed and how it looks.

```
<select id="status">
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <option>Processing</option>
  <option>Shipped</option>
  <option>Delivered</option>
  <option>Canceled</option>
</select>
```

But you are not required to use `<selectedcontent>`. You can still write HTML like this:

```
<select id="status">
  <option>Processing</option>
  <option>Shipped</option>
  <option>Delivered</option>
  <option>Canceled</option>
</select>
```

Now in Safari 27.2, the new `::field-content` pseudo-element gives you the ability to style the text of the selected option that’s displayed on the page, without needing the `<selectedcontent>` element.

In addition, Safari 27.2 refines a few of the default UA styles for `appearance: base-select`. The button’s contents vertically center more reliably. The selected option text now inherits `text-overflow` from `<select>`. The way we draw the `::picker-icon` has been updated so it can have a more straightforward layout. And the button uses `flex: 1` to manage spacing, instead of `margin-inline-start: auto` on `::picker-icon`, so the picker icon is always visible, even without `<selectedcontent>`.

Also, previously a large `select` picker could render partly outside the viewport. Safari 27.2 keeps it in view by applying `safe` alignment. This comes from a broader change to CSS alignment: for absolutely and fixed positioned boxes, `safe` now keeps the box within its original containing block. You can also now combine the `safe` and `unsafe` keywords with `normal` alignment.

## CSS

Grid Lanes originally [shipped in Safari 26.4 last March](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/#css). Since then, the CSS Working Group decided to rename the `flow-tolerance` property to `fit-tolerance` to better describe its purpose. Safari 27.2 updates Grid Lanes to use the new name. Meanwhile, the older name will keep working for now as a deprecated alias. Be sure to update your code soon. Safari Web Inspector can help by marking what needs to be changed.

What is the `fit-tolerance` property? It controls how picky the browser is when it chooses where to put the next item. Without any tolerance, the browser looks for the column (or row in the other direction) whose content precisely ends highest on the page, and puts the item there. But if several columns end at nearly the same height, you may not care which one wins. With `fit-tolerance`, you define how much of a difference counts. When columns are within that distance of each other, the browser treats them as tied and just picks the first one. The default is `fit-tolerance: 1em`.

A higher tolerance keeps consecutive items in neighboring columns, instead of jumping back and forth across the page to chase tiny differences in height. That makes for a better experience tabbing through content, especially for sighted keyboard users, who watch focus move from item to item. So most of the time, you should increase this number significantly. How much depends on your content sizes and how much they vary.

Play with `fit-tolerance` on the [Field Guide to Grid Lanes](https://gridlanes.webkit.org/) to better understand what it does. Learn more about how Grid Lanes and Fit Tolerance work in our article, [Introducing CSS Grid Lanes](https://webkit.org/blog/17660/introducing-css-grid-lanes/).

## Bug fixes and more

In addition to these updates, in our continuing commitment to quality, WebKit for Safari 27.2 includes 20 bug fixes:

### Accessibility

-   Fixed list, table, tree, and canvas content being omitted from the accessible name or description when the containing element is referenced by `aria-labelledby` or `aria-describedby`. (186015032)
-   Fixed VoiceOver repeating text it had already announced when a page streams content by re-rendering an `aria-live` region instead of appending to it. (186766347)
-   Fixed an issue where VoiceOver did not identify `<input type="date">`, `<input type="time">`, and `<input type="color">` controls as pop-up buttons on iOS. (187788949)

### Animations

-   Fixed `animation-range-start` and `animation-range-end` resolving incorrectly when `zoom` is applied, including when the value is inherited from an element with a different zoom factor. (185760120)

### CSS

-   Fixed an issue where an anchor-positioned element inside a modal `<dialog>` could be laid out offscreen and become invisible when the page was scrolled. (187933878)

### Forms

-   Fixed: Switched default `content` for the`::picker-icon` in Customizable Select to render with a glyph that has a more straightforward layout, no longer requiring negative margins to align correctly. (187411081)

### HTML

-   Fixed the window `load` event never being dispatched when a `readystatechange` handler starts a new load. (186475302)

### JavaScript

-   Fixed `for await...of` over an async generator skipping the `Promise.prototype.constructor` lookup required by `PromiseResolve` when that property is replaced. (183960626)

### Media

-   Fixed an issue where `AudioContext.decodeAudioData()` failed with an `EncodingError` on valid AAC/M4A audio files. (183474728)
-   Fixed video showing a black screen while audio continued to play after the video decoder was invalidated. (184041554)
-   Fixed `ManagedMediaSource` not firing the `startstreaming` event when seeking to a time that is not buffered, which could stall playback. (185166787)
-   Fixed an issue where a media element’s `play()` promise was not resolved when a `SourceBuffer` contained clear, unencrypted content. (188022510)
-   Fixed an issue where the WebCodecs `VideoEncoder` could stall and produce no output for H.264 Main and High profiles. (188201298)

### Networking

-   Fixed cookies set by a top-level navigation’s own response being capped to a seven-day lifetime when the site’s hostname is CNAMEd to a different registrable domain. (183787115)

### SVG

-   Fixed dynamic changes to a `<foreignObject>` element’s `x` and `y` values having no effect. (184273832)

### Safari MCP

-   Fixed Safari taking keyboard focus from other apps when creating tabs or capturing screenshots under Safari MCP control. (182558329)

### Web API

-   Fixed an issue where transient activation could be incorrectly discarded, causing APIs gated on user activation (such as the Clipboard API) to fail on the first attempt. (187872193)

### Web Extensions

-   Fixed a significant delay before web extension content is injected when Safari is cold launched. (185268822)

### WebGPU

-   Fixed a severe frame rate drop when calling `executeBundles()` with render bundles that contain `drawIndirect()` or `drawIndexedIndirect()`. (186099290)

### WebRTC

-   Fixed an issue where `getUserMedia()` requests for audio permanently failed with `NotAllowedError` after the system audio service was reset. (186939802)

## Updating to Safari 27.2

Safari 27.2 is available on iOS 27.2, iPadOS 27.2, visionOS 27.2, macOS 27.2 Golden Gate, macOS Tahoe and macOS Sequoia. On iOS, iPadOS, visionOS, and macOS 27.2 Golden Gate, you can update to Safari 27.2 as part of the OS update in Settings > General > Software Update. On older versions of macOS, if you want to only update Safari, you can do so in Software Update, by clicking “more”.

## Feedback

We love hearing from you. To share your thoughts, find our web evangelists online: Jen Simmons on [Bluesky](https://bsky.app/profile/jensimmons.bsky.social) / [Mastodon](https://front-end.social/@jensimmons), Saron Yitbarek on [Bluesky](https://bsky.app/profile/saron.bsky.social) / [Mastodon](https://front-end.social/@saron), and Jon Davis on [Bluesky](https://bsky.app/profile/jondavis.bsky.social) / [Mastodon](https://mastodon.social/@jondavis). You can follow WebKit [on LinkedIn](https://www.linkedin.com/in/apple-webkit/). If you run into any issues, we welcome your [feedback](https://feedbackassistant.apple.com/) on Safari UI (learn more about [filing Feedback](https://developer.apple.com/bug-reporting/)), or your [WebKit bug report](https://bugs.webkit.org/) about web technologies or Web Inspector. If you run into a website that isn’t working as expected, please file a report at [webcompat.com](https://webcompat.com/). Filing issues really does make a difference.