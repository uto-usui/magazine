---
title: "Release Notes for Safari Technology Preview 257"
source: "https://webkit.org/blog/18652/release-notes-for-safari-technology-preview-257/"
publishedDate: "2026-11-18"
category: "web-standards"
feedName: "WebKit Blog"
---

[Safari Technology Preview](https://webkit.org/blog/6017/introducing-safari-technology-preview/) Release 257 is now [available for download](https://developer.apple.com/safari/resources/) for macOS Golden Gate and macOS Tahoe. If you already have Safari Technology Preview installed, you can update it in System Settings under General → Software Update.

This release includes WebKit changes between: [324654@main…326096@main](https://github.com/WebKit/WebKit/compare/590746c297667e9a2cffff7e359ae8c67a3b72eb...b7e4f1ae76f66dd30c14c27d46770d7e3f2795f5).

### Animations

#### Resolved Issues

-   Fixed content overlapping a running accelerated filter animation (such as a blur) being painted below the animated element. ([325784@main](https://commits.webkit.org/325784@main)) (190763952)
-   Fixed an issue where a view transition kept running with a stale `::view-transition-new()` when the new element became hidden by `content-visibility: hidden`; the transition is now skipped. ([325900@main](https://commits.webkit.org/325900@main)) (191543407)
-   Fixed an issue where a rendering update was not scheduled after changing an animation’s timeline to a `ViewTimeline`, which could prevent the animation from updating. ([325449@main](https://commits.webkit.org/325449@main)) (191570099)
-   Fixed an issue where `backdrop-filter` blur did not animate correctly when threaded animations were enabled. ([325591@main](https://commits.webkit.org/325591@main)) (191605067)

### CSS

#### Resolved Issues

-   Fixed `::first-letter` and `::first-line` to allow only the properties the CSS Pseudo-Elements specification permits, made both pseudo-elements animatable, and fixed `getComputedStyle()` for them on non-block elements. ([325393@main](https://commits.webkit.org/325393@main)) (100561733)
-   Fixed `insertRule()` not working when inserting `@scope` rules. ([325468@main](https://commits.webkit.org/325468@main)) (142005371)
-   Fixed named style container queries on `:host` not applying to slotted elements. ([325470@main](https://commits.webkit.org/325470@main)) (167244007)
-   Fixed fixed table layout ignoring the border and padding of percentage-width cells. ([325373@main](https://commits.webkit.org/325373@main)) (179489436)
-   Fixed `vertical-align: top` and `vertical-align: bottom` on the last child of a nested inline box so that following content is no longer included in its aligned subtree. ([324989@main](https://commits.webkit.org/324989@main)) (189071684)
-   Fixed an ancestor’s overflow clip ignoring `corner-shape` changes and clipping square corners as rounded. ([324753@main](https://commits.webkit.org/324753@main)) (189340250)
-   Fixed `overflow-wrap: anywhere` not treating the boundary between adjacent `white-space: nowrap` inline elements as a soft wrap opportunity. ([325882@main](https://commits.webkit.org/325882@main)) (190264355)
-   Fixed forgiving selector list recovery splitting on commas inside blocks of an invalid selector. ([325466@main](https://commits.webkit.org/325466@main)) (190298284)
-   Fixed the max-content width of a multi-line column flex container to be its widest item rather than the sum of its lines. ([324662@main](https://commits.webkit.org/324662@main)) (190313974)
-   Fixed resolving the definite height of a flex item with an `aspect-ratio` in a column flexbox. ([325691@main](https://commits.webkit.org/325691@main)) (190464363)
-   Fixed an issue where text in a closed `<details>` element with a `display: grid` `::details-content` kept its fallback font widths after a web font loaded. ([325819@main](https://commits.webkit.org/325819@main)) (190574679)
-   Fixed a flex container’s intrinsic width growing each time it was computed when it used a percentage `gap`. ([324665@main](https://commits.webkit.org/324665@main)) (190776762)
-   Fixed a `flex-flow: column wrap` flex container keeping a stale `max-content` width after its height changed. ([324706@main](https://commits.webkit.org/324706@main)) (190780038)
-   Fixed a column-flow grid with `auto-fill` rows keeping a stale `max-content` width after its height changed. ([324711@main](https://commits.webkit.org/324711@main)) (190784633)
-   Fixed the baseline of an `inline-block` containing a block with `overflow: hidden` inside an inline box. ([324661@main](https://commits.webkit.org/324661@main)) (190786587)
-   Fixed out-of-flow boxes in a grid container ignoring the gutters of collapsed `auto-fit` tracks. ([324960@main](https://commits.webkit.org/324960@main)) (191002910)
-   Fixed an out-of-flow flex item with `align-self: last baseline` being placed at the cross-start edge instead of the cross-end edge. ([324873@main](https://commits.webkit.org/324873@main)) (191117031)
-   Fixed `text-box-trim` on inline boxes trimmed to `cap`, `ex` or `alphabetic` being offset in vertical writing modes. ([324974@main](https://commits.webkit.org/324974@main)) (191117213)
-   Fixed flex containers with distributed `align-content` space leaving the last line up to 1/64 of a pixel short of the end edge. ([325040@main](https://commits.webkit.org/325040@main)) (191118046)
-   Fixed flex items with auto margins on the main axis ending up to 1/64 of a pixel short of the end edge of the flex container. ([325109@main](https://commits.webkit.org/325109@main)) (191118159)
-   Fixed flex items distributed with `justify-content` space values ending up to 1/64 of a pixel short of the end edge of the flex container. ([324975@main](https://commits.webkit.org/324975@main)) (191118729)
-   Fixed flexible items overflowing the flex container by up to 1/64 of a pixel because each item rounded its share of the free space separately. ([324987@main](https://commits.webkit.org/324987@main)) (191128611)
-   Fixed an issue where the inline content of a fixed-width block could report stale min-content and max-content sizes. ([325059@main](https://commits.webkit.org/325059@main)) (191215004)
-   Fixed an issue where a flex item with `max-width` could shrink below its `max-width` while its siblings stayed too wide. ([325332@main](https://commits.webkit.org/325332@main)) (191225991)
-   Fixed `text-box-trim` incorrectly trimming the line-over side of inline boxes in `vertical-lr` writing mode when using `trim-start`. ([325139@main](https://commits.webkit.org/325139@main)) (191239706)
-   Fixed `text-box-trim` so that trimming at the start propagates through the border and padding of a block container that sets `text-box-trim`. ([325206@main](https://commits.webkit.org/325206@main)) (191254988)
-   Fixed an issue where the overline of a trimmed inline box with `text-box-trim` was not drawn at the trimmed edge. ([325187@main](https://commits.webkit.org/325187@main)) (191255274)
-   Fixed a table with `min-width` and borders or padding overflowing its shrink-to-fit container. ([325368@main](https://commits.webkit.org/325368@main)) (191255444)
-   Fixed `min-width` and `max-width` being ignored on MathML elements. ([325249@main](https://commits.webkit.org/325249@main)) (191258079)
-   Fixed the selection highlight on an ellipsis in the first line being sized and colored using the `::first-line` style. ([325151@main](https://commits.webkit.org/325151@main)) (191296114)
-   Fixed a stretched image in a narrow flex container not shrinking below its natural width. ([325274@main](https://commits.webkit.org/325274@main)) (191301942)
-   Fixed printing to lay out page content at 96 CSS pixels per inch instead of 90, matching the CSS specification. ([325364@main](https://commits.webkit.org/325364@main)) (191312592)
-   Fixed a `min-content` or `max-content` `max-width` incorrectly capping the minimum width transferred through `aspect-ratio`. ([325240@main](https://commits.webkit.org/325240@main)) (191330680)
-   Fixed a table’s `aspect-ratio` not transferring its `min-height` to its intrinsic width contributions. ([325241@main](https://commits.webkit.org/325241@main)) (191331239)
-   Fixed `text-overflow: ellipsis` hiding more of the first line than needed when `::first-line` sets a larger font size. ([325279@main](https://commits.webkit.org/325279@main)) (191352930)
-   Fixed a multi-column flex item being baseline aligned by the wrong column. ([325367@main](https://commits.webkit.org/325367@main)) (191399721)
-   Fixed `line-clamp` counting an outside list marker as a line, which clamped list items one line too early. ([325385@main](https://commits.webkit.org/325385@main)) (191419440)
-   Fixed `text-overflow` not applying to a `line-clamp` block ellipsis that overflows the line. ([325356@main](https://commits.webkit.org/325356@main)) (191466391)
-   Fixed a table with `aspect-ratio` being as tall as its aspect ratio makes it plus its rows. ([325774@main](https://commits.webkit.org/325774@main)) (191485863)
-   Fixed `conic-gradient()` color stops breaking when `max()` with percentages is used. ([325849@main](https://commits.webkit.org/325849@main)) (191498204)
-   Fixed changing `widows` or `orphans` not triggering layout. ([325425@main](https://commits.webkit.org/325425@main)) (191514148)
-   Fixed `box-decoration-break: clone` not painting a full `border-image` on each fragment of a split inline. ([325426@main](https://commits.webkit.org/325426@main)) (191514468)
-   Fixed a `filter` on an `overflow: hidden` rounded element dropping its border when an ancestor also has `overflow: hidden` and `border-radius`. ([325901@main](https://commits.webkit.org/325901@main)) (191519236)
-   Fixed line layout for text inside `display: contents` elements so the line height of the parent box is used, and the text’s font only stretches the line when that line height is `normal`, matching Firefox. ([325558@main](https://commits.webkit.org/325558@main)) (191578085)
-   Fixed `getComputedStyle()` so the `font-size` value includes text zoom again. ([325600@main](https://commits.webkit.org/325600@main)) (191629138)
-   Fixed `text-overflow: ellipsis` truncating text that runs opposite to the line direction so that it removes whole user-perceived characters instead of splitting surrogate pairs or grapheme clusters. ([325687@main](https://commits.webkit.org/325687@main)) (191760915)
-   Fixed a `line-clamp` string block ellipsis being painted horizontally in vertical writing modes. ([325821@main](https://commits.webkit.org/325821@main)) (191873016)
-   Fixed `text-combine-upright` text so `innerText`, copy, and accessibility return the combined text instead of U+FFFC. ([325946@main](https://commits.webkit.org/325946@main)) (191972461)
-   Fixed `cqi` units not updating when the padding of a `box-sizing: border-box` container changes. ([325933@main](https://commits.webkit.org/325933@main)) (191984223)
-   Fixed an issue where upright text in a monospace font with a vertical `writing-mode` was measured too narrow, causing incorrect line breaking and line clamping. ([325951@main](https://commits.webkit.org/325951@main)) (192081282)
-   Fixed `border-image` with a fractional `image-set()` resolution to compute the correct slices instead of truncating the scale factor. ([326068@main](https://commits.webkit.org/326068@main)) (192132215)

### Canvas

#### Resolved Issues

-   Fixed root font relative units in canvas `ctx.font` resolving against the canvas element instead of the root element. ([325391@main](https://commits.webkit.org/325391@main)) (184337961)
-   Fixed drawing after reset() if the transform was non-invertible. ([329203@main](https://commits.webkit.org/329203@main)) (191171984)
-   Fixed path after canvas transform becomes non-invertible. ([329548@main](https://commits.webkit.org/329548@main)) (191385929)
-   Fixed clipping in drawImage() when the source rect extends outside the source image. ([329650@main](https://commits.webkit.org/329650@main)) (191456271)
-   Fixed globalCompositeOperation for videos, VideoFrames, and gradient/pattern text. ([330047@main](https://commits.webkit.org/330047@main)) (191742230)
-   Fixed an issue where changing a canvas drop shadow caused content to draw fully opaque instead of respecting `globalAlpha`. ([326029@main](https://commits.webkit.org/326029@main)) (192039068)
-   Fixed an issue where color font glyphs drawn with a shadow in canvas ignored `globalAlpha`. ([326030@main](https://commits.webkit.org/326030@main)) (192039073)

### Editing

#### Resolved Issues

-   Fixed a line of text not re-wrapping back onto the previous line after text that caused it to wrap was removed. ([325384@main](https://commits.webkit.org/325384@main)) (191399419)

### Forms

#### New Features

-   Added support for rendering `<select multiple size="1">` as a dropdown box on macOS. ([325870@main](https://commits.webkit.org/325870@main)) (191933576)
-   Added preview support, off by default, for the enhanced `<select>` element with the `multiple` attribute and list box rendering, and for cloning every selected option into `selectedcontent` elements. ([326015@main](https://commits.webkit.org/326015@main)) (191940389)

#### Resolved Issues

-   Fixed `<input type="file">` activation so that clicking it is accepted with transient user activation, in the same way as `showPicker()`, which fixes file pickers failing to open on some sites. ([325539@main](https://commits.webkit.org/325539@main)) (190758283)
-   Fixed a `<select>` whose form state was restored continuing to show the previously selected option. ([324821@main](https://commits.webkit.org/324821@main)) (190877013)
-   Fixed `<selectedcontent>` elements of a `<select>` not all being updated when one of them is moved. ([324903@main](https://commits.webkit.org/324903@main)) (191118813)
-   Fixed the baseline alignment of listbox `<select>` elements to match `vertical-align: text-bottom`, consistent with other browsers. ([324997@main](https://commits.webkit.org/324997@main)) (191125523)
-   Fixed an issue where removing the first of two forms sharing an ID fired `formAssociatedCallback` twice on a form-associated custom element that uses the `form` attribute. ([325660@main](https://commits.webkit.org/325660@main)) (191734804)
-   Fixed an issue where the scroll position of a scrollable `<textarea>` jumped on the first edit made below the visible area. ([325991@main](https://commits.webkit.org/325991@main)) (191743391)

### Images

#### Resolved Issues

-   Fixed an issue where an image with `object-fit: contain` left stale pixels from the previous image when its `src` changed to a smaller image. ([325038@main](https://commits.webkit.org/325038@main)) (190735629)
-   Fixed `image-orientation: none` being ignored for same-origin images used as repeating backgrounds or border images, and wrongly honored for cross-origin images. ([325213@main](https://commits.webkit.org/325213@main)) (191363848)

### JavaScript

#### Resolved Issues

-   Fixed function calls that spread too many arguments to consistently throw a `RangeError`. ([325701@main](https://commits.webkit.org/325701@main)) (191778715)
-   Fixed the `Array.prototype.flat()` error message to state the correct limit of 2^53 – 1. ([326008@main](https://commits.webkit.org/326008@main)) (191983165)

### Media

#### Resolved Issues

-   Fixed audio files served over HTTP with the `application/ogg` MIME type failing to play on macOS. ([325783@main](https://commits.webkit.org/325783@main)) (40512703)
-   Fixed `VideoDecoder` closing with an error when decoding VP8 frames that are not shown, such as alternate reference frames. ([324769@main](https://commits.webkit.org/324769@main)) (138819149)
-   Fixed inline videos sometimes showing a black screen after playing while off-screen. ([325855@main](https://commits.webkit.org/325855@main)) (177400156)
-   Fixed muted autoplaying looping WebM video stopping playback at the second loop boundary. ([324855@main](https://commits.webkit.org/324855@main)) (189626414)
-   Fixed an issue where a media element’s `readyState` did not return to `HAVE_METADATA` when seeking to an unbuffered position, which caused playback to stall after scrubbing. ([325111@main](https://commits.webkit.org/325111@main)) (190448987)
-   Fixed an issue where a video briefly shrank within the page after exiting fullscreen by clicking in Safari. ([325830@main](https://commits.webkit.org/325830@main)) (190550400)
-   Fixed captions being overlapped by media controls on sites that use video.js. ([325540@main](https://commits.webkit.org/325540@main)) (190832118)
-   Fixed WebCodecs `AudioDecoder` to return audio channels in Web Audio channel order. ([324993@main](https://commits.webkit.org/324993@main)) (190905240)
-   Fixed WebCodecs `VideoEncoder` to reject configurations with a zero bitrate in `configure()` and `isConfigSupported()`. ([324824@main](https://commits.webkit.org/324824@main)) (191117654)
-   Fixed an issue where WebVTT `STYLE` block rules from one text track applied to the cues of other tracks, and corrected their cascade order relative to page styles. ([325291@main](https://commits.webkit.org/325291@main)) (191130060)
-   Fixed MIME sniffing of MPEG-1 MP3 files that computed the wrong frame size. ([325857@main](https://commits.webkit.org/325857@main)) (191819608)

### Networking

#### Resolved Issues

-   Fixed relative `tls-certificate-binding` `Link` header references being ignored by resolving them against the response URL. ([324709@main](https://commits.webkit.org/324709@main)) (190868689)
-   Fixed JSON documents and web application manifests to always be decoded as UTF-8. ([324849@main](https://commits.webkit.org/324849@main)) (191010594)
-   Fixed `Link` response headers on subresources (such as CSS, scripts, and fonts) incorrectly triggering `rel=preload` and `rel=preconnect`. Only the main resource now does. ([325035@main](https://commits.webkit.org/325035@main)) (191196085)
-   Fixed removing disk cache data not canceling pending cache writes. ([325116@main](https://commits.webkit.org/325116@main)) (191303133)
-   Fixed beacons sent from `pagehide` being lost when a page is closed and its process shuts down. ([325866@main](https://commits.webkit.org/325866@main)) (191507608)
-   Fixed `Cache`‘s `match()` and `matchAll()` to queue Reporting API Cross-Origin-Resource-Policy violation reports when a cross-origin opaque response is blocked. ([325722@main](https://commits.webkit.org/325722@main)) (191769480)

### Performance

#### Resolved Issues

-   Fixed sluggish, stuttering scrolling on 60Hz Mac displays. ([325736@main](https://commits.webkit.org/325736@main)) (187724904)
-   Fixed slow rendering and laggy scrolling on pages with many gradients affected by Adaptive Dark Mode color filters. ([324781@main](https://commits.webkit.org/324781@main)) (190976194)
-   Fixed high memory usage from elements with `will-change` that cover a very large area by limiting the compositing layers created for them. ([325986@main](https://commits.webkit.org/325986@main)) (191108775)

### Rendering

#### Resolved Issues

-   Fixed scrollbars in iframes disappearing after switching to another tab and back. ([325789@main](https://commits.webkit.org/325789@main)) (184796310)
-   Fixed the macOS titlebar becoming translucent when revealed during element fullscreen. ([324908@main](https://commits.webkit.org/324908@main)) (186354937)
-   Fixed a `position: sticky` element jiggling by a pixel or two while scrolling when it is inside a container with `overflow-x: clip`. ([325813@main](https://commits.webkit.org/325813@main)) (187137709)
-   Fixed text measured with `unicode-bidi: bidi-override` reusing cached widths from the same text without the override, which could produce incorrect text widths and layout. ([325039@main](https://commits.webkit.org/325039@main)) (189140386)
-   Fixed text with glyphs extending beyond the line box, such as zalgo text, being painted over during repaint. ([325354@main](https://commits.webkit.org/325354@main)) (190149105)
-   Fixed an issue where the text selection highlight was not visible on some pages, such as github.com. ([325357@main](https://commits.webkit.org/325357@main)) (190440739)
-   Fixed viewport units such as `vw` and `vh` growing and squishing page content during two-finger zoom on macOS. ([324759@main](https://commits.webkit.org/324759@main)) (190690179)
-   Fixed text selection highlighting being positioned too close to the top of the line instead of covering the text evenly. ([325186@main](https://commits.webkit.org/325186@main)) (190765820)
-   Fixed the PDF viewer’s heads-up display buttons appearing far too small. ([325149@main](https://commits.webkit.org/325149@main)) (190915095)
-   Fixed glyph overflow being added to the wrong sides of a text box’s ink overflow in vertical and `horizontal-bt` writing modes. ([325776@main](https://commits.webkit.org/325776@main)) (191485780)
-   Fixed an issue where a fixed-position element kept stale size and position after its ancestor stopped being its containing block, such as when `transform`, `filter`, or `contain: paint` was removed. ([325610@main](https://commits.webkit.org/325610@main)) (191609323)

### SVG

#### Resolved Issues

-   Fixed SVG `<a>`, `<g>`, and nested `<svg>` elements not rendering `outline`, including the default `:focus` ring. ([325259@main](https://commits.webkit.org/325259@main)) (97642031)
-   Fixed fragment URLs for SVG documents in `object`, `embed`, or `iframe` incorrectly scrolling the page. ([324862@main](https://commits.webkit.org/324862@main)) (186468177)
-   Fixed SVG filters appearing blurry on high-DPI displays when the SVG is drawn as an image. ([325456@main](https://commits.webkit.org/325456@main)) (188890391)
-   Fixed SVG point parsing to reject values with trailing invalid characters after the point. ([325447@main](https://commits.webkit.org/325447@main)) (190341099)
-   Fixed removing or retargeting an active `<animateMotion>` leaving its previous target, and the target’s `<use>` instances, displaced. ([325015@main](https://commits.webkit.org/325015@main)) (191010745)
-   Fixed stale pixels when an animated SVG `<img>` with `object-view-box` is partially repainted. ([325405@main](https://commits.webkit.org/325405@main)) (191531146)
-   Fixed SVG text so `vector-effect: non-scaling-stroke` measures stroke width in the same coordinate system as SVG shapes, relative to the outermost `<svg>`. ([325461@main](https://commits.webkit.org/325461@main)) (191578423)
-   Fixed SVG fonts to honor the `font-variant` attribute. ([325698@main](https://commits.webkit.org/325698@main)) (191773904)

### Scrolling

#### New Features

-   Scrolling to the edge of the document on macOS is now animated with a spring animation. ([325876@main](https://commits.webkit.org/325876@main)) (191909106)

### Security

#### Resolved Issues

-   Fixed an issue where a fragment-only (same-document) navigation could trigger a page reload when Enhanced Security is enabled. ([325769@main](https://commits.webkit.org/325769@main)) (191208475)

### Web API

#### New Features

-   Added `AudioWorklet.port` and `AudioWorkletGlobalScope.port`, allowing a page and its audio worklet to exchange messages without creating a processor node. ([325762@main](https://commits.webkit.org/325762@main)) (161670776)
-   Added support for the WebAuthn cross-device fallback URL extension. ([324658@main](https://commits.webkit.org/324658@main)) (190635008)

#### Resolved Issues

-   Fixed `window.print()` waiting for active `XMLHttpRequest` requests, such as long-polling, to finish; the print dialog now appears after the `load` event. ([325938@main](https://commits.webkit.org/325938@main)) (35035119)
-   Fixed events not being dispatched to nodes inside a sandboxed `iframe`. ([325977@main](https://commits.webkit.org/325977@main)) (88820311)
-   Fixed mouse events on macOS sometimes reaching the page out of order, such as `mouseup` before `mousedown`, when using an input method like Baidu. ([325795@main](https://commits.webkit.org/325795@main)) (102126328)
-   Fixed an issue where an `AudioWorklet` thread kept running after its document stopped, causing out-of-memory errors when creating `WebAssembly.Memory` after repeated reloads. ([325251@main](https://commits.webkit.org/325251@main)) (108873396)
-   Fixed the `duration` argument of `AudioBufferSourceNode.start()` being measured against the `AudioContext` clock instead of the source data when `loop` is `true`. ([325805@main](https://commits.webkit.org/325805@main)) (166168368)
-   Fixed Back navigation skipping a valid session history entry that is still traversable through the Navigation API. ([325340@main](https://commits.webkit.org/325340@main)) (186603812)
-   Fixed `element.focus()` dispatching `focusin` but not `focus` while the page is not focused. ([325635@main](https://commits.webkit.org/325635@main)) (189962933)
-   Fixed a `MessageChannel` whose ports stay within one page permanently ceasing to deliver messages after the Networking process disconnects. ([325343@main](https://commits.webkit.org/325343@main)) (190069996)
-   Fixed the `MouseEvent` constructor and `initMouseEvent()` remapping a `button` value of -2 to 0. ([325341@main](https://commits.webkit.org/325341@main)) (190182026)
-   Fixed an issue where previously buffered audio was heard when resuming an `AudioContext` after it was suspended. ([325183@main](https://commits.webkit.org/325183@main)) (190634066)
-   Fixed `Cache.put()` so it replaces the stored request, not only the response, when overwriting an existing entry. ([324795@main](https://commits.webkit.org/324795@main)) (190659952)
-   Fixed an issue where concurrent `CacheStorage` operations failed with an error on an origin that had no existing cache data. ([324794@main](https://commits.webkit.org/324794@main)) (190660037)
-   Fixed `requestIdleCallback` dropping the `timeout` when the callback was already in the list of runnable idle callbacks. ([325318@main](https://commits.webkit.org/325318@main)) (190685362)
-   Fixed an issue where only the first navigation of an iframe was reported in the parent document’s Resource Timing entries. Every navigation initiated by the parent document is now reported. ([325284@main](https://commits.webkit.org/325284@main)) (191225392)
-   Fixed `FileSystemWritableFileStream.close()` resolving its promise before the file was committed. ([325091@main](https://commits.webkit.org/325091@main)) (191280663)
-   Fixed File System Access operations reporting success when the operation had not actually completed. ([325131@main](https://commits.webkit.org/325131@main)) (191312739)
-   Fixed `navigator.credentials.get()` dropping OpenID4VP requests when a page also offered an `org-iso-mdoc` request; all requests are now presented together. ([325322@main](https://commits.webkit.org/325322@main)) (191358037)
-   Fixed the async clipboard API to UTF-8 decode text blobs it writes. ([325398@main](https://commits.webkit.org/325398@main)) (191377836)
-   Fixed an unreferenced `AbortSignal.any()` signal being garbage collected while its sources could still abort, which left listeners added with it as their `signal` option from being removed. ([325360@main](https://commits.webkit.org/325360@main)) (191425913)
-   Fixed cloned documents to keep the base URL of the original document, so relative URLs resolve correctly. ([325914@main](https://commits.webkit.org/325914@main)) (191815349)
-   Fixed an issue where going back during a pending cross-site navigation left the back/forward list on the wrong item. ([326047@main](https://commits.webkit.org/326047@main)) (191848075)
-   Fixed an issue where a dedicated worker started from a blob URL that was revoked immediately got a new opaque origin, which prevented it from reading `Blob` objects or importing other blob URLs. ([325843@main](https://commits.webkit.org/325843@main)) (191852940)
-   Fixed `ReportingObserver` reports and their bodies to be plain objects, so they can be structured-cloned and posted, and removed their `toJSON()` methods. ([326027@main](https://commits.webkit.org/326027@main)) (191919096)
-   Fixed `AudioBufferSourceNode` so that it fires the `ended` event when it is started with a null buffer. ([325902@main](https://commits.webkit.org/325902@main)) (192021071)
-   Fixed `ReportingObserver` invoking its callback with no reports after `takeRecords()` was called. ([326014@main](https://commits.webkit.org/326014@main)) (192066128)
-   Fixed `SubtleCrypto.deriveBits()` to enforce the range of its `length` argument, as the specification requires. ([326024@main](https://commits.webkit.org/326024@main)) (192131498)
-   Fixed XPath so that `/` evaluated from an attribute node selects the document root instead of the attribute. ([326066@main](https://commits.webkit.org/326066@main)) (192142816)

### Web Extensions

#### New Features

-   Added a warning when a manifest V2 extension defines `action` without `browser_action`, or a manifest V3 extension defines `browser_action` without `action`. ([324852@main](https://commits.webkit.org/324852@main)) (148339024)
-   Added enum types such as `cookies.SameSiteStatus`, `declarativeNetRequest.ResourceType`, `extension.ViewType`, and `menus.ContextType` to the `browser.*` namespaces. ([324948@main](https://commits.webkit.org/324948@main)) (191146181)
-   Added a `windowId` property to `runtime.MessageSender`. ([325024@main](https://commits.webkit.org/325024@main)) (191158045)
-   Added support for `"message_serialization": "structured_clone"` in the extension manifest, so messages sent with `runtime.sendMessage()` can carry values such as `ArrayBuffer` and `Blob` between content scripts and the background page. ([325948@main](https://commits.webkit.org/325948@main)) (191800053)

#### Resolved Issues

-   Fixed `tabs.update()` allowing web extensions to navigate a tab to `javascript:` URLs, or to `file:` URLs when the extension does not have file access. ([325101@main](https://commits.webkit.org/325101@main)) (114831180)
-   Fixed `tabs.connect()` also connecting to the opener or opened window of the target tab. ([325232@main](https://commits.webkit.org/325232@main)) (140626378)
-   Fixed `declarativeNetRequest` `modifyHeaders` rules rejecting custom header names. ([325082@main](https://commits.webkit.org/325082@main)) (148430468)
-   Fixed `dom.openOrClosedShadowRoot` returning user-agent shadow roots; it now returns only open or closed shadow roots. ([324878@main](https://commits.webkit.org/324878@main)) (160845916)
-   Fixed `Content-Security-Policy-Report-Only` incorrectly blocking Safari extension scripts from loading. ([324793@main](https://commits.webkit.org/324793@main)) (168472819)
-   Fixed `icon_variants` so that an icon block containing unknown properties is ignored entirely instead of having only the unknown properties ignored. ([324981@main](https://commits.webkit.org/324981@main)) (169804881)
-   Fixed `runtime.lastError` not being exposed to content scripts. ([324858@main](https://commits.webkit.org/324858@main)) (176784505)
-   Fixed `action.setIcon()` with `windowId` only taking effect after switching tabs. ([324800@main](https://commits.webkit.org/324800@main)) (177792323)
-   Fixed the generated extension background page to declare UTF-8, so non-ASCII characters in JavaScript source files without a byte order mark are decoded correctly. ([325533@main](https://commits.webkit.org/325533@main)) (181818327)
-   Fixed extension action popups not scrolling to the newly focused element when moving focus with the keyboard. ([325064@main](https://commits.webkit.org/325064@main)) (183935725)
-   Fixed excessive memory use in web extensions by registering each event listener only once and delivering runtime and port messages without keeping a copy per listener. ([325757@main](https://commits.webkit.org/325757@main)) (190248545)
-   Fixed incorrect popup size and positioning for extensions when `scrollbar-gutter: stable both` is used. ([326031@main](https://commits.webkit.org/326031@main)) (190521334)
-   Fixed the `declarativeNetRequest` quota check for `updateDynamicRules` and `updateSessionRules` counting existing rules twice. ([325096@main](https://commits.webkit.org/325096@main)) (190609107)
-   Fixed `background.page` to take precedence over `background.scripts` when both are specified and `preferred_environment` does not decide. ([325001@main](https://commits.webkit.org/325001@main)) (191041367)
-   Fixed an issue where a manifest `icons` or `default_icon` value that was not an object was silently ignored instead of reporting an error. ([325022@main](https://commits.webkit.org/325022@main)) (191169296)
-   Fixed an issue where malformed `icon_variants` values in a manifest were not validated. ([325023@main](https://commits.webkit.org/325023@main)) (191169365)
-   Fixed an issue where `icon_variants` selection compared sizes in points instead of pixels, which could choose a smaller icon over a larger one on 2x displays. ([325021@main](https://commits.webkit.org/325021@main)) (191169568)
-   Fixed an issue where an extension action popup clipped its scrollbar when scroll bars were set to always show. ([325159@main](https://commits.webkit.org/325159@main)) (191227048)
-   Fixed `action.enable()`, `action.disable()`, and `action.isEnabled()` to each accept either a tab identifier or a details object with `tabId` or `windowId`. ([325102@main](https://commits.webkit.org/325102@main)) (191262757)
-   Fixed `alarms.create()` to reject alarm names longer than 1024 bytes and new alarms once an extension has 500 alarms. ([325100@main](https://commits.webkit.org/325100@main)) (191263640)
-   Fixed `action.getPopup()` to return a full extension URL instead of the path as it was given. ([325107@main](https://commits.webkit.org/325107@main)) (191274316)
-   Fixed `action.setIcon()` and `action.setPopup()` to reject with an error and leave the action unchanged when given a path to a file that does not exist in the extension. ([325104@main](https://commits.webkit.org/325104@main)) (191291358)
-   Fixed resource paths with a query, fragment, or percent-encoding, such as `icons/toolbar.png?v=2#x` or `my%20icon.png`, not being found for web extensions created from in-memory resources. ([325504@main](https://commits.webkit.org/325504@main)) (191294631)
-   Fixed `Port.disconnect()` firing `onDisconnect` on the port that called it; it now fires only on the other end of the connection. ([325256@main](https://commits.webkit.org/325256@main)) (191316639)
-   Fixed `action.setIcon()` to resolve and change nothing when called without a known property, and made options dictionaries optional when all of their properties are optional. ([325532@main](https://commits.webkit.org/325532@main)) (191351377)
-   Fixed `declarativeNetRequest` redirect rules of equal priority from the same extension that only remove query parameters with `queryTransform.removeParams` so they all apply instead of only the first. ([325510@main](https://commits.webkit.org/325510@main)) (191496188)
-   Fixed `icon_variants` to prefer an explicit icon size that is large enough before falling back to an `any` size icon. ([326078@main](https://commits.webkit.org/326078@main)) (192098547)

### Web Inspector

#### Resolved Issues

-   Fixed the SVG preview in the Sources tab being blank when the SVG references a `<symbol>` from `<defs>`. ([325289@main](https://commits.webkit.org/325289@main)) (151300634)
-   Fixed “Pause on next statement” stopping in internal scripts, default class constructors, and at the end of blackboxed scripts instead of in the page’s own code. ([325681@main](https://commits.webkit.org/325681@main)) (187630174)
-   Fixed the debugger forgetting a requested pause at the next statement when the page’s global object is cleared. ([325342@main](https://commits.webkit.org/325342@main)) (189444035)
-   Fixed the Layout panel no longer listing grid and flex containers after the page reloads or navigates. ([324756@main](https://commits.webkit.org/324756@main)) (189971660)
-   Fixed an issue where pausing at the next statement stopped at the end of a script that was blackboxed by URL instead of in the following non-blackboxed code. ([324999@main](https://commits.webkit.org/324999@main)) (191157379)
-   Fixed an issue where a pause at the next statement was dropped when a blackboxed script run from the event loop finished, so the debugger did not stop in the page code that followed. ([325189@main](https://commits.webkit.org/325189@main)) (191215871)
-   Fixed a redirected hidden `Network.loadResource` request leaving a Network row that never finished. ([325649@main](https://commits.webkit.org/325649@main)) (191410214)
-   Fixed the SVG preview being blank when the SVG was preloaded without the fragment it is later used with. ([325369@main](https://commits.webkit.org/325369@main)) (191434510)
-   Fixed URL breakpoints pausing on loads that are hidden from Web Inspector. ([325665@main](https://commits.webkit.org/325665@main)) (191456032)

### WebAssembly

#### Resolved Issues

-   Fixed incorrect results in WebAssembly code that moves `v128` values between stack slots in the baseline compiler. ([324957@main](https://commits.webkit.org/324957@main)) (191050549)
-   Fixed the relaxed SIMD dot product with accumulate instruction (`i32x4.relaxed_dot_i8x16_i7x16_add_s`) returning a wrong result on ARM64 in some cases. ([325501@main](https://commits.webkit.org/325501@main)) (191511930)
-   Fixed a JavaScript Promise Integration (JSPI) stack scan error that could be thrown on valid WebAssembly programs. ([325568@main](https://commits.webkit.org/325568@main)) (191670691)

### WebDriver

#### Resolved Issues

-   Fixed WebDriver navigation commands so they wait for the navigation they started instead of completing on an unrelated load or before the load event is emitted. ([325887@main](https://commits.webkit.org/325887@main)) (188588971)
-   Fixed WebDriver BiDi `session.subscribe` to validate the `userContexts` parameter, so an empty array is now rejected. ([325657@main](https://commits.webkit.org/325657@main)) (190409711)
-   Fixed WebDriver BiDi `browsingContext.traverseHistory` to navigate to the requested history entry and return the correct errors. ([325961@main](https://commits.webkit.org/325961@main)) (190530418)

### WebGL

#### Resolved Issues

-   Fixed a performance regression where calling `invalidateFramebuffer()` on a texture that had not been written to caused it to be zero-filled on the CPU every frame. ([325013@main](https://commits.webkit.org/325013@main)) (191073603)
-   Fixed WebGL `depthRange()` with a near value greater than the far value being ignored after the viewport or framebuffer changed. ([325562@main](https://commits.webkit.org/325562@main)) (191381476)

### WebGPU

#### New Features

-   Added support for dual-source blending in WebGPU. ([325793@main](https://commits.webkit.org/325793@main)) (191687145)

#### Resolved Issues

-   Fixed `drawIndexed()` drawing nothing for strip topologies with `uint16` indices when the index buffer contains the strip restart index `0xFFFF`. ([325230@main](https://commits.webkit.org/325230@main)) (191204015)
-   Fixed WGSL `for` loops rejecting init and update statements whose left-hand side starts with `(`, `*`, or `&`, such as `for ((i) = 0; (i) < 5; (i)++)`. ([325020@main](https://commits.webkit.org/325020@main)) (191204074)
-   Fixed an issue where `@builtin(frag_depth)` output was lost for a draw replayed from a render bundle after a draw with a different pipeline. ([325682@main](https://commits.webkit.org/325682@main)) (191701772)
-   Fixed `importExternalTexture()` producing incorrect chroma for hardware-decoded 10-bit AV1 `VideoFrame` objects. ([325858@main](https://commits.webkit.org/325858@main)) (191740964)
-   Fixed `copyBufferToTexture()` to handle an omitted `rowsPerImage` correctly. ([325999@main](https://commits.webkit.org/325999@main)) (191995146)

### WebRTC

#### Resolved Issues

-   Fixed `RTCRtpSender.setParameters()` to default a missing `scaleResolutionDownBy` to `1.0` for video encodings. ([324659@main](https://commits.webkit.org/324659@main)) (190945797)
-   Fixed an issue on macOS where starting remote audio tracks with `echoCancellation` enabled could silence all system audio when the output device was not running at 48 kHz. ([325576@main](https://commits.webkit.org/325576@main)) (191678937)