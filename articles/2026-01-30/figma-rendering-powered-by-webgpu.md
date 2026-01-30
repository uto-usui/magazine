---
title: "Figma rendering: Powered by WebGPU"
source: "https://www.figma.com/blog/figma-rendering-powered-by-webgpu/"
publishedDate: "2025-09-18"
category: "design"
feedName: "Figma Blog"
---

When Figma Design launched in 2015, most rich design tools were still native desktop apps. Betting on WebGL—a browser graphics API originally designed for 3D applications—was a bold move. WebGL wasn’t widely used for complex 2D applications at the time, but Figma’s team saw its potential to power a smooth, infinite canvas in the browser. That early bet on WebGL set the foundation for Figma’s performance and real-time collaboration capabilities.

[![A 3D rendered scene of a tiled pool with a reflective sphere partially submerged in water.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAADTElEQVR4nHWU21NTVxSHc05u5kICjUNiQTIgBDIBEyPhREK4hEgEIRRKaS1pQWkQTW/SWgpKIgZaiqIUNKgUtDIyvNRqZ9rp9EX7l32dcyJWbH1Ys/fD2t/+rd/ae6lUKhWvhiAIqEURrUaDXqdj3z49BoMBo9GI0WBAq9UiiqKS9/pZVT5UqNVqzGYzNpsNu8PBwbIyKl0uajwePHV11Hp91Pr81PmOUOWqxm63K/A3gFUYTSYq3R4aI8eJ9PTROZigd2SMd0ZTxEdTnDydonPkU3o++Zy+M+N09g1wNNBASUkJZrNJEbQHaLIUUh1spTVxntj4NF1fzhOfWiZ++TZdl3J0pdfpubpJz5V1Bq6sMZy5yccXpokPniIgBXE4HIoVeaAgoC+wUlrfhu/Drwgks0ipJZqmNwjP7hCef0xs5S/eXX9G/OZvxOa3OZH9mf7sXYYu/8DA2c/wHwtRYLHkyxcEEY3RxH5PA67+FIdPz+IfX6RhcoPg3C+Erv9B9M5zejee0738Ky3ZLYLp+zSm7xHNrNL+xSXczRGMFusLP+Wu6vVYD7mp6ErgG55COjdH47e3CS/s0Hbrd2IP/6Z76xmRpUccS99CSq8iZVYIztzgcPICxd56NAajrC4PFDVazG87OdjShee9JP7RCRqnrhFZfkTHT085sfUnx9cfE/ouRzBzg2BmCWnmGoHJLK7BEazlVYiyh/mOqxBEEYOtmANSM5XxD3APJan/epbI6hax+09pX9uhaSFHKLtCePEeTQtrSDOLeM9fxBntxmg/gCB3ehcob3QWK8V+iUPxQapPncF77iLhhRwdm0+IbT4hktsmsvKQth8f0PR9jvpvstQMJXEEmtBbi3ZhLxQKguLBWzV1lHf24Rocxv3RGEcn0jRfX6c9t03r8gNCc6tKmXVjE0pOaWuMwsoatAbTXuBLH0udlLZ0UNH7PlUDCdyJs4pSb2oSz0iKqv4hnNGT2AMh5XI5X2cpRFRr9j5sJUQRfZFNKbss2o2zI66s8gUOKcz+2iNYyysxFjsUiFyRqNUp/v/n6+2qlJMKnBXYPD6Kqj3K3iADrEXKW1Xr9P+avxv/NxxeThq1Go3JhK7A8oqC1wFvnDJK/APiNN4w7FHXpQAAAABJRU5ErkJggg==)![A 3D rendered scene of a tiled pool with a reflective sphere partially submerged in water.](https://cdn.sanity.io/images/599r6htc/regionalized/815e18303296fed531b1319cf0513b3aae5501e8-2142x1576.png?w=2142&h=1576&q=75&fit=max&auto=format)](https://madebyevan.com/webgl-water/)

###### The WebGL water demo

In 2023, Chromium shipped support for WebGPU, the successor to WebGL. It allows for new rendering optimizations not possible in WebGL—for instance, compute shaders that can be used to move work off the CPU and onto the GPU to take advantage of its parallel processing. By supporting WebGPU, we could also avoid WebGL’s bug-prone global state, and benefit from much more performant and clear error-handling.

This wasn’t an easy upgrade, however—we had to design the new rendering backend with performance in mind, maintain compatibility with WebGL while adding WebGPU support, and roll out our changes carefully to avoid breakages. What follows are highlights from the major phases of the project.

## [Updating our graphics interface](#updating-our-graphics-interface)

When we started the project to support WebGPU, Figma’s engine already had an existing interface layer between higher-level rendering code and low-level OpenGL—but the interface mapped closely to the WebGL API. We had to implement several key improvements to modernize our interface and ensure that the transition to WebGPU would improve performance, not regress it.

### [Making draw-call arguments explicit](#making-draw-call-arguments-explicit)

WebGL relies heavily on global state and “binding” resources to global binding points, prior to issuing draw calls to the GPU. Initially, our interface did the same:

C++

```
// set up different types of data/settings that will be used for a draw call
context->bindVertexBuffer(vertexBuffer, ...);
context->bindTextureUniform(texture, ...);
context->bindMaterial(material, ...);
context->bindFramebuffer(framebuffer, ...);
// … set up any other resources
context->draw();
```

After `draw()` is called, the resources stay bound! It’s easy to forget to update one or more of the inputs to drawing and introduce a bug.

A major part of our project was to make all of the state required for each draw call more explicit and WebGPU-like. In WebGL, we implement this API by lazily updating the bindings’ state. So our new API looked like:

C++

```
context->draw(vertexBuffer, framebuffer, {texture}, material, …);
```

The `draw()` function’s WebGL implementation updates the bindings for each resource type only as needed. Since they are now function arguments, it’s also impossible to forget to update them.

This modified interface fixed a handful of bugs in our WebGL renderer before we even touched WebGPU.

### [Shader processing](#shader-processing)

**Shaders** are programs that run on the GPU and are responsible for actually producing the pixel output that is displayed on the user’s screen.

Figma’s renderer is powered by shaders.

In WebGL, shaders are written in a language called GLSL. But WebGPU uses its own new shading language called WGSL. Since we still need to support WebGL, we couldn’t just update all our existing GLSL shaders to use WGSL, but instead needed to support both in a way that was easy for engineers to write new shaders and maintain existing ones. So duplicating all our shaders and maintaining one version in GLSL and one version in WGSL was not feasible.

Further complicating this problem, our GLSL shaders were written in an older format targeting WebGL 1, which is structurally very different from WGSL (and from newer versions of GLSL). For example, in our GLSL shaders we specify uniforms individually, but later versions of GLSL and WGSL both require uniforms to be grouped up in blocks.

Fortunately, there are some open-source tools that can convert shaders to different formats. Unfortunately, they don’t support our older GLSL shaders. So our solution was to combine an existing open-source tool with our own custom shader processor. We maintain our existing GLSL shaders, written in WebGL 1–compliant format. The shader processor then automatically handles translating them to WGSL. This involves parsing the shaders, making the necessary translations to convert them to a newer version of GLSL, then running the open-source tool [naga](https://github.com/gfx-rs/wgpu/tree/trunk/naga) to convert them to WGSL. The shader processor ultimately generates both GLSL and WGSL and extracts some important information (e.g., the input types and data layouts) for use within the Figma app. It also supports some features like file includes for better code modularity and reuse.

### [Uniform buffers](#uniform-buffers)

**Uniforms** are like global variables that are passed to shaders.

For example, you might supply a color as a uniform to a shader, so that you can compile a shader once and use it for drawing many different colors.

While WebGPU enables new performance optimizations, just moving from WebGL to WebGPU by itself isn’t guaranteed to improve performance. In fact, there are many ways to implement WebGPU support that might make performance a lot worse. One of these risks comes from the different ways WebGL and WebGPU handle uniforms.

In WebGL, you can set uniforms individually, one at a time:

JavaScript

```
const locationAlpha = gl.getUniformLocation(program, "alpha");
const alphaValue = 1.0;
gl.uniform1f(locationAlpha, alphaValue);

const locationTransform = gl.getUniformLocation(program, "transform");
const transformValue = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0];
gl.uniformMatrix3fv(locationTransform, false, transformValue);
...
```

In our graphics interface layer, we mirrored this WebGL API:

C++

```
material->setUniform1f(ALPHA, 1.0);
material->setUniform3fv(TRANSFORM, transform);
context->draw(material, ...);
```

In WebGPU, all uniforms must be supplied using a uniform buffer. Rather than setting uniform values individually, we have to write uniform data for multiple uniforms into a single buffer and upload the data to the GPU all at once:

JavaScript

```
// create a Float32Array with multiple uniform values
const uniformData = new Float32Array(sizeOfAllUniforms);
// write data into the array at the right offsets...
uniformData.set(0.0, offsetOfAlpha);
uniformData.set([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0], offsetOfTransform);

// set up a uniform buffer
const uniformBuffer = device.createBuffer({
size: uniformBufferSize, 
usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
});

// upload the data to the GPU
device.queue.writeBuffer(uniformBuffer, /*offset*/0, uniformValues);

// now we can use the uniformBuffer in a draw call
```

Naively, we could follow these steps every time we call `setUniform`, and our existing interface would be compatible with WebGPU. However, we expected that this would regress performance, because allocating GPU memory and uploading data to a buffer are both expensive operations.

Instead, we decided we would need to batch uploads together, by setting up the uniforms for multiple draw calls, uploading all of the data at once, and then “submitting” all the draw calls in the right order. So, we updated the API to account for this:

C++

```
context->encodeDraw(uniformStructData, material1, ...)
context->encodeDraw(otherUniformStructData, material2, ...)
// encode more draws...
context->submit()
```

When using WebGPU, when `submit()` is called, we upload all the uniform data for all encoded draw calls to a single buffer, then execute the draw calls by providing offsets into that buffer for where to find the uniforms.

When using WebGL, we just call the existing individual uniform functions.

By updating the interface to support managing uniforms in this way, we reduced the risk of regressing performance with WebGPU.

## [The core implementation](#the-core-implementation)

Once we’d made the necessary updates to our graphics API interface, we began actually building the WebGPU implementation of that interface.

![A diagram of GPU vertex buffer and texture management with C++ implementations feeding into WebGL buffers.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAACl0lEQVR4nK2Tf0zMYRzH+1NUNpVrJiONqduxfqIbGqbNJhtDjsRsTT/kLi1uRNlajJqIjaurUA0xs6mF/Khu/SI/cmZDskRX3eUuro67l32vTlf9Z/5473me7dlr78/zvN8uKML5F9mchJNcxl1MXToihUPLIFWQ4zwG+60I55d8ZLVNAh5chu14FL9zt2PNj8V6cjOWo+sxZcQwkLkX47EdDKevwzYKNSaFoI2TUL8tgGZZIF3xQVjkYXawC4owbIdWYFElMKgpxvTyJj+rzmA4n4b2nIrmy9W0F1yhNzMeszwC8/5QtLsXcyJiDtH+nsSJZ3Jr40L0yaFYHUCrMpIfFUfQfXrC1/5XGJ5d56v6NHWqh9y++pFHRQ10Zh9CnyKlPzGYBpmErYE+zHBzJcDbnfw1fnxLCrGP74JgVbkKc7kSQ0ct/X1tGFvK0RXm0KSqoeraexrUdXzJTsMkl2JKDqFxh4SdYhGzPKYQ5OPOhbV+9IwBw7EdXonlaho/3t1jsLsBs0aN/lIW7aq7aMq1vCx+gC5bzlCqlOEDobTtlJCwRITYayqRvh4URc2nVxg59a/DSIYqlAx01KLve46ptYJe9Slai+5TU/6BxpJ6unPSMcqlGAWHMgmxYhGzp7sSLBIcznN2OAI038ig73M9PYZ2vr+oRFeah0b9mDtlnTwtaaIrR4khRYpeeMPtErYsEuE5zZUALzfyV8/lW6ID6PjlwkQGG0sxvb6FuTqPgYJ03hUU0aKq4c3FMvpP7GNIEcFQSijauMVkLfdlg/8MdgV4Uxm9wPmXR3N4LAprbgzWs0ION9lzOGjP4R6MGTIsE3L4Nk6CJiaQFpl4Yg6dqzO+Efb9hJY4JLgRRhTWyU35j13+Az6ys91WAaR8AAAAAElFTkSuQmCC)![A diagram of GPU vertex buffer and texture management with C++ implementations feeding into WebGL buffers.](https://cdn.sanity.io/images/599r6htc/regionalized/8985c3077ce0b56da8b424ae2a2c4f9c728412e5-1608x1072.png?w=804&h=536&q=75&fit=max&auto=format)

The graphics interface and WebGL implementation, before adding WebGPU

![An extended diagram showing both WebGL and WebGPU C++ implementations of GPU buffers and textures.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAAC1ElEQVR4nH2T609TWRTF772Vvm4rlNvWF7b0RTuU0UhVRCwtlCKNQKkadUSjRtGIDxCqCKigCNYqiYAioAbx9UWNJr4S4yfns3/Tb3KtaCUz82Fln71zsrLOXmcJgiCwCFEUf+LnXD1LeVB7Ub0rIP2o+RzCfxGq0Jh0aEuL0QVWoPPbv1et24rRZmCVVcJXIuBaJbBcFpCkPEKNRkORpRCPz0V5RQBvmQvFrmAKrkY5sRX7pTi2vnpsgw0op7fhjK0lWaeld59IR6vIOq+AXptTLEiShNFooLpmE4NXe5iczXB5JE20IYwjsp7g2AFCC2fZMNdJ5fwZKsaPENqznu7dZp6dM3CnQ0/0Tw2y/odKldBklmnYHmFiJsOr9wtMzWVpTjYRqq3j8NBNemde0DX5mN77z+kYnWBnW4IbzQ7+PlHKy/YSWgImzDopp1B9coG2AEdpCXXxMK2pBPXxMF6fm1AoQjo9TfbWR0bH3nIz+4H+gXnaE21kYh6+7g/wMumhxVuEWatBypmZM0Ov11GsWLCvsFKsFCGbZNaU+4l2HqV5+CKJwfPsGOqjvvsk1bEQx6MK9/YoXGu2sNWtx6hVjVyiUFWW3JkgFq/F43NjrfLiGG7BPXsA1+RfuGfacd5I8UfKz7GkganTBQwfWkZ1UMKoW7LDxqY67s5lefPpKdMPb9PSlsAX3UTNWCeNC8PUzw4Qf3yF2vFutu2uoi9l4XVXIfePLCcW1CLrxDyXZQM14SouX0t/Jx26foFYPMKWcCPpq4/IPvjCyNQ7MrOf6c+84GBqF3d2ePh2rIx3e90k/YWYdXk7/P0f+vH6XNhsVsoDGzl+eISB9Dznu2bo73nEqY5btNbE6dns5EmTm/GIk9oSM8YClXBJUhYNWqwmuRCnI4DfV4nPu4EybyUuZ5CVxTY8FgMhu0yF1YBiWIbmV1z/P8u5XsqDiKjOhX/P8j9jTZWaDblBPQAAAABJRU5ErkJggg==)![An extended diagram showing both WebGL and WebGPU C++ implementations of GPU buffers and textures.](https://cdn.sanity.io/images/599r6htc/regionalized/ca272185758a3d584fe51bcb2a7cc78d51b40fb0-1608x1072.png?w=804&h=536&q=75&fit=max&auto=format)

The graphics interface and both WebGPU and WebGL implementations

The existing WebGL implementation consisted of a few different classes, each wrapping some part of WebGL state.

Since we’d previously invested time to update each of these interfaces and functions to map more closely to WebGPU resources, we were able to save a lot of time during this implementation phase.

But how do we actually use WebGPU?

Our renderer is written in C++. We compile this C++ code to WebAssembly (Wasm) using [Emscripten](https://github.com/emscripten-core/emscripten), in order to use it in the main Figma application. But we also compile our C++ renderer code into a native x64/arm64 application used for server-side rendering, as well as testing and debugging. So we needed a way to write code using the WebGPU C/C++ API and have it work in both cases, with minimal per-platform branching.

[![Abstract illustration of layered red and yellow grids with black shapes, overlaid by a central multicolored form.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAQCBQYH/8QAIxAAAQQBAwQDAAAAAAAAAAAAAQIDBAUABhESEzFRYRYjUv/EABcBAAMBAAAAAAAAAAAAAAAAAAECBAX/xAAgEQABAgUFAAAAAAAAAAAAAAACAAEDBBETURIhQYGR/9oADAMBAAIRAxEAPwBC4iWFkFW1gGIUhwDowkI24D35OT0lIuI7ojR5qkQ1r5OtpISD53GPa2ecEp9zmorbIQgk77A9xldXAfJauPt9L6glxP6HvMiMb3GHKukAHQRMLb1r0tVGmaklBbtXaoYiFZDaFLAIGGdkgUFS1EaSivjhIHbjhjWYmUL48C3jL//Z)![Abstract illustration of layered red and yellow grids with black shapes, overlaid by a central multicolored form.](https://cdn.sanity.io/images/599r6htc/regionalized/1edca5220810676df804e0c57838ff13b3cee1a9-3082x1657.jpg?w=3082&h=1657&q=75&fit=max&auto=format)](https://www.figma.com/blog/the-infrastructure-behind-ai-search-in-figma/)

[Read more](https://www.figma.com/blog/the-infrastructure-behind-ai-search-in-figma/) about one of the features built on top of our server-side editor.

For Wasm, we decided to use Emscripten’s built-in WebGPU bindings support. This means that C++ WebGPU calls ultimately end up using the WebGPU browser API in JavaScript, even though our code is written in C++. We also had to write some of our own custom C++/JS bindings in cases where these built-in bindings weren’t performant enough.

![A flowchart illustrating how Figma’s web and native apps compile engine code with WebAssembly or native and connect to platform graphics APIs.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAACqklEQVR4nIWTS09TURSF+VHGkSYOHPmIMYwFFI2KKCgBkQIij6hRkSJtgXL7AG5pKVwktEBLSqkgpQ9629sXBQq2IOhE5Rd8hqoxisTBykrOzvnOSvZZRSGjwr8UNCgsDyRY0CWZ16aY1yVZ6E0WzoLH3AkZFYqOgH56wKAwrc7Q15xH/WinoP7mHE71WmH2X+DqUIK4lCHl2CTt3CDp2GDJlsPe+xnzy32E1jyDbR9w96wVHg2bDhU/HhgfWyMf2ufTxjf2Ml/ZTX8hlz4gmzgg5t1lWggx0uVh9I0bSetiXONC0riY6fXxXogcBSpSmog3zYxDxmZdxWqJYrNGcM9EWXAFePlG4KqqkdLGJsqbWyhrbKakQYWqTY1D5/0NDBpiP6Jbowxp7Fwvb+TCxWrOn6/m3MUKbt9S0aUe4FprEyeryjhdW8HZ+mrO1FVyorqM4roarN1Own8DwzYFyThNS9MrKm+ruHHjPjcrK3jc8gSN1khZWwOn6ku40H6H4qf3udRxj1MNpVyur0LsnvoN/BU1JmVY9W7inJYRbe8wiHMM2t04Z4M4p/zUv+7kyrO7VOlqqNM/5EFvLSUvKqlofcxYj+svoEkhLq2jLOZwzkUxjXsR7B7MEz7c80kCnnXshln0PcOY9SLDgoUhvYheO4S5W2Je7z+6FHkkhTy1jkeKMWEJIFlWmBwJ4nsbR57MEBIVVkwygeEoATFacP+gjN8oEzTG/vGxTQpLQorxzi2E9h307bsYOvJMqrMsG5JExARpxyZZX47sYo6tdzkyM1vIYur4phzWTOzYpqfhI92P9tCodhl9nmWpP05EjLM2m2V7eYdtf55t/w7rc1vIluTxwBUhjq8viUebwqNN49GlWOxPFKoWNiuFlDFbiuhPHcLC5j/b8h1k5B6xWUsGXAAAAABJRU5ErkJggg==)![A flowchart illustrating how Figma’s web and native apps compile engine code with WebAssembly or native and connect to platform graphics APIs.](https://cdn.sanity.io/images/599r6htc/regionalized/1c78fb3f34d8f36cf171ed844fba3567dcb737bc-3264x2176.png?w=1632&h=1088&q=75&fit=max&auto=format)

How our rendering code interacts with Dawn and is shared between our web and native apps

We’re now working to update to use Dawn’s [emdawnwebgpu](https://dawn.googlesource.com/dawn/+/refs/heads/main/src/emdawnwebgpu/) bindings, since Emscripten’s WebGPU bindings support has been deprecated.

WebGL supports synchronous pixel readback, but in WebGPU it’s only possible to read back data from the GPU asynchronously. This is a major API change that any existing WebGL application will need to adapt to or work around when migrating to WebGPU.

To support using WebGPU in native builds, we incorporated [Dawn](https://dawn.googlesource.com/dawn), the WebGPU implementation used by the Chromium browser, into our build.

A benefit of this setup is that both our Wasm and native app use Dawn for translating WebGPU into lower-level graphics APIs.

There were many more differences between WebGL and WebGPU that we had to account for throughout the implementation process, including differences in internal coordinate systems, error handling, and sync versus async readback.

In WebGL, checking errors is synchronous, and we’ve found that checking errors too frequently can tank performance.

In WebGPU, errors are reported asynchronously and contain helpful error messages.

## [Shipping WebGPU](#shipping-webgpu)

Once we had a working WebGPU implementation in the Figma editor, we began to assess performance using our internal performance testing framework and benchmarking against our existing WebGL baseline.

[![Abstract artwork with curved yellow and purple stripes against a green background decorated with sparkles and line accents.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAMFBAb/xAAgEAABBAEFAQEAAAAAAAAAAAABAAIDBAYFERIhMTJB/8QAFgEBAQEAAAAAAAAAAAAAAAAABgIF/8QAHhEAAQMEAwAAAAAAAAAAAAAAAQACAwQFESETMVH/2gAMAwEAAhEDEQA/AMNOtLcssggaXSPOwC77GcYOnSme9xdOPkDsBVMRoVYdLZNHAwSu9dt2q/6j7KnmJxoBY9oskcTW1Eu3djwJfFCa47uJPqFZKSr/2Q==)![Abstract artwork with curved yellow and purple stripes against a green background decorated with sparkles and line accents.](https://cdn.sanity.io/images/599r6htc/regionalized/09806c923d0d457b1b5668a77e39924337a05c19-1632x919.jpg?w=1632&h=919&q=75&fit=max&auto=format)](https://www.figma.com/blog/keeping-figma-fast/)

[Read more](https://www.figma.com/blog/keeping-figma-fast/) about our internal performance testing framework.

We ran all of our tests across a variety of different Windows, Mac, and ChromeOS devices (we expected that the performance might vary a lot on different types of devices, and it did!).

![A test pipeline diagram comparing WebGPU performance results against WebGL baselines across Mac, Windows, and ChromeOS.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAACoklEQVR4nI2T6y/bURzGvdNfW9WKzVyG+ukQyfi1RacuyS6xMRK30mqZohkrY1okVCySuXSzJUgwLOlcshezesUSL4eX2/6iz9JfTVh2e/HkPDk558nznPN9YpTOIv4LbWZUjigiXOk0o5LXy+di/nRZaZMQGgtQ2YxcdZeR460if6BGRoSneipJ7y1H9FaS7LES1178G0FXFKpWE8rbOcQWpqGpyKHkaQv9q/NMhlaZDK3QvzJP3awH91o7Yx96qA02cK3HirLtomCrCaFZksXibWbUJSKKVB2am3osPR4GXoZ5vnTC1OIJA8EwzmCA14c+9r9PMvTeTUZvhZxMFhQiYvfyUBRnys7iG4yorQZi9YmopCzyHJ3UD+/yaOyIjtEj6p/t8CAwQmDPy8bJCF3rLtIel585dBUhNEnElYjo9MloJT3a2kLiym6gyLqCxixi6etkaHGb6fVDGYOLW7QE/bLg2hc/7rdOUs8FI3GbJHQl2aRmpZMkGUisLURbakB1PRFtgUhxt4e+2X0m3pzK6JsJ45gPsHAwTPhbgMGQm/S+n5HPHKotIgliCjpjFgl1EYcG2aFaEsl3umny79I9fkTX+BGNvh2qA34CH72sH/txr7suO4y8oaIqD4VFj/JOLvGNRuKsBhSZicSbREqfdOJb3mZm8zMvNg8ZXtrC/mqEqf1+3p2O0r3R/kvktiKUdhOCTUJpN6NpMaOxZKM+i1zk9uCZ/sRY8JjR+WM803u0zk6wcOAj/HWSwVAX6Rd/+fIsFkfn8G4ugikDVXkeKU02Clxz3OpYw9KxKnPJ241z2Ylvt4vquQaSeqwIf2uK0GJEaCxEaDaitpehtd8nwfGQBEeNzHXtlXJMvbdCHurfN+WfiHb4nEee6nw/2uUfPnPhf+MOiqIAAAAASUVORK5CYII=)![A test pipeline diagram comparing WebGPU performance results against WebGL baselines across Mac, Windows, and ChromeOS.](https://cdn.sanity.io/images/599r6htc/regionalized/bb920240e38f9a991e1c9fda0f99f5cdaf83e5e1-1608x1072.png?w=804&h=536&q=75&fit=max&auto=format)

How we automated performance testing against multiple different device types

From there, we identified the scenarios with the largest regressions and began to work on tuning and optimizing our implementation. We worked on optimizations like caching and reusing `bindGroups` as much as possible, and finding ways to better batch draw calls into `renderPasses`.

Once we’d fixed all the major regressions, we began the production rollout, continuing to monitor performance metrics at each rollout percentage, and breaking down the data by GPU type, OS, and browser. We saw a performance improvement when using WebGPU on some classes of devices, and more neutral results on others, but no regressions.

### [Deep dive: Windows device compatibility](#deep-dive-windows-device-compatibility)

When initializing WebGL, Figma runs a series of tests that try to render pixels to a texture, read the pixels back, and confirm that WebGL is working correctly. These tests allow us to detect cases where a user has a buggy graphics card or driver, and try to work around the bugs.

Our initial plan was to write some similar tests for WebGPU, to detect cases where WebGPU support is buggy, and therefore use WebGL instead. Unfortunately, this sort of test requires reading back data from the GPU. Because WebGPU only supports asynchronous readback, this could increase load times by hundreds of milliseconds, which wasn’t acceptable.

We came up with a plan to work around this by rolling out WebGPU support in two parts:

1.  First we would ship a change to run a series of WebGPU compatibility tests on devices in a non-load-blocking way, after a session had already started.
2.  From there we could identify any potentially buggy devices based on the tests, and blocklist these specific devices prior to rolling out WebGPU.

These tests also turned out not to be good enough. After we started our rollout on Windows, we began to see cases where WebGPU support could fail mid-session. For example, it’s possible for the WebGPU device to be lost, but for the application to be unable to request a new one (`requestDevice` or `requestAdapter` start to throw errors). This meant that running tests on file load wouldn’t be sufficient.

So we pivoted again and built a dynamic fallback system where we could start a session with WebGPU-based rendering, and fall back to WebGL-based rendering later as needed. The system works similarly to how we already handle WebGL context loss (and in WebGPU, device loss), but instead of re-creating the context/device using the same backend, we swap backends. We trigger the fallback if the asynchronous tests fail, or if we get any other kind of failure related to WebGPU mid-session.

![A flowchart of Figma app initialization deciding between WebGL and WebGPU with fallback handling.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAACTUlEQVR4nH2T20tUURSH997nMhf3OWcuzk3HZpz7rRo1tcxSxJKUSBMfQk3zITJDDMKigR4sIugl6A/+Ys5JM1EfPvaGvflYi99aQghBH3kJwZtEyusRZ399rhcqpTCMqzBQhrooFZiGIK4FuaQgFRNkE4J0XKKjHq5bw3Fq6IESrtNA61EcXfUZiI6gdYlwKIWUZiBUSuBEBXfbko0FydKUZO2hZOWeSaPUpdXo0ax/plY+otM6oVo+pFHrUa9+ojCyQ6X0nkx6CdN0kVIFwqQrfEnvpeT1M8mHF5J36xbTUzOML/6mO/+L1s0eY7d+0qgd02l+p934Sqn4hnq1Ry77FMuMnRN6gvV5yZdXkrdrio+bksMNk7HFOsX9PW5sb5KsTJNITOB5bTxvDM+9jdZVPLdNNDKMkta/lr0Bwfy4ZG9F8nxOsv24376i/CDL4P4s8a1J7Hwcw7SwbYdotOhjmjoIRqn/Q7HNIIhKXnAjIygNCQpZiZuNEunkCNfSGDqEaRq4bpVy6YDy6AFaly8XBuMRpG0ogXF6RizsrIuVcTAHNaFcjER+gk77hE7zG8nkDFoXCYfPpXw2h/ICQmANe7hPmrjLfVrEt+4Qu98lNTRLJrVAfniVRu2Iodwyth0PQrkw5QGyj8QuJ4nvTBLfnSSxO0nqeAHnURPLdfyqRvKrjHd/MFrYJOTP4lXCvxhemFAjQ6iZIdzOEpkuYBcTSLu/ISEcXSGdmsNzWxhGxF/Ta4X9KqWpAiwDGTL9u9+Bv+MWSkVQ0j6V8Qeed0JdOIwn7wAAAABJRU5ErkJggg==)![A flowchart of Figma app initialization deciding between WebGL and WebGPU with fallback handling.](https://cdn.sanity.io/images/599r6htc/regionalized/95afa8ada0f6c6f097c116d14857b216c46a0e87-3264x2176.png?w=1632&h=1088&q=75&fit=max&auto=format)

How we choose whether to use WebGPU or WebGL for rendering

Once we had the dynamic fallback system in place, we began to roll out again, this time blocklisting devices based on their average fallback rates (since falling back from WebGPU to WebGL can cause a hitch, which we’d like to avoid). Using this approach, we were finally able to complete the rollout.

## [The WebGPU future](#the-webgpu-future)

We’re planning to leverage WebGPU to continue improving Figma’s performance. For instance, we can now optimize blur rendering using computer shaders, and use WebGPU’s MSAA (Multi-Sample Anti-Aliasing). Submitting work to the GPU has CPU overhead, too; to improve performance further, we could take advantage of WebGPU’s RenderBundles feature to reduce the CPU overhead of rendering.

With a year of hard work behind us to unlock these kinds of optimizations, we’re excited about the future of Figma rendering with WebGPU.

[![Abstract digital artwork featuring colorful geometric shapes and the sequence "877A7A" on a green background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAADDElEQVR4nG2U3VMaZxTGvQVMW5sJTW3SmjZX2pnEDCKShBiLTigqGCEq7LLALq4rIF8LAnGBgF9V22nSJpl+zTTepdPkrpf9234dMFo0Xjzzvu+Z9zzznDPnOT1mYYRjmNpn2IZJsJ3EOgifeZ/NEf5Hz/Hlg9AIVnGUftnJgHiPIWmGYTXADXWG6/EpLkbuYhHsJ4kWYZReYQxL2IG5K35CaF1wcVNcxKWl8Ed0dPUH9uq/8aT2PfFchVvLQfoiY5jfqbdK4wwm/HwV9/KhePt9wv5HAVxzTwn6/iTn/4PDxF/8W/ubN81D9h8/ZTGjcS02gaXz386g6iVaUZnJSnwiTWAKdxOKY/SH4kxMvyR+26DhyvLav8U/6havSk0Oqg0KxSyTq0Guxe7zUcSJLe2jupchZizzWcyNKXxUdo9ZdPCx5mGwtIonV0eWBBpLEr8vNHmh1GjpBVqVEs1ymbyeYz4lMSh7cObnaTzXUXeSXJUnOwrb6nvMESdXSvOM/5LA/2ucpe0ghR2dg9LPFLUqoXSMtJ6kXmzyOPuczNounhWFKV2i+bKMtpfm825Ck+jgUsrN8P4sD148ZOEgQPKnLMbmFkJa486yj9BalFJ2l7z6lszKIUFtnZmCxpNnFdTtdwpDxwrbIyCOMqC5mDYCaDsK+mYSwyiyqqd4lImS1JMYpW6FCdw5kY39PHJd5cqpHnYGd4SByDiBxCK6qlBf1Wis65QbBnprg8pmnUqzQaZaJLAWPeph7iG1H/MstzSuxo9KPjU2l6V7OMRvCfoesOb3kVNkMnqB9VqF8u4myndN7lcUvlTc9IlO7Nk56s+KqNup90tuo1e0Y10a5WvvMJPuEQI+L3IggK5E0Y0yc60qA3oYS9SJOWxnSJtGriXxF2UuR8/OYQc2LGEbF4O3+GLexo2wm3HRx6y2hHdD46ahcikzi0VydFrUdspQws/1+PT5TunGBcFOX+wOVuUb+lem+DTloU+b4oJ8F7N41Py2r9te7hUcpzx+LuHxFjGJ9lPb5OxmOQ//AbnaPvLaxzpaAAAAAElFTkSuQmCC)![Abstract digital artwork featuring colorful geometric shapes and the sequence "877A7A" on a green background.](https://cdn.sanity.io/images/599r6htc/regionalized/e85478d82728490083efe8027723e309ed0cb3fd-2048x1536.png?w=2048&h=1536&q=75&fit=max&auto=format)](https://www.figma.com/careers/)