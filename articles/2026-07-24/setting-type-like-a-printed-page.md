---
title: "Setting type like a printed page"
source: "https://www.carmenansio.com/articles/editorial-typography-css/"
publishedDate: "2026-07-23"
category: "design"
feedName: "Sidebar"
---

My first job as a graphic designer was print, in Barcelona, around 2004: cosmetic catalogues, set in QuarkXPress. Quark handed me every typographic control I could want. Drop caps from a dialog box. Hanging punctuation that pushed the opening quotes out into the margin. Kerning a headline one pair at a time. A baseline grid the whole page snapped to. None of it felt special. It was just how you set a page.

Then I moved to the web, and the browser could do almost none of it. Paste a paragraph into a blank HTML file and it sets it like a ransom note: left aligned, a heading that drops one orphan onto its own line, a widow at the bottom of the block, a quote poking past an edge nobody aligned. Readable. Not set. I built like that for years and told myself it was just how the web worked, because for a long time it genuinely was.

That’s finally changed. Over the last three years the browser quietly grew most of the toolkit I had in Quark, and almost all of it is plain CSS with no JavaScript and no layout library. The catch is that every one of these controls ships **off by default**. The browser will keep setting ransom notes until I tell it not to. Here’s the whole kit on one plate, then each control on its own, most of them wired to a slider so you can feel what they do.

Specimen: Fraunces

## The page remembers what the screen forgot

Type was set by hand for five hundred years before it met a screen, and every convention that survived did so because it made reading easier: the size cut for the size it’s read at, the initial that marks where the eye begins, the flush edge that a compositor nudged into alignment by hand. None of that was decoration. It was the difference between a page you read and a page you decode.

```
.plate {
  font-family: 'Fraunces', serif;
  max-inline-size: 34ch;         /* the measure */
}
.head {
  font-size: clamp(2rem, 1rem + 4vw, 3.25rem);  /* the scale */
  text-wrap: balance;            /* the rag */
  font-optical-sizing: auto;     /* the glyph */
}
.body {
  text-wrap: pretty;             /* the widow */
  hanging-punctuation: first;    /* the flush edge */
}
.body::first-letter {
  -webkit-initial-letter: 3;
  initial-letter: 3;             /* the initial */
}
```

Six controls, one paragraph of CSS, no script. The rest of this piece is that plate taken apart, in the order I’d actually set a page: the size system first, then the headings, then the paragraphs, then the initial, then the shapes of the glyphs themselves, then the flush edge.

## Set the scale, not the sizes

Before any single heading, I decide the sizes as a set. A type scale is a small ladder of sizes with a consistent ratio between them, and on the web it should breathe with the viewport too, so a display size that sings on a laptop doesn’t shout on a phone.

`clamp(MIN, PREFERRED, MAX)` does the whole thing in one value. The browser picks `PREFERRED` but never goes below `MIN` or above `MAX`. Put a viewport unit in the preferred slot and the size becomes fluid between the two bounds. Drag the column narrower and wider and watch each step move, then stop dead at its floor and ceiling:

DisplayHeadingLead paragraphBody copy holds at 1rem

column

380px

```
:root {
  --step-display: clamp(2rem,   1rem + 4vw,   3.5rem);
  --step-h1:      clamp(1.5rem, 0.9rem + 2vw, 2.25rem);
  --step-lead:    clamp(1.1rem, 0.9rem + 0.6vw, 1.35rem);
  /* body stays a flat 1rem: fluid body text hurts more than it helps */
}

h1 { font-size: var(--step-h1); }
.display { font-size: var(--step-display); }
.lead { font-size: var(--step-lead); }
```

The demo drives the scale from the column width with `cqi` (container units) so it can move in place; the shipping code uses `vw` to track the whole viewport. Same idea either way. The part I wish I’d understood earlier is the `1rem + 4vw` in the middle. A bare `vw` value scales purely with the viewport, which zooms badly and breaks on anyone who’s bumped their base font size for a reason. Anchoring the preferred size with a `rem` term keeps it tied to that preference while `vw` adds the fluid stretch. Bigger sizes get more `vw` because they have more room to move; body copy gets none, which is why it sits still while the rest grows.

Set the ladder once as custom properties and every element pulls from the same system. Now the headings.

