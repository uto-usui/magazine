---
title: "117 CSS text effects & animations"
source: "https://text-effects.colorion.co/"
publishedDate: "2026-10-16"
category: "design"
feedName: "Sidebar"
---

Pure CSS · Copy & paste

A library of 117 animated text effects built with pure CSS — aurora gradients, glitches, split-flap boards, liquid fills and other lesser-seen tricks. No JavaScript, no dependencies. Copy the self-contained `CSS` for any effect, or grab a ready-made `Prompt` to have your coding agent recreate it. Every snippet paints with the `--ink` colour tokens and respects `prefers-reduced-motion`. Want your own words? [Try the text effect generator →](https://text-effects.colorion.co/text-effect-generator/)

[All 117](https://text-effects.colorion.co/) [Gradient & colour 11](https://text-effects.colorion.co/css-gradient-text-animations/ "CSS Gradient Text Animations") [Glitch & distortion 7](https://text-effects.colorion.co/css-glitch-text-effects/ "CSS Glitch Text Effects") [Neon & glow 10](https://text-effects.colorion.co/css-neon-glow-text-effects/ "CSS Neon & Glow Text Effects") [Reveal & typing 16](https://text-effects.colorion.co/css-text-reveal-animations/ "CSS Text Reveal & Typing Animations") [3D & depth 15](https://text-effects.colorion.co/css-3d-text-effects/ "CSS 3D Text Effects") [Retro display 10](https://text-effects.colorion.co/css-retro-text-effects/ "Retro CSS Text Effects") [Letter motion 25](https://text-effects.colorion.co/css-letter-animations/ "CSS Letter Animations") [Material & texture 23](https://text-effects.colorion.co/css-textured-text-effects/ "CSS Textured & Material Text Effects")

## Text effect library

Click an effect for its code & guide · Prompt / CSS for a quick copy 117 effects

## How CSS text animations work

Every effect in this library is built from a handful of CSS techniques. Pick a style to see the effects that use it, or open any effect for a breakdown of exactly how it is made.

-   [CSS Gradient Text Animations](https://text-effects.colorion.co/css-gradient-text-animations/) Animated gradient, rainbow and colour-shifting text built with pure CSS.
-   [CSS Glitch Text Effects](https://text-effects.colorion.co/css-glitch-text-effects/) RGB split, sliced, jittering and signal-noise glitch text in pure CSS.
-   [CSS Neon & Glow Text Effects](https://text-effects.colorion.co/css-neon-glow-text-effects/) Neon signs, fire, sparkle, electric and soft-glow text in pure CSS.
-   [CSS Text Reveal & Typing Animations](https://text-effects.colorion.co/css-text-reveal-animations/) Typewriter, scramble, highlighter, shimmer and wipe-in text reveals in pure CSS.
-   [CSS 3D Text Effects](https://text-effects.colorion.co/css-3d-text-effects/) Extruded, rotating, folding, reflected and long-shadow 3D text in pure CSS.
-   [Retro CSS Text Effects](https://text-effects.colorion.co/css-retro-text-effects/) 70s retro, CRT terminal, split-flap, LED board, dot-matrix and matrix-rain text in pure CSS.
-   [CSS Letter Animations](https://text-effects.colorion.co/css-letter-animations/) Per-letter wave, bounce, pendulum, domino, explode and marquee text animations in pure CSS.
-   [CSS Textured & Material Text Effects](https://text-effects.colorion.co/css-textured-text-effects/) Chrome, gold foil, marble, glass, liquid, ice, grunge and film-grain text in pure CSS.

## Frequently asked questions

### How do I animate text with CSS?

Define the motion in a @keyframes rule and attach it with the animation property. The properties that animate smoothly are transform, opacity, filter, background-position, text-shadow and clip-path. To animate letter by letter, wrap each character in its own element with an index (style="--i:0") and offset the animation with animation-delay: calc(var(--i) \* 0.08s).

### Can I make text effects without JavaScript?

Yes. All 117 effects here are pure CSS — even the scramble-decode effect, which swaps characters with the content property inside @keyframes. There is nothing to install and nothing to run.

### How do I make gradient text in CSS?

Give the text a gradient background, clip it to the letters with background-clip: text (plus -webkit-background-clip: text), and set color: transparent. Make the background wider than the text and animate background-position to make the gradient flow.

### How do I change the colours of an effect?

Every effect paints with three custom properties: --ink for the main text colour and --ink-2 / --ink-3 for the accents. Override them on the element or on :root to re-skin any effect without touching its keyframes.

### Do these CSS text effects work in all browsers?

They work in current Chrome, Edge, Safari and Firefox. The few effects that rely on a non-standard feature, such as -webkit-box-reflect, say so on their page and degrade gracefully. All of them stop animating under prefers-reduced-motion.

### Are the text effects free for commercial use?

Yes. The whole library is MIT licensed, so you can use, modify and ship the effects in personal and commercial projects.

### What does the Prompt button do?

It copies a ready-made instruction for an AI coding agent (Claude Code, Cursor, Copilot and others) containing the exact markup and CSS, so the agent can drop the effect into your project.