---
title: "Breaking the Frame: Building a Real-Time Datamosh Effect with Three.js"
source: "https://tympanus.net/codrops/2026/09/02/breaking-the-frame-building-a-real-time-datamosh-effect-with-three-js/"
publishedDate: "2026-09-02"
category: "design"
feedName: "Codrops"
author: "Niccolò Fanton"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/datamoch_cover.png.webp?x57826)](https://tympanus.net/Tutorials/Datamosh/ "Breaking the Frame: Building a Real-Time Datamosh Effect with Three.js Demo")

_**Editor’s Note:** As our Three.js Conference celebration continues, we’re especially excited to have Niccolò Fanton joining us today with a mesmerizing exploration of datamoshing. Drawing from video codecs and shader techniques, he shows how a few carefully broken rules can turn a Three.js scene into something wonderfully unpredictable._

**🇫🇷 Make the first one count!** The very first Three.js Conference is coming to Paris, bringing the community together for a day of talks, ideas, and connections. If you’re part of the Three.js world, don’t miss this one. Use code `CODROPS` for **15% off** and **[get your ticket →](https://threejs.paris/tickets)**

A video codec periodically encodes an intra picture that can be reconstructed without referring to an earlier picture. Between those points, inter-coded pictures are predicted from previously reconstructed reference pictures. At the block level, an encoder may select a displacement into a reference picture and encode a residual correction, or it may encode the block using intra prediction when reference prediction is not useful. Because consecutive pictures often resemble one another, prediction can save a great deal of data.

Suppress the intra refresh at a scene change, and the decoder continues reconstructing from references that still belong to the outgoing shot while processing data intended for the incoming one. Pixels from the old scene are dragged around until a later refresh restores a clean image.

Video artists have long used variants of this trick on real files, using tools such as hex editors and modified decoders. Here, I borrow the idea in real time: a fragment shader acts as the decoder for a Three.js scene and, by default, suppresses refresh for the duration of the gesture.

## **Step 1: The decoder in one line**

The whole implementation follows one idea:

```
new frame = warp(previous frame, motion vectors) + residual
```

The previous frame means the decoder’s last reconstructed output, not the scene renderer’s current output. In this project, the motion texture stores graphics-derived screen-space velocity: an approximation of the displacement field a video encoder might choose, not the codec’s original motion vectors or a measurement of physical surface motion.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/diagram-01-decode-equation-1200x295.jpg.webp?x57826)

## **Step 2: The smallest datamosh that works**

We start with the feedback loop, the part that makes each damaged frame become the source for the next. For now, a placeholder supplies the motion vector.

The key change is where the shader reads its picture. A post-processing pass usually samples the frame the renderer has just drawn. This pass instead samples its own previous output at an offset and mixes in a small amount of the fresh render. With a constant such as `vec2(0.002, 0.0)`, the history drifts sideways while the incoming scene continually replenishes it, producing a persistent trailing smear rather than an endlessly translated, unchanged image.

```
uniform sampler2D uScene;    // this frame, as rendered
uniform sampler2D uHistory;  // what we output last frame
uniform vec2 uMotion;        // one constant vector for the whole screen

in vec2 vUv;
out vec4 fragColour;

void main() {
  vec3 scene   = texture(uScene, vUv).rgb;
  vec3 dragged = texture(uHistory, vUv - uMotion).rgb;
  // A small constant trickle of the fresh render keeps the loop stable;
  // with the vector at zero the feedback settles back onto the scene.
  fragColour = vec4(mix(dragged, scene, 0.12), 1.0);
}
```

WebGL imposes one constraint on this loop: a shader cannot sample a texture attached to the framebuffer it is currently drawing into. Updating one history buffer in place is therefore impossible. We keep two buffers, read from one, write to the other, and swap them at the end of each frame.

A third target holds the rendered scene for the decode pass to sample. The canvas receives a copy of the history buffer we just wrote. In pseudocode, the arrangement looks like this:

```
// Read one target, write the other, then swap: the reference frame is
// always a texture nothing is currently drawing into.
pass.uniforms.uScene.value   = colour.texture;
pass.uniforms.uHistory.value = history.read.texture;

pass.render(history.write);   // decode into the spare target...
history.swap();               // ...which becomes next frame's reference
blit(history.read, null);     // and also what reaches the canvas
```

The finished project needs only one explicit feedback buffer because postprocessing already swaps an internal pair. The decode writes forward, then a copy pass stores the result in the feedback target. The diagram below shows that arrangement, including the motion target introduced by the velocity pass.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/diagram-02-render-targets-1200x422.jpg.webp?x57826)

