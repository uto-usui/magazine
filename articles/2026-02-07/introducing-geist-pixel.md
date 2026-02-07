---
title: "Introducing Geist Pixel"
source: "https://vercel.com/blog/introducing-geist-pixel"
publishedDate: "2026-02-06"
category: "frontend"
feedName: "Vercel"
author: "Evil Rabbit"
---

4 min read

Feb 6, 2026

Today, we're expanding the Geist font family with [Geist Pixel](https://vercel.com/font).

Geist Pixel is a bitmap-inspired typeface built on the same foundations as Geist Sans and Geist Mono, reinterpreted through a strict pixel grid. It's precise, intentional, and unapologetically digital.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2tykSyMWZYrkUwDRME7W7Y%2F627070fa945809e11762fb6adb742c1f%2Fposters_light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2cXFoyCAt4rT1VkuNixq6Y%2F0ad091307b467cd16fd2d5946c39f051%2Fposters_dark.png&w=1920&q=75)

### [Link to heading](#same-system,-new-texture)Same system, new texture

Geist Pixel isn't a novelty font. It's a system extension.

Just like Geist Mono was created for developers, Geist Pixel was designed with real usage in mind, not as a visual gimmick, but as a functional tool within a broader typographic system.

It includes five distinct variants, each exported separately:

-   Geist Pixel Square
    
-   Geist Pixel Grid
    
-   Geist Pixel Circle
    
-   Geist Pixel Triangle
    
-   Geist Pixel Line
    

Every glyph is constructed on a consistent pixel grid, carefully tuned to preserve rhythm, spacing, and legibility. The result feels both nostalgic and contemporary, rooted in early screen typography, but designed for modern products that ship to real users.

This matters because pixel fonts often break in production. They don't scale properly across viewports, their metrics conflict with existing typography, or they're purely decorative. Geist Pixel was built to solve these problems, maintaining the visual texture teams want while preserving the typographic rigor products require.

It shares the same core principles as the rest of the Geist family:

-   Clear structure
    
-   Predictable metrics
    
-   Strong alignment across layouts
    
-   Designed to scale across platforms and use cases
    

### [Link to heading](#getting-started-is-easy)**Getting started is easy**

[Get started with Geist Pixel](https://vercel.com/font) and start building. Install it directly:

```
npm i geist
```

**Exports and CSS variables:**

-   `GeistPixelSquare`: --font-geist-pixel-square
    
-   `GeistPixelGrid`: --font-geist-pixel-grid
    
-   `GeistPixelCircle`: --font-geist-pixel-circle
    
-   `GeistPixelTriangle`: --font-geist-pixel-triangle
    
-   `GeistPixelLine`: --font-geist-pixel-line
    

And use it in `layout.tsx,` e.g. for `GeistPixelSquare`:

app/layout.tsx

```
import { GeistPixelSquare } from "geist/font/pixel";export default function RootLayout({ children }) { return (       <html lang="en" className={GeistPixelSquare.variable}>     <body>{children}</body>    </html>   );}
```

Learn more in the [README](https://www.npmjs.com/package/geist?activeTab=readme).

### [Link to heading](#designed-for-the-web-and-for-modern-products)Designed for the web and for modern products

While many pixel fonts are purely expressive, Geist Pixel is meant to ship. It works in real UI contexts: banners, dashboards, experimental layouts, product moments, and systems where typography becomes part of the interface language.

Special care was put into:

-   Vertical metrics aligned with Geist and Geist Mono
    
-   Consistent cap height and x-height behavior
    
-   Multiple variants for different densities and use cases
    
-   Seamless mixing with the rest of the Geist family
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1v8KDpbtOSwoygQUUmbRBJ%2F4afb35b6f8cc4cecb3cef525eba16254%2Flight__2_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F55gFkNDV5ceKSvD4cKL1w8%2Fc2868b9c1a2061a8df7810d00e182e8f%2Fdark__2_.png&w=1920&q=75)

It's designed for the web, for modern products, and for an era where interfaces are increasingly shaped by AI-driven workflows.

### [Link to heading](#crafted-on-a-grid,-refined-by-hand)Crafted on a grid, refined by hand

Although Geist Pixel is grid-based, it wasn't generated mechanically.

Each glyph was manually refined to avoid visual noise, uneven weight distribution, and awkward diagonals. Corners, curves, and transitions were adjusted pixel by pixel to maintain clarity at small sizes and personality at larger scales. Horizontal metrics use a semi-mono approach, and letterforms take inspiration from both its Mono and Sans counterparts. Constraints weren't a limitation, they were the design tool.

Geist Pixel ships with:

-   5 variants
    
-   480 glyphs
    
-   7 stylistic sets
    
-   32 supported languages
    

Built with the same system mindset as Geist and Geist Mono, it's easy to adopt without breaking layout or rhythm.

### [Link to heading](#already-shaping-what's-next)Already shaping what's next

Even before its public release, Geist Pixel has already started influencing the visual language of Vercel. Since being shared internally a few weeks ago, it's found its way into explorations, experiments, and early redesign work, shaping tone, texture, and expression across the product. In many ways, it's already part of the system.

### [Link to heading](#one-family,-expanding)One family, expanding

With Geist, Geist Mono, and now Geist Pixel, the family spans a broader range, from highly functional UI text to expressive, system-driven display moments.

And we're not stopping here. Geist Serif is already in progress. Same system thinking. A new voice.

[Download Geist Pixel](https://vercel.com/font) and start building.

None of this would have been possible without an incredible group of people behind the scenes. Huge thanks to [Andrés Briganti](https://x.com/ambriganti) for the obsessive level of craft and care poured into the design of the font itself, and to [Guido Ferreyra](https://x.com/guidoferreyra) for his support refining and tuning the font along the way; to [Luis Gutierrez Rico](https://x.com/luisgurico) for bringing Geist Pixel to life through motion and subtle magic; to [Christopher Kindl](https://x.com/kindlaar) for helping us put together the landing page and obsessing over those small details that make everything feel just right; to [Marijana Pavlinić](https://x.com/marijanapav) for constantly pushing us with bold, unexpected, and wildly creative ideas; and to [Zahra Jabini](https://x.com/ZeeJab) for the coordination, technical support, and for making sure all the pieces actually came together. This was a true team effort, and I'm incredibly grateful to have built this with all of you.