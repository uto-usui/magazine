---
title: "Sixty Frames for the Record: A Three.js Game, Seven Fly-Throughs, and a Wall of CRTs"
source: "https://tympanus.net/codrops/2026/08/22/sixty-frames-for-the-record-a-three-js-game-seven-fly-throughs-and-a-wall-of-crts/"
publishedDate: "2026-08-22"
category: "design"
feedName: "Codrops"
author: "Filip Zrnzevic"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/sixty-frames-main-1.jpg.webp?x57826)](https://lab.filipzrnzevic.com/frontier "Sixty Frames for the Record: A Three.js Game, Seven Fly-Throughs, and a Wall of CRTs Demo")

I make music under two names. [LXSTNGHT](https://open.spotify.com/artist/6YXgRMajnjib8j6Cxzcryp?si=AZSN51FASsOjG_n2V7vV7g) is the dark one, future garage and downtempo. [F/MEMORY](https://open.spotify.com/artist/3Mw8hza7TPCUNuJQE55yJH?si=2690a80f00b34f48) runs hardwave and chill. And I build for the web. The music matters to this story because of what it forced: connecting the different things I make (tracks, modeled geometry, real-time code) into single pieces. The connective tissue is a lab, an experiments gallery built in Three.js and React Three Fiber, where every piece exists to give the music somewhere to live.

That constraint turned out to be the whole method. A demo can be a tech showcase; a release has to hold a mood for three and a half minutes at 60 fps on whatever machine the listener owns. The goal is always the same: cinematic pictures running in a browser. Real light, real atmosphere, and a frame budget that survives contact with other people’s hardware. So the lab became a place where the renderer gets interrogated: what does this effect actually cost, what is this frame actually made of, why did that one frame die.

This article is a tour of three bodies of work and the Three.js lessons they cost me: **FRONTIER**, a 3D Space Invaders with my songs in the jukebox; the **LXSTNGHT series**, seven fly-through worlds running on one shared engine; and **/fm**, a wall of failing CRT monitors that plays the F/MEMORY record. The geometry is modeled in Blender, that’s a house rule, nothing here is a primitive wearing a clever shader. But this piece is about the other half of the pipeline: what happens after `useGLTF` resolves.

## FRONTIER: the game

**Play it → [lab.filipzrnzevic.com/frontier](https://lab.filipzrnzevic.com/frontier)**

FRONTIER is Space Invaders staged like a broadcast: a voxel fleet baked in Blender, an open deck dissolving into fog, one spotlight rig, and a simulation that runs the entire fight outside React. The fleet ships as a single Draco GLB and renders as a stack of `InstancedMesh` pools: six invader types in a two-frame stepped march, two material slots apiece, plus bosses that erode voxel by voxel as you strip their hull.

### The floor is a shader, because every texture failed

The deck went through four full rejections (a canvas-textured board, a planar reflector, a black-mirror display), and every version read wrong for a different reason: fog lifting the midtones, environment sheen on the reflector, the key light’s specular lobe, a base color that was never quite black. The escape was to stop shipping a surface at all, and then rebuild the ground as **one analytic `ShaderMaterial`**: a hexagonal lattice computed from a hex-distance function with `fwidth()` anti-aliasing. No texture, no mip chain, crisp at every distance, and nothing that can render the wrong color.

Once the floor was a shader, it could become an instrument. The lattice does its own fog math so it melts into the scene fog instead of fighting it. It receives real shadow maps, which a custom `ShaderMaterial` can do if you include Three.js’s `shadowmap` chunks and declare the varyings the chunks expect. And it takes the fight as input: a small uniform array of emitters lets the ship’s thrust and every falling bomb drag a genuine pool of light across the tiles. Event energy displaces the lattice in the vertex shader, and a five-line JavaScript twin of that displacement (`fieldLift`) lets every invader, bunker, and drop ride the same surface the GPU is bending.

**The lesson that generalizes: a custom-shader ground is invisible to your lighting rig.** Scene lights don’t touch a `ShaderMaterial` unless you feed them in yourself. The patrol searchlight swept that board for a week and lit nothing until it became a uniform.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/frontier-die-1200x900.jpg.webp?x57826)

### Menus became things in the lane

Between waves you pick an upgrade. The first version was a modal, three cards, the game paused behind a scrim, and it flattened the whole piece. The version that shipped: three **hex gates** standing in the lane, closing on you while the fleet is under way. You take an upgrade by flying through one. Same input as the rest of the game, no pause, and the choice costs something, because taking the left gate means giving up the right.

The part that still makes me smile: `RingGeometry(r, r + 0.34, 6)` _is_ a hex ring. The board’s own cell, scaled into a doorway. No modeling, no authoring, six segments.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/frontier-001-1200x900.jpg.webp?x57826)

### The record is the reason the game exists

The jukebox plays F/MEMORY, the full record, newest track first. The rule I’d give anyone building a music-led game: **the soundtrack is the product, the SFX are punctuation.** Every sound effect in FRONTIER runs through one global bus that ducks hard while a track plays, so a twenty-minute run is twenty minutes of listening with a fight on top, not the other way around.

### What the fight costs, measured

The receipts, from a headless bench on the real GPU (an M1 Max, Chrome on ANGLE/Metal): mid-fight, at a 5.2-megapixel drawing buffer, the entire frame is **2 ms of GPU time at the 95th percentile**. Swarm, shadow pass, HDR bloom, composite, all of it. The game was never fill-bound. Three findings from getting it there are worth stealing directly:

**Budget pixels, not device-pixel-ratio.** `dpr={2}` on a large window quietly handed the game a 9.7-megapixel drawing buffer. The same launch config on a 5K display and a 14-inch laptop differ by more than 2x in pixels at the _same_ DPR. FRONTIER caps the buffer at an absolute pixel budget (5.2 MP, with LOW/HIGH tiers in the settings) and derives DPR from it. Identical output, half the fill.

**Never put a `mix-blend-mode` over a WebGL canvas.** The death flash was a fullscreen DOM veil with `mix-blend-mode: color`. Every frame it was visible, the browser’s GPU _process_ paid 30–45 ms compositing the whole 5-megapixel canvas through Skia’s slow path. Invisible to every in-page profiler: the draw passes measured innocent, the main thread was idle, and the game still hitched. The veil is now a fused composer effect, the same CSS `color` blend math in fifteen lines of GLSL. If you’re grading a canvas, grade it _in_ the canvas.

**Lights toggle intensity, never visibility.** Three.js bakes the scene’s light count into every lit material’s shader as a compile-time constant, so the count is part of the program cache key. FRONTIER kept point lights inside groups that toggled `visible` (the ship, the boss, the beam weapon), and the first frame of every dramatic entrance changed the light count and recompiled ~20 programs mid-fight: a few hundred milliseconds of dead stop, always “during an explosion”, for weeks.

```
<group>                                     {/* always visible */}
  <group ref={meshes} visible={false}>      {/* the hull toggles */}
    <instancedMesh ... />
  </group>
  <pointLight intensity={0} ... />          {/* always counted */}
</group>
```

A light at intensity 0 still occupies its slot in the count, so the program key never changes. That one structural change took mid-fight shader compiles from one or two per run to zero, and total programs from 140 to 98. The full hunt, including the ways three different profilers lied before one told the truth, is its own detective story, and it’s coming as a separate write-up.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/frontier-armory-1200x900.jpg.webp?x57826)

