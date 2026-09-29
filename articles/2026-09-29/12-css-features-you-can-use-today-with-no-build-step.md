---
title: "12 CSS features you can use today with no build step"
source: "https://flaviocopes.com/modern-css-features/"
publishedDate: "2026-09-28"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

[Home](https://flaviocopes.com/) / [CSS](https://flaviocopes.com/tags/css/)

By [Flavio Copes](https://flaviocopes.com/about/)

Sep 21, 2026

Modern CSS features that replace Sass, PostCSS plugins and JavaScript hacks: nesting, :has(), container queries, subgrid and more, checked in September 2026.

\~~~

Most of the CSS tooling we got used to exists because the language was missing something. Sass gave us nesting and color math. JavaScript did the rest, from measuring elements to faking a parent selector, and a PostCSS plugin flipped the whole stylesheet when a site needed Arabic. In 2026 the browser does all of this on its own. Here are twelve of those features, each with the workaround it retires, a snippet you can paste into a plain `.css` file, and where support stands.

The support notes come from MDN’s browser compat data and the web-features project, checked on September 21, 2026. “Baseline Widely available” means the feature has been in Chrome, Edge, Firefox and Safari for at least 30 months. “Baseline Newly available” means every one of those browsers ships it in its current version, but older installs are still around. One item on the list is not Baseline at all, and I say so when we get there.

## 1\. Native nesting

Nesting is the reason most projects installed Sass in the first place. You write the child rules inside the parent, and a tool expands them into flat selectors.

Now the browser does the expanding. This is plain CSS:

```
.card {
  padding: 1rem;
  border: 1px solid #ddd;

  h2 {
    margin: 0 0 0.5rem;
  }

  &:hover {
    border-color: #000;
  }

  @media (min-width: 40rem) {
    padding: 2rem;
  }
}
```

The `&` is the parent selector. Media and container queries nest too. No `.scss` file, no watcher process.

Support: Baseline Widely available since June 2026. Chrome 120, Firefox 117 and Safari 17.2 shipped the current syntax, the one that lets a nested rule start with an element name like `h2`. Earlier Chrome and Safari builds required an `&` in front of it.

The gotcha is muscle memory. `&__title` does not build a `.card__title` class name, because `&` is a selector here, not text to concatenate. And when the parent is a selector list, `.card, #featured { .title {} }` behaves like `:is(.card, #featured) .title`, so the nested rule gets the specificity of the ID even where only `.card` matched. I go through more of these differences in [Native CSS Nesting](https://flaviocopes.com/css-nesting/).

## 2\. :has()

CSS never had a way to look up the tree. Styling a form field because the input inside it was invalid meant JavaScript toggling a class on the wrapper.

`:has()` does the lookup in the selector:

```
.field:has(input:invalid) {
  border-color: crimson;
}

.field:has(input:focus) label {
  color: royalblue;
}
```

The first rule styles the wrapper. The second styles a sibling of the input, through the shared parent. Both used to need a script and an event listener.

Support: Baseline Widely available since June 2026. Chrome 105 and Safari 15.4 had it in 2022, Firefox 121 was last, in December 2023.

A `:has()` rule takes the specificity of its most specific argument, so `.field:has(#email)` is stronger than it looks. Keep the subject small too. `body:has(.menu-open)` asks the browser to re-check the rule on every change anywhere inside `body`. More patterns and the limits are in [The CSS :has() selector](https://flaviocopes.com/css-has-selector/).

## 3\. Container queries and cqi units

Media queries ask how wide the viewport is. A card in a narrow sidebar and the same card in the main column get the same answer, which is why people wrote `ResizeObserver` code, or pulled in an element-queries library, to switch a class when the component itself got narrow.

Container queries ask the component’s wrapper instead:

```
.sidebar,
.main {
  container-type: inline-size;
}

.card {
  display: grid;
  gap: 1rem;
}

@container (min-width: 32rem) {
  .card {
    grid-template-columns: 1fr 2fr;
  }
}
```

The card becomes two columns only where its container is wide enough. The `cqi` unit is 1% of the container’s inline size, so you can scale type to the slot as well:

```
.card h2 {
  font-size: clamp(1rem, 5cqi, 1.75rem);
}
```

Support: Baseline Widely available since August 2025. Chrome 105, Safari 16, Firefox 110. The container query units shipped in the same releases.

A size container cannot size itself from its content on the queried axis. `container-type: inline-size` is fine on anything that already fills its parent. It is a bad idea on an element whose width comes from what is inside it, such as an inline-block button, which collapses. The full walkthrough is in [CSS Container Queries](https://flaviocopes.com/css-container-queries/).

## 4\. Subgrid

Three cards side by side. Each has a title, a paragraph and a button. You want the buttons on one line and the paragraphs starting at the same height, even when one title wraps to two lines.

Without subgrid the honest fix was to flatten the markup so every part is a direct child of one grid, or to run JavaScript that measures the tallest title and copies the height to the others. With subgrid a card keeps its own markup and borrows the parent’s rows:

```
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
}
```

Each card spans three rows of the parent and lays its children on them. Row 1 is as tall as the tallest title across all three cards, so everything lines up.

Support: Baseline Widely available since March 2026. Firefox shipped it in version 71 back in 2019, Safari 16 followed in 2022 and Chrome 117 in 2023.

`grid-row: span 3` is not optional. Without it the card spans one parent row and has nothing to subgrid into. Gaps come from the parent, and padding on the card shrinks the tracks it hands down to its children. I built this card example step by step in [CSS Subgrid](https://flaviocopes.com/css-subgrid/).

## 5\. oklch() and color-mix()

`darken($brand, 10%)` and `mix($brand, white, 20%)` were the other big reason for Sass. The build step did the color math because CSS could not.

Now CSS can, and in a better color space. `oklch()` describes a color by lightness, chroma and hue, so a lighter version is the same hue with a bigger first number:

```
:root {
  --brand: oklch(55% 0.2 250);
  --brand-light: oklch(75% 0.2 250);
  --brand-dark: oklch(40% 0.2 250);
}
```

`color-mix()` mixes two colors at runtime, which means it works with [custom properties](https://flaviocopes.com/css-variables/) that a theme or a user setting can change after the stylesheet is written:

```
.button:hover {
  background: color-mix(in oklch, var(--brand), white 15%);
}
```

Support: both are Baseline Widely available since November 2025. `oklch()` is in Chrome 111, Firefox 113 and Safari 15.4. `color-mix()` needs Safari 16.2.

`oklch()` can describe colors your screen cannot show. The browser maps them into the display gamut, and the result can be duller than the numbers suggest, especially for saturated blues and greens. When the exact color matters, check it on a normal sRGB monitor and not only on a wide-gamut laptop screen. The full walkthrough is in [Modern CSS colors: oklch() and color-mix()](https://flaviocopes.com/css-oklch-color-mix/).

## 6\. aspect-ratio

The padding hack. A wrapper with `height: 0; padding-top: 56.25%` and an absolutely positioned child inside it, because padding percentages resolve against the width and nothing else in CSS did.

Today it is one line:

```
.video {
  aspect-ratio: 16 / 9;
}
```

Set a width and the browser computes the height. Set neither and the element takes the width of its parent, and the height follows.

Support: Baseline Widely available since March 2024. Chrome 88, Firefox 89, Safari 15.

`aspect-ratio` is a preference, not a clamp. If the content is taller than the computed height, the box grows, because `min-height: auto` wins. Add `overflow: hidden` or `min-height: 0` when you need a hard ratio. For images, keep the `width` and `height` attributes in the HTML anyway, since the browser uses them to reserve space before the file loads. The math is in [The CSS aspect-ratio property](https://flaviocopes.com/css-aspect-ratio-property/).

## 7\. Cascade layers

Big stylesheets used to get their order from a folder structure and a build tool. Reset first, then base styles, then components, then utilities, plus a rule that nobody adds `!important` before the third code review.

`@layer` writes that order into the CSS itself:

```
@layer reset, base, components, utilities;

@layer components {
  .button {
    padding: 0.5rem 1rem;
  }
}

@layer utilities {
  .p-0 {
    padding: 0;
  }
}
```

A rule in a later layer beats any rule in an earlier layer, whatever its specificity. `.p-0` wins over `.card .button` because `utilities` comes after `components`, and the order of the files no longer matters.

This site runs on Tailwind 4, which is built on native cascade layers. Its entry file declares `@layer theme, base, components, utilities;`, and my own rules in `global.css` go into `@layer base` and `@layer components`, so Tailwind’s utilities can always override them.

Support: Baseline Widely available since September 2024. Chrome 99, Firefox 97, Safari 15.4.

Styles outside any layer beat every layer. That is by design, but it surprises people who layer half a project and leave the rest unlayered. And `!important` reverses the order, so an important declaration in `reset` beats an important one in `utilities`. The cascade rules behind all this are in [CSS Cascade](https://flaviocopes.com/css-cascade/), and if specificity itself still feels foggy, the free [CSS course](https://flaviocopes.com/courses/css/) starts from there and gets to Grid and container queries.

## 8\. :is() and :where()

Sass expands `h1, h2, h3 { a { ... } }` into three selectors. `:is()` does the same expansion in the browser:

```
:is(h1, h2, h3) a {
  text-decoration: none;
}
```

`:where()` matches exactly the same elements but adds nothing to specificity. That makes it the tool for base styles that anyone should be able to override with a single class.

I use it on this site for the list reset. Blog posts use Tailwind’s typography plugin, which styles lists its own way, so the global list rule excludes prose content without gaining specificity:

```
ul:not(.unset):not(:where([class~='prose'] *)) {
  padding-left: 0;
  list-style: none;
}
```

Wrapped in `:where()`, the `[class~='prose'] *` part costs nothing, and a plain class later in the file can still restyle those lists.

Support: Baseline Widely available since July 2023. Chrome 88, Firefox 82, Safari 14.

`:is()` takes the specificity of its most specific argument, even when a weaker one matched. `:is(#nav, .menu) a` has ID specificity for a link inside `.menu`. Both selectors are also forgiving: an argument the browser does not understand is dropped instead of invalidating the whole rule, which is convenient and occasionally hides a typo for a long time.

A progress bar that fills as you read, or cards that fade in as they enter the viewport, used to mean GSAP ScrollTrigger, AOS, or a hand-rolled `IntersectionObserver` plus a scroll listener.

CSS can drive an animation from the scroll position:

```
.progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: royalblue;
  transform-origin: left;
  animation: grow auto linear;
  animation-timeline: scroll(root);
}

@keyframes grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

`scroll(root)` ties the animation to the document scroller, and the `auto` duration means the keyframes span the whole scroll range. `view()` ties the animation to an element’s own position in the viewport instead, which is the fade-in-on-enter pattern.

Support: this is the one item that is **not Baseline**. Chrome 115 shipped it in 2023 and Safari 26 in September 2025. Firefox has it only in Nightly behind a flag as of September 2026. So wrap it in a feature query and keep the content readable without it:

```
@supports (animation-timeline: scroll()) {
  .card {
    animation: reveal auto linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 100%;
  }
}
```

The `animation` shorthand resets `animation-timeline` to `auto`, so the timeline line has to come after the shorthand or the effect silently turns into a normal time-based animation. And respect motion settings. I run macOS with Reduce Motion on, so I see the static end state of every one of these effects, and so does anyone else with that setting. Put the effect inside `@media (prefers-reduced-motion: no-preference)`. I cover both in [Scroll-driven CSS animations](https://flaviocopes.com/css-scroll-driven-animations/) and in [@keyframes and prefers-reduced-motion done right](https://flaviocopes.com/css-keyframes-reduced-motion/).

## 10\. dvh, svh and lvh

`height: 100vh` on a phone was a famous bug. Mobile browsers resolved `vh` against the viewport with the toolbars hidden, so a full-screen hero was taller than the visible screen and its bottom got cut off. The fix was a JavaScript snippet that read `window.innerHeight` on every resize and wrote it into a `--vh` custom property.

The new units make the browser do that work:

```
.hero {
  min-height: 100svh;
}
```

`svh` is the small viewport, the height with the browser UI showing, and `lvh` the large one with the UI collapsed. `dvh` follows whatever the current state is.

Support: Baseline Widely available since June 2025. Safari 15.4, Firefox 101, Chrome 108.

`dvh` changes while the user scrolls and the toolbar animates away, so anything sized with it resizes mid-scroll. That is fine for a bottom sheet and annoying for a hero that jumps a few pixels every time the toolbar moves. My default is `svh` for layout, with `dvh` only where a moving box is the intended behavior. The rest of the units are in [CSS Units](https://flaviocopes.com/css-units/).

## 11\. Logical properties

Supporting a right-to-left language used to mean a second stylesheet generated by a PostCSS plugin such as `rtlcss`, or a pile of `[dir="rtl"]` overrides that flipped every `margin-left` to `margin-right`.

Logical properties describe the box in terms of the writing direction, so nothing has to flip:

```
.byline {
  margin-inline-start: auto;
  padding-inline: 1rem;
  border-inline-start: 2px solid #000;
}
```

In English, `inline-start` is the left. In Arabic or Hebrew it is the right, and the same rule produces the mirrored layout.

The shorthands help even when you never ship an RTL layout. `inset: 0` replaces four declarations of `top`, `right`, `bottom` and `left`, and `margin-block: 2rem` sets top and bottom at once.

On this site the `~~~` separators between sections use `padding-inline-start`. That is the extent of it, since the site only ships in English, but the logical version costs nothing to write.

Support: Baseline Widely available since March 2024. Firefox 66, Chrome 89, Safari 15.

The trap is mixing the two vocabularies on the same element. `margin-left` and `margin-inline-start` control the same side in English, and the later declaration wins, which is easy to lose track of when one comes from a framework and one from you. Pick one style per project.

## 12\. @starting-style

Animating an element that appears from `display: none` never worked with a plain transition. The element has no previous style to transition from, so people added the class one tick later with `requestAnimationFrame`, or reached for a library that did it for them.

`@starting-style` gives the browser the “before” state:

```
[popover] {
  opacity: 1;
  transition: opacity 0.3s, display 0.3s allow-discrete;

  @starting-style {
    opacity: 0;
  }
}

[popover]:not(:popover-open) {
  opacity: 0;
}
```

Open a [popover](https://flaviocopes.com/popover-api/) or a [dialog](https://flaviocopes.com/html-dialog-tag/) styled this way and it fades in. `display 0.3s allow-discrete` keeps the element displayed until the transition ends, so it can fade out as well.

Support: Baseline Newly available since August 2024. Chrome 117, Safari 17.5, Firefox 129. It should reach Widely available in February 2027.

The exit half is not there everywhere. Firefox supports `transition-behavior: allow-discrete` but does not transition `display` yet, so in Firefox the fade-in works and the fade-out snaps. Also, `@starting-style` only applies on the first render, so an element hidden with `visibility` or `opacity` instead of `display: none` does not get the starting style when it comes back. The transition basics are in [Introduction to CSS Transitions](https://flaviocopes.com/css-transitions/).

## What I left out, and how to check for yourself

`text-wrap: balance` is Newly available and worth a line on every heading. Its sibling `text-wrap: pretty` is not in Firefox. `@scope` is Baseline Newly available since March 24, 2026, and `field-sizing` since June 16, 2026 (webstatus.dev / web-features). CSS anchor positioning still sits at Limited in web-features, so I left it out of the main list. `@property`, `light-dark()` and `linear()` easing are in every current browser and any of them would have made a fine item 13.

When you are not sure about a feature, do what I did for this post. Open its MDN page and read the Baseline badge at the top. Then wrap the risky part in `@supports`, so the fallback is the boring version of your page rather than a broken one.

This site still has a build step, because Tailwind generates the utility classes and Astro bundles and minifies the output. Apart from the Tailwind directives at the top, though, the rules in `global.css` are plain CSS, and every feature in this list would work in that file without touching the build.

Want me to talk about your product? You can [sponsor this site](https://flaviocopes.com/sponsor/).

\~~~

Related posts about css: