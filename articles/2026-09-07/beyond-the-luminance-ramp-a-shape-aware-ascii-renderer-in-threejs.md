---
title: "Beyond the Luminance Ramp: A Shape-Aware ASCII Renderer in Three.js"
source: "https://tympanus.net/codrops/2026/09/04/beyond-the-luminance-ramp-a-shape-aware-ascii-renderer-in-three-js/"
publishedDate: "2026-09-04"
category: "design"
feedName: "Codrops"
author: "Edoardo Lunardi"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/09/split-article-cover-scaled.png.webp?x57826)](https://tympanus.net/Tutorials/ASCIILogo/ "Beyond the Luminance Ramp: A Shape-Aware ASCII Renderer in Three.js Demo")

_**Editor’s Note:** As our Three.js Conference celebration continues, we’re excited to welcome Edoardo Lunardi with a fascinating exploration of ASCII rendering. Going beyond simple luminance ramps, Edoardo shows how shape-aware sampling, GPU-based glyph searching, and Three.js can transform a 3D object into a remarkably detailed, interactive ASCII print._

**🥖 Pack your bags. Paris is calling!** The very first Three.js Conference is coming to Paris. Use code `CODROPS` for **15% off** and **[get your ticket →](https://threejs.paris/tickets)**

Every ASCII shader I’ve read does the same thing. Sample the scene, compute luminance, index into a ramp like `.:-=+*#%@`, done. Ten lines, and it holds up right until the object has an edge.

Put a hard diagonal across the frame and it comes out as a staircase of `#` and `%` alternating on a hair of brightness, noise sorted by weight. The ramp only knows how bright a cell is, not where inside the cell that brightness sits, so a slash and a dot with the same coverage come out as the same character. Any edge that isn’t horizontal or vertical dissolves into tone.

Lately I’ve been deep in ASCII, dithering, and retro tech aesthetics. They all come down to the same constraint: a fixed grid and a small vocabulary of marks, where the whole problem is deciding which mark goes where.

I rebuilt the Codrops mark as a solid you can drag around, printed entirely in ASCII on the GPU. Every character cell samples six points inside itself and ten in the cells around it, builds a six-value shape vector, then searches all 95 printable glyphs for the nearest match. Every cell, every frame.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/ramp-vs-search-1200x900.png.webp?x57826)

The mark printed twice from the same pose, a luminance ramp on the left and the shape search on the right. The ramp turns the diagonal edge into noise sorted by brightness; the search resolves the same edge into characters that follow it.

## Three passes, one glyph search

The renderer runs three passes per frame, and splitting them is what makes the search cheap enough to run at all.

```
renderer.setRenderTarget(this.#sceneTarget);
renderer.render(this.#scene, this.#camera);

this.#quad.material = this.#cellMaterial;
renderer.setRenderTarget(this.#cellTarget);
renderer.render(this.#frame, this.#frameCamera);

this.#quad.material = this.#postMaterial;
renderer.setRenderTarget(null);
renderer.render(this.#frame, this.#frameCamera);
```

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/three-passes-1200x900.png.webp?x57826)

The three targets for one frame: the scene pass with its own lighting, the cell target false-coloured by the glyph index each cell chose, and the final print.

The scene pass draws the solid into an offscreen target with its own lighting. The cell pass runs one fragment per character cell, picks that cell’s glyph and writes the winning index. The post pass reads those indices back and stamps the glyph from an atlas, in whatever ink the page resolved.

The search runs once per cell, and at the base cell of 6 by 10 CSS pixels that’s once per 60 pixels rather than once per pixel. The cell target is sized in cells rather than device pixels too, so the cost holds flat as the device ratio climbs.

## Building the mark as real geometry

The mark is a lens with the droplet cut through it rather than a disc extruded along Z. The cell pass reads tone, and an extrusion gives it almost nothing to read.

Two flat faces and a straight wall resolve to a single tone each under any lighting model, so every cell inside a face gets the same shape vector and the mark prints as a blob with a hard outline. Both faces have to curve so the tone runs across them.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/flat-vs-domed-1200x900.png.webp?x57826)

