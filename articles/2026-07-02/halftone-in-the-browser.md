---
title: "Halftone in the browser"
source: "https://www.carmenansio.com/articles/halftone-in-the-browser/"
publishedDate: "2026-07-01"
category: "design"
feedName: "Sidebar"
---

I kept an old iMac running past its useful life because it was the last machine that would launch Freehand MX. That wasn’t nostalgia. Freehand had halftone controls that Illustrator still doesn’t match, and I was deep into prepress work: film separations, moirés, linen testers, the whole pipeline from RGB screen to CMYK dot.

Print forced you to separate concerns: the grid, the frequency, the shape at each node. The browser lets you ignore all of that. I didn’t.

Macromedia Freehand MX · 2003

## What a halftone is

A linen tester is a loupe with a ruled reticle. You hold it over the proof and count dots per centimeter. That number, screen frequency, controls everything: how much shadow detail survives, how clean the highlights read, whether dots touch under press pressure and fill in.

You can’t print a gradient. You print dots, and their size carries the tone. The slider shows what changing frequency costs you.

Brighter pixels produce larger dots: luminance maps directly to radius.

continuous tone

halftone (circle)

screen frequency10 px

```
// For each grid cell: sample brightness, map to dot radius
const lum       = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
const dotRadius = lum * spacing * 0.46;  // bright pixels → large white dots

if (dotRadius > 0.4) {
  ctx.beginPath();
  ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
  ctx.fill();
}
```

## Screen shapes

Freehand had a screen shapes panel. Most designers ignored it. Circles are standard because they tile cleanly and produce smooth tonal gradients, but the shape is just a drawing call. Change it without touching the grid, the frequency, or the size formula.

```
const t    = smoothstep(1 - dist / maxR);
const size = minSize + (maxSize - minSize) * t;
const hue  = (Math.atan2(y - cy, x - cx) * 180/Math.PI + 180 + rotation) % 360;

drawShape(ctx, x, y, size, `hsl(${hue}, 88%, ${40 + 30*t}%)`);
// swap circle, hexagon, diamond, triangle, position, size, color identical
```

Same grid, same size formula, same color. Only the draw call changes. The layout and the primitive are fully decoupled. Same principle as changing screen angle on a plate: the grid geometry is independent from what gets printed at each node.

## Halftone as hover

In a darkroom, the enlarger is the exposure source. Proximity determines how a dot burns: close in, large; further out, small. The cursor is the enlarger here. Angle from the cursor maps to hue, so the bloom carries a full color wheel.

`hoverStrength` lerps between 0 and 1 on enter and leave so the effect fades rather than snapping. The canvas sits over the card with `pointer-events: none` so mouse events reach the card div.

Gaussian falloff (`Math.exp(-dist²/haloR²)`) rather than linear: linear would create a hard visible boundary at `haloR`. Gaussian trails off continuously, with no visible boundary.

Interaction Design

Motion that earns attention

CanvasHoverHalftone

```
// Gaussian falloff: smooth, no hard cutoff at haloR
const t = Math.exp(-(dist * dist) / (haloR * haloR)) * hoverStrength;

const r   = baseR + maxBoost * t;
const hue = (Math.atan2(dy, dx) * 180/Math.PI + 180 + elapsed * 20) % 360;
const sat = 15 + 73 * t;
ctx.fillStyle = `hsla(${hue}, ${sat}%, ${52 + 18*t}%, ${0.04 + 0.28*t})`;
```

## Distance as phase delay

The same distance formula, used differently. Here distance from the wave origin becomes a phase offset in a sine function, so the ripple propagates outward. Instead of dot size varying, cube elevation varies. The grid goes three-dimensional.

Distance becomes time delay: cubes farther from the origin peak later, which is what makes it look like a wave rather than a uniform pulse.

click to move wave origin

```
// Painter's algorithm: sort once at startup
order.sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]));

// Per-cube wave offset
const dist  = Math.hypot(col - waveCol, row - waveRow);
const phase = dist * freq - time * speed;
const t     = (Math.sin(phase) + 1) / 2;  // continuous 0 to 1

const elev = amplitude * t;
const lean = leanAmt * Math.cos(phase);
const hue  = Math.round(265 + 95 * t);  // purple → pink → red with elevation
```

The linen tester measured in dots per centimeter. The digital version is just one function.

dxdydistorigindrag the point

dist = Math.hypot(dx, dy)

Math.hypot(90, 60) = 108