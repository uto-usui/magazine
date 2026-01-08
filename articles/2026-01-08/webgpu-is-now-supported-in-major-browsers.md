---
title: "WebGPU is now supported in major browsers"
source: "https://web.dev/blog/webgpu-supported-major-browsers?hl=en"
publishedDate: "2025-11-25"
category: "web-standards"
feedName: "web.dev"
---

![François Beaufort](https://web.dev/images/authors/beaufortfrancois.jpg)

François Beaufort

Published: November 25, 2025

Big news for web developers and users. [WebGPU](https://developer.mozilla.org/docs/Web/API/WebGPU_API)—the powerful API for running high-performance 3D graphics and general-purpose GPU computations—is officially supported across Chrome, Edge, Firefox, and Safari. This means the future of high-end, in-browser experiences like AAA gaming, complex 3D modeling, and advanced AI applications is now!

This significant milestone results from years of extensive collaborative development by the [W3C GPU for the Web Working Group](https://www.w3.org/groups/wg/gpu/), with contributions from companies including Apple, Google, Intel, Microsoft, and Mozilla.

## Why WebGPU matters

WebGPU isn't just a replacement for [WebGL](https://developer.mozilla.org/docs/Web/API/WebGL_API); it's a massive leap forward, offering a cleaner, more performant interface designed from the ground up for the modern web. It includes an idiomatic JavaScript API and a modern text-based shader language.

WebGPU unlocks a new era of high performance computing and graphics on the web, offering **direct access to modern GPU features** that were previously constrained by older APIs like WebGL. Its primary use cases are **advanced 3D graphics and rendering**, enabling richer, more realistic gaming experiences, complex data visualizations, and sophisticated editing tools right in the browser. Crucially, it also unlocks **GPU-accelerated general-purpose computation** through its compute pipeline. This massively improves performance for tasks like **machine learning inference** and **training** (running workloads like large language models), **video processing**, **physics simulations**, essentially bringing **desktop-class performance** to computationally intensive applications on the web.

Both [ONNX Runtime](https://onnxruntime.ai/) and [Transformers.js](https://huggingface.co/docs/transformers.js/index) already use WebGPU to enable high-speed, local model inference and computation into the browser. This advancement unlocks new possibilities for developing high-performance, web-based AI applications.

WebGPU also introduces Render Bundles, a powerful feature that lets developers record and reuse sets of rendering commands for improved performance and reduced CPU overhead. [Babylon.js' Snapshot Rendering](https://doc.babylonjs.com/setup/support/webGPU/webGPUOptimization/webGPUSnapshotRendering), which uses GPU Render Bundles, can help render scenes approximately 10 times faster.

## Browser and OS availability

WebGPU is available on the following browsers and operating systems:

-   **Chrome, Edge, and other Chromium-based browsers:**
    
    WebGPU is available on Windows (with Direct3D 12), macOS, and ChromeOS starting with Chrome and Edge version 113.
    
    Support for Android was added in Chrome version 121 for devices running at least Android 12, and with Qualcomm/ARM GPUs.
    
    Support for Linux and expanded support for existing platforms is in progress.
    
-   **Firefox:**
    
    WebGPU is available on Windows as of Firefox 141.
    
    WebGPU is available in macOS Tahoe 26 on ARM64 machines, as of Firefox 145.
    
    Support for Linux, Android, and Intel-based Macs is in progress.
    
-   **Safari:**
    
    WebGPU is available in macOS Tahoe 26, iOS 26, iPadOS 26, and visionOS 26.
    

For more updates on the WebGPU availability, including what platforms it's rolling out on, refer to the [WebGPU Implementation Status page](https://github.com/gpuweb/gpuweb/wiki/Implementation-Status).

## A growing ecosystem

You don't have to start from scratch to use WebGPU! The libraries you love already support WebGPU:

-   [Babylon.js](https://doc.babylonjs.com/setup/support/webGPU)
-   [PlayCanvas](https://blog.playcanvas.com/build-webgpu-apps-today-with-playcanvas/)
-   [ONNX Runtime](https://onnxruntime.ai/docs/tutorials/web/ep-webgpu.html)
-   [React Native](https://github.com/wcandillon/react-native-webgpu)
-   [Three.js](https://threejs.org/examples/?q=webgpu)
-   [Transformers.js](https://huggingface.co/blog/transformersjs-v3)
-   [TypeGPU](https://docs.swmansion.com/TypeGPU/)
-   [Unity](https://docs.unity3d.com/6000.3/Documentation/Manual/WebGPU.html)

Plus, the underlying engines—[Dawn](https://dawn.googlesource.com/dawn) (Chromium) and [wgpu](https://github.com/gfx-rs/wgpu) (Firefox)—are standalone, portable packages. They simplify cross-platform development, making it incredibly straightforward to bring platform-specific GPU apps over to the web by using [Wasm](https://webassembly.org/) and tools like [emscripten](https://emscripten.org/) and Rust [web-sys](https://docs.rs/web-sys/latest/web_sys/).

The future of high-performance web apps is now!

## Acknowledgements

Sincere gratitude to all the contributors for their invaluable input and collaboration. Special thanks to: Corentin Wallez, Jim Blandy, Ken Russell, Mike Wyrzykowsk, Nishitha Burman Dey, Patrick Brosset, Sebastien Vandenberghe, Thomas Lucchini, and Thomas Nattestad.