That bottom loop creates the effect. Each frame inherits the previous frame’s damage, so the distortion keeps building for as long as the vector keeps pointing somewhere.

## **Step 3: The velocity pass**

A constant vector looks artificial because it assigns the same displacement to every pixel. The renderer can derive how visible geometry moved in screen space, so we use that velocity field as a codec-inspired approximation.

We draw the scene a second time with an override material that writes velocity instead of colour. Each vertex is projected once with the current model and camera matrices, then again with the matrices saved for the same object one frame earlier. The difference between those projected positions supplies the displacement used by the effect.

```
uniform mat4 uPreviousModelMatrix; uniform mat4 uPreviousViewProjection; uniform float uHasPrevious;
varying vec4 vClipCurrent, vClipPrevious;

void main() {
  vClipCurrent = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  // Without a stored previous matrix (first frame, object just added) the
  // previous position is the current one: exactly zero velocity.
  vClipPrevious = mix(vClipCurrent,
    uPreviousViewProjection * uPreviousModelMatrix * vec4(position, 1.0), uHasPrevious);

  gl_Position = vClipCurrent;
}
```

One detail is easy to get wrong. Both clip positions must reach the fragment shader undivided; the perspective divide belongs there, per fragment. Doing it in the vertex shader appears cheaper and equivalent, yet produces incorrect values. A screen position is a ratio, and interpolating that ratio differs from dividing two interpolated quantities.

```
varying vec4 vClipCurrent, vClipPrevious;

void main() {
  // The divide happens here, per fragment. Never in the vertex shader.
  vec2 velocity = vClipPrevious.w <= 0.0 ? vec2(0.0)
    : (vClipCurrent.xy / vClipCurrent.w - vClipPrevious.xy / vClipPrevious.w) * 0.5;

  gl_FragColor = vec4(clamp(velocity, -0.25, 0.25), 0.0, 1.0);  // alpha 1: geometry here
}
```

## **Step 4: How you take the keyframe away**

So far, the pipeline behaves like an elaborate motion blur. About four lines of scheduling turn it into a datamosh.

Pressing the pointer, Space key, or touch input cuts to a shot with new geometry, palette, and camera. The decoder receives no notification. It keeps reading the last output from the outgoing shot while applying vectors measured from the incoming one. That mismatch produces the smear.

The ordering matters: running the cut _after_ `composer.render` buys one deliberate frame of latency. The outgoing shot sits in the feedback target when the incoming one is first rendered against it. And capturing the previous-frame state immediately after the cut means the camera jump itself never enters the velocity measurement.

```
const gestureStart = active && !this.wasActive;

// A gesture never raises the keyframe. Only the periodic refresh does.
this.effect.set('uKeyframe', gopRefresh ? 1 : 0);

this.composer.render(deltaTime);

// The cut happens after the frame is on screen, so the feedback target still
// holds the outgoing shot when the incoming one is first rendered.
if ((gestureStart || gopRefresh) && controls.sceneCut && this.onCut()) {
  this.camera.updateMatrixWorld(true);
}

// Store the post-cut state. The camera jump itself must never become a vector.
this.velocityPass.capturePreviousState();
this.effect.capturePreviousState();
```

The refresh also raises `uKeyframe`, handing the decoder a clean frame.

