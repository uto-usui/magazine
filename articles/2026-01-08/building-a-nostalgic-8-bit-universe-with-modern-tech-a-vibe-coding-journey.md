---
title: "Building a Nostalgic 8-bit Universe with Modern Tech: A Vibe Coding Journey"
source: "https://tympanus.net/codrops/2025/12/23/building-a-nostalgic-8-bit-universe-with-modern-tech-a-vibe-coding-journey/"
publishedDate: "2025-12-23"
category: "design"
feedName: "Codrops"
author: "Harry Chuang"
---

[![Building a Nostalgic 8-bit Universe with Modern Tech: A Vibe Coding Journey | Harry Design Studio](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/article-cover-1600x1200-1.jpg?x60535)](https://noeinoi.com/ "Building a Nostalgic 8-bit Universe with Modern Tech: A Vibe Coding Journey Demo")

## Introduction: From 2017 to 2025

My last portfolio update was in 2017. In the eight years since, the web landscape has undergone a sea change. In 2025, as I transitioned my career into a dedicated design studio, I wanted my new site to be more than a gallery—it needed to be an excavation of my roots.

Instead of following modern design, I returned to the 80s: the era of NES, Gameboy, and the binary world of 0 and 1. This is the story of how I built an 8-bit universe using a **95% AI-driven workflow**, governed by a strict “Design Constitution.”

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/harryds-gif-01.gif?x60535)

## The Concept: Pixel as a Design System

In the 80s, everything was built from pixels. To me, the pixel is the ultimate “Atom” in **Atomic Design**. A single pixel represents a binary state, but when grouped, these atoms create a complex, scalable design system.

### Visual & Interactive Language

To complete the immersion, I focused on three pillars of retro-interaction:

**The “Pixel Mask”:**  
Instead of modern fades or slides, I implemented a custom “Pixel Mask” transition for Modals—a tribute to 8-bit game scene changes.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/game-mask.gif?x60535)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/8-bit-mask.gif?x60535)

```
// Part of TransitionOverlay.tsx

// 4x4 Bayer Dithering Matrix (Normalized 0..1)
// This matrix determines which "sub-pixels" are drawn based on the alpha threshold,
// creating a classic retro-ordered dithering effect.
const bayer4x4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5]
].map(row => row.map(v => (v + 0.5) / 16));

// Inside the render loop:
const pixelSize = 60; // Size of each 8-bit "block"
const cell = pixelSize / 4; // Each block is subdivided by the 4x4 matrix

for (let ry = 0; ry < 4; ry++) {
  for (let rx = 0; rx < 4; rx++) {
    // If the pixel's alpha is greater than the matrix value, draw the sub-pixel
    if (alpha > bayer4x4[ry][rx]) {
      ctx.fillStyle = color;
      ctx.fillRect(
        x + rx * cell, 
        y + ry * cell, 
        Math.ceil(cell), 
        Math.ceil(cell)
      );
    }
  }
}
```

**Auditory Feedback:**  
Every interaction is paired with synthesized 8-bit sound effects, turning a standard browsing session into a “play” experience.

**Retro Inspiration:**  
The design draws heavily from Showa-era LED boards and vintage Japanese advertisements found in archived collections, blending 20th-century aesthetics with 21st-century code.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/led-1.gif?x60535)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/pixeltext.gif?x60535)

##   
The AI Constitution: Programming Intent via `.cursorrules`

In the era of “Vibe Coding,” the biggest challenge is maintaining design integrity while moving at AI speed. To prevent the AI from “hallucinating” styles or creating technical debt, I established a **Design Constitution** through a `.cursorrules` file. This isn’t just a prompt; it’s a set of hard constraints that govern the AI’s decision-making process.

### The Proactive Inquiry Protocol (Zero-Guessing)

The most critical rule in the constitution is the **Verification Protocol**. I’ve strictly forbidden the AI from hardcoding any hex codes or raw pixel values.

> **The Rule:** “If no matching Design Token exists in `tokens.scss`, you ARE FORBIDDEN from guessing. You MUST stop and ask for permission.”

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/cursorrules-800x462.jpg?x60535)

This transforms the AI from a “code generator” into a “compliance officer.” If it needs a specific shade of neon green that isn’t defined, it won’t hallucinate `#39FF14`; it will pause the workflow and ask: _“I cannot find a suitable token for this highlight color. Should I create a new one or use an existing reference?”_ This ensures the design system remains the single source of truth.

