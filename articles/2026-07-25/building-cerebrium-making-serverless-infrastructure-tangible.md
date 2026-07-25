---
title: "Building Cerebrium: Making Serverless Infrastructure Tangible"
source: "https://tympanus.net/codrops/2026/07/23/building-cerebrium-making-serverless-infrastructure-tangible/"
publishedDate: "2026-07-23"
category: "design"
feedName: "Codrops"
author: "Célia Lopez"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/c_cover.png.webp?x48895)](https://cerebrium.ai/ "Building Cerebrium: Making Serverless Infrastructure Tangible Demo")

Serverless infrastructure for AI isn’t the easiest thing to communicate.

Rather than trying to explain it through diagrams or long blocks of text, we wanted people to _feel_ how it works. Every interaction was designed to reflect the product itself: fast, precise, modular, and built to scale. This became one of those projects where design wasn’t just supporting the story—it _was_ the story.

## The Technical Stack

-   **Cinema 4D / Redshift / Blender** — 3D asset creation and animation pipeline
-   **Three.js r183.2** — WebGL rendering
-   **GSAP** — Animations and transitions
-   **Makio MeshLine** — Rendering animated 3D paths

## Could We Build It with WebGPU?

_By Mathis Biabiany_

When I started the project, I built the entire rendering layer using Three.js’ new `WebGPURenderer` together with **TSL (Three.js Shading Language)**. At the time, Three.js r183.2 was the latest available release.

TSL was honestly a joy to work with. Instead of maintaining multiple GLSL files, materials, GPU computations, and post-processing effects, everything could be described as composable JavaScript node graphs. Three.js would then generate the appropriate shaders depending on the rendering backend.

Beyond the cleaner architecture, this was also my first opportunity to ship a real client project with WebGPU instead of WebGL, so I wanted to push it as far as possible.

Unfortunately, as the project grew, reality caught up. Cerebrium isn’t a single isolated 3D scene. A single canvas contains multiple environments, each with its own materials, particles, lighting setup, and post-processing pipeline. We also wanted seamless page transitions without displaying a loading screen every time users navigated.

The problem wasn’t rendering performance once everything was running. The bottleneck came before the experience even started. During the initial load, Three.js had to traverse every TSL node graph, generate the corresponding shaders, and compile the GPU pipelines. On our reference machine, this initialization phase could take close to twenty seconds.

Later versions of Three.js dramatically improved this process. Benchmarks published by the project show shader compilation becoming roughly three times faster thanks to better node-type caching, largely driven by the work of [Renaud Rohlinger](https://x.com/onirenaud?s=21&t=ZvqprqfRLJMWzmPa_MgvlQ).

Unfortunately, those improvements simply didn’t exist when we had to ship. Waiting nearly twenty seconds before rendering the first frame wasn’t something we could justify. So I made the decision to migrate the entire rendering layer back to `WebGLRenderer`.

## Rebuilding Everything in WebGL

The overall rendering logic stayed surprisingly similar. What changed was how explicit everything became.

The TSL Node Materials were replaced with traditional Three.js materials, extended through `onBeforeCompile()` to inject custom GLSL code. The compute shaders responsible for particle simulation became a ping-pong GPGPU system built with floating-point textures. The node-based post-processing graph was rebuilt using `EffectComposer` alongside several custom GLSL passes.

One thing this migration taught me is that two shaders implementing exactly the same idea rarely produce identical images.

-   Different noise functions.
-   Different tone mapping.
-   Different blending equations.
-   Different lighting models.
-   Different UV interpolation.
-   Different post-processing pipelines.

All of those seemingly small differences accumulated into a noticeably different visual result. Bloom intensity, fog density, gradients, and several material colors all had to be carefully recalibrated to recover the original artistic direction.

Going back to WebGL wasn’t a rejection of WebGPU. It was simply a production decision based on the maturity of the available tooling at that moment. WebGPU and TSL gave me a much more modular way of building visual effects. WebGL gave us startup times that were predictable enough to ship.

## 3D and WebGL Pipeline

### Recreating the Lighting

_By Célia Lopez_

Because many scenes contained animated objects, baking the lighting wasn’t an option. Every light had to be recreated directly inside Three.js. To help Mathis position everything accurately, I exported simple helper cubes from Cinema 4D. These cubes preserved both the position and orientation of every light, making it much easier to recreate the lighting setup inside the engine.

Sometimes the simplest debugging tools end up saving the most time.

### Animating the Network

_By Mathis Biabiany_

One of my favorite effects in the project is the animated network of glowing paths. Interestingly, nothing actually moves. The paths themselves are completely static meshes—the illusion of motion comes entirely from the shader. Each path is UV-unwrapped so that the Y axis runs continuously from one end of the line to the other.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/Screenshot-2026-07-18-111430-1200x819.png.webp?x48895)

The shader simply moves a narrow opacity mask along that UV axis, creating the appearance of a pulse traveling through the network. Its width and falloff determine whether the pulse feels like a sharp signal or a softer energy trail.

To keep everything from animating in perfect sync, each path receives slightly different parameters:

-   Animation offset
-   Speed
-   Interval between pulses

That small amount of randomness makes the whole system feel much more organic.

We also limited each path’s visibility based on its distance from the camera, progressively revealing the network as the camera travels through the scene. During development, an inspector exposed almost every parameter:

-   Light color
-   Bloom threshold
-   Bloom radius
-   Bloom intensity
-   Particle opacity
-   Reveal distance
-   Pulse speed
-   Pulse length
-   Pulse softness
-   Pulse frequency

The challenge was finding the sweet spot where the lines looked bright enough to emit light without letting the bloom completely wash out the details.

### A Shared Environment

By Célia Lopez

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/image-10-1.png.webp?x48895)

