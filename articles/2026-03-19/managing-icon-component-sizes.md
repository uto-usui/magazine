---
title: "Managing icon component sizes"
source: "https://www.alicepackarddesign.com/blog/managing-icon-component-sizes"
publishedDate: "2026-03-18"
category: "design"
feedName: "Sidebar"
---

Many design systems want to restrict the number of sizes that icons can be used at. Constraints like this are often helpful, as a closed set of sizes gives consumers confidence their designs are adhering to the system's standards.

Though, not every system has this restriction.

But for the ones that do, I see two popular approaches:

-   A <span class="inline-code">size</span> variant property on each icon component.
-   A <span class="inline-code">size</span> variant property on an <span class="figma-component">❖ icon wrapper</span>, with an instance swap property for selecting icon glyphs.

I considered other possible set ups using variable modes and separate components, but quickly dismissed them. I'll explain why before discussing to the two popular approaches above.

## Bad: Using separate components for each icon size

This would look like <span class="figma-component">❖ arrow 12px</span>, <span class="figma-component">❖ arrow 16px</span>, <span class="figma-component">❖ arrow 20px</span>.

In some ways, this set up could make some aspects of managing the icon collection _easier_ for a librarian. Namely, making bulk edits to existing icons.

![](https://cdn.prod.website-files.com/5cc4f221dca80183cc053d1b/69aca1fe8a3346d1c3c3a46d_icon%20find.gif)

Updating 24px size icons to 22px

The downside to this approach primarily lies with the consumer experience. Managing icon sizes as separate components makes the asset panel all the more annoying to use.

If you have 100 icons, and offer 3 sizes, that's 300 icons to sift through. Yes, consumers will likely search for the glyph they want by name, but unlike button hierarchies, they'll see 3 visually identical copies of the glyph they're looking for every single time.

![](https://cdn.prod.website-files.com/5cc4f221dca80183cc053d1b/69aca2abd46f27f86e950698_Screenshot%202026-03-07%20at%205.11.41%E2%80%AFPM.png)

Searching the asset panel with keyword "alarm" returns an overwhelming amount of results

I've played around with Figma's native "select all matching..." feature, as well as various community plugins. But they all struggled with selecting similar but discrete variants across **_multiple_** variant sets.

Removing variants from the equation means bulk selection and manipulation becomes possible (and just barely—I still had to use find and replace to select the icons I wanted in the earlier GIF).

Because this approach makes librarians work easier at the expense of the consumer experience, I consider it non-viable (much like [base components](https://www.alicepackarddesign.com/blog/base-components-are-still-useful-just-not-in-your-ui-library)).

## Also bad: Using variable modes for icon sizes

Picture a variable collection with modes small, default, and large. Then picture a single number variable with values that match each modes name.

That number variable would be applied to the height and width of each icon component. You could even apply it to each icon's minimum and maximum widths if you _really_ wanted to police icon sizing.

For librarians, this approach has similar advantages as the <span class="figma-component">❖ icon wrapper</span> method. It offers a single place to manage icon sizes for every icon in the library.

But is also lets you do some fancier things...

It's not hard to picture boolean variables that show and hide certain parts of the artwork at different sizes. Those small, default, and large modes could be more than just changing dimensions... they can also change the amount of detail displayed.

![houses scale](https://cdn.prod.website-files.com/5cc4f221dca80183cc053d1b/697e6500592b1f1f0e71d113_2-houses.png)

"Shop" icon at 3 different sizes, from Bonnie Kate Wolf's [A Complete Guide to Iconography](https://www.designsystems.com/iconography-guide/)

What's more is you can keep those strokes _live_ and unflattened. If you're worried about preserving color overrides, fear not. I have another [blog post](https://www.alicepackarddesign.com/blog/shape-building-operations-for-icon-components) addressing that.

Consider the SVG layer for the doorknob. To make sure it doesn't show up on smaller modes, it would need a boolean variable applied to it's visibility that is only "true" in the large size mode.

![](https://cdn.prod.website-files.com/5cc4f221dca80183cc053d1b/697e4bfc68fe0f1c1809c9c3_Group%2020.png)

Boolean variables to have pieces of icons shown and hidden across sizemodes

Notice I didn't name the boolean variable "doorknob". That would be too specific to be useful. Instead, I named the variable according to the situation I want to use it in: "_only show this element in this (or these) mode(s)._" That way I could reuse it across other icon glyphs too.

On the consumer end, this could seem like an odd way to use variable modes. Typically modes are applied to whole-mockups for theming, rather than individual elements inside the mockup. Some teams might struggle with this approach, others might find it to be an easy adjustment to adopt.

![](https://cdn.prod.website-files.com/5cc4f221dca80183cc053d1b/69aca4b02afbcb6cf7d19b1e_icon%20size%20w%20modes.gif)

Consumer-experience for adjusting icon size with modes

But even if your consumers are cool with this set up, there's a catch: icons aren't the only components with multiple sizes.

You will be tempted to broaden the scope of the "Icon sizes" variable collection to just be "Sizes" so you can control other elements'—like <span class="figma-component">Button</span>—size using modes too.

![](https://cdn.prod.website-files.com/5cc4f221dca80183cc053d1b/6980aa35ee32d30e99b177bb_Group%2021.png)

a "button-left-padding" number variable in a "Sizes" collection

Look closely at that <span class="inline-code">button-left-padding</span> variable.

Notice that in both "default" and "large" modes it has the same value of 32px. In this example, the system only wants <span class="figma-component">Button</span> to exist at 2 sizes: "small" and "default." We can't leave mode values empty, so the best thing to do for <span class="figma-component">Button</span>'s large mode is to repeat the neighboring value that is "legal". That way if a consumer sets an instance of <span class="figma-component">Button</span> in "large" mode (not allowed), it will look identical to medium (allowed).

Some will want to play devil's advocate... "_Alice, you could get around that by having a "button sizes" collection with 2 size modes, and a "loaders sizes" collection with 4 size modes, etc etc._"

But that will quickly become untennable when you need to nest icons _inside_ of those elements.

Imagine that nested instances of icons need to remain in small mode when <span class="figma-component">Button</span> is in **_both_** small mode or default mode. But in large mode, <span class="figma-component">Button</span>'s icon needs to bump up to default mode.

![](https://cdn.prod.website-files.com/5cc4f221dca80183cc053d1b/698a94f8f8e932fa7f42c050_1*3MU3LU_OKB_YJWrxGByyQw.png)

Buttons of different sizes using Icons at not-necessarily matching sizes, from Nathan Curtis' [Size In Design Systems](https://nathanacurtis.substack.com/p/size-in-design-systems-64f234aec519)

This is not possible to do when you handle size with modes without [component-level variables](https://arc.net/l/quote/ugirxlfk). And so far, my experience tells me these should be avoided.

The number of variables you'd need, and clever aliasing you'd have to do, would get very hairy, very quickly.

Let's pause again. The point of this infrastructure is to **_control_** sizes of various UI elements. That's what we want. But as illustrated above, using modes to handle individual elements sizes does not offer better control than other approaches.

<div class="horizontal-rule"></div>

That covers 2 approaches I do not endorse. Let's move onto 2 that I _do_ recommend.

## Just okay: Icon wrapper components

I first learned about the icon wrapper method from [Ridd](https://www.linkedin.com/in/michaelriddering/) back when he was sharing Figma tips in the early 2020s. This approach caught on and became quite popular among design system folk and Figma nerds.

> The solution...
> 
> Introducing the \`IconWrapper\` 💪
> 
> I simply insert an icon from my icon library and duplicate it once for each of the sizes I need (ex: 16px - 20px - 24px).
> 
> I then turn these into new main components and combine as variants naming it \`IconWrapper\`. [pic.twitter.com/CuuJ8KMGTc](https://t.co/CuuJ8KMGTc)
> 
> — Ridd 🤿 (@ridd\_design) [August 15, 2021](https://twitter.com/ridd_design/status/1426981003424264195?ref_src=twsrc%5Etfw)

What made icon wrappers attractive was they made it easy to manage a closed set of icon sizes—number values—from a single place: an <span class="figma-component">icon wrapper</span> component.

This approach was very much of its era. Base components were also popularized around that same period of time.

Hindsight tells me the popularity of these approaches was borne out of a lack of variables. Back then, the only feature we had for systemizing things were _components_.

But discussed earlier, variables are not the answer here.

The pain that icon wrappers addressed was about _asset management_. These components made managing "size" for icons easier.

Adding a new size? Easy. Changing an existing size? Easy. Deprecating a size? Pretty easy.

But in an age where automation and bulk-editing are getting increasingly easier, **do icon wrappers still have a place in our library files?**

Yes, I think so, but there's more nuance now.

### Why icon wrappers are bad for UI library use

Again, consider building a <span class="figma-component">Button</span>.

If you're a library architect whose library is using <span class="figma-component">icon wrapper</span> to manage icon sizes, you'll nest an instance of it inside of <span class="figma-component">Button</span>.

Why?

Because consistency. <span class="figma-component">icon wrapper</span> is where the system describes what sizes are "allowed" for icons.

So you nest an instance of <span class="figma-component">icon wrapper</span> inside of <span class="figma-component">Button</span>, which itself has 3 sizes (small, medium, and large).

But this is where things become fragile.

To let consumers swap icons, you need to expose the properties on that nested <span class="figma-component">icon wrapper</span> instance. This will reveal both the "size" property" and "icon" property.

![](https://cdn.prod.website-files.com/5cc4f221dca80183cc053d1b/698d3353b8a5e1650f031e39_properties.png)

But remember the image from earlier with the teal buttons... the system likely wants icons within <span class="figma-component">Button</span> to use specific sizes. A "large" icon in a "small" <span class="figma-component">Button</span> is not allowed.

There is a [popular idea](https://forum.figma.com/suggest-a-feature-11/expose-hide-nested-instances-at-component-property-level-24776?tid=24776&fid=11) proposed on the community forum to allow component architects to choose individual properties they want to expose. That kind of granularity would resolve this issue. But this seems like a complicated feature to release. Some properties are inter-dependent (see Nathan Curtis' "[The Sorry State of States](https://nathanacurtis.substack.com/p/the-sorry-state-of-states-89dd4668737e)" article). If changing one prop reveals, hides, or changes other props, how would this feature work?

I think it's best to not put our eggs in that basket. Let's focus on what we _can_ control, with existing features.

Pesky "size" property aside, this approach limits the design system from using other quality of life features across icon-having elements. Namely, preferred swaps.

<span class="figma-component">icon wrapper</span>'s "icon" property must offer _every_ icon for it to be useful. This is bad news if the system only wants certain icon glyphs to be used in <span class="figma-component">Button</span>, or any other element using <span class="figma-component">icon wrapper</span>.

Perhaps this is less problematic for <span class="figma-component">Button</span>, but more so for <span class="figma-component">Rich text button</span> that only wants icons like <span class="figma-component">Bold</span>, <span class="figma-component">Align-left</span>, <span class="figma-component">Underline</span>, and <span class="figma-component">Paperclip</span>.

## Better: "Size" variant property on each icon component

I've [written](https://www.alicepackarddesign.com/blog/how-to-rescue-your-figma-file-from-the-depths-of-hell) [at](https://www.alicepackarddesign.com/blog/placeholders-are-for-people-who-know-trying-to-predict-the-future-is-a-losing-game) [length](https://www.alicepackarddesign.com/blog/reasons-to-use-variables-for-validation-styling) about how costly variant properties are, but considering aaallll of the above, I believe they're our best bet for managing "size" as a property (icons or otherwise).

![](https://cdn.prod.website-files.com/5cc4f221dca80183cc053d1b/698d35db46034380c4491d2a_Screenshot%202026-02-11%20at%209.07.03%E2%80%AFPM.png)

"folder star" icon component with 6 sizes

Having the "size" property exist on every icon component delivers a better experience to consumers:

-   You can expose an icon instance's "size" property _when appropriate_, rather than being forced to (like with the icon wrapper method). This reinforces the idea that if a consumer sees a property, they are allowed to configure it to their needs.
-   Components that use icons can own their own "icon" property that lets consumers change icon glyphs. This also allows component architects to set perferred swaps tuned to that specific element (eg. <span class="figma-component">Rich text buttons</span>)
-   Going back to the first benefit, mismatched sizing between icons and a parent element no longer pose a problem. If small and medium size <span class="figma-component">Button</span>s use small icons, but large <span class="Button">Rich text buttons</span>s use medium icons, that's all fine. And consumers don't have to be burdened with

But this method comes with a cost.

It is more effort to manage a "size" property across hundreds of icons. Adding a new size, changing an existing one, or removing a size, are all going to be moderately effortful. I tried looking for a reliable plugin, but came up empty.

But I'm hopeful that new technology will make those tasks easier. Folks who are using [TJ Pitre / SouthLeft's Figma Console MCP](https://github.com/southleft/figma-console-mcp) (I am not, as of writing this) may be able to get help writing a script that assists with those tasks. I will try this myself (soon, hopefully). I'll update this post when I learn more.

## Best (maybe??)... faking an icon font?!

I also have an idea of using a hidden text layer inside of each icon, and controlling the icon's size by adjusting that text layer's type style..... but again, I need time to play with that. And I'd rather not hold up publishing post. So I'll leave it as a teaser for now. Maybe you'll try it before me! If you do, tell me what you learn. Happy to credit folks in future updates to this post.