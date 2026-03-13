---
title: "Anatomy of a CSS phone mockup"
source: "https://www.conor.fyi/writing/anatomy-of-a-css-phone-mockup"
publishedDate: "2026-03-12"
category: "design"
feedName: "Sidebar"
---

![FrictionList app screenshot](https://www.conor.fyi/_next/image?url=%2Fimages%2Fcreate-technique.png&w=640&q=75)

A phone mockup looks like one effect, but it's actually six composited layers — each doing a specific job. Collapse them all and you get a flat coloured rectangle. Stack them in the right order and the eye reads it as glass, metal, and depth.

This is a walkthrough of how I built the `PhoneMockup` component above, from a blank `div` to a mouse-reactive 3D frame. We'll add one layer at a time so it's clear what each one contributes.

Here's the skeleton we're building toward:

```
<div className="bevel">        {/* Layer 1: metallic stroke */}
  <div className="body">       {/* Layer 1: dark matte casing */}
    <div className="screen">   {/* Layer 2: clipped content */}
      <DynamicIsland />        {/* Layer 3: notch + camera */}
      <Image />
      <div className="inset-shadow" />   {/* Layer 2: depth ring */}
      <div className="shine-sharp" />    {/* Layer 4: glass glint */}
      <div className="shine-soft" />     {/* Layer 4: ambient wash */}
    </div>
  </div>
</div>
```

Layers 5 and 6 are JavaScript: tilt physics and reactive shadows. Let's build up to them.

* * *

## Layer 1: The Bevel and the Stroke

The outermost `div` is just `padding: 1` and a gradient — that single pixel of visible padding is the metallic bevel:

```
<div style={{
  padding: 1,
  borderRadius: outerRadius + 1,
  background: "linear-gradient(135deg, #555 0%, #000 100%)",
}}>
```

The gradient runs from `#555` to `#000` at 135° — top-left lighter than bottom-right. This simulates a brushed aluminium edge catching light from above. It's one CSS property doing optical work that would otherwise take a texture.

The `borderRadius` is calculated as `width * 0.12`. The iPhone's corner radius scales proportionally to the device width, so we keep it as a ratio rather than a fixed pixel value. Resize the component and the corners stay iPhone-shaped.

Nested inside: the dark matte casing:

```
<div style={{
  padding: 5,
  borderRadius: outerRadius,
  background: "#181818",
}}>
```

`5px` of padding is the visible dark frame around the screen. Notice `borderRadius` here is `outerRadius`, not `outerRadius + 1` — the outer wrapper gets `+1` to avoid a visual gap between the bevel ring and the body where the gradient might bleed through.

`innerRadius` is `outerRadius - 5` — matching the 5px padding offset. This keeps the inner corners visually concentric with the outer ones. Without this, the screen corners appear too sharp or too round relative to the frame.

### Ambient shadows

A single `box-shadow` looks artificial — the falloff is a crisp edge rather than a natural penumbra. We stack nine layers, each progressively lighter and more diffuse:

```
const ambientShadows = [
  "0 1px 2px rgba(0,0,0,0.15)",
  "0 2px 4px rgba(0,0,0,0.12)",
  "0 4px 8px rgba(0,0,0,0.10)",
  "0 6px 12px 2px rgba(0,0,0,0.08)",
  "0 8px 16px 4px rgba(0,0,0,0.06)",
  "0 12px 24px 6px rgba(0,0,0,0.05)",
  "0 16px 32px 10px rgba(0,0,0,0.04)",
  "0 24px 48px 16px rgba(0,0,0,0.03)",
  "0 32px 64px 24px rgba(0,0,0,0.03)",
]
```

Each step doubles the blur, adds more spread, and halves the opacity. The result is a soft, real-looking shadow that falls off the way light actually does. This is passed as the `box-shadow` property alongside the edge shadows we'll add in Layer 6.

* * *

## Layer 2: The Screen

The screen wrapper does two things: clips the image to the rounded shape, and adds a depth ring:

```
<div style={{
  position: "relative",
  borderRadius: innerRadius,
  overflow: "hidden",
  lineHeight: 0,
}}>
  <Image src={src} width={width} height={height} />
  {/* Screen inset shadow */}
  <div style={{
    position: "absolute",
    inset: 0,
    borderRadius: innerRadius,
    boxShadow: "inset 0 0 3px 1px rgba(0,0,0,0.4)",
    pointerEvents: "none",
    zIndex: 2,
  }} />
```

`overflow: hidden` does the border-radius clipping on the image — the image itself doesn't need a `borderRadius` because the container clips it.

Without an image yet, we can see the screen container clipped to the frame:

`lineHeight: 0` is non-obvious but essential. Images are inline elements by default, which means the browser reserves space below them for text descenders — about 4px of empty space at the bottom of the container. Setting `lineHeight: 0` on the wrapper collapses that. Without it, the image floats slightly above the bottom of the frame.

### Height calculation

We need to maintain the real iPhone aspect ratio. The iPhone 17 Pro is 2622 × 1206 pixels — a ratio of roughly 2.175:1. We derive height from width:

```
const height = Math.round(width * (2622 / 1206))
```

Pass a `width` prop and height follows automatically. Hardcoding a height would break the proportions the moment someone changes the width.

![Layer 2 demo](https://www.conor.fyi/_next/image?url=%2Fimages%2Fcreate-technique.png&w=640&q=75)

The inset shadow overlay sits at `zIndex: 2` above the image. It's a dark ring that recesses the screen into the bezel — the difference between a screen that looks flush and one that looks embedded.

![Layer 2 complete](https://www.conor.fyi/_next/image?url=%2Fimages%2Fcreate-technique.png&w=640&q=75)

* * *

## Layer 3: The Dynamic Island

Three concentric circles faking lens depth:

```
// notchW = width * 0.33, notchH = width * 0.09
<div style={{
  position: "absolute",
  top: 8,
  left: "50%",
  transform: "translateX(-50%)",
  width: notchW,
  height: notchH,
  borderRadius: 999,
  background: "#181818",
  zIndex: 1,
}}>
  {/* Camera lens — outer housing */}
  <div style={{
    borderRadius: "50%",
    background: "radial-gradient(circle at 35% 35%, #1a1a1a 0%, #050505 100%)",
    boxShadow: "inset 0 0 1px 0.5px rgba(255,255,255,0.08)",
  }}>
    {/* Lens inner ring */}
    <div style={{
      inset: 2,
      background: "radial-gradient(circle at 40% 40%, #222 0%, #0a0a0a 60%, #050505 100%)",
    }}>
      {/* Specular highlight — covered in Layer 6 */}
    </div>
  </div>
</div>
```

`borderRadius: 999` on the island container is intentional. A value large enough — larger than half the element's height — always produces a perfect pill shape regardless of the element's actual dimensions. No need to recalculate as width changes.

The radial gradients are positioned off-center (`35% 35%`, `40% 40%`) to simulate a fixed light source above and to the left. Moving the gradient center away from `50% 50%` shifts the bright spot, making the glass appear to have a real angle relative to the light.

The `zIndex: 1` on the island positions it above the image but below the shine overlays (`zIndex: 2`). The Dynamic Island is part of the device, not a reflection.

Building it up in three steps — pill, lens housing, inner ring with specular:

* * *

## Layer 4: The Glass Layers

Two overlays simulate screen glass. Both sit at `zIndex: 2`.

### Sharp diagonal glint

```
<div style={{
  position: "absolute",
  top: -(width * 0.25),
  left: -(width * 0.25),
  right: -(width * 0.25),
  bottom: -(width * 0.25),
  background: "linear-gradient(155deg,
    rgba(255,255,255,0.08) 0%,
    rgba(255,255,255,0.08) 35%,
    rgba(255,255,255,0) 35%
  )",
}} />
```

The trick here is the negative positioning. Setting `top/left/right/bottom` all to `-25%` makes this div 50% larger than its parent in every direction. The parent has `overflow: hidden`, so only the portion that falls within the screen bounds is visible.

Why bother making it oversized? So we can rotate and translate it without revealing transparent corners. When the tilt physics move this overlay (Layer 6), it needs room to slide without the edge becoming visible.

The gradient has two colour stops at the same percentage: `rgba(255,255,255,0.08) 35%` and `rgba(255,255,255,0) 35%`. Same position, different values — that's how you get a hard edge in a CSS gradient. No transition, just a sharp cut.

![Sharp glass glint](https://www.conor.fyi/_next/image?url=%2Fimages%2Fcreate-technique.png&w=640&q=75)

### Soft ambient wash

```
<div style={{
  position: "absolute",
  inset: 3,
  background: "linear-gradient(135deg,
    rgba(255,255,255,0.06) 0%,
    rgba(255,255,255,0) 55%
  )",
}} />
```

Gentler falloff, slightly different angle. This adds the ambient diffusion that sits behind the glint — making the top-left corner of the screen look softly lit rather than just adding one bright stripe.

![Layer 4 complete](https://www.conor.fyi/_next/image?url=%2Fimages%2Fcreate-technique.png&w=640&q=75)

* * *

## Layer 5: Making it Move

State and ref:

```
const containerRef = useRef(null)
const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
```

The core function normalises pointer position to −1..1:

```
function tiltFromPoint(clientX, clientY) {
  const rect = containerRef.current.getBoundingClientRect()
  // Convert absolute viewport coords to element-local, then normalise to -1..1
  const x = ((clientX - rect.left) / rect.width) * 2 - 1
  const y = ((clientY - rect.top) / rect.height) * 2 - 1

  setTilt({
    rotateX: -y * MAX_TILT,  // pointer at top → tilt top toward viewer
    rotateY: x * MAX_TILT,   // pointer at right → tilt right
  })
}
```

`getBoundingClientRect()` returns the element's position in the viewport. Subtracting `rect.left` converts from viewport-absolute to element-local coordinates. Dividing by `rect.width` normalises to 0–1. Multiplying by 2 and subtracting 1 shifts to −1..1.

`rotateX: -y` is the axis inversion. When the pointer is near the _top_ of the element, the top of the phone should tilt _toward_ you — that's a positive `rotateX` in CSS 3D space. But `y` is negative at the top (above centre), so we negate it.

The transform:

```
transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
```

`perspective(800px)` is the simulated camera distance. Smaller values increase the foreshortening effect — 400px looks dramatic, 1200px looks nearly flat. 800px hits the sweet spot for a phone-sized element.

`transformStyle: "preserve-3d"` propagates the 3D context to child elements. Without it, all the children collapse to the same plane and depth ordering breaks.

`willChange: "transform"` is a GPU hint — promotes the element to its own compositing layer before any animation starts, avoiding a repaint on first move.

Touch support uses the same function:

```
function handleTouchMove(e) {
  const touch = e.touches[0]
  if (touch) tiltFromPoint(touch.clientX, touch.clientY)
}
```

`e.touches[0]` is the first touch point. `clientX` and `clientY` are the same coordinate space as mouse events, so `tiltFromPoint` handles both.

![Layer 5 tilt demo](https://www.conor.fyi/_next/image?url=%2Fimages%2Fcreate-technique.png&w=640&q=75)

* * *

## Layer 6: Edge Extrusion and Shine Physics

When you tilt a physical phone, you see its edges. We fake this with offset `box-shadow`:

```
const edgeX = -(tilt.rotateY / MAX_TILT) * EDGE_DEPTH
const edgeY = (tilt.rotateX / MAX_TILT) * EDGE_DEPTH

const edgeShadows = Array.from({ length: EDGE_LAYERS }, (_, i) => {
  const t = (i + 1) / EDGE_LAYERS
  return `${edgeX * t}px ${edgeY * t}px 0 0 #222`
})
```

When `rotateY > 0` (tilting right), `edgeX` is negative, shifting the shadow left — which makes the left edge appear to protrude. Two stacked layers (`EDGE_LAYERS = 2`) with progressive offsets give soft depth rather than one sharp step.

The blur radius is `0` — these are solid-colour shadows, not diffuse. They're edge geometry, not light scatter.

![Layer 6a edge shadows](https://www.conor.fyi/_next/image?url=%2Fimages%2Fcreate-technique.png&w=640&q=75)

The glass shine overlays also react to tilt:

```
const shineX = -(tilt.rotateY / MAX_TILT) * SHINE_MAX_OFFSET
const shineY = (tilt.rotateX / MAX_TILT) * SHINE_MAX_OFFSET
const lightAlign = (-tilt.rotateY + tilt.rotateX) / (2 * MAX_TILT)  // -1 to 1
const shineOpacity = Math.max(0, Math.min(1, 0.5 + lightAlign * 0.5))
const shineAngle = 155 + (tilt.rotateY / MAX_TILT) * 5  // ±5° rotation
```

`lightAlign` measures how much the screen's normal vector aligns with the fixed top-left light source. Tilt the top-left corner toward the viewer and `lightAlign` increases, brightening the shine. Tilt it away and the shine fades.

`shineX/Y` slide the oversized shine overlay in the direction opposite to tilt — the reflection appears to hold still relative to the light source while the glass moves beneath it.

![Layer 6c shine physics](https://www.conor.fyi/_next/image?url=%2Fimages%2Fcreate-technique.png&w=640&q=75)

The specular highlight inside the camera lens follows the same values:

```
<div style={{
  top: `${20 - (tilt.rotateX / MAX_TILT) * 10}%`,
  left: `${25 - (tilt.rotateY / MAX_TILT) * 10}%`,
}} />
```

At rest it's at `top: 20%, left: 25%` — off-center, simulating a fixed light above-left. As the device tilts, it moves, maintaining the illusion of a consistent light source.

![Layer 6 complete](https://www.conor.fyi/_next/image?url=%2Fimages%2Fcreate-technique.png&w=640&q=75)

* * *

## Accessibility

One `useEffect` respects `prefers-reduced-motion`:

```
useEffect(() => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
  setReducedMotion(mq.matches)
  const handler = (e) => setReducedMotion(e.matches)
  mq.addEventListener("change", handler)
  return () => mq.removeEventListener("change", handler)
}, [])
```

We listen for runtime changes, not just the initial value — users can toggle system preferences while the page is open. When `reducedMotion` is true, `tiltFromPoint` returns early. The transition CSS is still present but never fires.

* * *

## All Together

Six layers, each handling one physical phenomenon:

Layer

What it simulates

Bevel gradient

Metallic edge catching light

Dark casing + ambient shadow

Matte body with natural depth

Screen clip + inset shadow

Glass recessed into frame

Dynamic Island

Camera hardware

Sharp + soft shine overlays

Specular and ambient glass reflection

JS tilt + edge shadows + shine physics

Device orientation and light interaction

The key insight: physical objects fool the eye by accumulating subtle cues. A single gradient isn't convincing. A single shadow isn't convincing. But six layers, each doing their specific job — bevel, shadow falloff, depth ring, glass glint, edge geometry, reactive shine — combine into something the brain reads as solid.

You can see the full component on the [apps page](https://www.conor.fyi/apps).

* * *

## Update: Side Buttons

_3 March 2026_

The mockup was missing one detail that real phones have — hardware buttons on the sides. Three on the left (action button, volume up, volume down) and a power button on the right.

The buttons are absolutely positioned inside the perspective container, sitting just outside the bezel edge. Each one is a thin rectangle with a metallic gradient, rounded on its outward-facing corners:

```
const btnW = Math.max(2, Math.round(width * 0.013))

const buttons = [
  { side: "left", top: 0.155, h: 0.032 },  // Action button
  { side: "left", top: 0.215, h: 0.06 },   // Volume up
  { side: "left", top: 0.29,  h: 0.06 },   // Volume down
  { side: "right", top: 0.22, h: 0.08 },   // Power
]
```

Positions and heights are expressed as fractions of the total phone height, so they scale proportionally with the `width` prop. At the default 218px width, each button is about 3px wide — subtle but visible.

The interesting part: the buttons react to tilt. On a real phone, you only see the side buttons when the edge faces you. Here, each button's opacity is tied to the tilt direction that reveals its side:

```
// Left buttons brighten when tilting right (left edge faces viewer)
const leftOpacity = 0.3 + Math.max(0, tilt.rotateY / MAX_TILT) * 0.4

// Right button brightens when tilting left (right edge faces viewer)
const rightOpacity = 0.3 + Math.max(0, -tilt.rotateY / MAX_TILT) * 0.4
```

Base opacity is 0.3 so they're always faintly visible, rising to 0.7 at full tilt. The transition follows the same 300ms ease-out as the rest of the tilt system, so it feels physically connected.

![Phone mockup with side buttons](https://www.conor.fyi/_next/image?url=%2Fimages%2Fcreate-technique.png&w=640&q=75)