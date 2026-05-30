---
title: "Algorithmic Theming Engines: Building Self-Correcting Color Systems With `contrast-color()`"
source: "https://smashingmagazine.com/2026/05/building-self-correcting-color-systems-contrast-color/"
publishedDate: "2026-05-28"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Durgesh Pawar)"
---

-   15 min read
-   [CSS](https://smashingmagazine.com/category/css), [Coding](https://smashingmagazine.com/category/coding), [Techniques](https://smashingmagazine.com/category/techniques)

Seventy percent of websites still fail basic WCAG contrast checks in 2025. After years of design system tooling, accessibility linters, and JavaScript libraries, nothing moved the needle. We didn’t need better libraries. We needed better CSS. `contrast-color()` is that better CSS.

The [HTTP Archive Web Almanac](https://almanac.httparchive.org/) has been tracking color contrast failures for years. The numbers have barely moved. After half a decade of design system tooling, accessibility linters, and entire JavaScript libraries dedicated to computing readable text colors, [70% of websites still fail basic WCAG contrast checks in 2025](https://almanac.httparchive.org/en/2025/accessibility#color-contrast). The [WebAIM Million](https://webaim.org/projects/million/) paints an even grimmer picture — 83.9% of homepages flagged for low contrast text in 2026, up from 79.1% in 2025. The rate improves by maybe a few percentage points per year on one benchmark and actually gets _worse_ on another. That’s not progress — that’s proof that relying on runtime JavaScript for something this fundamental doesn’t scale across the open web. We didn’t need better libraries. We’ve needed better CSS.

The `contrast-color()` function is that better CSS. One declaration. The browser runs the contrast math during style computation, before the page paints, and hands you the right text color. No library, no build step, no hydration flash.

**Note**: If you’ve seen it called `color-contrast()` in older articles and spec drafts — [that name was changed](https://github.com/w3c/csswg-drafts/issues/7557), and the old syntax no longer works in any browser.

## What It Does (And What It Doesn’t)

The Level 5 version is simple. You give it a color. It gives you back `black` or `white`, whichever has more contrast against your input.

```
.button {
  background-color: var(--brand-color);
  color: contrast-color(var(--brand-color));
}
```

Change `--brand-color` to neon green, text goes black. Change it to midnight navy, text goes white. Swap themes at runtime via JavaScript and the text adapts instantly — no event listeners, no recalculation.

A few things to know about the current version:

-   It returns a `<color>`, not a number. You get an actual color value (`black` or `white`), you can use anywhere CSS accepts a color.
-   **Black or white only**, for now. Candidate color lists and target ratios are planned for Level 6.
-   **No keywords.** If you’ve seen `max` in older blog posts, that was stripped from the spec. Using it will silently break your declaration.
-   As mentioned above, this function used to be called `color-contrast()` in early drafts. That name is dead — [the CSSWG renamed it](https://github.com/w3c/csswg-drafts/issues/7557) to follow the convention that CSS functions are named for what they return. `color-mix()` returns a color. `contrast-color()` returns a color. The old `color-contrast()` name sounded like it returned a contrast _ratio_ (a number like 4.5), which was misleading. Any tutorial from 2021–2023 showing `color-contrast()` syntax won’t work in current browsers.  
    

## The Spec Split: Level 5 Versus Level 6

This function lives across two specifications. That’s unusual and worth understanding.

[**CSS Color Level 5**](https://www.w3.org/TR/css-color-5/#contrast-color) defines what browsers ship today. One color in, black or white out. The algorithm is deliberately marked “UA-defined”, meaning the browser decides what math to use internally. Right now, every engine uses WCAG 2.x relative luminance. But that “UA-defined” label isn’t accidental — it’s a planned escape hatch.

You’ll see APCA (**Accessible Perceptual Contrast Algorithm**) mentioned a lot in this context. APCA models how human eyes actually perceive contrast, factoring in font weight, spatial frequency, and ambient light — a genuine improvement over the WCAG 2.x formula. By not locking _“use WCAG 2.x”_ into the Level 5 spec, browser vendors _could_ swap to APCA later without breaking any existing code. If the spec had shipped with a `wcag2()` keyword as the default, every site using it would’ve been stuck on the old math permanently.

But APCA’s future is far less certain than the hype suggests. Adrian Roselli’s “[WCAG3 Contrast as of April 2026](https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html)” lays out the current situation clearly: APCA was pulled from the WCAG 3 working draft [in mid-2023](https://www.w3.org/TR/2023/WD-wcag-3.0-20230724/#color-and-contrast) after failing to gain enough Working Group support. The WCAG 3 spec currently says the contrast algorithm is _“yet to be determined,”_ and the standard itself [may not be finalized until 2030 or later](https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/#timeline). Roselli also [filed a Chromium issue in May 2024](https://issues.chromium.org/issues/341439947) asking for the “Advanced Perceptual Contrast Algorithm” experiment flag to be removed from DevTools entirely, arguing that the implementation is outdated and risks misleading developers into thinking APCA is further along — or more official — than it actually is. That issue is still open.

None of this means APCA is dead. The research behind it is peer-reviewed and substantive, and its creator [has noted](https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html#comment-408186) that colors passing APCA guidelines greatly exceed WCAG 2 minimums in the vast majority of cases. But right now, there is no guarantee APCA will be the algorithm that replaces WCAG 2.x — and that uncertainty matters for `contrast-color()`. If a different algorithm wins out, or if WCAG 3 adopts something entirely new, the “UA-defined” label means browsers can adapt without breaking your code. It also means the Level 6 features — candidate color lists, target ratios, the `tbd-fg`/`tbd-bg` keywords — are all designed around an algorithm that may or may not materialize in its current form.

**CSS Color Level 6** adds the extended syntax — candidate color lists and target contrast ratios:

```
/* Level 6 future syntax — not shipping yet */
color: contrast-color(var(--bg) tbd-bg wcag2(aa), #1a1a2e, #e2e8f0, #fbbf24);
```

The browser would evaluate each candidate left to right and pick the first that meets the 4.5:1 AA threshold. The `tbd-fg` and `tbd-bg` keywords indicate whether the base color is foreground or background, which matters for directional contrast models like APCA. This is all Working Draft territory — doubly so given APCA’s uncertain status. Use the Level 5 version for now.

## Browser Support

This one’s in better shape than most new CSS features. All three major engines have shipped it in stable releases: [Chrome 147](https://chromestatus.com/feature/40142548) (April 2026), [Firefox 146](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/contrast-color), and [Safari 26.0](https://developer.apple.com/documentation/safari-release-notes/safari-26-release-notes). It reached [Baseline Newly Available](https://web.dev/baseline/) status in April 2026. Check [caniuse](https://caniuse.com/mdn-css_types_color_contrast-color) for the full version matrix. All three engines pass the Web Platform Tests for `contrast-color()`, which means the edge cases (e.g., tie-breaking logic, color space conversion, syntax parsing) behave the same across browsers.

The raw global support percentage on caniuse looks low, but that mostly reflects enterprise browsers and people who never update. If you’re reading this, your browser almost certainly supports it already.

Progressive enhancement is straightforward using `@supports`:

```
.card {
  background: var(--bg);
  color: #fff;
  text-shadow: 0 0 4px rgb(0 0 0 / 0.8);
}

@supports (color: contrast-color(red)) {
  .card {
    color: contrast-color(var(--bg));
    text-shadow: none;
  }
}
```

Older browsers get white text with a dark shadow for legibility. Supporting browsers get the native calculation. Nobody sees broken text.

One thing to watch for: automated accessibility scanners (Lighthouse, Axe, etc.) can’t evaluate `text-shadow`. They only look at the computed `color` against `background-color`. So the fallback will still get flagged as a contrast failure in CI/CD pipelines, even if the shadow makes the text perfectly legible to human eyes. If your team runs automated a11y checks, you may need to allowlist that specific rule or add a comment explaining why the flag is a false positive.

> **A note on PostCSS**:
> 
> There’s a plugin ([`@csstools/postcss-contrast-color-function`](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-contrast-color-function)) that evaluates `contrast-color()` at build time. It works for static colors like `contrast-color(#ff0000)`. But the moment you use a custom property — `contrast-color(var(--bg))` — the plugin can’t help because it has no access to runtime values. If your theming is dynamic (which is the whole point of doing this), skip the polyfill and rely on `@supports`.

## The Gotchas

### It Doesn’t Guarantee Perceptual or AAA Compliance

This can trip people up: _“I used the contrast function, so my site passes accessibility checks now, right?”_

Mathematically? Usually yes. There is a persistent myth that for certain “mid-tone” backgrounds, both black and white fail the standard WCAG 4.5:1 AA ratio. That’s mathematically false. Under the WCAG 2.x relative luminance formula, there is absolutely no background color where both pure black and pure white fail AA. One (or both) will always pass.

Take `#2277d3` (a medium blue). It sits right on a mathematical knife-edge where both black and white actually pass AA (both hit roughly 4.58:1). `contrast-color()` will hand you whichever has the slight mathematical edge.

But here is the actual gotcha: the WCAG 2.x math has known perceptual blind spots. That same `#2277d3` with black text mathematically passes AA, but to human eyes, it can be incredibly difficult to read. `contrast-color()` gives you _mathematical_ compliance, which is great for automated audits, but that doesn’t always equal _perceptual_ accessibility. (This is exactly why APCA exists and why the spec was designed to let browsers swap algorithms later.)

Furthermore, if you’re aiming for the stricter WCAG AAA standard (7.0:1), a true dead zone _does_ exist. For backgrounds with a luminance between roughly 10% and 30%, neither black nor white will hit 7:1. In those cases, `contrast-color()` can’t save you — it just hands you the “least bad” failing option.

### Transitions Snap, Not Fade

If you’re animating a background from `white` to `black` on hover:

```
.btn {
  background-color: #fff;
  color: contrast-color(#fff); /* black */
  transition: background-color 1s, color 1s;
}
.btn:hover {
  background-color: #000;
  color: contrast-color(#000); /* white */
}
```

The background fades smoothly over one second. But because the Level 5 output is a [discrete value](https://www.w3.org/TR/css-transitions-1/#discrete) (black or white), the text color can’t be interpolated. It snaps.

And here is the visual gotcha: the snap doesn’t happen halfway through. If you’ve been building themes for a while, you probably have muscle memory from the old Sass days, where we checked if `lightness($bg) > 50%`. That relied on HSL lightness, where 50% is the geometric midpoint.

But WCAG 2.x relative luminance is a non-linear scale. Under the WCAG formula, the mathematical tipping point — where black and white have identical contrast against the background — actually occurs at approximately 18% relative luminance (specifically ~17.9%).

Because of that, the visual behavior during a white-to-black fade is heavily skewed. The text doesn’t snap in the middle. It stays black for the vast majority of the animation, only snapping to white at the very tail-end of the transition when the background gets extremely dark. It’s a jarring, late hard cut.

You might assume [`transition-behavior: allow-discrete`](https://css-tricks.com/almanac/properties/t/transition/transition-behavior/) fixes this. It doesn’t. `allow-discrete` does not fix the jarring visual experience because it cannot interpolate a binary output; it only shifts the timing of the hard snap to the 50% mark of the animation duration. If you need smooth text color transitions, you’ll have to layer `color-mix()` or manage the crossfade yourself.

### Tie Goes To White

If the background is a perfect middle gray where both black and white produce identical contrast ratios, [the spec has a hardcoded tiebreaker](https://www.w3.org/TR/css-color-5/#contrast-color): white wins. Not a big deal in practice, but worth knowing if you’re debugging gray palettes and the text isn’t doing what you expect.

### Gradients And Images Are Out

The function takes a flat `<color>` value. You can’t pass it a gradient or a `url()`. `contrast-color(linear-gradient(...))` is a parse error. If your background is a photo or a complex gradient, you still need JavaScript or manually color-pick for overlay text.

### Transparent Colors Are Composited First

Pass a semi-transparent color, and the browser blends it against an assumed opaque canvas (usually white) before running the contrast math. It’s not ignoring your alpha channel — it’s compositing it. But the result might surprise you if you expected the function to “see through” to whatever’s actually behind the element.

### Windows High Contrast Mode

If a user enables Windows High Contrast, the [`forced-colors: active`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) media query kicks in and the browser aggressively overwrites author-defined colors. `contrast-color()` bows out — [forced system colors](https://www.w3.org/TR/css-color-adjust-1/#forced-colors-mode) like `CanvasText` take over completely. You don’t need to write manual media queries to undo your contrast logic; the browser handles the hierarchy.

## Combining It With Other Color Functions

Black or white sounds limiting, but once you feed that output into other CSS color functions, you can build an entire component palette off a single custom property.

### Brand-Tinted Contrast With Relative Color Syntax

Pure black text on a vibrant card looks fine. Pure white on a coral card can feel flat. What if the contrast text was a very dark or very light _tint_ of the background color instead?

Kevin Hamer explored related territory in his CSS-Tricks piece “[Approximating contrast-color() With Other CSS Features](https://css-tricks.com/approximating-contrast-color-with-other-css-features/)”, where he used OKLCH lightness and `round()` to approximate the black/white switch _without_ `contrast-color()` — essentially `oklch(from <color> round(1.21 - l) 0 0)`. That’s a polyfill strategy: get the binary light/dark decision working in browsers that don’t support the native function yet. What we’re doing here is different — we _start_ with `contrast-color()`’s native output and then enrich it by injecting the background’s own hue:

```
.card {
  --bg-hue: 260; /* Indigo */
  --bg: oklch(0.6 0.1 var(--bg-hue));
  background: var(--bg);

  /* Pull L from the black/white contrast color,
     but inject subtle chroma and the background's hue */
  color: oklch(from contrast-color(var(--bg)) l 0.05 var(--bg-hue));
}
```

When `contrast-color()` returns white, `l` is 1 (full lightness). When it returns black, `l` is 0. By pulling the background’s hue back in and adding a touch of chroma, you get text that reads as a deep dark indigo or a pale icy indigo instead of generic black/white. Hamer’s approach gives you the black/white decision without browser support; this one takes the decision the browser already made and gives it personality.

**Fair warning**: By tweaking the lightness and chroma of the black/white output, you can push a borderline contrast ratio into failing territory. Always run your tinted output through an accessibility linter before shipping.

**Also worth noting**: This example chains two very modern features — `contrast-color()` and `oklch(from ...)`. If either one isn’t supported, the entire declaration fails silently. Your `@supports` block needs to test for both:

```
@supports (color: contrast-color(red)) and (color: oklch(from red l c h)) {
  /* Safe to use both */
}
```

### Softened Contrast With `color-mix()`

Similar idea, simpler API. Mix the sharp black/white output back into the background to soften it:

```
.alert {
  --bg: var(--alert-color);
  background: var(--bg);

  /* 80% contrast, 20% background = softer but readable */
  color: color-mix(in oklch, contrast-color(var(--bg)) 80%, var(--bg));

  /* 40% contrast for a subtle border */
  border: 1px solid
    color-mix(in oklch, contrast-color(var(--bg)) 40%, var(--bg));
}
```

One custom property driving text, border, and potentially `box-shadow` or `outline`. Change `--alert-color` and the entire component recalculates.

This pattern also works well for `::placeholder` text, which is a common pain point in dynamic theming. Placeholder text should be readable but visually softer than the input’s main text — `color-mix()` with `contrast-color()` gets you there:

```
input {
  --bg: var(--input-bg);
  background: var(--bg);
  color: contrast-color(var(--bg));
}

input::placeholder {
  color: color-mix(in oklch, contrast-color(var(--bg)) 50%, var(--bg));
}
```

`50%` mix gives you a muted but legible placeholder that adapts automatically to whatever background the input sits on.

### Theme-Aware Contrast With `light-dark()`

For apps that support system light/dark mode:

```
:root {
  color-scheme: light dark;
  --surface: light-dark(#fff, #121212);
}

.component {
  background: var(--surface);
  color: contrast-color(var(--surface));
}
```

When the operating system switches to dark mode, `--surface` resolves to `#121212`, and `contrast-color()` returns white. No media queries, no JavaScript theme detection. The whole chain resolves natively.

## What You Can Remove From Your Bundle

The practical payoff: every one of these libraries existed because CSS couldn’t do contrast math. If you’re only using them for readable-text-color selection, you can pull them out of your runtime entirely:

Library

Size

What it did

chroma-js

~14 kB

Color parsing, luminance calc, readable color selection

polished

~11 kB

`readableColor()` for styled-components

tinycolor2

~5 kB

Hex parsing, WCAG contrast ratio math

You might still need these for generating complex color scales, but the contrast-for-readability use case is now covered natively.

Beyond bundle size, there’s a performance angle that’s easy to overlook. Those JavaScript libraries don’t just cost you network bytes — they run on the main thread. Every time a theme changes or a component mounts with a dynamic background, your JS has to parse the color, compute luminance, decide black or white, and write the result back to the DOM. That’s main-thread work competing with layout, event handlers, and everything else your app is doing. `contrast-color()` moves all of that into the browser’s native style computation phase — heavily optimized C++ that runs before paint. For apps with lots of themed components, that’s a real difference in responsiveness.

There’s also a subtle bug that goes away: **hydration flash**. In React or Vue SSR apps, the server renders HTML without JavaScript. The client then hydrates, running JS to calculate contrast and inject the correct text color. For a brief window between initial paint and hydration, the text is either invisible or the wrong color. Moving contrast into CSS eliminates that entirely — the browser resolves the correct color during the initial paint, before JavaScript loads.

## What We Used To Do

For context on what this replaces:

**Sass era.** You’d write a function that checked `lightness($bg) > 50%` and returned black or white at compile time. Worked for static themes. Completely useless for user-picked colors, CMS palettes, or dark mode, because the output was baked into the CSS file and could never change at runtime.

**The variable toggle hack.** When CSS custom properties shipped, people got creative. GitHub used a version of this for their issue label picker — splitting colors into `--r`, `--g`, `--b` channels, calculating Rec.709 luminance inside `calc()`, multiplying by negative infinity, and clamping to `0` or `1`. It worked. It was also unreadable, unmaintainable, and would break silently if you got one parenthesis wrong. (Kevin Hamer’s [OKLCH-based approximation](https://css-tricks.com/approximating-contrast-color-with-other-css-features/) is the most elegant version of this lineage — cleaner math, better perceptual alignment — but it’s still a workaround for a function that now ships natively.)

`contrast-color()` replaces all of these approaches with a single function call. And because the spec lets browsers upgrade the underlying algorithm, your code won’t need to change if and when a successor to WCAG 2.x contrast math lands — whether that’s APCA or something else entirely.

* * *

That [70% failure rate](https://almanac.httparchive.org/en/2025/accessibility#color-contrast) was never about developers refusing to care about contrast. It was about the distance between caring and shipping — the library, the build step, the runtime calculation, the hydration flash, the one component someone forgot to wire up. Every gap in that chain was a spot where accessibility quietly dropped out.

`contrast-color()` doesn’t make developers care more. It makes caring cost nothing.

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (gg, yk)