---
title: "Building an Infinite Liquid Glass Grid with Three.js, WebGPU, and TSL"
source: "https://tympanus.net/codrops/2026/09/08/building-an-infinite-liquid-glass-grid-with-three-js-webgpu-and-tsl/"
publishedDate: "2026-09-08"
category: "design"
feedName: "Codrops"
author: "Filip Kantedal"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/cover_glass.png.webp?x57826)](https://infinite-jelly-glass.shader.se/ "Building an Infinite Liquid Glass Grid with Three.js, WebGPU, and TSL Demo")

_**Editor’s Note:**_ _With the Three.js Conference workshops already underway and the conference just two days away, it feels like the perfect moment to go behind the scenes of an experiment that made quite a splash. Jacob, Simon, and Filip from Shader created this mesmerizing infinite liquid glass grid as a playful exploration of Three.js, WebGPU, and TSL. Now they’re pulling back the curtain to show us how they built it, from the fake glass and refraction to the infinite spherical grid. We’re thrilled to have them share the story behind the experiment as part of our conference celebration._

**🇫🇷 Two days to go!** The very first Three.js Conference is almost here in Paris. Use code `CODROPS` for **15% off** and **[grab your ticket →](https://threejs.paris/tickets)**

Hey! I’m Filip, co-founder of [Shader](https://shader.se/), a creative development studio in Sweden. Most of the year, we ship interactive 3D experiences for clients. A few weeks of it, we spend on weird experiments with no brief and no deadline. The latest one is an infinite liquid glass carousel: a grid of glass video cards running in the browser on WebGPU. The video bends through the glass, the grid has no edges, and there isn’t a single light in the scene.

## The stack

Next.js with React Three Fiber v10 on the WebGPU renderer. Materials are written in TSL (Three.js Shading Language), Motion handles the drag springs, and HLS video streams are used as textures. No post-processing and no render targets. Everything happens in one pass.

## Liquid glass, no geometry required

The trick here is that each card is just a flat, subdivided plane. The rounded corners, beveled edges, and refraction are all faked in the material. We never model any glass.

If you’ve used Three.js, you might be thinking that this is exactly what `MeshPhysicalMaterial` is for. And it is: set `transmission`, `ior`, `thickness`, and `dispersion` on a rounded box, and you get very convincing glass out of the box. But that glass is real geometry, it needs a lit scene, and transmission renders everything behind the object into a separate buffer first. That’s a lot of machinery for a couple hundred cards, and it refracts the scene behind the card when what we actually want to bend is the card’s own video.

So we roll our own: a flat plane, a small custom shader, and a single render pass.

It all starts with a 2D signed distance function. For every pixel on the card, it gives us the distance to the edge of a rounded rectangle. Negative means inside, positive means outside. This is the classic rounded-box SDF, written in TSL:

```
const roundedBoxDistance = Fn(([point]) => {
  const radius = min(u.cornerRadius, min(halfSize.x, halfSize.y));
  const q = abs(point).sub(halfSize).add(radius);
  return length(max(q, vec2(0)))
    .add(min(max(q.x, q.y), float(0)))
    .sub(radius);
});
```

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/Screenshot-2026-09-03-at-14.40.10-1196x900.png.webp?x57826)

From that distance, we build a height map. Think of it as the thickness of the glass at every point: flat in the middle, then curving smoothly down to zero at the edges. The curve is a superellipse, so `bevelPower` lets us go from a soft pillow to a sharp, chunky bevel:

```
const bevelHeight = Fn(([distance]) => {
  const edge = clamp(
    float(1).add(distance.div(max(uniforms.bevelWidth, float(0.001)))),
    0,
    1,
  );
  const power = max(uniforms.bevelPower, float(1));
  const profile = pow(
    max(float(1).sub(pow(edge, power)), float(0)),
    float(1).div(power),
  );
  return profile.mul(uniforms.thickness);
});
```

To make the glass bend light, we need to know which way the surface is facing at every pixel. So we sample the height map a tiny step to the left, right, up, and down. The difference between those samples gives us the slope, and the slope gives us a normal. It’s the same trick you’d use to calculate normals from a terrain height map, just applied to our fake glass.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/Screenshot-2026-09-03-at-14.42.09-1200x900.png.webp?x57826)

Now for the good part. Once we have a normal and a view direction, we can refract the ray. If we refract it a few times with a slightly different index of refraction for each color channel, we get chromatic dispersion, the rainbow fringe you see around the edges of real glass. Each “tap” bends the ray a little differently and mostly feeds into one color channel:

```
let refracted = vec3(0);
for (const tap of taps) {
  const eta = float(1).div(
    max(uniforms.ior.add(uniforms.dispersion.mul(tap.offset)), float(1.0001)),
  );
  const ray = refract(viewDir.negate(), normal, eta);
  const travel = uniforms.thickness.div(max(abs(ray.z), float(0.05)));
  const displaced = baseUv.add(
    ray.xy.mul(travel).mul(uniforms.refractStrength).div(uniforms.planeSize),
  );
  refracted = refracted.add(
    mapNode.sample(displaced).rgb.mul(vec3(...tap.weight)),
  );
}
```

Notice that this is a plain JavaScript `for` loop. TSL builds the shader as a node graph, so the loop is unrolled when the shader compiles. That makes the tap count a simple quality knob: more taps on beefy GPUs, fewer on mobile, while the shader code stays exactly the same.

The texture being refracted is the card’s own video, so the video literally bends through the glass. That’s the base layer. To make it read as glass rather than a wobbly video, we add two more ingredients on top, and there isn’t a single light in the scene for any of it.

First, a reflection. We mirror the view direction around the surface normal and use that bounced direction to look up a color in an environment map wrapped around a sphere. This turns figuring out what each bit of glass reflects into a simple texture lookup. How much reflection we show is controlled by Fresnel: glass reflects very little when you look straight at it and much more at grazing angles.

Second, a rim light. A `smoothstep` on the SDF distance gives us a thin band that hugs the edge of the card, and we tint it with a top to bottom gradient between two colors so the highlight looks like it has a direction.

Put together:

```
const reflection = reflect(viewWorld.negate(), normalWorld);
const environment = texture(envMap, equirectUV(reflection)).rgb;

const fresnel = u.fresnelF0.add(
  float(1)
    .sub(u.fresnelF0)
    .mul(pow(saturate(float(1).sub(dot(normal, viewDir))), 5)),
);

const rim = smoothstep(u.rimWidth.negate(), float(0), distance).mul(u.rimIntensity);
const rimColor = mix(u.rimColor, u.rimColorTop, rimGradient);

const finished = mix(
  refracted.mul(u.tint),
  environment,
  saturate(fresnel.mul(u.envIntensity)),
).add(rimColor.mul(rim));
```

That’s the whole material. It’s a `MeshBasicNodeMaterial` with a custom `colorNode`, and every bit of “lighting” you see is faked from a normal we computed ourselves.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/Screenshot-2026-09-03-at-14.52.21-1200x498.png.webp?x57826)

