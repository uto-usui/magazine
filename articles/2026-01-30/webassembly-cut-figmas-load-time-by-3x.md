---
title: "WebAssembly cut Figma's load time by 3x"
source: "https://www.figma.com/blog/webassembly-cut-figmas-load-time-by-3x/"
publishedDate: "2017-06-08"
category: "design"
feedName: "Figma Blog"
---

WebAssembly was just [released this past March](https://blog.mozilla.org/blog/2017/03/07/lots-new-in-firefox-game-changing-webassembly-support/) but has already generated a lot of excitement in the web community. It’s a new binary format for machine code that was specifically designed with browsers in mind. Because apps compiled to WebAssembly can run as fast as native apps, it has the potential to change the way software is written on the web.

Many people have started experimenting with toy WebAssembly projects on the side, but it’s hard to tell what the real-world performance gains will be unless you have a large compatible code base for comparison. Because our product is written in C++, which can easily be compiled into WebAssembly, [Figma](https://www.figma.com/) is a perfect demonstration of this new format’s power. If you haven’t used Figma before, it’s a browser-based interface design tool with a powerful 2D WebGL rendering engine that supports very large documents.

We thought our findings would be useful to the web community as an example of WebAssembly’s impact. Spoiler: it’s much faster.

## [Overview of WebAssembly](#overview-of-webassembly)

WebAssembly allows developers to create desktop-quality experiences on the web without compromising on performance. All major browsers are adding support for it and devoting significant resources to making it as fast as possible.

Before WebAssembly, C++ code could be run in the browser by cross-compiling it to a subset of JavaScript known as [asm.js](https://en.wikipedia.org/wiki/Asm.js). The asm.js subset is basically JavaScript where you can only use numbers (no strings, objects, etc.). This is all you need to run C++ code since everything in C++ is either a number or a pointer to a number, and pointers are also numbers. The C++ address space is just a giant JavaScript array of numbers and pointers are just indices into that array.

WebAssembly is a drop-in replacement for asm.js that is more efficient in every way. But it still maps 1:1 with asm.js so it has the same limitations. Since it can only load and store numbers, it needs to call out to JavaScript code to do anything interesting (create DOM nodes, make network connections, etc.). WebAssembly code is still inside the browser sandbox and can only use the browser APIs that JavaScript has access to.

There are many benefits to running C++ code using WebAssembly instead of cross-compiling it to JavaScript:

-   The format is very compact so it takes less time to transfer over the network than the equivalent cross-compiled JavaScript, even when compressed.
-   The format was designed to be as fast as possible for the browser to parse. This isn’t true for JavaScript syntax, which was designed for humans and contains lots of redundancy and extra rules that must be checked before it can be run. WebAssembly parses around [20x faster](https://webassembly.org/docs/rationale/#why-a-binary-encoding) than asm.js.
-   C++ code is heavily optimized by the LLVM toolchain before it’s even encoded in WebAssembly. This means the browser can just translate it directly to native code without doing any optimizations. In contrast, browsers don’t skip optimizations for JavaScript code because it’s usually hand-written and needs many layers of optimizations to be fast.
-   It’s trivial for browsers to cache the translation of a WebAssembly module to native code. This means the second time you load a page using a WebAssembly module, there’s virtually no load time at all! This isn’t true for asm.js, which is mixed in with regular JavaScript and requires a complex verification pass to validate that it actually follows the asm.js restrictions.
-   WebAssembly has native support for 64-bit integers. JavaScript only has 64-bit floating-point numbers so it [only supports 53-bit integers.](https://stackoverflow.com/questions/1848700/biggest-integer-that-can-be-stored-in-a-double) 64-bit integers have to be emulated in JavaScript, which can be much slower.

If you’re interested in learning more about WebAssembly, I can recommend both Lin Clark’s [high-level intro presentation](https://www.youtube.com/watch?v=HktWin_LPf4) and a [low-level post](https://rsms.me/wasm-intro) by Rasmus Andersson, a designer and engineer who works at Figma, which describes the WebAssembly format in excellent detail. The official docs have a [getting started guide](https://webassembly.org/getting-started/developers-guide/) if you’d like to play around with it yourself.

## [WebAssembly and Figma](#webassembly-and-figma)

The biggest benefit we saw from using WebAssembly at Figma was faster load time. This isn’t surprising since one of WebAssembly’s primary goals is to reduce load time. When we measure load time at Figma we include the time to initialize our app, download the design file, and render the whole design for the first time.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAMBBAj/xAAdEAACAgMBAQEAAAAAAAAAAAABAgARAwQhQRIT/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAESH/2gAMAwEAAhEDEQA/ANObO4uvs48eVlVH5ZPseKYD8nFA99id7Gjvj+0VqPLFydZVDPSgd8EqZRbhCEkf/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/6c35142a5d2e6229410619adaff3f7f811b6ef74-799x409.jpg?rect=1,0,798,409&w=804&h=412&q=75&fit=max&auto=format)

As you can see, our load time improved by more than 3x after we switched to WebAssembly regardless of document size. This is a huge improvement for our users, who often create very large design documents and frequently switch between them.

An additional load time benefit of WebAssembly that isn’t captured in this graph is that load time no longer depends on application size. As long as users have loaded the app before, the browser should already have the translation from WebAssembly to native code cached from last time.

We were hoping that enabling WebAssembly would automatically improve download size too but it didn’t end up shrinking by much, especially after compression. It turns out that compressing asm.js code only ends up slightly bigger than compressing the equivalent WebAssembly code.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAQBAwUI/8QAIBAAAgICAgIDAAAAAAAAAAAAAQIAAwUREiETIyJCUf/EABUBAQEAAAAAAAAAAAAAAAAAAAAD/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAECUfH/2gAMAwEAAhEDEQA/AOl8tk0xrVNdvxOeJIEYF1bDdVyDvZ2ZXlK0sWsWIrDl9huKtVX7fWnbDfxErMpyt4DYHYEJFfSLr8hJA//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/4c676c6b86ea6c22cda85027ae4056430372c8ef-799x409.jpg?rect=1,0,798,409&w=804&h=412&q=75&fit=max&auto=format)

## [WebAssembly state of the world](#webassembly-state-of-the-world)

At the time of writing, WebAssembly support is only enabled by default in Firefox and Chrome. Edge and Safari are still working on their implementations and haven’t released them yet. This will probably change soon so you should check the [“Can I use” entry](https://caniuse.com/#search=wasm) for the latest status.

Even though WebAssembly support is enabled in both Firefox and Chrome, [Figma](https://www.figma.com/) actually only uses WebAssembly in Firefox. We hit some showstopper bugs in Chrome’s WebAssembly implementation that are currently preventing us from enabling WebAssembly in Chrome:

-   [Bug 719172](https://bugs.chromium.org/p/chromium/issues/detail?id=719172): Unlike Firefox, Chrome doesn’t cache its translated WebAssembly code. This means that the entire app must be re-translated every time the page loads, which actually makes our page load slower with WebAssembly than it does with asm.js.
-   [Bug 729768](https://bugs.chromium.org/p/chromium/issues/detail?id=729768): Chrome’s WebAssembly implementation crashes sometimes when running Figma’s code. We’re assuming that this is a bug in V8 because the same code runs fine in Firefox.

Another thing to keep in mind is that browser debugger support is still emerging. It wasn’t prioritized for the WebAssembly MVP and isn’t really implemented yet. We’re still compiling to asm.js instead of WebAssembly for debugging in the meantime.

## [The future of WebAssembly](#the-future-of-webassembly)

WebAssembly is brand new and so is understandably still rough around the edges. However, it’s a principled and practical approach to achieving native performance on the web that is well-poised to become core to how the web works.

One exciting aspect of WebAssembly is that it has much bigger ambitions than just being a target for C++ code. The design is appropriately general-purpose and it should be easy to add WebAssembly as an alternative output format for any compiler that targets native code. An official LLVM backend is in development that, when finished, will make it easy for any language using the LLVM toolchain to emit WebAssembly code directly.

WebAssembly also [has plans](https://github.com/WebAssembly/design/issues/1079) to expose bindings to the JavaScript garbage collector at some point. That will make it much easier to cross-compile garbage-collected languages (Java, C#, etc.) to WebAssembly. You can read more about upcoming WebAssembly features [here](https://www.chromestatus.com/features#webassembly).

Another compelling aspect of WebAssembly is that it’s an integrated part of the web platform. It’s natural and expected to create web apps that use both JavaScript and WebAssembly modules. For example, if you want universal JPEG 2000 support, you no longer have to wait for it to be supported in all browsers. Just cross-compile a decoder to WebAssembly and call it from JavaScript! It should be just as fast as if it were part of the browser itself.

This could potentially improve iteration time of the web platform. Browsers can focus on exposing low-level hardware primitives (WebGL, Bluetooth, USB, etc.) and leave the development of higher-level libraries to the community, which can evolve at a faster pace.

Even though WebAssembly isn’t quite ready yet, Figma is still investing in it because we believe that it’s an important part of the future of the web.

_Like working on state-of-the-art web apps? [Come work at Figma!](https://www.figma.com/careers/)_