To reinforce the project’s signature purple atmosphere, we used a custom purple HDRI from Poly Haven as the environment map. Beyond adding subtle reflections, it helped unify the overall color palette across every scene. Sometimes, lighting consistency is what makes completely different environments feel like they belong to the same product.

### Optimizing for Performance

At first glance, the scenes looked fairly lightweight. In reality, they weren’t. Maintaining perfectly smooth curves throughout the network required highly subdivided geometry, especially around the rounded path segments.

Whenever I deliver a 3D model to developers, I always run an optimization pass with Draco. Depending on the project, I either use David Ronai’s 3D Optimizer or the Babylon.js Sandbox optimization tool.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/image-2-1200x657.png.webp?x48895)

#### Bad topology

The problem was that every time I exported the entire scene, the geometry was automatically simplified by reducing the polygon count. While this made the file lighter, it also introduced visible faceting along the curved paths, which undermined the polished aesthetic of the website.

Instead of lowering the geometry quality, I realized I could split the model into two separate parts and optimize each mesh independently, without compromising the smoothness of the curves.

The first model contained the helper objects, the light paths, and part of the network. The second contained the remaining path geometry. The split was carefully placed where it would be visually imperceptible, allowing us to stream and manage the assets more efficiently while preserving the quality of the geometry.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/Screenshot-2026-07-18-113444-1200x592.png.webp?x48895)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/Screenshot-2026-07-18-113541-1200x595.png.webp?x48895)

### Baking the Camera Animation

Every camera movement was baked directly from Cinema 4D. This gave us complete control over timing, framing, easing, and synchronization with the rest of the experience, while avoiding interpolation differences between applications.

### Designing Security as an Interaction

_By Mathis Biabiany_

One section of the website focuses on security. Instead of representing it with a lock icon, we wanted users to _feel_ that the infrastructure was protected. The central object is surrounded by an almost invisible spherical shield. Most of its appearance comes from a classic Fresnel effect: surfaces facing the camera remain subtle, while those at grazing angles become much brighter.

```
vec3 viewDir = normalize(cameraPosition - vWorldPos);

float NdotV = clamp(dot(vWorldNormal, viewDir), 0.0, 1.0);

float fresnel = pow(1.0 - NdotV, uFresnelPower);

fresnel *= uFresnelStrength;

float noise = valueNoise3D(
    vPosition * uFresnelNoiseScale +
    uTime * uFresnelNoiseSpeed
);

fresnel *= 1.0 + (noise * 2.0 - 1.0) * uFresnelNoiseAmount;
```

A layer of animated procedural noise subtly modulates the Fresnel intensity, preventing the shield from feeling perfectly static. On top of that, a hexagonal grid is projected onto the sphere and blended additively with the Fresnel effect. Combined with bloom, it gives the impression that the shield is generating its own energy.

But the interaction doesn’t stop there. A raycaster continuously tracks the mouse position on the sphere and writes it into a temporary texture. The shader then samples that texture as a dynamic mask, locally illuminating nearby hexagons before gradually fading them over time.

Instead of reacting instantly and disappearing immediately, the shield briefly remembers every interaction. That subtle persistence helps sell the illusion that the force field absorbs, diffuses, and dissipates energy across its surface.

## **Credits**

Agency – [KOKI-KIKO](https://www.koki-kiko.com/)  
Strategy & PO – [Kim Levan](https://www.linkedin.com/in/kimlevan/)  
Creative Direction & Design – [Louis Paquet](https://www.linkedin.com/in/louis-paquet-899a2759/)  
3D – [Célia Lopez](https://www.linkedin.com/in/c%C3%A9lia-lopez-745aaa72/)  
Development – [Deven Caron](https://www.linkedin.com/in/deven-caron/), [Pier-Luc Cossette](https://www.linkedin.com/in/pier-luc-cossette-4913b4b4/)  
WebGL – [Mathis Biabiany](https://www.linkedin.com/in/mathis-biabiany-b1a7a16a/)