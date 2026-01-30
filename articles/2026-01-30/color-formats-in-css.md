---
title: "Color Formats in CSS"
source: "https://www.joshwcomeau.com/css/color-formats/"
publishedDate: "2022-11-28"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

CSS has a whole slew of different color formats: hex codes, rgb(), hsl(), lch(), the list goes on!

_Which one should we use?_ It might seem like an inconsequential decision, but there are some pretty important differences between them. And, honestly, I think most of us are prioritizing the wrong things. 😅

In this tutorial, I'll take you on a tour of the different options. We'll see how they work, how we can decipher them, and how we can use them to our advantage. Later, I'll show you how modern CSS lets us make on-the-fly adjustments, _if_ we pick the right color format.

## [Link to this heading](#named-colors-1)Named colors

So, this isn't _really_ a color format, but it's a good place to start!

HTML comes with 140 named colors. These are special keyword values like `dodgerblue`, `hotpink`, and `tomato`:

Code Playground

Code editor:

Result

Developer Anthony Lieuallen created this neat demo, showing all 140 named web colors in a circle:

Named colors are great when you need a placeholder color. For example, if you're building a prototype and need temporary values, or if you're writing educational content. In terms of readability, nothing beats `color: red`.

It probably goes without saying, but we generally don't use named colors in production applications. 140 colors just isn't enough—it's even less than the 8-bit color palette available on the original NES console!

## [Link to this heading](#rgb-2)RGB

Alright, this is our first “real” color format. Here's how we use it:

Code Playground

Code editor:

Result

Like most color formats, `rgb` is an acronym. It stands for **red green blue**.

Of all the color formats we’ll learn about today, `rgb` is the least abstracted. Your computer/phone display is really just a collection of millions of tiny red, green, and blue LEDs, assembled into pixels. And so, the `rgb` color format lets us tweak the brightness of those lights directly.

Each value — red, green, blue — is referred to as a _channel_. Each channel goes from 0 to 255. By mixing these channels in different amounts, we can create over 16 milion different colors.

**Here's an `rgb` color picker.** Spend a couple moments getting a feel for how it works:

Red

255

Green

0

Blue

0

rgb(255 0 0);

The neat thing about RGB color is that it's based on the physics of light. We can mix red, green, and blue light together to create any color. Crank them all to 255, and we get white. Set them all to 0, and we're left with black.

The `rgb` color format also allows us to specify a 4th optional value for the _alpha channel_, to control transparency:

Code Playground

Code editor:

Result

The alpha channel ranges from `0` (fully invisible) to `1` (fully opaque). Anything in-between produces a translucent color.

## [Link to this heading](#hex-codes-3)Hex codes

This is probably the most commonly-used color format on the web. It looks like this:

Code Playground

Code editor:

Result

**Here's how it works:** a 6-digit hex code contains three 2-digit values, one for each channel (red / green / blue). Instead of using a 10-digit decimal system, it uses a _16-digit_ hexadecimal system.

This'll be clearer with an interactive demo. Try dragging the sliders to discover how hex codes work:

#

FF

00

00

**Fundamentally, hex codes are the same as RGB values.** In both cases, we're providing a value for red, green, and blue.

In a decimal system, a two-digit value can contain 100 possible values (10 × 10). With _hexa_decimal, the total number is 256 (16 × 16). And so it really is just like `rgb()`, where we're specifying a value between 0 and 255 for each R/G/B channel.

And here's a fun fact: we can pass an _eight digit_ hex code if we want to include an alpha channel:

Code Playground

Code editor:

Result

In this example, we're specifying `80` as the alpha channel, which is equivalent to 128 in a decimal system. As a result, this box is 50% opaque.

