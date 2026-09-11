---
title: "Kugiri (区切り)"
source: "https://edoardolunardi.github.io/kugiri/"
publishedDate: "2026-09-11"
category: "design"
feedName: "Sidebar"
---

## Lines

### Single line

One line, one mask. Nothing to wrap.

### Set in metal, read on glass

### Balance + authored break

text-wrap: balance evens the lines and the newline is a forced break. A balanced line fits with no slack, so any splitter that widens words flips it.

### Five centuries of setting type by hand and still arguing about the spacing

### Ragged, no balance

Same copy, browser rag. Each line runs to the right edge.

### Five centuries of setting type by hand and still arguing about the spacing

### text-wrap: pretty

No orphan on the last line. The split must not reintroduce one.

### Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped.

### Paragraph at the measure

Body copy capped at 60ch. Ordinary wrapping.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped.

### Inline marks across lines

A link, strong, em, a superscript and a coloured span, some wrapping mid-element. No empty clones; the link stays one tab stop per line.

Type is not a silent thing. Every letter was **drawn, cut and cast by a hand** that argued with _the one before it_, and it is [the space between the letters, not any single glyph, that decides whether a page](#inline-marks) is read or skipped1. Colour marks wrap like any other span.

### Explicit <br>

Two br tags, three lines, whatever the width.

### Set in metal  
proofed on paper  
read on glass

### Leading tighter than the glyph boxes

Display type set at 0.85, one word a row, each starting where the last did: every row overlaps the next by a few pixels. Still three lines.

### Groundbreaking  
International  
Awards

### Leading tighter than the glyphs, masks with reach

Display type at 0.85 with descenders on every row. The clip reaches .25em past each line box, so the tails of g, y and p ride up with their line instead of being cut until the clip drops. Nothing moves.

### Typography  
judged by eye  
page by page

### pre-line with a blank line

A paragraph break inside one target: the empty line stays empty.

A first paragraph of the specimen, written as text. A second one after a blank line, which pre-line keeps.

### pre-wrap, double spaces

Runs of spaces survive. Still wraps at the measure.

Two spaces between words, three here, and a newline, the way a typewriter would set them. The rest of this sentence is long enough to wrap at the measure.

### Centered and right aligned

Alignment is inherited by the line blocks, so the rag stays where it was.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters that decides whether a page is read or skipped.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters that decides whether a page is read or skipped.

### Justified

Word spacing stretches per line; the last line stays ragged. Each line block gets text-align-last so the stretch survives the cut.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped.

### Narrow column

Many short lines. The stagger should not drag.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped.

### Tracked uppercase label

Letter-spacing and uppercase. Widths must match the pre-split paint.

A tracked uppercase running head that goes on long enough to wrap twice in a narrow box

### Small caps

A synthesized variant. Same widths before and after.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it.

## Words and characters

### split=words

Each word rises under its own mask, inside lines that keep the paint. Punctuation stays with its word.

### Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped.

### split=chars

Every grapheme is a unit, emoji included. Kerning between letters is lost; that is inherent to a char split.

### Hand-set AVATAR in metal 🖋️ with WAVY kerning to match

### split=words, mask=lines

Words are the units, lines are the wrappers: each word rises from under its line's clip.

### Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters that decides whether a page is read or skipped.

### split=lines, mask=none

No wrappers at all: the line blocks rise and fade in the open.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters that decides whether a page is read or skipped.

### CSS-only reveal

No script animation: the target is split into words and gets data-revealed; the stylesheet staggers off the --word index the split wrote.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped.

## Links

### Underlined link across lines

A solid underline through a link that wraps. Each line's clone keeps the rule; no gap at the cut.

Read the [full account of how a punchcutter turns a pencil sketch into a steel punch and what that means for the face on the page](#link-lines) before the specimen sheet.

### Underlined link, split=words

Words are inline-blocks, which a decoration never reaches. Every word carries the rule itself and follows the hover colour.

Read the [full account of how a punchcutter turns a pencil sketch into a steel punch](#link-words) before the specimen sheet.

### Underlined link, split=chars

Same rule per grapheme. Hover the link: the whole rule changes colour together.

### [A heading set entirely as a link](#link-chars)

### Marks inside a link, split=words

The underline is declared on the link, the words sit inside em and strong. The chain in between inherits, so the rule survives.

Every [_specimen sheet_ shows the face in **bold and italic at once** and in colour](#link-nested) before anyone buys it.

### Target inside a link, split=words

The decoration is declared above the target. The target takes it as its own, so the words still draw it.

## Rich content

### Rich text, anything inside

Headings, paragraphs, list items and the citation split per painted line inside their own blocks; the media tile, the button row and the table are not text, so they are left exactly where they are and are not units.

### A specimen with everything in it

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped.

1.  Numbered items keep their numbers, because each item is split inside itself.
2.  The second item wraps if the column is narrow enough, which on a phone it is, and keeps its number too.
3.  Third.

Face

Garamond

Body

11 pt

> Type is a beautiful group of letters, not a group of beautiful letters.
> 
> Matthew Carter

### ignore selector, words

The chip and the footnote mark are never wrapped or counted; the words around them still are.

Letterpress sits next to offset litho in the pressroom2, and both print the same face, which is why the chip has to travel with its line.

### Inline-block chip in the copy

An atomic inline box in the flow. It cannot break inside, and wraps as a unit.

Letterpress sits next to offset litho in the pressroom, and both print the same face, which is why the chip has to travel with its line.

### Inline icon mid-sentence

An SVG is not text. It rides along on its line and is never pruned as an empty element.

Open the specimen and then the type catalogue which wraps this sentence past the measure.

### Custom elements inline

An inline custom element wraps like any inline element, so it is cut into like one; an inline-block custom element is a box of its own and stays one piece.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the spacing that decides whether a page is read or skipped.

### Hidden content (closed details)

The paragraph splits. The summary is a box of its own (its caret is inline content on its first line) and the closed body is hidden: neither is text to split, so both are left exactly as they are and are not units, and opening the note later shows plain copy.

A specimen sheet shows the face at every size it is cast in, with a note on the casting folded away under it.

A note on the casting of this face, long enough to wrap onto a second line when the measure is narrow

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it.

## Breaking inside words

### Unbreakable word, overflow-wrap

The browser breaks inside the word (overflow-wrap: anywhere). The cut lands inside the word, exactly where the paint broke it.

Reference https://www.example.org/specimens/very-long-slug-that-never-ends-and-keeps-going-until-the-box-gives-up and the compositor's dread, Pneumonoultramicroscopicsilicovolcanoconiosis.

### hyphens: auto

The browser hyphenates long words at the line end. The split keeps the break and restates the hyphen the browser drew.

Typographical characterisation of letterform irregularities demands extraordinarily conscientious punchcutters.

### hyphens: auto, split=words

A word broken across two lines becomes two units, the first ending in the drawn hyphen.

Typographical characterisation of letterform irregularities demands extraordinarily conscientious punchcutters.

### Soft hyphens and <wbr>

Manual break opportunities. A soft hyphen the browser used shows its hyphen; a wbr is never a piece.

Typo­graphical charac­terisation of letter­form irregu­larities demands extraordinarily conscientious punchcutters.

## Scripts

### Right-to-left (Arabic)

Lines wrap from the right. The rag sits on the left and the reveal order follows the reading order.

الحروف ليست شيئًا صامتًا. كل حرف رُسم وقُطع وصُبّ بيدٍ جادلت اليد التي سبقتها، وما يقرر إن كانت الصفحة ستُقرأ أم تُتجاوز هو المسافة بين الحروف، لا أي حرف بمفرده.

### No spaces (Japanese)

The browser wraps between characters. The segmenter finds the words, so a word split works too.

活字は黙っているものではありません。どの文字も、前の職人と言い争った手によって描かれ、彫られ、鋳造されました。ページが読まれるか飛ばされるかを決めるのは、どれか一つの字形ではなく、文字と文字のあいだの空間なのです。

### Japanese, split=words

Word units without a single space in the source.

活字は黙っているものではありません。どの文字も、前の職人と言い争った手によって描かれ、彫られ、鋳造されました。

### Emoji and combining marks

Grapheme clusters stay whole across the split.

Press notes 🧑‍🎨🖋️ with a flag 🇯🇵, a skin tone 👍🏽, café naïve résumé, and Zürich, all wrapping once the sentence is long enough to need it.

### Ruby annotations

Ruby is inline-level and owns its base and annotation: one piece per ruby, never cut inside.

活版かっぱん印刷は十五世紀の欧州おうしゅうで広まり、書物の姿を大きく変えました。

### Vertical writing mode

writing-mode: vertical-rl. Lines are columns read right to left; the line blocks stack the same way.

活字は黙っているものではありません。どの文字も、前の職人と言い争った手によって描かれ、彫られ、鋳造されました。ページが読まれるかどうかを決めるのは、文字のあいだの空間なのです。

## First letter, floats and columns

### ::first-letter

A large first letter styled by the pseudo-element. It must still apply to the first line block, and the lines must not move.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped.

### Drop cap (floated ::first-letter)

The first letter floats and the first lines wrap around it. The floated glyph is put in front of the first line block like any float, so no mask clips it and the reveal never moves it; the lines after it must still be shortened by it.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped.

### Drop cap, split=words

The first word is measured without its floated glyph, so the rest of the word keeps its painted width and the line does not shift.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped.

### Drop cap, split=chars

The glyph leaves its char unit to float in front of the first line block, and that unit goes with it; the graphemes after it keep their painted extents.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it.

### ::first-line

The first line is bold, uppercase and tracked. Its width is what it was, and the second line is plain.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped.

### text-indent

Only the first line is indented. Every line is a block now, so the ones after the first must be told not to indent.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped.

### Float at the start

A floated thumbnail before the text. It is not text, so it is not a unit and the reveal never moves it: it is put back in front of the first line block, which the lines after it are shortened by exactly as they were.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped. A second sentence so the copy runs past the float and back to the full measure.

### Float mid-paragraph, words

A right float placed after the first sentence. It is put back in front of the line it floated beside, untouched by the reveal; the words around it split as painted.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped. A second sentence so the copy runs past the float.

### Multi-column

columns: 2. The last line of column one and the first of column two are different lines, though the second sits higher on the page.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped. A second sentence so both columns have several lines to fill.

## Scale

### Batch: three targets, one call

Three paragraphs passed to one call as an array. All three are planned before any is written, so together they cost the one layout a single paragraph does, and the hyphen the middle one breaks on is restated once every cut is made. Each must still split exactly as painted.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped.

Typographical characterisation of letterform irregularities demands extraordinarily conscientious punchcutters.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped.

### Stress: about 220 words

One target, many lines. Watch the split cost in the panel.

Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped. Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped. Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped. Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped. Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped. Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it, and it is the space between the letters, not any single glyph, that decides whether a page is read or skipped.

### Scaled by an ancestor

The heading sits in a wrapper scaled to half. Rects are measured at that scale, units are written unscaled; every box must still tile the paint.

### Type is not a silent thing. Every letter was drawn, cut and cast by a hand that argued with the one before it.