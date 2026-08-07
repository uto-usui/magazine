---
title: "Drawesome"
source: "https://benji.org/drawesome"
publishedDate: "2026-08-06"
category: "design"
feedName: "Sidebar"
---

29 July, 2026

Drawesome is a drawing toolbar for React. Seven pens, an eraser, SVG and PNG export, no dependencies beyond React. Two lines to drop into an app.

I work on a lot of creative tools, and many of them end up needing a way to draw. Annotating a screenshot, marking up a frame, circling the bit that's wrong. Rather than build it again each time, I made this.

Most of the work went into the toolbar.[1](#user-content-fn-1) It changes shape rather than swapping panels: pick a colour and the row of pens becomes the palette, open the size controls and it becomes two sliders, minimise it and it rolls up into a disc with the tool you're holding still in it. Every state morphs smoothly into the next.

## Getting started

```
npm install drawesome
```

It fills its parent container. Set a height on the wrapper.

```
import { Draw } from 'drawesome'
import 'drawesome/styles.css'
 
<div style={{ height: 480 }}>
  <Draw />
</div>
```

## The tools

Pencil

Pen

Fineliner

Marker

Highlighter

Brush

Fountain Pen

Eraser

Each behaves like the thing it's named after. The pencil, pen and brush thin out the faster you move; the fineliner and highlighter hold one width whatever you do. The fountain pen goes by direction instead: thick one way, hairline the other. No two strokes come out quite the same.

The eraser takes away area rather than whole strokes, so you can rub out part of a line and keep the rest.

## Making it yours

It's opinionated, and that's the point. The defaults are meant to be the version you ship, so you don't have to think about how it looks or feels to end up with something that looks and feels right. Everything below is turning things off or moving them around, not rebuilding it.[2](#user-content-fn-2)

Pick the tools and the order they sit in, and switch off anything you don't want:

```
<Draw
  tools={['pencil', 'marker', 'highlighter']}
  controls={{ undo: false, clear: false }}
/>
```

`theme` takes `light`, `dark` or `auto`, which follows the reader's system. The bar above is on `auto`, so it's dark if you are.

`placement` puts it on an edge and `inset` and `align` say exactly where. `draggable` lets people move it themselves. `swatches` replaces the palette with your own colours. `look="studio"` lights the tools as objects instead of shading them flat, and `depth` sets how physical the bar looks.

The canvas is whatever you want it to be. Give `background` a colour, or set it to `transparent` and the component paints nothing at all, so whatever is behind it shows through. The demo above is sitting on a bit of graph paper drawn in CSS.

```
<div className="your-paper">
  <Draw background="transparent" />
</div>
```

The bar is as wide as what's in it, and a phone has more height than width. So on a small screen, stand it up and drop a few tools. The demo does this under 680px:

```
<Draw
  placement={narrow ? 'left' : 'bottom'}
  tools={narrow ? ['pencil', 'pen', 'marker', 'highlighter', 'brush'] : undefined}
  controls={narrow ? { undo: false, clear: false, opacity: false, custom: false } : undefined}
/>
```

`controls` takes `size` and `opacity` separately, so a rail can keep one without the other stacked under it. Turn both off and the button that opens them goes too.

`chrome={false}` removes the toolbar entirely and leaves you the surface. `DrawSurface`, `Toolbar` and the `useDrawing` hook are all exported separately if you'd rather lay the pieces out yourself.

Put a ref on it to get the drawing out. `toSvg()` gives you a string, `toPng()` a file, `download()` saves either. What you get back is exactly what was on screen, erasing and all.

```
await draw.current.download('sketch', 'png', 2)
```

## Props

#### Surface

A fixed drawing area, in board units. Left off, the drawing is whatever size the element is.

Any CSS colour, "transparent" to paint nothing so whatever is behind shows through, or "checker".

What to open with, for restoring something saved earlier.

Fires on every finished stroke and every erase. Strokes are plain data, so you can store them as they are.

Passed to the root element, along with style.

#### Tools

Which pens appear, and in what order.

Whether picking a colour changes every tool or only the one in hand. "auto" keeps the highlighter on its own and shares the rest.

Your own palette, clamped to what the bar can hold.

How the tools are drawn: shaded flat, or lit as objects.

Print the current size on the barrel.

#### Chrome

false leaves the surface and no toolbar, for bringing your own.

How far the bar sits off its edge.

Where along that edge it sits.

Let people pick the bar up and put it somewhere else.

Where size and opacity live.

size and opacity are separate; turn both off and the control goes. custom is the swatch that opens the hex field and spectrum, worth dropping on a phone.

How physical the bar looks: shadow, the light down its face, and the sheen on its top edge, all stepped together.

"auto" follows the reader's system setting.

Single-key shortcuts. Turn them off where the page has its own.

Start collapsed, for drawing that's available rather than expected.

Keep the canvas live while the bar is a disc, rather than treating minimized as put away.

#### Ref handle

Exactly what is on screen, erasing and all.

scale multiplies the resolution: 2 or 3 for print.

Replaces the drawing. Undo history goes with it.

The surface size the drawing is being made at.

Every pen has a keyboard shortcut, shown in its tooltip. `E` for the eraser, `[` and `]` for size, `⌘Z` and `⇧⌘Z` for undo and redo. Hold `Shift` while drawing and the stroke locks to the nearest of eight directions.

## Potentially awesome

It's called Drawesome, which is a lot to live up to.

I'll let you draw your own conclusions.

See what I did there

## Footnotes

1.  Inspired by Apple's markup tools, and how far they take the skeuomorphism. Pens in a tray beat a row of icons. [↩](#user-content-fnref-1)
    
2.  If you want to assemble a drawing tool from parts instead, [tldraw](https://tldraw.dev/) or [Excalidraw](https://excalidraw.com/) will suit you better. [↩](#user-content-fnref-2)