8-digit hex codes are widely implemented in modern browsers, with [96% global support(opens in new tab)](https://caniuse.com/css-rrggbbaa). Sadly, they aren't supported in IE.

## [Link to this heading](#hsl-4)HSL

So far, both of the color formats we've seen are different “wrappers” on the same fundamental idea: passing specific values for red/green/blue channels.

This isn't the only way to think about color, though! Let's look at a totally different color format: _HSL_.

Let's start with the color picker this time:

Saturation

Lightness

Hue

0 degrees

This color picker probably feels much more familiar. It's similar to the ones used in graphic design software like Figma or Photoshop.

This color format takes 3 different values:

-   _Hue:_ This is the pigment we want to use. Valid values range from 0 to 360, and we specify it in degrees because the scale is circular (`0deg` and `360deg` represent the same red hue).
    
-   _Saturation:_ How much pigment is in the color? Valid values range from 0% to 100%. At 0%, there is no pigment in the color, and it's totally grayscale. At 100%, the color is as vibrant as possible.
    
-   _Lightness:_ how light/dark is the color? Valid values range from 0% to 100%. At 0%, the color is pitch black. At 100%, the color is pure white.
    

**This tends to be a really intuitive way to think about color.** Instead of controlling the R/G/B light values directly, we've moved to a higher level of abstraction, one more closely aligned with how humans typically think about color.

Like we saw with RGB, we can specify transparency with the `/` delimiter:

Code Playground

Code editor:

Result

## [Link to this heading](#modern-color-formats-5)Modern color formats

So, all of the color formats we've seen so far have been around for many, many years. HSL was even supported way back in Internet Explorer 9 (released in 2011)!

Recently, however, we've been getting some _new_ color formats in CSS. They're pretty compelling. Let's talk about them.

### [Link to this heading](#display-pthree-6)Display P3

So, this blog post is about color _formats_, the syntaxes we use to specify colors. All of the true color formats we've seen so far — `rgb()`, hex codes, and `hsl()` — are all bound by the “standard RGB color space”, commonly abbreviated as _sRGB_.

A color space is a collection of available colors, the palettes we have to pick from. There are millions of possible colors in sRGB, but it doesn't come close to capturing the full range of colors the human eye is capable of seeing.

Take a look at the following two red squares:

On the left, the color is `rgb(255 0 0)`. It's the reddest red possible in the sRGB color space. On the right, however, I'm using the _P3_ color space. It's an even redder red!

(There's a good chance these two squares look identical to you. If so, it likely means that your monitor or browser doesn't support wide-gamut color formats. You might have better luck checking on your mobile device! iPhones in particular have supported wide-gamut color for a few years now.)

P3 extends the standard sRGB color space, giving us access to brighter and more vibrant colors. I really like this image, from a [wonderful WebKit blog post(opens in new tab)](https://webkit.org/blog/10042/wide-gamut-color-in-css-with-display-p3/):

![3 squares showing how the P3 color space extends sRGB. Red is extended by a moderate amount, blue is extended by a little bit, and green is extended by a ton.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fcolor-formats%2Fsrgb-vs-p3.png&w=1200&q=75)

Unfortunately in CSS, the color _space_ is linked to the color _format_. If I choose to use the `rgb()` syntax (or hex codes, or `hsl()`), I can only ever specify colors in the sRGB color space.

So, if we want to use the P3 color space, we need to use a different color format. Here's the syntax:

```
.box {
  background: color(display-p3 1 0 0);
}
```

The `color()` function takes a color space, and then a set of R/G/B values. Instead of ranging from 0 to 255, it uses decimal values from 0 to 1.

Browser support for the `color()` function has gotten a lot better, and is [now available in all modern browsers(opens in new tab)](https://caniuse.com/css-color-function). That said, as I write this in mid-2023, it's still only around 85% support, so you should still provide a fallback in the meantime:

```
.box {
  /* Fallback for older browsers */
  background: rgb(255 0 0);

  /* ✨ Fancy new colors: */
  background: color(display-p3 1 0 0);
}
```

Ultimately, it's exciting to gain access to a wider palette of colors, but I don't love specifying color using R/G/B channels. Fortunately, it's not the only new kid on the block! 😄

### [Link to this heading](#lch-7)LCH

Let's consider these two colors, created using the HSL color format:

hsl(

60

deg

100

%

50

%)

hsl(

240

deg

100

%

50

%)

As we can see, both of these colors have the same “lightness” value of _50%_. They don't feel equally light, though, do they? The yellow feels _way_ lighter than the blue!

The HSL color format is modeled after math/physics. It doesn't take human perception into account. And, it turns out, humans don't perceive colors very accurately!

**LCH is a color format that aims to be perceptually uniform to humans.** Two colors with an equivalent “lightness” value should feel equally light!

For example, here's what yellow and blue look like, at 55% lightness, in LCH:

lch(55% 132 95)

lch(55% 132 280)

Here's an LCH color picker. Spend a moment or two experimenting with it, to get a feel for how it works:

Chroma

Lightness

Hue

0 degrees

LCH stands for “Lightness Chroma Hue”. “Chroma” is more-or-less a synonym of “saturation”There is technically a difference, but I don't know enough about color theory to understand the distinction. It's conceptually very similar to HSL, but with two big differences:

1.  As noted, it prioritizes human perception, so that two colors that share the same “lightness” value will _feel_ equally light.
    
2.  It isn't bound to any particular color space.
    

Unlike the other color formats we've seen, LCH isn't bound to sRGB. It isn't even bound to P3! It achieves this by _not having an upper limit on Chroma_.

In HSL, saturation ranges from 0% (no saturation) to 100% (fully saturated). This is possible because we know that we're talking about the sRGB color space, a finite palette of colors.

But LCH isn't linked to a particular color space, and so _we don't know_ where the upper saturation limit is. It's not static: as display technology continues to improve, we can expect monitors to reach wider and wider gamuts. LCH will automatically be able to reference these expanded colors by cranking up the chroma. Talk about future-proofing!

```
.red-box {
  /* This is a very-red box in sRGB: */
  background: lch(50% 120 20);
  /*
    This is an identical color in sRGB, but will appear
    MUCH REDDER in the wider-gamut displays of the future:
  */
  background: lch(50% 500 20);
}
```

LCH has been adopted surprisingly quickly, and [is now available in all major browsers(opens in new tab)](https://caniuse.com/css-lch-lab). That said, as I write this in mid-2023, support is still well below 90%, so it may be worth either waiting a few more months, or providing fallbacks.

If you'd like to learn more about LCH, check out [Lea Verou’s seminal blog post(opens in new tab)](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/). I owe her and Chris Lilley a big thanks; [their LCH color picker(opens in new tab)](https://css.land/lch/) helped me build mine!

## [Link to this heading](#picking-the-right-color-format-8)Picking the right color format

So, we've completed our tour, and seen _lots_ of different color formatsThere are even more, like hwb, but I believe we've covered the most popular/relevant ones. Which one should you actually use in your work?

**Personally, I'm using HSL.** In the coming months, I plan on migrating to OKLCH, but it feels just a bit too bleeding-edge at the moment.

I know a lot of devs like using hex codes. They're terse, easy to copy/paste between design software and our code, and universal. But those benefits come with some pretty hefty tradeoffs.

Even if you're comfortable with hexadecimal notation, it's still pretty tough to decipher. Quick: What color is `#0F52B7`? How about `#F32AB9`??

The wonderful thing about HSL is that it's _intuitive_. It aligns closely with how we tend to think about color. With a bit of practice, you'll be able to immediately picture any color when you see the `hsl()` value.

**And that means we can easily tweak values, on the fly**. I don't even need to open a color picker. If I want my color to be a bit darker, I can decrement the _lightness_ percentage. If I want it to be more vivid and intense, I can crank up the _saturation_.

HSL gets even more powerful when we combine it with modern CSS features.

### [Link to this heading](#superpowered-design-tokens-9)Superpowered design tokens

Years ago, I used to use a CSS preprocessor called Sass. One of the best things about Sass was that it came with color-manipulation functions:

```
.box {
  $red: '#FF0000';
  $darkRed: darken($red, 20%);
  $transparentRed: opacify($red, 50%);
  $softRed: lighten(desaturate($red, 30%), 10%);
}
```

**Here's the really cool thing:** When we use HSL, we can manipulate color like this in _vanilla CSS!_

We'll need to leverage CSS variables to help:

Code Playground

HTML

Code editor:

CSS

Code editor:

Result

To explain what's going on here: We have little “color fragments” stored in CSS variables, and we're using them like LEGO™ bricks, assembling them into fully-formed colors.

The `calc()` function lets us modify those fragments. For example, considering the `--dark-red` color:

```
html {
  --dark-red: hsl(
    var(--red-hue)
    var(--red-sat)
    calc(var(--red-lit) - 20%)
  );
}
```

We're using the standard hue and saturation for our red color, but we're lowering the lightness by 20%. The color goes from `hsl(0deg 100% 50%)` to `hsl(0deg 100% 30%)`.

Now, this might seem a heck of a lot more complicated than the Sass way. It's definitely more typing. But let's not lose sight of the fact that **this is all happening in vanilla CSS.**

Unlike with Sass variables/functions, which compile away into hardcoded values, _CSS variables are dynamic_. We can tweak any of these values using JavaScript, and all the other ones will automatically update.

This is super handy for things like adding a toggleable dark mode, user-defined color themes, and more.

There are _so many cool things_ we can do when we combine an intuitive color format like HSL or LCH with the modular power of CSS variables and calc. I feel like we've only seen the tip of the iceberg, and I hope this is an area that we continue to explore and experiment with!

## [Link to this heading](#the-adventure-continues-10)The adventure continues

So I have a question for you: **How much do you enjoy writing CSS?**

Personally, I enjoy it quite a bit. I suspect that much is obvious, from this article 😅. But this wasn't always the case!

I started tinkering with CSS back in 2007, and for about a decade, _I stumbled my way through it._ I got things done, but I didn't really have much confidence. Things felt precarious, like a house of cards. I'd get into these funky situations where the UI wasn't doing what I wanted, and so I'd throw random properties and values. The CSS was a hot mess, but at least the UI looked mostly correct?

CSS is a surprisingly difficult language to master. No matter how many years I spent practicing, I always felt like there was so much I didn't know. And so I decided to fix it.

I spent years proactively trying to understand CSS. When the language surprised me, I'd settle into the problem like a warm bath and really dig into it, searching the MDN documentation, the CSSWG specifications, and doing a lot of experimentation, building out my mental model _one brick at a time_.

This was not a quick or easy process, but by golly it was effective. Things started making _so much more sense to me_. I kept having epiphanies, like _“ohhh _that’s_ why this is happening!”_. Puzzle pieces kept snapping into place, and soon I had a clear picture of what was happening.

**I want to help accelerate this process for you.** I created a self-paced, comprehensive online course called [CSS for JavaScript Developers(opens in new tab)](https://css-for-js.dev/).

[![Visit the CSS for JavaScript Developers homepage](https://www.joshwcomeau.com/images/the-importance-of-learning-css/css-for-js-banner.png)](https://css-for-js.dev/)

Over the course of 10 modules, we'll go through the language comprehensively, learning about Flexbox, CSS Grid, positioned layout, flow layout, and more. We'll build a robust mental model, letting you leverage your intuition to solve challenging problems. And we'll cover a ton of modern CSS features (we learn more about CSS variables and `calc` in the course!).

The course uses the same tech stack as this blog post, and so it's jam-packed with interactive widgets and code playgrounds, but it's so much more. There are 170+ short videos, tons of exercises, real-world-inspired projects, and even a few mini-games. ✨

It's specifically built for folks who use a JS framework like React/Angular/Vue. 80% of the course focuses on CSS fundamentals, but we also see how to integrate those fundamentals into a modern JS application, how to structure our CSS, stuff like that.

If you struggle with CSS, I hope you'll check it out. Gaining confidence with CSS is _game-changing_, especially if you're already comfortable with HTML and JS. When you complete the holy trinity, it becomes so much easier to stay in flow, to truly enjoy developing web applications.

Learn more at [**https://css-for-js.dev/**](https://css-for-js.dev/).

Thanks for reading, and have fun experimenting with new color formats!  
💖💜💙💚💛🧡❤️

### Last updated on

December 3rd, 2025