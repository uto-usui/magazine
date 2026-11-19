---
title: "5 CSS Values for Easier Text Styling"
source: "https://blog.master.dev/5-css-values-for-easier-text-styling/"
publishedDate: "2026-11-18"
category: "css"
feedName: "Frontend Masters Blog"
author: "Preethi Sam"
---

In CSS, _properties_ are many, but _values_ are myriad. Between data types, keywords, and functions, there’s a lot to choose from. And sometimes it’s picking the right value that gets the job done, or at least makes it easier. We’ll look into a few such values for tractable text styles in this article.

## 1\. `unset`

When an inheritable property is `unset`, it draws its value from the nearest ancestor, behaving as if the property were set to `inherit`. If no ancestor defines it or the property is not naturally inherited, it takes from the UA defaults (not the UA stylesheet), matching the `initial` value.

That’s why, if it’s about **undoing a current style — set by the author or UA stylesheet — and the value can either come from an ancestor or the UA default**, `unset` is the value we need.

Text elements such as `<h1>`, `<code>`, and `<strong>` carry specific UA styling that differs from the defaults. `<h1>`, for example, uses a large font size and weight.

When we don’t want to keep UA’s styling, we have to override it. For that, however, we don’t always need to give those properties brand new values.

Sometimes, letting them inherit from an ancestor or use the default is better.

`<header>   <h1>Mac</h1>   <!-- ... --> </header> <article>   <h2>MacBook Air</h2>   <!-- ... --> </article> <article>   <h2>MacBook Pro</h2>   <!-- ... --> </article>`Code language: HTML, XML (xml)

`header {   font-weight: 700; } h1, h2, h3 {   /* Default to initial or inherited values */   font-weight: unset; }`Code language: CSS (css)

The headings inside `<header>` inherit the `font-weight` value of `700`, but everywhere else, their `font-weight` value is the default `normal`.

## 2\. `AccentColor`

In CSS, _system colors_ are a set of keywords denoting OS theme colors. They have existed since the late ’90s. They helped sync web designs to the operating system’s aesthetic. Over time, the colors were revamped, and some new additions were made, one of which is `AccentColor`.

In spite of `AccentColor` sounding like a hypernym, I call this “The Standard Blue,” because that’s the color we get by default.

In theory, `AccentColor` is supposed to **return the system’s accent color or the value `of accent-color`, if there is one, and it’s supported by the browser**. But for privacy and security, trackers can’t follow a series of distinct bright yellow checkboxes across multiple websites; browsers don’t use the system’s accent color.

Instead, the browsers set **the standard blue as `AccentColor`**. The standard blue isn’t standardized, but it’s a nice blue.

For a rough prototype design, or a minimalist look that resembles a typical OS appearance, `AccentColor` provides a simple choice.

`summary {   color: AccentColor; }`Code language: CSS (css)

**Note**: If fingerprinting protection is disabled, the browser might return the operating system’s accent color for `AccentColor`.

## 3\. `ch`

Introduced with CSS3, `ch` is a unit called _“character”_ and is of the `<length>` data type. One unit of `ch` takes up space that’s **as wide as the number zero** in a given set of type.

Typically, this is used in tandem with a monospace font, where all glyphs (characters) are of equal width, to set a text input’s width to match the exact number of characters it’s supposed to accept.

`#mobileNumber {   width: 10ch;   font-family: monospace; }`Code language: CSS (css)

If the font is stable, `ch` can also make it easier to decide on a value for style declarations where **the width of the zero glyph gives a nice measure of length to be used**.

For instance, in `text-indent` or `padding`, instead of trying to come up with a pixel value like `6px` or `12px`, a `ch` unit creates a nice indent or padding space for the text. It’s like saying, “make a gap that’s about this many zeros wide.”

`menu {   font-family: Palatino, 'Palatino Linotype';   font-size: 14px;   display: flex;   gap: 1ch; } li {   padding: 2ch;   border-radius: 1ch; }`Code language: CSS (css)

**Note**: The `ex` unit (the height of the lowercase x) can be used similarly for vertical spaces around text.

## 4\. `from`

About two years ago, relative color syntax became widely available across browsers. The keyword `from` was added to all the color functions (including the recently Baseline `alpha()`). It tells the browser to **use the color following that keyword as the base color** and adjust it based on the rest of the function’s parameters.

One amazing thing about this syntax is that we don’t have to provide the base color in the same color space as the function. The `from` color can be provided using **any of the color notations available**.

This makes it easy to build color schemes for background and text.

`strong {   color: rgb(8, 61, 16);   --c: hsl(from currentcolor h s 45);   text-shadow:        1px 1px 0px var(--c),       2px 2px 0px var(--c),       3px 3px 0px currentColor,       4px 4px 0px currentColor,       5px 5px 0px var(--c),       6px 6px 0px var(--c); }`Code language: CSS (css)

## 5\. `revert-layer`

CSS layers are good for organizing code and compartmentalizing modules. When arranged in the right order, we get the right value for a property in the right place.

But under certain circumstances, we want to **drop the value applied in a layer higher in the hierarchy and return to the one in a lower layer**.

For example, we style text to look good, but when printing or for readability, that styling might need to be more basic. Or we set our own default values, then set theme or component values on top of them, and in some elements, the component values need to be removed to fall back to our defaults.

`<article>   <h2>The Pulitzer Prize for Public Service</h2>   <!-- ... -->   <figure>     <blockquote>       <h2>How the World Missed Covid-19's Silent Spread</h2>       <!-- ... -->     </blockquote>     <!-- ... -->   </figure> <!-- ... --> </article>`Code language: HTML, XML (xml)

`@layer base {   /* author default for all headings */   h1, h2, h3, h4 {     font-weight: 500;     font-size:   1em;   } }  @layer feature {   h2 {     /* feature headline */     font-weight: 700;     font-size:   1.2em;   }   blockquote h2 {     /* quote headline */     font-weight: revert-layer;     font-size:   revert-layer;   } }`Code language: CSS (css)

All heading elements were given author-defined default values. The feature styles override those default values, but for a headline inside a blockquote, the style reverts to the author’s defaults.

There are still a lot more such values to explore: `revert`, `system-ui`, `currentColor`, etc. These can help you create and manage text styles and might reduce the need to declare or hardcode many values.