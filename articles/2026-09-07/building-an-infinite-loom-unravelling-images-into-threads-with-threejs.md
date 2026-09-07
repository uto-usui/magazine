---
title: "Building an Infinite Loom: Unravelling Images into Threads with Three.js"
source: "https://tympanus.net/codrops/2026/09/05/building-an-infinite-loom-unravelling-images-into-threads-with-three-js/"
publishedDate: "2026-09-05"
category: "design"
feedName: "Codrops"
author: "Clément Grellier"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/unvowen_cover.png.webp?x57826)](https://tympanus.net/Development/Unwoven/ "Building an Infinite Loom: Unravelling Images into Threads with Three.js Demo")

**_Editor’s Note:_** _Our Three.js Conference celebration takes a beautifully tactile turn today. Clément Grellier’s “Unwoven” transforms a simple image strip into something wonderfully alive, with photographs gently weaving themselves together and unraveling into threads as they move across the screen. A gorgeous example of how a little Three.js magic can make familiar UI feel completely unexpected._

**🧵 Get woven into the action!** The very first Three.js Conference is coming to Paris, bringing the community together for two days of talks, ideas, and connections. Use code `CODROPS` for **15% off** and **[get your ticket →](https://threejs.paris/tickets)**

Most image sliders move pictures around. This one takes them apart.

**Unwoven** is an endless horizontal strip of image cards, with each card made up of 26 horizontal ribbons rather than a single rectangle. In the middle of the screen, the ribbons sit flush and the card reads as an ordinary photograph. Near either edge of the viewport, they slide out of frame at different speeds, splay apart, flutter, and bleach into the white of the page. Cards arriving from the right weave themselves together, while cards leaving on the left come undone.

Three.js, GSAP, two shaders, one HTML file, no build step.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/Capture-decran-2026-08-31-155536-1200x565.png.webp?x57826)

## The mental model

Each of the 26 bands is a **ribbon**: an independent piece of geometry, two vertices tall and 21 wide, textured with its own horizontal slice of the image. Stacked with no gaps, they form a seamless picture.

Each ribbon then derives two random numbers from its index, which determine how fast it escapes, how far it drifts, and how much it flutters. That difference is the entire effect.

## Step 1: Give every thread its own vertices

The obvious approach is to use one big plane with lots of horizontal subdivisions. Don’t. Neighbouring strips in a plane share vertices, and a shared vertex can only be in one place at a time. If strip 4 has slid 300px and strip 5 has slid 80px, the vertex between them has to pick one position, stretching the geometry to cover the difference. You get a rubbery membrane instead of a gap.

So, build the threads separately, each with its own vertices:

```
for (let t = 0; t < 26; t++) {
  for (let row = 0; row < 2; row++) {          // top and bottom edge
    const v = (t + row) / 26;
    for (let c = 0; c <= segments; c++) {
      const u = c / segments;
      position.push((u - 0.5) * width, (v - 0.5) * height, 0);
      uv.push(u, v);                           // still spans the whole card
      rim.push(row === 0 ? -1 : 1);            // which edge of the thread
      threadId.push(t);                        // used as a random seed
    }
  }
}
```

## Step 2: Slide each thread at a random speed

First, one number telling the shader how close a card is to an edge. Call it `tear`: 0 in the middle of the screen, 1 at the edge.

```
float tear = max(
  1.0 - smoothstep(-halfWidth, -halfWidth + zone, x),
  smoothstep(halfWidth - zone, halfWidth, x)
);
```

Then slide:

```
float rnd = hash(threadId + seed);
world.x += direction * pow(tear, 1.4) * (60.0 + rnd * 420.0);
```

That’s the whole effect. `rnd` differs per thread, so they all travel different distances. Widen `60.0 + rnd * 420.0` and it reads as a comb; narrow it and it reads as motion blur.

## Step 3: Open gaps and fade out

The threads are moving apart, but each is still a full-height rectangle, so they still tile with no gaps. Make the gaps by hiding each thread’s edges in the fragment shader:

```
float edge  = abs(rim);                  // 0 at the thread's middle, 1 at its edge
float width = mix(0.8, 0.2, tear);       // visible width: nearly all, then a core
float alpha = 1.0 - smoothstep(width, width + 0.06, edge);

alpha = mix(1.0, alpha, smoothstep(0.03, 0.30, tear));   // no gaps until they move

color = mix(color, vec3(1.0), smoothstep(0.55, 1.0, tear) * 0.8);   // whiten
alpha *= 1.0 - smoothstep(0.75, 1.0, tear) * 0.65;                  // then vanish
```

Two things there are worth knowing. The `mix(1.0, alpha, ...)` line forces alpha to exactly 1 while a card is mid-screen, so a woven card looks identical to a plain photo. And whitening before fading matters: fading alpha alone leaves see-through coloured lines, whereas whitening first means the threads have almost become the page before they disappear.

## Things worth playing with

`60.0 + rnd * 420.0`: controls how staggered the threads are. This is the single biggest lever.

`26` threads: around 8 looks like torn paper, while 60 looks like hair.

`pow(tear, 1.4)`: raise the value to keep the photo together longer.

The size of the tear zone: controls how much of the screen unravels at once.