A near-flat extrusion printed beside the domed lens, same pose and camera. The flat faces resolve to a single tone each and print as a blob with an outline; the domed faces give every cell a different tone to read.

Each face is cut from a sphere placed to pass through the rim and through the middle. Two constraints, so one radius:

```
const DOME_RADIUS = (OUTER_RADIUS * OUTER_RADIUS + domeSag * domeSag) / (2 * domeSag);
const DOME_CENTRE = Math.sqrt(DOME_RADIUS * DOME_RADIUS - OUTER_RADIUS * OUTER_RADIUS) - RIM_DEPTH / 2;

const domeZ = (r) => Math.sqrt(Math.max(DOME_RADIUS * DOME_RADIUS - r * r, 0)) - DOME_CENTRE;
```

`domeZ` gives the height of either face at any distance from the centre, and at the outer radius it comes out at exactly half the rim thickness.

The droplet outline is a polar function. Past the angle where a tangent from the apex meets the bulb, the outline is the bulb’s own arc. Before it, the outline is the tangent line. The shape is convex with the centre inside it, so every ray leaves exactly once and the function is single valued:

```
function dropletRadius(theta) {
  const dy = Math.sin(theta);
  const turn = theta - TANGENT_FROM - Math.floor((theta - TANGENT_FROM) / TAU) * TAU;

  if (turn <= TANGENT_SPAN) {
    return TANGENT_C / (TANGENT_NX * Math.abs(Math.cos(theta)) + TANGENT_NY * dy);
  }

  const along = dy * BULB_Y;

  return along + Math.sqrt(Math.max(along * along - BULB_Y * BULB_Y + BULB_RADIUS * BULB_RADIUS, 0));
}
```

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/droplet-1200x900.png.webp?x57826)

The outline as a polar function: the bulb’s arc, the two tangent lines meeting at the apex, and the tangent points where one hands over to the other. Drawn from the same constants the geometry is built from.

The `Math.abs` on the cosine is what lets the right-hand tangent serve both sides of a mirror-symmetric outline. Segment count is a multiple of four so one step lands exactly on the apex and that corner stays sharp instead of getting sanded off by the sampling.

Face normals come from the dome sphere’s own radius through each point rather than from differencing neighbours, so they’re exact. The rim and the droplet wall get a flat normal per step instead, which is what keeps the apex a hard corner:

```
const nz = (Math.abs(z) + DOME_CENTRE) * side;
const length = Math.hypot(x, y, nz) || 1;

return [
  [x, y, z],
  [x / length, y / length, nz / length],
];
```

192 segments at 22 quads each gives 4,224 quads, or 8,448 triangles, built once into a non-indexed BufferGeometry. The curvature is what the print is reading, so flat geometry can’t be rescued later in the shader.

## Baking the glyph atlas

The atlas is rasterized in the browser at runtime, from whatever monospace face the stylesheet resolved on the canvas. 95 glyphs, space through tilde, drawn into a 10 by 10 grid with 8 pixels of bleed around each cell so a glyph overshooting its box isn’t clipped into a false edge.

```
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = `${weight} ${Math.floor(Math.min(cellH * 0.92, cellW / 0.58))}px ${font}`;

for (let glyph = 0; glyph < GLYPHS.length; glyph++) {
  ctx.fillText(GLYPHS[glyph], (glyph % cols) * padW + padW / 2, Math.floor(glyph / cols) * padH + padH / 2);
}
```

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/atlas-sheet-1200x900.png.webp?x57826)

The baked sheet, straight off the source canvas, with the inner cell boxes stroked. The bleed around each box is what keeps an overshooting glyph from being clipped into a false edge.

The size is the smaller of two fits, 92% of the cell height or the cell width over 0.58, so tall glyphs and wide glyphs both land inside the box without measuring anything per glyph.

