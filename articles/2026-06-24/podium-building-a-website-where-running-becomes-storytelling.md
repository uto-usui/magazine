---
title: "Podium: Building a Website Where Running Becomes Storytelling"
source: "https://tympanus.net/codrops/2026/06/23/podium-building-a-website-where-running-becomes-storytelling/"
publishedDate: "2026-06-23"
category: "design"
feedName: "Codrops"
author: "Julien Sister"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/Cover-Desktop-Podium.jpg.webp?x68649)](https://podium.global/ "Podium: Building a Website Where Running Becomes Storytelling Demo")

**Podium is a production studio creating films around running, trail, and athletic culture, but always through a narrative lens.**

Their work captures what happens around performance: the silence, the effort, the environment, the human presence.

The initial idea for the site came from a simple observation: their films already carry a strong rhythm, yet most portfolio websites would break that rhythm into disconnected pieces.

We wanted to build an experience that would extend their storytelling instead of flattening it.

The project took shape over several weeks, from early concepts to final implementation. One of the key turning points was moving away from a page-based structure early on and committing to a continuous, sequence-driven experience. That decision influenced everything, from navigation to transitions to content hierarchy.

The main challenge was restraint. Not what to build, but what to remove.

## **Tech Stack & Tools**

The site was built as a custom front-end experience, with the stack chosen mainly for timing control, media handling, and animation precision.

-   **Zustand** handles shared interaction state such as pointer position, scroll progress, transition phases, and scene state.
-   **Next.js** provides the structure, routing, metadata, and server-rendered content entry points.
-   **React** is used for the component system and state-driven UI transitions.
-   **GSAP** powers the animation layer, especially ScrollTrigger for scroll-linked scenes and Flip for page transitions.
-   **Lenis** is used for smooth scrolling, synchronized with the GSAP ticker so scroll and animation share the same rhythm.
-   **Three.js / React Three Fiber** drives the WebGL scenes, including the hero shader, the mosaic section, and the 3D footer object.
-   **DatoCMS** manages project and homepage content, keeping the editorial structure flexible.

## **Feature Breakdowns**

### **1\. Hero Grain and Mouse Texture**

The homepage starts with a shape that reacts to the cursor. The intention was to highlight one of the essential parts of Podium’s visual language: grain.

The mouse movement is written into a small trail texture. That texture is then passed to the shader and used as an influence map. The cursor does not move the shape directly. It disturbs the material inside it.

One important detail is the blend mode: `difference`. The trail is not just painted normally into the texture. Difference blending creates contrast by comparing the existing texture values with the new input, which gives the trace a sharper, less polished feel. That is useful here because the effect needs to feel closer to image grain than to a soft glow.

```
const [mouseTexture, onMove] = useTrailTexture({
  size: 1024,
  maxAge: 600,
  blend: 'difference',
  radius: 0.095,
  intensity: 0.1,
  minForce: 0.5,
});

useFrame(() => {
  const { uvX, uvY, moveId } = usePointerStore.getState();

  if (moveId !== lastMoveIdRef.current) {
    lastMoveIdRef.current = moveId;
    onMove({ uv: { x: uvX, y: uvY } });
  }
});
```

On the shader side, the trail texture is mixed with noise and used to offset the UVs.

The result is local distortion: the image feels like it has a surface, and the cursor briefly reveals that surface.

### **2\. Pixel Language in Micro-interactions**

The same visual idea appears in smaller interactions across the site. Text does not simply fade in. It often appears character by character, with a slightly irregular order. Hover states also use small pixel-like behaviors instead of large decorative animations.

```
const split = SplitText.create(el, {
 type: 'words,chars',
 charsClass: 'char',
 wordsClass: 'word',
});

gsap.to(split.chars, {
 opacity: show ? 1 : 0,
 duration,
 stagger: { amount: staggerAmount, from: 'random' },
});
```

This gives the interface a cohesive visual texture. The pixel treatment connects the hero, the typography, the project controls, and the small hover moments without over-explaining the brand. It is present enough to be felt, but restrained enough to stay in the background.

### **3\. Page Transitions**

Project transitions were designed to avoid the feeling of leaving one page and loading another. When a user clicks a project, the selected media becomes the transition object.

The animation starts from the media’s current position in the grid. A temporary overlay is placed exactly on top of it, using the same visual asset. That overlay then expands into the project hero while the route changes underneath. 

This makes the transition feel connected to the content instead of attached to the interface.

We went through several iterations here. One version used a pixel-style background during the page transition, but it started to feel too heavy and not refined enough for the final direction. It was visually interesting, but it pulled attention away from the project media.

Old pixel transition

The final version is intentionally simple and precise: the image or video itself carries the transition, without adding a separate visual effect on top of the media.

Transition

## **Visual & Interaction Design**

The design is built around restraint and rhythm.

We intentionally avoided heavy visual effects. Instead, we focused on:

-   **Pacing through scroll**
-   **Subtle transitions**
-   **Strong typographic hierarchy**
-   **Generous spacing**

Scroll becomes the primary interaction model, not just for navigation, but for storytelling.

There’s a deliberate slowness to the experience. Elements don’t appear instantly; they emerge. This mirrors the nature of running itself which is progressive, continuous, immersive.

Transitions are soft and directional, often vertical, reinforcing the idea of movement through space rather than jumping between states.

## ****Reflections****

This project reinforced something we believe strongly: _Not every site needs to be fast in the same way. Sometimes, slowing down is what creates impact._

Working on Podium pushed us to think about digital experiences as temporal objects, not just structures, but sequences that unfold over time. It challenged us to design with restraint, to remove rather than add, and to trust the content enough to give it space.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/Cover-Desktop-Podium-1200x900.jpg.webp?x68649)

It also highlighted the importance of alignment. When the subject, the storytelling, the design, and the development all move in the same direction, the experience becomes cohesive in a way that feels natural.

Podium now has a site that doesn’t just present its work, it extends it. A space where films can exist in the right conditions, with the right rhythm.

A reminder that sometimes, the best digital experiences are the ones that don’t try to say more, but say it better.