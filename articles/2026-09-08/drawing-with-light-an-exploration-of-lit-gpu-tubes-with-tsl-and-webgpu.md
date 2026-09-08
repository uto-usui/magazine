---
title: "Drawing With Light: An Exploration of Lit GPU Tubes with TSL and WebGPU"
source: "https://tympanus.net/codrops/2026/09/07/drawing-with-light-an-exploration-of-lit-gpu-tubes-with-tsl-and-webgpu/"
publishedDate: "2026-09-07"
category: "design"
feedName: "Codrops"
author: "Mathis Biabiany"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/Biab.png.webp?x57826)](https://luminhands.netlify.app/ "Drawing With Light: An Exploration of Lit GPU Tubes with TSL and WebGPU Demo")

_**Editor’s Note:**_ _Our celebration of the very first **Three.js Conference** is all about the people, ideas, and experiments that make this community so inspiring. Today, we’re incredibly happy to shine a light on **Mathis Biabiany**, whose talent and curiosity have led to this beautiful exploration of lit GPU tubes, TSL, and WebGPU. We’re so grateful that Mathis chose to share this fantastic work with us as part of the celebration. We hope you enjoy getting lost in the details as much as we did._

**🇫🇷 The celebration continues in Paris!** The very first Three.js Conference is bringing the community together for two days of talks, ideas, and connections. Use code `CODROPS` for **15% off** and **[get your ticket →](https://threejs.paris/tickets)**

## Where this came from

I draw a lot of lines. For the last while, my go-to has been [makio-meshline](https://meshline.makio.io/), a TSL-powered meshline library by [David Ronai](https://x.com/makio64) for the WebGPU renderer that honestly does almost everything you’d want: gradients, dashes, textures, dash offsets, instancing, GPU-driven positions, even shadow casting. If you’re doing line work in three.js on WebGPU, it’s lovely.

There’s one thing it can’t do, and it isn’t the library’s fault. Its material extends `MeshBasicNodeMaterial`, so it’s unlit by construction. And once you notice that, you notice it everywhere. Your lines never catch a rim light, never shade across their width, never quite feel like they’re _in_ the scene rather than painted on top of it.

That’s not a bug you can patch. A meshline places every vertex twice and pushes the pair apart **in clip space**, perpendicular to the line’s direction on screen. By the time the geometry exists, you’ve already left the world. There’s no surface, so there’s no normal, and there’s nothing for a light to hit. The ribbon always faces you. That’s the whole trick.

So I had this image stuck in my head: two open hands drawn entirely out of thread, fraying into loose strands below the wrists. I built it with meshlines first and it looked good, but flat. I wanted the threads to be _things_. I wanted them to catch light, to occlude each other properly, to have volume.

That means real geometry. That means tubes. This article is about the tube system that came out of that, the hands built on top of it, and a genuinely humbling detour into why one line of vector maths refused to work.

Three bits I think are worth stealing:

1.  A tube whose geometry is **never rebuilt**. Positions _and_ normals are computed in TSL, on top of a normal PBR material.
2.  The cross-section frame problem, and why you mathematically can’t fully win it.
3.  Authoring curves by **walking a mesh**, so strands describe a shape instead of decorating it.

It’s all TSL on the WebGPU renderer, but the ideas port to plain GLSL just fine.

## The obvious approach, and why it doesn’t fit

The standard answer for “line with volume” is `THREE.TubeGeometry`: sample a curve on the CPU, build a ring of vertices around each sample, then upload the whole thing.

Which is great once. My threads move every frame. Rebuilding and re-uploading a few hundred thousand vertices per frame on the CPU is exactly the work you bought a GPU to avoid.

So the goal became simple: **the triangles never change. Only where they are.**

## A tube that never rebuilds

Here’s the shift that makes everything else fall out. What I upload isn’t a tube. It’s a grid that has no idea what shape it is:

-   `progress` — how far along the curve this ring sits, 0 → 1
-   `angle` — where around the cross-section this vertex sits, 0 → 2π
-   indices stitching quads between neighbouring rings

That’s it. No meaningful positions (a zeroed attribute keeps the pipeline happy), and no meaningful normals. For 90 segments × 3 radial sides, that’s a few hundred vertices of pure _parameter space_.

```
for (let i = 0; i <= tubularSegments; i++) {
  const t = i / tubularSegments
  for (let j = 0; j <= radialSegments; j++) {
    progress.push(t)
    angle.push((j / radialSegments) * Math.PI * 2)
  }
}
```

The actual shape shows up at render time. The material takes a **curve sampler**, a TSL function that maps `progress` to a position, and works out everything else per vertex:

```
// The whole contract: t in [0,1] → vec3. Everything else is derived.
const sampleCurve = (t) => gpuPositionNode(clamp(t, 0, 1))

this.positionNode = Fn(() => {
  const P     = sampleCurve(aProgress)
  const Pnext = sampleCurve(aProgress.add(EPS))   // EPS = half a segment
  const Pprev = sampleCurve(aProgress.sub(EPS))

  // Central difference gives us the tangent, without ever storing one.
  const delta   = Pnext.sub(Pprev)
  const tangent = delta.div(max(delta.length(), float(1e-6)))

  // Build a frame around that tangent (this is the fun part, see below)
  const N = normalize(cross(upAxis, tangent))
  const B = cross(tangent, N)

  // Sweep the ring. The radial direction IS the surface normal.
  const radial = N.mul(cos(aAngle)).add(B.mul(sin(aAngle)))

  vTubeNormal.assign(radial)
  return P.add(radial.mul(radius))
})()

this.normalNode = Fn(() => transformNormalToView(normalize(vTubeNormal)))()
```

Two things here are doing the heavy lifting.

**The normal is free.** The direction you push a vertex away from the spine _is_ the surface normal there. Write it to a varying, hand it to the fragment stage via `normalNode`, and you’re done. That’s what lets this ride on `MeshStandardNodeMaterial` instead of a bespoke shader. We override `positionNode` and `normalNode` and nothing else, so lights, environment maps, roughness, metalness, and shadow passes all just keep working. Unlike the meshline, we never left world space, so nothing had to be faked.

**The curve is a function, not data.** `gpuPositionNode(t)` can be a helix in three lines of TSL, curl noise, or a spline reading from a storage buffer. Animating costs nothing on the CPU. Change a uniform and every vertex re-derives its own position, tangent, frame, and normal. Radius is a function too: `radiusFn(r, progress, angle)`. That turns out to hand you the load-in animation for free later.

One gotcha: with positions living in the shader, the CPU-side bounding box is a lie. Ship it with `frustumCulled = false`, or the mesh will cull itself into nonexistence the first time you orbit.

## The part where I was wrong three times

Everything above worked on the first go except one innocent line, `cross(upAxis, tangent)`. I want to walk through this properly because I got it wrong three times, and each failure taught me something I hadn’t seen written down.

The problem: to sweep a ring around a curve, you need two perpendicular directions at every point, a _frame_. `TubeGeometry` does this with parallel transport: walk the curve, carry the previous frame forward, and rotate it as little as possible at each step. That’s **sequential**. Frame _n_ needs frame _n−1_, and a vertex shader has no “previous vertex”. Every vertex is on its own, with only the tangent to work from.

Here’s the same helix rendered three ways. This is the whole detour in one picture:

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/2-1-1200x675.png.webp?x57826)

**Attempt 1: the branchless orthonormal basis** (Duff et al., the Pixar one everybody uses). Fast, elegant, robust in isolation. It also contains a `sign(tangent.z)`, which means the frame _flips_ whenever a curve crosses the `tangent.z = 0` plane. Two neighbouring rings straddling that plane get a 180° twist between them, and the quad connecting them pinches into a bow-tie.

The middle image is this, and it’s a tidy little proof: a helix’s tangent has `z ∝ cos(a)`, which crosses zero exactly four times over its two turns. There are exactly four pinches, all sitting on the centre line because that’s where the crossings happen to land in space.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/3-1200x675.png.webp?x57826)

**Attempt 2: blend between two reference axes.** Use `(0,1,0)`, ease over to `(0,0,1)` as the tangent goes vertical. Sounds sensible! I even talked myself into believing the blend was safe.

It is not. Somewhere mid-blend, the _blended axis itself_ passes straight through the tangent, at |tangent.y| ≈ 0.93 with my particular easing, and `cross(up, tangent)` collapses to zero. Take a guess which band of directions near-vertical hand strands spend all their time in.

This is the one failure that isn’t in the picture above, and that’s the interesting part: it doesn’t produce a clean artifact. Duff gives you a well-behaved wrong frame. A _collapsed_ frame gives you a normalised near-zero vector, which is to say an arbitrary direction, which is to say bright garbage. On the hands it looked like glitter, hundreds of tiny blown-out slivers scattered through the weave. I spent an embarrassing amount of time hunting for it in the lighting and the bloom before it occurred to me that the geometry was lying. I only found the exact collapse point by writing a ten-line numerical sweep, after my geometric intuition had confidently assured me the blend couldn’t possibly cross the tangent.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/4-1200x675.png.webp?x57826)

