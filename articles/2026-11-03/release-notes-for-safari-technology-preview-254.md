---
title: "Release Notes for Safari Technology Preview 254"
source: "https://webkit.org/blog/18420/release-notes-for-safari-technology-preview-254/"
publishedDate: "2026-10-08"
category: "web-standards"
feedName: "WebKit Blog"
---

[Safari Technology Preview](https://webkit.org/blog/6017/introducing-safari-technology-preview/) Release 254 is now [available for download](https://developer.apple.com/safari/resources/) for macOS Golden Gate and macOS Tahoe. If you already have Safari Technology Preview installed, you can update it in System Settings under General → Software Update.

This release includes WebKit changes between: [321068@main…322634@main](https://github.com/WebKit/WebKit/compare/b4a444378c79ddb62f086fd2888ddd4cf8d8cdb0...a8755fb056b8fa389e91787f86b8bc5f1919fbce).

### Accessibility

#### Resolved Issues

-   Fixed VoiceOver on iOS not identifying date, time, and color inputs as pop-up buttons. ([321384@main](https://commits.webkit.org/321384@main)) (187696500)
-   Fixed VoiceOver being unable to press buttons, links, and form controls styled with `pointer-events: none`. ([322472@main](https://commits.webkit.org/322472@main)) (188003870)
-   Fixed VoiceOver announcing every focused ARIA `menuitem`, `menuitemcheckbox`, and `menuitemradio` as “selected”. ([322397@main](https://commits.webkit.org/322397@main)) (188185386)
-   Fixed an issue on iOS where an error message made of several pieces of text was read in reverse order with some text repeated. ([322318@main](https://commits.webkit.org/322318@main)) (188764297)

### Animations

#### Resolved Issues

-   Fixed view timeline animations freezing once a sticky-positioned inline ancestor sticks to the scroll container. ([321094@main](https://commits.webkit.org/321094@main)) (187300111)
-   Fixed an issue where accelerated animations of `opacity` to `0`, including scroll-driven animations, could leave elements fully visible instead of transparent. ([322355@main](https://commits.webkit.org/322355@main)) (187682187)

### CSS

#### New Features

-   Added support for the `size`, `min-size`, and `max-size` shorthand properties. ([321710@main](https://commits.webkit.org/321710@main)) (187495014)
-   Added support for the `border-*-radius` side shorthands, such as `border-top-radius`, which set the radii of both corners on one side of a box at once. ([322537@main](https://commits.webkit.org/322537@main)) (187605885)
-   Added support for the `interpolate-size` property, which allows animations and transitions to and from intrinsic sizing keywords such as `auto`, `min-content`, and `fit-content`. ([321370@main](https://commits.webkit.org/321370@main)) (187701518)
-   Added support for the `symbols()` function for defining anonymous counter styles. ([321624@main](https://commits.webkit.org/321624@main)) (188048446)
-   Added support for CSS linked parameters, including the `link-parameters` property and `param()`, for passing values into linked SVG images. ([321822@main](https://commits.webkit.org/321822@main)) (188217737)
-   Added support for the `calc-size()` function, which allows calculations on intrinsic sizes such as `auto`, `fit-content`, and `max-content`. ([322574@main](https://commits.webkit.org/322574@main)) (188996389)

#### Resolved Issues

-   Fixed CSS Grid relayout cost growing quadratically with the number of grid items that have distinct `order` values. ([321853@main](https://commits.webkit.org/321853@main)) (173962596)
-   Fixed CSS Grid track sizing for items that span multiple tracks to follow the current specification for distributing extra space, including to non-affected tracks. ([322402@main](https://commits.webkit.org/322402@main)) (182725333)
-   Fixed table cells after an empty `width: 0` column being placed off-screen. ([322376@main](https://commits.webkit.org/322376@main)) (183452074)
-   Fixed the rendering of outlines with a negative `outline-offset` on elements that use `corner-shape`. ([321259@main](https://commits.webkit.org/321259@main)) (186820849)
-   Fixed `line-clamp` and `-webkit-line-clamp` to share the same underlying values and cascade correctly against each other, with `-webkit-line-clamp` now treated as a shorthand. ([322292@main](https://commits.webkit.org/322292@main)) (187100061)
-   Fixed `sibling-index()` and `sibling-count()` returning 1 for children of a shadow root. ([321182@main](https://commits.webkit.org/321182@main)) (187201634)
-   Fixed `line-clamp`, `max-lines`, and `block-ellipsis` to match the latest specification syntax, allowing `max-lines` and `line-clamp` to combine `auto` with an integer and `block-ellipsis` to accept `no-ellipsis`, `ellipsis`, or a string. ([321832@main](https://commits.webkit.org/321832@main)) (187371224)
-   Fixed grid track sizing for items that span multiple tracks so that they are sized in groups by span count, as the CSS Grid specification requires. ([321194@main](https://commits.webkit.org/321194@main)) (187413690)
-   Fixed a `min-content` inline size to give both the min-content and max-content contributions of an element that size. ([321278@main](https://commits.webkit.org/321278@main)) (187601903)
-   Fixed an issue where a stretched grid item whose padding exceeded its grid area was sized narrower than its own padding. ([321295@main](https://commits.webkit.org/321295@main)) (187612019)
-   Fixed implicit named grid lines created by `grid-template-areas` sometimes being empty. ([321401@main](https://commits.webkit.org/321401@main)) (187753954)
-   Fixed `fit-content()` grid tracks growing beyond their limit when distributing extra space. ([321720@main](https://commits.webkit.org/321720@main)) (187757242)
-   Fixed grid layout to use a grid item’s margin box, rather than its border box, for its minimum size contribution so items with margins size their tracks correctly. ([321614@main](https://commits.webkit.org/321614@main)) (187850851)
-   Fixed `clip-path` with a `<geometry-box>` value ignoring `corner-shape` and clipping to rounded corners instead. ([321557@main](https://commits.webkit.org/321557@main)) (187891292)
-   Fixed a flex item’s base size ignoring the space available to it when its main size is `fit-content`. ([322557@main](https://commits.webkit.org/322557@main)) (187932371)
-   Fixed a box with a fixed `width` ignoring `max-width: max-content` when contributing its intrinsic size. ([322298@main](https://commits.webkit.org/322298@main)) (188008779)
-   Fixed grid track sizing so a track’s growth limit is never initialized smaller than its base size. ([321616@main](https://commits.webkit.org/321616@main)) (188023571)
-   Fixed the intrinsic width of grid containers with `contain: inline-size`, `container-type: inline-size`, or `content-visibility: hidden` so it comes from `contain-intrinsic-size` rather than the grid items. ([321612@main](https://commits.webkit.org/321612@main)) (188029152)
-   Fixed missing repaints in CSS Grid layouts when grid items move. ([321737@main](https://commits.webkit.org/321737@main)) (188142676)
-   Fixed `table-layout: fixed` being ignored when a table’s width is `intrinsic`, `min-intrinsic`, or a `calc-size()` value. ([322409@main](https://commits.webkit.org/322409@main)) (188201473)
-   Fixed relative color syntax to preserve `none` channel values that are referenced directly, so `oklab(from oklab(none none none) l a b)` resolves to `oklab(none none none)`. ([321724@main](https://commits.webkit.org/321724@main)) (188215354)
-   Fixed color serialization so that sRGB colors with `none` components serialize using `color(srgb ...)`, and `hsl()` and `hwb()` colors serialize their saturation, lightness, whiteness, and blackness components as percentages. ([321758@main](https://commits.webkit.org/321758@main)) (188254602)
-   Fixed relative color syntax so that missing (`none`) components are preserved instead of becoming `0` when the origin color is converted to a different color space. ([321802@main](https://commits.webkit.org/321802@main)) (188300348)
-   Fixed relative `alpha()` colors to serialize in the most precise form using `color()` syntax, matching `color-mix()` and other relative color expressions. ([321829@main](https://commits.webkit.org/321829@main)) (188323511)
-   Fixed relative `alpha()` color functions to require an alpha parameter, so values like `alpha(from red)` are now invalid, following a CSS Working Group resolution. ([321852@main](https://commits.webkit.org/321852@main)) (188339902)
-   Fixed deprecated CSS system colors, such as `ActiveBorder`, `Menu`, `Scrollbar`, `ThreeDFace`, and `Window`, to compute to their CSS Color 4 equivalents on macOS. ([322193@main](https://commits.webkit.org/322193@main)) (188365953)
-   Fixed `border-image-repeat: round` to round the tile count to the nearest whole number instead of rounding it down. ([321996@main](https://commits.webkit.org/321996@main)) (188369219)
-   Fixed a regression where elements with `aspect-ratio` inside a column flex container did not shrink when the container got narrower. ([321951@main](https://commits.webkit.org/321951@main)) (188393652)
-   Fixed `line-clamp` to make room for the block ellipsis during line breaking, moving content that doesn’t fit next to the ellipsis to the next line, including `nowrap` content. ([322495@main](https://commits.webkit.org/322495@main)) (188393991)
-   Fixed `line-clamp` so that when the block ellipsis displaces all content on the clamped line, only the ellipsis remains and the line is not made taller by inline boxes. ([322500@main](https://commits.webkit.org/322500@main)) (188440163)
-   Fixed an issue where grid items with `aspect-ratio` and a percentage height did not shrink when the grid got narrower. ([322176@main](https://commits.webkit.org/322176@main)) (188444964)
-   Fixed CSS color conversion to follow the latest specification rules for missing hue components on achromatic colors, including in `hsl()` and `hwb()`. ([321984@main](https://commits.webkit.org/321984@main)) (188471496)
-   Fixed `line-clamp` adding a block ellipsis to the last line when all of the content fits within the line limit. ([322510@main](https://commits.webkit.org/322510@main)) (188500712)
-   Fixed `line-clamp` to count the lines of nested blocks towards the maximum number of lines. ([322521@main](https://commits.webkit.org/322521@main)) (188535368)
-   Fixed an issue where a justified line came up short when its hanging trailing whitespace was inside an inline box. ([322224@main](https://commits.webkit.org/322224@main)) (188548682)
-   Fixed `line-clamp` to remove hanging trailing whitespace before the block ellipsis. ([322531@main](https://commits.webkit.org/322531@main)) (188551752)
-   Fixed an issue where `line-clamp` was ignored on floats and absolutely positioned boxes. ([322551@main](https://commits.webkit.org/322551@main)) (188552622)
-   Fixed an issue where ruby annotations lost their text inside a `line-clamp` container. ([322578@main](https://commits.webkit.org/322578@main)) (188552871)
-   Fixed an issue where text inside a `display: contents` element inherited the wrong style after its parent’s style changed. ([322092@main](https://commits.webkit.org/322092@main)) (188591349)
-   Fixed `line-clamp` incorrectly clamping lines on a multi-column container. ([322584@main](https://commits.webkit.org/322584@main)) (188595965)
-   Fixed an issue where changing the width of a `line-clamp` container showed the lines past the clamp point. ([322600@main](https://commits.webkit.org/322600@main)) (188596942)
-   Fixed `aspect-ratio` being ignored on absolutely positioned boxes with `height: fit-content`, `min-content`, or `max-content`. ([322178@main](https://commits.webkit.org/322178@main)) (188597811)
-   Fixed `line-clamp: auto` to clamp at the container’s block size. ([322603@main](https://commits.webkit.org/322603@main)) (188621599)
-   Fixed an issue where changing `shape-image-threshold` did not update the shape when the shape image was a gradient. ([322232@main](https://commits.webkit.org/322232@main)) (188772999)
-   Fixed grid items ignoring their `::first-line` styles in certain cases. ([322319@main](https://commits.webkit.org/322319@main)) (188830233)
-   Fixed `fit-content()` grid tracks with a percentage argument being stretched when the grid’s size is indefinite. ([322421@main](https://commits.webkit.org/322421@main)) (188848301)
-   Fixed `overflow-wrap: anywhere` keeping extra characters on a line, or breaking inside a surrogate pair, next to punctuation that is prohibited at the start of a line. ([322554@main](https://commits.webkit.org/322554@main)) (188884467)
-   Fixed the initial value of `position-visibility` to be `anchor-visible`. ([322565@main](https://commits.webkit.org/322565@main)) (188939499)

### Canvas

#### Resolved Issues

-   Fixed `rect()` using the wrong winding direction when given a negative width or height. ([322101@main](https://commits.webkit.org/322101@main)) (188036092)
-   Fixed `TextMetrics` `emHeightAscent` and `emHeightDescent` to add up to the font’s em size, and updated the top, hanging, middle, ideographic, and bottom baselines to match when drawing text. ([322077@main](https://commits.webkit.org/322077@main)) (188368945)
-   Fixed sizing of image sources, such as SVG images without a natural size, used by canvas `drawImage()` and `createPattern()`, `createImageBitmap()`, WebGL, and `VideoFrame` to follow CSS object size negotiation. ([322003@main](https://commits.webkit.org/322003@main)) (188524860)

#### Deprecations

-   Removed support for the non-standard `darker` value of `globalCompositeOperation`. ([321811@main](https://commits.webkit.org/321811@main)) (188035440)

### Editing

#### Resolved Issues

-   Fixed an issue where the caret was hard to see after pasting wrapped text whose color contrasts poorly with the editor’s background, such as dark text pasted into a dark-mode editor. ([321615@main](https://commits.webkit.org/321615@main)) (186543233)
-   Fixed drag-selecting text that starts inside a `position: fixed` element so that the page autoscrolls when the pointer moves past the edge of the window. ([322310@main](https://commits.webkit.org/322310@main)) (188330363)
-   Fixed an issue where converting a bulleted list to a numbered list left a stray `type` attribute on the resulting `<ol>`. ([322170@main](https://commits.webkit.org/322170@main)) (188445470)

### Forms

#### Resolved Issues

-   Fixed `::picker-icon` on `<select>` elements to draw the dropdown arrow as a built-in glyph instead of a text character positioned with a negative margin, so authors no longer need to reset margins when styling it. ([321110@main](https://commits.webkit.org/321110@main)) (185952359)
-   Fixed setting `valueAsNumber` to throw a `TypeError` for infinite values and to clear the value when set to `NaN`, instead of throwing a `NotSupportedError` for both. ([321668@main](https://commits.webkit.org/321668@main)) (188047421)
-   Fixed missing icons in search fields, including the magnifying glass in `<input type="search">` and the filter field icons in Web Inspector. ([322219@main](https://commits.webkit.org/322219@main)) (188297101)

### HTML

#### Resolved Issues

-   Fixed an iframe whose `src` changed before its first load committed being missing from the back/forward list, which could show the wrong frame content after navigating back. ([321768@main](https://commits.webkit.org/321768@main)) (149977268)
-   Fixed navigating a subframe that still shows its initial `about:blank` document to replace the history entry instead of adding a new one, so the back button works as expected. ([321285@main](https://commits.webkit.org/321285@main)) (187298226)
-   Fixed changes to the `scrolling` attribute on an `<iframe>` not taking effect immediately when overlay scrollbars are in use. ([321994@main](https://commits.webkit.org/321994@main)) (188326221)

### Images

#### Resolved Issues

-   Fixed top-level image viewer to support dark-mode. ([322117@main](https://commits.webkit.org/322117@main)) (97965029)
-   Fixed a broken `<img>` with an empty `alt` attribute to have no natural size or aspect ratio, so block-level images no longer show a broken-image icon. ([321251@main](https://commits.webkit.org/321251@main)) (155149701)
-   Fixed the bitmap image `naturalWidth` and `naturalHeight` to return the image metadata size rather than the decoded size; this fixed layout of the image for different sizes. ([322220@main](https://commits.webkit.org/322220@main)) (172477431)
-   Fixed `image-rendering` not applying to generated images, such as `cross-fade()`, used in the CSS `content` property. ([322533@main](https://commits.webkit.org/322533@main)) (189024049)
-   Fixed the bitmap image `naturalWidth` and `naturalHeight` to return the density-corrected natural rather than the layout size which can be affected the style such as `image-orientation`. ([322534@main](https://commits.webkit.org/322534@main)) (189024238)

### JavaScript

#### Resolved Issues

-   Fixed `BigInt("-")` and `BigInt("0x ")` to throw a `SyntaxError`. ([321129@main](https://commits.webkit.org/321129@main)) (187423917)
-   Fixed an issue where optimized code could read a stale value of a module variable after an import cycle. ([321135@main](https://commits.webkit.org/321135@main)) (187432418)
-   Fixed spreading or applying a strict mode `arguments` object truncating its length to 32 bits. ([321213@main](https://commits.webkit.org/321213@main)) (187527803)
-   Fixed stack trace capture to read `Error.stackTraceLimit` from the `Error` constructor. ([321296@main](https://commits.webkit.org/321296@main)) (187633441)
-   Fixed named backreferences (`\k<name>`) inside regular expression lookbehinds incorrectly matching the empty string in some cases. ([321355@main](https://commits.webkit.org/321355@main)) (187741552)
-   Fixed `RegExp.prototype.test()` skipping the observable read of `lastIndex` for some anchored regular expressions. ([321363@main](https://commits.webkit.org/321363@main)) (187754780)
-   Fixed `ArrayBuffer.prototype.slice()` to correctly look up `Symbol.species` on the constructor, including for `ArrayBuffer` objects from other realms. ([321451@main](https://commits.webkit.org/321451@main)) (187853060)
-   Fixed `Intl.DateTimeFormat.prototype.resolvedOptions()` reporting a `dayPeriod` value for 12-hour formats that was never requested, which caused formatters recreated from those options to output text like “in the morning” instead of “AM”. ([321443@main](https://commits.webkit.org/321443@main)) (187860472)
-   Fixed `Intl.Segmenter` `containing()` returning a segment that also included the preceding segment when the index was at a boundary before a surrogate pair, such as an emoji. ([322218@main](https://commits.webkit.org/322218@main)) (187863002)
-   Fixed `Intl.DurationFormat` dropping zero minutes and seconds that follow a numeric unit. ([321755@main](https://commits.webkit.org/321755@main)) (188252937)
-   Fixed `Promise.prototype.then()`, `catch()`, `finally()`, `Promise.resolve()`, and `Promise.reject()` creating promises and errors in the wrong realm when used with a `Promise` from another realm, such as an iframe. ([321864@main](https://commits.webkit.org/321864@main)) (188345846)
-   Fixed `(a?.b)(x)` skipping the call and returning `undefined` when `a` is `null` or `undefined`, instead of evaluating the arguments and throwing a `TypeError`. ([321867@main](https://commits.webkit.org/321867@main)) (188347937)
-   Fixed `Intl.DurationFormat` dropping a fractional value folded into a zero unit, so formatting `{ milliseconds: 500 }` with `milliseconds: "numeric"` returns `0.5 sec` instead of an empty string. ([321878@main](https://commits.webkit.org/321878@main)) (188362824)
-   Fixed `Intl.DurationFormat` dropping the minus sign for fractional values between -1 and 0. ([321988@main](https://commits.webkit.org/321988@main)) (188478180)
-   Fixed `String.prototype` and `RegExp.prototype` methods such as `match()`, `replace()`, `split()`, and `test()` incorrectly running with the caller’s realm when used with a `RegExp` or function from another realm. ([321990@main](https://commits.webkit.org/321990@main)) (188478512)
-   Fixed tagged templates with a parenthesized optional chain as the tag to keep the correct `this` value. ([322141@main](https://commits.webkit.org/322141@main)) (188677696)
-   Fixed tagged templates that use a `super` property as the tag so the tag function is called with the current `this` value. ([322253@main](https://commits.webkit.org/322253@main)) (188790013)
-   Fixed TypedArray constructors creating an empty array when passed a `Proxy` that wraps an array-like object. ([322260@main](https://commits.webkit.org/322260@main)) (188794129)
-   Fixed the `ArrayBuffer` constructor to throw a `RangeError` for an invalid length before reading the `prototype` of `newTarget`. ([322281@main](https://commits.webkit.org/322281@main)) (188822488)
-   Fixed the `Array` constructor to read the `prototype` of `newTarget` before throwing a `RangeError` for an invalid length. ([322282@main](https://commits.webkit.org/322282@main)) (188822747)

### Media

#### New Features

-   Added support for the `transfer` option in WebCodecs `EncodedAudioChunk`, `EncodedVideoChunk`, `AudioData`, `VideoFrame`, and `ImageDecoder` constructors, allowing ownership of `ArrayBuffer` data to be transferred instead of copied. ([321548@main](https://commits.webkit.org/321548@main)) (187834056)
-   Added support for the `hevc` option in `VideoEncoder` configurations so that WebCodecs can produce HEVC video in Annex B format. ([322385@main](https://commits.webkit.org/322385@main)) (188387670)

#### Resolved Issues

-   Fixed paused media with audio in a hidden page being able to start playing again without a user gesture. ([322266@main](https://commits.webkit.org/322266@main)) (169468617)
-   Fixed video disappearing while audio continued after returning from Picture-in-Picture to element fullscreen and then exiting to inline on iOS. ([321751@main](https://commits.webkit.org/321751@main)) (181656299)
-   Fixed an issue where text tracks whose `mode` was set with JavaScript could be overridden by automatic caption selection, preventing multiple text tracks from showing at the same time. ([321838@main](https://commits.webkit.org/321838@main)) (183472153)
-   Fixed an issue where media range responses could drop the last byte of a requested range. ([321101@main](https://commits.webkit.org/321101@main)) (187225949)
-   Fixed a mirrored `VideoFrame` being flipped vertically instead of horizontally when its rotation is applied. ([321697@main](https://commits.webkit.org/321697@main)) (187300986)
-   Fixed an issue where the `play()` promise never resolved and the `playing` event never fired for Media Source Extensions content mixing clear and encrypted media when the decryption key was already available. ([321495@main](https://commits.webkit.org/321495@main)) (187850389)
-   Fixed WebCodecs `VideoEncoder` and `VideoDecoder` hanging on `flush()` when the underlying codec buffers more than four frames. ([321682@main](https://commits.webkit.org/321682@main)) (188165426)
-   Fixed incorrect colors in 8-bit 4:2:2 VP9 video decoded in software, where the chroma channels were swapped and caused a visible color cast. ([322477@main](https://commits.webkit.org/322477@main)) (188857520)
-   Fixed the software VP9 decoder used by WebCodecs and media playback to report a decode error instead of silently dropping 4:4:4 frames or producing corrupted 12-bit frames. ([322513@main](https://commits.webkit.org/322513@main)) (188868857)

### Networking

#### Resolved Issues

-   Fixed cookies with non-ASCII characters set using `document.cookie` or `cookieStore.set()` getting truncated, and changed reading them to decode as UTF-8 to match other browsers. ([322447@main](https://commits.webkit.org/322447@main)) (124266311)
-   Fixed resources from app-registered custom URL schemes failing to load because of stricter cross-origin checks. ([321782@main](https://commits.webkit.org/321782@main)) (182251092)
-   Fixed a regression on iOS where Apple Wallet passes delivered through a `data:` URL navigation did not open in Wallet. ([322096@main](https://commits.webkit.org/322096@main)) (184582548)
-   Fixed an issue where a speculation rules prefetch that hit a cross-origin redirect also cancelled a real navigation to the same URL. ([321796@main](https://commits.webkit.org/321796@main)) (187701208)
-   Fixed an issue where a failed speculative prefetch could break the actual navigation, sometimes prompting users to download the page instead of displaying it. ([322091@main](https://commits.webkit.org/322091@main)) (188119964)
-   Fixed structured header field parsing rejecting the entire header when a dictionary or parameter key begins with `*`. ([321835@main](https://commits.webkit.org/321835@main)) (188260300)
-   Fixed cross-origin stylesheets loaded without CORS never being reused from the parsed stylesheet cache, improving page load performance. ([322418@main](https://commits.webkit.org/322418@main)) (188872969)

### PDF

#### Resolved Issues

-   Fixed the context menu for selected text in PDFs on macOS not offering the Translate option. ([322064@main](https://commits.webkit.org/322064@main)) (186553741)

### Performance

#### Resolved Issues

-   Fixed unnecessary style resolution for `::before` and `::after` rules that cannot generate content, such as `box-sizing` resets, improving performance. ([322517@main](https://commits.webkit.org/322517@main)) (186807298)
-   Fixed synthetically bolded text always using the slower text measurement path. ([321394@main](https://commits.webkit.org/321394@main)) (187588326)
-   Fixed a regression where items with a percentage `flex-basis` inside deeply nested column flex containers could make layout time grow exponentially and freeze the page. ([321866@main](https://commits.webkit.org/321866@main)) (187727635)

### Rendering

#### New Features

-   Added live pinch-to-zoom on macOS, so content stays sharp during the gesture and fixed and sticky elements follow the zoom. ([322535@main](https://commits.webkit.org/322535@main)) (106728296)

#### Resolved Issues

-   Fixed synthetic bold text being measured wider than the font’s real metrics, which caused letter-spaced text to overflow and wrap and skewed `ch` units and `tab-size`. ([321206@main](https://commits.webkit.org/321206@main)) (55307109)
-   Fixed a retriggered overlay scrollbar expansion animation jumping instead of animating smoothly from its current progress. ([321389@main](https://commits.webkit.org/321389@main)) (183216907)
-   Fixed the intrinsic width of replaced elements with a percentage width and a resolvable percentage height. ([321748@main](https://commits.webkit.org/321748@main)) (187522214)
-   Fixed floats and inline-blocks being sized incorrectly when a child sets `min-width: min-content` or `min-width: max-content`. ([321332@main](https://commits.webkit.org/321332@main)) (187621931)
-   Fixed hit testing on 3D-transformed elements rotated so far that part of them is behind the viewer, where the visible portion did not receive pointer events. ([321633@main](https://commits.webkit.org/321633@main)) (188120032)
-   Fixed an issue where `white-space: nowrap` content containing spaces overflowed the line instead of wrapping to the next line. ([322209@main](https://commits.webkit.org/322209@main)) (188406135)
-   Fixed an issue where inline box borders were drawn closed on a fragment where the inline box continues past a `line-clamp` clamp point. ([322345@main](https://commits.webkit.org/322345@main)) (188471367)
-   Fixed unnecessary rendering and compositing work when a frame moves without resizing, improving scrolling performance on pages with fixed-position iframes. ([322194@main](https://commits.webkit.org/322194@main)) (188665149)

### SVG

#### Resolved Issues

-   Fixed calling `clear()` on a pattern’s `patternTransform.baseVal` so the `patternTransform` attribute is ignored. ([321124@main](https://commits.webkit.org/321124@main)) (170518953)
-   Fixed `getComputedTextLength()` and the character position methods to account for `lengthAdjust="spacingAndGlyphs"`. ([321445@main](https://commits.webkit.org/321445@main)) (187473448)
-   Fixed SVG angle values to serialize numbers using CSS number formatting, consistent with SVG lengths and CSS values. ([321460@main](https://commits.webkit.org/321460@main)) (187757273)
-   Fixed a regression where an SVG without a `viewBox` had zero width as a flex item. ([321446@main](https://commits.webkit.org/321446@main)) (187794543)
-   Fixed the `transform` attribute on the outermost `<svg>` element being ignored or applied in the wrong position. ([321441@main](https://commits.webkit.org/321441@main)) (187854814)
-   Fixed `pointer-events` values `stroke`, `visibleStroke`, `visible`, and `all` missing the stroke area of SVG shapes when `stroke` is `none`. ([322143@main](https://commits.webkit.org/322143@main)) (188285211)
-   Fixed paused SVG image animations restarting from the beginning instead of resuming, matching the behavior of animated bitmap images. ([322303@main](https://commits.webkit.org/322303@main)) (188834229)

### Security

#### Resolved Issues

-   Fixed `navigator.hardwareConcurrency` returning unusual core counts to known fingerprinting scripts, which could trigger bot detection challenges, by alternating between 4 and 8 instead. ([321431@main](https://commits.webkit.org/321431@main)) (177211562)
-   Fixed Content Security Policy violations in workers not firing `securitypolicyviolation` events or notifying a `ReportingObserver`. ([322099@main](https://commits.webkit.org/322099@main)) (188368580)

### Web API

#### Resolved Issues

-   Fixed Navigation API `dispose` events for entries removed by another frame’s navigation seeing stale `navigation.entries()`, and fixed a crash when a frame is detached during a `dispose` event. ([321726@main](https://commits.webkit.org/321726@main)) (184961466)
-   Fixed an issue where ending a worker with both a `readwrite` and a `readonly` IndexedDB transaction in flight could leave that database permanently unable to run any transaction. ([321564@main](https://commits.webkit.org/321564@main)) (187349025)
-   Fixed `window.outerWidth` and `window.outerHeight` returning `0` in some apps that embed WebKit. ([321417@main](https://commits.webkit.org/321417@main)) (187603389)
-   Fixed `pagehide`, `visibilitychange`, and `unload` event handlers having no effect, such as beacons and messages never arriving, when navigating to a cross-site page that loads in a different process. ([321626@main](https://commits.webkit.org/321626@main)) (188113419)
-   Fixed memory growth when reading `Blob` data, such as with `Blob.arrayBuffer()` or `FileReader`, by no longer storing completed reads in the memory cache. ([321948@main](https://commits.webkit.org/321948@main)) (188322145)
-   Fixed an issue where calling `preventDefault()` in a `navigate` event handler did not cancel a cross-site `navigation.navigate()`. ([322591@main](https://commits.webkit.org/322591@main)) (188636761)
-   Fixed Largest Contentful Paint to use an image’s natural dimensions when computing its effective visual area, so SVG images with only one natural dimension are no longer reported as candidates. ([322624@main](https://commits.webkit.org/322624@main)) (189112402)

### Web Extensions

#### Resolved Issues

-   Fixed `webRequest` events not firing for subframes loaded inside an extension’s action popup. ([321290@main](https://commits.webkit.org/321290@main)) (167403221)
-   Fixed an issue where a web extension’s background service worker could handle messages before it finished registering after being reloaded, causing checks for existing offscreen documents to fail. ([321556@main](https://commits.webkit.org/321556@main)) (186304610)
-   Fixed `webRequest` event listeners filtered by `types` so that `main_frame` and `sub_frame` match top-level and iframe loads respectively instead of being swapped. ([321074@main](https://commits.webkit.org/321074@main)) (187214709)
-   Fixed `webRequest` events reporting the wrong `parentFrameId` for subframes whose parent is the main frame, which now correctly report `0`. ([321079@main](https://commits.webkit.org/321079@main)) (187227773)
-   Fixed an issue where HTTP and HTTPS iframes loaded inside a web extension page incorrectly received the extension’s Content Security Policy. ([322449@main](https://commits.webkit.org/322449@main)) (188407446)
-   Fixed an issue where an extension offscreen document calling `window.close()` did not close the document. ([321974@main](https://commits.webkit.org/321974@main)) (188408957)

### Web Inspector

#### Resolved Issues

-   Fixed very large values, such as `border-radius: calc(infinity * 1px)`, overflowing the box model diagram. ([322462@main](https://commits.webkit.org/322462@main)) (174246956)
-   Fixed a regression where the Sources tab showed no scripts when inspecting an older remote target. ([322286@main](https://commits.webkit.org/322286@main)) (187134944)
-   Fixed JavaScript breakpoints showing an incorrect resolved state on pages with multiple frames when one frame navigates or reloads. ([322410@main](https://commits.webkit.org/322410@main)) (187726262)
-   Fixed exported Timeline recordings losing the DOM node associated with layout and rendering events when imported again. ([321679@main](https://commits.webkit.org/321679@main)) (188164899)

### WebAssembly

#### New Features

-   Added support for WebAssembly wide arithmetic, which adds instructions for 128-bit integer addition and subtraction and for multiplying two 64-bit integers into a 128-bit result. ([321926@main](https://commits.webkit.org/321926@main)) (188342106)

#### Resolved Issues

-   Fixed an inefficiency in the WebAssembly in-place interpreter by making its instruction handlers smaller, improving performance by about 5% on Apple silicon. ([321217@main](https://commits.webkit.org/321217@main)) (187291986)
-   Fixed redundant work when compiling WebAssembly code that uses garbage-collected structs and arrays, improving compile times. ([322019@main](https://commits.webkit.org/322019@main)) (188134232)

### WebDriver

#### New Features

-   Added initial support for the WebDriver BiDi `browsingContext.captureScreenshot` command, which captures the page viewport as a PNG. ([321353@main](https://commits.webkit.org/321353@main)) (145987196)

#### Resolved Issues

-   Fixed WebDriver key actions so that the Insert, Pause, and Cancel keys report the correct DOM `key` and `code` values, and so that keypad keys on iOS report `Numpad*` codes and the numpad key location. ([322405@main](https://commits.webkit.org/322405@main)) (187036197)
-   Fixed WebDriver to queue classic commands for a session so they run one at a time, preventing hangs when commands overlap. ([322485@main](https://commits.webkit.org/322485@main)) (187215746)
-   Fixed an issue where a WebDriver command waiting for navigation to complete could hang indefinitely when another command on the same page also started waiting, by returning an error for the replaced command. ([321165@main](https://commits.webkit.org/321165@main)) (187217320)
-   Fixed returning a stale element from a script to report a “stale element reference” error instead of “no such element”. ([322221@main](https://commits.webkit.org/322221@main)) (187510557)

### WebGL

#### Resolved Issues

-   Fixed a regression where WebGL `texImage2D()` and `texSubImage2D()` uploads from image sources handled premultiplied alpha incorrectly. ([321143@main](https://commits.webkit.org/321143@main)) (187093618)

### WebGPU

#### Resolved Issues

-   Fixed `copyExternalImageToTexture()` to preserve alpha values instead of passing lossy premultiplied data, which caused some textures with transparency to render incorrectly. ([321601@main](https://commits.webkit.org/321601@main)) (142087137)
-   Fixed `createComputePipelineAsync()` and `createRenderPipelineAsync()` never settling when the device was lost or destroyed. ([321466@main](https://commits.webkit.org/321466@main)) (187846864)
-   Fixed fragment shaders that `discard` before loops writing NaN values to the render target on some Apple silicon GPUs. ([321870@main](https://commits.webkit.org/321870@main)) (187997601)
-   Fixed WebGPU content permanently dropping to a fraction of the display refresh rate after a few slow frames. ([322439@main](https://commits.webkit.org/322439@main)) (188257377)
-   Fixed an issue where render pipelines created from an already-used `GPUShaderModule` always missed the shader cache, making repeated pipeline creation as slow as a cold compile. ([321998@main](https://commits.webkit.org/321998@main)) (188501171)
-   Fixed an issue where reusing a render bundle with `executeBundles()` lost the bind group dynamic offsets after the first execution. ([322002@main](https://commits.webkit.org/322002@main)) (188524116)
-   Fixed `setBindGroup()` on render pass encoders doing redundant sampler registration work. ([322005@main](https://commits.webkit.org/322005@main)) (188530801)

### WebRTC

#### Resolved Issues

-   Fixed H.265 video encoded or decoded through WebRTC and WebCodecs always being tagged as BT.709 limited range instead of preserving its actual color space. ([321788@main](https://commits.webkit.org/321788@main)) (187787801)
-   Fixed full-range color handling for H.264 video in WebRTC and WebCodecs by decoding it with WebKit’s own VideoToolbox decoder. ([322034@main](https://commits.webkit.org/322034@main)) (188171149)
-   Fixed H.264 video encoding and decoding to preserve the video’s color space, and fixed frames from a canvas to use the sRGB color space when encoded. ([322056@main](https://commits.webkit.org/322056@main)) (188373969)