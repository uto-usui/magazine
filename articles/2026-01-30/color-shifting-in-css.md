---
title: "Color Shifting in CSS"
source: "https://www.joshwcomeau.com/animation/color-shifting/"
publishedDate: "2025-09-08"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

Let’s suppose we’re building this particle effect:

This effect is something we build in my [brand-new animations course(opens in new tab)](https://whimsy.joshwcomeau.com/), and there are lots of little details, but in this blog post, I want to zoom in on one surprisingly-interesting facet: the color shifting.

Each particle starts on a random color and changes hue as it fades out. This _seems_ pretty straightforward, but appearances can be deceiving. In fact, I discovered a new CSS limitation I wasn’t aware of, and came up with a couple different workarounds.

In this tutorial, I’ll share what I’ve learned, and you’ll see how to build some super-cool color-shifting effects in CSS!

## [Link to this heading](#hello-color-1)Hello color

So, in my particle effect, I want every particle to have its own dynamic colors.

Let’s start with the simplest possible option, generating a random color using RGB values:

```
// Do this for every particle:
const red = Math.round(Math.random() * 255);
const green = Math.round(Math.random() * 255);
const blue = Math.round(Math.random() * 255);

particle.style.backgroundColor =
  `rgb(${red} ${green} ${blue})`;
```

The RGB color format supports 16.7 million possible colors (2563), and this code will select one of them, totally at random. Here’s what that looks like:

Sample Colors

(ClickTap the heart to generate some particles. The first few colors will be shown here.)

![Click me](https://www.joshwcomeau.com/images/color-shifting/click-me.png)

This looks alright, but we probably don’t want to use _completely_ random colors. It would feel a lot more cohesive if all of our colors had the same general feel (eg. all pastel colors, or all neon colors).

It’s not at all obvious how we would do this with `rgb()`, but if we switch to `hsl()`, things get a lot easier. We could do something like this:

```
const randomHue = Math.round(
  Math.random() * 359
);
particle.style.backgroundColor =
  `hsl(${randomHue}deg 100% 80%)`;
```

In this updated version, we’re picking a random _hue_, but we’re keeping the saturation locked to 100% and the lightness locked to 80%. This produces pastel-like tones:

Sample Colors

(ClickTap the heart to generate some particles. The first few colors will be shown here.)

This feels a lot better to me. The only issue is that randomness can be clumpy; there’s no guarantee that the selected hues will be distributed across the color wheel. But this won’t really be an issue when we start shifting between colors, so let’s not worry about it.

## [Link to this heading](#shifting-between-colors-2)Shifting between colors

Alright, so I’m happy with our single-color solution, but really our goal is for each particle to shift _between_ two different colors.

As I mentioned in the intro, this was surprisingly tricky. Here‘s the first thing I tried:

```
const fromHue = Math.round(
  Math.random() * 359
);
const toHue = fromHue + 180;

particle.style.setProperty(
  '--from-color',
  `hsl(${fromHue}deg 100% 80%)`
);
particle.style.setProperty(
  '--to-color',
  `hsl(${toHue}deg 100% 80%)`
);
```

```
/* And then, in the CSS: */
@keyframes colorShift {
  from {
    background: var(--from-color);
  }
}

.particle {
  background-color: var(--to-color);
  animation: colorShift 1500ms linear;
}
```

In this updated version, I’m generating _two_ HSL colors that are on opposite sides of the color wheel, and fading between them using a keyframe animation. I’m using [a couple of keyframe tricks](https://www.joshwcomeau.com/animation/partial-keyframes/) that I wrote about a few weeks back.

I chose a linear timing function since it feels more natural in this particular case; each intermediate color is shown for the same amount of time.

Here‘s what this looks like:

Sample Colors

(ClickTap the heart to generate some particles. The first few colors will be shown here.)

**What do you think about this?** Take a moment to really examine it. Do the colors look good to you?

Personally, I found that the colors seemed a bit washed out. The particles become sorta grey-ish in between the source and destination. 🤔

This is clearer if we zoom in and slow down:

If you pause this video while the particles are halfway through their shift, they’re all greyscale!

Admittedly, it’s hard to tell with everything going on. Here’s a basic button that performs the same color transition on hover/focus:

Code Playground

<style\>
  button {
    background: hsl(0deg 100% 65%);
    transition: all 2000ms;

    &:hover, &:focus-visible {
      background:hsl(180deg 100% 65%);
    }
  }
</style\>

<button\>
  Hover over me
</button\>

The starting color (red) and the ending color (teal) are both quite vibrant, but it becomes dull and grey in the middle:

🤔

I would _expect_ that the saturation and lightness would stay the same, and only the hue would shift through the animation, something like this:

**Here’s the problem:** when we animate `background-color`, the browser always does the calculations using the _RGB_ color space, even when our colors are specified in HSL.

In RGB, we have three color channels (red/green/blue), each between 0 and 255. The browser does the math on these three channels _individually_. You can see why that’s a problem in this demo:

R:

255

G:

77

B:

77

**How to use:** Click and drag to reposition the indicator, or focus the indicator and use the left/right arrow keys.

As we scroll from left to right, the red channel _decreases_ as the green/blue channels _increase_. As a result, all three channels converge on the same value in the middle, producing a medium gray.

In other words, the browser is transitioning between these two colors using a mathematical model that doesn’t really have anything to do with how we perceive color 😅. No rational person would say that the midpoint between red and teal is grey!

**There’s another issue, too.** Let’s say we wanted the color to rotate by a full 360°, looping around the color wheel. Check out what happens when we try to transition between 0° and 360°:

Code Playground

<style\>
  button {
    background: hsl(0deg 100% 65%);
    transition: background 2000ms;

    &:hover, &:focus-visible {
      font-weight: bold;
      background: hsl(360deg 100% 65%);
    }
  }
</style\>

<button\>
  Hover over me
</button\>

**Nothing happens.** You’re not doing it wrong. Hovering or focusing the button doesn’t seem to affect the background color at all. 🤔

In order to understand what’s going on here, we have to answer a _philosophical_ question: are `hsl(0deg 100% 65%)` and `hsl(360deg 100% 65%)` the same color?

Well, they _represent_ something different; `0deg` represents the very first color available in the spectrum, while `360deg` represents a full spin around the color wheel. But ultimately, both colors _resolve_ to the same R/G/B values.

Unfortunately, as we saw above, the browser doesn’t do color interpolations in HSL; it first converts both values to `rgb()` and then transitions the values for all three color channels. And since `hsl(0deg 100% 65%)` and `hsl(360deg 100% 65%)` both resolve to the exact same `rgb()` value, we wind up not transitioning at all.

Fortunately, I found a solution that solves these problems, and offers better performance to boot. ⚡

## [Link to this heading](#css-filters-to-the-rescue-3)CSS filters to the rescue!

If you’re not familiar, the CSS `filter` property provides SVG-style filters in CSS. For example, we can blur an element with `filter: blur()`:

Code Playground

<style\>
  img {
    
    filter: blur(6px);
  }
</style\>

<img
  alt\="A blurry 3D illustration of Josh"
  src\="/img/josh-mascot.png"
/>

One of the filters is `hue-rotate`. As you’d expect, this filter shifts the hue of a given element:

![A photo of a colorful bird](https://www.joshwcomeau.com/images/color-shifting/bird.jpg)

Hue Rotate:0deg

Let’s update our particle effect to use the `hue-rotate()` filter. On the JavaScript side, we can actually revert to what we had earlier, setting the particle’s background color:

```
const randomHue = Math.round(
  Math.random() * 359
);

particle.style.backgroundColor =
  `hsl(${randomHue}deg 100% 80%)`;
```

On the CSS side, we’ll create a new keyframe animation that will do two full spins around the color wheel:

```
@keyframes hueRotate {
  to {
    filter: hue-rotate(720deg);
  }
}

.particle {
  animation: hueRotate 1000ms;
}
```

And here’s what that looks like:

Sample Colors

(ClickTap the heart to generate some particles. The first few colors will be shown here.)

It works! Each particle is able to rotate more than 180 degrees. 😄

Now, it’s not _quite_ the same as changing the _hue_ component of an `hsl()` color. Here’s a side-by-side comparison:

background-color:

hsl(

0

deg 100% 80%)

filter:

hue-rotate(

0

deg)

Target hue:0deg

I’m not exactly sure how the `filter: hue-rotate()` algorithm works, but it tends to produce darker color variations. I’ve found it works best if I pick slightly lighter and less-saturated colors.

And honestly, I think two full rotations (`720deg`) is probably a bit much. I wanted to make sure the effect was clear in this demo, but in practice, I’d probably pick a smaller value, maybe something in the 180°-540° range.

## [Link to this heading](#twinkling-4)Twinkling

Another small detail that makes a surprisingly big difference is the twinkling effect; as the particles fade away, they flicker a bit. It’s not a simple linear fade from full opacity to full transparency.

Twinkle Intensity:0%

I accomplished this using the [partial keyframes trick](https://www.joshwcomeau.com/animation/partial-keyframes/) I shared a few weeks back. Here’s the basic idea:

```
@keyframes fadeToTransparent {
  to {
    opacity: 0;
  }
}

@keyframes twinkle {
  from {
    opacity: var(--twinkle-amount);
  }
  to {
    opacity: 1;
  }
}

.particle {
  animation:
    twinkle var(--twinkle-duration) infinite alternate ease-in-out,
    fadeToTransparent var(--fade-duration) 500ms;
}
```

One of my little animation secrets is to add small bits of random variation to everything. Each particle defines its own `--twinkle-duration` and `--twinkle-amount`, so that they don’t all flicker in lockstep like christmas tree lights.

## [Link to this heading](#whimsical-animations-5)Whimsical Animations

If you’d like to learn how to build this full particle effect, along with _tons_ of other cool animations and interactions, I have great news for you!

I’ve spent this year building a comprehensive, interactive online course all about whimsical animations. I share all of my most potent tricks and techniques. If you’ve ever wondered how I built some special effect on this blog, there’s a very good chance this course contains the answer. 😄

[![Whimsical Animations](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fwhimsical-animations.jpg&w=1920&q=75)](https://whimsy.joshwcomeau.com/)

I’m hoping to release this course in the first half of 2026. You can learn more and sign up here:

-   [Whimsical Animations(opens in new tab)](https://whimsy.joshwcomeau.com/)
    

### Last updated on

October 25th, 2025