## Even the rag: `text-wrap: balance`

A headline is the most-read line on the page and, for my money, the one the browser sets worst. Left to itself it fills each line greedily and dumps whatever falls off onto the last line, which is how you get a three-line title with one lonely word sitting under it. In Quark I’d fix that by hand, dropping a line break exactly where I wanted the turn.

`text-wrap: balance` tells the browser to even out the line lengths across the whole block instead. Drag the measure and watch it: the left column ragged and bottom-heavy, the right one re-solving to keep the lines even at every width:

text-wrap: auto

### A headline the browser leaves ragged and bottom-heavy

text-wrap: balance

### A headline the browser leaves ragged and bottom-heavy

measure

24ch

```
h3 {
  max-inline-size: 24ch;
  text-wrap: balance;
}
```

The right column carries roughly the same number of words on each line at any measure, so the shape reads as deliberate rather than accidental. Browsers cap balancing at a handful of lines (six in Chromium) because the layout cost grows with line count, which is exactly why it’s meant for headings, blockquotes, and captions rather than body paragraphs. Reach past that line count and the browser silently falls back to the normal rag, no error, no warning.

Headings handled. Body copy has the opposite problem, and a different property for it.

## Fix the widow: `text-wrap: pretty`

The one that bothers me most in body copy is the widow: a paragraph whose last line is a single short word, dangling under an otherwise full block. `text-wrap: balance` isn’t the fix here, balancing every paragraph would be slow and would make ordinary text look oddly even.

`text-wrap: pretty` is the version tuned for long text. It leaves the bulk of the paragraph alone and only reworks the last few lines to avoid orphans and ugly breaks. Here the left column drops its final word onto a line of its own; the right one pulls a word down to keep it company. Drag the measure and watch where each one breaks:

text-wrap: auto

A paragraph should never let its final word fall alone onto the last line, orphaned from every other word above it.

text-wrap: pretty

A paragraph should never let its final word fall alone onto the last line, orphaned from every other word above it.

measure

32ch

```
p {
  max-inline-size: 32ch;
  text-wrap: pretty;
}
```

The exact break depends on the measure, so what widows at one width won’t at another. That’s the whole point, and it’s why I stopped hand-inserting `&nbsp;`: every one became wrong the moment the column changed. `pretty` re-evaluates continuously instead. Chrome and Safari ship it today; Firefox is the one to check before you lean on it, though since it degrades to a normal rag there’s no harm in setting it everywhere now.

Both `balance` and `pretty` are pure typesetting. The next control is the first one that’s also ornament.

## Drop the initial: `initial-letter`

The drop cap is the first thing I reach for when a page needs to feel like an article instead of a document. It’s also one of the oldest moves in Western typography: medieval scribes enlarged and often reddened the opening letter of a text (the practice called rubrication, from the Latin for red) so the eye could find where reading began on a dense page. It survived into print, and I set my share of them in Quark, and it’s still the single clearest way to say “the article starts here.”

CSS gives you the real thing with `initial-letter`. The value is the number of lines the letter should sink into, and the text flows around it on its own, no manual float, no magic-number `margin` to nudge until it looks right. Drag the depth and watch the cap resize and the paragraph reflow around it:

Rubrication gave the reader a landmark. The enlarged, colored initial was not there to look pretty, though it did. It was wayfinding: on a page with no paragraph breaks and no white space to speak of, the red capital told your eye exactly where the next passage began. The drop cap on the web does the same quiet job, and now it takes one line of CSS instead of a floated span and a fistful of guessed margins.

lines

3

```
p::first-letter {
  -webkit-initial-letter: 3;   /* Safari */
  initial-letter: 3;            /* Chrome */
  font-family: 'Fraunces', serif;
  font-weight: 600;
  color: var(--accent);
  margin-inline-end: 0.1em;
}
```

The honest limit, and the reason I treat this as a flourish and not a foundation: Firefox still doesn’t support `initial-letter` at all. Because it’s applied through `::first-letter`, the fallback is graceful, a Firefox reader sees a normal-sized, colored first letter rather than a broken layout, so it ships as pure progressive enhancement. If the drop cap were load-bearing for the design that would give me pause; as a flourish that quietly disappears where it can’t render, it’s an easy yes.

