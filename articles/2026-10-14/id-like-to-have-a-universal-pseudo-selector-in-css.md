---
title: "I’d like to have a universal pseudo selector in CSS"
source: "https://kilianvalkhof.com/2026/css-html/id-like-to-have-a-universal-pseudo-selector-in-css/"
publishedDate: "2026-10-08"
category: "frontend"
feedName: "Kilian Valkhof"
author: "Kilian Valkhof"
---

## I’d like to have a universal pseudo selector in CSS

[CSS & HTML](https://kilianvalkhof.com/category/css-html/), 8 October 2026, 2 minute read

Last week, I wasted about an hour of my time figuring out why a certain element had different dimensions than the same element elsewhere in the DOM. It had the same CSS and the same defined width and height, but it still rendered differently.

Yes, it was `box-sizing`.

Of course it was `box-sizing`. I immediately realized after looking at it for an hour.

## Global box-sizing [#](#global-box-sizing)

Like many other developers, this is how I handle box sizing:

```
*,
::before,
::after {
  box-sizing: border-box;
}
```

Turns out that code block has a pretty significant missing _detail_. The pertinent difference between the two elements above is that one of them was in a `<details>` element. More specifically, it was in the `::details-content`.

Now, `::details-content` isn’t an element, it’s a _pseudo-element_. And that means that `*` doesn’t apply to it. And even though it was a pseudo element, it wasn’t a `::before` or `::after`. In other words, my “global” border-box sizing didn’t actually apply to it.

So when the element with the weird size turned out to have `box-sizing: inherit` applied to it, I realized that it was inheriting it from `::details-content`, and that never matched my box-sizing reset.

You don’t need to use `::details-content` in your own CSS for this to happen. It’s part of the browser’s own stylesheet. You get this behavior for free!

What a waste of an hour! Here, see it for yourself:

## Why it breaks [#](#why-it-breaks)

The box-sizing snippet has `::before` and `::after` because those don’t match the universal selector `*`. The universal selector only matches real elements. `::details-content` also doesn’t match the universal selector so it doesn’t get the styling for there, and it’s also not a before or after pseudo, so the box-sizing style never applies to it.

If you think the fancy cascade-using inheritance boilerplate saves you, then nope, it doesn’t.

```
*,
::before,
::after {
  box-sizing: inherit;
}

html {box-sizing: border-box}
```

All elements get box-sizing set to inherit, and all elements are child nodes of `html`, so all elements should get border-box sizing. Unfortunately, `::details-content` doesn’t get its box-sizing set to inherit, instead it keeps the default. Any elements inside of it then inherits the default value of `::details-content`, rather than what you set on `html`.

## What about a universal pseudo selector? [#](#what-about-a-universal-pseudo-selector)

This article could be telling everyone that the New Improved for 2026 Version of the box-sizing boilerplate should look like this:

```
*,
::before,
::after,
::details-content {
  box-sizing: inherit;
}

html {box-sizing: border-box}
```

That’d work, until some new pseudo element comes along.

What I’d really want, is for one selector to let me target all the pseudos. Seems to me like `::*` would work nicely:

```
*, ::* {
  box-sizing: inherit;
}

html {box-sizing: border-box}
```

Anyway, that’s the post. I’d like to be able to target all pseudo elements in one go, so future me (or you) doesn’t waste another hour. I might make a CSSWG issue later.