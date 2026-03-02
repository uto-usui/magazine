---
title: "When Community Becomes UI: Building the Website for the First Three.js Conference"
source: "https://tympanus.net/codrops/2026/02/28/when-community-becomes-ui-building-the-website-for-the-first-three-js-conference/"
publishedDate: "2026-02-28"
category: "design"
feedName: "Codrops"
author: "David Ronai"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/02/ThreejsParis.webp?x72865)](https://threejs.paris/ "When Community Becomes UI: Building the Website for the First Three.js Conference Demo")

_Editor’s note: Every now and then, something happens in the evolution of the web that feels bigger than a single event. This is one of those moments. Three.js has been part of the creative coding movement we’ve supported at Codrops for many years. Our pages have been filled with experiments, tutorials, and explorations built with it, and we’ve watched it help shape a generation of immersive web experiences. That’s why supporting the very first Three.js conference as official sponsors means so much to us. In this case study, David Ronai takes us behind the scenes of the conference website and how it came together. We’ve grown alongside this community for a long time, and being part of this moment feels genuinely special._

The first thing you notice on [threejs.paris](https://threejs.paris/) isn’t the typography or the gradients, it’s the faces.

Dozens of glossy 3D spheres, each textured differently, each with its own expression, bouncing and stacking across the screen like a crowd arriving at a party they actually want to be at.

These aren’t decorative assets. They’re the community.

Three.js Conf is a celebration of its ecosystem. When we set out to build the website for the first Three.js conference in Paris, we faced one question: how do you represent a community defined by creative diversity? A community of people who make beautiful things on the internet and share them freely?

Why not turn everyone into their own character?

## The Concept: Community as Design Principle

We wanted this event to be community-driven, built around participation, not passive consumption. The website needed to communicate this concept instantly, but not through words. Through feeling.

That’s where the idea for the spheres came in. Each one is unique: different materials, different textures, different sizes. But they all share the same playful face. We’re all different, but we’re all here together.

Speakers get their own distinct spheres. But they sit in the exact same physics-driven pile as everyone else. No pedestals. Just a joyful heap of creative people.

## Designing for Playfulness

[Hervé Studio](https://herve.paris/)‘s art direction is deliberately anti-corporate. The typography is chunky, uppercase, slightly irreverent. “THREE.JS CONF” splashed across the viewport in cream-colored block letters. This creates a visual tension: rigid, flat 2D type as an immovable anchor against chaotic, bouncing 3D spheres rolling over and around it.

The background shifts between saturated gradients. Pink-purple for the speakers. Lavender-blue for the community. Every scroll reveals a new mood & kawaii faces, blending “superflat” pop art with hyper-modern 3D rendering.

Navigation is minimal: “Line Up”, “Sponsor It”. Everything else lives in the 3D scene. We trust visitors to explore rather than click through menus.

## Making Things Move: Physics

Of course, the site runs on the latest Three.js using WebGPURenderer and also features a custom physics engine built with performance in mind to offer a smooth experience.

_“It started simple. Each ball attached to a target point in space, trying to reach it, pushing other balls out of the way iteratively._ _Basic, but it worked and it was fun.” – Makio64_

From that foundation, the system grew to include:

-   _Velocity_, _Springs_, _Bounciness_
-   AABB collider for the UI
-   Spatial hash for performance.
-   Profiling + hot loop optimization using LLM
-   Move it all to Web Worker

But we wanted the physics to extend beyond the 3D scene, the UI buttons use custom SVG shapes with 48 control points, so they react to the visitor’s cursor in a smooth, organic way and go idle to save performance when nothing moves anymore and the cursor is far.

## The Rendering Pipeline

As this site is for the Three.js community, we wanted to showcase recent additions to the library. One of them is Screen-Space Global Illumination (SSGI), which gives the scene raytraced color bleeding, making the spheres and environment blend together far more realistically.

But everything comes with a cost. In early testing we hit glitches and performance problems, so we had to tune the SSGI aggressively, introduce optimizations and an adaptive performance system that gives each device the best visual quality it can handle.

Pushing WebGPU hard meant encountering unexpected difficulties. As [Makio64](https://x.com/makio64) explains: “I dug into iOS float errors, packing problems, and even had to patch Three.js itself, fixing Android shadow rendering and integrating latest PRs like [Renaud Rohlinger’s](https://x.com/onirenaud) [non-blocking compileAsync PR](https://github.com/mrdoob/three.js/pull/32984) so shader compilation doesn’t freeze the main thread.”

## Packing the Pile: Materials & Data

Every sphere in that pile looks unique. We used a combination of normal maps, spiral, main and sub colors, noises, and different eyes. But rendering hundreds of distinct materials would instantly kill our 120 FPS target. We had to optimize once again.

First, the textures: Normal, roughness, and diffuse maps were baked into texture atlases and compressed as KTX2 (ETC1S & UASTC).

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/02/Screenshot-2026-02-28-at-15.03.50-scaled.png?x72865)

The material itself is a custom TSL node graph extending MeshStandardNodeMaterial. This let us override the normal, roughness, and color nodes with custom logic while still getting Three.js’s PBR lighting for free.

WebGPU imposes strict limits — just 8 vertex buffers. To survive, we heavily compressed instance data. Colors, UV regions, tiling values, and metalness are all bit-packed into just four vec4 attributes. The shader unpacks them on the fly.

iPhone testing revealed float precision issues almost immediately. We applied half-texel insets to prevent bilinear filtering from sampling across atlas cell borders. For mipmap artifacts caused by `fract()` discontinuities, we passed explicit UV gradients (`dFdx`/`dFdy`) to keep sampling stable.

```
// TSL code using vite-plugin-tsl-operator.
const atlasUV = Fn( () => {
	const baseUV = uv()
	const tiledUV = vec2(
		baseUV.x * ( repeat.x ?? repeat ).fract(),
		baseUV.y * ( repeat.y ?? repeat ).fract()
	)
	// Inset by half-texel to prevent bilinear filter sampling into gutter
	const insetUV = vec2(
		tiledUV.x * ( 1 - halfTexel.x * 2 ) + halfTexel.x,
		tiledUV.y * ( 1 - halfTexel.y * 2 ) + halfTexel.y
	)
	// Remap UV from [0,1] to [uvStart, uvEnd]
	const remappedX = insetUV.x * ( region.z - region.x ) + region.x
	const remappedY = insetUV.y * ( region.w - region.y ) + region.y
	return vec2( remappedX, remappedY )
} )()
```

The final challenge was persistence. When a user creates their own custom ball, we didn’t want to bloat the database with massive JSON payloads. Instead, we encoded the entire visual state of a sphere into a single 10-character base62 string using a mixed-radix codec. **Every user’s unique, highly detailed avatar is fully reconstructible from just 10 characters.**

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/02/Screenshot-2026-02-28-at-15.36.31.png?x72865)

One last thing: open the browser console and you’ll find some ASCII surprise 😉

## Join the Pile

The site is still evolving. New speakers, new interactions, new details appearing as the event gets closer, the digital equivalent of a venue filling up. Like the conference itself, it’s designed so the crowd isn’t watching. They’re making it.

The Three.js community has always been generous: sharing code, building open tools, celebrating each other’s experiments. It feels right that their first conference website is itself an experiment that practices what the community preaches.

**Join the Pile, Join the Waitlist** 👉 [Threejs.paris](https://threejs.paris/)

Get involved in the process!

_Three.js Conf Paris is happening in 2026. We’re looking for sponsors who want to support_ _this event, the Three.js open-source ecosystem and the creative community built around it. Get in touch at contact@threejs.paris._