The face is loaded with `document.fonts.load` rather than awaited through `document.fonts.ready`, so the atlas bakes from the intended face instead of from whatever the fallback stack resolves to first. A failed fetch still bakes, in whatever it falls back to.

### Six points instead of one average

Each glyph gets a six-value vector describing where its ink sits, measured at six fixed points inside the cell:

```
const INNER_SAMPLES = [
  [0.28, 0.26],
  [0.72, 0.14],
  [0.28, 0.56],
  [0.72, 0.44],
  [0.28, 0.86],
  [0.72, 0.74],
];
```

The right column rides higher than the left, and that asymmetry is doing the work. A diagonal running bottom left to top right lands on the high right samples and the low left samples, which is a different signature from two stacked dots even when the total coverage is identical. Symmetrical points would collapse both cases into the same vector and put us back where the ramp was.

Each value is the coverage of the glyph’s alpha channel inside a disc of radius 0.26 cell heights around its point, so a stroke passing near a sample still registers instead of falling between taps.

### Normalized per sample point, not globally

Normalizing the whole set against one global peak would collapse most of the vocabulary. Glyphs carrying heavy total ink would win every slot, and a flat region of the mark would map onto one or two dense characters across its entire area.

```
for (let sample = 0; sample < INNER_SAMPLES.length; sample++) {
  let peak = 0;

  for (let glyph = 0; glyph < count; glyph++) {
    peak = Math.max(peak, vectors[glyph * INNER_SAMPLES.length + sample]);
  }

  if (peak > 0) {
    for (let glyph = 0; glyph < count; glyph++) {
      vectors[glyph * INNER_SAMPLES.length + sample] /= peak;
    }
  }
}
```

Each of the six slots is scaled by its own peak across the 95 glyphs, so a slot that no glyph fills heavily still spans the full range, and flat tone keeps spreading across the vocabulary instead of collapsing onto a single glyph.

The cell shader does its own normalization, and it isn’t the same operation. It takes a single peak across that cell’s six values and raises each of them to a `CONTRAST` exponent against it.

The atlas vectors ship as a 6 by 95 single-channel float texture, one row per glyph, read with `texelFetch` so nothing is filtered on the way in.

## The search, one fragment per cell

The cell pass is where the frame time goes. Each of its sixteen sample positions is more than one texel read: a centre tap plus six on a hexagonal ring, averaged:

```
vec4 sampleCircle(vec2 c) {
  vec2 middle = cellBase + vec2(c.x, 1.0 - c.y) * uCellPx;
  float r = uCellPx.y * 0.161;
  vec4 acc = fetchTap(middle);

  for (int k = 0; k < 6; k++) {
    acc += fetchTap(middle + RING[k] * r);
  }

  return acc / 7.0;
}
```

Seven taps means a sample measures a small disc rather than a point, and taps falling outside the scene target return zero rather than clamping to the edge.

Luminance comes out after unpremultiplying, then gets weighted back by coverage:

```
float circleLum(vec4 acc) {
  vec3 straight = acc.rgb / max(acc.a, 1e-4);

  return clamp(dot(straight, vec3(0.2126, 0.7152, 0.0722)), 0.0, 1.0) * acc.a;
}
```

Dividing by alpha recovers the solid’s own shading independent of how much of the disc it covers. Multiplying by alpha at the end puts the coverage back into the number, so a cell half filled by the silhouette returns a lower value than a full cell at the same shading. The search sees the outline and the shading in one value.

### Neighbour taps, so a cell knows which side of an edge it’s on

The ten outer taps are what make an edge snap instead of smear. A cell sitting on a boundary averages both sides of it, which leaves the edge locally low contrast in exactly the place it needs to be high.

Each inner sample is compared against the brightest neighbour lying in the directions it faces, then pushed down if it loses:

```
float dirContrast(float value, float ext) {
  float peak = max(value, ext);

  if (peak < 1e-4) {
    return value;
  }

  return pow(value / peak, EDGE_CONTRAST) * peak;
}

v[0] = dirContrast(v[0], max(max(e[0], e[1]), max(e[2], e[4])));
v[1] = dirContrast(v[1], max(max(e[0], e[1]), max(e[3], e[5])));
// v[2] through v[5] follow the same shape
```

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/taps-1200x900.png.webp?x57826)

