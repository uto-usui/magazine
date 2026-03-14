---
title: "contrast-color() beyond black & white"
source: "https://una.im/advanced-contrast-color/"
publishedDate: "2026-03-13"
category: "css"
feedName: "Una Kravets"
---

![](https://una.im/posts/contrast-color-beyond/thumb.png)

Published on March 13, 2026

Yesterday I wrote about [`contrast-color()`](https://una.im/contrast-color), a new feature landing in Chrome 147 (already in Firefox and Safari). This feature takes any color and returns either `black` or `white`, whichever provides the highest contrast against the input color. Originally the feature was specced to test against a list of color options, but this didn’t make the final cut for the v1 spec. However, there are ways you can work around this limitation, and I’ll cover two of them in this blog post.

## Method 1: Tint with `color-mix()` [#](#method-1-tint-with-color-mix)

The simplest approach is to mix your desired color _with_ the `contrast-color()` result. Since `contrast-color()` gives you either `black` or `white`, you can use that as the mixing target, blending in your brand color to create a tinted variant:

> See [Codepen demo](https://codepen.io/una/pen/NPRdaZd)

```
.card {
  --bg: var(--brand-color, #6c1afb);
  background: var(--bg);

  /* Mix 10% of the brand hue into the black/white result */
  color: color-mix(in oklch, var(--bg) 10%, contrast-color(var(--bg)));
}
```

The higher the mix percentage, the more of your brand color you’ll get, and the less “safe” the result will be. So with this technique, you’ll definitely want to test your results for color contrast. Somewhere between **10–25%** for light colors, and **30-40%** for dark colors usually keeps things accessible while adding some color, but you should validate specific combinations with either the [WCAG contrast checker](https://webaim.org/resources/contrastchecker/) or [APCA contrast checker](https://apcacontrast.com/). This is true for the next technique as well!

Try it below and compare with plain `contrast-color()`. I’m using style queries here to mix the light colors at **25%** and the dark colors at **40%**, which is why browser support for this demo is more limited.

Works in Chrome 147+, Safari 26+ (not in Firefox because of the style queries).

#6c1afb

contrast-color() only

Newsletter

Stay in the loop

Weekly updates on what's new in CSS and the web platform.

color-mix() tint

Newsletter

Stay in the loop

Weekly updates on what's new in CSS and the web platform.

## Method 2: Custom color palettes w/style queries [#](#method-2-custom-color-palettes-wstyle-queries)

`color-mix()` tinting is a good start to keep it simple, but you can do even more with style queries and custom properties. In this case, we’re also going to use the [`if()` function](https://developer.mozilla.org/en-US/docs/Web/CSS/if) to make our style queries even more readable. Keep in mind, `if()` is only available in Chrome 137+ at this time, but you can use the `@container style()` query block form to make this work as well (see end of section for code block). Also note that while style queries aren’t in Firefox yet, they are an [Interop 2026](https://web.dev/blog/interop-2026) feature so we expect they will land soon!

> See [Codepen demo](https://codepen.io/una/pen/xbEgPwB)

First, you need to register a custom property that you’ll later update with the `contrast-color()` value. Registering it is important, as otherwise the browser won’t understand how to parse `contrast-color()` properly when you use it in the style query. You register your custom property like so:

```
@property --contrast-color {
  syntax: "<color>";
  initial-value: white;
  inherits: true;
}
```

Once you have a registered custom property, you will update the custom property with the the variable value you are using as the background you want to test against:

```
.card {
  --bg: var(--brand-color, #6c1afb);
  --contrast-color: contrast-color(var(--bg)); /* resolves to black or white */
  background: var(--bg);
}
```

Next, you’ll use your `--contrast-color` variable in the `if()` statement with a style query. This is where you’ll select your color values. The statements here say _“if the foreground color is selected to be white in the `contrast-color()` function, use this alternative color A instead. If it’s black, use color B”._

```
.card-title {
  color: if(
    style(--contrast-color: white): antiquewhite;  /* warm off-white */
    else: midnightblue   /* deep blue */
  );
}

.card-label {
  color: if(
    style(--contrast-color: white): lemonchiffon;  /* light yellow */
    else: indigo   /* indigo purple */
  );
}
```

`--contrast-color` cascades down from the parent, so any descendant can `if(style(--contrast-color: white))` to pick its own custom dark/light variant. You choose the exact colors, so similar to the tinting method, you’ll still need to test the color accessibility yourself here. The only role `contrast-color()` plays here is as a light-vs-dark detector based on WCAG 2.1.

As mentioned above, you can also use `@container style()` if you prefer the block form for wider browser support:

```
.card {
  --contrast-color: contrast-color(var(--bg));
}

.card-title {
  color: midnightblue;
}

@container themed-card style(--contrast-color: white) {
  .card-title { 
    color: antiquewhite;
  }
}
```

Try it here — notice that as you change backgrounds, the text shifts between blue-tinted dark tones and warmer light tones, rather than snapping to pure black or white:

Works in Chrome 147+ and Safari 26+.

#6c1afb

contrast-color() only

Design systems

Dynamic color tokens

March 13, 2026

CSS

Custom palette via style query

Design systems

Dynamic color tokens

March 13, 2026

CSS

The upside here is that you have full control over the color palette, but that’s also the downside. It’s extra important to test your color combinations before using this technique in production.

## Conclusion [#](#conclusion)

Both of these approaches treat `contrast-color()` as a detector: it figures out whether you’re on a light or dark surface, and your code decides what to do with that information. So it’s up to you to do the rest! Whether that’s tinting or picking an entirely different palette, `contrast-color()` unlocks a world of dynamic theming options.

**Further reading:**

-   [`contrast-color()` intro](https://una.im/contrast-color)
-   [CSS `if()` — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/if)
-   [CSS `color-mix()` — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)
-   [Range syntax for style queries](https://una.im/range-style-queries)
-   [APCA Contrast Calculator](https://apcacontrast.com/)