**Attempt 3: pick the world axis least aligned with the tangent.** This one genuinely can’t degenerate. The smallest component of a unit vector is at most 1/√3, so the cross product always has something to work with. I was pleased with it. I checked it on the hands, where it looks flawless, and moved on.

Then I put it on the helix (right-hand image). Wherever two tangent components tie, the chosen axis switches and the frame snaps, and the tube breaks into segments. You can see it all the way along, with the worst artifacts at the bends where you can watch the cross-section step sideways. It looks like a length of bamboo.

The reason it passed on the hands is just that the strands there are hair-thin. There aren’t enough pixels across a strand for a rotated cross-section to show up. Which is a small lesson in its own right about _what_ you test on. The artifact was always there; my test subject just couldn’t express it. And even where it hides, it’s still a discontinuity in the surface parameterisation, waiting to tear the first texture mapped across it.

At which point the actual truth is worth saying out loud: **no stateless frame can be continuous for every possible tangent direction.** That’s the hairy ball theorem. You can’t comb a sphere flat. Any rule that maps a direction to a perpendicular has to break _somewhere_ on the sphere of directions. You don’t get to remove the singularity. You only get to choose where it sits and how big it is.

That reframes the whole thing, from “find the right formula” to “put the failure somewhere my content never goes”. And the answer ends up being the simplest of the four:

