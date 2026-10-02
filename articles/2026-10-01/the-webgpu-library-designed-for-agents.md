---
title: "The WebGPU library, designed for agents"
source: "https://vgpu.sh/examples"
publishedDate: "2026-09-30"
category: "design"
feedName: "Sidebar"
---

Fullscreen shaders, compute pipelines, raw WebGPU interop, and read-only source files compiled directly by this docs app.

[

![Simple Gradient](https://vgpu.sh/_next/image?url=%2Fexamples%2Fgradient.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

Map screen coordinates to color with a tiny fullscreen fragment shader.

-   gradient
-   shader





](https://vgpu.sh/examples/gradient)[

![Holographic Card](https://vgpu.sh/_next/image?url=%2Fexamples%2Fholographic-card.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

A minimal graphite card with Geist typography and an equilateral triangle outline. Approach to reveal wavy foil engravings and a triangular fractal, with sweeping pearlescent light and fine diffraction detail.

-   holographic
-   iridescence
-   card





](https://vgpu.sh/examples/holographic-card)[

![Triangle LED Hero](https://vgpu.sh/_next/image?url=%2Fexamples%2Ftriangle-led-front.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

Analytic edge-glow triangle with LED emitters, floor radiance, and interactive color deploy. Canvas-scoped pointer input drives the lighting while a lil-gui selector chooses highlighted edges.

-   triangle
-   led
-   raycasting





](https://vgpu.sh/examples/triangle-led-front)[

![Anti-Aliasing](https://vgpu.sh/_next/image?url=%2Fexamples%2Fanti-aliasing.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

One high-contrast scene through Off, MSAA 4×, SSAA 2×, and FXAA — pick a mode and watch the edges.

-   anti-aliasing
-   msaa
-   ssaa





](https://vgpu.sh/examples/anti-aliasing)[

![Black Hole](https://vgpu.sh/_next/image?url=%2Fexamples%2Fblack-hole.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

Raymarched gravitational lensing — null geodesics bend starlight around an event horizon while a Keplerian accretion disk glows with Doppler beaming, graded through an HDR bloom chain.

-   black-hole
-   raymarching
-   hdr





](https://vgpu.sh/examples/black-hole)[

![Optimized Black Hole](https://vgpu.sh/_next/image?url=%2Fexamples%2Foptimized-black-hole.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

A multi-pass black hole that bakes relativistic ray traversal once into a G-buffer, then reuses it for animated disk shading, stars, antialiasing and HDR bloom.

-   black-hole
-   raymarching
-   performance





](https://vgpu.sh/examples/optimized-black-hole)[

![Earth](https://vgpu.sh/_next/image?url=%2Fexamples%2Fearth.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

A procedural planet with GPU-baked albedo, night lights and clouds, a lit atmosphere, and an HDR bloom chain tuned so only the sun glows.

-   lighting
-   hdr
-   bloom





](https://vgpu.sh/examples/earth)[

![Atmosphere & Clouds](https://vgpu.sh/_next/image?url=%2Fexamples%2Fatmosphere.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

A physically based sky and volumetric clouds — Hillaire 2020 transmittance, multiple-scattering, sky-view and aerial-perspective lookup tables built with compute and storage textures, ozone, a limb-darkened sun, and Nubis-style clouds raymarched through tileable 3D Perlin-Worley noise and lit by the same tables, from sea level up to the stratosphere.

-   volumetric
-   compute
-   raymarching





](https://vgpu.sh/examples/atmosphere)[

![Interactive Fluid](https://vgpu.sh/_next/image?url=%2Fexamples%2Ffluid.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

A compact pressure-projected fluid solver with velocity advection, colorful dye, and pointer or touch stirring.

-   fluid
-   simulation
-   compute





](https://vgpu.sh/examples/fluid)[

![Instanced Rendering](https://vgpu.sh/_next/image?url=%2Fexamples%2Finstanced-rendering.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

One cube mesh + one instance stream, with 125,000 independently animated cubes.

-   instancing
-   indirect-rendering
-   performance





](https://vgpu.sh/examples/instanced-rendering)[

![Batch Rendering](https://vgpu.sh/_next/image?url=%2Fexamples%2Fbatch-rendering.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

Four primitive ranges in one mesh, recorded once as a render bundle.

-   batch-rendering
-   render-bundles
-   instancing





](https://vgpu.sh/examples/batch-rendering)[

![Particles ocean](https://vgpu.sh/_next/image?url=%2Fexamples%2Ffft-ocean.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

A deep-water surface driven by a real inverse FFT. A Phillips spectrum evolves in frequency space, Stockham passes produce a displacement field, and half a million particles ride the waves through an HDR bloom chain.

-   ocean
-   fft
-   particles





](https://vgpu.sh/examples/fft-ocean)[

![FFT ocean surface](https://vgpu.sh/_next/image?url=%2Fexamples%2Ffft-ocean-surface.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

A displaced ocean surface driven by a real inverse FFT. A Phillips spectrum evolves in frequency space, two compute passes run a shared-memory radix-2 IFFT into a displacement field, and a procedural grid rides it with per-pixel normals, foam and a Fresnel sky reflection under a tunable sunset. Orbit with the mouse; tweak the sea from the panel.

-   ocean
-   fft
-   compute





](https://vgpu.sh/examples/fft-ocean-surface)[

![Raymarched fractal](https://vgpu.sh/_next/image?url=%2Fexamples%2Fraymarched-fractal.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

A raymarched Sierpiński tetrahedron emerges from pure black under directional light and restrained HDR bloom, with drag-only orbit controls.

-   raymarching
-   raymarch
-   fractal





](https://vgpu.sh/examples/raymarched-fractal)[

![Glass Fractal](https://vgpu.sh/_next/image?url=%2Fexamples%2Fglass-fractal.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

A beveled glass tetrahedron contains a morphing fractal mesh and liquid orb, combining screen-space transmission, studio reflections, soft material lighting and interactive controls.

-   fractal
-   frosted-glass
-   lighting





](https://vgpu.sh/examples/glass-fractal)[

![Environment Map](https://vgpu.sh/_next/image?url=%2Fexamples%2Fenvironment-map.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

One 360° equirectangular map lights the whole scene: it is the background and every reflection on a mirror-metal cube floating in it.

-   lighting
-   hdr
-   rendering





](https://vgpu.sh/examples/environment-map)[

![Transmission](https://vgpu.sh/_next/image?url=%2Fexamples%2Ftransmission.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

A glass cube refracts the scene behind it in screen space: the frame is rendered, blurred into a pyramid, and read back through Snell refraction, chromatic dispersion and a Fresnel-weighted environment reflection.

-   lighting
-   hdr
-   rendering





](https://vgpu.sh/examples/transmission)[

![Clipping](https://vgpu.sh/_next/image?url=%2Fexamples%2Fclipping.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

A single signed-distance test slices an animated icosphere, while a fitted disk reveals the moving cross-section.

-   clipping
-   3d
-   shader





](https://vgpu.sh/examples/clipping)[

![Radiance Cascades](https://vgpu.sh/_next/image?url=%2Fexamples%2Fradiance-cascades.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

Draw light with the pointer and watch it bounce: a jump-flooded distance field feeds six radiance cascades — base 4, geometric intervals, linear RGBA16F — merged top-down with visibility alpha into 2D global illumination.

-   lighting
-   hdr
-   raymarching





](https://vgpu.sh/examples/radiance-cascades)[

![Agent Radiance Cascades](https://vgpu.sh/_next/image?url=%2Fexamples%2Fagent-radiance-cascades.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

The static ten-dot Agent mark becomes a selectable loading field with capture-quality controls: every gray-to-white dot is both an HDR emitter and an occluder, feeding a jump-flooded distance field and six top-down radiance cascades.

-   lighting
-   hdr
-   raymarching





](https://vgpu.sh/examples/agent-radiance-cascades)[

![Next.js Flare](https://vgpu.sh/_next/image?url=%2Fexamples%2Fnextjs-flare.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

Next.js logo shader — a rim-lit N glyph with volumetric scattering: a 48-step ray walk jittered by blue noise over a separable Gaussian blur chain, breathing autonomously until the pointer takes over.

-   flare
-   volumetric
-   lighting





](https://vgpu.sh/examples/nextjs-flare)[

![Depth Estimation](https://vgpu.sh/_next/image?url=%2Fexamples%2Fdepth-estimation.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

Estimate depth from a photo or webcam with ONNX Runtime Web on WebGPU. Shade its GPU-resident output beside the input through a zero-copy vgpu buffer wrap.

-   machine-learning
-   onnx
-   depth-estimation





](https://vgpu.sh/examples/depth-estimation)[

![MNIST Classifier](https://vgpu.sh/_next/image?url=%2Fexamples%2Fmnist-classifier.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

Draw a digit and classify it with ONNX Runtime Web on WebGPU. Render the GPU-resident logits through a non-owning vgpu buffer wrap.

-   machine-learning
-   onnx
-   mnist





](https://vgpu.sh/examples/mnist-classifier)[

![Air Painting](https://vgpu.sh/_next/image?url=%2Fexamples%2Fair-painting.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

Wipe fog off the glass with your hands. ONNX Runtime Web tracks both palms on WebGPU to clear a frosted camera feed.

-   machine-learning
-   onnx
-   hand-tracking





](https://vgpu.sh/examples/air-painting)[

![Three.js WGSL modules](https://vgpu.sh/_next/image?url=%2Fexamples%2Ftsl-exports.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

Turn one exported WGSL function into a callable Three.js TSL node and use it on a physical material.

-   three
-   3d
-   shader





](https://vgpu.sh/examples/tsl-exports)[

![Lava material](https://vgpu.sh/_next/image?url=%2Fexamples%2Fthree-tsl.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

Author a procedural lava material as plain WGSL modules and wire them into a three.js node material — twelve surface slots, all driven from shader source.

-   three
-   3d
-   shader





](https://vgpu.sh/examples/three-tsl)[

![Particle Orbit](https://vgpu.sh/_next/image?url=%2Fexamples%2Fparticle-orbit.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

A shared-device vgpu + TypeGPU experiment: TypeGPU advances light-seeking dust through a radiance field rendered by vgpu, then vgpu draws the same particle buffer zero-copy alongside orbiting lights, HDR bloom, and a CRT finish.

-   typegpu
-   instancing
-   particles





](https://vgpu.sh/examples/particle-orbit)[

![TypeGPU Liquid Glass](https://vgpu.sh/_next/image?url=%2Fexamples%2Ftypegpu-liquid-glass.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

A refractive TypeGPU logo made with TypeScript GPU functions, translated into WGSL and rendered with vgpu.

-   typegpu
-   shader
-   frosted-glass





](https://vgpu.sh/examples/typegpu-liquid-glass)[

![Adaptive Quality](https://vgpu.sh/_next/image?url=%2Fexamples%2Fadaptive-quality.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

Start on a High pipeline and downgrade once to a cheaper Low pipeline when the GPU tier, battery level, or presented FPS say so. The tier swap is prepared off-screen and every signal is advisory.

-   performance
-   adaptive-quality
-   bloom





](https://vgpu.sh/examples/adaptive-quality)[

![Glass Sculpture](https://vgpu.sh/_next/image?url=%2Fexamples%2Fglass-sculpture.card.png&w=3840&q=75&dpl=dpl_7EpVuK1rWwX8NGwfZrMdXCmQTayL)

A raymarched glass sculpture under a studio light rig, with refraction, total internal reflection, chromatic dispersion, absorption, bloom, and interactive lighting.

-   raymarching
-   lighting
-   hdr





](https://vgpu.sh/examples/glass-sculpture)