The six inner samples and ten outer taps drawn against a 3 by 3 cell neighbourhood. The cell being solved is the centre one; every outer tap sits inside a neighbour.

If a neighbour outside the cell is brighter, this sample sits on the dim side of an edge running through the region, and the exponent widens the gap between the two halves of the cell. That’s the difference between a cell resolving to a slash and the same cell resolving to a percent sign.

Then the search itself, a plain linear scan with no early exit:

```
int best = 0;
float bestD = 1e9;

for (int g = 0; g < uGlyphCount; g++) {
  float d = 0.0;

  for (int i = 0; i < 6; i++) {
    float diff = v[i] - texelFetch(tShapes, ivec2(i, g), 0).r;

    d += diff * diff;
  }

  if (d < bestD) {
    bestD = d;
    best = g;
  }
}

outColor = vec4(colAcc / max(alphaAcc, 1e-4), float(best) / 255.0);
```

570 subtract-square-accumulate operations per cell, against a texture small enough to sit in cache, and 112 texture fetches on top for the sixteen sample discs.

The winner leaves in the alpha channel as `float(best) / 255.0`. 95 glyphs fit under 255, so an ordinary 8-bit RGBA target carries the index and there’s no need for a second attachment or a float format.

## Compositing without mip seams

The post pass has one trap in it, and anything that samples an atlas per cell will hit the same one.

Atlas UVs jump discontinuously at every cell boundary. One cell holds a hash from the middle of the sheet, the next holds an L from the corner, so the UV is a sawtooth with a hard break on each edge. Let the GPU take derivatives of that UV on its own and every jump reads as a texture minified into nothing, so it reaches for the smallest mip and faint seam lines appear along the grid. Worse, whether they show up at all depends on cell size and device ratio, so the bug comes and goes as the layout changes, which is exactly what makes it easy to miss.

```
vec2 atlasStep = uAtlasInner / uAtlasGrid;
float mask = textureGrad(tAtlas, atlasUv, dFdx(cellPos) * atlasStep, dFdy(cellPos) * atlasStep).a;
```

`cellPos` is continuous across the frame, so its derivative is a sane per-pixel step, and scaling by the atlas cell size converts it into the right derivative in atlas space.

## Keeping the cost tied to the cell grid

Cost here is a function of the cell grid, not of the canvas. The scene target is sized at twelve pixels per cell row:

```
const scale = SCENE_CELL_PX / cellHeight;
const sceneWidth = Math.max(Math.round(width * scale), 1);
const sceneHeight = Math.max(Math.round(height * scale), 1);

this.#renderer.setPixelRatio(dpr);
this.#renderer.setSize(width, height, false);

this.#sceneTarget.setSize(sceneWidth, sceneHeight);
this.#cellTarget.setSize(cols, rows);
```

The cell pass needs enough scene resolution to place its sixteen sample discs and nothing beyond that. Sizing the target off the canvas would mean rendering the solid at full device ratio and throwing almost all of it away in averaging. Only the post pass runs at canvas resolution, and per pixel it does one `texelFetch` for the cell’s index plus one atlas lookup.

Cell count is aimed at 4,600. Past that the cell grows and the grid stays roughly where it is:

```
const raw = (this.#width / CONFIG.cellW) * (this.#height / (CONFIG.cellW * CONFIG.lineRatio));
const growth = raw > CONFIG.maxCells ? Math.sqrt(raw / CONFIG.maxCells) : 1;

this.#cellW = Math.round(CONFIG.cellW * growth);
this.#cellH = Math.round(this.#cellW * CONFIG.lineRatio);
```

`maxCells` is a target rather than a hard ceiling. Cell dimensions get rounded to whole pixels after the growth factor is applied, so the real count lands near 4,600 and can sit above it. Growth is always computed from the base cell size, never from the previous result, or a run of resizes would compound into cells the size of tiles.

