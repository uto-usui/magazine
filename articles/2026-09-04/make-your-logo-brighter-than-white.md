---
title: "Make your logo brighter than white"
source: "https://www.soverybright.com/"
publishedDate: "2026-09-03"
category: "design"
feedName: "Sidebar"
---

Upload a logo, choose which colors should glow, download an HDR JPEG. On HDR screens the chosen parts shine up to 7.5× brighter than `#FFFFFF`. Everywhere else it's a perfectly normal JPEG.

Drop your logo here, or click to choose

PNG, JPEG or WebP · free · nothing is stored

-   ISO 21496-1 gain-map JPEG
-   BT.2100 PQ for LinkedIn
-   base pixels untouched
-   nothing stored
-   free

Two identical `#FFFFFF` squares.One carries a gain map.

SDR white  
as bright as a screen normally goes

![The same white with a gain map: up to 7.5× brighter on an HDR display](https://www.soverybright.com/hero/white-7.5x.jpg)

HDR white · +2.9 stops  
up to 7.5× brighter

Checking your display and browser…

## Examples

Original artwork, converted with this tool. Drag the handle; on an HDR display in a capable browser the right side glows. “Use this” loads the original into the tool above.

### The wordmark

White type on black — the classic case. The whites are selected automatically.

glows: whites

### Orbit mark

A white ring plus one brand color. Whites and the blue are both pushed to the same peak.

glows: whites + #2f6bff

### Sticker badge

Cream type on dark teal — not white, so it's picked as a color. Light elements on dark backgrounds glow best.

glows: #f5e9c8

## How it works

Your JPEG stays a normal JPEG. For the web we add an ISO 21496-1 gain map — a second, tiny grayscale image that tells HDR-aware software how much brighter each pixel may go. For LinkedIn we write the pixels in BT.2100 PQ with the matching ICC profile, which LinkedIn preserves.

## What glows best

Light, near-white elements on dark backgrounds. Strong (+2.9 stops, ~1,500 nits) is the measured real-world sweet spot. Dark colors can't really glow — boosting them reads as washed neon.

## Honest limits

HDR only shows on HDR displays in software that honors gain maps or PQ profiles (Chrome, Safari 26, Apple Photos, LinkedIn's apps). Most other platforms strip or normalize it — the file still looks perfectly normal there.

Also works on text

## Text can be brighter than white, too.

CSS has no way to write a color brighter than `#FFFFFF` yet — the HDR color spaces in CSS Color HDR are still a draft. But you can paint real text _through_ an HDR image: `background-clip: text` turns the glyphs into a window onto a gain-map JPEG. The headline at the top of this page is exactly that — select it, it's text.

Brighter than white

SDR text  
`color: #fff`

Brighter than white

HDR text  
`background-clip: text` over the swatch

Checking your display and browser…

-   **Where it works:** wherever gain-map JPEGs render — Chrome 137+, Safari 26 / iOS 26 — on an HDR display. Elsewhere the swatch's base image shows through, so the text is simply white. Nothing breaks.
-   **The swatch** is a 64×64 white JPEG carrying a uniform gain map (7.5×, +2.9 stops, ~1,500 nits); the browser scales it under the glyphs. Any boost works: upload a white square to the tool above and pick an intensity.
-   **Gate it on the display:** inside `@media (dynamic-range: high)` only HDR screens take the image route; SDR visitors, Firefox and print keep a real `color`. That also sidesteps the one gotcha — `background-clip` only paints ink inside the element's box, so an overflowing line would get clipped.
-   **Headlines and accents only.** A paragraph at 1,500 nits is hostile. Give `::selection` a color if yours is not already visible.
-   **Why not** `filter: brightness()`? The page is composited in SDR; no filter or blend mode pushes a CSS color past white. Only HDR _content_ gets the headroom — which is what the swatch is.