---
title: "Reactive Depth: Building a Scroll-Driven 3D Image Tube with React Three Fiber"
source: "https://tympanus.net/codrops/2026/02/17/reactive-depth-building-a-scroll-driven-3d-image-tube-with-react-three-fiber/"
publishedDate: "2026-02-17"
category: "design"
feedName: "Codrops"
author: "Matis Dené"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/02/3DTubeR3F.webp?x18996)](https://tympanus.net/Tutorials/3DImageTubeR3F/ "Reactive Depth: Building a Scroll-Driven 3D Image Tube with React Three Fiber Demo")

In this tutorial, you’ll learn how to build a scroll-driven, infinitely looping 3D image tube using React Three Fiber. We’ll combine shader-based deformation, inertial motion, deterministic looping, and synchronized DOM overlays to create a tactile and physically coherent WebGL experience.

## 1\. Introduction

In this tutorial, we’re going to build an interactive 3D scene made of three main parts:

-   A grid in the background that reacts to your mouse
-   A cylindrical tube of images that scrolls up and down
-   A glass helmet that rotates with the tube

On top of that, we’ll add:

-   A hover effect that gently slows everything down
-   A tooltip built in the DOM that follows the mouse
-   A smooth custom cursor

The goal isn’t realism. It’s about creating a scene where everything feels connected.  
Scrolling, moving the mouse, hovering — they all influence the same motion system.

## 2\. Motion as a Shared Signal

Instead of treating each interaction separately, we let everything affect the same system.

-   Scroll moves the tube vertically
-   Scroll speed adds rotation
-   The mouse position changes the shape of the grid
-   Hover slows down time

All the important values live inside `useRef`:

```
const tubeScrollTarget = useRef(0);
const tubeSpinVelocity = useRef(0);
const tubeAngle = useRef(0);
const rotationSpeedScaleTargetRef = useRef(1);
```

Inside `useFrame`, we update everything every frame:

```
useFrame((_state, dt) => {
  scrollCurrent.current += 
    (scrollTargetRef.current - scrollCurrent.current) * 0.12;

  spinVelocityRef.current *= Math.pow(0.92, dt * 60);

  rotationSpeedScale.current +=
    (rotationSpeedScaleTargetRef.current - rotationSpeedScale.current) *
    rotationSpeedScaleLerpRef.current;

  const scaledDt = dt * rotationSpeedScale.current;

  angle.current += 
    (baseSpeedRef.current + spinVelocityRef.current) * scaledDt;

  tubeAngleRef.current = angle.current;
});
```

We don’t use React state here. Nothing re-renders every frame. Everything stays inside the animation loop.

## 3\. The Grid Plane: Deforming Geometry in the Vertex Shader

The grid is just a plane, but it has a lot of subdivisions:

```
<planeGeometry args={[18, 18, 512, 512]} />
```

We need many segments because we’re moving the vertices in the shader.

Here’s the vertex shader:

```
varying vec2 vUv;

uniform float uEdgeWidth;
uniform float uEdgeAmp;
uniform float uCenterRadius;
uniform float uCenterAmp;
uniform vec2 uCenter;

void main() {
  vUv = uv;
  vec3 p = position;

  float dEdge = min(
    min(vUv.x, 1.0 - vUv.x),
    min(vUv.y, 1.0 - vUv.y)
  );

  float edgeMask = 1.0 - smoothstep(0.0, uEdgeWidth, dEdge);

  float dCenter = distance(vUv, uCenter);
  float centerMask = 1.0 - smoothstep(0.0, uCenterRadius, dCenter);

  float zOffset = edgeMask * uEdgeAmp
                + centerMask * uCenterAmp;

  p.z += zOffset;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
```

Here’s what happens in simple terms:

-   We measure how close each vertex is to the edge of the plane
-   We measure how close it is to the mouse position
-   We use `smoothstep` to make both effects fade smoothly
-   We push the vertex forward in Z

There are no hard edges, no sudden jumps. Everything blends smoothly.

## 4\. Drawing the Grid in the Fragment Shader

The grid itself is not a texture. It’s generated mathematically.

First, we animate it over time:

```
vec2 uv = (vUv + vec2(uTime * uScrollSpeed, 0.0)) * uGridScale;
```

Then we define a function that draws a line:

```
float gridLine(float coord, float width) {
  float fw = fwidth(coord);
  float p = abs(fract(coord - 0.5) - 0.5);
  return 1.0 - smoothstep(width * fw, (width + 1.0) * fw, p);
}
```

The key ideas:

-   `fract()` repeats a value between 0 and 1, so the pattern tiles infinitely
-   The `abs(fract(x - 0.5) - 0.5)` trick gives us distance from the center of each cell
-   `fwidth()` makes the lines anti-aliased and stable at any resolution

Full fragment logic:

```
float gx = gridLine(uv.x, uLineWidth);
float gy = gridLine(uv.y, uLineWidth);
float g = max(gx, gy);

vec3 base = vec3(0.0);
vec3 line = vec3(0.1);

gl_FragColor = vec4(mix(base, line, g), 1.0);
```

Without `fwidth`, the lines would shimmer while moving.

## 5\. Seamless Vertical Looping

The tube is not infinite. We just reposition it when needed.

```
if (scrollCurrent.current > loopHeight / 2) {
  scrollCurrent.current -= loopHeight;
  scrollTargetRef.current -= loopHeight;
}
```

We adjust both the current position and the target value. That’s what prevents visible jumps. Each image is positioned around a circle:

```
const theta = ((col + rowOffset) / cols) * Math.PI * 2;

const x = Math.cos(theta) * radius;
const z = Math.sin(theta) * radius;
const ry = -(theta + Math.PI / 2);
```

Each plane faces outward from the center.

## 6\. Inertia and Damping

Scroll doesn’t directly rotate the tube. It adds velocity.

```
tubeSpinVelocity.current += event.deltaY * 0.004;
```

Every frame, we damp it:

```
spinVelocityRef.current *= Math.pow(0.92, dt * 60);
```

And clamp it:

```
spinVelocityRef.current = Math.max(
  -2.0,
  Math.min(2.0, spinVelocityRef.current)
);
```

That’s what gives us smooth, controlled motion instead of chaos.

## 7\. Hover Slows Down Time

When you hover an image, we don’t change rotation directly. We slow down time.

```
rotationSpeedScaleTargetRef.current = 0.35;
```

Inside the loop:

```
rotationSpeedScale.current +=
  (rotationSpeedScaleTargetRef.current - rotationSpeedScale.current) *
  rotationSpeedScaleLerpRef.current;

const scaledDt = dt * rotationSpeedScale.current;
```

Because we scale `dt`, the whole system slows down consistently. The inertia still makes sense.

## 8\. Controlling Event Propagation

Each mesh stops event bubbling:

```
onPointerOver={(e) => {
  e.stopPropagation();
  onHoverStart(projectName, e);
}}
```

This prevents hover events from interfering with the container-level pointer tracking.

## 10\. Performance

-   No raycasting
-   No React state inside the animation loop
-   No per-frame allocations
-   Shader-driven deformation
-   DOM animations handled outside React

The frame rate stays stable even with strong scroll input.

## Wrapping Up

This isn’t just a collection of animations. It’s one connected motion system.

Scroll adds energy. Energy creates rotation. Hover slows time. The shader reshapes space. The DOM reacts to interaction.

Make sure to check out all variations: