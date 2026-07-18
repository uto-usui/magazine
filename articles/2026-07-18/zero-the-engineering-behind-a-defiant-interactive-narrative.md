---
title: "ZERO: The Engineering Behind a Defiant Interactive Narrative"
source: "https://tympanus.net/codrops/2026/07/17/zero-the-engineering-behind-a-defiant-interactive-narrative/"
publishedDate: "2026-07-17"
category: "design"
feedName: "Codrops"
author: "Sindhur Dutta"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/coverzero.jpeg.webp?x45349)](https://why.zero.university/ "ZERO: The Engineering Behind a Defiant Interactive Narrative Demo")

You arrive on the site and it’s locked. There’s no enter button, only a prompt to draw a zero. As soon as the circle closes, frost spreads from the stroke and gradually reveals the experience. We hadn’t seen this kind of interaction used before, and that was exactly the appeal. It gives you a few seconds to capture the visitor’s attention with something unexpected, while immediately rewarding the interaction.

The gesture check is surprisingly simple. It measures just three things: total signed angle, roundness, and closure. If the stroke passes those checks, its centroid becomes the seed for the frost shader:

```
// accept the stroke as a "zero" only if it truly closes a round loop
const wound    = totalSignedAngle(points, center);   // ~2π for a full turn
const radiusCV = std(radii) / mean(radii);           // low = round, not a scribble
const closed   = dist(points[0], points.at(-1)) < meanRadius;

if (wound > 5.76 && radiusCV < 0.35 && closed) unlock();
```

From there, the experience unfolds as a single continuous scroll, taking you from the loading screen to an interactive city map. Built over four months with Three.js, GSAP, Howler, and Vite, it transforms more than a gigabyte of source assets into a site under 10MB that runs at 60fps even on a budget Android phone. In this article, we’ll look at the 3D pipeline, tooling, shaders, and performance optimizations that made it possible.

## How the project started

We pitched with a proof of concept instead of a presentation. The concept from Atul Khola’s team was strong from the start: an immersive scrolling experience that challenges the traditional degree path. We built the draw a zero interaction in 48 hours and delivered a working prototype. AI helped us get the first version running quickly, then we spent the rest of the time refining it until the frost effect felt right. The proof of concept won us the project.

AI also changed the way we approached development. Instead of spending time building the first version of an idea, we could generate it quickly and focus on testing, refining, and iterating. We tried multiple versions of the burning money effect, different glass shatter timings, and several shader ideas before settling on what worked best. Writing the initial code became the easy part. The real work was evaluating the results, improving the details, and making sure every interaction looked and felt right. The rest of this article focuses on that process.

## The narrative: six stages, five gates

The experience unfolds across six scrolling stages, connected by five interactive gates that pause or redirect the flow. These include drawing a zero, holding to shatter the glass, and holding to launch through a tunnel.

The story follows a clear narrative. It opens with the promise of the traditional degree path: study hard, get good grades, and land a job at a top company. At the first gate, that promise literally shatters. The next stage reveals real unemployment statistics scattered across the broken glass. In stage three, the degree becomes just another piece of paper as money burns, certificates are shredded, and the scene transitions into a tunnel shaped like the ZERO logo. Stage four emerges above the clouds, revealing a city built from the headquarters of real companies. Finally, stage five hands control to the user through an interactive map that can be explored freely.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/Frame-2085664459-1-1200x776.jpg.webp?x45349)

## The architecture: one number drives everything

One of the biggest architectural decisions was to avoid relying on the browser’s native scroll altogether. There is no ScrollTrigger and no oversized scrolling DOM. Instead, wheel and touch input update a virtual scroll value that eases towards its target. Everything else in the experience, including asset loading, animations, shader timing, text, and overlays, is driven by that single value.

Each stage and interaction is defined as a self contained segment with its own optional lifecycle:

