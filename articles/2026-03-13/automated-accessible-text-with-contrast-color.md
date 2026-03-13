---
title: "Automated Accessible Text with contrast-color()"
source: "https://una.im/contrast-color/"
publishedDate: "2026-03-12"
category: "css"
feedName: "Una Kravets"
---

![](https://una.im/posts/contrast-color/thumb.png)

Published on March 12, 2026

I used to work in the design systems space, so [color](https://una.im/color-mix-opacity) [systems](https://una.im/contrast-color/css-color-theming/) are quite [close](https://una.im/random-selective-colors) to my heart. But one of the things that has always been missing on the web, IMO, is a native color contrast function. That is, until now. `contrast-color()` will be landing in [**Chrome 147**](https://chromestatus.com/feature/4841046007742464), stable by the end of March, making it **newly available in all modern browsers**.

Back in the day when I used [Sass](https://sass-lang.com/), there was an extension framework called compass which came with a default `contrasted()` function (Used in some of my [old](https://codepen.io/una/pen/DjpKpx) [demos](https://codepen.io/una/pen/DwYYbg). And taking it a step further, you. could [write your own contrast algorithms](https://css-tricks.com/programming-sass-to-create-accessible-color-combinations/) directly in Sass. It’s about time we got this functionality in native CSS. So what does it do, exactly?

> TLDR; `contrast-color()` takes any color and returns either `black` or `white`—whichever provides the highest contrast against the input color.

![buttons with different colored text and backgrounds](https://una.im/contrast-color/public/posts/contrast-color/buttons.png)

## The syntax [#](#the-syntax)

`contrast-color()` takes a single argument: any valid CSS [`<color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value) value.

```
color: contrast-color(purple);
/* Returns: white */

color: contrast-color(yellow);
/* Returns: black */

color: contrast-color(var(--brand-color));
/* Returns: whichever of black or white has higher contrast */
```

Under the hood, the browser calculates the contrast ratio of both `white` and `black` against your input color to meet the [WCAG 2.1 AA minimum contrast ratio](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) of **4.5:1** for normal text. Whichever one has the higher contrast ratio wins. If they happen to tie (as with a perfectly mid-gray), it returns `white`. This feature obviously works best with backgrounds that aren’t mid-tones.

## Basic Demo: Dynamic buttons [#](#basic-demo-dynamic-buttons)

Imagine you have a design system with different-colored buttons that have text on top. You need to make sure this text is always accessible, but now you just need one line of code to always choose a contrasting text color.

This demo will work in Chrome 147+, Safari 26+, and Firefox 146+. The initial text on the purple button will be white in supported browsers.

#843dff

All you need to do to get this working is:

```
.button {
  background-color: var(--brand-color);
  color: contrast-color(var(--brand-color));
}
```

## Dark mode with `prefers-color-scheme` [#](#dark-mode-with-prefers-color-scheme)

You can combine `contrast-color()` with media queries to automatically get readable text in both light and dark modes:

```
:root {
  --bg: #eee;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #222;
  }
}

body {
  background-color: var(--bg);
  color: contrast-color(var(--bg));
}
```

Now you don’t have to manage a second color property for both themes. You just need one `contrast-color()` declaration.

## Hover states and generated palettes [#](#hover-states-and-generated-palettes)

Even in situations where colors are generated algorithmically (via `color-mix()` etc.), `contrast-color()` keeps you covered, and again, reduces code repetition:

Hover over each card. In supported browsers, the background lightens and `contrast-color()` automatically switches the text from white to black:

Amber hue: 25

Sage hue: 140

Sky hue: 210

Violet hue: 280

Rose hue: 340

```
.card {
  --bg: oklch(0.6 0.15 250);
  background: var(--bg);
  color: contrast-color(var(--bg));

  &:hover {
    --bg: color-mix(in oklch, oklch(0.6 0.15 250) 40%, white);
  }
}
```

## Wrap up [#](#wrap-up)

`contrast-color()` is a good start to making CSS color palettes more dynamic. While the current version is simple, I hope in time we can have more advanced functionality like going beyond black and white as contrast colors. For now, if you’re building themes, or anything with dynamic color (which I hope you are!), this will save you time and make accessible color contrast a little bit easier.

**Further reading:**

-   [CSS Color Level 5 Spec: `contrast-color()`](https://drafts.csswg.org/css-color-5/#contrast-color)
-   [MDN: `contrast-color()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/contrast-color)
-   [WCAG 2.2: Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)
-   [APCA Contrast Calculator](https://apcacontrast.com/)