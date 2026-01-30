---
title: "Partial Keyframes"
source: "https://www.joshwcomeau.com/animation/partial-keyframes/"
publishedDate: "2025-06-10"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

The most common way to write a CSS keyframe animation is to specify a starting point and an ending point, using `from` and `to`:

```
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

What do you suppose happens if we omit one of these blocks? For example, what if we only specify the _ending_ point?

```
@keyframes fadeToTransparent {
  to {
    opacity: 0;
  }
}
```

This still works! Even without defining a starting opacity, our element will still fade out when this keyframe animation is applied.

When I discovered this pattern a few years ago, I thought it was a neat little trick to shave a few bytes off my bundles, a more concise way to write keyframe animations. **But it turns out, there’s a _way_ more significant and exciting benefit to this pattern!** This lil’ trick unlocks a hidden capability within keyframe animations that makes them _dynamic_ and _composable._ ✨

In this tutorial, I’ll show you how this trick works, and we’ll explore some of the cool things we can do with it. There’s also a _bonus_ tip at the end, showcasing how modern CSS makes keyframe animations even more powerful! 😄

## [Link to this heading](#inherited-values-1)Inherited values

When we omit the `from` block from our keyframe animation, the animation’s starting values will be **inherited from context.**

This’ll be easier to explain with a demo. Check this out:

Variant:

opacity: 1.0

opacity: 0.6

opacity: 0.3

```
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

Our “traditional” setup really only works for elements that are fully opaque by default, like that first yellow ball. The others immediately snap to full opacity before gradually fading out:

By contrast, when we omit the `from` part of the keyframe, the animation will inherit the element’s current opacity and start fading from there. 🤯

We can visualize this difference with a graph:

Opacity

Time

0

0.25

0.5

0.75

1

Keyframe Start

Here’s a playground with the full code, in case you wanted to poke at this a bit:

Code Playground

<style\>
  @keyframes fadeToTransparent {
    to {
      opacity: 0;
    }
  }

  .to-transparent {
    animation: fadeToTransparent 1000ms forwards;
  }
</style\>

<div class\="row"\>
  <div class\="ball"\></div\>
  <div class\="ball" style\="opacity: 0.6"\></div\>
  <div class\="ball" style\="opacity: 0.3"\></div\>
</div\>

<button\>
  Toggle keyframe
</button\>

In this playground, the resting opacity is set via inline style, `<div style="opacity: 0.6">`, but that isn’t a requirement for this pattern. It’ll still work if the resting opacity is set with a CSS class, or however else you typically apply CSS!

And if an element doesn’t set the `opacity` property at all, like that first `.ball` in the playground, the _default_ value of `1` will be used. This is awesome, since it means that our `fadeToTransparent` keyframe is just as easy-to-use as a traditional `fadeOut` animation. We don’t have to explicitly set `opacity: 1` in order to fade stuff out with this technique!

## [Link to this heading](#omitting-the-destination-2)Omitting the destination

The same trick works in the other direction. If you omit the `to` value, the animation will animate from a specified value to whatever value it’s currently set to:

Target Opacity:0.5

opacity: 0.5

```
<style>
  @keyframes fadeFromTransparent {
    from {
      opacity: 0;
    }
  }

  .ball {
    animation: fadeFromTransparent 1000ms;
  }
</style>
```

In this demo, we animate from `0` to whatever the element’s specified opacity is. If the element doesn’t have an explicit opacity set, it will default to `1`, acting like a regular fade-in animation.

**What’s the use case for this?** This trick is handy when working with elements that aren’t fully opaque by default, or have state-based opacity. Here’s a real-world example:

opacity: 0.7

```
<style>
  @keyframes fadeFromTransparent {
    from {
      opacity: 0;
    }
  }

  .icon-btn {
    opacity: 0.7;
    animation: fadeFromTransparent 1000ms;

    &:hover, &:active, &:focus-visible {
      opacity: 1;
    }
  }
</style>
```

This button has a resting opacity of `0.7`, but when the user hovers over it, the opacity flips to `1`. This is a useful UX pattern because it helps convey that this element is interactive.This is known as “affordance” in UX design circles. This button already has pretty good affordance, since the cursor flips to a pointer on hover, but I find the experience is even better with an additional indication.

(I’ve also set it up here to rise to full opacity on focus and tap, so that you can experience this even if you’re not using a mouse, but in practice I think it’s fine for this particular detail to be mouse-only.)

This button _also_ fades in on mount, and so I’m using the partial keyframes trick to ensure that it always fades to the correct value. If the user happens to be hovering over it when it mounts, it’ll fade to `1`. Otherwise, it’ll fade to `0.7`. ✨

## [Link to this heading](#animating-to-a-dynamic-value-3)Animating to a dynamic value

This next bit _really_ blew my mind when I discovered it. With partial keyframes, we can animate to a value specified by _another_ keyframe animation!

Check this out:

Twinkle Duration:250