```
{
  scrollVh: 300,            // how much virtual scroll this segment owns
  enter(ctx)        { /* build this segment's Three.js objects (async) */ },
  scrub(ctx, p)     { /* p is LOCAL progress 0..1 within this segment  */ },
  update(ctx, t, dt){ /* runs every frame, scroll or not (idle motion) */ },
  teardown(ctx)     { /* dispose and hand off to the next segment      */ },
}
```

In practice, the project is split into nine segments, with the loader also serving as the first gate. Keeping each segment self contained made the codebase much easier to maintain, especially later in development. It also made debugging easier. Jumping to any stage replays the lifecycle of every preceding segment instead of teleporting straight there, ensuring the experience is always initialized as if the user had naturally scrolled through it.

## Preparing the 3D for the web

Most of the four month development time went into preparing the assets. The source files arrived as production Blender scenes with uncompressed geometry, 8K textures, baked animations, and more than a gigabyte of data. Much of the first month was spent deciding the best format for each asset.

All geometry is shipped with DRACO compression using self hosted decoders. The Draco and KTX2/Basis transcoders are bundled in `public/vendor/` rather than loaded from a CDN. We learned that lesson the hard way when a slowdown on `gstatic` and `unpkg` caused every compressed asset to fail decoding, even though the assets themselves were hosted locally. If your decoder lives on someone else’s server, so does your pipeline.

Textures had the biggest impact on performance. While a PNG may be small on disk, it is fully decompressed in GPU memory. A 2048² texture still occupies around 16MB of VRAM regardless of its file size. KTX2 with ETC1S compression stays compressed on the GPU, uses much less memory, and uploads significantly faster.

### The compression previewer

One challenge with KTX2 is that there is no easy way to preview it locally. Since ETC1S is a lossy format, finding the right compression settings can easily become a process of trial and error. A single global setting either wastes memory or noticeably degrades textures that need higher quality.

To solve this, we built a converter and previewer into our internal dashboard. It displays compressed and uncompressed images and videos side by side, making it easy to compare the results. This let us fine tune the ETC1S settings for each asset individually, applying heavier compression where it wasn’t noticeable, preserving quality for hero assets, and disabling mipmaps where they weren’t needed.

It is a simple tool, but it had a huge impact on the final build, and it is a step we rarely see discussed in WebGL workflows.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/converter-1-1200x722.jpg.webp?x45349)

We also consolidated related textures into shared atlases. For example, all of the hand textures are packed into a single 4×4 atlas, with each mesh using UV offsets and scaling to reference its own section.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/human_hands_atlas-900x900.jpg.webp?x45349)

We applied the same approach throughout the project. Text sprites were consolidated from four separate atlases into one, followed by certificates, paper shreds, clouds, coins, and glass shards. More than fifty individual images were reduced to around a dozen atlases, while most gradient backgrounds were replaced with a few lines of GLSL.

Early builds were around 35 to 40MB. The final build ships at under 10MB, with the interactive world map isolated in its own loading group so it never blocks the opening experience.

## The stutter you don’t see coming: uploading textures

Reducing download size is only part of the equation. Compressed textures still need to be uploaded to the GPU on the main thread, and a large texture can easily block rendering for 50ms, enough to drop several frames. If that upload happens the first time a texture is needed during scrolling, the hitch is immediately noticeable. A site can benchmark well and still feel sluggish.

To avoid this, we tackled texture uploads in three ways.

1.  **Decode off the main thread.** Using `createImageBitmap()` moves image decoding off the main thread, leaving only the GPU upload to happen during rendering.
2.  **Upload during idle time.** Decoded textures are queued and only uploaded while the browser has spare time available:

```
// upload queued textures only while there's idle time to spare
function drainUploads(deadline) {
  while (uploadQueue.length && deadline.timeRemaining() > 5) {
    renderer.initTexture(uploadQueue.shift()); // forces the GPU upload now
  }
  if (uploadQueue.length) requestIdleCallback(drainUploads, { timeout: 2000 });
}
```