A drop cap changes the size of one glyph. The next control changes the _shape_ of every glyph, based on the size it’s drawn at.

## Cut the glyph: `font-optical-sizing`

When type was cut in metal, a punchcutter cut every size separately, and they were not scaled copies of each other. Small sizes were cut sturdier: thicker hairlines, more open counters, wider spacing, so they held up at text size. Display sizes were cut with high contrast and fine detail because they’d be seen large. Phototypesetting flattened that: one master drawing, scaled optically, and small text lost the robustness that hand-cut faces had.

This is the feature that made me care about variable fonts in the first place. They bring the size-specific cut back through the `opsz` (optical size) axis, and `font-optical-sizing: auto` tells the browser to drive that axis from the actual rendered size, for free. To see what the axis is really doing, I hold the size constant and drive `opsz` by hand. Drag it from one end to the other and watch the letterforms redraw:

Roman

opsz

9

text cut

```
<span class="specimen">Roman</span>
<input type="range" min="9" max="144" value="9" id="opsz" />
```

```
.specimen {
  font-family: 'Fraunces', serif;
  /* the axis reads straight from a custom property */
  font-variation-settings: 'opsz' var(--opsz, 9);
}
```

```
const specimen = document.querySelector('.specimen');
opsz.addEventListener('input', e => {
  specimen.style.setProperty('--opsz', e.target.value);
});
```

Down at `opsz` 9 the letters are steadier and more even, exactly the sturdier cut a punchcutter would have made for text, the one you’d want at 16px where fine strokes would just fall apart. Push toward 144 and the stroke contrast sharpens and the serifs come to a finer point, the cut meant to be seen large. `font-optical-sizing: auto` is the line I actually ship: it’s on by default in most browsers, costs nothing, and needs a font with an `opsz` axis (Fraunces, Newsreader, Roboto Flex, and a growing list). Force the axis by hand, as above, only when you want a specific cut regardless of size.

Every control so far lives inside the text block. The last one reaches into the margin.

## Flush the edge: `hanging-punctuation`

This is the smallest thing in the piece and the one I notice most in other people’s work when it’s missing. Look at a well-set justified column in a book and the left edge is not actually straight: opening quotes and hanging hyphens sit _outside_ the text block, in the margin, so the letters themselves line up flush. It’s called optical margin alignment, and without it a paragraph that opens on a quotation mark looks subtly indented on its first line even though the numbers say it isn’t.

`hanging-punctuation: first` hangs leading quotes and brackets into the margin. It is one property and it is genuinely the correct tool. It is also, today, Safari only, so the demo pairs the real property with a small negative-indent fallback. Toggle it and watch the quote step out into the margin and the text edge go flush:

“The letters line up now. The quote hangs into the margin and the text edge reads as flush, the way a compositor would have set it.”

hang the quote

```
/* The real property (Safari today) */
p {
  hanging-punctuation: first;
}

/* Portable fallback for the same effect, tuned per opening glyph */
p.quote {
  text-indent: -0.42em;
}
```

The native property is the right long-term answer and the fallback is what I ship everywhere in the meantime. It’s the most compositor-like move in the whole piece: nobody will consciously notice the flush edge, everybody feels the indented one as slightly off.

## What I actually ship

Here’s the whole recipe: set the scale as `clamp()` custom properties, balance every heading, `pretty` every paragraph, and treat the ornamental three, drop cap, optical sizing, and hanging punctuation, as progressive enhancement layered on top. None of it needs JavaScript, and every piece degrades to plain readable text where a browser lags.

Control

Chrome

Firefox

Safari

`clamp()`

79

75

13.1

`text-wrap: balance`

114

121

17.5

`text-wrap: pretty`

117

check

17.5

`initial-letter`

110

✗

9 `-webkit-`

`font-optical-sizing`

79

62

11

`hanging-punctuation`

✗

✗

10

The gaps are real and worth knowing before you lean on any one control, which is why the ornamental three stay optional. But the shape of the toolkit is clear. I had all of this in QuarkXPress in 2004, and I spent the years after assuming the web just wasn’t that kind of medium. It is now. I’m not trying to rebuild print in the browser, I only want a page to look like someone set it, and these days I can hand the browser almost every instruction I used to set by hand, in a stylesheet.