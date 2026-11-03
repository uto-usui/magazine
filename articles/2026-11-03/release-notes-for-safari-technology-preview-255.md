---
title: "Release Notes for Safari Technology Preview 255"
source: "https://webkit.org/blog/18482/release-notes-for-safari-technology-preview-255/"
publishedDate: "2026-10-22"
category: "web-standards"
feedName: "WebKit Blog"
---

[Safari Technology Preview](https://webkit.org/blog/6017/introducing-safari-technology-preview/) Release 255 is now [available for download](https://developer.apple.com/safari/resources/) for macOS Golden Gate and macOS Tahoe. If you already have Safari Technology Preview installed, you can update it in System Settings under General → Software Update.

This release includes WebKit changes between: [322011@main…323397@main](https://github.com/WebKit/WebKit/compare/601969e2bc01b65a3d24003531a7ce503b6f95c3...bb5913e37d019186e368a72dbde122306da9d75d).

### Accessibility

#### Resolved Issues

-   Fixed VoiceOver presses dispatching a `click` event with an `event.detail` of 0. ([322978@main](https://commits.webkit.org/322978@main)) (187732224)
-   Fixed radio buttons in a group to be exposed as required when the `required` attribute is set on one of the buttons. ([322894@main](https://commits.webkit.org/322894@main)) (189100525)
-   Fixed list box accessibility children not updating when options are added or removed. ([323117@main](https://commits.webkit.org/323117@main)) (189412211)

### Animations

#### Resolved Issues

-   Fixed `getComputedStyle()` ignoring the pseudo-element when checking whether a property is being animated. ([322681@main](https://commits.webkit.org/322681@main)) (188502400)
-   Fixed `requestAnimationFrame()` handles to use the full unsigned long range defined by the IDL. ([322922@main](https://commits.webkit.org/322922@main)) (189270148)
-   Fixed view transition setup to flush the update callback queue. ([323173@main](https://commits.webkit.org/323173@main)) (189533643)

### CSS

#### Resolved Issues

-   Fixed `font-family: initial` acting like `font-family: inherit` instead of resolving to the initial value. ([322304@main](https://commits.webkit.org/322304@main)) (54306281)
-   Fixed `box-sizing: content-box` being ignored for percentage-height tables (`display: table`), which caused vertical padding to be dropped. ([322812@main](https://commits.webkit.org/322812@main)) (122587242)
-   Fixed `min-width: max-content` being ignored for the min-content contribution of a percentage-width replaced element. ([322974@main](https://commits.webkit.org/322974@main)) (179947068)
-   Fixed the top color extension to use relative colors with filters when applicable. ([323153@main](https://commits.webkit.org/323153@main)) (186098400)
-   Fixed `Range.getBoundingClientRect()` returning empty rects for content inside a `content-visibility: hidden` subtree. ([323204@main](https://commits.webkit.org/323204@main)) (186165755)
-   Fixed elements using a background image that depends on `currentColor` not repainting when the current color changes. ([323240@main](https://commits.webkit.org/323240@main)) (188036420)
-   Fixed subgrid implicit grid-area line names being matched by the first substring instead of the suffix. ([322238@main](https://commits.webkit.org/322238@main)) (188203288)
-   Fixed tree-scoped `var()` and custom function references inside an `@function` failing to resolve when the function is called from a `:host` rule. ([322679@main](https://commits.webkit.org/322679@main)) (188206030)
-   Fixed an issue where duplicate `anchor-name` values among `<model>` elements in a spatial portal resolved unpredictably. ([322709@main](https://commits.webkit.org/322709@main)) (188209540)
-   Fixed `@scope` so that structural DOM changes correctly invalidate scope membership when the scoping root selector depends on them. ([322680@main](https://commits.webkit.org/322680@main)) (188398757)
-   Fixed `revert` inside `@starting-style` dropping `@starting-style` declarations from lower cascade layers. ([322688@main](https://commits.webkit.org/322688@main)) (188463947)
-   Fixed the `rotate` property to preserve the sign of the axis when serializing. ([322682@main](https://commits.webkit.org/322682@main)) (188493811)
-   Fixed `revert` and `revert-layer` using the wrong cascade origin for visited and unvisited link styles, which wrongly disabled native appearance. ([323205@main](https://commits.webkit.org/323205@main)) (188494505)
-   Fixed `getComputedStyle()` serializing the `overscroll-behavior` shorthand as a single value of the larger axis instead of both axis values. ([322685@main](https://commits.webkit.org/322685@main)) (188534035)
-   Fixed block-axis multicolumn content being painted at the wrong offset when the column set does not start at the top of the multicol container. ([322687@main](https://commits.webkit.org/322687@main)) (189067503)
-   Fixed `shape-margin` values above `65535px` on an image `shape-outside` producing a much smaller float area. ([322727@main](https://commits.webkit.org/322727@main)) (189069223)
-   Fixed a `line-clamp` container to establish an independent formatting context. ([322767@main](https://commits.webkit.org/322767@main)) (189090409)
-   Fixed replaced elements ignoring `aspect-ratio` when both `width` and `height` are `auto`. ([322745@main](https://commits.webkit.org/322745@main)) (189096923)
-   Fixed the `line-clamp` block ellipsis being placed after a `<wbr>` in a `white-space: nowrap` line. ([322758@main](https://commits.webkit.org/322758@main)) (189103913)
-   Fixed an overflowing preserved tab not wrapping to the next line. ([322759@main](https://commits.webkit.org/322759@main)) (189104880)
-   Fixed the `line-clamp` block ellipsis not hanging with `hanging-punctuation`. ([322772@main](https://commits.webkit.org/322772@main)) (189105782)
-   Fixed `text-overflow` truncating a `unicode-bidi: plaintext` line in the wrong direction. ([322866@main](https://commits.webkit.org/322866@main)) (189108555)
-   Fixed an image `shape-outside` dropping an above-threshold run that starts in the last column. ([322756@main](https://commits.webkit.org/322756@main)) (189116534)
-   Fixed `line-clamp: auto` not being able to clamp between sibling blocks. ([322836@main](https://commits.webkit.org/322836@main)) (189124610)
-   Fixed `line-clamp: auto` clamping inside a box with a set height. ([322842@main](https://commits.webkit.org/322842@main)) (189138321)
-   Fixed the `line-clamp` block ellipsis being placed on a line that only contains a float. ([322791@main](https://commits.webkit.org/322791@main)) (189151667)
-   Fixed the baseline of an empty MathML `<mpadded>` element to account for `border-top` and `padding-top`. ([322826@main](https://commits.webkit.org/322826@main)) (189209081)
-   Fixed CSS grid intrinsic width computation to resolve `auto-fill` repetitions against the grid container’s minimum and maximum size. ([322848@main](https://commits.webkit.org/322848@main)) (189223527)
-   Fixed CSS grid column sizing to resolve percentage rows against the block size rather than the inline size when estimating row sizes. ([322850@main](https://commits.webkit.org/322850@main)) (189230010)
-   Fixed grid container minimum and maximum sizes to respect `box-sizing: border-box`. ([322856@main](https://commits.webkit.org/322856@main)) (189235347)
-   Fixed a percentage-width child of a vertical writing mode box to keep following the box’s width after a style change. ([322964@main](https://commits.webkit.org/322964@main)) (189316242)
-   Fixed `cross-fade()` to match the CSS Images Level 4 specification and the behavior of other browsers. ([322918@main](https://commits.webkit.org/322918@main)) (189356185)
-   Fixed grid layout to return the grid’s used block size, so the container’s size is correct once layout is complete. ([323053@main](https://commits.webkit.org/323053@main)) (189357098)
-   Fixed grid containers to resolve percentage and `calc()` values for `min-width`, `max-width`, `min-height` and `max-height`. ([323051@main](https://commits.webkit.org/323051@main)) (189358198)
-   Fixed `:visited` style not updating for links inside shadow trees. ([323396@main](https://commits.webkit.org/323396@main)) (189380898)
-   Fixed baseline alignment of grid items so it is applied after the items have been sized. ([323238@main](https://commits.webkit.org/323238@main)) (189457596)
-   Fixed `attr()` to avoid an unnecessary legacy code path in simple cases. ([323098@main](https://commits.webkit.org/323098@main)) (189485680)
-   Fixed `MediaList` writes being silently dropped after the owning rule or stylesheet is destroyed. ([323203@main](https://commits.webkit.org/323203@main)) (189496021)
-   Fixed collapsed SVG shapes and images being painted when `visibility: collapse` should be treated as `hidden`. ([323110@main](https://commits.webkit.org/323110@main)) (189496450)
-   Fixed block boxes after the `line-clamp` clamp point remaining visible. ([323220@main](https://commits.webkit.org/323220@main)) (189543433)
-   Fixed content before the `line-clamp` clamp point losing its lines when it does not change. ([323225@main](https://commits.webkit.org/323225@main)) (189569400)
-   Fixed block boxes after the `line-clamp` clamp point still taking up space. ([323253@main](https://commits.webkit.org/323253@main)) (189570948)
-   Fixed floats after the `line-clamp` clamp point remaining visible. ([323337@main](https://commits.webkit.org/323337@main)) (189578173)
-   Fixed `adoptedStyleSheets` continuing to apply removed sheets after its length is shrunk, and ignoring changes to a sheet after its duplicate is removed. ([323233@main](https://commits.webkit.org/323233@main)) (189579103)
-   Fixed an implicit `@scope` rule in a constructed stylesheet adopted by a document matching nothing. ([323237@main](https://commits.webkit.org/323237@main)) (189584948)
-   Fixed floats making the `line-clamp` container taller. ([323349@main](https://commits.webkit.org/323349@main)) (189630233)
-   Fixed floats adding to the scrollable overflow of the `line-clamp` container. ([323353@main](https://commits.webkit.org/323353@main)) (189641420)
-   Fixed `line-clamp: auto` containers having no line clamp until the clamp point is found. ([323357@main](https://commits.webkit.org/323357@main)) (189652879)
-   Fixed floats painting past the block-end content edge of the `line-clamp` container. ([323390@main](https://commits.webkit.org/323390@main)) (189653161)
-   Fixed container size queries truncating fractional container sizes to integers. ([323328@main](https://commits.webkit.org/323328@main)) (189653185)
-   Fixed absolutely positioned elements whose containing block is an inline after the `line-clamp` clamp point remaining visible. ([323395@main](https://commits.webkit.org/323395@main)) (189671905)

### Editing

#### Resolved Issues

-   Fixed `DataTransfer` treating any format that merely starts with `text/plain`, such as `text/plainfoo`, as `text/plain`. ([322954@main](https://commits.webkit.org/322954@main)) (189265567)

### Forms

#### New Features

-   Added support for `<button>` in the native appearance of `<select>`. ([322716@main](https://commits.webkit.org/322716@main)) (178876621)

#### Resolved Issues

-   Fixed `:open` no longer matching a `<select>` whose base appearance picker is still showing. ([322666@main](https://commits.webkit.org/322666@main)) (188911581)
-   Fixed a `<select>` element computing its selected option’s style from outdated ancestor styles. ([322665@main](https://commits.webkit.org/322665@main)) (189109118)
-   Fixed a vertical range slider fill overshooting its value when tick marks are present and the thumb is hidden. ([322780@main](https://commits.webkit.org/322780@main)) (189116567)

### HTML

#### Resolved Issues

-   Fixed a `<style>` element’s sheet to be built from its child text content instead of descendant text. ([322128@main](https://commits.webkit.org/322128@main)) (188047912)
-   Fixed tabbing to a popover invoker to move focus to the popover itself when the popover is focusable. ([323172@main](https://commits.webkit.org/323172@main)) (188267440)
-   Fixed module `<script>` elements with an empty or invalid `src` to fire the `error` event asynchronously instead of synchronously. ([323198@main](https://commits.webkit.org/323198@main)) (189384155)
-   Fixed setting `src` to the empty string on a connected `<script>` element to fire an `error` event. ([323200@main](https://commits.webkit.org/323200@main)) (189385352)
-   Fixed `<script>` elements with an ASCII-whitespace-only `src` being treated as having an empty `src`. ([323236@main](https://commits.webkit.org/323236@main)) (189386063)

### JavaScript

#### Resolved Issues

-   Fixed `Object.defineProperty` to read descriptor fields after converting the property key, so side effects from key conversion are respected. ([322982@main](https://commits.webkit.org/322982@main)) (179389067)
-   Fixed an issue where errors thrown by another realm’s built-ins such as `Number`, `String`, and `Math` functions came from the caller’s realm after DFG optimization. ([323152@main](https://commits.webkit.org/323152@main)) (189057417)
-   Fixed `catch` parameters named `await` to be rejected as a syntax error in contexts where `await` is not an identifier. ([322702@main](https://commits.webkit.org/322702@main)) (189183089)
-   Fixed `await` to be treated as an identifier in a non-async function nested in the parameters of an async function. ([322703@main](https://commits.webkit.org/322703@main)) (189183268)
-   Fixed unary `+` so it no longer changes the evaluation order of operands in binary expressions. ([322817@main](https://commits.webkit.org/322817@main)) (189267513)
-   Fixed constant array literal elements to be evaluated only once when emitting bytecode for array literals. ([322943@main](https://commits.webkit.org/322943@main)) (189295197)
-   Fixed `instanceof` with a bound function reading the target’s `prototype` property when the left-hand side is a primitive. ([322956@main](https://commits.webkit.org/322956@main)) (189388195)
-   Fixed `Array.fromAsync` to get `next` from the async iterator before constructing the `this` value. ([322967@main](https://commits.webkit.org/322967@main)) (189402953)
-   Fixed `using` and `await using` declarations being rejected inside a function nested in a `switch` case or default clause. ([323061@main](https://commits.webkit.org/323061@main)) (189472811)
-   Fixed `for-in` skipping indexed properties of functions. ([323086@main](https://commits.webkit.org/323086@main)) (189504414)

### Media

#### Resolved Issues

-   Fixed remote audio participants no longer autoplaying on web sites using real-time calls. ([323320@main](https://commits.webkit.org/323320@main)) (182922583)
-   Fixed WebVTT cue display so the backdrop no longer overflows outside of the cue. ([323325@main](https://commits.webkit.org/323325@main)) (183472002)
-   Fixed an issue where video using Media Source Extensions never started playing on some sites, such as disneyplus.com. ([322877@main](https://commits.webkit.org/322877@main)) (184182838)
-   Fixed WebCodecs ignoring the profile, bit depth, and chroma subsampling fields in VP9 codec strings. ([322962@main](https://commits.webkit.org/322962@main)) (188868426)
-   Fixed the WebCodecs AV1 encoder reporting support for 10-bit, 12-bit, monochrome, and 4:4:4 or 4:2:2 codec strings that it always encodes as 8-bit 4:2:0. ([322975@main](https://commits.webkit.org/322975@main)) (188882755)
-   Fixed WebCodecs computing incorrect plane layouts for `I422` and `I444` `VideoFrame` objects. ([322972@main](https://commits.webkit.org/322972@main)) (188885351)

### Networking

#### Resolved Issues

-   Fixed failed `modulepreload` resource loads getting stuck in the cache by retrying them. ([323305@main](https://commits.webkit.org/323305@main)) (124280450)
-   Fixed a regression where `XMLHttpRequest` and `fetch` sent an empty request body for a disk-backed `File` when the page is controlled by a service worker. ([323318@main](https://commits.webkit.org/323318@main)) (183071407)

### Rendering

#### Resolved Issues

-   Fixed a block-level box with `aspect-ratio` inside a float growing when its content changes. ([322742@main](https://commits.webkit.org/322742@main)) (188872195)
-   Fixed selection gaps not being painted for a line whose selection top is above its block container. ([322750@main](https://commits.webkit.org/322750@main)) (189113277)
-   Fixed an issue where an element’s box size was incorrect when a padding change was followed by another style change before layout. ([322929@main](https://commits.webkit.org/322929@main)) (189319402)
-   Fixed an issue where changing a table cell’s width did not resize its row in a table with a vertical writing mode. ([322934@main](https://commits.webkit.org/322934@main)) (189322207)

### SVG

#### New Features

-   Added support for the `side` attribute on the SVG `<textPath>` element. ([323115@main](https://commits.webkit.org/323115@main)) (174710714)
-   Enabled the inline layout engine for SVG text. ([323141@main](https://commits.webkit.org/323141@main)) (189532515)

#### Resolved Issues

-   Fixed zero intrinsic size not being respected for SVG in `<object>` and `<embed>` elements. ([322529@main](https://commits.webkit.org/322529@main)) (132152736)
-   Fixed SVG elements inside hidden containers being focusable. ([322650@main](https://commits.webkit.org/322650@main)) (171590890)
-   Fixed an issue where changing a list attribute detached the `SVGNumber`, `SVGLength`, and `SVGPoint` objects held by a script instead of updating them. ([323046@main](https://commits.webkit.org/323046@main)) (186835842)
-   Fixed changing only `paint-order` not triggering a repaint of SVG content. ([322013@main](https://commits.webkit.org/322013@main)) (188533466)
-   Fixed SVG animations continuing to run when the animation element or an ancestor fails conditional processing. ([322829@main](https://commits.webkit.org/322829@main)) (188780260)
-   Fixed `svgView()` fragments with an invalid or zero-size `viewBox` drawing the SVG unscaled. ([323217@main](https://commits.webkit.org/323217@main)) (189611839)

### Security

#### Resolved Issues

-   Fixed external scripts blocked by the `strict-dynamic` Content Security Policy keyword to fire an `error` event. ([323191@main](https://commits.webkit.org/323191@main)) (189386852)

### Web API

#### New Features

-   Added support for the `cross-origin-isolated` Permissions Policy feature. ([322663@main](https://commits.webkit.org/322663@main)) (189124490)
-   Added support for transferring streams to an `AudioWorklet`. ([323327@main](https://commits.webkit.org/323327@main)) (189677199)

#### Known Issues

-   `document.activeElement` returns the `<html>` element instead of `null` for HTML documents with no `body`, which differs from other browsers and breaks the WebDriver Get Active Element command. ([323385@main](https://commits.webkit.org/323385@main)) (190343977)

#### Resolved Issues

-   Fixed an issue where `interactive-widget=resizes-content` did not reflect the correct `innerHeight`, causing the sign-in screen on kidshibbett.com to disappear from view. (186817825)
-   Fixed `pointermove` firing on the parent of a `pointerover` target that is removed during `pointerover`. ([322451@main](https://commits.webkit.org/322451@main)) (188882772)
-   Fixed `Cross-Origin-Embedder-Policy` not being ignored in non-secure contexts. ([322838@main](https://commits.webkit.org/322838@main)) (189193030)
-   Fixed `Range.deleteContents()` and `Range.extractContents()` removing nodes outside the range when the range end is moved during the operation. ([322920@main](https://commits.webkit.org/322920@main)) (189262302)
-   Fixed the `element.dataset` named getter to no longer match non-`data-*` attributes or invalid property names. ([322936@main](https://commits.webkit.org/322936@main)) (189263319)
-   Fixed `NodeIterator` leaving its reference on a detached node when an ancestor of the reference node with no following node in the root is removed. ([322933@main](https://commits.webkit.org/322933@main)) (189263890)
-   Fixed `requestIdleCallback()` handles above 2^31 so they can be cancelled with `cancelIdleCallback()`. ([322942@main](https://commits.webkit.org/322942@main)) (189266546)
-   Fixed secure context status being determined after document creation instead of when the document is created. ([322939@main](https://commits.webkit.org/322939@main)) (189268799)
-   Fixed the document’s default event handler running twice for bubbling events targeted at the document, which fired `DOMActivate` twice. ([323065@main](https://commits.webkit.org/323065@main)) (189379133)
-   Fixed `requestIdleCallback` callbacks no longer running after removing a same-origin iframe that had a pending `setTimeout`. ([323148@main](https://commits.webkit.org/323148@main)) (189379748)
-   Fixed `Window`\-only and `DedicatedWorkerGlobalScope`\-only types being deserialized in other kinds of workers. ([323120@main](https://commits.webkit.org/323120@main)) (189423491)
-   Fixed `moveBefore()` leaving selectors that depend on the child list, such as `:has()` and `:empty`, stale after a move. ([323044@main](https://commits.webkit.org/323044@main)) (189461850)
-   Fixed `FileSystemHandle` objects being deserialized in non-secure contexts. ([323219@main](https://commits.webkit.org/323219@main)) (189588333)
-   Fixed `SpeechRecognitionResultList` being exposed in non-secure contexts. ([323326@main](https://commits.webkit.org/323326@main)) (189631080)
-   Fixed `DOMException` and `QuotaExceededError` not being exposed in every global scope. ([323313@main](https://commits.webkit.org/323313@main)) (189677643)

#### Deprecations

-   Removed the unimplemented `document.implementation.createCSSStyleSheet()` method. ([322805@main](https://commits.webkit.org/322805@main)) (142045904)

### Web Extensions

#### New Features

-   Added support for `browser.notifications.update()` in web extensions. ([322071@main](https://commits.webkit.org/322071@main)) (187615870)
-   Added support for `browser.notifications.clear()`, `browser.notifications.getAll()`, and `browser.notifications.getPermissionLevel()` in web extensions. ([322297@main](https://commits.webkit.org/322297@main)) (187616262)

#### Resolved Issues

-   Fixed `storage.local.get()` returning the same array or object instance for distinct empty arrays and objects in a stored value. ([323003@main](https://commits.webkit.org/323003@main)) (189204323)
-   Fixed extension page subframes to have unpartitioned storage access. ([323034@main](https://commits.webkit.org/323034@main)) (189301936)

### Web Inspector

#### New Features

-   Added a CSS keyframe animation editor to Web Inspector. ([322820@main](https://commits.webkit.org/322820@main)) (15801500)
-   Added stack trace popovers to Web Inspector. ([322748@main](https://commits.webkit.org/322748@main)) (20582649)
-   Added evaluation previews to the Web Inspector console. ([322754@main](https://commits.webkit.org/322754@main)) (182773473)
-   Added basic WGSL syntax highlighting. ([322649@main](https://commits.webkit.org/322649@main)) (189147091)
-   Added Web Inspector Graphics instrumentation for updates to the `label` of WebGPU devices and pipelines. ([322793@main](https://commits.webkit.org/322793@main)) (189247758)

#### Resolved Issues

-   Fixed Find in the Elements tab not matching HTML elements and attributes when the search text contains a space character. ([323277@main](https://commits.webkit.org/323277@main)) (109289803)
-   Fixed Log Message breakpoint actions to log objects as rich console arguments instead of plain text. ([322733@main](https://commits.webkit.org/322733@main)) (116907593)
-   Fixed the Infos and Debugs scope bar items disappearing from the console after the console is cleared. ([323269@main](https://commits.webkit.org/323269@main)) (125621103)
-   Fixed `await` not being supported in the console in some scenarios. ([323272@main](https://commits.webkit.org/323272@main)) (127381329)
-   Fixed Styles to correctly account for declarations marked `!important` within a CSS `@layer` rule when computing style overrides. ([323275@main](https://commits.webkit.org/323275@main)) (151931708)
-   Fixed console log messages dismissing the DOM Event popover. ([323306@main](https://commits.webkit.org/323306@main)) (153842239)
-   Fixed Beacon resources in the Sources tab showing an error instead of the response content. ([323270@main](https://commits.webkit.org/323270@main)) (170805067)
-   Fixed the wrong source code location being shown for inline scripts with a source map. ([322747@main](https://commits.webkit.org/322747@main)) (182487329)
-   Fixed Web Inspector to compare resolved resource types after receiving a response. ([323274@main](https://commits.webkit.org/323274@main)) (183988946)
-   Fixed Web Inspector to no longer automatically invoke native getters on functions and prototype objects. ([323271@main](https://commits.webkit.org/323271@main)) (184191697)
-   Fixed the Web Inspector frame selector popup disappearing when paused in the debugger. ([322739@main](https://commits.webkit.org/322739@main)) (186908754)
-   Fixed Web Inspector to clear the active call frame when its target is removed. ([322734@main](https://commits.webkit.org/322734@main)) (186984661)
-   Fixed Web Inspector not offering JavaScript runtime completions for `BigInt` values. ([322731@main](https://commits.webkit.org/322731@main)) (186985019)
-   Fixed Web Inspector to preserve explicit execution context selections across back-forward navigation. ([323281@main](https://commits.webkit.org/323281@main)) (186985083)
-   Fixed Web Inspector to preserve newer execution context selections during navigation. ([323282@main](https://commits.webkit.org/323282@main)) (186985387)
-   Fixed the Network emulation tab bar icon appearing inverted in dark mode in Web Inspector. ([322729@main](https://commits.webkit.org/322729@main)) (187758172)
-   Fixed the Styles panel showing `var()` with a non-ASCII custom property name, such as `var(--色)`, as invalid even though it resolves. ([322076@main](https://commits.webkit.org/322076@main)) (188169850)
-   Fixed the debugger leaving no active call frame when the active target resumes while another target is still paused. ([322843@main](https://commits.webkit.org/322843@main)) (188827760)
-   Fixed Web Inspector to only update the currently active Timeline recording. ([322738@main](https://commits.webkit.org/322738@main)) (189207884)
-   Fixed the Elements tab to include the host element when pushing a pseudo element. ([322871@main](https://commits.webkit.org/322871@main)) (189321868)
-   Fixed Web Inspector to complete rendering notifications before the next rendering update. ([322873@main](https://commits.webkit.org/322873@main)) (189322496)
-   Fixed back/forward cache restore incorrectly reporting a navigation failure after a `pagehide` beacon. ([322983@main](https://commits.webkit.org/322983@main)) (189350210)
-   Fixed Web Inspector reporting “domain already enabled” errors when going back to a page restored from the back/forward cache after a process swap. ([323239@main](https://commits.webkit.org/323239@main)) (189375630)
-   Fixed the `loaderId` changing when a navigation continues in another process. ([323167@main](https://commits.webkit.org/323167@main)) (189567072)
-   Fixed the selected node not being highlighted when hovering keyframe headers in the Elements tab. ([323260@main](https://commits.webkit.org/323260@main)) (189669693)
-   Fixed the Elements tab offering Duplicate Selector, Add Rule, and Create Rule context menu actions for keyframes. ([323263@main](https://commits.webkit.org/323263@main)) (189669755)
-   Fixed filtering styles in the Elements tab incorrectly hiding matching keyframe sections. ([323262@main](https://commits.webkit.org/323262@main)) (189669803)
-   Fixed the Network tab reported response timing not accounting for network throttling. ([323261@main](https://commits.webkit.org/323261@main)) (189669852)
-   Fixed the Storage tab hiding or mishandling entries with an empty key or value. ([323267@main](https://commits.webkit.org/323267@main)) (189669876)
-   Fixed importing a Timeline recording modifying more than the imported recording. ([323268@main](https://commits.webkit.org/323268@main)) (189670026)
-   Fixed search results missing matches on consecutive lines. ([323264@main](https://commits.webkit.org/323264@main)) (189670067)
-   Fixed revealing a source location from the Console selecting the wrong location in a pretty printed script. ([323265@main](https://commits.webkit.org/323265@main)) (189670127)
-   Fixed the Console missing known parameters for some native DOM methods. ([323307@main](https://commits.webkit.org/323307@main)) (189689587)
-   Fixed an uncaught `ReferenceError` for `row` in the Layout Timeline overview graph. ([323308@main](https://commits.webkit.org/323308@main)) (189689709)
-   Fixed an uncaught `TypeError` in the Console when formatting table parameters for a logged message with no parameters. ([323363@main](https://commits.webkit.org/323363@main)) (189724207)

### WebGL

#### Resolved Issues

-   Fixed WebGL default framebuffer queries to be answered at the `WebGLRenderingContext` level. ([322700@main](https://commits.webkit.org/322700@main)) (188899947)
-   Fixed an issue where resizing a canvas with separate `width` and `height` assignments could lose the WebGL context. ([323298@main](https://commits.webkit.org/323298@main)) (188900757)
-   Fixed a WebGL canvas becoming blank after its drawing buffer was resized when painted without accelerated compositing on Windows. ([322870@main](https://commits.webkit.org/322870@main)) (189321624)
-   Fixed full clears of renderbuffers being treated as partial clears under robust resource initialization. ([323300@main](https://commits.webkit.org/323300@main)) (189506198)
-   Fixed renderbuffers being initialized on the CPU in the Metal backend. ([323297@main](https://commits.webkit.org/323297@main)) (189606864)

### WebRTC

#### Resolved Issues

-   Fixed `RTCCertificate` objects being deserialized in workers. ([323182@main](https://commits.webkit.org/323182@main)) (189499857)