3.  **Split large atlases into smaller chunks.** The largest textures are divided into 256² tiles and uploaded one per frame, preventing a single upload from blowing the frame budget.

Whenever we know a new stage is about to render, such as after the loader or during gate transitions, we flush the upload queue synchronously. This ensures every required texture is already on the GPU before it appears on screen, avoiding first time uploads during scrolling.

## The adaptive quality manager

Since you can’t predict the user’s device, the renderer continuously monitors its own performance. It tracks frame times using a rolling buffer and adjusts quality dynamically. If rendering becomes too slow, it steps down to a lower quality tier. If performance improves and stays stable, it scales back up again. A cooldown prevents it from constantly switching between quality levels:

```
if (avgMs > 22 && tier > LOW  && cooldownElapsed) downgrade();   // ~<45fps
else if (avgMs < 12 && tier < HIGH && cooldownElapsed) upgrade(); // ~>83fps
```

The quality tiers only affect visual polish, not the experience itself. They adjust things like pixel ratio, blur samples, coin geometry, and text resolution, while keeping the story identical on both flagship devices and budget phones. We also use a few targeted optimizations. During the glass shatter interaction, for example, the renderer temporarily lowers the pixel ratio and disables blur and frost effects, hiding the performance cost within the gesture itself.

Much of the final month was spent profiling and optimizing on a budget Android device. We tracked down frame spikes one by one until the experience ran smoothly. The worst offender turned out to be a single 157ms frame.

## The shaders

### The post processing chain

Each frame is built from a series of post processing passes that are applied in sequence:

1.  **Render:** The main 3D scene.
2.  **Background:** Procedural GLSL backgrounds instead of image assets.
3.  **Glass refraction:** Renders the unbroken glass so it refracts the background behind it.
4.  **Frost and trail:** Draws the user’s gesture, the frost spread, and the melting effect.
5.  **Depth of field:** Blur quality scales with the active quality tier and is disabled on low settings.
6.  **Foreground:** Applies film grain and final tone mapping.
7.  **Deferred text:** Composites text after tone mapping to keep it crisp. This pass is skipped whenever no text sprites are visible.
8.  **Shatter:** Draws the breaking glass as the final pass.

The glass, text, and shatter passes are all initialized lazily and warmed up during idle time, keeping them off the loader’s critical path.

```
// boot: the always-on spine, added in order
composer.addPass(renderPass);     // 1. the 3D scene
composer.addPass(bgPass);         // 2. procedural background
composer.addPass(frostingPass);   // 3. draw-zero frost + melt
composer.addPass(lensBlurPass);   // 4. depth-of-field, tier-gated
composer.addPass(fgPass);         // 5. grain + the one tone mapping

// later, off the loader's critical path
composer.addPass(textPass);            // type, composited after tone mapping
composer.insertPass(glassPass, 2);     // slots in right after the background
composer.addPass(shatterPass);         // the break, last over everything

// warmed during an earlier stage's idle time,
// so their first real frame is a cache hit, not a shader-compile stall
glassPass.prewarm(renderer, camera);
shatterPass.prewarm(renderer, camera);

// per frame: don't pay for the text composite when nothing's on screen
textPass.enabled = textPass.hasVisibleSprites();
```

Each key moment in the experience uses a custom shader built for that specific effect. AI helped generate the initial versions of many of them, but every shader was refined and reworked before it became part of the final experience.

### The frost unlock

The frost effect is built using a ping pong buffer with four passes: horizontal, vertical, and the two diagonals. Each pass expands the drawn stroke by propagating the brightest neighbouring pixels, creating an octagonal growth pattern. The expansion is modulated by the brightness of a frost texture, giving the edge a more natural, crystalline appearance. Once the stroke is complete, its centroid becomes the starting point for the radial melt effect.

