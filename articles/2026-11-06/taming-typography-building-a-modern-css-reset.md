---
title: "Taming Typography: Building a Modern CSS Reset"
source: "https://css-tricks.com/taming-typography-modern-css-reset/"
publishedDate: "2026-11-05"
category: "css"
feedName: "css-tricks"
author: "Stu Robson"
---

CSS can now make choices about type that used to sit outside a [reset](https://css-tricks.com/reboot-resets-reasoning/). [`text-wrap: pretty`](https://css-tricks.com/pretty-is-in-the-eye-of-the-beholder/) can prevent a stranded word, container query units can scale a heading to the column it occupies, and [`text-box`](https://css-tricks.com/almanac/properties/t/text-box/) can trim the half-leading built into a line box. Some of these features are experimental and browser support is uneven, so they need guardrails rather than blind inclusion.

I’ve put together **tidy-typography.css**, which gathers the useful parts into a default stylesheet: rendering and fallback rules, fluid sizing, vertical rhythm, wrapping, hyphenation, and OpenType detail.

Use it whole, or take the declaration that solves the particular irritation in front of you. I’ll walk you through all the details in this article and give you the full code at the end.

## Rendering and fallback sanity

```
html {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-synthesis: none;

  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}

body {
  font-size-adjust: from-font;
}
```

`font-synthesis: none` stops a browser from inventing bold or italic when the family lacks that face. The smoothing and text-rendering declarations are rendering hints, mainly for WebKit; results still vary by platform.

`text-size-adjust` disables mobile font inflation that can make a deliberately sized layout jump on rotation. `font-size-adjust: from-font` uses font metrics to reduce the apparent size change while a fallback swaps for a webfont.

(As with other snippets in this article, this ⁠`:root` block is a partial excerpt the final stylesheet combines it with additional custom properties defined later on.)

## Fluid typography

[Viewport-based fluid type](https://css-tricks.com/snippets/css/fluid-typography/) does not know how wide its element is. A heading in a narrow sidebar can therefore scale as though it fills the viewport.

```
.article-container {
  container-type: inline-size;
}

:root {
  --step-0: clamp(1rem, 0.9rem + 1cqi, 1.125rem);
  --step-3: clamp(2rem, 1.6rem + 3cqi, 2.75rem);
}
```

`container-type: inline-size` makes the wrapper a [container query](https://css-tricks.com/css-container-queries/), so its children can use `cqi`: a unit based on the container rather than the viewport. Replacing `vw` in `clamp()` lets the same heading scale appropriately in an article column or a `300px` sidebar without component-specific media queries.

## Vertical rhythm: trim the half-leading

```
:heading, p, blockquote, figcaption, li {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
  /* shorthand: text-box: trim-both cap alphabetic; */
}
```

[`line-height`](about:blank) includes space above the cap-height and below the baseline: half-leading. It becomes obvious when text must align tightly with another element. [`text-box-trim`](https://css-tricks.com/almanac/properties/t/text-box-trim/) removes it, while [`text-box-edge`](https://css-tricks.com/almanac/properties/t/text-box-edge/) measures from capital-letter caps to the alphabetic baseline. This is a metrics-aware alternative to font-specific negative-margin nudges.

```
@supports selector(:heading) {
  :heading {
    text-box: trim-both cap alphabetic;
  }
}
```

[Selectors Level 5 proposes :heading](https://drafts.csswg.org/selectors-5/#headings), matching `h1` to `h6` and `[role="heading"]`. It has not landed in browsers, so keep it behind an `@supports selector()` check.

## Balanced headlines, orphan-free paragraphs

```
:heading, blockquote, figcaption {
  text-wrap: balance;
}

p, li, dd {
  text-wrap: pretty;
  max-width: 65ch;
}

[contenteditable="true"] {
  text-wrap: stable;
}
```

Default heading wrapping can leave one short final line. `text-wrap: balance` distributes text across its lines and works best for blocks of up to about six lines. For paragraphs, `text-wrap: pretty` [avoids a stranded final word without balancing the whole block](https://css-tricks.com/pretty-is-in-the-eye-of-the-beholder/). Both replace JavaScript orphan fixers. Editable text needs `text-wrap: stable`, which prevents each new word from reshuffling the paragraph.

## Hyphenation, properly tuned

```
<html lang="en-GB">
```

```
p {
  hyphens: auto;
}
```

`hyphens: auto` relies on the browser’s language dictionaries, so the document needs a correct `lang` attribute (for example `<html lang="en-GB">`). Without one the browser has no dictionary to use and won’t be able to hyphenate text. Even with the correct `lang`, the defaults can leave tiny word fragments or several hyphenated lines in a row.

```
p {
  hyphens: auto;
  hyphenate-limit-chars: 6 3 3; /* word length, min before break, min after break */
  hyphenate-character: "‐"; /* use proper hyphen glyph instead of dash */
  hyphenate-limit-lines: 2; /* no more than 2 consecutive hyphenated lines */
  hyphenate-limit-zone: 8%; /* reduce overall hyphenation frequency */
  hyphenate-limit-last: always; /* never hyphenate the last word of a paragraph */

  /* Safari legacy equivalents */
  -webkit-hyphens: auto;
  -webkit-hyphenate-limit-before: 4;
  -webkit-hyphenate-limit-after: 3;
  -webkit-hyphenate-limit-lines: 2;
}

pre, code, var, samp, kbd, :heading {
  hyphens: manual;
  -webkit-hyphens: manual;
}
```

[`hyphenate-limit-chars`](https://css-tricks.com/almanac/properties/h/hyphenate-limit-chars/) controls the smallest breakable word and fragments; [`hyphenate-limit-lines`](https://drafts.csswg.org/css-text-4/#hyphenate-line-limits) prevents a ladder effect. [`hyphenate-limit-zone`](https://drafts.csswg.org/css-text-4/#hyphenate-size-limits) makes breaks less frequent, while `hyphenate-limit-last` protects the final word. Safari needs the prefixed equivalents, so declare both sets together.

Set code, variables, and headings to `hyphens: manual`: a broken code word can change meaning, and a hyphenated heading usually reads as an error.

## Hanging punctuation and ink-aware underlines

```
blockquote, p {
  hanging-punctuation: first allow-end last;
}

a {
  text-decoration-thickness: from-font;
  text-underline-offset: 0.15em;
  text-decoration-skip-ink: auto;
}
```

Punctuation marks don’t carry the same visual weight as letters, so a quotation mark sitting at the start of a line can look slightly indented against the text below it. [`hanging-punctuation`](https://css-tricks.com/almanac/properties/h/hanging-punctuation/) lets specified punctuation sit fractionally outside the text block’s edge.

The `first` value handles opening punctuation, and `last` handles closing punctuation at the end of a block, while `allow-end` lets punctuation hang past the right edge rather than force-wrapping. The result is a text block whose edges read as genuinely flush.

Underlines have a related problem. Browsers apply flat, one-size-fits-all thickness and position regardless of the font’s actual weight.

`text-decoration-thickness: from-font` reads the thickness the font’s designer intended. [`text-underline-offset`](https://css-tricks.com/almanac/properties/t/text-underline-offset/) gives descenders room to breathe, and `text-decoration-skip-ink: auto` interrupts the underline wherever a descender crosses it rather than drawing straight through the letter.

## Variable font fine-tuning

```
body {
  font-optical-sizing: auto;
  font-variant-ligatures: common-ligatures contextual;
  font-kerning: normal;
}

/* Dark mode grade compensation */
:root {
  --vf-grad: 0;
}

@media (prefers-color-scheme: dark) {
  :root { --vf-grad: -50; }
}

* {
  font-variation-settings: "GRAD" var(--vf-grad, 0);
}
```

[Variable fonts](https://css-tricks.com/one-file-many-options-using-variable-fonts-web/) often include an optical size axis, or `opsz`. It lets a typeface use thinner strokes at large display sizes and thicker, more legible strokes when set small.

`font-optical-sizing: auto` lets the font make that adjustment based on its actual rendered size. The `@supports` block covers the older `font-variation-settings` syntax some browsers still need, while [`font-variant-ligatures`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variant-ligatures) and [`font-kerning`](https://css-tricks.com/almanac/properties/f/font-kerning/) enable the font’s own ligatures and kerning pairs.

[Light text on a dark background genuinely reads heavier than the same weight on a light background.](https://css-tricks.com/dark-mode-and-variable-fonts/) Where a font ships a `GRAD`, or grade, axis, the dark mode block dials that perceived weight down without changing glyph shape or width the way an actual weight change would. Fonts without a `GRAD` axis safely ignore the setting.

```
@font-face {
  font-family: "Mono";
  src: url("/fonts/mono-var.woff2") format("woff2");
  size-adjust: 105%; /* tune per-font */
}
```

Mixing a monospace font into running prose often exposes a mismatched x-height at the same declared [`font-size`](https://css-tricks.com/almanac/properties/f/font/font-size/). The `size-adjust` keyword, set once at the [`@font-face`](https://css-tricks.com/almanac/rules/f/font-face/) level, scales that font’s rendered output specifically, leaving the actual `font-size` value untouched.

## Numeric, emoji, and script-aware text

Numbers in a table need identical widths so they stack into a clean column on the screen. Conversely, numbers in flowing text don’t need the same treatment and should sit naturally alongside the surrounding words.

```
table, .tabular {
  font-variant-numeric: tabular-nums lining-nums;
}

.prose {
  font-variant-numeric: oldstyle-nums proportional-nums;
}

.emoji-color {
  font-variant-emoji: emoji;
}

.emoji-mono {
  font-variant-emoji: text;
}
```

The `tabular-nums` and `lining-nums` keywords give table digits a fixed width and full cap height. `oldstyle-nums` and `proportional-nums` let digits sit alongside lowercase letters without sticking up and disrupting the sentence’s texture.

[`font-variant-emoji`](https://css-tricks.com/almanac/properties/f/font-variant-emoji/) makes the choice between full-colour and monochrome emoji explicit. Without it, the browser or platform gets to choose a fallback, and the result can vary more than you expect. Apply `.emoji-color` or `.emoji-mono` to containers where you want to enforce that choice, rather than setting it globally on the body.

## Locale-aware quotes and native subcripts and superscripts

Quote style and character order differ by language and region. English nests single quotes inside double quotes, British English reverses that convention, and French uses guillemets with a thin space.

```
:where(:lang(en)) > * { quotes: "\"" "\"" "'" "'"; }
:where(:lang(en-GB)) > * { quotes: "'" "'" "\"" "\""; }
:where(:lang(fr)) > * { quotes: "«\\00202F" "\\00202F»" "\"" "\""; }

q::before { content: open-quote; }
q::after { content: close-quote; }
```

The [`quotes`](https://css-tricks.com/almanac/properties/q/quotes/) property declares the order for each language through [`:lang()`](https://css-tricks.com/almanac/pseudo-selectors/l/lang/). The native `q` element then inserts the right pair through `open-quote` and `close-quote`. The same markup can render correctly in each locale without hardcoding characters into the content.

Wrapping the rules in [`:where()`](https://css-tricks.com/almanac/pseudo-selectors/w/where/) keeps them at zero specificity, so a project can override the quote style with one plain class.

Default `sub` and `sup` styling is synthesized. The browser just shrinks the text and shifts the baseline, rather than using glyphs actually designed for that position.

```
@supports (font-variant-position: sub) {
  :is(sub, .sub) {
    vertical-align: baseline;
    font-size: 100%;
    line-height: inherit;
    font-variant-position: sub;
  }
}

@supports (font-variant-position: super) {
  :is(sup, .sup) {
    vertical-align: baseline;
    font-size: 100%;
    line-height: inherit;
    font-variant-position: super;
  }
}
```

`font-variant-position` switches to the font’s own purpose-built sub and superscript glyphs where they exist, resetting `vertical-align`, `font-size`, and `line-height` so they don’t fight against the real glyph’s intended size and position. Most typefaces only include proper numerals rather than letters, so check the specific font before applying this broadly.

## **A note on specificity:** **`:is()`** **and** **`:where()`**

[`:where()` always resolves to zero specificity](https://css-tricks.com/quick-reminder-that-is-and-where-are-basically-the-same-with-one-key-difference/), which is useful for a reset. Every rule here is an opinionated default, and wrapping it in `:where()` lets a project override a property with a plain class.

```
:where(h1, h2, h3, h4, h5, h6) {
  margin-block: 0.5em;
}
```

`:is()` solves a different problem: repetition. The heading selector list appears several times in a typographic stylesheet, and grouping it avoids the risk of forgetting a level.

```
:is(h1, h2, h3, h4, h5, h6), p, blockquote, figcaption, li {
  text-box: trim-both cap alphabetic;
}
```

Unlike `:where()`, `:is()` carries the specificity of its most specific argument.

## **The final** tidy-typography.css

Here’s the complete reset, combining the stable layers. Unsupported declarations are ignored by the browser, so the stylesheet can be adopted gradually.

```
/* ==========================================================================
tidy-typography.css — a modern typography reset
Every rule degrades gracefully in unsupported browsers.
========================================================================== */

html {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-synthesis: none;
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}

body {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

/* ---- Fluid typography ---- */

.article-container {
  container-type: inline-size;
}

:root {
  --step-0: clamp(1rem, 0.9rem + 1cqi, 1.125rem);
  --step-1: clamp(1.25rem, 1.1rem + 1.5cqi, 1.5rem);
  --step-2: clamp(1.6rem, 1.35rem + 2cqi, 2rem);
  --step-3: clamp(2rem, 1.6rem + 3cqi, 2.75rem);
  --step-4: clamp(2.5rem, 1.9rem + 4.5cqi, 4rem);
  --vf-grad: 0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --vf-grad: -50;
  }
}

/* ---- Variable font fine-tuning ---- */

* {
  font-variation-settings: "GRAD" var(--vf-grad, 0);
}

body {
  font-size: var(--step-0);
  font-size-adjust: from-font;
  line-height: 1.6;
  font-optical-sizing: auto;
  font-variant-ligatures: common-ligatures contextual;
  font-kerning: normal;
}

/* ---- Text box trim ---- */

:is(h1, h2, h3, h4, h5, h6), p, blockquote, figcaption, li {
  text-box: trim-both cap alphabetic;
}

/* ---- Text wrap ---- */

:is(h1, h2, h3, h4, h5, h6), blockquote, figcaption {
  text-wrap: balance;
  font-size: var(--step-3);
  line-height: 1.15;
  letter-spacing: -0.01em;
}

h1 {
  font-size: var(--step-4);
}

p, li, dd {
  text-wrap: pretty;
  max-width: 65ch;
  hyphens: auto;
  hyphenate-limit-chars: 6 3 3;
  hyphenate-limit-lines: 2;
  hyphenate-limit-zone: 8%;
  hyphenate-limit-last: always;
}

pre, code, var, samp, kbd, :is(h1, h2, h3, h4, h5, h6) {
  hyphens: manual;
}

blockquote, p {
  hanging-punctuation: first allow-end last;
}

[contenteditable="true"] {
  text-wrap: stable;
}

/* ---- Numeric, emoji, and script-aware text ---- */

table, .tabular {
  font-variant-numeric: tabular-nums lining-nums;
}

.prose {
  font-variant-numeric: oldstyle-nums proportional-nums;
}

.emoji-color {
  font-variant-emoji: emoji;
}

.emoji-mono {
  font-variant-emoji: text;
}

/* ---- Locale-aware quotes ---- */

:where(:lang(en)) > * {
  quotes: '"' '"' "'" "'";
}

:where(:lang(en-GB)) > * {
  quotes: "'" "'" '"' '"';
}

q::before {
  content: open-quote;
}

q::after {
  content: close-quote;
}

/* ---- Native sub and superscripts ---- */

@supports (font-variant-position: sub) {
  sub, .sub {
    vertical-align: baseline;
    font-size: 100%;
    line-height: inherit;
    font-variant-position: sub;
  }
}

@supports (font-variant-position: super) {
  sup, .sup {
    vertical-align: baseline;
    font-size: 100%;
    line-height: inherit;
    font-variant-position: super;
  }
}

/* ---- Ink-aware underlines ---- */

a {
  text-decoration-thickness: from-font;
  text-underline-offset: 0.15em;
  text-decoration-skip-ink: auto;
}
```

## What belongs in a reset

Much of this CSS removes work that used to leak into other parts of a build. `text-wrap` can take over orphan handling from JavaScript, container query units keep a component’s type scale tied to its own width, and `text-box-trim` avoids the negative margins once used to compensate for leading. quotes, font-variant-position, and `font-optical-sizing` hand several smaller details back to the language and the font instead of a collection of one-off fixes.

Browser support will continue to change, especially for `text-wrap` and `text-box-trim`. Unsupported declarations are ignored, but that only helps when the unenhanced typography is acceptable in its own right.

Some of these rules are still too new for a baseline reset. A news article, a marketing page, and an editable product interface do not ask the same things of their text; the set that belongs in yours depends on the font, the content, and the browsers you still need to support.