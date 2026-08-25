---
title: "Keeping type consistent in changing conditions"
source: "https://elliotjaystocks.com/blog/keeping-type-consistent"
publishedDate: "2026-08-24"
category: "design"
feedName: "Sidebar"
---

This piece was based on a portion of [my Config talk](https://youtu.be/n0iAYEpU0Fk?si=m8mWEK0GV26HCBoG) and first appeared on [the Adobe Design blog](https://adobe.design/ideas/keeping-type-consistent-in-changing-conditions), edited by my Adobe colleagues Laura Feinstein and Sue Garibaldi. The version below features minor stylistic edits.

Type can often find itself living in less-than-ideal conditions. Ink spreads, screens glow, and letterforms that look perfectly balanced in one context can feel clumsy or heavy in another. **Grade** exists to smooth over those differences by helping text remain consistent even when everything else around it changes.

At first glance, grade might seem very much like weight. But where weight serves to _differentiate_ (adding emphasis and contrast to text), grade’s purpose is to _unify_ (bringing consistency to text that looks different when it shouldn’t). It allows designers to adjust type precisely so that it appears the same across different materials, backgrounds, and lighting conditions without changing spacing, line breaks, or layout. And once you notice the problem grade addresses, it’s hard to not see it everywhere.

### Consistency on light backgrounds, dark backgrounds, and screens

Grade first appeared to make type look as intended with low-quality printing methods or on different paper types. Compare a regular newspaper and a glossy magazine: because ink bleeds into matte stock, the newspaper text appears softer than the same text reproduced on the magazine’s glossy stock — despite being set in the same typefaces and identical font weights. By employing alternate grades of type, some of these imperfections can be anticipated and resolved.

![Four variations of a lowercase letter “e” in a grid, comparing type styles and rendering: In the top row are two smooth digital glyphs labeled “Bennet Text One” and “Bennet Text Four”; beneath them are two printed versions with visible ink spread and texture differences.](https://elliotjaystocks.com/blog/keeping-type-consistent/01.webp)

Bennet Text One (top left) is noticeably lighter than Bennet Text Four (top right). But, due to ink spread, Text One printed on absorbent paper (bottom left) becomes as dark as Text Four printed on high-quality glossy paper (bottom right). Image taken from Yves Peters’ article ”[Inside the fonts: grading Bennet](https://typenetwork.com/articles/inside-the-fonts-grading-bennet),“ published by [Type Network](https://typenetwork.com/).

I first encountered grade while designing our magazine _[Lagom](https://readlagom.com/),_ the magazine I ran with [my wife](https://samanthastocks.com/) from 2014 to 2019. Most of our text was black, printed on a white background (i.e., ink on paper), but some spreads used white text on a dark or image-based background. Because that white text was, of course, the paper showing through, it meant ink bleeding into the white letterforms.

![Two magazine spreads show two articles with contrasting layouts that highlight different typographic treatments across editorial design. On the left, a clean white page titled “A Taste for Tradition” has a centered serif headline and body text; on the right, a darker, image-led page titled “Mixing Work & Play,” consists of large type overlay on a richly colored image of an interior.](https://elliotjaystocks.com/blog/keeping-type-consistent/02.webp)

Pages from the magazine _[Lagom](https://readlagom.com/),_ showing dark text on a light background (left) and light text on a dark background.

To make the light-on-dark text match the dark-on-light text, I used different grades of the superfamily [Tabac](https://www.suitcasetype.com/fonts/tabac/styles), designed by Tomáš Brousil of [Suitcase Type](https://www.suitcasetype.com/).

![Four columns of the same lorem ipsum text set in Tabac Regular at 12/16 pt are shown side by side. Labeled G1 through G4 the grade of each column varies subtly to demonstrate gradual changes in contrast and stroke thickness across otherwise identical text.](https://elliotjaystocks.com/blog/keeping-type-consistent/03.webp)

The four grades of Tomáš Brousil’s typeface [Tabac Regular](https://www.suitcasetype.com/fonts/tabac/styles).

But grade isn’t limited to print. On screens, light type on a dark background appears to ‘bloat’ when compared to seemingly thinner dark type on a light background. Grade helps keep light text on dark backgrounds from looking heavier than it should.

The concept, known as ‘halation’, can degrade [legibility](https://rosap.ntl.bts.gov/view/dot/28555) on illuminated road signage at night or when switching between light and dark modes on a digital screen. If we look closely, in most setups, the same text appears heavier when shown light-on-dark than when shown dark-on-light, due to the halation effect.

![Three versions of a “Highway” sign. On a dark green background, the sign on the far left has crisp white lettering. The second and third signs become progressively blurry with halo effects that make them far less readable.](https://elliotjaystocks.com/blog/keeping-type-consistent/04.webp)

An approximation of legibility decreasing as halation increases: letterforms become bloated, counters disappear, and spacing is reduced.

An approximation of legibility decreasing as halation increases: letterforms become bloated, counters disappear, and spacing is reduced.

Much like uniwidth or multiplexed typefaces (where weight changes don’t affect the width of glyphs), switching between grades won’t cause any reflow in text. For print designers, that means no headaches when performing bulk-replace in Adobe InDesign files; for screen-based designers, it means no UI elements getting pushed out of their neatly stacked boxes.

### Fine control: Grade as a variable axis

Most people won’t notice subtle type changes between light mode and dark mode, but they might notice when a black boxout with white text sits oddly against a surrounding black-on-white design.

We’ve already learned that grade offers a way to counter this effect more subtly than switching between weights. An even finer level of control is available with a grade axis in a variable font — type can be tweaked _ever so slightly_ to ensure consistency across different typesetting contexts. Rather than being limited to a predefined grade value, designers can select anything on the sliding scale between the extremes.

Although it’s from way back in 2020, [Greg Gibson’s article on CSS-Tricks](https://css-tricks.com/using-css-custom-properties-to-adjust-variable-font-weights-in-dark-mode/) is a great resource on this technique.

![Two side-by-side screenshots compare dark text on a light background to light text on a dark background. Each includes a “Grade” slider set to 0 and −92, that shows how reducing type grade lightens strokes and improves legibility of reversed text on screens.](https://elliotjaystocks.com/blog/keeping-type-consistent/05.webp)

Left: On most screens, the light-on-dark text in the boxout appears ever so slightly heavier than the text in the main body of the article. Right: Reducing the grade value to –92, using the `GRAD` variable axis, rebalances the two text blocks.

Grade isn’t an option you can expect to find in most fonts, but when it comes to variable fonts, the custom grade (`GRAD`) axis is becoming increasingly common: there’s SF Pro, the variable version of Apple’s [San Francisco](https://developer.apple.com/fonts/) typeface; Google’s [Roboto Flex](https://fonts.adobe.com/fonts/roboto-flex) and [Roboto Serif](https://fonts.adobe.com/fonts/roboto-serif-variable) variable fonts in the [Adobe Fonts library](https://fonts.adobe.com/fonts); and [Bennet Text](https://fonts.adobe.com/fonts/bennet-text), a static font with grade options.

By compensating for paper, ink, contrast, and light, grade preserves a designer’s intent without disrupting layout or hierarchy. Type without grade tweaks probably won’t look wrong, but when grade is employed, it elevates text and, more importantly, makes it easier to read.