## LXSTNGHT: one engine, seven worlds

**The shelf → [lab.filipzrnzevic.com/lxstnght](https://lab.filipzrnzevic.com/lxstnght)**

The LXSTNGHT series is seven fly-throughs ([longeron](https://lab.filipzrnzevic.com/lxstnght/longeron), [flue](https://lab.filipzrnzevic.com/lxstnght/flue), [ambit](https://lab.filipzrnzevic.com/lxstnght/ambit), [breach](https://lab.filipzrnzevic.com/lxstnght/breach), [hypostyle](https://lab.filipzrnzevic.com/lxstnght/hypostyle), [marrow](https://lab.filipzrnzevic.com/lxstnght/marrow), [derelict](https://lab.filipzrnzevic.com/lxstnght/derelict)) built to promote the record. Each one is a place: a bored derelict hull, a biomech corridor, a furnace shaft you ascend, an 84-meter processional hall. You scroll, you fly, the music plays.

One thing to be upfront about: these are experiments, and they sit at very different stages of polish and optimization. Some have had full performance passes, some are still paying for their first one. That’s what the shelf is for. The whole point is to keep pushing each of them further, more cinematic and better optimized for the browser, and the lessons below are what that push keeps costing.

They stay shippable as a _series_ because of one contract: **the runtime dispatches on material name.** `HullMetal` gets triplanar weathered metal and static batching. `Strip` and `HoleGlowMat` are emissive practicals. `Reactor*` is a light locator, hidden at runtime, that the volumetric stages from. Swap the GLB, keep the engine: camera rig, HUD, post stack, audio map, all already wired. There’s even a spare piece on the bench (`epigraph`) built mostly to prove the swap works.

That’s the architecture. The rest of this section is the Three.js engineering the series ran into: the expensive lessons, with the piece that paid for each one.

### Draw calls: 1,421 → 25, then un-learning half of it (longeron)

`longeron` is a 30-meter corridor ported from a Blender scene of ~1,500 objects. First measurement: **1,421 draw calls for 568k triangles.** One call per bolt. Draw-call bound, which is why a 5K display crawled while the triangle count looked fine.

The fix is the classic one: clone each geometry, bake its `matrixWorld` in, strip to a shared attribute set, group by material name, `mergeGeometries`. **25 draw calls, no visual change.**

Then the correction, which is the more useful half. One 30-meter mesh per material means its bounding sphere always intersects the frustum, so **the merge had silently disabled frustum culling**, and the whole corridor was submitted every frame. I’d dismissed that, reasoning a corridor viewed down its own axis has nothing outside the view. True of what’s ahead. Completely wrong about what’s _behind you_. Re-merging per material **per 3-meter z-segment** brought back culling and cut submitted triangles 21–37% depending on where you stand.

And the trick that makes merged scenes animatable at all: the merge destroys per-object identity, so **bake identity into vertex attributes while you still have it**. During the merge, each source object writes its bounding-box center and a hash of it into two custom attributes. That’s what lets a single merged wall carry per-panel light animation, with every panel flat-lit at any instant instead of smeared by a gradient.

### HDR is a discipline, not a flag (longeron, marrow, derelict, breach)

The series’ look is `toneMapped: false` emissives hot enough for Bloom to halo, real HDR values moving through the composer. Three bugs taught me what that actually demands, and all three wear disguises:

**The composer buffer is 8-bit unless you say otherwise.** A corridor kept “bleeding white” through six fix attempts (metalness, light height, bloom threshold, exposure), and the actual cause was `<EffectComposer>` defaulting to an 8-bit frame buffer: emissives at intensity 14 clipped to 1.0 _before_ tone mapping, and the grade amplified the clipped plateau. `frameBufferType={THREE.HalfFloatType}`. Any composer carrying HDR emissives needs it.

**Bloom’s default blend is an LDR operator.** The series’ longest-running bug, black shapes wearing glowing rims across three pieces, came down to `postprocessing`‘s Bloom defaulting to `BlendFunction.SCREEN`: `1-(1-scene)(1-bloom)`. When scene _and_ bloom both exceed 1.0, which is exactly a hot emissive haloing, the two negatives multiply large-positive and the result flips negative. `(1-9)(1-3) = +16`, so `1-16 = -15`. Black. It even explains why raising an emissive made things _worse_: intensity 4 to 9 crossed the flip threshold. One prop: `blendFunction={BlendFunction.ADD}`. Additive can never invert.

**A grade can mint NaN.** `BrightnessContrast` is linear. At contrast 0.12, black maps to -0.068. An 8-bit buffer would have clamped that; the HalfFloat buffer you just installed happily _stores_ it, and Three.js’s sRGB encode then evaluates `pow(negative, 0.41666)`. NaN, which displays as white. The fix is a five-line clamp effect sitting immediately after the grade. If you see white speckle that only appears when a grade is on, check for this before touching anything else.

### Light that travels (flue, longeron)

The signature move of the series is light moving through architecture. A charge running down a 28-meter neon rail, a crest sweeping a wall of panels. Two rules made it read:

**A wave means the fixture is OFF.** Every early version kept the run lit and rode a modulation on top, and nothing read as travelling, because there was always something to see along the whole length. The version that works holds the strip _black_ and runs one bright head along it: a sawtooth with a short duty cycle, a hard `smoothstep` leading edge, a long tail. If the rest of the fixture is still glowing, you’ve built a modulation, not a wave.

**Additive, past white.** The head _adds_ a near-white push on top of the fixture’s own color, deliberately overshooting 1.0 into the HalfFloat buffer so Bloom halos exactly the crest. Multiplying just makes the strip a brighter version of itself. Adding is what sells it as a charge.

And per-strip desync is non-negotiable. Four perfectly synchronized rails read as one fake machine. With object identity gone in the merge, each run’s phase comes from hashing its constant lateral position.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/placeholder-001-1200x900.jpg.webp?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/clay_09-1200x675.png.webp?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/look_43-1200x675.png.webp?x57826)

### The music is choreographed, not reactive

Every piece in the series moves with its track, and none of it is a live FFT deciding things at runtime. The realization that reframed it: **the file doesn’t change, so a kick is not a real-time question.** An offline analysis pass bakes BPM, the beat grid, kick times, and per-frame band envelopes to JSON per track. The runtime is a lookup against `audio.currentTime`.

The reason isn’t purity. It’s that live detection is _wrong_. Band level says “there is bass”, which is true of every frame of every mastered track. A sustained bass note is as loud as a kick and is not one. A kick is a transient, spectral flux, the positive frame-to-frame change. And offline, you can afford to detect sensitively, then keep only what lands on the beat grid.

Downstream, one doctrine: **a beat causes a discontinuity.** Spend it on a small continuous brightness nudge and “the audio reactivity does nothing”. In `longeron`, a beat doesn’t brighten the light heads. It lends the wave most of a pitch of travel, paid out over 200 ms, so the charges visibly _dash_ on the kick and coast between. Only loudness-to-gain is continuous.

### Measure, don’t theorize (breach)

The newest piece got the full performance pass, and the punchline is a warning about intuition. p50 said a clean 60 fps. **p95 was 49.6 ms**, and p95 is the number you feel. The probe (40 lines, accumulating `renderer.info` with `autoReset = false`, because the composer resets it several times per frame) found 1.88 million triangles per frame against 944k visible: one beauty pass plus the volumetric’s depth prepass.

The single biggest win wasn’t a Three.js change at all. A 13-mm two-segment bevel modifier on 1,600 greeble boxes, sub-pixel at every distance the camera can reach, was carrying 27% of the scene’s triangles. Pure vertex cost for a highlight nobody can resolve. After cutting it and one more pass: **p95 17.9 ms, zero stalls, at more resolution.**

And the fix that delivered _nothing_ is the better lesson. Flagging background meshes to skip shadows changed nothing, because the runtime merges statics into one batch and **a batch carries one `castShadow` flag. Batching erases per-object properties.** Any per-mesh flag has to become a batch split, or it silently does nothing.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/breach-001-1200x900.jpg.webp?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/breach-002-1200x900.jpg.webp?x57826)

## /fm: the record, playing on a wall of dying monitors

**Visit → [lab.filipzrnzevic.com/fm](https://lab.filipzrnzevic.com/fm)**

The F/MEMORY side got a different kind of piece: a monitor den. Twenty-four CRTs racked in a fogged room, each one a live canvas texture (spectrum readouts, clocks, static), and the record playing through it. There’s no transport UI. You **drag the glass to scrub**, tap a screen to kill it to static.

Three things under the hood earned their keep. The 24 panels repaint on a staggered 24 Hz schedule, each tube on its own slot, so twenty-four live textures cost less than the original eleven did at 60. The track title is _cast onto the back wall as light_, tiled and scattered like a gobo throw; it started as a real `SpotLight.map` until I measured that Three.js collects lights globally (a light can’t be masked to specific objects), so it became a world-space planar texture injected into the emissive term of exactly two materials: the wall, and the cables that occlude it. And one monitor is a CCTV feed of the room itself, rendered from a second camera in the corner. Bounded recursion, since that screen hides during its own feed render. It’s also deliberately the _worst_ tube on the wall, 12 fps with a dragging roll bar, because a clean second view reads as a bug and a degraded one reads as surveillance.

## What keeps proving true

Every project above re-taught some of the same lessons. The short version, as rules I now build by:

-   **Budget pixels, not DPR.** A 5K display at the same ratio costs more than double a laptop. Cap the drawing buffer in megapixels.
-   **Judge the worst percentile, never the median.** Vsync pins the median at 60 long after your budget is gone.
-   **The light count is part of every lit shader’s cache key.** Lights toggle intensity, never visibility.
-   **HDR through a composer is a chain of custody**: HalfFloat buffer, additive bloom, clamp after the grade. Break any link, and the failure shows up somewhere else, in disguise.
-   **Batching erases per-object flags.** Split the batch, or the flag is a no-op.
-   **Bisect by control, not by code.** Every piece ships a switch panel, a dozen keyed toggles over lights, fog, grades, effects. The series’ worst bug was localized in seconds by flipping channels, after four rounds of shader theory failed to.
-   **A kick is not a level, and it is not a real-time question.** Bake the analysis; choreograph, don’t react.
-   **Measure before theorizing.** One Blender bevel beat every resolution lever in the toolbox, and nobody suspected it.

## Where to find it

**The open doors are the three above: [FRONTIER](https://lab.filipzrnzevic.com/frontier), the [LXSTNGHT shelf](https://lab.filipzrnzevic.com/lxstnght), and [/fm](https://lab.filipzrnzevic.com/fm).** The rest of the lab lives behind a gate, on purpose: it’s a working sketchbook, and pieces graduate to a public address when they’re ready. Every piece here is an experiment mid-push, toward more cinematic and better optimized. Next from the lab: the full story of the FRONTIER freeze. Three lying profilers, a shader compile hiding in the light count, and the pipeline-state layer below all of it.

_Built with Three.js, React Three Fiber, pmndrs/postprocessing, GSAP, and Blender. Thanks to the_ [_Three.js_](https://github.com/threejs) _and_ [_pmndrs_](https://github.com/pmndrs) _maintainers. Every behaviour described here is a reasonable engineering trade; writing them down is the tax._