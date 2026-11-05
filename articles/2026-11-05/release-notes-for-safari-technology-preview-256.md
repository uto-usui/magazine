---
title: "Release Notes for Safari Technology Preview 256"
source: "https://webkit.org/blog/18602/release-notes-for-safari-technology-preview-256/"
publishedDate: "2026-11-05"
category: "web-standards"
feedName: "WebKit Blog"
---

[Safari Technology Preview](https://webkit.org/blog/6017/introducing-safari-technology-preview/) Release 256 is now [available for download](https://developer.apple.com/safari/resources/) for macOS Golden Gate and macOS Tahoe. If you already have Safari Technology Preview installed, you can update it in System Settings under General → Software Update.

This release includes WebKit changes between: [323398@main…324653@main](https://github.com/WebKit/WebKit/compare/8fd906a4024b97a7d373f172e6c8492696ea2c99...ed7c100c4c4d89db54934fa07b3019a2270c7ac3).

### Accessibility

#### Resolved Issues

-   Fixed list marker text generated with the `content` property not being exposed in the accessibility tree. ([323578@main](https://commits.webkit.org/323578@main)) (189838099)
-   Fixed VoiceOver being unable to reach the content of an iframe nested inside an iframe with `role="none"` or `role="presentation"`. ([323749@main](https://commits.webkit.org/323749@main)) (189901948)

### Animations

#### Resolved Issues

-   Fixed scroll-driven animations drawing a `translate` keyframe of `none` as the element’s own `translate` value. ([323583@main](https://commits.webkit.org/323583@main)) (189882533)
-   Fixed: Improved performance of scroll-driven animations by avoiding style invalidation on animation updates when timing is unchanged. ([324449@main](https://commits.webkit.org/324449@main)) (190709310)

### CSS

#### New Features

-   Added support for `text-combine-upright` on `::marker`. ([323582@main](https://commits.webkit.org/323582@main)) (189912173)
-   Added support for `continue: collapse` with `line-clamp`, which is now set by the `line-clamp` shorthand. ([323734@main](https://commits.webkit.org/323734@main)) (190023170)
-   Added support for `font-palette-mix()` on Cocoa platforms, allowing font color palettes to be blended. ([324044@main](https://commits.webkit.org/324044@main)) (190133191)

#### Resolved Issues

-   Fixed `::highlight()` styles not being found past anonymous boxes. ([323588@main](https://commits.webkit.org/323588@main)) (148245032)
-   Fixed text zoom being applied twice to font sizes specified with font-relative units. ([324195@main](https://commits.webkit.org/324195@main)) (188215447)
-   Fixed `aspect-ratio` interpolation being inverted in vertical writing modes. ([323584@main](https://commits.webkit.org/323584@main)) (188500448)
-   Fixed `document.fonts.ready` never resolving when an unused `@font-face` has a failing `local()` source followed by a `url()` source. ([323883@main](https://commits.webkit.org/323883@main)) (189243828)
-   Fixed layout not updating inside a nested scroll container after its classic scrollbar disappears when using `line-clamp` with an absolutely positioned descendant. ([324368@main](https://commits.webkit.org/324368@main)) (189451731)
-   Fixed `:dir()` matching for a `<bdi>` element without a `dir` attribute so it updates when its ancestor’s direction changes. ([323439@main](https://commits.webkit.org/323439@main)) (189472957)
-   Fixed `light-dark()` inside `image-set()` incorrectly accepting a bare string as an image URL. ([323705@main](https://commits.webkit.org/323705@main)) (189627071)
-   Fixed `CSSStyleSheet.replaceSync()` on a detached constructed stylesheet appending rules instead of replacing them, which could also corrupt other stylesheets sharing the same contents. ([323736@main](https://commits.webkit.org/323736@main)) (189634428)
-   Fixed `CSSMatrixComponent.toMatrix()` returning the component’s internal `DOMMatrix` for 3D matrices, so mutating the result no longer changes the component. ([323948@main](https://commits.webkit.org/323948@main)) (189653766)
-   Fixed a positioned `inline-block` after the `line-clamp` clamp point remaining visible. ([323402@main](https://commits.webkit.org/323402@main)) (189672687)
-   Fixed `-webkit-min-device-pixel-ratio` and `-webkit-max-device-pixel-ratio` media features serializing as `min--webkit-device-pixel-ratio` and `max--webkit-device-pixel-ratio`. ([323731@main](https://commits.webkit.org/323731@main)) (189687289)
-   Fixed a flex item with `aspect-ratio` and a `calc()` height resolving to a zero flex base size. ([323464@main](https://commits.webkit.org/323464@main)) (189753886)
-   Fixed `CSSStyleDeclaration.setProperty()` to override an existing `!important` custom property when called without a priority. ([324083@main](https://commits.webkit.org/324083@main)) (189765758)
-   Fixed a table flex item with borders being wider than its content and borders. ([323471@main](https://commits.webkit.org/323471@main)) (189766215)
-   Fixed `line-clamp: auto` to account for collapsed block-end margins when finding the clamp point. ([323468@main](https://commits.webkit.org/323468@main)) (189767053)
-   Fixed a table flex item with borders or padding and a non-auto `min-width` being too wide. ([323466@main](https://commits.webkit.org/323466@main)) (189768684)
-   Fixed the `grid-template` shorthand so empty `[]` line names before a row’s leading line names no longer overwrite the previous row’s track size. ([323665@main](https://commits.webkit.org/323665@main)) (189769011)
-   Fixed `line-clamp: auto` to find the clamp point before balancing content. ([323481@main](https://commits.webkit.org/323481@main)) (189774214)
-   Fixed `calc()` negation of a typed-arithmetic product flipping the sign of every factor. ([323577@main](https://commits.webkit.org/323577@main)) (189779826)
-   Fixed `object-fit: none` and `object-fit: scale-down` to size an image without natural dimensions against its content box. ([323503@main](https://commits.webkit.org/323503@main)) (189844957)
-   Fixed the content size suggestion of grid items with a preferred aspect ratio to be clamped correctly in grid layout. ([323655@main](https://commits.webkit.org/323655@main)) (189848571)
-   Fixed: Changed the `auto` value of the `continue` property to `normal` to match the specification. ([323557@main](https://commits.webkit.org/323557@main)) (189893145)
-   Fixed the grid layout engine to compute collapsed tracks for `repeat(auto-fit)`. ([323658@main](https://commits.webkit.org/323658@main)) (189937668)
-   Fixed a regression where `word-break: keep-all` allowed many incorrect line breaks. ([324360@main](https://commits.webkit.org/324360@main)) (189973862)
-   Fixed the placement of outside list markers in vertical writing modes. ([323721@main](https://commits.webkit.org/323721@main)) (190017212)
-   Fixed grid layout to collapse empty `repeat(auto-fit)` tracks and their gutters. ([323843@main](https://commits.webkit.org/323843@main)) (190062840)
-   Fixed grid layout to use the transferred size suggestion for the automatic minimum size of grid items. ([323855@main](https://commits.webkit.org/323855@main)) (190065310)
-   Fixed the intrinsic minimum block size of a column flex item being incorrectly clamped by a smaller `max-block-size`. ([323872@main](https://commits.webkit.org/323872@main)) (190077511)
-   Fixed selectors with mixed-case attribute names failing to match HTML elements in XHTML documents when used with ancestor combinators. ([323947@main](https://commits.webkit.org/323947@main)) (190089102)
-   Fixed `CSSUnitValue` for container query length units reporting a number type instead of a length type. ([323949@main](https://commits.webkit.org/323949@main)) (190095825)
-   Fixed the `linear()` easing function rejecting a percentage written before the number in a control point. ([323951@main](https://commits.webkit.org/323951@main)) (190097099)
-   Fixed `calc()` type inversion overflowing its exponent, which could produce incorrect results. ([323873@main](https://commits.webkit.org/323873@main)) (190099592)
-   Fixed `CustomStateSet` `add()` and `delete()` invalidating style when the set does not change. ([323982@main](https://commits.webkit.org/323982@main)) (190183292)
-   Fixed the `CSSCounterStyleRule.name` setter not updating the `name` getter or `cssText`. ([324049@main](https://commits.webkit.org/324049@main)) (190185460)
-   Fixed a grid item with a non-auto `min-block-size` overflowing the grid when the grid shrinks and the item’s content wraps. ([324127@main](https://commits.webkit.org/324127@main)) (190192125)
-   Fixed quote marks generated by `open-quote` and `close-quote` not taking the `::first-line` style. ([324380@main](https://commits.webkit.org/324380@main)) (190252758)
-   Fixed a stretched item in a `column-reverse` wrapping flex container ignoring its main-axis `auto` margin. ([324398@main](https://commits.webkit.org/324398@main)) (190272880)
-   Fixed `calc-size(auto, size)` making an `aspect-ratio` box wider than its max-content size when a child has a percentage height. ([324649@main](https://commits.webkit.org/324649@main)) (190727077)
-   Fixed an absolutely positioned box inside content after the `line-clamp` clamp point not being laid out. ([324457@main](https://commits.webkit.org/324457@main)) (190732934)
-   Fixed an orthogonal block-level box inside an inline box incorrectly adding its top and bottom margins to its container’s width. ([324652@main](https://commits.webkit.org/324652@main)) (190767962)

### Canvas

#### New Features

-   Added the `lang` attribute to `CanvasTextDrawingStyles`. ([324596@main](https://commits.webkit.org/324596@main)) (143391479)
-   Added support for `fontKerning`, `fontStretch`, `fontVariantCaps`, and `textRendering` in canvas text drawing styles. ([324110@main](https://commits.webkit.org/324110@main)) (190388702)
-   Added support for the `inherit` value of the `direction` attribute in `CanvasTextDrawingStyles`. ([324603@main](https://commits.webkit.org/324603@main)) (190908024)

#### Resolved Issues

-   Fixed black pixel artifacts when drawing a Canvas 2D image through WebGL after applying a gradient. ([324218@main](https://commits.webkit.org/324218@main)) (189661903)
-   Fixed drawing a `VideoFrame` in BGRX format to ignore the alpha component. ([323809@main](https://commits.webkit.org/323809@main)) (189794952)

### Forms

#### Resolved Issues

-   Fixed `appearance: base-select` option hover styling being clipped when rotated transforms are applied. ([323903@main](https://commits.webkit.org/323903@main)) (171933742)
-   Fixed the date picker not using the correct appearance when automatic dark mode is applied. ([324046@main](https://commits.webkit.org/324046@main)) (188747558)
-   Fixed `<selectedcontent>` elements so they update at the correct times in an enhanced `<select>`. ([324149@main](https://commits.webkit.org/324149@main)) (189480559)
-   Fixed deselecting the selected option of a dropdown `<select>` so it always selects the first option. ([323929@main](https://commits.webkit.org/323929@main)) (190021473)
-   Fixed: Updated the default `<select>` styles to match upstream changes for better interoperability with other browsers. ([324587@main](https://commits.webkit.org/324587@main)) (190724295)

### HTML

#### Resolved Issues

-   Fixed the HTML parser to treat `<search>` as a special element, so it closes an open `<p>` element correctly. ([323915@main](https://commits.webkit.org/323915@main)) (190117661)

#### Deprecations

-   Removed support for the `rightmargin` and `bottommargin` presentational attributes on `<body>`. ([323444@main](https://commits.webkit.org/323444@main)) (189727708)

### Images

#### New Features

-   Added support for `object-fit`, `object-position`, and `object-view-box` on SVG documents in `<embed>` and `<object>`. ([323822@main](https://commits.webkit.org/323822@main)) (190118512)

#### Resolved Issues

-   Fixed the drag image to match the rendered image when dragging an image. ([323399@main](https://commits.webkit.org/323399@main)) (189759601)
-   Fixed the size of images without natural dimensions, such as SVG images, when they are written to the pasteboard. ([323529@main](https://commits.webkit.org/323529@main)) (189873103)
-   Fixed the placement of an SVG image that specifies only a width when used with `object-fit: none` or `object-fit: scale-down`. ([323567@main](https://commits.webkit.org/323567@main)) (189909016)
-   Fixed inconsistent sizing of SVG images that have a `width` or `height` of 0. ([323884@main](https://commits.webkit.org/323884@main)) (190171855)
-   Fixed an SVG image with a width or height less than 1 failing to load. ([324048@main](https://commits.webkit.org/324048@main)) (190315280)
-   Fixed an issue where 8-bit grayscale and CMYK images were converted to 16-bit images when drawn, wasting memory. ([324389@main](https://commits.webkit.org/324389@main)) (190488500)
-   Fixed image URLs containing a fragment directive so that only the fragment before the directive is used, such as `box` in `foo.svg#box:~:param(--bg, green)`. ([324650@main](https://commits.webkit.org/324650@main)) (190961757)

### JavaScript

#### Resolved Issues

-   Fixed `Math.sumPrecise` returning an incorrect result for `-Number.MAX_VALUE`. ([324530@main](https://commits.webkit.org/324530@main)) (178356895)
-   Fixed a module worker evaluating its entry script a second time when the worker imports its own URL. ([323507@main](https://commits.webkit.org/323507@main)) (188303176)
-   Fixed `GetPrototypeFromConstructor` to read `prototype` before calling `GetFunctionRealm`, matching the specification. ([323408@main](https://commits.webkit.org/323408@main)) (189773842)
-   Fixed an incorrect optimization in the DFG compiler that could produce wrong results for code using the logical NOT operator (`!`). ([323639@main](https://commits.webkit.org/323639@main)) (189876762)
-   Fixed an incorrect result in optimized code for the integer conversion used by operations such as `Math.trunc()` and array index handling. ([323624@main](https://commits.webkit.org/323624@main)) (189876905)
-   Fixed an incorrect optimization in the DFG compiler for right shift operations, which could produce wrong results when the shift count exceeds the 32-bit mask. ([323595@main](https://commits.webkit.org/323595@main)) (189886500)
-   Fixed an issue where calling `RegExp` as a function could be incorrectly optimized into creating a new regular expression object. ([323678@main](https://commits.webkit.org/323678@main)) (189954203)
-   Fixed `await a ** b` and the use of `await` as an identifier in a module to correctly throw a `SyntaxError`. ([323662@main](https://commits.webkit.org/323662@main)) (189958423)
-   Fixed labelled function declarations so they are declared in the enclosing scope. ([323675@main](https://commits.webkit.org/323675@main)) (189972133)
-   Fixed the `"use strict"` directive to reject strict mode reserved words as parameter and function names. ([323677@main](https://commits.webkit.org/323677@main)) (189973461)
-   Fixed `TypedArray` and `ArrayBuffer` constructors to throw a `RangeError` for a negative length. ([323740@main](https://commits.webkit.org/323740@main)) (189976051)
-   Fixed parsing of `let`, `async of`, and destructuring declarations in `for` loop heads. ([324319@main](https://commits.webkit.org/324319@main)) (190415260)
-   Fixed `includes`, `indexOf`, and `lastIndexOf` on `BigInt64Array` and `BigUint64Array` matching BigInt values outside the element type’s range. ([324313@main](https://commits.webkit.org/324313@main)) (190436212)
-   Fixed `Array.prototype.push` called with no arguments to throw an error when the array’s `length` is not writable. ([324204@main](https://commits.webkit.org/324204@main)) (190437846)
-   Fixed private class brand installation to happen before class elements are evaluated. ([324222@main](https://commits.webkit.org/324222@main)) (190509577)
-   Fixed module code to report an error when an import or export declaration redeclares a `var`. ([324223@main](https://commits.webkit.org/324223@main)) (190509652)
-   Fixed `Map`, `Set`, `WeakMap`, and `WeakSet` constructors to accept `undefined` or `null` as the iterable when optimized by the DFG compiler. ([324418@main](https://commits.webkit.org/324418@main)) (190657930)
-   Fixed an issue where private name checks (`#x in obj`) were compiled incorrectly by the DFG compiler. ([324397@main](https://commits.webkit.org/324397@main)) (190663814)
-   Fixed an issue where an overwritten `length` property on sloppy-mode `arguments` objects was not converted using `ToLength`. ([324407@main](https://commits.webkit.org/324407@main)) (190676161)
-   Fixed `Array.prototype.sort` calling bound comparator functions incorrectly when `sort` is inlined. ([324512@main](https://commits.webkit.org/324512@main)) (190788820)

### Media

#### Resolved Issues

-   Fixed the caption font size menu in media controls not changing the caption font size. ([324327@main](https://commits.webkit.org/324327@main)) (137012134)
-   Fixed a high CPU usage issue where media rendering repeatedly busy-looped the main thread while a seek or flush was pending. ([323669@main](https://commits.webkit.org/323669@main)) (188769771)
-   Fixed encrypted media playback enqueuing samples that were blocked on a key and submitted before a flush or seek. ([323532@main](https://commits.webkit.org/323532@main)) (189588721)
-   Fixed `text-decoration` styles not being applied to the inner background element of WebVTT cues. ([323874@main](https://commits.webkit.org/323874@main)) (190139268)
-   Fixed the spatial video renderer not coming back after media controls are re-enabled. ([323986@main](https://commits.webkit.org/323986@main)) (190170810)
-   Fixed Media Source Extensions playback permanently stalling after a video track is flushed. ([324032@main](https://commits.webkit.org/324032@main)) (190198848)
-   Fixed the video viewer’s native controls incorrectly applying YouTube-specific behavior. ([324150@main](https://commits.webkit.org/324150@main)) (190242515)
-   Fixed previously enabled subtitle tracks not being re-enabled when switching the subtitle menu to off inline and then back on in fullscreen. ([324522@main](https://commits.webkit.org/324522@main)) (190417162)
-   Fixed audio sample timing to respect trimmed timing information. ([324387@main](https://commits.webkit.org/324387@main)) (190519875)
-   Fixed `MediaRecorder` losing its final data when stopped while a `timeslice` data request was in flight. ([324405@main](https://commits.webkit.org/324405@main)) (190561436)
-   Fixed WebVTT cue parsing to require exact keyword matches for alignment settings, rejecting values that only begin with a valid keyword. ([324444@main](https://commits.webkit.org/324444@main)) (190662853)
-   Fixed `unicode-bidi` styles set with `::cue` not applying to the WebVTT cue background. ([324479@main](https://commits.webkit.org/324479@main)) (190682540)
-   Fixed WebVTT cue line positioning so the snap-to-lines step is computed from the cue’s first line box, correcting vertical cue rendering. ([324447@main](https://commits.webkit.org/324447@main)) (190685928)
-   Fixed an issue where media time values with equal negative numerators and different timescales were compared in the wrong order. ([324514@main](https://commits.webkit.org/324514@main)) (190698694)
-   Fixed WebCodecs `AudioDecoder` to decode Opus content with more than two channels. ([324615@main](https://commits.webkit.org/324615@main)) (190709046)
-   Fixed FLAC audio decoding always failing in WebCodecs. ([324640@main](https://commits.webkit.org/324640@main)) (190923178)

### Networking

#### Resolved Issues

-   Fixed `WKWebsiteDataStore` reusing its connection pool after `proxyConfigurations` changes, which caused requests to bypass the new proxy. ([324143@main](https://commits.webkit.org/324143@main)) (179411114)
-   Fixed the image loader’s lookup of available images to use the partitioned memory cache. ([323594@main](https://commits.webkit.org/323594@main)) (189778787)
-   Fixed non-ASCII `Last-Event-ID` request header values being UTF-8 encoded twice for `EventSource` requests. ([323875@main](https://commits.webkit.org/323875@main)) (189977696)
-   Fixed `EventSource` to no longer treat a UTF-16 byte order mark as valid. ([324395@main](https://commits.webkit.org/324395@main)) (190634672)
-   Fixed `XMLHttpRequest` JSON responses to always be decoded as UTF-8. ([324483@main](https://commits.webkit.org/324483@main)) (190717643)

### Performance

#### New Features

-   Improved performance by caching `document.querySelector()` results. ([323620@main](https://commits.webkit.org/323620@main)) (189789022)
-   Improved navigation performance by starting navigations in a cached Cross-Origin-Opener-Policy process before the response arrives. ([323631@main](https://commits.webkit.org/323631@main)) (189790518)

#### Resolved Issues

-   Fixed a regression where filtered layers with composited ancestor clips allocated oversized filter buffers. ([324517@main](https://commits.webkit.org/324517@main)) (180473291)
-   Fixed slow repaints and long hangs when registering many small highlights with the CSS Custom Highlight API. ([324157@main](https://commits.webkit.org/324157@main)) (186478678)

### Rendering

#### Resolved Issues

-   Fixed selection gaps not being repainted when clearing a selection in `vertical-rl` writing mode. ([323935@main](https://commits.webkit.org/323935@main)) (14699394)
-   Fixed font fallback to select fonts and glyphs by canonical equivalence. ([323560@main](https://commits.webkit.org/323560@main)) (165656837)
-   Fixed glyph bounds for complex text to include shaped glyph origins, preventing clipped or mispositioned text. ([323777@main](https://commits.webkit.org/323777@main)) (184235153)
-   Fixed frames that use custom scrollbars continually resizing. ([323645@main](https://commits.webkit.org/323645@main)) (186222322)
-   Fixed composited layer bounds to account for the filter outsets of a layer and its ancestors, preventing filtered content from being clipped. ([323864@main](https://commits.webkit.org/323864@main)) (187924396)
-   Fixed missed overlap for layers inside a stacking-context composited scroller nested in another composited scroller. ([323793@main](https://commits.webkit.org/323793@main)) (189067776)
-   Fixed incorrect inline layout after removing content when partial layout damage started at an inline item of the removed box. ([323458@main](https://commits.webkit.org/323458@main)) (189801792)
-   Fixed composited child elements being misplaced when their compositing ancestor gains or loses a child clipping layer. ([323487@main](https://commits.webkit.org/323487@main)) (189836116)
-   Fixed an issue on macOS where scroll bars in nested iframes kept the old style when the system scroller style changed. ([324289@main](https://commits.webkit.org/324289@main)) (189965521)
-   Fixed uninitialized blurred areas being drawn for blur styles on Cocoa platforms. ([324350@main](https://commits.webkit.org/324350@main)) (190254152)
-   Fixed the text width cache returning incorrect widths when kerned and unkerned versions of a font are used repeatedly. ([324093@main](https://commits.webkit.org/324093@main)) (190360672)
-   Fixed videos being clipped to the wrong `corner-shape` when an ancestor also has a rectangular clip. ([324288@main](https://commits.webkit.org/324288@main)) (190402270)
-   Fixed an issue where an animated SVG `<img>` scaled below its natural size left repaint trails. ([324343@main](https://commits.webkit.org/324343@main)) (190485225)
-   Fixed blurred areas being drawn with uninitialized content for some blur styles. ([324350@main](https://commits.webkit.org/324350@main)) (190563103)
-   Fixed the last-line baseline of a block container whose last in-flow child is a scroll container so that the baseline sits at the child’s bottom margin edge, preventing misaligned text. ([324653@main](https://commits.webkit.org/324653@main)) (190772090)

### SVG

#### New Features

-   Added support for `referrerPolicy` on the SVG `<a>` element. ([323659@main](https://commits.webkit.org/323659@main)) (135952757)
-   Added support for the SVG 2 text layout algorithm. ([324088@main](https://commits.webkit.org/324088@main)) (190288583)

#### Resolved Issues

-   Fixed `<textPath>` not being laid out again when the `d` attribute changes on a referenced `<path>` that has `display: none`. ([323938@main](https://commits.webkit.org/323938@main)) (189579922)
-   Fixed animated percentage values in SVG text `y` and `dy` resolving against the viewport width instead of its height. ([323847@main](https://commits.webkit.org/323847@main)) (189739351)
-   Fixed the SVG timeline resetting to 0 when it is paused and seeked before it begins. ([324084@main](https://commits.webkit.org/324084@main)) (189739894)
-   Fixed `<use>` copies of an SVG `<a>` keeping the old target after the `target` attribute changes. ([324087@main](https://commits.webkit.org/324087@main)) (189740877)
-   Fixed SMIL full clock values with more than 1,193,046 hours overflowing during parsing. ([323932@main](https://commits.webkit.org/323932@main)) (189760312)
-   Fixed SVG `<image>` elements so a referenced SVG image treats its own root `preserveAspectRatio` as `none`. ([323568@main](https://commits.webkit.org/323568@main)) (189909967)
-   Fixed SMIL `repeat(n)` conditions never firing after seeking past repeat iterations. ([323927@main](https://commits.webkit.org/323927@main)) (189986502)
-   Fixed the `SVGLength.value` setter to convert font-relative units using up-to-date style. ([324072@main](https://commits.webkit.org/324072@main)) (189988135)
-   Fixed an issue where changing the children of an SVG `<mask>` used by CSS `mask-image` did not repaint the masked element. ([324026@main](https://commits.webkit.org/324026@main)) (190101845)
-   Fixed SVG `<font-face>` rules being registered in a non-deterministic order. ([324089@main](https://commits.webkit.org/324089@main)) (190353779)
-   Fixed repaint rect computation for SVG text with `vector-effect: non-scaling-stroke` so the stroke is repainted correctly per text run. ([324095@main](https://commits.webkit.org/324095@main)) (190363935)
-   Fixed `composedPath()` in an event listener on a `<use>` element exposing its user agent shadow root. ([324329@main](https://commits.webkit.org/324329@main)) (190528878)
-   Fixed `<feImage>` to place and draw its referenced image the same way as an SVG `<image>` element. ([324592@main](https://commits.webkit.org/324592@main)) (190881899)

### Security

#### New Features

-   Added console logging when Cross-Origin-Opener-Policy or Cross-Origin-Embedder-Policy isolation is expected but not achieved. ([324426@main](https://commits.webkit.org/324426@main)) (190563075)

#### Resolved Issues

-   Fixed clicking in a cross-origin iframe incorrectly activating same-origin descendants of its ancestors. ([323897@main](https://commits.webkit.org/323897@main)) (181549362)
-   Fixed a regression where creating a `<select>` element triggered a Content Security Policy `style-src-attr` violation. ([324283@main](https://commits.webkit.org/324283@main)) (189869066)
-   Fixed frames in an `about:blank` popup not being treated as secure contexts. ([323985@main](https://commits.webkit.org/323985@main)) (190126073)
-   Fixed `data:` documents so that only top-level `data:` documents are treated as non-secure contexts. ([324086@main](https://commits.webkit.org/324086@main)) (190309192)
-   Fixed Geolocation to be blocked in non-secure contexts. ([324227@main](https://commits.webkit.org/324227@main)) (190455029)

### Web API

#### New Features

-   Added support for the `estimated` line item type in Apple Pay JS. ([324470@main](https://commits.webkit.org/324470@main)) (187363098)
-   Added support for `VideoFrame.copyTo()` converting to RGB on the fly. ([323866@main](https://commits.webkit.org/323866@main)) (189797745)
-   Added support for the `colorSpace` option in `VideoFrame.copyTo()`. ([323952@main](https://commits.webkit.org/323952@main)) (189902908)

#### Resolved Issues

-   Fixed `document.fullscreenEnabled` and `document.webkitFullscreenEnabled` to return consistent values. ([323549@main](https://commits.webkit.org/323549@main)) (102937855)
-   Fixed `element.checkVisibility()` to work for unslotted elements. ([324155@main](https://commits.webkit.org/324155@main)) (118648432)
-   Fixed the AAC `AudioEncoder` producing an incorrect decoder config description. ([324436@main](https://commits.webkit.org/324436@main)) (164878480)
-   Fixed `getComposedRanges()` over-rescoping the range when a passed shadow root is a descendant of the boundary’s shadow tree. ([324385@main](https://commits.webkit.org/324385@main)) (180810983)
-   Fixed the Navigation API so `navigation.back()` and `navigation.traverseTo()` on the main frame land on the correct session history entry after a subframe has navigated. ([324589@main](https://commits.webkit.org/324589@main)) (187959384)
-   Fixed `element.checkVisibility()` returning `false` for `<option>` and `<optgroup>` elements in a list box. ([323990@main](https://commits.webkit.org/323990@main)) (189211521)
-   Fixed `getBoundingClientRect()` returning incorrect boxes for `<option>` and `<optgroup>` elements in a list box. ([324424@main](https://commits.webkit.org/324424@main)) (189227828)
-   Fixed `VideoFrame`, `AudioData`, `EncodedVideoChunk`, `EncodedAudioChunk`, `MediaStreamTrack`, and `MediaStreamTrackHandle` so they can no longer be cloned or transferred into a different agent cluster. ([323558@main](https://commits.webkit.org/323558@main)) (189747796)
-   Fixed `VideoFrame.copyTo()` to succeed for BGRX and RGBX frames. ([323569@main](https://commits.webkit.org/323569@main)) (189797144)
-   Fixed Media Session artwork images that have no intrinsic size, such as SVG without `width`, `height`, or `viewBox`, so they are sized using the default sizing algorithm with a 512×512 ideal artwork size. ([323461@main](https://commits.webkit.org/323461@main)) (189822449)
-   Fixed `VideoFrame.copyTo()` to allow converting to an RGB format when `VideoFrame.format` is `null`. ([323953@main](https://commits.webkit.org/323953@main)) (189932876)
-   Fixed an issue where a page navigated to `about:blank` lost its history entry when the next navigation occurred. ([324566@main](https://commits.webkit.org/324566@main)) (190237322)
-   Fixed an issue where a previous tap could cause a later tap to be treated as a hover. ([324259@main](https://commits.webkit.org/324259@main)) (190357260)
-   Fixed `Blob`‘s `text()` to no longer sniff UTF-16 byte order marks when decoding. ([324134@main](https://commits.webkit.org/324134@main)) (190382159)
-   Fixed a navigation to the current URL reporting the wrong `navigationType` when `document.domain` is set. ([324269@main](https://commits.webkit.org/324269@main)) (190420617)
-   Fixed `Blob`‘s `text()` to decode its data as it arrives. ([324356@main](https://commits.webkit.org/324356@main)) (190449988)
-   Fixed `location.replace()` on a frame in another process so it no longer adds a session history entry. ([324264@main](https://commits.webkit.org/324264@main)) (190512610)
-   Fixed an issue where `setInterval()` could be scheduled using a stale cached next fire time. ([324432@main](https://commits.webkit.org/324432@main)) (190658646)
-   Fixed an issue where navigating an iframe away from its initial `about:blank` document by clicking a link added a history entry. ([324562@main](https://commits.webkit.org/324562@main)) (190687356)
-   Fixed `requestIdleCallback()` idle period scheduling by using the actual frame period at 60Hz, so idle periods are no longer scheduled right before the frame deadline. ([324545@main](https://commits.webkit.org/324545@main)) (190768899)

#### Deprecations

-   Deprecated XML external entities, and added a console warning when they are used. ([324200@main](https://commits.webkit.org/324200@main)) (184870654)

### Web Extensions

#### Resolved Issues

-   Fixed `tabs.onUpdated` to not report unchanged values and to report rapid property toggles. ([324357@main](https://commits.webkit.org/324357@main)) (84204907)
-   Fixed Safari showing no error when the `declarativeNetRequest` `rule_resources` JSON is not a list. ([323963@main](https://commits.webkit.org/323963@main)) (146113788)
-   Fixed calling `action.setPopup()` with an invalid popup path leaving the popup unrecoverably broken. ([324142@main](https://commits.webkit.org/324142@main)) (166048992)
-   Fixed non-repeating `browser.alarms` alarms not being removed from the alarm map after firing. ([323750@main](https://commits.webkit.org/323750@main)) (173399426)
-   Fixed `action.setIcon()` throwing an error when `tabId` is `null` instead of setting the global icon. ([324277@main](https://commits.webkit.org/324277@main)) (176975795)
-   Fixed `runtime.openOptionsPage()` so it focuses the existing options page when it is already open. ([324541@main](https://commits.webkit.org/324541@main)) (177344808)
-   Fixed `browser.alarms.clearAll()` to return a `Promise<undefined>`. ([323534@main](https://commits.webkit.org/323534@main)) (187115327)
-   Fixed `alarms.onAlarm` to report the next `scheduledTime` for repeating alarms when the background page was unloaded. ([323752@main](https://commits.webkit.org/323752@main)) (189951123)
-   Fixed an issue where an extension’s own content rule lists were applied to pages other than its extension pages. ([323863@main](https://commits.webkit.org/323863@main)) (190036270)
-   Fixed content blocker rules that combine `request-method` with a top URL or frame URL condition not working. ([324050@main](https://commits.webkit.org/324050@main)) (190316684)

### Web Inspector

#### New Features

-   Added display of `::slotted()` styles in the Styles sidebar of the Elements tab. ([323654@main](https://commits.webkit.org/323654@main)) (29035069)
-   Added support for exposing Shadow DOM parts in the Elements tab. ([323685@main](https://commits.webkit.org/323685@main)) (100250231)
-   Added reporting of rendered font character ranges. ([324359@main](https://commits.webkit.org/324359@main)) (143740107)
-   Added visual distinction for private methods in the Console. ([324399@main](https://commits.webkit.org/324399@main)) (190664079)

#### Resolved Issues

-   Fixed `::placeholder` styles for `input` elements not showing up in the Styles sidebar. ([323670@main](https://commits.webkit.org/323670@main)) (56514581)
-   Fixed a regression where `console.group` and `console.groupCollapsed` did not always encapsulate grouped messages. ([323613@main](https://commits.webkit.org/323613@main)) (142028751)
-   Fixed `toString` being called twice when logging an object with the console. ([323668@main](https://commits.webkit.org/323668@main)) (169883641)
-   Fixed a discrepancy where Web Inspector and WebDriver reported different computed roles for the same element. ([323965@main](https://commits.webkit.org/323965@main)) (179841782)
-   Fixed: Improved Web Inspector performance by no longer iterating all rendering frame records to calculate the overview graph height. ([323614@main](https://commits.webkit.org/323614@main)) (181921116)
-   Fixed the Elements tab to collect CSS variables for both styles and keyframes. ([323598@main](https://commits.webkit.org/323598@main)) (189934225)
-   Fixed the Elements tab to correctly parse animation names when editing keyframes. ([323600@main](https://commits.webkit.org/323600@main)) (189934494)
-   Fixed `console` screenshots appearing in read-only Timelines recordings. ([323599@main](https://commits.webkit.org/323599@main)) (189934498)
-   Fixed markers appearing in read-only Timelines recordings. ([323601@main](https://commits.webkit.org/323601@main)) (189934611)
-   Fixed the Timelines tab to stop updating the time when capture is inactive. ([323604@main](https://commits.webkit.org/323604@main)) (189936051)
-   Fixed Web Inspector to handle URLs with an empty host. ([323603@main](https://commits.webkit.org/323603@main)) (189936372)
-   Fixed Web Inspector to parse URLs with ports and `blob:` URLs in stack traces. ([323606@main](https://commits.webkit.org/323606@main)) (189936384)
-   Fixed the Timelines tab to show capture progress only for the active recording. ([323607@main](https://commits.webkit.org/323607@main)) (189936469)
-   Fixed the Elements tab to correctly parse animation keys when editing keyframes. ([323608@main](https://commits.webkit.org/323608@main)) (189936580)
-   Fixed the Console’s `await` convenience being included in code completion requests. ([323605@main](https://commits.webkit.org/323605@main)) (189936602)
-   Fixed the Timelines tab to preserve imported heap snapshots when exporting recordings. ([323609@main](https://commits.webkit.org/323609@main)) (189936631)
-   Fixed stack trace popovers to reposition when the Web Inspector window is resized. ([323611@main](https://commits.webkit.org/323611@main)) (189936790)
-   Fixed Web Inspector to distinguish the source code of multiple `Worker` instances. ([323612@main](https://commits.webkit.org/323612@main)) (189936821)
-   Fixed awaited evaluation in the Console to preserve the selected call frame scope. ([323610@main](https://commits.webkit.org/323610@main)) (189937067)
-   Fixed the Elements tab to refresh styles after a CSS grouping rule edit fails. ([323616@main](https://commits.webkit.org/323616@main)) (189937131)
-   Fixed the Elements tab to also track inherited CSS variable dependencies. ([323623@main](https://commits.webkit.org/323623@main)) (189939830)
-   Fixed Web Inspector to report errors that occur while loading source maps. ([323653@main](https://commits.webkit.org/323653@main)) (189956520)
-   Fixed the Elements tab overlay for SVG `<text>` nodes appearing in the wrong position. ([324055@main](https://commits.webkit.org/324055@main)) (190158402)
-   Fixed Web Inspector so that edits to a style sheet mutate the live style sheet contents. ([323979@main](https://commits.webkit.org/323979@main)) (190235686)
-   Fixed links to inline CSS in Web Inspector incorrectly adding the starting column of the `<style>` element. ([323998@main](https://commits.webkit.org/323998@main)) (190248080)
-   Fixed Web Inspector so that the client nodes of a `-webkit-canvas` are always an array. ([323999@main](https://commits.webkit.org/323999@main)) (190248443)
-   Fixed Web Inspector so that a script is associated with its resource even when the MIME type is incorrect. ([324003@main](https://commits.webkit.org/324003@main)) (190249110)
-   Fixed Web Inspector canvas recording so that explicit `null` arguments are recorded. ([324002@main](https://commits.webkit.org/324002@main)) (190249115)
-   Fixed a `Worker` created after disabling All Requests breakpoints still pausing in Web Inspector. ([324004@main](https://commits.webkit.org/324004@main)) (190249260)
-   Fixed the debugger to use the `sourceURL` for breakpoints when one is provided. ([324169@main](https://commits.webkit.org/324169@main)) (190465797)
-   Fixed checkbox navigation items being shifted down. ([324172@main](https://commits.webkit.org/324172@main)) (190465799)
-   Fixed frames missing from the Timelines tab. ([324171@main](https://commits.webkit.org/324171@main)) (190465833)
-   Fixed Call Trees in the Timelines tab sometimes missing content. ([324173@main](https://commits.webkit.org/324173@main)) (190466008)
-   Fixed focus being lost in the Timelines tab when using arrow keys to select a data grid row that is out of view. ([324174@main](https://commits.webkit.org/324174@main)) (190466428)
-   Fixed focus being lost in the Graphics tab when using arrow keys to select a tree element that is out of view. ([324175@main](https://commits.webkit.org/324175@main)) (190466777)
-   Fixed Safari extension scripts missing from the Sources tab in Web Inspector. ([324509@main](https://commits.webkit.org/324509@main)) (190768385)

### WebAssembly

#### Resolved Issues

-   Fixed one-type recursion groups to match their shorthand form. ([323455@main](https://commits.webkit.org/323455@main)) (189807549)
-   Fixed atomic loads and stores in the BBQ and OMG compilation tiers to be compiled consistently with the interpreter. ([324185@main](https://commits.webkit.org/324185@main)) (190473201)
-   Fixed `any.convert_extern` to accept a subtype of `externref`. ([324243@main](https://commits.webkit.org/324243@main)) (190498804)

### WebGL

#### Resolved Issues

-   Fixed: Improved WebGL memory use by allocating default framebuffer storage when it is first used instead of at context creation. ([323911@main](https://commits.webkit.org/323911@main)) (188901577)
-   Fixed WebGL not working in shared workers and service workers in some conditions. ([324220@main](https://commits.webkit.org/324220@main)) (189900485)
-   Fixed: Improved WebGL performance by reusing drawing buffers once the compositor releases them. ([323882@main](https://commits.webkit.org/323882@main)) (190042989)
-   Fixed resizing a canvas that has not been drawn to unnecessarily allocating the default framebuffer. ([324144@main](https://commits.webkit.org/324144@main)) (190308555)
-   Fixed single-sample rendering that uses derivatives incorrectly forcing the sample mask output on Metal. ([324221@main](https://commits.webkit.org/324221@main)) (190417440)
-   Fixed an issue where a GPU reset caused all subsequently created WebGL contexts to stop working. ([324346@main](https://commits.webkit.org/324346@main)) (190510529)

### WebGPU

#### New Features

-   Added support for the `texture-component-swizzle` feature, allowing `createView()` to take a `swizzle` option that permutes or fills texture channels. ([324543@main](https://commits.webkit.org/324543@main)) (189135744)

#### Resolved Issues

-   Fixed GPU memory for a destroyed `GPUTexture` not being released while a `GPUBindGroup` that referenced it still exists. ([323838@main](https://commits.webkit.org/323838@main)) (189420456)
-   Fixed: Improved performance of reading back an offscreen canvas that uses WebGPU. ([323834@main](https://commits.webkit.org/323834@main)) (189530498)
-   Fixed WGSL uniformity analysis to treat `textureDimensions()` of a write-only or read-write storage texture as non-uniform. ([324225@main](https://commits.webkit.org/324225@main)) (190384655)
-   Fixed copying `ImageBitmap` content to a texture in WebGPU. ([324352@main](https://commits.webkit.org/324352@main)) (190516486)

### WebRTC

#### Resolved Issues

-   Fixed an issue where a camera or microphone permission denial was remembered even when it did not come from the user. ([324309@main](https://commits.webkit.org/324309@main)) (190551948)
-   Fixed camera and microphone permission requests to be queued so they are presented one at a time. ([324473@main](https://commits.webkit.org/324473@main)) (190618582)