```
// One fixed reference axis. Singular ONLY where the curve runs exactly
// parallel to it — two points on the sphere. Not a plane. Not a set of seams.
const N = normalize(cross(upAxis, tangent))
const B = cross(tangent, N)
```

`upAxis` is a parameter, defaulting to **+Z**, because strand-y content (hair, grass, kelp, these hands) runs mostly _vertically_. A +Y reference would park every single curve right on top of the singularity. The hands never produce a perfectly Z-aligned tangent, so the bad case simply never renders. Helix: clean. Hands: clean. And the twist that _would_ show up on a Z-running curve is invisible anyway on a round untextured tube, because a rotated circle is still a circle.

If you ever need frames stable enough for textures on arbitrary curves, the real upgrade is computing parallel-transport frames in a compute pass. Walking ~100 samples sequentially is nothing for a single workgroup, and you can read them in the vertex shader. For strand-like work, one cross product is plenty.

All three modes are still in the entity behind a `frameMode` switch because their failures are _visual_, and comparing them side by side is the only honest way to see it. Which is also how the picture above was made.

## Feeding it real curves

Procedural curves are fun, but the hands need authored ones. Each strand is 49–129 control points in a storage buffer, and the sampler reads them with a Catmull-Rom spline:

```
const positionNode = Fn(([progress]) => {
  const f  = progress.mul(float(SEGMENTS))
  const i0 = int(floor(f))
  const u  = f.sub(floor(f))

  const base = instanceIndex.mul(int(SEGMENTS + 1))   // this strand's slice
  const at = (k) => points.element(base.add(clampIndex(i0.add(int(k))))).xyz

  const p0 = at(-1), p1 = at(0), p2 = at(1), p3 = at(2)
  // ...standard Catmull-Rom, then wind / interaction displacement on top
})
```

Worth flagging why it’s a spline and not a `mix()`: with a meshline, you can absolutely get away with linear interpolation between control points because a stroke has no cross-section to deform. A tube punishes it immediately. Every control point becomes a visible facet because the frame is built from the _derivative_, and a polyline’s derivative jumps at every joint. Smooth positions aren’t enough. You need a smooth derivative.

Since `instanceIndex` picks which slice of the buffer to read, one instanced draw renders all 500+ strands. Same grid, one buffer, a different curve per instance. Wind, curl, pointer interaction, and the click shockwave are all just displacement added after the spline sample. None of it touches the CPU.

## Drawing hands by walking a mesh

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/5-1200x675.png.webp?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/5b-1200x675.png.webp?x57826)

That’s the pair above: the same camera twice, showing the plain hand model the strands are walked across, and then what actually gets drawn. The strands are generated once on the CPU by walking that model. The gap between “threads decorating a hand” and “threads _describing_ a hand” turned out to live entirely in how you steer the walk.

