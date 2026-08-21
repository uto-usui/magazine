---
title: "Run Rob Run: Building a Music-Reactive Goo with Three.js and WebGPU"
source: "https://tympanus.net/codrops/2026/08/20/run-rob-run-building-a-music-reactive-goo-with-three-js-and-webgpu/"
publishedDate: "2026-08-20"
category: "design"
feedName: "Codrops"
author: "Robert Aperios"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/runrobrun.png.webp?x57826)](https://www.runrobrun.com/ "Run Rob Run: Building a Music-Reactive Goo with Three.js and WebGPU Demo")

Run Rob Run is a one-page portfolio built around motion, sound, typography, and interaction. The main scene is a custom goo object that behaves like a digital material: it idles, reacts to music, responds to hover, and transforms through scroll from an organic blob into a structured cube.

The project came out of a long cycle of building, scrapping, rebuilding, and never quite feeling like the work was ready to represent me properly. For years, I kept restarting portfolio ideas before they had a chance to become finished. This version is not about calling the site perfect. It is about finally reaching something I can sit with, share, and keep building from.

That feeling shaped a lot of the design decisions. I wanted the site to feel personal without becoming too polished or distant. The motion needed to have weight. The typography needed to feel direct. The goo needed to feel alive enough to carry the emotion of the page, but controlled enough that it still worked as an interface.

This breakdown focuses on the goo: how it is structured, how scroll pushes it from blob to cube, and how the music reaction is shaped so the movement feels musical rather than chaotic.

The scene uses Three.js/WebGPU for the main experience, with layered geometry, custom deformation logic, music-reactive behaviour, scroll state, and a few surface details such as hover readouts and animated dust.

## Concept

The aim was not to make a background animation. I wanted the scene to feel like an object with presence. Something tactile, imperfect, and responsive. The goo became the emotional center of the site: a refractive shell around an orange core, constantly shifting between softness and structure.

The design was built around contrast:

-   Soft organic motion against a final structured cube.
-   A clear refractive shell around a dense orange core.
-   Subtle idle behaviour against stronger music-driven pushes.
-   Playful hover details that only appear when the user investigates the surface.

That meant the technical system needed to be flexible. The goo could not be a single mesh doing one thing. It needed layers, separate reaction channels, damping, scroll control, and performance limits.

## Implementation

### Scene Structure

The goo is built from a few layered meshes that share the same base deformation logic but use different materials and response settings.

-   The outer shell provides the refractive, glass-like look.
-   The orange core gives the object weight and identity.
-   A thin outer coat adds surface shimmer and detail.
-   Scroll gradually reduces the organic deformation and pushes the form toward a cube.
-   Hover interactions add temporary surface details, such as grid readouts and animated dust.

At a high level, each frame calculates the scroll state, reads the current music-reactive values, eases them, and then passes them into the deformation function for each layer.

```
const scrollProgress = scrollPauseState.getSceneScrollProgress();
const {
  morphProgress,
  splitProgress,
  sharedBlobBumpScale,
  forceAllNormals,
} = getMorphRenderState(scrollProgress);
const musicReactiveState = musicReactiveInput.getState();
const musicReactive = getMusicReactiveDeformState({
  elapsed,
  musicReactiveState,
});
```

### Scroll Morph

The scroll transition moves the object from a soft organic state into a more structured cube. The deformation system blends between two ideas:

-   An organic direction-based blob, with lobes and surface noise.
-   A cube projection, where each vertex is pulled toward the nearest cube face.

```
const organicMix = 1 - smoothstep(0.55, 0.98, morphProgress);
const cubeMix = smoothstep(0.68, 0.995, morphProgress);
```

When the cube mix increases, each point is gradually pulled toward its cube position.

```
if (cubeMix > 0) {
  const cubeRadius = baseRadius * THREE.MathUtils.lerp(
    1.0,
    0.9,
    morphProgress
  );
  const cubePoint = getCubePoint(
    dx,
    dy,
    dz,
    cubeRadius
  );
  px = THREE.MathUtils.lerp(px, cubePoint.x, cubeMix);
  py = THREE.MathUtils.lerp(py, cubePoint.y, cubeMix);
  pz = THREE.MathUtils.lerp(pz, cubePoint.z, cubeMix);
}
```

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/Screenshot-2026-08-18-at-8.03.28-pm-1200x642.png.webp?x57826)

