---
title: "ShaderPad"
source: "https://misery.co/shaderpad/"
publishedDate: "2026-08-04"
category: "design"
feedName: "Sidebar"
---

ShaderPad handles the repetitive work required to render fragment shaders in the browser. It’s performant, flexible, and comes “batteries included” for most needs. ShaderPad has optional plugins — from PNG export to face/pose tracking — for more specific requirements. Simple, performant, and portable, ShaderPad lets you focus on writing GLSL.

## Meet ShaderPad

ShaderPad is a minimal fragment shader library for the web. It handles WebGL2 scaffolding, uniform and texture synchronization, resizing, history buffers, and other runtime plumbing. It’s performant by default and lets you focus on the creative parts of graphics programming. With a small footprint (5.9 kB gzipped), effects load quickly and run well on any device. And if you want face filters, pose-driven visuals, hand tracking, or object segmentation, MediaPipe-powered plugins give you one of the fastest ways to start building.

![Face mesh created with ShaderPad’s face plugin](https://misery.co/shaderpad/wink.png)

## What can I build with ShaderPad?

-   Create fullscreen interactive shaders in under 10 lines of JS code.
-   Add post-processing effects to existing `canvas`, `img` and `video` elements.
-   Efficiently create multi-pass graphics pipelines with minimal overhead.
-   Make your own face filters or pose detection apps like [Strange Camera](https://strange.cam/).
-   Vibe code your first shader using the [AI entry points](https://misery.co/shaderpad/docs/getting-started/installation/#using-ai).

## Comparisons To Other Libraries

[ThreeJS](https://threejs.org/) is an incredible framework, but it’s nearly 30x the size of ShaderPad. If you want to use your GPU without a full 3D library, ShaderPad is a great choice.

Hosted shader playgrounds like [ShaderToy](https://www.shadertoy.com/) are perfect for sketches, but they keep your work locked into that platform. ShaderPad aims to provide a similar speed of iteration while giving you something you can drop into any project.

## Inspiration

-   [ShaderToy](https://www.shadertoy.com/): The original shader playground. Still one of the coolest places on the Internet.
-   [ThreeJS](https://threejs.org/): The most popular 3D library on the web by a landslide, for good reason.
-   [TWGL](https://twgljs.org/): A performant and unopinionated WebGL library for the browser.
-   [ShaderBooth](https://shaderbooth.com/): A fun, immediate, and inspiring way to learn and experiment with shaders.

WebGL2 is required

## Interested? Choose a path

### Start here

-   [Installation](https://misery.co/shaderpad/docs/getting-started/installation/)
-   [Quickstart](https://misery.co/shaderpad/docs/getting-started/quickstart/)
-   [Learning shaders](https://misery.co/shaderpad/docs/getting-started/learning-shaders/)
-   [Built-in inputs](https://misery.co/shaderpad/docs/core-concepts/built-in-inputs/)

### Camera effects and filters

-   [Webcam input](https://misery.co/shaderpad/docs/guides/webcam-input/)
-   [Textures](https://misery.co/shaderpad/docs/core-concepts/textures/)
-   [History](https://misery.co/shaderpad/docs/core-concepts/history/)
-   [Face plugin](https://misery.co/shaderpad/docs/plugins/face/)

### Advanced / multi-pass effects

-   [Chaining shaders](https://misery.co/shaderpad/docs/guides/chaining-shaders/)
-   [Format and precision](https://misery.co/shaderpad/docs/core-concepts/format-and-precision/)
-   [Performance](https://misery.co/shaderpad/docs/guides/performance/)
-   [API reference](https://misery.co/shaderpad/docs/api/shaderpad/)