Releasing begins a short recovery. Over 370 ms by default, a counter ramps from 0 to 1 and scales the motion and residual together. The smear slows to a stop, then dissolves into the clean render.

## **Step 5: Putting the detail back**

A real encoder computes its residual against a motion-compensated prediction made from reconstructed reference pictures. If I used the complete difference between the current render and this deliberately wrong prediction, the residual would cancel the mismatch and repair the datamosh. The correction therefore has to remain deliberately incomplete.

The version used here compares the high-frequency detail in the incoming render with the detail already present in the prediction produced by warping the previous frame. It transmits only the portion that is stronger in the incoming render. This gate makes the correction self-limiting: as soon as the prediction carries an edge strongly enough, the residual falls to zero instead of adding the same contour to the feedback loop again.

```
// High frequencies of the honest render, and of the prediction we just made.
float hc = dot(current - lowCurrent * 0.25, vec3(0.299, 0.587, 0.114));
float hp = dot(predicted - lowPredicted * 0.25, vec3(0.299, 0.587, 0.114));

// Once the prediction carries the stronger edge, the gate returns zero.
// The quantiser follows: under half a step there is nothing to send,
// so flat regions transmit nothing at all.
float steps = max(uResidualQuant, 1.0);
return vec3(floor((abs(hc) > abs(hp) ? hc - hp : 0.0) * steps + 0.5) / steps);
```

The residual carries a luminance-like brightness signal without colour. An RGB residual deposits the new shot’s palette onto the old picture and makes the held frame appear semi-transparent.

## **Step 6: Slowing the feedback blur**

Held for a few seconds, the image begins to soften. Each motion vector usually points between texture pixels, so the GPU blends neighbouring values. That blend is harmless once, but this effect feeds the result back into the next frame. Repeating it once per rendered frame, sixty times a second at 60 fps, gradually removes contrast and detail.

Catmull-Rom reconstruction slows that loss. It estimates a sharper value from the surrounding pixels, so edges survive longer than they do with ordinary bilinear interpolation. The loop still resamples the image on every frame, which means some softness remains inevitable. We also clamp the result to the valid colour range because even a small overshoot would be amplified by the feedback.

## **Step 7: Making it look compressed**

The pipeline now produces a smooth, liquid smear. It can look beautiful, though broken video has a different visual grammar: rectangles. Codecs process the image in blocks, and the effect needs to expose that structure.

Four mechanisms add that compressed vibe, all controlled by `uBlockiness`.

**Blocks.** The shader reads one vector at the centre of each tile and applies it across the tile. With the default 8px block, sixty-four pixels share a vector.

**Precision**. Many codecs represent luma motion at subpixel precision. Snapping to that lattice turns a slide into a step. Without it, neighbouring blocks can differ by tiny amounts that read as a gradient. Once snapped, they match or diverge by a full increment, creating hard tears between rigid slabs. I use “block” here in a visual sense: the default 8×8 tile is an artistic choice, not a claim about one codec’s fixed macroblock size.

**Skip**. Below a threshold, a block’s motion fades to zero, so its history sample stops being displaced. The residual remains active, making this a codec-inspired hold rather than a literal skipped-block implementation. A short ramp eases the motion into that state to prevent a visible pop.

```
// 1. One vector for the whole tile, read at its centre. warp is the release
//    fade, and mvUV is the block centre at full blockiness.
vec2 mvUV = mix(uv, blockUV, uBlockiness);
vec2 motion = rawMotionAt(mvUV) * uMotionGain * warp;

// 2. Snapped to a half- or quarter-pixel lattice ("Vector Precision"), so
//    neighbours either match or differ by a whole step.
float mvSteps = max(uMvPrecision, 1.0);
vec2 motionPx = motion * resolution;
motion = mix(motionPx, floor(motionPx * mvSteps + 0.5) / mvSteps, uBlockiness) / resolution;

// 3. Under the threshold, motion fades to zero and the history sample holds.
//    The residual path remains active later in the shader. The guard is
//    load-bearing: smoothstep with equal edges is undefined in GLSL.
float skip = uSkipThreshold <= 0.0 ? 0.0
    : (1.0 - smoothstep(uSkipThreshold * 0.5, uSkipThreshold, length(motion * resolution))) * uBlockiness;
motion *= 1.0 - skip;  // the full shader also folds in the lost-sector mask
```