```
# NOEINOI 2025 Project Rules

You are an expert front-end developer and creative coder assisting Harry Design Studio. This project is a personal portfolio with a "8-bit/Pixel" retro aesthetic, using React, SCSS, GSAP, and Three.js.

## General Instructions
- Follow the "Component-First" (Lego Method) workflow: build/verify atomic components in Storybook (`harryds`) before assembling them into the portfolio interfaces.

## Strict Design Token System
- **NO HARDCODED VALUES**: You are strictly forbidden from using hex codes, raw pixel values, or raw rem units for styling.
- **MANDATORY REFERENCE**: You must always refer to `harryds/src/styles/tokens.scss` before generating SCSS.
- **VERIFICATION PROTOCOL**: 
  1. Before outputting any styling (SCSS/Inline), you must SCAN `tokens.scss` for the closest semantic match.
  2. If no match exists, you ARE FORBIDDEN from guessing or using a raw value.
  3. You MUST stop and ask: "ISSUE: I cannot find a suitable Design Token for [Value/Requirement] in tokens.scss. Should I create a new token or use an existing one?"

## Tech Stack & Visual Style
- **Visuals**: Prioritize Canvas and WebGL (Three.js) for pixelation and distortion effects. Use GSAP for all scroll-triggered and timeline animations.
- **8-bit Aesthetic**: Use `PixelationImg` and `DistortedPixels` components for images. Use `PixelText` for headers and CTAs.
- **Accessibility (A11y)**: Maintain readability. Pixel fonts are for headers/CTAs only. Use standard system fonts for body text and CJK (Chinese/Japanese) characters.

## Component Structure
- Every component folder must include:
  - `ComponentName.tsx` (React)
  - `ComponentName.scss` (SCSS with @import url('../tokens.css');)
  - `ComponentName.stories.tsx` (Storybook)
  - `index.ts` (Export)
- All styles must use `var(--hds-sys-...)` or `var(--hds-ref-...)`.

## Performance
- Use `useSmartPreload` for heavy assets (Giphy, videos).
- Use `IntersectionObserver` to pause Canvas animations when off-screen.
- Limit DPR to 1.5x on mobile to ensure 60 FPS.
```

### Atomic Assembly (The Lego Method)

Following the “Lego Method,” we built and verified every atomic component (PixelText, Button, Icon) in [Storybook](https://storybook.js.org/) before they ever touched the main product interface. This ensured that 90% of visual bugs were caught at the “brick” level.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/storybook.gif?x60535)

## Performance-Aware Pixel Art

Achieving a retro 8-bit look without sacrificing modern performance required deep optimization of Canvas and WebGL.

### Canvas Pixelation Manager (The Singleton Pattern)

To handle multiple pixelated images simultaneously, I implemented a **Singleton `PixelationManager`**. It utilizes an **Offscreen Canvas** to sample and downscale images before rendering them back to the main canvas with `imageSmoothingEnabled = false`. This avoids expensive CPU calculations on every frame.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/multi-pixel-images.gif?x60535)

```
class PixelationManager {
  private static instance: PixelationManager;
  private offscreenCanvas: HTMLCanvasElement;
  private offscreenCtx: CanvasRenderingContext2D;

  private constructor() {
    // Create a shared offscreen canvas to avoid redundant canvas creation 
    // across multiple instances, significantly reducing memory pressure.
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCtx = this.offscreenCanvas.getContext('2d', { willReadFrequently: false });
  }

  private drawInstance(instance: PixelationInstance): void {
    const { canvas, image, currentPixelSize } = instance;
    const ctx = canvas.getContext('2d');
    
    // Core Logic: Downscale the source image to the offscreen canvas (Sampling).
    const blocksX = Math.max(1, Math.floor(targetW / currentPixelSize));
    const blocksY = Math.max(1, Math.floor(targetH / currentPixelSize));
    
    this.offscreenCanvas.width = blocksX;
    this.offscreenCanvas.height = blocksY;
    
    // Disable smoothing to achieve the crisp "pixelated" look.
    this.offscreenCtx.imageSmoothingEnabled = false;
    this.offscreenCtx.drawImage(image, 0, 0, blocksX, blocksY);

    // Upscale the sampled pixel blocks back to the main display canvas.
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      this.offscreenCanvas, 
      0, 0, blocksX, blocksY, 
      offsetX, offsetY, targetW, targetH
    );
  }
}
```

### Reactive WebGL Distortion

The `DistortedPixels` component uses **Three.js Custom Shaders** to create “digital tearing” effects. We implemented **Adaptive Quality** logic that dynamically lowers the render resolution during high-intensity scroll moments, maintaining a consistent **60 FPS** on mobile devices.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/pixelimage-1.gif?x60535)

