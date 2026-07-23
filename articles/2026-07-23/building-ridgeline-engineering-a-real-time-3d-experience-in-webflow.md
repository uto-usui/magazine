---
title: "Building Ridgeline: Engineering a Real-Time 3D Experience in Webflow"
source: "https://tympanus.net/codrops/2026/07/22/building-ridgeline-engineering-a-real-time-3d-experience-in-webflow/"
publishedDate: "2026-07-22"
category: "design"
feedName: "Codrops"
author: "Filip Zrnzevic"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/filip.jpg.webp?x36066)](https://topography.webflow.io/ "Building Ridgeline: Engineering a Real-Time 3D Experience in Webflow Demo")

Ridgeline is a hiking and photography site: a cinematic walk through three real alpine treks. It’s a personal project, and really my way of working out how I want to build sites. It started from one question: Can a [Webflow](https://webflow.com/) site host genuinely real 3D terrain, meaning actual elevation data (DEMs) draped as a survey-contour mesh and rendered live in Three.js, not a video loop and not a baked sprite sheet, without giving up Webflow’s editability?

The one rule I set myself was a single sentence: _“I don’t care if it’s a built-in component or external JS, I want to SEE it.”_ That rule quietly decided the whole architecture. I looked at two ways to get real-time 3D into Webflow before I committed to one, and that decision (trade-offs and all) is where the real story is.

The finished site is three “condition” scenes, each a real trek drawn on its own terrain: **Dawn** (Tre Cime, a storm), **Sunrise** (Mont Blanc, blue-hour into pink), and **Snow** (Annapurna, night blue with falling snow). They’re tied together with scroll-driven photography and ambient sound, plus an atlas homepage that flies through the terrain with three clickable scene previews. All of it is real geometry, and all of it is built and maintained from code through the [Webflow MCP](https://developers.webflow.com/#mcp) while staying a normal, human-editable Webflow project.

The Dawn trek is mine. I recorded the hike above Cortina in the Tre Cime, exported the activity from Strava as a GPS track (GPX), cleaned the usual GPS spikes, and draped the real trace onto the true SRTM slope. Only a normalized, coordinate-free version of the track ships, so the terrain is recognizable but the exact route isn’t exposed. (Sunrise and Snow use plausible synthesized routes, since I didn’t have a recorded track for those.)

One more thing worth saying up front, because it shaped how fast I could move: the whole site was coded with Claude (Opus 4.8 and Fable 5), driving the Webflow MCP, and it came together in about a week.

I also kept a build log from day one: the decisions, the wins, and the wrong turns. This write-up is drawn straight from it, so the mistakes are in here too, not just the tidy final result.

## The stack

-   **Three.js + React Three Fiber + drei** for the 3D scenes.
-   **GSAP (ScrollTrigger) + Lenis** for scroll and animation.
-   **Blender** (driven through the Blender MCP) for every mesh, modeled or baked, then exported to glTF (Draco-compressed).
-   **Cloudflare R2** to host the JS bundle plus the GLB and texture assets (a CDN, with a cache-busted loader).
-   **Webflow** for structure, styling, pages, and CMS: the human-editable surface.
-   **Webflow MCP** (1.3 at the time of writing) as the build layer, driven by Claude: pages, components, classes, variables, custom code, publishing.
-   **Strava** as the data source for the real Dawn trek, exported as a GPX track and draped on the SRTM terrain.

## 1\. Two ways to put React into Webflow, and why I chose the embed

Webflow has a proper native route for this: a Code Component (deployed via DevLink or a shared library) that lives in the Designer as a first-class element. It’s a great fit when your component is UI-shaped. Mine was a different animal. A single heavy WebGL bundle with its own build step, Three.js, a Blender-baked asset pipeline, and R2-hosted GLBs is a lot of machinery to route through any component system. So I weighed it against a self-hosted JS embed, and for this project the embed won. The trade-off is the interesting part:

-   **Self-contained build.** Three.js, the bundler, and the assets all live in one place I control end to end.
-   **Iterates in seconds.** Deploy the bundle, hard-refresh, done. No republish for a behavior change.
-   **Portable.** The same embed runs on any site or CMS, which suits a bundle this specialized.

The one thing an embed isn’t is a drag-and-drop Designer element. I solved that with attribute-driven mounting. The embed looks for host elements the designer places (like `[data-terrain-scene]` or `[data-terrain-card]`) and mounts into them. The designer stays in control of _where_; the code controls _what_.

```
// The embed hunts for designer-placed hosts and mounts into them, so the
// Webflow user keeps arranging layout and the 3D fills the slots they define.

document.querySelectorAll("[data-terrain-card]").forEach((host) => {
  const key = host.getAttribute("data-terrain-card"); // "dawn" | "sunrise" | "snow"
  mountScenePreview(host, key);
});
```

**Takeaways**

1.  Match the integration path to the component. Validate it fits your use case before you commit.
2.  A self-hosted embed trades one Designer convenience for a self-contained build and instant iteration.
3.  Attribute-driven mounting keeps the split clean: Webflow owns layout, code owns behavior.

## 2\. Building the whole site from code: the Webflow MCP workflow

This is the part that surprised me most. The entire site (pages, components, classes, CSS, variables, custom code, SEO, publishing) is built and maintained by an agent through the [Webflow MCP](https://developers.webflow.com/mcp/reference/overview) (Model Context Protocol) server. The agent here is Claude. And the output is still a completely normal Webflow project a human can open and edit.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/ridgeline-image-02-1200x900.jpg.webp?x36066)

The governing rule I settled on:

> Markup and CSS live in the Webflow Designer as named components and classes. Behavior, 3D, and animation live in versioned JS on R2. The Designer holds structure; the CDN holds behavior.

One thing worth knowing early: Webflow gives you two places for custom code, and they’re for different jobs. There are registered scripts (the Scripts API, injected JS), and there’s head/footer custom code (raw HTML/CSS). Anything that has to exist at _first paint_ belongs in the second one, and I’ll get to exactly why in the flash section.

**Takeaways**

1.  An agent can drive a real Webflow build via MCP and leave a fully human-editable project behind.
2.  Keep a hard line: structure in Webflow, behavior in code. That’s what keeps both halves maintainable.

## 3\. Making the 3D real: Blender to glTF to Three.js

The non-negotiable was that the geometry is real, not a clever shader on a primitive. Every terrain is a real DEM (an SRTM elevation dataset) for an actual massif, modeled in Blender, exported to glTF, and loaded in Three.js. If it’s “a crystal monolith,” the answer starts in Blender, not in JSX.

The pipeline:

1.  Model or bake in Blender. I use a parametric `build.py` for math-defined shapes and interactive modeling for art-directed ones. Either way a real `.blend` exists so the geometry can be iterated later.
2.  Export to glTF with the flags that matter:

```
bpy.ops.export_scene.gltf(
    export_yup=True,        # Blender Z-up to three.js Y-up
    export_apply=True,      # bake modifiers
    export_extras=True,     # object custom props to glTF extras to three.js userData
    # ALWAYS Draco-compress. Static meshes shrink 5-13x (11 MB to ~1 MB)
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=6,
    export_draco_position_quantization=14,
)
```

3.  Load with `useGLTF`, traverse to find named objects, apply materials, and capture per-instance state at load. Don’t recompute geometry at runtime.

Blender ran through its own MCP too, the same agentic setup as Webflow, so model tweaks could happen directly in Blender when a scene needed one, with no manual round-trip through the UI.

The three terrain GLBs land at roughly 540-580 KB each after Draco, small enough that the download was never the bottleneck. The bottlenecks were all on the GPU and the main thread, which is the rest of this article.

### The survey-map look is one shader, no textures

The contour-map aesthetic isn’t a texture. It’s a fragment shader that reads the mesh’s world-space height. The trick that keeps the lines crisp at any camera distance is `fwidth()`: it derives the anti-alias width in _screen space_ from the rate of change of the band index, so lines are one pixel wide whether you’re zoomed in or out.

```
// Survey-contour terrain (fragment): banding by elevation, hillshade, snow line.
float scaled = vWorldPos.y * uContourFreq;            // height to band index
float dMinor = abs(fract(scaled) - 0.5) * 2.0;
float aa     = fwidth(scaled) * 2.0;                  // screen-space AA width, crisp at any zoom
float minor  = 1.0 - smoothstep(uContourWidth - aa, uContourWidth + aa, dMinor);

// every Nth line is a bolder "index" contour, the classic survey-map read
float dMajor = abs(fract(scaled / uMajorEvery) - 0.5) * 2.0;
float major  = 1.0 - smoothstep(uContourWidth * uMajorBoost - aa, uContourWidth * uMajorBoost + aa, dMajor);
float line   = max(minor * uMinorDim, major);

// hillshade from the surface normal, elevation tint, snow above the line
float shade  = clamp(dot(normalize(vWorldNormal), normalize(uLightDir)), 0.0, 1.0);
float elev   = clamp((vWorldPos.y - uElevLo) / (uElevHi - uElevLo), 0.0, 1.0);
vec3  ground = mix(uGround, uGroundHi, elev);
ground = mix(ground, mix(uGround * 0.5, ground * 0.92, shade), uHillshade);
ground = mix(ground, uSnowColor, smoothstep(uSnowLineY, uSnowLineY + uSnowSoftness, vWorldPos.y) * uSnowStrength);

vec3 contourCol = mix(uContourLo, uContourHi, elev);
gl_FragColor = vec4(mix(ground, contourCol, line), 1.0);
```

Every scene is the same shader with a different set of uniforms (ground and contour colors, snow strength, light direction), which is what lets Dawn, Sunrise, and Snow feel like three places while sharing one program. One small touch that punches above its weight: a tiny per-pixel dither ((hash(gl\_FragCoord.xy) – 0.5) \* 0.0045) kills the 8-bit banding that otherwise shows up as grainy blotches in the near-black dawn gradients.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/ridgeline-thumbnail-03-1200x900.jpg.webp?x36066)

**Takeaways**

1.  Real geometry reads differently than a faked primitive. It’s worth the pipeline.
2.  `export_yup`, `export_apply`, `export_extras`, and Draco are the four flags you always want.
3.  `fwidth()` gives you resolution-independent line width, the key to crisp procedural contours at any zoom.
4.  One shader plus per-scene uniforms beats three shaders, and a cheap dither beats visible 8-bit banding.

## **4\. Animation: scroll without re-rendering React**

All motion is scroll-driven, and the cardinal rule is that React never re-renders on scroll. Scroll progress goes into a ref and is read inside the render loop.

-   Lenis drives smooth scroll and feeds ScrollTrigger.
-   GSAP ScrollTrigger owns pinning and scrub.
-   Progress goes into a `ref`, read every frame in `useFrame`. No React state on the scroll path.

```
// Lenis + GSAP, wired once. Lenis drives the ticker; ScrollTrigger reads it.

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

Two patterns did the heavy lifting.

First, the frame-collapse section. A full-screen image collapses into a small 4:5 plate while surrounding image columns stream in. The trap: animating `width` and height from full-screen to the plate changes the aspect ratio every frame, which forces `object-fit` to re-crop each frame, and that re-crop is a visible jump. The fix was to make the element a fixed 4:5 box, sized once to cover the viewport, animated purely by `transform: scale`. Constant box plus constant aspect means the browser computes the crop once and never re-crops, with zero per-frame layout.

```
// Uniform scale only. No width/height tween, so no re-crop, no layout thrash.

const coverW = Math.max(W, H * 0.8);
const scale = ip(ip(1.14, 1, parallax), plateW / coverW, collapse);
gsap.set(hero, { xPercent: -50, yPercent: -50, scale });
```

Then the trap after that, which cost me far too long. A CSS drift animation whose keyframes started from an offset state (`scale(1.04) translate(...)`). The instant it engaged, the element snapped to that offset. A second “jump” that survived every fix to the collapse math, because it wasn’t the collapse. The lesson: any animation that toggles on mid-scroll has to start from the element’s resting state (identity), or it pops.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/ridgeline-thumbnail-06-1200x900.jpg.webp?x36066)

**Takeaways**

1.  Never re-render React on scroll. Progress in a ref, read in the frame loop.
2.  Animating `width` and `height` re-crops `object-fit` every frame. Prefer transform: it’s compositable, no layout.
3.  A keyframe that doesn’t start at identity will snap when it engages, and it hides from the code you _think_ is responsible.

## **5\. The seams: preloader, first-paint flash, audio gate**

The 3D was never the hard part. The seams, the moments between states, ate most of the time. Every one is a teachable gotcha.

Start with the first-paint flash. On a hard reload you’d catch a split-second of a plain background before the dark preloader showed up. It’s a timing problem: the site’s JS is injected by a loader, so it runs _after_ the browser has already painted the raw HTML, which means JS can’t prevent its own pre-load flash. The cover has to exist in the head custom code, synchronously, before anything else:

```
<!-- In Webflow head custom code. Runs at first paint, before the JS loads. -->
<style>html,body{background:#0a0a09}</style>
<style id="topo-fp-guard">
  html,body{background:#0a0a0c!important}
  body>*{visibility:hidden!important}   /* hide everything until the JS takes over */
</style>
<!-- Failsafe: if the JS never loads, don't leave the page blank forever. -->
<script>setTimeout(function(){var g=document.getElementById("topo-fp-guard");if(g)g.remove();},8000);</script>
```

The JS removes `#topo-fp-guard` in `init()` and raises the real preloader in the same tick, so there’s no flash on the way out either. That `body>*{visibility:hidden}` is aggressive, so the failsafe timeout is what keeps a JS failure from leaving the page blank.

Then the audio gate. Browsers block autoplay until a user gesture, so the preloader ends on an explicit Enter or Enter-muted choice, which doubles as the gesture that unlocks the ambient audio bus. Trying to autoplay before that is a guaranteed console error.

### **Sound: an ambient layer that tracks the scene**

Once the gate unlocks the bus, each scene runs its own quiet audio, so it reads as atmosphere rather than a soundtrack.

-   **A per-scene ambient bed.** Sunrise gets a soft forest loop, Snow a thin snow-wind, and Dawn stays “silent” because its storm carries the sound. Beds cross-fade with the scene swap, so there’s no hard cut on navigation.
-   **Events, not a loop.** Reaching a summit on the trek line plays a short arrival chime. The Dawn storm is the showpiece: each lightning strike schedules its thunder by distance, `setTimeout(() => audio.thunder(d), 350 + d * 3200)`, so a close bolt cracks almost immediately and a far one rumbles seconds later, exactly like the real thing. Low background rumbles roll in every 7-19s to keep the storm alive between strikes.
-   **One switch controls all of it.** The gate’s Enter or Enter-muted choice sets a single `window.__topoSound.enabled` flag, broadcast on a `topo:sound` event, and every scene’s audio reads from it. Muting is instant and survives page transitions.

The rule I followed: sound should be the thing you’d miss if it were gone, not the thing you notice when it’s there.

**Takeaways**

1.  A loader-injected script can’t prevent its own first-paint flash. The guard belongs in synchronous head code.
2.  Any full-page guard needs a failsafe timeout, or a load failure means a permanently blank page.
3.  Fold the audio-unlock gesture into a UI moment you already have (the Enter button). Don’t bolt on a separate prompt.
4.  Tie sound to the scene. Per-scene beds plus events like distance-timed thunder sell the place, and one global mute flag keeps it instant and nav-safe.

## **6\. Page transitions without the frame drop**

Navigating between scenes is a PJAX swap under a WebGL “flood” cover, a topographic-contour reveal that sweeps in, holds, then drains. The key architectural call: the terrain canvas is a single persistent WebGL context. Navigation swaps the scene data (`setScene`), it does not tear down and re-create the canvas. Spinning up a fresh context per navigation is how you get evicted contexts and black flashes.

The residual problem was subtler. The flood already drained on a scene-ready event, but that event fired when the new mesh was _parsed_, before its material’s shader had compiled. So the compile stalled the main thread _during the visible reveal_. The fix is `compileAsync`:

```
// Compile the swapped-in scene's shader + upload its GLB OFF the main thread,
// and only fire scene-ready (which drains the flood) once it's actually GPU-ready.

if (gl.compileAsync) {
  const done = () => onMesh(mesh, bbox);          // dispatches "topo:scene-ready"
  const fallback = setTimeout(done, 1200);        // never hang the transition
  gl.compileAsync(root, camera).then(() => { clearTimeout(fallback); done(); });
}
```

`compileAsync` uses the parallel-shader-compile extension, so the heavy work happens off-thread and the reveal draws a scene that’s already warm. The same trick pre-warms the summit-cairn scene before it scrolls into view, and it killed a roughly one-second freeze on first reveal.

One honest note that fits the “no free lunch” theme: there’s still about 110ms of synchronous work (the innerHTML swap plus re-wiring the new page’s JS), but it runs while the flood is fully opaque and holding, so it’s invisible. I left it there rather than restructure a delicate PJAX function for a gain nobody can see. Perfect where it’s seen, pragmatic where it isn’t.

**Takeaways**

1.  Persist one WebGL context across navigation. Swap data, not the canvas.
2.  Gate your reveal on GPU-ready, not parsed. compileAsync moves the compile off the main thread.
3.  Know which stalls are visible. Hide the unavoidable ones under an opaque cover instead of fighting them.

## **7\. Performance is mostly not animating things**

This is the section the title promises. Getting to a locked 60fps was a run of “stop doing work that doesn’t change a pixel” edits. I built a tiny in-page FPS profiler first. You toggle it with a keypress, and it buckets frame rate by scroll depth and labels the section, so a drop reads as `min 34 @ 46% (Frames)` instead of a vague “it feels janky.” Every fix below was aimed at a real number and a real location:

where

before

after

Homepage intro (terrain canvases)

46fps, min 33

**60**, min 56

Snow scene (falling snow)

37fps

**60**

Summit reveal (first scroll-in)

~1000ms freeze

**gone**

Footer entrance

min 7

**min 57**

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/ridgeline-thumbnail-05-1200x900.jpg.webp?x36066)

The wins, in order of impact. None of them cost visual quality:

-   **Freeze the shadow map.** The key light and terrain are static; only the camera flies. Yet a 2048 PCF shadow map re-rendered the entire scene into itself every frame. Bake it once, then set `gl.shadowMap.autoUpdate = false`. Shadows are camera-independent, so nothing changes.
-   **Drop wasted MSAA.** The background canvas renders through a post-processing composer, so its own `antialias:true` buffer only ever receives a full-screen blit, an MSAA allocation and resolve every frame for nothing. And the blur pass ran `multisampling:4`, which is MSAA on a blur. Both off.
-   **Animate particles on the GPU.** The falling snow ran a per-frame CPU loop over roughly 2,000 points and re-uploaded the whole position buffer, three times, one per layer. Those CPU-to-GPU sync stalls were the one scene that dropped frames on a fast GPU (which feels stalls more, not less). Static positions plus a vertex shader that computes the fall from uTime gives an identical look at near-zero per-frame cost.

```
// GPU snowfall. Positions upload once; the shader does the falling and wrapping.

transformed.y = mod((position.y + 1.2) - aSpeed * uTime, uRange) - 1.2;

transformed.x = position.x + sin(uTime * 0.6 + aSway) * 0.1;
```

-   **Stop per-frame tree walks.** A couple of `scene.traverse()` loops rewrote material opacity every frame even when the value hadn’t changed. Cache the material list once, and skip entirely when the value is steady.
-   **Replace expensive “atmosphere” with cheap fades.** A four-layer animated-gradient “mist” cover that lifted with a full-screen `blur(9px)` was repainting continuously for what reads as a fade. A dark opacity fade looks the same and costs nothing.

The through-line, borrowed from every good performance post: the fastest frame is the one that doesn’t do work. Almost every win here was removal, not cleverness.

**Takeaways**

1.  Build a profiler before you optimize. Bucket by location so fixes are aimed.
2.  Static light plus a moving camera means you can freeze the shadow map. Free.
3.  Buffer re-uploads stall fast GPUs the most. Push per-particle animation into the vertex shader.
4.  Audit `antialias` and MSAA when a composer is involved. It’s often paid for and never used.

## **8\. Content: editable, and built to be found**

The scene pages are static, but the site carries a CMS Collection (the gallery) so editorial content stays editable in Webflow, not locked in code. The pattern that keeps a CMS and a code embed cooperating:

-   The Collection holds the content: titles, coordinates, copy, imagery.
-   The embed reads the attributes and DOM the CMS template renders (like a `[data-terrain-card="{slug}"]`) rather than fetching the CMS API itself, so the 3D binds to whatever the editor publishes without a second data source.
-   Design tokens (colors, type scale, spacing) stay as Webflow variables, so per-scene accents are editable in the Designer, not hardcoded in the shader.

Keeping content real and editable pays off in discoverability too. Clean semantic markup, per-page titles and meta descriptions, and the fast Core Web Vitals that fell out of the performance work are exactly what search crawlers and AI answer engines (AEO) parse best. Real content in real HTML, loading fast, reads well to both people and machines.

**Takeaways**

1.  Let the CMS own content, and let the embed read the rendered DOM, not a parallel API.
2.  Keep accents and tokens as Webflow variables so the look stays editable.
3.  SEO and AEO come mostly for free from the same discipline: semantic markup, per-page metadata, and a genuinely fast page.

## **Reflections**

If I did this again:

-   I’d reach for the self-hosted embed on day one for a bundle this specialized, though weighing both integration paths was time well spent.
-   I’d treat the frame budget as a design constraint from the start, not a cleanup pass. The biggest wins here were architectural (one WebGL context, a frozen shadow map, off-thread shader compiles), and those are far cheaper to design in than to retrofit.
-   I’d note the two custom-code channels up front. A small thing that would’ve saved me a beat.

The recurring lesson, and the one worth leaving you with: “it compiles” is not “it’s done.” Almost every fix in this build came from watching the actual rendered page in a focused tab. The jumps, the flashes, the frame drops were invisible in the code and obvious on screen.

## **My stack**

-   Three.js, React Three Fiber and drei
-   GSAP with ScrollTrigger
-   Lenis
-   Blender via the Blender MCP (glTF and Draco)
-   Cloudflare R2
-   Strava GPX track for the real Dawn route
-   Webflow with the Webflow MCP
-   Coded with Claude (Opus 4.8 and Fable 5)