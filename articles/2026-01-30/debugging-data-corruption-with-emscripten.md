---
title: "Debugging Data Corruption with Emscripten"
source: "https://www.figma.com/blog/debugging-data-corruption-with-emscripten/"
publishedDate: "2016-11-07"
category: "design"
feedName: "Figma Blog"
---

We discovered an issue with saving in [Figma](https://www.figma.com/) back in June 2015 that turned out to be the hardest and least-satisfying bug I’ve ever tackled. Fixing it took two whole weeks and all I had to show for it at the end was [a single three-line commit](https://github.com/google/flatbuffers/pull/227/files)! However, the journey to get there led me into the depths of our tech stack and makes for an interesting case study.

It all started when we noticed that our app generated invalid save files every now and then (files that couldn’t be read back in). As with all of our bugs, we first tried to find deterministic steps for reproducing the bug. No one could get it to happen reliably though. Our web app has several sources of non-determinism including asynchronous timers and network events, so this wasn’t too surprising.

The next step was to check the generated files themselves. At the time, our file format was a zip file that wrapped a document encoded using Google’s [FlatBuffers](https://google.github.io/flatbuffers/) library. FlatBuffers is a schema-driven file format with zero-parsing overhead, meaning you can load the raw buffer and traverse the encoded object graph without having to run the parser over the entire file first. The bytes of the generated file looked reasonable but some of the offsets to data later on in the file were suspiciously zeroed out. Data being written out of place is usually a symptom of a [memory safety violation](https://en.wikipedia.org/wiki/Memory_safety), which is when a C++ program reads or writes memory that it shouldn’t (use before initialization, use after free, out of bounds access, etc.).

I have a love-hate relationship with C++, the language that Figma’s editor is written in. There’s a good reason why most graphics software is written in C++: it’s an incredibly practical choice. It lets us rely on important third-party libraries ([FreeType](https://www.freetype.org/), [HarfBuzz](https://www.freedesktop.org/wiki/Software/HarfBuzz/), [Skia](https://skia.org/), etc.), it contains many low-level language features that have a direct translation to the underlying hardware, existing debugging tools are very mature and sophisticated, and the optimization toolchain contains literally centuries of person-effort. Despite its benefits however, C++ is a perfect storm of poor language design decisions, an error-prone standard library API, and legacy from C which together make it impossible to completely avoid accidentally introducing memory safety violations in large projects.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAIAAADKYVtkAAAACXBIWXMAAAsSAAALEgHS3X78AAAA8klEQVQY0xWO6W6DMBCEef9Hi5IfCcQ2p9n6wFewwWAQbaW60mg1mk+zmoJSWtc1QogQ0nYdY0xr7Zzz3q/LOk1T0zSZYoSzAQCt/mnwYd/3QkqZo/wiX8Z5bvp5jjGmlDLWVlOgPe2HcYAvEEq42S1x2dJ2XEehhGDjmNsMQDJmlfLOrd6nGJd1Hg2toHrRVzmWmOPOdhBAblIdSl+6EG1LERqqakRItu0HYJFy0/rI2z6qleQxPG7d7T7cn/xJLOnXHhKwk/GLF6auxfstylJhHPr+4PxS6kebX2NOo52ZpJFZk51ssGEL8Yz7tWel7/QHwAYNLzbIUQoAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/c2cd2d14296709fc62fc4f8df37c554758b60f85-1400x342.png?rect=0,1,1400,341&w=804&h=196&q=75&fit=max&auto=format)

An example real-world memory safety violation in Chrome (“OnClose” likely removes the stream, which invalidates “it”)

The C++ language doesn’t have any safeguards against these errors whatsoever, so the C++ community has instead provided tools that attempt to detect these problems. I tried all of the usual tricks without success:

-   Try never releasing any memory to avoid use-after-free errors
-   Run the app with all [malloc debugging options](https://developer.apple.com/library/content/documentation/Performance/Conceptual/ManagingMemory/Articles/MallocDebug.html) enabled
-   Fix all issues reported by [valgrind](https://valgrind.org/)
-   Upgrade the compiler just in case
-   Fix all issues reported by the [clang analyzer](https://clang-analyzer.llvm.org/)

At this point we were getting desperate, but there was one thing left to try to deterministically reproduce the bug: eliminate all sources of non-determinism, create some way of recording user events, and keep recording sessions until the bug happens. Then you have a sequence of events that can be played back in order and the bug should reproduce itself every time. You can even create a reduced test case by randomly dropping events as long as they don’t cause the bug to disappear.

Adding a system like this onto an existing app is a big project because real user sessions have all sorts of events. To limit the scope, we decided to restrict recording to just keyboard and mouse events and use a [fuzzer](https://www.owasp.org/index.php/Fuzzing) (a program that feeds random inputs to another program) to automatically generate sessions containing only those events instead of trying to record actual users. And it worked! Running the fuzzer for a few days came up with a handful of save failures. Then came the hard part: debugging.

Figma is a web app that runs natively in the browser without plugins. We’re using a compiler called [emscripten](https://emscripten.org/) to compile C++ to JavaScript. This may at first seem impossible since JavaScript is a memory-safe garbage-collected scripting language, but the introduction of WebGL to the web platform accidentally also made it possible to emulate the C memory model directly in JavaScript. WebGL added an API called [Typed Arrays](https://www.html5rocks.com/en/tutorials/webgl/typed_arrays/) to allow JavaScript to efficiently manipulate contiguous arrays of vertex data, but they were so useful that they were broken out into [their own specification](https://www.khronos.org/registry/typedarray/specs/latest/).

A typed array is an array with a fixed size where all elements must have the same type. For example, every element of a Uint8Array must be an integer from 0 to 255. The critical feature of typed arrays that makes C++ emulation possible is the ability to have multiple typed arrays share the same backing ArrayBuffer. This means the four bytes of element 2 in a Float32Array can be read as elements 8 to 11 of a Uint8Array that shares the same backing store:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAAsSAAALEgHS3X78AAABI0lEQVQY0y2QO07DQBRF09FQgKJsgoUgOjZAS0+HhCiJEHvICmAHFNAB4hMEFP57bMc2CfaMv8IJEMKxRXF0Z57uu7ozPc/z1nzf3zIMY1vX9d0gCI7DMHyJomiRpukiz3NIwAcB76D+5/k8y7JvmEoph+wOekKIDQ57tm2PLMs6j+P4Wik1w7ysqmpZ1y1TeOM+Rn0ooG75wbMqiiJh53QymQx6ruv2aXhA2BUtxzQzCKtbIwurVqsqgsdVWd6iNmTdvCzL39aDnzx11gU6jrNJy33CLjRNu2R4R/0Zz2hgjhENGqUeGilvwIAPkA1f8glfnGM46QJptk7gjmmaR4QOGY4w3RPkSqkERqFUiL6KNH0CG2aQQuKiPjwnSXLI1/X/AJ9NXHKbyl6JAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/d59bee18c4759abe2dd64a3d262124d5fd801889-1400x340.png?w=804&h=195&q=75&fit=max&auto=format)

Multiple typed arrays can share the same backing array buffer

When emscripten emulates C++, pointer loads become typed array reads, pointer stores become typed array writes, registers become local variables, and so on. ArrayBuffer sharing means that “casting” between pointers of different types automatically works:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAIAAAC9o5sfAAAACXBIWXMAAAsSAAALEgHS3X78AAABKElEQVQoz32RW5ODIAyF/f+/sR1tF8Rw0RLkjrqxdh+3ZxiGh3zJOaGLdqnRl5xrypXuWrbW9m07jqOWsmg9cs7YyEchJgEAUilrba2VCrpqIOsJlUKtg1HxNSe/ErbveysFZw3jyWltnMMQQgwh50QDTjjPMkhuYUQFXoPTMjhs9YTJiwFgwzAyPmvjV5dSzCmRzdPdvnfFu+Qw+rWkSCfFcI2lxiVlOcLj3vP+Bxi8aDhaZy1a6/2ZtNtapTbbu5q0/z0+sJiG2/15e4heGEG8MkrCNGkpqUt3/C+y8DJ64lxNCmf0uJLBsK5IsjZ4/w1ujf7BB+cIoD3F+Em7kd73N7iUQt7WZSa3UoJS2qFr7z1f6b7BKSXKtggu2fMxDIxxtHjBl34B2toGVdXrmGAAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/ea5f2a75d8da1267ee91d69da955d69a683952d6-1312x566.png?rect=1,0,1311,566&w=804&h=347&q=75&fit=max&auto=format)

Translating C++ to JavaScript using emscripten

This JavaScript code above probably looks pretty weird. It’s using asm.js, a restrictive subset of JavaScript that’s designed to help the JIT run code as fast as possible.

Things to notice about the code sample shown above:

-   `$value = +$value` tells the JIT to assume that $value is a double. Most modern JITs use this information to omit type checks in the generated code.
-   Stack space is reserved using the “stack pointer” called STACKTOP. Addition is done using a bitwise-or operator because that allows the JIT to use integer wraparound semantics instead of having to generate additional checks and deoptimization points in case the addition overflows outside signed 32-bit range.
-   Math\_imul is a special function created for asm.js that can multiply two 32-bit numbers and return the lower 32-bit half of the 64-bit result (basically mapping to the x86 “imul” instruction). Normal JavaScript multiplication operates on 64-bit doubles, which [don’t have enough precision](https://stackoverflow.com/questions/1848700) to hold the full 64-bit integer multiplication result.
-   The loop was unrolled! The emscripten compiler is actually just a [backend for LLVM](https://llvm.org/devmtg/2013-11/slides/Zakai-Emscripten.pdf). C++ is still compiled with clang and benefits from almost all of the same optimizations available to native code targets.
-   Pointers must be divided by the element size, which is why the write to `value` turns into a write to `HEAPF32[$0 >> 2]`. A right shift is used instead of a division so the JIT can use a single hardware instruction instead of needing to convert the result to a double and deal with fractional indices returning “undefined”.

That last point actually turned out to be relevant to this bug. An [unaligned load or store](https://www.kernel.org/doc/Documentation/unaligned-memory-access.txt) is when you try to access memory at an address that’s not divisible by the element size (for example, attempting to load an int from a pointer that’s not a multiple of 4). They are undefined behavior in C++, which means the compiler is allowed to do whatever it wants. Sometimes it just works and sometimes it causes a bus error. In emscripten’s case, the right shift operator effectively rounds the pointer down to the closest valid value, so the load or store is actually done somewhere else!

The emscripten compiler has a debugging option called [SAFE\_HEAP](https://kripken.github.io/emscripten-site/docs/porting/Debugging.html#debugging-safe-heap) to instrument your code with checks for this and sure enough, turning it on showed an unaligned store inside the FlatBuffers library. Finally! I [filed an issue](https://github.com/google/flatbuffers/issues/226) with the FlatBuffers library and tried everything I could think of to fix it including:

-   Putting `__attribute__((aligned(1)))` everywhere. This didn’t work due to [LLVM bugs](https://clang-developers.42468.n3.nabble.com/Unaligned-loads-td2755128.html).
-   Using memcpy everywhere to avoid unaligned loads and stores. This didn’t work because LLVM tries to be clever and change constant-size memcpy calls into aligned loads and stores.
-   Using a custom memcpy everywhere implemented using the [volatile](https://stackoverflow.com/questions/3604569) keyword to avoid LLVM optimizations. This didn’t work because FlatBuffers hands out raw pointers, which makes tracking down all access points in existing code very tricky.

I finally gave up and tried fixing the FlatBuffers library itself. This involved digging through emscripten’s extremely verbose generated code and mapping it back to the original C++ code. This can be challenging to say the least, especially when functions have been inlined and nested compound objects have been flattened into array accesses. The problem ended up being in the reallocation code for the main buffer that FlatBuffers grows as it writes out a file. The buffer is filled back-to-front so that the last object written out can be the first object read back in. Attempting to grow the buffer by an odd size caused unaligned accesses for data already in the buffer. [The fix](https://github.com/google/flatbuffers/pull/227) was really small: just round the growth amount up to the size of a pointer.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAIAAABM9SnKAAAACXBIWXMAAAsSAAALEgHS3X78AAAA20lEQVQY03XKXY+DIBCFYf//f9y0tnwoMsPAACKIrHftxW7y5E1OcqbSmk/ZueBtQAwbseOYy37Uo7bWr36N6z9TOUuIwcJmNrOiXQgNE2R2e/QlppqPftRR/zRxD5CssuJtxYx6RjU7/Qjbk0EEs7DBgqEFPpk7xxG/Ta6T2Y0g8Sb58nJ24unED8kHqXsKLzXrNa/bbrEiXd6Pjyn2iAk0KIVKghQgX6BnUG9QmpaNLSbEjFQoNE5XzuNjar3FmKwFCwB41xoAgwhEFPxe9tpqPet9O6+zj/7tF9o4Va+R7FgNAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/532a8b4a8c077eda8f816ef633c2099ee54e37c1-1400x436.png?rect=0,1,1400,435&w=804&h=250&q=75&fit=max&auto=format)

The fix to avoid unaligned loads and stores

And there you have it! Two weeks, three lines of code.

_Like working with cutting-edge web technologies? Figma is building a browser-based collaborative design tool, and [we’re hiring](https://www.figma.com/careers/)!_