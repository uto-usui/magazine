---
title: "Canvas, meet code: Building Figma’s code layers"
source: "https://www.figma.com/blog/building-figmas-code-layers/"
publishedDate: "2025-06-25"
category: "design"
feedName: "Figma Blog"
---

Last week, we launched [code layers](https://www.figma.com/blog/introducing-code-layers/)

in beta, a new layer type in Figma Sites rendered by React code. Users can use code layers to bring the full power of the web to the visual canvas, building interactive experiences with forms, shaders, interactions, and APIs. At the same time, code layers act like other Figma layers in that they can be nested inside frames, used in components, and moved and resized freely on the canvas. Additionally, users can instantly convert designs built in Figma to code layers with the click of a button and add behavior using the same AI model that powers

[Figma Make

![A chatbox reads, “Create this music player, and have the disc spin with every new track to bring it to life.” On the right, a CD is displayed next to a tracklist.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAC30lEQVR4nFXT10+TURiAcf4XQQsyJEbxRoOAqFGcSFCGJoIVpFSGjH6lVG35PmniAqRDqLTFItiKRqlxE7fWHSRCGVpBonFcUCDh4jEtzosnJ+fml/fknBMmCQINYh1tp5rosLbSYbXSbrHgMJv/aW5vN5mwmUyhdS5jqJaGRo7rRERBIKy+piYEPX/8iIH+t7x5+ZwXXm+oZ14v3qdPePr4IY/u3aH3pocbVy9y09PN7R43ty+f59alLrodDprrjyIJasIMtbVccbkY/+jn+9cvvB8ZxOcb5HVfH73373P1xjU8notc6bbjtDVgaZYwN+poOXkI64mDOBp1OBpEmvSHkFTCL9DtZszv58f3b3yeGGdoeJiea9epEyUqKysQqko5oMgjL2crmVvWsG1DCunrU8hIS6FwVzpHtEqO61RIgoowg0bDZZeLj34/gcAkk4FJRv1+2s91snevnMKCfLS1AsX7CkhNWkl8TDSxUZHEyGTERkayOjWRaqEIg6hBVP8CgxN+GhtjenqawNQUwx8+YHM6KVIUIghltJ9txWwxkpmRQWzUQiLDI5DNi0AWHkFi0gpKVQokqRbx94Q9bjcT4+MhcDIQwDcyQmubFbl8N2UlcuwOI2dsrWRnZREXHUPU/AV/SkxagbJKgSgGQeF/cGZmJgS+GxrEbG4kd/sW8nPSEQ9WoCpXkrYqmaUx0STExZIQH8/iuDhSV6+ktFqBWKf5C3ouXODzxASzs7OhI/f7BrDZminP20z5tkT02aloNyyjdLkMxfIFFKxNYOfGZLauTyY3ZzNqbQlHgqA6+A41Gs7bHfS9eoV/dJShQR93Hzyg3W6kSZOPuWgTTvkaXFnLcKUvomvHEqwF6zAos1AX56KukKPXVSIdVs/dcvCnNNXX47BY6LTZcFrPcPqUkZMGkRPaAzSrlbRUFdJWshN78Q7a9mdjqtjDsepipOr96IUy9JpKxBoVokrFT7ilS4CH1gylAAAAAElFTkSuQmCC)![A chatbox reads, “Create this music player, and have the disc spin with every new track to bring it to life.” On the right, a CD is displayed next to a tracklist.](https://cdn.sanity.io/images/599r6htc/regionalized/a1f0928acf4128e33ad6f4dd573bdaf3a3e2c893-3840x2160.png?w=3840&h=2160&q=75&fit=crop&crop=focalpoint&auto=format)

### Introducing Figma Make: A new way to test, edit, and prompt designs

Today we’re introducing Figma Make, a new prompt-to-app capability to help you quickly explore, iterate, and refine—whether it's generating high-fidelity prototypes or getting into the details in design and code.



](https://www.figma.com/blog/introducing-figma-make/)

.

Building code layers in Figma required us to reconcile two different models of thinking about software: design and code. Today, Figma's visual canvas is an open-ended, flexible environment that enables users to rapidly iterate on designs. Code unlocks further capabilities, but it’s more structured—it requires hierarchical organization and precise syntax. To reconcile these two models, we needed to create a hybrid approach that honored the rapid, exploratory nature of design while unlocking the full capabilities of code.

Doing this successfully required solving three challenges:

1.  Integrating code layers and components naturally into Figma's ecosystem
2.  Building a powerful yet easy-to-use IDE to power code customization
3.  Enabling multiplayer collaboration between designers and developers

## [Code as a material](#code-as-a-material)

Code is traditionally structured as a filesystem—a tree of directories, with code files as the leaf nodes. While this model is great for development, it’s difficult to square with Figma’s spatial 2D canvas. For example, objects can exist anywhere in the visual canvas, whereas code files exist in a specified location in the filesystem. This mismatch creates practical challenges for the workflow: How do you copy a visual layer when it corresponds to a specific file location? Is the source of truth the canvas or a filesystem? Should cloning a code layer create an instance of it—as is the norm in code—or create a forked version, which is how duplication in Figma traditionally works?

We knew we needed code in Figma to feel familiar to designers _and_ developers, which meant that users should retain the ability to freely manipulate code layers on the spatial canvas. The solution we arrived at was to implement code layers as a new _canvas primitive_. Code layers behave like any other layer, with complete spatial flexibility (including moving, resizing, and reparenting) and seamless layout integration (like placement in autolayout stacks). Most crucially, they can be duplicated and iterated on easily, mimicking the freeform and experimental nature of the visual canvas. This enables the creation and comparison of different versions of code side by side. Typically, making two copies of code for comparison requires creating separate git branches, but with code layers, it’s as easy as pressing ⌥ and dragging. This automatically creates a fork of the source code for rapid riffing.

We chose to support React because its component model aligns closely with Figma’s notion of components. Components in Figma are reusable and flexible building blocks that designers use to construct interfaces. React works the same way—developers combine reusable React components to build screens and apps. Additionally, React’s props map directly to Figma’s notion of component properties, so we linked them together; you can define properties in code, and then edit them visually with customizable controls like toggles, sliders, and dropdowns.

![A 3D cube UI component with auto-rotation and zoom sensitivity enabled, shown in a dark preview panel with interaction instructions.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACTklEQVR4nI2TXUhTYRiAd5db84fQzU1y4XTTcCoo4c8m/fuHF5E3VhSkUprWRWkXmWF1lV1kFIGmFAll1EVXUkQgBkWgYgkNFCwITdu06X7OOdt44hzXMayLLh4+vveFh/d9v/fTLCwuMTP3BffM7H8zO/eVJY+HtbU1gsEggiAhSVEikQiakTejdPf0cqa9i9b2KyptMh1dtHVsxBQudHHtRi9j7z7w0+cjGBTw+QT8folwOILmdt8DXBV1pGYWkppVpGLKKsJsK8Jk24gpWAtxHTjE0PBzvMvLCILI6qpIIBAT9tzpJ7+smjiDnThjtoLWlIt+RzGJtnISMkrQmR1qbkuKHUfxQQYePcHj9SKIIqGQoIglKYzm5t1+Cspr0Jp2oosRby0jubSBtKpLmFynSMx0qjmtMYe80ioGh4b54fEqM/yNLP630LYHQ0Un6UcHSavuJjF731/CgaGnijAQCKjIVWp6NgnlU291ss3VjLHmKinlrcRnulRhnDEHR2klA3KF3vUKQ6EQoigSDoflGfZR4KxEa8hCZ7ShNdrQmXPZai1Db9+PPsOJ1py3aYYV68JYy7JQkuRHCaO5de8+JXurMKTbMVrsGCx2ktNzSLI4SLDkk7SZ7Q527a7l4eNnyi7KrcpCWaYIX4y84uLlbo43NXMixrHGFuoaWqg9eZrDja3UN53jSIz6xrOc77zO69G3LK+sEAzIiy1sCL/NLzDtdjMx9VFlfOoTY5PjvBx/z9jkhHKf+IPpz27mvy/iD/iV2ck/JBqNKvwCe2o0BRW2udUAAAAASUVORK5CYII=)![A 3D cube UI component with auto-rotation and zoom sensitivity enabled, shown in a dark preview panel with interaction instructions.](https://cdn.sanity.io/images/599r6htc/regionalized/c32acfbaab20dd02392f6c805d9dc22b940064fb-1590x867.png?rect=0,1,1590,866&w=804&h=438&q=75&fit=max&auto=format)

Code layers look just like normal layers in Figma. Properties enable flexibility and reusability.

## [A batteries-included IDE on the web](#a-batteries-included-ide-on-the-web)

While code layers can be created and edited entirely with AI, we knew users would also want to edit code directly for full flexibility. To make this seamless, we built a modern code editing experience into Figma, starting with our choice for the core engine for the IDE: [CodeMirror](https://codemirror.net/).

CodeMirror provides an extensible base for web-based code editing, allowing us to define extensions for features such as color themes, find-and-replace, and line numbers. In many cases, we needed to override default behaviors to integrate the code editor into Figma; for instance, we replaced CodeMirror’s default undo/redo behavior with a custom implementation based on [our own undo stack](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/#implementing-undo)

.

We recognized early on that performance could become a bottleneck, especially for large codebases. IDE tasks like bundling and typechecking can be slow, and because JS is single-threaded, they can cause the UI to hang when processing large files. To keep Figma’s code environment feeling fast, we run most of the development toolchain in a Web Worker. Inside the worker, we use [esbuild](https://esbuild.github.io/) (created by Figma Co-founder Evan Wallace) for fast bundle times, and [Tailwind v4](https://tailwindcss.com/) with [Lightning CSS](https://lightningcss.dev/) for efficient style compilation. These tools are partially written in native code and compiled to WebAssembly, providing a significant performance boost.

To minimize dependency management complexity, we automatically install imported packages from NPM or an ESM URL. No need to initialize a package.json—just import the libraries you need and start building in a secure sandbox. Most packages will work out of the box inside Figma, including community favorites like [Motion](https://motion.dev/) and [React-Three-Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction?trk=public_post_comment-text).

![A Figma design interface showing a Three.js code editor with a 3D blue cube rendered on a dark grid background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACJElEQVR4nG2Tz2oUQRDG50l8AA8+g+ALeIh6UiR6EVQUT4LoRTyIIB48SLzkpBcvHg3+CcYsMZg/ktUQUCJZQ2KyO7PTXdXV3dP7SfWsiYKHohjo/tX3fV1TsPNwzoNJcnnxiCEixoiqqtFd38DshwW8fd/JfWm1i53dPVgiEBGstbDWoDaM/YGgsCwgEtRDRl0xnBF45xFCxFZvG1PTzzB55SZOXbiB05PXcPveQyytrmXQAZC0HKpagU5gSVBVjP6exXDfwFQWzILNHz08nprGybOXcfT4GRw5dgIT5y5hdq4DYwwoq2uLmGGIUVAQWHEY1ozBgDAsDUxNIBbs/trHzOtZ3H/0BBev38HE+au4dfcB3s11sLL2BRvfvmNQlodqmVG46MFebTsY47J97wNibOCcQ+/nNta66/j4aQWdxWV87n7F/OISnj5/gZev3mB7ZyfDVCE5QRGaBj5GsFq3Dsw+w1IaIaWUs9QBIUY0TYMQAja3epiZm8fC8ir2+n0wM5wInPcomtEIsUnZotomah9EYaORQkcHXavJZxn9skRZVdmuOtGBEiKKNAZaKxhUNkNFPJqsMmVVrbIE71NWLyJZlRYR5e+YnTZjYEw5u3JIeZ8ysGmBKbVAkQQRBUeIaNbtHv4LHCtsL/i8S8wuH9CsgmanPcRxlhE+hGzxf0DnA4pGc0lqR1/68JC1hFoV6wpRa++PRf1L/i59EB1kmPEbU+k2CigxEPsAAAAASUVORK5CYII=)![A Figma design interface showing a Three.js code editor with a 3D blue cube rendered on a dark grid background.](https://cdn.sanity.io/images/599r6htc/regionalized/f90786c147c922f3c559c3cadb795866b7458102-2151x1223.png?w=804&h=457&q=75&fit=max&auto=format)

The IDE for code layers comes with a complete TypeScript toolchain, including support for NPM and ESM modules.

## [Making code layers collaborative](#making-code-layers-collaborative)

Multiplayer collaboration is at the heart of Figma, enabling teams to work efficiently together to design and ship great experiences. Our [multiplayer technology](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/)

supports simultaneous syncing for many node fields, like position and color. But it had never been used for a field as complex as source code, which can potentially be thousands of lines of text.

This new requirement presented an opportunity to rethink our approach. The simplest solution for syncing edits is last-write-wins, where changes from each user overwrite whatever other users have changed. This works for short pieces of text, such as bits of UX copy in a Figma design, but breaks down when editing large source code files simultaneously, especially on slower connections. We also saw that this problem became worse when AI models made simultaneous edits to the code, creating additional conflicts.

**Operational transformation (OT)** is a conflict resolution technique that transforms concurrent operations to achieve convergence by adjusting operations based on their execution order and context.

So we looked for better alternatives, turning to classic collaborative text editing algorithms like Operational Transformations (OTs) and Conflict-Free Replicated Data Types (CRDTs). OTs transform concurrent operations so they can be applied without conflicts. They form the foundational technology for many collaborative text editors, such as Google Docs. However, they slow down when merging files with many conflicts, since all conflicting edits must be transformed against each other.

**Conflict-free replicated data types (CRDTs)** are data structures that guarantee eventual consistency by ensuring every replica converges to the same state regardless of order of operations.

Conversely, most CRDTs treat each character as an independent entity. This makes merging edits significantly easier, but results in a higher memory overhead. To process updates, the entire history of the document must be rebuilt in memory, even if there are no concurrent edits (which is the most common use case). This creates memory bloat and reduces performance.

Fortunately, a [paper published last year introduced Event Graph Walker (Eg-walker)](https://arxiv.org/pdf/2409.14252), a new algorithm with most of the benefits of OTs _and_ CRDTs. Eg-walker represents edits as a directed acyclic causal event graph. Its algorithm is analogous to a git rebase; it rearranges multiple divergent branches into a linear order. To merge concurrent events, Eg-walker temporarily builds a CRDT structure. After its resolution algorithm completes, Eg-walker discards the internal CRDT, freeing up memory. In the happy path of sequential, non-conflicting edits, updates are nearly zero-cost. As a result, it’s as fast as CRDTs at merging, but has minimal memory overhead like OTs.

![A visual diagram explaining the EG-Walker rebase algorithm using color-coded client sequences and text insertions.](data:image/png;base64,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)![A visual diagram explaining the EG-Walker rebase algorithm using color-coded client sequences and text insertions.](https://cdn.sanity.io/images/599r6htc/regionalized/5dc14e2b4b083c8552b74fbd2b1f5cafb0c705da-2112x3168.png?w=804&h=1206&q=75&fit=max&auto=format)

Eg-walker uses a “retreat and apply” approach to resolving conflicts, similar to git rebase.

Given the performance and memory advantages, we used the Eg-walker algorithm to build the multiplayer collaboration service for code layers. When a user edits a code file, the client sends a list of edits to the server. The server reconciles simultaneous edits from all active clients using Eg-walker, and sends back an updated list of edits, resolving any conflicts. With this architecture, the multiplayer service handles the most computationally expensive merging work for all clients, enabling fast initial load times and a performant user experience even for large filesystems.

## [The future of code and design](#the-future-of-code-and-design)

###### Inventing on Principle

Bret Victor, an influential writer, researcher, and interface designer, describes "a way of living your life that most people don't talk about." Watch [his full talk](https://www.youtube.com/watch?v=PUv66718DII) on finding your guiding principle—something you believe is important, necessary, and right—and using that to motivate you.

Code layers are just the beginning for code in Figma. We anticipate bringing even more direct manipulation to code layers to close the gap between code and design workflows even further—enabling users to seamlessly switch between mediums depending on what they need at any given moment.

In his talk "[Inventing On Principle](https://www.youtube.com/watch?v=PUv66718DII)," interface designer Bret Victor says that “creators need an immediate connection to what they’re creating…when you’re making something, if you make a change, or you make a decision, you need to see the effect of that immediately.” As we continue to extend the capabilities of code in Figma, we're guided by this idea: Rather than siloing design and code into separate tools, we should all be able to create together in a shared environment.

Code layers are in beta now in [Figma Sites](https://www.figma.com/blog/introducing-figma-sites/)

. We can't wait to see what you build!

![A stylized graphic design featuring a large gray flower-like shape surrounded by colorful geometric shapes and pixels on a green background, with "877A7A" displayed vertically on the right side.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAADDElEQVR4nG2U3VMaZxTGvQVMW5sJTW3SmjZX2pnEDCKShBiLTigqGCEq7LLALq4rIF8LAnGBgF9V22nSJpl+zTTepdPkrpf9234dMFo0Xjzzvu+Z9zzznDPnOT1mYYRjmNpn2IZJsJ3EOgifeZ/NEf5Hz/Hlg9AIVnGUftnJgHiPIWmGYTXADXWG6/EpLkbuYhHsJ4kWYZReYQxL2IG5K35CaF1wcVNcxKWl8Ed0dPUH9uq/8aT2PfFchVvLQfoiY5jfqbdK4wwm/HwV9/KhePt9wv5HAVxzTwn6/iTn/4PDxF/8W/ubN81D9h8/ZTGjcS02gaXz386g6iVaUZnJSnwiTWAKdxOKY/SH4kxMvyR+26DhyvLav8U/6havSk0Oqg0KxSyTq0Guxe7zUcSJLe2jupchZizzWcyNKXxUdo9ZdPCx5mGwtIonV0eWBBpLEr8vNHmh1GjpBVqVEs1ymbyeYz4lMSh7cObnaTzXUXeSXJUnOwrb6nvMESdXSvOM/5LA/2ucpe0ghR2dg9LPFLUqoXSMtJ6kXmzyOPuczNounhWFKV2i+bKMtpfm825Ck+jgUsrN8P4sD148ZOEgQPKnLMbmFkJa486yj9BalFJ2l7z6lszKIUFtnZmCxpNnFdTtdwpDxwrbIyCOMqC5mDYCaDsK+mYSwyiyqqd4lImS1JMYpW6FCdw5kY39PHJd5cqpHnYGd4SByDiBxCK6qlBf1Wis65QbBnprg8pmnUqzQaZaJLAWPeph7iG1H/MstzSuxo9KPjU2l6V7OMRvCfoesOb3kVNkMnqB9VqF8u4myndN7lcUvlTc9IlO7Nk56s+KqNup90tuo1e0Y10a5WvvMJPuEQI+L3IggK5E0Y0yc60qA3oYS9SJOWxnSJtGriXxF2UuR8/OYQc2LGEbF4O3+GLexo2wm3HRx6y2hHdD46ahcikzi0VydFrUdspQws/1+PT5TunGBcFOX+wOVuUb+lem+DTloU+b4oJ8F7N41Py2r9te7hUcpzx+LuHxFjGJ9lPb5OxmOQ//AbnaPvLaxzpaAAAAAElFTkSuQmCC)![A stylized graphic design featuring a large gray flower-like shape surrounded by colorful geometric shapes and pixels on a green background, with "877A7A" displayed vertically on the right side.](https://cdn.sanity.io/images/599r6htc/regionalized/e85478d82728490083efe8027723e309ed0cb3fd-2048x1536.png?w=2048&h=1536&q=75&fit=max&auto=format)