```
const renderLoop = useCallback(() => {
  // ... 
  // 1. Calculate current effect intensity based on scroll velocity.
  const p = maxPixelation > 0 ? currentPixelation / maxPixelation : 0;
  const d = maxDistortion > 0 ? currentDistortion / maxDistortion : 0;
  const intensity = Math.min(1, Math.max(p, d));

  // 2. Adaptive Quality: Lower the resolution scale as the effect intensity increases.
  if (adaptiveQuality && composerRef.current) {
    const minScale = 0.3; // Minimum resolution scale (30%)
    const targetScale = THREE.MathUtils.lerp(1, minScale, intensity);
    
    // Only update the pixel ratio if the change is significant (> 0.05) 
    // to prevent frequent and expensive canvas resizing.
    if (Math.abs(targetScale - currentQualityScale) > 0.05) {
      composerRef.current.setPixelRatio(window.devicePixelRatio * targetScale);
      currentQualityScale = targetScale;
    }
  }
  
  composerRef.current.render();
}, [maxPixelation, maxDistortion, adaptiveQuality]);
```

### GSAP Orchestration

Every scroll interaction is synchronized via **GSAP ScrollTrigger**. By mapping scroll progress to specific animation frames (e.g., the `HarryAnimation` character rotation), we created a 3D-like experience using only lightweight 2D pixel assets.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/about.gif?x60535)

```
gsap.to(visualElement, {
  x: '-50vw',
  scrollTrigger: {
    trigger: introSection,
    start: 'bottom 50%',
    scrub: true,
    onUpdate: (self) => {
      // Key: Map the normalized scroll progress (0 to 1) 
      // to the specific animation frames (Frame 1 to 8).
      const progress = self.progress;
      const currentFrame = Math.round(1 + progress * 7); 
      
      // Update the React state to switch the displayed frame 
      // of the HarryAnimation component.
      setRotationFrame(currentFrame);
    }
  }
});
```

## UX & Accessibility in a Lo-Fi World

Retro aesthetics often conflict with modern usability. Here is how we balanced the “Vibe” with UX:

**Smart Asset Preloading:** I built a `useSmartPreload` hook utilizing a **Hover Intent** pattern—waiting 300ms before triggering a load. It uses `AbortController` to cancel requests immediately if the user’s mouse leaves.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/giphy.gif?x60535)

**Typography Layering:** Pixel fonts are strictly reserved for large Headers and CTAs. For body text, we use high-contrast system fonts to ensure readability.

**Language-Specific Adaptation:** While English utilizes 8-bit fonts, **CJK (Chinese/Japanese) characters** are rendered in standard clean typefaces to avoid the legibility issues common with pixelated complex characters.

## Mitigating Code Redundancy: The “Lego Method” of Assembly

One of the inherent pitfalls of AI-assisted development is the generation of redundant, monolithic code. When tasked with building entire pages at once, AI tends to “reinvent the wheel” for every section, leading to severe code bloat. To counteract this, I enforced a strict **Bottom-Up Assembly** strategy.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/pixelfont-1.gif?x60535)

By developing and verifying atomic components in Storybook first, I created a library of single-responsibility “bricks.” This modularity ensured that when it came time to assemble the final product, the AI reused existing components rather than generating repetitive code. This not only ensured a cleaner, more maintainable codebase but also guaranteed that the visual integrity of each component remained intact during the transition from isolation to production. In the product interface, the focus shifted entirely to **data orchestration**, leaving the “pixel-fixing” behind in the component lab.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/home-grid.gif?x60535)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/harry-ani.gif?x60535)

## **CMS Automation: AI-Driven Content Pipeline**

Beyond the visual front-end, I optimized the backend workflow to eliminate manual data entry. I built an automated pipeline where local **JSON data** is processed by AI for multi-language translation and then synced directly to **Strapi CMS** via custom automated scripts. This ensures that the portfolio remains easily updatable and globally accessible without the friction of traditional content management.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/maintain.webp?x60535)

## Performance Results

Despite the heavy use of Canvas, WebGL, and animations, the site maintains a **Lighthouse Performance score around 80**. We achieved this by:  
– Limiting **DPR to 1.5x** on mobile.  
– Using **IntersectionObserver** to pause all off-screen Canvas animations.

## Conclusion

This retrospective proved that in the age of generative AI, our value isn’t measured by the lines of code we write, but by the intent we define. In the world of ‘Vibe Coding,’ AI may provide the speed, but only humans can provide the soul. The true creator is no longer the one who swings the hammer, but the one who dreams of the architecture and sets the rules that bring it to life.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/easter-egg-01.gif?x60535)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2025/12/easter-egg-02-1.gif?x60535)