---
title: "The old typography is new again"
source: "https://elliotjaystocks.com/blog/the-old-typography-is-new-again"
publishedDate: "2026-06-10"
category: "design"
feedName: "Sidebar"
---

This piece first appeared on [the Adobe Design blog](https://adobe.design/ideas/the-old-typography-is-new-again) and was edited by my Adobe colleagues Laura Feinstein and Sue Garibaldi. The version below features minor stylistic edits.

Back in the days of metal and wood type, when setting text involved working with actual physical pieces of type, changing font size meant reaching into a different drawer. And the type in each of those drawers wasn’t a scaled version of its neighbour, but a unique design, created for that particular size.

Now imagine holding a small block of metal type in one hand and a large block in the other. The larger type is more expressive, probably with more contrast between its thick and thin strokes. The smaller type is sturdier and simpler, with more consistent stroke widths, larger counters, and a higher x-height to keep it legible.

Those differences weren’t a stylistic flourish, but a physical necessity: At small sizes, ink spreads into counters, hairlines disappear into paper, and closely spaced letters collide. To keep type readable, [punchcutters](https://en.wikipedia.org/wiki/Punchcutting) opened counters, thickened their thinnest strokes, widened spacing, and simplified fine detail. At large sizes, where legibility wasn’t at risk, the same letterforms could afford to be delicate, with more contrast and personality as a result.

![Note the more uniform stroke width and higher bowl of the “a” character in ATF Garamond at 6pt and how that varies as size increases. Image adapted from an original by JAF.](https://elliotjaystocks.com/blog/the-old-typography-is-new-again/01.webp)

Note the more uniform stroke width and higher bowl of the “a” character in ATF Garamond at 6pt and how that varies as size increases. Image adapted from an original by [JAF](https://justanotherfoundry.com/size-specific-adjustments-to-type-designs).

For five centuries, every typeface size was its own unique design. What we now call optical sizing—the practice of adapting a typeface’s design for different sizes to keep it readable—is a modern attempt to preserve that deliberate design choice to honour size-specific type, even though the physical reasons for it no longer apply.

### Optical sizing today

With [phototypesetting](https://www.historyofinformation.com/detail.php?entryid=867), a single master design could be projected through lenses and film at any size, so it became cheaper to release a single design and scale it than to cut each size separately. Digital typesetting inherited that same logic: Font size became a matter of scaling outlines, rather than selecting a different drawing. A 10-point character and a 100-point character were identical shapes, just rendered at different sizes.

![In a font with no optical size corrections, outlines stay in the same places.](https://elliotjaystocks.com/blog/the-old-typography-is-new-again/02.webp)

In a font with no optical size corrections, outlines stay in the same places.

But identical shapes don’t read the same at different sizes. A high-contrast Didone typeface that looks elegant on a book cover becomes fragile when used as a caption. A sturdy text face built for paragraphs looks muted and nondescript when blown up to billboard scale. It’s also worth remembering that a billboard read from across a park, a TV viewed from the sofa, and a phone held at arm’s length can all present type at roughly the same perceived size, even though their font sizes differ wildly. It’s why we should always design for the eye and not just the canvas.

![Lust Didone (top) and Verdana, in both large and small, show that identical shapes don’t read the same at different sizes.](https://elliotjaystocks.com/blog/the-old-typography-is-new-again/03.webp)

[Lust Didone](https://fonts.adobe.com/fonts/lust-didone) (top) and Verdana, in both large and small, show that identical shapes don’t read the same at different sizes.

Today, size-specific type design is finding its way back to the mainstream. In [_Size-specific adjustments to type designs_](https://justanotherfoundry.com/size-specific-adjustments-to-type-designs) ([Just Another Foundry](https://justanotherfoundry.com/), 2014), Shoko Mugikura and Tim Ahrens document the adjustments that shaped 500+ years of metal type printing and make the case for carrying them into digital practice.

Common optical sizes, from largest to smallest, are display, subhead, text, and caption. The larger sizes earn their personality through finer detail, higher contrast, and tighter spacing; the smaller ones earn their legibility through sturdier stems, more open counters, looser spacing, and a higher x-height. If you’ve ever picked a font with “Display” in its name (like [Playfair Display](https://fonts.adobe.com/fonts/playfair)), you’ve already encountered this concept.

![From top to bottom: Three optical sizes of Degular (Degular Display, Degular, and Degular Text), each set at 20pt and 100pt. Adapted from an illustration in Universal Principles of Typography.](https://elliotjaystocks.com/blog/the-old-typography-is-new-again/04.webp)

From top to bottom: Three optical sizes of Degular (Degular Display, Degular, and Degular Text), each set at 20pt and 100pt. Adapted from an illustration in _[Universal Principles of Typography](https://elliotjaystocks.com/books)._

### Optical sizing with variable fonts

Those named sizes are distinct designs, but a variable font with an optical size axis (`opsz`) offers something subtly different: a continuous slider between them, so the design can change gradually as size changes, rather than jumping between fixed steps. Unless turned off in the app’s preferences, Adobe InDesign automatically maps font size to the matching optical size value (60-point maps to 60 on the axis). Figma does the same, with a checkbox for automatic mapping.

![Settings for automatically mapping font size to optical size in Adobe InDesign (left) and Figma.](https://elliotjaystocks.com/blog/the-old-typography-is-new-again/05.webp)

Settings for automatically mapping font size to optical size in Adobe InDesign (left) and Figma.

Most web browsers behave this way, too: A font-size of 60 pixels translates to `opsz: 60` without us needing to do anything. [Relative units like rem](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units#lengths) first get translated to their pixel equivalent, then mapped to the `opsz` axis.

![Typical browser behavior: Font size, defined using a relative unit (such as rem), is translated to a pixel-based value, and then assigned to the optical size axis.](https://elliotjaystocks.com/blog/the-old-typography-is-new-again/06.webp)

Typical browser behaviour: Font size, defined using a relative unit (such as rem), is translated to a pixel-based value, and then assigned to the optical size axis.

But while it’s easy to let the software do the hard work, it’s also possible to take the wheel when you want a little more control. Here my own site, where I use the variable version of [OH no Type Co.'s Degular](https://ohnotype.co/fonts/degular), I turn the automatic mapping off and set optical size deliberately at different viewport widths. In other words, I’m telling the browser that once the screen is wide enough, I want a specific optical size value—not the font size the automatic calculation would’ve provided.

```

@media screen and (min-width: 40rem) {
    font-variation-settings: "opsz" 24;
}
```

I wrote about this at length in _[This site’s type is now variable](https://elliotjaystocks.com/blog/this-sites-type-is-now-variable)._

How precise you need to be with this control depends on what you’re designing, but using variable fonts lets you transition smoothly through different optical sizes. Rather than rely on the more traditional delineations of display, body, etc., you can let the design respond to context.

Several variable fonts in the Adobe Fonts library have an opsz axis, including [Degular](https://fonts.adobe.com/fonts/degular-variable), [Adobe Aldine](https://fonts.adobe.com/fonts/adobe-aldine-variable), [Antonia](https://fonts.adobe.com/fonts/antonia-variable), [Corsario](https://fonts.adobe.com/fonts/corsario-variable), [Gimlet Sans](https://fonts.adobe.com/fonts/gimlet-sans-variable), [Sherborne](https://fonts.adobe.com/fonts/sherborne-variable), [Sole Serif](https://fonts.adobe.com/fonts/sole-serif-variable), and [Zeitung Pro](https://fonts.adobe.com/fonts/zeitung-pro-variable).

![Six variable fonts with an optical size axis, shown at minimum (left) and maximum values. Note how the x-height is consistently higher at the minimum optical size setting (intended for display at small sizes).](https://elliotjaystocks.com/blog/the-old-typography-is-new-again/07.webp)

Six variable fonts with an optical size axis, shown at minimum (left) and maximum values. Note how the x-height is consistently higher at the minimum optical size setting (intended for display at small sizes).

Whether you leave optical sizing to automatic mapping or set it by hand, type feels appropriate to its context: more readable in long prose and more expressive at scale. Understanding this technique can change how we treat our type, even when a selected font doesn’t offer a variable optical size axis.

Good typography rarely announces itself, and optical sizing is a practice where a craft older than the printing press meets the most modern tooling we have. The method that serves the message best is the one worth reaching for.