The loop is capped at 60fps, with slack:

```
const FRAME_SLACK_MS = 8;

if (dt < 1000 / CONFIG.frameHz - FRAME_SLACK_MS) {
  return;
}
```

A threshold of exactly 1000/60 lands on the display’s own beat. One frame arrives a fraction early, gets skipped, and the loop settles into 30fps. Eight milliseconds of slack keeps the threshold clear of it. Easing runs on a frame-rate independent exponential damp so the same drag feels identical at 60 and 144Hz, and an IntersectionObserver stops the loop entirely once the element leaves the viewport.

## Light and dark as a tone inversion

Switching theme inverts the scene tone rather than swapping a colour, because density means opposite things on the two grounds. On paper a dense glyph reads as dark. On a dark ground the same glyph reads as light. Keep the tone and change only the ink and the mark prints as its own negative on one of them.

```
outColor = vec4(mix(lit, mix(vec3(0.18), vec3(1.0), 1.0 - lit), uPaper), 1.0);
```

The 0.18 is the lit side’s minimum ink. Without it, fully lit tone inverts to zero, the brightest region of the mark gets handed a space character, and the silhouette breaks open exactly where the light lands.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/08/themes-1200x900.png.webp?x57826)

The same pose in both themes. The scene tone inverts with the ground and only the ink colour changes, so the mark reads as the same object on both instead of as its own negative.

The ink never appears in the shader at all. The element reads the computed colour off the canvas, paints it into a one-pixel canvas and reads the bytes back:

```
ctx.fillStyle = getComputedStyle(element).color;
ctx.fillRect(0, 0, 1, 1);

const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;

return new Color().setRGB(r / 255, g / 255, b / 255, LinearSRGBColorSpace);
```

Parsing that string would be a losing game. The cascade can hand down `color-mix()`, a relative colour, `oklch()`, or whatever ships next year. Only the browser reliably knows what it resolved to, and a one-pixel canvas is the cheapest way to ask.

## Everything inside one custom element

There’s no framework here and no component tree. The page ships a canvas inside a custom element, and the stylesheet owns the box:

```
<ascii-logo role="img" aria-label="The Codrops mark, drawn as a rotating solid in ASCII characters">
  <canvas data-logo-canvas class="is-hidden"></canvas>
</ascii-logo>
```

Three things have to be true in CSS. A fixed aspect ratio so the canvas is never a layout shift, a monospace family on the canvas because the atlas bakes from it, and a `color` on the element because the print is drawn in whatever ink resolves there.

There’s no loading state and no fallback. The canvas ships hidden and fades in once a frame lands cleanly. If WebGL is missing, a shader is rejected, or the context is lost, the element keeps its box and stays empty, which is quieter than a skeleton that never resolves into anything.

```
renderer.debug.onShaderError = () => {
  throw new Error("ascii-logo: shader failed to compile");
};
```

Throwing on a shader error rather than logging it is deliberate. A rejected shader takes the same path as a missing context, so there’s one failure branch to reason about instead of two, and the pointer listener only gets attached once there’s something to turn.

Reduced motion holds the frame and skips the idle float, though a drag still runs, because a drag is the visitor’s own doing rather than motion imposed on them. Once the easing settles below a threshold the loop stops instead of repainting an unchanged frame forever.

## What sampling for layout buys you

Sampling for layout turns an ASCII filter into an ASCII print. A diagonal comes out as a slash, a corner as an L, a flat face as an even field that still varies across itself, and the mark holds its edges the whole way through a drag. That’s the reason to render it as a solid instead of running a filter over a picture of one.

None of the machinery cares that the output happens to be characters. The offscreen target sized off the cell grid, the glyph index riding in an 8-bit alpha channel, the neighbour taps, the hand-computed derivatives. Swap the atlas for tiles, dominoes, or a set of hand-drawn strokes and the search doesn’t change.