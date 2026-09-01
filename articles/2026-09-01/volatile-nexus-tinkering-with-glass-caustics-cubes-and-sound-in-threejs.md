---
title: "Volatile Nexus: Tinkering with Glass, Caustics, Cubes and Sound in Three.js"
source: "https://tympanus.net/codrops/2026/08/31/volatile-nexus-tinkering-with-glass-caustics-cubes-and-sound-in-three-js/"
publishedDate: "2026-08-31"
category: "design"
feedName: "Codrops"
author: "Frank Reitberger"
---

A mesmerizing Three.js experiment where glass, wandering cubes, caustics, refractions, and sound come together in a fluid, interactive scene.

[3D](https://tympanus.net/codrops/tag/3d/) [particles](https://tympanus.net/codrops/tag/particles/) [Three.js](https://tympanus.net/codrops/tag/three-js/) [WebGL](https://tympanus.net/codrops/tag/webgl/)

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/volatileNexus.jpg.webp?x57826)](https://dasprinzip.com/tinker/day42/ "Volatile Nexus: Tinkering with Glass, Caustics, Cubes and Sound in Three.js Demo")

_**Editor’s Note:** As part of our celebration of the first Three.js Conference, we’ve been sharing creative experiments throughout the month, and this week we’re back with more! Today we’re happy to showcase another demo by Frank. In Volatile Nexus, he dives into glass, caustics, refractions, wandering cubes, reflections, and sound, bringing them all together into one mesmerizing experiment._

**🇫🇷 The countdown is on!** The very first Three.js conference is getting closer, and there are still tickets available if you’re thinking about making the trip to Paris. Use code `CODROPS` for **15% off** and **[grab your ticket →](https://threejs.paris/tickets)**

What started as “Can I produce a nice glassy ring with colorful caustics?” ended up in unsteady, almost-fluid glass, caustics, refractions, why not adding some cubes (or lots of them), reflections, sound, and many more things.

## At the beginning…

…I just wanted to achieve colorful glass with sort of caustics. Like, can I control the caustics and iridescence? Let’s add some lens flare and be fine with it. I already liked the outcome then, as it looked sort of like an “80s album metal cover” or alike.

Adding floor reflections just made this look and feel even more complete.

## So what about cubes?

Wouldn’t it be fun to add lots of cubes wandering on some defined paths just because we can? And, whilst working on this, let’s not forget to refract those in the glass given.

Easier said than done, as glass refraction was a tricky one. It’s a nice rabbit hole when working with Three.js and its “as is” implementation.

Lastly, I switched to having the refracted layer weighted by a facing term — strong when you look _through_ the glass face-on, fading at grazing angles where real glass turns mirror-like. That kills the additive “wash” and makes the refracted cubes sit _inside_ the glass instead of glowing on it.

## Meanwhile…

…wouldn’t it even be nicer if we added some user interactions for the cubes and glass?

Adding some **mouse proximity repulsion** for the cubes — the cursor is unprojected into a 3D pick ray every frame, transformed once into the swarm’s local space (much cheaper than transforming 1000 cubes to world space). Any cube within the repel radius of that ray gets pushed away perpendicular to it with a squared falloff, driven by a damped spring — so cubes burst aside as your mouse sweeps near them and flow smoothly back into formation about half a second after it leaves.

Displacement is capped so nothing can be flung out of the scene. This works while hovering _and_ while dragging to orbit.

For the ring, I set up a 12-slot impulse pool as uniform arrays, some wavefront math (Gaussian shell at `age · 1.4`, `cos(dist · 9 − age · 11)` oscillation, `exp(−2.6 · age)` decay), central-difference normal reconstruction with the same 0.7 blend, a 30ms spawn throttle, and the cursor-speed → strength mapping (fast strokes hit harder, clamped to 0.4–1.8).

I brought it all in from an earlier experiment called [Unstable solid](https://dasprinzip.com/tinker/day39/).

**What’s adapted for the ring:** the displacement direction is the torus analog of the sphere’s radial — each vertex pushes outward from the nearest point on the ring’s tube center-circle (radius 0.78 in the lathe plane). It’s derived purely from position, so the lathe’s seam vertices move identically and the surface stays watertight.

The raycast targets the actual ring mesh through all its rig/sway transforms (with an extra 25ms cast throttle, since the lathe is ~24k triangles and has no BVH).

And because the technique lives in the _material’s_ `positionNode`/`normalNode`, three things ripple for free that the sphere never had: the **refraction** (the wobbling normals bend the dispersed backdrop — poking the glass smears the confetti), the **caustics** (the shadow pass uses the same displaced surface), and the **floor mirror** (it renders the same material).

## And at the end…

…why not compose some procedural beeps and tones to make the scene complete?

I know there are many, many folks out there who turn out sound immediately, but for me, sound is like a little extra rounding the whole scene up.

**As for the glass’s wobble:** Two high-Q resonances (_640 Hz + 963 Hz_) filter noise into a pure-ish tone with a slow vibrato — whose _level_ is driven every frame by the ripple field’s live energy. Stroke the glass and the hum swells under your finger; stop and it fades exactly as the visible waves decay, because it’s reading the same numbers. It physically cannot spam — there’s nothing to trigger.

The pad’s filter opening was also softened so the combined wobble response stays warm rather than shrill.

**Cubes through the ring** — a shimmer bed (_three beating triangles plus bright noise_) whose level follows the _fraction of the stream currently inside the hole_, computed from the head phase against the path’s hole window. You’ll hear the sparkle swell as the comet threads through and fade as the tail exits — roughly a ten-second breath cycle at your speed of 0.1.

Et voilà!

![](https://secure.gravatar.com/avatar/7f3bb57604a5f06be3572ad9631d2daca7558659fbdf7c6eac2bfafe98a9c00d?s=160&d=retro&r=g)

### [Frank Reitberger](https://tympanus.net/codrops/author/frank_reitberger/)

25 years of 3D & Shaders, Gfx Coding and Creative Technology, aged skateboard and snowboard enthusiast, proud dad, currently living in Bochum, Germany. Fascinated by all kinda computer and game graphics, procedural driven and generative art, interactive design and digital beauty - which all together are the results of simple mathematical or algorithmic processes. For me, my creative process is writing my own software, programs and scripts to play, explore, experiment and generate beauty with code and numbers.

### Creative Spotlights

Inside the journeys and portfolios of today's most inspiring [designers](https://tympanus.net/codrops/tag/designer-spotlight/) and [developers](https://tympanus.net/codrops/tag/developer-spotlight/).

![](https://secure.gravatar.com/avatar/0840447446f9c4dacd7171391e4e1634475d723bc557b93d746cd56b95ab3b43?s=160&d=retro&r=g)

![](https://secure.gravatar.com/avatar/d31c3faca6a76c53bb492455cb65cdcf23b59309157fbaa0f657ecb2b1e1d24d?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/huy-160x160.jpeg?x57826)

![](https://secure.gravatar.com/avatar/673ba8ea1ee1d87231a6f5869cc73e976167d7c00a1165eabd9ba81a02854abb?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/8B497010-BF25-4A66-BA41-6967B0E19938-160x160.jpeg?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/IMG_0891-160x160.jpg?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/08/enrico-160x160.jpg?x57826)

![](https://secure.gravatar.com/avatar/2e189e28555b71adbaad5137cd62e1e333be596f3a4f89ec14d2c60e736049ba?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/06/1723660337542-160x160.jpeg?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/maria-160x160.jpeg?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/07/photo-profil-160x160.png?x57826)

![](https://secure.gravatar.com/avatar/9d360a8984abc54d8eedfca50873d7cca9d496a59378a0371d3f8ea103a3feb1?s=160&d=retro&r=g)

### [Studio Stories](https://tympanus.net/codrops/tag/studio-spotlight/)

Discover how studios & agencies started, how they work, and what they've built.

![](https://secure.gravatar.com/avatar/3c7e247b86783a78cc69bde393a2e6cc6c6623bf2b5229d4fc46a44268d2e6c5?s=160&d=retro&r=g)

![](https://secure.gravatar.com/avatar/23a6300fe4080c3fbc7d7e6deaa885b96c829a6358c86db198f200f5cb676090?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/logo-160x160.png?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/03/VAU6V7XG_400x400-160x160.jpg?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/makemepulse_logo-160x160.jpeg?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/06/Malvah_Logo-160x160.png?x57826)

### [Case Studies](https://tympanus.net/codrops/tag/case-study/)

Discover the ideas, design, and craft behind today’s most inspiring web experiences.