This lets the scene keep its goo-like character early on while still landing in a clean final cube state.

### Music Reaction

The music reaction is intentionally selective. The goo does not react equally to every sound. Early versions responded too evenly to the entire track, which made busy songs feel noisy and caused small transient sounds, like hi-hats, to create movements that were too large.

The final system weighs the response toward stronger rhythmic events: kicks, larger claps, and four-to-the-floor drum hits. Smaller high-frequency transients still add energy, but they are dampened so they do not drive the main shape.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/Screenshot-2026-08-18-at-7.07.38-pm-1200x642.png.webp?x57826)

```
const musicLow = musicReactiveState.isActive
  ? musicReactiveState.low
  : 0;
const musicLowPulse = musicReactiveState.isActive
  ? musicReactiveState.lowPulse
  : 0;
const musicMid = musicReactiveState.isActive
  ? musicReactiveState.mid
  : 0;
const musicMidPulse = musicReactiveState.isActive
  ? musicReactiveState.midPulse
  : 0;
const musicHigh = musicReactiveState.isActive
  ? musicReactiveState.high
  : 0;
const musicHighSoft = Math.min(musicHigh, 0.38);
const musicMidSoft = Math.min(musicMid, 0.72);
const crowdDensity = Math.min(
  1,
  musicMidSoft * 0.58 + musicHighSoft * 0.86
);
```

The system looks for dominant low-end hits, but bass alone shouldn’t constantly inflate the core. The kick response is reduced when the track is crowded or when the high-end is too active.

```
const lowDominance = Math.min(
  1,
  Math.max(
    0,
    musicLow - (musicMidSoft * 0.22 + musicHighSoft * 0.32)
  ) * 4.4
);
const kickLift = Math.max(
  0,
  musicLowPulseSoft - (musicMidSoft * 0.12 + musicHighSoft * 0.09)
);
const kickHit = mode === "thump"
  ? Math.min(1, kickLift * 3.5)
  : Math.min(1, kickLift * 2.1);
const dominantKickHit =
  kickHit * Math.max(
    0.45,
    lowDominance,
    1 - crowdDensity * 0.26
  );
```

Claps and larger mid-range hits are handled separately from high-frequency detail. This means a clap can still move the core, while fast hats translate into lighter surface motion.

```
const highOnlyMask = Math.min(
  1,
  Math.max(
    0,
    musicHighSoft - musicMidSoft * 0.72
  ) * 3.4
);
const clapCoreImpact =
  musicMidPulse *
  Math.max(0, midBody - highOnlyMask * 0.28) *
  (1 - crowdDensity * 0.34) *
  0.54;
```

Those audio readings are then converted into separate motion channels.

```
return {
  centerRoundness,
  impact,
  coreMassImpact,
  limbImpact,
  blobSpreadMultiplier:
    1 -
    centerRoundness * 0.46 +
    soloKeyboard * 0.025 +
    impact * 0.58,
  surfaceBoost:
    musicMidSoft * 0.045 +
    musicHighSoft * 0.035 +
    soloKeyboard * 0.025 +
    impact * 0.32,
  flowSpeed:
    1 +
    musicMidSoft * 0.015 +
    musicHighSoft * 0.055 +
    impact * 0.085,
  rippleShift:
    musicHighSoft * 0.24 +
    soloKeyboard * 0.035 +
    impact * 0.58,
};
```

### Damping and Return

The movement also needed weight. If the goo returned too quickly after a hit, it felt nervous and digital. The impact can attack quickly, but the release is slower.

```
const impactEase =
  musicReactive.impact > easedMusicImpact
    ? 0.34
    : 0.075;
easedMusicImpact = THREE.MathUtils.lerp(
  easedMusicImpact,
  musicReactive.impact,
  1 - Math.pow(1 - impactEase, dt * 60),
);
```

The limb response has its own release damping. Bigger movements settle more slowly, which gives the core a heavier physical feel.

```
const limbReleaseEase = THREE.MathUtils.lerp(
  0.045,
  0.022,
  easedMusicLimbImpact
);
const limbImpactEase =
  limbImpact > easedMusicLimbImpact
    ? 0.22
    : limbReleaseEase;
easedMusicLimbImpact = THREE.MathUtils.lerp(
  easedMusicLimbImpact,
  limbImpact,
  1 - Math.pow(1 - limbImpactEase, dt * 60),
);
```

### Applying the Reaction

