---
title: "Smashing Animations Part 8: Theming Animations Using CSS Relative Colour"
source: "https://smashingmagazine.com/2026/01/smashing-animations-part-8-css-relative-colour/"
publishedDate: "2026-01-14"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Andy Clarke)"
---

-   13 min read
-   [Animation](https://smashingmagazine.com/category/animation), [CSS](https://smashingmagazine.com/category/css), [Design](https://smashingmagazine.com/category/design)

CSS relative colour values are now widely supported. In this article, pioneering author and web designer [Andy Clarke](https://stuffandnonsense.co.uk/) shares practical techniques for using them to theme and animate SVG graphics.

I’ve recently refreshed the animated graphics on [my website](https://stuffandnonsense.co.uk/) with a new theme and a group of pioneering characters, putting into practice plenty of the techniques I shared in [this series](https://www.smashingmagazine.com/author/andy-clarke/). A few of my animations change appearance when someone interacts with them or at different times of day.

[![Graphics from Andy’s website](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/1-andy-website-animated-graphics.png)](https://stuffandnonsense.co.uk/blog)

View this animated SVG on [my website](https://stuffandnonsense.co.uk/blog). ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/1-andy-website-animated-graphics.png))

The colours in the graphic atop [my blog pages](https://stuffandnonsense.co.uk/blog) change from morning until night every day. Then, there’s the [snow mode](https://stuffandnonsense.co.uk/blog/let-it-snow), which adds chilly colours and a wintery theme, courtesy of an overlay layer and a blending mode.

[![Snow mode applied to the town background](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/2-snow-mode.png)](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/2-snow-mode.png)

Snow mode allows my pioneer town background to adapt throughout the day. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/2-snow-mode.png))

While working on this, I started to wonder whether CSS relative colour values could give me more control while also simplifying the process.

**Note**: _In this tutorial, I’ll focus on relative colour values and the OKLCH colour space for theming graphics and animations. If you want to dive deep into relative colour, Ahmad Shadeed created a superb [interactive guide](https://ishadeed.com/article/css-relative-colors/). As for colour spaces, gamuts, and OKLCH, our own Geoff Graham [wrote](https://www.smashingmagazine.com/2023/08/oklch-color-spaces-gamuts-css/) about them._

-   [**Smashing Animations Part 1**: How Classic Cartoons Inspire Modern CSS](https://www.smashingmagazine.com/2025/05/smashing-animations-part-1-classic-cartoons-inspire-css/)
-   [**Smashing Animations Part 2**: How CSS Masking Can Add An Extra Dimension](https://www.smashingmagazine.com/2025/05/smashing-animations-part-2-css-masking-add-extra-dimension/)
-   [**Smashing Animations Part 3**: SMIL’s Not Dead Baby, SMIL’s Not Dead](https://www.smashingmagazine.com/2025/05/smashing-animations-part-3-smil-not-dead/)
-   [**Smashing Animations Part 4**: Optimising SVGs](https://www.smashingmagazine.com/2025/06/smashing-animations-part-4-optimising-svgs/)
-   [**Smashing Animations Part 5**: Building Adaptive SVGs With `<symbol>`, `<use>`, And CSS Media Queries](https://www.smashingmagazine.com/2025/10/smashing-animations-part-5-building-adaptive-svgs/)
-   [**Smashing Animations Part 6**: Magnificent SVGs With `<use>` And CSS Custom Properties](https://www.smashingmagazine.com/2025/11/smashing-animations-part-6-svgs-css-custom-properties/)
-   [**Smashing Animations Part 7**: Recreating Toon Text With CSS And SVG](https://www.smashingmagazine.com/2025/12/smashing-animations-part-7-recreating-toon-text-css-svg/)

## How Cartoon Animation Taught Me To Reuse Everything

The [Hanna-Barbera](https://en.wikipedia.org/wiki/Hanna-Barbera) animated series I grew up watching had budgets far lower than those available when William Hanna and Joseph Barbera produced _Tom and Jerry_ shorts at MGM Cartoons. This meant the animators needed to develop techniques to work around their cost restrictions.

[![Repeated use of elements in the Yogi Bear Show](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/3-yogi-bear-show.png)](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/3-yogi-bear-show.png)

The Yogi Bear Show, copyright Warner Bros. Entertainment Inc. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/3-yogi-bear-show.png))

Repeated use of elements was key. Backgrounds were reused whenever possible, with zooms and overlays helping construct new scenes from the same artwork. It was born of necessity, but it also encouraged thinking in terms of series rather than individual scenes.

## The problem With Manually Updating Colour Palettes

Let’s get straight to my challenge. In Toon Titles like this one — based on the 1959 Yogi Bear Show episode “Lullabye-Bye Bear” — and my work generally, palettes are limited to a select few colours.

[![Illustration of Yogi Bear asleep in a hammock tied between two thin, white trees. Andy Clarke’s Toon Titles is displayed above Yogi in cartoon-style typography.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/4-yogi-bear.png)](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/4-yogi-bear.png)

View this on my [Toon Titles website](https://stuffandnonsense.co.uk/toon-titles/24b.html). ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/4-yogi-bear.png))

I create shades and tints from what I call my “foundation” colour to expand the palette without adding more hues.

[![Colour palette of a foundation colour](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/5-colour-palette.png)](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/5-colour-palette.png)

Colour palette with shades and tints of a foundation colour. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/5-colour-palette.png))

In [Sketch](https://www.sketch.com/), I work in the [HSL colour space](https://www.smashingmagazine.com/2021/07/hsl-colors-css/), so this process involves increasing or decreasing the lightness value of my foundation colour. Honestly, it’s not an arduous task — but choosing a different foundation colour requires creating a whole new set of shades and tints. Doing that manually, again and again, quickly becomes laborious.

[![Shades and tints of a different foundation colour.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/6-foundation-colour.png)](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/6-foundation-colour.png)

Shades and tints of a different foundation colour. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/6-foundation-colour.png))

I mentioned the HSL — **H** (hue), S (saturation), and **L** (lightness) — colour space, but that’s just one of several ways to describe colour.

RGB — **R** (red), **G** (green), **B** (blue) — is probably the most familiar, at least in its Hex form.

There’s also LAB — **L** (lightness), **A** (green–red), **B** (blue–yellow) — and the newer, but now widely supported LCH — **L** (lightness), **C** (chroma), **H** (hue) — model in its OKLCH form. With LCH — specifically OKLCH in CSS — I can adjust the lightness value of my foundation colour.

[![Lightness changes to the foundation colour.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/7-lightness-change-foundation-colour.png)](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/7-lightness-change-foundation-colour.png)

Lightness changes to my foundation colour. Chroma and Hue remain the same. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/7-lightness-change-foundation-colour.png))

Or I can alter its _chroma_. LCH chroma and HSL saturation both describe the intensity or richness of a colour, but they do so in different ways. LCH gives me a wider range and more predictable blending between colours.

[![Chroma changes to the foundation colour](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/8-chroma-changes-foundation-colour.png)](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/8-chroma-changes-foundation-colour.png)

Chroma changes to my foundation colour. Lightness and Hue remain the same. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/8-chroma-changes-foundation-colour.png))

I can also alter the hue to create a palette of colours that share the same lightness and chroma values. In both HSL and LCH, the hue spectrum starts at red, moves through green and blue, and returns to red.

[![Hue changes to the foundation colour.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/9-hue-changes-foundation-colour.png)](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/9-hue-changes-foundation-colour.png)

Hue changes to my foundation colour. Lightness and Chrome remain the same. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/9-hue-changes-foundation-colour.png))

## Why OKLCH Changed How I Think About Colour

Browser support for the OKLCH colour space [is now widespread](https://caniuse.com/wf-oklab), even if design tools — including Sketch — haven’t caught up. Fortunately, that shouldn’t stop you from using OKLCH. Browsers will happily convert Hex, HSL, LAB, and RGB values into OKLCH for you. You can define a CSS custom property with a foundation colour in any space, including Hex:

```
/* Foundation colour */
--foundation: #5accd6;
```

Any colours derived from it will be converted into OKLCH automatically:

```
--foundation-light: oklch(from var(--foundation) [...]; }
--foundation-mid: oklch(from var(--foundation) [...]; }
--foundation-dark: oklch(from var(--foundation) [...]; }
```

## Relative Colour As A Design System

Think of relative colour as saying: _“Take this colour, tweak it, then give me the result.”_ There are two ways to adjust a colour: absolute changes and proportional changes. They look similar in code, but behave very differently once you start swapping foundation colours. Understanding that difference is what can turn using relative colour into a system.

```
/* Foundation colour */
--foundation: #5accd6;
```

For example, the lightness value of my foundation colour is `0.7837`, while a darker version has a value of `0.5837`. To calculate the difference, I subtract the lower value from the higher one and apply the result using a `calc()` function:

```
--foundation-dark: 
  oklch(from var(--foundation)
  calc(l - 0.20) c h);
```

To achieve a lighter colour, I add the difference instead:

```
--foundation-light:
  oklch(from var(--foundation)
  calc(l + 0.10) c h);
```

[![Calculations of the difference between the foundation colour and Lightness, Chroma, and Hue-adjusted colours.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/10-calculating-colour-difference.png)](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/10-calculating-colour-difference.png)

Calculating the difference between my foundation colour and Lightness, Chroma, and Hue-adjusted colours. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/10-calculating-colour-difference.png))

Chroma adjustments follow the same process. To reduce the intensity of my foundation colour from `0.1035` to `0.0035`, I subtract one value from the other:

```
oklch(from var(--foundation)
l calc(c - 0.10) h);
```

To create a palette of hues, I calculate the difference between the hue value of my foundation colour (`200`) and my new hue (`260`):

```
oklch(from var(--foundation)
l c calc(h + 60));
```

Those calculations are absolute. When I subtract a fixed amount, I’m effectively saying, _“Always subtract this much.”_ The same applies when adding fixed values:

```
calc(c - 0.10)
calc(c + 0.10)
```

I learned the limits of this approach the hard way. When I relied on subtracting fixed chroma values, colours collapsed towards grey as soon as I changed the foundation. A palette that worked for one colour fell apart for another.

Multiplication behaves differently. When I multiply chroma, I’m telling the browser: _“Reduce this colour’s intensity by a proportion.”_ The relationship between colours remains intact, even when the foundation changes:

```
calc(c * 0.10)
```

## My Move It, Scale It, Rotate It Rules

-   **Move** lightness (add or subtract),
-   **Scale** chroma (multiply),
-   **Rotate** hue (add or subtract degrees).

I scale chroma because I want intensity changes to stay proportional to the base colour. Hue relationships are rotational, so multiplying hue makes no sense. Lightness is perceptual and absolute — multiplying it often produces odd results.

[![Lightness: Move it. Chroma: Scale it. Hue: Rotate it](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/11-move-scale-rotate.png)](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/11-move-scale-rotate.png)

Lightness: Move it. Chroma: Scale it. Hue: Rotate it. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/11-move-scale-rotate.png))