**Work on a graph, not triangles.** Weld the geometry’s duplicate vertices (UV seams split them) and record each vertex’s neighbours. Everything else happens on that graph.

**A geodesic distance field is the compass.** One Dijkstra pass out from the wrist vertices gives every vertex its distance _along the surface_ from the wrist. The gradient of that field points “toward the fingertips” everywhere: around the thumb, across the palm, over a knuckle. No world-space direction can do that. Nice bonus: the local maxima of the field _are_ the fingertips, so that’s how the code finds them. No manual markers on the model.

**Flow strands descend the field.** Around 500 walks start near fingertips and step neighbour to neighbour, scoring candidates on how much they descend the field, plus momentum, plus a per-strand sideways bias, plus jitter. The result reads like tendons because the field encodes the hand’s real topology. Then each walk is resampled to a fixed point count (the GPU buffer wants uniform strides), and the ones that reach the wrist keep going. A procedural tail continues the last direction, bending toward straight down with a bit of accumulated wobble. That’s the fraying cascade at the bottom.

**Wander strands cover what flow misses.** Descending walks all want the same ridges, which leaves the back of the hand bare. So a second family of ~1000 longer walks adds a _coverage_ term. A coarse occupancy grid over the surface penalises ground that earlier walks already claimed, nudging each new thread toward empty patches. They end up wrapping the form like thread wound round a mould. Their local crowding gets baked into the buffer’s 4th channel, so the shader can thin strands exactly where the weave piles up. Otherwise the wrist fuses into a solid shell.

## Small decisions that punched above their weight

**The reveal is a radius, not a fade.** The load-in animation gates each strand’s radius along `progress`: ahead of the sweeping front, the radius is simply zero. No opacity, no transparency sorting, no blend cost. The material stays fully opaque, and strands _grow_ out of the fingertips instead of fading in. That’s `radiusFn` earning its keep. The tube entity didn’t change at all.

**Bloom reads a G-buffer, not the frame.** Emissive goes to its own MRT target, and bloom blurs only that. The pale weave stays crisp while accent strands glow. About 12% of strands are accented, chosen by hashing their seed, with bright packets running along them (a sharpened sine of `progress` and time). One trap: with that setup, materials that _shouldn’t_ glow must actively write **black** to the emissive target. Unlit things that _should_ glow, such as the core sprite and the dust, have to route their colour into it explicitly via their own `mrtNode`. Neither happens by default.

**Interaction lives in screen space.** Each strand point projects itself to NDC in the vertex shader and measures its distance to the cursor _on screen_, so the brush sits under the mouse from any camera angle. A world-space radius only lines up from one viewpoint. The push follows pointer _velocity_, so threads get swept along a stroke rather than shoved away from a point. And the click shockwave is one uniform, an age reset to 0 on click, read independently by three different shaders: the strand displacement ring, their emissive flash, and the core’s flare. They’re in sync because they’re literally the same clock.

**The camera eases frame-rate-independently.** Orbit, hover parallax, and wheel zoom all chase targets with `k = 1 − e^(−damping · dt)`. A plain lerp factor eases visibly quicker on a 120Hz screen than on a 60Hz one. The exponential is one `exp()` and behaves the same everywhere.

## Numbers

-   ~1,500 tube instances across two strand families, up to 129 control points each
-   Tube grid: 90 tubular × 3 radial segments. Triangular cross-sections, because at this thickness lighting sells roundness long before geometry needs to
-   All motion in the vertex stage; per-frame CPU work is a few uniform writes
-   CPU authoring (graph + Dijkstra + ~1,500 walks) runs once at load and is cached across parameter tweaks
-   Post: emissive-only bloom, then SMAA. Worth knowing that renderer-level MSAA quietly does nothing once you render through a post pipeline, since the scene never reaches the default framebuffer

## Wrapping up

If there’s one takeaway, it’s this: **move the** _**definition**_ **of your geometry into the shader, not just its animation.** Once a tube is “a grid of parameters plus a function”, the expensive part of animated tubes disappears, and the expressive parts, radius as an animation channel, curves as buffers, normals as a by-product, all fall out of a single `positionNode`.

And when a formula keeps fighting you the way those frames fought me, sometimes the theorem is telling you that you can’t win everywhere. The actual craft is picking where to lose.