The outer shell and inner core do not receive the same reaction. The shell gets a softer response so it stays clear and refractive. The orange core receives more of the physical movement.

```
deformBlob(blobGeometry, elapsed, {
  baseRadius: 1.64,
  bumpScale: sharedBlobBumpScale,
  blobSpreadMultiplier: THREE.MathUtils.lerp(
    1,
    easedMusicReactive.blobSpreadMultiplier,
    0.28,
  ),
  morphProgress,
  reactiveSurfaceBoost:
    easedMusicReactive.surfaceBoost * 0.32,
  reactivePointerBoost:
    easedMusicReactive.pointerBoost * 0.24,
  reactiveRippleShift:
    easedMusicReactive.rippleShift * 0.36,
  reactiveCenterRoundness:
    shellCenterRoundness,
});
```

The core gets the larger movement, but it is clamped so it cannot push outside the clear outer shell.

```
deformBlob(innerGeometry, elapsed, {
  baseRadius: 1.64 * 0.6 * innerCoreScale,
  bumpScale:
    sharedBlobBumpScale *
    coreSurfaceReaction *
    THREE.MathUtils.lerp(1, 0.54, limbReturnDamping),
  blobSpreadMultiplier:
    easedMusicReactive.blobSpreadMultiplier,
  lobeStrengthMultiplier:
    coreLobeReaction,
  reactiveSurfaceBoost:
    easedMusicReactive.surfaceBoost *
    coreSurfaceReaction *
    coreReturnCalm,
  reactivePointerBoost:
    easedMusicReactive.pointerBoost *
    0.8 *
    coreReturnCalm,
  sphericalDirectionBlend:
    musicReactiveState.isPlaying ? 0.68 : 0,
  maxRadius: 1.58,
});
```

## Refinement

Once the main behaviour was working, most of the time went into tuning. The goal was to keep the scene expressive without letting it become noisy or expensive.

### Hover Surface Details

The hover interactions are separate from the music system. They are designed as temporary surface behaviours rather than permanent effects.

The grid readout appears on hover, shows live values, and disappears once scrolling starts so it does not interfere with the morph.

The dust works in a similar way. It appears under the cursor, but the dust texture itself animates through precomputed noise frames, similar to the site-wide noise layer. This makes the dust feel alive without recalculating expensive noise every frame.

```
if (now - lastDustUpdate > 1000 / DUST_NOISE_SPEED) {
  lastDustUpdate = now;
  dustFrameIndex += 1;
  drawDustFrame({
    context: dustA.context,
    texture: dustA.texture,
    frames: dustFramesA,
    frameIndex: dustFrameIndex,
  });
}
```

### Performance Notes

The main lesson was that the visual quality came from restraint as much as complexity.

-   Expensive noise was precomputed where possible.
-   Normal updates are staggered across layers.
-   The music response is smoothed before touching the geometry.
-   Hover effects are disabled during scroll so the morph stays clean.
-   The WebGPU version has fallback paths for devices that cannot run the main scene.

The scene also avoids treating every layer the same. The outer shell, core, and coat update with different levels of intensity, which keeps the composition readable and helps the transparent material stay clear.

## Accessibility

Because the project relies heavily on motion and sound, the experience needs a few guardrails.

-   The scene can still be explored without music playback.
-   Music reaction is user-controlled rather than autoplayed.
-   Hover details are enhancements, not required for navigation.
-   On coarse pointer devices, the desktop hover layers are disabled.
-   Fallback rendering is available for devices that cannot run the WebGPU scene.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/IMG_0340-416x900.png.webp?x57826)

For production, I would also continue improving reduced-motion support. The scroll story can still work with calmer deformation, fewer automatic pulses, and less reactive movement for users who prefer reduced motion.

## Wrap-up

The final goo system is a balance between art direction and restraint. It listens to the music, but it does not obey every sound. Kicks and larger claps create the stronger pushes, while high-frequency detail becomes smaller surface energy. Scroll pulls the form from organic to structured, and hover interactions reveal small traces of the system underneath.

What I learned most from building it was that the quality did not come from adding more movement. It came from deciding which movement mattered, then damping, clamping, and separating the reactions until the object felt like it had mass, memory, and resistance.

## Resources and Tools

-   Canvas-generated textures
-   Audio-reactive state mapping
-   Three.js
-   WebGPU
-   GSAP / ScrollTrigger