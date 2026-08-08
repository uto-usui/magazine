---
title: "Garden Anomaly: A Tiny WebGPU and TSL Experiment"
source: "https://tympanus.net/codrops/2026/08/06/garden-anomaly-a-tiny-webgpu-and-tsl-experiment/"
publishedDate: "2026-08-06"
category: "design"
feedName: "Codrops"
author: "Frank Reitberger"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/gardenAnomaly-1.jpg.webp?x48895)](https://dasprinzip.com/tinker/day41 "Garden Anomaly: A Tiny WebGPU and TSL Experiment Demo")

_**Editor’s Note:** The first Three.js Conference is coming to Paris this September, and we’re getting into the spirit of it! Over the coming weeks, we’ll be bringing you lots of Three.js gems from wonderful people in the community, generously sharing their experiments, techniques, and creative ideas with us. Following Sujen Phea’s delightful interactive xylophone, Frank Reitberger now shares “Garden Anomaly”, a playful WebGPU and TSL experiment combining physics, glass deformations, and procedurally generated sound. Enjoy!_

**🎟️ Going to Paris?** As part of our partnership with the first Three.js Conference, Codrops readers can use the code `CODROPS` to get **15% off tickets**. If you’ve been waiting for a sign, this might be it. **[Get your ticket](https://threejs.paris/tickets) →**

Since the introduction of **WebGPURenderer** and **TSL** (Three Shading Language), I’ve been pushing myself to adopt them as quickly as possible. That has put me in the fortunate position of being able to build and publish my little experiments using modern WebGPU technology.

## The idea behind it

I actually get asked quite often where to start with TSL or WebGPU. To be honest, I can’t really offer much advice there. I took a look at a few Three.js examples, and there are plenty of them here: [https://threejs.org/examples/](https://threejs.org/examples/). I also read through the available information on TSL: [https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language). Other than that, I just started experimenting.

I usually already have an idea in my head of where I want the journey to lead. The goal is always to achieve a visually appealing result, whether or not it’s technically more challenging. Most of the challenges only reveal themselves during implementation. It’s usually a case of thinking, “Well, if _this_ works, then _that_ ought to work too…”

This little anomaly in the flowerbed actually grew out of an experiment I put together a month or two ago. Because of that, the groundwork for the physics, procedural sound, and much more was already there.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/boingboing.jpg.webp?x48895)

Tinker Day #38: [Boing-Boing Box](https://dasprinzip.com/tinker/day38/)

## Rendering & materials

The entire scene is rendered with `WebGPURenderer` using TSL node materials throughout. Here’s a quick overview of the rendering setup:

-   **Transmissive shell (`MeshPhysicalNodeMaterial`)** with transmission, thickness, IOR, iridescence (0.90, IOR 1.55), clearcoat, and blue attenuation color and distance.
-   **Custom TSL `positionNode`** for the impact bulges, using vertex displacement driven by an 8 slot `uniformArray` of direction and amplitude vectors.
-   **Custom TSL `normalNode`** with analytic normal perturbation, combined with a tangent space normal map built from a custom sphere tangent frame.
-   **Custom `roughnessNode`** using an embedded chunky ice roughness map that is modulated per pixel.
-   **Custom `emissiveNode`** driven by a canvas generated scanline strip with seamless scrolling via a UV offset uniform.
-   **Instanced bubbles (`InstancedMesh`)**, kept opaque because the transmission pass currently ignores transparent geometry.

## Physics

At the heart of the demo is a Position Based Dynamics (PBD) simulation running entirely on the CPU. A few event driven systems are layered on top to drive the interactions, sound, and overall behavior.

**Fling impulses:** Pointer interaction applies randomized impulses with an upward bias, letting you stir the simulation by hand.

**Predict:** Gravity and air drag are integrated into the velocities using semi implicit Euler, then the positions are stepped forward.

**Project constraints:** Three iterations resolve sphere to sphere collisions, with mass weighted by r³ so small bubbles naturally yield to larger ones. The bubbles are also projected back inside the glass sphere, ensuring they touch the inner surface rather than passing through it.

**Derive velocity:** Velocity is recomputed from the positional change, `v = (x − x_prev) / dt`, instead of keeping the integrated velocity. This is the defining characteristic of PBD and allows the pile to settle naturally instead of constantly churning.

**Contact damping:** Touching bubbles receive exponential velocity damping, acting as both pile settling and glass friction. At the wall, only the outward normal velocity is removed, allowing the bubbles to slide naturally along the glass.

**Impact detection:** A new wall contact above a radial speed threshold creates a temporary glass bulge and triggers a sound. Resting bubbles cannot activate this effect.

**Collision rescatter:** Faster bubble to bubble collisions trigger a randomized velocity redirect using a “repower” formula, with a short per bubble cooldown so energetic chain reactions gradually fade away.

**Rest blast:** A per bubble rest timer applies a randomized upward impulse after 200 ms below the speed threshold, keeping the whole system gently boiling instead of settling completely.

## Sound system

The sound system is built entirely with the Web Audio API. There are no samples or audio files involved, everything is generated procedurally. Here’s a quick overview:

**Trigger:** A tone is played only when a bubble hits the glass with enough force to create a bulge. Ball to ball collisions remain silent, so the sound is always directly coupled to the visible glass deformation.

**Pitch:** Notes are chosen from a two octave C major pentatonic scale (C4, D4, E4, G4, A4, C5, D5, E5, G5, A5). The bubble radius determines the pitch, with larger bubbles producing lower notes and smaller bubbles producing higher ones. Since the scale is pentatonic, overlapping hits naturally create pleasant sounding chords.

**Voice:** Each hit is generated by a stack of four sine oscillators at consonant ratios. Every partial has its own gain envelope with a short exponential attack and staggered decay times, allowing the sound to bloom brightly before fading into a pure sine tail. Loudness scales with impact speed, while a `StereoPannerNode` positions each hit across the stereo field based on the bubble’s world position.

**Bus:** All voices are mixed into a master gain before splitting into a dry path and a flanger path. The flanger uses a short delay modulated by a continuous low frequency oscillator with feedback, giving each hit a slightly different character. Both paths are then recombined and passed through a `DynamicsCompressor`, keeping dense bursts under control without clipping.

**Housekeeping:** The `AudioContext` is created and resumed on the first pointer interaction to comply with browser autoplay policies. A simple rate limiter enforces a minimum interval between voices with an eight voice cap, while finished voices automatically clean themselves up. Volume and on/off controls are available in the debug pane, with the default volume deliberately kept low to create an ambient atmosphere.

All of this is rounded off by a lovely garden setting, generated with Skybox AI: [https://www.blockadelabs.com/](https://www.blockadelabs.com/).

**Enjoy!**