```
<style>
  @keyframes twinkle {
    from {
      opacity: 0.25;
    }
    to {
      opacity: 0.75;
    }
  }

  @keyframes fadeFromTransparent {
    from {
      opacity: 0;
    }
  }

  .ball {
    animation:
      twinkle 250ms alternate infinite,
      fadeFromTransparent 2000ms;
  }
</style>
```

Let me explain what’s going on here:

-   The `twinkle` keyframe animation causes the ball to oscillate between `0.25` and `0.75` opacity. It bounces back and forth thanks to the `alternate` keyword, and runs forever thanks to `infinite`.
    
-   Our `fadeFromTransparent` keyframe sets an initial opacity of `0`, but doesn’t specify the target opacity.
    
-   When combined, we fade from `0` to the ever-changing value set within `twinkle`. It essentially allows us to gradually introduce the flickering `twinkle` animation.
    

Let’s graph the opacity changes over time, so that we can really see what’s going on here. Toggle between the two values to see the effect of stacking these keyframe animations:

Animation:

Opacity

Time

0

0.25

0.5

0.75

1

Pretty wild, right?? Multiple keyframe animations can modify the same property without one cancelling the other!

## [Link to this heading](#whimsical-animations--4)Whimsical Animations ✨

If you found this tutorial useful, I have some good news for you!

Over the past year, I’ve been working on a new course on whimsical animations. This lil’ tip was plucked straight from the course, and it’s just the tip of the iceberg. I’ll show you all of the tricks and techniques I use to come up with polished, next-level animations. You’ll learn how to use CSS, SVG, and 2D Canvas.

If that sounds worthwhile, you can sign up for updates here:

-   [Whimsical Animations(opens in new tab)](https://whimsy.joshwcomeau.com/)
    

If you sign up, you’ll be the first to know when the course is open for registration. I also plan on sending some free goodies in the weeks ahead. 😄

## [Link to this heading](#bonus-dynamic-values-in-keyframe-definitions-5)Bonus: dynamic values in keyframe definitions

There’s one more trick I want to share with you. 😄

Let’s suppose we’re building the following tail-wagging animation:

For this sort of endless motion, CSS Keyframe animations are the best tool in the toolbox. But hm, keyframe animations require that we set _specific, hardcoded values_.

So, if we only had _one_ ball, this wouldn’t be a big deal. We could set it up like this:

```
@keyframes oscillate {
  from {
    transform: translateX(-16px);
  }
  to {
    transform: translateX(16px);
  }
}

.ball {
  animation: oscillate 1000ms infinite alternate;
}
```

But, we have _four_ balls, and they each oscillate by a different amount. 🤔

For years, this was a thorn in my side. I had to either create four nearly-identical keyframe animations, each with a different hardcoded value, or I would wire it up using CSS transitions and JavaScript intervals. Both options were thoroughly unsatisfying.

And then, I had a _mindblowing_ realization.

Check this out:

```
@keyframes oscillate {
  from {
    transform: translateX(calc(var(--amount) * -1));
  }
  to {
    transform: translateX(var(--amount));
  }
}
```

Instead of hardcoding a specific value like `16px` inside our keyframe definition, we can _access a CSS variable!_ With a little help from `calc`, we can flip that value to its negative counterpart, so that we can oscillate to/from a dynamic value.

In order for this to work, we need to define an `--amount` value on each element that is being animated. For example, we could do that with an inline style:

```
<style>
  .ball {
    animation: oscillate 1000ms infinite alternate;
  }
</style>

<div class="ball" style="--amount: 8px"></div>
<div class="ball" style="--amount: 16px"></div>
<div class="ball" style="--amount: 32px"></div>
<div class="ball" style="--amount: 64px"></div>
```

How freaking cool is this?!

When I first discovered this trick, it kinda blew my mind. I had no idea we could _read_ CSS variables from within a keyframe animation! This was the final puzzle piece that fully unlocked keyframe animations for me, making them just as dynamic and flexible as CSS transitions.

Here’s a full editable demo that showcases this technique:

Code Playground

<style\>
  @keyframes oscillate {
    from {
      transform: translateX(calc(var(\--amount) \* \-1));
    }
    to {
      transform: translateX(var(\--amount));
    }
  }

  .ball {
    animation: oscillate 700ms ease-in-out alternate infinite;
  }
</style\>

<div class\="ball" style\="\--amount: 8px"\></div\>
<div class\="ball" style\="\--amount: 16px"\></div\>
<div class\="ball" style\="\--amount: 32px"\></div\>
<div class\="ball" style\="\--amount: 64px"\></div\>

<button\>Play/pause animation</button\>

In terms of browser support, I _believe_ that this has been supported since CSS variables themselves were introduced. According to caniuse, support is sitting [around 96%(opens in new tab)](https://caniuse.com/css-variables).

CSS keyframe animations can be pretty confusing, so if you’re not sure what keywords like `alternate` are doing, you can check out my [interactive blog post](https://www.joshwcomeau.com/animation/keyframe-animations/) on the subject.

And if you’d like to learn about whimsical animation more broadly, don’t forget to [sign up for updates about my course!(opens in new tab)](https://whimsy.joshwcomeau.com/)

### Last updated on

June 11th, 2025