```
// one of four axis passes → octagonal spread; uSpreadAxis is the pass direction
float m    = texture2D(uPrevTrail, vUv).r;

float step = uSpreadStep * (0.4 + iceLuma * 1.2);      // stepped by frost luma

for (int k = 1; k <= 2; k++) {
  m = max(m, texture2D(uPrevTrail, vUv + uSpreadAxis * step * float(k)).r * 0.92);
  m = max(m, texture2D(uPrevTrail, vUv - uSpreadAxis * step * float(k)).r * 0.92);
}

gl_FragColor.r = m;                                    // frost only ever advance
```

### Lighting the hands without lights

Real time lighting on a skinned mesh would have been too expensive, and the lighting needed to match the original artwork exactly. Instead, we baked the lighting into textures and blended between them. Two texture slots are used, with the incoming slot updated for each keyframe and smoothly crossfaded to create the lighting transition.

```
// two slots crossfaded; the incoming one holds the next keyframe's texture
vec4 a = texture2D(uTextureA, vUv * uTexScaleA + uTexOffsetA);

vec4 b = texture2D(uTextureB, vUv * uTexScaleB + uTexOffsetB);

a.rgb *= a.a;  b.rgb *= b.a;              // premultiply before the blend

vec4 col = mix(a, b, uProgress);         // uProgress ramps 0→1 across the beat
```

We premultiply the alpha before blending to avoid dark halos around the transparent edges of the hands. Both lighting textures are stored as regions within a single atlas, so switching between them only requires updating two UV offsets and a blend factor.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/human_hands.jpg.webp?x45349)

### Burning money

The burning money effect uses a noise driven distance field to dissolve each bill over time. Just before the burn reaches each area, a thin glowing HDR ember rim appears, followed by the charred surface.

```
float threshold = uBurnProgress * 1.5;             // sweeps the burn front

float burn = distField * 0.5 + fbm(uv) * 0.5;

float edge = burn - threshold;

if (edge < 0.0) discard;                           // already ash

float ch = 1.0 - smoothstep(0.0, uCharWidth,  edge);

float em = 1.0 - smoothstep(0.0, uEmberWidth, edge);

vec3  col = mix(baseColor, uCharColor, ch) + uEmberColor * em;  // HDR ember rim
```

FBM is the most expensive part of the shader, so we discard fragments as early as possible whenever we know they cannot have reached the burn threshold yet.

### Shredding certificates

Each vertex stores a strip index that determines which shred it belongs to. As the shred front moves from left to right, each strip separates from the sheet and falls independently with its own rotation, making the certificate tear apart into individual ribbons.

```
float past = clamp((uShredProgress - uv.x) / 0.4, 0.0, 1.0);

float e    = past * past;                             // ease-in

pos.y -= e * (0.25 + hash(aStripIndex) * 0.25);      // gravity, per strip

pos    = rotateStrip(pos, aStripIndex, e * 3.0);     // independent tumble, ~3 rad
```

Lighting normals are generated analytically from the same wave function that drives the animation, so no normal map needs to be stored or shipped.

### The tunnel

The tunnel is generated by extruding the cross section of the ZERO logo. A brightness pulse travels through the tunnel using the geometry’s world space Z coordinate, allowing the effect to remain seamless even as sections of the tunnel repeat.

```
float q    = fract(vTunnelZ * uPulseFreq + uPulseTime);  // vTunnelZ = world-space Z

float band = 1.0 - smoothstep(0.0, uPulseWidth, min(q, 1.0 - q));

totalEmissiveRadiance *= 1.0 + uPulseGain * band;
```

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/tunnel.jpg.webp?x45349)

### Text that pulls into focus

The narrative text uses a seven tap hexagonal blur consisting of a center sample and six surrounding samples. The blur radius is driven by the reveal progress, allowing the text to gradually sharpen as it comes into view instead of appearing instantly.

