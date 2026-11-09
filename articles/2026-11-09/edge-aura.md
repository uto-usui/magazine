---
title: "edge-aura"
source: "https://edge-aura.js.org/"
publishedDate: "2026-11-09"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

An organic glow that hugs the edge of your screen.

`npm install edge-aura`

Playground

PaletteSwaps the glow's overall color scheme and mood.

PresetJumps to a ready-made combination of the settings below.

ThicknessHow deep the glow reads before fading toward the center.

Corner radiusRounds the glow's corners to match your screen's curve.

InsetPulls the glow's edge in from the screen's outer rim.

OpacityControls how bright and solid the glow's core appears.

PastelSoftens saturated hues into a lighter, milkier tone.

Idle speedHow fast the glow drifts around the screen when idle.

Hue driftSway range on the hue wheel. 0° = fixed, 45° = broad drift.

HighlightHow much of the ring the bright sweep covers. 0 = off.

CornersRound off, or fill the square corners with light.

Live — reflects the controls above.

```
<EdgeAura
  options={{
    geometry: { cornerFill: true },
    palette: { background: "dark", blendMode: "plus-lighter" },
  }}
/>
```

```
npm install edge-aura
```

```
import { EdgeAura } from "edge-aura/react";

export function App() {
  return <EdgeAura palette="opal" />;
}
```

See the README for the full API. [README](https://github.com/takuyajodai/edge-aura#readme)