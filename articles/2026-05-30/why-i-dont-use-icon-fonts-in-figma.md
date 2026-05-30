---
title: "Why I don’t use icon fonts in Figma"
source: "https://www.alicepackarddesign.com/blog/why-i-don-t-use-icon-fonts"
publishedDate: "2026-05-28"
category: "design"
feedName: "Sidebar"
---

## 1) Getting glyphs into text layers is cumbersome

Getting an icon into Figma takes a lot of work. [Figma's own docs](https://help.figma.com/hc/en-us/articles/360040449513-Use-icon-fonts#h_01JADBHFYNM9E85E7RVS1GJQ2N) (which use Font Awesome as an example) describe this as a 7-step process. The worst of which involve leaving Figma to go to FA's website... browsing their collection of glyphs, selecting the right one (which opens a modal—ouch)... copying a teeny tiny inline rendering of that icon to your clipboard... and coming back to your text layer in Figma to paste it in. Woof.

It'd be great if [FA's official Figma plugin](https://www.figma.com/community/plugin/1283461555078380603) let you copy the font-based glyph to your keyboard to paste into your text layer. That would reduce the context switching and feel a lot faster.

But that's not the case. When you select an icon in FA's plugin, it places it on the canvas as an SVG path inside of a frame.

![](https://cdn.prod.website-files.com/5cc4f221dca80183cc053d1b/6a1455de59bf88a1d19b1e52_fa%20figma%20plugin.gif)

FA's plugin biases toward SVG paths, and away from icon fonts. Kinda funny!

Google's official [Material Icons Figma plugin](https://www.figma.com/community/plugin/1088610476491668236/material-symbols) behaves the same way.

If I was working with SVG paths that were stored as components, I could just pull instances directly into my designs.

## 2) No visual previews, and memorizing icon names

While I couldn't pull this off with FA-6's free collection, I could with Material's icon font: rendering the icon in my text layer by manually typing the glyph name:

![](https://cdn.prod.website-files.com/5cc4f221dca80183cc053d1b/6a145aafc0911dd6110e6e7e_material%20icon%20typing.gif)

manually typing glyph names using the Material icon font in Figma

There's something about this workflow that feels faster and more satisfying than the one above. But that doesn't mean it's great. For this to work, I'd have to memorize the exact names of glyphs. When I want a glyph I don't have memorized, I still have to use either the font-creator's plugin, or a gallery on an official website to browse my options and learn new icons' names.

If I was working with SVGs stored as main components, I'd get the visual previews and have "fuzzy search" available via keywords stored in the component descriptions. What's more, those keywords are mine (or my design system's) to control.

I mean, just look at the difference in experience for overriding icons within a component:

![](https://cdn.prod.website-files.com/5cc4f221dca80183cc053d1b/6a146c7c3913b0c18e62d89f_instance%20swap%20vs%20text%20string.gif)

GIF demonstrating how easy instance swapping is compared to typing an icon name

I couldn't be bothered to figure out why typing the _exact_ icon name failed in the example above. The risk of mis-typing something is just too great... subjecting design system consumers to memorizing icon names like this is just plain bad.

## 3) Comparing glyphs' artwork is tedious

A downside I see here is a creativity trap. Because the names must be exact, and because any one person can only be expected to memorize so many exact icon names, the world of possibility shrinks. Depending on your goals as a designer, this can be a big hinderance. 

If you're expected to explore, go wide, and produce lots of visual artifacts to compare against each other, this workflow... sucks! It's just as cumbersome as the first one, but you also have to contend with actively-fighting the urge to "just pick an icon you've already memorized the name of" because that's faster and has less friction than going out to source a new glyph.

To _truly_ get two or more glyphs to sit side-by-side, you have to render them in Figma. In this example, I'm interested in comparing Material's <span class="inline-code">arrow\_back\_2</span> with <span class="inline-code">arrow\_left</span>. Filtering their gallery by the word "arrow" still pulls up other relevant results around and between these glyphs.

![](https://cdn.prod.website-files.com/5cc4f221dca80183cc053d1b/6a145d52346074da80e266da_arrow%20comparison.png)

Filtering Material icons by the word "arrow"

Spatially, they're too far apart to adequately compare them. To do that, I'd have to render these in Figma.

Comparing this to SVGs stored as main components, I'd say the same thing I did in the first point: I could simply pull instances directly onto the canvas to compare them.

## 4) Editing glyph-artwork is hard

Have you ever made a font? And I mean _really_ making a font... like, pulling on handles and creating curves. You'd do this in software like [FontLab](https://www.fontlab.com/), or [FontForge](https://fontforge.org/en-US/).

If your icons exist as a font, you might use that software to edit your icons. And font-editing tools will absolutely have a learning curve to them.

But maybe that's overkill. 

Perhaps you'd rather edit the paths in a tool like Illustrator or Figma, export the SVGs, and then generate your icon font using something like [FontCustom](https://github.com/FontCustom/fontcustom) or [Fontello](https://fontello.com/). But even FontCustom's README file suggests... not using an icon font at all!

![](https://cdn.prod.website-files.com/5cc4f221dca80183cc053d1b/6a146076ae66fc5cd0d9443e_Screenshot%202026-05-25%20at%2010.44.58%E2%80%AFAM.png)

FontCustom's README warning people to use alternative solutions

And this includes **adding new icons** to the set. It happens! Even when you're using a popular collection with over a thousand icons, eventually the need for something custom will arise.

Adding that custom glyph is a lot easier to do when everything is managed in Figma as main components.

## 5) Sharing fonts is annoying

Once you've got things installed, you're fine. But it never lasts forever because... we live in a society! You're going to change jobs. You'll have to re-install the font on your new work machine. Or, a new colleague will join your team. They'll ask, "hey, can someone get me the font file?" This is assuming you're using an icon font that's not free and already available via google fonts.

If you're lucky to be on [Figma's organization plan](https://help.figma.com/hc/en-us/articles/360052679454-Access-shared-resources-in-an-organization#h_01HFW5QSM2GEF0S7WN48Q93X9E), you can install the fonts within Figma and folks don't have to fiddle with installing anything. But you might not have permissions to do that. In that case, it's up to whoever is managing your company's Figma account to do this—let's hope they do!

But when your icons are stored as main components, designers have a lot more control over how those assets get shared among teams.

## 6) No option for multi-color

Developers can achieve this outside of Figma, but inside Figma, it's not an option. If you're using an icon font with a duotone "weight" option, you _can_ get duotone icon fonts in Figma, but **not** multi-color.

How does one achieve multi-color icon artwork in Figma? SVG paths stored as main components, of course, but how do you contend with color overrides? I've written about that in another blog post.

## 7) My devs don't use icon fonts

And it seems like most don't. They haven't for a while. This [CSS tricks post](https://css-tricks.com/icon-fonts-vs-svg/) from 2014 offers a lot of good reasons to use SVGs instead.

This post I've written is the Figma-version of that post, I suppose!

<div class="horizontal-rule"></div>

My argument is that in Figma, it is better for icons to be stored as SVG paths, within individual main component frames, rather than rendering icons in text layers using an icon font.

The one big advantage icon fonts in Figma have over component instances is the ability to be placed in-line with other font families:

![](https://cdn.prod.website-files.com/5cc4f221dca80183cc053d1b/6a146655b4ddd877b53305dc_inline%20icon.gif)

A text layer using inter and Material's icon font

However, this text layer isn't very design system friendly. It's a mix of two font families on the same layer: Inter and Material icons.

![](https://cdn.prod.website-files.com/5cc4f221dca80183cc053d1b/6a146825bbbcb17059d47f0d_inline%20icon2.gif)

Mixed font families on the same text layer.

That means you can't connect to variables, or text styles. My hope is one day Figma will introduce <span class="inline-code">span</span>, or something like it (one of my wish-list items).

Even though icons as component instances can't do that nice in-line text-wrapping behavior, I think the pros far outweigh the cons. There's still, of course, questions that come with my preferred approach: "_How do I manage different icon sizes?_" and "_should I flatten my SVG paths into a single layer?_"

Good news, I've written about both of those topics ([managing icon size](https://www.alicepackarddesign.com/blog/managing-icon-component-sizes), and [outline VS stroke artwork](https://www.alicepackarddesign.com/blog/live-strokes-vs-flattened-paths-for-figma-icons)).