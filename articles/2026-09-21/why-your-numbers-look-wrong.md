---
title: "Why your numbers look wrong"
source: "https://www.carmenansio.com/articles/opentype-features-css/"
publishedDate: "2026-09-18"
category: "design"
feedName: "Sidebar"
---

You build a dashboard. The data is correct, the layout is clean, and the numbers still look subtly off. When a figure updates, the whole row twitches sideways. A column of totals that should stack into a neat edge comes out ragged. A year sitting in a sentence stands a head taller than the words around it, like it’s shouting. And `1/2` in a spec comes out looking like a division sum.

None of that is your CSS, and none of it is the data. It’s the numbers the font hands you by default, which are cut to be seen big and loud, in a headline or a logo. The font almost always contains a second set built for exactly the job a dashboard does, and a browser will keep them switched off until you ask for them by name. Here’s the whole kit on one card, then each switch on its own.

Account summary

Gross volume

1,284,905.20

Refunds

111,190.75

Net

1,173,714.45

Settled in 3 batches on the 24th, 1/2 point above par.

```
.summary { font-family: 'Source Serif 4', serif; }

.summary .head   { font-variant-caps: small-caps; }        /* the label, sat down */
.summary .amount { font-variant-numeric: tabular-nums; }   /* one width, columns align */
.summary .note   { font-variant-numeric: oldstyle-nums; }  /* figures sit in the sentence */
.summary .qty    { font-variant-numeric: diagonal-fractions; }  /* a real half, scoped */
```

The header is small caps, the amounts are tabular, the footnote runs on old-style figures, and the half is a real fraction. Four switches, one block of CSS, no JavaScript, and all four were already in the font. The rest of this takes them one at a time, starting with the one you feel most in a product.

## Numbers that hold still: `tabular-nums`

By default, digits are spaced like letters: a `1` takes less room than a `0`, the way an `i` takes less than an `m`. That proportional spacing is right in a sentence and wrong the instant numbers have to line up or change in place. In a table the columns come out ragged, and in anything live the value jumps every time it ticks, because the new digits aren’t the same width as the old ones.

`tabular-nums` gives every digit one fixed width. The shapes don’t change, they just each sit in an identical slot, so columns stack into a clean edge and an updating number stops moving. Here’s a totals column. Flip the switch and watch the digits snap into vertical lanes:

Gross

1,284,905.20

Refunds

111,190.75

Net

1,173,714.45

Fees

40,918.00

tabular figures

```
/* every figure in the column */
.amount {
  font-variant-numeric: tabular-nums;   /* every digit one width */
  text-align: right;
}
```

The updating case is worse, because you watch it happen. Here’s a running clock down to hundredths. Off, it twitches sideways on nearly every frame as the digits change width. Throw the switch and it locks in place:

0:00.00

tabular figures

```
.timer { font-variant-numeric: tabular-nums; }
```

```
// anything that updates in place wants this:
// a timer, a stat counter, a price that streams, a leaderboard.
// without it the layout dances on every tick.
```

This is the one I reach for most. When the product moves money, the numbers are the interface, and a total that jumps when it refreshes or a column that doesn’t align reads as broken long before anyone can say why. It’s one declaration on every figure that lives in a table, a stat tile, or a counter, and it costs nothing. Set it and forget it there.

Tabular figures are the right call for the grid. Drop them into a sentence, though, and they’re back to shouting. That’s the next switch.

## Numbers that don’t shout: `oldstyle-nums`

The default digits, lining figures, are all one height and aligned to the caps. That’s what you want in a big stat where the number is the whole point. In running text, or in a small label next to the data, they behave like a run of capital letters dropped into the middle of a sentence: too tall, too even, and the eye catches on them instead of reading.

Old-style figures have ascenders and descenders, like lowercase letters. The 6 and 8 rise, the 3, 4, 5, 7 and 9 drop below the baseline, and the whole run settles into the line. Throw the switch and watch the numbers stop jumping out:

Processed 12,480 payments across 37 countries on the 24th, with 208 disputes opened and 3 still in review.

old-style figures

