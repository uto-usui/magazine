---
title: "80s Business Tech and Seamless Scene Transitions: Inside Shader.se’s Scroll-Driven WebGPU Pipeline"
source: "https://tympanus.net/codrops/2026/05/19/80s-business-tech-seamless-scene-transitions-inside-shader-ses-scroll-driven-webgpu-pipeline/"
publishedDate: "2026-05-19"
category: "design"
feedName: "Codrops"
author: "Filip Kantedal"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/shader.webp?x42294)](https://shader.se/ "80s Business Tech and Seamless Scene Transitions: Inside Shader.se’s Scroll-Driven WebGPU Pipeline Demo")

Shader is a creative development studio based in Sweden, founded a few years ago by me and my colleague Simon Hedlund. Starting a business threw us headfirst into the corporate ecosystem of acronyms and LinkedIn rhetoric. We coped the only reasonable way: by making fun of all of it, to the point where we named our newly founded company High Tech Business Solutions, staged a business photoshoot, and degraded the results until they looked correct: watermarked, a generous horizontal stretch and saved as a JPEG with the quality slider dragged to the floor. Brilliant, we thought. Less brilliant in meetings with potential clients, where there wasn’t always room to clarify that the name and company material was ironic.

The shame eventually drove us to rebrand as Shader Development Studio, not nearly as funny, but it at least describes what we actually do: computer graphics, visualizations, and web. Still, we liked the ironic business angle from High Tech Business Solutions too much to let it disappear completely.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/ad-1200x552.jpg.webp?x42294)

When it came time to build our own website, leaning into that corporate satire felt like the only honest choice. We’d spent years poking fun at business culture from the inside, so we went all the way. We kept coming back to 80s business tech: beige computers, glossy office ads, sales brochures, golden ties, and stiff corporate handshakes.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/moodboard-786x900.webp?x42294)

## Tech Stack & Tools

**Next.js**: not the obvious choice for a Three.js-heavy site, but it earns its place here for metadata handling and server-side data fetching from our CMS. Most of the page is canvas, but the bits that aren’t still benefit from a proper framework underneath.

**Three.js + React Three Fiber + TSL**: Three.js does the heavy lifting, React Three Fiber gives us a declarative way to compose scenes in React, and TSL (Three.js Shading Language) lets us write node-based materials that compile to both WebGL and WebGPU. That last part matters: we can target the newer WebGPU renderer without completely abandoning WebGL compatibility.

**Lenis**: smooth scroll library. We modified it slightly to support the kind of page snapping we wanted between the Hero and Our work scenes.

**@pmndrs/uikit**: lets us build DOM-like layouts and UI directly inside the Three.js canvas. Since we want everything to live in the WebGPU pipeline and pass through post-processing, rendering UI as actual DOM elements on top wasn’t an option. Forked to get it to work with WebGPU.

## Selective Rendering

The foundation of the whole system is a simple page-section config: an array where each page section has a type and a length. Page lengths can be dynamic, adapting to content or screen size; the About page for example adjusts its length based on how much UI content needs to fit on different viewports.

We use Lenis for smooth scrolling, which also gives us a reliable scroll position value each frame. That value is what we use to determine which pages are currently in view. Each page’s start position is just the cumulative sum of the lengths before it, so converting a raw scroll value into a progress for any given page is a simple calculation.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/replicate-prediction-z5htm1aw7srmy0cy2fftbahh3r-900x900.png.webp?x42294)

Each frame, we check the current scroll position against each page’s position in that config. If a page isn’t in view, its entire render pass is skipped, no draw calls, no GPU work. That means everything: not just the main scene render, but every sub-pass it owns too. The diagram above illustrates this: only the About scene is active, so the cloth sim pass, the UI pass, and the final About composite all run. Everything above and below is simply not touched that frame. Finally the page passes are sent to the compose pass where post effects such as film grain, chromatic aberration, bloom and such are added.

Scenes that are active render in reverse order: last page first, first page last. That ordering matters because each scene can receive the next scene’s output as a texture. The last scene renders into its FBO and passes that texture to the scene before it, which can use it however it wants before rendering its own FBO. The chain continues until the first scene, whose output lands in a final compose pass where post-processing is applied before hitting the screen.

Pages can also define a render offset: a window that extends their active range slightly before or after their scroll position. This is used to ensure a scene’s FBO is ready before it actually needs to be visible, which is essential for transitions where the current scene needs to sample the next one.

This is illustrated, for example, when at the end of the About scene: the next scene is rendered simultaneously and visible under the paper shreds.

The way this works in practice is through React’s `useImperativeHandle`. In a typical R3F setup you’d reach for `useFrame` to run code every frame, but `useFrame` is parent-blind. The callback gets subscribed to the render loop and runs on the loop’s schedule, not the parent’s. That’s fine for self-contained animations, but the parent can’t invoke it on demand, can’t sequence it relative to its own framework, and can’t get a return value back.

`useImperativeHandle` solves this by letting a component expose a function on a ref. The parent holds that ref and decides when to call it, or whether to call it at all. Each scene exposes a render function this way: it takes the current renderer state and optionally the next scene’s texture, renders into its FBO, and returns the resulting texture.