**The wrong vector.** The fourth mechanism hides in the snippet’s first line. In the full source, a share of block centres in `mvUV` shift diagonally and sample a neighbour’s vector. This mimics a block match locking onto the wrong object.

A note on method: none of these constants is derived. The block size, threshold and mismatch rate came from moving sliders until the result looked like a corrupted file.

## **Step 8: Packet loss**

The last layer adds the screen’s most visible artefact: rectangles whose motion freezes before they reappear elsewhere. In a real stream, a similar visual failure can follow transport loss, when data needed to reconstruct an area never arrives and the damage persists until an intra refresh repairs it. What follows is a loss-inspired sector mask rather than a simulation of that mechanism: it suppresses motion in selected rectangles while the residual path can still introduce detail.

The model uses several overlapping grids, each finer than the last. Every cell runs on a clock offset by a hash of its coordinates and layer index. That keeps the phase stable from one time slot to the next. On each tick, the cell decides whether to drop a block, where to place the rectangle, and how long to hold it.

```
for (float fi = 0.0; fi < 4.0; fi++) {
  if (fi >= uLostLayers) break;  // fixed upper bound keeps execution predictable across WebGL drivers

  vec2 scale = vec2(7.0, 5.0) * (1.0 + fi * 1.6) / max(uLostScale, 0.05);
  vec2 cellId = floor(uv * scale);

  // Every cell on its own clock, phase-offset by a hash of the cell. The
  // max() floors that clock at about one frame.
  float t = uTime / max(uLostLife, 16.0) + hash13(vec3(cellId, fi + 5.0));
  float slot = floor(t);
  if (hash13(vec3(cellId, slot * 7.0 + fi)) > uFrozenBlocks) continue;

  // ...a rectangle of hashed size and position for this slot, plus a duty
  // cycle so it blinks out again before the slot is over.
}
```

The lost-sector masks stay disabled for the first 300 ms of the effect. The delay lets the picture open with a clean smear before packet loss lands on top of it, closer to the rhythm of a stream that fails after decoding has begun.

## **Step 9: What it costs**

While the effect runs, the scene is drawn twice because the velocity pass needs its own rasterisation of the geometry. Once the gesture and recovery fade end, both the velocity and decode passes switch off when the diagnostic overlays are also disabled. Their cost is otherwise limited to the interaction.

At rest, the pipeline runs FXAA and two copy passes. FXAA cleans up jagged edges before they enter the feedback loop; Catmull-Rom serves a different purpose, preserving detail while the stored image is moved and sampled repeatedly.

With the gesture held, the scene is drawn once for colour and once for velocity, followed by four full-screen passes: FXAA, decode, feedback copy and the final blit. Decode is expected to be the most expensive full-screen pass.

The first optimisation target I would measure is the motion field. A macroblock uses one vector sampled at its centre, yet the shader recomputes that value for every fragment in the block. At the default eight-pixel size, the same motion calculation runs sixty-four times for one answer. A block-resolution prepass would eliminate that work.

## **Afterword**

This began with a small idea: a transition between two Three.js scenes that felt like a corrupted file. I expected an afternoon of shader work. Instead, I kept finding pieces of a real codec worth reproducing. Each mechanism made the result feel more _correct_, or at least more convincingly broken.

The hash functions come from [Dave Hoskins’](https://www.shadertoy.com/view/4djSRW) [_Hash without Sine_](https://www.shadertoy.com/view/4djSRW). The history pass uses Catmull-Rom reconstruction to slow the loss of detail through repeated feedback. The arrow overlay in the motion-field views follows [Maxime Heckel’s Shading Motion](https://blog.maximeheckel.com/posts/shading-motion/).