## An infinite grid that secretly lives on a sphere

The trick here: the grid isn’t infinite at all. Drag far enough and a card that leaves one edge quietly teleports to the other.

A flat wrapping grid looks like a spreadsheet, though. So instead of placing cards on a plane, we treat their wrapped `x` and `y` positions as distances walked along a giant sphere and place each card on its surface, facing outward. Cards in the center face you head-on, while the further out they get, the more they tilt away and shrink into the curve. Your brain reads that as depth instead of an endless flat plane.

The drag itself is handled by Motion’s pan gesture on a fullscreen element, with position and velocity stored as `motionValue`s outside React. The R3F frame loop reads them directly, so there are zero re-renders while you drag.

## Real text on fake glass

One more thing you might not notice at first: the title, category, and description on every card are real HTML. Not a texture, not SDF text, just `div`s. That means crisp text at any zoom, normal CSS, selectable and accessible content. The catch is that each `div` has to sit exactly on top of a card that lives on a sphere inside WebGPU and follow it perfectly while you drag.

The trick is the same one Three.js’s `CSS3DRenderer` uses, done by hand. A fixed fullscreen layer gets a CSS `perspective` derived from the camera’s field of view. Inside it, a “camera” `div` carries the inverse camera matrix as a `matrix3d`. Inside that, one absolutely positioned `div` per pooled card carries the mesh’s world matrix as its own `matrix3d`. The browser’s perspective math is the same math the GPU uses, so the `div` lands pixel perfect on the mesh and tilts along the sphere with it:

```
rootLayer.style.perspective = `${fov}px`;
cameraLayer.style.transform = `translateZ(${fov}px) ${cssMatrix(camera.matrixWorldInverse)} translate(50vw, 50vh)`;
cardEl.style.transform = `translate(-50%,-50%) ${cssMatrix(mesh.matrixWorld)}`;
```

Every frame, the R3F loop updates the camera div once, then walks the pool and writes a transform to each visible card’s div (and hides the ones that are off-screen). We strip the scale out of the matrix and apply it as width and height in pixels instead, which lets the text size itself with container units and stay sharp. Same rule as the drag: the divs are pooled to match the mesh count and updated with direct style.transform writes, never through React re-renders.

## Update: making it actually liquid

After we posted the demo, someone pointed out that not all glass is “liquid glass” and that we were riding the Apple hype. It was one person, but they had a point. So we made the grid actually move.

The whole surface is now a GPU cloth simulation: an XPBD solver written as TSL compute passes, running entirely on WebGPU. Every card sits on a patch of simulated cloth with distance and bending constraints, anchors that pull it back toward its spot on the sphere, and a viscosity term that makes it wobble more like jelly than fabric. Drag the grid and it lags behind, ripples, and settles. Completely overkill for a project grid, and a lot of fun to build.

The DOM text layer from the previous section didn’t survive the move. Text glued to a rigid mesh is one thing, text following a wobbling cloth is another. The labels are now rendered inside the scene with [pmndrs/glyph](https://github.com/pmndrs/glyph), using MSDF fonts baked at build time, so they deform and refract along with the glass they sit on.

That’s the whole thing: an SDF pretending to be glass and a sphere pretending to be an infinite plane.

## Come say hi in Paris

Jacob and I will be at [Three.js Conference in Paris](https://threejs.paris/). If you’re going, come find us and say hi! We’re always up for chatting about WebGPU, TSL, or whatever weird demo you’re building. To make us easier to spot, here’s a very professional picture of us, with Simon on the right. He’s staying in Sweden to play his violin.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/Screenshot-2026-09-03-at-16.54.46-1176x900.png.webp?x57826)

And if you want to see more of what we do, our landing page at [shader.se](https://shader.se/) is a whole experiment of its own.

See you there!