## From One Colour To An Entire Theme

Relative colour allows me to define a foundation colour and generate every other colour I need — fills, strokes, gradient stops, shadows — from it. At that point, colour stops being a palette and starts being a system.

> SVG illustrations tend to reuse the same few colours across fills, strokes, and gradients. Relative colour lets you define those relationships once and reuse them everywhere — much like animators reused backgrounds to create new scenes.

Change the foundation colour once, and every derived colour updates automatically, without recalculating anything by hand. Outside of animated graphics, I could use this same approach to define colours for the states of interactive elements such as buttons and links.

The foundation colour I used in my “Lullabye-Bye Bear” Toon Title is a cyan-looking blue. The background is a radial gradient between my foundation and a darker version.

[![“Lullabye-Bye Bear” Toon Title](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/12-toon-titles-website.png)](https://stuffandnonsense.co.uk/toon-titles/24b.html)

View this on my [Toon Titles website](https://stuffandnonsense.co.uk/toon-titles/24b.html). ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/12-toon-titles-website.png))

To create alternative versions with entirely different moods, I only need to change the foundation colour:

```
--foundation: #5accd6;
--grad-end: var(--foundation);
--grad-start: oklch(from var(--foundation)
  calc(l - 0.2357) calc(c * 0.833) h);
```

[![Three alternative versions of the “Lullabye-Bye Bear” Toon Title](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/13-toon-titles-website.png)](https://stuffandnonsense.co.uk/toon-titles/24b.html)

Use the colour picker on my [Toon Titles website](https://stuffandnonsense.co.uk/toon-titles/24b.html) to see this in action. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/13-toon-titles-website.png))

To bind those custom properties to my SVG gradient without duplicating colour values, I replaced hard-coded `stop-color` values with inline styles:

```
<defs>
  <radialGradient id="bg-grad" […]>
    <stop offset="0%" style="stop-color: var(--grad-end);" />
    <stop offset="100%" style="stop-color: var(--grad-start);" />
  </radialGradient>
</defs>
```

```
<path fill="url(#bg-grad)" fill="#5DCDD8" d="[...]"/>
```

Next, I needed to ensure that my [Toon Text](https://stuffandnonsense.co.uk/toon-text/index.html) always contrasts with whatever foundation colour I choose. A `180deg` hue rotation produces a complementary colour that certainly pops — but can vibrate uncomfortably:

```
.text-light {
  fill: oklch(from var(--foundation)
    l c calc(h + 180));
}
```

A `90°` shift produces a vivid secondary colour without being fully complementary:

```
.text-light {
  fill: oklch(from var(--foundation)
    l c calc(h - 90));
}
```

My recreation of Quick Draw McGraw’s 1959 Toon Title “El Kabong“ uses the same techniques but with a more varied palette. For example, there’s another radial gradient between the foundation colour and a darker shade.

[![An animated still of Quick Draw McGraw swinging from a rope going from left to right against a purple gradient background. Andy Clarke’s Toon Titles is displayed above him in cartoon-style typography. A silhouetted building and palm tree are positioned in the bottom-right corner.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/14-quick-draw-mcgraw.png)](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/14-quick-draw-mcgraw.png)

View this on my [Toon Titles website](https://stuffandnonsense.co.uk/toon-titles/quick-draw-4b.html). ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/14-quick-draw-mcgraw.png))

[![Three alternative versions of Quick Draw McGraw’s 1959 Toon Title “El Kabong“](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/15-quick-draw-mcgraw-toon-titles.png)](https://stuffandnonsense.co.uk/toon-titles/quick-draw-4b.html)

Use the colour picker on my [Toon Titles website](https://stuffandnonsense.co.uk/toon-titles/quick-draw-4b.html) to see this in action. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/15-quick-draw-mcgraw-toon-titles.png))

The building and tree in the background are simply different shades of the same foundation colour. For those paths, I needed two additional `fill` colours:

```
.bg-mid {
  fill: oklch(from var(--foundation)
    calc(l - 0.04) calc(c * 0.91) h);
}

.bg-dark {
  fill: oklch(from var(--foundation)
    calc(l - 0.12) calc(c * 0.64) h);
}
```

## When The Foundations Start To Move

So far, everything I’ve shown has been static. Even when someone uses a colour picker to change the foundation colour, that change happens instantly. But animated graphics rarely stand still — the clue is in the name. So, if colour is part of the system, there’s no reason it can’t animate, too.

To animate the foundation colour, I first need to split it into its OKLCH channels — lightness, chroma, and hue. But there’s an important extra step: I need to register those values as _typed_ custom properties. But what does that mean?

By default, a browser doesn’t know whether a CSS custom property value represents a colour, length, number, or something else entirely. That often means [they can’t be interpolated smoothly during animation](https://css-tricks.com/what-you-need-to-know-about-css-color-interpolation/), and jump from one value to the next.

Registering a custom property tells the browser the type of value it represents and how it should behave over time. In this case, I want the browser to treat my colour channels as numbers so they can be animated smoothly.

```
@property --f-l {
  syntax: "<number>";
  inherits: true;
  initial-value: 0.40;
}

@property --f-c {
  syntax: "<number>";
  inherits: true;
  initial-value: 0.11;
}

@property --f-h {
  syntax: "<number>";
  inherits: true;
  initial-value: 305;
}
```

Once registered, these custom properties behave like native CSS. The browser can interpolate them frame-by-frame. I then rebuild the foundation colour from those channels:

```
--foundation: oklch(var(--f-l) var(--f-c) var(--f-h));
```

This makes the foundation colour become animatable, just like any other numeric value. Here’s a simple “breathing” animation that gently shifts lightness over time:

```
@keyframes breathe {
  0%, 100% { --f-l: 0.36; }
  50% { --f-l: 0.46; }
}

.toon-title {
  animation: breathe 10s ease-in-out infinite;
}
```

Because every other colour in fills, gradients, and strokes is derived from `--foundation`, they all animate together, and nothing needs to be updated manually.

## One Animated Colour, Many Effects

At the start of this process, I wondered whether CSS relative colour values could offer more possibilities while also making them simpler to implement. I recently added a new gold mine background to my website’s [contact page](https://stuffandnonsense.co.uk/contact), and the first iteration included oil lamps that glow and swing.

[![A group of seven illustrated western characters in an underground gold mine scene.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/16-gold-mine-scene.png)](https://stuffandnonsense.co.uk/contact)

View this animated SVG on [my website](https://stuffandnonsense.co.uk/contact). ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/16-gold-mine-scene.png))

I wanted to explore how animating CSS relative colours could make the mine interior more realistic by tinting it with colours from the lamps. I wanted them to affect the world around them, the way real light does. So, rather than animating multiple colours, I built a tiny lighting system that animates just one colour.

[![Overlay layer applied to the SVG](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/17-overlay-layer-svg.png)](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/17-overlay-layer-svg.png)

Adding an overlay layer to my SVG. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/17-overlay-layer-svg.png))

My first task was to slot an overlay layer between the background and my lamps:

```
<path 
  id="overlay"
  fill="var(--overlay-tint)" 
  [...] 
  style="mix-blend-mode: color"
/>
```

I used `mix-blend-mode: color` because that tints what’s beneath it while preserving the underlying luminance. As I only want the overlay to be visible when animations are turned on, I made the overlay opt-in:

```
.svg-mine #overlay {
  display: none;
}
  
@media (prefers-reduced-motion: no-preference) {
  .svg-mine[data-animations=on] #overlay {
    display: block;
    opacity: 0.5;
  }
}
```

[![An overlay applied to the gold mine scene illuminates the background, making it brighter than the foreground.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/18-overlay-gold-mine-scene.png)](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/18-overlay-gold-mine-scene.png)

The overlay layer tints what’s beneath it. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/18-overlay-gold-mine-scene.png))

The overlay was in place, but not yet connected to the lamps. I needed a light source. My lamps are simple, and each one contains a `circle` element that I blurred with a filter. The `filter` produces a very soft blur over the entire circle.

```
<filter id="lamp-glow-1" x="-120%" y="-120%" width="340%" height="340%">
  <feGaussianBlur in="SourceGraphic" stdDeviation="56"/>
</filter>
```

[![Added oil lamps to the gold mine scene](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/19-oil-lamps.png)](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/19-oil-lamps.png)

Adding oil lamps to my scene. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/19-oil-lamps.png))

Instead of animating the overlay and lamps separately, I animate a single “flame” colour token and derive everything else from that. First, I register three typed custom properties for OKLCH channels:

```
@property --fl-l {
  syntax: "<number>"; 
  inherits: true;
  initial-value: 0.86;
}
@property --fl-c {
  syntax: "<number>";
  inherits: true;
  initial-value: 0.12;
}
@property --fl-h {
  syntax: "<number>";
  inherits: true;
  initial-value: 95;
}
```

I animated those channels, deliberately pushing a few frames towards orange so the flicker reads clearly as firelight:

```
@keyframes flame {
  0%, 100% { --fl-l: 0.86; --fl-c: 0.12; --fl-h: 95; }
  6% { --fl-l: 0.91; --fl-c: 0.10; --fl-h: 92; }
  12% { --fl-l: 0.83; --fl-c: 0.14; --fl-h: 100; }
  18% { --fl-l: 0.88; --fl-c: 0.11; --fl-h: 94; }
  24% { --fl-l: 0.82; --fl-c: 0.16; --fl-h: 82; }
  30% { --fl-l: 0.90; --fl-c: 0.12; --fl-h: 90; }
  36% { --fl-l: 0.79; --fl-c: 0.17; --fl-h: 76; }
  44% { --fl-l: 0.87; --fl-c: 0.12; --fl-h: 96; }
  52% { --fl-l: 0.81; --fl-c: 0.15; --fl-h: 102; }
  60% { --fl-l: 0.89; --fl-c: 0.11; --fl-h: 93; }
  68% { --fl-l: 0.83; --fl-c: 0.16; --fl-h: 85; }
  76% { --fl-l: 0.91; --fl-c: 0.10; --fl-h: 91; }
  84% { --fl-l: 0.85; --fl-c: 0.14; --fl-h: 98; }
  92% { --fl-l: 0.80; --fl-c: 0.17; --fl-h: 74; }
}
```

Then I scoped that animation to the SVG, so the shared variables are available to both the lamps and my overlay:

```
@media (prefers-reduced-motion: no-preference) {
  .svg-mine[data-animations=on] {
    animation: flame 3.6s infinite linear;
    isolation: isolate;

    /* Build a flame colour from animated channels */
    --flame: oklch(var(--fl-l) var(--fl-c) var(--fl-h));

    /* Lamp colour derived from flame */
    --lamp-core: oklch(from var(--flame) calc(l + 0.05) calc(c * 0.70) h);
  
    /* Overlay tint derived from the same flame */
    --overlay-tint: oklch(from var(--flame)
      calc(l + 0.06) calc(c * 0.65) calc(h - 10));
  }
}
```

Finally, I applied those derived colours to the glowing lamps and the overlay they affect:

```
@media (prefers-reduced-motion: no-preference) {
  .svg-mine[data-animations=on] #mine-lamp-1 > circle,
  .svg-mine[data-animations=on] #mine-lamp-2 > circle {
    fill: var(--lamp-core);
  }
  
  .svg-mine[data-animations=on] #overlay {
    display: block;
    fill: var(--overlay-tint);
    opacity: 0.5;
  }
}
```

[![The lamps and overlay are connected.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/20-lamps-overlay-connected.png)](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/20-lamps-overlay-connected.png)

The lamps and overlay are connected. ([Large preview](https://files.smashing.media/articles/smashing-animations-part-8-css-relative-colour/20-lamps-overlay-connected.png))

When the flame shifts toward orange, the lamps warm up, and the scene warms with them. When the flame cools, everything settles together. The best part is that nothing is written manually. If I change the foundation colour or tweak the flame animation ranges, the entire lighting system updates simultaneously.

You can see [the final result on my website](https://stuffandnonsense.co.uk/contact).

## Reuse, Repurpose, Revisited

Those Hanna-Barbera animators were forced to repurpose elements out of necessity, but I reuse colours because it makes my work **more consistent** and **easier to maintain**. CSS relative colour values allow me to:

-   Define a single foundation colour,
-   Describe how other colours relate to it,
-   Reuse those relationships everywhere, and
-   Animate the system by changing one value.

> [Relative colour doesn’t just make theming easier. It encourages a way of thinking where colour, like motion, is intentional — and where changing one value can transform an entire scene without rewriting the work beneath it.](https://twitter.com/share?text=%0aRelative%20colour%20doesn%e2%80%99t%20just%20make%20theming%20easier.%20It%20encourages%20a%20way%20of%20thinking%20where%20colour,%20like%20motion,%20is%20intentional%20%e2%80%94%20and%20where%20changing%20one%20value%20can%20transform%20an%20entire%20scene%20without%20rewriting%20the%20work%20beneath%20it.%0a&url=https://smashingmagazine.com%2f2026%2f01%2fsmashing-animations-part-8-css-relative-colour%2f)
> 
> “

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (gg, yk)