Each scene component exposes its render function on a ref using `useImperativeHandle`. It receives the renderer state and the next scene’s texture, updates whatever it needs to, renders into its own FBO, and returns the texture. Below is a simplified example that shows how this is done.

```
const fbo = useFBO();

useImperativeHandle(renderHandle, () => ({ state, nextSceneTexture }) => {
  const { gl } = state;

  nextSceneTextureUniform.value = nextSceneTexture

  gl.setRenderTarget(fbo);
  gl.render(scene, camera);
  gl.setRenderTarget(null);

  return fbo.texture;
});
```

The parent holds refs to all scene render functions and calls them from a single `useFrame`. Scenes render in reverse order so each one can pass its texture forward to the scene before it. Any scene whose scroll progress is outside range is skipped entirely.

```
useFrame((state) => {
  let aboutTexture = null;
  let heroTexture = null;

  const aboutProgress = getPageScrollProgress({ pageType: "about", clamp: false });
  if (aboutProgress >= 0 && aboutProgress <= 1) {
    aboutTexture = renderAboutScene({ state, nextSceneTexture: null });
  }

  const heroProgress = getPageScrollProgress({ pageType: "hero", clamp: false });
  if (heroProgress >= 0 && heroProgress <= 1) {
    heroTexture = renderHeroScene({ state, nextSceneTexture: aboutTexture });
  }
});
```

The difference from `useFrame` is the inversion of control. The parent orchestrates the order of rendering, passes textures down the chain, and skips any scene whose progress is outside range, all from one place, without any of the scenes needing to know about each other.

## Transitions

There are two fundamentally different ways to transition between scenes. Which one to use depends on whether the transition needs to feel physically grounded in 3D space or whether it’s purely a 2D reveal dressed up with geometry.

**Screen-space sampling.** When the transition doesn’t need to be anchored to a specific 3D surface, screen-space coordinates are the simplest option. Instead of UV coordinates, the material samples the next scene texture at the fragment’s screen position. The mesh can be any shape and sit anywhere in 3D space, it will always reveal the correct part of the underlying scene.

```
import { Fn, screenCoordinate, texture, uniformTexture, vec2 } from "three/tsl";

const nextSceneTexture = uniformTexture(new Texture());
const resolution = uniform(new Vector2(width, height));

const material = new MeshBasicNodeMaterial();
material.colorNode = Fn(() => {
  const screenUv = screenCoordinate.div(resolution);
  return texture(nextSceneTexture, screenUv);
})();
```

There are multiple scene transitions using this technique on our site, for example the corporate handshake transition to our Contact page.

**Frustum-matched plane.** The hero transition needs to feel physically grounded in the 3D scene. The camera does not just move toward a fixed z value; it moves toward the actual monitor screen mesh. We read the screen’s world position, size, and rotation, then place the camera along the screen’s forward direction at the distance where the camera frustum covers the screen.

```
function fitCameraToScreen(
  planePosition: Vector3,
  planeScale: Vector3,
  planeQuaternion: Quaternion,
  viewportAspect: number,
  fov: number,
) {
  // The monitor may be rotated, so use its world-space normal instead of camera z.
  const normal = new Vector3(0, 0, 1).applyQuaternion(planeQuaternion).normalize();

  // Pick the dimension that fills the viewport first.
  const planeAspect = planeScale.x / planeScale.y;
  const distance =
    viewportAspect < planeAspect
      ? planeScale.y / 2 / Math.tan(fov / 2)
      : planeScale.x / 2 / (Math.tan(fov / 2) * viewportAspect);

  // Move slightly past the exact fit so no monitor border leaks through.
  return planePosition.clone().add(normal.multiplyScalar(distance * 0.9));
}
```

The next scene’s FBO needs to exist by the time it appears on the monitor screen, which is where the render offset pays off, the upcoming scene starts rendering a few scroll units early, so its texture is always ready when needed.

## Wrapping Up

The technical side of a site like this is only part of the work. You need to know your way around render targets, scroll state, shaders, and performance, but that is not where most of the time goes. Most of the time goes into finding an idea that feels specific, then tuning animations and transitions until they have the right weight, timing, and personality. A transition can be technically correct for days before it actually feels good.

One area we are excited about is the work happening around [HTML in canvas](https://github.com/WICG/html-in-canvas). Rendering UI in a canvas today often means rebuilding things the browser already does well: layout, text, inputs, interaction states, and accessibility. For this site we used `@pmndrs/uikit` so the UI could live in the same WebGPU pipeline as everything else, but having more native ways to bring real HTML into canvas-based experiences would make this much easier. It would also make accessibility far better, because the UI could keep more of the semantics and behavior people already expect from the web.

We’ll be releasing a complete open source example utilizing all the techniques covered here soon. Follow us on [LinkedIn](https://www.linkedin.com/company/105959325), [X](https://x.com/shadersweden), and [Instagram](https://www.instagram.com/shadersweden/) to know when it drops.