```
// 7-tap hexagonal blur; r comes from the reveal progress (uProgress)
float r  = blurFactor * uMaxBlur * 0.003;

vec4 sum = texture2D(uText, vUv) * 2.0;            // centre, weighted ×2

for (int i = 0; i < 6; i++)                        // six taps at 60°
  sum += texture2D(uText, vUv + hexDir[i] * r);

gl_FragColor = sum / 8.0;
```

Because it runs as part of the deferred text pass, the blur is skipped entirely whenever no text is visible, avoiding any unnecessary rendering cost.

One issue that took longer than expected to debug was shader precision. Several shaders had to be explicitly set to `highp float` because many mobile GPUs, including Adreno and Mali, treat `mediump` as a true 16 bit float. This caused bugs that never appeared on desktop, such as all certificate strips moving identically or visible banding in the burn effect. It is a good reminder to test on real mobile devices from the start, not just at the end.

## Interaction design

The source material consisted of images and videos rather than interaction specifications, so the behaviour of each gate had to be designed from scratch. Most of them use the same configurable press and hold system. A shared configuration defines when the prompt appears and how long the hold lasts, while each gate implements its own visuals through a set of hooks:

```
holdTrigger: {
  showAt: 0.6, holdDuration: 1.4,
  onHoldProgress(ctx, p) { /* drive this gate's visuals with p (0..1) */ },
  onHoldComplete(ctx)    { /* fire the shatter / launch, then advance  */ },
}
```

During the hold, the entire frame gradually shifts towards dark red. When the glass shatters, the colour snaps back in roughly 200ms, making it feel like the shards are breaking the darkness away. A longer 400ms transition felt noticeably less impactful.

The shatter sound is also synchronized with the first rendered frame rather than a timer. On slower devices, relying on a timer can cause the audio to play before the animation is actually visible, making the effect feel out of sync.

## The payoff: an interactive world

The final launch sequence takes you into an open sky. As stage four progresses, the clouds part to reveal the city below, with ZERO’s tower at its centre. A halo appears above the tower as the final gate, before the camera settles into the interactive map.

Stage five hands control over to the user. You can pan, zoom, and explore the city, with each marker opening a card containing the role, scenario, and tools, along with a **Join Beta** button. The persistent join bar also becomes the waitlist signup. After guiding the user through the narrative, the experience ends by letting them explore it for themselves.

## Final thoughts

One of the biggest lessons from this project was that asset preparation and GPU uploads deserve as much attention as rendering itself. Tools like the compression previewer, self hosted decoders, upload queue, and adaptive quality manager are not the most exciting parts of the pipeline, but they made the difference between shipping more than a gigabyte of source assets and delivering a sub 10MB experience that runs smoothly on a budget phone.

As for AI, it did exactly what it was good at. It helped generate the first version of much of the code, including the prototype that won the project. The real work came afterwards: refining the interactions, improving the visuals, profiling performance, and making hundreds of small decisions that only become obvious when testing on real devices. AI can generate code quickly, but building a polished interactive experience still depends on careful iteration and engineering judgment.

## Credits

-   **Concept & design direction:** [Atul Khola](https://www.linkedin.com/in/atulkhola/), [Sanjay](https://www.linkedin.com/in/sanjaybchauhan/), [Saba](https://www.linkedin.com/in/vengada-sabareesan-1a603521b/), [Hamsa Rasheem](https://www.linkedin.com/in/rashiying/), [Akshai](https://www.linkedin.com/in/akshai-shyju-3438b7262/) & team, for [Zero University](https://www.linkedin.com/company/zero-university/)
-   **Development, 3D web pipeline, shaders & optimization:** [Sindhur Dutta](https://www.linkedin.com/in/sindhur-dutta-125629154/), [Shuprobho](https://www.linkedin.com/in/shuprobho-das/), [Yashas](https://www.linkedin.com/in/yashaspdev/) & team, for [BUNQ LABS](https://www.linkedin.com/company/bunq-labs/)
-   **Built with:** Three.js, GLSL shaders, GSAP, Howler, DRACO, Vite