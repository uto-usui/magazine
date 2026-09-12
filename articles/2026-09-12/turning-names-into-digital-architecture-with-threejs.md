---
title: "Turning Names Into Digital Architecture with Three.js"
source: "https://tympanus.net/codrops/2026/09/09/turning-names-into-digital-architecture-with-three-js/"
publishedDate: "2026-09-09"
category: "design"
feedName: "Codrops"
author: "Serhii Polyvanyi"
---

For the Three.js Conference in Paris, BL/S® created an interactive experiment that transforms your name into a dynamic 3D structure.

[3D](https://tympanus.net/codrops/tag/3d/) [Three.js](https://tympanus.net/codrops/tag/three-js/)

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/serhii.png.webp?x57826)](https://blacklead-studio.webflow.io/three-js-conf "Turning Names Into Digital Architecture with Three.js Demo")

For the [Three.js Conference](https://threejs.paris/) in Paris, we wanted to make something that felt less like a website and more like a small piece of digital machinery.

The idea was simple: **Type your name. Turn it into metal.**

The idea started with the letters themselves.

Every letter is represented as a closed contour made of exactly **120 points**. The logo letters use predefined point data. For user-generated names, we take a slightly different route: we draw each letter onto a hidden canvas, convert it into a pixel mask, trace the contour, smooth it, and bring it back to the same 120-point structure.

The holes count too — a “B” without its holes would be a very different “B”. Keeping the number of points fixed is what makes the next step possible.

## Make one letter become another

Each point on one letter has a corresponding point on the next. We interpolate between them while moving the contours along a curved path through space. Rather than using a straightforward morph, we also deform the structure as it moves.

The points twist, narrow and tilt along the way. What starts as two flat contours becomes a continuous construction, as if the letter were being pulled through a metal tube.

This is the small piece of code responsible for most of that transformation.

```
for (let k = 0; k <= SEG; k++) {
  const u = k / SEG, m = ease(u), bump = Math.sin(Math.PI * u);
  bezier(A, C, B, u, p);          // position along the curved path
  bezierTangent(A, C, B, u, t);   // direction of travel at this point

  const s = THREE.MathUtils.lerp(sA, sB, m) * (1 - state.pinch * bump);
  const tw = THREE.MathUtils.lerp(rollA, rollB, m)
          + Math.PI * state.twist * (i % 2 ? -1 : 1) * bump;
  const cosT = Math.cos(tw), sinT = Math.sin(tw);

  for (let j = 0; j < N; j++) {
    // the same point index on both letters, blended together
    const x = THREE.MathUtils.lerp(ringA[j][0], ringB[j][0], m) * s;
    const y = THREE.MathUtils.lerp(ringA[j][1], ringB[j][1], m) * s;
    const rx = x * cosT - y * sinT, ry = x * sinT + y * cosT;
    // rx, ry placed into 3D space using the curve's local frame
  }
}
```

The loop handles three things at once: interpolating the shape between two contours, moving the points along the curve, and applying the deformation that gives the transition its organic movement.

## Build it like a tower

Once the contours are flowing through space, we turn the resulting geometry into a lightweight structural system.

Instead of rendering a solid tube, we keep selected longitudinal lines, cross-braces and diagonal supports. The structure takes some inspiration from the Eiffel Tower and its approach to making a large, complex form feel remarkably light.

The whole thing is rendered in [Three.js](https://threejs.org/) using line geometry and a custom shader.

There’s no actual ray tracing behind the metal. The reflective appearance comes from a baked reflection map, which gives the structure a changing metallic surface without adding unnecessary rendering overhead.

## Make it yours

The system isn’t limited to our predefined letters. Type **your own name**, watch it become the structure, then choose a finish and share the result.

**If you make one, tag [us](https://blacklead.studio/) and the [Three.js Conference](https://threejs.paris/) — we’d love to see what names people put through it.**

## One name in. One piece of digital architecture out.

That’s the whole experiment: **a name goes in, a little piece of digital architecture comes out.**

Built for the [Three.js Conference](https://threejs.paris/) in Paris by [BL/S®](https://blacklead.studio/).

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2024/10/New-2024_1-160x160.png?x57826)

### [Serhii Polyvanyi](https://tympanus.net/codrops/author/panpolevan/)

Founder & Creative D at BL/S® // DICH® Enterprises 🏴‍☠️ // Award-winning Dude // Independent Art Director

### Creative Spotlights

Inside the journeys and portfolios of today's most inspiring [designers](https://tympanus.net/codrops/tag/designer-spotlight/) and [developers](https://tympanus.net/codrops/tag/developer-spotlight/).

![](https://secure.gravatar.com/avatar/0840447446f9c4dacd7171391e4e1634475d723bc557b93d746cd56b95ab3b43?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/photo-square-400x400-1-160x160.jpg?x57826)

![](https://secure.gravatar.com/avatar/99b569addccce6ea8f1590f7235496ce07cd80f8718b640946e13da4f75e782e?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/11/DSC_0112-awwwards-160x160.jpg?x57826)

![](https://secure.gravatar.com/avatar/6f4def39f0c4360f11ad0aa4de30e35200ae1c5f1365f7c7249837ba3ad7f0f7?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/01/db-social-pf-160x160.jpg?x57826)

![](https://secure.gravatar.com/avatar/9d360a8984abc54d8eedfca50873d7cca9d496a59378a0371d3f8ea103a3feb1?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/huy-160x160.jpeg?x57826)

![](https://secure.gravatar.com/avatar/38c09524b21fd8d80cb1440c8132212f38ec882b078239b83a121b55d12e49c2?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/08/andres-160x160.jpeg?x57826)

![](https://secure.gravatar.com/avatar/2e189e28555b71adbaad5137cd62e1e333be596f3a4f89ec14d2c60e736049ba?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/07/photo-profil-160x160.png?x57826)

### [Studio Stories](https://tympanus.net/codrops/tag/studio-spotlight/)

Discover how studios & agencies started, how they work, and what they've built.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/logo-160x160.png?x57826)

![](https://secure.gravatar.com/avatar/14d845d8c2c0e1f2ab1107b82c4b9d8a71c4165cb5a44be9b33fa6f1126a03f1?s=160&d=retro&r=g)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/06/Malvah_Logo-160x160.png?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/07/studio_freight_logo-160x160.jpeg?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/lemma-logo-160x160.png?x57826)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Logo_Wordmark_Avatar-160x160.jpg?x57826)

### [Case Studies](https://tympanus.net/codrops/tag/case-study/)

Discover the ideas, design, and craft behind today’s most inspiring web experiences.