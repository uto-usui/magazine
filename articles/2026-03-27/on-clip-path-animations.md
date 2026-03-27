---
title: "On clip-path animations"
source: "https://karlkoch.me/writing/on-clip-path-animations"
publishedDate: "2026-03-25"
category: "design"
feedName: "Sidebar"
---

The WorkCard detail panel is not a fade-in block. It is a circular reveal that grows out of the same point as the trigger button. That one decision makes the interaction feel connected instead of layered on top.

Here is how I built it.

## Start from the trigger point

The closed state is a tiny circle that sits exactly on the trigger button center:

```
const origin = "1.25rem calc(100% - 1.25rem)";

<div
  className="card-overlay ..."
  style={{ clipPath: `circle(0.75rem at ${origin})` }}
/>
```

`1.25rem` is 20px, which matches the center of the `40x40` trigger. Because the overlay and trigger share the same coordinate system (`bottom-4 left-4`), the clip starts from the button every time.

In the demo below, use the speed controls (`0.25x`, `0.5x`, `1x`, `2x`) to slow the clip-path transition and replay it. Watching it in slow motion makes origin drift obvious.

Left uses the button origin. Right uses center origin. Click either + button to toggle both, then slow/replay to inspect the clip-path expansion.

## Grow radius until corners are safe

Opening uses the same origin, but with a much larger radius:

```
if (!isOpen) {
  overlay.style.clipPath = `circle(150% at ${origin})`;
} else {
  overlay.style.clipPath = `circle(0.75rem at ${origin})`;
}
```

`100%` can still miss the far corner when the origin is bottom-left. `150%` gives enough headroom so the whole overlay is guaranteed to reveal across aspect ratios and viewport sizes.

Move the radius and watch when the far corner finally gets covered. The WorkCard uses 150% so the whole panel is safely revealed from the bottom-left trigger point.

## Explode the overlay stack in 3D

The overlay is not one painted layer. It is a stack:

1.  shell (glass + border)
2.  reflection
3.  gradient wash
4.  noise texture
5.  content
6.  trigger button (above the clip-path panel)

When the stack is compressed, those layers read as one surface. For debugging and teaching, I like to explode them along the Z axis so you can inspect the order and spacing.

Drag the scene to rotate and tilt the camera. Colors and badges are intentionally illustrative so the layer key is easy to match.

## Toggle interaction state, not only visuals

The clip animation is only part of it. We also switch interaction and affordance state:

```
overlay.style.pointerEvents = isOpen ? "auto" : "none";
triggerIcon.style.transform = isOpen ? "rotate(45deg)" : "rotate(0deg)";
```

When closed, the overlay does not intercept taps. When open, it can be interacted with. Rotating the plus icon into an X gives immediate state feedback without extra UI.

Complete WorkCard behavior: a tiny closed circle at the trigger, then a 150% circle on open, plus pointer-event and icon-state toggles.

## Why this works better than a simple slide

For this card, a directional slide felt generic. A radial reveal from the trigger gives:

-   a clear spatial cause ("button press causes this panel")
-   less visual conflict with the rounded card frame
-   a cleaner close motion, because it collapses back to the exact origin point

The result feels like one component with one physical center, not two layers competing for attention.