---
title: "Building a professional design tool on the web"
source: "https://www.figma.com/blog/building-a-professional-design-tool-on-the-web/"
publishedDate: "2015-12-07"
category: "design"
feedName: "Figma Blog"
---

That’s why we built [Figma](https://www.figma.com/), a collaborative interface design tool that we [recently launched](https://www.figma.com/blog/design-meet-the-internet/)

, as a browser-based cloud service. When we set out to build Figma we knew it would be a challenge. To really succeed it would have to provide a high-fidelity editing experience that professionals would accept and would have to work consistently everywhere.

> Pulling this off was really hard; we’ve basically ended up building a browser inside a browser.

The reason this is hard is because the web wasn’t designed as a general-purpose computing platform. It started off as a technology primarily for documents and had a whole bunch of stuff for application development bolted on top. That stuff usually took the form of specific APIs for one-off cases instead of providing general primitives that can be used to implement all sorts of things. Some examples:

-   CSS has lots of [fancy text layout algorithms](https://www.w3.org/TR/css3-fonts/#font-rend-props) but no way to customize the algorithms or to read back the result of what the browser did so the text layout algorithm can be used as part of another algorithm.
-   All browsers provide a [high-performance](https://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome) [GPU compositor](https://msdn.microsoft.com/en-us/library/jj680148%28v=vs.85%29.aspx) but the web doesn’t have any way of hooking into the rendering algorithm and changing how compositing works to add things like performance optimizations or custom blend modes.
-   Browsers embed [highly-optimized](https://bugzilla.mozilla.org/show_bug.cgi?id=573948) [image](https://code.google.com/p/chromium/issues/detail?id=48789) [decoders](https://blogs.msdn.com/b/ie/archive/2013/09/12/using-hardware-to-decode-and-load-jpg-images-up-to-45-faster-in-internet-explorer-11.aspx) that decode images asynchronously off the UI thread using the latest hardware features, but there’s no API for passing parameters to the decoders to do things like [handle EXIF orientation](https://lists.w3.org/Archives/Public/public-whatwg-archive/2014Apr/0064.html) or avoid [baking in the display color space](https://code.google.com/p/chromium/issues/detail?id=425935#c8) when using drawImage and getImageData.

This lack of general primitives on the web is [starting to change](https://extensiblewebmanifesto.org/) and now there are technologies like WebGL and asm.js that let developers cut past the browser and talk directly to the hardware. It’s this advancement that’s finally made high-performance web-based graphics applications practical. Developers no longer need to wait for the exact features they need to be added to the web, they can build those features themselves!

## [Emscripten](#emscripten)

Our editor is written in C++ and cross-compiled to JavaScript using the [emscripten](https://emscripten.org/) cross-compiler. The emscripten compiler targets the asm.js JavaScript subset which provides a way to get JavaScript JITs to emit predictable, compact machine code and is [widely supported](https://hacks.mozilla.org/2015/03/asm-speedups-everywhere/) in all modern browsers. This has the following benefits:

-   We fully control memory layout and can use compact 32-bit floats or even bytes when appropriate instead of JavaScript’s 64-bit doubles. This is very important for apps like ours that use large amounts of data.
-   The generated code is completely in control of allocation, which makes it much easier to hit 60fps by avoiding GC pauses. All C++ objects are just reserved ranges in a pre-allocated typed array so the JavaScript GC is never involved.
-   The generated code is pre-optimized using LLVM’s advanced optimizer. This combined with C++ template specialization generates very efficient code that is able to come within a factor of [2x native performance or better](https://hacks.mozilla.org/2014/05/asm-js-performance-improvements-in-the-latest-version-of-firefox-make-games-fly/).
-   All asm.js code is guaranteed to be free of deoptimization points so JITs can do ahead-of-time compilation and provide predictable performance. Regular JavaScript code relies on JIT heuristics instead and performance can sometimes vary wildly between subsequent runs of the same code.

That’s not to say emscripten is perfect. As with any new technology, there were bumps along the road. One big issue for us was that certain browser configurations couldn’t allocate large ranges of continuous address space for the huge typed array that contains the entire emscripten memory space. The worst case was [32-bit Chrome on Windows](https://code.google.com/p/chromium/issues/detail?id=394591) which sometimes couldn’t even allocate a 256mb typed array because [ASLR](https://en.wikipedia.org/wiki/Address_space_layout_randomization) was fragmenting the address space. This has since been fixed.

A trick that also helps is to use handles to out-of-heap data for large resources such as image and geometry buffers. We have an internal API called IndirectBuffer (which we are open sourcing [here](https://github.com/evanw/indirectbuffer)) that references an external typed array and makes it available to C++. Moving large allocations out of the main heap reduces memory fragmentation issues for long-running sessions, allows us to use more of the limited address space in 32-bit browsers, and allows us to break past the [31-bit typed array size limitation](https://github.com/WebKit/webkit/blob/f01d2bb66fcde2c3519c4f0c61f790387fd5faee/Source/JavaScriptCore/runtime/ArrayBuffer.h#L255) in 64-bit browsers.

Current asm.js support is already quite good but there’s more exciting changes coming up. [WebAssembly](https://www.2ality.com/2015/06/web-assembly.html) is an effort to implement a binary format for asm.js code to drastically reduce parse time that all major browser vendors are on board with. Right now the only form of multithreading is using web workers with message passing, but the upcoming [shared typed array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#Specifications) specification will make shared-memory multithreading a reality.

## [Rendering](#rendering)

We’ve implemented our own rendering engine to make sure content renders quickly and consistently across platforms. Browsers have amazing graphics implementations and we initially attempted to use them instead of building a new rendering engine. Without a low-level API to access the browser’s render tree, the available options are either HTML, SVG, or 2D canvas. None of these options were satisfactory for many reasons:

-   HTML and SVG contain a lot of baggage and are often much slower than the 2D canvas API due to DOM access. These are usually optimized for scrolling, not zooming, and geometry is often re-tessellated after every scale change.
-   There is no guarantee about GPU acceleration and many things are still rendered on the CPU, which can be quite slow in certain cases.
-   Support for masking, blurring, and blend modes in HTML and SVG varies wildly between browsers and is often not anti-aliased or is too low resolution on high-DPI displays.
-   The 2D canvas API is an immediate mode API instead of a retained mode API so all geometry has to be re-uploaded to the graphics card every frame. This is needlessly wasteful and can become a bottleneck.
-   Text layout is [inconsistent between browsers](https://css-tricks.com/font-rendering-differences-firefox-vs-ie-vs-safari/) and is even inconsistent between the [same browser on different platforms](https://blog.typekit.com/2010/10/21/type-rendering-web-browsers/).
-   We wanted to be able to add features such as [angular gradients](https://i.stack.imgur.com/ivV6l.png) which are not supported by any of these rendering APIs.

Instead of attempting to get one of these to work, we implemented everything from scratch using WebGL. Our renderer is a highly-optimized tile-based engine with support for masking, blurring, dithered gradients, blend modes, nested layer opacity, and more. All rendering is done on the GPU and is fully anti-aliased. Internally our code looks a lot like a browser inside a browser; we have our own DOM, our own compositor, our own text layout engine, and we’re thinking about adding a render tree just like the one browsers use to render HTML.

## [Browsers](#browsers)

The functionality of the web platform is still catching up to native platforms and there are unfortunately still a few gaps here and there. While we don’t have the resources to fill some of the larger gaps, I still try to fix what I can when it makes sense.

Before I started working on Figma, high-DPI custom cursors were really broken on the web. I had to manually fix [Chrome](https://code.google.com/p/chromium/issues/detail?id=268537), [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=888689), and [WebKit](https://bugs.webkit.org/show_bug.cgi?id=120783) because all of them were broken in different ways. There still isn’t a single unified way to do it (SVG for Firefox, -webkit-image-set for Chrome and WebKit, and the ancient .cur format for IE) but at least it’s possible now.

I’ve also fixed a few [egregious](https://bugs.webkit.org/show_bug.cgi?id=97237) [performance](https://bugs.chromium.org/p/angleproject/issues/detail?id=415) and [usability](https://code.google.com/p/chromium/issues/detail?id=239731) bugs to make our product better. The web can be frustrating sometimes, but browsers aren’t a black box (well, except for _that_ browser) and often all it takes to fix annoying issues with the web is an afternoon of poking around in browser code, a day of back-and-forth over a patch, and a few months of waiting for the release to roll out.

There’s still more that the web platform could do that would make Figma even better:

-   Our biggest pain point is lack of access to glyph outlines and kerning tables which there currently [isn’t any way](https://www.w3.org/Bugs/Public/show_bug.cgi?id=21939) [of getting at](https://www.w3.org/TR/2dcontext2/#textmetrics). One of the primary concerns is fingerprinting, but that battle has [already been lost](https://discourse.wicg.io/t/api-to-get-list-of-available-fonts/1197). We’re hoping access to font data can be exposed behind a user permission prompt like other privacy-sensitive APIs. Chrome has come up with a [proposal](https://github.com/DHNishi/LocalFontAccess/blob/master/explainer.md) for a fix that’s currently [in the works](https://code.google.com/p/chromium/issues/detail?id=535764) (they’ve been really helpful!) but there’s nothing else on the horizon for other browsers.
-   We would love to add support for common clipboard formats (.ai, .pdf, etc.) but the web [has no way to do this](https://github.com/w3c/clipboard-apis/issues/9#issuecomment-159023296). The only formats in the spec are text/plain and text/html (our Figma clipboard “format” is text/html with binary data encoded in an HTML comment).
-   Another issue for us is lack of support for the OS X trackpad pinch gesture. Chrome added a [little-known hack](https://code.google.com/p/chromium/issues/detail?id=289887) where the pinch gesture sends the wheel event with ctrlKey down and calling preventDefault() allows the page to handle it. This is amazing and makes zooming and panning in Figma feel native and effortless. I tried to [add it to Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1052253) but that attempt is currently stuck. Pinching in Safari causes zooming behavior that’s really confusing to users and is [impossible to disable](https://bugs.webkit.org/show_bug.cgi?id=145214).

## [Conclusion](#conclusion)

Performance and quality are some of our most important features. They’re a little different than normal features because you only notice them when they aren’t there, but they make all the difference.

I’m very excited to finally reveal Figma to the world. The product isn’t open to the public yet but you can [sign up](https://www.figma.com/) for our waiting list and try it out soon. Let us know what you think!