```
/* lining figures (the default) shout in running text */
p { font-variant-numeric: oldstyle-nums; }   /* they sit in the line instead */
```

So the rule pairs with the last one: old-style in the sentences and small labels, lining and tabular in the big stat and the table. It’s the single change that does the most to make a paragraph of copy read like it was set rather than typed. The catch is the font has to actually carry the figures, and that’s what cost me an afternoon once.

Most fonts on Google Fonts don’t carry these features at all. The variable-font build strips old-style figures, fractions and small caps out to save bytes, so you set `oldstyle-nums`, nothing happens, and you assume you got the syntax wrong. You didn’t. The glyphs just aren’t in the file the CDN handed you. The fix is to self-host the full font, which is exactly what this page does: the type in every demo here is a self-hosted Source Serif with its features left in.

## Fractions that aren’t division: `diagonal-fractions`

Type `1/2` and you get three characters on the baseline: a one, a slash, a two, sitting there like a sum. In a spec sheet or a pricing page it looks like something the layout forgot to finish, and it bugs me every time I catch it. The font carries proper fraction glyphs, a raised numerator over a lowered denominator on a true diagonal, and there’s a switch that builds them from the digits you already typed:

-   1/2 point over the base rate
-   3/4 of accounts on annual billing
-   2 1/3 days average payout time

diagonal fractions

```
<!-- typed as plain digits and a slash -->
<li><span class="qty">2 1/3</span> days average payout time</li>
```

```
.qty { font-variant-numeric: diagonal-fractions; }   /* the font builds the fraction */
```

Scope it to the quantity, not the whole line. `diagonal-fractions` will fold any slash-separated pair into a fraction, so a date like 24/9 or a ratio you meant to keep flat gets caught too. Wrap the numbers that are really fractions in a span and leave the rest of the sentence alone. The whole number in front of a fraction, like the `2` in `2 1/3`, correctly stays full size.

## The labels around the numbers: `small-caps`

Numbers never sit alone. They come with labels, units, and acronyms: `USD`, `MRR`, a column header, a status. Set those in full capitals and they shout as loudly as the data they’re meant to quietly annotate. Small caps are capital letterforms cut down to about the height of the lowercase, and they’re the right way to set a label so it stops competing with the numbers next to it.

Almost everyone fakes them, and I’ve built the fake more than once: take the text, uppercase it, and shrink it with `font-size`. It looks fine in a mockup and wrong next to real type, because shrinking a capital takes its stroke weight down with it, so faux small caps come out spindly and pale. Real small caps are drawn at their size with the weight kept. Throw the switch and watch the strokes fill back in:

Net volume, settled daily in USD

real small caps

```
/* the fake: shrunk capitals, strokes go thin with them */
.label-faux {
  text-transform: uppercase;
  font-size: 0.72em;
}

/* the real thing: glyphs drawn at small-cap size, weight kept */
.label {
  font-variant-caps: small-caps;
}
```

If the font has no real small caps the browser synthesises them, which lands you right back at the shrunk version, so this is another one that wants a face with the glyphs actually drawn in.

## Where each switch goes

For anything with numbers in it, the recipe is short. `tabular-nums` on every figure in a table, a stat tile, or a counter. `oldstyle-nums` on numbers inside running text and small labels. `diagonal-fractions` scoped to the fractions. `small-caps` on the labels and units around the data. It’s all `font-variant-numeric` and `font-variant-caps`, one line per switch, no JavaScript, and everything falls back to plain readable digits where a font is missing the glyphs.

These have worked in every engine for years, so there’s no browser reason left to run the loud default:

Switch

Chrome

Firefox

Safari

`font-variant-numeric: tabular-nums`

52

34

9.1

`font-variant-numeric: oldstyle-nums`

52

34

9.1

`font-variant-numeric: diagonal-fractions`

52

34

9.1

`font-variant-caps: small-caps`

52

34

9.1

The only thing between most dashboards and numbers that read right is a font that kept its figures and four lines asking for them. If you want the page-level companion to this, setting the whole block rather than the digits, that’s [the last piece on setting type like a printed page](https://www.carmenansio.com/articles/editorial-typography-css).