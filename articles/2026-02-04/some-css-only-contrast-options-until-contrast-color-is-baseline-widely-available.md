---
title: "Some CSS only contrast options until contrast-color() is Baseline widely available"
source: "https://piccalil.li/blog/some-css-only-contrast-options-until-contrast-color-is-baseline-widely-available/?ref=main-rss-feed"
publishedDate: "2026-02-03"
category: "css"
feedName: "Piccalilli"
author: "Donnie D’Amato"
---

For as long as I’ve been making things on the web, getting a foreground color to “just work” with any given background color has been a persistent wish of mine.

Initially I thought this would be helpful with prototyping because I could choose a single color for the background, and the foreground color could automatically update to become at least readable. This reduces the number of decisions I need to make and allows for faster development.

You can probably imagine how this might be helpful in production as well because dozens of design tokens meant to describe the presentation of an experience could be reduced if some of these decisions happened behind the scenes. The colors that truly encompass the brand and its expression could be carefully chosen, while other supporting colors could “just work”.

Browser engineers have been working towards a solution for this in CSS called [`contrast-color()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/contrast-color). Here’s what that will look like:

`body { 	background: black; 	color: contrast-color(black); }`

The color used for the background is passed as an argument in the CSS `contrast-color()` function to produce either black or white. Unfortunately, [this isn’t available in all browsers](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/contrast-color) at the time of this writing, so instead, folks across the web have been either curating both background and foreground colors separately or are required to pass their color choices through some preprocessor to output appropriate contrasting colors.

However, there’s been other advances in CSS that we might consider helping us achieve the features of `contrast-color()` today in all browsers.

The earliest attempt of getting this behavior that I can remember is [a post on CSS-Tricks](https://css-tricks.com/css-variables-calc-rgb-enforcing-high-contrast-colors/) by [Josh Bader](https://joshuabader.com/). His approach required the person to break out the red, green, and blue channels of the color to then perform some math to get the contrasting color.

`:root {   --red: 28;   --green: 150;   --blue: 130;    --accessible-color: calc(     (       (         (           (var(--red) * 299) +           (var(--green) * 587) +           (var(--blue) * 114)         ) / 1000       ) - 128     ) * -1000   ); }  .button {   color:     rgb(       var(--accessible-color),       var(--accessible-color),       var(--accessible-color)     );   background-color:     rgb(       var(--red),       var(--green),       var(--blue)     ); }`

The resulting `--accessible-color` is a number for each channel that would surpass the boundaries of the `rgb()` color function causing the resulting color to be either black or white. In other words, a color written as `rgb(-10, -10, -10)` is not invalid, it is black.

The problem here is that you’d need to break out your colors into separate channels for every color that you use. While this might be less decision making than before, it’s also _more_ maintenance and naming as each color would need some channel identifier at the end, such as, `button-background-red`. This initial naming could even be confusing itself. While we intend for the value of this variable to be the number than represents the red channel for the button background, others looking at this could mistake this as the color to present a red button.

[Advert![Mindful Design. Learn to design for real humans. Available now](https://piccalil.b-cdn.net/images/ads/md-ad-landscape-post-launch.jpg?format=webp)](https://piccalil.li/mindful-design?utm_source=piccalilli&utm_medium=graphical-ad)

However, this approach did give me a new idea. In order to figure out the contrasting color for a given color, we need to get the numeric value for channels and manipulate them somehow. Luckily there’s a new feature within the CSS color specification that does exactly this: [Relative Color Syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Colors/Using_relative_colors).

`body { 	background-color: rgb(from red r g b); }`

The result of the above code wouldn’t display anything special; the page would have a simple `red` background color. Where this gets interesting is the `r`, `g`, and `b` values. These are numbers that present the channels of red, green, and blue respectively for the given `red` color. This means we could use the given numbers to create a new color. For example, let’s make the `red` lighter using LCH.

`body { 	background-color: lch(from red calc(l + 20) c h); }`

Relative color syntax can break out the channels for many color spaces and many of the color functions we’ve been using for years include the `from` keyword in their syntax. This means than we can now easily add an alpha channel amount to a given color.

`body { 	background-color: rgb(from red r g b / .5); }`

Yep, we don’t need to explicitly use the `rgba` function here to include the alpha channel. This will add the `.5` opacity to the `red` for the background with ease.

So now that we have this system, we should be able to use the same calculation from Josh’s article within the color function. Buckle up, it’s a bit of a doosie!

`@property --channel {   syntax: "*";   inherits: false;   initial-value: calc((((r * .299) + (g * .587) + (b * .114)) - 128) * -1000); }  body { 	--color: black; 	--contrast-color: rgb(from var(--color)     var(--channel)     var(--channel)     var(--channel)   );   background: var(--color);   color: var(--contrast-color); }`

Okay, this is a lot so let’s break it down. You’ll see I’m using the `@property` syntax to define a `calc()` function. I’m using `@property` to keep the gnarly formula away from the CSS declarations in use. In this function I’ve replicated the math happening in the original approach with some small changes.

For example, instead of dividing the result of the addition by 1000, we update the numbers to have been each divided by 1000. We make this a custom property so the declaration can be reused across channels without duplicating the mess of operations. From here, the use is similar to what Josh had done before except with the relative color syntax to pull out the individual channels automatically.

When I originally [posted this back in June 2025](https://blog.damato.design/posts/css-only-contrast/), [Matt Ström-Awn](https://matthewstrom.com/) made some quick but important [improvements](https://codepen.io/ilikescience/pen/azOpOqX). He noted that WCAG contrast algorithm uses a color’s XYZ color space, specifically it’s Y value, to determine the level of acceptable contrast. This means that we can compute the contrasting color by using the `color()` function and setting the color space to XYZ. Then we force each channel to be computed based on the Y value. Here’s his implementation:

`body { 	color: color(from var(--color) xyz 		round(up, min(1, max(0, 0.18 - y))) 		round(up, min(1, max(0, 0.18 - y))) 		round(up, min(1, max(0, 0.18 - y))) 	); }`

The `.18` number comes directly from the WCAG contrast ratio formula (L1 + 0.05) / (L2 + 0.05). To find the luminance where contrast against white equals contrast against black, you set them equal and solve for the luminance. Y = (√21 - 1) / 20 ≈ 0.1791.

In writing this article, my research led me to a post by [Lea Verou, Ph.D](https://verou.me/) who explores [a similar approach](https://lea.verou.me/blog/2024/contrast-color/) about a year earlier where she says a good threshold for flipping to black text is when Y > 0.36.

`body { 	color: color(from var(--color) xyz-d65 		clamp(0, (.36 / y - 1) * infinity, 1) 		clamp(0, (.36 / y - 1) * infinity, 1) 		clamp(0, (.36 / y - 1) * infinity, 1) 	); }`

There’s even further consideration for lower contrast mid luminances where fonts should be adjusted. Unfortunately, we cannot pull out the `y` from these functions to use in anything outside of the relative color syntax. Otherwise, we could use the `y` to affect things like `font-size` or `font-weight` to improve readability further.

[Advert![Complete CSS. Take your CSS skills beyond the next level. Available now!](https://piccalil.b-cdn.net/images/ads/complete-css-ad-landscape-free-lessons.png?format=webp)](https://piccalil.li/complete-css/lessons/3?utm_source=piccalilli&utm_medium=graphical-ad)

One of the gotchas that I found while using these formulas is that they don’t account for the possibility of an alpha channel being included. Certainly, if the alpha channel number is significantly large, then the color isn’t really meant to contribute to the contrast algorithm. In other words, a color like `rgb(255 0 0 / .9)` is barely red and the text color that might appear on top should really be compared to another background color that appears truly underneath.

In the case where the alpha channel is not significant, I still want to ensure that the text does not receive the incoming alpha channel value. So, I recommend explicitly adding a `/ 1` to the end of the statement. This will cause the resulting foreground color to be opaque which is important for readability.

`body { 	color: color(from var(--color) xyz 		clamp(0, (.36 / y - 1) * infinity, 1) 		clamp(0, (.36 / y - 1) * infinity, 1) 		clamp(0, (.36 / y - 1) * infinity, 1) 		/ 1 /* Add for opaque color */ 	); }`

As you might imagine, supplying values that aren’t a single color, like a gradient, will fail this computation. However, a color that is determined through `color-mix()` may also fail in the relative color syntax. This means that it’s best to provide simple color values into the function where possible to avoid the function from failing. When the function fails, the `color` statement will be invalid and a color you may have not been expecting might be rendered instead.

On the other hand, this doesn’t mean you couldn’t send the resulting color into a `color-mix()` to tint in a certain direction.

`body { 	background-color: var(--color); 	--contrast-color: color(from var(--color) xyz 		clamp(0, (.36 / y - 1) * infinity, 1) 		clamp(0, (.36 / y - 1) * infinity, 1) 		clamp(0, (.36 / y - 1) * infinity, 1) 		/ 1 	); 	color: color-mix(in srgb, var(--contrast-color), var(--color) 20%); }`

In this example, we compute the contrast color with our latest formula and then mix that with the background slightly to produce the final foreground color. Importantly, this reduces the guarantee that the final foreground color will have sufficient contrast for certain given colors. So, choosing colors that have high saturation, and / or significant lightness would work best.

While we wait for `contrast-color()` to arrive in all browsers, these CSS-only approaches give us a practical way forward today. By leveraging relative color syntax and the XYZ color space, we can generate manageable contrasting colors without curating separate values. The formula isn’t perfect but for the majority of single-color backgrounds, it delivers what we’ve been hoping for: text that “just works”. As browser support continues to improve and these techniques become more refined, we’re one step closer to reducing the decision fatigue that comes with building for the web.

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_

[Advert![JavaScript for Everyone. Truly understand how JavaScript works. Available now. ](https://piccalil.b-cdn.net/images/ads/js4e-ad-landscape-post-launch.png?format=webp)](https://piccalil.li/javascript-for-everyone?utm_source=piccalilli&utm_medium=in-article-ad)