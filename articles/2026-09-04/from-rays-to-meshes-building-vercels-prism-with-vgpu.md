---
title: "From Rays to Meshes: Building Vercel’s Prism with vgpu"
source: "https://tympanus.net/codrops/2026/09/03/from-rays-to-meshes-building-vercels-prism-with-vgpu/"
publishedDate: "2026-09-03"
category: "design"
feedName: "Codrops"
author: "Matias Gonzalez Fernandez"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/vgpu_vercel.png.webp?x57826)](https://vgpu.sh/ "From Rays to Meshes: Building Vercel’s Prism with vgpu Demo")

vgpu is the open-source library we built at Vercel to create performant shaders for the web. After months of using it internally, we were finally getting ready to release it. We had the library. We had the landing page. But one important piece was still missing.

One week before launch, the vgpu landing page was still missing its hero. The team suggested bringing back an iconic Vercel visual: the glass prism splitting light into red, green, and blue.

I first saw the prism at Next.js Conf 2022, before I joined Vercel. It completely blew my mind. Now it was time to build my own version and somehow make it live up to the original.

I started with the most literal approach: simulating the physics of light. For every pixel on the wall, I cast rays backward through the prism and checked whether they reached the light source. Each successful ray contributed color to that pixel. To keep the shader manageable, I used only 16 samples, jittering them on every frame and accumulating the results over time.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-2-1200x690.png.webp?x57826)

This was quite expensive and didn’t look sharp, so I kept studying the effect. I asked GPT to draw an SVG of the effect to explain to me how it worked, and it did this:

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-3-1200x544.png.webp?x57826)

Seeing the light spread outward in straight lines gave me an idea: I could draw it as a 3D mesh. A mesh is a group of points connected to form a surface. By placing those points along the light’s edges, I could draw the whole beam as a set of shapes.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-4.png.webp?x57826)

First, I calculated how each wavelength would refract as it entered and exited the prism. Because the prism bends each wavelength by a slightly different amount, the paths spread into a fan of colors. I represented those paths as lines, producing this first wireframe:

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-5-1200x750.png.webp?x57826)

At this point, these were still only lines; they had no surface for the GPU to shade. To turn them into a visible beam, I connected neighboring paths to form the triangular faces of a mesh, generating a much smoother (and cheaper) result.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-6-1031x900.png.webp?x57826)

With the light mesh working, the scene was still missing something: the glass! Luckily, I had already built a glass shader for the [eve.dev](https://eve.dev/) hero that I could adapt.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-7-1200x581.png.webp?x57826)

The shader uses an environment map to capture the surroundings of the glass. Imagine placing a camera at the center of the scene and taking six pictures, one in each direction. Together, those images form a cubemap: a 360° representation of the environment.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-8-1200x750.png.webp?x57826)

With this technique, you can easily fake reflections from an environment.

With the glass shader in place, I added bloom and floating particles to complete the dark-mode scene:

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-9-1200x681.png.webp?x57826)

Now it was time to work on light mode. Light mode is always a challenge; adding light to a white background doesn’t make sense (unless you go HDR, and Twitter will roast you for that). So the solution is to darken the background, leaving room for “light” to show up.

I started by generating some concepts with GPT, eventually creating this AI-generated image:

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-11-1200x635.png.webp?x57826)

Once I had the concept, I started working backward from the final image. I broke it into individual elements and figured out how to recreate each one in the scene.

For example, the wall has light and shadows coming through a window. It also has a subtle texture that makes it feel like a real wall. The prism casts a shadow and has subtle shading inside it.

Since this was a really complex composition, I created a visualizer for the render pipeline. You can think of creating a shader as mixing a bunch of images/math together, so a graph like this helped me understand how I was “mixing the things”.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-10-1069x900.png.webp?x57826)

Let’s break this down:

The prism casts a shadow. My first thought was to calculate a real-time shadow, but that can get expensive; since the prism doesn’t really move, we could draw the shadow by pasting a texture onto the wall.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-13.png.webp?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-14-923x900.png.webp?x57826)

Next, I focused on the wall details. In the concept image we can see small “bumps” in the wall. We can achieve this effect by generating a normal map.

A key performance optimization was to render the normal map to a static image, so the expensive noise calculation only runs once at startup.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-15-1200x675.png.webp?x57826)

The node has a control to edit the strength of the normal map, allowing me to set it exactly as I wanted.

Then I added shadows to the wall by layering an AI-generated image over the lighting information. The controls let me fine-tune its appearance.

Together, these assets resulted in the hero we see today.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/image-16-1200x683.png.webp?x57826)

You can access the debug mode at [https://vgpu.sh?debug](https://vgpu.sh/?debug). If you switch between light/dark mode and high/low quality, you’ll see the graph change.

## Adapting to each device

Even with these optimizations, the hero was still too demanding for some devices. To address this, I built lighter versions of both shaders. They use fewer samples and less detail while keeping the overall effect visually similar.

The rule is simple: start at high quality, then switch to low quality when necessary. The system uses three signals to decide:

-   **GPU tier:** If the device has a low-tier GPU or is a mobile device, the hero starts in low-quality mode.
-   **Battery level:** If a laptop has less than 30% battery and is not charging, the hero switches to low-quality mode to reduce power usage.
-   **Frame rate:** If the device cannot maintain a stable frame rate, the hero switches to low-quality mode.

This lets more powerful devices render the full effect while keeping the experience smooth everywhere else.

In the end, building a hero like this is all smoke and mirrors. It is about balancing performance and perception. It does not need to simulate reality perfectly. It just needs to look convincing and run smoothly.

**The code for this hero, along with other examples, is available in the [vgpu GitHub repository](https://github.com/vercel-labs/vgpu).**